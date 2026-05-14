import { describe, expect, test } from 'vitest';

import { createQueryParameterTypesService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import { createOpenAPIQueryParameterTypesService } from '../../test-specs/gen-out/client/typescript-client-openapi/src/adapter/QueryParameterTypesService.adapter.js';

const jsonService = createQueryParameterTypesService({
	baseUrl: 'http://localhost:3000',
});

const msgpackService = createQueryParameterTypesService({
	baseUrl: 'http://localhost:3000',
	encoding: 'application/vnd.msgpack',
});

const openapiService = createOpenAPIQueryParameterTypesService({
	baseUrl: 'http://localhost:3000',
});

const json = { service: jsonService, encoding: 'application/json' as const };
const msgpack = { service: msgpackService, encoding: 'application/vnd.msgpack' as const };
const openapi = { service: openapiService, encoding: 'application/json - openapi' as const };

describe('SingleQueryParameterTypesService', () => {
	describe('simpleBooleanQueryParam', () => {
		test.each([json, msgpack, openapi])('success - true - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanQueryParam(true);
			expect(error).toBeNull();
			expect(result).toBe(true);
		});
		test.each([json, msgpack, openapi])('success - false - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanQueryParam(false);
			expect(error).toBeNull();
			expect(result).toBe(false);
		});
	});
	describe('simpleBooleanQueryParamOpt', () => {
		test.each([json, msgpack, openapi])('success - true - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanQueryParamOpt(true);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
		test.each([json, msgpack, openapi])('success - false - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanQueryParamOpt(false);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleShortQueryParam', () => {
		test.each([json, msgpack, openapi])('success - 12345 - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleShortQueryParam(12345);
			expect(error).toBeNull();
			expect(result).toBe(12345);
		});
	});
	describe('simpleShortQueryParamOpt', () => {
		test.each([json, msgpack, openapi])('success - 12345 - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleShortQueryParamOpt(12345);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleShortQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleIntQueryParam', () => {
		test.each([json, msgpack, openapi])('success - 123456789 - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleIntQueryParam(123456789);
			expect(error).toBeNull();
			expect(result).toBe(123456789);
		});
	});
	describe('simpleIntQueryParamOpt', () => {
		test.each([json, msgpack, openapi])('success - 123456789 - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleIntQueryParamOpt(123456789);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleIntQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLongQueryParam', () => {
		test.each([json, msgpack, openapi])('success - 1234567890123 - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLongQueryParam(1234567890123);
			expect(error).toBeNull();
			expect(result).toBe(1234567890123);
		});
	});
	describe('simpleLongQueryParamOpt', () => {
		test.each([json, msgpack, openapi])('success - 1234567890123 - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLongQueryParamOpt(1234567890123);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLongQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleFloatQueryParam', () => {
		test.each([json, msgpack, openapi])('success - 12.34 - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleFloatQueryParam(12.34);
			expect(error).toBeNull();
			expect(result).toBe(12.34000015258789);
		});
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleFloatQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleDoubleQueryParam', () => {
		test.each([json, msgpack, openapi])('success - 12.3456789 - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleDoubleQueryParam(12.3456789);
			expect(error).toBeNull();
			expect(result).toBe(12.3456789);
		});
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleDoubleQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleStringQueryParam', () => {
		test.each([json, msgpack, openapi])('success - Hello, World! - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringQueryParam('Hello, World!');
			expect(error).toBeNull();
			expect(result).toBe('Hello, World!');
		});
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLocalDateQueryParam', () => {
		test.each([json, msgpack, openapi])('success - 2024-01-01 - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateQueryParam('2024-01-01');
			expect(error).toBeNull();
			expect(result).toBe('2024-01-01');
		});
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLocalDateTimeQueryParam', () => {
		test.each([json, msgpack, openapi])('success - 2024-01-01T12:34:56 - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateTimeQueryParam('2024-01-01T12:34:56');
			expect(error).toBeNull();
			expect(result).toBe('2024-01-01T12:34:56');
		});
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateTimeQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLocalTimeQueryParam', () => {
		test.each([json, msgpack, openapi])('success - 10:00:00 - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalTimeQueryParam('10:00:00');
			expect(error).toBeNull();
			expect(result).toBe('10:00:00');
		});
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalTimeQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleOffsetDateTimeQueryParam', () => {
		test.each([json, msgpack, openapi])('success - 2025-01-01T10:00:00+01:00 - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleOffsetDateTimeQueryParam('2025-01-01T10:00:00+01:00');
			expect(error).toBeNull();
			expect(result).toBe('2025-01-01T10:00:00+01:00');
		});
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleOffsetDateTimeQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleZonedDateTimeQueryParam', () => {
		test.each([json, msgpack, openapi])('success - 2024-01-01T12:34:56Z - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleZonedDateTimeQueryParam('2024-01-01T12:34:56Z');
			expect(error).toBeNull();
			expect(result).toBe('2024-01-01T12:34:56Z');
		});
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleZonedDateTimeQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleScalarQueryParam', () => {
		test.each([json, msgpack, openapi])('success - ScalarValue - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleScalarQueryParam('Europe/Vienna');
			expect(error).toBeNull();
			expect(result).toBe('Europe/Vienna');
		});
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleScalarQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleEnumQueryParam', () => {
		test.each([json, msgpack, openapi])('success - A - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleEnumQueryParam('A');
			expect(error).toBeNull();
			expect(result).toBe('A');
		});
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleEnumQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('multiQueryParam', () => {
		test.each([json, msgpack, openapi])('success - ["Hello","1"] - $encoding', async ({ service }) => {
			const [result, error] = await service.multiQueryParam('Hello', 1);
			expect(error).toBeNull();
			expect(result).toEqual('Hello-1');
		});
	});
	describe('multiQueryParamOpt', () => {
		test.each([json, msgpack, openapi])('success - ["Hello","1"] - $encoding', async ({ service }) => {
			const [result, error] = await service.multiQueryParamOpt('Hello', 1);
			expect(error).toBeNull();
			expect(result).toEqual('Hello-1');
		});
		test.each([json, msgpack, openapi])('success - ["hello"] - $encoding', async ({ service }) => {
			const [result, error] = await service.multiQueryParamOpt('Hello');
			expect(error).toBeNull();
			expect(result).toEqual('Hello-undefined');
		});
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.multiQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('undefined-undefined');
		});
	});
	describe('recordQueryParam', () => {
		test.each([json, msgpack, openapi])(
			"success - { key: '1', version: '1', value: 'x' } - $encoding",
			async ({ service }) => {
				const [result, error] = await service.recordQueryParam({ key: '1', version: '1', value: 'x' });
				expect(error).toBeNull();
				expect(result).toEqual({ key: '1', version: '1', value: 'x' });
			},
		);
	});
	describe('recordQueryParamOpt', () => {
		test.each([json, msgpack, openapi])(
			"success - { key: '1', version: '1', value: 'x' } - $encoding",
			async ({ service }) => {
				const [result, error] = await service.recordQueryParamOpt({ key: '1', version: '1', value: 'x' });
				expect(error).toBeNull();
				expect(result).toEqual('DEFINED');
			},
		);
		test.each([json, msgpack, openapi])('success - optional - $encoding', async ({ service }) => {
			const [result, error] = await service.recordQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
});
