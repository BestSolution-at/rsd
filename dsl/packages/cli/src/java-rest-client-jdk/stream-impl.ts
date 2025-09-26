import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaServerJakartaWSGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { generateBlobImpl, generateFileImpl } from '../java-model-json/stream-impl.js';
import { MResolvedRSDModel } from '../model.js';
import { hasFileStream, hasStream } from '../util.js';

export function generateStreamImpls(
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	model: MResolvedRSDModel,
): Artifact[] {
	if (hasStream(model)) {
		const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl.model`;
		const importCollector = new JavaImportsCollector(packageName);
		const rv: Artifact[] = [
			{
				name: '_BlobImpl.java',
				content: toString(
					generateCompilationUnit(
						packageName,
						importCollector,
						generateBlobImpl(`${artifactConfig.rootPackageName}.model`),
					),
					'\t',
				),
				path: toPath(artifactConfig.targetFolder, packageName),
			},
		];
		if (hasFileStream(model)) {
			rv.push({
				name: '_FileImpl.java',
				content: toString(
					generateCompilationUnit(
						packageName,
						importCollector,
						generateFileImpl(`${artifactConfig.rootPackageName}.model`),
					),
					'\t',
				),
				path: toPath(artifactConfig.targetFolder, packageName),
			});
		}
		return rv;
	}
	return [];
}
