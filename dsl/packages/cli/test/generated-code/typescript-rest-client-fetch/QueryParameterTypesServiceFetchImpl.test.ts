import { describe, expect, test } from 'vitest';

import { createQueryParameterTypesService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';

const service = createQueryParameterTypesService({
	baseUrl: 'http://localhost:3000',
});

describe('QueryParameterTypesService', () => {
	describe('simpleBooleanQueryParam', () => {
		test('success - true', async () => {
			const [result, error] = await service.simpleBooleanQueryParam(true);
			expect(error).toBeNull();
			expect(result).toBe(true);
		});
		test('success - false', async () => {
			const [result, error] = await service.simpleBooleanQueryParam(false);
			expect(error).toBeNull();
			expect(result).toBe(false);
		});
	});
	describe('simpleBooleanQueryParamOpt', () => {
		test('success - true', async () => {
			const [result, error] = await service.simpleBooleanQueryParamOpt(true);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
		test('success - false', async () => {
			const [result, error] = await service.simpleBooleanQueryParamOpt(false);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
		test('success - optional', async () => {
			const [result, error] = await service.simpleBooleanQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleShortQueryParam', () => {
		test('success - 12345', async () => {
			const [result, error] = await service.simpleShortQueryParam(12345);
			expect(error).toBeNull();
			expect(result).toBe(12345);
		});
	});
	describe('simpleShortQueryParamOpt', () => {
		test('success - 12345', async () => {
			const [result, error] = await service.simpleShortQueryParamOpt(12345);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
		test('success - optional', async () => {
			const [result, error] = await service.simpleShortQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleIntQueryParam', () => {
		test('success - 123456789', async () => {
			const [result, error] = await service.simpleIntQueryParam(123456789);
			expect(error).toBeNull();
			expect(result).toBe(123456789);
		});
	});
	describe('simpleIntQueryParamOpt', () => {
		test('success - 123456789', async () => {
			const [result, error] = await service.simpleIntQueryParamOpt(123456789);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
		test('success - optional', async () => {
			const [result, error] = await service.simpleIntQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLongQueryParam', () => {
		test('success - 1234567890123', async () => {
			const [result, error] = await service.simpleLongQueryParam(1234567890123);
			expect(error).toBeNull();
			expect(result).toBe(1234567890123);
		});
	});
	describe('simpleLongQueryParamOpt', () => {
		test('success - 1234567890123', async () => {
			const [result, error] = await service.simpleLongQueryParamOpt(1234567890123);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
		test('success - optional', async () => {
			const [result, error] = await service.simpleLongQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleFloatQueryParam', () => {
		test('success - 12.34', async () => {
			const [result, error] = await service.simpleFloatQueryParam(12.34);
			expect(error).toBeNull();
			expect(result).toBe(12.34);
		});
		test('success - optional', async () => {
			const [result, error] = await service.simpleFloatQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleDoubleQueryParam', () => {
		test('success - 12.3456789', async () => {
			const [result, error] = await service.simpleDoubleQueryParam(12.3456789);
			expect(error).toBeNull();
			expect(result).toBe(12.3456789);
		});
		test('success - optional', async () => {
			const [result, error] = await service.simpleDoubleQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleStringQueryParam', () => {
		test('success - Hello, World!', async () => {
			const [result, error] = await service.simpleStringQueryParam('Hello, World!');
			expect(error).toBeNull();
			expect(result).toBe('Hello, World!');
		});
		test('success - optional', async () => {
			const [result, error] = await service.simpleStringQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLocalDateQueryParam', () => {
		test('success - 2024-01-01', async () => {
			const [result, error] = await service.simpleLocalDateQueryParam('2024-01-01');
			expect(error).toBeNull();
			expect(result).toBe('2024-01-01');
		});
		test('success - optional', async () => {
			const [result, error] = await service.simpleLocalDateQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLocalDateTimeQueryParam', () => {
		test('success - 2024-01-01T12:34:56', async () => {
			const [result, error] = await service.simpleLocalDateTimeQueryParam('2024-01-01T12:34:56');
			expect(error).toBeNull();
			expect(result).toBe('2024-01-01T12:34:56');
		});
		test('success - optional', async () => {
			const [result, error] = await service.simpleLocalDateTimeQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleZonedDateTimeQueryParam', () => {
		test('success - 2024-01-01T12:34:56Z', async () => {
			const [result, error] = await service.simpleZonedDateTimeQueryParam('2024-01-01T12:34:56Z');
			expect(error).toBeNull();
			expect(result).toBe('2024-01-01T12:34:56Z');
		});
		test('success - optional', async () => {
			const [result, error] = await service.simpleZonedDateTimeQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleScalarQueryParam', () => {
		test('success - ScalarValue', async () => {
			const [result, error] = await service.simpleScalarQueryParam('Europe/Vienna');
			expect(error).toBeNull();
			expect(result).toBe('Europe/Vienna');
		});
		test('success - optional', async () => {
			const [result, error] = await service.simpleScalarQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleEnumQueryParam', () => {
		test('success - A', async () => {
			const [result, error] = await service.simpleEnumQueryParam('A');
			expect(error).toBeNull();
			expect(result).toBe('A');
		});
		test('success - optional', async () => {
			const [result, error] = await service.simpleEnumQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('multiQueryParam', () => {
		test('success - ["Hello","1"]', async () => {
			const [result, error] = await service.multiQueryParam('Hello', 1);
			expect(error).toBeNull();
			expect(result).toEqual('Hello-1');
		});
	});
	describe('multiQueryParamOpt', () => {
		test('success - ["Hello","1"]', async () => {
			const [result, error] = await service.multiQueryParamOpt('Hello', 1);
			expect(error).toBeNull();
			expect(result).toEqual('Hello-1');
		});
		test('success - ["hello"]', async () => {
			const [result, error] = await service.multiQueryParamOpt('Hello');
			expect(error).toBeNull();
			expect(result).toEqual('Hello-undefined');
		});
		test('success - optional', async () => {
			const [result, error] = await service.multiQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('undefined-undefined');
		});
	});
	describe('recordQueryParam', () => {
		test("success - { key: '1', version: '1', value: 'x' }", async () => {
			const [result, error] = await service.recordQueryParam({ key: '1', version: '1', value: 'x' });
			expect(error).toBeNull();
			expect(result).toEqual({ key: '1', version: '1', value: 'x' });
		});
	});
	describe('recordQueryParamOpt', () => {
		test("success - { key: '1', version: '1', value: 'x' }", async () => {
			const [result, error] = await service.recordQueryParamOpt({ key: '1', version: '1', value: 'x' });
			expect(error).toBeNull();
			expect(result).toEqual('DEFINED');
		});
		test('success - optional', async () => {
			const [result, error] = await service.recordQueryParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
});
