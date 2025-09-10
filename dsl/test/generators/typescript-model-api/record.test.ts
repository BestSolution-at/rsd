import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { ListChangeTypes, RecordType, RecordTypePatch, ValueChangeTypes } from '../../../src/cli/typescript-model-api/record.js';
import { allResolvedRecordProperties, isMResolvedProperty, isMResolvedRecordType, MResolvedRSDModel } from '../../../src/cli/model.js';
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
	readonly value: ValueEnum;
	readonly value_Null: Value_NullEnum | null;
	readonly value_Opt?: Value_OptEnum;
	readonly value_Opt_Null?: Value_Opt_NullEnum | null;
	readonly list: ListEnum[];
	readonly list_Null: List_NullEnum[] | null;
	readonly list_Opt_Null?: List_Opt_NullEnum[] | null;
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

const PatchableRecord_Basic_List_Result = `
export type PatchableRecord_Basic_ListPatch = {
	readonly valueBoolean?: $ValueBooleanPatch;
	readonly valueShort?: $ValueShortPatch;
	readonly valueInt?: $ValueIntPatch;
	readonly valueLong?: $ValueLongPatch;
	readonly valueFloat?: $ValueFloatPatch;
	readonly valueDouble?: $ValueDoublePatch;
	readonly valueString?: $ValueStringPatch;
	readonly valueLocalDate?: $ValueLocalDatePatch;
	readonly valueLocalDateTime?: $ValueLocalDateTimePatch;
	readonly valueZonedDateTime?: $ValueZonedDateTimePatch;
};
`.trim();

const PatchableRecord_Basic_List_Optional_Result = `
export type PatchableRecord_Basic_List_OptionalPatch = {
	readonly valueBoolean?: $ValueBooleanPatch | null;
	readonly valueShort?: $ValueShortPatch | null;
	readonly valueInt?: $ValueIntPatch | null;
	readonly valueLong?: $ValueLongPatch | null;
	readonly valueFloat?: $ValueFloatPatch | null;
	readonly valueDouble?: $ValueDoublePatch | null;
	readonly valueString?: $ValueStringPatch | null;
	readonly valueLocalDate?: $ValueLocalDatePatch | null;
	readonly valueLocalDateTime?: $ValueLocalDateTimePatch | null;
	readonly valueZonedDateTime?: $ValueZonedDateTimePatch | null;
};
`.trim();

const PatchableRecord_Basic_List_Null_Result = `
export type PatchableRecord_Basic_List_NullPatch = {
	readonly valueBoolean?: $ValueBooleanPatch | null;
	readonly valueShort?: $ValueShortPatch | null;
	readonly valueInt?: $ValueIntPatch | null;
	readonly valueLong?: $ValueLongPatch | null;
	readonly valueFloat?: $ValueFloatPatch | null;
	readonly valueDouble?: $ValueDoublePatch | null;
	readonly valueString?: $ValueStringPatch | null;
	readonly valueLocalDate?: $ValueLocalDatePatch | null;
	readonly valueLocalDateTime?: $ValueLocalDateTimePatch | null;
	readonly valueZonedDateTime?: $ValueZonedDateTimePatch | null;
};
`.trim();

const PatchableEnumRecord_Result = `
export type PatchableEnumRecordPatch = {
	readonly value?: SampleEnum;
	readonly value_Null?: SampleEnum | null;
	readonly value_Opt?: SampleEnum | null;
	readonly value_Opt_Null?: SampleEnum | null;
	readonly list?: $ListPatch;
	readonly list_Null?: $List_NullPatch | null;
	readonly list_Opt?: $List_OptPatch | null;
	readonly list_Opt_Null?: $List_Opt_NullPatch | null;
};
`.trim();

const PatchableEnumInlineRecord_Result = `
export type PatchableEnumInlineRecordPatch = {
	readonly value?: ValueEnum;
	readonly value_Null?: Value_NullEnum | null;
	readonly value_Opt?: Value_OptEnum | null;
	readonly value_Opt_Null?: Value_Opt_NullEnum | null;
	readonly list?: $ListPatch;
	readonly list_Null?: $List_NullPatch | null;
	readonly list_Opt_Null?: $List_Opt_NullPatch | null;
};
`.trim();

const PatchableScalarRecordPatch_Result = `
export type PatchableScalarRecordPatch = {
	readonly value?: string;
	readonly value_Null?: string | null;
	readonly value_Opt?: string | null;
	readonly value_Opt_Null?: string | null;
	readonly list?: $ListPatch;
	readonly list_Null?: $List_NullPatch | null;
	readonly list_Opt?: $List_OptPatch | null;
	readonly list_Opt_Null?: $List_Opt_NullPatch | null;
};
`.trim();

const PatchableRecordOfRecordsPatch_Result = `
export type PatchableRecordOfRecordsPatch = {
	readonly value?: $ValuePatch;
	readonly value_Null?: $Value_NullPatch | null;
	readonly value_Opt?: $Value_OptPatch | null;
	readonly value_Opt_Null?: $Value_Opt_NullPatch | null;
	readonly list?: $ListPatch;
	readonly list_Null?: $List_NullPatch | null;
	readonly list_Opt?: $List_OptPatch | null;
	readonly list_Opt_Null?: $List_Opt_NullPatch | null;
};
`.trim();

const PatchableRecordWithUnionPatch_Result = `
export type PatchableRecordWithUnionPatch = {
	readonly value?: $ValuePatch;
	readonly value_Null?: $Value_NullPatch | null;
	readonly value_Opt?: $Value_OptPatch | null;
	readonly value_Opt_Null?: $Value_Opt_NullPatch | null;
	readonly list?: $ListPatch;
	readonly list_Null?: $List_NullPatch | null;
	readonly list_Opt?: $List_OptPatch | null;
	readonly list_Opt_Null?: $List_Opt_NullPatch | null;
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
	{
		name: 'PatchableRecord_Basic_List',
		result: PatchableRecord_Basic_List_Result,
	},
	{
		name: 'PatchableRecord_Basic_List_Optional',
		result: PatchableRecord_Basic_List_Optional_Result,
	},
	{
		name: 'PatchableRecord_Basic_List_Null',
		result: PatchableRecord_Basic_List_Null_Result,
	},
	{
		name: 'PatchableEnumRecord',
		result: PatchableEnumRecord_Result,
	},
	{
		name: 'PatchableEnumInlineRecord',
		result: PatchableEnumInlineRecord_Result,
	},
	{
		name: 'PatchableScalarRecord',
		result: PatchableScalarRecordPatch_Result,
	},
	{
		name: 'PatchableRecordOfRecords',
		result: PatchableRecordOfRecordsPatch_Result,
	},
	{
		name: 'PatchableRecordWithUnion',
		result: PatchableRecordWithUnionPatch_Result,
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

type PropertyTest = {
	recordName: string;
	propertyName: string;
	result: string;
};

const PatchableRecord_Basic_List_valueBoolean_Result = `
type $ValueBooleanReplace = ListReplace<boolean>;
type $ValueBooleanMerge = ListMergeAddRemove<boolean, boolean>;
type $ValueBooleanPatch = $ValueBooleanReplace | $ValueBooleanMerge;
`.trim();

const PatchableRecord_Basic_List_valueShort_Result = `
type $ValueShortReplace = ListReplace<number>;
type $ValueShortMerge = ListMergeAddRemove<number, number>;
type $ValueShortPatch = $ValueShortReplace | $ValueShortMerge;
`.trim();

const PatchableRecord_Basic_List_valueInt_Result = `
type $ValueIntReplace = ListReplace<number>;
type $ValueIntMerge = ListMergeAddRemove<number, number>;
type $ValueIntPatch = $ValueIntReplace | $ValueIntMerge;
`.trim();

const PatchableRecord_Basic_List_valueLong_Result = `
type $ValueLongReplace = ListReplace<number>;
type $ValueLongMerge = ListMergeAddRemove<number, number>;
type $ValueLongPatch = $ValueLongReplace | $ValueLongMerge;
`.trim();

const PatchableRecord_Basic_List_valueFloat_Result = `
type $ValueFloatReplace = ListReplace<number>;
type $ValueFloatMerge = ListMergeAddRemove<number, number>;
type $ValueFloatPatch = $ValueFloatReplace | $ValueFloatMerge;
`.trim();

const PatchableRecord_Basic_List_valueDouble_Result = `
type $ValueDoubleReplace = ListReplace<number>;
type $ValueDoubleMerge = ListMergeAddRemove<number, number>;
type $ValueDoublePatch = $ValueDoubleReplace | $ValueDoubleMerge;
`.trim();

const PatchableRecord_Basic_List_valueString_Result = `
type $ValueStringReplace = ListReplace<string>;
type $ValueStringMerge = ListMergeAddRemove<string, string>;
type $ValueStringPatch = $ValueStringReplace | $ValueStringMerge;
`.trim();

const PatchableRecord_Basic_List_valueLocalDate_Result = `
type $ValueLocalDateReplace = ListReplace<string>;
type $ValueLocalDateMerge = ListMergeAddRemove<string, string>;
type $ValueLocalDatePatch = $ValueLocalDateReplace | $ValueLocalDateMerge;
`.trim();

const PatchableRecord_Basic_List_valueLocalDateTime_Result = `
type $ValueLocalDateTimeReplace = ListReplace<string>;
type $ValueLocalDateTimeMerge = ListMergeAddRemove<string, string>;
type $ValueLocalDateTimePatch = $ValueLocalDateTimeReplace | $ValueLocalDateTimeMerge;
`.trim();

const PatchableRecord_Basic_List_valueZonedDateTime_Result = `
type $ValueZonedDateTimeReplace = ListReplace<string>;
type $ValueZonedDateTimeMerge = ListMergeAddRemove<string, string>;
type $ValueZonedDateTimePatch = $ValueZonedDateTimeReplace | $ValueZonedDateTimeMerge;
`.trim();

const PatchableEnumRecord_list_Result = `
type $ListReplace = ListReplace<SampleEnum>;
type $ListMerge = ListMergeAddRemove<SampleEnum, SampleEnum>;
type $ListPatch = $ListReplace | $ListMerge;
`.trim();

const PatchableEnumRecord_list_Null_Result = `
type $List_NullReplace = ListReplace<SampleEnum>;
type $List_NullMerge = ListMergeAddRemove<SampleEnum, SampleEnum>;
type $List_NullPatch = $List_NullReplace | $List_NullMerge;
`.trim();

const PatchableEnumRecord_list_Opt_Result = `
type $List_OptReplace = ListReplace<SampleEnum>;
type $List_OptMerge = ListMergeAddRemove<SampleEnum, SampleEnum>;
type $List_OptPatch = $List_OptReplace | $List_OptMerge;
`.trim();

const PatchableEnumRecord_list_Opt_Null_Result = `
type $List_Opt_NullReplace = ListReplace<SampleEnum>;
type $List_Opt_NullMerge = ListMergeAddRemove<SampleEnum, SampleEnum>;
type $List_Opt_NullPatch = $List_Opt_NullReplace | $List_Opt_NullMerge;
`.trim();

const PatchableEnumInlineRecord_list_Result = `
type $ListReplace = ListReplace<ListEnum>;
type $ListMerge = ListMergeAddRemove<ListEnum, ListEnum>;
type $ListPatch = $ListReplace | $ListMerge;
`.trim();

const PatchableEnumInlineRecord_list_Null_Result = `
type $List_NullReplace = ListReplace<List_NullEnum>;
type $List_NullMerge = ListMergeAddRemove<List_NullEnum, List_NullEnum>;
type $List_NullPatch = $List_NullReplace | $List_NullMerge;
`.trim();

const PatchableEnumInlineRecord_list_Opt_Null_Result = `
type $List_Opt_NullReplace = ListReplace<List_Opt_NullEnum>;
type $List_Opt_NullMerge = ListMergeAddRemove<List_Opt_NullEnum, List_Opt_NullEnum>;
type $List_Opt_NullPatch = $List_Opt_NullReplace | $List_Opt_NullMerge;
`.trim();

const PatchableScalarRecord_list_Result = `
type $ListReplace = ListReplace<string>;
type $ListMerge = ListMergeAddRemove<string, string>;
type $ListPatch = $ListReplace | $ListMerge;
`.trim();

const PatchableScalarRecord_list_Null_Result = `
type $List_NullReplace = ListReplace<string>;
type $List_NullMerge = ListMergeAddRemove<string, string>;
type $List_NullPatch = $List_NullReplace | $List_NullMerge;
`.trim();

const PatchableScalarRecord_list_Opt_Result = `
type $List_OptReplace = ListReplace<string>;
type $List_OptMerge = ListMergeAddRemove<string, string>;
type $List_OptPatch = $List_OptReplace | $List_OptMerge;
`.trim();

const PatchableScalarRecord_list_Opt_Null_Result = `
type $List_Opt_NullReplace = ListReplace<string>;
type $List_Opt_NullMerge = ListMergeAddRemove<string, string>;
type $List_Opt_NullPatch = $List_Opt_NullReplace | $List_Opt_NullMerge;
`.trim();

const PatchableRecordOfRecords_list_Result = `
type $ListReplace = ListReplace<PatchableRecord_BasicPatch>;
type $ListMerge = ListMergeAddUpdateRemove<PatchableRecord_BasicPatch, PatchableRecord_BasicPatch,string>;
type $ListPatch = $ListReplace | $ListMerge;
`.trim();

const PatchableRecordOfRecords_list_Null_Result = `
type $List_NullReplace = ListReplace<PatchableRecord_BasicPatch>;
type $List_NullMerge = ListMergeAddUpdateRemove<PatchableRecord_BasicPatch, PatchableRecord_BasicPatch,string>;
type $List_NullPatch = $List_NullReplace | $List_NullMerge;
`.trim();

const PatchableRecordOfRecords_list_Opt_Result = `
type $List_OptReplace = ListReplace<PatchableRecord_BasicPatch>;
type $List_OptMerge = ListMergeAddUpdateRemove<PatchableRecord_BasicPatch, PatchableRecord_BasicPatch,string>;
type $List_OptPatch = $List_OptReplace | $List_OptMerge;
`.trim();

const PatchableRecordOfRecords_list_Opt_Null_Result = `
type $List_Opt_NullReplace = ListReplace<PatchableRecord_BasicPatch>;
type $List_Opt_NullMerge = ListMergeAddUpdateRemove<PatchableRecord_BasicPatch, PatchableRecord_BasicPatch,string>;
type $List_Opt_NullPatch = $List_Opt_NullReplace | $List_Opt_NullMerge;
`.trim();

const PatchableRecordWithUnion_list = `
type $ListReplace = ListReplace<PatchableUnionPatch>;
type $ListMerge = ListMergeAddUpdateRemove<PatchableUnionPatch, PatchableUnionPatch,string>;
type $ListPatch = $ListReplace | $ListMerge;
`.trim();
const PatchableRecordWithUnion_list_Null = `
type $List_NullReplace = ListReplace<PatchableUnionPatch>;
type $List_NullMerge = ListMergeAddUpdateRemove<PatchableUnionPatch, PatchableUnionPatch,string>;
type $List_NullPatch = $List_NullReplace | $List_NullMerge;
`.trim();
const PatchableRecordWithUnion_list_Opt = `
type $List_OptReplace = ListReplace<PatchableUnionPatch>;
type $List_OptMerge = ListMergeAddUpdateRemove<PatchableUnionPatch, PatchableUnionPatch,string>;
type $List_OptPatch = $List_OptReplace | $List_OptMerge;
`.trim();
const PatchableRecordWithUnion_list_Opt_Null = `
type $List_Opt_NullReplace = ListReplace<PatchableUnionPatch>;
type $List_Opt_NullMerge = ListMergeAddUpdateRemove<PatchableUnionPatch, PatchableUnionPatch,string>;
type $List_Opt_NullPatch = $List_Opt_NullReplace | $List_Opt_NullMerge;
`.trim();

const LIST_CHANGE_TYPES_TESTS: PropertyTest[] = [
	{
		recordName: 'PatchableRecord_Basic_List',
		propertyName: 'valueBoolean',
		result: PatchableRecord_Basic_List_valueBoolean_Result,
	},
	{
		recordName: 'PatchableRecord_Basic_List',
		propertyName: 'valueShort',
		result: PatchableRecord_Basic_List_valueShort_Result,
	},
	{
		recordName: 'PatchableRecord_Basic_List',
		propertyName: 'valueInt',
		result: PatchableRecord_Basic_List_valueInt_Result,
	},
	{
		recordName: 'PatchableRecord_Basic_List',
		propertyName: 'valueLong',
		result: PatchableRecord_Basic_List_valueLong_Result,
	},
	{
		recordName: 'PatchableRecord_Basic_List',
		propertyName: 'valueFloat',
		result: PatchableRecord_Basic_List_valueFloat_Result,
	},
	{
		recordName: 'PatchableRecord_Basic_List',
		propertyName: 'valueDouble',
		result: PatchableRecord_Basic_List_valueDouble_Result,
	},
	{
		recordName: 'PatchableRecord_Basic_List',
		propertyName: 'valueString',
		result: PatchableRecord_Basic_List_valueString_Result,
	},
	{
		recordName: 'PatchableRecord_Basic_List',
		propertyName: 'valueLocalDate',
		result: PatchableRecord_Basic_List_valueLocalDate_Result,
	},
	{
		recordName: 'PatchableRecord_Basic_List',
		propertyName: 'valueLocalDateTime',
		result: PatchableRecord_Basic_List_valueLocalDateTime_Result,
	},
	{
		recordName: 'PatchableRecord_Basic_List',
		propertyName: 'valueZonedDateTime',
		result: PatchableRecord_Basic_List_valueZonedDateTime_Result,
	},
	{
		recordName: 'PatchableEnumRecord',
		propertyName: 'list',
		result: PatchableEnumRecord_list_Result,
	},
	{
		recordName: 'PatchableEnumRecord',
		propertyName: 'list_Null',
		result: PatchableEnumRecord_list_Null_Result,
	},
	{
		recordName: 'PatchableEnumRecord',
		propertyName: 'list_Opt',
		result: PatchableEnumRecord_list_Opt_Result,
	},
	{
		recordName: 'PatchableEnumRecord',
		propertyName: 'list_Opt_Null',
		result: PatchableEnumRecord_list_Opt_Null_Result,
	},
	{
		recordName: 'PatchableEnumInlineRecord',
		propertyName: 'list',
		result: PatchableEnumInlineRecord_list_Result,
	},
	{
		recordName: 'PatchableEnumInlineRecord',
		propertyName: 'list_Null',
		result: PatchableEnumInlineRecord_list_Null_Result,
	},
	{
		recordName: 'PatchableEnumInlineRecord',
		propertyName: 'list_Opt_Null',
		result: PatchableEnumInlineRecord_list_Opt_Null_Result,
	},
	{
		recordName: 'PatchableScalarRecord',
		propertyName: 'list',
		result: PatchableScalarRecord_list_Result,
	},
	{
		recordName: 'PatchableScalarRecord',
		propertyName: 'list_Null',
		result: PatchableScalarRecord_list_Null_Result,
	},
	{
		recordName: 'PatchableScalarRecord',
		propertyName: 'list_Opt',
		result: PatchableScalarRecord_list_Opt_Result,
	},
	{
		recordName: 'PatchableScalarRecord',
		propertyName: 'list_Opt_Null',
		result: PatchableScalarRecord_list_Opt_Null_Result,
	},
	{
		recordName: 'PatchableRecordOfRecords',
		propertyName: 'list',
		result: PatchableRecordOfRecords_list_Result,
	},
	{
		recordName: 'PatchableRecordOfRecords',
		propertyName: 'list_Null',
		result: PatchableRecordOfRecords_list_Null_Result,
	},
	{
		recordName: 'PatchableRecordOfRecords',
		propertyName: 'list_Opt',
		result: PatchableRecordOfRecords_list_Opt_Result,
	},
	{
		recordName: 'PatchableRecordOfRecords',
		propertyName: 'list_Opt_Null',
		result: PatchableRecordOfRecords_list_Opt_Null_Result,
	},
	{
		recordName: 'PatchableRecordWithUnion',
		propertyName: 'list',
		result: PatchableRecordWithUnion_list,
	},
	{
		recordName: 'PatchableRecordWithUnion',
		propertyName: 'list_Null',
		result: PatchableRecordWithUnion_list_Null,
	},
	{
		recordName: 'PatchableRecordWithUnion',
		propertyName: 'list_Opt',
		result: PatchableRecordWithUnion_list_Opt,
	},
	{
		recordName: 'PatchableRecordWithUnion',
		propertyName: 'list_Opt_Null',
		result: PatchableRecordWithUnion_list_Opt_Null,
	},
];

describe('ListChangeTypes', () => {
	test.each(LIST_CHANGE_TYPES_TESTS)('$recordName - $propertyName', data => {
		const recordModel = findListElement(model.elements, isMResolvedRecordType, r => r.name === data.recordName);
		const allProps = allResolvedRecordProperties(recordModel);
		const prop = findListElement(allProps, isMResolvedProperty, p => p.name === data.propertyName);
		const collector = new TypescriptImportCollector(createTypescriptClientAPIGeneratorConfig());
		const fqn = collector.importType.bind(collector);
		const result = toString(ListChangeTypes(prop, fqn), '\t').trim();
		expect(result).toBe(data.result);
	});
});

const PatchableRecordOfRecordsPatch_value_Result = `
type $ValuePatch = (PatchableRecord_Basic & { '@type': 'replace' }) | (PatchableRecord_BasicPatch & { '@type': 'merge' });
`.trim();

const PatchableRecordOfRecordsPatch_value_Null_Result = `
type $Value_NullPatch = (PatchableRecord_Basic & { '@type': 'replace' }) | (PatchableRecord_BasicPatch & { '@type': 'merge' });
`.trim();

const PatchableRecordOfRecordsPatch_value_Opt_Result = `
type $Value_OptPatch = (PatchableRecord_Basic & { '@type': 'replace' }) | (PatchableRecord_BasicPatch & { '@type': 'merge' });
`.trim();

const PatchableRecordOfRecordsPatch_value_Opt_Null_Result = `
type $Value_Opt_NullPatch = (PatchableRecord_Basic & { '@type': 'replace' }) | (PatchableRecord_BasicPatch & { '@type': 'merge' });
`.trim();

const PatchableRecordWithUnionPatch_value = `
type $ValuePatch = PatchableUnion | PatchableUnionPatch;`.trim();
const PatchableRecordWithUnionPatch_value_Null = `
type $Value_NullPatch = PatchableUnion | PatchableUnionPatch;`.trim();
const PatchableRecordWithUnionPatch_value_Opt = `
type $Value_OptPatch = PatchableUnion | PatchableUnionPatch;`.trim();
const PatchableRecordWithUnionPatch_value_Opt_Null = `
type $Value_Opt_NullPatch = PatchableUnion | PatchableUnionPatch;`.trim();

const SINGLE_CHANGE_TYPES = [
	{
		recordName: 'PatchableRecordOfRecords',
		propertyName: 'value',
		result: PatchableRecordOfRecordsPatch_value_Result,
	},
	{
		recordName: 'PatchableRecordOfRecords',
		propertyName: 'value_Null',
		result: PatchableRecordOfRecordsPatch_value_Null_Result,
	},
	{
		recordName: 'PatchableRecordOfRecords',
		propertyName: 'value_Opt',
		result: PatchableRecordOfRecordsPatch_value_Opt_Result,
	},
	{
		recordName: 'PatchableRecordOfRecords',
		propertyName: 'value_Opt_Null',
		result: PatchableRecordOfRecordsPatch_value_Opt_Null_Result,
	},
	{
		recordName: 'PatchableRecordWithUnion',
		propertyName: 'value',
		result: PatchableRecordWithUnionPatch_value,
	},
	{
		recordName: 'PatchableRecordWithUnion',
		propertyName: 'value_Null',
		result: PatchableRecordWithUnionPatch_value_Null,
	},
	{
		recordName: 'PatchableRecordWithUnion',
		propertyName: 'value_Opt',
		result: PatchableRecordWithUnionPatch_value_Opt,
	},
	{
		recordName: 'PatchableRecordWithUnion',
		propertyName: 'value_Opt_Null',
		result: PatchableRecordWithUnionPatch_value_Opt_Null,
	},
];

describe('ValueChangeTypes', () => {
	test.each(SINGLE_CHANGE_TYPES)('$recordName - $propertyName', data => {
		const recordModel = findListElement(model.elements, isMResolvedRecordType, r => r.name === data.recordName);
		const allProps = allResolvedRecordProperties(recordModel);
		const prop = findListElement(allProps, isMResolvedProperty, p => p.name === data.propertyName);
		const collector = new TypescriptImportCollector(createTypescriptClientAPIGeneratorConfig());
		const fqn = collector.importType.bind(collector);
		const result = toString(ValueChangeTypes(prop, fqn), '\t').trim();
		expect(result).toBe(data.result);
	});
});
