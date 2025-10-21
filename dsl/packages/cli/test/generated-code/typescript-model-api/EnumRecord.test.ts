import { describe, expect, test } from 'vitest';
import {
	EnumRecord,
	EnumRecordFromJSON,
	EnumRecordToJSON,
	isEnumRecord,
} from '../../test-specs/gen-out/client/typescript-client/src/model/EnumRecord.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: EnumRecord = {
	value: 'A',
	value_Null: 'A',
	value_Opt: 'A',
	value_Opt_Null: 'A',
	list: ['A', 'B'],
	list_Null: ['A', 'B'],
	list_Opt: ['A', 'B'],
	list_Opt_Null: ['A', 'B'],
};

const SimpleMinimal: EnumRecord = {
	value: 'A',
	value_Null: 'A',
	value_Opt: undefined,
	value_Opt_Null: undefined,
	list: ['A', 'B'],
	list_Null: ['A', 'B'],
	list_Opt: undefined,
	list_Opt_Null: undefined,
};

const SimpleNull: EnumRecord = {
	value: 'A',
	value_Null: null,
	value_Opt: undefined,
	value_Opt_Null: null,
	list: ['A', 'B'],
	list_Null: null,
	list_Opt: undefined,
	list_Opt_Null: null,
};

describe('EnumRecordFromJSON', () => {
	test('simple', () => {
		expect(EnumRecordFromJSON(Simple)).toStrictEqual(Simple);
		expect(EnumRecordFromJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(EnumRecordFromJSON(SimpleNull)).toStrictEqual(SimpleNull);
	});
	test('remove-unknown', () => {
		expect(EnumRecordFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => EnumRecordFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => EnumRecordFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => EnumRecordFromJSON(invalidateProperty(SimpleMinimal, data))).toThrow();
		expect(() => EnumRecordFromJSON(invalidateProperty(SimpleNull, data))).toThrow();
	});
	test.each(Object.keys(Simple).filter(p => p.includes('list')))('invalid prop $0', data => {
		expect(() => EnumRecordFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});
describe('isEnumRecord', () => {
	test('simple', () => {
		expect(isEnumRecord(Simple)).toBeTruthy();
		expect(isEnumRecord(SimpleMinimal)).toBeTruthy();
		expect(isEnumRecord(SimpleNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isEnumRecord(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isEnumRecord(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isEnumRecord(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isEnumRecord(invalidateProperty(SimpleMinimal, data))).toBeFalsy();
		expect(isEnumRecord(invalidateProperty(SimpleNull, data))).toBeFalsy();
	});
});
describe('EnumRecordToJSON', () => {
	test('simple', () => {
		expect(EnumRecordToJSON(Simple)).toStrictEqual(Simple);
		expect(EnumRecordToJSON(Simple)).not.toBe(Simple);
		expect(EnumRecordToJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(EnumRecordToJSON(SimpleNull)).toStrictEqual(SimpleNull);
	});
	test('additional props', () => {
		expect(EnumRecordToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});
