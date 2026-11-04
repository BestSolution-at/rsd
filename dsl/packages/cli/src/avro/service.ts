import {
	isMBuiltinType,
	isMParameterNoneInlineEnumType,
	isMResolvedUnionType,
	isMReturnTypeNoneInlineEnumType,
	MParameter,
	MParameterNoneInlineEnumType,
	MResolvedOperation,
	MResolvedRSDModel,
	MResolvedService,
	MReturnType,
	MReturnTypeNoneInlineEnumType,
} from '../model.js';
import { AvroMessage, AvroProtocol, AvroRequestParameter, AvroType } from './avro-types.js';
import { AvroGeneratorConfig, generateAvroSpec } from './generator.js';
import { mapBuilinType } from './utils.js';

export function generateProtocolContent(
	service: MResolvedService,
	model: MResolvedRSDModel,
	artifactConfig: AvroGeneratorConfig,
): AvroProtocol {
	const messages: Record<string, AvroMessage> = {};

	for (const operation of service.operations) {
		messages[operation.name] = mapOperationToAvroMessage(operation, service.name, model);
	}

	return {
		namespace: artifactConfig.namespace,
		protocol: service.name,
		doc: service.doc,
		types: generateAvroSpec(model, artifactConfig),
		messages,
	};
}

function mapOperationToAvroMessage(
	operation: MResolvedOperation,
	serviceName: string,
	model: MResolvedRSDModel,
): AvroMessage {
	return {
		request: operation.parameters.map(parameter =>
			mapToRequestParameters(parameter, operation.name, serviceName, model),
		),
		response: mapReturnType(operation.resultType, operation.name, model),
		doc: operation.doc,
		errors: operation.operationErrors.length > 0 ? operation.operationErrors.map(error => error.error) : undefined,
	};
}

function mapToRequestParameters(
	parameter: MParameter,
	operationName: string,
	serviceName: string,
	model: MResolvedRSDModel,
): AvroRequestParameter {
	if (isMParameterNoneInlineEnumType(parameter)) {
		return mapNoneInlineEnumTypeRequestParameters(parameter, model);
	} else {
		if (parameter.array) {
			return {
				name: parameter.name,
				type: {
					type: 'array',
					items: {
						type: 'enum',
						name: `${serviceName}_${operationName}_${parameter.name}_Enum`,
						symbols: parameter.type.entries.map(e => e.name),
					},
				},
			};
		} else {
			return {
				name: parameter.name,
				type: {
					type: 'enum',
					name: `${serviceName}_${operationName}_${parameter.name}_Enum`,
					symbols: parameter.type.entries.map(e => e.name),
				},
			};
		}
	}
}

function mapNoneInlineEnumTypeRequestParameters(
	parameter: MParameterNoneInlineEnumType,
	model: MResolvedRSDModel,
): AvroRequestParameter {
	const type: AvroType[] = [];
	if (parameter.optional) {
		type.push('null');
	}
	if (parameter.nullable) {
		type.push('NULL');
	}

	if (parameter.variant === 'union') {
		const unionTypes = model.elements.filter(isMResolvedUnionType).find(u => u.name === parameter.type)?.types ?? [];
		type.push(...(parameter.patch ? unionTypes.map(t => `${t}Patch`) : unionTypes));
	} else if (parameter.variant === 'record') {
		if (parameter.patch) {
			type.push(`${parameter.type}Patch`);
		} else {
			type.push(parameter.type);
		}
	} else if (parameter.variant === 'enum') {
		type.push(parameter.type);
	} else if (parameter.variant === 'builtin') {
		if (isMBuiltinType(parameter.type)) {
			type.push(mapBuilinType(parameter.type));
		} else {
			throw new Error(`Unsupported property built-in type ${parameter.type}`);
		}
	} else if (parameter.variant === 'stream') {
		type.push('bytes');
	} else {
		// Scalar-Type
		type.push('string');
	}

	if (parameter.array) {
		return {
			name: parameter.name,
			type: {
				type: 'array',
				items: type.length === 1 ? type[0] : type,
			},
		};
	}

	return {
		name: parameter.name,
		type: type.length === 1 ? type[0] : type,
	};
}

function mapReturnType(
	resultType: MReturnType | undefined,
	operationName: string,
	model: MResolvedRSDModel,
): AvroType | AvroType[] {
	if (resultType === undefined) {
		return 'null';
	} else if (isMReturnTypeNoneInlineEnumType(resultType)) {
		return mapNoneInlineReturnType(resultType, model);
	} else {
		if (resultType.array) {
			return {
				type: 'array',
				items: {
					type: 'enum',
					name: `${operationName}_Result_Enum`,
					symbols: resultType.type.entries.map(e => e.name),
				},
			};
		}
		return {
			type: 'enum',
			name: `${operationName}_Result_Enum`,
			symbols: resultType.type.entries.map(e => e.name),
		};
	}
}

function mapNoneInlineReturnType(
	resultType: MReturnTypeNoneInlineEnumType,
	model: MResolvedRSDModel,
): AvroType | AvroType[] {
	const type: AvroType[] = [];

	if (resultType.variant === 'union') {
		const unionTypes = model.elements.filter(isMResolvedUnionType).find(u => u.name === resultType.type)?.types;
		type.push(...(unionTypes ?? []));
	} else if (resultType.variant === 'record') {
		type.push(resultType.type);
	} else if (resultType.variant === 'enum') {
		type.push(resultType.type);
	} else if (resultType.variant === 'builtin') {
		if (isMBuiltinType(resultType.type)) {
			type.push(mapBuilinType(resultType.type));
		} else {
			throw new Error(`Unsupported property built-in type ${resultType.type}`);
		}
	} else if (resultType.variant === 'stream') {
		type.push('bytes');
	} else {
		// Scalar-Type
		type.push('string');
	}

	if (resultType.array) {
		return {
			type: 'array',
			items: type.length === 1 ? type[0] : type,
		};
	}

	return type.length === 1 ? type[0] : type;
}
