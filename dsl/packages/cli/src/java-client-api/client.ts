import { CompositeGeneratorNode, toString } from 'langium/generate';

import { Artifact, ArtifactGenerationConfig } from '../artifact-generator.js';
import {
	JavaImportsCollector,
	JavaClientAPIGeneratorConfig,
	generateCompilationUnit,
	toPath,
} from '../java-gen-utils.js';
import { hasFileStream, hasStream, ident, toCamelCaseIdentifier, toFirstUpper, toNodeTree } from '../util.js';
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

	let blobContent: CompositeGeneratorNode | undefined;
	let fileContent: CompositeGeneratorNode | undefined;
	if (hasStream(model)) {
		const BlobType = fqn(`${artifactConfig.rootPackageName}.model.RSDBlob`);
		const PathType = fqn('java.nio.file.Path');
		blobContent = new CompositeGeneratorNode(`public ${BlobType} createBlob(${PathType} file, String mimeType);`);
		if (hasFileStream(model)) {
			const FileType = fqn(`${artifactConfig.rootPackageName}.model.RSDFile`);
			fileContent = new CompositeGeneratorNode(
				`public ${FileType} createFile(${PathType} file, String mimeType, String filename);`,
			);
		}
	}

	const Type = `${toFirstUpper(toCamelCaseIdentifier(generatorConfig.name))}Client`;

	const node = toNodeTree(`
public interface ${Type} {
	public static ${Type} create(${uriType} baseURL) {
		return ${slType}.load(${clFactoryType}.class).iterator().next().create(baseURL);
	}
	
	public <T extends ${baseDTOType}.BaseDataBuilder<?>> T builder(Class<T> clazz);

	public <T extends BaseService> T service(Class<T> clazz);
#${blobContent ? toString(ident(blobContent, 1), '\t') : ''}
#${fileContent ? toString(ident(fileContent, 1), '\t') : ''}
}
`);

	return {
		name: `${Type}.java`,
		content: toString(generateCompilationUnit(packageName, importCollector, node), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
