import { describe, expect, test } from 'vitest';

import { createBinaryTypesService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import { UploadMixedResult } from '../../test-specs/gen-out/client/typescript-client/src/model/UploadMixedResult.js';
import { createOpenAPIBinaryTypesService } from '../../test-specs/gen-out/client/typescript-client-openapi/src/adapter/BinaryTypesService.adapter.js';

const jsonService = createBinaryTypesService({
	baseUrl: 'http://localhost:3000',
});

const msgpackService = createBinaryTypesService({
	baseUrl: 'http://localhost:3000',
	encoding: 'application/vnd.msgpack',
});

const openApiService = createOpenAPIBinaryTypesService({
	baseUrl: 'http://localhost:3000',
});

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
	service: openApiService,
};

describe('BinaryTypesServiceFetchImpl', () => {
	describe('uploadFile', () => {
		test.each([json, msgpack, openapi])('success', async ({ service }) => {
			const file = new File(['Hello, World!'], 'hello.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFile(file);
			expect(error).toBeNull();
			expect(result).toBe(13);
		});
	});
	describe('uploadFileOpt', () => {
		test.each([json, msgpack, openapi])('success with file', async ({ service }) => {
			const file = new File(['Hello, World!'], 'hello.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFileOpt(file);
			expect(error).toBeNull();
			expect(result).toBe(13);
		});
		test.each([json, msgpack /*, openapi*/])('success with undefined', async ({ service }) => {
			const [result, error] = await service.uploadFileOpt(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});
	describe('uploadFileNil', () => {
		test.each([json, msgpack, openapi])('success with file', async ({ service }) => {
			const file = new File(['Hello, World!'], 'hello.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFileNil(file);
			expect(error).toBeNull();
			expect(result).toBe(13);
		});
		test.each([json, msgpack /*, openapi*/])('success with null', async ({ service }) => {
			const [result, error] = await service.uploadFileNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
	});
	describe('uploadFileOptNil', () => {
		test.each([json, msgpack, openapi])('success with file', async ({ service }) => {
			const file = new File(['Hello, World!'], 'hello.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFileOptNil(file);
			expect(error).toBeNull();
			expect(result).toBe(13);
		});
		test.each([json, msgpack /*, openapi*/])('success with null', async ({ service }) => {
			const [result, error] = await service.uploadFileOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
		test.each([json, msgpack /*, openapi*/])('success with undefined', async ({ service }) => {
			const [result, error] = await service.uploadFileOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});

	describe('uploadBlob', () => {
		test.each([json, msgpack, openapi])('success', async ({ service }) => {
			const blob = new Blob(['Hello, Blob!'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlob(blob);
			expect(error).toBeNull();
			expect(result).toBe(12);
		});
	});
	describe('uploadBlobOpt', () => {
		test.each([json, msgpack, openapi])('success with blob', async ({ service }) => {
			const blob = new Blob(['Hello, Blob!'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlobOpt(blob);
			expect(error).toBeNull();
			expect(result).toBe(12);
		});
		test.each([json, msgpack /*, openapi*/])('success with undefined', async ({ service }) => {
			const [result, error] = await service.uploadBlobOpt(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});
	describe('uploadBlobNil', () => {
		test.each([json, msgpack, openapi])('success with blob', async ({ service }) => {
			const blob = new Blob(['Hello, Blob!'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlobNil(blob);
			expect(error).toBeNull();
			expect(result).toBe(12);
		});
		test.each([json, msgpack /*, openapi*/])('success with null', async ({ service }) => {
			const [result, error] = await service.uploadBlobNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
	});
	describe('uploadBlobOptNil', () => {
		test.each([json, msgpack, openapi])('success with blob', async ({ service }) => {
			const blob = new Blob(['Hello, Blob!'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlobOptNil(blob);
			expect(error).toBeNull();
			expect(result).toBe(12);
		});
		test.each([json, msgpack /*, openapi*/])('success with null', async ({ service }) => {
			const [result, error] = await service.uploadBlobOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
		test.each([json, msgpack /*, openapi*/])('success with undefined', async ({ service }) => {
			const [result, error] = await service.uploadBlobOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});

	describe('uploadFileList', () => {
		test.each([json, msgpack, openapi])('success', async ({ service }) => {
			const file1 = new File(['File One'], 'file1.txt', { type: 'text/plain' });
			const file2 = new File(['File Two'], 'file2.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFileList([file1, file2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
	});
	describe('uploadFileListOpt', () => {
		test.each([json, msgpack, openapi])('success with list', async ({ service }) => {
			const file1 = new File(['File One'], 'file1.txt', { type: 'text/plain' });
			const file2 = new File(['File Two'], 'file2.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFileListOpt([file1, file2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
		test.each([json, msgpack /*, openapi*/])('success with undefined', async ({ service }) => {
			const [result, error] = await service.uploadFileListOpt(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});
	describe('uploadFileListNil', () => {
		test.each([json, msgpack, openapi])('success with list', async ({ service }) => {
			const file1 = new File(['File One'], 'file1.txt', { type: 'text/plain' });
			const file2 = new File(['File Two'], 'file2.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFileListNil([file1, file2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
		//FIXME Upload empty list
		test.each([json, msgpack /*, openapi*/])('success with null', async ({ service }) => {
			const [result, error] = await service.uploadFileListNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
	});
	describe('uploadFileListOptNil', () => {
		test.each([json, msgpack, openapi])('success with list', async ({ service }) => {
			const file1 = new File(['File One'], 'file1.txt', { type: 'text/plain' });
			const file2 = new File(['File Two'], 'file2.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFileListOptNil([file1, file2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
		test.each([json, msgpack /*, openapi*/])('success with null', async ({ service }) => {
			const [result, error] = await service.uploadFileListOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
		test.each([json, msgpack /*, openapi*/])('success with undefined', async ({ service }) => {
			const [result, error] = await service.uploadFileListOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});

	describe('uploadBlobList', () => {
		test.each([json, msgpack, openapi])('success', async ({ service }) => {
			const blob1 = new Blob(['Blob One'], { type: 'text/plain' });
			const blob2 = new Blob(['Blob Two'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlobList([blob1, blob2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
	});
	describe('uploadBlobListOpt', () => {
		test.each([json, msgpack, openapi])('success with list', async ({ service }) => {
			const blob1 = new Blob(['Blob One'], { type: 'text/plain' });
			const blob2 = new Blob(['Blob Two'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlobListOpt([blob1, blob2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
		test.each([json, msgpack /*, openapi*/])('success with undefined', async ({ service }) => {
			const [result, error] = await service.uploadBlobListOpt(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});
	describe('uploadBlobListNil', () => {
		test.each([json, msgpack, openapi])('success with list', async ({ service }) => {
			const blob1 = new Blob(['Blob One'], { type: 'text/plain' });
			const blob2 = new Blob(['Blob Two'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlobListNil([blob1, blob2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
		//FIXME Upload empty list
		test.each([json, msgpack /*, openapi*/])('success with null', async ({ service }) => {
			const [result, error] = await service.uploadBlobListNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
	});
	describe('uploadBlobListOptNil', () => {
		test.each([json, msgpack, openapi])('success with list', async ({ service }) => {
			const blob1 = new Blob(['Blob One'], { type: 'text/plain' });
			const blob2 = new Blob(['Blob Two'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlobListOptNil([blob1, blob2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
		test.each([json, msgpack /*, openapi*/])('success with null', async ({ service }) => {
			const [result, error] = await service.uploadBlobListOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
		test.each([json, msgpack /*, openapi*/])('success with undefined', async ({ service }) => {
			const [result, error] = await service.uploadBlobListOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});

	describe('downloadFile', () => {
		test.each([json, msgpack, openapi])('success', async ({ service }) => {
			const [result, error] = await service.downloadFile();
			expect(error).toBeNull();
			expect(result).toBeInstanceOf(File);
			if (result) {
				expect(result.name).toBe('hello.txt');
				expect(result.type).toBe('text/plain;charset=utf-8');
				const text = await result.text();
				expect(text).toBe('Hello, World!');
			}
		});
	});
	describe('downloadBlob', () => {
		test.each([json, msgpack, openapi])('success', async ({ service }) => {
			const [result, error] = await service.downloadBlob();
			expect(error).toBeNull();
			expect(result).toBeInstanceOf(Blob);
			if (result) {
				const text = await result.text();
				expect(text).toBe('Hello, Blob!');
			}
		});
	});

	describe('uploadMixed', () => {
		test.each([json, msgpack, openapi])('success', async ({ service }) => {
			const file = new File(['Mixed File Content'], 'hello.txt', { type: 'text/plain' });
			const blob = new Blob(['Mixed Blob Content'], { type: 'text/plain' });
			const [result, error] = await service.uploadMixed(
				'Sample Text',
				42,
				{ key: '1', version: '1', value: 'Record1' },
				['Text1', 'Text2'],
				[1, 2, 3],
				[
					{ key: '2', version: '1', value: 'Record2' },
					{ key: '3', version: '1', value: 'Record3' },
				],
				file,
				blob,
			);
			const check: UploadMixedResult = {
				text: 'Sample Text',
				number: 42,
				rec: { key: '1', version: '1', value: 'Record1' },
				textList: ['Text1', 'Text2'],
				numberList: [1, 2, 3],
				recList: [
					{ key: '2', version: '1', value: 'Record2' },
					{ key: '3', version: '1', value: 'Record3' },
				],
				dataFileContent: 'Mixed File Content',
				dataBlobContent: 'Mixed Blob Content',
			};

			expect(error).toBeNull();
			expect(result).toStrictEqual(check);
		});
	});
	describe('uploadMixedOpt', () => {
		test.each([json, msgpack, openapi])('success with all params', async ({ service }) => {
			const file = new File(['Mixed File Content'], 'hello.txt', { type: 'text/plain' });
			const blob = new Blob(['Mixed Blob Content'], { type: 'text/plain' });
			const [result, error] = await service.uploadMixedOpt(
				'Sample Text',
				42,
				{ key: '1', version: '1', value: 'Record1' },
				['Text1', 'Text2'],
				[1, 2, 3],
				[
					{ key: '2', version: '1', value: 'Record2' },
					{ key: '3', version: '1', value: 'Record3' },
				],
				file,
				blob,
			);
			expect(error).toBeNull();
			expect(result).toStrictEqual({
				text: 'Sample Text',
				number: 42,
				rec: { key: '1', version: '1', value: 'Record1' },
				textList: ['Text1', 'Text2'],
				numberList: [1, 2, 3],
				recList: [
					{ key: '2', version: '1', value: 'Record2' },
					{ key: '3', version: '1', value: 'Record3' },
				],
				dataFileContent: 'Mixed File Content',
				dataBlobContent: 'Mixed Blob Content',
			});
		});
		test.each([json, msgpack, openapi])('success with undefined params', async ({ service }) => {
			const [result, error] = await service.uploadMixedOpt(
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
			);
			expect(error).toBeNull();
			expect(result).toStrictEqual({
				text: undefined,
				number: undefined,
				rec: undefined,
				textList: undefined,
				numberList: undefined,
				recList: undefined,
				dataFileContent: undefined,
				dataBlobContent: undefined,
			});
		});
	});
	describe('uploadMixedNil', () => {
		test.each([json, msgpack, openapi])('success with all params', async ({ service }) => {
			const file = new File(['Mixed File Content'], 'hello.txt', { type: 'text/plain' });
			const blob = new Blob(['Mixed Blob Content'], { type: 'text/plain' });
			const [result, error] = await service.uploadMixedNil(
				'Sample Text',
				42,
				{ key: '1', version: '1', value: 'Record1' },
				['Text1', 'Text2'],
				[1, 2, 3],
				[
					{ key: '2', version: '1', value: 'Record2' },
					{ key: '3', version: '1', value: 'Record3' },
				],
				file,
				blob,
			);
			expect(error).toBeNull();
			expect(result).toStrictEqual({
				text: 'Sample Text',
				number: 42,
				rec: { key: '1', version: '1', value: 'Record1' },
				textList: ['Text1', 'Text2'],
				numberList: [1, 2, 3],
				recList: [
					{ key: '2', version: '1', value: 'Record2' },
					{ key: '3', version: '1', value: 'Record3' },
				],
				dataFileContent: 'Mixed File Content',
				dataBlobContent: 'Mixed Blob Content',
			});
		});
		test.each([json, msgpack /*, openapi*/])('success with null params', async ({ service }) => {
			const [result, error] = await service.uploadMixedNil(null, null, null, null, null, null, null, null);
			expect(error).toBeNull();
			expect(result).toStrictEqual({
				text: null,
				number: null,
				rec: null,
				textList: null,
				numberList: null,
				recList: null,
				dataFileContent: null,
				dataBlobContent: null,
			});
		});
	});
});
