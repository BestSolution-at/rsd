import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaServerJakartaWSGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { generateNillableContent } from '../java-model-json/nillable-impl.js';

export function generateNillable(artifactConfig: JavaServerJakartaWSGeneratorConfig): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.rest.model`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	const node = generateNillableContent(fqn, `${artifactConfig.rootPackageName}.service.model`);
	return {
		name: '_NillableImpl.java',
		content: toString(generateCompilationUnit(packageName, importCollector, node), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
