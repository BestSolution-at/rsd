import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	JavaImportsCollector,
	JavaClientAPIGeneratorConfig,
	generateCompilationUnit,
	toPath,
} from '../java-gen-utils.js';
import { MResolvedRecordType } from '../model.js';
import { generateRecordContent } from '../java-model-api/record.js';

export function generateRecord(
	t: MResolvedRecordType,
	artifactConfig: JavaClientAPIGeneratorConfig,
): Artifact | undefined {
	const packageName = `${artifactConfig.rootPackageName}.model`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	return {
		name: `${t.name}.java`,
		content: toString(
			generateCompilationUnit(
				packageName,
				importCollector,
				generateRecordContent(t, artifactConfig.nativeTypeSubstitues, packageName, fqn),
			),
			'\t',
		),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
