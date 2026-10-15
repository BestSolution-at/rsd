import {
	allResolvedRecordProperties,
	isMBuiltinType,
	isMKeyProperty,
	isMPropertyNoneInlineProperty,
	isMResolvedProperty,
	isMResolvedUnionType,
	isMRevisionProperty,
	MPropertyInlineProperty,
	MPropertyNoneInlineProperty,
	MResolvedBaseProperty,
	MResolvedMixinType,
	MResolvedPropery,
	MResolvedRecordType,
	MResolvedUnionType,
} from '../model.js';
import { AvroEnum, AvroField, AvroPrimitiveType, AvroRecord, AvroType, AvroTypeRef } from './avro-types.js';
import { AvroGeneratorConfig } from './generator.js';
import { mapBuilinType } from './utils.js';

export function generateRecordContent(record: MResolvedRecordType, artifactConfig: AvroGeneratorConfig): AvroRecord[] {
	const fields = allResolvedRecordProperties(record).map(prop => mapProperty(prop, record.name));
	const rv: AvroRecord[] = [
		{
			type: 'record',
			name: record.name,
			namespace: artifactConfig.namespace,
			doc: record.doc,
			//aliases: record.aliases,
			fields,
		},
	];
	if (record.patchable) {
		rv.push(...generatePatchableRecord(record, artifactConfig));
	}
	return rv;
}

function generatePatchableRecord(record: MResolvedRecordType, artifactConfig: AvroGeneratorConfig): AvroRecord[] {
	const fields: AvroField[] = [];
	const allProps = allResolvedRecordProperties(record);
	fields.push(
		...allProps.filter(p => isMKeyProperty(p) || isMRevisionProperty(p)).map(p => mapProperty(p, record.name)),
	);
	fields.push(...allProps.filter(isMResolvedProperty).map(p => mapPatchableProperty(p, record.name)));

	const arrayReplaceRecords = allProps
		.filter(isMResolvedProperty)
		.filter(p => p.array)
		.map(p => mapPatchableArrayReplaceType(p, record.name, artifactConfig));
	const arrayMergeRecords = allProps
		.filter(isMResolvedProperty)
		.filter(p => p.array)
		.map(p => mapPatchableArrayMergeType(p, record.name, artifactConfig));
	/*const singleReplaceUnionRecords = allProps
		.filter(isMResolvedProperty)
		.filter(p => !p.array)
		.filter(p => p.variant === 'union' || p.variant === 'record')
		.map(p => mapPatchableSingleReplaceType(p, record.name));
	const singleMergeUnionRecords = allProps
		.filter(isMResolvedProperty)
		.filter(p => !p.array)
		.filter(p => p.variant === 'union' || p.variant === 'record')
		.map(p => mapPatchableSingleMergeType(p, record.name));*/

	return [
		{
			type: 'record',
			name: `${record.name}Patch`,
			namespace: artifactConfig.namespace,
			fields,
		},
		...arrayReplaceRecords,
		...arrayMergeRecords,
		// ...singleReplaceUnionRecords,
		// ...singleMergeUnionRecords,
	];
}

function mapProperty(prop: MResolvedBaseProperty, recordName: string): AvroField {
	if (isMKeyProperty(prop) || isMRevisionProperty(prop)) {
		return {
			name: prop.name,
			type: mapBuilinType(prop.type),
		};
	} else {
		const type = computePropertyType(prop, recordName);
		if (prop.array) {
			return {
				name: prop.name,
				type: addNullAndOptional(
					{
						type: 'array',
						items: type,
					},
					prop,
				),
			};
		} else {
			return {
				name: prop.name,
				type: addNullAndOptional(type, prop),
			};
		}
	}
}

function addNullAndOptional(type: readonly AvroType[] | AvroType, prop: MResolvedPropery): AvroType | AvroType[] {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const rv: AvroType[] = Array.isArray(type) ? [...type] : [type];
	if (prop.optional) {
		rv.push('null');
	}
	if (prop.nullable) {
		rv.push('NULL');
	}
	return rv.length === 1 ? rv[0] : rv;
}

function computePropertyType(prop: MResolvedPropery, recordName: string) {
	if (isMPropertyNoneInlineProperty(prop)) {
		return computePropertyType_NoneInlineEnum(prop);
	} else {
		return computePropertyType_InlineEnum(prop, recordName);
	}
}

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
type NoneStructuredType = AvroPrimitiveType | AvroTypeRef;

function computePropertyType_NoneInlineEnum(
	prop: MPropertyNoneInlineProperty & {
		resolved: {
			owner: MResolvedMixinType | MResolvedRecordType;
			resolvedObjectType: () => MResolvedUnionType | MResolvedRecordType | undefined;
		};
	},
): NoneStructuredType | NoneStructuredType[] {
	const type: NoneStructuredType[] = [];

	if (prop.variant === 'union') {
		const unionType = prop.resolved.resolvedObjectType();
		if (isMResolvedUnionType(unionType)) {
			type.push(...unionType.types);
		}
	} else if (prop.variant === 'record') {
		type.push(prop.type);
	} else if (prop.variant === 'enum') {
		type.push(prop.type);
	} else if (prop.variant === 'builtin') {
		if (isMBuiltinType(prop.type)) {
			type.push(mapBuilinType(prop.type));
		} else {
			throw new Error(`Unsupported property built-in type ${prop.type}`);
		}
	} else {
		// Scalar-Type
		type.push('string');
	}

	return type.length === 1 ? type[0] : type;
}

function computePropertyType_InlineEnum(prop: MPropertyInlineProperty, recordName: string): AvroEnum {
	return {
		type: 'enum',
		name: `${recordName}_${prop.name}`,
		symbols: prop.type.entries.map(e => e.name),
	};
}

function mapPatchableProperty(prop: MResolvedPropery, recordName: string): AvroField {
	if (prop.variant === 'record' || prop.variant === 'union' || prop.array) {
		if (prop.array) {
			const type: AvroType[] = ['null'];
			if (prop.nullable || prop.optional) {
				type.push('NULL');
			}
			type.push(`${recordName}_${prop.name}PatchReplace`);
			type.push(`${recordName}_${prop.name}PatchMerge`);

			return {
				name: prop.name,
				type,
			};
		} else {
			const type: AvroType[] = ['null'];
			if (prop.nullable || prop.optional) {
				type.push('NULL');
			}
			type.push(recordName);
			type.push(`${recordName}Patch`);
			return {
				name: prop.name,
				type,
			};
		}
	} else {
		const rv = mapProperty(prop, recordName);
		if (typeof rv.type === 'string') {
			rv.type = ['null', rv.type];
		} else if (Array.isArray(rv.type) && !rv.type.includes('null')) {
			rv.type = ['null', ...rv.type];
		}
		return rv;
	}
}

function mapPatchableArrayReplaceType(
	prop: MResolvedPropery,
	recordName: string,
	artifactConfig: AvroGeneratorConfig,
): AvroRecord {
	const type = computePropertyType(prop, recordName);
	return {
		type: 'record',
		name: `${recordName}_${prop.name}PatchReplace`,
		namespace: artifactConfig.namespace,
		fields: [
			{
				name: 'elements',
				type: {
					type: 'array',
					items: type,
				},
			},
		],
	};
}

function mapPatchableArrayMergeType(
	prop: MResolvedPropery,
	recordName: string,
	artifactConfig: AvroGeneratorConfig,
): AvroRecord {
	const type = computePropertyType(prop, recordName);
	if (prop.variant === 'record' || prop.variant === 'union') {
		return {
			type: 'record',
			name: `${recordName}_${prop.name}PatchMerge`,
			namespace: artifactConfig.namespace,
			fields: [
				{
					name: 'additions',
					type: {
						type: 'array',
						items: type,
					},
				},
				{
					name: 'updates',
					type: {
						type: 'array',
						// eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions -- we know this is a string
						items: Array.isArray(type) ? type.map(t => `${t}Patch`) : `${type}Patch`,
					},
				},
				{
					name: 'removals',
					type: {
						type: 'array',
						items: 'string',
					},
				},
			],
		};
	} else {
		return {
			type: 'record',
			name: `${recordName}_${prop.name}PatchMerge`,
			namespace: artifactConfig.namespace,
			fields: [
				{
					name: 'additions',
					type: {
						type: 'array',
						items: type,
					},
				},
				{
					name: 'removals',
					type: {
						type: 'array',
						items: type,
					},
				},
			],
		};
	}
}
