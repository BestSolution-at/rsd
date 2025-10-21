import { describe, expect, test } from 'vitest';

import {
	isRecordWithUnions,
	RecordWithUnions,
	RecordWithUnionsFromJSON,
	RecordWithUnionsToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/RecordWithUnions.js';
import { UnionA } from '../../test-specs/gen-out/client/typescript-client/src/model/UnionA.js';
import { UnionB } from '../../test-specs/gen-out/client/typescript-client/src/model/UnionB.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const UnionA: UnionA = {
	'@type': 'union-a',
	shared: 'Shared-A',
	valueA: 'Value-A',
};

const UnionB: UnionB = {
	'@type': 'union-b',
	shared: 'Shard-B',
	valueB: 'Value-B',
};

const Simple: RecordWithUnions = {
	value: UnionA,
	value_Null: UnionA,
	value_Opt: UnionB,
	value_Opt_Null: UnionB,
	list: [UnionA, UnionB],
	list_Null: [UnionA, UnionB],
	list_Opt: [UnionA, UnionB],
	list_Opt_Null: [UnionA, UnionB],
};

const SimpleMinimal: RecordWithUnions = {
	value: UnionA,
	value_Null: UnionA,
	value_Opt: undefined,
	value_Opt_Null: undefined,
	list: [UnionA, UnionB],
	list_Null: [UnionA, UnionB],
	list_Opt: undefined,
	list_Opt_Null: undefined,
};

const SimpleNull: RecordWithUnions = {
	value: UnionA,
	value_Null: null,
	value_Opt: undefined,
	value_Opt_Null: null,
	list: [UnionA, UnionB],
	list_Null: null,
	list_Opt: undefined,
	list_Opt_Null: null,
};

describe('RecordWithUnionsFromJSON', () => {
	test('simple', () => {
		expect(RecordWithUnionsFromJSON(Simple)).toStrictEqual(Simple);
		expect(RecordWithUnionsFromJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(RecordWithUnionsFromJSON(SimpleNull)).toStrictEqual(SimpleNull);
	});
	test('remove-unknown', () => {
		expect(RecordWithUnionsFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => RecordWithUnionsFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => RecordWithUnionsFromJSON(invalidateProperty(Simple, data))).toThrow();

		expect(() => RecordWithUnionsFromJSON(invalidateProperty(SimpleMinimal, data))).toThrow();
		expect(() => RecordWithUnionsFromJSON(invalidateProperty(SimpleNull, data))).toThrow();
	});
	test.each(Object.keys(Simple).filter(p => p.includes('list')))('invalid prop $0', data => {
		expect(() => RecordWithUnionsFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});
describe('isRecordWithUnions', () => {
	test('simple', () => {
		expect(isRecordWithUnions(Simple)).toBeTruthy();
		expect(isRecordWithUnions(SimpleMinimal)).toBeTruthy();
		expect(isRecordWithUnions(SimpleNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isRecordWithUnions(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isRecordWithUnions(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isRecordWithUnions(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isRecordWithUnions(invalidateProperty(SimpleMinimal, data))).toBeFalsy();
		expect(isRecordWithUnions(invalidateProperty(SimpleNull, data))).toBeFalsy();
	});
});
describe('RecordWithUnionsToJSON', () => {
	test('simple', () => {
		expect(RecordWithUnionsToJSON(Simple)).toStrictEqual(Simple);
		expect(RecordWithUnionsToJSON(Simple)).not.toBe(Simple);
		expect(RecordWithUnionsToJSON(Simple).value).toStrictEqual(Simple.value);
		expect(RecordWithUnionsToJSON(Simple).value).not.toBe(Simple.value);
		expect(RecordWithUnionsToJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(RecordWithUnionsToJSON(SimpleNull)).toStrictEqual(SimpleNull);
	});
	test('additional props', () => {
		expect(RecordWithUnionsToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});
