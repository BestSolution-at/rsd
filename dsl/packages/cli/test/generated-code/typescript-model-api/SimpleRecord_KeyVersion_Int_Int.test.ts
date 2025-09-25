import { describe, expect, test } from 'vitest';
import { isSimpleRecord_KeyVersion_Int_Int, SimpleRecord_KeyVersion_Int_IntFromJSON, SimpleRecord_KeyVersion_Int_IntToJSON } from '../../test-specs/gen-out/client/typescript-client/src/model/SimpleRecord_KeyVersion_Int_Int.js';
import { addFooProperty } from './utils.js';

const Simple = {
	key: 1,
	version: 1,
};

describe('SimpleRecord_KeyVersion_Int_IntFromJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_KeyVersion_Int_IntFromJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecord_KeyVersion_Int_IntFromJSON(Simple)).not.toBe(Simple);
	});
	test('remove-unknown', () => {
		expect(SimpleRecord_KeyVersion_Int_IntFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
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
		expect(isSimpleRecord_KeyVersion_Int_Int(Simple)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isSimpleRecord_KeyVersion_Int_Int(addFooProperty(Simple))).toBeTruthy();
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
		expect(SimpleRecord_KeyVersion_Int_IntToJSON(Simple)).toStrictEqual(Simple);
		expect(SimpleRecord_KeyVersion_Int_IntToJSON(Simple)).not.toBe(Simple);
	});
	test('additional props', () => {
		expect(SimpleRecord_KeyVersion_Int_IntToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});
