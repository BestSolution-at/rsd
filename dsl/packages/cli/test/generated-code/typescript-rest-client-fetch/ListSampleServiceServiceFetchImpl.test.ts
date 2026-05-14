import { describe, expect, test } from 'vitest';

import { api, createListSampleServiceService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import { isSampleErrorError } from '../../test-specs/gen-out/client/typescript-client/src/Errors.js';

const jsonService = createListSampleServiceService({
	baseUrl: 'http://localhost:3000',
});

const msgpackService = createListSampleServiceService({
	baseUrl: 'http://localhost:3000',
	encoding: 'application/vnd.msgpack',
});

const openAPIService = createListSampleServiceService({
	baseUrl: 'http://localhost:3000',
});

const json = { service: jsonService, encoding: 'application/json' as const };
const msgpack = { service: msgpackService, encoding: 'application/vnd.msgpack' as const };
const openAPI = { service: openAPIService, encoding: 'application/json via OpenAPI' as const };

const jsonFailService = createListSampleServiceService({
	baseUrl: 'http://localhost:3000',
	lifecycleHandlers: {
		preFetch: () => {
			const newInit = { headers: { 'X-Fail-Invalid-Data': 'true' } };
			return newInit;
		},
	},
});

const msgpackFailService = createListSampleServiceService({
	baseUrl: 'http://localhost:3000',
	encoding: 'application/vnd.msgpack',
	lifecycleHandlers: {
		preFetch: () => {
			const newInit = { headers: { 'X-Fail-Invalid-Data': 'true' } };
			return newInit;
		},
	},
});

const openAPIFailService = createListSampleServiceService({
	baseUrl: 'http://localhost:3000',
	lifecycleHandlers: {
		preFetch: () => {
			const newInit = { headers: { 'X-Fail-Invalid-Data': 'true' } };
			return newInit;
		},
	},
});

const jsonInvalid = { service: jsonFailService, encoding: 'application/json' as const };
const msgpackInvalid = { service: msgpackFailService, encoding: 'application/vnd.msgpack' as const };
const openAPIInvalid = { service: openAPIFailService, encoding: 'application/json via OpenAPI' as const };

describe('ListSampleServiceServiceImpl', () => {
	describe('listBoolean', () => {
		test.each([json, msgpack, openAPI])('sucess - $encoding', async ({ service }) => {
			const [result, error] = await service.listBoolean();
			expect(error).toBeNull();
			expect(result).toStrictEqual([true, false, true]);
		});
		test.each([jsonInvalid, msgpackInvalid, openAPIInvalid])('fail - $encoding - invalid data', async ({ service }) => {
			const [result, error] = await service.listBoolean();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('listShort', () => {
		test.each([json, msgpack, openAPI])('sucess - $encoding', async ({ service }) => {
			const [result, error] = await service.listShort();
			expect(error).toBeNull();
			expect(result).toStrictEqual([123, 456, 789]);
		});
		test.each([jsonInvalid, msgpackInvalid, openAPIInvalid])('fail - $encoding - invalid data', async ({ service }) => {
			const [result, error] = await service.listShort();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('listInt', () => {
		test.each([json, msgpack, openAPI])('sucess - $encoding', async ({ service }) => {
			const [result, error] = await service.listInt();
			expect(error).toBeNull();
			expect(result).toStrictEqual([123456, 789012, 345678]);
		});
		test.each([jsonInvalid, msgpackInvalid, openAPIInvalid])('fail - $encoding - invalid data', async ({ service }) => {
			const [result, error] = await service.listInt();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('listLong', () => {
		test.each([json, msgpack, openAPI])('sucess - $encoding', async ({ service }) => {
			const [result, error] = await service.listLong();
			expect(error).toBeNull();
			expect(result).toStrictEqual([1234567890123, 2345678901234, 3456789012345]);
		});
		test.each([jsonInvalid, msgpackInvalid, openAPIInvalid])('fail - $encoding - invalid data', async ({ service }) => {
			const [result, error] = await service.listLong();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('listFloat', () => {
		test.each([json, msgpack, openAPI])('sucess - $encoding', async ({ service }) => {
			const [result, error] = await service.listFloat();
			expect(error).toBeNull();
			expect(result).toStrictEqual([12.34000015258789, 56.779998779296875, 90.12000274658203]);
		});
		test.each([jsonInvalid, msgpackInvalid, openAPIInvalid])('fail - $encoding - invalid data', async ({ service }) => {
			const [result, error] = await service.listFloat();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('listDouble', () => {
		test.each([json, msgpack, openAPI])('sucess - $encoding', async ({ service }) => {
			const [result, error] = await service.listDouble();
			expect(error).toBeNull();
			expect(result).toStrictEqual([12.3456789, 98.7654321, 54.3210987]);
		});
		test.each([jsonInvalid, msgpackInvalid, openAPIInvalid])('fail - $encoding - invalid data', async ({ service }) => {
			const [result, error] = await service.listDouble();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('listString', () => {
		test.each([json, msgpack, openAPI])('sucess - $encoding', async ({ service }) => {
			const [result, error] = await service.listString();
			expect(error).toBeNull();
			expect(result).toStrictEqual(['first', 'second', 'third']);
		});
		test.each([jsonInvalid, msgpackInvalid, openAPIInvalid])('fail - $encoding - invalid data', async ({ service }) => {
			const [result, error] = await service.listString();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('listLocalDate', () => {
		test.each([json, msgpack, openAPI])('sucess - $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDate();
			expect(error).toBeNull();
			expect(result).toStrictEqual(['2020-01-01', '2021-02-02', '2022-03-03']);
		});
		test.each([jsonInvalid, msgpackInvalid, openAPIInvalid])('fail - $encoding - invalid data', async ({ service }) => {
			const [result, error] = await service.listLocalDate();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('listLocalDateTime', () => {
		test.each([json, msgpack, openAPI])('sucess - $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalDateTime();
			expect(error).toBeNull();
			expect(result).toStrictEqual(['2020-01-01T10:00:00', '2021-02-02T11:30:00', '2022-03-03T12:45:00']);
		});
		test.each([jsonInvalid, msgpackInvalid, openAPIInvalid])('fail - $encoding - invalid data', async ({ service }) => {
			const [result, error] = await service.listLocalDateTime();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('listLocalTime', () => {
		test.each([json, msgpack, openAPI])('sucess - $encoding', async ({ service }) => {
			const [result, error] = await service.listLocalTime();
			expect(error).toBeNull();
			expect(result).toStrictEqual(['10:00:00', '11:30:00', '12:45:00']);
		});
		test.each([jsonInvalid, msgpackInvalid, openAPIInvalid])('fail - $encoding - invalid data', async ({ service }) => {
			const [result, error] = await service.listLocalTime();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('listOffsetDateTime', () => {
		test.each([json, msgpack, openAPI])('sucess - $encoding', async ({ service }) => {
			const [result, error] = await service.listOffsetDateTime();
			expect(error).toBeNull();
			expect(result).toStrictEqual(['2020-01-01T10:00:00+01:00', '2021-02-02T11:30:00+01:00', '2022-03-03T12:45:00+01:00']);
		});
		test.each([jsonInvalid, msgpackInvalid, openAPIInvalid])('fail - $encoding - invalid data', async ({ service }) => {
			const [result, error] = await service.listOffsetDateTime();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('listZonedDateTime', () => {
		test.each([json, msgpack, openAPI])('sucess - $encoding', async ({ service }) => {
			const [result, error] = await service.listZonedDateTime();
			expect(error).toBeNull();
			expect(result).toStrictEqual(['2020-01-01T10:00:00Z', '2021-02-02T11:30:00Z', '2022-03-03T12:45:00Z']);
		});
		test.each([jsonInvalid, msgpackInvalid, openAPIInvalid])('fail - $encoding - invalid data', async ({ service }) => {
			const [result, error] = await service.listZonedDateTime();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('listScalar', () => {
		test.each([json, msgpack, openAPI])('sucess - $encoding', async ({ service }) => {
			const [result, error] = await service.listScalar();
			expect(error).toBeNull();
			expect(result).toStrictEqual(['Europe/Vienna', 'America/New_York', 'Asia/Tokyo']);
		});
		test.each([jsonInvalid, msgpackInvalid, openAPIInvalid])('fail - $encoding - invalid data', async ({ service }) => {
			const [result, error] = await service.listScalar();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('listEnum', () => {
		test.each([json, msgpack, openAPI])('sucess - $encoding', async ({ service }) => {
			const [result, error] = await service.listEnum();
			expect(error).toBeNull();
			expect(result).toStrictEqual(['A', 'B']);
		});
		test.each([jsonInvalid, msgpackInvalid, openAPIInvalid])('fail - $encoding - invalid data', async ({ service }) => {
			const [result, error] = await service.listEnum();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Invalid result');
			}
		});
	});

	describe('listSimpleRecord', () => {
		test.each([json, msgpack, openAPI])('sucess - $encoding', async ({ service }) => {
			const [result, error] = await service.listSimpleRecord();
			expect(error).toBeNull();
			expect(result).toStrictEqual([
				{
					key: '123',
					version: '1',
					value: 'Sample Name',
				},
			]);
		});
		test.each([jsonInvalid, msgpackInvalid, openAPIInvalid])('fail - $encoding - invalid data', async ({ service }) => {
			const [result, error] = await service.listSimpleRecord();
			expect(error).not.toBeNull();
			expect(result).toBeUndefined();
			expect(api.service.isNativeError(error)).toBe(true);
			if (api.service.isNativeError(error)) {
				expect(error.error.message).toEqual('Value in property key is invalid');
			}
		});
	});

	describe('listSimpleRecordWithError', () => {
		test.each([json, msgpack, openAPI])('error case - SampleErrorError - $encoding', async ({ service }) => {
			const [result, error] = await service.listSimpleRecordWithError();
			expect(result).toBeUndefined();
			expect(error).not.toBeNull();
			expect(isSampleErrorError(error)).toBe(true);
			if (isSampleErrorError(error)) {
				expect(error.message).toEqual('My error');
			}
		});
	});
});
