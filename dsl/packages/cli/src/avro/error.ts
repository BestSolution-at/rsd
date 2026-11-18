import { isMBuiltinType, isMResolvedUnionType, isMScalarType, MResolvedError } from '../model.js';
import type { AvroGeneratorConfig } from './generator.js';
import { AvroError, AvroType } from './avro-types.js';
import { mapBuilinType } from './utils.js';

export function generateErrorContent(error: MResolvedError, artifactConfig: AvroGeneratorConfig): AvroError {
	if (error.resolvedContentType) {
		const type = computeType(error.resolvedContentType);

		return {
			namespace: artifactConfig.namespace,
			type: 'error',
			name: error.name,
			fields: [
				{
					name: 'message',
					type: 'string',
				},
				{
					name: 'data',
					type,
				},
			],
		};
	} else {
		return {
			namespace: artifactConfig.namespace,
			name: error.name,
			type: 'error',
			fields: [
				{
					name: 'message',
					type: 'string',
				},
			],
		};
	}
}

function computeType(type: NonNullable<MResolvedError['resolvedContentType']>): AvroType | AvroType[] {
	if (isMBuiltinType(type)) {
		return mapBuilinType(type);
	} else if (isMResolvedUnionType(type)) {
		return [...type.types];
	} else if (isMScalarType(type)) {
		return 'string';
	}
	return type.name;
}
