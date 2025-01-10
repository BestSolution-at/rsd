import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  JavaImportsCollector,
  JavaRestClientJDKGeneratorConfig,
  generateCompilationUnit,
  toPath,
} from '../java-gen-utils.js';
import { MResolvedRecordType, MResolvedRSDModel } from '../model.js';
import { generateRecordContent } from '../java-model-json/record.js';

export function generateRecord(
  t: MResolvedRecordType,
  model: MResolvedRSDModel,
  artifactConfig: JavaRestClientJDKGeneratorConfig
): Artifact | undefined {
  const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl.dto`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  return {
    name: `${t.name}DTOImpl.java`,
    content: toString(
      generateCompilationUnit(
        packageName,
        importCollector,
        generateRecordContent(t, model, artifactConfig, fqn)
      )
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}
