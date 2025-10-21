import { describe, expect, test } from 'vitest';
import {
	isRecordOfRecords,
	RecordOfRecords,
	RecordOfRecordsFromJSON,
	RecordOfRecordsToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/RecordOfRecords.js';
import { SimpleRecord_Basic } from '../../test-specs/gen-out/client/typescript-client/src/model/SimpleRecord_Basic.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const SimpleRecord_Basic: SimpleRecord_Basic = {
	valueBoolean: true,
	valueDouble: 0.5,
	valueFloat: 0.5,
	valueInt: 1,
	valueLocalDate: '2020-01-01',
	valueLocalDateTime: '2020-01-01T00:00:00',
	valueLong: 1,
	valueShort: 1,
	valueString: 'Value',
	valueZonedDateTime: '2020-01-01T00:00:00Z',
};

const Simple: RecordOfRecords = {
	value: SimpleRecord_Basic,
	value_Null: SimpleRecord_Basic,
	value_Opt: SimpleRecord_Basic,
	value_Opt_Null: SimpleRecord_Basic,
	list: [SimpleRecord_Basic],
	list_Null: [SimpleRecord_Basic],
	list_Opt: [SimpleRecord_Basic],
	list_Opt_Null: [SimpleRecord_Basic],
};

const SimpleMinimal: RecordOfRecords = {
	value: SimpleRecord_Basic,
	value_Null: SimpleRecord_Basic,
	value_Opt: undefined,
	value_Opt_Null: undefined,
	list: [SimpleRecord_Basic],
	list_Null: [SimpleRecord_Basic],
	list_Opt: undefined,
	list_Opt_Null: undefined,
};

const SimpleNull: RecordOfRecords = {
	value: SimpleRecord_Basic,
	value_Null: null,
	value_Opt: undefined,
	value_Opt_Null: undefined,
	list: [SimpleRecord_Basic],
	list_Null: null,
	list_Opt: undefined,
	list_Opt_Null: undefined,
};

describe('RecordOfRecordsFromJSON', () => {
	test('simple', () => {
		expect(RecordOfRecordsFromJSON(Simple)).toStrictEqual(Simple);
		expect(RecordOfRecordsFromJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(RecordOfRecordsFromJSON(SimpleNull)).toStrictEqual(SimpleNull);
	});
	test('remove-unknown', () => {
		expect(RecordOfRecordsFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => RecordOfRecordsFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => RecordOfRecordsFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => RecordOfRecordsFromJSON(invalidateProperty(SimpleMinimal, data))).toThrow();
		expect(() => RecordOfRecordsFromJSON(invalidateProperty(SimpleNull, data))).toThrow();
	});
	test.each(Object.keys(Simple).filter(p => p.includes('list')))('invalid prop $0', data => {
		expect(() => RecordOfRecordsFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});
describe('isRecordOfRecords', () => {
	test('simple', () => {
		expect(isRecordOfRecords(Simple)).toBeTruthy();
		expect(isRecordOfRecords(SimpleMinimal)).toBeTruthy();
		expect(isRecordOfRecords(SimpleNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isRecordOfRecords(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isRecordOfRecords(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isRecordOfRecords(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isRecordOfRecords(invalidateProperty(SimpleMinimal, data))).toBeFalsy();
		expect(isRecordOfRecords(invalidateProperty(SimpleNull, data))).toBeFalsy();
	});
});
describe('RecordOfRecordsToJSON', () => {
	test('simple', () => {
		expect(RecordOfRecordsToJSON(Simple)).toStrictEqual(Simple);
		expect(RecordOfRecordsToJSON(Simple)).not.toBe(Simple);
		expect(RecordOfRecordsToJSON(Simple).value).toStrictEqual(Simple.value);
		expect(RecordOfRecordsToJSON(Simple).value).not.toBe(Simple.value);
		expect(RecordOfRecordsToJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(RecordOfRecordsToJSON(SimpleNull)).toStrictEqual(SimpleNull);
	});
	test('additional props', () => {
		expect(RecordOfRecordsToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});
