import { toString } from 'langium/generate';

import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaClientAPIGeneratorConfig,
  JavaImportsCollector,
  toPath,
} from '../java-gen-utils.js';
import { MEnumType } from '../model.js';
import { generateEnumContent } from '../java-model-api/enum.js';

export function generateEnum(
  t: MEnumType,
  artifactConfig: JavaClientAPIGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.model`;

  const node = generateEnumContent(t);

  return {
    name: `${t.name}.java`,
    content: toString(
      generateCompilationUnit(
        packageName,
        new JavaImportsCollector(packageName),
        node
      ),
      '\t'
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}
