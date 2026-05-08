import { describe, expect, test } from 'vitest';

import { createListBodyParameterTypesService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import { createOpenAPIListBodyParameterTypesService } from '../../test-specs/gen-out/client/typescript-client-openapi/src/adapter/ListBodyParameterTypesService.adapter.js';

const jsonService = createListBodyParameterTypesService({
	baseUrl: 'http://localhost:3000',
});

const msgpackService = createListBodyParameterTypesService({
	baseUrl: 'http://localhost:3000',
	encoding: 'application/vnd.msgpack',
});

const openapiService = createOpenAPIListBodyParameterTypesService({ baseUrl: 'http://localhost:3000' });

const json = { service: jsonService, encoding: 'application/json' as const };
const msgpack = { service: msgpackService, encoding: 'application/vnd.msgpack' as const };

const openapi = {
	encoding: 'application/json via openapi' as const,
	service: openapiService,
};

describe('ListBodyParameterTypesServiceFetchImpl', () => {
	describe('listBooleanBodyParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listBooleanBodyParam([true, false, true]);
			expect(error).toBeNull();
			expect(result).toEqual([true, false, true]);
		});
	});
	describe('listBooleanBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listBooleanBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listBooleanBodyParamOpt([true, false]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listBooleanBodyParamNil', () => {
		test.each([json, msgpack /*, openapi */])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listBooleanBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listBooleanBodyParamNil([false, true]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listBooleanBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listBooleanBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listBooleanBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listBooleanBodyParamOptNil([false, true]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listShortBodyParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listShortBodyParam([100, 200, 300]);
			expect(error).toBeNull();
			expect(result).toEqual([100, 200, 300]);
		});
	});
	describe('listShortBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listShortBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listShortBodyParamOpt([400, 500]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listShortBodyParamNil', () => {
		test.each([json, msgpack /*, openapi*/])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listShortBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listShortBodyParamNil([600, 700]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listShortBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listShortBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listShortBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listShortBodyParamOptNil([800, 900]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listIntBodyParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listIntBodyParam([1, 2, 3, 4, 5]);
			expect(error).toBeNull();
			expect(result).toEqual([1, 2, 3, 4, 5]);
		});
	});
	describe('listIntBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listIntBodyParamOpt(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listIntBodyParamOpt([10, 20, 30]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listIntBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listIntBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listIntBodyParamNil([40, 50, 60]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listIntBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listIntBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listIntBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listIntBodyParamOptNil([70, 80, 90]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listLongBodyParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listLongBodyParam([1000, 2000, 3000]);
			expect(error).toBeNull();
			expect(result).toEqual([1000, 2000, 3000]);
		});
	});
	describe('listLongBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listLongBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listLongBodyParamOpt([4000, 5000]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLongBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listLongBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listLongBodyParamNil([6000, 7000]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLongBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listLongBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listLongBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listLongBodyParamOptNil([8000, 9000]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listFloatBodyParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listFloatBodyParam([1.5, 2.5, 3.5]);
			expect(error).toBeNull();
			expect(result).toEqual([1.5, 2.5, 3.5]);
		});
	});
	describe('listFloatBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listFloatBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listFloatBodyParamOpt([4.5, 5.5]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listFloatBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listFloatBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listFloatBodyParamNil([6.5, 7.5]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listFloatBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listFloatBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listFloatBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listFloatBodyParamOptNil([8.5, 9.5]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listDoubleBodyParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listDoubleBodyParam([1.1, 2.2, 3.3]);
			expect(error).toBeNull();
			expect(result).toEqual([1.1, 2.2, 3.3]);
		});
	});
	describe('listDoubleBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listDoubleBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listDoubleBodyParamOpt([4.4, 5.5]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listDoubleBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listDoubleBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listDoubleBodyParamNil([6.6, 7.7]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listDoubleBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listDoubleBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listDoubleBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listDoubleBodyParamOptNil([8.8, 9.9]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listStringBodyParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listStringBodyParam(['alpha', 'beta', 'gamma']);
			expect(error).toBeNull();
			expect(result).toEqual(['alpha', 'beta', 'gamma']);
		});
	});
	describe('listStringBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listStringBodyParamOpt(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listStringBodyParamOpt(['alpha', 'beta']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listStringBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listStringBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listStringBodyParamNil(['gamma', 'delta']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listStringBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listStringBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listStringBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listStringBodyParamOptNil(['epsilon', 'zeta']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listLocalDateBodyParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateBodyParam(['2024-01-01', '2024-12-31']);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01', '2024-12-31']);
		});
	});
	describe('listLocalDateBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateBodyParamOpt(['2024-06-15', '2024-07-20']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLocalDateBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateBodyParamNil(['2024-08-25', '2024-09-30']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLocalDateBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateBodyParamOptNil(['2024-10-05', '2024-11-15']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listLocalDateTimeBodyParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateTimeBodyParam(['2024-01-01T10:00:00', '2024-12-31T22:30:00']);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01T10:00:00', '2024-12-31T22:30:00']);
		});
	});
	describe('listLocalDateTimeBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateTimeBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateTimeBodyParamOpt([
				'2024-06-15T12:00:00',
				'2024-07-20T14:30:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLocalDateTimeBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateTimeBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateTimeBodyParamNil([
				'2024-08-25T16:00:00',
				'2024-09-30T18:45:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listLocalDateTimeBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateTimeBodyParamOptNil();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateTimeBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateTimeBodyParamOptNil([
				'2024-10-05T20:15:00',
				'2024-11-15T23:59:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listZonedDateTimeBodyParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listZonedDateTimeBodyParam([
				'2024-01-01T10:00:00Z',
				'2024-12-31T22:30:00+02:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual(['2024-01-01T10:00:00Z', '2024-12-31T22:30:00+02:00']);
		});
	});
	describe('listZonedDateTimeBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listZonedDateTimeBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listZonedDateTimeBodyParamOpt([
				'2024-06-15T12:00:00Z',
				'2024-07-20T14:30:00+02:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listZonedDateTimeBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success null with $encoding', async ({ service }) => {
			const [result, error] = await service.listZonedDateTimeBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listZonedDateTimeBodyParamNil([
				'2024-08-25T16:00:00Z',
				'2024-09-30T18:45:00+02:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listZonedDateTimeBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listZonedDateTimeBodyParamOptNil();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success null with $encoding', async ({ service }) => {
			const [result, error] = await service.listZonedDateTimeBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listZonedDateTimeBodyParamOptNil([
				'2024-10-05T20:15:00Z',
				'2024-11-15T23:59:00+02:00',
			]);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listScalarBodyParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listScalarBodyParam(['Europe/Vienna', 'America/New_York']);
			expect(error).toBeNull();
			expect(result).toEqual(['Europe/Vienna', 'America/New_York']);
		});
	});
	describe('listScalarBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listScalarBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listScalarBodyParamOpt(['Asia/Tokyo', 'Australia/Sydney']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listScalarBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success null with $encoding', async ({ service }) => {
			const [result, error] = await service.listScalarBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listScalarBodyParamNil(['Africa/Cairo', 'Europe/London']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listScalarBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listScalarBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success null with $encoding', async ({ service }) => {
			const [result, error] = await service.listScalarBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listScalarBodyParamOptNil(['America/Los_Angeles', 'Europe/Berlin']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listEnumBodyParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listEnumBodyParam(['A', 'B', 'A']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'B', 'A']);
		});
	});
	describe('listEnumBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listEnumBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listEnumBodyParamOpt(['A', 'B', 'A']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listEnumBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success null with $encoding', async ({ service }) => {
			const [result, error] = await service.listEnumBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listEnumBodyParamNil(['A', 'B', 'A']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listEnumBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listEnumBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success null with $encoding', async ({ service }) => {
			const [result, error] = await service.listEnumBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listEnumBodyParamOptNil(['A', 'B', 'A']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listInlineEnumBodyParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.listInlineEnumBodyParam(['A', 'A', 'B']);
			expect(error).toBeNull();
			expect(result).toEqual(['A', 'A', 'B']);
		});
	});
	describe('listInlineEnumBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listInlineEnumBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listInlineEnumBodyParamOpt(['B', 'A', 'B']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listInlineEnumBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success null with $encoding', async ({ service }) => {
			const [result, error] = await service.listInlineEnumBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listInlineEnumBodyParamNil(['C', 'D', 'C']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});
	describe('listInlineEnumBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listInlineEnumBodyParamOptNil();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success null with $encoding', async ({ service }) => {
			const [result, error] = await service.listInlineEnumBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success defined with $encoding', async ({ service }) => {
			const [result, error] = await service.listInlineEnumBodyParamOptNil(['C', 'C', 'C']);
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
	});

	describe('listMultiBodyParam', () => {
		test.each([json, msgpack, openapi])('success with $encoding', async ({ service }) => {
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
		test.each([json, msgpack, openapi])('success undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listMultiBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual(['UNDEFINED', 'UNDEFINED', 'UNDEFINED']);
		});
		test.each([json, msgpack, openapi])('success defined with $encoding', async ({ service }) => {
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
		test.each([json, msgpack, openapi])('success null with $encoding', async ({ service }) => {
			const [result, error] = await service.listMultiBodyParamNil(null, null, null);
			expect(error).toBeNull();
			expect(result).toEqual(['NULL', 'NULL', 'NULL']);
		});
		test.each([json, msgpack, openapi])('success defined with $encoding', async ({ service }) => {
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
		test.each([json, msgpack, openapi])('success undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.listMultiBodyParamOptNil(undefined, undefined, undefined);
			expect(error).toBeNull();
			expect(result).toEqual(['UNDEFINED', 'UNDEFINED', 'UNDEFINED']);
		});
		test.each([json, msgpack, openapi])('success null with $encoding', async ({ service }) => {
			const [result, error] = await service.listMultiBodyParamOptNil(null, null, null);
			expect(error).toBeNull();
			expect(result).toEqual(['NULL', 'NULL', 'NULL']);
		});
		test.each([json, msgpack, openapi])('success defined with $encoding', async ({ service }) => {
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
		test.each([json, msgpack, openapi])('success mixed with $encoding', async ({ service }) => {
			const [result, error] = await service.listMultiBodyParamOptNil(undefined, null, [
				{ key: 'j', version: 'v10', value: 'Value10' },
				{ key: 'k', version: 'v11', value: 'Value11' },
			]);
			expect(error).toBeNull();
			expect(result).toEqual(['UNDEFINED', 'NULL', 'DEFINED']);
		});
	});
});
