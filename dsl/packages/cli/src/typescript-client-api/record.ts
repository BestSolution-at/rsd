import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import { MResolvedRecordType } from '../model.js';
import { generateRecordContent } from '../typescript-model-api/record.js';
import {
  generateCompilationUnit,
  TypescriptClientAPIGeneratorConfig,
  TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateRecord(
  t: MResolvedRecordType,
  config: TypescriptClientAPIGeneratorConfig
): Artifact {
  const collector = new TypescriptImportCollector(config);
  const fqn = collector.importType.bind(collector);
  return {
    name: `${t.name}.ts`,
    content: toString(
      generateCompilationUnit(collector, generateRecordContent(t, fqn)),
      '\t'
    ),
    path: `${config.targetFolder}/model`,
  };
}
