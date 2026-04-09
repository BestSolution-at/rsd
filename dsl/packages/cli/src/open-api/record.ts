import { type JSONSchema4Object, type JSONSchema4 } from 'json-schema';
import {
	allResolvedRecordProperties,
	isMBuiltinType,
	isMInlineEnumType,
	isMKeyProperty,
	isMResolvedProperty,
	isMRevisionProperty,
	MBuiltinType,
	MResolvedBaseProperty,
	MResolvedPropery,
	MResolvedRecordType,
} from '../model.js';

export function generateRecordContent(t: MResolvedRecordType) {
	const rv: JSONSchema4 = {};
	const allProps = allResolvedRecordProperties(t);

	{
		const properties: JSONSchema4Object = {};
		allProps.forEach(p => {
			properties[p.name] = generateProperty(p);
		});

		if (t.resolved.unions.length > 0) {
			properties['@type'] = {
				type: 'string',
			};
		}

		const required = allProps.filter(p => isMKeyProperty(p) || isMRevisionProperty(p) || !p.optional).map(p => p.name);

		rv[t.name] = {
			type: 'object',
			properties,
			required: required.length === 0 ? undefined : required,
		};
	}

	if (t.patchable) {
		const properties: Record<string, unknown> = {};
		allProps
			.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
			.forEach(p => {
				properties[p.name] = generateProperty(p);
			});
		allProps.filter(isMResolvedProperty).forEach(p => {
			if (p.array) {
				properties[p.name] = generatePatchArrayProperty(t, p);
			} else {
				properties[p.name] = generatePatchProperty(p);
			}
		});
		rv[`${t.name}Patch`] = {
			type: 'object',
			properties,
			required: allProps.filter(p => isMKeyProperty(p) || isMRevisionProperty(p)).map(p => p.name),
		};
		allProps
			.filter(isMResolvedProperty)
			.filter(p => p.array)
			.forEach(p => {
				rv[`${t.name}_${p.name}PatchReplace`] = {
					type: 'object',
					properties: {
						'@type': {
							type: 'string',
						},
						elements: { ...generateProperty(p), nullable: undefined },
					},
					required: ['@type', 'elements'],
				};
				if (p.variant === 'record' || p.variant === 'union') {
					rv[`${t.name}_${p.name}PatchMerge`] = {
						type: 'object',
						properties: {
							'@type': {
								type: 'string',
							},
							additions: { ...generateProperty(p), nullable: undefined },
							updates: {
								type: 'array',
								items: {
									$ref: `#/components/schemas/${p.type}Patch`,
								},
							},
							removals: {
								type: 'array',
								items: {
									type: 'string',
								},
							},
						},
						required: ['@type', 'additions', 'removals'],
					};
				} else {
					rv[`${t.name}_${p.name}PatchMerge`] = {
						type: 'object',
						properties: {
							'@type': {
								type: 'string',
							},
							additions: generateProperty(p),
							removals: generateProperty(p),
						},
						required: ['@type', 'additions', 'removals'],
					};
				}
			});
	}
	return rv;
}

function generatePatchArrayProperty(t: MResolvedRecordType, p: MResolvedPropery): JSONSchema4 {
	const rv = {
		oneOf: [
			{
				$ref: `#/components/schemas/${t.name}_${p.name}PatchReplace`,
			},
			{
				$ref: `#/components/schemas/${t.name}_${p.name}PatchMerge`,
			},
		],
		discriminator: {
			propertyName: '@type',
			mapping: {
				replace: `#/components/schemas/${t.name}_${p.name}PatchReplace`,
				merge: `#/components/schemas/${t.name}_${p.name}PatchMerge`,
			},
		},
	};
	return rv;
}

function generatePatchProperty(p: MResolvedPropery): JSONSchema4 {
	const rv = generateProperty(p);
	if (p.optional) {
		return nullableProcessor(rv, true);
	}
	return rv;
}

function generateProperty(p: MResolvedBaseProperty): JSONSchema4 {
	if (isMKeyProperty(p) || isMRevisionProperty(p)) {
		return generateBuilinProperty(p.type);
	} else if (isMBuiltinType(p.type)) {
		return nullableProcessor(wrapToArray(generateBuilinProperty(p.type), p.array), p.nullable);
	} else if (p.variant === 'record' || p.variant === 'union' || p.variant === 'enum') {
		const type = {
			$ref: `#/components/schemas/${p.type}`,
		};
		return nullableProcessor(wrapToArray(type, p.array), p.nullable);
	} else if (p.variant === 'scalar') {
		const type = { type: 'string' } as const;
		return nullableProcessor(wrapToArray(type, p.array), p.nullable);
	} else if (p.variant === 'inline-enum' && isMInlineEnumType(p.type)) {
		const type = {
			type: 'string',
			enum: p.type.entries.map(e => e.name),
		} as const;
		return nullableProcessor(wrapToArray(type, p.array), p.nullable);
	}
	return {};
}

export function nullableProcessor(type: JSONSchema4, nullable: boolean): JSONSchema4 {
	if (nullable) {
		if (type.$ref) {
			return {
				allOf: [
					{
						$ref: type.$ref,
					},
				],
				nullable: true,
			};
		} else {
			return {
				...type,
				nullable: true,
			};
		}
	}
	return type;
}

function wrapToArray(type: JSONSchema4, array: boolean): JSONSchema4 {
	if (array) {
		return {
			type: 'array',
			items: type,
		};
	}
	return type;
}

export function generateBuilinProperty(t: MBuiltinType): JSONSchema4 {
	if (t === 'string') {
		return {
			type: 'string',
		};
	} else if (t === 'boolean') {
		return {
			type: 'boolean',
		};
	} else if (t === 'double') {
		return {
			type: 'number',
			format: 'double',
		};
	} else if (t === 'float') {
		return {
			type: 'number',
			format: 'float',
		};
	} else if (t === 'int' || t === 'short') {
		return {
			type: 'number',
			format: 'int32',
		};
	} else if (t === 'long') {
		return {
			type: 'number',
			format: 'int64',
		};
	} else if (t === 'local-date') {
		return {
			type: 'string',
			pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\d',
			format: 'date',
		};
	} else if (t === 'local-date-time') {
		return {
			type: 'string',
			pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d',
			format: 'local-date-time',
		};
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	} else if (t === 'zoned-date-time') {
		return {
			type: 'string',
			format: 'zoned-date-time',
		};
	}
	return {};
}
