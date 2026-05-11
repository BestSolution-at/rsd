import { describe, expect, test } from 'vitest';

import { createListQueryParameterTypesService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import { createOpenAPIListQueryParameterTypesService } from '../../test-specs/gen-out/client/typescript-client-openapi/src/adapter/ListQueryParameterTypesService.adapter.js';

const jsonService = createListQueryParameterTypesService({
	baseUrl: 'http://localhost:3000',
});
const msgpackService = createListQueryParameterTypesService({
	baseUrl: 'http://localhost:3000',
	encoding: 'application/vnd.msgpack',
});

const openapiService = createOpenAPIListQueryParameterTypesService({
	baseUrl: 'http://localhost:3000',
});

const json = { service: jsonService, encoding: 'application/json' as const };
const msgpack = { service: msgpackService, encoding: 'application/vnd.msgpack' as const };
const openapi = { service: openapiService, encoding: 'application/json via openapi' as const };

describe('ListQueryParameterTypesServiceFetchImpl', () => {
	describe('listBooleanQueryParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listBooleanQueryParam([true, false, true]);
			expect(error).toBeNull();
			expect(result).toEqual([true, false, true]);
		});
	});
	describe('listShortQueryParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listShortQueryParam([100, 200, 300]);
			expect(error).toBeNull();
			expect(result).toEqual([100, 200, 300]);
		});
	});
	describe('listIntQueryParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listIntQueryParam([1, 2, 3, 4, 5]);
			expect(error).toBeNull();
			expect(result).toEqual([1, 2, 3, 4, 5]);
		});
	});
	describe('listLongQueryParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listLongQueryParam([1000, 2000, 3000]);
			expect(error).toBeNull();
			expect(result).toEqual([1000, 2000, 3000]);
		});
	});
	describe('listFloatQueryParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listFloatQueryParam([1.5, 2.5, 3.5]);
			expect(error).toBeNull();
			expect(result).toEqual([1.5, 2.5, 3.5]);
		});
	});
	describe('listDoubleQueryParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listDoubleQueryParam([1.1, 2.2, 3.3]);
			expect(error).toBeNull();
			expect(result).toEqual([1.1, 2.2, 3.3]);
		});
	});
	describe('listStringQueryParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listStringQueryParam(['alpha', 'beta', 'gamma']);
			expect(error).toBeNull();
			expect(result).toEqual(['alpha', 'beta', 'gamma']);
		});
	});
	describe('listLocalDateQueryParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateQueryParam(['2024-01-01', '2024-12-31']);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01', '2024-12-31']);
		});
	});
	describe('listLocalDateTimeQueryParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateTimeQueryParam(['2024-01-01T10:00:00', '2024-12-31T22:30:00']);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01T10:00:00', '2024-12-31T22:30:00']);
		});
	});
	describe('listZonedDateTimeQueryParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listZonedDateTimeQueryParam([
				'2024-01-01T10:00:00Z',
				'2024-12-31T22:30:00+02:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01T10:00:00Z', '2024-12-31T22:30:00+02:00']);
		});
	});
	describe('listScalarQueryParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listScalarQueryParam(['Europe/Vienna', 'America/New_York']);
			expect(error).toBeNull();
			expect(result).toEqual(['Europe/Vienna', 'America/New_York']);
		});
	});
	describe('listEnumQueryParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listEnumQueryParam(['A', 'B', 'A']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'B', 'A']);
		});
	});
	describe('listInlineEnumQueryParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listInlineEnumQueryParam(['A', 'A', 'B']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'A', 'B']);
		});
	});
	describe('listMultiQueryParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listMultiQueryParam(
				['one', 'two', 'three'],
				[1, 2, 3],
				[
					{ key: 'a', version: 'v1', value: 'Value1' },
					{ key: 'b', version: 'v2', value: 'Value2' },
					{ key: 'c', version: 'v3', value: 'Value3' },
				],
			);
			expect(error).toBeNull();
			expect(result).toEqual('one,two,three-1,2,3-a,b,c');
		});
	});
	describe('listRecordQueryParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listRecordQueryParam([
				{ key: 'key1', version: '1', value: 'value1' },
				{ key: 'key2', version: '2', value: 'value2' },
			]);
			expect(error).toBeNull();
			expect(result).toStrictEqual([
				{ key: 'key1', version: '1', value: 'value1' },
				{ key: 'key2', version: '2', value: 'value2' },
			]);
		});
	});
});
