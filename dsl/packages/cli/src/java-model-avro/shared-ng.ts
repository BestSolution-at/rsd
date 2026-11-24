import { CompositeGeneratorNode, NL } from 'langium/generate';

import { computeAPITypeNG, JavaNativeTypeSubstitutes } from '../java-gen-utils.js';
import {
	isMBuiltinType,
	isMKeyProperty,
	isMProperty,
	isMPropertyBuiltin,
	isMPropertyNoneInlineProperty,
	isMRevisionProperty,
	MBuiltinType,
	MInlineEnumType,
	MResolvedBaseProperty,
	MResolvedPropery,
} from '../model.js';
import { toCamelCaseIdentifier, toFirstUpper, toNodeTree } from '../util.js';

type SimpleProp = {
	name: string;
	type: string;
	nullable: boolean;
	optional: boolean;
	array: boolean;
};

export function PropertyMethod(
	prop: MResolvedBaseProperty,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const type = computeAPITypeNG(prop, nativeTypeSubstitutes, basePackageName, fqn);
	return toNodeTree(
		`
@Override
public ${type} ${prop.name}() {
		%content%
}
`,
		false,
		() => PropertyMethodContent(prop, nativeTypeSubstitutes, basePackageName, fqn),
	);
}

export function PropertyMethodContent(
	prop: MResolvedBaseProperty,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
): CompositeGeneratorNode | undefined {
	if (isMKeyProperty(prop) || isMRevisionProperty(prop)) {
		const content = builtinAvroAccess({ type: 'string', name: prop.name });
		return new CompositeGeneratorNode(`return ${content};`);
	} else {
		if (isMPropertyNoneInlineProperty(prop)) {
			if (prop.variant === 'builtin') {
				if (isMPropertyBuiltin(prop)) {
					return PropertyMethodBuiltinContent(prop);
				}
				console.warn(`Unhandled builtin property: ${prop.name}`);
				return undefined;
			}

			if (prop.variant === 'enum') {
				return PropertyMethodEnumContent(prop);
			} else if (prop.variant === 'scalar') {
				return PropertyMethodScalarContent(prop);
			}
			return PropertyMethodRecordContent(prop);
		} else {
			return PropertyMethodInlineEnumContent(prop, nativeTypeSubstitutes, interfaceBasePackage, fqn);
		}
	}
}

export function PropertyMethodBuiltinContent(prop: SimpleProp & { type: MBuiltinType }) {
	const accessor = prop.array ? builtinAvroArrayAccess : builtinAvroAccess;
	const content = accessor(prop);
	return new CompositeGeneratorNode(`return ${content};`);
}

export function PropertyMethodEnumContent(prop: SimpleProp) {
	let nullablePart = '';
	if (prop.optional && prop.nullable) {
		nullablePart = 'Nil';
	} else if (prop.nullable) {
		nullablePart = 'Null';
	} else if (prop.optional) {
		nullablePart = 'Opt';
	}
	if (prop.array) {
		return new CompositeGeneratorNode(
			`return _AvroUtils.map${nullablePart}Enums(data, "${prop.name}", _EnumSupport::${prop.type}FromAvro);`,
		);
	}
	return new CompositeGeneratorNode(
		`return _AvroUtils.map${nullablePart}Enum(data, "${prop.name}", _EnumSupport::${prop.type}FromAvro);`,
	);
}

export function PropertyMethodScalarContent(prop: SimpleProp) {
	let nullablePart = '';
	if (prop.optional && prop.nullable) {
		nullablePart = 'Nil';
	} else if (prop.nullable) {
		nullablePart = 'Null';
	} else if (prop.optional) {
		nullablePart = 'Opt';
	}

	if (prop.array) {
		return new CompositeGeneratorNode(
			`return _AvroUtils.map${nullablePart}Literals(data, "${prop.name}", _ScalarSupport::${prop.type}FromAvro);`,
		);
	}
	return new CompositeGeneratorNode(
		`return _AvroUtils.map${nullablePart}Literal(data, "${prop.name}", _ScalarSupport::${prop.type}FromAvro);`,
	);
}

export function PropertyMethodRecordContent(prop: SimpleProp) {
	let nullablePart = '';
	if (prop.optional && prop.nullable) {
		nullablePart = 'Nil';
	} else if (prop.nullable) {
		nullablePart = 'Null';
	} else if (prop.optional) {
		nullablePart = 'Opt';
	}

	if (prop.array) {
		return new CompositeGeneratorNode(
			`return _AvroUtils.map${nullablePart}Objects(data, "${prop.name}", ${prop.type}DataImpl::of);`,
		);
	} else {
		return new CompositeGeneratorNode(
			`return _AvroUtils.map${nullablePart}Object(data, "${prop.name}", ${prop.type}DataImpl::of);`,
		);
	}
}

export function PropertyMethodInlineEnumContent(
	prop: MResolvedPropery & { type: MInlineEnumType },
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const Type = computeAPITypeNG(prop, nativeTypeSubstitutes, interfaceBasePackage, fqn, {
		withArray: false,
		withOptional: false,
	});
	let nullablePart = '';
	if (prop.optional && prop.nullable) {
		nullablePart = 'Nil';
	} else if (prop.nullable) {
		nullablePart = 'Null';
	} else if (prop.optional) {
		nullablePart = 'Opt';
	}
	if (prop.array) {
		return new CompositeGeneratorNode(
			`return _AvroUtils.map${nullablePart}Enums(data, "${prop.name}", $g -> _EnumSupport.fromAvro($g, ${Type}.class));`,
		);
	}
	return new CompositeGeneratorNode(
		`return _AvroUtils.map${nullablePart}Enum(data, "${prop.name}", $g -> _EnumSupport.fromAvro($g, ${Type}.class));`,
	);
}

export function builtinAvroAccess(property: {
	type: MBuiltinType;
	name: string;
	nullable?: boolean;
	optional?: boolean;
}): string {
	let nullablePart = '';
	if (property.nullable && property.optional) {
		nullablePart = 'Nil';
	} else if (property.nullable) {
		nullablePart = 'Null';
	} else if (property.optional) {
		nullablePart = 'Opt';
	}

	switch (property.type) {
		case 'boolean':
			return `_AvroUtils.map${nullablePart}Boolean(data, "${property.name}")`;
		case 'double':
			return `_AvroUtils.map${nullablePart}Double(data, "${property.name}")`;
		case 'float':
			return `_AvroUtils.map${nullablePart}Float(data, "${property.name}")`;
		case 'int':
			return `_AvroUtils.map${nullablePart}Int(data, "${property.name}")`;
		case 'local-date':
			return `_AvroUtils.map${nullablePart}LocalDate(data, "${property.name}")`;
		case 'local-date-time':
			return `_AvroUtils.map${nullablePart}LocalDateTime(data, "${property.name}")`;
		case 'local-time':
			return `_AvroUtils.map${nullablePart}LocalTime(data, "${property.name}")`;
		case 'long':
			return `_AvroUtils.map${nullablePart}Long(data, "${property.name}")`;
		case 'offset-date-time':
			return `_AvroUtils.map${nullablePart}OffsetDateTime(data, "${property.name}")`;
		case 'short':
			return `_AvroUtils.map${nullablePart}Short(data, "${property.name}")`;
		case 'string':
			return `_AvroUtils.map${nullablePart}String(data, "${property.name}")`;
		case 'zoned-date-time':
			return `_AvroUtils.map${nullablePart}ZonedDateTime(data, "${property.name}")`;
	}
}

export function builtinAvroArrayAccess(property: {
	type: MBuiltinType;
	name: string;
	optional: boolean;
	nullable: boolean;
}): string {
	if (property.optional && property.nullable) {
		return `_AvroUtils.mapNil${toFirstUpper(toCamelCaseIdentifier(property.type))}s(data, "${property.name}")`;
	} else if (property.optional) {
		return `_AvroUtils.mapOpt${toFirstUpper(toCamelCaseIdentifier(property.type))}s(data, "${property.name}")`;
	} else if (property.nullable) {
		return `_AvroUtils.mapNull${toFirstUpper(toCamelCaseIdentifier(property.type))}s(data, "${property.name}")`;
	}
	return `_AvroUtils.map${toFirstUpper(toCamelCaseIdentifier(property.type))}s(data, "${property.name}")`;
}

export function PropertyBuilderMethod(
	prop: MResolvedBaseProperty,
	builderName: string,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const type = computeAPITypeNG(prop, nativeTypeSubstitutes, basePackageName, fqn);
	return toNodeTree(
		`
@Override
public ${builderName} ${prop.name}(${type} ${prop.name}) {
		%content%
}
`,
		false,
		() => PropertyBuilderMethodContent(prop),
	);
}

function PropertyBuilderMethodContent(prop: MResolvedBaseProperty) {
	const node = new CompositeGeneratorNode();
	if (isMProperty(prop)) {
		if (prop.nullable) {
			node.append(`if (${prop.name} == null) {`, NL);
			node.indent(block => {
				block.append(`$builder.set("${prop.name}", _AvroUtils.NULL);`, NL);
				block.append('return this;', NL);
			});
			node.append('}', NL);
		}
	}

	node.append(generateBuilderCall(prop), ';', NL);
	node.append('return this;', NL);

	return node;
}

function generateBuilderCall(prop: MResolvedBaseProperty): string {
	if (isMKeyProperty(prop) || isMRevisionProperty(prop)) {
		return builtinBuilderCall(prop);
	}

	if (prop.array) {
		if (isMBuiltinType(prop.type)) {
			return builtinBuilderArrayCall({
				type: prop.type,
				name: prop.name,
			});
		} else if (prop.variant === 'scalar') {
			return `$builder.set("${prop.name}", ${prop.name}.stream().map($e -> _ScalarSupport.${prop.type}ToAvro($e)).toList())`;
		} else if (prop.variant === 'inline-enum') {
			return `$builder.set("${prop.name}", ${prop.name}.stream().map( $e -> _EnumSupport.toAvro($e, _AvroSchema.AvroTypes.${prop.resolved.owner.name}_${prop.name})).toList())`;
		} else if (prop.variant === 'enum') {
			return `$builder.set("${prop.name}", ${prop.name}.stream().map(_EnumSupport::${prop.type}ToAvro).toList())`;
		} else {
			return `$builder.set("${prop.name}", ${prop.name}.stream().map( $e -> ((_BaseDataImpl) $e).data).toList())`;
		}
	}

	if (isMBuiltinType(prop.type)) {
		return builtinBuilderCall({ type: prop.type, name: prop.name });
	} else if (prop.variant === 'scalar') {
		return `$builder.set("${prop.name}", _ScalarSupport.${prop.type}ToAvro(${prop.name}))`;
	} else if (prop.variant === 'inline-enum') {
		return `$builder.set("${prop.name}", _EnumSupport.toAvro(${prop.name}, _AvroSchema.AvroTypes.${prop.resolved.owner.name}_${prop.name}))`;
	} else if (prop.variant === 'enum') {
		return `$builder.set("${prop.name}", _EnumSupport.${prop.type}ToAvro(${prop.name}))`;
	} else {
		return `$builder.set("${prop.name}", ((_BaseDataImpl) ${prop.name}).data)`;
	}
}

function builtinBuilderCall(property: { type: MBuiltinType; name: string }): string {
	switch (property.type) {
		case 'boolean':
		case 'double':
		case 'float':
		case 'int':
		case 'long':
		case 'short':
		case 'string':
			return `$builder.set("${property.name}", ${property.name})`;
		case 'local-date':
		case 'local-date-time':
		case 'local-time':
		case 'offset-date-time':
		case 'zoned-date-time':
			return `$builder.set("${property.name}", _AvroUtils.toString(${property.name}))`;
	}
}

function builtinBuilderArrayCall(property: { type: MBuiltinType; name: string }): string {
	switch (property.type) {
		case 'boolean':
			return `$builder.set("${property.name}", ${property.name})`;
		case 'double':
			return `$builder.set("${property.name}", ${property.name})`;
		case 'float':
			return `$builder.set("${property.name}", ${property.name})`;
		case 'int':
			return `$builder.set("${property.name}", ${property.name})`;
		case 'local-date':
			return `$builder.set("${property.name}", ${property.name}.stream().map(Object::toString).toList())`;
		case 'local-date-time':
			return `$builder.set("${property.name}", ${property.name}.stream().map(Object::toString).toList())`;
		case 'local-time':
			return `$builder.set("${property.name}", ${property.name}.stream().map(Object::toString).toList())`;
		case 'offset-date-time':
			return `$builder.set("${property.name}", ${property.name}.stream().map(Object::toString).toList())`;
		case 'long':
			return `$builder.set("${property.name}", ${property.name})`;
		case 'short':
			return `$builder.set("${property.name}", ${property.name})`;
		case 'string':
			return `$builder.set("${property.name}", ${property.name})`;
		case 'zoned-date-time':
			return `$builder.set("${property.name}", ${property.name}.stream().map(Object::toString).toList())`;
	}
}
