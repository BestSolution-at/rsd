import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaClientAPIGeneratorConfig,
	JavaImportsCollector,
	toPath,
} from '../java-gen-utils.js';
import { MResolvedMixinType } from '../model.js';
import { generateMixinContent } from '../java-model-api/mixin.js';

export function generateMixin(
	t: MResolvedMixinType,
	artifactConfig: JavaClientAPIGeneratorConfig,
): Artifact | undefined {
	const basePackageName = `${artifactConfig.rootPackageName}.model`;
	const packageName = `${basePackageName}.mixins`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	return {
		name: `${t.name}Mixin.java`,
		content: toString(
			generateCompilationUnit(
				packageName,
				importCollector,
				generateMixinContent(t, artifactConfig.nativeTypeSubstitues, basePackageName, fqn),
			),
			'\t',
		),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
