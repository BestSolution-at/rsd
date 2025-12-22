import { describe, expect, test } from 'vitest';

import { createBinaryTypesService } from '../../test-specs/gen-out/client/typescript-client/src/index.js';

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
});
