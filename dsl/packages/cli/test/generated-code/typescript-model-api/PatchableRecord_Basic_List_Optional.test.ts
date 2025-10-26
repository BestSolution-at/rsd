import { describe, expect, test } from 'vitest';
import {
	isPatchableRecord_Basic_List_Optional,
	isPatchableRecord_Basic_List_OptionalPatch,
	PatchableRecord_Basic_List_Optional,
	PatchableRecord_Basic_List_OptionalFromJSON,
	PatchableRecord_Basic_List_OptionalPatch,
	PatchableRecord_Basic_List_OptionalPatchFromJSON,
	PatchableRecord_Basic_List_OptionalPatchToJSON,
	PatchableRecord_Basic_List_OptionalToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/PatchableRecord_Basic_List_Optional.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: PatchableRecord_Basic_List_Optional = {
	key: 'key',
	version: 'version',
	valueBoolean: [true, false],
	valueDouble: [1.1, 2.2],
	valueInt: [1, 2],
	valueLong: [1, 2],
	valueString: ['A', 'B'],
	valueFloat: [1.1, 2.2],
	valueLocalDate: ['2020-01-01', '2020-12-31'],
	valueLocalDateTime: ['2020-01-01T10:00:00', '2020-12-31T23:59:59'],
	valueShort: [1, 2],
	valueZonedDateTime: ['2020-01-01T10:00:00Z', '2020-12-31T23:59:59Z'],
};

const SimpleMinimal: PatchableRecord_Basic_List_Optional = {
	key: 'key',
	version: 'version',
	valueBoolean: undefined,
	valueDouble: undefined,
	valueInt: undefined,
	valueLong: undefined,
	valueString: undefined,
	valueFloat: undefined,
	valueLocalDate: undefined,
	valueLocalDateTime: undefined,
	valueShort: undefined,
	valueZonedDateTime: undefined,
};

describe('PatchableRecord_Basic_List_OptionalFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_List_OptionalFromJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableRecord_Basic_List_OptionalFromJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
	});
	test('remove-unknown', () => {
		expect(PatchableRecord_Basic_List_OptionalFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
		expect(PatchableRecord_Basic_List_OptionalFromJSON(addFooProperty(SimpleMinimal))).toStrictEqual(SimpleMinimal);
	});
	test.each(Object.keys(Simple).filter(v => v === 'key' || v === 'version'))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => PatchableRecord_Basic_List_OptionalFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecord_Basic_List_OptionalFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => PatchableRecord_Basic_List_OptionalFromJSON(invalidateProperty(SimpleMinimal, data))).toThrow();
	});
	test.each(Object.keys(Simple).filter(p => p !== 'key' && p !== 'version'))('invalid array prop $0', data => {
		expect(() => PatchableRecord_Basic_List_OptionalFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});

describe('isPatchableRecord_Basic_List_Optional', () => {
	test('simple', () => {
		expect(isPatchableRecord_Basic_List_Optional(Simple)).toBeTruthy();
		expect(isPatchableRecord_Basic_List_Optional(SimpleMinimal)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecord_Basic_List_Optional(addFooProperty(Simple))).toBeTruthy();
		expect(isPatchableRecord_Basic_List_Optional(addFooProperty(SimpleMinimal))).toBeTruthy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecord_Basic_List_Optional(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_List_Optional(invalidateProperty(SimpleMinimal, data))).toBeFalsy();
	});
});

describe('PatchableRecord_Basic_List_OptionalToJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_List_OptionalToJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableRecord_Basic_List_OptionalToJSON(Simple)).not.toBe(Simple);

		expect(PatchableRecord_Basic_List_OptionalToJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(PatchableRecord_Basic_List_OptionalToJSON(SimpleMinimal)).not.toBe(SimpleMinimal);
	});
	test('additional props', () => {
		expect(PatchableRecord_Basic_List_OptionalToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
		expect(PatchableRecord_Basic_List_OptionalToJSON(addFooProperty(SimpleMinimal))).toStrictEqual(SimpleMinimal);
	});
});

const SimplePatchReplace: PatchableRecord_Basic_List_OptionalPatch = {
	key: 'key',
	version: 'version',
	valueBoolean: {
		'@type': 'replace',
		elements: [true, false],
	},
	valueDouble: {
		'@type': 'replace',
		elements: [1.1, 2.2],
	},
	valueInt: {
		'@type': 'replace',
		elements: [1, 2],
	},
	valueLong: {
		'@type': 'replace',
		elements: [1, 2],
	},
	valueString: {
		'@type': 'replace',
		elements: ['A', 'B'],
	},
	valueFloat: {
		'@type': 'replace',
		elements: [1.1, 2.2],
	},
	valueLocalDate: {
		'@type': 'replace',
		elements: ['2020-01-01', '2020-12-31'],
	},
	valueLocalDateTime: {
		'@type': 'replace',
		elements: ['2020-01-01T10:00:00', '2020-12-31T23:59:59'],
	},
	valueShort: {
		'@type': 'replace',
		elements: [1, 2],
	},
	valueZonedDateTime: {
		'@type': 'replace',
		elements: ['2020-01-01T10:00:00Z', '2020-12-31T23:59:59Z'],
	},
};

const SimplePatchMerge: PatchableRecord_Basic_List_OptionalPatch = {
	key: 'key',
	version: 'version',
	valueBoolean: {
		'@type': 'merge',
		additions: [true],
		removals: [false],
	},
	valueDouble: {
		'@type': 'merge',
		additions: [1.1],
		removals: [2.2],
	},
	valueInt: {
		'@type': 'merge',
		additions: [1],
		removals: [2],
	},
	valueLong: {
		'@type': 'merge',
		additions: [1],
		removals: [2],
	},
	valueString: {
		'@type': 'merge',
		additions: ['A'],
		removals: ['B'],
	},
	valueFloat: {
		'@type': 'merge',
		additions: [1.1],
		removals: [2.2],
	},
	valueLocalDate: {
		'@type': 'merge',
		additions: ['2020-01-01'],
		removals: ['2020-12-31'],
	},
	valueLocalDateTime: {
		'@type': 'merge',
		additions: ['2020-01-01T10:00:00'],
		removals: ['2020-12-31T23:59:59'],
	},
	valueShort: {
		'@type': 'merge',
		additions: [1],
		removals: [2],
	},
	valueZonedDateTime: {
		'@type': 'merge',
		additions: ['2020-01-01T10:00:00Z'],
		removals: ['2020-12-31T23:59:59Z'],
	},
};

const SimplePatchMinimal: PatchableRecord_Basic_List_OptionalPatch = {
	key: 'key',
	version: 'version',
	valueBoolean: undefined,
	valueDouble: undefined,
	valueInt: undefined,
	valueLong: undefined,
	valueString: undefined,
	valueFloat: undefined,
	valueLocalDate: undefined,
	valueLocalDateTime: undefined,
	valueShort: undefined,
	valueZonedDateTime: undefined,
};

const SimplePatchNull: PatchableRecord_Basic_List_OptionalPatch = {
	key: 'key',
	version: 'version',
	valueBoolean: null,
	valueDouble: null,
	valueInt: null,
	valueLong: null,
	valueString: null,
	valueFloat: null,
	valueLocalDate: null,
	valueLocalDateTime: null,
	valueShort: null,
	valueZonedDateTime: null,
};

describe('PatchableRecord_Basic_List_OptionalPatchFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_List_OptionalPatchFromJSON(SimplePatchReplace)).toStrictEqual(SimplePatchReplace);
		expect(PatchableRecord_Basic_List_OptionalPatchFromJSON(SimplePatchMerge)).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecord_Basic_List_OptionalPatchFromJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecord_Basic_List_OptionalPatchFromJSON(SimplePatchNull)).toStrictEqual(SimplePatchNull);
	});
	test('remove-unknown', () => {
		expect(PatchableRecord_Basic_List_OptionalPatchFromJSON(addFooProperty(SimplePatchReplace))).toStrictEqual(
			SimplePatchReplace,
		);
		expect(PatchableRecord_Basic_List_OptionalPatchFromJSON(addFooProperty(SimplePatchMerge))).toStrictEqual(
			SimplePatchMerge,
		);
		expect(PatchableRecord_Basic_List_OptionalPatchFromJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(
			SimplePatchMinimal,
		);
		expect(PatchableRecord_Basic_List_OptionalPatchFromJSON(addFooProperty(SimplePatchNull))).toStrictEqual(
			SimplePatchNull,
		);
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'key');
		expect(() => PatchableRecord_Basic_List_OptionalPatchFromJSON(withOut)).toThrow();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'version');
		expect(() => PatchableRecord_Basic_List_OptionalPatchFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() =>
			PatchableRecord_Basic_List_OptionalPatchFromJSON(invalidateProperty(SimplePatchReplace, data)),
		).toThrow();
		expect(() =>
			PatchableRecord_Basic_List_OptionalPatchFromJSON(invalidateProperty(SimplePatchMerge, data)),
		).toThrow();
		expect(() =>
			PatchableRecord_Basic_List_OptionalPatchFromJSON(invalidateProperty(SimplePatchMinimal, data)),
		).toThrow();
		expect(() => PatchableRecord_Basic_List_OptionalPatchFromJSON(invalidateProperty(SimplePatchNull, data))).toThrow();
	});
});
describe('isPatchableRecord_Basic_List_OptionalPatch', () => {
	test('simple', () => {
		expect(isPatchableRecord_Basic_List_OptionalPatch(SimplePatchReplace)).toBeTruthy();
		expect(isPatchableRecord_Basic_List_OptionalPatch(SimplePatchMerge)).toBeTruthy();
		expect(isPatchableRecord_Basic_List_OptionalPatch(SimplePatchMinimal)).toBeTruthy();
		expect(isPatchableRecord_Basic_List_OptionalPatch(SimplePatchNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecord_Basic_List_OptionalPatch(addFooProperty(SimplePatchReplace))).toBeTruthy();
		expect(isPatchableRecord_Basic_List_OptionalPatch(addFooProperty(SimplePatchMerge))).toBeTruthy();
		expect(isPatchableRecord_Basic_List_OptionalPatch(addFooProperty(SimplePatchMinimal))).toBeTruthy();
		expect(isPatchableRecord_Basic_List_OptionalPatch(addFooProperty(SimplePatchNull))).toBeTruthy();
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'key');
		expect(isPatchableRecord_Basic_List_OptionalPatch(withOut)).toBeFalsy();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'version');
		expect(isPatchableRecord_Basic_List_OptionalPatch(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecord_Basic_List_OptionalPatch(invalidateProperty(SimplePatchReplace, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_List_OptionalPatch(invalidateProperty(SimplePatchMerge, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_List_OptionalPatch(invalidateProperty(SimplePatchMinimal, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_List_OptionalPatch(invalidateProperty(SimplePatchNull, data))).toBeFalsy();
	});
});
describe('PatchableRecord_Basic_List_OptionalPatchToJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_List_OptionalPatchToJSON(SimplePatchReplace)).toStrictEqual(SimplePatchReplace);
		expect(PatchableRecord_Basic_List_OptionalPatchToJSON(SimplePatchReplace)).not.toBe(SimplePatchReplace);

		expect(PatchableRecord_Basic_List_OptionalPatchToJSON(SimplePatchMerge)).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecord_Basic_List_OptionalPatchToJSON(SimplePatchMerge)).not.toBe(SimplePatchMerge);

		expect(PatchableRecord_Basic_List_OptionalPatchToJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecord_Basic_List_OptionalPatchToJSON(SimplePatchMinimal)).not.toBe(SimplePatchMinimal);

		expect(PatchableRecord_Basic_List_OptionalPatchToJSON(SimplePatchNull)).toStrictEqual(SimplePatchNull);
		expect(PatchableRecord_Basic_List_OptionalPatchToJSON(SimplePatchNull)).not.toBe(SimplePatchNull);
	});
	test('additional props', () => {
		expect(PatchableRecord_Basic_List_OptionalPatchToJSON(addFooProperty(SimplePatchReplace))).toStrictEqual(
			SimplePatchReplace,
		);
		expect(PatchableRecord_Basic_List_OptionalPatchToJSON(addFooProperty(SimplePatchMerge))).toStrictEqual(
			SimplePatchMerge,
		);
		expect(PatchableRecord_Basic_List_OptionalPatchToJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(
			SimplePatchMinimal,
		);
		expect(PatchableRecord_Basic_List_OptionalPatchToJSON(addFooProperty(SimplePatchNull))).toStrictEqual(
			SimplePatchNull,
		);
	});
});
