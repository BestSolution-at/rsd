import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { MResolvedService } from '../model.js';
import {
  generateCompilationUnit,
  TypescriptClientAPIGeneratorConfig,
  TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateService(
  s: MResolvedService,
  config: TypescriptClientAPIGeneratorConfig
) {
  const collector = new TypescriptImportCollector();
  const fqn = collector.importType.bind(collector);
  return {
    name: `${s.name}.ts`,
    content: toString(
      generateCompilationUnit(collector, generateServiceContent(s, fqn)),
      '\t'
    ),
    path: `${config.targetFolder}`,
  };
}

function generateServiceContent(
  s: MResolvedService,
  fqn: (t: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(`export interface ${s.name}Service {`);
  node.indent((classBody) => {});
  node.append('}', NL);
  return node;
}
