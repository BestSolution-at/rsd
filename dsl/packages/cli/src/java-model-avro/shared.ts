import { CompositeGeneratorNode, NL } from 'langium/generate';
import { computeAPIType, computeAPITypeNG, JavaNativeTypeSubstitutes } from '../java-gen-utils.js';
import {
	isMBuiltinType,
	isMInlineEnumType,
	isMKeyProperty,
	isMResolvedProperty,
	isMRevisionProperty,
	MBuiltinType,
	MResolvedBaseProperty,
	MResolvedRecordType,
} from '../model.js';
import { toCamelCaseIdentifier, toFirstUpper } from '../util.js';

export function generateProperty(
	owner: MResolvedRecordType,
	prop: MResolvedBaseProperty,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
): CompositeGeneratorNode {
	const type = computeAPITypeNG(prop, nativeTypeSubstitutes, interfaceBasePackage, fqn);

	const node = new CompositeGeneratorNode();
	node.append('@Override', NL);
	node.append(`public ${type} ${prop.name}() {`, NL);

	node.indent(methodBody => {
		methodBody.append(generatePropertyContent(prop, nativeTypeSubstitutes, interfaceBasePackage, fqn));
	});

	node.append('}', NL);
	return node;
}

function generatePropertyContent(
	prop: MResolvedBaseProperty,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	let mapper = '// Invalid code path';
	const array = !isMKeyProperty(prop) && !isMRevisionProperty(prop) && prop.array;

	if (isMBuiltinType(prop.type)) {
		if (array) {
			mapper = builtinSimpleJSONArrayAccessNG({
				type: prop.type,
				name: prop.name,
				optional: prop.optional,
				nullable: prop.nullable,
			});
		} else {
			if (isMKeyProperty(prop) || isMRevisionProperty(prop) || (!prop.optional && !prop.nullable)) {
				mapper = builtinSimpleJSONAccessNG({
					name: prop.name,
					type: prop.type,
				});
			} else {
				mapper = builtinJSONAccessNG({
					name: prop.name,
					type: prop.type,
					optional: prop.optional,
					nullable: prop.nullable,
				});
			}
		}
	} else if (isMInlineEnumType(prop.type)) {
		if (isMResolvedProperty(prop)) {
			let nullablePart = '';
			if (prop.optional && prop.nullable) {
				nullablePart = 'Nil';
			} else if (prop.nullable) {
				nullablePart = 'Null';
			} else if (prop.optional) {
				nullablePart = 'Opt';
			}
			const Type = computeAPIType(prop, nativeTypeSubstitutes, interfaceBasePackage, fqn, true);
			if (array) {
				mapper = `_AvroUtils.map${nullablePart}Enums(data, "${prop.name}", $g -> _EnumSupport.fromAvro($g, ${Type}.class))`;
			} else {
				mapper = `_AvroUtils.map${nullablePart}Enum(data, "${prop.name}", $g -> _EnumSupport.fromAvro($g, ${Type}.class))`;
			}
		}
	} else {
		if (!isMKeyProperty(prop) && !isMRevisionProperty(prop)) {
			let nullablePart = '';
			if (prop.optional && prop.nullable) {
				nullablePart = 'Nil';
			} else if (prop.nullable) {
				nullablePart = 'Null';
			} else if (prop.optional) {
				nullablePart = 'Opt';
			}

			if (prop.variant === 'enum') {
				if (array) {
					mapper = `_AvroUtils.map${nullablePart}Enums(data, "${prop.name}", _EnumSupport::${prop.type}FromAvro)`;
				} else {
					mapper = `_AvroUtils.map${nullablePart}Enum(data, "${prop.name}", _EnumSupport::${prop.type}FromAvro)`;
				}
			} else if (prop.variant === 'scalar') {
				if (array) {
					mapper = `_AvroUtils.map${nullablePart}Literals(data, "${prop.name}", _ScalarSupport::${prop.type}FromAvro)`;
				} else {
					mapper = `_AvroUtils.map${nullablePart}Literal(data, "${prop.name}", _ScalarSupport::${prop.type}FromAvro)`;
				}
			} else {
				let nullablePart = '';
				if (prop.optional && prop.nullable) {
					nullablePart = 'Nil';
				} else if (prop.nullable) {
					nullablePart = 'Null';
				} else if (prop.optional) {
					nullablePart = 'Opt';
				}

				if (array) {
					mapper = `_AvroUtils.map${nullablePart}Objects(data, "${prop.name}", ${prop.type}DataImpl::of)`;
				} else {
					mapper = `_AvroUtils.map${nullablePart}Object(data, "${prop.name}", ${prop.type}DataImpl::of)`;
				}
			}
		}
	}

	const node = new CompositeGeneratorNode();
	node.append(`return ${mapper};`, NL);
	return node;
}

export function builtinSimpleJSONAccessNG(property: { type: MBuiltinType; name: string }): string {
	switch (property.type) {
		case 'boolean':
			return `_AvroUtils.mapBoolean(data, "${property.name}")`;
		case 'double':
			return `_AvroUtils.mapDouble(data, "${property.name}")`;
		case 'float':
			return `_AvroUtils.mapFloat(data, "${property.name}")`;
		case 'int':
			return `_AvroUtils.mapInt(data, "${property.name}")`;
		case 'local-date':
			return `_AvroUtils.mapLocalDate(data, "${property.name}")`;
		case 'local-date-time':
			return `_AvroUtils.mapLocalDateTime(data, "${property.name}")`;
		case 'local-time':
			return `_AvroUtils.mapLocalTime(data, "${property.name}")`;
		case 'long':
			return `_AvroUtils.mapLong(data, "${property.name}")`;
		case 'offset-date-time':
			return `_AvroUtils.mapOffsetDateTime(data, "${property.name}")`;
		case 'short':
			return `_AvroUtils.mapShort(data, "${property.name}")`;
		case 'string':
			return `_AvroUtils.mapString(data, "${property.name}")`;
		case 'zoned-date-time':
			return `_AvroUtils.mapZonedDateTime(data, "${property.name}")`;
	}
}

export function builtinSimpleJSONArrayAccessNG(property: {
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

function builtinJSONAccessNG(property: {
	type: MBuiltinType;
	name: string;
	nullable: boolean;
	optional: boolean;
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
