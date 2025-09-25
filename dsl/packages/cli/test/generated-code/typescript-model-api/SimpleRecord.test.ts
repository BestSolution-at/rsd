import { describe, expect, test } from 'vitest';
import { isSimpleRecord, SimpleRecordFromJSON, SimpleRecordToJSON } from '../../test-specs/gen-out/client/typescript-client/src/model/SimpleRecord.js';
import { addFooProperty } from './utils.js';

const Simple = {
	key: 'key',
	version: 'version',
	value: 'value',
};

describe('SimpleRecordFromJSON', () => {
	test('simple', () => {
		expect(SimpleRecordFromJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecordFromJSON(Simple)).not.toBe(Simple);
	});
	test('remove-unknown', () => {
		expect(SimpleRecordFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
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
		expect(isSimpleRecord(Simple)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isSimpleRecord(addFooProperty(Simple))).toBeTruthy();
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
		expect(SimpleRecordToJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecordToJSON(Simple)).not.toBe(Simple);
	});
});
