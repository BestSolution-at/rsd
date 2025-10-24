import { describe, expect, test } from 'vitest';
import {
	isPatchableRecord_Basic,
	isPatchableRecord_BasicPatch,
	PatchableRecord_Basic,
	PatchableRecord_BasicFromJSON,
	PatchableRecord_BasicPatch,
	PatchableRecord_BasicPatchFromJSON,
	PatchableRecord_BasicPatchToJSON,
	PatchableRecord_BasicToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/PatchableRecord_Basic.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: PatchableRecord_Basic = {
	key: 'key',
	version: 'version',
	valueBoolean: true,
	valueDouble: 0.1,
	valueFloat: 0.1,
	valueInt: 1,
	valueLocalDate: '2020-01-02',
	valueLocalDateTime: '2020-01-02T03:04:05',
	valueLong: 1,
	valueShort: 1,
	valueString: 'value',
	valueZonedDateTime: '2020-01-02T03:04:05Z',
};

describe('PatchableRecord_BasicFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_BasicFromJSON(Simple)).toStrictEqual(Simple);
	});
	test('remove-unknown', () => {
		expect(PatchableRecord_BasicFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => PatchableRecord_BasicFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecord_BasicFromJSON(invalidateProperty(Simple, data))).toThrow();
	});
	test.each(Object.keys(Simple).filter(p => p.includes('list')))('invalid prop $0', data => {
		expect(() => PatchableRecord_BasicFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});

describe('isPatchableRecord_Basic', () => {
	test('simple', () => {
		expect(isPatchableRecord_Basic(Simple)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecord_Basic(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isPatchableRecord_Basic(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecord_Basic(invalidateProperty(Simple, data))).toBeFalsy();
	});
});

describe('PatchableRecord_BasicToJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_BasicToJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableRecord_BasicToJSON(Simple)).not.toBe(Simple);
	});
	test('additional props', () => {
		expect(PatchableRecord_BasicToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});

const SimplePatch: PatchableRecord_BasicPatch = {
	key: 'key',
	version: 'version',
	valueBoolean: true,
	valueDouble: 0.1,
	valueFloat: 0.1,
	valueInt: 1,
	valueLocalDate: '2020-01-02',
	valueLocalDateTime: '2020-01-02T03:04:05',
	valueLong: 1,
	valueShort: 1,
	valueString: 'value',
	valueZonedDateTime: '2020-01-02T03:04:05Z',
};

const SimplePatchMinimal: PatchableRecord_BasicPatch = {
	key: 'key',
	version: 'version',
	valueBoolean: undefined,
	valueDouble: undefined,
	valueFloat: undefined,
	valueInt: undefined,
	valueLocalDate: undefined,
	valueLocalDateTime: undefined,
	valueLong: undefined,
	valueShort: undefined,
	valueString: undefined,
	valueZonedDateTime: undefined,
};

describe('PatchableRecord_BasicPatchFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_BasicPatchFromJSON(SimplePatch)).toStrictEqual(SimplePatch);
		expect(PatchableRecord_BasicPatchFromJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
	});
	test('remove-unknown', () => {
		expect(PatchableRecord_BasicPatchFromJSON(addFooProperty(SimplePatch))).toStrictEqual(SimplePatch);
		expect(PatchableRecord_BasicPatchFromJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(SimplePatchMinimal);
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'key');
		expect(() => PatchableRecord_BasicPatchFromJSON(withOut)).toThrow();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'version');
		expect(() => PatchableRecord_BasicPatchFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecord_BasicPatchFromJSON(invalidateProperty(SimplePatch, data))).toThrow();
		expect(() => PatchableRecord_BasicPatchFromJSON(invalidateProperty(SimplePatchMinimal, data))).toThrow();
	});
});
describe('isPatchableRecord_BasicPatch', () => {
	test('simple', () => {
		expect(isPatchableRecord_BasicPatch(SimplePatch)).toBeTruthy();
		expect(isPatchableRecord_BasicPatch(SimplePatchMinimal)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecord_BasicPatch(addFooProperty(SimplePatch))).toBeTruthy();
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'key');
		expect(isPatchableRecord_BasicPatch(withOut)).toBeFalsy();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'version');
		expect(isPatchableRecord_BasicPatch(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecord_BasicPatch(invalidateProperty(SimplePatch, data))).toBeFalsy();
		expect(isPatchableRecord_BasicPatch(invalidateProperty(SimplePatchMinimal, data))).toBeFalsy();
	});
});
describe('PatchableRecord_BasicPatchToJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_BasicPatchToJSON(SimplePatch)).toStrictEqual(SimplePatch);
		expect(PatchableRecord_BasicPatchToJSON(SimplePatch)).not.toBe(SimplePatch);

		expect(PatchableRecord_BasicPatchToJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecord_BasicPatchToJSON(SimplePatchMinimal)).not.toBe(SimplePatchMinimal);
	});
	test('additional props', () => {
		expect(PatchableRecord_BasicPatchToJSON(addFooProperty(SimplePatch))).toStrictEqual(SimplePatch);
		expect(PatchableRecord_BasicPatchToJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(SimplePatchMinimal);
	});
});
