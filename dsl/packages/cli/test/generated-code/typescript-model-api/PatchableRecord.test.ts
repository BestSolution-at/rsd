import { describe, expect, test } from 'vitest';
import {
	isPatchableRecord,
	isPatchableRecordPatch,
	PatchableRecord,
	PatchableRecordFromJSON,
	PatchableRecordPatch,
	PatchableRecordPatchFromJSON,
	PatchableRecordPatchToJSON,
	PatchableRecordToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/PatchableRecord.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: PatchableRecord = {
	key: 'key',
	version: 'version',
	value: 'Europe/Vienna',
};

describe('PatchableRecordFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecordFromJSON(Simple)).toStrictEqual(Simple);
	});
	test('remove-unknown', () => {
		expect(PatchableRecordFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => PatchableRecordFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecordFromJSON(invalidateProperty(Simple, data))).toThrow();
	});
	test.each(Object.keys(Simple).filter(p => p.includes('list')))('invalid prop $0', data => {
		expect(() => PatchableRecordFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});

describe('isPatchableRecord', () => {
	test('simple', () => {
		expect(isPatchableRecord(Simple)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecord(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isPatchableRecord(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecord(invalidateProperty(Simple, data))).toBeFalsy();
	});
});

describe('PatchableRecordToJSON', () => {
	test('simple', () => {
		expect(PatchableRecordToJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableRecordToJSON(Simple)).not.toBe(Simple);
	});
	test('additional props', () => {
		expect(PatchableRecordToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});

const SimplePatch: PatchableRecordPatch = {
	key: 'key',
	version: 'version',
	value: 'value',
};

const SimplePatchMinimal: PatchableRecordPatch = {
	key: 'key',
	version: 'version',
	value: undefined,
};

describe('PatchableRecordPatchFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecordPatchFromJSON(SimplePatch)).toStrictEqual(SimplePatch);
		expect(PatchableRecordPatchFromJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
	});
	test('remove-unknown', () => {
		expect(PatchableRecordPatchFromJSON(addFooProperty(SimplePatch))).toStrictEqual(SimplePatch);
		expect(PatchableRecordPatchFromJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(SimplePatchMinimal);
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'key');
		expect(() => PatchableRecordPatchFromJSON(withOut)).toThrow();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'version');
		expect(() => PatchableRecordPatchFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecordPatchFromJSON(invalidateProperty(SimplePatch, data))).toThrow();
		expect(() => PatchableRecordPatchFromJSON(invalidateProperty(SimplePatchMinimal, data))).toThrow();
	});
});
describe('isPatchableRecordPatch', () => {
	test('simple', () => {
		expect(isPatchableRecordPatch(SimplePatch)).toBeTruthy();
		expect(isPatchableRecordPatch(SimplePatchMinimal)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecordPatch(addFooProperty(SimplePatch))).toBeTruthy();
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'key');
		expect(isPatchableRecordPatch(withOut)).toBeFalsy();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'version');
		expect(isPatchableRecordPatch(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecordPatch(invalidateProperty(SimplePatch, data))).toBeFalsy();
		expect(isPatchableRecordPatch(invalidateProperty(SimplePatchMinimal, data))).toBeFalsy();
	});
});
describe('PatchableRecordPatchToJSON', () => {
	test('simple', () => {
		expect(PatchableRecordPatchToJSON(SimplePatch)).toStrictEqual(SimplePatch);
		expect(PatchableRecordPatchToJSON(SimplePatch)).not.toBe(SimplePatch);

		expect(PatchableRecordPatchToJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecordPatchToJSON(SimplePatchMinimal)).not.toBe(SimplePatchMinimal);
	});
	test('additional props', () => {
		expect(PatchableRecordPatchToJSON(addFooProperty(SimplePatch))).toStrictEqual(SimplePatch);
		expect(PatchableRecordPatchToJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(SimplePatchMinimal);
	});
});
