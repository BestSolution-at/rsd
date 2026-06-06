import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { createTypescriptClientAPIGeneratorConfig, findListElement, sampleModel } from '../test-utils.js';
import {
	allResolvedRecordProperties,
	isMPropertyInlineResolvedProperty,
	isMResolvedProperty,
	isMResolvedRecordType,
	MResolvedRSDModel,
} from '../../../src/model.js';
import { TypescriptImportCollector } from '../../../src/typescript-gen-utils.js';
import {
	FromJSONPatch,
	ListChangeTypes,
	RecordTypeguardPatch,
	RecordTypePatch,
	ToJSONPatch,
	ValueChangeTypeGuard,
	ValueChangeTypes,
} from '../../../src/typescript-model-api/record.js';
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
	collector = new TypescriptImportCollector(createTypescriptClientAPIGeneratorConfig(), 'sample.ts');
	fqn = collector.importType.bind(collector);
});

const PatchableRecord_Result = `
export type PatchableRecordPatch = {
	readonly key: RSDString;
	readonly version: RSDString;
	readonly value?: RSDString;
};
`.trim();

const PatchableRecord_BasicPatch_Result = `
export type PatchableRecord_BasicPatch = {
	readonly key: RSDString;
	readonly version: RSDString;
	readonly valueBoolean?: RSDBoolean;
	readonly valueShort?: RSDShort;
	readonly valueInt?: RSDInt;
	readonly valueLong?: RSDLong;
	readonly valueFloat?: RSDFloat;
	readonly valueDouble?: RSDDouble;
	readonly valueString?: RSDString;
	readonly valueLocalDate?: RSDLocalDate;
	readonly valueLocalDateTime?: RSDLocalDateTime;
	readonly valueLocalTime?: RSDLocalTime;
	readonly valueOffsetDateTime?: RSDOffsetDateTime;
	readonly valueZonedDateTime?: RSDZonedDateTime;
};
`.trim();

const PatchableRecord_Basic_Optional_Result = `
export type PatchableRecord_Basic_OptionalPatch = {
	readonly key: RSDString;
	readonly version: RSDString;
	readonly valueBoolean?: RSDBoolean | null;
	readonly valueShort?: RSDShort | null;
	readonly valueInt?: RSDInt | null;
	readonly valueLong?: RSDLong | null;
	readonly valueFloat?: RSDFloat | null;
	readonly valueDouble?: RSDDouble | null;
	readonly valueString?: RSDString | null;
	readonly valueLocalDate?: RSDLocalDate | null;
	readonly valueLocalDateTime?: RSDLocalDateTime | null;
	readonly valueLocalTime?: RSDLocalTime | null;
	readonly valueOffsetDateTime?: RSDOffsetDateTime | null;
	readonly valueZonedDateTime?: RSDZonedDateTime | null;
};
`.trim();

const PatchableRecord_Basic_Null_Result = `
export type PatchableRecord_Basic_NullPatch = {
	readonly key: RSDString;
	readonly version: RSDString;
	readonly valueBoolean?: RSDBoolean | null;
	readonly valueShort?: RSDShort | null;
	readonly valueInt?: RSDInt | null;
	readonly valueLong?: RSDLong | null;
	readonly valueFloat?: RSDFloat | null;
	readonly valueDouble?: RSDDouble | null;
	readonly valueString?: RSDString | null;
	readonly valueLocalDate?: RSDLocalDate | null;
	readonly valueLocalDateTime?: RSDLocalDateTime | null;
	readonly valueLocalTime?: RSDLocalTime | null;
	readonly valueOffsetDateTime?: RSDOffsetDateTime | null;
	readonly valueZonedDateTime?: RSDZonedDateTime | null;
};
`.trim();

const PatchableRecord_Basic_Optional_Null_Result = `
export type PatchableRecord_Basic_Optional_NullPatch = {
	readonly key: RSDString;
	readonly version: RSDString;
	readonly valueBoolean?: RSDBoolean | null;
	readonly valueShort?: RSDShort | null;
	readonly valueInt?: RSDInt | null;
	readonly valueLong?: RSDLong | null;
	readonly valueFloat?: RSDFloat | null;
	readonly valueDouble?: RSDDouble | null;
	readonly valueString?: RSDString | null;
	readonly valueLocalDate?: RSDLocalDate | null;
	readonly valueLocalDateTime?: RSDLocalDateTime | null;
	readonly valueLocalTime?: RSDLocalTime | null;
	readonly valueOffsetDateTime?: RSDOffsetDateTime | null;
	readonly valueZonedDateTime?: RSDZonedDateTime | null;
};
`.trim();

const PatchableRecord_Basic_List_Result = `
export type PatchableRecord_Basic_ListPatch = {
	readonly key: RSDString;
	readonly version: RSDString;
	readonly valueBoolean?: $ValueBooleanPatch;
	readonly valueShort?: $ValueShortPatch;
	readonly valueInt?: $ValueIntPatch;
	readonly valueLong?: $ValueLongPatch;
	readonly valueFloat?: $ValueFloatPatch;
	readonly valueDouble?: $ValueDoublePatch;
	readonly valueString?: $ValueStringPatch;
	readonly valueLocalDate?: $ValueLocalDatePatch;
	readonly valueLocalDateTime?: $ValueLocalDateTimePatch;
	readonly valueLocalTime?: $ValueLocalTimePatch;
	readonly valueOffsetDateTime?: $ValueOffsetDateTimePatch;
	readonly valueZonedDateTime?: $ValueZonedDateTimePatch;
};
`.trim();

const PatchableRecord_Basic_List_Optional_Result = `
export type PatchableRecord_Basic_List_OptionalPatch = {
	readonly key: RSDString;
	readonly version: RSDString;
	readonly valueBoolean?: $ValueBooleanPatch | null;
	readonly valueShort?: $ValueShortPatch | null;
	readonly valueInt?: $ValueIntPatch | null;
	readonly valueLong?: $ValueLongPatch | null;
	readonly valueFloat?: $ValueFloatPatch | null;
	readonly valueDouble?: $ValueDoublePatch | null;
	readonly valueString?: $ValueStringPatch | null;
	readonly valueLocalDate?: $ValueLocalDatePatch | null;
	readonly valueLocalDateTime?: $ValueLocalDateTimePatch | null;
	readonly valueLocalTime?: $ValueLocalTimePatch | null;
	readonly valueOffsetDateTime?: $ValueOffsetDateTimePatch | null;
	readonly valueZonedDateTime?: $ValueZonedDateTimePatch | null;
};
`.trim();

const PatchableRecord_Basic_List_Null_Result = `
export type PatchableRecord_Basic_List_NullPatch = {
	readonly key: RSDString;
	readonly version: RSDString;
	readonly valueBoolean?: $ValueBooleanPatch | null;
	readonly valueShort?: $ValueShortPatch | null;
	readonly valueInt?: $ValueIntPatch | null;
	readonly valueLong?: $ValueLongPatch | null;
	readonly valueFloat?: $ValueFloatPatch | null;
	readonly valueDouble?: $ValueDoublePatch | null;
	readonly valueString?: $ValueStringPatch | null;
	readonly valueLocalDate?: $ValueLocalDatePatch | null;
	readonly valueLocalDateTime?: $ValueLocalDateTimePatch | null;
	readonly valueLocalTime?: $ValueLocalTimePatch | null;
	readonly valueOffsetDateTime?: $ValueOffsetDateTimePatch | null;
	readonly valueZonedDateTime?: $ValueZonedDateTimePatch | null;
};
`.trim();

const PatchableEnumRecord_Result = `
export type PatchableEnumRecordPatch = {
	readonly key: RSDString;
	readonly version: RSDString;
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
	readonly key: RSDString;
	readonly version: RSDString;
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
	readonly key: RSDString;
	readonly version: RSDString;
	readonly value?: ZoneId;
	readonly value_Null?: ZoneId | null;
	readonly value_Opt?: ZoneId | null;
	readonly value_Opt_Null?: ZoneId | null;
	readonly list?: $ListPatch;
	readonly list_Null?: $List_NullPatch | null;
	readonly list_Opt?: $List_OptPatch | null;
	readonly list_Opt_Null?: $List_Opt_NullPatch | null;
};
`.trim();

const PatchableRecordOfRecordsPatch_Result = `
export type PatchableRecordOfRecordsPatch = {
	readonly key: RSDString;
	readonly version: RSDString;
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
	readonly key: RSDString;
	readonly version: RSDString;
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
type $ValueBooleanReplace = ListReplace<RSDBoolean>;
type $ValueBooleanMerge = ListMergeAddRemove<RSDBoolean, RSDBoolean>;
type $ValueBooleanPatch = $ValueBooleanReplace | $ValueBooleanMerge;
`.trim();

const PatchableRecord_Basic_List_valueShort_Result = `
type $ValueShortReplace = ListReplace<RSDShort>;
type $ValueShortMerge = ListMergeAddRemove<RSDShort, RSDShort>;
type $ValueShortPatch = $ValueShortReplace | $ValueShortMerge;
`.trim();

const PatchableRecord_Basic_List_valueInt_Result = `
type $ValueIntReplace = ListReplace<RSDInt>;
type $ValueIntMerge = ListMergeAddRemove<RSDInt, RSDInt>;
type $ValueIntPatch = $ValueIntReplace | $ValueIntMerge;
`.trim();

const PatchableRecord_Basic_List_valueLong_Result = `
type $ValueLongReplace = ListReplace<RSDLong>;
type $ValueLongMerge = ListMergeAddRemove<RSDLong, RSDLong>;
type $ValueLongPatch = $ValueLongReplace | $ValueLongMerge;
`.trim();

const PatchableRecord_Basic_List_valueFloat_Result = `
type $ValueFloatReplace = ListReplace<RSDFloat>;
type $ValueFloatMerge = ListMergeAddRemove<RSDFloat, RSDFloat>;
type $ValueFloatPatch = $ValueFloatReplace | $ValueFloatMerge;
`.trim();

const PatchableRecord_Basic_List_valueDouble_Result = `
type $ValueDoubleReplace = ListReplace<RSDDouble>;
type $ValueDoubleMerge = ListMergeAddRemove<RSDDouble, RSDDouble>;
type $ValueDoublePatch = $ValueDoubleReplace | $ValueDoubleMerge;
`.trim();

const PatchableRecord_Basic_List_valueString_Result = `
type $ValueStringReplace = ListReplace<RSDString>;
type $ValueStringMerge = ListMergeAddRemove<RSDString, RSDString>;
type $ValueStringPatch = $ValueStringReplace | $ValueStringMerge;
`.trim();

const PatchableRecord_Basic_List_valueLocalDate_Result = `
type $ValueLocalDateReplace = ListReplace<RSDLocalDate>;
type $ValueLocalDateMerge = ListMergeAddRemove<RSDLocalDate, RSDLocalDate>;
type $ValueLocalDatePatch = $ValueLocalDateReplace | $ValueLocalDateMerge;
`.trim();

const PatchableRecord_Basic_List_valueLocalDateTime_Result = `
type $ValueLocalDateTimeReplace = ListReplace<RSDLocalDateTime>;
type $ValueLocalDateTimeMerge = ListMergeAddRemove<RSDLocalDateTime, RSDLocalDateTime>;
type $ValueLocalDateTimePatch = $ValueLocalDateTimeReplace | $ValueLocalDateTimeMerge;
`.trim();

const PatchableRecord_Basic_List_valueLocalTime_Result = `
type $ValueLocalTimeReplace = ListReplace<RSDLocalTime>;
type $ValueLocalTimeMerge = ListMergeAddRemove<RSDLocalTime, RSDLocalTime>;
type $ValueLocalTimePatch = $ValueLocalTimeReplace | $ValueLocalTimeMerge;
`.trim();

const PatchableRecord_Basic_List_valueOffsetDateTime_Result = `
type $ValueOffsetDateTimeReplace = ListReplace<RSDOffsetDateTime>;
type $ValueOffsetDateTimeMerge = ListMergeAddRemove<RSDOffsetDateTime, RSDOffsetDateTime>;
type $ValueOffsetDateTimePatch = $ValueOffsetDateTimeReplace | $ValueOffsetDateTimeMerge;
`.trim();

const PatchableRecord_Basic_List_valueZonedDateTime_Result = `
type $ValueZonedDateTimeReplace = ListReplace<RSDZonedDateTime>;
type $ValueZonedDateTimeMerge = ListMergeAddRemove<RSDZonedDateTime, RSDZonedDateTime>;
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
type $ListReplace = ListReplace<ZoneId>;
type $ListMerge = ListMergeAddRemove<ZoneId, ZoneId>;
type $ListPatch = $ListReplace | $ListMerge;
`.trim();

const PatchableScalarRecord_list_Null_Result = `
type $List_NullReplace = ListReplace<ZoneId>;
type $List_NullMerge = ListMergeAddRemove<ZoneId, ZoneId>;
type $List_NullPatch = $List_NullReplace | $List_NullMerge;
`.trim();

const PatchableScalarRecord_list_Opt_Result = `
type $List_OptReplace = ListReplace<ZoneId>;
type $List_OptMerge = ListMergeAddRemove<ZoneId, ZoneId>;
type $List_OptPatch = $List_OptReplace | $List_OptMerge;
`.trim();

const PatchableScalarRecord_list_Opt_Null_Result = `
type $List_Opt_NullReplace = ListReplace<ZoneId>;
type $List_Opt_NullMerge = ListMergeAddRemove<ZoneId, ZoneId>;
type $List_Opt_NullPatch = $List_Opt_NullReplace | $List_Opt_NullMerge;
`.trim();

const PatchableRecordOfRecords_list_Result = `
type $ListReplace = ListReplace<PatchableRecord_Basic>;
type $ListMerge = ListMergeAddUpdateRemove<PatchableRecord_Basic, PatchableRecord_BasicPatch, string>;
type $ListPatch = $ListReplace | $ListMerge;
`.trim();

const PatchableRecordOfRecords_list_Null_Result = `
type $List_NullReplace = ListReplace<PatchableRecord_Basic>;
type $List_NullMerge = ListMergeAddUpdateRemove<PatchableRecord_Basic, PatchableRecord_BasicPatch, string>;
type $List_NullPatch = $List_NullReplace | $List_NullMerge;
`.trim();

const PatchableRecordOfRecords_list_Opt_Result = `
type $List_OptReplace = ListReplace<PatchableRecord_Basic>;
type $List_OptMerge = ListMergeAddUpdateRemove<PatchableRecord_Basic, PatchableRecord_BasicPatch, string>;
type $List_OptPatch = $List_OptReplace | $List_OptMerge;
`.trim();

const PatchableRecordOfRecords_list_Opt_Null_Result = `
type $List_Opt_NullReplace = ListReplace<PatchableRecord_Basic>;
type $List_Opt_NullMerge = ListMergeAddUpdateRemove<PatchableRecord_Basic, PatchableRecord_BasicPatch, string>;
type $List_Opt_NullPatch = $List_Opt_NullReplace | $List_Opt_NullMerge;
`.trim();

const PatchableRecordWithUnion_list = `
type $ListReplace = ListReplace<PatchableUnion>;
type $ListMerge = ListMergeAddUpdateRemove<PatchableUnion, PatchableUnionPatch, string>;
type $ListPatch = $ListReplace | $ListMerge;
`.trim();
const PatchableRecordWithUnion_list_Null = `
type $List_NullReplace = ListReplace<PatchableUnion>;
type $List_NullMerge = ListMergeAddUpdateRemove<PatchableUnion, PatchableUnionPatch, string>;
type $List_NullPatch = $List_NullReplace | $List_NullMerge;
`.trim();
const PatchableRecordWithUnion_list_Opt = `
type $List_OptReplace = ListReplace<PatchableUnion>;
type $List_OptMerge = ListMergeAddUpdateRemove<PatchableUnion, PatchableUnionPatch, string>;
type $List_OptPatch = $List_OptReplace | $List_OptMerge;
`.trim();
const PatchableRecordWithUnion_list_Opt_Null = `
type $List_Opt_NullReplace = ListReplace<PatchableUnion>;
type $List_Opt_NullMerge = ListMergeAddUpdateRemove<PatchableUnion, PatchableUnionPatch, string>;
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
		propertyName: 'valueLocalTime',
		result: PatchableRecord_Basic_List_valueLocalTime_Result,
	},
	{
		recordName: 'PatchableRecord_Basic_List',
		propertyName: 'valueOffsetDateTime',
		result: PatchableRecord_Basic_List_valueOffsetDateTime_Result,
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
		const collector = new TypescriptImportCollector(createTypescriptClientAPIGeneratorConfig(), 'sample.ts');
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
		const prop = findListElement(allProps, isMPropertyInlineResolvedProperty, p => p.name === data.propertyName);
		const collector = new TypescriptImportCollector(createTypescriptClientAPIGeneratorConfig(), 'sample.ts');
		const fqn = collector.importType.bind(collector);
		const result = toString(ValueChangeTypes(prop, fqn), '\t').trim();
		expect(result).toBe(data.result);
	});
});

const PatchableRecord_Typeguard_Result = `
export function isPatchableRecordPatch(value: unknown): value is PatchableRecordPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString) &&
		checkOptProp(value, 'value', isRSDString);
}
`.trim();

const PatchableRecord_Basic_Typeguard_Result = `
export function isPatchableRecord_BasicPatch(value: unknown): value is PatchableRecord_BasicPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString) &&
		checkOptProp(value, 'valueBoolean', isRSDBoolean) &&
		checkOptProp(value, 'valueShort', isRSDShort) &&
		checkOptProp(value, 'valueInt', isRSDInt) &&
		checkOptProp(value, 'valueLong', isRSDLong) &&
		checkOptProp(value, 'valueFloat', isRSDFloat) &&
		checkOptProp(value, 'valueDouble', isRSDDouble) &&
		checkOptProp(value, 'valueString', isRSDString) &&
		checkOptProp(value, 'valueLocalDate', isRSDLocalDate) &&
		checkOptProp(value, 'valueLocalDateTime', isRSDLocalDateTime) &&
		checkOptProp(value, 'valueLocalTime', isRSDLocalTime) &&
		checkOptProp(value, 'valueOffsetDateTime', isRSDOffsetDateTime) &&
		checkOptProp(value, 'valueZonedDateTime', isRSDZonedDateTime);
}
`.trim();

const PatchableRecord_Basic_Optional_Typeguard_Result = `
export function isPatchableRecord_Basic_OptionalPatch(value: unknown): value is PatchableRecord_Basic_OptionalPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString) &&
		(checkOptProp(value, 'valueBoolean', isNull) || checkOptProp(value, 'valueBoolean', isRSDBoolean)) &&
		(checkOptProp(value, 'valueShort', isNull) || checkOptProp(value, 'valueShort', isRSDShort)) &&
		(checkOptProp(value, 'valueInt', isNull) || checkOptProp(value, 'valueInt', isRSDInt)) &&
		(checkOptProp(value, 'valueLong', isNull) || checkOptProp(value, 'valueLong', isRSDLong)) &&
		(checkOptProp(value, 'valueFloat', isNull) || checkOptProp(value, 'valueFloat', isRSDFloat)) &&
		(checkOptProp(value, 'valueDouble', isNull) || checkOptProp(value, 'valueDouble', isRSDDouble)) &&
		(checkOptProp(value, 'valueString', isNull) || checkOptProp(value, 'valueString', isRSDString)) &&
		(checkOptProp(value, 'valueLocalDate', isNull) || checkOptProp(value, 'valueLocalDate', isRSDLocalDate)) &&
		(checkOptProp(value, 'valueLocalDateTime', isNull) || checkOptProp(value, 'valueLocalDateTime', isRSDLocalDateTime)) &&
		(checkOptProp(value, 'valueLocalTime', isNull) || checkOptProp(value, 'valueLocalTime', isRSDLocalTime)) &&
		(checkOptProp(value, 'valueOffsetDateTime', isNull) || checkOptProp(value, 'valueOffsetDateTime', isRSDOffsetDateTime)) &&
		(checkOptProp(value, 'valueZonedDateTime', isNull) || checkOptProp(value, 'valueZonedDateTime', isRSDZonedDateTime));
}
`.trim();

const PatchableRecord_Basic_Null_Typeguard_Result = `
export function isPatchableRecord_Basic_NullPatch(value: unknown): value is PatchableRecord_Basic_NullPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString) &&
		(checkOptProp(value, 'valueBoolean', isNull) || checkOptProp(value, 'valueBoolean', isRSDBoolean)) &&
		(checkOptProp(value, 'valueShort', isNull) || checkOptProp(value, 'valueShort', isRSDShort)) &&
		(checkOptProp(value, 'valueInt', isNull) || checkOptProp(value, 'valueInt', isRSDInt)) &&
		(checkOptProp(value, 'valueLong', isNull) || checkOptProp(value, 'valueLong', isRSDLong)) &&
		(checkOptProp(value, 'valueFloat', isNull) || checkOptProp(value, 'valueFloat', isRSDFloat)) &&
		(checkOptProp(value, 'valueDouble', isNull) || checkOptProp(value, 'valueDouble', isRSDDouble)) &&
		(checkOptProp(value, 'valueString', isNull) || checkOptProp(value, 'valueString', isRSDString)) &&
		(checkOptProp(value, 'valueLocalDate', isNull) || checkOptProp(value, 'valueLocalDate', isRSDLocalDate)) &&
		(checkOptProp(value, 'valueLocalDateTime', isNull) || checkOptProp(value, 'valueLocalDateTime', isRSDLocalDateTime)) &&
		(checkOptProp(value, 'valueLocalTime', isNull) || checkOptProp(value, 'valueLocalTime', isRSDLocalTime)) &&
		(checkOptProp(value, 'valueOffsetDateTime', isNull) || checkOptProp(value, 'valueOffsetDateTime', isRSDOffsetDateTime)) &&
		(checkOptProp(value, 'valueZonedDateTime', isNull) || checkOptProp(value, 'valueZonedDateTime', isRSDZonedDateTime));
}
`.trim();

const PatchableRecord_Basic_Optional_Null_Typeguard_Result = `
export function isPatchableRecord_Basic_Optional_NullPatch(value: unknown): value is PatchableRecord_Basic_Optional_NullPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString) &&
		(checkOptProp(value, 'valueBoolean', isNull) || checkOptProp(value, 'valueBoolean', isRSDBoolean)) &&
		(checkOptProp(value, 'valueShort', isNull) || checkOptProp(value, 'valueShort', isRSDShort)) &&
		(checkOptProp(value, 'valueInt', isNull) || checkOptProp(value, 'valueInt', isRSDInt)) &&
		(checkOptProp(value, 'valueLong', isNull) || checkOptProp(value, 'valueLong', isRSDLong)) &&
		(checkOptProp(value, 'valueFloat', isNull) || checkOptProp(value, 'valueFloat', isRSDFloat)) &&
		(checkOptProp(value, 'valueDouble', isNull) || checkOptProp(value, 'valueDouble', isRSDDouble)) &&
		(checkOptProp(value, 'valueString', isNull) || checkOptProp(value, 'valueString', isRSDString)) &&
		(checkOptProp(value, 'valueLocalDate', isNull) || checkOptProp(value, 'valueLocalDate', isRSDLocalDate)) &&
		(checkOptProp(value, 'valueLocalDateTime', isNull) || checkOptProp(value, 'valueLocalDateTime', isRSDLocalDateTime)) &&
		(checkOptProp(value, 'valueLocalTime', isNull) || checkOptProp(value, 'valueLocalTime', isRSDLocalTime)) &&
		(checkOptProp(value, 'valueOffsetDateTime', isNull) || checkOptProp(value, 'valueOffsetDateTime', isRSDOffsetDateTime)) &&
		(checkOptProp(value, 'valueZonedDateTime', isNull) || checkOptProp(value, 'valueZonedDateTime', isRSDZonedDateTime));
}
`.trim();

const PatchableRecord_Basic_List_Typeguard_Result = `
export function isPatchableRecord_Basic_ListPatch(value: unknown): value is PatchableRecord_Basic_ListPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString) &&
		checkOptProp(value, 'valueBoolean', createReplaceAddRemoveGuard(isRSDBoolean)) &&
		checkOptProp(value, 'valueShort', createReplaceAddRemoveGuard(isRSDShort)) &&
		checkOptProp(value, 'valueInt', createReplaceAddRemoveGuard(isRSDInt)) &&
		checkOptProp(value, 'valueLong', createReplaceAddRemoveGuard(isRSDLong)) &&
		checkOptProp(value, 'valueFloat', createReplaceAddRemoveGuard(isRSDFloat)) &&
		checkOptProp(value, 'valueDouble', createReplaceAddRemoveGuard(isRSDDouble)) &&
		checkOptProp(value, 'valueString', createReplaceAddRemoveGuard(isRSDString)) &&
		checkOptProp(value, 'valueLocalDate', createReplaceAddRemoveGuard(isRSDLocalDate)) &&
		checkOptProp(value, 'valueLocalDateTime', createReplaceAddRemoveGuard(isRSDLocalDateTime)) &&
		checkOptProp(value, 'valueLocalTime', createReplaceAddRemoveGuard(isRSDLocalTime)) &&
		checkOptProp(value, 'valueOffsetDateTime', createReplaceAddRemoveGuard(isRSDOffsetDateTime)) &&
		checkOptProp(value, 'valueZonedDateTime', createReplaceAddRemoveGuard(isRSDZonedDateTime));
}
`.trim();

const PatchableRecord_Basic_List_Optional_Typeguard_Result = `
export function isPatchableRecord_Basic_List_OptionalPatch(value: unknown): value is PatchableRecord_Basic_List_OptionalPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString) &&
		(checkOptProp(value, 'valueBoolean', isNull) || checkOptProp(value, 'valueBoolean', createReplaceAddRemoveGuard(isRSDBoolean))) &&
		(checkOptProp(value, 'valueShort', isNull) || checkOptProp(value, 'valueShort', createReplaceAddRemoveGuard(isRSDShort))) &&
		(checkOptProp(value, 'valueInt', isNull) || checkOptProp(value, 'valueInt', createReplaceAddRemoveGuard(isRSDInt))) &&
		(checkOptProp(value, 'valueLong', isNull) || checkOptProp(value, 'valueLong', createReplaceAddRemoveGuard(isRSDLong))) &&
		(checkOptProp(value, 'valueFloat', isNull) || checkOptProp(value, 'valueFloat', createReplaceAddRemoveGuard(isRSDFloat))) &&
		(checkOptProp(value, 'valueDouble', isNull) || checkOptProp(value, 'valueDouble', createReplaceAddRemoveGuard(isRSDDouble))) &&
		(checkOptProp(value, 'valueString', isNull) || checkOptProp(value, 'valueString', createReplaceAddRemoveGuard(isRSDString))) &&
		(checkOptProp(value, 'valueLocalDate', isNull) || checkOptProp(value, 'valueLocalDate', createReplaceAddRemoveGuard(isRSDLocalDate))) &&
		(checkOptProp(value, 'valueLocalDateTime', isNull) || checkOptProp(value, 'valueLocalDateTime', createReplaceAddRemoveGuard(isRSDLocalDateTime))) &&
		(checkOptProp(value, 'valueLocalTime', isNull) || checkOptProp(value, 'valueLocalTime', createReplaceAddRemoveGuard(isRSDLocalTime))) &&
		(checkOptProp(value, 'valueOffsetDateTime', isNull) || checkOptProp(value, 'valueOffsetDateTime', createReplaceAddRemoveGuard(isRSDOffsetDateTime))) &&
		(checkOptProp(value, 'valueZonedDateTime', isNull) || checkOptProp(value, 'valueZonedDateTime', createReplaceAddRemoveGuard(isRSDZonedDateTime)));
}
`.trim();

const PatchableRecord_Basic_List_Null_Typeguard_Result = `
export function isPatchableRecord_Basic_List_NullPatch(value: unknown): value is PatchableRecord_Basic_List_NullPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString) &&
		(checkOptProp(value, 'valueBoolean', isNull) || checkOptProp(value, 'valueBoolean', createReplaceAddRemoveGuard(isRSDBoolean))) &&
		(checkOptProp(value, 'valueShort', isNull) || checkOptProp(value, 'valueShort', createReplaceAddRemoveGuard(isRSDShort))) &&
		(checkOptProp(value, 'valueInt', isNull) || checkOptProp(value, 'valueInt', createReplaceAddRemoveGuard(isRSDInt))) &&
		(checkOptProp(value, 'valueLong', isNull) || checkOptProp(value, 'valueLong', createReplaceAddRemoveGuard(isRSDLong))) &&
		(checkOptProp(value, 'valueFloat', isNull) || checkOptProp(value, 'valueFloat', createReplaceAddRemoveGuard(isRSDFloat))) &&
		(checkOptProp(value, 'valueDouble', isNull) || checkOptProp(value, 'valueDouble', createReplaceAddRemoveGuard(isRSDDouble))) &&
		(checkOptProp(value, 'valueString', isNull) || checkOptProp(value, 'valueString', createReplaceAddRemoveGuard(isRSDString))) &&
		(checkOptProp(value, 'valueLocalDate', isNull) || checkOptProp(value, 'valueLocalDate', createReplaceAddRemoveGuard(isRSDLocalDate))) &&
		(checkOptProp(value, 'valueLocalDateTime', isNull) || checkOptProp(value, 'valueLocalDateTime', createReplaceAddRemoveGuard(isRSDLocalDateTime))) &&
		(checkOptProp(value, 'valueLocalTime', isNull) || checkOptProp(value, 'valueLocalTime', createReplaceAddRemoveGuard(isRSDLocalTime))) &&
		(checkOptProp(value, 'valueOffsetDateTime', isNull) || checkOptProp(value, 'valueOffsetDateTime', createReplaceAddRemoveGuard(isRSDOffsetDateTime))) &&
		(checkOptProp(value, 'valueZonedDateTime', isNull) || checkOptProp(value, 'valueZonedDateTime', createReplaceAddRemoveGuard(isRSDZonedDateTime)));
}
`.trim();

const PatchableRecord_Basic_List_Optional_Null_Typeguard_Result = `
export function isPatchableRecord_Basic_List_Optional_NullPatch(value: unknown): value is PatchableRecord_Basic_List_Optional_NullPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString) &&
		(checkOptProp(value, 'valueBoolean', isNull) || checkOptProp(value, 'valueBoolean', createReplaceAddRemoveGuard(isRSDBoolean))) &&
		(checkOptProp(value, 'valueShort', isNull) || checkOptProp(value, 'valueShort', createReplaceAddRemoveGuard(isRSDShort))) &&
		(checkOptProp(value, 'valueInt', isNull) || checkOptProp(value, 'valueInt', createReplaceAddRemoveGuard(isRSDInt))) &&
		(checkOptProp(value, 'valueLong', isNull) || checkOptProp(value, 'valueLong', createReplaceAddRemoveGuard(isRSDLong))) &&
		(checkOptProp(value, 'valueFloat', isNull) || checkOptProp(value, 'valueFloat', createReplaceAddRemoveGuard(isRSDFloat))) &&
		(checkOptProp(value, 'valueDouble', isNull) || checkOptProp(value, 'valueDouble', createReplaceAddRemoveGuard(isRSDDouble))) &&
		(checkOptProp(value, 'valueString', isNull) || checkOptProp(value, 'valueString', createReplaceAddRemoveGuard(isRSDString))) &&
		(checkOptProp(value, 'valueLocalDate', isNull) || checkOptProp(value, 'valueLocalDate', createReplaceAddRemoveGuard(isRSDLocalDate))) &&
		(checkOptProp(value, 'valueLocalDateTime', isNull) || checkOptProp(value, 'valueLocalDateTime', createReplaceAddRemoveGuard(isRSDLocalDateTime))) &&
		(checkOptProp(value, 'valueLocalTime', isNull) || checkOptProp(value, 'valueLocalTime', createReplaceAddRemoveGuard(isRSDLocalTime))) &&
		(checkOptProp(value, 'valueOffsetDateTime', isNull) || checkOptProp(value, 'valueOffsetDateTime', createReplaceAddRemoveGuard(isRSDOffsetDateTime))) &&
		(checkOptProp(value, 'valueZonedDateTime', isNull) || checkOptProp(value, 'valueZonedDateTime', createReplaceAddRemoveGuard(isRSDZonedDateTime)));
}
`.trim();

const PatchableEnumRecord_Typeguard_Result = `
export function isPatchableEnumRecordPatch(value: unknown): value is PatchableEnumRecordPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString) &&
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
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString) &&
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
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString) &&
		checkOptProp(value, 'value', isZoneId) &&
		(checkOptProp(value, 'value_Null', isNull) || checkOptProp(value, 'value_Null', isZoneId)) &&
		(checkOptProp(value, 'value_Opt', isNull) || checkOptProp(value, 'value_Opt', isZoneId)) &&
		(checkOptProp(value, 'value_Opt_Null', isNull) || checkOptProp(value, 'value_Opt_Null', isZoneId)) &&
		checkOptProp(value, 'list', createReplaceAddRemoveGuard(isZoneId)) &&
		(checkOptProp(value, 'list_Null', isNull) || checkOptProp(value, 'list_Null', createReplaceAddRemoveGuard(isZoneId))) &&
		(checkOptProp(value, 'list_Opt', isNull) || checkOptProp(value, 'list_Opt', createReplaceAddRemoveGuard(isZoneId))) &&
		(checkOptProp(value, 'list_Opt_Null', isNull) || checkOptProp(value, 'list_Opt_Null', createReplaceAddRemoveGuard(isZoneId)));
}
`.trim();

const PatchableRecordOfRecords_Typeguard_Result = `
export function isPatchableRecordOfRecordsPatch(value: unknown): value is PatchableRecordOfRecordsPatch {
	return isRecord(value) &&
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString) &&
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
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString) &&
		checkOptProp(value, 'value', v => isPatchableUnion(v) || isPatchableUnionPatch(v)) &&
		(checkOptProp(value, 'value_Null', isNull) || checkOptProp(value, 'value_Null', v => isPatchableUnion(v) || isPatchableUnionPatch(v))) &&
		(checkOptProp(value, 'value_Opt', isNull) || checkOptProp(value, 'value_Opt', v => isPatchableUnion(v) || isPatchableUnionPatch(v))) &&
		(checkOptProp(value, 'value_Opt_Null', isNull) || checkOptProp(value, 'value_Opt_Null', v => isPatchableUnion(v) || isPatchableUnionPatch(v))) &&
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
		const prop = findListElement(allProps, isMPropertyInlineResolvedProperty, p => p.name === data.propertyName);
		const collector = new TypescriptImportCollector(createTypescriptClientAPIGeneratorConfig(), 'sample.ts');
		const fqn = collector.importType.bind(collector);
		const result = toString(ValueChangeTypeGuard(prop, fqn), '\t').trim();
		expect(result).toBe(data.result);
	});
});

const FromJson_PatchableRecord = `
export function PatchableRecordPatchFromJSON($value: Record<string, unknown>): PatchableRecordPatch {
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	const value = propMappedValue('value', $value, isString, RSDStringFromJSON, 'optional');
	return {
		key,
		version,
		value,
	};
}
`.trim();

const FromJson_PatchableRecord_Basic = `
export function PatchableRecord_BasicPatchFromJSON($value: Record<string, unknown>): PatchableRecord_BasicPatch {
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	const valueBoolean = propMappedValue('valueBoolean', $value, isBoolean, RSDBooleanFromJSON, 'optional');
	const valueShort = propMappedValue('valueShort', $value, isNumber, RSDShortFromJSON, 'optional');
	const valueInt = propMappedValue('valueInt', $value, isNumber, RSDIntFromJSON, 'optional');
	const valueLong = propMappedValue('valueLong', $value, isNumeric, RSDLongFromJSON, 'optional');
	const valueFloat = propMappedValue('valueFloat', $value, isNumber, RSDFloatFromJSON, 'optional');
	const valueDouble = propMappedValue('valueDouble', $value, isNumber, RSDDoubleFromJSON, 'optional');
	const valueString = propMappedValue('valueString', $value, isString, RSDStringFromJSON, 'optional');
	const valueLocalDate = propMappedValue('valueLocalDate', $value, isString, RSDLocalDateFromJSON, 'optional');
	const valueLocalDateTime = propMappedValue('valueLocalDateTime', $value, isString, RSDLocalDateTimeFromJSON, 'optional');
	const valueLocalTime = propMappedValue('valueLocalTime', $value, isString, RSDLocalTimeFromJSON, 'optional');
	const valueOffsetDateTime = propMappedValue('valueOffsetDateTime', $value, isString, RSDOffsetDateTimeFromJSON, 'optional');
	const valueZonedDateTime = propMappedValue('valueZonedDateTime', $value, isString, RSDZonedDateTimeFromJSON, 'optional');
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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const FromJson_PatchableRecord_Basic_Optional = `
export function PatchableRecord_Basic_OptionalPatchFromJSON($value: Record<string, unknown>): PatchableRecord_Basic_OptionalPatch {
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	const valueBoolean = propMappedValue('valueBoolean', $value, isBoolean, RSDBooleanFromJSON, 'optional_null');
	const valueShort = propMappedValue('valueShort', $value, isNumber, RSDShortFromJSON, 'optional_null');
	const valueInt = propMappedValue('valueInt', $value, isNumber, RSDIntFromJSON, 'optional_null');
	const valueLong = propMappedValue('valueLong', $value, isNumeric, RSDLongFromJSON, 'optional_null');
	const valueFloat = propMappedValue('valueFloat', $value, isNumber, RSDFloatFromJSON, 'optional_null');
	const valueDouble = propMappedValue('valueDouble', $value, isNumber, RSDDoubleFromJSON, 'optional_null');
	const valueString = propMappedValue('valueString', $value, isString, RSDStringFromJSON, 'optional_null');
	const valueLocalDate = propMappedValue('valueLocalDate', $value, isString, RSDLocalDateFromJSON, 'optional_null');
	const valueLocalDateTime = propMappedValue('valueLocalDateTime', $value, isString, RSDLocalDateTimeFromJSON, 'optional_null');
	const valueLocalTime = propMappedValue('valueLocalTime', $value, isString, RSDLocalTimeFromJSON, 'optional_null');
	const valueOffsetDateTime = propMappedValue('valueOffsetDateTime', $value, isString, RSDOffsetDateTimeFromJSON, 'optional_null');
	const valueZonedDateTime = propMappedValue('valueZonedDateTime', $value, isString, RSDZonedDateTimeFromJSON, 'optional_null');
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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const FromJson_PatchableRecord_Basic_Null = `
export function PatchableRecord_Basic_NullPatchFromJSON($value: Record<string, unknown>): PatchableRecord_Basic_NullPatch {
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	const valueBoolean = propMappedValue('valueBoolean', $value, isBoolean, RSDBooleanFromJSON, 'optional_null');
	const valueShort = propMappedValue('valueShort', $value, isNumber, RSDShortFromJSON, 'optional_null');
	const valueInt = propMappedValue('valueInt', $value, isNumber, RSDIntFromJSON, 'optional_null');
	const valueLong = propMappedValue('valueLong', $value, isNumeric, RSDLongFromJSON, 'optional_null');
	const valueFloat = propMappedValue('valueFloat', $value, isNumber, RSDFloatFromJSON, 'optional_null');
	const valueDouble = propMappedValue('valueDouble', $value, isNumber, RSDDoubleFromJSON, 'optional_null');
	const valueString = propMappedValue('valueString', $value, isString, RSDStringFromJSON, 'optional_null');
	const valueLocalDate = propMappedValue('valueLocalDate', $value, isString, RSDLocalDateFromJSON, 'optional_null');
	const valueLocalDateTime = propMappedValue('valueLocalDateTime', $value, isString, RSDLocalDateTimeFromJSON, 'optional_null');
	const valueLocalTime = propMappedValue('valueLocalTime', $value, isString, RSDLocalTimeFromJSON, 'optional_null');
	const valueOffsetDateTime = propMappedValue('valueOffsetDateTime', $value, isString, RSDOffsetDateTimeFromJSON, 'optional_null');
	const valueZonedDateTime = propMappedValue('valueZonedDateTime', $value, isString, RSDZonedDateTimeFromJSON, 'optional_null');
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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const FromJson_PatchableRecord_Basic_Optional_Null = `
export function PatchableRecord_Basic_Optional_NullPatchFromJSON($value: Record<string, unknown>): PatchableRecord_Basic_Optional_NullPatch {
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	const valueBoolean = propMappedValue('valueBoolean', $value, isBoolean, RSDBooleanFromJSON, 'optional_null');
	const valueShort = propMappedValue('valueShort', $value, isNumber, RSDShortFromJSON, 'optional_null');
	const valueInt = propMappedValue('valueInt', $value, isNumber, RSDIntFromJSON, 'optional_null');
	const valueLong = propMappedValue('valueLong', $value, isNumeric, RSDLongFromJSON, 'optional_null');
	const valueFloat = propMappedValue('valueFloat', $value, isNumber, RSDFloatFromJSON, 'optional_null');
	const valueDouble = propMappedValue('valueDouble', $value, isNumber, RSDDoubleFromJSON, 'optional_null');
	const valueString = propMappedValue('valueString', $value, isString, RSDStringFromJSON, 'optional_null');
	const valueLocalDate = propMappedValue('valueLocalDate', $value, isString, RSDLocalDateFromJSON, 'optional_null');
	const valueLocalDateTime = propMappedValue('valueLocalDateTime', $value, isString, RSDLocalDateTimeFromJSON, 'optional_null');
	const valueLocalTime = propMappedValue('valueLocalTime', $value, isString, RSDLocalTimeFromJSON, 'optional_null');
	const valueOffsetDateTime = propMappedValue('valueOffsetDateTime', $value, isString, RSDOffsetDateTimeFromJSON, 'optional_null');
	const valueZonedDateTime = propMappedValue('valueZonedDateTime', $value, isString, RSDZonedDateTimeFromJSON, 'optional_null');
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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const FromJson_PatchableRecord_Basic_List = `
export function PatchableRecord_Basic_ListPatchFromJSON($value: Record<string, unknown>): PatchableRecord_Basic_ListPatch {
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	const valueBoolean = propMappedValue('valueBoolean', $value, isRecord, v => isListReplace(v, isBoolean) ? ListReplaceFromJSON(v, isBoolean, RSDBooleanFromJSON) : ListMergeAddRemoveFromJSON(v, isBoolean, RSDBooleanFromJSON, isBoolean, RSDBooleanFromJSON), 'optional');
	const valueShort = propMappedValue('valueShort', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDShortFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDShortFromJSON, isNumber, RSDShortFromJSON), 'optional');
	const valueInt = propMappedValue('valueInt', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDIntFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDIntFromJSON, isNumber, RSDIntFromJSON), 'optional');
	const valueLong = propMappedValue('valueLong', $value, isRecord, v => isListReplace(v, isNumeric) ? ListReplaceFromJSON(v, isNumeric, RSDLongFromJSON) : ListMergeAddRemoveFromJSON(v, isNumeric, RSDLongFromJSON, isNumeric, RSDLongFromJSON), 'optional');
	const valueFloat = propMappedValue('valueFloat', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDFloatFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDFloatFromJSON, isNumber, RSDFloatFromJSON), 'optional');
	const valueDouble = propMappedValue('valueDouble', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDDoubleFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDDoubleFromJSON, isNumber, RSDDoubleFromJSON), 'optional');
	const valueString = propMappedValue('valueString', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDStringFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDStringFromJSON, isString, RSDStringFromJSON), 'optional');
	const valueLocalDate = propMappedValue('valueLocalDate', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDLocalDateFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDLocalDateFromJSON, isString, RSDLocalDateFromJSON), 'optional');
	const valueLocalDateTime = propMappedValue('valueLocalDateTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDLocalDateTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDLocalDateTimeFromJSON, isString, RSDLocalDateTimeFromJSON), 'optional');
	const valueLocalTime = propMappedValue('valueLocalTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDLocalTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDLocalTimeFromJSON, isString, RSDLocalTimeFromJSON), 'optional');
	const valueOffsetDateTime = propMappedValue('valueOffsetDateTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDOffsetDateTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDOffsetDateTimeFromJSON, isString, RSDOffsetDateTimeFromJSON), 'optional');
	const valueZonedDateTime = propMappedValue('valueZonedDateTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDZonedDateTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDZonedDateTimeFromJSON, isString, RSDZonedDateTimeFromJSON), 'optional');
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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const FromJson_PatchableRecord_Basic_List_Optional = `
export function PatchableRecord_Basic_List_OptionalPatchFromJSON($value: Record<string, unknown>): PatchableRecord_Basic_List_OptionalPatch {
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	const valueBoolean = propMappedValue('valueBoolean', $value, isRecord, v => isListReplace(v, isBoolean) ? ListReplaceFromJSON(v, isBoolean, RSDBooleanFromJSON) : ListMergeAddRemoveFromJSON(v, isBoolean, RSDBooleanFromJSON, isBoolean, RSDBooleanFromJSON), 'optional_null');
	const valueShort = propMappedValue('valueShort', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDShortFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDShortFromJSON, isNumber, RSDShortFromJSON), 'optional_null');
	const valueInt = propMappedValue('valueInt', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDIntFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDIntFromJSON, isNumber, RSDIntFromJSON), 'optional_null');
	const valueLong = propMappedValue('valueLong', $value, isRecord, v => isListReplace(v, isNumeric) ? ListReplaceFromJSON(v, isNumeric, RSDLongFromJSON) : ListMergeAddRemoveFromJSON(v, isNumeric, RSDLongFromJSON, isNumeric, RSDLongFromJSON), 'optional_null');
	const valueFloat = propMappedValue('valueFloat', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDFloatFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDFloatFromJSON, isNumber, RSDFloatFromJSON), 'optional_null');
	const valueDouble = propMappedValue('valueDouble', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDDoubleFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDDoubleFromJSON, isNumber, RSDDoubleFromJSON), 'optional_null');
	const valueString = propMappedValue('valueString', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDStringFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDStringFromJSON, isString, RSDStringFromJSON), 'optional_null');
	const valueLocalDate = propMappedValue('valueLocalDate', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDLocalDateFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDLocalDateFromJSON, isString, RSDLocalDateFromJSON), 'optional_null');
	const valueLocalDateTime = propMappedValue('valueLocalDateTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDLocalDateTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDLocalDateTimeFromJSON, isString, RSDLocalDateTimeFromJSON), 'optional_null');
	const valueLocalTime = propMappedValue('valueLocalTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDLocalTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDLocalTimeFromJSON, isString, RSDLocalTimeFromJSON), 'optional_null');
	const valueOffsetDateTime = propMappedValue('valueOffsetDateTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDOffsetDateTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDOffsetDateTimeFromJSON, isString, RSDOffsetDateTimeFromJSON), 'optional_null');
	const valueZonedDateTime = propMappedValue('valueZonedDateTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDZonedDateTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDZonedDateTimeFromJSON, isString, RSDZonedDateTimeFromJSON), 'optional_null');
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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}`.trim();

const FromJson_PatchableRecord_Basic_List_Null = `
export function PatchableRecord_Basic_List_NullPatchFromJSON($value: Record<string, unknown>): PatchableRecord_Basic_List_NullPatch {
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	const valueBoolean = propMappedValue('valueBoolean', $value, isRecord, v => isListReplace(v, isBoolean) ? ListReplaceFromJSON(v, isBoolean, RSDBooleanFromJSON) : ListMergeAddRemoveFromJSON(v, isBoolean, RSDBooleanFromJSON, isBoolean, RSDBooleanFromJSON), 'optional_null');
	const valueShort = propMappedValue('valueShort', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDShortFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDShortFromJSON, isNumber, RSDShortFromJSON), 'optional_null');
	const valueInt = propMappedValue('valueInt', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDIntFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDIntFromJSON, isNumber, RSDIntFromJSON), 'optional_null');
	const valueLong = propMappedValue('valueLong', $value, isRecord, v => isListReplace(v, isNumeric) ? ListReplaceFromJSON(v, isNumeric, RSDLongFromJSON) : ListMergeAddRemoveFromJSON(v, isNumeric, RSDLongFromJSON, isNumeric, RSDLongFromJSON), 'optional_null');
	const valueFloat = propMappedValue('valueFloat', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDFloatFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDFloatFromJSON, isNumber, RSDFloatFromJSON), 'optional_null');
	const valueDouble = propMappedValue('valueDouble', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDDoubleFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDDoubleFromJSON, isNumber, RSDDoubleFromJSON), 'optional_null');
	const valueString = propMappedValue('valueString', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDStringFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDStringFromJSON, isString, RSDStringFromJSON), 'optional_null');
	const valueLocalDate = propMappedValue('valueLocalDate', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDLocalDateFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDLocalDateFromJSON, isString, RSDLocalDateFromJSON), 'optional_null');
	const valueLocalDateTime = propMappedValue('valueLocalDateTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDLocalDateTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDLocalDateTimeFromJSON, isString, RSDLocalDateTimeFromJSON), 'optional_null');
	const valueLocalTime = propMappedValue('valueLocalTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDLocalTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDLocalTimeFromJSON, isString, RSDLocalTimeFromJSON), 'optional_null');
	const valueOffsetDateTime = propMappedValue('valueOffsetDateTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDOffsetDateTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDOffsetDateTimeFromJSON, isString, RSDOffsetDateTimeFromJSON), 'optional_null');
	const valueZonedDateTime = propMappedValue('valueZonedDateTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDZonedDateTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDZonedDateTimeFromJSON, isString, RSDZonedDateTimeFromJSON), 'optional_null');
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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const FromJson_PatchableRecord_Basic_List_Optional_Null = `
export function PatchableRecord_Basic_List_Optional_NullPatchFromJSON($value: Record<string, unknown>): PatchableRecord_Basic_List_Optional_NullPatch {
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	const valueBoolean = propMappedValue('valueBoolean', $value, isRecord, v => isListReplace(v, isBoolean) ? ListReplaceFromJSON(v, isBoolean, RSDBooleanFromJSON) : ListMergeAddRemoveFromJSON(v, isBoolean, RSDBooleanFromJSON, isBoolean, RSDBooleanFromJSON), 'optional_null');
	const valueShort = propMappedValue('valueShort', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDShortFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDShortFromJSON, isNumber, RSDShortFromJSON), 'optional_null');
	const valueInt = propMappedValue('valueInt', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDIntFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDIntFromJSON, isNumber, RSDIntFromJSON), 'optional_null');
	const valueLong = propMappedValue('valueLong', $value, isRecord, v => isListReplace(v, isNumeric) ? ListReplaceFromJSON(v, isNumeric, RSDLongFromJSON) : ListMergeAddRemoveFromJSON(v, isNumeric, RSDLongFromJSON, isNumeric, RSDLongFromJSON), 'optional_null');
	const valueFloat = propMappedValue('valueFloat', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDFloatFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDFloatFromJSON, isNumber, RSDFloatFromJSON), 'optional_null');
	const valueDouble = propMappedValue('valueDouble', $value, isRecord, v => isListReplace(v, isNumber) ? ListReplaceFromJSON(v, isNumber, RSDDoubleFromJSON) : ListMergeAddRemoveFromJSON(v, isNumber, RSDDoubleFromJSON, isNumber, RSDDoubleFromJSON), 'optional_null');
	const valueString = propMappedValue('valueString', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDStringFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDStringFromJSON, isString, RSDStringFromJSON), 'optional_null');
	const valueLocalDate = propMappedValue('valueLocalDate', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDLocalDateFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDLocalDateFromJSON, isString, RSDLocalDateFromJSON), 'optional_null');
	const valueLocalDateTime = propMappedValue('valueLocalDateTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDLocalDateTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDLocalDateTimeFromJSON, isString, RSDLocalDateTimeFromJSON), 'optional_null');
	const valueLocalTime = propMappedValue('valueLocalTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDLocalTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDLocalTimeFromJSON, isString, RSDLocalTimeFromJSON), 'optional_null');
	const valueOffsetDateTime = propMappedValue('valueOffsetDateTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDOffsetDateTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDOffsetDateTimeFromJSON, isString, RSDOffsetDateTimeFromJSON), 'optional_null');
	const valueZonedDateTime = propMappedValue('valueZonedDateTime', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, RSDZonedDateTimeFromJSON) : ListMergeAddRemoveFromJSON(v, isString, RSDZonedDateTimeFromJSON, isString, RSDZonedDateTimeFromJSON), 'optional_null');
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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const FromJson_PatchableEnumRecord = `
export function PatchableEnumRecordPatchFromJSON($value: Record<string, unknown>): PatchableEnumRecordPatch {
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	const value = propMappedValue('value', $value, isSampleEnum, SampleEnumFromJSON, 'optional');
	const value_Null = propMappedValue('value_Null', $value, isSampleEnum, SampleEnumFromJSON, 'optional_null');
	const value_Opt = propMappedValue('value_Opt', $value, isSampleEnum, SampleEnumFromJSON, 'optional_null');
	const value_Opt_Null = propMappedValue('value_Opt_Null', $value, isSampleEnum, SampleEnumFromJSON, 'optional_null');
	const list = propMappedValue('list', $value, isRecord, v => isListReplace(v, isSampleEnum) ? ListReplaceFromJSON(v, isSampleEnum, SampleEnumFromJSON) : ListMergeAddRemoveFromJSON(v, isSampleEnum, SampleEnumFromJSON, isSampleEnum, SampleEnumFromJSON), 'optional');
	const list_Null = propMappedValue('list_Null', $value, isRecord, v => isListReplace(v, isSampleEnum) ? ListReplaceFromJSON(v, isSampleEnum, SampleEnumFromJSON) : ListMergeAddRemoveFromJSON(v, isSampleEnum, SampleEnumFromJSON, isSampleEnum, SampleEnumFromJSON), 'optional_null');
	const list_Opt = propMappedValue('list_Opt', $value, isRecord, v => isListReplace(v, isSampleEnum) ? ListReplaceFromJSON(v, isSampleEnum, SampleEnumFromJSON) : ListMergeAddRemoveFromJSON(v, isSampleEnum, SampleEnumFromJSON, isSampleEnum, SampleEnumFromJSON), 'optional_null');
	const list_Opt_Null = propMappedValue('list_Opt_Null', $value, isRecord, v => isListReplace(v, isSampleEnum) ? ListReplaceFromJSON(v, isSampleEnum, SampleEnumFromJSON) : ListMergeAddRemoveFromJSON(v, isSampleEnum, SampleEnumFromJSON, isSampleEnum, SampleEnumFromJSON), 'optional_null');
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
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	const value = propMappedValue('value', $value, isPatchableEnumInlineRecord_Value, PatchableEnumInlineRecord_ValueFromJSON, 'optional');
	const value_Null = propMappedValue('value_Null', $value, isPatchableEnumInlineRecord_Value_Null, PatchableEnumInlineRecord_Value_NullFromJSON, 'optional_null');
	const value_Opt = propMappedValue('value_Opt', $value, isPatchableEnumInlineRecord_Value_Opt, PatchableEnumInlineRecord_Value_OptFromJSON, 'optional_null');
	const value_Opt_Null = propMappedValue('value_Opt_Null', $value, isPatchableEnumInlineRecord_Value_Opt_Null, PatchableEnumInlineRecord_Value_Opt_NullFromJSON, 'optional_null');
	const list = propMappedValue('list', $value, isRecord, v => isListReplace(v, isPatchableEnumInlineRecord_List) ? ListReplaceFromJSON(v, isPatchableEnumInlineRecord_List, PatchableEnumInlineRecord_ListFromJSON) : ListMergeAddRemoveFromJSON(v, isPatchableEnumInlineRecord_List, PatchableEnumInlineRecord_ListFromJSON, isPatchableEnumInlineRecord_List, PatchableEnumInlineRecord_ListFromJSON), 'optional');
	const list_Null = propMappedValue('list_Null', $value, isRecord, v => isListReplace(v, isPatchableEnumInlineRecord_List_Null) ? ListReplaceFromJSON(v, isPatchableEnumInlineRecord_List_Null, PatchableEnumInlineRecord_List_NullFromJSON) : ListMergeAddRemoveFromJSON(v, isPatchableEnumInlineRecord_List_Null, PatchableEnumInlineRecord_List_NullFromJSON, isPatchableEnumInlineRecord_List_Null, PatchableEnumInlineRecord_List_NullFromJSON), 'optional_null');
	const list_Opt_Null = propMappedValue('list_Opt_Null', $value, isRecord, v => isListReplace(v, isPatchableEnumInlineRecord_List_Opt_Null) ? ListReplaceFromJSON(v, isPatchableEnumInlineRecord_List_Opt_Null, PatchableEnumInlineRecord_List_Opt_NullFromJSON) : ListMergeAddRemoveFromJSON(v, isPatchableEnumInlineRecord_List_Opt_Null, PatchableEnumInlineRecord_List_Opt_NullFromJSON, isPatchableEnumInlineRecord_List_Opt_Null, PatchableEnumInlineRecord_List_Opt_NullFromJSON), 'optional_null');
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
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	const value = propMappedValue('value', $value, isString, ZoneIdFromJSON, 'optional');
	const value_Null = propMappedValue('value_Null', $value, isString, ZoneIdFromJSON, 'optional_null');
	const value_Opt = propMappedValue('value_Opt', $value, isString, ZoneIdFromJSON, 'optional_null');
	const value_Opt_Null = propMappedValue('value_Opt_Null', $value, isString, ZoneIdFromJSON, 'optional_null');
	const list = propMappedValue('list', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, ZoneIdFromJSON) : ListMergeAddRemoveFromJSON(v, isString, ZoneIdFromJSON, isString, ZoneIdFromJSON), 'optional');
	const list_Null = propMappedValue('list_Null', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, ZoneIdFromJSON) : ListMergeAddRemoveFromJSON(v, isString, ZoneIdFromJSON, isString, ZoneIdFromJSON), 'optional_null');
	const list_Opt = propMappedValue('list_Opt', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, ZoneIdFromJSON) : ListMergeAddRemoveFromJSON(v, isString, ZoneIdFromJSON, isString, ZoneIdFromJSON), 'optional_null');
	const list_Opt_Null = propMappedValue('list_Opt_Null', $value, isRecord, v => isListReplace(v, isString) ? ListReplaceFromJSON(v, isString, ZoneIdFromJSON) : ListMergeAddRemoveFromJSON(v, isString, ZoneIdFromJSON, isString, ZoneIdFromJSON), 'optional_null');
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
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	const value = propMappedValue('value', $value, isRecord, v => ReplaceOrMergeFromJSON(v, PatchableRecord_BasicFromJSON, PatchableRecord_BasicPatchFromJSON), 'optional');
	const value_Null = propMappedValue('value_Null', $value, isRecord, v => ReplaceOrMergeFromJSON(v, PatchableRecord_BasicFromJSON, PatchableRecord_BasicPatchFromJSON), 'optional_null');
	const value_Opt = propMappedValue('value_Opt', $value, isRecord, v => ReplaceOrMergeFromJSON(v, PatchableRecord_BasicFromJSON, PatchableRecord_BasicPatchFromJSON), 'optional_null');
	const value_Opt_Null = propMappedValue('value_Opt_Null', $value, isRecord, v => ReplaceOrMergeFromJSON(v, PatchableRecord_BasicFromJSON, PatchableRecord_BasicPatchFromJSON), 'optional_null');
	const list = propMappedValue('list', $value, isRecord, v => isListReplace(v, isRecord) ? ListReplaceFromJSON(v, isRecord, PatchableRecord_BasicFromJSON) : ListMergeAddUpdateRemoveFromJSON(v, isRecord, PatchableRecord_BasicFromJSON, isRecord, PatchableRecord_BasicPatchFromJSON, isString, noopMap), 'optional');
	const list_Null = propMappedValue('list_Null', $value, isRecord, v => isListReplace(v, isRecord) ? ListReplaceFromJSON(v, isRecord, PatchableRecord_BasicFromJSON) : ListMergeAddUpdateRemoveFromJSON(v, isRecord, PatchableRecord_BasicFromJSON, isRecord, PatchableRecord_BasicPatchFromJSON, isString, noopMap), 'optional_null');
	const list_Opt = propMappedValue('list_Opt', $value, isRecord, v => isListReplace(v, isRecord) ? ListReplaceFromJSON(v, isRecord, PatchableRecord_BasicFromJSON) : ListMergeAddUpdateRemoveFromJSON(v, isRecord, PatchableRecord_BasicFromJSON, isRecord, PatchableRecord_BasicPatchFromJSON, isString, noopMap), 'optional_null');
	const list_Opt_Null = propMappedValue('list_Opt_Null', $value, isRecord, v => isListReplace(v, isRecord) ? ListReplaceFromJSON(v, isRecord, PatchableRecord_BasicFromJSON) : ListMergeAddUpdateRemoveFromJSON(v, isRecord, PatchableRecord_BasicFromJSON, isRecord, PatchableRecord_BasicPatchFromJSON, isString, noopMap), 'optional_null');
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

const FromJson_PatchableRecordWithUnion = `
export function PatchableRecordWithUnionPatchFromJSON($value: Record<string, unknown>): PatchableRecordWithUnionPatch {
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	const value = propMappedValue('value', $value, isRecord, PatchableUnionOrPatchFromJSON, 'optional');
	const value_Null = propMappedValue('value_Null', $value, isRecord, PatchableUnionOrPatchFromJSON, 'optional_null');
	const value_Opt = propMappedValue('value_Opt', $value, isRecord, PatchableUnionOrPatchFromJSON, 'optional_null');
	const value_Opt_Null = propMappedValue('value_Opt_Null', $value, isRecord, PatchableUnionOrPatchFromJSON, 'optional_null');
	const list = propMappedValue('list', $value, isRecord, v => isListReplace(v, isRecord) ? ListReplaceFromJSON(v, isRecord, PatchableUnionFromJSON) : ListMergeAddUpdateRemoveFromJSON(v, isRecord, PatchableUnionFromJSON, isRecord, PatchableUnionPatchFromJSON, isString, noopMap), 'optional');
	const list_Null = propMappedValue('list_Null', $value, isRecord, v => isListReplace(v, isRecord) ? ListReplaceFromJSON(v, isRecord, PatchableUnionFromJSON) : ListMergeAddUpdateRemoveFromJSON(v, isRecord, PatchableUnionFromJSON, isRecord, PatchableUnionPatchFromJSON, isString, noopMap), 'optional_null');
	const list_Opt = propMappedValue('list_Opt', $value, isRecord, v => isListReplace(v, isRecord) ? ListReplaceFromJSON(v, isRecord, PatchableUnionFromJSON) : ListMergeAddUpdateRemoveFromJSON(v, isRecord, PatchableUnionFromJSON, isRecord, PatchableUnionPatchFromJSON, isString, noopMap), 'optional_null');
	const list_Opt_Null = propMappedValue('list_Opt_Null', $value, isRecord, v => isListReplace(v, isRecord) ? ListReplaceFromJSON(v, isRecord, PatchableUnionFromJSON) : ListMergeAddUpdateRemoveFromJSON(v, isRecord, PatchableUnionFromJSON, isRecord, PatchableUnionPatchFromJSON, isString, noopMap), 'optional_null');
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
	{
		name: 'PatchableRecordWithUnion',
		result: FromJson_PatchableRecordWithUnion,
	},
];

describe('FromJSONPatch', () => {
	test.each(FROM_JSON)('$name', data => {
		const recordModel = findListElement(model.elements, isMResolvedRecordType, r => r.name === data.name);
		const allProps = allResolvedRecordProperties(recordModel);
		const result = toString(FromJSONPatch(recordModel, allProps, fqn), '\t').trim();
		expect(result).toBe(data.result);
	});
});

const ToJson_PatchableRecord = `
export function PatchableRecordPatchToJSON($value: PatchableRecordPatch): Record<string, unknown> {
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);
	const value = isUndefined($value.value) ? undefined : RSDStringToJSON($value.value);

	return {
		key,
		version,
		value,
	};
}
`.trim();

const ToJson_PatchableRecord_Basic = `
export function PatchableRecord_BasicPatchToJSON($value: PatchableRecord_BasicPatch): Record<string, unknown> {
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);
	const valueBoolean = isUndefined($value.valueBoolean) ? undefined : RSDBooleanToJSON($value.valueBoolean);
	const valueShort = isUndefined($value.valueShort) ? undefined : RSDShortToJSON($value.valueShort);
	const valueInt = isUndefined($value.valueInt) ? undefined : RSDIntToJSON($value.valueInt);
	const valueLong = isUndefined($value.valueLong) ? undefined : RSDLongToJSON($value.valueLong);
	const valueFloat = isUndefined($value.valueFloat) ? undefined : RSDFloatToJSON($value.valueFloat);
	const valueDouble = isUndefined($value.valueDouble) ? undefined : RSDDoubleToJSON($value.valueDouble);
	const valueString = isUndefined($value.valueString) ? undefined : RSDStringToJSON($value.valueString);
	const valueLocalDate = isUndefined($value.valueLocalDate) ? undefined : RSDLocalDateToJSON($value.valueLocalDate);
	const valueLocalDateTime = isUndefined($value.valueLocalDateTime) ? undefined : RSDLocalDateTimeToJSON($value.valueLocalDateTime);
	const valueLocalTime = isUndefined($value.valueLocalTime) ? undefined : RSDLocalTimeToJSON($value.valueLocalTime);
	const valueOffsetDateTime = isUndefined($value.valueOffsetDateTime) ? undefined : RSDOffsetDateTimeToJSON($value.valueOffsetDateTime);
	const valueZonedDateTime = isUndefined($value.valueZonedDateTime) ? undefined : RSDZonedDateTimeToJSON($value.valueZonedDateTime);

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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const ToJson_PatchableRecord_Basic_Optional = `
export function PatchableRecord_Basic_OptionalPatchToJSON($value: PatchableRecord_Basic_OptionalPatch): Record<string, unknown> {
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);
	const valueBoolean = isUndefined($value.valueBoolean) || isNull($value.valueBoolean) ? $value.valueBoolean : RSDBooleanToJSON($value.valueBoolean);
	const valueShort = isUndefined($value.valueShort) || isNull($value.valueShort) ? $value.valueShort : RSDShortToJSON($value.valueShort);
	const valueInt = isUndefined($value.valueInt) || isNull($value.valueInt) ? $value.valueInt : RSDIntToJSON($value.valueInt);
	const valueLong = isUndefined($value.valueLong) || isNull($value.valueLong) ? $value.valueLong : RSDLongToJSON($value.valueLong);
	const valueFloat = isUndefined($value.valueFloat) || isNull($value.valueFloat) ? $value.valueFloat : RSDFloatToJSON($value.valueFloat);
	const valueDouble = isUndefined($value.valueDouble) || isNull($value.valueDouble) ? $value.valueDouble : RSDDoubleToJSON($value.valueDouble);
	const valueString = isUndefined($value.valueString) || isNull($value.valueString) ? $value.valueString : RSDStringToJSON($value.valueString);
	const valueLocalDate = isUndefined($value.valueLocalDate) || isNull($value.valueLocalDate) ? $value.valueLocalDate : RSDLocalDateToJSON($value.valueLocalDate);
	const valueLocalDateTime = isUndefined($value.valueLocalDateTime) || isNull($value.valueLocalDateTime) ? $value.valueLocalDateTime : RSDLocalDateTimeToJSON($value.valueLocalDateTime);
	const valueLocalTime = isUndefined($value.valueLocalTime) || isNull($value.valueLocalTime) ? $value.valueLocalTime : RSDLocalTimeToJSON($value.valueLocalTime);
	const valueOffsetDateTime = isUndefined($value.valueOffsetDateTime) || isNull($value.valueOffsetDateTime) ? $value.valueOffsetDateTime : RSDOffsetDateTimeToJSON($value.valueOffsetDateTime);
	const valueZonedDateTime = isUndefined($value.valueZonedDateTime) || isNull($value.valueZonedDateTime) ? $value.valueZonedDateTime : RSDZonedDateTimeToJSON($value.valueZonedDateTime);

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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const ToJson_PatchableRecord_Basic_Null = `
export function PatchableRecord_Basic_NullPatchToJSON($value: PatchableRecord_Basic_NullPatch): Record<string, unknown> {
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);
	const valueBoolean = isUndefined($value.valueBoolean) || isNull($value.valueBoolean) ? $value.valueBoolean : RSDBooleanToJSON($value.valueBoolean);
	const valueShort = isUndefined($value.valueShort) || isNull($value.valueShort) ? $value.valueShort : RSDShortToJSON($value.valueShort);
	const valueInt = isUndefined($value.valueInt) || isNull($value.valueInt) ? $value.valueInt : RSDIntToJSON($value.valueInt);
	const valueLong = isUndefined($value.valueLong) || isNull($value.valueLong) ? $value.valueLong : RSDLongToJSON($value.valueLong);
	const valueFloat = isUndefined($value.valueFloat) || isNull($value.valueFloat) ? $value.valueFloat : RSDFloatToJSON($value.valueFloat);
	const valueDouble = isUndefined($value.valueDouble) || isNull($value.valueDouble) ? $value.valueDouble : RSDDoubleToJSON($value.valueDouble);
	const valueString = isUndefined($value.valueString) || isNull($value.valueString) ? $value.valueString : RSDStringToJSON($value.valueString);
	const valueLocalDate = isUndefined($value.valueLocalDate) || isNull($value.valueLocalDate) ? $value.valueLocalDate : RSDLocalDateToJSON($value.valueLocalDate);
	const valueLocalDateTime = isUndefined($value.valueLocalDateTime) || isNull($value.valueLocalDateTime) ? $value.valueLocalDateTime : RSDLocalDateTimeToJSON($value.valueLocalDateTime);
	const valueLocalTime = isUndefined($value.valueLocalTime) || isNull($value.valueLocalTime) ? $value.valueLocalTime : RSDLocalTimeToJSON($value.valueLocalTime);
	const valueOffsetDateTime = isUndefined($value.valueOffsetDateTime) || isNull($value.valueOffsetDateTime) ? $value.valueOffsetDateTime : RSDOffsetDateTimeToJSON($value.valueOffsetDateTime);
	const valueZonedDateTime = isUndefined($value.valueZonedDateTime) || isNull($value.valueZonedDateTime) ? $value.valueZonedDateTime : RSDZonedDateTimeToJSON($value.valueZonedDateTime);

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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const ToJson_PatchableRecord_Basic_Optional_Null = `
export function PatchableRecord_Basic_Optional_NullPatchToJSON($value: PatchableRecord_Basic_Optional_NullPatch): Record<string, unknown> {
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);
	const valueBoolean = isUndefined($value.valueBoolean) || isNull($value.valueBoolean) ? $value.valueBoolean : RSDBooleanToJSON($value.valueBoolean);
	const valueShort = isUndefined($value.valueShort) || isNull($value.valueShort) ? $value.valueShort : RSDShortToJSON($value.valueShort);
	const valueInt = isUndefined($value.valueInt) || isNull($value.valueInt) ? $value.valueInt : RSDIntToJSON($value.valueInt);
	const valueLong = isUndefined($value.valueLong) || isNull($value.valueLong) ? $value.valueLong : RSDLongToJSON($value.valueLong);
	const valueFloat = isUndefined($value.valueFloat) || isNull($value.valueFloat) ? $value.valueFloat : RSDFloatToJSON($value.valueFloat);
	const valueDouble = isUndefined($value.valueDouble) || isNull($value.valueDouble) ? $value.valueDouble : RSDDoubleToJSON($value.valueDouble);
	const valueString = isUndefined($value.valueString) || isNull($value.valueString) ? $value.valueString : RSDStringToJSON($value.valueString);
	const valueLocalDate = isUndefined($value.valueLocalDate) || isNull($value.valueLocalDate) ? $value.valueLocalDate : RSDLocalDateToJSON($value.valueLocalDate);
	const valueLocalDateTime = isUndefined($value.valueLocalDateTime) || isNull($value.valueLocalDateTime) ? $value.valueLocalDateTime : RSDLocalDateTimeToJSON($value.valueLocalDateTime);
	const valueLocalTime = isUndefined($value.valueLocalTime) || isNull($value.valueLocalTime) ? $value.valueLocalTime : RSDLocalTimeToJSON($value.valueLocalTime);
	const valueOffsetDateTime = isUndefined($value.valueOffsetDateTime) || isNull($value.valueOffsetDateTime) ? $value.valueOffsetDateTime : RSDOffsetDateTimeToJSON($value.valueOffsetDateTime);
	const valueZonedDateTime = isUndefined($value.valueZonedDateTime) || isNull($value.valueZonedDateTime) ? $value.valueZonedDateTime : RSDZonedDateTimeToJSON($value.valueZonedDateTime);

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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}`.trim();

const ToJson_PatchableRecord_Basic_List = `
export function PatchableRecord_Basic_ListPatchToJSON($value: PatchableRecord_Basic_ListPatch): Record<string, unknown> {
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);
	const valueBoolean = isUndefined($value.valueBoolean) ? undefined : isListReplace($value.valueBoolean, isRSDBoolean) ? ListReplaceToJSON($value.valueBoolean, RSDBooleanToJSON) : ListMergeAddRemoveToJSON($value.valueBoolean, RSDBooleanToJSON, RSDBooleanToJSON);
	const valueShort = isUndefined($value.valueShort) ? undefined : isListReplace($value.valueShort, isRSDShort) ? ListReplaceToJSON($value.valueShort, RSDShortToJSON) : ListMergeAddRemoveToJSON($value.valueShort, RSDShortToJSON, RSDShortToJSON);
	const valueInt = isUndefined($value.valueInt) ? undefined : isListReplace($value.valueInt, isRSDInt) ? ListReplaceToJSON($value.valueInt, RSDIntToJSON) : ListMergeAddRemoveToJSON($value.valueInt, RSDIntToJSON, RSDIntToJSON);
	const valueLong = isUndefined($value.valueLong) ? undefined : isListReplace($value.valueLong, isRSDLong) ? ListReplaceToJSON($value.valueLong, RSDLongToJSON) : ListMergeAddRemoveToJSON($value.valueLong, RSDLongToJSON, RSDLongToJSON);
	const valueFloat = isUndefined($value.valueFloat) ? undefined : isListReplace($value.valueFloat, isRSDFloat) ? ListReplaceToJSON($value.valueFloat, RSDFloatToJSON) : ListMergeAddRemoveToJSON($value.valueFloat, RSDFloatToJSON, RSDFloatToJSON);
	const valueDouble = isUndefined($value.valueDouble) ? undefined : isListReplace($value.valueDouble, isRSDDouble) ? ListReplaceToJSON($value.valueDouble, RSDDoubleToJSON) : ListMergeAddRemoveToJSON($value.valueDouble, RSDDoubleToJSON, RSDDoubleToJSON);
	const valueString = isUndefined($value.valueString) ? undefined : isListReplace($value.valueString, isRSDString) ? ListReplaceToJSON($value.valueString, RSDStringToJSON) : ListMergeAddRemoveToJSON($value.valueString, RSDStringToJSON, RSDStringToJSON);
	const valueLocalDate = isUndefined($value.valueLocalDate) ? undefined : isListReplace($value.valueLocalDate, isRSDLocalDate) ? ListReplaceToJSON($value.valueLocalDate, RSDLocalDateToJSON) : ListMergeAddRemoveToJSON($value.valueLocalDate, RSDLocalDateToJSON, RSDLocalDateToJSON);
	const valueLocalDateTime = isUndefined($value.valueLocalDateTime) ? undefined : isListReplace($value.valueLocalDateTime, isRSDLocalDateTime) ? ListReplaceToJSON($value.valueLocalDateTime, RSDLocalDateTimeToJSON) : ListMergeAddRemoveToJSON($value.valueLocalDateTime, RSDLocalDateTimeToJSON, RSDLocalDateTimeToJSON);
	const valueLocalTime = isUndefined($value.valueLocalTime) ? undefined : isListReplace($value.valueLocalTime, isRSDLocalTime) ? ListReplaceToJSON($value.valueLocalTime, RSDLocalTimeToJSON) : ListMergeAddRemoveToJSON($value.valueLocalTime, RSDLocalTimeToJSON, RSDLocalTimeToJSON);
	const valueOffsetDateTime = isUndefined($value.valueOffsetDateTime) ? undefined : isListReplace($value.valueOffsetDateTime, isRSDOffsetDateTime) ? ListReplaceToJSON($value.valueOffsetDateTime, RSDOffsetDateTimeToJSON) : ListMergeAddRemoveToJSON($value.valueOffsetDateTime, RSDOffsetDateTimeToJSON, RSDOffsetDateTimeToJSON);
	const valueZonedDateTime = isUndefined($value.valueZonedDateTime) ? undefined : isListReplace($value.valueZonedDateTime, isRSDZonedDateTime) ? ListReplaceToJSON($value.valueZonedDateTime, RSDZonedDateTimeToJSON) : ListMergeAddRemoveToJSON($value.valueZonedDateTime, RSDZonedDateTimeToJSON, RSDZonedDateTimeToJSON);

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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}`.trim();

const ToJson_PatchableRecord_Basic_List_Optional = `
export function PatchableRecord_Basic_List_OptionalPatchToJSON($value: PatchableRecord_Basic_List_OptionalPatch): Record<string, unknown> {
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);
	const valueBoolean = isUndefined($value.valueBoolean) || isNull($value.valueBoolean) ? $value.valueBoolean : isListReplace($value.valueBoolean, isRSDBoolean) ? ListReplaceToJSON($value.valueBoolean, RSDBooleanToJSON) : ListMergeAddRemoveToJSON($value.valueBoolean, RSDBooleanToJSON, RSDBooleanToJSON);
	const valueShort = isUndefined($value.valueShort) || isNull($value.valueShort) ? $value.valueShort : isListReplace($value.valueShort, isRSDShort) ? ListReplaceToJSON($value.valueShort, RSDShortToJSON) : ListMergeAddRemoveToJSON($value.valueShort, RSDShortToJSON, RSDShortToJSON);
	const valueInt = isUndefined($value.valueInt) || isNull($value.valueInt) ? $value.valueInt : isListReplace($value.valueInt, isRSDInt) ? ListReplaceToJSON($value.valueInt, RSDIntToJSON) : ListMergeAddRemoveToJSON($value.valueInt, RSDIntToJSON, RSDIntToJSON);
	const valueLong = isUndefined($value.valueLong) || isNull($value.valueLong) ? $value.valueLong : isListReplace($value.valueLong, isRSDLong) ? ListReplaceToJSON($value.valueLong, RSDLongToJSON) : ListMergeAddRemoveToJSON($value.valueLong, RSDLongToJSON, RSDLongToJSON);
	const valueFloat = isUndefined($value.valueFloat) || isNull($value.valueFloat) ? $value.valueFloat : isListReplace($value.valueFloat, isRSDFloat) ? ListReplaceToJSON($value.valueFloat, RSDFloatToJSON) : ListMergeAddRemoveToJSON($value.valueFloat, RSDFloatToJSON, RSDFloatToJSON);
	const valueDouble = isUndefined($value.valueDouble) || isNull($value.valueDouble) ? $value.valueDouble : isListReplace($value.valueDouble, isRSDDouble) ? ListReplaceToJSON($value.valueDouble, RSDDoubleToJSON) : ListMergeAddRemoveToJSON($value.valueDouble, RSDDoubleToJSON, RSDDoubleToJSON);
	const valueString = isUndefined($value.valueString) || isNull($value.valueString) ? $value.valueString : isListReplace($value.valueString, isRSDString) ? ListReplaceToJSON($value.valueString, RSDStringToJSON) : ListMergeAddRemoveToJSON($value.valueString, RSDStringToJSON, RSDStringToJSON);
	const valueLocalDate = isUndefined($value.valueLocalDate) || isNull($value.valueLocalDate) ? $value.valueLocalDate : isListReplace($value.valueLocalDate, isRSDLocalDate) ? ListReplaceToJSON($value.valueLocalDate, RSDLocalDateToJSON) : ListMergeAddRemoveToJSON($value.valueLocalDate, RSDLocalDateToJSON, RSDLocalDateToJSON);
	const valueLocalDateTime = isUndefined($value.valueLocalDateTime) || isNull($value.valueLocalDateTime) ? $value.valueLocalDateTime : isListReplace($value.valueLocalDateTime, isRSDLocalDateTime) ? ListReplaceToJSON($value.valueLocalDateTime, RSDLocalDateTimeToJSON) : ListMergeAddRemoveToJSON($value.valueLocalDateTime, RSDLocalDateTimeToJSON, RSDLocalDateTimeToJSON);
	const valueLocalTime = isUndefined($value.valueLocalTime) || isNull($value.valueLocalTime) ? $value.valueLocalTime : isListReplace($value.valueLocalTime, isRSDLocalTime) ? ListReplaceToJSON($value.valueLocalTime, RSDLocalTimeToJSON) : ListMergeAddRemoveToJSON($value.valueLocalTime, RSDLocalTimeToJSON, RSDLocalTimeToJSON);
	const valueOffsetDateTime = isUndefined($value.valueOffsetDateTime) || isNull($value.valueOffsetDateTime) ? $value.valueOffsetDateTime : isListReplace($value.valueOffsetDateTime, isRSDOffsetDateTime) ? ListReplaceToJSON($value.valueOffsetDateTime, RSDOffsetDateTimeToJSON) : ListMergeAddRemoveToJSON($value.valueOffsetDateTime, RSDOffsetDateTimeToJSON, RSDOffsetDateTimeToJSON);
	const valueZonedDateTime = isUndefined($value.valueZonedDateTime) || isNull($value.valueZonedDateTime) ? $value.valueZonedDateTime : isListReplace($value.valueZonedDateTime, isRSDZonedDateTime) ? ListReplaceToJSON($value.valueZonedDateTime, RSDZonedDateTimeToJSON) : ListMergeAddRemoveToJSON($value.valueZonedDateTime, RSDZonedDateTimeToJSON, RSDZonedDateTimeToJSON);

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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const ToJson_PatchableRecord_Basic_List_Null = `
export function PatchableRecord_Basic_List_NullPatchToJSON($value: PatchableRecord_Basic_List_NullPatch): Record<string, unknown> {
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);
	const valueBoolean = isUndefined($value.valueBoolean) || isNull($value.valueBoolean) ? $value.valueBoolean : isListReplace($value.valueBoolean, isRSDBoolean) ? ListReplaceToJSON($value.valueBoolean, RSDBooleanToJSON) : ListMergeAddRemoveToJSON($value.valueBoolean, RSDBooleanToJSON, RSDBooleanToJSON);
	const valueShort = isUndefined($value.valueShort) || isNull($value.valueShort) ? $value.valueShort : isListReplace($value.valueShort, isRSDShort) ? ListReplaceToJSON($value.valueShort, RSDShortToJSON) : ListMergeAddRemoveToJSON($value.valueShort, RSDShortToJSON, RSDShortToJSON);
	const valueInt = isUndefined($value.valueInt) || isNull($value.valueInt) ? $value.valueInt : isListReplace($value.valueInt, isRSDInt) ? ListReplaceToJSON($value.valueInt, RSDIntToJSON) : ListMergeAddRemoveToJSON($value.valueInt, RSDIntToJSON, RSDIntToJSON);
	const valueLong = isUndefined($value.valueLong) || isNull($value.valueLong) ? $value.valueLong : isListReplace($value.valueLong, isRSDLong) ? ListReplaceToJSON($value.valueLong, RSDLongToJSON) : ListMergeAddRemoveToJSON($value.valueLong, RSDLongToJSON, RSDLongToJSON);
	const valueFloat = isUndefined($value.valueFloat) || isNull($value.valueFloat) ? $value.valueFloat : isListReplace($value.valueFloat, isRSDFloat) ? ListReplaceToJSON($value.valueFloat, RSDFloatToJSON) : ListMergeAddRemoveToJSON($value.valueFloat, RSDFloatToJSON, RSDFloatToJSON);
	const valueDouble = isUndefined($value.valueDouble) || isNull($value.valueDouble) ? $value.valueDouble : isListReplace($value.valueDouble, isRSDDouble) ? ListReplaceToJSON($value.valueDouble, RSDDoubleToJSON) : ListMergeAddRemoveToJSON($value.valueDouble, RSDDoubleToJSON, RSDDoubleToJSON);
	const valueString = isUndefined($value.valueString) || isNull($value.valueString) ? $value.valueString : isListReplace($value.valueString, isRSDString) ? ListReplaceToJSON($value.valueString, RSDStringToJSON) : ListMergeAddRemoveToJSON($value.valueString, RSDStringToJSON, RSDStringToJSON);
	const valueLocalDate = isUndefined($value.valueLocalDate) || isNull($value.valueLocalDate) ? $value.valueLocalDate : isListReplace($value.valueLocalDate, isRSDLocalDate) ? ListReplaceToJSON($value.valueLocalDate, RSDLocalDateToJSON) : ListMergeAddRemoveToJSON($value.valueLocalDate, RSDLocalDateToJSON, RSDLocalDateToJSON);
	const valueLocalDateTime = isUndefined($value.valueLocalDateTime) || isNull($value.valueLocalDateTime) ? $value.valueLocalDateTime : isListReplace($value.valueLocalDateTime, isRSDLocalDateTime) ? ListReplaceToJSON($value.valueLocalDateTime, RSDLocalDateTimeToJSON) : ListMergeAddRemoveToJSON($value.valueLocalDateTime, RSDLocalDateTimeToJSON, RSDLocalDateTimeToJSON);
	const valueLocalTime = isUndefined($value.valueLocalTime) || isNull($value.valueLocalTime) ? $value.valueLocalTime : isListReplace($value.valueLocalTime, isRSDLocalTime) ? ListReplaceToJSON($value.valueLocalTime, RSDLocalTimeToJSON) : ListMergeAddRemoveToJSON($value.valueLocalTime, RSDLocalTimeToJSON, RSDLocalTimeToJSON);
	const valueOffsetDateTime = isUndefined($value.valueOffsetDateTime) || isNull($value.valueOffsetDateTime) ? $value.valueOffsetDateTime : isListReplace($value.valueOffsetDateTime, isRSDOffsetDateTime) ? ListReplaceToJSON($value.valueOffsetDateTime, RSDOffsetDateTimeToJSON) : ListMergeAddRemoveToJSON($value.valueOffsetDateTime, RSDOffsetDateTimeToJSON, RSDOffsetDateTimeToJSON);
	const valueZonedDateTime = isUndefined($value.valueZonedDateTime) || isNull($value.valueZonedDateTime) ? $value.valueZonedDateTime : isListReplace($value.valueZonedDateTime, isRSDZonedDateTime) ? ListReplaceToJSON($value.valueZonedDateTime, RSDZonedDateTimeToJSON) : ListMergeAddRemoveToJSON($value.valueZonedDateTime, RSDZonedDateTimeToJSON, RSDZonedDateTimeToJSON);

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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const ToJson_PatchableRecord_Basic_List_Optional_Null = `
export function PatchableRecord_Basic_List_Optional_NullPatchToJSON($value: PatchableRecord_Basic_List_Optional_NullPatch): Record<string, unknown> {
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);
	const valueBoolean = isUndefined($value.valueBoolean) || isNull($value.valueBoolean) ? $value.valueBoolean : isListReplace($value.valueBoolean, isRSDBoolean) ? ListReplaceToJSON($value.valueBoolean, RSDBooleanToJSON) : ListMergeAddRemoveToJSON($value.valueBoolean, RSDBooleanToJSON, RSDBooleanToJSON);
	const valueShort = isUndefined($value.valueShort) || isNull($value.valueShort) ? $value.valueShort : isListReplace($value.valueShort, isRSDShort) ? ListReplaceToJSON($value.valueShort, RSDShortToJSON) : ListMergeAddRemoveToJSON($value.valueShort, RSDShortToJSON, RSDShortToJSON);
	const valueInt = isUndefined($value.valueInt) || isNull($value.valueInt) ? $value.valueInt : isListReplace($value.valueInt, isRSDInt) ? ListReplaceToJSON($value.valueInt, RSDIntToJSON) : ListMergeAddRemoveToJSON($value.valueInt, RSDIntToJSON, RSDIntToJSON);
	const valueLong = isUndefined($value.valueLong) || isNull($value.valueLong) ? $value.valueLong : isListReplace($value.valueLong, isRSDLong) ? ListReplaceToJSON($value.valueLong, RSDLongToJSON) : ListMergeAddRemoveToJSON($value.valueLong, RSDLongToJSON, RSDLongToJSON);
	const valueFloat = isUndefined($value.valueFloat) || isNull($value.valueFloat) ? $value.valueFloat : isListReplace($value.valueFloat, isRSDFloat) ? ListReplaceToJSON($value.valueFloat, RSDFloatToJSON) : ListMergeAddRemoveToJSON($value.valueFloat, RSDFloatToJSON, RSDFloatToJSON);
	const valueDouble = isUndefined($value.valueDouble) || isNull($value.valueDouble) ? $value.valueDouble : isListReplace($value.valueDouble, isRSDDouble) ? ListReplaceToJSON($value.valueDouble, RSDDoubleToJSON) : ListMergeAddRemoveToJSON($value.valueDouble, RSDDoubleToJSON, RSDDoubleToJSON);
	const valueString = isUndefined($value.valueString) || isNull($value.valueString) ? $value.valueString : isListReplace($value.valueString, isRSDString) ? ListReplaceToJSON($value.valueString, RSDStringToJSON) : ListMergeAddRemoveToJSON($value.valueString, RSDStringToJSON, RSDStringToJSON);
	const valueLocalDate = isUndefined($value.valueLocalDate) || isNull($value.valueLocalDate) ? $value.valueLocalDate : isListReplace($value.valueLocalDate, isRSDLocalDate) ? ListReplaceToJSON($value.valueLocalDate, RSDLocalDateToJSON) : ListMergeAddRemoveToJSON($value.valueLocalDate, RSDLocalDateToJSON, RSDLocalDateToJSON);
	const valueLocalDateTime = isUndefined($value.valueLocalDateTime) || isNull($value.valueLocalDateTime) ? $value.valueLocalDateTime : isListReplace($value.valueLocalDateTime, isRSDLocalDateTime) ? ListReplaceToJSON($value.valueLocalDateTime, RSDLocalDateTimeToJSON) : ListMergeAddRemoveToJSON($value.valueLocalDateTime, RSDLocalDateTimeToJSON, RSDLocalDateTimeToJSON);
	const valueLocalTime = isUndefined($value.valueLocalTime) || isNull($value.valueLocalTime) ? $value.valueLocalTime : isListReplace($value.valueLocalTime, isRSDLocalTime) ? ListReplaceToJSON($value.valueLocalTime, RSDLocalTimeToJSON) : ListMergeAddRemoveToJSON($value.valueLocalTime, RSDLocalTimeToJSON, RSDLocalTimeToJSON);
	const valueOffsetDateTime = isUndefined($value.valueOffsetDateTime) || isNull($value.valueOffsetDateTime) ? $value.valueOffsetDateTime : isListReplace($value.valueOffsetDateTime, isRSDOffsetDateTime) ? ListReplaceToJSON($value.valueOffsetDateTime, RSDOffsetDateTimeToJSON) : ListMergeAddRemoveToJSON($value.valueOffsetDateTime, RSDOffsetDateTimeToJSON, RSDOffsetDateTimeToJSON);
	const valueZonedDateTime = isUndefined($value.valueZonedDateTime) || isNull($value.valueZonedDateTime) ? $value.valueZonedDateTime : isListReplace($value.valueZonedDateTime, isRSDZonedDateTime) ? ListReplaceToJSON($value.valueZonedDateTime, RSDZonedDateTimeToJSON) : ListMergeAddRemoveToJSON($value.valueZonedDateTime, RSDZonedDateTimeToJSON, RSDZonedDateTimeToJSON);

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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}`.trim();

const ToJson_PatchableEnumRecord = `
export function PatchableEnumRecordPatchToJSON($value: PatchableEnumRecordPatch): Record<string, unknown> {
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);
	const value = isUndefined($value.value) ? undefined : SampleEnumToJSON($value.value);
	const value_Null = isUndefined($value.value_Null) || isNull($value.value_Null) ? $value.value_Null : SampleEnumToJSON($value.value_Null);
	const value_Opt = isUndefined($value.value_Opt) || isNull($value.value_Opt) ? $value.value_Opt : SampleEnumToJSON($value.value_Opt);
	const value_Opt_Null = isUndefined($value.value_Opt_Null) || isNull($value.value_Opt_Null) ? $value.value_Opt_Null : SampleEnumToJSON($value.value_Opt_Null);
	const list = isUndefined($value.list) ? undefined : isListReplace($value.list, isSampleEnum) ? ListReplaceToJSON($value.list, SampleEnumToJSON) : ListMergeAddRemoveToJSON($value.list, SampleEnumToJSON, SampleEnumToJSON);
	const list_Null = isUndefined($value.list_Null) || isNull($value.list_Null) ? $value.list_Null : isListReplace($value.list_Null, isSampleEnum) ? ListReplaceToJSON($value.list_Null, SampleEnumToJSON) : ListMergeAddRemoveToJSON($value.list_Null, SampleEnumToJSON, SampleEnumToJSON);
	const list_Opt = isUndefined($value.list_Opt) || isNull($value.list_Opt) ? $value.list_Opt : isListReplace($value.list_Opt, isSampleEnum) ? ListReplaceToJSON($value.list_Opt, SampleEnumToJSON) : ListMergeAddRemoveToJSON($value.list_Opt, SampleEnumToJSON, SampleEnumToJSON);
	const list_Opt_Null = isUndefined($value.list_Opt_Null) || isNull($value.list_Opt_Null) ? $value.list_Opt_Null : isListReplace($value.list_Opt_Null, isSampleEnum) ? ListReplaceToJSON($value.list_Opt_Null, SampleEnumToJSON) : ListMergeAddRemoveToJSON($value.list_Opt_Null, SampleEnumToJSON, SampleEnumToJSON);

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

const ToJson_PatchableEnumInlineRecord = `
export function PatchableEnumInlineRecordPatchToJSON($value: PatchableEnumInlineRecordPatch): Record<string, unknown> {
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);
	const value = isUndefined($value.value) ? undefined : PatchableEnumInlineRecord_ValueToJSON($value.value);
	const value_Null = isUndefined($value.value_Null) || isNull($value.value_Null) ? $value.value_Null : PatchableEnumInlineRecord_Value_NullToJSON($value.value_Null);
	const value_Opt = isUndefined($value.value_Opt) || isNull($value.value_Opt) ? $value.value_Opt : PatchableEnumInlineRecord_Value_OptToJSON($value.value_Opt);
	const value_Opt_Null = isUndefined($value.value_Opt_Null) || isNull($value.value_Opt_Null) ? $value.value_Opt_Null : PatchableEnumInlineRecord_Value_Opt_NullToJSON($value.value_Opt_Null);
	const list = isUndefined($value.list) ? undefined : isListReplace($value.list, isPatchableEnumInlineRecord_List) ? ListReplaceToJSON($value.list, PatchableEnumInlineRecord_ListToJSON) : ListMergeAddRemoveToJSON($value.list, PatchableEnumInlineRecord_ListToJSON, PatchableEnumInlineRecord_ListToJSON);
	const list_Null = isUndefined($value.list_Null) || isNull($value.list_Null) ? $value.list_Null : isListReplace($value.list_Null, isPatchableEnumInlineRecord_List_Null) ? ListReplaceToJSON($value.list_Null, PatchableEnumInlineRecord_List_NullToJSON) : ListMergeAddRemoveToJSON($value.list_Null, PatchableEnumInlineRecord_List_NullToJSON, PatchableEnumInlineRecord_List_NullToJSON);
	const list_Opt_Null = isUndefined($value.list_Opt_Null) || isNull($value.list_Opt_Null) ? $value.list_Opt_Null : isListReplace($value.list_Opt_Null, isPatchableEnumInlineRecord_List_Opt_Null) ? ListReplaceToJSON($value.list_Opt_Null, PatchableEnumInlineRecord_List_Opt_NullToJSON) : ListMergeAddRemoveToJSON($value.list_Opt_Null, PatchableEnumInlineRecord_List_Opt_NullToJSON, PatchableEnumInlineRecord_List_Opt_NullToJSON);

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

const ToJson_PatchableScalarRecord = `
export function PatchableScalarRecordPatchToJSON($value: PatchableScalarRecordPatch): Record<string, unknown> {
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);
	const value = isUndefined($value.value) ? undefined : ZoneIdToJSON($value.value);
	const value_Null = isUndefined($value.value_Null) || isNull($value.value_Null) ? $value.value_Null : ZoneIdToJSON($value.value_Null);
	const value_Opt = isUndefined($value.value_Opt) || isNull($value.value_Opt) ? $value.value_Opt : ZoneIdToJSON($value.value_Opt);
	const value_Opt_Null = isUndefined($value.value_Opt_Null) || isNull($value.value_Opt_Null) ? $value.value_Opt_Null : ZoneIdToJSON($value.value_Opt_Null);
	const list = isUndefined($value.list) ? undefined : isListReplace($value.list, isZoneId) ? ListReplaceToJSON($value.list, ZoneIdToJSON) : ListMergeAddRemoveToJSON($value.list, ZoneIdToJSON, ZoneIdToJSON);
	const list_Null = isUndefined($value.list_Null) || isNull($value.list_Null) ? $value.list_Null : isListReplace($value.list_Null, isZoneId) ? ListReplaceToJSON($value.list_Null, ZoneIdToJSON) : ListMergeAddRemoveToJSON($value.list_Null, ZoneIdToJSON, ZoneIdToJSON);
	const list_Opt = isUndefined($value.list_Opt) || isNull($value.list_Opt) ? $value.list_Opt : isListReplace($value.list_Opt, isZoneId) ? ListReplaceToJSON($value.list_Opt, ZoneIdToJSON) : ListMergeAddRemoveToJSON($value.list_Opt, ZoneIdToJSON, ZoneIdToJSON);
	const list_Opt_Null = isUndefined($value.list_Opt_Null) || isNull($value.list_Opt_Null) ? $value.list_Opt_Null : isListReplace($value.list_Opt_Null, isZoneId) ? ListReplaceToJSON($value.list_Opt_Null, ZoneIdToJSON) : ListMergeAddRemoveToJSON($value.list_Opt_Null, ZoneIdToJSON, ZoneIdToJSON);

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

const ToJson_PatchableRecordOfRecords = `
export function PatchableRecordOfRecordsPatchToJSON($value: PatchableRecordOfRecordsPatch): Record<string, unknown> {
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);
	const value = isUndefined($value.value) ? undefined : ReplaceOrMergeToJSON($value.value, PatchableRecord_BasicToJSON, PatchableRecord_BasicPatchToJSON);
	const value_Null = isUndefined($value.value_Null) || isNull($value.value_Null) ? $value.value_Null : ReplaceOrMergeToJSON($value.value_Null, PatchableRecord_BasicToJSON, PatchableRecord_BasicPatchToJSON);
	const value_Opt = isUndefined($value.value_Opt) || isNull($value.value_Opt) ? $value.value_Opt : ReplaceOrMergeToJSON($value.value_Opt, PatchableRecord_BasicToJSON, PatchableRecord_BasicPatchToJSON);
	const value_Opt_Null = isUndefined($value.value_Opt_Null) || isNull($value.value_Opt_Null) ? $value.value_Opt_Null : ReplaceOrMergeToJSON($value.value_Opt_Null, PatchableRecord_BasicToJSON, PatchableRecord_BasicPatchToJSON);
	const list = isUndefined($value.list) ? undefined : ReplaceOrMergeToJSON($value.list, createListReplaceToJSON(PatchableRecord_BasicToJSON), createListMergeUpdateRemoveToJSON<PatchableRecord_Basic, PatchableRecord_BasicPatch, string, $ListMerge>(PatchableRecord_BasicToJSON, PatchableRecord_BasicPatchToJSON, noopMap));
	const list_Null = isUndefined($value.list_Null) || isNull($value.list_Null) ? $value.list_Null : ReplaceOrMergeToJSON($value.list_Null, createListReplaceToJSON(PatchableRecord_BasicToJSON), createListMergeUpdateRemoveToJSON<PatchableRecord_Basic, PatchableRecord_BasicPatch, string, $List_NullMerge>(PatchableRecord_BasicToJSON, PatchableRecord_BasicPatchToJSON, noopMap));
	const list_Opt = isUndefined($value.list_Opt) || isNull($value.list_Opt) ? $value.list_Opt : ReplaceOrMergeToJSON($value.list_Opt, createListReplaceToJSON(PatchableRecord_BasicToJSON), createListMergeUpdateRemoveToJSON<PatchableRecord_Basic, PatchableRecord_BasicPatch, string, $List_OptMerge>(PatchableRecord_BasicToJSON, PatchableRecord_BasicPatchToJSON, noopMap));
	const list_Opt_Null = isUndefined($value.list_Opt_Null) || isNull($value.list_Opt_Null) ? $value.list_Opt_Null : ReplaceOrMergeToJSON($value.list_Opt_Null, createListReplaceToJSON(PatchableRecord_BasicToJSON), createListMergeUpdateRemoveToJSON<PatchableRecord_Basic, PatchableRecord_BasicPatch, string, $List_Opt_NullMerge>(PatchableRecord_BasicToJSON, PatchableRecord_BasicPatchToJSON, noopMap));

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

const ToJson_PatchableRecordWithUnion = `
export function PatchableRecordWithUnionPatchToJSON($value: PatchableRecordWithUnionPatch): Record<string, unknown> {
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);
	const value = isUndefined($value.value) ? undefined : PatchableUnionOrPatchToJSON($value.value);
	const value_Null = isUndefined($value.value_Null) || isNull($value.value_Null) ? $value.value_Null : PatchableUnionOrPatchToJSON($value.value_Null);
	const value_Opt = isUndefined($value.value_Opt) || isNull($value.value_Opt) ? $value.value_Opt : PatchableUnionOrPatchToJSON($value.value_Opt);
	const value_Opt_Null = isUndefined($value.value_Opt_Null) || isNull($value.value_Opt_Null) ? $value.value_Opt_Null : PatchableUnionOrPatchToJSON($value.value_Opt_Null);
	const list = isUndefined($value.list) ? undefined : ReplaceOrMergeToJSON($value.list, createListReplaceToJSON(PatchableUnionToJSON), createListMergeUpdateRemoveToJSON<PatchableUnion, PatchableUnionPatch, string, $ListMerge>(PatchableUnionToJSON, PatchableUnionPatchToJSON, noopMap));
	const list_Null = isUndefined($value.list_Null) || isNull($value.list_Null) ? $value.list_Null : ReplaceOrMergeToJSON($value.list_Null, createListReplaceToJSON(PatchableUnionToJSON), createListMergeUpdateRemoveToJSON<PatchableUnion, PatchableUnionPatch, string, $List_NullMerge>(PatchableUnionToJSON, PatchableUnionPatchToJSON, noopMap));
	const list_Opt = isUndefined($value.list_Opt) || isNull($value.list_Opt) ? $value.list_Opt : ReplaceOrMergeToJSON($value.list_Opt, createListReplaceToJSON(PatchableUnionToJSON), createListMergeUpdateRemoveToJSON<PatchableUnion, PatchableUnionPatch, string, $List_OptMerge>(PatchableUnionToJSON, PatchableUnionPatchToJSON, noopMap));
	const list_Opt_Null = isUndefined($value.list_Opt_Null) || isNull($value.list_Opt_Null) ? $value.list_Opt_Null : ReplaceOrMergeToJSON($value.list_Opt_Null, createListReplaceToJSON(PatchableUnionToJSON), createListMergeUpdateRemoveToJSON<PatchableUnion, PatchableUnionPatch, string, $List_Opt_NullMerge>(PatchableUnionToJSON, PatchableUnionPatchToJSON, noopMap));

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
}`.trim();

const TO_JSON: RecordTest[] = [
	{
		name: 'PatchableRecord',
		result: ToJson_PatchableRecord,
	},
	{
		name: 'PatchableRecord_Basic',
		result: ToJson_PatchableRecord_Basic,
	},
	{
		name: 'PatchableRecord_Basic_Optional',
		result: ToJson_PatchableRecord_Basic_Optional,
	},
	{
		name: 'PatchableRecord_Basic_Null',
		result: ToJson_PatchableRecord_Basic_Null,
	},
	{
		name: 'PatchableRecord_Basic_Optional_Null',
		result: ToJson_PatchableRecord_Basic_Optional_Null,
	},
	{
		name: 'PatchableRecord_Basic_List',
		result: ToJson_PatchableRecord_Basic_List,
	},
	{
		name: 'PatchableRecord_Basic_List_Optional',
		result: ToJson_PatchableRecord_Basic_List_Optional,
	},
	{
		name: 'PatchableRecord_Basic_List_Null',
		result: ToJson_PatchableRecord_Basic_List_Null,
	},
	{
		name: 'PatchableRecord_Basic_List_Optional_Null',
		result: ToJson_PatchableRecord_Basic_List_Optional_Null,
	},
	{
		name: 'PatchableEnumRecord',
		result: ToJson_PatchableEnumRecord,
	},
	{
		name: 'PatchableEnumInlineRecord',
		result: ToJson_PatchableEnumInlineRecord,
	},
	{
		name: 'PatchableScalarRecord',
		result: ToJson_PatchableScalarRecord,
	},
	{
		name: 'PatchableRecordOfRecords',
		result: ToJson_PatchableRecordOfRecords,
	},
	{
		name: 'PatchableRecordWithUnion',
		result: ToJson_PatchableRecordWithUnion,
	},
];

describe('ToJSONPatch', () => {
	test.each(TO_JSON)('$name', data => {
		const recordModel = findListElement(model.elements, isMResolvedRecordType, r => r.name === data.name);
		const allProps = allResolvedRecordProperties(recordModel);
		const result = toString(ToJSONPatch(recordModel, allProps, fqn), '\t').trim();
		expect(result).toBe(data.result);
	});
});
