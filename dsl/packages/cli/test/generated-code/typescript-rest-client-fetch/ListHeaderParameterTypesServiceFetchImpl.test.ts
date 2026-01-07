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
	describe('listBooleanHeaderParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listBooleanHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listBooleanHeaderParamOpt([true, true]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listBooleanHeaderParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listBooleanHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listBooleanHeaderParamNil([false, false]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listBooleanHeaderParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listBooleanHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.listBooleanHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listBooleanHeaderParamOptNil([true, false]);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
	});

	describe('listShortHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listShortHeaderParam([100, 200, 300]);
			expect(error).toBeNull();
			expect(result).toEqual([100, 200, 300]);
		});
	});
	describe('listShortHeaderParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listShortHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listShortHeaderParamOpt([400, 500]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listShortHeaderParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listShortHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listShortHeaderParamNil([600, 700]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listShortHeaderParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listShortHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.listShortHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listShortHeaderParamOptNil([800, 900]);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
	});

	describe('listIntHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listIntHeaderParam([1, 2, 3, 4, 5]);
			expect(error).toBeNull();
			expect(result).toEqual([1, 2, 3, 4, 5]);
		});
	});
	describe('listIntHeaderParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listIntHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listIntHeaderParamOpt([6, 7, 8]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listIntHeaderParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listIntHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listIntHeaderParamNil([9, 10]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listIntHeaderParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listIntHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.listIntHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listIntHeaderParamOptNil([11, 12]);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
	});

	describe('listLongHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLongHeaderParam([1000, 2000, 3000]);
			expect(error).toBeNull();
			expect(result).toEqual([1000, 2000, 3000]);
		});
	});
	describe('listLongHeaderParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listLongHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listLongHeaderParamOpt([4000, 5000]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLongHeaderParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listLongHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listLongHeaderParamNil([6000, 7000]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLongHeaderParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listLongHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.listLongHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listLongHeaderParamOptNil([8000, 9000]);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
	});

	describe('listFloatHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listFloatHeaderParam([1.5, 2.5, 3.5]);
			expect(error).toBeNull();
			expect(result).toEqual([1.5, 2.5, 3.5]);
		});
	});
	describe('listFloatHeaderParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listFloatHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listFloatHeaderParamOpt([4.5, 5.5]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listFloatHeaderParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listFloatHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listFloatHeaderParamNil([6.5, 7.5]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listFloatHeaderParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listFloatHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.listFloatHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listFloatHeaderParamOptNil([8.5, 9.5]);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
	});

	describe('listDoubleHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listDoubleHeaderParam([1.1, 2.2, 3.3]);
			expect(error).toBeNull();
			expect(result).toEqual([1.1, 2.2, 3.3]);
		});
	});
	describe('listDoubleHeaderParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listDoubleHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listDoubleHeaderParamOpt([4.4, 5.5]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listDoubleHeaderParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listDoubleHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listDoubleHeaderParamNil([6.6, 7.7]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listDoubleHeaderParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listDoubleHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.listDoubleHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listDoubleHeaderParamOptNil([8.8, 9.9]);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
	});

	describe('listStringHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listStringHeaderParam(['alpha', 'beta', 'gamma']);
			expect(error).toBeNull();
			expect(result).toEqual(['alpha', 'beta', 'gamma']);
		});
	});
	describe('listStringHeaderParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listStringHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listStringHeaderParamOpt(['delta', 'epsilon']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listStringHeaderParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listStringHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listStringHeaderParamNil(['zeta', 'eta']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listStringHeaderParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listStringHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.listStringHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listStringHeaderParamOptNil(['theta', 'iota']);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
	});

	describe('listLocalDateHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLocalDateHeaderParam(['2024-01-01', '2024-12-31']);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01', '2024-12-31']);
		});
	});
	describe('listLocalDateHeaderParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listLocalDateHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listLocalDateHeaderParamOpt(['2024-06-15', '2024-07-20']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLocalDateHeaderParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listLocalDateHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listLocalDateHeaderParamNil(['2024-08-25', '2024-09-30']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLocalDateHeaderParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listLocalDateHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.listLocalDateHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listLocalDateHeaderParamOptNil(['2024-10-10', '2024-11-11']);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
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
	describe('listLocalDateTimeHeaderParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listLocalDateTimeHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listLocalDateTimeHeaderParamOpt([
				'2024-06-15T14:00:00',
				'2024-07-20T16:30:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLocalDateTimeHeaderParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listLocalDateTimeHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listLocalDateTimeHeaderParamNil([
				'2024-08-25T09:15:00',
				'2024-09-30T11:45:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLocalDateTimeHeaderParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listLocalDateTimeHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.listLocalDateTimeHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listLocalDateTimeHeaderParamOptNil([
				'2024-10-10T12:00:00',
				'2024-11-11T14:30:00',
			]);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
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
	describe('listZonedDateTimeHeaderParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listZonedDateTimeHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listZonedDateTimeHeaderParamOpt([
				'2024-06-15T14:00:00Z',
				'2024-07-20T16:30:00+01:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listZonedDateTimeHeaderParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listZonedDateTimeHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listZonedDateTimeHeaderParamNil([
				'2024-08-25T09:15:00Z',
				'2024-09-30T11:45:00+02:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listZonedDateTimeHeaderParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listZonedDateTimeHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.listZonedDateTimeHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listZonedDateTimeHeaderParamOptNil([
				'2024-10-10T12:00:00Z',
				'2024-11-11T14:30:00+02:00',
			]);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
	});

	describe('listScalarHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listScalarHeaderParam(['Europe/Vienna', 'America/New_York']);
			expect(error).toBeNull();
			expect(result).toEqual(['Europe/Vienna', 'America/New_York']);
		});
	});
	describe('listScalarHeaderParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listScalarHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listScalarHeaderParamOpt(['Asia/Tokyo', 'Australia/Sydney']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listScalarHeaderParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listScalarHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listScalarHeaderParamNil(['Africa/Cairo', 'Europe/London']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listScalarHeaderParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listScalarHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.listScalarHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listScalarHeaderParamOptNil(['America/Los_Angeles']);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
	});

	describe('listEnumHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listEnumHeaderParam(['A', 'B', 'A']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'B', 'A']);
		});
	});
	describe('listEnumHeaderParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listEnumHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listEnumHeaderParamOpt(['B', 'B']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listEnumHeaderParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listEnumHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listEnumHeaderParamNil(['A', 'A']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listEnumHeaderParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listEnumHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.listEnumHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listEnumHeaderParamOptNil(['B', 'A']);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
	});

	describe('listInlineEnumHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listInlineEnumHeaderParam(['A', 'A', 'B']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'A', 'B']);
		});
	});
	describe('listInlineEnumHeaderParamOpt', () => {
		test('success undefined', async () => {
			const [result, error] = await service.listInlineEnumHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test('success defined', async () => {
			const [result, error] = await service.listInlineEnumHeaderParamOpt(['B', 'B']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listInlineEnumHeaderParamNil', () => {
		test('success null', async () => {
			const [result, error] = await service.listInlineEnumHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success defined', async () => {
			const [result, error] = await service.listInlineEnumHeaderParamNil(['C', 'D']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listInlineEnumHeaderParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listInlineEnumHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.listInlineEnumHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - defined', async () => {
			const [result, error] = await service.listInlineEnumHeaderParamOptNil(['C', 'D']);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
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
	describe('listMultiHeaderParamOpt', () => {
		test('success', async () => {
			const [result, error] = await service.listMultiHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual(['UNDEFINED', 'UNDEFINED', 'UNDEFINED']);
		});
	});
	describe('listMultiHeaderParamNil', () => {
		test('success', async () => {
			const [result, error] = await service.listMultiHeaderParamNil(null, null, null);
			expect(error).toBeNull();
			expect(result).toEqual(['NULL', 'NULL', 'NULL']);
		});
	});
	describe('listMultiHeaderParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listMultiHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toEqual(['UNDEFINED', 'UNDEFINED', 'UNDEFINED']);
		});
		test('success - null', async () => {
			const [result, error] = await service.listMultiHeaderParamOptNil(null, null, null);
			expect(error).toBeNull();
			expect(result).toEqual(['NULL', 'NULL', 'NULL']);
		});
		test('success - mix', async () => {
			const [result, error] = await service.listMultiHeaderParamOptNil(['x'], undefined, null);
			expect(error).toBeNull();
			expect(result).toEqual(['DEFINED', 'UNDEFINED', 'NULL']);
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
	describe('listRecordHeaderParamOpt', () => {
		test('success', async () => {
			const [result, error] = await service.listRecordHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('listRecordHeaderParamNil', () => {
		test('success', async () => {
			const [result, error] = await service.listRecordHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
	});
	describe('listRecordHeaderParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.listRecordHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.listRecordHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
});
