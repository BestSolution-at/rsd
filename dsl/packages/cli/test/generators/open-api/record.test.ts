import { beforeAll, describe, expect, test } from 'vitest';
import { isMResolvedRecordType, MResolvedRSDModel } from '../../../src/model.js';
import { findListElement, sampleModel } from '../test-utils.js';
import { generateRecordContent } from '../../../src/open-api/record.js';

let model: MResolvedRSDModel;

beforeAll(() => {
	model = sampleModel();
});

type RecordTest = {
	name: string;
	result: Record<string, unknown>;
};

const RECORD_TESTS: RecordTest[] = [
	{
		name: 'SimpleRecord_KeyVersion',
		result: {
			SimpleRecord_KeyVersion: {
				type: 'object',
				properties: {
					key: {
						type: 'string',
					},
					version: {
						type: 'string',
					},
				},
				required: ['key', 'version'],
			},
		},
	},
	{
		name: 'SimpleRecord_KeyVersion_Int_Int',
		result: {
			SimpleRecord_KeyVersion_Int_Int: {
				type: 'object',
				properties: {
					key: {
						type: 'number',
						format: 'int32',
					},
					version: {
						type: 'number',
						format: 'int32',
					},
				},
				required: ['key', 'version'],
			},
		},
	},
	{
		name: 'SimpleRecord',
		result: {
			SimpleRecord: {
				type: 'object',
				properties: {
					key: {
						type: 'string',
					},
					version: {
						type: 'string',
					},
					value: {
						type: 'string',
					},
				},
				required: ['key', 'version', 'value'],
			},
		},
	},
	{
		name: 'SimpleRecord_Basic',
		result: {
			SimpleRecord_Basic: {
				type: 'object',
				properties: {
					valueBoolean: {
						type: 'boolean',
					},
					valueShort: {
						type: 'number',
						format: 'int32',
					},
					valueInt: {
						type: 'number',
						format: 'int32',
					},
					valueLong: {
						type: 'number',
						format: 'int64',
					},
					valueFloat: {
						type: 'number',
						format: 'float',
					},
					valueDouble: {
						type: 'number',
						format: 'double',
					},
					valueString: {
						type: 'string',
					},
					valueLocalDate: {
						type: 'string',
						pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\d',
						format: 'date',
					},
					valueLocalDateTime: {
						type: 'string',
						pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d',
						format: 'local-date-time',
					},
					valueLocalTime: {
						type: 'string',
						pattern: '\\d\\d:\\d\\d:\\d\\d',
						format: 'time',
					},
					valueOffsetDateTime: {
						type: 'string',
						format: 'date-time',
					},
					valueZonedDateTime: {
						type: 'string',
						format: 'zoned-date-time',
					},
				},
				required: [
					'valueBoolean',
					'valueShort',
					'valueInt',
					'valueLong',
					'valueFloat',
					'valueDouble',
					'valueString',
					'valueLocalDate',
					'valueLocalDateTime',
					'valueLocalTime',
					'valueOffsetDateTime',
					'valueZonedDateTime',
				],
			},
		},
	},
	{
		name: 'SimpleRecord_Basic_Optional',
		result: {
			SimpleRecord_Basic_Optional: {
				type: 'object',
				properties: {
					valueBoolean: {
						type: 'boolean',
					},
					valueShort: {
						type: 'number',
						format: 'int32',
					},
					valueInt: {
						type: 'number',
						format: 'int32',
					},
					valueLong: {
						type: 'number',
						format: 'int64',
					},
					valueFloat: {
						type: 'number',
						format: 'float',
					},
					valueDouble: {
						type: 'number',
						format: 'double',
					},
					valueString: {
						type: 'string',
					},
					valueLocalDate: {
						type: 'string',
						pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\d',
						format: 'date',
					},
					valueLocalDateTime: {
						type: 'string',
						pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d',
						format: 'local-date-time',
					},
					valueLocalTime: {
						type: 'string',
						pattern: '\\d\\d:\\d\\d:\\d\\d',
						format: 'time',
					},
					valueOffsetDateTime: {
						type: 'string',
						format: 'date-time',
					},
					valueZonedDateTime: {
						type: 'string',
						format: 'zoned-date-time',
					},
				},
				required: undefined,
			},
		},
	},
	{
		name: 'SimpleRecord_Basic_Null',
		result: {
			SimpleRecord_Basic_Null: {
				type: 'object',
				properties: {
					valueBoolean: {
						type: 'boolean',
						nullable: true,
					},
					valueShort: {
						type: 'number',
						format: 'int32',
						nullable: true,
					},
					valueInt: {
						type: 'number',
						format: 'int32',
						nullable: true,
					},
					valueLong: {
						type: 'number',
						format: 'int64',
						nullable: true,
					},
					valueFloat: {
						type: 'number',
						format: 'float',
						nullable: true,
					},
					valueDouble: {
						type: 'number',
						format: 'double',
						nullable: true,
					},
					valueString: {
						type: 'string',
						nullable: true,
					},
					valueLocalDate: {
						type: 'string',
						pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\d',
						format: 'date',
						nullable: true,
					},
					valueLocalDateTime: {
						type: 'string',
						pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d',
						format: 'local-date-time',
						nullable: true,
					},
					valueLocalTime: {
						type: 'string',
						pattern: '\\d\\d:\\d\\d:\\d\\d',
						format: 'time',
						nullable: true,
					},
					valueOffsetDateTime: {
						type: 'string',
						format: 'date-time',
						nullable: true,
					},
					valueZonedDateTime: {
						type: 'string',
						format: 'zoned-date-time',
						nullable: true,
					},
				},
				required: [
					'valueBoolean',
					'valueShort',
					'valueInt',
					'valueLong',
					'valueFloat',
					'valueDouble',
					'valueString',
					'valueLocalDate',
					'valueLocalDateTime',
					'valueLocalTime',
					'valueOffsetDateTime',
					'valueZonedDateTime',
				],
			},
		},
	},
	{
		name: 'SimpleRecord_Basic_Optional_Null',
		result: {
			SimpleRecord_Basic_Optional_Null: {
				type: 'object',
				properties: {
					valueBoolean: {
						type: 'boolean',
						nullable: true,
					},
					valueShort: {
						type: 'number',
						format: 'int32',
						nullable: true,
					},
					valueInt: {
						type: 'number',
						format: 'int32',
						nullable: true,
					},
					valueLong: {
						type: 'number',
						format: 'int64',
						nullable: true,
					},
					valueFloat: {
						type: 'number',
						format: 'float',
						nullable: true,
					},
					valueDouble: {
						type: 'number',
						format: 'double',
						nullable: true,
					},
					valueString: {
						type: 'string',
						nullable: true,
					},
					valueLocalDate: {
						type: 'string',
						pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\d',
						format: 'date',
						nullable: true,
					},
					valueLocalDateTime: {
						type: 'string',
						pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d',
						format: 'local-date-time',
						nullable: true,
					},
					valueLocalTime: {
						type: 'string',
						pattern: '\\d\\d:\\d\\d:\\d\\d',
						format: 'time',
						nullable: true,
					},
					valueOffsetDateTime: {
						type: 'string',
						format: 'date-time',
						nullable: true,
					},
					valueZonedDateTime: {
						type: 'string',
						format: 'zoned-date-time',
						nullable: true,
					},
				},
				required: undefined,
			},
		},
	},
	{
		name: 'SimpleRecord_Basic_List',
		result: {
			SimpleRecord_Basic_List: {
				type: 'object',
				properties: {
					valueBoolean: {
						type: 'array',
						items: {
							type: 'boolean',
						},
					},
					valueShort: {
						type: 'array',
						items: {
							type: 'number',
							format: 'int32',
						},
					},
					valueInt: {
						type: 'array',
						items: {
							type: 'number',
							format: 'int32',
						},
					},
					valueLong: {
						type: 'array',
						items: {
							type: 'number',
							format: 'int64',
						},
					},
					valueFloat: {
						type: 'array',
						items: {
							type: 'number',
							format: 'float',
						},
					},
					valueDouble: {
						type: 'array',
						items: {
							type: 'number',
							format: 'double',
						},
					},
					valueString: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
					valueLocalDate: {
						type: 'array',
						items: {
							type: 'string',
							pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\d',
							format: 'date',
						},
					},
					valueLocalDateTime: {
						type: 'array',
						items: {
							type: 'string',
							pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d',
							format: 'local-date-time',
						},
					},
					valueLocalTime: {
						type: 'array',
						items: {
							type: 'string',
							pattern: '\\d\\d:\\d\\d:\\d\\d',
							format: 'time',
						},
					},
					valueOffsetDateTime: {
						type: 'array',
						items: {
							type: 'string',
							format: 'date-time',
						},
					},
					valueZonedDateTime: {
						type: 'array',
						items: {
							type: 'string',
							format: 'zoned-date-time',
						},
					},
				},
				required: [
					'valueBoolean',
					'valueShort',
					'valueInt',
					'valueLong',
					'valueFloat',
					'valueDouble',
					'valueString',
					'valueLocalDate',
					'valueLocalDateTime',
					'valueLocalTime',
					'valueOffsetDateTime',
					'valueZonedDateTime',
				],
			},
		},
	},
	{
		name: 'SimpleRecord_Basic_List_Optional',
		result: {
			SimpleRecord_Basic_List_Optional: {
				type: 'object',
				properties: {
					valueBoolean: {
						type: 'array',
						items: {
							type: 'boolean',
						},
					},
					valueShort: {
						type: 'array',
						items: {
							type: 'number',
							format: 'int32',
						},
					},
					valueInt: {
						type: 'array',
						items: {
							type: 'number',
							format: 'int32',
						},
					},
					valueLong: {
						type: 'array',
						items: {
							type: 'number',
							format: 'int64',
						},
					},
					valueFloat: {
						type: 'array',
						items: {
							type: 'number',
							format: 'float',
						},
					},
					valueDouble: {
						type: 'array',
						items: {
							type: 'number',
							format: 'double',
						},
					},
					valueString: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
					valueLocalDate: {
						type: 'array',
						items: {
							type: 'string',
							pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\d',
							format: 'date',
						},
					},
					valueLocalDateTime: {
						type: 'array',
						items: {
							type: 'string',
							pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d',
							format: 'local-date-time',
						},
					},
					valueLocalTime: {
						type: 'array',
						items: {
							type: 'string',
							pattern: '\\d\\d:\\d\\d:\\d\\d',
							format: 'time',
						},
					},
					valueOffsetDateTime: {
						type: 'array',
						items: {
							type: 'string',
							format: 'date-time',
						},
					},
					valueZonedDateTime: {
						type: 'array',
						items: {
							type: 'string',
							format: 'zoned-date-time',
						},
					},
				},
				required: undefined,
			},
		},
	},
	{
		name: 'SimpleRecord_Basic_List_Null',
		result: {
			SimpleRecord_Basic_List_Null: {
				type: 'object',
				properties: {
					valueBoolean: {
						type: 'array',
						items: {
							type: 'boolean',
						},
						nullable: true,
					},
					valueShort: {
						type: 'array',
						items: {
							type: 'number',
							format: 'int32',
						},
						nullable: true,
					},
					valueInt: {
						type: 'array',
						items: {
							type: 'number',
							format: 'int32',
						},
						nullable: true,
					},
					valueLong: {
						type: 'array',
						items: {
							type: 'number',
							format: 'int64',
						},
						nullable: true,
					},
					valueFloat: {
						type: 'array',
						items: {
							type: 'number',
							format: 'float',
						},
						nullable: true,
					},
					valueDouble: {
						type: 'array',
						items: {
							type: 'number',
							format: 'double',
						},
						nullable: true,
					},
					valueString: {
						type: 'array',
						items: {
							type: 'string',
						},
						nullable: true,
					},
					valueLocalDate: {
						type: 'array',
						items: {
							type: 'string',
							pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\d',
							format: 'date',
						},
						nullable: true,
					},
					valueLocalDateTime: {
						type: 'array',
						items: {
							type: 'string',
							pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d',
							format: 'local-date-time',
						},
						nullable: true,
					},
					valueLocalTime: {
						type: 'array',
						items: {
							type: 'string',
							pattern: '\\d\\d:\\d\\d:\\d\\d',
							format: 'time',
						},
						nullable: true,
					},
					valueOffsetDateTime: {
						type: 'array',
						items: {
							type: 'string',
							format: 'date-time',
						},
						nullable: true,
					},
					valueZonedDateTime: {
						type: 'array',
						items: {
							type: 'string',
							format: 'zoned-date-time',
						},
						nullable: true,
					},
				},
				required: [
					'valueBoolean',
					'valueShort',
					'valueInt',
					'valueLong',
					'valueFloat',
					'valueDouble',
					'valueString',
					'valueLocalDate',
					'valueLocalDateTime',
					'valueLocalTime',
					'valueOffsetDateTime',
					'valueZonedDateTime',
				],
			},
		},
	},
	{
		name: 'SimpleRecord_Basic_List_Optional_Null',
		result: {
			SimpleRecord_Basic_List_Optional_Null: {
				type: 'object',
				properties: {
					valueBoolean: {
						type: 'array',
						items: {
							type: 'boolean',
						},
						nullable: true,
					},
					valueShort: {
						type: 'array',
						items: {
							type: 'number',
							format: 'int32',
						},
						nullable: true,
					},
					valueInt: {
						type: 'array',
						items: {
							type: 'number',
							format: 'int32',
						},
						nullable: true,
					},
					valueLong: {
						type: 'array',
						items: {
							type: 'number',
							format: 'int64',
						},
						nullable: true,
					},
					valueFloat: {
						type: 'array',
						items: {
							type: 'number',
							format: 'float',
						},
						nullable: true,
					},
					valueDouble: {
						type: 'array',
						items: {
							type: 'number',
							format: 'double',
						},
						nullable: true,
					},
					valueString: {
						type: 'array',
						items: {
							type: 'string',
						},
						nullable: true,
					},
					valueLocalDate: {
						type: 'array',
						items: {
							type: 'string',
							pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\d',
							format: 'date',
						},
						nullable: true,
					},
					valueLocalDateTime: {
						type: 'array',
						items: {
							type: 'string',
							pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d',
							format: 'local-date-time',
						},
						nullable: true,
					},
					valueLocalTime: {
						type: 'array',
						items: {
							type: 'string',
							pattern: '\\d\\d:\\d\\d:\\d\\d',
							format: 'time',
						},
						nullable: true,
					},
					valueOffsetDateTime: {
						type: 'array',
						items: {
							type: 'string',
							format: 'date-time',
						},
						nullable: true,
					},
					valueZonedDateTime: {
						type: 'array',
						items: {
							type: 'string',
							format: 'zoned-date-time',
						},
						nullable: true,
					},
				},
				required: undefined,
			},
		},
	},
	{
		name: 'EnumInlineRecord',
		result: {
			EnumInlineRecord: {
				type: 'object',
				properties: {
					value: {
						type: 'string',
						enum: ['A', 'B'],
					},
					value_Null: {
						type: 'string',
						enum: ['C', 'D'],
						nullable: true,
					},
					value_Opt: {
						type: 'string',
						enum: ['E', 'F'],
					},
					value_Opt_Null: {
						type: 'string',
						enum: ['G', 'H'],
						nullable: true,
					},
					list: {
						type: 'array',
						items: {
							type: 'string',
							enum: ['A', 'B'],
						},
					},
					list_Null: {
						type: 'array',
						items: {
							type: 'string',
							enum: ['C', 'D'],
						},
						nullable: true,
					},
					/* FIXME list_Opt: {
						type: 'array',
						items: {
							type: 'string',
							enum: ['E', 'F'],
						},
					},*/
					list_Opt_Null: {
						type: 'array',
						items: {
							type: 'string',
							enum: ['G', 'H'],
						},
						nullable: true,
					},
				},
				required: ['value', 'value_Null', 'list', 'list_Null'],
			},
		},
	},
	{
		name: 'ScalarRecord',
		result: {
			ScalarRecord: {
				type: 'object',
				properties: {
					value: {
						type: 'string',
					},
					value_Null: {
						type: 'string',
						nullable: true,
					},
					value_Opt: {
						type: 'string',
					},
					value_Opt_Null: {
						type: 'string',
						nullable: true,
					},
					list: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
					list_Null: {
						type: 'array',
						items: {
							type: 'string',
						},
						nullable: true,
					},
					list_Opt: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
					list_Opt_Null: {
						type: 'array',
						items: {
							type: 'string',
						},
						nullable: true,
					},
				},
				required: ['value', 'value_Null', 'list', 'list_Null'],
			},
		},
	},
	{
		name: 'RecordOfRecords',
		result: {
			RecordOfRecords: {
				type: 'object',
				properties: {
					value: {
						$ref: '#/components/schemas/SimpleRecord_Basic',
					},
					value_Null: {
						allOf: [
							{
								$ref: '#/components/schemas/SimpleRecord_Basic',
							},
						],
						nullable: true,
					},
					value_Opt: {
						$ref: '#/components/schemas/SimpleRecord_Basic',
					},
					value_Opt_Null: {
						allOf: [
							{
								$ref: '#/components/schemas/SimpleRecord_Basic',
							},
						],
						nullable: true,
					},
					list: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/SimpleRecord_Basic',
						},
					},
					list_Null: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/SimpleRecord_Basic',
						},
						nullable: true,
					},
					list_Opt: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/SimpleRecord_Basic',
						},
					},
					list_Opt_Null: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/SimpleRecord_Basic',
						},
						nullable: true,
					},
				},
				required: ['value', 'value_Null', 'list', 'list_Null'],
			},
		},
	},
	{
		name: 'RecordWithUnions',
		result: {
			RecordWithUnions: {
				type: 'object',
				properties: {
					value: {
						$ref: '#/components/schemas/Union',
					},
					value_Null: {
						allOf: [
							{
								$ref: '#/components/schemas/Union',
							},
						],
						nullable: true,
					},
					value_Opt: {
						$ref: '#/components/schemas/Union',
					},
					value_Opt_Null: {
						allOf: [
							{
								$ref: '#/components/schemas/Union',
							},
						],
						nullable: true,
					},
					list: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/Union',
						},
					},
					list_Null: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/Union',
						},
						nullable: true,
					},
					list_Opt: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/Union',
						},
					},
					list_Opt_Null: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/Union',
						},
						nullable: true,
					},
				},
				required: ['value', 'value_Null', 'list', 'list_Null'],
			},
		},
	},
];

describe('generateRecordContent', () => {
	test.each(RECORD_TESTS)('should generate correct record content for $name', ({ name, result }) => {
		const t = findListElement(model.elements, isMResolvedRecordType, e => e.name === name);
		expect(generateRecordContent(t)).toStrictEqual(result);
	});
});
