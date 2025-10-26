import { describe, expect, test } from 'vitest';
import {
	isPatchableRecord_Basic_List,
	isPatchableRecord_Basic_ListPatch,
	PatchableRecord_Basic_List,
	PatchableRecord_Basic_ListFromJSON,
	PatchableRecord_Basic_ListPatch,
	PatchableRecord_Basic_ListPatchFromJSON,
	PatchableRecord_Basic_ListPatchToJSON,
	PatchableRecord_Basic_ListToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/PatchableRecord_Basic_List.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: PatchableRecord_Basic_List = {
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

describe('PatchableRecord_Basic_ListFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_ListFromJSON(Simple)).toStrictEqual(Simple);
	});
	test('remove-unknown', () => {
		expect(PatchableRecord_Basic_ListFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => PatchableRecord_Basic_ListFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecord_Basic_ListFromJSON(invalidateProperty(Simple, data))).toThrow();
	});
	test.each(Object.keys(Simple).filter(p => p !== 'key' && p !== 'version'))('invalid prop $0', data => {
		expect(() => PatchableRecord_Basic_ListFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});

describe('isPatchableRecord_Basic_List', () => {
	test('simple', () => {
		expect(isPatchableRecord_Basic_List(Simple)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecord_Basic_List(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isPatchableRecord_Basic_List(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecord_Basic_List(invalidateProperty(Simple, data))).toBeFalsy();
	});
});

describe('PatchableRecord_Basic_ListToJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_ListToJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableRecord_Basic_ListToJSON(Simple)).not.toBe(Simple);
	});
	test('additional props', () => {
		expect(PatchableRecord_Basic_ListToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});

const SimplePatchReplace: PatchableRecord_Basic_ListPatch = {
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

const SimplePatchMerge: PatchableRecord_Basic_ListPatch = {
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

const SimplePatchMinimal: PatchableRecord_Basic_ListPatch = {
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

describe('PatchableRecord_Basic_ListPatchFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_ListPatchFromJSON(SimplePatchReplace)).toStrictEqual(SimplePatchReplace);
		expect(PatchableRecord_Basic_ListPatchFromJSON(SimplePatchMerge)).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecord_Basic_ListPatchFromJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
	});
	test('remove-unknown', () => {
		expect(PatchableRecord_Basic_ListPatchFromJSON(addFooProperty(SimplePatchReplace))).toStrictEqual(
			SimplePatchReplace,
		);
		expect(PatchableRecord_Basic_ListPatchFromJSON(addFooProperty(SimplePatchMerge))).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecord_Basic_ListPatchFromJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(
			SimplePatchMinimal,
		);
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'key');
		expect(() => PatchableRecord_Basic_ListPatchFromJSON(withOut)).toThrow();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'version');
		expect(() => PatchableRecord_Basic_ListPatchFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecord_Basic_ListPatchFromJSON(invalidateProperty(SimplePatchReplace, data))).toThrow();
		expect(() => PatchableRecord_Basic_ListPatchFromJSON(invalidateProperty(SimplePatchMerge, data))).toThrow();
		expect(() => PatchableRecord_Basic_ListPatchFromJSON(invalidateProperty(SimplePatchMinimal, data))).toThrow();
	});
});
describe('isPatchableRecord_Basic_ListPatch', () => {
	test('simple', () => {
		expect(isPatchableRecord_Basic_ListPatch(SimplePatchReplace)).toBeTruthy();
		expect(isPatchableRecord_Basic_ListPatch(SimplePatchMerge)).toBeTruthy();
		expect(isPatchableRecord_Basic_ListPatch(SimplePatchMinimal)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecord_Basic_ListPatch(addFooProperty(SimplePatchReplace))).toBeTruthy();
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'key');
		expect(isPatchableRecord_Basic_ListPatch(withOut)).toBeFalsy();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'version');
		expect(isPatchableRecord_Basic_ListPatch(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecord_Basic_ListPatch(invalidateProperty(SimplePatchReplace, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_ListPatch(invalidateProperty(SimplePatchMerge, data))).toBeFalsy();
		expect(isPatchableRecord_Basic_ListPatch(invalidateProperty(SimplePatchMinimal, data))).toBeFalsy();
	});
});
describe('PatchableRecord_Basic_ListPatchToJSON', () => {
	test('simple', () => {
		expect(PatchableRecord_Basic_ListPatchToJSON(SimplePatchReplace)).toStrictEqual(SimplePatchReplace);
		expect(PatchableRecord_Basic_ListPatchToJSON(SimplePatchReplace)).not.toBe(SimplePatchReplace);

		expect(PatchableRecord_Basic_ListPatchToJSON(SimplePatchMerge)).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecord_Basic_ListPatchToJSON(SimplePatchMerge)).not.toBe(SimplePatchMerge);

		expect(PatchableRecord_Basic_ListPatchToJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecord_Basic_ListPatchToJSON(SimplePatchMinimal)).not.toBe(SimplePatchMinimal);
	});
	test('additional props', () => {
		expect(PatchableRecord_Basic_ListPatchToJSON(addFooProperty(SimplePatchReplace))).toStrictEqual(SimplePatchReplace);
		expect(PatchableRecord_Basic_ListPatchToJSON(addFooProperty(SimplePatchMerge))).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecord_Basic_ListPatchToJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(SimplePatchMinimal);
	});
});
