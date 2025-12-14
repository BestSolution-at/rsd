import { describe, expect, test } from 'vitest';

import { createHeaderParameterTypesService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';

const service = createHeaderParameterTypesService({
	baseUrl: 'http://localhost:3000',
});

describe('HeaderParameterTypesService', () => {
	describe('simpleBooleanBodyParam', () => {
		test('success - true', async () => {
			const [result, error] = await service.simpleBooleanHeaderParam(true);
			expect(error).toBeNull();
			expect(result).toBe(true);
		});
		test('success - false', async () => {
			const [result, error] = await service.simpleBooleanHeaderParam(false);
			expect(error).toBeNull();
			expect(result).toBe(false);
		});
	});
	describe('simpleShortHeaderParam', () => {
		test('success - 12345', async () => {
			const [result, error] = await service.simpleShortHeaderParam(12345);
			expect(error).toBeNull();
			expect(result).toBe(12345);
		});
	});
	describe('simpleIntHeaderParam', () => {
		test('success - 123456789', async () => {
			const [result, error] = await service.simpleIntHeaderParam(123456789);
			expect(error).toBeNull();
			expect(result).toBe(123456789);
		});
	});
	describe('simpleLongHeaderParam', () => {
		test('success - 1234567890123', async () => {
			const [result, error] = await service.simpleLongHeaderParam(1234567890123);
			expect(error).toBeNull();
			expect(result).toBe(1234567890123);
		});
	});
	describe('simpleFloatHeaderParam', () => {
		test('success - 12.34', async () => {
			const [result, error] = await service.simpleFloatHeaderParam(12.34);
			expect(error).toBeNull();
			expect(result).toBe(12.34);
		});
	});
	describe('simpleDoubleHeaderParam', () => {
		test('success - 12.3456789', async () => {
			const [result, error] = await service.simpleDoubleHeaderParam(12.3456789);
			expect(error).toBeNull();
			expect(result).toBe(12.3456789);
		});
	});

	describe('simpleStringHeaderParam', () => {
		test('success - Hello, World!', async () => {
			const [result, error] = await service.simpleStringHeaderParam('Hello, World!');
			expect(error).toBeNull();
			expect(result).toBe('Hello, World!');
		});
	});
	describe('simpleLocalDateHeaderParam', () => {
		test('success - 2024-01-01', async () => {
			const [result, error] = await service.simpleLocalDateHeaderParam('2024-01-01');
			expect(error).toBeNull();
			expect(result).toBe('2024-01-01');
		});
	});
	describe('simpleLocalDateTimeHeaderParam', () => {
		test('success - 2024-01-01T12:34:56', async () => {
			const [result, error] = await service.simpleLocalDateTimeHeaderParam('2024-01-01T12:34:56');
			expect(error).toBeNull();
			expect(result).toBe('2024-01-01T12:34:56');
		});
	});
	describe('simpleZonedDateTimeHeaderParam', () => {
		test('success - 2024-01-01T12:34:56Z', async () => {
			const [result, error] = await service.simpleZonedDateTimeHeaderParam('2024-01-01T12:34:56Z');
			expect(error).toBeNull();
			expect(result).toBe('2024-01-01T12:34:56Z');
		});
	});
	describe('simpleScalarHeaderParam', () => {
		test('success - ScalarValue', async () => {
			const [result, error] = await service.simpleScalarHeaderParam('Europe/Vienna');
			expect(error).toBeNull();
			expect(result).toBe('Europe/Vienna');
		});
	});
	describe('simpleEnumHeaderParam', () => {
		test('success - A', async () => {
			const [result, error] = await service.simpleEnumHeaderParam('A');
			expect(error).toBeNull();
			expect(result).toBe('A');
		});
	});
	describe('multiHeaderParam', () => {
		test('success - ["value1","value2","value3"]', async () => {
			const [result, error] = await service.multiHeaderParam('Hello', 1);
			expect(error).toBeNull();
			expect(result).toEqual('Hello-1');
		});
	});
	describe('recordHeaderParam', () => {
		test('success - {"key1":"value1","key2":"value2"}', async () => {
			const [result, error] = await service.recordHeaderParam({ key: '1', version: '1', value: 'x' });
			expect(error).toBeNull();
			expect(result).toEqual({ key: '1', version: '1', value: 'x' });
		});
	});
});
