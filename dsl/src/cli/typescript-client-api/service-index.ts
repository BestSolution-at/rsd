import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import { MResolvedRSDModel } from '../model.js';
import {
  generateCompilationUnit,
  TypescriptClientAPIGeneratorConfig,
  TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateServiceIndex(
  model: MResolvedRSDModel,
  config: TypescriptClientAPIGeneratorConfig
): Artifact {
  const collector = new TypescriptImportCollector();
  return {
    name: `index-service.ts`,
    content: toString(
      generateCompilationUnit(collector, generateIndexContent(model)),
      '\t'
    ),
    path: `${config.targetFolder}`,
  };
}

function generateIndexContent(model: MResolvedRSDModel) {
  const node = new CompositeGeneratorNode();
  model.services.forEach((e) => {
    node.append(`export * from './${e.name}Service.ts'`, NL);
  });
  if (model.errors.length > 0) {
    node.append(`export * from './Errors.ts'`, NL);
  }

  return node;
}
