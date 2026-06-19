import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaRestClientJDKGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { generateBaseUtilsContent } from '../java-client-basic/base-utils.js';
import { MResolvedRSDModel } from '../model.js';

export function generateBaseUtils(
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	model: MResolvedRSDModel,
): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);
	const node = generateBaseUtilsContent(artifactConfig, model, fqn);
	return {
		name: 'BaseUtils.java',
		content: toString(generateCompilationUnit(packageName, importCollector, node), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
