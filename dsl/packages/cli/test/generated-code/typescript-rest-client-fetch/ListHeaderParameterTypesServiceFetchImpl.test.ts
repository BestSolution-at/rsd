import { describe, expect, test } from 'vitest';

import { createListHeaderParameterTypesService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';

const service = createListHeaderParameterTypesService({
	baseUrl: 'http://localhost:3000',
});

describe('ListHeaderParameterTypesServiceFetchImpl', () => {
	describe('listBooleanHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listBooleanHeaderParam([true, false, true]);
			expect(error).toBeNull();
			expect(result).toEqual([true, false, true]);
		});
	});
	describe('listShortHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listShortHeaderParam([100, 200, 300]);
			expect(error).toBeNull();
			expect(result).toEqual([100, 200, 300]);
		});
	});
	describe('listIntHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listIntHeaderParam([1, 2, 3, 4, 5]);
			expect(error).toBeNull();
			expect(result).toEqual([1, 2, 3, 4, 5]);
		});
	});
	describe('listLongHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLongHeaderParam([1000, 2000, 3000]);
			expect(error).toBeNull();
			expect(result).toEqual([1000, 2000, 3000]);
		});
	});
	describe('listFloatHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listFloatHeaderParam([1.5, 2.5, 3.5]);
			expect(error).toBeNull();
			expect(result).toEqual([1.5, 2.5, 3.5]);
		});
	});
	describe('listDoubleHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listDoubleHeaderParam([1.1, 2.2, 3.3]);
			expect(error).toBeNull();
			expect(result).toEqual([1.1, 2.2, 3.3]);
		});
	});
	describe('listStringHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listStringHeaderParam(['alpha', 'beta', 'gamma']);
			expect(error).toBeNull();
			expect(result).toEqual(['alpha', 'beta', 'gamma']);
		});
	});
	describe('listLocalDateHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLocalDateHeaderParam(['2024-01-01', '2024-12-31']);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01', '2024-12-31']);
		});
	});
	describe('listLocalDateTimeHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLocalDateTimeHeaderParam([
				'2024-01-01T10:00:00',
				'2024-12-31T22:30:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01T10:00:00', '2024-12-31T22:30:00']);
		});
	});
	describe('listZonedDateTimeHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listZonedDateTimeHeaderParam([
				'2024-01-01T10:00:00Z',
				'2024-12-31T22:30:00+02:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01T10:00:00Z', '2024-12-31T22:30:00+02:00']);
		});
	});
	describe('listScalarHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listScalarHeaderParam(['Europe/Vienna', 'America/New_York']);
			expect(error).toBeNull();
			expect(result).toEqual(['Europe/Vienna', 'America/New_York']);
		});
	});
	describe('listEnumHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listEnumHeaderParam(['A', 'B', 'A']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'B', 'A']);
		});
	});
	describe('listInlineEnumHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listInlineEnumHeaderParam(['A', 'A', 'B']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'A', 'B']);
		});
	});
	describe('listMultiHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listMultiHeaderParam(
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
	describe('listRecordHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listRecordHeaderParam([
				{ key: 'a', version: 'v1', value: 'Value1' },
				{ key: 'b', version: 'v2', value: 'Value2' },
				{ key: 'c', version: 'v3', value: 'Value3' },
			]);
			expect(error).toBeNull();
			expect(result).toEqual([
				{ key: 'a', version: 'v1', value: 'Value1' },
				{ key: 'b', version: 'v2', value: 'Value2' },
				{ key: 'c', version: 'v3', value: 'Value3' },
			]);
		});
	});
});
