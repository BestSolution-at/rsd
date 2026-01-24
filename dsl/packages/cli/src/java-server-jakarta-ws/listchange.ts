import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaServerJakartaWSGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { generateChangeSupportContent } from '../java-model-json/listchange-impl.js';

export function generateChangeSupport(artifactConfig: JavaServerJakartaWSGeneratorConfig): Artifact[] {
	const packageName = `${artifactConfig.rootPackageName}.rest.model`;
	const rv: Artifact[] = [];

	{
		const importCollector = new JavaImportsCollector(packageName);

		rv.push({
			name: `_ChangeSupport.java`,
			content: toString(
				generateCompilationUnit(
					packageName,
					importCollector,
					generateChangeSupportContent(`${artifactConfig.rootPackageName}.service.model`),
				),
				'\t',
			),
			path: toPath(artifactConfig.targetFolder, packageName),
		});
	}

	return rv;
}
