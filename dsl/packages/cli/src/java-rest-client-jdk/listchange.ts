import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaRestClientJDKGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { generateChangeSupportContent } from '../java-model-json/listchange-impl.js';

export function generateChangeSupport(artifactConfig: JavaRestClientJDKGeneratorConfig): Artifact[] {
	const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl.model`;
	const rv: Artifact[] = [];

	{
		const importCollector = new JavaImportsCollector(packageName);

		rv.push({
			name: `_ChangeSupport.java`,
			content: toString(
				generateCompilationUnit(
					packageName,
					importCollector,
					generateChangeSupportContent(`${artifactConfig.rootPackageName}.model`),
				),
				'\t',
			),
			path: toPath(artifactConfig.targetFolder, packageName),
		});
	}

	return rv;
}
