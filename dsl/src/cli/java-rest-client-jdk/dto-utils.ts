import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaRestClientJDKGeneratorConfig,
  toPath,
} from '../java-gen-utils.js';
import { generateDTOUtilsContent } from '../java-model-json/dto-utils.js';

export function generateDTOUtils(
  artifactConfig: JavaRestClientJDKGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl.dto`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  const node = generateDTOUtilsContent(fqn);

  return {
    name: 'DTOUtils.java',
    content: toString(
      generateCompilationUnit(packageName, importCollector, node),
      '\t'
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}
