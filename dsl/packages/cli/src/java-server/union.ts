import { toString } from 'langium/generate';

import {
  JavaImportsCollector,
  JavaClientAPIGeneratorConfig,
  generateCompilationUnit,
  toPath,
} from '../java-gen-utils.js';
import { MResolvedUnionType } from '../model.js';
import { Artifact } from '../artifact-generator.js';
import { generateUnionContent as generateUnionContent_ } from '../java-model-api/union.js';

export function generateUnion(
  t: MResolvedUnionType,
  artifactConfig: JavaClientAPIGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.service.model`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  return {
    name: `${t.name}.java`,
    content: toString(
      generateCompilationUnit(
        packageName,
        importCollector,
        generateUnionContent_(
          t,
          artifactConfig.nativeTypeSubstitues,
          packageName,
          fqn
        )
      ),
      '\t'
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}
