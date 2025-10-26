import { describe, expect, test } from 'vitest';
import {
	isPatchableRecord_Basic_List_Null,
	isPatchableRecord_Basic_List_NullPatch,
	PatchableRecord_Basic_List_Null,
	PatchableRecord_Basic_List_NullFromJSON,
	PatchableRecord_Basic_List_NullPatch,
	PatchableRecord_Basic_List_NullPatchFromJSON,
	PatchableRecord_Basic_List_NullPatchToJSON,
	PatchableRecord_Basic_List_NullToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/PatchableRecord_Basic_List_Null.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: PatchableRecord_Basic_List_Null = {
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

const SimpleNull: PatchableRecord_Basic_List_Null = {
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

describe('PatchableRecord_Basic_List_NullFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_List_NullFromJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableRecord_Basic_List_NullFromJSON(SimpleNull)).toStrictEqual(SimpleNull);
	});
	test('remove-unknown', () => {
		expect(PatchableRecord_Basic_List_NullFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
		expect(PatchableRecord_Basic_List_NullFromJSON(addFooProperty(SimpleNull))).toStrictEqual(SimpleNull);
	});
	test.each(Object.keys(Simple).filter(v => v === 'key' || v === 'version'))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => PatchableRecord_Basic_List_NullFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecord_Basic_List_NullFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => PatchableRecord_Basic_List_NullFromJSON(invalidateProperty(SimpleNull, data))).toThrow();
	});
	test.each(Object.keys(Simple).filter(p => p !== 'key' && p !== 'version'))('invalid array prop $0', data => {
		expect(() => PatchableRecord_Basic_List_NullFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});

describe('isPatchableRecord_Basic_List_Null', () => {
	test('simple', () => {
		expect(isPatchableRecord_Basic_List_Null(Simple)).toBeTruthy();
		expect(isPatchableRecord_Basic_List_Null(SimpleNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecord_Basic_List_Null(addFooProperty(Simple))).toBeTruthy();
		expect(isPatchableRecord_Basic_List_Null(addFooProperty(SimpleNull))).toBeTruthy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecord_Basic_List_Null(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_List_Null(invalidateProperty(SimpleNull, data))).toBeFalsy();
	});
});

describe('PatchableRecord_Basic_List_NullToJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_List_NullToJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableRecord_Basic_List_NullToJSON(Simple)).not.toBe(Simple);

		expect(PatchableRecord_Basic_List_NullToJSON(SimpleNull)).toStrictEqual(SimpleNull);
		expect(PatchableRecord_Basic_List_NullToJSON(SimpleNull)).not.toBe(SimpleNull);
	});
	test('additional props', () => {
		expect(PatchableRecord_Basic_List_NullToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
		expect(PatchableRecord_Basic_List_NullToJSON(addFooProperty(SimpleNull))).toStrictEqual(SimpleNull);
	});
});

const SimplePatchReplace: PatchableRecord_Basic_List_NullPatch = {
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

const SimplePatchMerge: PatchableRecord_Basic_List_NullPatch = {
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

const SimplePatchMinimal: PatchableRecord_Basic_List_NullPatch = {
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

const SimplePatchNull: PatchableRecord_Basic_List_NullPatch = {
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

describe('PatchableRecord_Basic_List_NullPatchFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_List_NullPatchFromJSON(SimplePatchReplace)).toStrictEqual(SimplePatchReplace);
		expect(PatchableRecord_Basic_List_NullPatchFromJSON(SimplePatchMerge)).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecord_Basic_List_NullPatchFromJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecord_Basic_List_NullPatchFromJSON(SimplePatchNull)).toStrictEqual(SimplePatchNull);
	});
	test('remove-unknown', () => {
		expect(PatchableRecord_Basic_List_NullPatchFromJSON(addFooProperty(SimplePatchReplace))).toStrictEqual(
			SimplePatchReplace,
		);
		expect(PatchableRecord_Basic_List_NullPatchFromJSON(addFooProperty(SimplePatchMerge))).toStrictEqual(
			SimplePatchMerge,
		);
		expect(PatchableRecord_Basic_List_NullPatchFromJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(
			SimplePatchMinimal,
		);
		expect(PatchableRecord_Basic_List_NullPatchFromJSON(addFooProperty(SimplePatchNull))).toStrictEqual(
			SimplePatchNull,
		);
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'key');
		expect(() => PatchableRecord_Basic_List_NullPatchFromJSON(withOut)).toThrow();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'version');
		expect(() => PatchableRecord_Basic_List_NullPatchFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecord_Basic_List_NullPatchFromJSON(invalidateProperty(SimplePatchReplace, data))).toThrow();
		expect(() => PatchableRecord_Basic_List_NullPatchFromJSON(invalidateProperty(SimplePatchMerge, data))).toThrow();
		expect(() => PatchableRecord_Basic_List_NullPatchFromJSON(invalidateProperty(SimplePatchMinimal, data))).toThrow();
		expect(() => PatchableRecord_Basic_List_NullPatchFromJSON(invalidateProperty(SimplePatchNull, data))).toThrow();
	});
});
describe('isPatchableRecord_Basic_List_NullPatch', () => {
	test('simple', () => {
		expect(isPatchableRecord_Basic_List_NullPatch(SimplePatchReplace)).toBeTruthy();
		expect(isPatchableRecord_Basic_List_NullPatch(SimplePatchMerge)).toBeTruthy();
		expect(isPatchableRecord_Basic_List_NullPatch(SimplePatchMinimal)).toBeTruthy();
		expect(isPatchableRecord_Basic_List_NullPatch(SimplePatchNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecord_Basic_List_NullPatch(addFooProperty(SimplePatchReplace))).toBeTruthy();
		expect(isPatchableRecord_Basic_List_NullPatch(addFooProperty(SimplePatchMerge))).toBeTruthy();
		expect(isPatchableRecord_Basic_List_NullPatch(addFooProperty(SimplePatchMinimal))).toBeTruthy();
		expect(isPatchableRecord_Basic_List_NullPatch(addFooProperty(SimplePatchNull))).toBeTruthy();
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'key');
		expect(isPatchableRecord_Basic_List_NullPatch(withOut)).toBeFalsy();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'version');
		expect(isPatchableRecord_Basic_List_NullPatch(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecord_Basic_List_NullPatch(invalidateProperty(SimplePatchReplace, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_List_NullPatch(invalidateProperty(SimplePatchMerge, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_List_NullPatch(invalidateProperty(SimplePatchMinimal, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_List_NullPatch(invalidateProperty(SimplePatchNull, data))).toBeFalsy();
	});
});
describe('PatchableRecord_Basic_List_NullPatchToJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_List_NullPatchToJSON(SimplePatchReplace)).toStrictEqual(SimplePatchReplace);
		expect(PatchableRecord_Basic_List_NullPatchToJSON(SimplePatchReplace)).not.toBe(SimplePatchReplace);

		expect(PatchableRecord_Basic_List_NullPatchToJSON(SimplePatchMerge)).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecord_Basic_List_NullPatchToJSON(SimplePatchMerge)).not.toBe(SimplePatchMerge);

		expect(PatchableRecord_Basic_List_NullPatchToJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecord_Basic_List_NullPatchToJSON(SimplePatchMinimal)).not.toBe(SimplePatchMinimal);

		expect(PatchableRecord_Basic_List_NullPatchToJSON(SimplePatchNull)).toStrictEqual(SimplePatchNull);
		expect(PatchableRecord_Basic_List_NullPatchToJSON(SimplePatchNull)).not.toBe(SimplePatchNull);
	});
	test('additional props', () => {
		expect(PatchableRecord_Basic_List_NullPatchToJSON(addFooProperty(SimplePatchReplace))).toStrictEqual(
			SimplePatchReplace,
		);
		expect(PatchableRecord_Basic_List_NullPatchToJSON(addFooProperty(SimplePatchMerge))).toStrictEqual(
			SimplePatchMerge,
		);
		expect(PatchableRecord_Basic_List_NullPatchToJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(
			SimplePatchMinimal,
		);
		expect(PatchableRecord_Basic_List_NullPatchToJSON(addFooProperty(SimplePatchNull))).toStrictEqual(SimplePatchNull);
	});
});
