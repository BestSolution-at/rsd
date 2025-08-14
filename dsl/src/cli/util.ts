import { CompositeGeneratorNode, GeneratorNode, NL } from 'langium/generate';
import { MBuiltinType, MResolvedRSDModel } from './model.js';

export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function isObject(value: unknown): value is Object {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function toFirstUpper(value: string) {
  return value[0].toUpperCase() + value.substring(1);
}

export function toFirstLower(value: string) {
  return value[0].toLowerCase() + value.substring(1);
}

export type IndentBlock = (string | IndentBlock | GeneratorNode)[];

export function toNode(block: IndentBlock, endWithNewLine = true) {
  const node = new CompositeGeneratorNode();
  block.forEach((e, idx, arr) => {
    if (Array.isArray(e)) {
      node.indent((i) => {
        i.append(toNode(e, true));
      });
    } else if (typeof e === 'string') {
      node.append(e, endWithNewLine || idx + 1 < arr.length ? NL : '');
    } else {
      node.append(e);
    }
  });
  return node;
}

export function toCamelCaseIdentifier(value: string) {
  let rv = '';
  for (let i = 0; i < value.length; i++) {
    if (
      value.charAt(i) === '-' ||
      value.charAt(i) === '_' ||
      value.charAt(i) === ' '
    ) {
      i = i + 1;
      rv += value.charAt(i).toUpperCase();
    } else {
      rv += value.charAt(i);
    }
  }

  return rv.replaceAll(/\s/g, '');
}

export function hasStream(model: MResolvedRSDModel) {
  return hasStreamResult(model) || hasStreamParameter(model);
}

export function hasFileStream(model: MResolvedRSDModel) {
  return hasFileStreamResult(model) || hasFileStreamParameter(model);
}

export function hasStreamResult(model: MResolvedRSDModel): boolean {
  return (
    model.services
      .flatMap((s) => s.operations)
      .find((o) => o.resultType?.variant === 'stream') !== undefined
  );
}

export function hasFileStreamResult(model: MResolvedRSDModel): boolean {
  return (
    model.services
      .flatMap((s) => s.operations)
      .filter((o) => o.resultType?.variant === 'stream')
      .find((o) => o.resultType?.type === 'file') !== undefined
  );
}

export function hasStreamParameter(model: MResolvedRSDModel): boolean {
  return (
    model.services
      .flatMap((s) => s.operations)
      .flatMap((o) => o.parameters)
      .find((p) => p.variant === 'stream') !== undefined
  );
}

export function hasFileStreamParameter(model: MResolvedRSDModel): boolean {
  return (
    model.services
      .flatMap((s) => s.operations)
      .flatMap((o) => o.parameters)
      .filter((p) => p.variant === 'stream')
      .find((p) => p.type === 'file') !== undefined
  );
}

export function isStringSerializedType(type: MBuiltinType) {
  return (
    type === 'local-date' ||
    type === 'local-date-time' ||
    type === 'string' ||
    type === 'zoned-date-time'
  );
}
