import { CompositeGeneratorNode, NL, toString } from 'langium/generate';

import { Artifact, ArtifactGenerationConfig } from '../artifact-generator.js';
import {
	JavaImportsCollector,
	JavaClientAPIGeneratorConfig,
	generateCompilationUnit,
	toPath,
} from '../java-gen-utils.js';
import { hasFileStream, hasStream, toCamelCaseIdentifier, toFirstUpper } from '../util.js';
import { MResolvedRSDModel } from '../model.js';

export function generateClient(
	generatorConfig: ArtifactGenerationConfig,
	artifactConfig: JavaClientAPIGeneratorConfig,
	model: MResolvedRSDModel,
): Artifact {
	const packageName = artifactConfig.rootPackageName;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	const uriType = fqn('java.net.URI');
	const slType = fqn('java.util.ServiceLoader');
	const clFactoryType = fqn(
		`${artifactConfig.rootPackageName}.spi.${toFirstUpper(toCamelCaseIdentifier(generatorConfig.name))}ClientFactory`,
	);
	const baseDTOType = fqn(`${artifactConfig.rootPackageName}.model._Base`);

	const content = new CompositeGeneratorNode();

	content.append(`public interface ${toFirstUpper(toCamelCaseIdentifier(generatorConfig.name))}Client {`, NL);
	content.indent(client => {
		client.append(
			`public static ${toFirstUpper(toCamelCaseIdentifier(generatorConfig.name))}Client create(${uriType} baseURL) {`,
			NL,
		);
		client.indent(body => {
			body.append(`return ${slType}.load(${clFactoryType}.class).iterator().next().create(baseURL);`, NL);
		});
		client.append('}', NL, NL);
		client.append(`public <T extends ${baseDTOType}.BaseDataBuilder<?>> T builder(Class<T> clazz);`, NL, NL);
		client.append('public <T extends BaseService> T service(Class<T> clazz);', NL);
		if (hasStream(model)) {
			client.appendNewLine();
			client.append(
				`public ${fqn(
					`${artifactConfig.rootPackageName}.model.RSDBlob`,
				)} creatBlob(${fqn('java.nio.file.Path')} file, String mimeType);`,
				NL,
			);
			if (hasFileStream(model)) {
				client.appendNewLine();
				client.append(
					`public ${fqn(`${artifactConfig.rootPackageName}.model.RSDFile`)} creatFile(${fqn(
						'java.nio.file.Path',
					)} file, String mimeType, String filename);`,
					NL,
				);
			}
		}
	});

	content.append('}', NL);

	return {
		name: `${toFirstUpper(toCamelCaseIdentifier(generatorConfig.name))}Client.java`,
		content: toString(generateCompilationUnit(packageName, importCollector, content), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
