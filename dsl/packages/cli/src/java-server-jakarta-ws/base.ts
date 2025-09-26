import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaServerJakartaWSGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { generateBaseDTOContent } from '../java-model-json/base.js';

export function generateBase(artifactConfig: JavaServerJakartaWSGeneratorConfig): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.rest.model`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);
	const node = generateBaseDTOContent(fqn);
	return {
		name: '_BaseDataImpl.java',
		content: toString(generateCompilationUnit(packageName, importCollector, node), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
