import { describe, expect, test } from 'vitest';
import { isSimpleRecord_KeyVersion_Int_Int, SimpleRecord_KeyVersion_Int_IntFromJSON, SimpleRecord_KeyVersion_Int_IntToJSON } from '../../test-specs/gen-out/client/typescript-client/src/model/SimpleRecord_KeyVersion_Int_Int.js';

describe('SimpleRecord_KeyVersion_Int_IntFromJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_KeyVersion_Int_IntFromJSON({ key: 1, version: 1 })).toStrictEqual({ key: 1, version: 1 });
	});
	test('remove-unknown', () => {
		expect(SimpleRecord_KeyVersion_Int_IntFromJSON({ key: 1, version: 1, foo: 'bar' })).toStrictEqual({ key: 1, version: 1 });
	});
	test('missing prop', () => {
		expect(() => SimpleRecord_KeyVersion_Int_IntFromJSON({ key: 1 })).toThrow();
		expect(() => SimpleRecord_KeyVersion_Int_IntFromJSON({ version: 1 })).toThrow();
	});
	test('invalid prop value', () => {
		expect(() => SimpleRecord_KeyVersion_Int_IntFromJSON({ key: '1', version: 1 })).toThrow();
		expect(() => SimpleRecord_KeyVersion_Int_IntFromJSON({ key: 1, version: '1' })).toThrow();
	});
});

describe('isSimpleRecord_KeyVersion_Int_Int', () => {
	test('simple', () => {
		expect(isSimpleRecord_KeyVersion_Int_Int({ key: 1, version: 1 })).toBeTruthy();
	});
	test('additional props', () => {
		expect(isSimpleRecord_KeyVersion_Int_Int({ key: 1, version: 1, foo: 'bar' })).toBeTruthy();
	});
	test('missing props', () => {
		expect(isSimpleRecord_KeyVersion_Int_Int({ key: 1 })).toBeFalsy();
		expect(isSimpleRecord_KeyVersion_Int_Int({ version: 1 })).toBeFalsy();
	});
	test('invalid props', () => {
		expect(isSimpleRecord_KeyVersion_Int_Int({ key: 1, version: '1' })).toBeFalsy();
		expect(isSimpleRecord_KeyVersion_Int_Int({ key: '1', version: 1 })).toBeFalsy();
	});
});

describe('SimpleRecord_KeyVersion_Int_IntToJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_KeyVersion_Int_IntToJSON({ key: 1, version: 1 })).toStrictEqual({ key: 1, version: 1 });
	});
	test('additional props', () => {
		const x = { key: 1, version: 1, foo: 'bar' };
		expect(SimpleRecord_KeyVersion_Int_IntToJSON(x)).toStrictEqual({ key: 1, version: 1 });
	});
});
