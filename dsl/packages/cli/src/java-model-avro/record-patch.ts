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
} from '../model.js';
import { toFirstUpper, toNodeTree } from '../util.js';
import {
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
}
`,
		false,
		name => {
			if (name === 'properties') {
				return PatchBodyContent(name, t, nativeTypeSubstitutes, interfaceBasePackage, fqn);
			} else if (name === 'changeTypes') {
				return ChangeTypes(allResolvedRecordProperties(t), nativeTypeSubstitutes, interfaceBasePackage, fqn);
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
	const GenericRecord = fqn('org.apache.avro.generic.GenericRecord');

	if (prop.variant === 'union' || prop.variant === 'record') {
		return toNodeTree(`
static class ${prefix}SetChangeImpl extends _ChangeSupport.ObjectElementsChange<${type}> implements ${prefix}SetChange {
	${prefix}SetChangeImpl(${GenericRecord} data) {
			super(data, ${prop.type}DataImpl::of);
	}
}
`);
	}

	if (prop.variant === 'inline-enum') {
		const GenericEnumSymbol = fqn('org.apache.avro.generic.GenericEnumSymbol');
		return toNodeTree(`
static class ${prefix}SetChangeImpl extends _ChangeSupport.ValueElementsChange<${type}> implements ${prefix}SetChange {
	${prefix}SetChangeImpl(${GenericRecord} data) {
			super(data, $v -> _EnumSupport.fromAvro((${GenericEnumSymbol}<?>)$v, ${type}.class));
		}
	}
`);
	}

	if (prop.variant === 'enum') {
		const GenericEnumSymbol = fqn('org.apache.avro.generic.GenericEnumSymbol');
		return toNodeTree(`
static class ${prefix}SetChangeImpl extends _ChangeSupport.ValueElementsChange<${type}> implements ${prefix}SetChange {
	${prefix}SetChangeImpl(${GenericRecord} data) {
			super(data, $v -> _EnumSupport.${prop.type}FromAvro((${GenericEnumSymbol}<?>)$v));
		}
	}
`);
	}

	if (prop.variant === 'scalar') {
		return toNodeTree(`
static class ${prefix}SetChangeImpl extends _ChangeSupport.ValueElementsChange<${type}> implements ${prefix}SetChange {
	${prefix}SetChangeImpl(${GenericRecord} data) {
			super(data, $v -> _ScalarSupport.${prop.type}FromAvro((String)$v));
		}
	}
`);
	}

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
		const type = fqn(`${interfaceBasePackage}.${prop.type}`);
		return toNodeTree(`
static class ${prefix}MergeChangeImpl extends _ChangeSupport.ListMergeAddRemoveUpdateImpl<${type}.Data, ${type}.Patch, String> implements ${prefix}MergeChange {
	${prefix}MergeChangeImpl(${GenericRecord} data) {
		super(data, ${prop.type}DataImpl::of, ${prop.type}PatchImpl::of, _AvroUtils::mapString);
	}
}
`);
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
		return toNodeTree(`
static class ${prefix}MergeChangeImpl extends _ChangeSupport.ListMergeAddRemoveImpl<${type}, ${type}> implements ${prefix}MergeChange {
	${prefix}MergeChangeImpl(${GenericRecord} data) {
		super(data, 
			$v -> _ScalarSupport.${prop.type}FromAvro((String)$v), 
			$v -> _ScalarSupport.${prop.type}FromAvro((String)$v)
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
