import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	TypescriptClientAPIGeneratorConfig,
	TypescriptImportCollector,
} from '../typescript-gen-utils.js';
import { generateBuiltinContent } from '../typescript-model-api/builtin.js';

export function generateBuiltin(config: TypescriptClientAPIGeneratorConfig): Artifact[] {
	const collector = new TypescriptImportCollector(config, '_Builtins.ts');
	return [
		{
			name: `_Builtins.ts`,
			content: toString(generateCompilationUnit(collector, generateBuiltinContent()), '\t'),
			path: `${config.targetFolder}/model`,
		},
	];
}
