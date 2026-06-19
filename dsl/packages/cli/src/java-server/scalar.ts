import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import { JavaImportsCollector, generateCompilationUnit, toPath, JavaServerGeneratorConfig } from '../java-gen-utils.js';
import { MScalarType } from '../model.js';
import { generateScalarContent } from '../java-model-api/scalar.js';

export function generateScalar(t: MScalarType, artifactConfig: JavaServerGeneratorConfig): Artifact | undefined {
	if (artifactConfig.nativeTypeSubstitues && t.name in artifactConfig.nativeTypeSubstitues) {
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
