import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
	allResolvedRecordProperties,
	isMKeyProperty,
	isMProperty,
	isMResolvedProperty,
	isMResolvedUnionType,
	isMRevisionProperty,
	MResolvedBaseProperty,
	MResolvedPropery,
	MResolvedRecordType,
	MResolvedRSDModel,
} from '../model.js';
import { computeAPIType, JavaNativeTypeSubstitutes } from '../java-gen-utils.js';
import { toFirstUpper } from '../util.js';
import { generateProperty } from './shared.js';

export function generateRecordContent(
	t: MResolvedRecordType,
	model: MResolvedRSDModel,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
): CompositeGeneratorNode {
	const node = new CompositeGeneratorNode();

	const Interface = fqn(`${interfaceBasePackage}.${t.name}`);
	const GenericRecord = fqn('org.apache.avro.generic.GenericRecord');

	const allProps = allResolvedRecordProperties(t);
	const keyProp = allProps.find(isMKeyProperty);
	const revProp = allProps.find(isMRevisionProperty);

	node.append(`public class ${t.name}DataImpl extends _BaseDataImpl implements ${Interface}.Data {`, NL);
	node.indent(classBody => {
		classBody.append(`${t.name}DataImpl(${GenericRecord} data) {`, NL);
		classBody.indent(initBody => {
			initBody.append('super(data);', NL);
		});
		classBody.append('}', NL, NL);
		classBody.append(generatePropertyAccessors(t, allProps, nativeTypeSubstitutes, interfaceBasePackage, fqn));
		classBody.append(generateOf(t, fqn), NL);
		classBody.append(generateToString(keyProp, revProp), NL);
		classBody.append(generateBuilder(t, allProps, nativeTypeSubstitutes, interfaceBasePackage, fqn), NL);
		classBody.append(`public static ${t.name}.DataBuilder builder() {`, NL);
		classBody.indent(methodBody => {
			methodBody.append('return new DataBuilderImpl();', NL);
		});
		classBody.append('}', NL);
	});

	node.append('}', NL);

	return node;
}

function generateBuilder(
	t: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const GenericRecordBuilder = fqn('org.apache.avro.generic.GenericRecordBuilder');

	const node = new CompositeGeneratorNode();
	node.append(`public static class DataBuilderImpl implements ${t.name}.DataBuilder {`, NL);
	node.indent(classBody => {
		classBody.append(
			`private final ${GenericRecordBuilder} $builder = _AvroUtils.newBuilder(_AvroSchema.AvroTypes.${t.name});`,
			NL,
			NL,
		);
		classBody.append('public DataBuilderImpl() {', NL);
		classBody.indent(initBody => {
			props
				.filter(isMResolvedProperty)
				.filter(p => p.optional)
				.forEach(prop => {
					initBody.append(`$builder.set("${prop.name}", null);`, NL);
				});
		});
		classBody.append('}', NL, NL);
		classBody.append(generateBuilderPropertyMethods(t, props, nativeTypeSubstitutes, interfaceBasePackage, fqn));
		classBody.append(`public ${t.name}.Data build() {`, NL);
		classBody.indent(methodBody => {
			methodBody.append(`return new ${t.name}DataImpl($builder.build());`, NL);
		});
		classBody.append('}', NL);
	});
	node.append('}', NL);
	return node;
}

function generateBuilderPropertyMethods(
	owner: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	props.forEach(prop => {
		const type = computeAPIType(prop, nativeTypeSubstitutes, interfaceBasePackage, fqn);
		node.append('@Override', NL);
		node.append(`public ${owner.name}.DataBuilder ${prop.name}(${type} ${prop.name}) {`, NL);
		node.indent(methodBody => {
			if (isMProperty(prop)) {
				if (isNullableType(type)) {
					methodBody.append(`if (${prop.name} == null) {`, NL);
					methodBody.indent(block => {
						if (prop.nullable) {
							block.append(`$builder.set("${prop.name}", _AvroUtils.NULL);`, NL);
						}
						block.append('return this;', NL);
					});

					methodBody.append('}', NL);
				}
			}
			methodBody.append(generateAvroBuilder(prop), ';', NL);
			methodBody.append('return this;', NL);
		});
		node.append('}', NL, NL);
		if (isMProperty(prop) && !prop.array && (prop.variant === 'record' || prop.variant === 'union')) {
			const Function = fqn('java.util.function.Function');
			node.append(
				NL,
				`public <T extends ${prop.type}.DataBuilder> DataBuilder with${toFirstUpper(
					prop.name,
				)}(Class<T> clazz, ${Function}<T, ${prop.type}.Data> block) {`,
				NL,
			);
			node.indent(methodBody => {
				if (prop.variant === 'union') {
					const resolvedObjectType = prop.resolved.resolvedObjectType();
					if (isMResolvedUnionType(resolvedObjectType)) {
						methodBody.append(`${fqn(interfaceBasePackage + '.' + prop.type)}.DataBuilder b;`, NL);
						resolvedObjectType.types.forEach((t, idx) => {
							const Type = fqn(`${interfaceBasePackage}.${t}`);
							if (idx === 0) {
								methodBody.append(`if (clazz == ${Type}.DataBuilder.class) {`, NL);
							} else {
								methodBody.append(`} else if (clazz == ${Type}.DataBuilder.class) {`, NL);
							}
							methodBody.indent(block => {
								block.append(`b = ${t}DataImpl.builder();`, NL);
							});
						});
						methodBody.append('} else {', NL);
						methodBody.indent(block => {
							block.append('throw new IllegalArgumentException();', NL);
						});
						methodBody.append('}', NL);
					} else {
						console.error('RESOLVE FAILURE', prop);
						methodBody.append('RESOLVE FAILURE');
					}
				} else {
					methodBody.append(`var b = ${prop.type}DataImpl.builder();`, NL);
				}
				methodBody.append(`return ${prop.name}(block.apply(clazz.cast(b)));`, NL);
			});

			node.append('}', NL, NL);
		}
	});

	return node;
}

const PRIMTIVE_TYPES = new Set(['boolean', 'short', 'int', 'long', 'double', 'float']);

function isNullableType(type: string) {
	return !PRIMTIVE_TYPES.has(type);
}

function computeDefaultTransform(property: MResolvedPropery) {
	if (property.variant === 'enum') {
		return `_EnumSupport::toAvro`;
	} else if (property.variant === 'scalar') {
		return `_ScalarSupport::toAvro`;
	}
	return 'null';
}

function generateAvroBuilder(prop: MResolvedBaseProperty): string {
	if (isMKeyProperty(prop) || isMRevisionProperty(prop)) {
		return `$builder.set("${prop.name}", _AvroUtils.toAvro(${prop.name}, null, false))`;
	}

	if (prop.array) {
		return `$builder.set("${prop.name}", _AvroUtils.toAvroList(${prop.name}, ${computeDefaultTransform(prop)}))`;
	}

	return `$builder.set("${prop.name}", _AvroUtils.toAvro(${prop.name}, ${computeDefaultTransform(prop)}, ${String(prop.nullable)}))`;
}

function generateOf(t: MResolvedRecordType, fqn: (type: string) => string) {
	const GenericRecord = fqn('org.apache.avro.generic.GenericRecord');
	const node = new CompositeGeneratorNode();
	node.append(`public static ${t.name}.Data of(${GenericRecord} obj) {`, NL);
	node.indent(methodBody => {
		methodBody.append(`return new ${t.name}DataImpl(obj);`, NL);
	});
	node.append('}', NL);
	return node;
}

function generateToString(keyProp: MResolvedBaseProperty | undefined, revProp: MResolvedBaseProperty | undefined) {
	const classBody = new CompositeGeneratorNode();
	classBody.append('public String toString() {', NL);
	classBody.indent(methodBody => {
		if (keyProp && revProp) {
			methodBody.append(
				`return "%s[%s=%s@%s=%s]".formatted(getClass().getSimpleName(), "${keyProp.name}", ${keyProp.name}(), "${revProp.name}", ${revProp.name}());`,
				NL,
			);
		} else if (keyProp) {
			methodBody.append(
				`return "%s[%s=%s]".formatted(getClass().getSimpleName(), "${keyProp.name}", ${keyProp.name}());`,
				NL,
			);
		} else if (revProp) {
			methodBody.append(
				`return "%s[@%s=%s]".formatted(getClass().getSimpleName(), "${revProp.name}", ${revProp.name}());`,
				NL,
			);
		} else {
			methodBody.append('return getClass().getSimpleName();', NL);
		}
	});
	classBody.append('}', NL);
	return classBody;
}

function generatePropertyAccessors(
	owner: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append(
		...props.flatMap(p => {
			return [generateProperty(owner, p, nativeTypeSubstitutes, interfaceBasePackage, fqn), NL];
		}),
	);
	return node;
}
