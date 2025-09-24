import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaClientAPIGeneratorConfig,
  JavaImportsCollector,
  toPath,
} from '../java-gen-utils.js';
import { MError } from '../model.js';

export function generateRSDException(
  errors: readonly MError[],
  artifactConfig: JavaClientAPIGeneratorConfig,
  packageName: string
): Artifact[] {
  if (errors.length === 0) {
    return [];
  }
  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);
  return [
    {
      name: 'RSDException.java',
      content: toString(
        generateCompilationUnit(
          packageName,
          importCollector,
          generateRSDExceptionContent(errors, packageName, fqn)
        ),
        '\t'
      ),
      path: toPath(artifactConfig.targetFolder, packageName),
    },
  ];
}

function generateRSDExceptionTypeContent(errors: readonly MError[]) {
  const node = new CompositeGeneratorNode();
  node.append('public enum Type {', NL);
  node.indent((classBody) => {
    errors.forEach((e, idx, arr) => {
      classBody.append(e.name, idx + 1 < arr.length ? ',' : ';', NL);
    });
  });
  node.append('}', NL, NL);
  return node;
}

function generateRSDExceptionContent(
  errors: readonly MError[],
  packageName: string,
  fqn: (type: string) => string
) {
  const _Base = fqn(`${packageName}.model._Base`);
  const node = new CompositeGeneratorNode();
  node.append(`public class RSDException extends RuntimeException {`, NL);
  node.indent((classBody) => {
    classBody.append(generateRSDExceptionTypeContent(errors));
    classBody.append('public final Type type;', NL, NL);
    classBody.append('RSDException(Type type, String message) {', NL);
    classBody.indent((methodBody) => {
      methodBody.append('super(message);', NL);
      methodBody.append('this.type = type;', NL);
    });
    classBody.append('}', NL, NL);
    classBody.append(
      'public static class RSDStructuredDataException extends RSDException {',
      NL
    );
    classBody.indent((innerClassBody) => {
      innerClassBody.append(`public final ${_Base}.BaseData data;`, NL, NL);
      innerClassBody.append(
        `public RSDStructuredDataException(Type type, String message, ${_Base}.BaseData data) {`,
        NL
      );
      innerClassBody.indent((methodBody) => {
        methodBody.append('super(type, message);', NL);
        methodBody.append('this.data = data;', NL);
      });
      innerClassBody.append('}', NL);
    });
    classBody.append('}', NL);
  });
  node.append('}', NL);
  return node;
}
