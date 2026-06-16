import { describe, expect, test } from 'vitest';
import {
	isPatchableScalarRecord_Substitution,
	isPatchableScalarRecord_SubstitutionPatch,
	PatchableScalarRecord_Substitution,
	PatchableScalarRecord_SubstitutionFromJSON,
	PatchableScalarRecord_SubstitutionPatch,
	PatchableScalarRecord_SubstitutionPatchFromJSON,
	PatchableScalarRecord_SubstitutionPatchToJSON,
	PatchableScalarRecord_SubstitutionToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/PatchableScalarRecord_Substitution.js';
import { addFooProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: PatchableScalarRecord_Substitution = {
	key: 'key',
	version: 'version',
	value: { start: 1, end: 2 },
	value_Null: { start: 1, end: 2 },
	value_Opt: { start: 1, end: 2 },
	value_Opt_Null: { start: 1, end: 2 },
	list: [
		{ start: 1, end: 2 },
		{ start: 3, end: 4 },
	],
	list_Null: [
		{ start: 1, end: 2 },
		{ start: 3, end: 4 },
	],
	list_Opt: [
		{ start: 1, end: 2 },
		{ start: 3, end: 4 },
	],
	list_Opt_Null: [
		{ start: 1, end: 2 },
		{ start: 3, end: 4 },
	],
};

const Simple_Json = {
	key: 'key',
	version: 'version',
	value: '[1,2]',
	value_Null: '[1,2]',
	value_Opt: '[1,2]',
	value_Opt_Null: '[1,2]',
	list: ['[1,2]', '[3,4]'],
	list_Null: ['[1,2]', '[3,4]'],
	list_Opt: ['[1,2]', '[3,4]'],
	list_Opt_Null: ['[1,2]', '[3,4]'],
} as const;

const SimpleMinimal: PatchableScalarRecord_Substitution = {
	key: 'key',
	version: 'version',
	value: { start: 1, end: 2 },
	value_Null: { start: 1, end: 2 },
	value_Opt: undefined,
	value_Opt_Null: undefined,
	list: [
		{ start: 1, end: 2 },
		{ start: 3, end: 4 },
	],
	list_Null: [
		{ start: 1, end: 2 },
		{ start: 3, end: 4 },
	],
	list_Opt: undefined,
	list_Opt_Null: undefined,
};

const SimpleMinimal_Json = {
	key: 'key',
	version: 'version',
	value: '[1,2]',
	value_Null: '[1,2]',
	value_Opt: undefined,
	value_Opt_Null: undefined,
	list: ['[1,2]', '[3,4]'],
	list_Null: ['[1,2]', '[3,4]'],
	list_Opt: undefined,
	list_Opt_Null: undefined,
} as const;

const SimpleNull: PatchableScalarRecord_Substitution = {
	key: 'key',
	version: 'version',
	value: { start: 1, end: 2 },
	value_Null: null,
	value_Opt: undefined,
	value_Opt_Null: null,
	list: [
		{ start: 1, end: 2 },
		{ start: 3, end: 4 },
	],
	list_Null: null,
	list_Opt: undefined,
	list_Opt_Null: null,
};

const SimpleNull_Json = {
	key: 'key',
	version: 'version',
	value: '[1,2]',
	value_Null: null,
	value_Opt: undefined,
	value_Opt_Null: null,
	list: ['[1,2]', '[3,4]'],
	list_Null: null,
	list_Opt: undefined,
	list_Opt_Null: null,
} as const;

describe('PatchableScalarRecord_SubstitutionFromJSON', () => {
	test('Simple', () => {
		expect(PatchableScalarRecord_SubstitutionFromJSON(Simple_Json)).toStrictEqual(Simple);
		expect(PatchableScalarRecord_SubstitutionFromJSON(SimpleMinimal_Json)).toStrictEqual(SimpleMinimal);
		expect(PatchableScalarRecord_SubstitutionFromJSON(SimpleNull_Json)).toStrictEqual(SimpleNull);
	});
	test('remove-unknown', () => {
		expect(PatchableScalarRecord_SubstitutionFromJSON(addFooProperty(Simple_Json))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple_Json, data);
		expect(() => PatchableScalarRecord_SubstitutionFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableScalarRecord_SubstitutionFromJSON(invalidateProperty(Simple_Json, data))).toThrow();
		expect(() => PatchableScalarRecord_SubstitutionFromJSON(invalidateProperty(SimpleMinimal_Json, data))).toThrow();
		expect(() => PatchableScalarRecord_SubstitutionFromJSON(invalidateProperty(SimpleNull_Json, data))).toThrow();
	});
});

describe('isPatchableScalarRecord_Substitution', () => {
	test('Simple', () => {
		expect(isPatchableScalarRecord_Substitution(Simple)).toBeTruthy();
		expect(isPatchableScalarRecord_Substitution(SimpleMinimal)).toBeTruthy();
		expect(isPatchableScalarRecord_Substitution(SimpleNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableScalarRecord_Substitution(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isPatchableScalarRecord_Substitution(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableScalarRecord_Substitution(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isPatchableScalarRecord_Substitution(invalidateProperty(SimpleMinimal, data))).toBeFalsy();
		expect(isPatchableScalarRecord_Substitution(invalidateProperty(SimpleNull, data))).toBeFalsy();
	});
});

describe('PatchableScalarRecord_SubstitutionToJSON', () => {
	test('Simple', () => {
		expect(PatchableScalarRecord_SubstitutionToJSON(Simple)).toStrictEqual(Simple_Json);
		expect(PatchableScalarRecord_SubstitutionToJSON(Simple)).not.toBe(Simple);

		expect(PatchableScalarRecord_SubstitutionToJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal_Json);
		expect(PatchableScalarRecord_SubstitutionToJSON(SimpleMinimal)).not.toBe(SimpleMinimal);

		expect(PatchableScalarRecord_SubstitutionToJSON(SimpleNull)).toStrictEqual(SimpleNull_Json);
		expect(PatchableScalarRecord_SubstitutionToJSON(SimpleNull)).not.toBe(SimpleNull);
	});
	test('additional props', () => {
		expect(PatchableScalarRecord_SubstitutionToJSON(addFooProperty(Simple))).toStrictEqual(Simple_Json);
	});
});

const SimplePatchReplace: PatchableScalarRecord_SubstitutionPatch = {
	key: 'key',
	version: 'version',
	value: { start: 1, end: 2 },
	value_Null: { start: 1, end: 2 },
	value_Opt: { start: 1, end: 2 },
	value_Opt_Null: { start: 1, end: 2 },
	list: {
		'@type': 'replace',
		elements: [{ start: 1, end: 2 }],
	},
	list_Null: {
		'@type': 'replace',
		elements: [{ start: 1, end: 2 }],
	},
	list_Opt: {
		'@type': 'replace',
		elements: [{ start: 1, end: 2 }],
	},
	list_Opt_Null: {
		'@type': 'replace',
		elements: [{ start: 1, end: 2 }],
	},
};

const SimplePatchReplace_Json = {
	key: 'key',
	version: 'version',
	value: '[1,2]',
	value_Null: '[1,2]',
	value_Opt: '[1,2]',
	value_Opt_Null: '[1,2]',
	list: {
		'@type': 'replace',
		elements: ['[1,2]'],
	},
	list_Null: {
		'@type': 'replace',
		elements: ['[1,2]'],
	},
	list_Opt: {
		'@type': 'replace',
		elements: ['[1,2]'],
	},
	list_Opt_Null: {
		'@type': 'replace',
		elements: ['[1,2]'],
	},
} as const;

const SimplePatchMerge: PatchableScalarRecord_SubstitutionPatch = {
	key: 'key',
	version: 'version',
	value: { start: 1, end: 2 },
	value_Null: { start: 1, end: 2 },
	value_Opt: { start: 1, end: 2 },
	value_Opt_Null: { start: 1, end: 2 },
	list: {
		'@type': 'merge',
		additions: [{ start: 1, end: 2 }],
		removals: [{ start: 3, end: 4 }],
	},
	list_Null: {
		'@type': 'merge',
		additions: [{ start: 1, end: 2 }],
		removals: [{ start: 3, end: 4 }],
	},
	list_Opt: {
		'@type': 'merge',
		additions: [{ start: 1, end: 2 }],
		removals: [{ start: 3, end: 4 }],
	},
	list_Opt_Null: {
		'@type': 'merge',
		additions: [{ start: 1, end: 2 }],
		removals: [{ start: 3, end: 4 }],
	},
};

const SimplePatchMerge_Json = {
	key: 'key',
	version: 'version',
	value: '[1,2]',
	value_Null: '[1,2]',
	value_Opt: '[1,2]',
	value_Opt_Null: '[1,2]',
	list: {
		'@type': 'merge',
		additions: ['[1,2]'],
		removals: ['[3,4]'],
	},
	list_Null: {
		'@type': 'merge',
		additions: ['[1,2]'],
		removals: ['[3,4]'],
	},
	list_Opt: {
		'@type': 'merge',
		additions: ['[1,2]'],
		removals: ['[3,4]'],
	},
	list_Opt_Null: {
		'@type': 'merge',
		additions: ['[1,2]'],
		removals: ['[3,4]'],
	},
} as const;

const SimplePatchMinimal: PatchableScalarRecord_SubstitutionPatch = {
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

const SimplePatchMinimal_Json = {
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
} as const;

const SimplePatchNull: PatchableScalarRecord_SubstitutionPatch = {
	key: 'key',
	version: 'version',
	value: undefined,
	value_Null: null,
	value_Opt: null,
	value_Opt_Null: null,
	list: undefined,
	list_Null: null,
	list_Opt: null,
	list_Opt_Null: null,
};

const SimplePatchNull_Json = {
	key: 'key',
	version: 'version',
	value: undefined,
	value_Null: null,
	value_Opt: null,
	value_Opt_Null: null,
	list: undefined,
	list_Null: null,
	list_Opt: null,
	list_Opt_Null: null,
} as const;

describe('PatchableScalarRecord_SubstitutionPatchFromJSON', () => {
	test('simple', () => {
		expect(PatchableScalarRecord_SubstitutionPatchFromJSON(SimplePatchReplace_Json)).toStrictEqual(SimplePatchReplace);
		expect(PatchableScalarRecord_SubstitutionPatchFromJSON(SimplePatchMerge_Json)).toStrictEqual(SimplePatchMerge);
		expect(PatchableScalarRecord_SubstitutionPatchFromJSON(SimplePatchMinimal_Json)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableScalarRecord_SubstitutionPatchFromJSON(SimplePatchNull_Json)).toStrictEqual(SimplePatchNull);
	});
	test('remove-unknown', () => {
		expect(PatchableScalarRecord_SubstitutionPatchFromJSON(addFooProperty(SimplePatchReplace_Json))).toStrictEqual(
			SimplePatchReplace,
		);
		expect(PatchableScalarRecord_SubstitutionPatchFromJSON(addFooProperty(SimplePatchMerge_Json))).toStrictEqual(
			SimplePatchMerge,
		);
		expect(PatchableScalarRecord_SubstitutionPatchFromJSON(addFooProperty(SimplePatchMinimal_Json))).toStrictEqual(
			SimplePatchMinimal,
		);
		expect(PatchableScalarRecord_SubstitutionPatchFromJSON(addFooProperty(SimplePatchNull_Json))).toStrictEqual(
			SimplePatchNull,
		);
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace_Json, 'key');
		expect(() => PatchableScalarRecord_SubstitutionPatchFromJSON(withOut)).toThrow();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace_Json, 'version');
		expect(() => PatchableScalarRecord_SubstitutionPatchFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(SimplePatchReplace))('invalid prop $0', data => {
		expect(() =>
			PatchableScalarRecord_SubstitutionPatchFromJSON(invalidateProperty(SimplePatchReplace_Json, data)),
		).toThrow();
		expect(() =>
			PatchableScalarRecord_SubstitutionPatchFromJSON(invalidateProperty(SimplePatchMerge_Json, data)),
		).toThrow();
		expect(() =>
			PatchableScalarRecord_SubstitutionPatchFromJSON(invalidateProperty(SimplePatchMinimal_Json, data)),
		).toThrow();
		expect(() =>
			PatchableScalarRecord_SubstitutionPatchFromJSON(invalidateProperty(SimplePatchNull_Json, data)),
		).toThrow();
	});
});

describe('isPatchableScalarRecord_SubstitutionPatch', () => {
	test('simple', () => {
		expect(isPatchableScalarRecord_SubstitutionPatch(SimplePatchReplace)).toBeTruthy();
		expect(isPatchableScalarRecord_SubstitutionPatch(SimplePatchMerge)).toBeTruthy();
		expect(isPatchableScalarRecord_SubstitutionPatch(SimplePatchMinimal)).toBeTruthy();
		expect(isPatchableScalarRecord_SubstitutionPatch(SimplePatchNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableScalarRecord_SubstitutionPatch(addFooProperty(SimplePatchReplace))).toBeTruthy();
		expect(isPatchableScalarRecord_SubstitutionPatch(addFooProperty(SimplePatchMerge))).toBeTruthy();
		expect(isPatchableScalarRecord_SubstitutionPatch(addFooProperty(SimplePatchMinimal))).toBeTruthy();
		expect(isPatchableScalarRecord_SubstitutionPatch(addFooProperty(SimplePatchNull))).toBeTruthy();
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'key');
		expect(isPatchableScalarRecord_SubstitutionPatch(withOut)).toBeFalsy();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'version');
		expect(isPatchableScalarRecord_SubstitutionPatch(withOut)).toBeFalsy();
	});
	test.each(Object.keys(SimplePatchReplace))('invalid prop $0', data => {
		expect(isPatchableScalarRecord_SubstitutionPatch(invalidateProperty(SimplePatchReplace, data))).toBeFalsy();
		expect(isPatchableScalarRecord_SubstitutionPatch(invalidateProperty(SimplePatchMerge, data))).toBeFalsy();
		expect(isPatchableScalarRecord_SubstitutionPatch(invalidateProperty(SimplePatchMinimal, data))).toBeFalsy();
		expect(isPatchableScalarRecord_SubstitutionPatch(invalidateProperty(SimplePatchNull, data))).toBeFalsy();
	});
});

describe('PatchableScalarRecord_SubstitutionPatchToJSON', () => {
	test('simple', () => {
		expect(PatchableScalarRecord_SubstitutionPatchToJSON(SimplePatchReplace)).toStrictEqual(SimplePatchReplace_Json);
		expect(PatchableScalarRecord_SubstitutionPatchToJSON(SimplePatchReplace)).not.toBe(SimplePatchReplace_Json);
		expect(PatchableScalarRecord_SubstitutionPatchToJSON(SimplePatchMerge)).toStrictEqual(SimplePatchMerge_Json);
		expect(PatchableScalarRecord_SubstitutionPatchToJSON(SimplePatchMerge)).not.toBe(SimplePatchMerge_Json);
		expect(PatchableScalarRecord_SubstitutionPatchToJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal_Json);
		expect(PatchableScalarRecord_SubstitutionPatchToJSON(SimplePatchMinimal)).not.toBe(SimplePatchMinimal_Json);
		expect(PatchableScalarRecord_SubstitutionPatchToJSON(SimplePatchNull)).toStrictEqual(SimplePatchNull_Json);
		expect(PatchableScalarRecord_SubstitutionPatchToJSON(SimplePatchNull)).not.toBe(SimplePatchNull_Json);
	});
	test('additional props', () => {
		expect(PatchableScalarRecord_SubstitutionPatchToJSON(addFooProperty(SimplePatchReplace))).toStrictEqual(
			SimplePatchReplace_Json,
		);
		expect(PatchableScalarRecord_SubstitutionPatchToJSON(addFooProperty(SimplePatchMerge))).toStrictEqual(
			SimplePatchMerge_Json,
		);
		expect(PatchableScalarRecord_SubstitutionPatchToJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(
			SimplePatchMinimal_Json,
		);
		expect(PatchableScalarRecord_SubstitutionPatchToJSON(addFooProperty(SimplePatchNull))).toStrictEqual(
			SimplePatchNull_Json,
		);
	});
});
