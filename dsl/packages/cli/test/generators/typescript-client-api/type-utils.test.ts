import { expect, test } from 'vitest';
import { generateTypeUtils } from '../../../src/typescript-client-api/type-utils.js';
import { loadTestSpecFile } from '../test-utils.js';

test('file - name and path', () => {
	const result = generateTypeUtils({
		name: 'typescript-client-api',
		targetFolder: './gen-out/client/typescript-client/src',
	});
	expect(result.name).toBe('_type-utils.ts');
	expect(result.path).toBe('./gen-out/client/typescript-client/src');
});
test('file - content', () => {
	const result = generateTypeUtils({
		name: 'typescript-client-api',
		targetFolder: './gen-out/client/typescript-client/src',
	});
	expect(result.content).toBe(loadTestSpecFile('client/typescript-client/src/_type-utils.ts.sample'));
});
