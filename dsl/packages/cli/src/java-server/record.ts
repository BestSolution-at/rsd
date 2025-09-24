import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaServerGeneratorConfig,
  toPath,
} from '../java-gen-utils.js';
import { MResolvedRecordType, MResolvedRSDModel } from '../model.js';
import { generateRecordContent as generateRecordContent_ } from '../java-model-api/record.js';

export function generateRecord(
  t: MResolvedRecordType,
  model: MResolvedRSDModel,
  artifactConfig: JavaServerGeneratorConfig
): Artifact | undefined {
  const packageName = `${artifactConfig.rootPackageName}.service.model`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  return {
    name: `${t.name}.java`,
    content: toString(
      generateCompilationUnit(
        packageName,
        importCollector,
        generateRecordContent_(
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
