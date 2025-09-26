import { toString } from 'langium/generate';

import { Artifact } from '../artifact-generator.js';
import { generateCompilationUnit, JavaImportsCollector, JavaServerGeneratorConfig, toPath } from '../java-gen-utils.js';
import { generateBaseContent } from '../java-model-api/base.js';

export function generateBaseDTO(artifactConfig: JavaServerGeneratorConfig): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.service.model`;
	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	return {
		name: '_Base.java',
		content: toString(generateCompilationUnit(packageName, importCollector, generateBaseContent(fqn)), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
