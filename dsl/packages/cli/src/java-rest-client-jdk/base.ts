import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaRestClientJDKGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { generateBaseDTOContent } from '../java-model-json/base.js';

export function generateBase(artifactConfig: JavaRestClientJDKGeneratorConfig): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl.model`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);
	const node = generateBaseDTOContent(fqn);
	return {
		name: '_BaseDataImpl.java',
		content: toString(generateCompilationUnit(packageName, importCollector, node), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
