import { describe, expect, test } from 'vitest';
import {
	decodeAsciiString,
	encodeAsciiString,
} from '../../test-specs/gen-out/client/typescript-client/src/services/_fetch-type-utils.js';

describe('fetch-type-utils', () => {
	test('encodeAsciiString', () => {
		expect(encodeAsciiString('Hello World!')).toBe('Hello World!');
		expect(encodeAsciiString('Hello+World!')).toBe('Hello+World!');
		expect(encodeAsciiString('Hello/World!')).toBe('Hello/World!');
		expect(encodeAsciiString('a Ā 𐀀 文 🦄')).toBe('a \\u0100 \\ud800\\udc00 \\u6587 \\ud83e\\udd84');
	});
	test('decodeAsciiString', () => {
		expect(decodeAsciiString('Hello World!')).toBe('Hello World!');
		expect(decodeAsciiString('Hello+World!')).toBe('Hello+World!');
		expect(decodeAsciiString('Hello/World!')).toBe('Hello/World!');
		expect(decodeAsciiString('a \\u0100 \\ud800\\udc00 \\u6587 \\ud83e\\udd84')).toBe('a Ā 𐀀 文 🦄');
	});
});
