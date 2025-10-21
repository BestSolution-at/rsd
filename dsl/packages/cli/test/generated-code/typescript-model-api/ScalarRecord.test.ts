import { describe, expect, test } from 'vitest';
import {
	isScalarRecord,
	ScalarRecord,
	ScalarRecordFromJSON,
	ScalarRecordToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/ScalarRecord.js';
import { addFooProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: ScalarRecord = {
	value: 'Europe/Vienna',
	value_Null: 'Europe/Vienna',
	value_Opt: 'Europe/Vienna',
	value_Opt_Null: 'Europe/Vienna',
	list: ['Europe/Vienna', 'Europe/Berlin'],
	list_Null: ['Europe/Vienna', 'Europe/Berlin'],
	list_Opt: ['Europe/Vienna', 'Europe/Berlin'],
	list_Opt_Null: ['Europe/Vienna', 'Europe/Berlin'],
};

const SimpleMinimal: ScalarRecord = {
	value: 'Europe/Vienna',
	value_Null: 'Europe/Vienna',
	value_Opt: undefined,
	value_Opt_Null: undefined,
	list: ['Europe/Vienna', 'Europe/Berlin'],
	list_Null: ['Europe/Vienna', 'Europe/Berlin'],
	list_Opt: undefined,
	list_Opt_Null: undefined,
};

const SimpleNull: ScalarRecord = {
	value: 'Europe/Vienna',
	value_Null: null,
	value_Opt: undefined,
	value_Opt_Null: null,
	list: ['Europe/Vienna', 'Europe/Berlin'],
	list_Null: null,
	list_Opt: undefined,
	list_Opt_Null: null,
};

describe('ScalarRecordFromJSON', () => {
	test('simple', () => {
		expect(ScalarRecordFromJSON(Simple)).toStrictEqual(Simple);
		expect(ScalarRecordFromJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(ScalarRecordFromJSON(SimpleNull)).toStrictEqual(SimpleNull);
	});
	test('remove-unknown', () => {
		expect(ScalarRecordFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => ScalarRecordFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => ScalarRecordFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => ScalarRecordFromJSON(invalidateProperty(SimpleMinimal, data))).toThrow();
		expect(() => ScalarRecordFromJSON(invalidateProperty(SimpleNull, data))).toThrow();
	});
});

describe('isScalarRecord', () => {
	test('simple', () => {
		expect(isScalarRecord(Simple)).toBeTruthy();
		expect(isScalarRecord(SimpleMinimal)).toBeTruthy();
		expect(isScalarRecord(SimpleNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isScalarRecord(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isScalarRecord(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isScalarRecord(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isScalarRecord(invalidateProperty(SimpleMinimal, data))).toBeFalsy();
		expect(isScalarRecord(invalidateProperty(SimpleNull, data))).toBeFalsy();
	});
});

describe('ScalarRecordToJSON', () => {
	test('simple', () => {
		expect(ScalarRecordToJSON(Simple)).toStrictEqual(Simple);
		expect(ScalarRecordToJSON(Simple)).not.toBe(Simple);
		expect(ScalarRecordToJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(ScalarRecordToJSON(SimpleNull)).toStrictEqual(SimpleNull);
	});
	test('additional props', () => {
		expect(ScalarRecordToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});
