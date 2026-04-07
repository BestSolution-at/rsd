import { describe, expect, test } from 'vitest';

import { api, createSampleServiceService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import {
	isSampleError2Error,
	isSampleErrorError,
} from '../../test-specs/gen-out/client/typescript-client/src/Errors.js';
import { createOpenAPISampleServiceService } from '../../test-specs/gen-out/client/typescript-client-openapi/src/adapter/SampleServiceService.adapter.js';

const jsonService = createSampleServiceService({
	baseUrl: 'http://localhost:3000',
});

const msgpackService = createSampleServiceService({
	baseUrl: 'http://localhost:3000',
	encoding: 'application/vnd.msgpack',
});

const openApiService = createOpenAPISampleServiceService({
	baseUrl: 'http://localhost:3000',
});

const serviceFailInvalid = createSampleServiceService({
	baseUrl: 'http://localhost:3000',
	lifecycleHandlers: {
		preFetch: () => {
			const newInit = { headers: { 'X-Fail-Invalid-Data': 'true' } };
			return newInit;
		},
	},
});

const json = {
	encoding: 'application/json' as const,
	service: jsonService,
};

const jsonOpenApi = {
	encoding: 'application/json via openAPI' as const,
	service: openApiService,
};

const msgpack = {
	encoding: 'application/vnd.msgpack' as const,
	service: msgpackService,
};

describe('SampleServiceServiceFetchImpl', () => {
	describe('getBoolean', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.getBoolean();
			expect(error).toBeNull();
			expect(result).toBe(true);
		});
		test('fail - unknown status', async () => {
			const serviceFail = createSampleServiceService({
				baseUrl: 'http://localhost:3000',
				lifecycleHandlers: {
					preFetch: () => {
						const newInit = { headers: { 'X-Fail-Unknown-Status': 'true' } };
						return newInit;
					},
				},
			});

			const [result, error] = await serviceFail.getBoolean();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isStatusError(error)).toBe(true);
			if (api.service.isStatusError(error)) {
				expect(error.status).toBe(400);
				expect(error.message).toBe('Sample Invalid response');
			}
		});
		test('fail - invalid data', async () => {
			const [result, error] = await serviceFailInvalid.getBoolean();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
		test('fail - invalid json', async () => {
			const serviceFail = createSampleServiceService({
				baseUrl: 'http://localhost:3000',
				lifecycleHandlers: {
					preFetch: () => {
						const newInit = { headers: { 'X-Fail-Invalid-Json': 'true', 'X-Fail-Invalid-Encoded-Data': 'true' } };
						return newInit;
					},
				},
			});

			const [result, error] = await serviceFail.getBoolean();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.constructor).toBe(SyntaxError);
			}
		});
		test('fail - network error', async () => {
			const serviceFail = createSampleServiceService({
				baseUrl: 'http://localhost:3001',
			});

			const [result, error] = await serviceFail.getBoolean();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
		});
	});
	describe('getShort', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.getShort();
			expect(error).toBeNull();
			expect(result).toBe(123);
		});
		test('fail - invalid data', async () => {
			const [result, error] = await serviceFailInvalid.getShort();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('getInt', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.getInt();
			expect(error).toBeNull();
			expect(result).toBe(123456);
		});
		test('fail - invalid data', async () => {
			const [result, error] = await serviceFailInvalid.getInt();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('getLong', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.getLong();
			expect(error).toBeNull();
			expect(result).toBe(1234567890123);
		});
		test('fail - invalid data', async () => {
			const [result, error] = await serviceFailInvalid.getLong();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('getFloat', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.getFloat();
			expect(error).toBeNull();
			expect(result).toBe(123.44999694824219);
		});
		test('fail - invalid data', async () => {
			const [result, error] = await serviceFailInvalid.getFloat();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('getDouble', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.getDouble();
			expect(error).toBeNull();
			expect(result).toBe(123.456789);
		});
		test('fail - invalid data', async () => {
			const [result, error] = await serviceFailInvalid.getDouble();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('getString', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.getString();
			expect(error).toBeNull();
			expect(result).toBe('sample string');
		});
		test('fail - invalid data', async () => {
			const [result, error] = await serviceFailInvalid.getString();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('getLocalDate', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.getLocalDate();
			expect(error).toBeNull();
			expect(result).toBe('2020-01-01');
		});
		test('fail - invalid data', async () => {
			const [result, error] = await serviceFailInvalid.getLocalDate();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('getLocalDateTime', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.getLocalDateTime();
			expect(error).toBeNull();
			expect(result).toBe('2020-01-01T10:00:00');
		});
		test('fail - invalid data', async () => {
			const [result, error] = await serviceFailInvalid.getLocalDateTime();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('getZonedDateTime', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.getZonedDateTime();
			expect(error).toBeNull();
			expect(result).toBe('2025-01-01T10:00:00Z');
		});
		test('fail - invalid data', async () => {
			const [result, error] = await serviceFailInvalid.getZonedDateTime();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('getScalar', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.getScalar();
			expect(error).toBeNull();
			expect(result).toBe('Europe/Vienna');
		});
		test('fail - invalid data', async () => {
			const [result, error] = await serviceFailInvalid.getScalar();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('getEnum', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.getEnum();
			expect(error).toBeNull();
			expect(result).toBe('A');
		});
		test('fail - invalid data', async () => {
			const [result, error] = await serviceFailInvalid.getEnum();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('voidOperation', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.voidOperation();
			expect(error).toBeNull();
			expect(result).toBe(api.result.Void);
		});
	});

	describe('errorOperation', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.errorOperation();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(isSampleErrorError(error)).toBe(true);
		});
	});

	describe('multierroroperation', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.multiErrorOperation();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(isSampleErrorError(error)).toBe(true);
		});

		test('fail - SampleError2', async () => {
			const serviceRrror2 = createSampleServiceService({
				baseUrl: 'http://localhost:3000',
				lifecycleHandlers: {
					preFetch: () => {
						const newInit = { headers: { 'x-with-status-401': 'true' } };
						return newInit;
					},
				},
			});
			const [result, error] = await serviceRrror2.multiErrorOperation();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(isSampleError2Error(error)).toBe(true);
		});
	});
	describe('getSimpleRecord', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.getSimpleRecord('123');
			expect(error).toBeNull();
			expect(result).toEqual({
				key: '123',
				version: '1',
				value: 'Sample Name',
			});
		});
		test('fail - invalid data', async () => {
			const [result, error] = await serviceFailInvalid.getSimpleRecord('123');
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
		});
	});

	describe('getSimpleRecordWithError', () => {
		test.each([json, msgpack, jsonOpenApi])('sucess with $encoding ', async ({ service }) => {
			const [result, error] = await service.getSimpleRecordWithError('123');
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(isSampleErrorError(error)).toBe(true);
		});
	});
});
