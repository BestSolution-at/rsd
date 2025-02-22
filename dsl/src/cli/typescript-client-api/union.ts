import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import { MResolvedUnionType } from '../model.js';

import {
  generateCompilationUnit,
  TypescriptClientAPIGeneratorConfig,
  TypescriptImportCollector,
} from '../typescript-gen-utils.js';
import { generateUnionContent } from '../typescript-model-api/union.js';

export function generateUnion(
  t: MResolvedUnionType,
  config: TypescriptClientAPIGeneratorConfig
): Artifact {
  const collector = new TypescriptImportCollector();
  const fqn = collector.importType.bind(collector);
  return {
    name: `${t.name}.ts`,
    content: toString(
      generateCompilationUnit(collector, generateUnionContent(t, fqn)),
      '\t'
    ),
    path: `${config.targetFolder}/model`,
  };
}
