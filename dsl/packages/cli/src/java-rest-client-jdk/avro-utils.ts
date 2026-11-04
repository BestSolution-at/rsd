import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaRestClientJDKGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { generateAvroUtilsContent } from '../java-model-avro/avro-utils.js';

export function generateAvroUtils(artifactConfig: JavaRestClientJDKGeneratorConfig): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.model.impl.avro`;

	const importCollector = new JavaImportsCollector(packageName);
	const node = generateAvroUtilsContent(`${artifactConfig.rootPackageName}.model`);

	return {
		name: '_AvroUtils.java',
		content: toString(generateCompilationUnit(packageName, importCollector, node), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
