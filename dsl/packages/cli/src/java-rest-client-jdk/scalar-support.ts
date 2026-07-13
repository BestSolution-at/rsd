import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaRestClientJDKGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { generateScalarSupportContent } from '../java-model-json/scalar-support.js';
import { MResolvedScalarType } from '../model.js';

export function generateScalarSupport(
	scalars: readonly MResolvedScalarType[],
	artifactConfig: JavaRestClientJDKGeneratorConfig,
): Artifact[] {
	if (scalars.length === 0) {
		return [];
	}

	const packageName = `${artifactConfig.rootPackageName}.model.impl.json`;
	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	return [
		{
			name: '_ScalarSupport.java',
			content: toString(
				generateCompilationUnit(
					packageName,
					importCollector,
					generateScalarSupportContent(
						scalars,
						artifactConfig.nativeTypeSubstitutes,
						`${artifactConfig.rootPackageName}.model`,
						fqn,
					),
				),
				'\t',
			),
			path: toPath(artifactConfig.targetFolder, packageName),
		},
	];
}
