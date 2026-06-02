import { describe, expect, test } from 'vitest';
import {
	decodeAsciiString,
	encodeAsciiString,
} from '../../test-specs/gen-out/client/typescript-client/src/services/_fetch-type-utils.js';

describe('fetch-type-utils', () => {
	test('encodeAsciiString', () => {
		expect(encodeAsciiString('Hello World!')).toBe('Hello World!');
		expect(encodeAsciiString(' Hello World! ')).toBe('\\u0020Hello World!\\u0020');
		expect(encodeAsciiString('  Hello World!  ')).toBe('\\u0020\\u0020Hello World!\\u0020\\u0020');
		expect(encodeAsciiString('   Hello World!   ')).toBe('\\u0020\\u0020\\u0020Hello World!\\u0020\\u0020\\u0020');
		expect(encodeAsciiString('Hello+World!')).toBe('Hello+World!');
		expect(encodeAsciiString('Hello/World!')).toBe('Hello/World!');
		expect(encodeAsciiString('Hello\nWorld!')).toBe('Hello\\u000aWorld!');
		expect(encodeAsciiString('a Ā 𐀀 文 🦄')).toBe('a \\u0100 \\ud800\\udc00 \\u6587 \\ud83e\\udd84');
		expect(encodeAsciiString('\\u FooBar')).toBe('\\u005Cu FooBar');
	});
	test('decodeAsciiString', () => {
		expect(decodeAsciiString('Hello\\u0020World!')).toBe('Hello World!');
		expect(decodeAsciiString('Hello+World!')).toBe('Hello+World!');
		expect(decodeAsciiString('Hello/World!')).toBe('Hello/World!');
		expect(decodeAsciiString('a \\u0100 \\ud800\\udc00 \\u6587 \\ud83e\\udd84')).toBe('a Ā 𐀀 文 🦄');
		expect(decodeAsciiString('\\u005Cu FooBar')).toBe('\\u FooBar');
	});
});
