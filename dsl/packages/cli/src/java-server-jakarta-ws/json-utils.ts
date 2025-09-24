import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaServerJakartaWSGeneratorConfig,
  toPath,
} from '../java-gen-utils.js';
import { generateJsonUtilsContent } from '../java-model-json/json-utils.js';

export function generateJsonUtils(
  artifactConfig: JavaServerJakartaWSGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.rest.model`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  const node = generateJsonUtilsContent(
    fqn,
    `${artifactConfig.rootPackageName}.service.model`
  );

  return {
    name: '_JsonUtils.java',
    content: toString(
      generateCompilationUnit(packageName, importCollector, node),
      '\t'
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}
