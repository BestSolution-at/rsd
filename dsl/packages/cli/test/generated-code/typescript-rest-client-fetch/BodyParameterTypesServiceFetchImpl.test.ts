import { describe, expect, test } from 'vitest';

import { createBodyParameterTypesService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import { createOpenAPIBodyParameterTypesService } from '../../test-specs/gen-out/client/typescript-client-openapi/src/adapter/BodyParameterTypesService.adapter.js';

const jsonService = createBodyParameterTypesService({
	baseUrl: 'http://localhost:3000',
});

const msgpackService = createBodyParameterTypesService({
	baseUrl: 'http://localhost:3000',
	encoding: 'application/vnd.msgpack',
});

const openapiService = createOpenAPIBodyParameterTypesService({ baseUrl: 'http://localhost:3000' });

const json = {
	encoding: 'application/json' as const,
	service: jsonService,
};

const msgpack = {
	encoding: 'application/vnd.msgpack' as const,
	service: msgpackService,
};

const openapi = {
	encoding: 'application/json via openapi' as const,
	service: openapiService,
};

describe('SingleBodyParameterTypesServiceFetchImpl', () => {
	describe('simpleBooleanBodyParam', () => {
		test.each([json, msgpack, openapi])('sucess true with $encoding ', async ({ service }) => {
			const [result, error] = await service.simpleBooleanBodyParam(true);
			expect(error).toBeNull();
			expect(result).toBe(true);
		});
		test.each([json, msgpack, openapi])('sucess false with $encoding ', async ({ service }) => {
			const [result, error] = await service.simpleBooleanBodyParam(false);
			expect(error).toBeNull();
			expect(result).toBe(false);
		});
	});
	describe('simpleBooleanBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('sucess defined with $encoding ', async ({ service }) => {
			const [result, error] = await service.simpleBooleanBodyParamOpt(false);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleBooleanBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - defined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanBodyParamOptNil(true);
			expect(error).toBeNull();
			expect(result).toBe('DEFINED');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanBodyParamOptNil();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleBooleanBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleBooleanBodyParamNil', () => {
		test.each([json, msgpack /* TODO OPEN API BROKEN, openapi*/])(
			'success - null with $encoding',
			async ({ service }) => {
				const [result, error] = await service.simpleBooleanBodyParamNil(null);
				expect(error).toBeNull();
				expect(result).toBe('NULL');
			},
		);
	});
	describe('simpleShortBodyParam', () => {
		test.each([json, msgpack, openapi])('success - 12345 with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleShortBodyParam(12345);
			expect(error).toBeNull();
			expect(result).toBe(12345);
		});
	});
	describe('simpleShortBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleShortBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleShortBodyParamNil', () => {
		test.each([json, msgpack /* TODO OPEN API BROKEN, openapi*/])(
			'success - null with $encoding',
			async ({ service }) => {
				const [result, error] = await service.simpleShortBodyParamNil(null);
				expect(error).toBeNull();
				expect(result).toBe('NULL');
			},
		);
	});
	describe('simpleShortBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleShortBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleShortBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleIntBodyParam', () => {
		test.each([json, msgpack, openapi])('success - 123456789 with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleIntBodyParam(123456789);
			expect(error).toBeNull();
			expect(result).toBe(123456789);
		});
	});
	describe('simpleIntBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleIntBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleIntBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleIntBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleIntBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleIntBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleIntBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLongBodyParam', () => {
		test.each([json, msgpack, openapi])('success - 1234567890123 with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLongBodyParam(1234567890123);
			expect(error).toBeNull();
			expect(result).toBe(1234567890123);
		});
	});
	describe('simpleLongBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLongBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLongBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLongBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleLongBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLongBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLongBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleFloatBodyParam', () => {
		test.each([json, msgpack, openapi])('success - 12.34 with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleFloatBodyParam(12.34);
			expect(error).toBeNull();
			expect(result).toBe(12.34000015258789);
		});
	});
	describe('simpleFloatBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleFloatBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleFloatBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleFloatBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleFloatBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleFloatBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleFloatBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleDoubleBodyParam', () => {
		test.each([json, msgpack, openapi])('success - 12.3456789 with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleDoubleBodyParam(12.3456789);
			expect(error).toBeNull();
			expect(result).toBe(12.3456789);
		});
	});
	describe('simpleDoubleBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleDoubleBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleDoubleBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleDoubleBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleDoubleBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleDoubleBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleDoubleBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleStringBodyParam', () => {
		test.each([json, msgpack, openapi])('success - Hello, World! with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringBodyParam('Hello, World!');
			expect(error).toBeNull();
			expect(result).toBe('Hello, World!');
		});
	});
	describe('simpleStringBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleStringBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleStringBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleStringBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleLocalDateBodyParam', () => {
		test.each([json, msgpack, openapi])('success - 2023-01-01 with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateBodyParam('2023-01-01');
			expect(error).toBeNull();
			expect(result).toBe('2023-01-01');
		});
	});
	describe('simpleLocalDateBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLocalDateBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleLocalDateBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleLocalDateTimeBodyParam', () => {
		test.each([json, msgpack, openapi])('success - 2023-01-01T12:34:56 with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateTimeBodyParam('2023-01-01T12:34:56');
			expect(error).toBeNull();
			expect(result).toBe('2023-01-01T12:34:56');
		});
	});
	describe('simpleLocalDateTimeBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateTimeBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleLocalDateTimeBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateTimeBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleLocalDateTimeBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateTimeBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleLocalDateTimeBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleScalarBodyParam', () => {
		test.each([json, msgpack, openapi])('success - ScalarValue with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleScalarBodyParam('Europe/Vienna');
			expect(error).toBeNull();
			expect(result).toBe('Europe/Vienna');
		});
	});
	describe('simpleScalarBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleScalarBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleScalarBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleScalarBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleScalarBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleScalarBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleScalarBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleZonedDateTimeBodyParam', () => {
		test.each([json, msgpack, openapi])('success - 2023-01-01T12:34:56Z with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleZonedDateTimeBodyParam('2023-01-01T12:34:56Z');
			expect(error).toBeNull();
			expect(result).toBe('2023-01-01T12:34:56Z');
		});
	});
	describe('simpleZonedDateTimeBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleZonedDateTimeBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleZonedDateTimeBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleZonedDateTimeBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleZonedDateTimeBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleZonedDateTimeBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleZonedDateTimeBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleEnumBodyParam', () => {
		test.each([json, msgpack, openapi])('success - VALUE_A with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleEnumBodyParam('A');
			expect(error).toBeNull();
			expect(result).toBe('A');
		});
	});
	describe('simpleEnumBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleEnumBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleEnumBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleEnumBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleEnumBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleEnumBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleEnumBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('simpleInlineEnumBodyParam', () => {
		test.each([json, msgpack, openapi])('success - VALUE_A with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleInlineEnumBodyParam('A');
			expect(error).toBeNull();
			expect(result).toBe('A');
		});
	});
	describe('simpleInlineEnumBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleInlineEnumBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});
	describe('simpleInlineEnumBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleInlineEnumBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
	});
	describe('simpleInlineEnumBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleInlineEnumBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe('NULL');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.simpleInlineEnumBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe('UNDEFINED');
		});
	});

	describe('multiBodyParam', () => {
		test.each([json, msgpack, openapi])(
			'success - valueA: Hello, valueB: World with $encoding',
			async ({ service }) => {
				const [result, error] = await service.multiBodyParam('Hello', 1, { key: 'a', version: '1', value: 'foo' });
				expect(error).toBeNull();
				expect(result).toBe('Hello-1-a');
			},
		);
	});
	describe('multiBodyParamFirst', () => {
		test.each([json, msgpack, openapi])(
			'success - valueA: undefined, valueB: World with $encoding',
			async ({ service }) => {
				const [result, error] = await service.multiBodyParamFirst(undefined, 1, {
					key: 'a',
					version: '1',
					value: 'foo',
				});
				expect(error).toBeNull();
				expect(result).toBe('undefined-1-a');
			},
		);
		test.each([json, msgpack, openapi])(
			'success - valueA: Hello, valueB: World with $encoding',
			async ({ service }) => {
				const [result, error] = await service.multiBodyParamFirst('Hello', 1, { key: 'a', version: '1', value: 'foo' });
				expect(error).toBeNull();
				expect(result).toBe('Hello-1-a');
			},
		);
	});
	describe('multiBodyParamOpt', () => {
		test.each([json, msgpack, openapi])(
			'success - valueA: Hello, valueB: undefined with $encoding',
			async ({ service }) => {
				const [result, error] = await service.multiBodyParamOpt('Hello', undefined, undefined);
				expect(error).toBeNull();
				expect(result).toBe('Hello-undefined-undefined');
			},
		);
	});
	describe('multiBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - valueA: Hello, valueB: null with $encoding', async ({ service }) => {
			const [result, error] = await service.multiBodyParamNil('Hello', null, null);
			expect(error).toBeNull();
			expect(result).toBe('Hello-null-null');
		});
	});
	describe('multiBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - valueA: Hello, valueB: null with $encoding', async ({ service }) => {
			const [result, error] = await service.multiBodyParamOptNil('Hello', null, undefined);
			expect(error).toBeNull();
			expect(result).toBe('Hello-null-undefined');
		});
	});

	describe('recordBodyParam', () => {
		test.each([json, msgpack, openapi])('success - valueA: foo, valueB: 42 with $encoding', async ({ service }) => {
			const [result, error] = await service.recordBodyParam({ key: '1', version: '1', value: 'foo' });
			expect(error).toBeNull();
			expect(result).toEqual({ key: '1', version: '1', value: 'foo' });
		});
	});
	describe('recordBodyParamOpt', () => {
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.recordBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('recordBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.recordBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
	});
	describe('recordBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.recordBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.recordBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});

	describe('unionBodyParam', () => {
		test.each([json, msgpack, openapi])('success - string value with $encoding', async ({ service }) => {
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
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.unionBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});
	describe('unionBodyParamNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.unionBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
	});

	describe('unionBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.unionBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual('NULL');
		});
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.unionBodyParamOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toEqual('UNDEFINED');
		});
	});

	describe('patchableRecordBodyParam', () => {
		test.each([json, msgpack, openapi])(
			'success - key: 1, version: 1, value: patchedValue with $encoding',
			async ({ service }) => {
				const [result, error] = await service.patchableRecordBodyParam({
					key: '1',
					version: '1',
					value: 'patchedValue',
				});
				expect(error).toBeNull();
				expect(result).toEqual({ key: '1', version: '1', value: 'patchedValue' });
			},
		);
		test.each([json, msgpack, openapi])(
			'success - key: 1, version: 1, value: undefined with $encoding',
			async ({ service }) => {
				const [result, error] = await service.patchableRecordBodyParam({ key: '1', version: '1' });
				expect(error).toBeNull();
				expect(result).toEqual({ key: '1', version: '1', value: 'undefined' });
			},
		);
	});
	describe('patchableRecordBodyParamNil', () => {
		test.each([json, msgpack, openapi])(
			'success - key: 1, version: 1, value: patchedValue with $encoding',
			async ({ service }) => {
				const [result, error] = await service.patchableRecordBodyParamNil({
					key: '1',
					version: '1',
					value: 'patchedValue',
				});
				expect(error).toBeNull();
				expect(result).toEqual({ key: '1', version: '1', value: 'patchedValue' });
			},
		);
		test.each([json, msgpack, openapi])(
			'success - key: 1, version: 1, value: undefined with $encoding',
			async ({ service }) => {
				const [result, error] = await service.patchableRecordBodyParamNil({ key: '1', version: '1' });
				expect(error).toBeNull();
				expect(result).toEqual({ key: '1', version: '1', value: 'undefined' });
			},
		);
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.patchableRecordBodyParamNil(null);
			expect(error).toBeNull();
			expect(result).toEqual({ key: 'null', version: 'null', value: 'null' });
		});
	});
	describe('patchableRecordBodyParamOpt', () => {
		test.each([json, msgpack, openapi])(
			'success - key: 1, version: 1, value: patchedValue with $encoding',
			async ({ service }) => {
				const [result, error] = await service.patchableRecordBodyParamOpt({
					key: '1',
					version: '1',
					value: 'patchedValue',
				});
				expect(error).toBeNull();
				expect(result).toEqual({ key: '1', version: '1', value: 'patchedValue' });
			},
		);
		test.each([json, msgpack, openapi])(
			'success - key: 1, version: 1, value: undefined with $encoding',
			async ({ service }) => {
				const [result, error] = await service.patchableRecordBodyParamOpt({ key: '1', version: '1' });
				expect(error).toBeNull();
				expect(result).toEqual({ key: '1', version: '1', value: 'undefined' });
			},
		);
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.patchableRecordBodyParamOpt();
			expect(error).toBeNull();
			expect(result).toEqual({ key: 'undefined', version: 'undefined', value: 'undefined' });
		});
	});
	describe('patchableRecordBodyParamOptNil', () => {
		test.each([json, msgpack, openapi])(
			'success - key: 1, version: 1, value: patchedValue with $encoding',
			async ({ service }) => {
				const [result, error] = await service.patchableRecordBodyParamOptNil({
					key: '1',
					version: '1',
					value: 'patchedValue',
				});
				expect(error).toBeNull();
				expect(result).toEqual({ key: '1', version: '1', value: 'patchedValue' });
			},
		);
		test.each([json, msgpack, openapi])(
			'success - key: 1, version: 1, value: undefined with $encoding',
			async ({ service }) => {
				const [result, error] = await service.patchableRecordBodyParamOptNil({ key: '1', version: '1' });
				expect(error).toBeNull();
				expect(result).toEqual({ key: '1', version: '1', value: 'undefined' });
			},
		);
		test.each([json, msgpack, openapi])('success - undefined with $encoding', async ({ service }) => {
			const [result, error] = await service.patchableRecordBodyParamOptNil();
			expect(error).toBeNull();
			expect(result).toEqual({ key: 'undefined', version: 'undefined', value: 'undefined' });
		});
		test.each([json, msgpack, openapi])('success - null with $encoding', async ({ service }) => {
			const [result, error] = await service.patchableRecordBodyParamOptNil(null);
			expect(error).toBeNull();
			expect(result).toEqual({ key: 'null', version: 'null', value: 'null' });
		});
	});
});
