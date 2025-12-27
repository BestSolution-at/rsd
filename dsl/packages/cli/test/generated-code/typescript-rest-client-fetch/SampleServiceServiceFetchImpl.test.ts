import { describe, expect, test } from 'vitest';

import { api, createSampleServiceService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import {
	isSampleError2Error,
	isSampleErrorError,
} from '../../test-specs/gen-out/client/typescript-client/src/Errors.js';

const service = createSampleServiceService({
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

describe('SampleServiceServiceFetchImpl', () => {
	describe('getBoolean', () => {
		test('sucess getBoolean', async () => {
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
						const newInit = { headers: { 'X-Fail-Invalid-Json': 'true' } };
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
				baseUrl: 'http://localhost:3000',
				lifecycleHandlers: {
					preFetch: () => {
						const newInit = { headers: { 'X-Fail-Network-Error': 'true' } };
						return newInit;
					},
				},
			});

			const [result, error] = await serviceFail.getBoolean();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
		});
	});
	describe('getShort', () => {
		test('sucess', async () => {
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
		test('sucess', async () => {
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
		test('sucess', async () => {
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
		test('sucess', async () => {
			const [result, error] = await service.getFloat();
			expect(error).toBeNull();
			expect(result).toBe(123.45);
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
		test('sucess', async () => {
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
		test('sucess', async () => {
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
		test('sucess', async () => {
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
		test('sucess', async () => {
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
		test('sucess', async () => {
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
		test('sucess', async () => {
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
		test('sucess', async () => {
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
		test('sucess', async () => {
			const [result, error] = await service.voidOperation();
			expect(error).toBeNull();
			expect(result).toBe(api.result.Void);
		});
	});

	describe('errorOperation', () => {
		test('fail - SampleError', async () => {
			const [result, error] = await service.errorOperation();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(isSampleErrorError(error)).toBe(true);
		});
	});

	describe('multierroroperation', () => {
		test('fail - SampleError', async () => {
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
		test('success', async () => {
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
		test('fail - SampleError', async () => {
			const [result, error] = await service.getSimpleRecordWithError('123');
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(isSampleErrorError(error)).toBe(true);
		});
	});
});
