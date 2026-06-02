import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import { isMScalarType, MResolvedRSDModel } from '../model.js';
import {
	generateCompilationUnit,
	TypescriptClientAPIGeneratorConfig,
	TypescriptImportCollector,
} from '../typescript-gen-utils.js';
import { generateScalarsContent } from '../typescript-model-api/scalar.js';

export function generateScalar(model: MResolvedRSDModel, config: TypescriptClientAPIGeneratorConfig): Artifact[] {
	const scalars = model.elements.filter(isMScalarType);
	if (scalars.length === 0) {
		return [];
	}
	const collector = new TypescriptImportCollector(config, 'Scalars.ts');
	return [
		{
			name: `Scalars.ts`,
			content: toString(generateCompilationUnit(collector, generateScalarsContent(scalars)), '\t'),
			path: `${config.targetFolder}/model`,
		},
	];
}
