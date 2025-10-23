import { describe, expect, test } from 'vitest';
import {
	isPatchableUnionA,
	isPatchableUnionAPatch,
	PatchableUnionA,
	PatchableUnionAFromJSON,
	PatchableUnionAPatch,
	PatchableUnionAPatchFromJSON,
	PatchableUnionAPatchToJSON,
	PatchableUnionAToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/PatchableUnionA.js';
import { addFooProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: PatchableUnionA = {
	'@type': 'union-a',
	key: 'key',
	version: 'version',
	shared: 'shared',
	valueA: 'valueB',
};

const SimplePatch: PatchableUnionAPatch = {
	'@type': 'patch:union-a',
	key: 'key',
	version: 'version',
	shared: 'shared',
	valueA: 'vaueB',
};

const SimplePatchMinimal: PatchableUnionAPatch = {
	'@type': 'patch:union-a',
	key: 'key',
	version: 'version',
	shared: undefined,
	valueA: undefined,
};

describe('PatchableUnionAFromJSON', () => {
	test('simple', () => {
		expect(PatchableUnionAFromJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableUnionAFromJSON(Simple)).not.toBe(Simple);
	});
	test('remove-unknown', () => {
		expect(PatchableUnionAFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test('empty object', () => {
		expect(() => PatchableUnionAFromJSON({})).toThrow();
	});
	test.each(Object.keys(Simple).filter(k => !k.startsWith('@')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => PatchableUnionAFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple).filter(k => !k.startsWith('@')))('invalid prop $0', data => {
		expect(() => PatchableUnionAFromJSON(invalidateProperty(Simple, data))).toThrow();
	});
});
describe('isPatchableUnionA', () => {
	test('simple', () => {
		expect(isPatchableUnionA(Simple)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableUnionA(addFooProperty(Simple))).toBeTruthy();
	});
	test('empty object', () => {
		expect(isPatchableUnionA({})).toBeFalsy();
	});
	test.each(Object.keys(Simple))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isPatchableUnionA(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableUnionA(invalidateProperty(Simple, data))).toBeFalsy();
	});
});
describe('PatchableUnionAToJSON', () => {
	test('simple', () => {
		expect(PatchableUnionAToJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableUnionAToJSON(Simple)).not.toBe(Simple);
	});
	test('additional props', () => {
		expect(PatchableUnionAToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});

describe('PatchableUnionAPatchFromJSON', () => {
	test('simple', () => {
		expect(PatchableUnionAPatchFromJSON(SimplePatch)).toStrictEqual(SimplePatch);
		expect(PatchableUnionAPatchFromJSON(SimplePatch)).not.toBe(SimplePatch);
		expect(PatchableUnionAPatchFromJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableUnionAPatchFromJSON(SimplePatchMinimal)).not.toBe(SimplePatchMinimal);
	});
	test('remove-unknown', () => {
		expect(PatchableUnionAPatchFromJSON(addFooProperty(SimplePatch))).toStrictEqual(SimplePatch);
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'key');
		expect(() => PatchableUnionAPatchFromJSON(withOut)).toThrow();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'version');
		expect(() => PatchableUnionAPatchFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(SimplePatch).filter(k => !k.startsWith('@')))('invalid prop $0', data => {
		expect(() => PatchableUnionAPatchFromJSON(invalidateProperty(SimplePatch, data))).toThrow();
	});
});
describe('isPatchableUnionAPatch', () => {
	test('simple', () => {
		expect(isPatchableUnionAPatch(SimplePatch)).toBeTruthy();
		expect(isPatchableUnionAPatch(SimplePatchMinimal)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableUnionAPatch(addFooProperty(SimplePatch))).toBeTruthy();
		expect(isPatchableUnionAPatch(addFooProperty(SimplePatchMinimal))).toBeTruthy();
	});
	test('empty object', () => {
		expect(isPatchableUnionAPatch({})).toBeFalsy();
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'key');
		expect(isPatchableUnionAPatch(withOut)).toBeFalsy();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'version');
		expect(isPatchableUnionAPatch(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableUnionAPatch(invalidateProperty(Simple, data))).toBeFalsy();
	});
});
describe('PatchableUnionAPatchToJSON', () => {
	test('simple', () => {
		expect(PatchableUnionAPatchToJSON(SimplePatch)).toStrictEqual(SimplePatch);
		expect(PatchableUnionAPatchToJSON(SimplePatch)).not.toBe(Simple);
		expect(PatchableUnionAPatchToJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableUnionAPatchToJSON(SimplePatchMinimal)).not.toBe(SimplePatchMinimal);
	});
	test('additional props', () => {
		expect(PatchableUnionAPatchToJSON(addFooProperty(SimplePatch))).toStrictEqual(SimplePatch);
		expect(PatchableUnionAPatchToJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(SimplePatchMinimal);
	});
});
