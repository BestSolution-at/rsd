import { CompositeGeneratorNode, NL, toString } from 'langium/generate';

import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaClientAPIGeneratorConfig,
	JavaImportsCollector,
	toPath,
} from '../java-gen-utils.js';
import { MResolvedRSDModel } from '../model.js';
import { hasFileStream, hasStream } from '../util.js';

export function generateDTOBuilderFactory(
	artifactConfig: JavaClientAPIGeneratorConfig,
	model: MResolvedRSDModel,
): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.service`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	return {
		name: 'BuilderFactory.java',
		content: toString(
			generateCompilationUnit(packageName, importCollector, generateDTOBuilderFactoryContent(model, packageName, fqn)),
			'\t',
		),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}

function generateDTOBuilderFactoryContent(
	model: MResolvedRSDModel,
	packageName: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append('public interface BuilderFactory {', NL);
	node.indent(classBody => {
		const Base = fqn(`${packageName}.model._Base`);
		classBody.append(`public <T extends ${Base}.BaseDataBuilder<?>> T builder(Class<T> type);`, NL);
		if (hasStream(model)) {
			classBody.appendNewLine();
			classBody.append(
				`public ${fqn(`${packageName}.model.RSDBlob`)} createBlob(${fqn('java.nio.file.Path')} file, String mimeType);`,
				NL,
			);
			classBody.append(
				`public ${fqn(`${packageName}.model.RSDBlob`)} createBlob(${fqn('java.io.InputStream')} stream, String mimeType);`,
				NL,
			);
			if (hasFileStream(model)) {
				classBody.appendNewLine();
				classBody.append(
					`public ${fqn(`${packageName}.model.RSDFile`)} createFile(${fqn(
						'java.nio.file.Path',
					)} file, String mimeType, String filename);`,
					NL,
				);
				classBody.appendNewLine();
				classBody.append(
					`public ${fqn(`${packageName}.model.RSDFile`)} createFile(${fqn(
						'java.io.InputStream',
					)} data, String mimeType, String filename);`,
					NL,
				);
			}
		}
	});
	node.append('}', NL);

	return node;
}
