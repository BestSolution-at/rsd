import { CompositeGeneratorNode, NL, toString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import {
  generateCompilationUnit,
  JavaClientAPIGeneratorConfig,
  JavaImportsCollector,
  toPath,
} from "../java-gen-utils.js";
import { MError } from "../model.js";

export function generateError(
  t: MError,
  artifactConfig: JavaClientAPIGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  return {
    name: `${t.name}Exception.java`,
    content: toString(
      generateCompilationUnit(
        packageName,
        importCollector,
        generateSource(t, artifactConfig, fqn)
      )
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

function generateSource(
  t: MError,
  artifactConfig: JavaClientAPIGeneratorConfig,
  fqn: (type: string) => string
): CompositeGeneratorNode {
  const node = new CompositeGeneratorNode();

  node.append(`public class ${t.name}Exception extends RuntimeException {`, NL);
  node.indent((body) => {
    body.append(`public ${t.name}Exception(String message, Throwable t) {`, NL);
    body.indent((method) => {
      method.append("super(message, t);", NL);
    });
    body.append("}", NL);
  });
  node.append("}", NL);

  return node;
}
