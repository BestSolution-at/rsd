import { describe, expect, test } from 'vitest';
import { toString } from 'langium/generate';
import { toNodeTree } from '../src/util.js';

test('toNodeTree - simple', () => {
	const result = toNodeTree(`
public class Test {
	public void test() {
	}
}`);
	expect(toString(result, '__')).toBe(`public class Test {
__public void test() {
__}
}`);
});

test('toNodeTree - with empty lines', () => {
	const result = toNodeTree(`
public class Test {

	public void test() {

	}
}`);
	expect(toString(result, '__')).toBe(`public class Test {

__public void test() {

__}
}`);
});

test('toNodeTree - with indentation', () => {
	const result = toNodeTree(`
	public class Test {
		public void test() {
		}
	}`);
	expect(toString(result, '__')).toBe(`public class Test {
__public void test() {
__}
}`);
});

describe('toNodeTree - with mixed indentation', () => {
	test('toNodeTree - with mixed indentation', () => {
		const result = toNodeTree(`

return a
	.b();`);
		expect(toString(result, '__')).toBe(`
return a
__.b();`);
	});

	test('toNodeTree - with mixed indentation', () => {
		const result = toNodeTree(`

return a
		.b();`);
		expect(toString(result, '__')).toBe(`
return a
____.b();`);
	});
});
