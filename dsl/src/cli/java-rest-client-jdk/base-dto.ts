import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaRestClientJDKGeneratorConfig,
  toPath,
} from '../java-gen-utils.js';
import { generateBaseDTOContent } from '../java-model-json/base-dto.js';

export function generateBaseDTO(
  artifactConfig: JavaRestClientJDKGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl.dto`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);
  const node = generateBaseDTOContent(fqn);
  return {
    name: 'BaseDTOImpl.java',
    content: toString(
      generateCompilationUnit(packageName, importCollector, node),
      '\t'
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}
