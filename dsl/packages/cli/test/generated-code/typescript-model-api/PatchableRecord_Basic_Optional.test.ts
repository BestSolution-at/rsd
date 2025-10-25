import { describe, expect, test } from 'vitest';
import {
	isPatchableRecord_Basic_Optional,
	isPatchableRecord_Basic_OptionalPatch,
	PatchableRecord_Basic_Optional,
	PatchableRecord_Basic_OptionalFromJSON,
	PatchableRecord_Basic_OptionalPatch,
	PatchableRecord_Basic_OptionalPatchFromJSON,
	PatchableRecord_Basic_OptionalPatchToJSON,
	PatchableRecord_Basic_OptionalToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/PatchableRecord_Basic_Optional.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: PatchableRecord_Basic_Optional = {
	key: 'key',
	version: 'version',
	valueBoolean: true,
	valueShort: 1,
	valueInt: 1,
	valueLong: 1,
	valueFloat: 1.1,
	valueDouble: 1.1,
	valueString: 'value',
	valueLocalDate: '2024-01-01',
	valueLocalDateTime: '2024-01-01T12:00:00',
	valueZonedDateTime: '2024-01-01T12:00:00Z',
};

const SimpleMinimal: PatchableRecord_Basic_Optional = {
	key: 'key',
	version: 'version',
	valueBoolean: undefined,
	valueShort: undefined,
	valueInt: undefined,
	valueLong: undefined,
	valueFloat: undefined,
	valueDouble: undefined,
	valueString: undefined,
	valueLocalDate: undefined,
	valueLocalDateTime: undefined,
	valueZonedDateTime: undefined,
};

describe('PatchableRecord_Basic_OptionalFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_OptionalFromJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableRecord_Basic_OptionalFromJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
	});
	test('remove-unknown', () => {
		expect(PatchableRecord_Basic_OptionalFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecord_Basic_OptionalFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => PatchableRecord_Basic_OptionalFromJSON(invalidateProperty(SimpleMinimal, data))).toThrow();
	});
	test.each(Object.keys(Simple).filter(p => p.includes('list')))('invalid prop $0', data => {
		expect(() => PatchableRecord_Basic_OptionalFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});

describe('isPatchableRecord_Basic_Optional', () => {
	test('simple', () => {
		expect(isPatchableRecord_Basic_Optional(Simple)).toBeTruthy();
		expect(isPatchableRecord_Basic_Optional(SimpleMinimal)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecord_Basic_Optional(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecord_Basic_Optional(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_Optional(invalidateProperty(SimpleMinimal, data))).toBeFalsy();
	});
});

describe('PatchableRecord_Basic_OptionalToJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_OptionalToJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableRecord_Basic_OptionalToJSON(Simple)).not.toBe(Simple);

		expect(PatchableRecord_Basic_OptionalToJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(PatchableRecord_Basic_OptionalToJSON(SimpleMinimal)).not.toBe(SimpleMinimal);
	});
	test('additional props', () => {
		expect(PatchableRecord_Basic_OptionalToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});

const SimplePatch: PatchableRecord_Basic_OptionalPatch = {
	key: 'key',
	version: 'version',
	valueBoolean: true,
	valueShort: 1,
	valueInt: 1,
	valueLong: 1,
	valueFloat: 1.1,
	valueDouble: 1.1,
	valueString: 'value',
	valueLocalDate: '2024-01-01',
	valueLocalDateTime: '2024-01-01T12:00:00',
	valueZonedDateTime: '2024-01-01T12:00:00Z',
};

const SimplePatchMinimal: PatchableRecord_Basic_OptionalPatch = {
	key: 'key',
	version: 'version',
	valueBoolean: undefined,
	valueShort: undefined,
	valueInt: undefined,
	valueLong: undefined,
	valueFloat: undefined,
	valueDouble: undefined,
	valueString: undefined,
	valueLocalDate: undefined,
	valueLocalDateTime: undefined,
	valueZonedDateTime: undefined,
};

const SimplePatchNull: PatchableRecord_Basic_OptionalPatch = {
	key: 'key',
	version: 'version',
	valueBoolean: null,
	valueShort: null,
	valueInt: null,
	valueLong: null,
	valueFloat: null,
	valueDouble: null,
	valueString: null,
	valueLocalDate: null,
	valueLocalDateTime: null,
	valueZonedDateTime: null,
};

describe('PatchableRecord_Basic_OptionalPatchFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_OptionalPatchFromJSON(SimplePatch)).toStrictEqual(SimplePatch);
		expect(PatchableRecord_Basic_OptionalPatchFromJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecord_Basic_OptionalPatchFromJSON(SimplePatchNull)).toStrictEqual(SimplePatchNull);
	});
	test('remove-unknown', () => {
		expect(PatchableRecord_Basic_OptionalPatchFromJSON(addFooProperty(SimplePatch))).toStrictEqual(SimplePatch);
		expect(PatchableRecord_Basic_OptionalPatchFromJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(
			SimplePatchMinimal,
		);
		expect(PatchableRecord_Basic_OptionalPatchFromJSON(addFooProperty(SimplePatchNull))).toStrictEqual(SimplePatchNull);
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'key');
		expect(() => PatchableRecord_Basic_OptionalPatchFromJSON(withOut)).toThrow();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'version');
		expect(() => PatchableRecord_Basic_OptionalPatchFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecord_Basic_OptionalPatchFromJSON(invalidateProperty(SimplePatch, data))).toThrow();
		expect(() => PatchableRecord_Basic_OptionalPatchFromJSON(invalidateProperty(SimplePatchMinimal, data))).toThrow();
		expect(() => PatchableRecord_Basic_OptionalPatchFromJSON(invalidateProperty(SimplePatchNull, data))).toThrow();
	});
});
describe('isPatchableRecord_Basic_OptionalPatch', () => {
	test('simple', () => {
		expect(isPatchableRecord_Basic_OptionalPatch(SimplePatch)).toBeTruthy();
		expect(isPatchableRecord_Basic_OptionalPatch(SimplePatchMinimal)).toBeTruthy();
		expect(isPatchableRecord_Basic_OptionalPatch(SimplePatchNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecord_Basic_OptionalPatch(addFooProperty(SimplePatch))).toBeTruthy();
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'key');
		expect(isPatchableRecord_Basic_OptionalPatch(withOut)).toBeFalsy();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'version');
		expect(isPatchableRecord_Basic_OptionalPatch(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecord_Basic_OptionalPatch(invalidateProperty(SimplePatch, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_OptionalPatch(invalidateProperty(SimplePatchMinimal, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_OptionalPatch(invalidateProperty(SimplePatchNull, data))).toBeFalsy();
	});
});
describe('PatchableRecord_Basic_OptionalPatchToJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_OptionalPatchToJSON(SimplePatch)).toStrictEqual(SimplePatch);
		expect(PatchableRecord_Basic_OptionalPatchToJSON(SimplePatch)).not.toBe(SimplePatch);

		expect(PatchableRecord_Basic_OptionalPatchToJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecord_Basic_OptionalPatchToJSON(SimplePatchMinimal)).not.toBe(SimplePatchMinimal);

		expect(PatchableRecord_Basic_OptionalPatchToJSON(SimplePatchNull)).toStrictEqual(SimplePatchNull);
		expect(PatchableRecord_Basic_OptionalPatchToJSON(SimplePatchNull)).not.toBe(SimplePatchNull);
	});
	test('additional props', () => {
		expect(PatchableRecord_Basic_OptionalPatchToJSON(addFooProperty(SimplePatch))).toStrictEqual(SimplePatch);
		expect(PatchableRecord_Basic_OptionalPatchToJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(
			SimplePatchMinimal,
		);
		expect(PatchableRecord_Basic_OptionalPatchToJSON(addFooProperty(SimplePatchNull))).toStrictEqual(SimplePatchNull);
	});
});
