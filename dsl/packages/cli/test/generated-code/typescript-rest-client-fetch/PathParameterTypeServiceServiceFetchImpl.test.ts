import { describe, expect, test } from 'vitest';

import { createPathParameterTypeServiceService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import { createOpenAPIPathParameterTypeServiceService } from '../../test-specs/gen-out/client/typescript-client-openapi/src/adapter/PathParameterTypeServiceService.adapter.js';

const jsonService = createPathParameterTypeServiceService({
	baseUrl: 'http://localhost:3000',
});

const msgpackService = createPathParameterTypeServiceService({
	baseUrl: 'http://localhost:3000',
	encoding: 'application/vnd.msgpack',
});

const openApiService = createOpenAPIPathParameterTypeServiceService({
	baseUrl: 'http://localhost:3000',
});

const json = { service: jsonService, encoding: 'application/json' as const };
const msgpack = { service: msgpackService, encoding: 'application/vnd.msgpack' as const };
const openapi = { service: openApiService, encoding: 'application/json via openAPI' as const };

describe('SinglePathParameterTypeServiceServiceFetchImpl', () => {
	describe('simpleBooleanPathParam', () => {
		test.each([json, msgpack, openapi])('success - true - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanPathParam(true);
			expect(error).toBeNull();
			expect(result).toBe(true);
		});
		test.each([json, msgpack, openapi])('success - false - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanPathParam(false);
			expect(error).toBeNull();
			expect(result).toBe(false);
		});
	});

	describe('simpleShortPathParam', () => {
		test.each([json, msgpack, openapi])('success - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleShortPathParam(12345);
			expect(error).toBeNull();
			expect(result).toBe(12345);
		});
	});

	describe('simpleIntPathParam', () => {
		test.each([json, msgpack, openapi])('success - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleIntPathParam(123456789);
			expect(error).toBeNull();
			expect(result).toBe(123456789);
		});
	});

	describe('simpleLongPathParam', () => {
		test.each([json, msgpack, openapi])('success - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLongPathParam(1234567890123);
			expect(error).toBeNull();
			expect(result).toBe(1234567890123);
		});
	});

	describe('simpleFloatPathParam', () => {
		test.each([json, msgpack, openapi])('success - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleFloatPathParam(12345.67);
			expect(error).toBeNull();
			expect(result).toBe(12345.669921875);
		});
	});

	describe('simpleDoublePathParam', () => {
		test.each([json, msgpack, openapi])('success - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleDoublePathParam(1234567890.12345);
			expect(error).toBeNull();
			expect(result).toBe(1234567890.12345);
		});
	});

	describe('simpleStringPathParam', () => {
		test.each([json, msgpack, openapi])('success - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringPathParam('hello-world');
			expect(error).toBeNull();
			expect(result).toBe('hello-world');
		});
	});

	describe('simpleLocalDatePathParam', () => {
		test.each([json, msgpack, openapi])('success - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDatePathParam('2024-06-15');
			expect(error).toBeNull();
			expect(result).toBe('2024-06-15');
		});
	});

	describe('simpleLocalDateTimePathParam', () => {
		test.each([json, msgpack, openapi])('success - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateTimePathParam('2024-06-15T12:34:56');
			expect(error).toBeNull();
			expect(result).toBe('2024-06-15T12:34:56');
		});
	});

	describe('simpleLocalTimePathParam', () => {
		test.each([json, msgpack, openapi])('success - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalTimePathParam('10:00:00');
			expect(error).toBeNull();
			expect(result).toBe('10:00:00');
		});
	});

	describe('simpleOffsetDateTimePathParam', () => {
		test.each([json, msgpack, openapi])('success - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleOffsetDateTimePathParam('2025-01-01T10:00:00+01:00');
			expect(error).toBeNull();
			expect(result).toBe('2025-01-01T10:00:00+01:00');
		});
	});

	describe('simpleZonedDateTimePathParam', () => {
		test.each([json, msgpack, openapi])('success - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleZonedDateTimePathParam('2024-06-15T12:34:56Z');
			expect(error).toBeNull();
			expect(result).toBe('2024-06-15T12:34:56Z');
		});
	});

	describe('simpleScalarPathParam', () => {
		test.each([json, msgpack, openapi])('success - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleScalarPathParam('Europe/Vienna');
			expect(error).toBeNull();
			expect(result).toBe('Europe/Vienna');
		});
	});

	describe('simpleEnumPathParam', () => {
		test.each([json, msgpack, openapi])('success - $encoding', async ({ service }) => {
			const [result, error] = await service.simpleEnumPathParam('A');
			expect(error).toBeNull();
			expect(result).toBe('A');
		});
	});

	describe('multiPathParam', () => {
		test.each([json, msgpack, openapi])('success - $encoding', async ({ service }) => {
			const [result, error] = await service.multiPathParam('test', 42);
			expect(error).toBeNull();
			expect(result).toBe('test-42');
		});
	});
});
