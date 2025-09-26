import { CompositeGeneratorNode, NL, toString } from 'langium/generate';

import { Artifact, ArtifactGenerationConfig } from '../artifact-generator.js';
import {
	JavaImportsCollector,
	JavaClientAPIGeneratorConfig,
	generateCompilationUnit,
	toPath,
} from '../java-gen-utils.js';
import { toCamelCaseIdentifier, toFirstUpper } from '../util.js';

export function generateFactory(
	generatorConfig: ArtifactGenerationConfig,
	artifactConfig: JavaClientAPIGeneratorConfig,
): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.spi`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	const content = new CompositeGeneratorNode();
	content.append(`public interface ${toFirstUpper(toCamelCaseIdentifier(generatorConfig.name))}ClientFactory {`, NL);
	content.indent(child => {
		const clientType = fqn(
			`${artifactConfig.rootPackageName}.${toFirstUpper(toCamelCaseIdentifier(generatorConfig.name))}Client`,
		);
		const uriType = fqn('java.net.URI');

		child.append(`public ${clientType} create(${uriType} uri);`, NL);
	});
	content.append('}', NL);

	return {
		name: `${toFirstUpper(toCamelCaseIdentifier(generatorConfig.name))}ClientFactory.java`,
		content: toString(generateCompilationUnit(packageName, importCollector, content), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
