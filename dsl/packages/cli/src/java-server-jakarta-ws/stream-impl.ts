import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaServerJakartaWSGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import {
	generateBlobImpl,
	generateFileImpl,
	generateStreamBlobImpl,
	generateStreamFileImpl,
} from '../java-model-json/stream-impl.js';
import { MResolvedRSDModel } from '../model.js';
import { hasFileStream, hasStream } from '../util.js';

export function generateStreamImpls(
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	model: MResolvedRSDModel,
): Artifact[] {
	const rv: Artifact[] = [];
	if (hasStream(model)) {
		const packageName = `${artifactConfig.rootPackageName}.rest.model`;
		{
			const importCollector = new JavaImportsCollector(packageName);
			const fqn = importCollector.importType.bind(importCollector);
			rv.push({
				name: '_BlobImpl.java',
				content: toString(
					generateCompilationUnit(
						packageName,
						importCollector,
						generateBlobImpl(`${artifactConfig.rootPackageName}.service.model`, fqn),
					),
					'\t',
				),
				path: toPath(artifactConfig.targetFolder, packageName),
			});
		}

		{
			const importCollector = new JavaImportsCollector(packageName);
			const fqn = importCollector.importType.bind(importCollector);
			rv.push({
				name: '_StreamBlobImpl.java',
				content: toString(
					generateCompilationUnit(
						packageName,
						importCollector,
						generateStreamBlobImpl(`${artifactConfig.rootPackageName}.service.model`, fqn),
					),
					'\t',
				),
				path: toPath(artifactConfig.targetFolder, packageName),
			});
		}

		if (hasFileStream(model)) {
			{
				const importCollector = new JavaImportsCollector(packageName);
				const fqn = importCollector.importType.bind(importCollector);
				rv.push({
					name: '_FileImpl.java',
					content: toString(
						generateCompilationUnit(
							packageName,
							importCollector,
							generateFileImpl(`${artifactConfig.rootPackageName}.service.model`, fqn),
						),
						'\t',
					),
					path: toPath(artifactConfig.targetFolder, packageName),
				});
			}

			{
				const importCollector = new JavaImportsCollector(packageName);
				const fqn = importCollector.importType.bind(importCollector);
				rv.push({
					name: '_StreamFileImpl.java',
					content: toString(
						generateCompilationUnit(
							packageName,
							importCollector,
							generateStreamFileImpl(`${artifactConfig.rootPackageName}.service.model`, fqn),
						),
						'\t',
					),
					path: toPath(artifactConfig.targetFolder, packageName),
				});
			}
		}
	}
	return rv;
}
