import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaServerJakartaWSGeneratorConfig,
  toPath,
} from '../java-gen-utils.js';
import { MResolvedUnionType } from '../model.js';

import { generateUnionContent } from '../java-model-json/union.js';

export function generateUnion(
  t: MResolvedUnionType,
  artifactConfig: JavaServerJakartaWSGeneratorConfig
): Artifact[] {
  const packageName = `${artifactConfig.rootPackageName}.rest.model`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  return [
    {
      name: `${t.name}DataImpl.java`,
      content: toString(
        generateCompilationUnit(
          packageName,
          importCollector,
          generateUnionContent(
            t,
            artifactConfig.nativeTypeSubstitues,
            `${artifactConfig.rootPackageName}.service.model`,
            fqn
          )
        ),
        '\t'
      ),
      path: toPath(artifactConfig.targetFolder, packageName),
    },
  ];
}
