import { describe, expect, test } from 'vitest';
import {
	isPatchableRecordOfRecords,
	isPatchableRecordOfRecordsPatch,
	PatchableRecordOfRecords,
	PatchableRecordOfRecordsFromJSON,
	PatchableRecordOfRecordsPatch,
	PatchableRecordOfRecordsPatchFromJSON,
	PatchableRecordOfRecordsPatchToJSON,
	PatchableRecordOfRecordsToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/PatchableRecordOfRecords.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: PatchableRecordOfRecords = {
	key: 'key',
	version: 'version',
	value: {
		key: 'key',
		version: 'version',
		valueBoolean: true,
		valueDouble: 0,
		valueInt: 0,
		valueString: 'value',
		valueFloat: 0,
		valueLocalDate: '2020-01-01',
		valueLocalDateTime: '2020-01-01T00:00:00',
		valueLong: 0,
		valueShort: 0,
		valueZonedDateTime: '2020-01-01T00:00:00Z',
	},
	value_Null: {
		key: 'key',
		version: 'version',
		valueBoolean: true,
		valueDouble: 0,
		valueInt: 0,
		valueString: 'value',
		valueFloat: 0,
		valueLocalDate: '2020-01-01',
		valueLocalDateTime: '2020-01-01T00:00:00',
		valueLong: 0,
		valueShort: 0,
		valueZonedDateTime: '2020-01-01T00:00:00Z',
	},
	value_Opt: {
		key: 'key',
		version: 'version',
		valueBoolean: true,
		valueDouble: 0,
		valueInt: 0,
		valueString: 'value',
		valueFloat: 0,
		valueLocalDate: '2020-01-01',
		valueLocalDateTime: '2020-01-01T00:00:00',
		valueLong: 0,
		valueShort: 0,
		valueZonedDateTime: '2020-01-01T00:00:00Z',
	},
	value_Opt_Null: {
		key: 'key',
		version: 'version',
		valueBoolean: true,
		valueDouble: 0,
		valueInt: 0,
		valueString: 'value',
		valueFloat: 0,
		valueLocalDate: '2020-01-01',
		valueLocalDateTime: '2020-01-01T00:00:00',
		valueLong: 0,
		valueShort: 0,
		valueZonedDateTime: '2020-01-01T00:00:00Z',
	},
	list: [
		{
			key: 'key',
			version: 'version',
			valueBoolean: true,
			valueDouble: 0,
			valueInt: 0,
			valueString: 'value',
			valueFloat: 0,
			valueLocalDate: '2020-01-01',
			valueLocalDateTime: '2020-01-01T00:00:00',
			valueLong: 0,
			valueShort: 0,
			valueZonedDateTime: '2020-01-01T00:00:00Z',
		},
		{
			key: 'key',
			version: 'version',
			valueBoolean: true,
			valueDouble: 0,
			valueInt: 0,
			valueString: 'value',
			valueFloat: 0,
			valueLocalDate: '2020-01-01',
			valueLocalDateTime: '2020-01-01T00:00:00',
			valueLong: 0,
			valueShort: 0,
			valueZonedDateTime: '2020-01-01T00:00:00Z',
		},
	],
	list_Null: [
		{
			key: 'key',
			version: 'version',
			valueBoolean: true,
			valueDouble: 0,
			valueInt: 0,
			valueString: 'value',
			valueFloat: 0,
			valueLocalDate: '2020-01-01',
			valueLocalDateTime: '2020-01-01T00:00:00',
			valueLong: 0,
			valueShort: 0,
			valueZonedDateTime: '2020-01-01T00:00:00Z',
		},
		{
			key: 'key',
			version: 'version',
			valueBoolean: true,
			valueDouble: 0,
			valueInt: 0,
			valueString: 'value',
			valueFloat: 0,
			valueLocalDate: '2020-01-01',
			valueLocalDateTime: '2020-01-01T00:00:00',
			valueLong: 0,
			valueShort: 0,
			valueZonedDateTime: '2020-01-01T00:00:00Z',
		},
	],
	list_Opt: [
		{
			key: 'key',
			version: 'version',
			valueBoolean: true,
			valueDouble: 0,
			valueInt: 0,
			valueString: 'value',
			valueFloat: 0,
			valueLocalDate: '2020-01-01',
			valueLocalDateTime: '2020-01-01T00:00:00',
			valueLong: 0,
			valueShort: 0,
			valueZonedDateTime: '2020-01-01T00:00:00Z',
		},
		{
			key: 'key',
			version: 'version',
			valueBoolean: true,
			valueDouble: 0,
			valueInt: 0,
			valueString: 'value',
			valueFloat: 0,
			valueLocalDate: '2020-01-01',
			valueLocalDateTime: '2020-01-01T00:00:00',
			valueLong: 0,
			valueShort: 0,
			valueZonedDateTime: '2020-01-01T00:00:00Z',
		},
	],
	list_Opt_Null: [
		{
			key: 'key',
			version: 'version',
			valueBoolean: true,
			valueDouble: 0,
			valueInt: 0,
			valueString: 'value',
			valueFloat: 0,
			valueLocalDate: '2020-01-01',
			valueLocalDateTime: '2020-01-01T00:00:00',
			valueLong: 0,
			valueShort: 0,
			valueZonedDateTime: '2020-01-01T00:00:00Z',
		},
		{
			key: 'key',
			version: 'version',
			valueBoolean: true,
			valueDouble: 0,
			valueInt: 0,
			valueString: 'value',
			valueFloat: 0,
			valueLocalDate: '2020-01-01',
			valueLocalDateTime: '2020-01-01T00:00:00',
			valueLong: 0,
			valueShort: 0,
			valueZonedDateTime: '2020-01-01T00:00:00Z',
		},
	],
};

const SimpleMinimal: PatchableRecordOfRecords = {
	key: 'key',
	version: 'version',
	value: {
		key: 'key',
		version: 'version',
		valueBoolean: true,
		valueDouble: 0,
		valueInt: 0,
		valueString: 'value',
		valueFloat: 0,
		valueLocalDate: '2020-01-01',
		valueLocalDateTime: '2020-01-01T00:00:00',
		valueLong: 0,
		valueShort: 0,
		valueZonedDateTime: '2020-01-01T00:00:00Z',
	},
	value_Null: {
		key: 'key',
		version: 'version',
		valueBoolean: true,
		valueDouble: 0,
		valueInt: 0,
		valueString: 'value',
		valueFloat: 0,
		valueLocalDate: '2020-01-01',
		valueLocalDateTime: '2020-01-01T00:00:00',
		valueLong: 0,
		valueShort: 0,
		valueZonedDateTime: '2020-01-01T00:00:00Z',
	},
	value_Opt: undefined,
	value_Opt_Null: undefined,
	list: [
		{
			key: 'key',
			version: 'version',
			valueBoolean: true,
			valueDouble: 0,
			valueInt: 0,
			valueString: 'value',
			valueFloat: 0,
			valueLocalDate: '2020-01-01',
			valueLocalDateTime: '2020-01-01T00:00:00',
			valueLong: 0,
			valueShort: 0,
			valueZonedDateTime: '2020-01-01T00:00:00Z',
		},
		{
			key: 'key',
			version: 'version',
			valueBoolean: true,
			valueDouble: 0,
			valueInt: 0,
			valueString: 'value',
			valueFloat: 0,
			valueLocalDate: '2020-01-01',
			valueLocalDateTime: '2020-01-01T00:00:00',
			valueLong: 0,
			valueShort: 0,
			valueZonedDateTime: '2020-01-01T00:00:00Z',
		},
	],
	list_Null: [
		{
			key: 'key',
			version: 'version',
			valueBoolean: true,
			valueDouble: 0,
			valueInt: 0,
			valueString: 'value',
			valueFloat: 0,
			valueLocalDate: '2020-01-01',
			valueLocalDateTime: '2020-01-01T00:00:00',
			valueLong: 0,
			valueShort: 0,
			valueZonedDateTime: '2020-01-01T00:00:00Z',
		},
		{
			key: 'key',
			version: 'version',
			valueBoolean: true,
			valueDouble: 0,
			valueInt: 0,
			valueString: 'value',
			valueFloat: 0,
			valueLocalDate: '2020-01-01',
			valueLocalDateTime: '2020-01-01T00:00:00',
			valueLong: 0,
			valueShort: 0,
			valueZonedDateTime: '2020-01-01T00:00:00Z',
		},
	],
	list_Opt: undefined,
	list_Opt_Null: undefined,
};

const SimpleNull: PatchableRecordOfRecords = {
	key: 'key',
	version: 'version',
	value: {
		key: 'key',
		version: 'version',
		valueBoolean: true,
		valueDouble: 0,
		valueInt: 0,
		valueString: 'value',
		valueFloat: 0,
		valueLocalDate: '2020-01-01',
		valueLocalDateTime: '2020-01-01T00:00:00',
		valueLong: 0,
		valueShort: 0,
		valueZonedDateTime: '2020-01-01T00:00:00Z',
	},
	value_Null: null,
	value_Opt: undefined,
	value_Opt_Null: null,
	list: [
		{
			key: 'key',
			version: 'version',
			valueBoolean: true,
			valueDouble: 0,
			valueInt: 0,
			valueString: 'value',
			valueFloat: 0,
			valueLocalDate: '2020-01-01',
			valueLocalDateTime: '2020-01-01T00:00:00',
			valueLong: 0,
			valueShort: 0,
			valueZonedDateTime: '2020-01-01T00:00:00Z',
		},
		{
			key: 'key',
			version: 'version',
			valueBoolean: true,
			valueDouble: 0,
			valueInt: 0,
			valueString: 'value',
			valueFloat: 0,
			valueLocalDate: '2020-01-01',
			valueLocalDateTime: '2020-01-01T00:00:00',
			valueLong: 0,
			valueShort: 0,
			valueZonedDateTime: '2020-01-01T00:00:00Z',
		},
	],
	list_Null: null,
	list_Opt: undefined,
	list_Opt_Null: null,
};

describe('PatchableScalarRecordFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecordOfRecordsFromJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableRecordOfRecordsFromJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(PatchableRecordOfRecordsFromJSON(SimpleNull)).toStrictEqual(SimpleNull);
	});
	test('remove-unknown', () => {
		expect(PatchableRecordOfRecordsFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => PatchableRecordOfRecordsFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecordOfRecordsFromJSON(invalidateProperty(Simple, data))).toThrow();
		expect(() => PatchableRecordOfRecordsFromJSON(invalidateProperty(SimpleMinimal, data))).toThrow();
		expect(() => PatchableRecordOfRecordsFromJSON(invalidateProperty(SimpleNull, data))).toThrow();
	});
	test.each(Object.keys(Simple).filter(p => p.includes('list')))('invalid prop $0', data => {
		expect(() => PatchableRecordOfRecordsFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});

describe('isPatchableRecordOfRecords', () => {
	test('simple', () => {
		expect(isPatchableRecordOfRecords(Simple)).toBeTruthy();
		expect(isPatchableRecordOfRecords(SimpleMinimal)).toBeTruthy();
		expect(isPatchableRecordOfRecords(SimpleNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecordOfRecords(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isPatchableRecordOfRecords(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecordOfRecords(invalidateProperty(Simple, data))).toBeFalsy();
		expect(isPatchableRecordOfRecords(invalidateProperty(SimpleMinimal, data))).toBeFalsy();
		expect(isPatchableRecordOfRecords(invalidateProperty(SimpleNull, data))).toBeFalsy();
	});
});

describe('PatchableRecordOfRecordsToJSON', () => {
	test('simple', () => {
		expect(PatchableRecordOfRecordsToJSON(Simple)).toStrictEqual(Simple);
		expect(PatchableRecordOfRecordsToJSON(Simple)).not.toBe(Simple);

		expect(PatchableRecordOfRecordsToJSON(SimpleMinimal)).toStrictEqual(SimpleMinimal);
		expect(PatchableRecordOfRecordsToJSON(SimpleMinimal)).not.toBe(SimpleMinimal);

		expect(PatchableRecordOfRecordsToJSON(SimpleNull)).toStrictEqual(SimpleNull);
		expect(PatchableRecordOfRecordsToJSON(SimpleNull)).not.toBe(SimpleNull);
	});
	test('additional props', () => {
		expect(PatchableRecordOfRecordsToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});

const SimplePatchReplace: PatchableRecordOfRecordsPatch = {
	key: 'key',
	version: 'version',
	value: {
		'@type': 'replace',
		key: 'key',
		version: 'version',
		valueBoolean: true,
		valueDouble: 0,
		valueInt: 0,
		valueString: 'value',
		valueFloat: 0,
		valueLocalDate: '2020-01-01',
		valueLocalDateTime: '2020-01-01T00:00:00',
		valueLong: 0,
		valueShort: 0,
		valueZonedDateTime: '2020-01-01T00:00:00Z',
	},
	value_Null: {
		'@type': 'replace',
		key: 'key',
		version: 'version',
		valueBoolean: true,
		valueDouble: 0,
		valueInt: 0,
		valueString: 'value',
		valueFloat: 0,
		valueLocalDate: '2020-01-01',
		valueLocalDateTime: '2020-01-01T00:00:00',
		valueLong: 0,
		valueShort: 0,
		valueZonedDateTime: '2020-01-01T00:00:00Z',
	},
	value_Opt: {
		'@type': 'replace',
		key: 'key',
		version: 'version',
		valueBoolean: true,
		valueDouble: 0,
		valueInt: 0,
		valueString: 'value',
		valueFloat: 0,
		valueLocalDate: '2020-01-01',
		valueLocalDateTime: '2020-01-01T00:00:00',
		valueLong: 0,
		valueShort: 0,
		valueZonedDateTime: '2020-01-01T00:00:00Z',
	},
	value_Opt_Null: {
		'@type': 'replace',
		key: 'key',
		version: 'version',
		valueBoolean: true,
		valueDouble: 0,
		valueInt: 0,
		valueString: 'value',
		valueFloat: 0,
		valueLocalDate: '2020-01-01',
		valueLocalDateTime: '2020-01-01T00:00:00',
		valueLong: 0,
		valueShort: 0,
		valueZonedDateTime: '2020-01-01T00:00:00Z',
	},
	list: {
		'@type': 'replace',
		elements: [
			{
				key: 'key',
				version: 'version',
				valueBoolean: true,
				valueDouble: 0,
				valueInt: 0,
				valueString: 'value',
				valueFloat: 0,
				valueLocalDate: '2020-01-01',
				valueLocalDateTime: '2020-01-01T00:00:00',
				valueLong: 0,
				valueShort: 0,
				valueZonedDateTime: '2020-01-01T00:00:00Z',
			},
		],
	},
	list_Null: {
		'@type': 'replace',
		elements: [
			{
				key: 'key',
				version: 'version',
				valueBoolean: true,
				valueDouble: 0,
				valueInt: 0,
				valueString: 'value',
				valueFloat: 0,
				valueLocalDate: '2020-01-01',
				valueLocalDateTime: '2020-01-01T00:00:00',
				valueLong: 0,
				valueShort: 0,
				valueZonedDateTime: '2020-01-01T00:00:00Z',
			},
		],
	},
	list_Opt: {
		'@type': 'replace',
		elements: [
			{
				key: 'key',
				version: 'version',
				valueBoolean: true,
				valueDouble: 0,
				valueInt: 0,
				valueString: 'value',
				valueFloat: 0,
				valueLocalDate: '2020-01-01',
				valueLocalDateTime: '2020-01-01T00:00:00',
				valueLong: 0,
				valueShort: 0,
				valueZonedDateTime: '2020-01-01T00:00:00Z',
			},
		],
	},
	list_Opt_Null: {
		'@type': 'replace',
		elements: [
			{
				key: 'key',
				version: 'version',
				valueBoolean: true,
				valueDouble: 0,
				valueInt: 0,
				valueString: 'value',
				valueFloat: 0,
				valueLocalDate: '2020-01-01',
				valueLocalDateTime: '2020-01-01T00:00:00',
				valueLong: 0,
				valueShort: 0,
				valueZonedDateTime: '2020-01-01T00:00:00Z',
			},
		],
	},
};

const SimplePatchMerge: PatchableRecordOfRecordsPatch = {
	key: 'key',
	version: 'version',
	value: {
		'@type': 'merge',
		key: 'key',
		version: 'version',
		valueBoolean: true,
		valueDouble: 0,
		valueInt: 0,
		valueString: 'value',
		valueFloat: 0,
		valueLocalDate: '2020-01-01',
		valueLocalDateTime: '2020-01-01T00:00:00',
		valueLong: 0,
		valueShort: 0,
		valueZonedDateTime: '2020-01-01T00:00:00Z',
	},
	value_Null: {
		'@type': 'merge',
		key: 'key',
		version: 'version',
		valueBoolean: true,
		valueDouble: 0,
		valueInt: 0,
		valueString: 'value',
		valueFloat: 0,
		valueLocalDate: '2020-01-01',
		valueLocalDateTime: '2020-01-01T00:00:00',
		valueLong: 0,
		valueShort: 0,
		valueZonedDateTime: '2020-01-01T00:00:00Z',
	},
	value_Opt: {
		'@type': 'merge',
		key: 'key',
		version: 'version',
		valueBoolean: true,
		valueDouble: 0,
		valueInt: 0,
		valueString: 'value',
		valueFloat: 0,
		valueLocalDate: '2020-01-01',
		valueLocalDateTime: '2020-01-01T00:00:00',
		valueLong: 0,
		valueShort: 0,
		valueZonedDateTime: '2020-01-01T00:00:00Z',
	},
	value_Opt_Null: {
		'@type': 'merge',
		key: 'key',
		version: 'version',
		valueBoolean: true,
		valueDouble: 0,
		valueInt: 0,
		valueString: 'value',
		valueFloat: 0,
		valueLocalDate: '2020-01-01',
		valueLocalDateTime: '2020-01-01T00:00:00',
		valueLong: 0,
		valueShort: 0,
		valueZonedDateTime: '2020-01-01T00:00:00Z',
	},
	list: {
		'@type': 'merge',
		additions: [
			{
				key: 'key',
				version: 'version',
				valueBoolean: true,
				valueDouble: 0,
				valueInt: 0,
				valueString: 'value',
				valueFloat: 0,
				valueLocalDate: '2020-01-01',
				valueLocalDateTime: '2020-01-01T00:00:00',
				valueLong: 0,
				valueShort: 0,
				valueZonedDateTime: '2020-01-01T00:00:00Z',
			},
		],
		updates: [
			{
				key: 'key',
				version: 'version',
				valueBoolean: true,
				valueDouble: 0,
				valueInt: 0,
				valueString: 'value',
				valueFloat: 0,
				valueLocalDate: '2020-01-01',
				valueLocalDateTime: '2020-01-01T00:00:00',
				valueLong: 0,
				valueShort: 0,
				valueZonedDateTime: '2020-01-01T00:00:00Z',
			},
		],
		removals: ['key-to-remove'],
	},
	list_Null: {
		'@type': 'merge',
		additions: [
			{
				key: 'key',
				version: 'version',
				valueBoolean: true,
				valueDouble: 0,
				valueInt: 0,
				valueString: 'value',
				valueFloat: 0,
				valueLocalDate: '2020-01-01',
				valueLocalDateTime: '2020-01-01T00:00:00',
				valueLong: 0,
				valueShort: 0,
				valueZonedDateTime: '2020-01-01T00:00:00Z',
			},
		],
		updates: [
			{
				key: 'key',
				version: 'version',
				valueBoolean: true,
				valueDouble: 0,
				valueInt: 0,
				valueString: 'value',
				valueFloat: 0,
				valueLocalDate: '2020-01-01',
				valueLocalDateTime: '2020-01-01T00:00:00',
				valueLong: 0,
				valueShort: 0,
				valueZonedDateTime: '2020-01-01T00:00:00Z',
			},
		],
		removals: ['key-to-remove'],
	},
	list_Opt: {
		'@type': 'merge',
		additions: [
			{
				key: 'key',
				version: 'version',
				valueBoolean: true,
				valueDouble: 0,
				valueInt: 0,
				valueString: 'value',
				valueFloat: 0,
				valueLocalDate: '2020-01-01',
				valueLocalDateTime: '2020-01-01T00:00:00',
				valueLong: 0,
				valueShort: 0,
				valueZonedDateTime: '2020-01-01T00:00:00Z',
			},
		],
		updates: [
			{
				key: 'key',
				version: 'version',
				valueBoolean: true,
				valueDouble: 0,
				valueInt: 0,
				valueString: 'value',
				valueFloat: 0,
				valueLocalDate: '2020-01-01',
				valueLocalDateTime: '2020-01-01T00:00:00',
				valueLong: 0,
				valueShort: 0,
				valueZonedDateTime: '2020-01-01T00:00:00Z',
			},
		],
		removals: ['key-to-remove'],
	},
	list_Opt_Null: {
		'@type': 'merge',
		additions: [
			{
				key: 'key',
				version: 'version',
				valueBoolean: true,
				valueDouble: 0,
				valueInt: 0,
				valueString: 'value',
				valueFloat: 0,
				valueLocalDate: '2020-01-01',
				valueLocalDateTime: '2020-01-01T00:00:00',
				valueLong: 0,
				valueShort: 0,
				valueZonedDateTime: '2020-01-01T00:00:00Z',
			},
		],
		updates: [
			{
				key: 'key',
				version: 'version',
				valueBoolean: true,
				valueDouble: 0,
				valueInt: 0,
				valueString: 'value',
				valueFloat: 0,
				valueLocalDate: '2020-01-01',
				valueLocalDateTime: '2020-01-01T00:00:00',
				valueLong: 0,
				valueShort: 0,
				valueZonedDateTime: '2020-01-01T00:00:00Z',
			},
		],
		removals: ['key-to-remove'],
	},
};

const SimplePatchMinimal: PatchableRecordOfRecordsPatch = {
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

const SimplePatchNull: PatchableRecordOfRecordsPatch = {
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

describe('PatchableRecordOfRecordsPatchFromJSON', () => {
	test('simple', () => {
		expect(PatchableRecordOfRecordsPatchFromJSON(SimplePatchReplace)).toStrictEqual(SimplePatchReplace);
		expect(PatchableRecordOfRecordsPatchFromJSON(SimplePatchMerge)).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecordOfRecordsPatchFromJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecordOfRecordsPatchFromJSON(SimplePatchNull)).toStrictEqual(SimplePatchNull);
	});
	test('remove-unknown', () => {
		expect(PatchableRecordOfRecordsPatchFromJSON(addFooProperty(SimplePatchReplace))).toStrictEqual(SimplePatchReplace);
		expect(PatchableRecordOfRecordsPatchFromJSON(addFooProperty(SimplePatchMerge))).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecordOfRecordsPatchFromJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecordOfRecordsPatchFromJSON(addFooProperty(SimplePatchNull))).toStrictEqual(SimplePatchNull);
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'key');
		expect(() => PatchableRecordOfRecordsPatchFromJSON(withOut)).toThrow();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'version');
		expect(() => PatchableRecordOfRecordsPatchFromJSON(withOut)).toThrow();
	});

	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => PatchableRecordOfRecordsPatchFromJSON(invalidateProperty(SimplePatchReplace, data))).toThrow();
		expect(() => PatchableRecordOfRecordsPatchFromJSON(invalidateProperty(SimplePatchMerge, data))).toThrow();
		expect(() => PatchableRecordOfRecordsPatchFromJSON(invalidateProperty(SimplePatchMinimal, data))).toThrow();
		expect(() => PatchableRecordOfRecordsPatchFromJSON(invalidateProperty(SimplePatchNull, data))).toThrow();
	});
});
describe('isPatchableRecordOfRecordsPatch', () => {
	test('simple', () => {
		expect(isPatchableRecordOfRecordsPatch(SimplePatchReplace)).toBeTruthy();
		expect(isPatchableRecordOfRecordsPatch(SimplePatchMerge)).toBeTruthy();
		expect(isPatchableRecordOfRecordsPatch(SimplePatchMinimal)).toBeTruthy();
		expect(isPatchableRecordOfRecordsPatch(SimplePatchNull)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isPatchableRecordOfRecordsPatch(addFooProperty(SimplePatchReplace))).toBeTruthy();
	});
	test('missing key-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'key');
		expect(isPatchableRecordOfRecordsPatch(withOut)).toBeFalsy();
	});
	test('missing version-prop', () => {
		const { withOut } = removeProperty(SimplePatchReplace, 'version');
		expect(isPatchableRecordOfRecordsPatch(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isPatchableRecordOfRecordsPatch(invalidateProperty(SimplePatchReplace, data))).toBeFalsy();
		expect(isPatchableRecordOfRecordsPatch(invalidateProperty(SimplePatchMerge, data))).toBeFalsy();
		expect(isPatchableRecordOfRecordsPatch(invalidateProperty(SimplePatchMinimal, data))).toBeFalsy();
		expect(isPatchableRecordOfRecordsPatch(invalidateProperty(SimplePatchNull, data))).toBeFalsy();
	});
});
describe('PatchableRecordOfRecordsPatchToJSON', () => {
	test('simple', () => {
		expect(PatchableRecordOfRecordsPatchToJSON(SimplePatchReplace)).toStrictEqual(SimplePatchReplace);
		expect(PatchableRecordOfRecordsPatchToJSON(SimplePatchReplace)).not.toBe(SimplePatchReplace);

		expect(PatchableRecordOfRecordsPatchToJSON(SimplePatchMerge)).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecordOfRecordsPatchToJSON(SimplePatchMerge)).not.toBe(SimplePatchMerge);

		expect(PatchableRecordOfRecordsPatchToJSON(SimplePatchMinimal)).toStrictEqual(SimplePatchMinimal);
		expect(PatchableRecordOfRecordsPatchToJSON(SimplePatchMinimal)).not.toBe(SimplePatchMinimal);
	});
	test('additional props', () => {
		expect(PatchableRecordOfRecordsPatchToJSON(addFooProperty(SimplePatchReplace))).toStrictEqual(SimplePatchReplace);
		expect(PatchableRecordOfRecordsPatchToJSON(addFooProperty(SimplePatchMerge))).toStrictEqual(SimplePatchMerge);
		expect(PatchableRecordOfRecordsPatchToJSON(addFooProperty(SimplePatchMinimal))).toStrictEqual(SimplePatchMinimal);
	});
});
