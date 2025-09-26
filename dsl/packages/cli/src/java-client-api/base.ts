import { toString } from 'langium/generate';

import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaClientAPIGeneratorConfig,
	JavaImportsCollector,
	toPath,
} from '../java-gen-utils.js';

import { generateBaseContent } from '../java-model-api/base.js';

export function generateBase(artifactConfig: JavaClientAPIGeneratorConfig): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.model`;
	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);
	return {
		name: '_Base.java',
		content: toString(generateCompilationUnit(packageName, importCollector, generateBaseContent(fqn)), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
