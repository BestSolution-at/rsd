import { toString } from 'langium/generate';

import { Artifact, ArtifactGenerationConfig } from '../artifact-generator.js';
import {
	JavaImportsCollector,
	JavaClientAPIGeneratorConfig,
	generateCompilationUnit,
	toPath,
} from '../java-gen-utils.js';
import { toCamelCaseIdentifier, toFirstUpper, toNodeTree } from '../util.js';

export function generateFactory(
	generatorConfig: ArtifactGenerationConfig,
	artifactConfig: JavaClientAPIGeneratorConfig,
): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.spi`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	const Type = `${toFirstUpper(toCamelCaseIdentifier(generatorConfig.name))}ClientFactory`;
	const ClientType = fqn(
		`${artifactConfig.rootPackageName}.${toFirstUpper(toCamelCaseIdentifier(generatorConfig.name))}Client`,
	);
	const UriType = fqn('java.net.URI');

	const node = toNodeTree(`
public interface ${Type} {
	public ${ClientType} create(${UriType} uri);
}
`);

	return {
		name: `${Type}.java`,
		content: toString(generateCompilationUnit(packageName, importCollector, node), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
