import { describe, expect, test } from 'vitest';

import { createListQueryParameterTypesService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';

const service = createListQueryParameterTypesService({
	baseUrl: 'http://localhost:3000',
});

describe('ListQueryParameterTypesServiceFetchImpl', () => {
	describe('listBooleanQueryParam', () => {
		test('success', async () => {
			const [result, error] = await service.listBooleanQueryParam([true, false, true]);
			expect(error).toBeNull();
			expect(result).toEqual([true, false, true]);
		});
	});
	describe('listShortQueryParam', () => {
		test('success', async () => {
			const [result, error] = await service.listShortQueryParam([100, 200, 300]);
			expect(error).toBeNull();
			expect(result).toEqual([100, 200, 300]);
		});
	});
	describe('listIntQueryParam', () => {
		test('success', async () => {
			const [result, error] = await service.listIntQueryParam([1, 2, 3, 4, 5]);
			expect(error).toBeNull();
			expect(result).toEqual([1, 2, 3, 4, 5]);
		});
	});
	describe('listLongQueryParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLongQueryParam([1000, 2000, 3000]);
			expect(error).toBeNull();
			expect(result).toEqual([1000, 2000, 3000]);
		});
	});
	describe('listFloatQueryParam', () => {
		test('success', async () => {
			const [result, error] = await service.listFloatQueryParam([1.5, 2.5, 3.5]);
			expect(error).toBeNull();
			expect(result).toEqual([1.5, 2.5, 3.5]);
		});
	});
	describe('listDoubleQueryParam', () => {
		test('success', async () => {
			const [result, error] = await service.listDoubleQueryParam([1.1, 2.2, 3.3]);
			expect(error).toBeNull();
			expect(result).toEqual([1.1, 2.2, 3.3]);
		});
	});
	describe('listStringQueryParam', () => {
		test('success', async () => {
			const [result, error] = await service.listStringQueryParam(['alpha', 'beta', 'gamma']);
			expect(error).toBeNull();
			expect(result).toEqual(['alpha', 'beta', 'gamma']);
		});
	});
	describe('listLocalDateQueryParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLocalDateQueryParam(['2024-01-01', '2024-12-31']);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01', '2024-12-31']);
		});
	});
	describe('listLocalDateTimeQueryParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLocalDateTimeQueryParam(['2024-01-01T10:00:00', '2024-12-31T22:30:00']);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01T10:00:00', '2024-12-31T22:30:00']);
		});
	});
	describe('listZonedDateTimeQueryParam', () => {
		test('success', async () => {
			const [result, error] = await service.listZonedDateTimeQueryParam([
				'2024-01-01T10:00:00Z',
				'2024-12-31T22:30:00+02:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01T10:00:00Z', '2024-12-31T22:30:00+02:00']);
		});
	});
	describe('listScalarQueryParam', () => {
		test('success', async () => {
			const [result, error] = await service.listScalarQueryParam(['Europe/Vienna', 'America/New_York']);
			expect(error).toBeNull();
			expect(result).toEqual(['Europe/Vienna', 'America/New_York']);
		});
	});
	describe('listEnumQueryParam', () => {
		test('success', async () => {
			const [result, error] = await service.listEnumQueryParam(['A', 'B', 'A']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'B', 'A']);
		});
	});
	describe('listInlineEnumQueryParam', () => {
		test('success', async () => {
			const [result, error] = await service.listInlineEnumQueryParam(['A', 'A', 'B']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'A', 'B']);
		});
	});
	describe('listMultiQueryParam', () => {
		test('success', async () => {
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
});
