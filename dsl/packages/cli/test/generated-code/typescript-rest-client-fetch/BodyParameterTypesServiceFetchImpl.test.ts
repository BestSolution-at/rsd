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
	describe('simpleBooleanBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.simpleBooleanBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleBooleanBodyParamOptNil', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.simpleBooleanBodyParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test('success - null', async () => {
			const [result, error] = await service.simpleBooleanBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleBooleanBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleBooleanBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleShortBodyParam', () => {
		test('success - 12345', async () => {
			const [result, error] = await service.simpleShortBodyParam(12345);
			expect(error).toBeNull();
			expect(result).toBe(12345);
		});
	});
	describe('simpleShortBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.simpleShortBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleShortBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleShortBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleShortBodyParamOptNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleShortBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - undefined', async () => {
			const [result, error] = await service.simpleShortBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleIntBodyParam', () => {
		test('success - 123456789', async () => {
			const [result, error] = await service.simpleIntBodyParam(123456789);
			expect(error).toBeNull();
			expect(result).toBe(123456789);
		});
	});
	describe('simpleIntBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.simpleIntBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleIntBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleIntBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleIntBodyParamOptNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleIntBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - undefined', async () => {
			const [result, error] = await service.simpleIntBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLongBodyParam', () => {
		test('success - 1234567890123', async () => {
			const [result, error] = await service.simpleLongBodyParam(1234567890123);
			expect(error).toBeNull();
			expect(result).toBe(1234567890123);
		});
	});
	describe('simpleLongBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.simpleLongBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLongBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleLongBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleLongBodyParamOptNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleLongBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - undefined', async () => {
			const [result, error] = await service.simpleLongBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleFloatBodyParam', () => {
		test('success - 12.34', async () => {
			const [result, error] = await service.simpleFloatBodyParam(12.34);
			expect(error).toBeNull();
			expect(result).toBe(12.34);
		});
	});
	describe('simpleFloatBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.simpleFloatBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleFloatBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleFloatBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleFloatBodyParamOptNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleFloatBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - undefined', async () => {
			const [result, error] = await service.simpleFloatBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleDoubleBodyParam', () => {
		test('success - 12.3456789', async () => {
			const [result, error] = await service.simpleDoubleBodyParam(12.3456789);
			expect(error).toBeNull();
			expect(result).toBe(12.3456789);
		});
	});
	describe('simpleDoubleBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.simpleDoubleBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleDoubleBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleDoubleBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleDoubleBodyParamOptNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleDoubleBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - undefined', async () => {
			const [result, error] = await service.simpleDoubleBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleStringBodyParam', () => {
		test('success - Hello, World!', async () => {
			const [result, error] = await service.simpleStringBodyParam('Hello, World!');
			expect(error).toBeNull();
			expect(result).toBe('Hello, World!');
		});
	});
	describe('simpleStringBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.simpleStringBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleStringBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleStringBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleStringBodyParamOptNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleStringBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - undefined', async () => {
			const [result, error] = await service.simpleStringBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleLocalDateBodyParam', () => {
		test('success - 2023-01-01', async () => {
			const [result, error] = await service.simpleLocalDateBodyParam('2023-01-01');
			expect(error).toBeNull();
			expect(result).toBe('2023-01-01');
		});
	});
	describe('simpleLocalDateBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.simpleLocalDateBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLocalDateBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleLocalDateBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleLocalDateBodyParamOptNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleLocalDateBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - undefined', async () => {
			const [result, error] = await service.simpleLocalDateBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleLocalDateTimeBodyParam', () => {
		test('success - 2023-01-01T12:34:56', async () => {
			const [result, error] = await service.simpleLocalDateTimeBodyParam('2023-01-01T12:34:56');
			expect(error).toBeNull();
			expect(result).toBe('2023-01-01T12:34:56');
		});
	});
	describe('simpleLocalDateTimeBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.simpleLocalDateTimeBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLocalDateTimeBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleLocalDateTimeBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleLocalDateTimeBodyParamOptNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleLocalDateTimeBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - undefined', async () => {
			const [result, error] = await service.simpleLocalDateTimeBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleScalarBodyParam', () => {
		test('success - ScalarValue', async () => {
			const [result, error] = await service.simpleScalarBodyParam('Europe/Vienna');
			expect(error).toBeNull();
			expect(result).toBe('Europe/Vienna');
		});
	});
	describe('simpleScalarBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.simpleScalarBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleScalarBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleScalarBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleScalarBodyParamOptNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleScalarBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - undefined', async () => {
			const [result, error] = await service.simpleScalarBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleZonedDateTimeBodyParam', () => {
		test('success - 2023-01-01T12:34:56Z', async () => {
			const [result, error] = await service.simpleZonedDateTimeBodyParam('2023-01-01T12:34:56Z');
			expect(error).toBeNull();
			expect(result).toBe('2023-01-01T12:34:56Z');
		});
	});
	describe('simpleZonedDateTimeBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.simpleZonedDateTimeBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleZonedDateTimeBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleZonedDateTimeBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleZonedDateTimeBodyParamOptNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleZonedDateTimeBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - undefined', async () => {
			const [result, error] = await service.simpleZonedDateTimeBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleEnumBodyParam', () => {
		test('success - VALUE_A', async () => {
			const [result, error] = await service.simpleEnumBodyParam('A');
			expect(error).toBeNull();
			expect(result).toBe('A');
		});
	});
	describe('simpleEnumBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.simpleEnumBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleEnumBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleEnumBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleEnumBodyParamOptNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleEnumBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - undefined', async () => {
			const [result, error] = await service.simpleEnumBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleInlineEnumBodyParam', () => {
		test('success - VALUE_A', async () => {
			const [result, error] = await service.simpleInlineEnumBodyParam('A');
			expect(error).toBeNull();
			expect(result).toBe('A');
		});
	});
	describe('simpleInlineEnumBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.simpleInlineEnumBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleInlineEnumBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleInlineEnumBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleInlineEnumBodyParamOptNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.simpleInlineEnumBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test('success - undefined', async () => {
			const [result, error] = await service.simpleInlineEnumBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('multiBodyParam', () => {
		test('success - valueA: Hello, valueB: World', async () => {
			const [result, error] = await service.multiBodyParam('Hello', 1, { key: 'a', version: '1', value: 'foo' });
			expect(error).toBeNull();
			expect(result).toBe('Hello-1-a');
		});
	});
	describe('multiBodyParamOpt', () => {
		test('success - valueA: Hello, valueB: undefined', async () => {
			const [result, error] = await service.multiBodyParamOpt('Hello', undefined, undefined);
			expect(error).toBeNull();
			expect(result).toBe('Hello-undefined-undefined');
		});
	});
	describe('multiBodyParamNil', () => {
		test('success - valueA: Hello, valueB: null', async () => {
			const [result, error] = await service.multiBodyParamNil('Hello', null, null);
			expect(error).toBeNull();
			expect(result).toBe('Hello-null-null');
		});
	});
	describe('multiBodyParamOptNil', () => {
		test('success - valueA: Hello, valueB: null', async () => {
			const [result, error] = await service.multiBodyParamOptNil('Hello', null, undefined);
			expect(error).toBeNull();
			expect(result).toBe('Hello-null-undefined');
		});
	});

	describe('recordBodyParam', () => {
		test('success - valueA: foo, valueB: 42', async () => {
			const [result, error] = await service.recordBodyParam({ key: '1', version: '1', value: 'foo' });
			expect(error).toBeNull();
			expect(result).toEqual({ key: '1', version: '1', value: 'foo' });
		});
	});
	describe('recordBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.recordBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('recordBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.recordBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
	});
	describe('recordBodyParamOptNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.recordBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success - undefined', async () => {
			const [result, error] = await service.recordBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});

	describe('unionBodyParam', () => {
		test('success - string value', async () => {
			const [result, error] = await service.unionBodyParam({
				'@type': 'union-a',
				valueA: 'testString',
				shared: 'shared',
			});
			expect(error).toBeNull();
			expect(result).toEqual({
				'@type': 'union-a',
				valueA: 'testString',
				shared: 'shared',
			});
		});
	});
	describe('unionBodyParamOpt', () => {
		test('success - undefined', async () => {
			const [result, error] = await service.unionBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('unionBodyParamNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.unionBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
	});

	describe('unionBodyParamOptNil', () => {
		test('success - null', async () => {
			const [result, error] = await service.unionBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test('success - undefined', async () => {
			const [result, error] = await service.unionBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});

	describe('patchableRecordBodyParam', () => {
		test('success - valueA: foo, valueB: 42', async () => {
			const [result, error] = await service.patchableRecordBodyParam({ key: '1', version: '1', value: 'patchedValue' });
			expect(error).toBeNull();
			expect(result).toEqual({ key: '1', version: '1', value: 'patchedValue' });
		});
	});
});
