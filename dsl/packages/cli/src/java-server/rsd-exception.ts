import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import { generateCompilationUnit, JavaServerGeneratorConfig, JavaImportsCollector, toPath } from '../java-gen-utils.js';
import { MError } from '../model.js';

export function generateRSDException(
	errors: readonly MError[],
	artifactConfig: JavaServerGeneratorConfig,
	packageName: string,
): Artifact[] {
	const importCollector = new JavaImportsCollector(packageName);
	return [
		{
			name: 'RSDException.java',
			content: toString(
				generateCompilationUnit(packageName, importCollector, generateRSDExceptionContent(errors)),
				'\t',
			),
			path: toPath(artifactConfig.targetFolder, packageName),
		},
	];
}

function generateRSDExceptionTypeContent(errors: readonly MError[]) {
	const node = new CompositeGeneratorNode();
	node.append('public enum Type {', NL);
	node.indent(classBody => {
		classBody.append('_Native,', NL);
		if (errors.length > 0) {
			classBody.append('_UnknownResponse,', NL);
		} else {
			classBody.append('_UnknownResponse;', NL);
		}
		errors.forEach((e, idx, arr) => {
			classBody.append(e.name, idx + 1 < arr.length ? ',' : ';', NL);
		});
	});
	node.append('}', NL, NL);
	return node;
}

function generateRSDExceptionContent(errors: readonly MError[]) {
	const node = new CompositeGeneratorNode();
	node.append(`public class RSDException extends RuntimeException {`, NL);
	node.indent(classBody => {
		classBody.append(generateRSDExceptionTypeContent(errors));
		classBody.append('public final Type type;', NL, NL);
		classBody.append('public RSDException(Type type, String message) {', NL);
		classBody.indent(methodBody => {
			methodBody.append('super(message);', NL);
			methodBody.append('this.type = type;', NL);
		});
		classBody.append('}', NL, NL);
		classBody.append('public RSDException(Type type, String message, Throwable cause) {', NL);
		classBody.indent(methodBody => {
			methodBody.append('super(message, cause);', NL);
			methodBody.append('this.type = type;', NL);
		});
		classBody.append('}', NL);

		classBody.append('public static abstract class RSDStructuredDataException extends RSDException {', NL);
		classBody.indent(innerClassBody => {
			innerClassBody.append(`public RSDStructuredDataException(Type type, String message) {`, NL);
			innerClassBody.indent(methodBody => {
				methodBody.append('super(type, message);', NL);
			});
			innerClassBody.append('}', NL);
			innerClassBody.append('public abstract Object data();', NL);
		});
		classBody.append('}', NL);
	});
	node.append('}', NL);
	return node;
}
