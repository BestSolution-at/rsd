import { describe, expect, test } from 'vitest';
import {
	isPatchableRecordWithUnion,
	isPatchableRecordWithUnionPatch,
	PatchableRecordWithUnion,
	PatchableRecordWithUnionFromJSON,
	PatchableRecordWithUnionPatch,
	PatchableRecordWithUnionPatchFromJSON,
	PatchableRecordWithUnionPatchToJSON,
	PatchableRecordWithUnionToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/PatchableRecordWithUnion.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: PatchableRecordWithUnion = {
	key: 'key',
	version: 'version',
	value: { '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' },
	value_Null: { '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' },
	value_Opt: { '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' },
	value_Opt_Null: { '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' },
	list: [
		{ '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' },
		{ '@type': 'union-b', key: 'key', version: 'version', shared: 'shared', valueB: 'value-b' },
	],
	list_Null: [
		{ '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' },
		{ '@type': 'union-b', key: 'key', version: 'version', shared: 'shared', valueB: 'value-b' },
	],
	list_Opt: [
		{ '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' },
		{ '@type': 'union-b', key: 'key', version: 'version', shared: 'shared', valueB: 'value-b' },
	],
	list_Opt_Null: [
		{ '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' },
		{ '@type': 'union-b', key: 'key', version: 'version', shared: 'shared', valueB: 'value-b' },
	],
};

const SimpleMinimal: PatchableRecordWithUnion = {
	key: 'key',
	version: 'version',
	value: { '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' },
	value_Null: { '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' },
	value_Opt: undefined,
	value_Opt_Null: undefined,
	list: [
		{ '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' },
		{ '@type': 'union-b', key: 'key', version: 'version', shared: 'shared', valueB: 'value-b' },
	],
	list_Null: [
		{ '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' },
		{ '@type': 'union-b', key: 'key', version: 'version', shared: 'shared', valueB: 'value-b' },
	],
	list_Opt: undefined,
	list_Opt_Null: undefined,
};

const SimpleNull: PatchableRecordWithUnion = {
	key: 'key',
	version: 'version',
	value: { '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' },
	value_Null: null,
	value_Opt: undefined,
	value_Opt_Null: null,
	list: [
		{ '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' },
		{ '@type': 'union-b', key: 'key', version: 'version', shared: 'shared', valueB: 'value-b' },
	],
	list_Null: null,
	list_Opt: undefined,
	list_Opt_Null: null,
};

describe('PatchableScalarRecordFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecordWithUnionFromJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableRecordWithUnionFromJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(PatchableRecordWithUnionFromJSON(SimpleNull)).toStrictEqual(SimpleNull);
	});
	test('remove-unknown', () => {
		expect(PatchableRecordWithUnionFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => PatchableRecordWithUnionFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecordWithUnionFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => PatchableRecordWithUnionFromJSON(invalidateProperty(SimpleMinimal, data))).toThrow();
		expect(() => PatchableRecordWithUnionFromJSON(invalidateProperty(SimpleNull, data))).toThrow();
	});
	test.each(Object.keys(Simple).filter(p => p.includes('list')))('invalid prop $0', data => {
		expect(() => PatchableRecordWithUnionFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});

describe('isPatchableRecordWithUnion', () => {
	test('simple', () => {
		expect(isPatchableRecordWithUnion(Simple)).toBeTruthy();
		expect(isPatchableRecordWithUnion(SimpleMinimal)).toBeTruthy();
		expect(isPatchableRecordWithUnion(SimpleNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecordWithUnion(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isPatchableRecordWithUnion(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecordWithUnion(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isPatchableRecordWithUnion(invalidateProperty(SimpleMinimal, data))).toBeFalsy();
		expect(isPatchableRecordWithUnion(invalidateProperty(SimpleNull, data))).toBeFalsy();
	});
});

describe('PatchableRecordWithUnionToJSON', () => {
	test('simple', () => {
		expect(PatchableRecordWithUnionToJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableRecordWithUnionToJSON(Simple)).not.toBe(Simple);

		expect(PatchableRecordWithUnionToJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(PatchableRecordWithUnionToJSON(SimpleMinimal)).not.toBe(SimpleMinimal);

		expect(PatchableRecordWithUnionToJSON(SimpleNull)).toStrictEqual(SimpleNull);
		expect(PatchableRecordWithUnionToJSON(SimpleNull)).not.toBe(SimpleNull);
	});
	test('additional props', () => {
		expect(PatchableRecordWithUnionToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});

const SimplePatchReplace: PatchableRecordWithUnionPatch = {
	key: 'key',
	version: 'version',
	value: {
		'@type': 'union-a',
		key: 'key',
		version: 'version',
		shared: 'shared',
		valueA: 'value-a',
	},
	value_Null: {
		'@type': 'union-a',
		key: 'key',
		version: 'version',
		shared: 'shared',
		valueA: 'value-a',
	},
	value_Opt: {
		'@type': 'union-a',
		key: 'key',
		version: 'version',
		shared: 'shared',
		valueA: 'value-a',
	},
	value_Opt_Null: {
		'@type': 'union-a',
		key: 'key',
		version: 'version',
		shared: 'shared',
		valueA: 'value-a',
	},
	list: {
		'@type': 'replace',
		elements: [
			{
				'@type': 'union-a',
				key: 'key',
				version: 'version',
				shared: 'shared',
				valueA: 'value-a',
			},
		],
	},
	list_Null: {
		'@type': 'replace',
		elements: [
			{
				'@type': 'union-a',
				key: 'key',
				version: 'version',
				shared: 'shared',
				valueA: 'value-a',
			},
		],
	},
	list_Opt: {
		'@type': 'replace',
		elements: [
			{
				'@type': 'union-a',
				key: 'key',
				version: 'version',
				shared: 'shared',
				valueA: 'value-a',
			},
		],
	},
	list_Opt_Null: {
		'@type': 'replace',
		elements: [
			{
				'@type': 'union-a',
				key: 'key',
				version: 'version',
				shared: 'shared',
				valueA: 'value-a',
			},
		],
	},
};

const SimplePatchMerge: PatchableRecordWithUnionPatch = {
	key: 'key',
	version: 'version',
	value: { '@type': 'patch:union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'valueA' },
	value_Null: { '@type': 'patch:union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'valueA' },
	value_Opt: { '@type': 'patch:union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'valueA' },
	value_Opt_Null: { '@type': 'patch:union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'valueA' },
	list: {
		'@type': 'merge',
		additions: [{ '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' }],
		updates: [{ '@type': 'patch:union-b', key: 'key', version: 'version', shared: 'shared', valueB: 'valueB' }],
		removals: ['key-to-remove'],
	},
	list_Null: {
		'@type': 'merge',
		additions: [{ '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' }],
		updates: [{ '@type': 'patch:union-b', key: 'key', version: 'version', shared: 'shared', valueB: 'valueB' }],
		removals: ['key-to-remove'],
	},
	list_Opt: {
		'@type': 'merge',
		additions: [{ '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' }],
		updates: [{ '@type': 'patch:union-b', key: 'key', version: 'version', shared: 'shared', valueB: 'valueB' }],
		removals: ['key-to-remove'],
	},
	list_Opt_Null: {
		'@type': 'merge',
		additions: [{ '@type': 'union-a', key: 'key', version: 'version', shared: 'shared', valueA: 'value-a' }],
		updates: [{ '@type': 'patch:union-b', key: 'key', version: 'version', shared: 'shared', valueB: 'valueB' }],
		removals: ['key-to-remove'],
	},
};

const SimplePatchMinimal: PatchableRecordWithUnionPatch = {
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

const SimplePatchNull: PatchableRecordWithUnionPatch = {
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

describe('PatchableRecordWithUnionPatchFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecordWithUnionPatchFromJSON(SimplePatchReplace)).toStrictEqual(SimplePatchReplace);
		expect(PatchableRecordWithUnionPatchFromJSON(SimplePatchMerge)).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecordWithUnionPatchFromJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecordWithUnionPatchFromJSON(SimplePatchNull)).toStrictEqual(SimplePatchNull);
	});
	test('remove-unknown', () => {
		expect(PatchableRecordWithUnionPatchFromJSON(addFooProperty(SimplePatchReplace))).toStrictEqual(SimplePatchReplace);
		expect(PatchableRecordWithUnionPatchFromJSON(addFooProperty(SimplePatchMerge))).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecordWithUnionPatchFromJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecordWithUnionPatchFromJSON(addFooProperty(SimplePatchNull))).toStrictEqual(SimplePatchNull);
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'key');
		expect(() => PatchableRecordWithUnionPatchFromJSON(withOut)).toThrow();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'version');
		expect(() => PatchableRecordWithUnionPatchFromJSON(withOut)).toThrow();
	});

	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecordWithUnionPatchFromJSON(invalidateProperty(SimplePatchReplace, data))).toThrow();
		expect(() => PatchableRecordWithUnionPatchFromJSON(invalidateProperty(SimplePatchMerge, data))).toThrow();
		expect(() => PatchableRecordWithUnionPatchFromJSON(invalidateProperty(SimplePatchMinimal, data))).toThrow();
		expect(() => PatchableRecordWithUnionPatchFromJSON(invalidateProperty(SimplePatchNull, data))).toThrow();
	});
});
describe('isPatchableRecordWithUnionPatch', () => {
	test('simple', () => {
		expect(isPatchableRecordWithUnionPatch(SimplePatchReplace)).toBeTruthy();
		expect(isPatchableRecordWithUnionPatch(SimplePatchMerge)).toBeTruthy();
		expect(isPatchableRecordWithUnionPatch(SimplePatchMinimal)).toBeTruthy();
		expect(isPatchableRecordWithUnionPatch(SimplePatchNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecordWithUnionPatch(addFooProperty(SimplePatchReplace))).toBeTruthy();
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'key');
		expect(isPatchableRecordWithUnionPatch(withOut)).toBeFalsy();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'version');
		expect(isPatchableRecordWithUnionPatch(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecordWithUnionPatch(invalidateProperty(SimplePatchReplace, data))).toBeFalsy();
		expect(isPatchableRecordWithUnionPatch(invalidateProperty(SimplePatchMerge, data))).toBeFalsy();
		expect(isPatchableRecordWithUnionPatch(invalidateProperty(SimplePatchMinimal, data))).toBeFalsy();
		expect(isPatchableRecordWithUnionPatch(invalidateProperty(SimplePatchNull, data))).toBeFalsy();
	});
});
describe('PatchableRecordWithUnionPatchToJSON', () => {
	test('simple', () => {
		expect(PatchableRecordWithUnionPatchToJSON(SimplePatchReplace)).toStrictEqual(SimplePatchReplace);
		expect(PatchableRecordWithUnionPatchToJSON(SimplePatchReplace)).not.toBe(SimplePatchReplace);

		expect(PatchableRecordWithUnionPatchToJSON(SimplePatchMerge)).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecordWithUnionPatchToJSON(SimplePatchMerge)).not.toBe(SimplePatchMerge);

		expect(PatchableRecordWithUnionPatchToJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecordWithUnionPatchToJSON(SimplePatchMinimal)).not.toBe(SimplePatchMinimal);
	});
	test('additional props', () => {
		expect(PatchableRecordWithUnionPatchToJSON(addFooProperty(SimplePatchReplace))).toStrictEqual(SimplePatchReplace);
		expect(PatchableRecordWithUnionPatchToJSON(addFooProperty(SimplePatchMerge))).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecordWithUnionPatchToJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(SimplePatchMinimal);
	});
});
