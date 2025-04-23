import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import {
  generateCompilationUnit,
  TypescriptClientAPIGeneratorConfig,
  TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateApiIndex(config: TypescriptClientAPIGeneratorConfig) {
  const collector = new TypescriptImportCollector();
  return {
    name: `index.ts`,
    content: toString(
      generateCompilationUnit(collector, generateApiIndexContent()),
      '\t'
    ),
    path: `${config.targetFolder}`,
  };
}

function generateApiIndexContent() {
  const node = new CompositeGeneratorNode();
  node.append(`export * as api from './index-namespaces.ts';`, NL);
  return node;
}
