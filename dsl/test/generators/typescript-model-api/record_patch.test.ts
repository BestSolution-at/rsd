import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { createTypescriptClientAPIGeneratorConfig, findListElement, sampleModel } from '../test-utils.js';
import { allResolvedRecordProperties, isMResolvedProperty, isMResolvedRecordType, MResolvedRSDModel } from '../../../src/cli/model.js';
import { TypescriptImportCollector } from '../../../src/cli/typescript-gen-utils.js';
import { FromJSONPatch, ListChangeTypes, RecordTypeguardPatch, RecordTypePatch, ValueChangeTypeGuard, ValueChangeTypes } from '../../../src/cli/typescript-model-api/record.js';
import { toString } from 'langium/generate';

type RecordTest = {
	name: string;
	result: string;
};

type PropertyTest = {
	recordName: string;
	propertyName: string;
	result: string;
};

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
type $ListMerge = ListMergeAddUpdateRemove<PatchableRecord_BasicPatch, PatchableRecord_BasicPatch, string>;
type $ListPatch = $ListReplace | $ListMerge;
`.trim();

const PatchableRecordOfRecords_list_Null_Result = `
type $List_NullReplace = ListReplace<PatchableRecord_BasicPatch>;
type $List_NullMerge = ListMergeAddUpdateRemove<PatchableRecord_BasicPatch, PatchableRecord_BasicPatch, string>;
type $List_NullPatch = $List_NullReplace | $List_NullMerge;
`.trim();

const PatchableRecordOfRecords_list_Opt_Result = `
type $List_OptReplace = ListReplace<PatchableRecord_BasicPatch>;
type $List_OptMerge = ListMergeAddUpdateRemove<PatchableRecord_BasicPatch, PatchableRecord_BasicPatch, string>;
type $List_OptPatch = $List_OptReplace | $List_OptMerge;
`.trim();

const PatchableRecordOfRecords_list_Opt_Null_Result = `
type $List_Opt_NullReplace = ListReplace<PatchableRecord_BasicPatch>;
type $List_Opt_NullMerge = ListMergeAddUpdateRemove<PatchableRecord_BasicPatch, PatchableRecord_BasicPatch, string>;
type $List_Opt_NullPatch = $List_Opt_NullReplace | $List_Opt_NullMerge;
`.trim();

const PatchableRecordWithUnion_list = `
type $ListReplace = ListReplace<PatchableUnionPatch>;
type $ListMerge = ListMergeAddUpdateRemove<PatchableUnionPatch, PatchableUnionPatch, string>;
type $ListPatch = $ListReplace | $ListMerge;
`.trim();
const PatchableRecordWithUnion_list_Null = `
type $List_NullReplace = ListReplace<PatchableUnionPatch>;
type $List_NullMerge = ListMergeAddUpdateRemove<PatchableUnionPatch, PatchableUnionPatch, string>;
type $List_NullPatch = $List_NullReplace | $List_NullMerge;
`.trim();
const PatchableRecordWithUnion_list_Opt = `
type $List_OptReplace = ListReplace<PatchableUnionPatch>;
type $List_OptMerge = ListMergeAddUpdateRemove<PatchableUnionPatch, PatchableUnionPatch, string>;
type $List_OptPatch = $List_OptReplace | $List_OptMerge;
`.trim();
const PatchableRecordWithUnion_list_Opt_Null = `
type $List_Opt_NullReplace = ListReplace<PatchableUnionPatch>;
type $List_Opt_NullMerge = ListMergeAddUpdateRemove<PatchableUnionPatch, PatchableUnionPatch, string>;
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
type $ValuePatch = (PatchableRecord_Basic & Replace) | (PatchableRecord_BasicPatch & Merge);
`.trim();

const PatchableRecordOfRecordsPatch_value_Null_Result = `
type $Value_NullPatch = (PatchableRecord_Basic & Replace) | (PatchableRecord_BasicPatch & Merge);
`.trim();

const PatchableRecordOfRecordsPatch_value_Opt_Result = `
type $Value_OptPatch = (PatchableRecord_Basic & Replace) | (PatchableRecord_BasicPatch & Merge);
`.trim();

const PatchableRecordOfRecordsPatch_value_Opt_Null_Result = `
type $Value_Opt_NullPatch = (PatchableRecord_Basic & Replace) | (PatchableRecord_BasicPatch & Merge);
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
		checkOptProp(value, 'value', isValuePatch) &&
		(checkOptProp(value, 'value_Null', isNull) || checkOptProp(value, 'value_Null', isValue_NullPatch)) &&
		(checkOptProp(value, 'value_Opt', isNull) || checkOptProp(value, 'value_Opt', isValue_OptPatch)) &&
		(checkOptProp(value, 'value_Opt_Null', isNull) || checkOptProp(value, 'value_Opt_Null', isValue_Opt_NullPatch)) &&
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
		name: 'PatchableRecordOfRecords',
		result: PatchableRecordOfRecords_Typeguard_Result,
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

const PatchableRecordOfRecords_value_Typeguard_Result = `
function isValuePatch(v: unknown): v is $ValuePatch {
	return (isReplace(v) && isPatchableRecord_Basic(v)) || (isMerge(v) && isPatchableRecord_BasicPatch(v));
}
`.trim();

const PatchableRecordOfRecords_value_Null_Typeguard_Result = `
function isValue_NullPatch(v: unknown): v is $Value_NullPatch {
	return (isReplace(v) && isPatchableRecord_Basic(v)) || (isMerge(v) && isPatchableRecord_BasicPatch(v));
}
`.trim();

const PatchableRecordOfRecords_value_Opt_Typeguard_Result = `
function isValue_OptPatch(v: unknown): v is $Value_OptPatch {
	return (isReplace(v) && isPatchableRecord_Basic(v)) || (isMerge(v) && isPatchableRecord_BasicPatch(v));
}
`.trim();

const PatchableRecordOfRecords_value_Opt_Null_Typeguard_Result = `
function isValue_Opt_NullPatch(v: unknown): v is $Value_Opt_NullPatch {
	return (isReplace(v) && isPatchableRecord_Basic(v)) || (isMerge(v) && isPatchableRecord_BasicPatch(v));
}
`.trim();

const RECORD_PROP_TYPEGUARDS: PropertyTest[] = [
	{
		recordName: 'PatchableRecordOfRecords',
		propertyName: 'value',
		result: PatchableRecordOfRecords_value_Typeguard_Result,
	},
	{
		recordName: 'PatchableRecordOfRecords',
		propertyName: 'value_Null',
		result: PatchableRecordOfRecords_value_Null_Typeguard_Result,
	},
	{
		recordName: 'PatchableRecordOfRecords',
		propertyName: 'value_Opt',
		result: PatchableRecordOfRecords_value_Opt_Typeguard_Result,
	},
	{
		recordName: 'PatchableRecordOfRecords',
		propertyName: 'value_Opt_Null',
		result: PatchableRecordOfRecords_value_Opt_Null_Typeguard_Result,
	},
];

describe('ValueChangeTypeGuard', () => {
	test.each(RECORD_PROP_TYPEGUARDS)('$recordName - $propertyName', data => {
		const recordModel = findListElement(model.elements, isMResolvedRecordType, r => r.name === data.recordName);
		const allProps = allResolvedRecordProperties(recordModel);
		const prop = findListElement(allProps, isMResolvedProperty, p => p.name === data.propertyName);
		const collector = new TypescriptImportCollector(createTypescriptClientAPIGeneratorConfig());
		const fqn = collector.importType.bind(collector);
		const result = toString(ValueChangeTypeGuard(prop, fqn), '\t').trim();
		expect(result).toBe(data.result);
	});
});

const FromJson_PatchableRecord = `
export function PatchableRecordPatchFromJSON($value: Record<string, unknown>): PatchableRecordPatch {
	const key = propValue('key', $value, isString);
	const version = propValue('version', $value, isString);
	const value = propValue('value', $value, isString, 'optional');
	return {
		key,
		version,
		value,
	};
}
`.trim();

const FromJson_PatchableRecord_Basic = `
export function PatchableRecord_BasicPatchFromJSON($value: Record<string, unknown>): PatchableRecord_BasicPatch {
	const key = propValue('key', $value, isString);
	const version = propValue('version', $value, isString);
	const valueBoolean = propValue('valueBoolean', $value, isBoolean, 'optional');
	const valueShort = propValue('valueShort', $value, isNumber, 'optional');
	const valueInt = propValue('valueInt', $value, isNumber, 'optional');
	const valueLong = propValue('valueLong', $value, isNumber, 'optional');
	const valueFloat = propValue('valueFloat', $value, isNumber, 'optional');
	const valueDouble = propValue('valueDouble', $value, isNumber, 'optional');
	const valueString = propValue('valueString', $value, isString, 'optional');
	const valueLocalDate = propValue('valueLocalDate', $value, isString, 'optional');
	const valueLocalDateTime = propValue('valueLocalDateTime', $value, isString, 'optional');
	const valueZonedDateTime = propValue('valueZonedDateTime', $value, isString, 'optional');
	return {
		key,
		version,
		valueBoolean,
		valueShort,
		valueInt,
		valueLong,
		valueFloat,
		valueDouble,
		valueString,
		valueLocalDate,
		valueLocalDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const FromJson_PatchableRecord_Basic_Optional = `
export function PatchableRecord_Basic_OptionalPatchFromJSON($value: Record<string, unknown>): PatchableRecord_Basic_OptionalPatch {
	const key = propValue('key', $value, isString);
	const version = propValue('version', $value, isString);
	const valueBoolean = propValue('valueBoolean', $value, isBoolean, 'optional_null');
	const valueShort = propValue('valueShort', $value, isNumber, 'optional_null');
	const valueInt = propValue('valueInt', $value, isNumber, 'optional_null');
	const valueLong = propValue('valueLong', $value, isNumber, 'optional_null');
	const valueFloat = propValue('valueFloat', $value, isNumber, 'optional_null');
	const valueDouble = propValue('valueDouble', $value, isNumber, 'optional_null');
	const valueString = propValue('valueString', $value, isString, 'optional_null');
	const valueLocalDate = propValue('valueLocalDate', $value, isString, 'optional_null');
	const valueLocalDateTime = propValue('valueLocalDateTime', $value, isString, 'optional_null');
	const valueZonedDateTime = propValue('valueZonedDateTime', $value, isString, 'optional_null');
	return {
		key,
		version,
		valueBoolean,
		valueShort,
		valueInt,
		valueLong,
		valueFloat,
		valueDouble,
		valueString,
		valueLocalDate,
		valueLocalDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const FromJson_PatchableRecord_Basic_Null = `
export function PatchableRecord_Basic_NullPatchFromJSON($value: Record<string, unknown>): PatchableRecord_Basic_NullPatch {
	const key = propValue('key', $value, isString);
	const version = propValue('version', $value, isString);
	const valueBoolean = propValue('valueBoolean', $value, isBoolean, 'optional_null');
	const valueShort = propValue('valueShort', $value, isNumber, 'optional_null');
	const valueInt = propValue('valueInt', $value, isNumber, 'optional_null');
	const valueLong = propValue('valueLong', $value, isNumber, 'optional_null');
	const valueFloat = propValue('valueFloat', $value, isNumber, 'optional_null');
	const valueDouble = propValue('valueDouble', $value, isNumber, 'optional_null');
	const valueString = propValue('valueString', $value, isString, 'optional_null');
	const valueLocalDate = propValue('valueLocalDate', $value, isString, 'optional_null');
	const valueLocalDateTime = propValue('valueLocalDateTime', $value, isString, 'optional_null');
	const valueZonedDateTime = propValue('valueZonedDateTime', $value, isString, 'optional_null');
	return {
		key,
		version,
		valueBoolean,
		valueShort,
		valueInt,
		valueLong,
		valueFloat,
		valueDouble,
		valueString,
		valueLocalDate,
		valueLocalDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const FromJson_PatchableRecord_Basic_Optional_Null = `
export function PatchableRecord_Basic_Optional_NullPatchFromJSON($value: Record<string, unknown>): PatchableRecord_Basic_Optional_NullPatch {
	const key = propValue('key', $value, isString);
	const version = propValue('version', $value, isString);
	const valueBoolean = propValue('valueBoolean', $value, isBoolean, 'optional_null');
	const valueShort = propValue('valueShort', $value, isNumber, 'optional_null');
	const valueInt = propValue('valueInt', $value, isNumber, 'optional_null');
	const valueLong = propValue('valueLong', $value, isNumber, 'optional_null');
	const valueFloat = propValue('valueFloat', $value, isNumber, 'optional_null');
	const valueDouble = propValue('valueDouble', $value, isNumber, 'optional_null');
	const valueString = propValue('valueString', $value, isString, 'optional_null');
	const valueLocalDate = propValue('valueLocalDate', $value, isString, 'optional_null');
	const valueLocalDateTime = propValue('valueLocalDateTime', $value, isString, 'optional_null');
	const valueZonedDateTime = propValue('valueZonedDateTime', $value, isString, 'optional_null');
	return {
		key,
		version,
		valueBoolean,
		valueShort,
		valueInt,
		valueLong,
		valueFloat,
		valueDouble,
		valueString,
		valueLocalDate,
		valueLocalDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const FromJson_PatchableRecord_Basic_List = `
export function PatchableRecord_Basic_ListPatchFromJSON($value: Record<string, unknown>): PatchableRecord_Basic_ListPatch {
	const key = propValue('key', $value, isString);
	const version = propValue('version', $value, isString);
	const valueBoolean = propMappedValue('valueBoolean', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isBoolean, noopMap, isBoolean, noopMap), 'optional');
	const valueShort = propMappedValue('valueShort', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional');
	const valueInt = propMappedValue('valueInt', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional');
	const valueLong = propMappedValue('valueLong', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional');
	const valueFloat = propMappedValue('valueFloat', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional');
	const valueDouble = propMappedValue('valueDouble', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional');
	const valueString = propMappedValue('valueString', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional');
	const valueLocalDate = propMappedValue('valueLocalDate', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional');
	const valueLocalDateTime = propMappedValue('valueLocalDateTime', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional');
	const valueZonedDateTime = propMappedValue('valueZonedDateTime', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional');
	return {
		key,
		version,
		valueBoolean,
		valueShort,
		valueInt,
		valueLong,
		valueFloat,
		valueDouble,
		valueString,
		valueLocalDate,
		valueLocalDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const FromJson_PatchableRecord_Basic_List_Optional = `
export function PatchableRecord_Basic_List_OptionalPatchFromJSON($value: Record<string, unknown>): PatchableRecord_Basic_List_OptionalPatch {
	const key = propValue('key', $value, isString);
	const version = propValue('version', $value, isString);
	const valueBoolean = propMappedValue('valueBoolean', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isBoolean, noopMap, isBoolean, noopMap), 'optional_null');
	const valueShort = propMappedValue('valueShort', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional_null');
	const valueInt = propMappedValue('valueInt', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional_null');
	const valueLong = propMappedValue('valueLong', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional_null');
	const valueFloat = propMappedValue('valueFloat', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional_null');
	const valueDouble = propMappedValue('valueDouble', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional_null');
	const valueString = propMappedValue('valueString', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional_null');
	const valueLocalDate = propMappedValue('valueLocalDate', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional_null');
	const valueLocalDateTime = propMappedValue('valueLocalDateTime', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional_null');
	const valueZonedDateTime = propMappedValue('valueZonedDateTime', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional_null');
	return {
		key,
		version,
		valueBoolean,
		valueShort,
		valueInt,
		valueLong,
		valueFloat,
		valueDouble,
		valueString,
		valueLocalDate,
		valueLocalDateTime,
		valueZonedDateTime,
	};
}`.trim();

const FromJson_PatchableRecord_Basic_List_Null = `
export function PatchableRecord_Basic_List_NullPatchFromJSON($value: Record<string, unknown>): PatchableRecord_Basic_List_NullPatch {
	const key = propValue('key', $value, isString);
	const version = propValue('version', $value, isString);
	const valueBoolean = propMappedValue('valueBoolean', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isBoolean, noopMap, isBoolean, noopMap), 'optional_null');
	const valueShort = propMappedValue('valueShort', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional_null');
	const valueInt = propMappedValue('valueInt', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional_null');
	const valueLong = propMappedValue('valueLong', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional_null');
	const valueFloat = propMappedValue('valueFloat', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional_null');
	const valueDouble = propMappedValue('valueDouble', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional_null');
	const valueString = propMappedValue('valueString', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional_null');
	const valueLocalDate = propMappedValue('valueLocalDate', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional_null');
	const valueLocalDateTime = propMappedValue('valueLocalDateTime', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional_null');
	const valueZonedDateTime = propMappedValue('valueZonedDateTime', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional_null');
	return {
		key,
		version,
		valueBoolean,
		valueShort,
		valueInt,
		valueLong,
		valueFloat,
		valueDouble,
		valueString,
		valueLocalDate,
		valueLocalDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const FromJson_PatchableRecord_Basic_List_Optional_Null = `
export function PatchableRecord_Basic_List_Optional_NullPatchFromJSON($value: Record<string, unknown>): PatchableRecord_Basic_List_Optional_NullPatch {
	const key = propValue('key', $value, isString);
	const version = propValue('version', $value, isString);
	const valueBoolean = propMappedValue('valueBoolean', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isBoolean, noopMap, isBoolean, noopMap), 'optional_null');
	const valueShort = propMappedValue('valueShort', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional_null');
	const valueInt = propMappedValue('valueInt', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional_null');
	const valueLong = propMappedValue('valueLong', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional_null');
	const valueFloat = propMappedValue('valueFloat', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional_null');
	const valueDouble = propMappedValue('valueDouble', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isNumber, noopMap, isNumber, noopMap), 'optional_null');
	const valueString = propMappedValue('valueString', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional_null');
	const valueLocalDate = propMappedValue('valueLocalDate', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional_null');
	const valueLocalDateTime = propMappedValue('valueLocalDateTime', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional_null');
	const valueZonedDateTime = propMappedValue('valueZonedDateTime', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional_null');
	return {
		key,
		version,
		valueBoolean,
		valueShort,
		valueInt,
		valueLong,
		valueFloat,
		valueDouble,
		valueString,
		valueLocalDate,
		valueLocalDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const FromJson_PatchableEnumRecord = `
export function PatchableEnumRecordPatchFromJSON($value: Record<string, unknown>): PatchableEnumRecordPatch {
	const key = propValue('key', $value, isString);
	const version = propValue('version', $value, isString);
	const value = propValue('value', $value, isSampleEnum, 'optional');
	const value_Null = propValue('value_Null', $value, isSampleEnum, 'optional_null');
	const value_Opt = propValue('value_Opt', $value, isSampleEnum, 'optional_null');
	const value_Opt_Null = propValue('value_Opt_Null', $value, isSampleEnum, 'optional_null');
	const list = propMappedValue('list', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isSampleEnum, noopMap, isSampleEnum, noopMap), 'optional');
	const list_Null = propMappedValue('list_Null', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isSampleEnum, noopMap, isSampleEnum, noopMap), 'optional_null');
	const list_Opt = propMappedValue('list_Opt', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isSampleEnum, noopMap, isSampleEnum, noopMap), 'optional_null');
	const list_Opt_Null = propMappedValue('list_Opt_Null', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isSampleEnum, noopMap, isSampleEnum, noopMap), 'optional_null');
	return {
		key,
		version,
		value,
		value_Null,
		value_Opt,
		value_Opt_Null,
		list,
		list_Null,
		list_Opt,
		list_Opt_Null,
	};
}
`.trim();

const FromJson_PatchableEnumInlineRecord = `
export function PatchableEnumInlineRecordPatchFromJSON($value: Record<string, unknown>): PatchableEnumInlineRecordPatch {
	const key = propValue('key', $value, isString);
	const version = propValue('version', $value, isString);
	const value = propValue('value', $value, isPatchableEnumInlineRecord_Value, 'optional');
	const value_Null = propValue('value_Null', $value, isPatchableEnumInlineRecord_Value_Null, 'optional_null');
	const value_Opt = propValue('value_Opt', $value, isPatchableEnumInlineRecord_Value_Opt, 'optional_null');
	const value_Opt_Null = propValue('value_Opt_Null', $value, isPatchableEnumInlineRecord_Value_Opt_Null, 'optional_null');
	const list = propMappedValue('list', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isPatchableEnumInlineRecord_List, noopMap, isPatchableEnumInlineRecord_List, noopMap), 'optional');
	const list_Null = propMappedValue('list_Null', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isPatchableEnumInlineRecord_List_Null, noopMap, isPatchableEnumInlineRecord_List_Null, noopMap), 'optional_null');
	const list_Opt_Null = propMappedValue('list_Opt_Null', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isPatchableEnumInlineRecord_List_Opt_Null, noopMap, isPatchableEnumInlineRecord_List_Opt_Null, noopMap), 'optional_null');
	return {
		key,
		version,
		value,
		value_Null,
		value_Opt,
		value_Opt_Null,
		list,
		list_Null,
		list_Opt_Null,
	};
}
`.trim();

const FromJson_PatchableScalarRecord = `
export function PatchableScalarRecordPatchFromJSON($value: Record<string, unknown>): PatchableScalarRecordPatch {
	const key = propValue('key', $value, isString);
	const version = propValue('version', $value, isString);
	const value = propValue('value', $value, isString, 'optional');
	const value_Null = propValue('value_Null', $value, isString, 'optional_null');
	const value_Opt = propValue('value_Opt', $value, isString, 'optional_null');
	const value_Opt_Null = propValue('value_Opt_Null', $value, isString, 'optional_null');
	const list = propMappedValue('list', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional');
	const list_Null = propMappedValue('list_Null', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional_null');
	const list_Opt = propMappedValue('list_Opt', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional_null');
	const list_Opt_Null = propMappedValue('list_Opt_Null', $value, isRecord, v => ListMergeAddRemoveFromJSON(v, isString, noopMap, isString, noopMap), 'optional_null');
	return {
		key,
		version,
		value,
		value_Null,
		value_Opt,
		value_Opt_Null,
		list,
		list_Null,
		list_Opt,
		list_Opt_Null,
	};
}
`.trim();

const FromJson_PatchableRecordOfRecords = `
export function PatchableRecordOfRecordsPatchFromJSON($value: Record<string, unknown>): PatchableRecordOfRecordsPatch {
	const key = propValue('key', $value, isString);
	const version = propValue('version', $value, isString);
	const value = propMappedValue('value', $value, isRecord, v => ReplaceOrMergeFromJSON(v, PatchableRecord_BasicFromJSON, PatchableRecord_BasicPatchFromJSON), 'optional');
	const value_Null = propMappedValue('value_Null', $value, isRecord, v => ReplaceOrMergeFromJSON(v, PatchableRecord_BasicFromJSON, PatchableRecord_BasicPatchFromJSON), 'optional_null');
	const value_Opt = propMappedValue('value_Opt', $value, isRecord, v => ReplaceOrMergeFromJSON(v, PatchableRecord_BasicFromJSON, PatchableRecord_BasicPatchFromJSON), 'optional_null');
	const value_Opt_Null = propMappedValue('value_Opt_Null', $value, isRecord, v => ReplaceOrMergeFromJSON(v, PatchableRecord_BasicFromJSON, PatchableRecord_BasicPatchFromJSON), 'optional_null');
	const list = propMappedValue('list', $value, isRecord, v => ListMergeAddUpdateRemoveFromJSON(v, isRecord, PatchableRecord_BasicFromJSON, isRecord, PatchableRecord_BasicPatchFromJSON, isString, noopMap), 'optional');
	const list_Null = propMappedValue('list_Null', $value, isRecord, v => ListMergeAddUpdateRemoveFromJSON(v, isRecord, PatchableRecord_BasicFromJSON, isRecord, PatchableRecord_BasicPatchFromJSON, isString, noopMap), 'optional_null');
	const list_Opt = propMappedValue('list_Opt', $value, isRecord, v => ListMergeAddUpdateRemoveFromJSON(v, isRecord, PatchableRecord_BasicFromJSON, isRecord, PatchableRecord_BasicPatchFromJSON, isString, noopMap), 'optional_null');
	const list_Opt_Null = propMappedValue('list_Opt_Null', $value, isRecord, v => ListMergeAddUpdateRemoveFromJSON(v, isRecord, PatchableRecord_BasicFromJSON, isRecord, PatchableRecord_BasicPatchFromJSON, isString, noopMap), 'optional_null');
	return {
		key,
		version,
		value,
		value_Null,
		value_Opt,
		value_Opt_Null,
		list,
		list_Null,
		list_Opt,
		list_Opt_Null,
	};
}
`.trim();

const FromJson_PatchableRecordWithUnion = ``.trim();

const FROM_JSON: RecordTest[] = [
	{
		name: 'PatchableRecord',
		result: FromJson_PatchableRecord,
	},
	{
		name: 'PatchableRecord_Basic',
		result: FromJson_PatchableRecord_Basic,
	},
	{
		name: 'PatchableRecord_Basic_Optional',
		result: FromJson_PatchableRecord_Basic_Optional,
	},
	{
		name: 'PatchableRecord_Basic_Null',
		result: FromJson_PatchableRecord_Basic_Null,
	},
	{
		name: 'PatchableRecord_Basic_Optional_Null',
		result: FromJson_PatchableRecord_Basic_Optional_Null,
	},
	{
		name: 'PatchableRecord_Basic_List',
		result: FromJson_PatchableRecord_Basic_List,
	},
	{
		name: 'PatchableRecord_Basic_List_Optional',
		result: FromJson_PatchableRecord_Basic_List_Optional,
	},
	{
		name: 'PatchableRecord_Basic_List_Null',
		result: FromJson_PatchableRecord_Basic_List_Null,
	},
	{
		name: 'PatchableRecord_Basic_List_Optional_Null',
		result: FromJson_PatchableRecord_Basic_List_Optional_Null,
	},
	{
		name: 'PatchableEnumRecord',
		result: FromJson_PatchableEnumRecord,
	},
	{
		name: 'PatchableEnumInlineRecord',
		result: FromJson_PatchableEnumInlineRecord,
	},
	{
		name: 'PatchableScalarRecord',
		result: FromJson_PatchableScalarRecord,
	},
	{
		name: 'PatchableRecordOfRecords',
		result: FromJson_PatchableRecordOfRecords,
	},
	/*{
		name: 'PatchableRecordWithUnion',
		result: FromJson_PatchableRecordWithUnion,
	},*/
];

describe('FromJSONPatch', () => {
	test.each(FROM_JSON)('$name', data => {
		const recordModel = findListElement(model.elements, isMResolvedRecordType, r => r.name === data.name);
		const allProps = allResolvedRecordProperties(recordModel);
		const result = toString(FromJSONPatch(recordModel, allProps, fqn), '\t').trim();
		expect(result).toBe(data.result);
	});
});

// PatchableRecord
// PatchableRecord_Basic
// PatchableRecord_Basic_Optional
// PatchableRecord_Basic_Null
// PatchableRecord_Basic_Optional_Null
// PatchableRecord_Basic_List
// PatchableRecord_Basic_List_Optional
// PatchableRecord_Basic_List_Null
// PatchableRecord_Basic_List_Optional_Null
// PatchableEnumRecord
// PatchableEnumInlineRecord
// PatchableScalarRecord
// PatchableRecordOfRecords
// PatchableRecordWithUnion
