import { toString } from 'langium/generate';

import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaClientAPIGeneratorConfig,
  JavaImportsCollector,
  toPath,
} from '../java-gen-utils.js';
import { generateBaseContent } from '../java-model-api/base.js';

export function generateBaseDTO(
  artifactConfig: JavaClientAPIGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.service.model`;

  return {
    name: '_Base.java',
    content: toString(
      generateCompilationUnit(
        packageName,
        new JavaImportsCollector(packageName),
        generateBaseContent()
      ),
      '\t'
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}
