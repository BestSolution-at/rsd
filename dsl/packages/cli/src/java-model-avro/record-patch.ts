import { CompositeGeneratorNode, NL } from 'langium/generate';

import { computeAPITypeNG, JavaNativeTypeSubstitutes } from '../java-gen-utils.js';
import {
	MResolvedRecordType,
	MResolvedRSDModel,
	MResolvedBaseProperty,
	allResolvedRecordProperties,
	isMKeyProperty,
	isMRevisionProperty,
	isMResolvedProperty,
	MResolvedPropery,
	isMPropertyNoneInlineProperty,
	isMPropertyBuiltin,
	MPropertyNoneInlineProperty,
	isMResolvedUnionType,
	MResolvedUnionType,
} from '../model.js';
import { toFirstUpper, toNode, toNodeTree } from '../util.js';
import {
	PropertyBuilderMethod,
	PropertyMethod,
	PropertyMethodBuiltinContent,
	PropertyMethodEnumContent,
	PropertyMethodInlineEnumContent,
	PropertyMethodScalarContent,
} from './shared-ng.js';
import { generatePatchPropertyAccessorSignatur } from '../java-model-api/shared.js';

export function generateRecordPatchContent(
	t: MResolvedRecordType,
	model: MResolvedRSDModel,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
): CompositeGeneratorNode {
	const Interface = fqn(`${interfaceBasePackage}.${t.name}`);
	const GenericRecord = fqn('org.apache.avro.generic.GenericRecord');

	return toNodeTree(
		`
public class ${t.name}PatchImpl extends _BaseDataImpl implements ${Interface}.Patch {
	%changeTypes%
	${t.name}PatchImpl(${GenericRecord} data) {
		super(data);
	}
	%properties%

	public static ${Interface}.Patch of(${GenericRecord} data) {
		return new ${t.name}PatchImpl(data);
	}

	%builder%

	public static ${Interface}.PatchBuilder builder() {
		return new PatchBuilderImpl();
	}
}
`,
		false,
		name => {
			if (name === 'properties') {
				return PatchBodyContent(name, t, nativeTypeSubstitutes, interfaceBasePackage, fqn);
			} else if (name === 'changeTypes') {
				return ChangeTypes(allResolvedRecordProperties(t), nativeTypeSubstitutes, interfaceBasePackage, fqn);
			} else if (name === 'builder') {
				return Builder(t, nativeTypeSubstitutes, interfaceBasePackage, fqn);
			}
			return undefined;
		},
	);
}

function PatchBodyContent(
	name: string,
	t: MResolvedRecordType,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	if (name === 'properties') {
		return PatchBodyContentProperties(allResolvedRecordProperties(t), nativeTypeSubstitutes, interfaceBasePackage, fqn);
	}
	return undefined;
}

function PatchBodyContentProperties(
	props: MResolvedBaseProperty[],
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const keyRevisionNodes = props
		.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
		.map(prop => PropertyMethod(prop, nativeTypeSubstitutes, basePackageName, fqn).prepend(NL));

	const standardProps = props
		.filter(isMResolvedProperty)
		.filter(p => !p.readonly)
		.map(p => {
			return PatchPropertyMethod(p, nativeTypeSubstitutes, basePackageName, fqn).prepend(NL);
		});

	return new CompositeGeneratorNode(...keyRevisionNodes, ...standardProps);
}

function PatchPropertyMethod(
	property: MResolvedPropery,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const signature = generatePatchPropertyAccessorSignatur(property, nativeTypeSubstitutes, basePackageName, fqn);
	return toNodeTree(
		`
@Override
${signature} {
	%patchPropertyMethod%
}
`,
		false,
		name => {
			if (name === 'patchPropertyMethod') {
				if (property.array) {
					return PatchArrayPropertyMethodBody(property);
				} else {
					return PatchPropertyMethodBody(property, nativeTypeSubstitutes, basePackageName, fqn);
				}
			}
			return undefined;
		},
	);
}

function PatchArrayPropertyMethodBody(property: MResolvedPropery) {
	return PatchArrayPropertyMethodBodyForScalar(property);
}

function PatchArrayPropertyMethodBodyForScalar(property: MResolvedPropery) {
	const nullablePart = property.optional || property.nullable ? 'Nil' : 'Opt';
	const prefix = toFirstUpper(property.name);
	return toNodeTree(`
return _AvroUtils.map${nullablePart}Object(data, "${property.name}",
	o -> _ChangeSupport.of(o, 
			"${property.resolved.owner.name}_${property.name}PatchReplace", 
			"${property.resolved.owner.name}_${property.name}PatchMerge", 
			${prefix}SetChangeImpl::new, 
			${prefix}MergeChangeImpl::new));
`);
}

function PatchPropertyMethodBody(
	property: MResolvedPropery,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	if (property.variant === 'record' || property.variant === 'union') {
		return PatchPropertyMethodBodyForRecordOrUnion(property);
	} else {
		return PatchPropertyMethodBodyForScalar(property, nativeTypeSubstitutes, basePackageName, fqn);
	}
}

function PatchPropertyMethodBodyForRecordOrUnion(property: MResolvedPropery): CompositeGeneratorNode | undefined {
	const nullablePart = property.optional || property.nullable ? 'Nil' : 'Opt';

	if (property.variant === 'union') {
		return new CompositeGeneratorNode(
			`return _AvroUtils.map${nullablePart}Object(data, "${property.name}", o -> ${property.type}DataImpl.isSupportedType(o) ? ${property.type}DataImpl.of(o) : ${property.type}PatchImpl.of(o));`,
		);
	} else if (property.variant === 'record') {
		return new CompositeGeneratorNode(
			`return _AvroUtils.map${nullablePart}Object(data, "${property.name}", o -> _ChangeSupport.of(o, "${property.type}", "${property.type}Patch", ${property.type}DataImpl::of, ${property.type}PatchImpl::of));`,
		);
	}
	console.warn(`Unhandled property variant: ${property.variant}`);
	return undefined;
}

function PatchPropertyMethodBodyForScalar(
	property: MResolvedPropery,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
): CompositeGeneratorNode | undefined {
	if (isMPropertyNoneInlineProperty(property)) {
		if (property.variant === 'builtin') {
			if (isMPropertyBuiltin(property)) {
				return PropertyMethodBuiltinContent({
					name: property.name,
					type: property.type,
					nullable: property.nullable || property.optional,
					optional: true,
					array: false,
				});
			}
			console.warn(`Unhandled builtin property: ${property.name}`);
			return undefined;
		} else if (property.variant === 'enum') {
			return PropertyMethodEnumContent({
				...property,
				nullable: property.nullable || property.optional,
				optional: true,
				array: false,
			});
		}
		return PropertyMethodScalarContent({
			...property,
			nullable: property.nullable || property.optional,
			optional: true,
			array: false,
		});
	} else {
		return PropertyMethodInlineEnumContent(
			{
				...property,
				nullable: property.nullable || property.optional,
				optional: true,
				array: false,
			},
			nativeTypeSubstitutes,
			basePackageName,
			fqn,
		);
	}
}

function ChangeTypes(
	props: MResolvedBaseProperty[],
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const result = props
		.filter(isMResolvedProperty)
		.filter(prop => !prop.readonly)
		.filter(prop => prop.array)
		.flatMap(prop => {
			return [
				SetChange(prop, nativeTypeSubstitutes, interfaceBasePackage, fqn),
				ListChange(prop, nativeTypeSubstitutes, interfaceBasePackage, fqn),
			];
		});
	return new CompositeGeneratorNode(...result);
}

function SetChange(
	prop: MResolvedPropery,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
): CompositeGeneratorNode {
	const prefix = toFirstUpper(prop.name);
	const type = computeAPITypeNG(prop, nativeTypeSubstitutes, interfaceBasePackage, fqn, {
		withArray: false,
		withOptional: false,
	});
	if (prop.variant === 'union' || prop.variant === 'record') {
		return SetChangeUnionRecord(prefix, type, fqn, prop);
	} else if (prop.variant === 'inline-enum') {
		return SetChangeInlineEnum(prefix, type, fqn);
	} else if (prop.variant === 'enum') {
		return SetChangeEnum(prefix, type, fqn, prop);
	} else if (prop.variant === 'scalar') {
		return SetChangeScalar(prefix, type, fqn, prop);
	}
	return SetChangeBuiltin(prefix, type, fqn);
}

function SetChangeUnionRecord(
	prefix: string,
	type: string,
	fqn: (type: string) => string,
	prop: MPropertyNoneInlineProperty,
) {
	const GenericRecord = fqn('org.apache.avro.generic.GenericRecord');
	return toNodeTree(`
static class ${prefix}SetChangeImpl extends _ChangeSupport.ObjectElementsChange<${type}> implements ${prefix}SetChange {
	${prefix}SetChangeImpl(${GenericRecord} data) {
			super(data, ${prop.type}DataImpl::of);
	}
}
`);
}

function SetChangeInlineEnum(prefix: string, type: string, fqn: (type: string) => string) {
	const GenericRecord = fqn('org.apache.avro.generic.GenericRecord');
	const GenericEnumSymbol = fqn('org.apache.avro.generic.GenericEnumSymbol');
	return toNodeTree(`
static class ${prefix}SetChangeImpl extends _ChangeSupport.ValueElementsChange<${type}> implements ${prefix}SetChange {
	${prefix}SetChangeImpl(${GenericRecord} data) {
			super(data, $v -> _EnumSupport.fromAvro((${GenericEnumSymbol}<?>)$v, ${type}.class));
		}
	}
`);
}

function SetChangeEnum(prefix: string, type: string, fqn: (type: string) => string, prop: MPropertyNoneInlineProperty) {
	const GenericEnumSymbol = fqn('org.apache.avro.generic.GenericEnumSymbol');
	const GenericRecord = fqn('org.apache.avro.generic.GenericRecord');
	return toNodeTree(`
static class ${prefix}SetChangeImpl extends _ChangeSupport.ValueElementsChange<${type}> implements ${prefix}SetChange {
	${prefix}SetChangeImpl(${GenericRecord} data) {
			super(data, $v -> _EnumSupport.${prop.type}FromAvro((${GenericEnumSymbol}<?>)$v));
		}
	}
`);
}

function SetChangeScalar(
	prefix: string,
	type: string,
	fqn: (type: string) => string,
	prop: MPropertyNoneInlineProperty,
) {
	const GenericRecord = fqn('org.apache.avro.generic.GenericRecord');
	const Objects = fqn('java.util.Objects');
	return toNodeTree(`
static class ${prefix}SetChangeImpl extends _ChangeSupport.ValueElementsChange<${type}> implements ${prefix}SetChange {
	${prefix}SetChangeImpl(${GenericRecord} data) {
			super(data, $v -> _ScalarSupport.${prop.type}FromAvro(${Objects}.toString($v)));
		}
	}
`);
}

function SetChangeBuiltin(prefix: string, type: string, fqn: (type: string) => string) {
	const GenericRecord = fqn('org.apache.avro.generic.GenericRecord');
	return toNodeTree(`
static class ${prefix}SetChangeImpl extends _ChangeSupport.ValueElementsChange<${type}> implements ${prefix}SetChange {
	${prefix}SetChangeImpl(${GenericRecord} data) {
			super(data, _AvroUtils::map${type});
		}
	}
`);
}

function ListChange(
	prop: MResolvedPropery,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const prefix = toFirstUpper(prop.name);
	const GenericRecord = fqn('org.apache.avro.generic.GenericRecord');

	if (prop.variant === 'union' || prop.variant === 'record') {
		return ListChangeUnionRecord(prefix, prop, interfaceBasePackage, fqn);
	}

	const type = computeAPITypeNG(prop, nativeTypeSubstitutes, interfaceBasePackage, fqn, {
		withArray: false,
		withOptional: false,
	});

	if (prop.variant === 'inline-enum') {
		const GenericEnumSymbol = fqn('org.apache.avro.generic.GenericEnumSymbol');
		return toNodeTree(`
static class ${prefix}MergeChangeImpl extends _ChangeSupport.ListMergeAddRemoveImpl<${type}, ${type}> implements ${prefix}MergeChange {
	${prefix}MergeChangeImpl(${GenericRecord} data) {
		super(data, 
			$v -> _EnumSupport.fromAvro((${GenericEnumSymbol}<?>)$v, ${type}.class), 
			$v ->_EnumSupport.fromAvro((${GenericEnumSymbol}<?>)$v, ${type}.class)
		);
	}
}
`);
	}

	if (prop.variant === 'enum') {
		const GenericEnumSymbol = fqn('org.apache.avro.generic.GenericEnumSymbol');
		return toNodeTree(`
static class ${prefix}MergeChangeImpl extends _ChangeSupport.ListMergeAddRemoveImpl<${type}, ${type}> implements ${prefix}MergeChange {
	${prefix}MergeChangeImpl(${GenericRecord} data) {
		super(data, 
			$v -> _EnumSupport.${prop.type}FromAvro((${GenericEnumSymbol}<?>)$v), 
			$v ->_EnumSupport.${prop.type}FromAvro((${GenericEnumSymbol}<?>)$v)
		);
	}
}
`);
	}

	if (prop.variant === 'scalar') {
		const Objects = fqn('java.util.Objects');
		return toNodeTree(`
static class ${prefix}MergeChangeImpl extends _ChangeSupport.ListMergeAddRemoveImpl<${type}, ${type}> implements ${prefix}MergeChange {
	${prefix}MergeChangeImpl(${GenericRecord} data) {
		super(data, 
			$v -> _ScalarSupport.${prop.type}FromAvro(${Objects}.toString($v)), 
			$v -> _ScalarSupport.${prop.type}FromAvro(${Objects}.toString($v))
		);
	}
}
`);
	}

	return toNodeTree(`
static class ${prefix}MergeChangeImpl extends _ChangeSupport.ListMergeAddRemoveImpl<${type}, ${type}> implements ${prefix}MergeChange {
	${prefix}MergeChangeImpl(${GenericRecord} data) {
		super(data, _AvroUtils::map${type}, _AvroUtils::map${type});
	}
}
`);
}

function ListChangeUnionRecord(
	prefix: string,
	prop: MPropertyNoneInlineProperty,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const type = fqn(`${interfaceBasePackage}.${prop.type}`);
	const GenericRecord = fqn('org.apache.avro.generic.GenericRecord');
	return toNodeTree(`
static class ${prefix}MergeChangeImpl extends _ChangeSupport.ListMergeAddRemoveUpdateImpl<${type}.Data, ${type}.Patch, String> implements ${prefix}MergeChange {
	${prefix}MergeChangeImpl(${GenericRecord} data) {
		super(data, ${prop.type}DataImpl::of, ${prop.type}PatchImpl::of, _AvroUtils::mapString);
	}
}
`);
}

function Builder(
	t: MResolvedRecordType,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const GenericRecordBuilder = fqn('org.apache.avro.generic.GenericRecordBuilder');
	return toNodeTree(
		`
public static class PatchBuilderImpl implements ${t.name}.PatchBuilder {
	private final ${GenericRecordBuilder} $builder = _AvroUtils.newBuilder(_AvroSchema.AvroTypes.${t.name}Patch);
	%KeyRevisionProps%
	%PropertyBuilderProps%
	public ${t.name}.Patch build() {
		return ${t.name}PatchImpl.of($builder.build());
	}
}
`,
		true,
		key => {
			if (key === 'KeyRevisionProps') {
				return KeyRevisionProps(t, nativeTypeSubstitutes, basePackageName, fqn);
			} else if (key === 'PropertyBuilderProps') {
				return PropertyBuilderProps(t, nativeTypeSubstitutes, basePackageName, fqn);
			}
			return undefined;
		},
	);
}

function KeyRevisionProps(
	t: MResolvedRecordType,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const keyRevisionNodes = allResolvedRecordProperties(t)
		.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
		.map(prop =>
			PropertyBuilderMethod(prop, `${t.name}.PatchBuilder`, nativeTypeSubstitutes, basePackageName, fqn).prepend(NL),
		);

	return new CompositeGeneratorNode(...keyRevisionNodes);
}

function PropertyBuilderProps(
	t: MResolvedRecordType,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const propertyNodes = allResolvedRecordProperties(t)
		.filter(isMResolvedProperty)
		.filter(p => !p.readonly)
		.map(p => PropertyPatchBuilderMethod(t, p, nativeTypeSubstitutes, basePackageName, fqn));
	return new CompositeGeneratorNode(...propertyNodes);
}

function PropertyPatchBuilderMethod(
	t: MResolvedRecordType,
	property: MResolvedPropery,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	return toNodeTree(
		`
@Override
public ${t.name}.PatchBuilder ${property.name}(${computeSignatureType(property, nativeTypeSubstitutes, basePackageName, fqn)} value) {
	$builder.set("${property.name}", _AvroUtils.toAvro(
		value, 
		${computeDefaultTransform(property)},
		${String(property.nullable || property.optional)}));
	return this;
}
%WithMethod%
%ArrayMethods%
`,
		false,
		key => {
			if (key === 'WithMethod') {
				return WithMethod(t, property, basePackageName, fqn);
			} else if (key === 'ArrayMethods') {
				return ArrayMethods(t, property, nativeTypeSubstitutes, basePackageName, fqn);
			}
			return undefined;
		},
	);
}

function computeDefaultTransform(property: MResolvedPropery) {
	if (property.variant === 'enum') {
		return `_EnumSupport::toAvro`;
	} else if (property.variant === 'scalar') {
		return `_ScalarSupport::toAvro`;
	}
	return 'null';
}

function computeSignatureType(
	property: MResolvedPropery,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	if (
		property.variant === 'builtin' ||
		property.variant === 'enum' ||
		property.variant === 'inline-enum' ||
		property.variant === 'scalar'
	) {
		if (property.array) {
			return `Patch.${toFirstUpper(property.name)}Change`;
		}

		return computeAPITypeNG(property, nativeTypeSubstitutes, basePackageName, fqn, {
			withArray: false,
			withOptional: false,
		});
	} else {
		if (!property.array) {
			return fqn(`${basePackageName}.${property.type}`);
		} else {
			const prefix = toFirstUpper(property.name);
			return `Patch.${prefix}Change`;
		}
	}
}

function WithMethod(
	t: MResolvedRecordType,
	property: MResolvedPropery,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	if (!property.array && (property.variant === 'record' || property.variant === 'union')) {
		const Function = fqn('java.util.function.Function');
		const type = fqn(`${basePackageName}.${property.type}`);
		return toNodeTree(
			`

public <T extends ${type}.Builder> ${t.name}.PatchBuilder with${toFirstUpper(property.name)}(Class<T> clazz, ${Function}<T, ${type}> block) {
	%withMethodContent%
}`,
			false,
			key => {
				if (key === 'withMethodContent') {
					return WithMethodContent(property, basePackageName, fqn);
				}
				return undefined;
			},
		);
	}
	return undefined;
}

function WithMethodContent(
	property: MResolvedPropery & MPropertyNoneInlineProperty,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const resolvedObjectType = property.resolved.resolvedObjectType();
	if (isMResolvedUnionType(resolvedObjectType)) {
		return WithMethodContentUnion(resolvedObjectType, property, basePackageName, fqn);
	} else {
		return WithMethodContentRecord(property);
	}
}

function WithMethodContentRecord(property: MResolvedPropery & MPropertyNoneInlineProperty) {
	const type = property.type;
	const name = property.name;
	return toNodeTree(`
		${type}.Builder b;
		if(clazz == ${type}.DataBuilder.class ) {
			b = ${type}DataImpl.builder();
		} else if (clazz == ${type}.PatchBuilder.class ) {
			b = ${type}PatchImpl.builder();
		} else {
			throw new IllegalArgumentException("Unsupported builder type %s".formatted(clazz));
		}
		return ${name}(block.apply(clazz.cast(b)));`);
}

function WithMethodContentUnion(
	resolvedObjectType: MResolvedUnionType,
	property: MResolvedPropery & MPropertyNoneInlineProperty,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const dataBuilders = resolvedObjectType.types.flatMap((e, idx) => {
		const Type = fqn(`${basePackageName}.${e}`);
		const start =
			idx === 0 ? `if (clazz == ${Type}.DataBuilder.class) {` : `} else if (clazz == ${Type}.DataBuilder.class) {`;
		return [start, [`b = ${e}DataImpl.builder();`]];
	});

	const patchBuilders = resolvedObjectType.types.flatMap(e => {
		const Type = fqn(`${basePackageName}.${e}`);
		return [`} else if (clazz == ${Type}.PatchBuilder.class) {`, [`b = ${e}PatchImpl.builder();`]];
	});

	return toNode([
		`${property.type}.Builder b;`,
		...dataBuilders,
		...patchBuilders,
		'} else {',
		['throw new IllegalArgumentException("Unsupported builder type %s".formatted(clazz));'],
		'}',
	]).append(`return ${property.name}(block.apply(clazz.cast(b)));`);
}

function ArrayMethods(
	t: MResolvedRecordType,
	property: MResolvedPropery,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	if (!property.array) {
		return undefined;
	}
	return new CompositeGeneratorNode(
		ArrayMethod_Set(t, property, nativeTypeSubstitutes, basePackageName, fqn),
		NL,
		NL,
		ArrayMethod_Merge(t, property, nativeTypeSubstitutes, basePackageName, fqn),
	);
}

function ArrayMethod_Set(
	t: MResolvedRecordType,
	property: MResolvedPropery,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const type = computeAPITypeNG(property, nativeTypeSubstitutes, basePackageName, fqn, {
		withArray: true,
		withOptional: false,
	});
	const GenericData = fqn('org.apache.avro.generic.GenericData');
	return toNodeTree(
		`
		@Override
		public ${t.name}.PatchBuilder ${property.name}(${type} ${property.name}) {
			var $schema = _AvroSchema.getInstance();
			var $type = _AvroSchema.AvroTypes.${t.name}_${property.name}PatchReplace;

			var $change = new ${GenericData}.Record($schema.getTypeSchema($type));
			$change.put("additions", _AvroUtils.toAvroList(${property.name}, null));

			$builder.set("${property.name}", $change);
			return this;
		}`,
		false,
	);
}

function ArrayMethod_Merge(
	t: MResolvedRecordType,
	property: MResolvedPropery,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	if (property.variant === 'union' || property.variant === 'record') {
		const baseType = fqn(`${basePackageName}.${property.type}`);
		const List = fqn('java.util.List');
		const GenericData = fqn('org.apache.avro.generic.GenericData');
		return toNodeTree(
			`
			@Override
			public ${t.name}.PatchBuilder ${property.name}(${List}<${baseType}.Data> additions, ${List}<${baseType}.Patch> updates, ${List}<String> removals) {
				var $schema = _AvroSchema.getInstance();
				var $type = _AvroSchema.AvroTypes.${t.name}_${property.name}PatchMerge;

				var $change = new ${GenericData}.Record($schema.getTypeSchema($type));
				$change.put("additions", _AvroUtils.toAvroList(additions, null));
				$change.put("updates", _AvroUtils.toAvroList(updates, null));
				$change.put("removals", _AvroUtils.toAvroList(removals, null));

				$builder.set("${property.name}", $change);

				return this;
			}
		`,
			false,
		);
	} else {
		const type = computeAPITypeNG(property, nativeTypeSubstitutes, basePackageName, fqn, {
			withArray: true,
			withOptional: false,
		});
		const GenericData = fqn('org.apache.avro.generic.GenericData');
		return toNodeTree(
			`
			@Override
			public ${t.name}.PatchBuilder ${property.name}(${type} additions, ${type} removals) {
				var $schema = _AvroSchema.getInstance();
				var $type = _AvroSchema.AvroTypes.${t.name}_${property.name}PatchMerge;

				var $change = new ${GenericData}.Record($schema.getTypeSchema($type));
				$change.put("additions", _AvroUtils.toAvroList(additions, null));
				$change.put("removals", _AvroUtils.toAvroList(removals, null));

				$builder.set("${property.name}", $change);
				return this;
			}`,
			false,
		);
	}
}
