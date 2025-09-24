import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import {
  generateCompilationUnit,
  TypescriptClientAPIGeneratorConfig,
  TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateNamespacesIndex(
  config: TypescriptClientAPIGeneratorConfig
) {
  const collector = new TypescriptImportCollector(config);
  return {
    name: `index-namespaces.ts`,
    content: toString(
      generateCompilationUnit(
        collector,
        generateNamespacesIndexContent(
          config.allowImportingTsExtensions ?? false
        )
      ),
      '\t'
    ),
    path: `${config.targetFolder}`,
  };
}

function generateNamespacesIndexContent(allowImportingTsExtensions: boolean) {
  const node = new CompositeGeneratorNode();
  if (allowImportingTsExtensions) {
    node.append(`export * as model from './model/index.ts';`, NL);
    node.append(`export * as service from './index-service.ts';`, NL);
    node.append(`export * as utils from './_type-utils.ts';`, NL);
    node.append(`export * as result from './_result-utils.ts'`, NL);
  } else {
    node.append(`export * as model from './model/index.js';`, NL);
    node.append(`export * as service from './index-service.js';`, NL);
    node.append(`export * as utils from './_type-utils.js';`, NL);
    node.append(`export * as result from './_result-utils.js'`, NL);
  }
  return node;
}
