import { describe, expect, test } from 'vitest';

import { createPathParameterTypeServiceService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';

const service = createPathParameterTypeServiceService({
	baseUrl: 'http://localhost:3000',
});

describe('SinglePathParameterTypeServiceServiceFetchImpl', () => {
	describe('simpleBooleanPathParam', () => {
		test('success - true', async () => {
			const [result, error] = await service.simpleBooleanPathParam(true);
			expect(error).toBeNull();
			expect(result).toBe(true);
		});
		test('success - false', async () => {
			const [result, error] = await service.simpleBooleanPathParam(false);
			expect(error).toBeNull();
			expect(result).toBe(false);
		});
	});

	describe('simpleShortPathParam', () => {
		test('success', async () => {
			const [result, error] = await service.simpleShortPathParam(12345);
			expect(error).toBeNull();
			expect(result).toBe(12345);
		});
	});

	describe('simpleIntPathParam', () => {
		test('success', async () => {
			const [result, error] = await service.simpleIntPathParam(123456789);
			expect(error).toBeNull();
			expect(result).toBe(123456789);
		});
	});

	describe('simpleLongPathParam', () => {
		test('success', async () => {
			const [result, error] = await service.simpleLongPathParam(1234567890123);
			expect(error).toBeNull();
			expect(result).toBe(1234567890123);
		});
	});

	describe('simpleFloatPathParam', () => {
		test('success', async () => {
			const [result, error] = await service.simpleFloatPathParam(12345.67);
			expect(error).toBeNull();
			expect(result).toBe(12345.67);
		});
	});

	describe('simpleDoublePathParam', () => {
		test('success', async () => {
			const [result, error] = await service.simpleDoublePathParam(1234567890.12345);
			expect(error).toBeNull();
			expect(result).toBe(1234567890.12345);
		});
	});

	describe('simpleStringPathParam', () => {
		test('success', async () => {
			const [result, error] = await service.simpleStringPathParam('hello-world');
			expect(error).toBeNull();
			expect(result).toBe('hello-world');
		});
	});

	describe('simpleLocalDatePathParam', () => {
		test('success', async () => {
			const [result, error] = await service.simpleLocalDatePathParam('2024-06-15');
			expect(error).toBeNull();
			expect(result).toBe('2024-06-15');
		});
	});

	describe('simpleLocalDateTimePathParam', () => {
		test('success', async () => {
			const [result, error] = await service.simpleLocalDateTimePathParam('2024-06-15T12:34:56');
			expect(error).toBeNull();
			expect(result).toBe('2024-06-15T12:34:56');
		});
	});

	describe('simpleZonedDateTimePathParam', () => {
		test('success', async () => {
			const [result, error] = await service.simpleZonedDateTimePathParam('2024-06-15T12:34:56Z');
			expect(error).toBeNull();
			expect(result).toBe('2024-06-15T12:34:56Z');
		});
	});

	describe('simpleScalarPathParam', () => {
		test('success', async () => {
			const [result, error] = await service.simpleScalarPathParam('Europe/Vienna');
			expect(error).toBeNull();
			expect(result).toBe('Europe/Vienna');
		});
	});

	describe('simpleEnumPathParam', () => {
		test('success', async () => {
			const [result, error] = await service.simpleEnumPathParam('A');
			expect(error).toBeNull();
			expect(result).toBe('A');
		});
	});

	describe('multiPathParam', () => {
		test('success', async () => {
			const [result, error] = await service.multiPathParam('test', 42);
			expect(error).toBeNull();
			expect(result).toBe('test-42');
		});
	});
});
