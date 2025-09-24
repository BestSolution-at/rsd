import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { FromJSON, RecordType, RecordTypeguard, ToJSON } from '../../../src/typescript-model-api/record.js';
import { allResolvedRecordProperties, isMResolvedRecordType, MResolvedRSDModel } from '../../../src/model.js';
import { createTypescriptClientAPIGeneratorConfig, findListElement, sampleModel } from '../test-utils.js';
import { TypescriptImportCollector } from '../../../src/typescript-gen-utils.js';
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

const From_Json_SimpleRecord = `
export function SimpleRecordFromJSON($value: Record<string, unknown>): SimpleRecord {
	const key = propValue('key', $value, isString);
	const version = propValue('version', $value, isString);
	const value = propValue('value', $value, isString);
	return {
		key,
		version,
		value,
	};
}
`.trim();

const From_Json_SimpleRecord_KeyVersion = `
export function SimpleRecord_KeyVersionFromJSON($value: Record<string, unknown>): SimpleRecord_KeyVersion {
	const key = propValue('key', $value, isString);
	const version = propValue('version', $value, isString);
	return {
		key,
		version,
	};
}
`.trim();

const From_Json_SimpleRecord_KeyVersion_Int_Int = `
export function SimpleRecord_KeyVersion_Int_IntFromJSON($value: Record<string, unknown>): SimpleRecord_KeyVersion_Int_Int {
	const key = propValue('key', $value, isNumber);
	const version = propValue('version', $value, isNumber);
	return {
		key,
		version,
	};
}
`.trim();

const From_Json_SimpleRecord_Basic = `
export function SimpleRecord_BasicFromJSON($value: Record<string, unknown>): SimpleRecord_Basic {
	const valueBoolean = propValue('valueBoolean', $value, isBoolean);
	const valueShort = propValue('valueShort', $value, isNumber);
	const valueInt = propValue('valueInt', $value, isNumber);
	const valueLong = propValue('valueLong', $value, isNumber);
	const valueFloat = propValue('valueFloat', $value, isNumber);
	const valueDouble = propValue('valueDouble', $value, isNumber);
	const valueString = propValue('valueString', $value, isString);
	const valueLocalDate = propValue('valueLocalDate', $value, isString);
	const valueLocalDateTime = propValue('valueLocalDateTime', $value, isString);
	const valueZonedDateTime = propValue('valueZonedDateTime', $value, isString);
	return {
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

const From_Json_SimpleRecord_Basic_Optional = `
export function SimpleRecord_Basic_OptionalFromJSON($value: Record<string, unknown>): SimpleRecord_Basic_Optional {
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

const From_Json_SimpleRecord_Basic_Null = `
export function SimpleRecord_Basic_NullFromJSON($value: Record<string, unknown>): SimpleRecord_Basic_Null {
	const valueBoolean = propValue('valueBoolean', $value, isBoolean, 'null');
	const valueShort = propValue('valueShort', $value, isNumber, 'null');
	const valueInt = propValue('valueInt', $value, isNumber, 'null');
	const valueLong = propValue('valueLong', $value, isNumber, 'null');
	const valueFloat = propValue('valueFloat', $value, isNumber, 'null');
	const valueDouble = propValue('valueDouble', $value, isNumber, 'null');
	const valueString = propValue('valueString', $value, isString, 'null');
	const valueLocalDate = propValue('valueLocalDate', $value, isString, 'null');
	const valueLocalDateTime = propValue('valueLocalDateTime', $value, isString, 'null');
	const valueZonedDateTime = propValue('valueZonedDateTime', $value, isString, 'null');
	return {
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

const From_Json_SimpleRecord_Basic_Optional_Null = `
export function SimpleRecord_Basic_Optional_NullFromJSON($value: Record<string, unknown>): SimpleRecord_Basic_Optional_Null {
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

const From_Json_SimpleRecord_Basic_List = `
export function SimpleRecord_Basic_ListFromJSON($value: Record<string, unknown>): SimpleRecord_Basic_List {
	const valueBoolean = propListValue('valueBoolean', $value, isBoolean);
	const valueShort = propListValue('valueShort', $value, isNumber);
	const valueInt = propListValue('valueInt', $value, isNumber);
	const valueLong = propListValue('valueLong', $value, isNumber);
	const valueFloat = propListValue('valueFloat', $value, isNumber);
	const valueDouble = propListValue('valueDouble', $value, isNumber);
	const valueString = propListValue('valueString', $value, isString);
	const valueLocalDate = propListValue('valueLocalDate', $value, isString);
	const valueLocalDateTime = propListValue('valueLocalDateTime', $value, isString);
	const valueZonedDateTime = propListValue('valueZonedDateTime', $value, isString);
	return {
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

const From_Json_SimpleRecord_Basic_List_Optional = `
export function SimpleRecord_Basic_List_OptionalFromJSON($value: Record<string, unknown>): SimpleRecord_Basic_List_Optional {
	const valueBoolean = propListValue('valueBoolean', $value, isBoolean, 'optional');
	const valueShort = propListValue('valueShort', $value, isNumber, 'optional');
	const valueInt = propListValue('valueInt', $value, isNumber, 'optional');
	const valueLong = propListValue('valueLong', $value, isNumber, 'optional');
	const valueFloat = propListValue('valueFloat', $value, isNumber, 'optional');
	const valueDouble = propListValue('valueDouble', $value, isNumber, 'optional');
	const valueString = propListValue('valueString', $value, isString, 'optional');
	const valueLocalDate = propListValue('valueLocalDate', $value, isString, 'optional');
	const valueLocalDateTime = propListValue('valueLocalDateTime', $value, isString, 'optional');
	const valueZonedDateTime = propListValue('valueZonedDateTime', $value, isString, 'optional');
	return {
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

const From_Json_SimpleRecord_Basic_List_Null = `
export function SimpleRecord_Basic_List_NullFromJSON($value: Record<string, unknown>): SimpleRecord_Basic_List_Null {
	const valueBoolean = propListValue('valueBoolean', $value, isBoolean, 'null');
	const valueShort = propListValue('valueShort', $value, isNumber, 'null');
	const valueInt = propListValue('valueInt', $value, isNumber, 'null');
	const valueLong = propListValue('valueLong', $value, isNumber, 'null');
	const valueFloat = propListValue('valueFloat', $value, isNumber, 'null');
	const valueDouble = propListValue('valueDouble', $value, isNumber, 'null');
	const valueString = propListValue('valueString', $value, isString, 'null');
	const valueLocalDate = propListValue('valueLocalDate', $value, isString, 'null');
	const valueLocalDateTime = propListValue('valueLocalDateTime', $value, isString, 'null');
	const valueZonedDateTime = propListValue('valueZonedDateTime', $value, isString, 'null');
	return {
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

const From_Json_SimpleRecord_Basic_List_Optional_Null = `
export function SimpleRecord_Basic_List_Optional_NullFromJSON($value: Record<string, unknown>): SimpleRecord_Basic_List_Optional_Null {
	const valueBoolean = propListValue('valueBoolean', $value, isBoolean, 'optional_null');
	const valueShort = propListValue('valueShort', $value, isNumber, 'optional_null');
	const valueInt = propListValue('valueInt', $value, isNumber, 'optional_null');
	const valueLong = propListValue('valueLong', $value, isNumber, 'optional_null');
	const valueFloat = propListValue('valueFloat', $value, isNumber, 'optional_null');
	const valueDouble = propListValue('valueDouble', $value, isNumber, 'optional_null');
	const valueString = propListValue('valueString', $value, isString, 'optional_null');
	const valueLocalDate = propListValue('valueLocalDate', $value, isString, 'optional_null');
	const valueLocalDateTime = propListValue('valueLocalDateTime', $value, isString, 'optional_null');
	const valueZonedDateTime = propListValue('valueZonedDateTime', $value, isString, 'optional_null');
	return {
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

const From_Json_EnumRecord = `
export function EnumRecordFromJSON($value: Record<string, unknown>): EnumRecord {
	const value = propValue('value', $value, isSampleEnum);
	const value_Null = propValue('value_Null', $value, isSampleEnum, 'null');
	const value_Opt = propValue('value_Opt', $value, isSampleEnum, 'optional');
	const value_Opt_Null = propValue('value_Opt_Null', $value, isSampleEnum, 'optional_null');
	const list = propListValue('list', $value, isSampleEnum);
	const list_Null = propListValue('list_Null', $value, isSampleEnum, 'null');
	const list_Opt = propListValue('list_Opt', $value, isSampleEnum, 'optional');
	const list_Opt_Null = propListValue('list_Opt_Null', $value, isSampleEnum, 'optional_null');
	return {
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

const From_Json_EnumInlineRecord = `
export function EnumInlineRecordFromJSON($value: Record<string, unknown>): EnumInlineRecord {
	const value = propValue('value', $value, isEnumInlineRecord_Value);
	const value_Null = propValue('value_Null', $value, isEnumInlineRecord_Value_Null, 'null');
	const value_Opt = propValue('value_Opt', $value, isEnumInlineRecord_Value_Opt, 'optional');
	const value_Opt_Null = propValue('value_Opt_Null', $value, isEnumInlineRecord_Value_Opt_Null, 'optional_null');
	const list = propListValue('list', $value, isEnumInlineRecord_List);
	const list_Null = propListValue('list_Null', $value, isEnumInlineRecord_List_Null, 'null');
	const list_Opt_Null = propListValue('list_Opt_Null', $value, isEnumInlineRecord_List_Opt_Null, 'optional_null');
	return {
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

const From_Json_ScalarRecord = `
export function ScalarRecordFromJSON($value: Record<string, unknown>): ScalarRecord {
	const value = propValue('value', $value, isString);
	const value_Null = propValue('value_Null', $value, isString, 'null');
	const value_Opt = propValue('value_Opt', $value, isString, 'optional');
	const value_Opt_Null = propValue('value_Opt_Null', $value, isString, 'optional_null');
	const list = propListValue('list', $value, isString);
	const list_Null = propListValue('list_Null', $value, isString, 'null');
	const list_Opt = propListValue('list_Opt', $value, isString, 'optional');
	const list_Opt_Null = propListValue('list_Opt_Null', $value, isString, 'optional_null');
	return {
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

const From_Json_RecordOfRecords = `
export function RecordOfRecordsFromJSON($value: Record<string, unknown>): RecordOfRecords {
	const value = propMappedValue('value', $value, isRecord, SimpleRecord_BasicFromJSON);
	const value_Null = propMappedValue('value_Null', $value, isRecord, SimpleRecord_BasicFromJSON, 'null');
	const value_Opt = propMappedValue('value_Opt', $value, isRecord, SimpleRecord_BasicFromJSON, 'optional');
	const value_Opt_Null = propMappedValue('value_Opt_Null', $value, isRecord, SimpleRecord_BasicFromJSON, 'optional_null');
	const list = propMappedListValue('list', $value, isRecord, SimpleRecord_BasicFromJSON);
	const list_Null = propMappedListValue('list_Null', $value, isRecord, SimpleRecord_BasicFromJSON, 'null');
	const list_Opt = propMappedListValue('list_Opt', $value, isRecord, SimpleRecord_BasicFromJSON, 'optional');
	const list_Opt_Null = propMappedListValue('list_Opt_Null', $value, isRecord, SimpleRecord_BasicFromJSON, 'optional_null');
	return {
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

const From_Json_RecordWithUnions = `
export function RecordWithUnionsFromJSON($value: Record<string, unknown>): RecordWithUnions {
	const value = propMappedValue('value', $value, isRecord, UnionFromJSON);
	const value_Null = propMappedValue('value_Null', $value, isRecord, UnionFromJSON, 'null');
	const value_Opt = propMappedValue('value_Opt', $value, isRecord, UnionFromJSON, 'optional');
	const value_Opt_Null = propMappedValue('value_Opt_Null', $value, isRecord, UnionFromJSON, 'optional_null');
	const list = propMappedListValue('list', $value, isRecord, UnionFromJSON);
	const list_Null = propMappedListValue('list_Null', $value, isRecord, UnionFromJSON, 'null');
	const list_Opt = propMappedListValue('list_Opt', $value, isRecord, UnionFromJSON, 'optional');
	const list_Opt_Null = propMappedListValue('list_Opt_Null', $value, isRecord, UnionFromJSON, 'optional_null');
	return {
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
		name: 'SimpleRecord_KeyVersion',
		result: From_Json_SimpleRecord_KeyVersion,
	},
	{
		name: 'SimpleRecord_KeyVersion_Int_Int',
		result: From_Json_SimpleRecord_KeyVersion_Int_Int,
	},
	{
		name: 'SimpleRecord',
		result: From_Json_SimpleRecord,
	},
	{
		name: 'SimpleRecord_Basic',
		result: From_Json_SimpleRecord_Basic,
	},
	{
		name: 'SimpleRecord_Basic_Optional',
		result: From_Json_SimpleRecord_Basic_Optional,
	},
	{
		name: 'SimpleRecord_Basic_Null',
		result: From_Json_SimpleRecord_Basic_Null,
	},
	{
		name: 'SimpleRecord_Basic_Optional_Null',
		result: From_Json_SimpleRecord_Basic_Optional_Null,
	},
	{
		name: 'SimpleRecord_Basic_List',
		result: From_Json_SimpleRecord_Basic_List,
	},
	{
		name: 'SimpleRecord_Basic_List_Optional',
		result: From_Json_SimpleRecord_Basic_List_Optional,
	},
	{
		name: 'SimpleRecord_Basic_List_Null',
		result: From_Json_SimpleRecord_Basic_List_Null,
	},
	{
		name: 'SimpleRecord_Basic_List_Optional_Null',
		result: From_Json_SimpleRecord_Basic_List_Optional_Null,
	},
	{
		name: 'EnumRecord',
		result: From_Json_EnumRecord,
	},
	{
		name: 'EnumInlineRecord',
		result: From_Json_EnumInlineRecord,
	},
	{
		name: 'ScalarRecord',
		result: From_Json_ScalarRecord,
	},
	{
		name: 'RecordOfRecords',
		result: From_Json_RecordOfRecords,
	},
	{
		name: 'RecordWithUnions',
		result: From_Json_RecordWithUnions,
	},
];

describe('FromJSON', () => {
	test.each(FROM_JSON)('$name', data => {
		const recordModel = findListElement(model.elements, isMResolvedRecordType, r => r.name === data.name);
		const allProps = allResolvedRecordProperties(recordModel);
		const result = toString(FromJSON(recordModel, allProps, fqn), '\t').trim();
		expect(result).toBe(data.result);
	});
});

const ToJson_SimpleRecord_KeyVersion = `
export function SimpleRecord_KeyVersionToJSON($value: SimpleRecord_KeyVersion): Record<string, unknown> {
	const key = $value.key;
	const version = $value.version;

	return {
		key,
		version,
	};
}
`.trim();

const ToJson_SimpleRecord_KeyVersion_Int_Int = `
export function SimpleRecord_KeyVersion_Int_IntToJSON($value: SimpleRecord_KeyVersion_Int_Int): Record<string, unknown> {
	const key = $value.key;
	const version = $value.version;

	return {
		key,
		version,
	};
}
`.trim();

const ToJson_SimpleRecord = `
export function SimpleRecordToJSON($value: SimpleRecord): Record<string, unknown> {
	const key = $value.key;
	const version = $value.version;
	const value = $value.value;

	return {
		key,
		version,
		value,
	};
}
`.trim();

const ToJson_SimpleRecord_Basic = `
export function SimpleRecord_BasicToJSON($value: SimpleRecord_Basic): Record<string, unknown> {
	const valueBoolean = $value.valueBoolean;
	const valueShort = $value.valueShort;
	const valueInt = $value.valueInt;
	const valueLong = $value.valueLong;
	const valueFloat = $value.valueFloat;
	const valueDouble = $value.valueDouble;
	const valueString = $value.valueString;
	const valueLocalDate = $value.valueLocalDate;
	const valueLocalDateTime = $value.valueLocalDateTime;
	const valueZonedDateTime = $value.valueZonedDateTime;

	return {
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

const ToJson_SimpleRecord_Basic_Optional = `
export function SimpleRecord_Basic_OptionalToJSON($value: SimpleRecord_Basic_Optional): Record<string, unknown> {
	const valueBoolean = $value.valueBoolean;
	const valueShort = $value.valueShort;
	const valueInt = $value.valueInt;
	const valueLong = $value.valueLong;
	const valueFloat = $value.valueFloat;
	const valueDouble = $value.valueDouble;
	const valueString = $value.valueString;
	const valueLocalDate = $value.valueLocalDate;
	const valueLocalDateTime = $value.valueLocalDateTime;
	const valueZonedDateTime = $value.valueZonedDateTime;

	return {
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

const ToJson_SimpleRecord_Basic_Null = `
export function SimpleRecord_Basic_NullToJSON($value: SimpleRecord_Basic_Null): Record<string, unknown> {
	const valueBoolean = $value.valueBoolean;
	const valueShort = $value.valueShort;
	const valueInt = $value.valueInt;
	const valueLong = $value.valueLong;
	const valueFloat = $value.valueFloat;
	const valueDouble = $value.valueDouble;
	const valueString = $value.valueString;
	const valueLocalDate = $value.valueLocalDate;
	const valueLocalDateTime = $value.valueLocalDateTime;
	const valueZonedDateTime = $value.valueZonedDateTime;

	return {
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

const ToJson_SimpleRecord_Basic_Optional_Null = `
export function SimpleRecord_Basic_Optional_NullToJSON($value: SimpleRecord_Basic_Optional_Null): Record<string, unknown> {
	const valueBoolean = $value.valueBoolean;
	const valueShort = $value.valueShort;
	const valueInt = $value.valueInt;
	const valueLong = $value.valueLong;
	const valueFloat = $value.valueFloat;
	const valueDouble = $value.valueDouble;
	const valueString = $value.valueString;
	const valueLocalDate = $value.valueLocalDate;
	const valueLocalDateTime = $value.valueLocalDateTime;
	const valueZonedDateTime = $value.valueZonedDateTime;

	return {
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

const ToJson_SimpleRecord_Basic_List = `
export function SimpleRecord_Basic_ListToJSON($value: SimpleRecord_Basic_List): Record<string, unknown> {
	const valueBoolean = $value.valueBoolean;
	const valueShort = $value.valueShort;
	const valueInt = $value.valueInt;
	const valueLong = $value.valueLong;
	const valueFloat = $value.valueFloat;
	const valueDouble = $value.valueDouble;
	const valueString = $value.valueString;
	const valueLocalDate = $value.valueLocalDate;
	const valueLocalDateTime = $value.valueLocalDateTime;
	const valueZonedDateTime = $value.valueZonedDateTime;

	return {
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

const ToJson_SimpleRecord_Basic_List_Optional = `
export function SimpleRecord_Basic_List_OptionalToJSON($value: SimpleRecord_Basic_List_Optional): Record<string, unknown> {
	const valueBoolean = $value.valueBoolean;
	const valueShort = $value.valueShort;
	const valueInt = $value.valueInt;
	const valueLong = $value.valueLong;
	const valueFloat = $value.valueFloat;
	const valueDouble = $value.valueDouble;
	const valueString = $value.valueString;
	const valueLocalDate = $value.valueLocalDate;
	const valueLocalDateTime = $value.valueLocalDateTime;
	const valueZonedDateTime = $value.valueZonedDateTime;

	return {
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

const ToJson_SimpleRecord_Basic_List_Null = `
export function SimpleRecord_Basic_List_NullToJSON($value: SimpleRecord_Basic_List_Null): Record<string, unknown> {
	const valueBoolean = $value.valueBoolean;
	const valueShort = $value.valueShort;
	const valueInt = $value.valueInt;
	const valueLong = $value.valueLong;
	const valueFloat = $value.valueFloat;
	const valueDouble = $value.valueDouble;
	const valueString = $value.valueString;
	const valueLocalDate = $value.valueLocalDate;
	const valueLocalDateTime = $value.valueLocalDateTime;
	const valueZonedDateTime = $value.valueZonedDateTime;

	return {
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

const ToJson_SimpleRecord_Basic_List_Optional_Null = `
export function SimpleRecord_Basic_List_Optional_NullToJSON($value: SimpleRecord_Basic_List_Optional_Null): Record<string, unknown> {
	const valueBoolean = $value.valueBoolean;
	const valueShort = $value.valueShort;
	const valueInt = $value.valueInt;
	const valueLong = $value.valueLong;
	const valueFloat = $value.valueFloat;
	const valueDouble = $value.valueDouble;
	const valueString = $value.valueString;
	const valueLocalDate = $value.valueLocalDate;
	const valueLocalDateTime = $value.valueLocalDateTime;
	const valueZonedDateTime = $value.valueZonedDateTime;

	return {
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

const ToJson_EnumRecord = `
export function EnumRecordToJSON($value: EnumRecord): Record<string, unknown> {
	const value = $value.value;
	const value_Null = $value.value_Null;
	const value_Opt = $value.value_Opt;
	const value_Opt_Null = $value.value_Opt_Null;
	const list = $value.list;
	const list_Null = $value.list_Null;
	const list_Opt = $value.list_Opt;
	const list_Opt_Null = $value.list_Opt_Null;

	return {
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

const ToJson_EnumInlineRecord = `
export function EnumInlineRecordToJSON($value: EnumInlineRecord): Record<string, unknown> {
	const value = $value.value;
	const value_Null = $value.value_Null;
	const value_Opt = $value.value_Opt;
	const value_Opt_Null = $value.value_Opt_Null;
	const list = $value.list;
	const list_Null = $value.list_Null;
	const list_Opt_Null = $value.list_Opt_Null;

	return {
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

const ToJson_ScalarRecord = `
export function ScalarRecordToJSON($value: ScalarRecord): Record<string, unknown> {
	const value = $value.value;
	const value_Null = $value.value_Null;
	const value_Opt = $value.value_Opt;
	const value_Opt_Null = $value.value_Opt_Null;
	const list = $value.list;
	const list_Null = $value.list_Null;
	const list_Opt = $value.list_Opt;
	const list_Opt_Null = $value.list_Opt_Null;

	return {
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

const ToJson_RecordOfRecords = `
export function RecordOfRecordsToJSON($value: RecordOfRecords): Record<string, unknown> {
	const value = SimpleRecord_BasicToJSON($value.value);
	const value_Null = isNull($value.value_Null) ? null : SimpleRecord_BasicToJSON($value.value_Null);
	const value_Opt = isUndefined($value.value_Opt) ? undefined : SimpleRecord_BasicToJSON($value.value_Opt);
	const value_Opt_Null = isUndefined($value.value_Opt_Null) || isNull($value.value_Opt_Null) ? $value.value_Opt_Null : SimpleRecord_BasicToJSON($value.value_Opt_Null);
	const list = $value.list.map(SimpleRecord_BasicToJSON);
	const list_Null = isNull($value.list_Null) ? null : $value.list_Null.map(SimpleRecord_BasicToJSON);
	const list_Opt = isUndefined($value.list_Opt) ? undefined : $value.list_Opt.map(SimpleRecord_BasicToJSON);
	const list_Opt_Null = isUndefined($value.list_Opt_Null) || isNull($value.list_Opt_Null) ? $value.list_Opt_Null : $value.list_Opt_Null.map(SimpleRecord_BasicToJSON);

	return {
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

const ToJson_RecordWithUnions = `
export function RecordWithUnionsToJSON($value: RecordWithUnions): Record<string, unknown> {
	const value = UnionToJSON($value.value);
	const value_Null = isNull($value.value_Null) ? null : UnionToJSON($value.value_Null);
	const value_Opt = isUndefined($value.value_Opt) ? undefined : UnionToJSON($value.value_Opt);
	const value_Opt_Null = isUndefined($value.value_Opt_Null) || isNull($value.value_Opt_Null) ? $value.value_Opt_Null : UnionToJSON($value.value_Opt_Null);
	const list = $value.list.map(UnionToJSON);
	const list_Null = isNull($value.list_Null) ? null : $value.list_Null.map(UnionToJSON);
	const list_Opt = isUndefined($value.list_Opt) ? undefined : $value.list_Opt.map(UnionToJSON);
	const list_Opt_Null = isUndefined($value.list_Opt_Null) || isNull($value.list_Opt_Null) ? $value.list_Opt_Null : $value.list_Opt_Null.map(UnionToJSON);

	return {
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

const TO_JSON: RecordTest[] = [
	{
		name: 'SimpleRecord_KeyVersion',
		result: ToJson_SimpleRecord_KeyVersion,
	},
	{
		name: 'SimpleRecord_KeyVersion_Int_Int',
		result: ToJson_SimpleRecord_KeyVersion_Int_Int,
	},
	{
		name: 'SimpleRecord',
		result: ToJson_SimpleRecord,
	},
	{
		name: 'SimpleRecord',
		result: ToJson_SimpleRecord,
	},
	{
		name: 'SimpleRecord_Basic_Optional',
		result: ToJson_SimpleRecord_Basic_Optional,
	},
	{
		name: 'SimpleRecord_Basic_Null',
		result: ToJson_SimpleRecord_Basic_Null,
	},
	{
		name: 'SimpleRecord_Basic_Optional_Null',
		result: ToJson_SimpleRecord_Basic_Optional_Null,
	},
	{
		name: 'SimpleRecord_Basic_List',
		result: ToJson_SimpleRecord_Basic_List,
	},
	{
		name: 'SimpleRecord_Basic_List_Optional',
		result: ToJson_SimpleRecord_Basic_List_Optional,
	},
	{
		name: 'SimpleRecord_Basic_List_Null',
		result: ToJson_SimpleRecord_Basic_List_Null,
	},
	{
		name: 'SimpleRecord_Basic_List_Optional_Null',
		result: ToJson_SimpleRecord_Basic_List_Optional_Null,
	},
	{
		name: 'EnumRecord',
		result: ToJson_EnumRecord,
	},
	{
		name: 'EnumInlineRecord',
		result: ToJson_EnumInlineRecord,
	},
	{
		name: 'ScalarRecord',
		result: ToJson_ScalarRecord,
	},
	{
		name: 'RecordOfRecords',
		result: ToJson_RecordOfRecords,
	},
	{
		name: 'RecordWithUnions',
		result: ToJson_RecordWithUnions,
	},
];

describe('ToJSON', () => {
	test.each(TO_JSON)('$name', data => {
		const recordModel = findListElement(model.elements, isMResolvedRecordType, r => r.name === data.name);
		const allProps = allResolvedRecordProperties(recordModel);
		const result = toString(ToJSON(recordModel, allProps, fqn), '\t').trim();
		expect(result).toBe(data.result);
	});
});
