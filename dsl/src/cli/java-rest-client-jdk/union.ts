import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaRestClientJDKGeneratorConfig,
  toPath,
} from '../java-gen-utils.js';
import { MResolvedUnionType } from '../model.js';
import { generateUnionContent } from '../java-model-json/union.js';
import { generateUnionPatchContent } from '../java-model-json/union-patch.js';

export function generateUnion(
  t: MResolvedUnionType,
  artifactConfig: JavaRestClientJDKGeneratorConfig
): Artifact[] {
  const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl.model`;

  const result: Artifact[] = [];
  {
    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    result.push({
      name: `${t.name}DataImpl.java`,
      content: toString(
        generateCompilationUnit(
          packageName,
          importCollector,
          generateUnionContent(
            t,
            artifactConfig.nativeTypeSubstitues,
            `${artifactConfig.rootPackageName}.model`,
            fqn
          )
        ),
        '\t'
      ),
      path: toPath(artifactConfig.targetFolder, packageName),
    });
  }

  if (t.resolved.records.find((r) => r.patchable) !== undefined) {
    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    result.push({
      name: `${t.name}PatchImpl.java`,
      content: toString(
        generateCompilationUnit(
          packageName,
          importCollector,
          generateUnionPatchContent(
            t,
            artifactConfig.nativeTypeSubstitues,
            `${artifactConfig.rootPackageName}.model`,
            fqn
          )
        ),
        '\t'
      ),
      path: toPath(artifactConfig.targetFolder, packageName),
    });
  }

  return result;
}
