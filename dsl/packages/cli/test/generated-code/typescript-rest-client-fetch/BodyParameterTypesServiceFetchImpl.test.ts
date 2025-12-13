import { describe, expect, test } from 'vitest';

import { createBodyParameterTypesService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';

const service = createBodyParameterTypesService({
	baseUrl: 'http://localhost:3000',
});

describe('BodyParameterTypesServiceFetchImpl', () => {
	describe('simpleBooleanBodyParam', () => {
		test('success - true', async () => {
			const [result, error] = await service.simpleBooleanBodyParam(true);
			expect(error).toBeNull();
			expect(result).toBe(true);
		});
		test('success - false', async () => {
			const [result, error] = await service.simpleBooleanBodyParam(false);
			expect(error).toBeNull();
			expect(result).toBe(false);
		});
	});
	describe('simpleShortBodyParam', () => {
		test('success - 12345', async () => {
			const [result, error] = await service.simpleShortBodyParam(12345);
			expect(error).toBeNull();
			expect(result).toBe(12345);
		});
	});
	describe('simpleIntBodyParam', () => {
		test('success - 123456789', async () => {
			const [result, error] = await service.simpleIntBodyParam(123456789);
			expect(error).toBeNull();
			expect(result).toBe(123456789);
		});
	});
	describe('simpleLongBodyParam', () => {
		test('success - 1234567890123', async () => {
			const [result, error] = await service.simpleLongBodyParam(1234567890123);
			expect(error).toBeNull();
			expect(result).toBe(1234567890123);
		});
	});
	describe('simpleFloatBodyParam', () => {
		test('success - 12.34', async () => {
			const [result, error] = await service.simpleFloatBodyParam(12.34);
			expect(error).toBeNull();
			expect(result).toBe(12.34);
		});
	});
	describe('simpleDoubleBodyParam', () => {
		test('success - 12.3456789', async () => {
			const [result, error] = await service.simpleDoubleBodyParam(12.3456789);
			expect(error).toBeNull();
			expect(result).toBe(12.3456789);
		});
	});
	describe('simpleStringBodyParam', () => {
		test('success - Hello, World!', async () => {
			const [result, error] = await service.simpleStringBodyParam('Hello, World!');
			expect(error).toBeNull();
			expect(result).toBe('Hello, World!');
		});
	});
	describe('simpleLocalDateBodyParam', () => {
		test('success - 2023-01-01', async () => {
			const [result, error] = await service.simpleLocalDateBodyParam('2023-01-01');
			expect(error).toBeNull();
			expect(result).toBe('2023-01-01');
		});
	});
	describe('simpleLocalDateTimeBodyParam', () => {
		test('success - 2023-01-01T12:34:56', async () => {
			const [result, error] = await service.simpleLocalDateTimeBodyParam('2023-01-01T12:34:56');
			expect(error).toBeNull();
			expect(result).toBe('2023-01-01T12:34:56');
		});
	});
	describe('simpleScalarBodyParam', () => {
		test('success - ScalarValue', async () => {
			const [result, error] = await service.simpleScalarBodyParam('Europe/Vienna');
			expect(error).toBeNull();
			expect(result).toBe('Europe/Vienna');
		});
	});
	describe('simpleZonedDateTimeBodyParam', () => {
		test('success - 2023-01-01T12:34:56Z', async () => {
			const [result, error] = await service.simpleZonedDateTimeBodyParam('2023-01-01T12:34:56Z');
			expect(error).toBeNull();
			expect(result).toBe('2023-01-01T12:34:56Z');
		});
	});
	describe('simpleEnumBodyParam', () => {
		test('success - VALUE_A', async () => {
			const [result, error] = await service.simpleEnumBodyParam('A');
			expect(error).toBeNull();
			expect(result).toBe('A');
		});
	});
	describe('simpleInlineEnumBodyParam', () => {
		test('success - VALUE_A', async () => {
			const [result, error] = await service.simpleInlineEnumBodyParam('A');
			expect(error).toBeNull();
			expect(result).toBe('A');
		});
	});
	describe('multiBodyParam', () => {
		test('success - valueA: Hello, valueB: World', async () => {
			const [result, error] = await service.multiBodyParam('Hello', 1);
			expect(error).toBeNull();
			expect(result).toBe('Hello-1');
		});
	});
});
