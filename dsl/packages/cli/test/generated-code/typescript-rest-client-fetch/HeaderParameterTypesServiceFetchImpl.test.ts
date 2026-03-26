import { describe, expect, test } from 'vitest';

import { createHeaderParameterTypesService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';

const jsonService = createHeaderParameterTypesService({
	baseUrl: 'http://localhost:3000',
});

const msgpackService = createHeaderParameterTypesService({
	baseUrl: 'http://localhost:3000',
	encoding: 'application/vnd.msgpack',
});

const json = { encoding: 'application/json' as const, service: jsonService };
const msgpack = { encoding: 'application/vnd.msgpack' as const, service: msgpackService };

describe('SingleHeaderParameterTypesService', () => {
	describe('simpleBooleanHeaderParam', () => {
		test.each([json, msgpack])('success - true with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanHeaderParam(true);
			expect(error).toBeNull();
			expect(result).toBe(true);
		});
		test.each([json, msgpack])('success - false with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanHeaderParam(false);
			expect(error).toBeNull();
			expect(result).toBe(false);
		});
	});
	describe('simpleBooleanHeaderParamOpt', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleBooleanHeaderParamNil', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleBooleanHeaderParamOptNil', () => {
		test.each([json, msgpack])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});

	describe('simpleShortHeaderParam', () => {
		test.each([json, msgpack])('success - 12345 with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleShortHeaderParam(12345);
			expect(error).toBeNull();
			expect(result).toBe(12345);
		});
	});
	describe('simpleShortHeaderParamOpt', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleShortHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleShortHeaderParamNil', () => {
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleShortHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleShortHeaderParamOptNil', () => {
		test.each([json, msgpack])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleShortHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleShortHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});

	describe('simpleIntHeaderParam', () => {
		test.each([json, msgpack])('success - 123456789 with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleIntHeaderParam(123456789);
			expect(error).toBeNull();
			expect(result).toBe(123456789);
		});
	});
	describe('simpleIntHeaderParamOpt', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleIntHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleIntHeaderParamNil', () => {
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleIntHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleIntHeaderParamOptNil', () => {
		test.each([json, msgpack])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleIntHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleIntHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});

	describe('simpleLongHeaderParam', () => {
		test.each([json, msgpack])('success - 1234567890123 with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLongHeaderParam(1234567890123);
			expect(error).toBeNull();
			expect(result).toBe(1234567890123);
		});
	});
	describe('simpleLongHeaderParamOpt', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLongHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLongHeaderParamNil', () => {
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLongHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleLongHeaderParamOptNil', () => {
		test.each([json, msgpack])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLongHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLongHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});

	describe('simpleFloatHeaderParam', () => {
		test.each([json, msgpack])('success - 12.34 with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleFloatHeaderParam(12.34);
			expect(error).toBeNull();
			expect(result).toBe(12.34000015258789);
		});
	});
	describe('simpleFloatHeaderParamOpt', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleFloatHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleFloatHeaderParamNil', () => {
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleFloatHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleFloatHeaderParamOptNil', () => {
		test.each([json, msgpack])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleFloatHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleFloatHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});

	describe('simpleDoubleHeaderParam', () => {
		test.each([json, msgpack])('success - 12.3456789 with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleDoubleHeaderParam(12.3456789);
			expect(error).toBeNull();
			expect(result).toBe(12.3456789);
		});
	});
	describe('simpleDoubleHeaderParamOpt', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleDoubleHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleDoubleHeaderParamNil', () => {
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleDoubleHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleDoubleHeaderParamOptNil', () => {
		test.each([json, msgpack])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleDoubleHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleDoubleHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});

	describe('simpleStringHeaderParam', () => {
		test.each([json, msgpack])('success - Hello, World! with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringHeaderParam('Hello, World!');
			expect(error).toBeNull();
			expect(result).toBe('Hello, World!');
		});
		test.each([json, msgpack])('success - none ascii chars with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringHeaderParam('a Ā 𐀀 文 🦄');
			expect(error).toBeNull();
			expect(result).toBe('a Ā 𐀀 文 🦄');
		});
		test.each([json, msgpack])('success - multi-line with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringHeaderParam('line1\nline2\nline3');
			expect(error).toBeNull();
			expect(result).toBe('line1\nline2\nline3');
		});
		test.each([json, msgpack])('success - \\u escaping with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringHeaderParam('pre-\\uffff-post');
			expect(error).toBeNull();
			expect(result).toBe('pre-\\uffff-post');
		});
		test.each([json, msgpack])('success - whitespace prefix/suffix with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringHeaderParam('  Hello, World!  ');
			expect(error).toBeNull();
			expect(result).toBe('  Hello, World!  ');
		});
	});
	describe('simpleStringHeaderParamOpt', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleStringHeaderParamNil', () => {
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleStringHeaderParamOptNil', () => {
		test.each([json, msgpack])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});

	describe('simpleLocalDateHeaderParam', () => {
		test.each([json, msgpack])('success - 2024-01-01 with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateHeaderParam('2024-01-01');
			expect(error).toBeNull();
			expect(result).toBe('2024-01-01');
		});
	});
	describe('simpleLocalDateHeaderParamOpt', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLocalDateHeaderParamNil', () => {
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleLocalDateHeaderParamOptNil', () => {
		test.each([json, msgpack])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});

	describe('simpleLocalDateTimeHeaderParam', () => {
		test.each([json, msgpack])('success - 2024-01-01T12:34:56 with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateTimeHeaderParam('2024-01-01T12:34:56');
			expect(error).toBeNull();
			expect(result).toBe('2024-01-01T12:34:56');
		});
	});
	describe('simpleLocalDateTimeHeaderParamOpt', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateTimeHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLocalDateTimeHeaderParamNil', () => {
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateTimeHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleLocalDateTimeHeaderParamOptNil', () => {
		test.each([json, msgpack])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateTimeHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateTimeHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});

	describe('simpleZonedDateTimeHeaderParam', () => {
		test.each([json, msgpack])('success - 2024-01-01T12:34:56Z with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleZonedDateTimeHeaderParam('2024-01-01T12:34:56Z');
			expect(error).toBeNull();
			expect(result).toBe('2024-01-01T12:34:56Z');
		});
	});
	describe('simpleZonedDateTimeHeaderParamOpt', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleZonedDateTimeHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleZonedDateTimeHeaderParamNil', () => {
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleZonedDateTimeHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleZonedDateTimeHeaderParamOptNil', () => {
		test.each([json, msgpack])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleZonedDateTimeHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleZonedDateTimeHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});

	describe('simpleScalarHeaderParam', () => {
		test.each([json, msgpack])('success - ScalarValue with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleScalarHeaderParam('Europe/Vienna');
			expect(error).toBeNull();
			expect(result).toBe('Europe/Vienna');
		});
	});
	describe('simpleScalarHeaderParamOpt', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleScalarHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleScalarHeaderParamNil', () => {
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleScalarHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleScalarHeaderParamOptNil', () => {
		test.each([json, msgpack])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleScalarHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleScalarHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});

	describe('simpleEnumHeaderParam', () => {
		test.each([json, msgpack])('success - A with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleEnumHeaderParam('A');
			expect(error).toBeNull();
			expect(result).toBe('A');
		});
	});
	describe('simpleEnumHeaderParamOpt', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleEnumHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleEnumHeaderParamNil', () => {
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleEnumHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleEnumHeaderParamOptNil', () => {
		test.each([json, msgpack])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleEnumHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleEnumHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});

	describe('simpleInlineEnumHeaderParam', () => {
		test.each([json, msgpack])('success - A with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleInlineEnumHeaderParam('A');
			expect(error).toBeNull();
			expect(result).toBe('A');
		});
	});
	describe('simpleInlineEnumHeaderParamOpt', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleInlineEnumHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleInlineEnumHeaderParamNil', () => {
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleInlineEnumHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleInlineEnumHeaderParamOptNil', () => {
		test.each([json, msgpack])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleInlineEnumHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleInlineEnumHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});

	describe('multiHeaderParam', () => {
		test.each([json, msgpack])('success - ["Hell", 1] with $encoding', async ({ service }) => {
			const [result, error] = await service.multiHeaderParam('Hello', 1);
			expect(error).toBeNull();
			expect(result).toEqual('Hello-1');
		});
	});
	describe('multiHeaderParamOpt', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.multiHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual(['UNDEFINED', 'UNDEFINED']);
		});
	});
	describe('multiHeaderParamNil', () => {
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.multiHeaderParamNil(null, null);
			expect(error).toBeNull();
			expect(result).toEqual(['NULL', 'NULL']);
		});
	});
	describe('multiHeaderParamOptNil', () => {
		test.each([json, msgpack])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.multiHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toEqual(['UNDEFINED', 'UNDEFINED']);
		});
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.multiHeaderParamOptNil(null, null);
			expect(error).toBeNull();
			expect(result).toEqual(['NULL', 'NULL']);
		});
		test.each([json, msgpack])('success - mixed with $encoding', async ({ service }) => {
			const [result, error] = await service.multiHeaderParamOptNil(undefined, null);
			expect(error).toBeNull();
			expect(result).toEqual(['UNDEFINED', 'NULL']);
		});
	});

	describe('recordHeaderParam', () => {
		test.each([json, msgpack])('success - {"key1":"value1","key2":"value2"} with $encoding', async ({ service }) => {
			const [result, error] = await service.recordHeaderParam({ key: '1', version: '1', value: 'x' });
			expect(error).toBeNull();
			expect(result).toEqual({ key: '1', version: '1', value: 'x' });
		});
	});
	describe('recordHeaderParamOpt', () => {
		test.each([json, msgpack])('success with $encoding', async ({ service }) => {
			const [result, error] = await service.recordHeaderParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('recordHeaderParamNil', () => {
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.recordHeaderParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('recordHeaderParamOptNil', () => {
		test.each([json, msgpack])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.recordHeaderParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test.each([json, msgpack])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.recordHeaderParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
});
