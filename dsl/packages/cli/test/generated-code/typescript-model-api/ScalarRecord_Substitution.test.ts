import { describe, expect, test } from 'vitest';
import {
	isScalarRecord_Substitution,
	ScalarRecord_Substitution,
	ScalarRecord_SubstitutionFromJSON,
	ScalarRecord_SubstitutionToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/index.js';
import { addFooProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: ScalarRecord_Substitution = {
	value: { start: 1, end: 2 },
	value_Opt: { start: 1, end: 2 },
	value_Null: { start: 1, end: 2 },
	value_Opt_Null: { start: 1, end: 2 },
	list: [
		{ start: 1, end: 2 },
		{ start: 3, end: 4 },
	],
	list_Opt: [
		{ start: 1, end: 2 },
		{ start: 3, end: 4 },
	],
	list_Null: [
		{ start: 1, end: 2 },
		{ start: 3, end: 4 },
	],
	list_Opt_Null: [
		{ start: 1, end: 2 },
		{ start: 3, end: 4 },
	],
};

const Simple_Json = {
	value: '[1,2]',
	value_Opt: '[1,2]',
	value_Null: '[1,2]',
	value_Opt_Null: '[1,2]',
	list: ['[1,2]', '[3,4]'],
	list_Opt: ['[1,2]', '[3,4]'],
	list_Null: ['[1,2]', '[3,4]'],
	list_Opt_Null: ['[1,2]', '[3,4]'],
};

const SimpleMinimal: ScalarRecord_Substitution = {
	value: { start: 1, end: 2 },
	value_Opt: undefined,
	value_Null: { start: 1, end: 2 },
	value_Opt_Null: undefined,
	list: [
		{ start: 1, end: 2 },
		{ start: 3, end: 4 },
	],
	list_Opt: undefined,
	list_Null: [
		{ start: 1, end: 2 },
		{ start: 3, end: 4 },
	],
	list_Opt_Null: undefined,
};

const SimpleMinimal_Json = {
	value: '[1,2]',
	value_Opt: undefined,
	value_Null: '[1,2]',
	value_Opt_Null: undefined,
	list: ['[1,2]', '[3,4]'],
	list_Opt: undefined,
	list_Null: ['[1,2]', '[3,4]'],
	list_Opt_Null: undefined,
} as const;

const SimpleNull: ScalarRecord_Substitution = {
	value: { start: 1, end: 2 },
	value_Opt: undefined,
	value_Null: null,
	value_Opt_Null: null,
	list: [
		{ start: 1, end: 2 },
		{ start: 3, end: 4 },
	],
	list_Opt: undefined,
	list_Null: null,
	list_Opt_Null: null,
};

const SimpleNull_Json = {
	value: '[1,2]',
	value_Opt: undefined,
	value_Null: null,
	value_Opt_Null: null,
	list: ['[1,2]', '[3,4]'],
	list_Opt: undefined,
	list_Null: null,
	list_Opt_Null: null,
} as const;

describe('ScalarRecord_SubstitutionFromJSON', () => {
	test('simple', () => {
		expect(ScalarRecord_SubstitutionFromJSON(Simple_Json)).toStrictEqual(Simple);
		expect(ScalarRecord_SubstitutionFromJSON(SimpleMinimal_Json)).toStrictEqual(SimpleMinimal);
		expect(ScalarRecord_SubstitutionFromJSON(SimpleNull_Json)).toStrictEqual(SimpleNull);
	});
	test('remove-unknown', () => {
		expect(ScalarRecord_SubstitutionFromJSON(addFooProperty(Simple_Json))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple_Json).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple_Json, data);
		expect(() => ScalarRecord_SubstitutionFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple_Json))('invalid prop $0', data => {
		expect(() => ScalarRecord_SubstitutionFromJSON(invalidateProperty(Simple_Json, data))).toThrow();
		expect(() => ScalarRecord_SubstitutionFromJSON(invalidateProperty(SimpleMinimal_Json, data))).toThrow();
		expect(() => ScalarRecord_SubstitutionFromJSON(invalidateProperty(SimpleNull_Json, data))).toThrow();
	});
	test.each(Object.keys(Simple_Json).filter(p => p.includes('list')))('invalid prop $0', data => {
		expect(() => ScalarRecord_SubstitutionFromJSON(invalidateProperty(Simple_Json, data))).toThrow();
	});
});

describe('isScalarRecord_Substitution', () => {
	test('simple', () => {
		expect(isScalarRecord_Substitution(Simple)).toBeTruthy();
		expect(isScalarRecord_Substitution(SimpleMinimal)).toBeTruthy();
		expect(isScalarRecord_Substitution(SimpleNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isScalarRecord_Substitution(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isScalarRecord_Substitution(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isScalarRecord_Substitution(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isScalarRecord_Substitution(invalidateProperty(SimpleMinimal, data))).toBeFalsy();
		expect(isScalarRecord_Substitution(invalidateProperty(SimpleNull, data))).toBeFalsy();
	});
});

describe('ScalarRecord_SubstitutionToJSON', () => {
	test('simple', () => {
		expect(ScalarRecord_SubstitutionToJSON(Simple)).toStrictEqual(Simple_Json);
		expect(ScalarRecord_SubstitutionToJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal_Json);
		expect(ScalarRecord_SubstitutionToJSON(SimpleNull)).toStrictEqual(SimpleNull_Json);
	});
	test('additional props', () => {
		expect(ScalarRecord_SubstitutionToJSON(addFooProperty(Simple))).toStrictEqual(Simple_Json);
	});
});
