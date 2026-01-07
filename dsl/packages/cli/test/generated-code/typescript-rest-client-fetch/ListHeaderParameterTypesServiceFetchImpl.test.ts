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
		test('success', async () => {
			const [result, error] = await service.listBooleanHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('listBooleanHeaderParamNil', () => {
		test('success', async () => {
			const [result, error] = await service.listBooleanHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
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
	});

	describe('listShortHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listShortHeaderParam([100, 200, 300]);
			expect(error).toBeNull();
			expect(result).toEqual([100, 200, 300]);
		});
	});
	describe('listShortHeaderParamOpt', () => {
		test('success', async () => {
			const [result, error] = await service.listShortHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('listShortHeaderParamNil', () => {
		test('success', async () => {
			const [result, error] = await service.listShortHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
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
	});

	describe('listIntHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listIntHeaderParam([1, 2, 3, 4, 5]);
			expect(error).toBeNull();
			expect(result).toEqual([1, 2, 3, 4, 5]);
		});
	});
	describe('listIntHeaderParamOpt', () => {
		test('success', async () => {
			const [result, error] = await service.listIntHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('listIntHeaderParamNil', () => {
		test('success', async () => {
			const [result, error] = await service.listIntHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
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
	});

	describe('listLongHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLongHeaderParam([1000, 2000, 3000]);
			expect(error).toBeNull();
			expect(result).toEqual([1000, 2000, 3000]);
		});
	});
	describe('listLongHeaderParamOpt', () => {
		test('success', async () => {
			const [result, error] = await service.listLongHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('listLongHeaderParamNil', () => {
		test('success', async () => {
			const [result, error] = await service.listLongHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
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
	});

	describe('listFloatHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listFloatHeaderParam([1.5, 2.5, 3.5]);
			expect(error).toBeNull();
			expect(result).toEqual([1.5, 2.5, 3.5]);
		});
	});
	describe('listFloatHeaderParamOpt', () => {
		test('success', async () => {
			const [result, error] = await service.listFloatHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('listFloatHeaderParamNil', () => {
		test('success', async () => {
			const [result, error] = await service.listFloatHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
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
	});

	describe('listDoubleHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listDoubleHeaderParam([1.1, 2.2, 3.3]);
			expect(error).toBeNull();
			expect(result).toEqual([1.1, 2.2, 3.3]);
		});
	});
	describe('listDoubleHeaderParamOpt', () => {
		test('success', async () => {
			const [result, error] = await service.listDoubleHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('listDoubleHeaderParamNil', () => {
		test('success', async () => {
			const [result, error] = await service.listDoubleHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
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
	});

	describe('listStringHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listStringHeaderParam(['alpha', 'beta', 'gamma']);
			expect(error).toBeNull();
			expect(result).toEqual(['alpha', 'beta', 'gamma']);
		});
	});
	describe('listStringHeaderParamOpt', () => {
		test('success', async () => {
			const [result, error] = await service.listStringHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('listStringHeaderParamNil', () => {
		test('success', async () => {
			const [result, error] = await service.listStringHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
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
	});

	describe('listLocalDateHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listLocalDateHeaderParam(['2024-01-01', '2024-12-31']);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01', '2024-12-31']);
		});
	});
	describe('listLocalDateHeaderParamOpt', () => {
		test('success', async () => {
			const [result, error] = await service.listLocalDateHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('listLocalDateHeaderParamNil', () => {
		test('success', async () => {
			const [result, error] = await service.listLocalDateHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
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
		test('success', async () => {
			const [result, error] = await service.listLocalDateTimeHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('listLocalDateTimeHeaderParamNil', () => {
		test('success', async () => {
			const [result, error] = await service.listLocalDateTimeHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
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
		test('success', async () => {
			const [result, error] = await service.listZonedDateTimeHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('listZonedDateTimeHeaderParamNil', () => {
		test('success', async () => {
			const [result, error] = await service.listZonedDateTimeHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
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
	});

	describe('listScalarHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listScalarHeaderParam(['Europe/Vienna', 'America/New_York']);
			expect(error).toBeNull();
			expect(result).toEqual(['Europe/Vienna', 'America/New_York']);
		});
	});
	describe('listScalarHeaderParamOpt', () => {
		test('success', async () => {
			const [result, error] = await service.listScalarHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('listScalarHeaderParamNil', () => {
		test('success', async () => {
			const [result, error] = await service.listScalarHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
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
	});

	describe('listEnumHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listEnumHeaderParam(['A', 'B', 'A']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'B', 'A']);
		});
	});
	describe('listEnumHeaderParamOpt', () => {
		test('success', async () => {
			const [result, error] = await service.listEnumHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('listEnumHeaderParamNil', () => {
		test('success', async () => {
			const [result, error] = await service.listEnumHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
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
	});

	describe('listInlineEnumHeaderParam', () => {
		test('success', async () => {
			const [result, error] = await service.listInlineEnumHeaderParam(['A', 'A', 'B']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'A', 'B']);
		});
	});
	describe('listInlineEnumHeaderParamOpt', () => {
		test('success', async () => {
			const [result, error] = await service.listInlineEnumHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('listInlineEnumHeaderParamNil', () => {
		test('success', async () => {
			const [result, error] = await service.listInlineEnumHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
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
			const [result, error] = await service.listMultiHeaderParamOptNil(null, undefined, null);
			expect(error).toBeNull();
			expect(result).toEqual(['NULL', 'UNDEFINED', 'NULL']);
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
