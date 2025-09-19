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
