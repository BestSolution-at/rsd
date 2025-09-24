import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaServerJakartaWSGeneratorConfig,
  toPath,
} from '../java-gen-utils.js';
import { MResolvedRecordType, MResolvedRSDModel } from '../model.js';
import { generateRecordContent } from '../java-model-json/record.js';
import { generateRecordPatchContent } from '../java-model-json/record-patch.js';

export function generateRecord(
  t: MResolvedRecordType,
  model: MResolvedRSDModel,
  artifactConfig: JavaServerJakartaWSGeneratorConfig
): Artifact[] {
  const packageName = `${artifactConfig.rootPackageName}.rest.model`;

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
          generateRecordContent(
            t,
            model,
            artifactConfig.nativeTypeSubstitues,
            `${artifactConfig.rootPackageName}.service.model`,
            fqn
          )
        ),
        '\t'
      ),
      path: toPath(artifactConfig.targetFolder, packageName),
    });
  }

  if (t.patchable) {
    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    result.push({
      name: `${t.name}PatchImpl.java`,
      content: toString(
        generateCompilationUnit(
          packageName,
          importCollector,
          generateRecordPatchContent(
            t,
            model,
            artifactConfig.nativeTypeSubstitues,
            `${artifactConfig.rootPackageName}.service.model`,
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
