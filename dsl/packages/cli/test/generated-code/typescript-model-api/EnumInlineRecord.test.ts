import { describe, expect, test } from 'vitest';
import {
	EnumInlineRecord,
	EnumInlineRecordFromJSON,
	EnumInlineRecordToJSON,
	isEnumInlineRecord,
} from '../../test-specs/gen-out/client/typescript-client/src/model/EnumInlineRecord.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: EnumInlineRecord = {
	value: 'A',
	value_Null: 'C',
	value_Opt: 'E',
	value_Opt_Null: 'G',
	list: ['A', 'B'],
	list_Null: ['C', 'D'],
	list_Opt_Null: ['G', 'H'],
};

const SimpleMinimal: EnumInlineRecord = {
	value: 'A',
	value_Null: 'C',
	value_Opt: undefined,
	value_Opt_Null: 'G',
	list: ['A', 'B'],
	list_Null: ['C', 'D'],
	list_Opt_Null: undefined,
};

const SimpleNull: EnumInlineRecord = {
	value: 'A',
	value_Null: null,
	value_Opt: undefined,
	value_Opt_Null: 'G',
	list: ['A', 'B'],
	list_Null: null,
	list_Opt_Null: null,
};

describe('EnumInlineRecordFromJSON', () => {
	test('simple', () => {
		expect(EnumInlineRecordFromJSON(Simple)).toStrictEqual(Simple);
		expect(EnumInlineRecordFromJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(EnumInlineRecordFromJSON(SimpleNull)).toStrictEqual(SimpleNull);
	});
	test('remove-unknown', () => {
		expect(EnumInlineRecordFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => EnumInlineRecordFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => EnumInlineRecordFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => EnumInlineRecordFromJSON(invalidateProperty(SimpleMinimal, data))).toThrow();
		expect(() => EnumInlineRecordFromJSON(invalidateProperty(SimpleNull, data))).toThrow();
	});
	test.each(Object.keys(Simple).filter(p => p.includes('list')))('invalid prop $0', data => {
		expect(() => EnumInlineRecordFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});
describe('isEnumInlineRecord', () => {
	test('simple', () => {
		expect(isEnumInlineRecord(Simple)).toBeTruthy();
		expect(isEnumInlineRecord(SimpleMinimal)).toBeTruthy();
		expect(isEnumInlineRecord(SimpleNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isEnumInlineRecord(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isEnumInlineRecord(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isEnumInlineRecord(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isEnumInlineRecord(invalidateProperty(SimpleMinimal, data))).toBeFalsy();
		expect(isEnumInlineRecord(invalidateProperty(SimpleNull, data))).toBeFalsy();
	});
});
describe('EnumInlineRecordToJSON', () => {
	test('simple', () => {
		expect(EnumInlineRecordToJSON(Simple)).toStrictEqual(Simple);
		expect(EnumInlineRecordToJSON(Simple)).not.toBe(Simple);
		expect(EnumInlineRecordToJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(EnumInlineRecordToJSON(SimpleNull)).toStrictEqual(SimpleNull);
	});
	test('additional props', () => {
		expect(EnumInlineRecordToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});
