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
	collector = new TypescriptImportCollector(createTypescriptClientAPIGeneratorConfig(), 'sample.ts');
	fqn = collector.importType.bind(collector);
});

const SimpleRecord_KeyVersion_Result = `
export type SimpleRecord_KeyVersion = {
	readonly key: RSDString;
	readonly version: RSDString;
};
`.trim();

const SimpleRecord_KeyVersion_Int_Int_Result = `
export type SimpleRecord_KeyVersion_Int_Int = {
	readonly key: RSDInt;
	readonly version: RSDInt;
};
`.trim();

const SimpleRecord_Result = `
export type SimpleRecord = {
	readonly key: RSDString;
	readonly version: RSDString;
	readonly value: RSDString;
};
`.trim();

const SimpleRecord_Basic_Result = `
export type SimpleRecord_Basic = {
	readonly valueBoolean: RSDBoolean;
	readonly valueShort: RSDShort;
	readonly valueInt: RSDInt;
	readonly valueLong: RSDLong;
	readonly valueFloat: RSDFloat;
	readonly valueDouble: RSDDouble;
	readonly valueString: RSDString;
	readonly valueLocalDate: RSDLocalDate;
	readonly valueLocalDateTime: RSDLocalDateTime;
	readonly valueLocalTime: RSDLocalTime;
	readonly valueOffsetDateTime: RSDOffsetDateTime;
	readonly valueZonedDateTime: RSDZonedDateTime;
};
`.trim();

const SimpleRecord_Basic_Optional_Result = `
export type SimpleRecord_Basic_Optional = {
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

const SimpleRecord_Basic_Null_Result = `
export type SimpleRecord_Basic_Null = {
	readonly valueBoolean: RSDBoolean | null;
	readonly valueShort: RSDShort | null;
	readonly valueInt: RSDInt | null;
	readonly valueLong: RSDLong | null;
	readonly valueFloat: RSDFloat | null;
	readonly valueDouble: RSDDouble | null;
	readonly valueString: RSDString | null;
	readonly valueLocalDate: RSDLocalDate | null;
	readonly valueLocalDateTime: RSDLocalDateTime | null;
	readonly valueLocalTime: RSDLocalTime | null;
	readonly valueOffsetDateTime: RSDOffsetDateTime | null;
	readonly valueZonedDateTime: RSDZonedDateTime | null;
};
`.trim();

const SimpleRecord_Basic_Optional_Null_Result = `
export type SimpleRecord_Basic_Optional_Null = {
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

const SimpleRecord_Basic_List_Result = `
export type SimpleRecord_Basic_List = {
	readonly valueBoolean: RSDBoolean[];
	readonly valueShort: RSDShort[];
	readonly valueInt: RSDInt[];
	readonly valueLong: RSDLong[];
	readonly valueFloat: RSDFloat[];
	readonly valueDouble: RSDDouble[];
	readonly valueString: RSDString[];
	readonly valueLocalDate: RSDLocalDate[];
	readonly valueLocalDateTime: RSDLocalDateTime[];
	readonly valueLocalTime: RSDLocalTime[];
	readonly valueOffsetDateTime: RSDOffsetDateTime[];
	readonly valueZonedDateTime: RSDZonedDateTime[];
};
`.trim();

const SimpleRecord_Basic_List_Optional_Result = `
export type SimpleRecord_Basic_List_Optional = {
	readonly valueBoolean?: RSDBoolean[];
	readonly valueShort?: RSDShort[];
	readonly valueInt?: RSDInt[];
	readonly valueLong?: RSDLong[];
	readonly valueFloat?: RSDFloat[];
	readonly valueDouble?: RSDDouble[];
	readonly valueString?: RSDString[];
	readonly valueLocalDate?: RSDLocalDate[];
	readonly valueLocalDateTime?: RSDLocalDateTime[];
	readonly valueLocalTime?: RSDLocalTime[];
	readonly valueOffsetDateTime?: RSDOffsetDateTime[];
	readonly valueZonedDateTime?: RSDZonedDateTime[];
};
`.trim();

const SimpleRecord_Basic_List_Null_Result = `
export type SimpleRecord_Basic_List_Null = {
	readonly valueBoolean: RSDBoolean[] | null;
	readonly valueShort: RSDShort[] | null;
	readonly valueInt: RSDInt[] | null;
	readonly valueLong: RSDLong[] | null;
	readonly valueFloat: RSDFloat[] | null;
	readonly valueDouble: RSDDouble[] | null;
	readonly valueString: RSDString[] | null;
	readonly valueLocalDate: RSDLocalDate[] | null;
	readonly valueLocalDateTime: RSDLocalDateTime[] | null;
	readonly valueLocalTime: RSDLocalTime[] | null;
	readonly valueOffsetDateTime: RSDOffsetDateTime[] | null;
	readonly valueZonedDateTime: RSDZonedDateTime[] | null;
};
`.trim();

const SimpleRecord_Basic_List_Optional_Null_Result = `
export type SimpleRecord_Basic_List_Optional_Null = {
	readonly valueBoolean?: RSDBoolean[] | null;
	readonly valueShort?: RSDShort[] | null;
	readonly valueInt?: RSDInt[] | null;
	readonly valueLong?: RSDLong[] | null;
	readonly valueFloat?: RSDFloat[] | null;
	readonly valueDouble?: RSDDouble[] | null;
	readonly valueString?: RSDString[] | null;
	readonly valueLocalDate?: RSDLocalDate[] | null;
	readonly valueLocalDateTime?: RSDLocalDateTime[] | null;
	readonly valueLocalTime?: RSDLocalTime[] | null;
	readonly valueOffsetDateTime?: RSDOffsetDateTime[] | null;
	readonly valueZonedDateTime?: RSDZonedDateTime[] | null;
};
`.trim();

const ScalarRecord_Result = `
export type ScalarRecord = {
	readonly value: ZoneId;
	readonly value_Null: ZoneId | null;
	readonly value_Opt?: ZoneId;
	readonly value_Opt_Null?: ZoneId | null;
	readonly list: ZoneId[];
	readonly list_Null: ZoneId[] | null;
	readonly list_Opt?: ZoneId[];
	readonly list_Opt_Null?: ZoneId[] | null;
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
	readonly sample: RSDString;
	readonly mValueString: RSDString;
	readonly mValueString2: RSDString;
	readonly myUnion: Union;
	readonly myRecord: SimpleRecord;
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
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString)
}
`.trim();

const SimpleRecord_KeyVersion_Int_Int_Typeguard_Result = `
export function isSimpleRecord_KeyVersion_Int_Int(value: unknown): value is SimpleRecord_KeyVersion_Int_Int {
	return isRecord(value) &&
		checkProp(value, 'key', isRSDInt) &&
		checkProp(value, 'version', isRSDInt)
}
`.trim();

const SimpleRecord_Typeguard_Result = `
export function isSimpleRecord(value: unknown): value is SimpleRecord {
	return isRecord(value) &&
		checkProp(value, 'key', isRSDString) &&
		checkProp(value, 'version', isRSDString) &&
		checkProp(value, 'value', isRSDString);
}
`.trim();

const SimpleRecord_Basic_Typeguard_Result = `
export function isSimpleRecord_Basic(value: unknown): value is SimpleRecord_Basic {
	return isRecord(value) &&
		checkProp(value, 'valueBoolean', isRSDBoolean) &&
		checkProp(value, 'valueShort', isRSDShort) &&
		checkProp(value, 'valueInt', isRSDInt) &&
		checkProp(value, 'valueLong', isRSDLong) &&
		checkProp(value, 'valueFloat', isRSDFloat) &&
		checkProp(value, 'valueDouble', isRSDDouble) &&
		checkProp(value, 'valueString', isRSDString) &&
		checkProp(value, 'valueLocalDate', isRSDLocalDate) &&
		checkProp(value, 'valueLocalDateTime', isRSDLocalDateTime) &&
		checkProp(value, 'valueLocalTime', isRSDLocalTime) &&
		checkProp(value, 'valueOffsetDateTime', isRSDOffsetDateTime) &&
		checkProp(value, 'valueZonedDateTime', isRSDZonedDateTime);
}
`.trim();

const SimpleRecord_Basic_Optional_Typeguard_Result = `
export function isSimpleRecord_Basic_Optional(value: unknown): value is SimpleRecord_Basic_Optional {
	return isRecord(value) &&
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

const SimpleRecord_Basic_Null_Typeguard_Result = `
export function isSimpleRecord_Basic_Null(value: unknown): value is SimpleRecord_Basic_Null {
	return isRecord(value) &&
		(checkProp(value, 'valueBoolean', isNull) || checkProp(value, 'valueBoolean', isRSDBoolean)) &&
		(checkProp(value, 'valueShort', isNull) || checkProp(value, 'valueShort', isRSDShort)) &&
		(checkProp(value, 'valueInt', isNull) || checkProp(value, 'valueInt', isRSDInt)) &&
		(checkProp(value, 'valueLong', isNull) || checkProp(value, 'valueLong', isRSDLong)) &&
		(checkProp(value, 'valueFloat', isNull) || checkProp(value, 'valueFloat', isRSDFloat)) &&
		(checkProp(value, 'valueDouble', isNull) || checkProp(value, 'valueDouble', isRSDDouble)) &&
		(checkProp(value, 'valueString', isNull) || checkProp(value, 'valueString', isRSDString)) &&
		(checkProp(value, 'valueLocalDate', isNull) || checkProp(value, 'valueLocalDate', isRSDLocalDate)) &&
		(checkProp(value, 'valueLocalDateTime', isNull) || checkProp(value, 'valueLocalDateTime', isRSDLocalDateTime)) &&
		(checkProp(value, 'valueLocalTime', isNull) || checkProp(value, 'valueLocalTime', isRSDLocalTime)) &&
		(checkProp(value, 'valueOffsetDateTime', isNull) || checkProp(value, 'valueOffsetDateTime', isRSDOffsetDateTime)) &&
		(checkProp(value, 'valueZonedDateTime', isNull) || checkProp(value, 'valueZonedDateTime', isRSDZonedDateTime));
}
`.trim();

const SimpleRecord_Basic_Optional_Null_Typeguard_Result = `
export function isSimpleRecord_Basic_Optional_Null(value: unknown): value is SimpleRecord_Basic_Optional_Null {
	return isRecord(value) &&
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

const SimpleRecord_Basic_List_Typeguard_Result = `
export function isSimpleRecord_Basic_List(value: unknown): value is SimpleRecord_Basic_List {
	return isRecord(value) &&
		checkProp(value, 'valueBoolean', createTypedArrayGuard(isRSDBoolean)) &&
		checkProp(value, 'valueShort', createTypedArrayGuard(isRSDShort)) &&
		checkProp(value, 'valueInt', createTypedArrayGuard(isRSDInt)) &&
		checkProp(value, 'valueLong', createTypedArrayGuard(isRSDLong)) &&
		checkProp(value, 'valueFloat', createTypedArrayGuard(isRSDFloat)) &&
		checkProp(value, 'valueDouble', createTypedArrayGuard(isRSDDouble)) &&
		checkProp(value, 'valueString', createTypedArrayGuard(isRSDString)) &&
		checkProp(value, 'valueLocalDate', createTypedArrayGuard(isRSDLocalDate)) &&
		checkProp(value, 'valueLocalDateTime', createTypedArrayGuard(isRSDLocalDateTime)) &&
		checkProp(value, 'valueLocalTime', createTypedArrayGuard(isRSDLocalTime)) &&
		checkProp(value, 'valueOffsetDateTime', createTypedArrayGuard(isRSDOffsetDateTime)) &&
		checkProp(value, 'valueZonedDateTime', createTypedArrayGuard(isRSDZonedDateTime));
}
`.trim();

const SimpleRecord_Basic_List_Optional_Typeguard_Result = `
export function isSimpleRecord_Basic_List_Optional(value: unknown): value is SimpleRecord_Basic_List_Optional {
	return isRecord(value) &&
		checkOptProp(value, 'valueBoolean', createTypedArrayGuard(isRSDBoolean)) &&
		checkOptProp(value, 'valueShort', createTypedArrayGuard(isRSDShort)) &&
		checkOptProp(value, 'valueInt', createTypedArrayGuard(isRSDInt)) &&
		checkOptProp(value, 'valueLong', createTypedArrayGuard(isRSDLong)) &&
		checkOptProp(value, 'valueFloat', createTypedArrayGuard(isRSDFloat)) &&
		checkOptProp(value, 'valueDouble', createTypedArrayGuard(isRSDDouble)) &&
		checkOptProp(value, 'valueString', createTypedArrayGuard(isRSDString)) &&
		checkOptProp(value, 'valueLocalDate', createTypedArrayGuard(isRSDLocalDate)) &&
		checkOptProp(value, 'valueLocalDateTime', createTypedArrayGuard(isRSDLocalDateTime)) &&
		checkOptProp(value, 'valueLocalTime', createTypedArrayGuard(isRSDLocalTime)) &&
		checkOptProp(value, 'valueOffsetDateTime', createTypedArrayGuard(isRSDOffsetDateTime)) &&
		checkOptProp(value, 'valueZonedDateTime', createTypedArrayGuard(isRSDZonedDateTime));
}
`.trim();

const SimpleRecord_Basic_List_Null_Typeguard_Result = `
export function isSimpleRecord_Basic_List_Null(value: unknown): value is SimpleRecord_Basic_List_Null {
	return isRecord(value) &&
		(checkProp(value, 'valueBoolean', isNull) || checkProp(value, 'valueBoolean', createTypedArrayGuard(isRSDBoolean))) &&
		(checkProp(value, 'valueShort', isNull) || checkProp(value, 'valueShort', createTypedArrayGuard(isRSDShort))) &&
		(checkProp(value, 'valueInt', isNull) || checkProp(value, 'valueInt', createTypedArrayGuard(isRSDInt))) &&
		(checkProp(value, 'valueLong', isNull) || checkProp(value, 'valueLong', createTypedArrayGuard(isRSDLong))) &&
		(checkProp(value, 'valueFloat', isNull) || checkProp(value, 'valueFloat', createTypedArrayGuard(isRSDFloat))) &&
		(checkProp(value, 'valueDouble', isNull) || checkProp(value, 'valueDouble', createTypedArrayGuard(isRSDDouble))) &&
		(checkProp(value, 'valueString', isNull) || checkProp(value, 'valueString', createTypedArrayGuard(isRSDString))) &&
		(checkProp(value, 'valueLocalDate', isNull) || checkProp(value, 'valueLocalDate', createTypedArrayGuard(isRSDLocalDate))) &&
		(checkProp(value, 'valueLocalDateTime', isNull) || checkProp(value, 'valueLocalDateTime', createTypedArrayGuard(isRSDLocalDateTime))) &&
		(checkProp(value, 'valueLocalTime', isNull) || checkProp(value, 'valueLocalTime', createTypedArrayGuard(isRSDLocalTime))) &&
		(checkProp(value, 'valueOffsetDateTime', isNull) || checkProp(value, 'valueOffsetDateTime', createTypedArrayGuard(isRSDOffsetDateTime))) &&
		(checkProp(value, 'valueZonedDateTime', isNull) || checkProp(value, 'valueZonedDateTime', createTypedArrayGuard(isRSDZonedDateTime)));
}
`.trim();

const SimpleRecord_Basic_List_Optional_Null_Typeguard_Result = `
export function isSimpleRecord_Basic_List_Optional_Null(value: unknown): value is SimpleRecord_Basic_List_Optional_Null {
	return isRecord(value) &&
		(checkOptProp(value, 'valueBoolean', isNull) || checkOptProp(value, 'valueBoolean', createTypedArrayGuard(isRSDBoolean))) &&
		(checkOptProp(value, 'valueShort', isNull) || checkOptProp(value, 'valueShort', createTypedArrayGuard(isRSDShort))) &&
		(checkOptProp(value, 'valueInt', isNull) || checkOptProp(value, 'valueInt', createTypedArrayGuard(isRSDInt))) &&
		(checkOptProp(value, 'valueLong', isNull) || checkOptProp(value, 'valueLong', createTypedArrayGuard(isRSDLong))) &&
		(checkOptProp(value, 'valueFloat', isNull) || checkOptProp(value, 'valueFloat', createTypedArrayGuard(isRSDFloat))) &&
		(checkOptProp(value, 'valueDouble', isNull) || checkOptProp(value, 'valueDouble', createTypedArrayGuard(isRSDDouble))) &&
		(checkOptProp(value, 'valueString', isNull) || checkOptProp(value, 'valueString', createTypedArrayGuard(isRSDString))) &&
		(checkOptProp(value, 'valueLocalDate', isNull) || checkOptProp(value, 'valueLocalDate', createTypedArrayGuard(isRSDLocalDate))) &&
		(checkOptProp(value, 'valueLocalDateTime', isNull) || checkOptProp(value, 'valueLocalDateTime', createTypedArrayGuard(isRSDLocalDateTime))) &&
		(checkOptProp(value, 'valueLocalTime', isNull) || checkOptProp(value, 'valueLocalTime', createTypedArrayGuard(isRSDLocalTime))) &&
		(checkOptProp(value, 'valueOffsetDateTime', isNull) || checkOptProp(value, 'valueOffsetDateTime', createTypedArrayGuard(isRSDOffsetDateTime))) &&
		(checkOptProp(value, 'valueZonedDateTime', isNull) || checkOptProp(value, 'valueZonedDateTime', createTypedArrayGuard(isRSDZonedDateTime)));
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
		checkProp(value, 'value', isZoneId) &&
		(checkProp(value, 'value_Null', isNull) || checkProp(value, 'value_Null', isZoneId)) &&
		checkOptProp(value, 'value_Opt', isZoneId) &&
		(checkOptProp(value, 'value_Opt_Null', isNull) || checkOptProp(value, 'value_Opt_Null', isZoneId)) &&
		checkProp(value, 'list', createTypedArrayGuard(isZoneId)) &&
		(checkProp(value, 'list_Null', isNull) || checkProp(value, 'list_Null', createTypedArrayGuard(isZoneId))) &&
		checkOptProp(value, 'list_Opt', createTypedArrayGuard(isZoneId)) &&
		(checkOptProp(value, 'list_Opt_Null', isNull) || checkOptProp(value, 'list_Opt_Null', createTypedArrayGuard(isZoneId)));
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
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	const value = propMappedValue('value', $value, isString, RSDStringFromJSON);
	return {
		key,
		version,
		value,
	};
}
`.trim();

const From_Json_SimpleRecord_KeyVersion = `
export function SimpleRecord_KeyVersionFromJSON($value: Record<string, unknown>): SimpleRecord_KeyVersion {
	const key = propMappedValue('key', $value, isString, RSDStringFromJSON);
	const version = propMappedValue('version', $value, isString, RSDStringFromJSON);
	return {
		key,
		version,
	};
}
`.trim();

const From_Json_SimpleRecord_KeyVersion_Int_Int = `
export function SimpleRecord_KeyVersion_Int_IntFromJSON($value: Record<string, unknown>): SimpleRecord_KeyVersion_Int_Int {
	const key = propMappedValue('key', $value, isNumber, RSDIntFromJSON);
	const version = propMappedValue('version', $value, isNumber, RSDIntFromJSON);
	return {
		key,
		version,
	};
}
`.trim();

const From_Json_SimpleRecord_Basic = `
export function SimpleRecord_BasicFromJSON($value: Record<string, unknown>): SimpleRecord_Basic {
	const valueBoolean = propMappedValue('valueBoolean', $value, isBoolean, RSDBooleanFromJSON);
	const valueShort = propMappedValue('valueShort', $value, isNumber, RSDShortFromJSON);
	const valueInt = propMappedValue('valueInt', $value, isNumber, RSDIntFromJSON);
	const valueLong = propMappedValue('valueLong', $value, isNumeric, RSDLongFromJSON);
	const valueFloat = propMappedValue('valueFloat', $value, isNumber, RSDFloatFromJSON);
	const valueDouble = propMappedValue('valueDouble', $value, isNumber, RSDDoubleFromJSON);
	const valueString = propMappedValue('valueString', $value, isString, RSDStringFromJSON);
	const valueLocalDate = propMappedValue('valueLocalDate', $value, isString, RSDLocalDateFromJSON);
	const valueLocalDateTime = propMappedValue('valueLocalDateTime', $value, isString, RSDLocalDateTimeFromJSON);
	const valueLocalTime = propMappedValue('valueLocalTime', $value, isString, RSDLocalTimeFromJSON);
	const valueOffsetDateTime = propMappedValue('valueOffsetDateTime', $value, isString, RSDOffsetDateTimeFromJSON);
	const valueZonedDateTime = propMappedValue('valueZonedDateTime', $value, isString, RSDZonedDateTimeFromJSON);
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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}`.trim();

const From_Json_SimpleRecord_Basic_Optional = `
export function SimpleRecord_Basic_OptionalFromJSON($value: Record<string, unknown>): SimpleRecord_Basic_Optional {
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

const From_Json_SimpleRecord_Basic_Null = `
export function SimpleRecord_Basic_NullFromJSON($value: Record<string, unknown>): SimpleRecord_Basic_Null {
	const valueBoolean = propMappedValue('valueBoolean', $value, isBoolean, RSDBooleanFromJSON, 'null');
	const valueShort = propMappedValue('valueShort', $value, isNumber, RSDShortFromJSON, 'null');
	const valueInt = propMappedValue('valueInt', $value, isNumber, RSDIntFromJSON, 'null');
	const valueLong = propMappedValue('valueLong', $value, isNumeric, RSDLongFromJSON, 'null');
	const valueFloat = propMappedValue('valueFloat', $value, isNumber, RSDFloatFromJSON, 'null');
	const valueDouble = propMappedValue('valueDouble', $value, isNumber, RSDDoubleFromJSON, 'null');
	const valueString = propMappedValue('valueString', $value, isString, RSDStringFromJSON, 'null');
	const valueLocalDate = propMappedValue('valueLocalDate', $value, isString, RSDLocalDateFromJSON, 'null');
	const valueLocalDateTime = propMappedValue('valueLocalDateTime', $value, isString, RSDLocalDateTimeFromJSON, 'null');
	const valueLocalTime = propMappedValue('valueLocalTime', $value, isString, RSDLocalTimeFromJSON, 'null');
	const valueOffsetDateTime = propMappedValue('valueOffsetDateTime', $value, isString, RSDOffsetDateTimeFromJSON, 'null');
	const valueZonedDateTime = propMappedValue('valueZonedDateTime', $value, isString, RSDZonedDateTimeFromJSON, 'null');
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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}`.trim();

const From_Json_SimpleRecord_Basic_Optional_Null = `
export function SimpleRecord_Basic_Optional_NullFromJSON($value: Record<string, unknown>): SimpleRecord_Basic_Optional_Null {
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

const From_Json_SimpleRecord_Basic_List = `
export function SimpleRecord_Basic_ListFromJSON($value: Record<string, unknown>): SimpleRecord_Basic_List {
	const valueBoolean = propMappedListValue('valueBoolean', $value, isBoolean, RSDBooleanFromJSON);
	const valueShort = propMappedListValue('valueShort', $value, isNumber, RSDShortFromJSON);
	const valueInt = propMappedListValue('valueInt', $value, isNumber, RSDIntFromJSON);
	const valueLong = propMappedListValue('valueLong', $value, isNumeric, RSDLongFromJSON);
	const valueFloat = propMappedListValue('valueFloat', $value, isNumber, RSDFloatFromJSON);
	const valueDouble = propMappedListValue('valueDouble', $value, isNumber, RSDDoubleFromJSON);
	const valueString = propMappedListValue('valueString', $value, isString, RSDStringFromJSON);
	const valueLocalDate = propMappedListValue('valueLocalDate', $value, isString, RSDLocalDateFromJSON);
	const valueLocalDateTime = propMappedListValue('valueLocalDateTime', $value, isString, RSDLocalDateTimeFromJSON);
	const valueLocalTime = propMappedListValue('valueLocalTime', $value, isString, RSDLocalTimeFromJSON);
	const valueOffsetDateTime = propMappedListValue('valueOffsetDateTime', $value, isString, RSDOffsetDateTimeFromJSON);
	const valueZonedDateTime = propMappedListValue('valueZonedDateTime', $value, isString, RSDZonedDateTimeFromJSON);
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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const From_Json_SimpleRecord_Basic_List_Optional = `
export function SimpleRecord_Basic_List_OptionalFromJSON($value: Record<string, unknown>): SimpleRecord_Basic_List_Optional {
	const valueBoolean = propMappedListValue('valueBoolean', $value, isBoolean, RSDBooleanFromJSON, 'optional');
	const valueShort = propMappedListValue('valueShort', $value, isNumber, RSDShortFromJSON, 'optional');
	const valueInt = propMappedListValue('valueInt', $value, isNumber, RSDIntFromJSON, 'optional');
	const valueLong = propMappedListValue('valueLong', $value, isNumeric, RSDLongFromJSON, 'optional');
	const valueFloat = propMappedListValue('valueFloat', $value, isNumber, RSDFloatFromJSON, 'optional');
	const valueDouble = propMappedListValue('valueDouble', $value, isNumber, RSDDoubleFromJSON, 'optional');
	const valueString = propMappedListValue('valueString', $value, isString, RSDStringFromJSON, 'optional');
	const valueLocalDate = propMappedListValue('valueLocalDate', $value, isString, RSDLocalDateFromJSON, 'optional');
	const valueLocalDateTime = propMappedListValue('valueLocalDateTime', $value, isString, RSDLocalDateTimeFromJSON, 'optional');
	const valueLocalTime = propMappedListValue('valueLocalTime', $value, isString, RSDLocalTimeFromJSON, 'optional');
	const valueOffsetDateTime = propMappedListValue('valueOffsetDateTime', $value, isString, RSDOffsetDateTimeFromJSON, 'optional');
	const valueZonedDateTime = propMappedListValue('valueZonedDateTime', $value, isString, RSDZonedDateTimeFromJSON, 'optional');
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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const From_Json_SimpleRecord_Basic_List_Null = `
export function SimpleRecord_Basic_List_NullFromJSON($value: Record<string, unknown>): SimpleRecord_Basic_List_Null {
	const valueBoolean = propMappedListValue('valueBoolean', $value, isBoolean, RSDBooleanFromJSON, 'null');
	const valueShort = propMappedListValue('valueShort', $value, isNumber, RSDShortFromJSON, 'null');
	const valueInt = propMappedListValue('valueInt', $value, isNumber, RSDIntFromJSON, 'null');
	const valueLong = propMappedListValue('valueLong', $value, isNumeric, RSDLongFromJSON, 'null');
	const valueFloat = propMappedListValue('valueFloat', $value, isNumber, RSDFloatFromJSON, 'null');
	const valueDouble = propMappedListValue('valueDouble', $value, isNumber, RSDDoubleFromJSON, 'null');
	const valueString = propMappedListValue('valueString', $value, isString, RSDStringFromJSON, 'null');
	const valueLocalDate = propMappedListValue('valueLocalDate', $value, isString, RSDLocalDateFromJSON, 'null');
	const valueLocalDateTime = propMappedListValue('valueLocalDateTime', $value, isString, RSDLocalDateTimeFromJSON, 'null');
	const valueLocalTime = propMappedListValue('valueLocalTime', $value, isString, RSDLocalTimeFromJSON, 'null');
	const valueOffsetDateTime = propMappedListValue('valueOffsetDateTime', $value, isString, RSDOffsetDateTimeFromJSON, 'null');
	const valueZonedDateTime = propMappedListValue('valueZonedDateTime', $value, isString, RSDZonedDateTimeFromJSON, 'null');
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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const From_Json_SimpleRecord_Basic_List_Optional_Null = `
export function SimpleRecord_Basic_List_Optional_NullFromJSON($value: Record<string, unknown>): SimpleRecord_Basic_List_Optional_Null {
	const valueBoolean = propMappedListValue('valueBoolean', $value, isBoolean, RSDBooleanFromJSON, 'optional_null');
	const valueShort = propMappedListValue('valueShort', $value, isNumber, RSDShortFromJSON, 'optional_null');
	const valueInt = propMappedListValue('valueInt', $value, isNumber, RSDIntFromJSON, 'optional_null');
	const valueLong = propMappedListValue('valueLong', $value, isNumeric, RSDLongFromJSON, 'optional_null');
	const valueFloat = propMappedListValue('valueFloat', $value, isNumber, RSDFloatFromJSON, 'optional_null');
	const valueDouble = propMappedListValue('valueDouble', $value, isNumber, RSDDoubleFromJSON, 'optional_null');
	const valueString = propMappedListValue('valueString', $value, isString, RSDStringFromJSON, 'optional_null');
	const valueLocalDate = propMappedListValue('valueLocalDate', $value, isString, RSDLocalDateFromJSON, 'optional_null');
	const valueLocalDateTime = propMappedListValue('valueLocalDateTime', $value, isString, RSDLocalDateTimeFromJSON, 'optional_null');
	const valueLocalTime = propMappedListValue('valueLocalTime', $value, isString, RSDLocalTimeFromJSON, 'optional_null');
	const valueOffsetDateTime = propMappedListValue('valueOffsetDateTime', $value, isString, RSDOffsetDateTimeFromJSON, 'optional_null');
	const valueZonedDateTime = propMappedListValue('valueZonedDateTime', $value, isString, RSDZonedDateTimeFromJSON, 'optional_null');
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
		valueLocalTime,
		valueOffsetDateTime,
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
	const value = propMappedValue('value', $value, isString, ZoneIdFromJSON);
	const value_Null = propMappedValue('value_Null', $value, isString, ZoneIdFromJSON, 'null');
	const value_Opt = propMappedValue('value_Opt', $value, isString, ZoneIdFromJSON, 'optional');
	const value_Opt_Null = propMappedValue('value_Opt_Null', $value, isString, ZoneIdFromJSON, 'optional_null');
	const list = propMappedListValue('list', $value, isString, ZoneIdFromJSON);
	const list_Null = propMappedListValue('list_Null', $value, isString, ZoneIdFromJSON, 'null');
	const list_Opt = propMappedListValue('list_Opt', $value, isString, ZoneIdFromJSON, 'optional');
	const list_Opt_Null = propMappedListValue('list_Opt_Null', $value, isString, ZoneIdFromJSON, 'optional_null');
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
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);

	return {
		key,
		version,
	};
}
`.trim();

const ToJson_SimpleRecord_KeyVersion_Int_Int = `
export function SimpleRecord_KeyVersion_Int_IntToJSON($value: SimpleRecord_KeyVersion_Int_Int): Record<string, unknown> {
	const key = RSDIntToJSON($value.key);
	const version = RSDIntToJSON($value.version);

	return {
		key,
		version,
	};
}
`.trim();

const ToJson_SimpleRecord = `
export function SimpleRecordToJSON($value: SimpleRecord): Record<string, unknown> {
	const key = RSDStringToJSON($value.key);
	const version = RSDStringToJSON($value.version);
	const value = RSDStringToJSON($value.value);

	return {
		key,
		version,
		value,
	};
}
`.trim();

const ToJson_SimpleRecord_Basic = `
export function SimpleRecord_BasicToJSON($value: SimpleRecord_Basic): Record<string, unknown> {
	const valueBoolean = RSDBooleanToJSON($value.valueBoolean);
	const valueShort = RSDShortToJSON($value.valueShort);
	const valueInt = RSDIntToJSON($value.valueInt);
	const valueLong = RSDLongToJSON($value.valueLong);
	const valueFloat = RSDFloatToJSON($value.valueFloat);
	const valueDouble = RSDDoubleToJSON($value.valueDouble);
	const valueString = RSDStringToJSON($value.valueString);
	const valueLocalDate = RSDLocalDateToJSON($value.valueLocalDate);
	const valueLocalDateTime = RSDLocalDateTimeToJSON($value.valueLocalDateTime);
	const valueLocalTime = RSDLocalTimeToJSON($value.valueLocalTime);
	const valueOffsetDateTime = RSDOffsetDateTimeToJSON($value.valueOffsetDateTime);
	const valueZonedDateTime = RSDZonedDateTimeToJSON($value.valueZonedDateTime);

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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const ToJson_SimpleRecord_Basic_Optional = `
export function SimpleRecord_Basic_OptionalToJSON($value: SimpleRecord_Basic_Optional): Record<string, unknown> {
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

const ToJson_SimpleRecord_Basic_Null = `
export function SimpleRecord_Basic_NullToJSON($value: SimpleRecord_Basic_Null): Record<string, unknown> {
	const valueBoolean = isNull($value.valueBoolean) ? null : RSDBooleanToJSON($value.valueBoolean);
	const valueShort = isNull($value.valueShort) ? null : RSDShortToJSON($value.valueShort);
	const valueInt = isNull($value.valueInt) ? null : RSDIntToJSON($value.valueInt);
	const valueLong = isNull($value.valueLong) ? null : RSDLongToJSON($value.valueLong);
	const valueFloat = isNull($value.valueFloat) ? null : RSDFloatToJSON($value.valueFloat);
	const valueDouble = isNull($value.valueDouble) ? null : RSDDoubleToJSON($value.valueDouble);
	const valueString = isNull($value.valueString) ? null : RSDStringToJSON($value.valueString);
	const valueLocalDate = isNull($value.valueLocalDate) ? null : RSDLocalDateToJSON($value.valueLocalDate);
	const valueLocalDateTime = isNull($value.valueLocalDateTime) ? null : RSDLocalDateTimeToJSON($value.valueLocalDateTime);
	const valueLocalTime = isNull($value.valueLocalTime) ? null : RSDLocalTimeToJSON($value.valueLocalTime);
	const valueOffsetDateTime = isNull($value.valueOffsetDateTime) ? null : RSDOffsetDateTimeToJSON($value.valueOffsetDateTime);
	const valueZonedDateTime = isNull($value.valueZonedDateTime) ? null : RSDZonedDateTimeToJSON($value.valueZonedDateTime);

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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const ToJson_SimpleRecord_Basic_Optional_Null = `
export function SimpleRecord_Basic_Optional_NullToJSON($value: SimpleRecord_Basic_Optional_Null): Record<string, unknown> {
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

const ToJson_SimpleRecord_Basic_List = `
export function SimpleRecord_Basic_ListToJSON($value: SimpleRecord_Basic_List): Record<string, unknown> {
	const valueBoolean = $value.valueBoolean.map(RSDBooleanToJSON);
	const valueShort = $value.valueShort.map(RSDShortToJSON);
	const valueInt = $value.valueInt.map(RSDIntToJSON);
	const valueLong = $value.valueLong.map(RSDLongToJSON);
	const valueFloat = $value.valueFloat.map(RSDFloatToJSON);
	const valueDouble = $value.valueDouble.map(RSDDoubleToJSON);
	const valueString = $value.valueString.map(RSDStringToJSON);
	const valueLocalDate = $value.valueLocalDate.map(RSDLocalDateToJSON);
	const valueLocalDateTime = $value.valueLocalDateTime.map(RSDLocalDateTimeToJSON);
	const valueLocalTime = $value.valueLocalTime.map(RSDLocalTimeToJSON);
	const valueOffsetDateTime = $value.valueOffsetDateTime.map(RSDOffsetDateTimeToJSON);
	const valueZonedDateTime = $value.valueZonedDateTime.map(RSDZonedDateTimeToJSON);

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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const ToJson_SimpleRecord_Basic_List_Optional = `
export function SimpleRecord_Basic_List_OptionalToJSON($value: SimpleRecord_Basic_List_Optional): Record<string, unknown> {
	const valueBoolean = isUndefined($value.valueBoolean) ? undefined : $value.valueBoolean.map(RSDBooleanToJSON);
	const valueShort = isUndefined($value.valueShort) ? undefined : $value.valueShort.map(RSDShortToJSON);
	const valueInt = isUndefined($value.valueInt) ? undefined : $value.valueInt.map(RSDIntToJSON);
	const valueLong = isUndefined($value.valueLong) ? undefined : $value.valueLong.map(RSDLongToJSON);
	const valueFloat = isUndefined($value.valueFloat) ? undefined : $value.valueFloat.map(RSDFloatToJSON);
	const valueDouble = isUndefined($value.valueDouble) ? undefined : $value.valueDouble.map(RSDDoubleToJSON);
	const valueString = isUndefined($value.valueString) ? undefined : $value.valueString.map(RSDStringToJSON);
	const valueLocalDate = isUndefined($value.valueLocalDate) ? undefined : $value.valueLocalDate.map(RSDLocalDateToJSON);
	const valueLocalDateTime = isUndefined($value.valueLocalDateTime) ? undefined : $value.valueLocalDateTime.map(RSDLocalDateTimeToJSON);
	const valueLocalTime = isUndefined($value.valueLocalTime) ? undefined : $value.valueLocalTime.map(RSDLocalTimeToJSON);
	const valueOffsetDateTime = isUndefined($value.valueOffsetDateTime) ? undefined : $value.valueOffsetDateTime.map(RSDOffsetDateTimeToJSON);
	const valueZonedDateTime = isUndefined($value.valueZonedDateTime) ? undefined : $value.valueZonedDateTime.map(RSDZonedDateTimeToJSON);

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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const ToJson_SimpleRecord_Basic_List_Null = `
export function SimpleRecord_Basic_List_NullToJSON($value: SimpleRecord_Basic_List_Null): Record<string, unknown> {
	const valueBoolean = isNull($value.valueBoolean) ? null : $value.valueBoolean.map(RSDBooleanToJSON);
	const valueShort = isNull($value.valueShort) ? null : $value.valueShort.map(RSDShortToJSON);
	const valueInt = isNull($value.valueInt) ? null : $value.valueInt.map(RSDIntToJSON);
	const valueLong = isNull($value.valueLong) ? null : $value.valueLong.map(RSDLongToJSON);
	const valueFloat = isNull($value.valueFloat) ? null : $value.valueFloat.map(RSDFloatToJSON);
	const valueDouble = isNull($value.valueDouble) ? null : $value.valueDouble.map(RSDDoubleToJSON);
	const valueString = isNull($value.valueString) ? null : $value.valueString.map(RSDStringToJSON);
	const valueLocalDate = isNull($value.valueLocalDate) ? null : $value.valueLocalDate.map(RSDLocalDateToJSON);
	const valueLocalDateTime = isNull($value.valueLocalDateTime) ? null : $value.valueLocalDateTime.map(RSDLocalDateTimeToJSON);
	const valueLocalTime = isNull($value.valueLocalTime) ? null : $value.valueLocalTime.map(RSDLocalTimeToJSON);
	const valueOffsetDateTime = isNull($value.valueOffsetDateTime) ? null : $value.valueOffsetDateTime.map(RSDOffsetDateTimeToJSON);
	const valueZonedDateTime = isNull($value.valueZonedDateTime) ? null : $value.valueZonedDateTime.map(RSDZonedDateTimeToJSON);

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
		valueLocalTime,
		valueOffsetDateTime,
		valueZonedDateTime,
	};
}
`.trim();

const ToJson_SimpleRecord_Basic_List_Optional_Null = `
export function SimpleRecord_Basic_List_Optional_NullToJSON($value: SimpleRecord_Basic_List_Optional_Null): Record<string, unknown> {
	const valueBoolean = isUndefined($value.valueBoolean) || isNull($value.valueBoolean) ? $value.valueBoolean : $value.valueBoolean.map(RSDBooleanToJSON);
	const valueShort = isUndefined($value.valueShort) || isNull($value.valueShort) ? $value.valueShort : $value.valueShort.map(RSDShortToJSON);
	const valueInt = isUndefined($value.valueInt) || isNull($value.valueInt) ? $value.valueInt : $value.valueInt.map(RSDIntToJSON);
	const valueLong = isUndefined($value.valueLong) || isNull($value.valueLong) ? $value.valueLong : $value.valueLong.map(RSDLongToJSON);
	const valueFloat = isUndefined($value.valueFloat) || isNull($value.valueFloat) ? $value.valueFloat : $value.valueFloat.map(RSDFloatToJSON);
	const valueDouble = isUndefined($value.valueDouble) || isNull($value.valueDouble) ? $value.valueDouble : $value.valueDouble.map(RSDDoubleToJSON);
	const valueString = isUndefined($value.valueString) || isNull($value.valueString) ? $value.valueString : $value.valueString.map(RSDStringToJSON);
	const valueLocalDate = isUndefined($value.valueLocalDate) || isNull($value.valueLocalDate) ? $value.valueLocalDate : $value.valueLocalDate.map(RSDLocalDateToJSON);
	const valueLocalDateTime = isUndefined($value.valueLocalDateTime) || isNull($value.valueLocalDateTime) ? $value.valueLocalDateTime : $value.valueLocalDateTime.map(RSDLocalDateTimeToJSON);
	const valueLocalTime = isUndefined($value.valueLocalTime) || isNull($value.valueLocalTime) ? $value.valueLocalTime : $value.valueLocalTime.map(RSDLocalTimeToJSON);
	const valueOffsetDateTime = isUndefined($value.valueOffsetDateTime) || isNull($value.valueOffsetDateTime) ? $value.valueOffsetDateTime : $value.valueOffsetDateTime.map(RSDOffsetDateTimeToJSON);
	const valueZonedDateTime = isUndefined($value.valueZonedDateTime) || isNull($value.valueZonedDateTime) ? $value.valueZonedDateTime : $value.valueZonedDateTime.map(RSDZonedDateTimeToJSON);

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
		valueLocalTime,
		valueOffsetDateTime,
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
		name: 'SimpleRecord_Basic',
		result: ToJson_SimpleRecord_Basic,
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
