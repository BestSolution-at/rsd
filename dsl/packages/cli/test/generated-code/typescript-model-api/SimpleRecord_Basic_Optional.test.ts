import { describe, expect, test } from 'vitest';
import { isSimpleRecord_Basic_Optional, SimpleRecord_Basic_Optional, SimpleRecord_Basic_OptionalFromJSON, SimpleRecord_Basic_OptionalToJSON } from '../../test-specs/gen-out/client/typescript-client/src/model/SimpleRecord_Basic_Optional.js';
import { addFooProperty, invalidateProperty, removeProperty } from './utils.js';

const SimpleEmpty: SimpleRecord_Basic_Optional = {
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

const Simple: SimpleRecord_Basic_Optional = {
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

describe('SimpleRecord_Basic_OptionalFromJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_Basic_OptionalFromJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecord_Basic_OptionalFromJSON(Simple)).not.toBe(Simple);

		expect(SimpleRecord_Basic_OptionalFromJSON(SimpleEmpty)).toStrictEqual(SimpleEmpty);
		expect(SimpleRecord_Basic_OptionalFromJSON({})).toStrictEqual(SimpleEmpty);
		expect(SimpleRecord_Basic_OptionalFromJSON(SimpleEmpty)).not.toBe(SimpleEmpty);
	});
	test('remove-unknown', () => {
		expect(SimpleRecord_Basic_OptionalFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test('empty object', () => {
		expect(SimpleRecord_Basic_OptionalFromJSON({})).toStrictEqual(SimpleEmpty);
	});
	test.each(Object.keys(Simple))('missing prop $0', data => {
		const { withOut, withUndefined } = removeProperty(Simple, data);
		expect(SimpleRecord_Basic_OptionalFromJSON(withOut)).toStrictEqual(withUndefined);
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => SimpleRecord_Basic_OptionalFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => SimpleRecord_Basic_OptionalFromJSON(invalidateProperty(SimpleEmpty, data))).toThrow();
		expect(() => SimpleRecord_Basic_OptionalFromJSON(invalidateProperty({}, data))).toThrow();
	});
});
describe('isSimpleRecord_Basic_Optional', () => {
	test('simple', () => {
		expect(isSimpleRecord_Basic_Optional(Simple)).toBeTruthy();
		expect(isSimpleRecord_Basic_Optional(SimpleEmpty)).toBeTruthy();
		expect(isSimpleRecord_Basic_Optional({})).toBeTruthy();
	});
	test('additional props', () => {
		expect(isSimpleRecord_Basic_Optional(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isSimpleRecord_Basic_Optional(withOut)).toBeTruthy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isSimpleRecord_Basic_Optional(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isSimpleRecord_Basic_Optional(invalidateProperty(SimpleEmpty, data))).toBeFalsy();
		expect(isSimpleRecord_Basic_Optional(invalidateProperty({}, data))).toBeFalsy();
	});
});
describe('SimpleRecord_Basic_OptionalToJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_Basic_OptionalToJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecord_Basic_OptionalToJSON(Simple)).not.toBe(Simple);

		expect(SimpleRecord_Basic_OptionalToJSON(SimpleEmpty)).toStrictEqual(SimpleEmpty);
		expect(SimpleRecord_Basic_OptionalToJSON(SimpleEmpty)).not.toBe(SimpleEmpty);

		expect(SimpleRecord_Basic_OptionalToJSON({})).toStrictEqual(SimpleEmpty);
		expect(SimpleRecord_Basic_OptionalToJSON({})).not.toBe(SimpleEmpty);
	});
	test('additional props', () => {
		expect(SimpleRecord_Basic_OptionalToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});
