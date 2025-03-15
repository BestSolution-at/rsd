import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  isMEnumType,
  isMRecordType,
  isMUnionType,
  MResolvedRSDModel,
} from '../model.js';
import {
  generateCompilationUnit,
  TypescriptClientAPIGeneratorConfig,
  TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateModelIndex(
  model: MResolvedRSDModel,
  config: TypescriptClientAPIGeneratorConfig
): Artifact {
  const collector = new TypescriptImportCollector();
  return {
    name: `index.ts`,
    content: toString(
      generateCompilationUnit(collector, generateIndexContent(model)),
      '\t'
    ),
    path: `${config.targetFolder}/model`,
  };
}

function generateIndexContent(model: MResolvedRSDModel) {
  const node = new CompositeGeneratorNode();
  model.elements.forEach((e) => {
    if (isMEnumType(e) || isMUnionType(e) || isMRecordType(e)) {
      node.append(`export * from './${e.name}.ts'`, NL);
    }
  });
  return node;
}
