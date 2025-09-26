import { describe, expect, test } from 'vitest';
import {
	isSimpleRecord_Basic_List_Optional_Null,
	SimpleRecord_Basic_List_Optional_Null,
	SimpleRecord_Basic_List_Optional_NullFromJSON,
	SimpleRecord_Basic_List_Optional_NullToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/SimpleRecord_Basic_List_Optional_Null.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: SimpleRecord_Basic_List_Optional_Null = {
	valueBoolean: [true, false],
	valueShort: [0, 1],
	valueDouble: [1.5, 2.5],
	valueFloat: [1.5, 2.5],
	valueInt: [0, 1],
	valueLocalDate: ['2020-01-01', '2020-02-01'],
	valueLocalDateTime: ['2020-01-01T10:00:00', '2020-02-01T10:00:00'],
	valueLong: [0, 1],
	valueString: ['a', 'b'],
	valueZonedDateTime: ['2025-01-01T10:00:00Z', '2025-02-01T10:00:00Z'],
};

const SimpleNull: SimpleRecord_Basic_List_Optional_Null = {
	valueBoolean: null,
	valueDouble: null,
	valueFloat: null,
	valueInt: null,
	valueLocalDate: null,
	valueLocalDateTime: null,
	valueLong: null,
	valueShort: null,
	valueString: null,
	valueZonedDateTime: null,
};

const SimpleEmpty: SimpleRecord_Basic_List_Optional_Null = {
	valueBoolean: undefined,
	valueDouble: undefined,
	valueFloat: undefined,
	valueInt: undefined,
	valueLocalDate: undefined,
	valueLocalDateTime: undefined,
	valueLong: undefined,
	valueShort: undefined,
	valueString: undefined,
	valueZonedDateTime: undefined,
};

describe('SimpleRecord_Basic_List_Optional_NullFromJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_Basic_List_Optional_NullFromJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecord_Basic_List_Optional_NullFromJSON(Simple)).not.toBe(Simple);

		expect(SimpleRecord_Basic_List_Optional_NullFromJSON(SimpleNull)).toStrictEqual(SimpleNull);
		expect(SimpleRecord_Basic_List_Optional_NullFromJSON(SimpleNull)).not.toBe(SimpleNull);

		expect(SimpleRecord_Basic_List_Optional_NullFromJSON({})).toStrictEqual(SimpleEmpty);
	});
	test('remove-unknown', () => {
		expect(SimpleRecord_Basic_List_Optional_NullFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test('empty object', () => {
		expect(SimpleRecord_Basic_List_Optional_NullFromJSON({})).toStrictEqual(SimpleEmpty);
	});
	test.each(Object.keys(Simple))('missing prop $0', data => {
		const { withOut, withUndefined } = removeProperty(Simple, data);
		expect(SimpleRecord_Basic_List_Optional_NullFromJSON(withOut)).toStrictEqual(withUndefined);
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => SimpleRecord_Basic_List_Optional_NullFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => SimpleRecord_Basic_List_Optional_NullFromJSON(invalidateProperty(SimpleEmpty, data))).toThrow();
		expect(() => SimpleRecord_Basic_List_Optional_NullFromJSON(invalidateProperty({}, data))).toThrow();

		expect(() => SimpleRecord_Basic_List_Optional_NullFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});
describe('isSimpleRecord_Basic_List_Optional_Null', () => {
	test('simple', () => {
		expect(isSimpleRecord_Basic_List_Optional_Null(Simple)).toBeTruthy();
		expect(isSimpleRecord_Basic_List_Optional_Null(SimpleEmpty)).toBeTruthy();
		expect(isSimpleRecord_Basic_List_Optional_Null(SimpleNull)).toBeTruthy();
		expect(isSimpleRecord_Basic_List_Optional_Null({})).toBeTruthy();
	});
	test('additional props', () => {
		expect(isSimpleRecord_Basic_List_Optional_Null(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isSimpleRecord_Basic_List_Optional_Null(withOut)).toBeTruthy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isSimpleRecord_Basic_List_Optional_Null(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isSimpleRecord_Basic_List_Optional_Null(invalidateProperty(SimpleEmpty, data))).toBeFalsy();
		expect(isSimpleRecord_Basic_List_Optional_Null(invalidateProperty({}, data))).toBeFalsy();

		expect(isSimpleRecord_Basic_List_Optional_Null(invalidateArrayProperty(Simple, data))).toBeFalsy();
	});
});
describe('SimpleRecord_Basic_List_Optional_NullToJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_Basic_List_Optional_NullToJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecord_Basic_List_Optional_NullToJSON(Simple)).not.toBe(Simple);

		expect(SimpleRecord_Basic_List_Optional_NullToJSON(SimpleEmpty)).toStrictEqual(SimpleEmpty);
		expect(SimpleRecord_Basic_List_Optional_NullToJSON(SimpleEmpty)).not.toBe(SimpleEmpty);

		expect(SimpleRecord_Basic_List_Optional_NullToJSON({})).toStrictEqual(SimpleEmpty);
		expect(SimpleRecord_Basic_List_Optional_NullToJSON({})).not.toBe(SimpleEmpty);
	});
	test('additional props', () => {
		expect(SimpleRecord_Basic_List_Optional_NullToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});
