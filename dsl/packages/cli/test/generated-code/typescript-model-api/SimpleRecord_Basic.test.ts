import { describe, expect, test } from 'vitest';
import { SimpleRecord_BasicFromJSON, SimpleRecord_BasicToJSON } from '../../test-specs/gen-out/client/typescript-client/src/model/SimpleRecord_Basic.js';

const Simple = {
	valueBoolean: true,
	valueDouble: 1.5,
	valueFloat: 1.5,
	valueInt: 1,
	valueLocalDate: '2025-01-01',
	valueLocalDateTime: '2025-01-01T10:00:00',
	valueLong: 1,
	valueShort: 1,
	valueString: 'Foo',
	valueZonedDateTime: '2025-01-01T10:00:00Z',
};

describe('SimpleRecord_BasicFromJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_BasicFromJSON(Simple)).toStrictEqual(Simple);
	});
	test('remove-unknown', () => {
		expect(SimpleRecord_BasicFromJSON({ ...Simple, foo: 'bar' })).toStrictEqual(Simple);
	});
	test('missing prop', () => {});
	test('invalid prop value', () => {});
});
describe('isSimpleRecord_Basic', () => {
	test('simple', () => {});
	test('additional props', () => {});
	test('missing props', () => {});
	test('invalid props', () => {});
});
describe('SimpleRecord_BasicToJSON', () => {
	test('simple', () => {
		expect(SimpleRecord_BasicToJSON(Simple)).toStrictEqual(Simple);
	});
	test('additional props', () => {});
});
