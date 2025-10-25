import { describe, expect, test } from 'vitest';
import {
	isPatchableRecord_Basic_Optional_Null,
	isPatchableRecord_Basic_Optional_NullPatch,
	PatchableRecord_Basic_Optional_Null,
	PatchableRecord_Basic_Optional_NullFromJSON,
	PatchableRecord_Basic_Optional_NullPatch,
	PatchableRecord_Basic_Optional_NullPatchFromJSON,
	PatchableRecord_Basic_Optional_NullPatchToJSON,
	PatchableRecord_Basic_Optional_NullToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/PatchableRecord_Basic_Optional_Null.js';
import { addFooProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: PatchableRecord_Basic_Optional_Null = {
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

const SimpleMinimal: PatchableRecord_Basic_Optional_Null = {
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

const SimpleNull: PatchableRecord_Basic_Optional_Null = {
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

describe('PatchableRecord_Basic_Optional_NullFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_Optional_NullFromJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableRecord_Basic_Optional_NullFromJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(PatchableRecord_Basic_Optional_NullFromJSON(SimpleNull)).toStrictEqual(SimpleNull);
	});
	test('remove-unknown', () => {
		expect(PatchableRecord_Basic_Optional_NullFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecord_Basic_Optional_NullFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => PatchableRecord_Basic_Optional_NullFromJSON(invalidateProperty(SimpleMinimal, data))).toThrow();
		expect(() => PatchableRecord_Basic_Optional_NullFromJSON(invalidateProperty(SimpleNull, data))).toThrow();
	});
});

describe('isPatchableRecord_Basic_Optional_Null', () => {
	test('simple', () => {
		expect(isPatchableRecord_Basic_Optional_Null(Simple)).toBeTruthy();
		expect(isPatchableRecord_Basic_Optional_Null(SimpleMinimal)).toBeTruthy();
		expect(isPatchableRecord_Basic_Optional_Null(SimpleNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecord_Basic_Optional_Null(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecord_Basic_Optional_Null(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_Optional_Null(invalidateProperty(SimpleMinimal, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_Optional_Null(invalidateProperty(SimpleNull, data))).toBeFalsy();
	});
});

describe('PatchableRecord_Basic_Optional_NullToJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_Optional_NullToJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableRecord_Basic_Optional_NullToJSON(Simple)).not.toBe(Simple);

		expect(PatchableRecord_Basic_Optional_NullToJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(PatchableRecord_Basic_Optional_NullToJSON(SimpleMinimal)).not.toBe(SimpleMinimal);

		expect(PatchableRecord_Basic_Optional_NullToJSON(SimpleNull)).toStrictEqual(SimpleNull);
		expect(PatchableRecord_Basic_Optional_NullToJSON(SimpleNull)).not.toBe(SimpleNull);
	});
	test('additional props', () => {
		expect(PatchableRecord_Basic_Optional_NullToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
		expect(PatchableRecord_Basic_Optional_NullToJSON(addFooProperty(SimpleMinimal))).toStrictEqual(SimpleMinimal);
		expect(PatchableRecord_Basic_Optional_NullToJSON(addFooProperty(SimpleNull))).toStrictEqual(SimpleNull);
	});
});

const SimplePatch: PatchableRecord_Basic_Optional_NullPatch = {
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

const SimplePatchMinimal: PatchableRecord_Basic_Optional_NullPatch = {
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

const SimplePatchNull: PatchableRecord_Basic_Optional_NullPatch = {
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

describe('PatchableRecord_Basic_Optional_NullPatchFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_Optional_NullPatchFromJSON(SimplePatch)).toStrictEqual(SimplePatch);
		expect(PatchableRecord_Basic_Optional_NullPatchFromJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecord_Basic_Optional_NullPatchFromJSON(SimplePatchNull)).toStrictEqual(SimplePatchNull);
	});
	test('remove-unknown', () => {
		expect(PatchableRecord_Basic_Optional_NullPatchFromJSON(addFooProperty(SimplePatch))).toStrictEqual(SimplePatch);
		expect(PatchableRecord_Basic_Optional_NullPatchFromJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(
			SimplePatchMinimal,
		);
		expect(PatchableRecord_Basic_Optional_NullPatchFromJSON(addFooProperty(SimplePatchNull))).toStrictEqual(
			SimplePatchNull,
		);
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'key');
		expect(() => PatchableRecord_Basic_Optional_NullPatchFromJSON(withOut)).toThrow();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'version');
		expect(() => PatchableRecord_Basic_Optional_NullPatchFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecord_Basic_Optional_NullPatchFromJSON(invalidateProperty(SimplePatch, data))).toThrow();
		expect(() =>
			PatchableRecord_Basic_Optional_NullPatchFromJSON(invalidateProperty(SimplePatchMinimal, data)),
		).toThrow();
		expect(() => PatchableRecord_Basic_Optional_NullPatchFromJSON(invalidateProperty(SimplePatchNull, data))).toThrow();
	});
});
describe('isPatchableRecord_Basic_Optional_NullPatch', () => {
	test('simple', () => {
		expect(isPatchableRecord_Basic_Optional_NullPatch(SimplePatch)).toBeTruthy();
		expect(isPatchableRecord_Basic_Optional_NullPatch(SimplePatchMinimal)).toBeTruthy();
		expect(isPatchableRecord_Basic_Optional_NullPatch(SimplePatchNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecord_Basic_Optional_NullPatch(addFooProperty(SimplePatch))).toBeTruthy();
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'key');
		expect(isPatchableRecord_Basic_Optional_NullPatch(withOut)).toBeFalsy();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatch, 'version');
		expect(isPatchableRecord_Basic_Optional_NullPatch(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecord_Basic_Optional_NullPatch(invalidateProperty(SimplePatch, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_Optional_NullPatch(invalidateProperty(SimplePatchMinimal, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_Optional_NullPatch(invalidateProperty(SimplePatchNull, data))).toBeFalsy();
	});
});
describe('PatchableRecord_Basic_Optional_NullPatchToJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_Optional_NullPatchToJSON(SimplePatch)).toStrictEqual(SimplePatch);
		expect(PatchableRecord_Basic_Optional_NullPatchToJSON(SimplePatch)).not.toBe(SimplePatch);

		expect(PatchableRecord_Basic_Optional_NullPatchToJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecord_Basic_Optional_NullPatchToJSON(SimplePatchMinimal)).not.toBe(SimplePatchMinimal);

		expect(PatchableRecord_Basic_Optional_NullPatchToJSON(SimplePatchNull)).toStrictEqual(SimplePatchNull);
		expect(PatchableRecord_Basic_Optional_NullPatchToJSON(SimplePatchNull)).not.toBe(SimplePatchNull);
	});
	test('additional props', () => {
		expect(PatchableRecord_Basic_Optional_NullPatchToJSON(addFooProperty(SimplePatch))).toStrictEqual(SimplePatch);
		expect(PatchableRecord_Basic_Optional_NullPatchToJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(
			SimplePatchMinimal,
		);
		expect(PatchableRecord_Basic_Optional_NullPatchToJSON(addFooProperty(SimplePatchNull))).toStrictEqual(
			SimplePatchNull,
		);
	});
});
