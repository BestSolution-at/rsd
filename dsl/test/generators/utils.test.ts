import { expect, test } from 'vitest';
import { toNodeTree } from '../../src/cli/util.js';
import { toString } from 'langium/generate';

test('toNodeTree', () => {
	const x = toNodeTree(`
		Test {
			foo(
					String x
					int y) {
				// FOO

			}
		}`);
	expect(toString(x, '__')).toBe(
		`
Test {
__foo(
______String x
______int y) {
____// FOO

__}
}
		`.trim()
	);
});
