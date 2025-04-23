import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import {
  generateCompilationUnit,
  TypescriptClientAPIGeneratorConfig,
  TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateResultUtils(
  config: TypescriptClientAPIGeneratorConfig
) {
  const collector = new TypescriptImportCollector();
  const fqn = collector.importType.bind(collector);
  return {
    name: `_result-utils.ts`,
    content: toString(
      generateCompilationUnit(collector, generateResultUtilsContent(fqn)),
      '\t'
    ),
    path: `${config.targetFolder}`,
  };
}

function generateResultUtilsContent(fqn: (t: string) => string) {
  const node = new CompositeGeneratorNode();
  node.append(`export const None: unique symbol = Symbol('None');`, NL);
  node.append('export type NoneType = typeof None;', NL);
  node.append(`export const Void: unique symbol = Symbol('Void');`, NL);
  node.append('export type VoidType = typeof Void;', NL, NL);

  node.append('type Ok<T> = readonly [ok: T, error: NoneType];', NL);
  node.append('type Err<E> = readonly [ok: NoneType, error: E];', NL);
  node.append('export type Result<T, E> = Ok<T> | Err<E>;', NL, NL);

  node.append('export type RSDError<T> = {', NL);
  node.indent((block) => {
    block.append('_type: T;', NL);
  });
  node.append('}', NL, NL);

  node.append(
    'export function isOk<T, E>(value: Result<T, E>): value is [T, NoneType] {',
    NL
  );
  node.indent((mBody) => {
    mBody.append('return value[0] !== None;', NL);
  });
  node.append('}', NL, NL);

  node.append('export function OK<T>(value: T): Ok<T> {', NL);
  node.indent((mBody) => {
    mBody.append('return [value, None];', NL);
  });
  node.append('}', NL, NL);

  node.append('export function ERR<E>(err: E): Err<E> {', NL);
  node.indent((mBody) => {
    mBody.append('return [None, err];', NL);
  });
  node.append('}', NL, NL);

  return node;
}
