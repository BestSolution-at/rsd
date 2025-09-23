import { describe, expect, test } from 'vitest';
import { isSimpleRecord_KeyVersion, SimpleRecord_KeyVersionFromJSON, SimpleRecord_KeyVersionToJSON } from '../../test-specs/gen-out/client/typescript-client/src/model/SimpleRecord_KeyVersion.js';

describe('SimpleRecord_KeyVersionFromJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_KeyVersionFromJSON({ key: 'key', version: 'version' })).toStrictEqual({ key: 'key', version: 'version' });
	});
	test('remove-unknown', () => {
		expect(SimpleRecord_KeyVersionFromJSON({ key: 'key', version: 'version' })).toStrictEqual({ key: 'key', version: 'version' });
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
		expect(isSimpleRecord_KeyVersion({ key: 'key', version: 'version' })).toBeTruthy();
	});
	test('additional props', () => {
		expect(isSimpleRecord_KeyVersion({ key: 'key', version: 'version', foo: 'bar' })).toBeTruthy();
	});
	test('missing props', () => {
		expect(isSimpleRecord_KeyVersion({ key: 'key' })).toBeFalsy();
		expect(isSimpleRecord_KeyVersion({ version: 'version' })).toBeFalsy();
	});
});

describe('SimpleRecord_KeyVersionToJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_KeyVersionToJSON({ key: 'key', version: 'version' })).toStrictEqual({ key: 'key', version: 'version' });
	});
});
