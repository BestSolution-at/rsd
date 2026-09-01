import { describe, expect, test } from 'vitest';

import { api, createListStreamingServiceService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import {
	RSDLocalDate,
	RSDLocalDateTime,
	RSDLocalTime,
	RSDLong,
	RSDOffsetDateTime,
	RSDZonedDateTime,
} from '../../test-specs/gen-out/client/typescript-client/src/model/_Builtins.js';

import { Range } from '../../test-specs/gen-out/client/typescript-client/src/model/_Scalars.js';
import { SampleEnum } from '../../test-specs/gen-out/client/typescript-client-openapi/src/index.js';

const jsonService = createListStreamingServiceService({
	baseUrl: 'http://localhost:3000',
});

const msgpackService = createListStreamingServiceService({
	baseUrl: 'http://localhost:3000',
	encoding: 'application/vnd.msgpack',
});

// No Stream available
// const openAPIService = createOpenAPIListSampleServiceService({
// 	baseUrl: 'http://localhost:3000',
// });

const json = { service: jsonService, encoding: 'application/json' as const };
const msgpack = { service: msgpackService, encoding: 'application/vnd.msgpack' as const };
// const openAPI = { service: openAPIService, encoding: 'application/json via OpenAPI' as const };

describe('ListStreamingServiceServiceImpl', () => {
	describe('streamBoolean', () => {
		test.each([json, msgpack])('should stream booleans with $encoding', async ({ service }) => {
			const values: boolean[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;
			await service.streamBoolean({
				value: values.push.bind(values),
				error: errors.push.bind(errors),
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(2);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toBeTruthy();
			expect(values[1]).toBeFalsy();
		});
	});

	describe('streamShort', () => {
		test.each([json, msgpack])('should stream shorts with $encoding', async ({ service }) => {
			const values: number[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;
			await service.streamShort({
				value: values.push.bind(values),
				error: errors.push.bind(errors),
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(2);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toBe(-32768);
			expect(values[1]).toBe(32767);
		});
	});

	describe('streamInt', () => {
		test.each([json, msgpack])('should stream ints with $encoding', async ({ service }) => {
			const values: number[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;
			await service.streamInt({
				value: values.push.bind(values),
				error: errors.push.bind(errors),
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(2);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toBe(-2147483648);
			expect(values[1]).toBe(2147483647);
		});
	});

	describe('streamLong', () => {
		test.each([json, msgpack])('should stream longs with $encoding', async ({ service }) => {
			const values: RSDLong[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;
			await service.streamLong({
				value: values.push.bind(values),
				error: errors.push.bind(errors),
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(2);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toStrictEqual(-9223372036854775808n);
			expect(values[1]).toStrictEqual(9223372036854775807n);
		});
	});

	describe('streamFloat', () => {
		test.each([json, msgpack])('should stream floats with $encoding', async ({ service }) => {
			const values: number[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;
			await service.streamFloat({
				value: values.push.bind(values),
				error: errors.push.bind(errors),
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(2);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toBe(1.401298464324817e-45);
			expect(values[1]).toBe(3.4028234663852886e38);
		});
	});

	describe('streamDouble', () => {
		test.each([json, msgpack])('should stream doubles with $encoding', async ({ service }) => {
			const values: number[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;
			await service.streamDouble({
				value: values.push.bind(values),
				error: errors.push.bind(errors),
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(2);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toBe(5e-324);
			expect(values[1]).toBe(1.7976931348623157e308);
		});
	});

	describe('streamString', () => {
		test.each([json, msgpack])('should stream strings with $encoding', async ({ service }) => {
			const values: string[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;
			await service.streamString({
				value: values.push.bind(values),
				error: errors.push.bind(errors),
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(8);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toBe('Hello');
			expect(values[1]).toBe('World');
			expect(values[2]).toBe('This');
			expect(values[3]).toBe('is');
			expect(values[4]).toBe('a');
			expect(values[5]).toBe('stream');
			expect(values[6]).toBe('of');
			expect(values[7]).toBe('strings');
		});
	});

	describe('streamLocalDate', () => {
		test.each([json, msgpack])('should stream local-dates with $encoding', async ({ service }) => {
			const values: RSDLocalDate[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;
			await service.streamLocalDate({
				value: values.push.bind(values),
				error: errors.push.bind(errors),
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(2);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toStrictEqual(Temporal.PlainDate.from('2020-01-01'));
			expect(values[1]).toStrictEqual(Temporal.PlainDate.from('1970-01-01'));
		});
	});

	describe('streamLocalDateTime', () => {
		test.each([json, msgpack])('should stream local-date-times with $encoding', async ({ service }) => {
			const values: RSDLocalDateTime[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;
			await service.streamLocalDateTime({
				value: values.push.bind(values),
				error: errors.push.bind(errors),
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(2);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toStrictEqual(Temporal.PlainDateTime.from('2020-01-01T00:00:00'));
			expect(values[1]).toStrictEqual(Temporal.PlainDateTime.from('1970-01-01T00:00:00'));
		});
	});

	describe('streamLocalTime', () => {
		test.each([json, msgpack])('should stream local-times with $encoding', async ({ service }) => {
			const values: RSDLocalTime[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;
			await service.streamLocalTime({
				value: values.push.bind(values),
				error: errors.push.bind(errors),
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(2);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toStrictEqual(Temporal.PlainTime.from('12:00'));
			expect(values[1]).toStrictEqual(Temporal.PlainTime.from('23:59'));
		});
	});

	describe('streamOffsetDateTime', () => {
		test.each([json, msgpack])('should stream offset-date-times with $encoding', async ({ service }) => {
			const values: RSDOffsetDateTime[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;
			await service.streamOffsetDateTime({
				value: values.push.bind(values),
				error: errors.push.bind(errors),
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(2);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toStrictEqual(RSDOffsetDateTime.from('2020-01-01T00:00:00+00:00'));
			expect(values[1]).toStrictEqual(RSDOffsetDateTime.from('1970-01-01T00:00:00+00:00'));
		});
	});

	describe('streamZonedDateTime', () => {
		test.each([json, msgpack])('should stream zoned-date-times with $encoding', async ({ service }) => {
			const values: RSDZonedDateTime[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;
			await service.streamZonedDateTime({
				value: values.push.bind(values),
				error: errors.push.bind(errors),
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(2);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toStrictEqual(Temporal.ZonedDateTime.from('2020-01-01T00:00:00+01:00[Europe/Vienna]'));
			expect(values[1]).toStrictEqual(Temporal.ZonedDateTime.from('1970-01-01T00:00:00+01:00[Europe/Vienna]'));
		});
	});

	describe('streamScalar', () => {
		test.each([json, msgpack])('should stream scalars with $encoding', async ({ service }) => {
			const values: Range[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;
			await service.streamScalar({
				value: values.push.bind(values),
				error: errors.push.bind(errors),
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(2);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toStrictEqual({
				end: 10,
				start: 1,
			});
			expect(values[1]).toStrictEqual({
				end: 30,
				start: 20,
			});
		});
	});

	describe('streamEnum', () => {
		test.each([json, msgpack])('should stream enums with $encoding', async ({ service }) => {
			const values: SampleEnum[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;
			await service.streamEnum({
				value: values.push.bind(values),
				error: errors.push.bind(errors),
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(2);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toStrictEqual('A');
			expect(values[1]).toStrictEqual('B');
		});
	});

	describe('streamInlineEnum', () => {
		test.each([json, msgpack])('should stream inline-enums with $encoding', async ({ service }) => {
			const values: ('A' | 'B')[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;
			await service.streamInlineEnum({
				value: values.push.bind(values),
				error: errors.push.bind(errors),
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(2);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toStrictEqual('A');
			expect(values[1]).toStrictEqual('B');
		});
	});

	describe('streamRecord', () => {
		test.each([json, msgpack])('should stream records with $encoding', async ({ service }) => {
			const values: api.model.SimpleRecord[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;

			await service.streamRecord({
				value: value => {
					values.push(value);
				},
				error: error => {
					errors.push(error);
				},
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(3);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);

			expect(values[0]).toStrictEqual({ key: 'key-0', version: '1', value: 'Hello World for 0. time!' });
			expect(values[1]).toStrictEqual({ key: 'key-1', version: '1', value: 'Hello World for 1. time!' });
			expect(values[2]).toStrictEqual({ key: 'key-2', version: '1', value: 'Hello World for 2. time!' });
		});
	});

	describe('streamUnion', () => {
		test.each([json, msgpack])('should stream unions with $encoding', async ({ service }) => {
			const values: api.model.Union[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;

			await service.streamUnion({
				value: value => {
					values.push(value);
				},
				error: error => {
					errors.push(error);
				},
				final: () => {
					finalCalled = true;
				},
			});

			expect(values).toHaveLength(2);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);

			expect(values[0]).toStrictEqual({
				'@type': 'union-a',
				shared: 'Foo',
				valueA: 'A',
			});
			expect(values[1]).toStrictEqual({
				'@type': 'union-b',
				shared: 'Bar',
				valueB: 'B',
			});
		});
	});

	describe('uploadFileStreamRecords', () => {
		test.each([json, msgpack])('should stream records with $encoding', async ({ service }) => {
			const file = new File(['Hello\nWorld\nStreaming'], 'hello.txt', { type: 'text/plain' });
			const values: api.model.SimpleRecord[] = [];
			const errors: (api.service.StatusRSDError | api.service.NativeRSDError)[] = [];
			let finalCalled = false;

			await service.uploadFileStreamRecords(
				{
					value: value => {
						values.push(value);
					},
					error: error => {
						errors.push(error);
					},
					final: () => {
						finalCalled = true;
					},
				},
				file,
			);

			expect(values).toHaveLength(3);
			expect(errors).toHaveLength(0);
			expect(finalCalled).toBe(true);
			expect(values[0]).toStrictEqual({ key: 'line-0', version: '1', value: 'Hello' });
			expect(values[1]).toStrictEqual({ key: 'line-1', version: '1', value: 'World' });
			expect(values[2]).toStrictEqual({ key: 'line-2', version: '1', value: 'Streaming' });
		});
	});
});
