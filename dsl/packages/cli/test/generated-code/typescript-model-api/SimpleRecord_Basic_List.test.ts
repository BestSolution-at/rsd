import { describe, expect, test } from 'vitest';
import {
	isSimpleRecord_Basic_List,
	SimpleRecord_Basic_List,
	SimpleRecord_Basic_ListFromJSON,
	SimpleRecord_Basic_ListToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/SimpleRecord_Basic_List.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: SimpleRecord_Basic_List = {
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

describe('SimpleRecord_Basic_ListFromJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_Basic_ListFromJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecord_Basic_ListFromJSON(Simple)).not.toBe(Simple);
	});
	test('remove-unknown', () => {
		expect(SimpleRecord_Basic_ListFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test('empty object', () => {
		expect(() => SimpleRecord_Basic_ListFromJSON({})).toThrow();
	});
	test.each(Object.keys(Simple))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => SimpleRecord_Basic_ListFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => SimpleRecord_Basic_ListFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => SimpleRecord_Basic_ListFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});
describe('isSimpleRecord_Basic_List', () => {
	test('simple', () => {
		expect(isSimpleRecord_Basic_List(Simple)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isSimpleRecord_Basic_List(addFooProperty(Simple))).toBeTruthy();
	});
	test('empty object', () => {
		expect(isSimpleRecord_Basic_List({})).toBeFalsy();
	});
	test.each(Object.keys(Simple))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isSimpleRecord_Basic_List(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isSimpleRecord_Basic_List(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isSimpleRecord_Basic_List(invalidateArrayProperty(Simple, data))).toBeFalsy();
	});
});
describe('SimpleRecord_Basic_ListToJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_Basic_ListToJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecord_Basic_ListToJSON(Simple)).not.toBe(Simple);
	});
	test('additional props', () => {
		expect(SimpleRecord_Basic_ListToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});
