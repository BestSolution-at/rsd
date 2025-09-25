import { describe, expect, test } from 'vitest';
import { isSimpleRecord_KeyVersion, SimpleRecord_KeyVersionFromJSON, SimpleRecord_KeyVersionToJSON } from '../../test-specs/gen-out/client/typescript-client/src/model/SimpleRecord_KeyVersion.js';
import { addFooProperty } from './utils.js';

const Simple = {
	key: 'key',
	version: 'version',
};

describe('SimpleRecord_KeyVersionFromJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_KeyVersionFromJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecord_KeyVersionFromJSON(Simple)).not.toBe(Simple);
	});
	test('remove-unknown', () => {
		expect(SimpleRecord_KeyVersionFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test('missing prop', () => {
		expect(() => SimpleRecord_KeyVersionFromJSON({ key: 'key' })).toThrow();
		expect(() => SimpleRecord_KeyVersionFromJSON({ version: 'version' })).toThrow();
	});
	test('invalid prop value', () => {
		expect(() => SimpleRecord_KeyVersionFromJSON({ key: 'key', version: 1 })).toThrow();
		expect(() => SimpleRecord_KeyVersionFromJSON({ key: 1, version: 'version' })).toThrow();
	});
});

describe('isSimpleRecord_KeyVersion', () => {
	test('simple', () => {
		expect(isSimpleRecord_KeyVersion(Simple)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isSimpleRecord_KeyVersion(addFooProperty(Simple))).toBeTruthy();
	});
	test('missing props', () => {
		expect(isSimpleRecord_KeyVersion({ key: 'key' })).toBeFalsy();
		expect(isSimpleRecord_KeyVersion({ version: 'version' })).toBeFalsy();
	});
	test('invalid props', () => {
		expect(isSimpleRecord_KeyVersion({ key: 1, version: 'version' })).toBeFalsy();
		expect(isSimpleRecord_KeyVersion({ key: 'key', version: 1 })).toBeFalsy();
	});
});

describe('SimpleRecord_KeyVersionToJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_KeyVersionToJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecord_KeyVersionToJSON(Simple)).not.toBe(Simple);
	});
	test('additional props', () => {
		expect(SimpleRecord_KeyVersionToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});
