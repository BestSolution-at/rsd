import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { ListChangeTypes, RecordType, RecordTypeguard, RecordTypeguardPatch, RecordTypePatch, ValueChangeTypes } from '../../../src/cli/typescript-model-api/record.js';
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

const SimpleRecord_Result = `
export type SimpleRecord = {
	readonly key: string;
	readonly version: string;
	readonly value: string;
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

const SimpleRecord_Basic_List_Optional_Null_Result = `
export type SimpleRecord_Basic_List_Optional_Null = {
	readonly valueBoolean?: boolean[] | null;
	readonly valueShort?: number[] | null;
	readonly valueInt?: number[] | null;
	readonly valueLong?: number[] | null;
	readonly valueFloat?: number[] | null;
	readonly valueDouble?: number[] | null;
	readonly valueString?: string[] | null;
	readonly valueLocalDate?: string[] | null;
	readonly valueLocalDateTime?: string[] | null;
	readonly valueZonedDateTime?: string[] | null;
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

const RecordWithUnions_Result = `
export type RecordWithUnions = {
	readonly value: Union;
	readonly value_Null: Union | null;
	readonly value_Opt?: Union;
	readonly value_Opt_Null?: Union | null;
	readonly list: Union[];
	readonly list_Null: Union[] | null;
	readonly list_Opt?: Union[];
	readonly list_Opt_Null?: Union[] | null;
};
`.trim();

const MixinRecord_Result = `
export type MixinRecord = {
	readonly sample: string;
	readonly mValueString: string;
	readonly mValueString2: string;
};
`.trim();

type RecordTest = {
	name: string;
	result: string;
};

const RECORD_TYPE_TESTS: RecordTest[] = [
	{
		name: 'SimpleRecord_KeyVersion',
		result: SimpleRecord_KeyVersion_Result,
	},
	{
		name: 'SimpleRecord_KeyVersion_Int_Int',
		result: SimpleRecord_KeyVersion_Int_Int_Result,
	},
	{
		name: 'SimpleRecord',
		result: SimpleRecord_Result,
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
		name: 'SimpleRecord_Basic_List_Optional_Null',
		result: SimpleRecord_Basic_List_Optional_Null_Result,
	},
	{
		name: 'ScalarRecord',
		result: ScalarRecord_Result,
	},
	{
		name: 'EnumRecord',
		result: EnumRecord_Result,
	},
	{
		name: 'EnumInlineRecord',
		result: EnumInlineRecord_Result,
	},
	{
		name: 'RecordOfRecords',
		result: RecordOfRecords_Result,
	},
	{
		name: 'RecordWithUnions',
		result: RecordWithUnions_Result,
	},
	{
		name: 'MixinRecord',
		result: MixinRecord_Result,
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
	readonly key: string;
	readonly version: string;
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
	readonly key: string;
	readonly version: string;
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
	readonly key: string;
	readonly version: string;
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
	readonly key: string;
	readonly version: string;
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
	readonly key: string;
	readonly version: string;
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
	readonly key: string;
	readonly version: string;
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
	readonly key: string;
	readonly version: string;
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
	readonly key: string;
	readonly version: string;
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

const RECORD_TYPE_PATCH_TESTS: RecordTest[] = [
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

const SINGLE_CHANGE_TYPES: PropertyTest[] = [
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

const SimpleRecord_KeyVersion_Typeguard_Result = `
export function isSimpleRecord_KeyVersion(value: unknown): value is SimpleRecord_KeyVersion {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString)
}
`.trim();

const SimpleRecord_KeyVersion_Int_Int_Typeguard_Result = `
export function isSimpleRecord_KeyVersion_Int_Int(value: unknown): value is SimpleRecord_KeyVersion_Int_Int {
	return isRecord(value) &&
		checkProp(value, 'key', isNumber) &&
		checkProp(value, 'version', isNumber)
}
`.trim();

const SimpleRecord_Typeguard_Result = `
export function isSimpleRecord(value: unknown): value is SimpleRecord {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString) &&
		checkProp(value, 'value', isString);
}
`.trim();

const SimpleRecord_Basic_Typeguard_Result = `
export function isSimpleRecord_Basic(value: unknown): value is SimpleRecord_Basic {
	return isRecord(value) &&
		checkProp(value, 'valueBoolean', isBoolean) &&
		checkProp(value, 'valueShort', isNumber) &&
		checkProp(value, 'valueInt', isNumber) &&
		checkProp(value, 'valueLong', isNumber) &&
		checkProp(value, 'valueFloat', isNumber) &&
		checkProp(value, 'valueDouble', isNumber) &&
		checkProp(value, 'valueString', isString) &&
		checkProp(value, 'valueLocalDate', isString) &&
		checkProp(value, 'valueLocalDateTime', isString) &&
		checkProp(value, 'valueZonedDateTime', isString);
}
`.trim();

const SimpleRecord_Basic_Optional_Typeguard_Result = `
export function isSimpleRecord_Basic_Optional(value: unknown): value is SimpleRecord_Basic_Optional {
	return isRecord(value) &&
		checkOptProp(value, 'valueBoolean', isBoolean) &&
		checkOptProp(value, 'valueShort', isNumber) &&
		checkOptProp(value, 'valueInt', isNumber) &&
		checkOptProp(value, 'valueLong', isNumber) &&
		checkOptProp(value, 'valueFloat', isNumber) &&
		checkOptProp(value, 'valueDouble', isNumber) &&
		checkOptProp(value, 'valueString', isString) &&
		checkOptProp(value, 'valueLocalDate', isString) &&
		checkOptProp(value, 'valueLocalDateTime', isString) &&
		checkOptProp(value, 'valueZonedDateTime', isString);
}
`.trim();

const SimpleRecord_Basic_Null_Typeguard_Result = `
export function isSimpleRecord_Basic_Null(value: unknown): value is SimpleRecord_Basic_Null {
	return isRecord(value) &&
		(checkProp(value, 'valueBoolean', isNull) || checkProp(value, 'valueBoolean', isBoolean)) &&
		(checkProp(value, 'valueShort', isNull) || checkProp(value, 'valueShort', isNumber)) &&
		(checkProp(value, 'valueInt', isNull) || checkProp(value, 'valueInt', isNumber)) &&
		(checkProp(value, 'valueLong', isNull) || checkProp(value, 'valueLong', isNumber)) &&
		(checkProp(value, 'valueFloat', isNull) || checkProp(value, 'valueFloat', isNumber)) &&
		(checkProp(value, 'valueDouble', isNull) || checkProp(value, 'valueDouble', isNumber)) &&
		(checkProp(value, 'valueString', isNull) || checkProp(value, 'valueString', isString)) &&
		(checkProp(value, 'valueLocalDate', isNull) || checkProp(value, 'valueLocalDate', isString)) &&
		(checkProp(value, 'valueLocalDateTime', isNull) || checkProp(value, 'valueLocalDateTime', isString)) &&
		(checkProp(value, 'valueZonedDateTime', isNull) || checkProp(value, 'valueZonedDateTime', isString));
}
`.trim();

const SimpleRecord_Basic_Optional_Null_Typeguard_Result = `
export function isSimpleRecord_Basic_Optional_Null(value: unknown): value is SimpleRecord_Basic_Optional_Null {
	return isRecord(value) &&
		(checkOptProp(value, 'valueBoolean', isNull) || checkOptProp(value, 'valueBoolean', isBoolean)) &&
		(checkOptProp(value, 'valueShort', isNull) || checkOptProp(value, 'valueShort', isNumber)) &&
		(checkOptProp(value, 'valueInt', isNull) || checkOptProp(value, 'valueInt', isNumber)) &&
		(checkOptProp(value, 'valueLong', isNull) || checkOptProp(value, 'valueLong', isNumber)) &&
		(checkOptProp(value, 'valueFloat', isNull) || checkOptProp(value, 'valueFloat', isNumber)) &&
		(checkOptProp(value, 'valueDouble', isNull) || checkOptProp(value, 'valueDouble', isNumber)) &&
		(checkOptProp(value, 'valueString', isNull) || checkOptProp(value, 'valueString', isString)) &&
		(checkOptProp(value, 'valueLocalDate', isNull) || checkOptProp(value, 'valueLocalDate', isString)) &&
		(checkOptProp(value, 'valueLocalDateTime', isNull) || checkOptProp(value, 'valueLocalDateTime', isString)) &&
		(checkOptProp(value, 'valueZonedDateTime', isNull) || checkOptProp(value, 'valueZonedDateTime', isString));
}
`.trim();

const SimpleRecord_Basic_List_Typeguard_Result = `
export function isSimpleRecord_Basic_List(value: unknown): value is SimpleRecord_Basic_List {
	return isRecord(value) &&
		checkProp(value, 'valueBoolean', createTypedArrayGuard(isBoolean)) &&
		checkProp(value, 'valueShort', createTypedArrayGuard(isNumber)) &&
		checkProp(value, 'valueInt', createTypedArrayGuard(isNumber)) &&
		checkProp(value, 'valueLong', createTypedArrayGuard(isNumber)) &&
		checkProp(value, 'valueFloat', createTypedArrayGuard(isNumber)) &&
		checkProp(value, 'valueDouble', createTypedArrayGuard(isNumber)) &&
		checkProp(value, 'valueString', createTypedArrayGuard(isString)) &&
		checkProp(value, 'valueLocalDate', createTypedArrayGuard(isString)) &&
		checkProp(value, 'valueLocalDateTime', createTypedArrayGuard(isString)) &&
		checkProp(value, 'valueZonedDateTime', createTypedArrayGuard(isString));
}
`.trim();

const SimpleRecord_Basic_List_Optional_Typeguard_Result = `
export function isSimpleRecord_Basic_List_Optional(value: unknown): value is SimpleRecord_Basic_List_Optional {
	return isRecord(value) &&
		checkOptProp(value, 'valueBoolean', createTypedArrayGuard(isBoolean)) &&
		checkOptProp(value, 'valueShort', createTypedArrayGuard(isNumber)) &&
		checkOptProp(value, 'valueInt', createTypedArrayGuard(isNumber)) &&
		checkOptProp(value, 'valueLong', createTypedArrayGuard(isNumber)) &&
		checkOptProp(value, 'valueFloat', createTypedArrayGuard(isNumber)) &&
		checkOptProp(value, 'valueDouble', createTypedArrayGuard(isNumber)) &&
		checkOptProp(value, 'valueString', createTypedArrayGuard(isString)) &&
		checkOptProp(value, 'valueLocalDate', createTypedArrayGuard(isString)) &&
		checkOptProp(value, 'valueLocalDateTime', createTypedArrayGuard(isString)) &&
		checkOptProp(value, 'valueZonedDateTime', createTypedArrayGuard(isString));
}
`.trim();

const SimpleRecord_Basic_List_Null_Typeguard_Result = `
export function isSimpleRecord_Basic_List_Null(value: unknown): value is SimpleRecord_Basic_List_Null {
	return isRecord(value) &&
		(checkProp(value, 'valueBoolean', isNull) || checkProp(value, 'valueBoolean', createTypedArrayGuard(isBoolean))) &&
		(checkProp(value, 'valueShort', isNull) || checkProp(value, 'valueShort', createTypedArrayGuard(isNumber))) &&
		(checkProp(value, 'valueInt', isNull) || checkProp(value, 'valueInt', createTypedArrayGuard(isNumber))) &&
		(checkProp(value, 'valueLong', isNull) || checkProp(value, 'valueLong', createTypedArrayGuard(isNumber))) &&
		(checkProp(value, 'valueFloat', isNull) || checkProp(value, 'valueFloat', createTypedArrayGuard(isNumber))) &&
		(checkProp(value, 'valueDouble', isNull) || checkProp(value, 'valueDouble', createTypedArrayGuard(isNumber))) &&
		(checkProp(value, 'valueString', isNull) || checkProp(value, 'valueString', createTypedArrayGuard(isString))) &&
		(checkProp(value, 'valueLocalDate', isNull) || checkProp(value, 'valueLocalDate', createTypedArrayGuard(isString))) &&
		(checkProp(value, 'valueLocalDateTime', isNull) || checkProp(value, 'valueLocalDateTime', createTypedArrayGuard(isString))) &&
		(checkProp(value, 'valueZonedDateTime', isNull) || checkProp(value, 'valueZonedDateTime', createTypedArrayGuard(isString)));
}
`.trim();

const SimpleRecord_Basic_List_Optional_Null_Typeguard_Result = `
export function isSimpleRecord_Basic_List_Optional_Null(value: unknown): value is SimpleRecord_Basic_List_Optional_Null {
	return isRecord(value) &&
		(checkOptProp(value, 'valueBoolean', isNull) || checkOptProp(value, 'valueBoolean', createTypedArrayGuard(isBoolean))) &&
		(checkOptProp(value, 'valueShort', isNull) || checkOptProp(value, 'valueShort', createTypedArrayGuard(isNumber))) &&
		(checkOptProp(value, 'valueInt', isNull) || checkOptProp(value, 'valueInt', createTypedArrayGuard(isNumber))) &&
		(checkOptProp(value, 'valueLong', isNull) || checkOptProp(value, 'valueLong', createTypedArrayGuard(isNumber))) &&
		(checkOptProp(value, 'valueFloat', isNull) || checkOptProp(value, 'valueFloat', createTypedArrayGuard(isNumber))) &&
		(checkOptProp(value, 'valueDouble', isNull) || checkOptProp(value, 'valueDouble', createTypedArrayGuard(isNumber))) &&
		(checkOptProp(value, 'valueString', isNull) || checkOptProp(value, 'valueString', createTypedArrayGuard(isString))) &&
		(checkOptProp(value, 'valueLocalDate', isNull) || checkOptProp(value, 'valueLocalDate', createTypedArrayGuard(isString))) &&
		(checkOptProp(value, 'valueLocalDateTime', isNull) || checkOptProp(value, 'valueLocalDateTime', createTypedArrayGuard(isString))) &&
		(checkOptProp(value, 'valueZonedDateTime', isNull) || checkOptProp(value, 'valueZonedDateTime', createTypedArrayGuard(isString)));
}
`.trim();

const EnumRecord_Typeguard_Result = `
export function isEnumRecord(value: unknown): value is EnumRecord {
	return isRecord(value) &&
		checkProp(value, 'value', isSampleEnum) &&
		(checkProp(value, 'value_Null', isNull) || checkProp(value, 'value_Null', isSampleEnum)) &&
		checkOptProp(value, 'value_Opt', isSampleEnum) &&
		(checkOptProp(value, 'value_Opt_Null', isNull) || checkOptProp(value, 'value_Opt_Null', isSampleEnum)) &&
		checkProp(value, 'list', createTypedArrayGuard(isSampleEnum)) &&
		(checkProp(value, 'list_Null', isNull) || checkProp(value, 'list_Null', createTypedArrayGuard(isSampleEnum))) &&
		checkOptProp(value, 'list_Opt', createTypedArrayGuard(isSampleEnum)) &&
		(checkOptProp(value, 'list_Opt_Null', isNull) || checkOptProp(value, 'list_Opt_Null', createTypedArrayGuard(isSampleEnum)));
}
`.trim();

const EnumInlineRecord_Typeguard_Result = `
export function isEnumInlineRecord(value: unknown): value is EnumInlineRecord {
	return isRecord(value) &&
		checkProp(value, 'value', isEnumInlineRecord_Value) &&
		(checkProp(value, 'value_Null', isNull) || checkProp(value, 'value_Null', isEnumInlineRecord_Value_Null)) &&
		checkOptProp(value, 'value_Opt', isEnumInlineRecord_Value_Opt) &&
		(checkOptProp(value, 'value_Opt_Null', isNull) || checkOptProp(value, 'value_Opt_Null', isEnumInlineRecord_Value_Opt_Null)) &&
		checkProp(value, 'list', createTypedArrayGuard(isEnumInlineRecord_List)) &&
		(checkProp(value, 'list_Null', isNull) || checkProp(value, 'list_Null', createTypedArrayGuard(isEnumInlineRecord_List_Null))) &&
		(checkOptProp(value, 'list_Opt_Null', isNull) || checkOptProp(value, 'list_Opt_Null', createTypedArrayGuard(isEnumInlineRecord_List_Opt_Null)));
}
`.trim();

const ScalarRecord_Typeguard_Result = `
export function isScalarRecord(value: unknown): value is ScalarRecord {
	return isRecord(value) &&
		checkProp(value, 'value', isString) &&
		(checkProp(value, 'value_Null', isNull) || checkProp(value, 'value_Null', isString)) &&
		checkOptProp(value, 'value_Opt', isString) &&
		(checkOptProp(value, 'value_Opt_Null', isNull) || checkOptProp(value, 'value_Opt_Null', isString)) &&
		checkProp(value, 'list', createTypedArrayGuard(isString)) &&
		(checkProp(value, 'list_Null', isNull) || checkProp(value, 'list_Null', createTypedArrayGuard(isString))) &&
		checkOptProp(value, 'list_Opt', createTypedArrayGuard(isString)) &&
		(checkOptProp(value, 'list_Opt_Null', isNull) || checkOptProp(value, 'list_Opt_Null', createTypedArrayGuard(isString)));
}
`.trim();

const RecordOfRecords_Typeguard_Result = `
export function isRecordOfRecords(value: unknown): value is RecordOfRecords {
	return isRecord(value) &&
		checkProp(value, 'value', isSimpleRecord_Basic) &&
		(checkProp(value, 'value_Null', isNull) || checkProp(value, 'value_Null', isSimpleRecord_Basic)) &&
		checkOptProp(value, 'value_Opt', isSimpleRecord_Basic) &&
		(checkOptProp(value, 'value_Opt_Null', isNull) || checkOptProp(value, 'value_Opt_Null', isSimpleRecord_Basic)) &&
		checkProp(value, 'list', createTypedArrayGuard(isSimpleRecord_Basic)) &&
		(checkProp(value, 'list_Null', isNull) || checkProp(value, 'list_Null', createTypedArrayGuard(isSimpleRecord_Basic))) &&
		checkOptProp(value, 'list_Opt', createTypedArrayGuard(isSimpleRecord_Basic)) &&
		(checkOptProp(value, 'list_Opt_Null', isNull) || checkOptProp(value, 'list_Opt_Null', createTypedArrayGuard(isSimpleRecord_Basic)));
}
`.trim();

const RecordWithUnions_Typeguard_Result = `
export function isRecordWithUnions(value: unknown): value is RecordWithUnions {
	return isRecord(value) &&
		checkProp(value, 'value', isUnion) &&
		(checkProp(value, 'value_Null', isNull) || checkProp(value, 'value_Null', isUnion)) &&
		checkOptProp(value, 'value_Opt', isUnion) &&
		(checkOptProp(value, 'value_Opt_Null', isNull) || checkOptProp(value, 'value_Opt_Null', isUnion)) &&
		checkProp(value, 'list', createTypedArrayGuard(isUnion)) &&
		(checkProp(value, 'list_Null', isNull) || checkProp(value, 'list_Null', createTypedArrayGuard(isUnion))) &&
		checkOptProp(value, 'list_Opt', createTypedArrayGuard(isUnion)) &&
		(checkOptProp(value, 'list_Opt_Null', isNull) || checkOptProp(value, 'list_Opt_Null', createTypedArrayGuard(isUnion)));
}
`.trim();

const RECORD_TYPEGUARDS: RecordTest[] = [
	{
		name: 'SimpleRecord_KeyVersion',
		result: SimpleRecord_KeyVersion_Typeguard_Result,
	},
	{
		name: 'SimpleRecord_KeyVersion_Int_Int',
		result: SimpleRecord_KeyVersion_Int_Int_Typeguard_Result,
	},
	{
		name: 'SimpleRecord',
		result: SimpleRecord_Typeguard_Result,
	},
	{
		name: 'SimpleRecord_Basic',
		result: SimpleRecord_Basic_Typeguard_Result,
	},
	{
		name: 'SimpleRecord_Basic_Optional',
		result: SimpleRecord_Basic_Optional_Typeguard_Result,
	},
	{
		name: 'SimpleRecord_Basic_Null',
		result: SimpleRecord_Basic_Null_Typeguard_Result,
	},
	{
		name: 'SimpleRecord_Basic_Optional_Null',
		result: SimpleRecord_Basic_Optional_Null_Typeguard_Result,
	},
	{
		name: 'SimpleRecord_Basic_List',
		result: SimpleRecord_Basic_List_Typeguard_Result,
	},
	{
		name: 'SimpleRecord_Basic_List_Optional',
		result: SimpleRecord_Basic_List_Optional_Typeguard_Result,
	},
	{
		name: 'SimpleRecord_Basic_List_Null',
		result: SimpleRecord_Basic_List_Null_Typeguard_Result,
	},
	{
		name: 'SimpleRecord_Basic_List_Optional_Null',
		result: SimpleRecord_Basic_List_Optional_Null_Typeguard_Result,
	},
	{
		name: 'EnumRecord',
		result: EnumRecord_Typeguard_Result,
	},
	{
		name: 'EnumInlineRecord',
		result: EnumInlineRecord_Typeguard_Result,
	},
	{
		name: 'ScalarRecord',
		result: ScalarRecord_Typeguard_Result,
	},
	{
		name: 'RecordOfRecords',
		result: RecordOfRecords_Typeguard_Result,
	},
	{
		name: 'RecordWithUnions',
		result: RecordWithUnions_Typeguard_Result,
	},
];

describe('RecordTypeguard', () => {
	test.each(RECORD_TYPEGUARDS)('$name', data => {
		const recordModel = findListElement(model.elements, isMResolvedRecordType, r => r.name === data.name);
		const allProps = allResolvedRecordProperties(recordModel);
		const result = toString(RecordTypeguard(recordModel, allProps, fqn), '\t').trim();
		expect(result).toBe(data.result);
	});
});

const PatchableRecord_Typeguard_Result = `
export function isPatchableRecordPatch(value: unknown): value is PatchableRecordPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString) &&
		checkOptProp(value, 'value', isString);
}
`.trim();

const PatchableRecord_Basic_Typeguard_Result = `
export function isPatchableRecord_BasicPatch(value: unknown): value is PatchableRecord_BasicPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString) &&
		checkOptProp(value, 'valueBoolean', isBoolean) &&
		checkOptProp(value, 'valueShort', isNumber) &&
		checkOptProp(value, 'valueInt', isNumber) &&
		checkOptProp(value, 'valueLong', isNumber) &&
		checkOptProp(value, 'valueFloat', isNumber) &&
		checkOptProp(value, 'valueDouble', isNumber) &&
		checkOptProp(value, 'valueString', isString) &&
		checkOptProp(value, 'valueLocalDate', isString) &&
		checkOptProp(value, 'valueLocalDateTime', isString) &&
		checkOptProp(value, 'valueZonedDateTime', isString);
}
`.trim();

const PatchableRecord_Basic_Optional_Typeguard_Result = `
export function isPatchableRecord_Basic_OptionalPatch(value: unknown): value is PatchableRecord_Basic_OptionalPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString) &&
		(checkOptProp(value, 'valueBoolean', isNull) || checkOptProp(value, 'valueBoolean', isBoolean)) &&
		(checkOptProp(value, 'valueShort', isNull) || checkOptProp(value, 'valueShort', isNumber)) &&
		(checkOptProp(value, 'valueInt', isNull) || checkOptProp(value, 'valueInt', isNumber)) &&
		(checkOptProp(value, 'valueLong', isNull) || checkOptProp(value, 'valueLong', isNumber)) &&
		(checkOptProp(value, 'valueFloat', isNull) || checkOptProp(value, 'valueFloat', isNumber)) &&
		(checkOptProp(value, 'valueDouble', isNull) || checkOptProp(value, 'valueDouble', isNumber)) &&
		(checkOptProp(value, 'valueString', isNull) || checkOptProp(value, 'valueString', isString)) &&
		(checkOptProp(value, 'valueLocalDate', isNull) || checkOptProp(value, 'valueLocalDate', isString)) &&
		(checkOptProp(value, 'valueLocalDateTime', isNull) || checkOptProp(value, 'valueLocalDateTime', isString)) &&
		(checkOptProp(value, 'valueZonedDateTime', isNull) || checkOptProp(value, 'valueZonedDateTime', isString));
}
`.trim();

const PatchableRecord_Basic_Null_Typeguard_Result = `
export function isPatchableRecord_Basic_NullPatch(value: unknown): value is PatchableRecord_Basic_NullPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString) &&
		(checkOptProp(value, 'valueBoolean', isNull) || checkOptProp(value, 'valueBoolean', isBoolean)) &&
		(checkOptProp(value, 'valueShort', isNull) || checkOptProp(value, 'valueShort', isNumber)) &&
		(checkOptProp(value, 'valueInt', isNull) || checkOptProp(value, 'valueInt', isNumber)) &&
		(checkOptProp(value, 'valueLong', isNull) || checkOptProp(value, 'valueLong', isNumber)) &&
		(checkOptProp(value, 'valueFloat', isNull) || checkOptProp(value, 'valueFloat', isNumber)) &&
		(checkOptProp(value, 'valueDouble', isNull) || checkOptProp(value, 'valueDouble', isNumber)) &&
		(checkOptProp(value, 'valueString', isNull) || checkOptProp(value, 'valueString', isString)) &&
		(checkOptProp(value, 'valueLocalDate', isNull) || checkOptProp(value, 'valueLocalDate', isString)) &&
		(checkOptProp(value, 'valueLocalDateTime', isNull) || checkOptProp(value, 'valueLocalDateTime', isString)) &&
		(checkOptProp(value, 'valueZonedDateTime', isNull) || checkOptProp(value, 'valueZonedDateTime', isString));
}
`.trim();

const PatchableRecord_Basic_Optional_Null_Typeguard_Result = `
export function isPatchableRecord_Basic_Optional_NullPatch(value: unknown): value is PatchableRecord_Basic_Optional_NullPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString) &&
		(checkOptProp(value, 'valueBoolean', isNull) || checkOptProp(value, 'valueBoolean', isBoolean)) &&
		(checkOptProp(value, 'valueShort', isNull) || checkOptProp(value, 'valueShort', isNumber)) &&
		(checkOptProp(value, 'valueInt', isNull) || checkOptProp(value, 'valueInt', isNumber)) &&
		(checkOptProp(value, 'valueLong', isNull) || checkOptProp(value, 'valueLong', isNumber)) &&
		(checkOptProp(value, 'valueFloat', isNull) || checkOptProp(value, 'valueFloat', isNumber)) &&
		(checkOptProp(value, 'valueDouble', isNull) || checkOptProp(value, 'valueDouble', isNumber)) &&
		(checkOptProp(value, 'valueString', isNull) || checkOptProp(value, 'valueString', isString)) &&
		(checkOptProp(value, 'valueLocalDate', isNull) || checkOptProp(value, 'valueLocalDate', isString)) &&
		(checkOptProp(value, 'valueLocalDateTime', isNull) || checkOptProp(value, 'valueLocalDateTime', isString)) &&
		(checkOptProp(value, 'valueZonedDateTime', isNull) || checkOptProp(value, 'valueZonedDateTime', isString));
}
`.trim();

const PatchableRecord_Basic_List_Typeguard_Result = `
export function isPatchableRecord_Basic_ListPatch(value: unknown): value is PatchableRecord_Basic_ListPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString) &&
		checkOptProp(value, 'valueBoolean', createReplaceAddRemoveGuard(isBoolean)) &&
		checkOptProp(value, 'valueShort', createReplaceAddRemoveGuard(isNumber)) &&
		checkOptProp(value, 'valueInt', createReplaceAddRemoveGuard(isNumber)) &&
		checkOptProp(value, 'valueLong', createReplaceAddRemoveGuard(isNumber)) &&
		checkOptProp(value, 'valueFloat', createReplaceAddRemoveGuard(isNumber)) &&
		checkOptProp(value, 'valueDouble', createReplaceAddRemoveGuard(isNumber)) &&
		checkOptProp(value, 'valueString', createReplaceAddRemoveGuard(isString)) &&
		checkOptProp(value, 'valueLocalDate', createReplaceAddRemoveGuard(isString)) &&
		checkOptProp(value, 'valueLocalDateTime', createReplaceAddRemoveGuard(isString)) &&
		checkOptProp(value, 'valueZonedDateTime', createReplaceAddRemoveGuard(isString));
}
`.trim();

const PatchableRecord_Basic_List_Optional_Typeguard_Result = `
export function isPatchableRecord_Basic_List_OptionalPatch(value: unknown): value is PatchableRecord_Basic_List_OptionalPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString) &&
		(checkOptProp(value, 'valueBoolean', isNull) || checkOptProp(value, 'valueBoolean', createReplaceAddRemoveGuard(isBoolean))) &&
		(checkOptProp(value, 'valueShort', isNull) || checkOptProp(value, 'valueShort', createReplaceAddRemoveGuard(isNumber))) &&
		(checkOptProp(value, 'valueInt', isNull) || checkOptProp(value, 'valueInt', createReplaceAddRemoveGuard(isNumber))) &&
		(checkOptProp(value, 'valueLong', isNull) || checkOptProp(value, 'valueLong', createReplaceAddRemoveGuard(isNumber))) &&
		(checkOptProp(value, 'valueFloat', isNull) || checkOptProp(value, 'valueFloat', createReplaceAddRemoveGuard(isNumber))) &&
		(checkOptProp(value, 'valueDouble', isNull) || checkOptProp(value, 'valueDouble', createReplaceAddRemoveGuard(isNumber))) &&
		(checkOptProp(value, 'valueString', isNull) || checkOptProp(value, 'valueString', createReplaceAddRemoveGuard(isString))) &&
		(checkOptProp(value, 'valueLocalDate', isNull) || checkOptProp(value, 'valueLocalDate', createReplaceAddRemoveGuard(isString))) &&
		(checkOptProp(value, 'valueLocalDateTime', isNull) || checkOptProp(value, 'valueLocalDateTime', createReplaceAddRemoveGuard(isString))) &&
		(checkOptProp(value, 'valueZonedDateTime', isNull) || checkOptProp(value, 'valueZonedDateTime', createReplaceAddRemoveGuard(isString)));
}
`.trim();

const PatchableRecord_Basic_List_Null_Typeguard_Result = `
export function isPatchableRecord_Basic_List_NullPatch(value: unknown): value is PatchableRecord_Basic_List_NullPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString) &&
		(checkOptProp(value, 'valueBoolean', isNull) || checkOptProp(value, 'valueBoolean', createReplaceAddRemoveGuard(isBoolean))) &&
		(checkOptProp(value, 'valueShort', isNull) || checkOptProp(value, 'valueShort', createReplaceAddRemoveGuard(isNumber))) &&
		(checkOptProp(value, 'valueInt', isNull) || checkOptProp(value, 'valueInt', createReplaceAddRemoveGuard(isNumber))) &&
		(checkOptProp(value, 'valueLong', isNull) || checkOptProp(value, 'valueLong', createReplaceAddRemoveGuard(isNumber))) &&
		(checkOptProp(value, 'valueFloat', isNull) || checkOptProp(value, 'valueFloat', createReplaceAddRemoveGuard(isNumber))) &&
		(checkOptProp(value, 'valueDouble', isNull) || checkOptProp(value, 'valueDouble', createReplaceAddRemoveGuard(isNumber))) &&
		(checkOptProp(value, 'valueString', isNull) || checkOptProp(value, 'valueString', createReplaceAddRemoveGuard(isString))) &&
		(checkOptProp(value, 'valueLocalDate', isNull) || checkOptProp(value, 'valueLocalDate', createReplaceAddRemoveGuard(isString))) &&
		(checkOptProp(value, 'valueLocalDateTime', isNull) || checkOptProp(value, 'valueLocalDateTime', createReplaceAddRemoveGuard(isString))) &&
		(checkOptProp(value, 'valueZonedDateTime', isNull) || checkOptProp(value, 'valueZonedDateTime', createReplaceAddRemoveGuard(isString)));
}
`.trim();

const PatchableRecord_Basic_List_Optional_Null_Typeguard_Result = `
export function isPatchableRecord_Basic_List_Optional_NullPatch(value: unknown): value is PatchableRecord_Basic_List_Optional_NullPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString) &&
		(checkOptProp(value, 'valueBoolean', isNull) || checkOptProp(value, 'valueBoolean', createReplaceAddRemoveGuard(isBoolean))) &&
		(checkOptProp(value, 'valueShort', isNull) || checkOptProp(value, 'valueShort', createReplaceAddRemoveGuard(isNumber))) &&
		(checkOptProp(value, 'valueInt', isNull) || checkOptProp(value, 'valueInt', createReplaceAddRemoveGuard(isNumber))) &&
		(checkOptProp(value, 'valueLong', isNull) || checkOptProp(value, 'valueLong', createReplaceAddRemoveGuard(isNumber))) &&
		(checkOptProp(value, 'valueFloat', isNull) || checkOptProp(value, 'valueFloat', createReplaceAddRemoveGuard(isNumber))) &&
		(checkOptProp(value, 'valueDouble', isNull) || checkOptProp(value, 'valueDouble', createReplaceAddRemoveGuard(isNumber))) &&
		(checkOptProp(value, 'valueString', isNull) || checkOptProp(value, 'valueString', createReplaceAddRemoveGuard(isString))) &&
		(checkOptProp(value, 'valueLocalDate', isNull) || checkOptProp(value, 'valueLocalDate', createReplaceAddRemoveGuard(isString))) &&
		(checkOptProp(value, 'valueLocalDateTime', isNull) || checkOptProp(value, 'valueLocalDateTime', createReplaceAddRemoveGuard(isString))) &&
		(checkOptProp(value, 'valueZonedDateTime', isNull) || checkOptProp(value, 'valueZonedDateTime', createReplaceAddRemoveGuard(isString)));
}
`.trim();

const PatchableEnumRecord_Typeguard_Result = `
export function isPatchableEnumRecordPatch(value: unknown): value is PatchableEnumRecordPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString) &&
		checkOptProp(value, 'value', isSampleEnum) &&
		(checkOptProp(value, 'value_Null', isNull) || checkOptProp(value, 'value_Null', isSampleEnum)) &&
		(checkOptProp(value, 'value_Opt', isNull) || checkOptProp(value, 'value_Opt', isSampleEnum)) &&
		(checkOptProp(value, 'value_Opt_Null', isNull) || checkOptProp(value, 'value_Opt_Null', isSampleEnum)) &&
		checkOptProp(value, 'list', createReplaceAddRemoveGuard(isSampleEnum)) &&
		(checkOptProp(value, 'list_Null', isNull) || checkOptProp(value, 'list_Null', createReplaceAddRemoveGuard(isSampleEnum))) &&
		(checkOptProp(value, 'list_Opt', isNull) || checkOptProp(value, 'list_Opt', createReplaceAddRemoveGuard(isSampleEnum))) &&
		(checkOptProp(value, 'list_Opt_Null', isNull) || checkOptProp(value, 'list_Opt_Null', createReplaceAddRemoveGuard(isSampleEnum)));
}
`.trim();

const PatchableEnumInlineRecord_Typeguard_Result = `
export function isPatchableEnumInlineRecordPatch(value: unknown): value is PatchableEnumInlineRecordPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString) &&
		checkOptProp(value, 'value', isPatchableEnumInlineRecord_Value) &&
		(checkOptProp(value, 'value_Null', isNull) || checkOptProp(value, 'value_Null', isPatchableEnumInlineRecord_Value_Null)) &&
		(checkOptProp(value, 'value_Opt', isNull) || checkOptProp(value, 'value_Opt', isPatchableEnumInlineRecord_Value_Opt)) &&
		(checkOptProp(value, 'value_Opt_Null', isNull) || checkOptProp(value, 'value_Opt_Null', isPatchableEnumInlineRecord_Value_Opt_Null)) &&
		checkOptProp(value, 'list', createReplaceAddRemoveGuard(isPatchableEnumInlineRecord_List)) &&
		(checkOptProp(value, 'list_Null', isNull) || checkOptProp(value, 'list_Null', createReplaceAddRemoveGuard(isPatchableEnumInlineRecord_List_Null))) &&
		(checkOptProp(value, 'list_Opt_Null', isNull) || checkOptProp(value, 'list_Opt_Null', createReplaceAddRemoveGuard(isPatchableEnumInlineRecord_List_Opt_Null)));
}
`.trim();

const PatchableScalarRecord_Typeguard_Result = `
export function isPatchableScalarRecordPatch(value: unknown): value is PatchableScalarRecordPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString) &&
		checkOptProp(value, 'value', isString) &&
		(checkOptProp(value, 'value_Null', isNull) || checkOptProp(value, 'value_Null', isString)) &&
		(checkOptProp(value, 'value_Opt', isNull) || checkOptProp(value, 'value_Opt', isString)) &&
		(checkOptProp(value, 'value_Opt_Null', isNull) || checkOptProp(value, 'value_Opt_Null', isString)) &&
		checkOptProp(value, 'list', createReplaceAddRemoveGuard(isString)) &&
		(checkOptProp(value, 'list_Null', isNull) || checkOptProp(value, 'list_Null', createReplaceAddRemoveGuard(isString))) &&
		(checkOptProp(value, 'list_Opt', isNull) || checkOptProp(value, 'list_Opt', createReplaceAddRemoveGuard(isString))) &&
		(checkOptProp(value, 'list_Opt_Null', isNull) || checkOptProp(value, 'list_Opt_Null', createReplaceAddRemoveGuard(isString)));
}
`.trim();

const PatchableRecordOfRecords_Typeguard_Result = `
export function isPatchableRecordOfRecordsPatch(value: unknown): value is PatchableRecordOfRecordsPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString) &&
		checkOptProp(value, 'value', isPatchableRecord_Basic) &&
		(checkOptProp(value, 'value_Null', isNull) || checkOptProp(value, 'value_Null', isPatchableRecord_Basic)) &&
		(checkOptProp(value, 'value_Opt', isNull) || checkOptProp(value, 'value_Opt', isPatchableRecord_Basic)) &&
		(checkOptProp(value, 'value_Opt_Null', isNull) || checkOptProp(value, 'value_Opt_Null', isPatchableRecord_Basic)) &&
		checkOptProp(value, 'list', createReplaceAddUpdateRemoveGuard(isPatchableRecord_Basic, isPatchableRecord_BasicPatch, isString)) &&
		(checkOptProp(value, 'list_Null', isNull) || checkOptProp(value, 'list_Null', createReplaceAddUpdateRemoveGuard(isPatchableRecord_Basic, isPatchableRecord_BasicPatch, isString))) &&
		(checkOptProp(value, 'list_Opt', isNull) || checkOptProp(value, 'list_Opt', createReplaceAddUpdateRemoveGuard(isPatchableRecord_Basic, isPatchableRecord_BasicPatch, isString))) &&
		(checkOptProp(value, 'list_Opt_Null', isNull) || checkOptProp(value, 'list_Opt_Null', createReplaceAddUpdateRemoveGuard(isPatchableRecord_Basic, isPatchableRecord_BasicPatch, isString)));
}
`.trim();

const PatchableRecordWithUnion_Typeguard_Result = `
export function isPatchableRecordWithUnionPatch(value: unknown): value is PatchableRecordWithUnionPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isString) &&
		checkProp(value, 'version', isString) &&
		checkOptProp(value, 'value', isPatchableUnionPatch) &&
		(checkOptProp(value, 'value_Null', isNull) || checkOptProp(value, 'value_Null', isPatchableUnionPatch)) &&
		(checkOptProp(value, 'value_Opt', isNull) || checkOptProp(value, 'value_Opt', isPatchableUnionPatch)) &&
		(checkOptProp(value, 'value_Opt_Null', isNull) || checkOptProp(value, 'value_Opt_Null', isPatchableUnionPatch)) &&
		checkOptProp(value, 'list', createReplaceAddUpdateRemoveGuard(isPatchableUnion, isPatchableUnionPatch, isString)) &&
		(checkOptProp(value, 'list_Null', isNull) || checkOptProp(value, 'list_Null', createReplaceAddUpdateRemoveGuard(isPatchableUnion, isPatchableUnionPatch, isString))) &&
		(checkOptProp(value, 'list_Opt', isNull) || checkOptProp(value, 'list_Opt', createReplaceAddUpdateRemoveGuard(isPatchableUnion, isPatchableUnionPatch, isString))) &&
		(checkOptProp(value, 'list_Opt_Null', isNull) || checkOptProp(value, 'list_Opt_Null', createReplaceAddUpdateRemoveGuard(isPatchableUnion, isPatchableUnionPatch, isString)));
}
`.trim();

const RECORD_TYPEGUARDS_PATCH: RecordTest[] = [
	{
		name: 'PatchableRecord',
		result: PatchableRecord_Typeguard_Result,
	},
	{
		name: 'PatchableRecord_Basic',
		result: PatchableRecord_Basic_Typeguard_Result,
	},
	{
		name: 'PatchableRecord_Basic_Optional',
		result: PatchableRecord_Basic_Optional_Typeguard_Result,
	},
	{
		name: 'PatchableRecord_Basic_Null',
		result: PatchableRecord_Basic_Null_Typeguard_Result,
	},
	{
		name: 'PatchableRecord_Basic_Optional_Null',
		result: PatchableRecord_Basic_Optional_Null_Typeguard_Result,
	},
	{
		name: 'PatchableRecord_Basic_List',
		result: PatchableRecord_Basic_List_Typeguard_Result,
	},
	{
		name: 'PatchableRecord_Basic_List_Optional',
		result: PatchableRecord_Basic_List_Optional_Typeguard_Result,
	},
	{
		name: 'PatchableRecord_Basic_List_Null',
		result: PatchableRecord_Basic_List_Null_Typeguard_Result,
	},
	{
		name: 'PatchableRecord_Basic_List_Optional_Null',
		result: PatchableRecord_Basic_List_Optional_Null_Typeguard_Result,
	},
	{
		name: 'PatchableEnumRecord',
		result: PatchableEnumRecord_Typeguard_Result,
	},
	{
		name: 'PatchableEnumInlineRecord',
		result: PatchableEnumInlineRecord_Typeguard_Result,
	},
	{
		name: 'PatchableScalarRecord',
		result: PatchableScalarRecord_Typeguard_Result,
	},
	{
		name: 'PatchableRecordWithUnion',
		result: PatchableRecordWithUnion_Typeguard_Result,
	},
];

describe('RecordTypeguardPatch', () => {
	test.each(RECORD_TYPEGUARDS_PATCH)('$name', data => {
		const recordModel = findListElement(model.elements, isMResolvedRecordType, r => r.name === data.name);
		const allProps = allResolvedRecordProperties(recordModel);
		const result = toString(RecordTypeguardPatch(recordModel, allProps, fqn), '\t').trim();
		expect(result).toBe(data.result);
	});
});
