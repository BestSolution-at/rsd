import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import {
  generateCompilationUnit,
  TypescriptClientAPIGeneratorConfig,
  TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateApiIndex(config: TypescriptClientAPIGeneratorConfig) {
  const collector = new TypescriptImportCollector(config);
  return {
    name: `index.ts`,
    content: toString(
      generateCompilationUnit(
        collector,
        generateApiIndexContent(config.allowImportingTsExtensions ?? false)
      ),
      '\t'
    ),
    path: `${config.targetFolder}`,
  };
}

function generateApiIndexContent(allowImportingTsExtensions: boolean) {
  const node = new CompositeGeneratorNode();
  if (allowImportingTsExtensions) {
    node.append(`export * as api from './index-namespaces.ts';`, NL);
    node.append(`export { $ } from './_result-utils.ts';`, NL);
    node.append(`export * from './services/index.ts';`, NL);
  } else {
    node.append(`export * as api from './index-namespaces.js';`, NL);
    node.append(`export { $ } from './_result-utils.js';`, NL);
    node.append(`export * from './services/index.js';`, NL);
  }
  return node;
}
