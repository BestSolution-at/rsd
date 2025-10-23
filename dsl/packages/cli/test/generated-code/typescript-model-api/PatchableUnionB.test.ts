import { describe, expect, test } from 'vitest';
import {
	isPatchableUnionB,
	isPatchableUnionBPatch,
	PatchableUnionB,
	PatchableUnionBFromJSON,
	PatchableUnionBPatch,
	PatchableUnionBPatchFromJSON,
	PatchableUnionBPatchToJSON,
	PatchableUnionBToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/PatchableUnionB.js';
import { addFooProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: PatchableUnionB = {
	'@type': 'union-b',
	key: 'key',
	version: 'version',
	shared: 'shared',
	valueB: 'valueB',
};

const SimplePatch: PatchableUnionBPatch = {
	'@type': 'patch:union-b',
	key: 'key',
	version: 'version',
	shared: 'shared',
	valueB: 'vaueB',
};

const SimplePatchMinimal: PatchableUnionBPatch = {
	'@type': 'patch:union-b',
	key: 'key',
	version: 'version',
	shared: undefined,
	valueB: undefined,
};

describe('PatchableUnionBFromJSON', () => {
	test('simple', () => {
		expect(PatchableUnionBFromJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableUnionBFromJSON(Simple)).not.toBe(Simple);
	});
	test('remove-unknown', () => {
		expect(PatchableUnionBFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test('empty object', () => {
		expect(() => PatchableUnionBFromJSON({})).toThrow();
	});
	test.each(Object.keys(Simple).filter(k => !k.startsWith('@')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => PatchableUnionBFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple).filter(k => !k.startsWith('@')))('invalid prop $0', data => {
		expect(() => PatchableUnionBFromJSON(invalidateProperty(Simple, data))).toThrow();
	});
});
describe('isPatchableUnionB', () => {
	test('simple', () => {
		expect(isPatchableUnionB(Simple)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableUnionB(addFooProperty(Simple))).toBeTruthy();
	});
	test('empty object', () => {
		expect(isPatchableUnionB({})).toBeFalsy();
	});
	test.each(Object.keys(Simple))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isPatchableUnionB(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableUnionB(invalidateProperty(Simple, data))).toBeFalsy();
	});
});
describe('PatchableUnionBToJSON', () => {
	test('simple', () => {
		expect(PatchableUnionBToJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableUnionBToJSON(Simple)).not.toBe(Simple);
	});
	test('additional props', () => {
		expect(PatchableUnionBToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});

describe('PatchableUnionBPatchFromJSON', () => {
	test('simple', () => {
		expect(PatchableUnionBPatchFromJSON(SimplePatch)).toStrictEqual(SimplePatch);
		expect(PatchableUnionBPatchFromJSON(SimplePatch)).not.toBe(SimplePatch);
		expect(PatchableUnionBPatchFromJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableUnionBPatchFromJSON(SimplePatchMinimal)).not.toBe(SimplePatchMinimal);
	});
	test('remove-unknown', () => {
		expect(PatchableUnionBPatchFromJSON(addFooProperty(SimplePatch))).toStrictEqual(SimplePatch);
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'key');
		expect(() => PatchableUnionBPatchFromJSON(withOut)).toThrow();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'version');
		expect(() => PatchableUnionBPatchFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(SimplePatch).filter(k => !k.startsWith('@')))('invalid prop $0', data => {
		expect(() => PatchableUnionBPatchFromJSON(invalidateProperty(SimplePatch, data))).toThrow();
	});
});
describe('isPatchableUnionBPatch', () => {
	test('simple', () => {
		expect(isPatchableUnionBPatch(SimplePatch)).toBeTruthy();
		expect(isPatchableUnionBPatch(SimplePatchMinimal)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableUnionBPatch(addFooProperty(SimplePatch))).toBeTruthy();
		expect(isPatchableUnionBPatch(addFooProperty(SimplePatchMinimal))).toBeTruthy();
	});
	test('empty object', () => {
		expect(isPatchableUnionBPatch({})).toBeFalsy();
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'key');
		expect(isPatchableUnionBPatch(withOut)).toBeFalsy();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'version');
		expect(isPatchableUnionBPatch(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableUnionBPatch(invalidateProperty(Simple, data))).toBeFalsy();
	});
});
describe('PatchableUnionBPatchToJSON', () => {
	test('simple', () => {
		expect(PatchableUnionBPatchToJSON(SimplePatch)).toStrictEqual(SimplePatch);
		expect(PatchableUnionBPatchToJSON(SimplePatch)).not.toBe(Simple);
		expect(PatchableUnionBPatchToJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableUnionBPatchToJSON(SimplePatchMinimal)).not.toBe(SimplePatchMinimal);
	});
	test('additional props', () => {
		expect(PatchableUnionBPatchToJSON(addFooProperty(SimplePatch))).toStrictEqual(SimplePatch);
		expect(PatchableUnionBPatchToJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(SimplePatchMinimal);
	});
});
