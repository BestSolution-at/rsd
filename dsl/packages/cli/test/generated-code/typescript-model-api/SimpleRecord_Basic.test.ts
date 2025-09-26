import { describe, expect, test } from 'vitest';
import {
	isSimpleRecord_Basic,
	SimpleRecord_BasicFromJSON,
	SimpleRecord_BasicToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/SimpleRecord_Basic.js';
import { addFooProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple = {
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

describe('SimpleRecord_BasicFromJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_BasicFromJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecord_BasicFromJSON(Simple)).not.toBe(Simple);
	});
	test('remove-unknown', () => {
		expect(SimpleRecord_BasicFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test('empty object', () => {
		expect(() => SimpleRecord_BasicFromJSON({})).toThrow();
	});
	test.each(Object.keys(Simple))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => SimpleRecord_BasicFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => SimpleRecord_BasicFromJSON(invalidateProperty(Simple, data))).toThrow();
	});
});
describe('isSimpleRecord_Basic', () => {
	test('simple', () => {
		expect(isSimpleRecord_Basic(Simple)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isSimpleRecord_Basic(addFooProperty(Simple))).toBeTruthy();
	});
	test('empty object', () => {
		expect(isSimpleRecord_Basic({})).toBeFalsy();
	});
	test.each(Object.keys(Simple))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isSimpleRecord_Basic(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isSimpleRecord_Basic(invalidateProperty(Simple, data))).toBeFalsy();
	});
});
describe('SimpleRecord_BasicToJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_BasicToJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecord_BasicToJSON(Simple)).not.toBe(Simple);
	});
	test('additional props', () => {
		expect(SimpleRecord_BasicToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});
