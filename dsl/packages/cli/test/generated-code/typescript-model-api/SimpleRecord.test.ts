import { describe, expect, test } from 'vitest';
import { isSimpleRecord, SimpleRecordFromJSON, SimpleRecordToJSON } from '../../test-specs/gen-out/client/typescript-client/src/model/SimpleRecord.js';

describe('SimpleRecordFromJSON', () => {
	test('simple', () => {
		expect(SimpleRecordFromJSON({ key: 'key', version: 'version', value: 'value' })).toStrictEqual({ key: 'key', version: 'version', value: 'value' });
	});
	test('remove-unknown', () => {
		expect(SimpleRecordFromJSON({ key: 'key', version: 'version', value: 'value', foo: 'bar' })).toStrictEqual({ key: 'key', version: 'version', value: 'value' });
	});
	test('missing prop', () => {
		expect(() => SimpleRecordFromJSON({ key: 'key', version: 'version' })).toThrowError();
		expect(() => SimpleRecordFromJSON({ key: 'key', value: 'value' })).toThrowError();
		expect(() => SimpleRecordFromJSON({ version: 'version', value: 'value' })).toThrowError();
	});
	test('invalid prop value', () => {
		expect(() => SimpleRecordFromJSON({ key: 'key', version: 'version', value: 1 })).toThrowError();
		expect(() => SimpleRecordFromJSON({ key: 'key', version: 1, value: 'value' })).toThrowError();
		expect(() => SimpleRecordFromJSON({ key: 1, version: 'version', value: 'value' })).toThrowError();
	});
});

describe('isSimpleRecord', () => {
	test('simple', () => {
		expect(isSimpleRecord({ key: 'key', version: 'version', value: 'value' })).toBeTruthy();
	});
	test('additional props', () => {
		expect(isSimpleRecord({ key: 'key', version: 'version', value: 'value', foo: 'bar' })).toBeTruthy();
	});
	test('missing props', () => {
		expect(isSimpleRecord({ key: 'key', version: 'version' })).toBeFalsy();
		expect(isSimpleRecord({ key: 'key', value: 'value' })).toBeFalsy();
		expect(isSimpleRecord({ version: 'version', value: 'value' })).toBeFalsy();
	});
	test('invalid prop value', () => {
		expect(isSimpleRecord({ key: 'key', version: 'version', value: 1 })).toBeFalsy();
		expect(isSimpleRecord({ key: 'key', version: 1, value: 'value' })).toBeFalsy();
		expect(isSimpleRecord({ key: 1, version: 'version', value: 'value' })).toBeFalsy();
	});
});

describe('SimpleRecordToJSON', () => {
	test('simple', () => {
		expect(SimpleRecordToJSON({ key: 'key', version: 'version', value: 'value' })).toStrictEqual({ key: 'key', version: 'version', value: 'value' });
	});
});
