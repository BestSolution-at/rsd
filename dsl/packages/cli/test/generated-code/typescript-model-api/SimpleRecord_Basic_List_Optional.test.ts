import { describe, expect, test } from 'vitest';
import {
	isSimpleRecord_Basic_List_Optional,
	SimpleRecord_Basic_List_Optional,
	SimpleRecord_Basic_List_OptionalFromJSON,
	SimpleRecord_Basic_List_OptionalToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/SimpleRecord_Basic_List_Optional.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: SimpleRecord_Basic_List_Optional = {
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

const SimpleEmpty: SimpleRecord_Basic_List_Optional = {
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

describe('SimpleRecord_Basic_List_OptionalFromJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_Basic_List_OptionalFromJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecord_Basic_List_OptionalFromJSON(Simple)).not.toBe(Simple);

		expect(SimpleRecord_Basic_List_OptionalFromJSON(SimpleEmpty)).toStrictEqual(SimpleEmpty);
		expect(SimpleRecord_Basic_List_OptionalFromJSON({})).toStrictEqual(SimpleEmpty);
		expect(SimpleRecord_Basic_List_OptionalFromJSON(SimpleEmpty)).not.toBe(SimpleEmpty);
	});
	test('remove-unknown', () => {
		expect(SimpleRecord_Basic_List_OptionalFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test('empty object', () => {
		expect(SimpleRecord_Basic_List_OptionalFromJSON({})).toStrictEqual(SimpleEmpty);
	});
	test.each(Object.keys(Simple))('missing prop $0', data => {
		const { withOut, withUndefined } = removeProperty(Simple, data);
		expect(SimpleRecord_Basic_List_OptionalFromJSON(withOut)).toStrictEqual(withUndefined);
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => SimpleRecord_Basic_List_OptionalFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => SimpleRecord_Basic_List_OptionalFromJSON(invalidateProperty(SimpleEmpty, data))).toThrow();
		expect(() => SimpleRecord_Basic_List_OptionalFromJSON(invalidateProperty({}, data))).toThrow();

		expect(() => SimpleRecord_Basic_List_OptionalFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});
describe('isSimpleRecord_Basic_List_Optional', () => {
	test('simple', () => {
		expect(isSimpleRecord_Basic_List_Optional(Simple)).toBeTruthy();
		expect(isSimpleRecord_Basic_List_Optional(SimpleEmpty)).toBeTruthy();
		expect(isSimpleRecord_Basic_List_Optional({})).toBeTruthy();
	});
	test('additional props', () => {
		expect(isSimpleRecord_Basic_List_Optional(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isSimpleRecord_Basic_List_Optional(withOut)).toBeTruthy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isSimpleRecord_Basic_List_Optional(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isSimpleRecord_Basic_List_Optional(invalidateProperty(SimpleEmpty, data))).toBeFalsy();
		expect(isSimpleRecord_Basic_List_Optional(invalidateProperty({}, data))).toBeFalsy();

		expect(isSimpleRecord_Basic_List_Optional(invalidateArrayProperty(Simple, data))).toBeFalsy();
	});
});
describe('SimpleRecord_Basic_List_OptionalToJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_Basic_List_OptionalToJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecord_Basic_List_OptionalToJSON(Simple)).not.toBe(Simple);

		expect(SimpleRecord_Basic_List_OptionalToJSON(SimpleEmpty)).toStrictEqual(SimpleEmpty);
		expect(SimpleRecord_Basic_List_OptionalToJSON(SimpleEmpty)).not.toBe(SimpleEmpty);

		expect(SimpleRecord_Basic_List_OptionalToJSON({})).toStrictEqual(SimpleEmpty);
		expect(SimpleRecord_Basic_List_OptionalToJSON({})).not.toBe(SimpleEmpty);
	});
	test('additional props', () => {
		expect(SimpleRecord_Basic_List_OptionalToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});
