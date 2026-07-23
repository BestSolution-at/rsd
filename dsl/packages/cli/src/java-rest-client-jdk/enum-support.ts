import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaRestClientJDKGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { generateEnumSupportContent } from '../java-model-json/enum-support.js';
import { MResolvedEnumType } from '../model.js';

export function generateEnumSupport(
	enums: readonly MResolvedEnumType[],
	artifactConfig: JavaRestClientJDKGeneratorConfig,
): Artifact[] {
	if (enums.length === 0) {
		return [];
	}

	const packageName = `${artifactConfig.rootPackageName}.model.impl.json`;
	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	return [
		{
			name: '_EnumSupport.java',
			content: toString(
				generateCompilationUnit(
					packageName,
					importCollector,
					generateEnumSupportContent(
						enums,
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
