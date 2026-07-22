import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	JavaImportsCollector,
	JavaClientAPIGeneratorConfig,
	generateCompilationUnit,
	toPath,
} from '../java-gen-utils.js';
import { MScalarType } from '../model.js';
import { generateScalarContent } from '../java-model-api/scalar.js';

export function generateScalar(t: MScalarType, artifactConfig: JavaClientAPIGeneratorConfig): Artifact | undefined {
	if (artifactConfig.nativeTypeSubstitutes && t.name in artifactConfig.nativeTypeSubstitutes) {
		return undefined;
	}

	const packageName = `${artifactConfig.rootPackageName}.model`;

	const importCollector = new JavaImportsCollector(packageName);

	return {
		name: `${t.name}.java`,
		content: toString(generateCompilationUnit(packageName, importCollector, generateScalarContent(t)), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
