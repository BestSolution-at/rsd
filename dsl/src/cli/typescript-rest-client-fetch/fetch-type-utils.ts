import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import {
  generateCompilationUnit,
  TypescriptFetchClientGeneratorConfig,
  TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateFetchTypeUtils(
  config: TypescriptFetchClientGeneratorConfig
) {
  const collector = new TypescriptImportCollector();
  const fqn = collector.importType.bind(collector);
  return {
    name: `_fetch-type-utils.ts`,
    content: toString(
      generateCompilationUnit(collector, generateFetchTypeUtilsContent(fqn)),
      '\t'
    ),
    path: `${config.targetFolder}`,
  };
}

function generateFetchTypeUtilsContent(fqn: (t: string) => string) {
  const node = new CompositeGeneratorNode();
  node.append('export type Fetch = typeof fetch;', NL);
  node.append(ServicePropsContent(fqn), NL);
  node.append(ifDefinedContent(), NL);
  node.append(safeExecuteContent());
  return node;
}

function ServicePropsContent(fqn: (t: string) => string) {
  const node = new CompositeGeneratorNode();
  node.append('export type ServiceProps<T> = {', NL);
  node.indent((l1) => {
    l1.append('baseUrl: string;', NL);
    l1.append('fetchAPI?: Fetch;', NL);
    l1.append('lifecycleHandlers?: {', NL);
    l1.indent((l2) => {
      l2.append(
        'preFetch?: (method: string) => RequestInit | Promise<RequestInit>;',
        NL
      );
      l2.append('onSuccess?: (method: string, value: unknown) => void;', NL);
      l2.append(
        `onError?: (method: string, err: ${fqn(
          'api:../index.ts'
        )}.result.RSDError<T>) => void;`,
        NL
      );
      l2.append('onCatch?: (method: string, err: unknown) => void;', NL);
      l2.append('final?: (method: string) => void;', NL);
    });

    l1.append('};', NL);
  });
  node.append('};', NL);
  return node;
}

function ifDefinedContent() {
  const node = new CompositeGeneratorNode();
  node.append(
    'export function ifDefined<T>(value: T | undefined, block: (v: T) => void) {',
    NL
  );
  node.indent((mBody) => {
    mBody.append('if (value !== undefined) {', NL);
    mBody.indent((block) => {
      block.append('block(value);', NL);
    });
    mBody.append('}', NL);
  });
  node.append('}', NL);
  return node;
}

function safeExecuteContent() {
  const node = new CompositeGeneratorNode();
  node.append(
    'export function safeExecute<T>(value: T, block: () => void): T {',
    NL
  );
  node.indent((mBody) => {
    mBody.append('try {', NL);
    mBody.indent((block) => {
      block.append('block();', NL);
    });
    mBody.append('} catch (e) {', NL);
    mBody.indent((block) => {
      block.append(`console.error('Failed running block', e);`, NL);
    });
    mBody.append('}', NL, NL);
    mBody.append('return value;', NL);
  });
  node.append('}', NL);
  return node;
}
