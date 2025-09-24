import globals from 'globals';

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		ignores: [
			'node_modules',
			'dist',
			'coverage',
			'.mvn',
			'.angular',
			'.vscode',
			'packages/cli/out',
			'packages/extension/out',
			'packages/extension/syntaxes',
			'packages/language/out',
			'packages/language/syntaxes',
			'',
		],
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: 'warn',
		},
	},
	{
		files: ['**/*.ts'],
		extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],

		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'@typescript-eslint/consistent-type-definitions': 'off',
		},
	},
);
