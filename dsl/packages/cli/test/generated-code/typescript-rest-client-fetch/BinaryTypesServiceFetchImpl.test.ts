import { describe, expect, test } from 'vitest';

import { createBinaryTypesService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import { Void } from '../../test-specs/gen-out/client/typescript-client/src/_result-utils.js';

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
	describe('uploadBlob', () => {
		test('success', async () => {
			const blob = new Blob(['Hello, Blob!'], { type: 'text/plain' });
			const [result, error] = await service.uploadBlob(blob);
			expect(error).toBeNull();
			expect(result).toBeGreaterThan(0);
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
				[{ key: '2', version: '1', value: 'Record2' }],
				file,
				blob,
			);
			expect(error).toBeNull();
			expect(result).toBe(Void);
		});
	});
});
