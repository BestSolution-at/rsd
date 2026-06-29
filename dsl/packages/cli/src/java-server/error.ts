import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaServerGeneratorConfig,
	toAPIType,
	toPath,
} from '../java-gen-utils.js';
import { MResolvedError } from '../model.js';

export function generateError(
	t: MResolvedError,
	artifactConfig: JavaServerGeneratorConfig,
	packageName: string,
): Artifact {
	const importCollector = new JavaImportsCollector(packageName);

	return {
		name: `${t.name}Exception.java`,
		content: toString(
			generateCompilationUnit(
				packageName,
				importCollector,
				generateSource(t, artifactConfig, importCollector.importType.bind(importCollector)),
			),
			'\t',
		),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}

function generateSource(
	t: MResolvedError,
	artifactConfig: JavaServerGeneratorConfig,
	fqn: (type: string) => string,
): CompositeGeneratorNode {
	const node = new CompositeGeneratorNode();

	if (t.resolvedContentType) {
		const type = toAPIType(
			t.resolvedContentType,
			artifactConfig.nativeTypeSubstitutes,
			artifactConfig.rootPackageName + '.model',
			fqn,
		);
		const objectType = toAPIType(
			t.resolvedContentType,
			artifactConfig.nativeTypeSubstitutes,
			artifactConfig.rootPackageName + '.model',
			fqn,
			{ objectType: true },
		);
		node.append(`public class ${t.name}Exception extends RSDException.RSDStructuredDataException {`, NL);
		node.indent(body => {
			body.append(`private final ${type} data;`, NL, NL);
			body.append(`public ${t.name}Exception(String message, ${type} data) {`, NL);
			body.indent(method => {
				method.append(`super(Type.${t.name}, message);`, NL);
				method.append(`this.data = data;`, NL);
			});
			body.append('}', NL);
			body.append(`public ${objectType} data() {`, NL);
			body.indent(method => {
				method.append(`return this.data;`, NL);
			});
			body.append('}', NL);
		});
		node.append('}', NL);
	} else {
		node.append(`public class ${t.name}Exception extends RSDException {`, NL);
		node.indent(body => {
			body.append(`public ${t.name}Exception(String message) {`, NL);
			body.indent(method => {
				method.append(`super(Type.${t.name}, message);`, NL);
			});
			body.append('}', NL);
		});
		node.append('}', NL);
	}

	return node;
}
