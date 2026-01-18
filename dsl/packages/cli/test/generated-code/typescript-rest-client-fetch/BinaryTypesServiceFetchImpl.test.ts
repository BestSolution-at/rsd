import { describe, expect, test } from 'vitest';

import { createBinaryTypesService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import { UploadMixedResult } from '../../test-specs/gen-out/client/typescript-client/src/model/UploadMixedResult.js';

const service = createBinaryTypesService({
	baseUrl: 'http://localhost:3000',
});

describe('BinaryTypesServiceFetchImpl', () => {
	describe('uploadFile', () => {
		test('success', async () => {
			const file = new File(['Hello, World!'], 'hello.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFile(file);
			expect(error).toBeNull();
			expect(result).toBe(13);
		});
	});
	describe('uploadFileOpt', () => {
		test('success with file', async () => {
			const file = new File(['Hello, World!'], 'hello.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFileOpt(file);
			expect(error).toBeNull();
			expect(result).toBe(13);
		});
		test('success with undefined', async () => {
			const [result, error] = await service.uploadFileOpt(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});
	describe('uploadFileNil', () => {
		test('success with file', async () => {
			const file = new File(['Hello, World!'], 'hello.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFileNil(file);
			expect(error).toBeNull();
			expect(result).toBe(13);
		});
		test('success with null', async () => {
			const [result, error] = await service.uploadFileNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
	});
	describe('uploadFileOptNil', () => {
		test('success with file', async () => {
			const file = new File(['Hello, World!'], 'hello.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFileOptNil(file);
			expect(error).toBeNull();
			expect(result).toBe(13);
		});
		test('success with null', async () => {
			const [result, error] = await service.uploadFileOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
		test('success with undefined', async () => {
			const [result, error] = await service.uploadFileOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});

	describe('uploadBlob', () => {
		test('success', async () => {
			const blob = new Blob(['Hello, Blob!'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlob(blob);
			expect(error).toBeNull();
			expect(result).toBe(12);
		});
	});
	describe('uploadBlobOpt', () => {
		test('success with blob', async () => {
			const blob = new Blob(['Hello, Blob!'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlobOpt(blob);
			expect(error).toBeNull();
			expect(result).toBe(12);
		});
		test('success with undefined', async () => {
			const [result, error] = await service.uploadBlobOpt(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});
	describe('uploadBlobNil', () => {
		test('success with blob', async () => {
			const blob = new Blob(['Hello, Blob!'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlobNil(blob);
			expect(error).toBeNull();
			expect(result).toBe(12);
		});
		test('success with null', async () => {
			const [result, error] = await service.uploadBlobNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
	});
	describe('uploadBlobOptNil', () => {
		test('success with blob', async () => {
			const blob = new Blob(['Hello, Blob!'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlobOptNil(blob);
			expect(error).toBeNull();
			expect(result).toBe(12);
		});
		test('success with null', async () => {
			const [result, error] = await service.uploadBlobOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
		test('success with undefined', async () => {
			const [result, error] = await service.uploadBlobOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});

	describe('uploadFileList', () => {
		test('success', async () => {
			const file1 = new File(['File One'], 'file1.txt', { type: 'text/plain' });
			const file2 = new File(['File Two'], 'file2.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFileList([file1, file2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
	});
	describe('uploadFileListOpt', () => {
		test('success with list', async () => {
			const file1 = new File(['File One'], 'file1.txt', { type: 'text/plain' });
			const file2 = new File(['File Two'], 'file2.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFileListOpt([file1, file2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
		test('success with undefined', async () => {
			const [result, error] = await service.uploadFileListOpt(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});
	describe('uploadFileListNil', () => {
		test('success with list', async () => {
			const file1 = new File(['File One'], 'file1.txt', { type: 'text/plain' });
			const file2 = new File(['File Two'], 'file2.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFileListNil([file1, file2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
		test('success with null', async () => {
			const [result, error] = await service.uploadFileListNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
	});
	describe('uploadFileListOptNil', () => {
		test('success with list', async () => {
			const file1 = new File(['File One'], 'file1.txt', { type: 'text/plain' });
			const file2 = new File(['File Two'], 'file2.txt', { type: 'text/plain' });
			const [result, error] = await service.uploadFileListOptNil([file1, file2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
		test('success with null', async () => {
			const [result, error] = await service.uploadFileListOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
		test('success with undefined', async () => {
			const [result, error] = await service.uploadFileListOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});

	describe('uploadBlobList', () => {
		test('success', async () => {
			const blob1 = new Blob(['Blob One'], { type: 'text/plain' });
			const blob2 = new Blob(['Blob Two'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlobList([blob1, blob2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
	});
	describe('uploadBlobListOpt', () => {
		test('success with list', async () => {
			const blob1 = new Blob(['Blob One'], { type: 'text/plain' });
			const blob2 = new Blob(['Blob Two'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlobListOpt([blob1, blob2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
		test('success with undefined', async () => {
			const [result, error] = await service.uploadBlobListOpt(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});
	describe('uploadBlobListNil', () => {
		test('success with list', async () => {
			const blob1 = new Blob(['Blob One'], { type: 'text/plain' });
			const blob2 = new Blob(['Blob Two'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlobListNil([blob1, blob2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
		test('success with null', async () => {
			const [result, error] = await service.uploadBlobListNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
	});
	describe('uploadBlobListOptNil', () => {
		test('success with list', async () => {
			const blob1 = new Blob(['Blob One'], { type: 'text/plain' });
			const blob2 = new Blob(['Blob Two'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlobListOptNil([blob1, blob2]);
			expect(error).toBeNull();
			expect(result).toBe(16);
		});
		test('success with null', async () => {
			const [result, error] = await service.uploadBlobListOptNil(null);
			expect(error).toBeNull();
			expect(result).toBe(-1);
		});
		test('success with undefined', async () => {
			const [result, error] = await service.uploadBlobListOptNil(undefined);
			expect(error).toBeNull();
			expect(result).toBe(0);
		});
	});

	describe('downloadFile', () => {
		test('success', async () => {
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
		test('success', async () => {
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
		test('success', async () => {
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
		test('success with all params', async () => {
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
		test('success with undefined params', async () => {
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
		test('success with all params', async () => {
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
		test('success with null params', async () => {
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
