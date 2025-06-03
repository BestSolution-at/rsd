import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import { MResolvedEnumType } from '../model.js';
import {
  generateCompilationUnit,
  TypescriptClientAPIGeneratorConfig,
  TypescriptImportCollector,
} from '../typescript-gen-utils.js';
import { generateEnumContent } from '../typescript-model-api/enum.js';

export function generateEnum(
  t: MResolvedEnumType,
  config: TypescriptClientAPIGeneratorConfig
): Artifact {
  const collector = new TypescriptImportCollector(config);
  return {
    name: `${t.name}.ts`,
    content: toString(
      generateCompilationUnit(collector, generateEnumContent(t)),
      '\t'
    ),
    path: `${config.targetFolder}/model`,
  };
}
