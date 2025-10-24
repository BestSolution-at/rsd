import { describe, expect, test } from 'vitest';
import {
	isPatchableScalarRecord,
	isPatchableScalarRecordPatch,
	PatchableScalarRecord,
	PatchableScalarRecordFromJSON,
	PatchableScalarRecordPatch,
	PatchableScalarRecordPatchFromJSON,
	PatchableScalarRecordPatchToJSON,
	PatchableScalarRecordToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/PatchableScalarRecord.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: PatchableScalarRecord = {
	key: 'key',
	version: 'version',
	value: 'Europe/Vienna',
	value_Null: 'Europe/Vienna',
	value_Opt: 'Europe/Vienna',
	value_Opt_Null: 'Europe/Vienna',
	list: ['Europe/Vienna', 'Europe/Berlin'],
	list_Null: ['Europe/Vienna', 'Europe/Berlin'],
	list_Opt: ['Europe/Vienna', 'Europe/Berlin'],
	list_Opt_Null: ['Europe/Vienna', 'Europe/Berlin'],
};

const SimpleMinimal: PatchableScalarRecord = {
	key: 'key',
	version: 'version',
	value: 'Europe/Vienna',
	value_Null: 'Europe/Vienna',
	value_Opt: undefined,
	value_Opt_Null: undefined,
	list: ['Europe/Vienna', 'Europe/Berlin'],
	list_Null: ['Europe/Vienna', 'Europe/Berlin'],
	list_Opt: undefined,
	list_Opt_Null: undefined,
};

const SimpleNull: PatchableScalarRecord = {
	key: 'key',
	version: 'version',
	value: 'Europe/Vienna',
	value_Null: null,
	value_Opt: undefined,
	value_Opt_Null: null,
	list: ['Europe/Vienna', 'Europe/Berlin'],
	list_Null: null,
	list_Opt: undefined,
	list_Opt_Null: null,
};

describe('PatchableScalarRecordFromJSON', () => {
	test('simple', () => {
		expect(PatchableScalarRecordFromJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableScalarRecordFromJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(PatchableScalarRecordFromJSON(SimpleNull)).toStrictEqual(SimpleNull);
	});
	test('remove-unknown', () => {
		expect(PatchableScalarRecordFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => PatchableScalarRecordFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableScalarRecordFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => PatchableScalarRecordFromJSON(invalidateProperty(SimpleMinimal, data))).toThrow();
		expect(() => PatchableScalarRecordFromJSON(invalidateProperty(SimpleNull, data))).toThrow();
	});
	test.each(Object.keys(Simple).filter(p => p.includes('list')))('invalid prop $0', data => {
		expect(() => PatchableScalarRecordFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});

describe('isPatchableScalarRecord', () => {
	test('simple', () => {
		expect(isPatchableScalarRecord(Simple)).toBeTruthy();
		expect(isPatchableScalarRecord(SimpleMinimal)).toBeTruthy();
		expect(isPatchableScalarRecord(SimpleNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableScalarRecord(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isPatchableScalarRecord(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableScalarRecord(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isPatchableScalarRecord(invalidateProperty(SimpleMinimal, data))).toBeFalsy();
		expect(isPatchableScalarRecord(invalidateProperty(SimpleNull, data))).toBeFalsy();
	});
});

describe('PatchableScalarRecordToJSON', () => {
	test('simple', () => {
		expect(PatchableScalarRecordToJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableScalarRecordToJSON(Simple)).not.toBe(Simple);

		expect(PatchableScalarRecordToJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(PatchableScalarRecordToJSON(SimpleMinimal)).not.toBe(SimpleMinimal);

		expect(PatchableScalarRecordToJSON(SimpleNull)).toStrictEqual(SimpleNull);
		expect(PatchableScalarRecordToJSON(SimpleNull)).not.toBe(SimpleNull);
	});
	test('additional props', () => {
		expect(PatchableScalarRecordToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});

const SimplePatchReplace: PatchableScalarRecordPatch = {
	key: 'key',
	version: 'version',
	value: 'value',
	value_Null: 'value_Null',
	value_Opt: 'value_Opt',
	value_Opt_Null: 'calue_Opt_Null',
	list: {
		'@type': 'replace',
		elements: ['A'],
	},
	list_Null: {
		'@type': 'replace',
		elements: ['A'],
	},
	list_Opt: {
		'@type': 'replace',
		elements: ['A'],
	},
	list_Opt_Null: {
		'@type': 'replace',
		elements: ['A'],
	},
};

const SimplePatchMerge: PatchableScalarRecordPatch = {
	key: 'key',
	version: 'version',
	value: 'value',
	value_Null: 'value_Null',
	value_Opt: 'value_Opt',
	value_Opt_Null: 'calue_Opt_Null',
	list: {
		'@type': 'merge',
		additions: ['A'],
		removals: ['B'],
	},
	list_Null: {
		'@type': 'merge',
		additions: ['A'],
		removals: ['B'],
	},
	list_Opt: {
		'@type': 'merge',
		additions: ['A'],
		removals: ['B'],
	},
	list_Opt_Null: {
		'@type': 'merge',
		additions: ['A'],
		removals: ['B'],
	},
};

const SimplePatchMinimal: PatchableScalarRecordPatch = {
	key: 'key',
	version: 'version',
	value: undefined,
	value_Null: undefined,
	value_Opt: undefined,
	value_Opt_Null: undefined,
	list: undefined,
	list_Null: undefined,
	list_Opt: undefined,
	list_Opt_Null: undefined,
};

const SimplePatchNull: PatchableScalarRecordPatch = {
	key: 'key',
	version: 'version',
	value: undefined,
	value_Null: null,
	value_Opt: undefined,
	value_Opt_Null: null,
	list: undefined,
	list_Null: null,
	list_Opt: undefined,
	list_Opt_Null: null,
};

describe('PatchableScalarRecordPatchFromJSON', () => {
	test('simple', () => {
		expect(PatchableScalarRecordPatchFromJSON(SimplePatchReplace)).toStrictEqual(SimplePatchReplace);
		expect(PatchableScalarRecordPatchFromJSON(SimplePatchMerge)).toStrictEqual(SimplePatchMerge);
		expect(PatchableScalarRecordPatchFromJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableScalarRecordPatchFromJSON(SimplePatchNull)).toStrictEqual(SimplePatchNull);
	});
	test('remove-unknown', () => {
		expect(PatchableScalarRecordPatchFromJSON(addFooProperty(SimplePatchReplace))).toStrictEqual(SimplePatchReplace);
		expect(PatchableScalarRecordPatchFromJSON(addFooProperty(SimplePatchMerge))).toStrictEqual(SimplePatchMerge);
		expect(PatchableScalarRecordPatchFromJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(SimplePatchMinimal);
		expect(PatchableScalarRecordPatchFromJSON(addFooProperty(SimplePatchNull))).toStrictEqual(SimplePatchNull);
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'key');
		expect(() => PatchableScalarRecordPatchFromJSON(withOut)).toThrow();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'version');
		expect(() => PatchableScalarRecordPatchFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableScalarRecordPatchFromJSON(invalidateProperty(SimplePatchReplace, data))).toThrow();
		expect(() => PatchableScalarRecordPatchFromJSON(invalidateProperty(SimplePatchMerge, data))).toThrow();
		expect(() => PatchableScalarRecordPatchFromJSON(invalidateProperty(SimplePatchMinimal, data))).toThrow();
		expect(() => PatchableScalarRecordPatchFromJSON(invalidateProperty(SimplePatchNull, data))).toThrow();
	});
});
describe('isPatchableScalarRecordPatch', () => {
	test('simple', () => {
		expect(isPatchableScalarRecordPatch(SimplePatchReplace)).toBeTruthy();
		expect(isPatchableScalarRecordPatch(SimplePatchMerge)).toBeTruthy();
		expect(isPatchableScalarRecordPatch(SimplePatchMinimal)).toBeTruthy();
		expect(isPatchableScalarRecordPatch(SimplePatchNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableScalarRecordPatch(addFooProperty(SimplePatchReplace))).toBeTruthy();
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'key');
		expect(isPatchableScalarRecordPatch(withOut)).toBeFalsy();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'version');
		expect(isPatchableScalarRecordPatch(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableScalarRecordPatch(invalidateProperty(SimplePatchReplace, data))).toBeFalsy();
		expect(isPatchableScalarRecordPatch(invalidateProperty(SimplePatchMerge, data))).toBeFalsy();
		expect(isPatchableScalarRecordPatch(invalidateProperty(SimplePatchMinimal, data))).toBeFalsy();
		expect(isPatchableScalarRecordPatch(invalidateProperty(SimplePatchNull, data))).toBeFalsy();
	});
});
describe('PatchableScalarRecordPatchToJSON', () => {
	test('simple', () => {
		expect(PatchableScalarRecordPatchToJSON(SimplePatchReplace)).toStrictEqual(SimplePatchReplace);
		expect(PatchableScalarRecordPatchToJSON(SimplePatchReplace)).not.toBe(SimplePatchReplace);

		expect(PatchableScalarRecordPatchToJSON(SimplePatchMerge)).toStrictEqual(SimplePatchMerge);
		expect(PatchableScalarRecordPatchToJSON(SimplePatchMerge)).not.toBe(SimplePatchMerge);

		expect(PatchableScalarRecordPatchToJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableScalarRecordPatchToJSON(SimplePatchMinimal)).not.toBe(SimplePatchMinimal);
	});
	test('additional props', () => {
		expect(PatchableScalarRecordPatchToJSON(addFooProperty(SimplePatchReplace))).toStrictEqual(SimplePatchReplace);
		expect(PatchableScalarRecordPatchToJSON(addFooProperty(SimplePatchMerge))).toStrictEqual(SimplePatchMerge);
		expect(PatchableScalarRecordPatchToJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(SimplePatchMinimal);
	});
});
