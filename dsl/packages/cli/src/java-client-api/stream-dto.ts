import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import { generateCompilationUnit, JavaImportsCollector, JavaServerGeneratorConfig, toPath } from '../java-gen-utils.js';
import { MResolvedRSDModel } from '../model.js';
import { generateBlob, generateFile } from '../java-model-api/stream-dto.js';
import { hasFileStream, hasStream } from '../util.js';

export function generateStreamDTO(artifactConfig: JavaServerGeneratorConfig, model: MResolvedRSDModel): Artifact[] {
	const artifacts: Artifact[] = [];

	if (hasStream(model)) {
		const packageName = `${artifactConfig.rootPackageName}.model`;

		{
			const importCollector = new JavaImportsCollector(packageName);
			const fqn = importCollector.importType.bind(importCollector);

			artifacts.push({
				name: 'RSDBlob.java',
				content: toString(generateCompilationUnit(packageName, importCollector, generateBlob(fqn)), '\t'),
				path: toPath(artifactConfig.targetFolder, packageName),
			});
		}

		if (hasFileStream(model)) {
			const importCollector = new JavaImportsCollector(packageName);
			artifacts.push({
				name: 'RSDFile.java',
				content: toString(generateCompilationUnit(packageName, importCollector, generateFile()), '\t'),
				path: toPath(artifactConfig.targetFolder, packageName),
			});
		}
	}

	return artifacts;
}
