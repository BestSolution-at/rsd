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
	describe('listBooleanBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listBooleanBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listBooleanBodyParamOpt([true, false]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listBooleanBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.listBooleanBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listBooleanBodyParamNil([false, true]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listBooleanBodyParamNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listBooleanBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.listBooleanBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listBooleanBodyParamOptNil([false, true]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listShortBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listShortBodyParam([100, 200, 300]);
			expect(error).toBeNull();
			expect(result).toEqual([100, 200, 300]);
		});
	});
	describe('listShortBodyParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listShortBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listShortBodyParamOpt([400, 500]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listShortBodyParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listShortBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listShortBodyParamNil([600, 700]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listShortBodyParamOptNil', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listShortBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success null', async () => {
			const [result, error] = await service.listShortBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listShortBodyParamOptNil([800, 900]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listIntBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listIntBodyParam([1, 2, 3, 4, 5]);
			expect(error).toBeNull();
			expect(result).toEqual([1, 2, 3, 4, 5]);
		});
	});
	describe('listIntBodyParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listIntBodyParamOpt(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listIntBodyParamOpt([10, 20, 30]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listIntBodyParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listIntBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listIntBodyParamNil([40, 50, 60]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listIntBodyParamOptNil', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listIntBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success null', async () => {
			const [result, error] = await service.listIntBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listIntBodyParamOptNil([70, 80, 90]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listLongBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLongBodyParam([1000, 2000, 3000]);
			expect(error).toBeNull();
			expect(result).toEqual([1000, 2000, 3000]);
		});
	});
	describe('listLongBodyParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listLongBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listLongBodyParamOpt([4000, 5000]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLongBodyParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listLongBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listLongBodyParamNil([6000, 7000]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLongBodyParamOptNil', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listLongBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success null', async () => {
			const [result, error] = await service.listLongBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listLongBodyParamOptNil([8000, 9000]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listFloatBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listFloatBodyParam([1.5, 2.5, 3.5]);
			expect(error).toBeNull();
			expect(result).toEqual([1.5, 2.5, 3.5]);
		});
	});
	describe('listFloatBodyParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listFloatBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listFloatBodyParamOpt([4.5, 5.5]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listFloatBodyParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listFloatBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listFloatBodyParamNil([6.5, 7.5]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listFloatBodyParamOptNil', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listFloatBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success null', async () => {
			const [result, error] = await service.listFloatBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listFloatBodyParamOptNil([8.5, 9.5]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listDoubleBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listDoubleBodyParam([1.1, 2.2, 3.3]);
			expect(error).toBeNull();
			expect(result).toEqual([1.1, 2.2, 3.3]);
		});
	});
	describe('listDoubleBodyParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listDoubleBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listDoubleBodyParamOpt([4.4, 5.5]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listDoubleBodyParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listDoubleBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listDoubleBodyParamNil([6.6, 7.7]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listDoubleBodyParamOptNil', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listDoubleBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success null', async () => {
			const [result, error] = await service.listDoubleBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listDoubleBodyParamOptNil([8.8, 9.9]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listStringBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listStringBodyParam(['alpha', 'beta', 'gamma']);
			expect(error).toBeNull();
			expect(result).toEqual(['alpha', 'beta', 'gamma']);
		});
	});
	describe('listStringBodyParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listStringBodyParamOpt(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listStringBodyParamOpt(['alpha', 'beta']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listStringBodyParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listStringBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listStringBodyParamNil(['gamma', 'delta']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listStringBodyParamOptNil', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listStringBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success null', async () => {
			const [result, error] = await service.listStringBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listStringBodyParamOptNil(['epsilon', 'zeta']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listLocalDateBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLocalDateBodyParam(['2024-01-01', '2024-12-31']);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01', '2024-12-31']);
		});
	});
	describe('listLocalDateBodyParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listLocalDateBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listLocalDateBodyParamOpt(['2024-06-15', '2024-07-20']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLocalDateBodyParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listLocalDateBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listLocalDateBodyParamNil(['2024-08-25', '2024-09-30']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLocalDateBodyParamOptNil', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listLocalDateBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success null', async () => {
			const [result, error] = await service.listLocalDateBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listLocalDateBodyParamOptNil(['2024-10-05', '2024-11-15']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listLocalDateTimeBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLocalDateTimeBodyParam(['2024-01-01T10:00:00', '2024-12-31T22:30:00']);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01T10:00:00', '2024-12-31T22:30:00']);
		});
	});
	describe('listLocalDateTimeBodyParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listLocalDateTimeBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listLocalDateTimeBodyParamOpt([
				'2024-06-15T12:00:00',
				'2024-07-20T14:30:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLocalDateTimeBodyParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listLocalDateTimeBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listLocalDateTimeBodyParamNil([
				'2024-08-25T16:00:00',
				'2024-09-30T18:45:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLocalDateTimeBodyParamOptNil', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listLocalDateTimeBodyParamOptNil();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success null', async () => {
			const [result, error] = await service.listLocalDateTimeBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listLocalDateTimeBodyParamOptNil([
				'2024-10-05T20:15:00',
				'2024-11-15T23:59:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
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
	describe('listZonedDateTimeBodyParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listZonedDateTimeBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listZonedDateTimeBodyParamOpt([
				'2024-06-15T12:00:00Z',
				'2024-07-20T14:30:00+02:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listZonedDateTimeBodyParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listZonedDateTimeBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listZonedDateTimeBodyParamNil([
				'2024-08-25T16:00:00Z',
				'2024-09-30T18:45:00+02:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listZonedDateTimeBodyParamOptNil', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listZonedDateTimeBodyParamOptNil();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success null', async () => {
			const [result, error] = await service.listZonedDateTimeBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listZonedDateTimeBodyParamOptNil([
				'2024-10-05T20:15:00Z',
				'2024-11-15T23:59:00+02:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listScalarBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listScalarBodyParam(['Europe/Vienna', 'America/New_York']);
			expect(error).toBeNull();
			expect(result).toEqual(['Europe/Vienna', 'America/New_York']);
		});
	});
	describe('listScalarBodyParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listScalarBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listScalarBodyParamOpt(['Asia/Tokyo', 'Australia/Sydney']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listScalarBodyParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listScalarBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listScalarBodyParamNil(['Africa/Cairo', 'Europe/London']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listScalarBodyParamOptNil', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listScalarBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success null', async () => {
			const [result, error] = await service.listScalarBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listScalarBodyParamOptNil(['America/Los_Angeles', 'Europe/Berlin']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listEnumBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listEnumBodyParam(['A', 'B', 'A']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'B', 'A']);
		});
	});
	describe('listEnumBodyParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listEnumBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listEnumBodyParamOpt(['A', 'B', 'A']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listEnumBodyParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listEnumBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listEnumBodyParamNil(['A', 'B', 'A']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listEnumBodyParamOptNil', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listEnumBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success null', async () => {
			const [result, error] = await service.listEnumBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listEnumBodyParamOptNil(['A', 'B', 'A']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listInlineEnumBodyParam', () => {
		test('success', async () => {
			const [result, error] = await service.listInlineEnumBodyParam(['A', 'A', 'B']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'A', 'B']);
		});
	});
	describe('listInlineEnumBodyParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listInlineEnumBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listInlineEnumBodyParamOpt(['B', 'A', 'B']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listInlineEnumBodyParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listInlineEnumBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listInlineEnumBodyParamNil(['C', 'D', 'C']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listInlineEnumBodyParamOptNil', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listInlineEnumBodyParamOptNil();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success null', async () => {
			const [result, error] = await service.listInlineEnumBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listInlineEnumBodyParamOptNil(['C', 'C', 'C']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
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
	describe('listMultiBodyParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listMultiBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual(['UNDEFINED', 'UNDEFINED', 'UNDEFINED']);
		});
		test('success defined', async () => {
			const [result, error] = await service.listMultiBodyParamOpt(
				['four', 'five'],
				[4, 5],
				[
					{ key: 'd', version: 'v4', value: 'Value4' },
					{ key: 'e', version: 'v5', value: 'Value5' },
				],
			);
			expect(error).toBeNull();
			expect(result).toEqual(['DEFINED', 'DEFINED', 'DEFINED']);
		});
	});
	describe('listMultiBodyParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listMultiBodyParamNil(null, null, null);
			expect(error).toBeNull();
			expect(result).toEqual(['NULL', 'NULL', 'NULL']);
		});
		test('success defined', async () => {
			const [result, error] = await service.listMultiBodyParamNil(
				['six', 'seven'],
				[6, 7],
				[
					{ key: 'f', version: 'v6', value: 'Value6' },
					{ key: 'g', version: 'v7', value: 'Value7' },
				],
			);
			expect(error).toBeNull();
			expect(result).toEqual(['DEFINED', 'DEFINED', 'DEFINED']);
		});
	});
	describe('listMultiBodyParamOptNil', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listMultiBodyParamOptNil(undefined, undefined, undefined);
			expect(error).toBeNull();
			expect(result).toEqual(['UNDEFINED', 'UNDEFINED', 'UNDEFINED']);
		});
		test('success null', async () => {
			const [result, error] = await service.listMultiBodyParamOptNil(null, null, null);
			expect(error).toBeNull();
			expect(result).toEqual(['NULL', 'NULL', 'NULL']);
		});
		test('success defined', async () => {
			const [result, error] = await service.listMultiBodyParamOptNil(
				['eight', 'nine'],
				[8, 9],
				[
					{ key: 'h', version: 'v8', value: 'Value8' },
					{ key: 'i', version: 'v9', value: 'Value9' },
				],
			);
			expect(error).toBeNull();
			expect(result).toEqual(['DEFINED', 'DEFINED', 'DEFINED']);
		});
		test('success mixed', async () => {
			const [result, error] = await service.listMultiBodyParamOptNil(undefined, null, [
				{ key: 'j', version: 'v10', value: 'Value10' },
				{ key: 'k', version: 'v11', value: 'Value11' },
			]);
			expect(error).toBeNull();
			expect(result).toEqual(['UNDEFINED', 'NULL', 'DEFINED']);
		});
	});
});
