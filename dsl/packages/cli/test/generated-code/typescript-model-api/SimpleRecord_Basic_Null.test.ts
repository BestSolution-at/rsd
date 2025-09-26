import { describe, expect, test } from 'vitest';
import { isSimpleRecord_Basic_Null, SimpleRecord_Basic_Null, SimpleRecord_Basic_NullFromJSON } from '../../test-specs/gen-out/client/typescript-client/src/model/SimpleRecord_Basic_Null.js';
import { addFooProperty, invalidateProperty, removeProperty } from './utils.js';

const SimpleNull: SimpleRecord_Basic_Null = {
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

const Simple: SimpleRecord_Basic_Null = {
	valueBoolean: true,
	valueDouble: 1.5,
	valueFloat: 1.5,
	valueInt: 1,
	valueLocalDate: '2025-01-01',
	valueLocalDateTime: '2025-01-01T10:00:00',
	valueLong: 1,
	valueShort: 1,
	valueString: 'Foo',
	valueZonedDateTime: '2025-01-01T10:00:00Z',
};

describe('SimpleRecord_Basic_NullFromJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_Basic_NullFromJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecord_Basic_NullFromJSON(Simple)).not.toBe(Simple);

		expect(SimpleRecord_Basic_NullFromJSON(SimpleNull)).toStrictEqual(SimpleNull);
		expect(SimpleRecord_Basic_NullFromJSON(SimpleNull)).not.toBe(SimpleNull);
	});
	test('remove-unknown', () => {
		expect(SimpleRecord_Basic_NullFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => SimpleRecord_Basic_NullFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => SimpleRecord_Basic_NullFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => SimpleRecord_Basic_NullFromJSON(invalidateProperty(SimpleNull, data))).toThrow();
	});
});
describe('isSimpleRecord_Basic_Null', () => {
	test('simple', () => {
		expect(isSimpleRecord_Basic_Null(Simple)).toBeTruthy();
		expect(isSimpleRecord_Basic_Null(SimpleNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isSimpleRecord_Basic_Null(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isSimpleRecord_Basic_Null(withOut)).toBeFalsy();
	});
	test('invalid props', () => {});
});
describe('SimpleRecord_Basic_NullToJSON', () => {
	test('simple', () => {});
	test('additional props', () => {});
});
