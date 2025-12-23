import { describe, expect, test } from 'vitest';

import { createListBodyParameterTypesService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';

const service = createListBodyParameterTypesService({
	baseUrl: 'http://localhost:3000',
});

describe('ListBodyParameterTypesServiceFetchImpl', () => {
	describe('listBooleanBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listBooleanBodyParam([true, false, true]);
			expect(error).toBeNull();
			expect(result).toEqual([true, false, true]);
		});
	});
	describe('listShortBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listShortBodyParam([100, 200, 300]);
			expect(error).toBeNull();
			expect(result).toEqual([100, 200, 300]);
		});
	});
	describe('listIntBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listIntBodyParam([1, 2, 3, 4, 5]);
			expect(error).toBeNull();
			expect(result).toEqual([1, 2, 3, 4, 5]);
		});
	});
	describe('listLongBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLongBodyParam([1000, 2000, 3000]);
			expect(error).toBeNull();
			expect(result).toEqual([1000, 2000, 3000]);
		});
	});
	describe('listFloatBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listFloatBodyParam([1.5, 2.5, 3.5]);
			expect(error).toBeNull();
			expect(result).toEqual([1.5, 2.5, 3.5]);
		});
	});
	describe('listDoubleBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listDoubleBodyParam([1.1, 2.2, 3.3]);
			expect(error).toBeNull();
			expect(result).toEqual([1.1, 2.2, 3.3]);
		});
	});
	describe('listStringBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listStringBodyParam(['alpha', 'beta', 'gamma']);
			expect(error).toBeNull();
			expect(result).toEqual(['alpha', 'beta', 'gamma']);
		});
	});
	describe('listLocalDateBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLocalDateBodyParam(['2024-01-01', '2024-12-31']);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01', '2024-12-31']);
		});
	});
	describe('listLocalDateTimeBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLocalDateTimeBodyParam(['2024-01-01T10:00:00', '2024-12-31T22:30:00']);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01T10:00:00', '2024-12-31T22:30:00']);
		});
	});
	describe('listZonedDateTimeBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listZonedDateTimeBodyParam([
				'2024-01-01T10:00:00Z',
				'2024-12-31T22:30:00+02:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01T10:00:00Z', '2024-12-31T22:30:00+02:00']);
		});
	});
	describe('listScalarBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listScalarBodyParam(['Europe/Vienna', 'America/New_York']);
			expect(error).toBeNull();
			expect(result).toEqual(['Europe/Vienna', 'America/New_York']);
		});
	});
	describe('listEnumBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listEnumBodyParam(['A', 'B', 'A']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'B', 'A']);
		});
	});
	describe('listInlineEnumBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listInlineEnumBodyParam(['A', 'A', 'B']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'A', 'B']);
		});
	});
	describe('listMultiBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listMultiBodyParam(
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
