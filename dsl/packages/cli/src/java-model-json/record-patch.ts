import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
	allResolvedRecordProperties,
	isMBuiltinFloatType,
	isMBuiltinIntegerType,
	isMBuiltinType,
	isMKeyProperty,
	isMResolvedProperty,
	isMRevisionProperty,
	MKeyProperty,
	MResolvedBaseProperty,
	MResolvedPropery,
	MResolvedRecordType,
	MResolvedRSDModel,
	MRevisionProperty,
} from '../model.js';
import {
	builtinBuilderAccess,
	generatePatchBuilderPropertyAccessor,
	generatePatchPropertyAccessor,
	generatePropertyNG,
} from './shared.js';
import { computeAPIType, primitiveToObject } from '../java-gen-utils.js';
import { toFirstUpper, toNode } from '../util.js';

export function generateRecordPatchContent(
	t: MResolvedRecordType,
	model: MResolvedRSDModel,
	nativeTypeSubstitues: Record<string, string> | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
): CompositeGeneratorNode {
	const node = new CompositeGeneratorNode();
	const Interface = fqn(`${interfaceBasePackage}.${t.name}`);
	const JsonObject = fqn('jakarta.json.JsonObject');

	const allProps = allResolvedRecordProperties(t);
	/*const keyProp = allProps.find(isMKeyProperty);
  const revProp = allProps.find(isMRevisionProperty);*/

	node.append(`public class ${t.name}PatchImpl extends _BaseDataImpl implements ${Interface}.Patch {`, NL);
	node.indent(classBody => {
		classBody.append(ChangeTypes(allProps, nativeTypeSubstitues, interfaceBasePackage, fqn));
		classBody.append(`${t.name}PatchImpl(${JsonObject} data) {`, NL);
		classBody.indent(initBody => {
			initBody.append('super(data);', NL);
		});
		classBody.append('}', NL, NL);
		classBody.append(generatePropertyAccessors(t, allProps, nativeTypeSubstitues, interfaceBasePackage, fqn));
		classBody.append(generatePatchBuilderImpl(t, model, allProps, nativeTypeSubstitues, interfaceBasePackage, fqn));
		classBody.append(NL, `public static ${t.name}.Patch of(JsonObject obj) {`, NL);
		classBody.indent(methodBody => {
			methodBody.append(`return new ${t.name}PatchImpl(obj);`, NL);
		});
		classBody.append('}', NL);
		classBody.append(NL, 'public static PatchBuilderImpl builder() {', NL);
		classBody.indent(methodBody => {
			methodBody.append('return new PatchBuilderImpl();', NL);
		});
		classBody.append('}', NL);
	});
	node.append('}', NL);

	return node;
}

function ChangeTypes(
	props: MResolvedBaseProperty[],
	nativeTypeSubstitues: Record<string, string> | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	return toNode([
		...props
			.filter(isMResolvedProperty)
			.filter(p => !p.readonly)
			.filter(p => p.array)
			.flatMap(p => [
				SetChange(p, nativeTypeSubstitues, interfaceBasePackage, fqn),
				ListChange(p, nativeTypeSubstitues, interfaceBasePackage, fqn),
			]),
	]);
}

function SetChange(
	prop: MResolvedPropery,
	nativeTypeSubstitues: Record<string, string> | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const type = primitiveToObject(computeAPIType(prop, nativeTypeSubstitues, interfaceBasePackage, fqn, true));
	const prefix = toFirstUpper(prop.name);

	if (prop.variant === 'union' || prop.variant === 'record') {
		return toNode([
			`static class ${prefix}SetChangeImpl extends _ChangeSupport.ObjectElementsChange<${type}> implements ${prefix}SetChange {`,
			[`${prefix}SetChangeImpl(JsonObject data) {`, [`super(data, ${prop.type}DataImpl::of);`], '}'],
			'}',
		]);
	} else {
		return toNode([
			`static class ${prefix}SetChangeImpl extends _ChangeSupport.ValueElementsChange<${type}> implements ${prefix}SetChange {`,
			[`${prefix}SetChangeImpl(JsonObject data) {`, [`super(data, v -> ${lambdaBodyComputer(prop, type, fqn)});`], '}'],
			'}',
		]);
	}
}

function lambdaBodyComputer(prop: MResolvedPropery, type: string, fqn: (type: string) => string) {
	if (isMBuiltinType(prop.type)) {
		if (prop.type === 'boolean') {
			const JsonValue = fqn('jakarta.json.JsonValue');
			return `v.getValueType() == ${JsonValue}.ValueType.TRUE`;
		} else if (isMBuiltinFloatType(prop.type)) {
			const JsonNumber = fqn('jakarta.json.JsonNumber');
			if (prop.type === 'double') {
				return `((${JsonNumber}) v).doubleValue()`;
			} else if (prop.type === 'float') {
				return `((${JsonNumber})v).numberValue().floatValue()`;
			} else {
				throw new Error(`Unsupported float type "${prop.type}"`);
			}
		} else if (isMBuiltinIntegerType(prop.type)) {
			const JsonNumber = fqn('jakarta.json.JsonNumber');
			if (prop.type === 'short') {
				return `((${JsonNumber}) v).numberValue().shortValue()`;
			} else if (prop.type === 'int') {
				return `((${JsonNumber}) v).intValue()`;
			} else if (prop.type === 'long') {
				return `((${JsonNumber}) v).longValue()`;
			} else {
				throw new Error(`Unsupported int type "${prop.type}"`);
			}
		} else if (prop.type === 'string') {
			const JsonString = fqn('jakarta.json.JsonString');
			return `((${JsonString}) v).getString()`;
		} else if (prop.type === 'local-date' || prop.type === 'local-date-time' || prop.type === 'zoned-date-time') {
			const JsonString = fqn('jakarta.json.JsonString');
			return `${type}.parse(((${JsonString})v).getString())`;
		} else {
			throw new Error(`Unknown builtin type ${prop.type}`);
		}
	} else if (prop.variant === 'enum' || prop.variant === 'inline-enum') {
		const JsonString = fqn('jakarta.json.JsonString');
		return `${type}.valueOf(((${JsonString})v).getString())`;
	} else if (prop.variant === 'scalar') {
		const JsonString = fqn('jakarta.json.JsonString');
		return `${type}.of(((${JsonString}) v).getString())`;
	} else {
		throw new Error(`Unsupported variant/type combination '${prop.variant}/${prop.type}'`);
	}
}

function ListChange(
	prop: MResolvedPropery,
	nativeTypeSubstitues: Record<string, string> | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const prefix = toFirstUpper(prop.name);

	if (prop.variant === 'union' || prop.variant === 'record') {
		const type = fqn(`${interfaceBasePackage}.${prop.type}`);
		const JsonString = fqn('jakarta.json.JsonString');
		return toNode([
			`static class ${prefix}MergeChangeImpl extends _ChangeSupport.ListMergeAddRemoveUpdateImpl<${type}.Data, ${type}.Patch, String> implements ${prefix}MergeChange {`,
			[
				`${prefix}MergeChangeImpl(JsonObject data) {`,
				[
					//
					`super(data, ${prop.type}DataImpl::of, ${prop.type}PatchImpl::of, v -> ((${JsonString})v).getString() );`,
				],
				'}',
			],
			'}',
		]);
	} else {
		const type = primitiveToObject(computeAPIType(prop, nativeTypeSubstitues, interfaceBasePackage, fqn, true));

		const lambdaBody = lambdaBodyComputer(prop, type, fqn);
		return toNode([
			`static class ${prefix}MergeChangeImpl extends _ChangeSupport.ListMergeAddRemoveImpl<${type}, ${type}> implements ${prefix}MergeChange {`,
			[`${prefix}MergeChangeImpl(JsonObject data) {`, [`super(data, v -> ${lambdaBody}, v -> ${lambdaBody});`], '}'],
			'}',
		]);
	}
}

function generatePatchBuilderImpl(
	t: MResolvedRecordType,
	model: MResolvedRSDModel,
	props: MResolvedBaseProperty[],
	nativeTypeSubstitues: Record<string, string> | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const Json = fqn('jakarta.json.Json');
	const JsonObjectBuilder = fqn('jakarta.json.JsonObjectBuilder');
	const node = new CompositeGeneratorNode();
	node.append(`public static class PatchBuilderImpl implements ${t.name}.PatchBuilder {`, NL);
	node.indent(classBody => {
		classBody.append(`private ${JsonObjectBuilder} $builder = ${Json}.createObjectBuilder();`, NL, NL);
		if (t.resolved.unions.length > 0) {
			classBody.append('public PatchBuilderImpl() {', NL);
			classBody.indent(methodBody => {
				const key = (t.resolved.unions[0].descriminatorAliases ?? {})[t.name] ?? t.name;
				methodBody.append(`$builder.add("@type", "patch:${key}");`, NL);
			});
			classBody.append('}', NL, NL);
		}
		classBody.append(
			...props
				.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
				.flatMap(p => {
					return [
						generateKeyRevBuilderPropertyAccessor(
							t,
							p as (MKeyProperty | MRevisionProperty) & MResolvedBaseProperty, // FIXME Typesystem woes!?!
							nativeTypeSubstitues,
							interfaceBasePackage,
							fqn,
						),
						NL,
					];
				}),
		);
		classBody.append(
			...props
				.filter(isMResolvedProperty)
				.filter(p => p.readonly === false)
				.flatMap(p => {
					return [generatePatchBuilderPropertyAccessor(t, p, nativeTypeSubstitues, interfaceBasePackage, fqn), NL];
				}),
		);
		classBody.append('@Override', NL);
		classBody.append(`public ${t.name}.Patch build() {`, NL);
		classBody.indent(methodBody => {
			methodBody.append(`return new ${t.name}PatchImpl($builder.build());`, NL);
		});
		classBody.append('}', NL);
	});

	node.append('}', NL);
	return node;
}

function generateKeyRevBuilderPropertyAccessor(
	t: MResolvedRecordType,
	p: (MKeyProperty | MRevisionProperty) & MResolvedBaseProperty,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const rv = new CompositeGeneratorNode();
	rv.append(
		`public ${t.name}.PatchBuilder ${p.name}(${computeAPIType(p as MResolvedBaseProperty, nativeTypeSubstitues, basePackageName, fqn)} ${p.name}) {`,
		NL,
	);
	rv.indent(mBody => {
		var content = builtinBuilderAccess({
			type: p.type,
			name: p.name,
		});
		mBody.append(content, ';', NL);
		mBody.append('return this;', NL);
	});
	rv.append('}', NL);

	return rv;
}

function generatePropertyAccessors(
	owner: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	nativeTypeSubstitues: Record<string, string> | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append(
		...props
			.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
			.flatMap(p => [generatePropertyNG(owner, p, nativeTypeSubstitues, interfaceBasePackage, fqn), NL]),
	);
	node.append(
		...props
			.filter(isMResolvedProperty)
			.filter(p => !p.readonly)
			.flatMap(p => {
				return [generatePatchPropertyAccessor(p, nativeTypeSubstitues, interfaceBasePackage, fqn), NL];
			}),
	);
	return node;
}
