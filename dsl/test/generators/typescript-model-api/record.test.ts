import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { RecordType, RecordTypePatch } from '../../../src/cli/typescript-model-api/record.js';
import { allResolvedRecordProperties, isMResolvedRecordType, MResolvedRSDModel } from '../../../src/cli/model.js';
import { createTypescriptClientAPIGeneratorConfig, findListElement, sampleModel } from '../test-utils.js';
import { TypescriptImportCollector } from '../../../src/cli/typescript-gen-utils.js';
import { toString } from 'langium/generate';

let model: MResolvedRSDModel;

beforeAll(() => {
	model = sampleModel();
});

let collector: TypescriptImportCollector;
let fqn: (type: string, typeOnly: boolean) => string;

beforeEach(() => {
	collector = new TypescriptImportCollector(createTypescriptClientAPIGeneratorConfig());
	fqn = collector.importType.bind(collector);
});

const SimpleRecord_KeyVersion_Result = `
export type SimpleRecord_KeyVersion = {
	readonly key: string;
	readonly version: string;
};
`.trim();

const SimpleRecord_KeyVersion_Int_Int_Result = `
export type SimpleRecord_KeyVersion_Int_Int = {
	readonly key: number;
	readonly version: number;
};
`.trim();

const SimpleRecord_Basic_Result = `
export type SimpleRecord_Basic = {
	readonly valueBoolean: boolean;
	readonly valueShort: number;
	readonly valueInt: number;
	readonly valueLong: number;
	readonly valueFloat: number;
	readonly valueDouble: number;
	readonly valueString: string;
	readonly valueLocalDate: string;
	readonly valueLocalDateTime: string;
	readonly valueZonedDateTime: string;
};
`.trim();

const SimpleRecord_Basic_Optional_Result = `
export type SimpleRecord_Basic_Optional = {
	readonly valueBoolean?: boolean;
	readonly valueShort?: number;
	readonly valueInt?: number;
	readonly valueLong?: number;
	readonly valueFloat?: number;
	readonly valueDouble?: number;
	readonly valueString?: string;
	readonly valueLocalDate?: string;
	readonly valueLocalDateTime?: string;
	readonly valueZonedDateTime?: string;
};
`.trim();

const SimpleRecord_Basic_Null_Result = `
export type SimpleRecord_Basic_Null = {
	readonly valueBoolean: boolean | null;
	readonly valueShort: number | null;
	readonly valueInt: number | null;
	readonly valueLong: number | null;
	readonly valueFloat: number | null;
	readonly valueDouble: number | null;
	readonly valueString: string | null;
	readonly valueLocalDate: string | null;
	readonly valueLocalDateTime: string | null;
	readonly valueZonedDateTime: string | null;
};
`.trim();

const SimpleRecord_Basic_Optional_Null_Result = `
export type SimpleRecord_Basic_Optional_Null = {
	readonly valueBoolean?: boolean | null;
	readonly valueShort?: number | null;
	readonly valueInt?: number | null;
	readonly valueLong?: number | null;
	readonly valueFloat?: number | null;
	readonly valueDouble?: number | null;
	readonly valueString?: string | null;
	readonly valueLocalDate?: string | null;
	readonly valueLocalDateTime?: string | null;
	readonly valueZonedDateTime?: string | null;
};
`.trim();

const SimpleRecord_Basic_List_Result = `
export type SimpleRecord_Basic_List = {
	readonly valueBoolean: boolean[];
	readonly valueShort: number[];
	readonly valueInt: number[];
	readonly valueLong: number[];
	readonly valueFloat: number[];
	readonly valueDouble: number[];
	readonly valueString: string[];
	readonly valueLocalDate: string[];
	readonly valueLocalDateTime: string[];
	readonly valueZonedDateTime: string[];
};
`.trim();

const SimpleRecord_Basic_List_Optional_Result = `
export type SimpleRecord_Basic_List_Optional = {
	readonly valueBoolean?: boolean[];
	readonly valueShort?: number[];
	readonly valueInt?: number[];
	readonly valueLong?: number[];
	readonly valueFloat?: number[];
	readonly valueDouble?: number[];
	readonly valueString?: string[];
	readonly valueLocalDate?: string[];
	readonly valueLocalDateTime?: string[];
	readonly valueZonedDateTime?: string[];
};
`.trim();

const SimpleRecord_Basic_List_Null_Result = `
export type SimpleRecord_Basic_List_Null = {
	readonly valueBoolean: boolean[] | null;
	readonly valueShort: number[] | null;
	readonly valueInt: number[] | null;
	readonly valueLong: number[] | null;
	readonly valueFloat: number[] | null;
	readonly valueDouble: number[] | null;
	readonly valueString: string[] | null;
	readonly valueLocalDate: string[] | null;
	readonly valueLocalDateTime: string[] | null;
	readonly valueZonedDateTime: string[] | null;
};
`.trim();

const ScalarRecord_Result = `
export type ScalarRecord = {
	readonly value: string;
	readonly value_Null: string | null;
	readonly value_Opt?: string;
	readonly value_Opt_Null?: string | null;
	readonly list: string[];
	readonly list_Null: string[] | null;
	readonly list_Opt?: string[];
	readonly list_Opt_Null?: string[] | null;
};
`.trim();

const RecordOfRecords_Result = `
export type RecordOfRecords = {
	readonly value: SimpleRecord_Basic;
	readonly value_Null: SimpleRecord_Basic | null;
	readonly value_Opt?: SimpleRecord_Basic;
	readonly value_Opt_Null?: SimpleRecord_Basic | null;
	readonly list: SimpleRecord_Basic[];
	readonly list_Null: SimpleRecord_Basic[] | null;
	readonly list_Opt?: SimpleRecord_Basic[];
	readonly list_Opt_Null?: SimpleRecord_Basic[] | null;
};
`.trim();

const EnumRecord_Result = `
export type EnumRecord = {
	readonly value: SampleEnum;
	readonly value_Null: SampleEnum | null;
	readonly value_Opt?: SampleEnum;
	readonly value_Opt_Null?: SampleEnum | null;
	readonly list: SampleEnum[];
	readonly list_Null: SampleEnum[] | null;
	readonly list_Opt?: SampleEnum[];
	readonly list_Opt_Null?: SampleEnum[] | null;
};
`.trim();

const EnumInlineRecord_Result = `
export type EnumInlineRecord = {
	readonly value: 'A' | 'B';
	readonly value_Null: 'C' | 'D' | null;
	readonly value_Opt?: 'E' | 'F';
	readonly value_Opt_Null?: 'G' | 'H' | null;
	readonly list: ('A' | 'B')[];
	readonly list_Null: ('C' | 'D')[] | null;
	readonly list_Opt_Null?: ('G' | 'H')[] | null;
};
`.trim();

type RecordTypeTest = {
	name: string;
	result: string;
};

const RECORD_TYPE_TESTS: RecordTypeTest[] = [
	{
		name: 'SimpleRecord_KeyVersion',
		result: SimpleRecord_KeyVersion_Result,
	},
	{
		name: 'SimpleRecord_KeyVersion_Int_Int',
		result: SimpleRecord_KeyVersion_Int_Int_Result,
	},
	{
		name: 'SimpleRecord_Basic',
		result: SimpleRecord_Basic_Result,
	},
	{
		name: 'SimpleRecord_Basic_Optional',
		result: SimpleRecord_Basic_Optional_Result,
	},
	{
		name: 'SimpleRecord_Basic_Null',
		result: SimpleRecord_Basic_Null_Result,
	},
	{
		name: 'SimpleRecord_Basic_Optional_Null',
		result: SimpleRecord_Basic_Optional_Null_Result,
	},
	{
		name: 'SimpleRecord_Basic_List',
		result: SimpleRecord_Basic_List_Result,
	},
	{
		name: 'SimpleRecord_Basic_List_Optional',
		result: SimpleRecord_Basic_List_Optional_Result,
	},
	{
		name: 'SimpleRecord_Basic_List_Null',
		result: SimpleRecord_Basic_List_Null_Result,
	},
	{
		name: 'ScalarRecord',
		result: ScalarRecord_Result,
	},
	{
		name: 'RecordOfRecords',
		result: RecordOfRecords_Result,
	},
	{
		name: 'EnumRecord',
		result: EnumRecord_Result,
	},
	{
		name: 'EnumInlineRecord',
		result: EnumInlineRecord_Result,
	},
];

describe('RecordType', () => {
	test.each(RECORD_TYPE_TESTS)('$name', data => {
		const recordModel = findListElement(model.elements, isMResolvedRecordType, r => r.name === data.name);
		const allProps = allResolvedRecordProperties(recordModel);
		const result = toString(RecordType(recordModel, allProps, fqn), '\t').trim();
		expect(result).toBe(data.result);
	});
});

const PatchableRecord_Result = `
export type PatchableRecordPatch = {
	readonly key: string;
	readonly version: string;
	readonly value?: string;
};
`.trim();

const PatchableRecord_BasicPatch_Result = `
export type PatchableRecord_BasicPatch = {
	readonly key: string;
	readonly version: string;
	readonly valueBoolean?: boolean;
	readonly valueShort?: number;
	readonly valueInt?: number;
	readonly valueLong?: number;
	readonly valueFloat?: number;
	readonly valueDouble?: number;
	readonly valueString?: string;
	readonly valueLocalDate?: string;
	readonly valueLocalDateTime?: string;
	readonly valueZonedDateTime?: string;
};
`.trim();

const PatchableRecord_Basic_Optional_Result = `
export type PatchableRecord_Basic_OptionalPatch = {
	readonly key: string;
	readonly version: string;
	readonly valueBoolean?: boolean | null;
	readonly valueShort?: number | null;
	readonly valueInt?: number | null;
	readonly valueLong?: number | null;
	readonly valueFloat?: number | null;
	readonly valueDouble?: number | null;
	readonly valueString?: string | null;
	readonly valueLocalDate?: string | null;
	readonly valueLocalDateTime?: string | null;
	readonly valueZonedDateTime?: string | null;
};
`.trim();

const PatchableRecord_Basic_Null_Result = `
export type PatchableRecord_Basic_NullPatch = {
	readonly key: string;
	readonly version: string;
	readonly valueBoolean?: boolean | null;
	readonly valueShort?: number | null;
	readonly valueInt?: number | null;
	readonly valueLong?: number | null;
	readonly valueFloat?: number | null;
	readonly valueDouble?: number | null;
	readonly valueString?: string | null;
	readonly valueLocalDate?: string | null;
	readonly valueLocalDateTime?: string | null;
	readonly valueZonedDateTime?: string | null;
};
`.trim();

const PatchableRecord_Basic_Optional_Null_Result = `
export type PatchableRecord_Basic_Optional_NullPatch = {
	readonly key: string;
	readonly version: string;
	readonly valueBoolean?: boolean | null;
	readonly valueShort?: number | null;
	readonly valueInt?: number | null;
	readonly valueLong?: number | null;
	readonly valueFloat?: number | null;
	readonly valueDouble?: number | null;
	readonly valueString?: string | null;
	readonly valueLocalDate?: string | null;
	readonly valueLocalDateTime?: string | null;
	readonly valueZonedDateTime?: string | null;
};
`.trim();

const RECORD_TYPE_PATCH_TESTS: RecordTypeTest[] = [
	{
		name: 'PatchableRecord',
		result: PatchableRecord_Result,
	},
	{
		name: 'PatchableRecord_Basic',
		result: PatchableRecord_BasicPatch_Result,
	},
	{
		name: 'PatchableRecord_Basic_Optional',
		result: PatchableRecord_Basic_Optional_Result,
	},
	{
		name: 'PatchableRecord_Basic_Null',
		result: PatchableRecord_Basic_Null_Result,
	},
	{
		name: 'PatchableRecord_Basic_Optional_Null',
		result: PatchableRecord_Basic_Optional_Null_Result,
	},
];

describe('RecordTypePatch', () => {
	test.each(RECORD_TYPE_PATCH_TESTS)('$name', data => {
		const recordModel = findListElement(model.elements, isMResolvedRecordType, r => r.name === data.name);
		const allProps = allResolvedRecordProperties(recordModel);
		const result = toString(RecordTypePatch(recordModel, allProps, fqn), '\t').trim();
		expect(result).toBe(data.result);
	});
});
