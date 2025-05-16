import { CompositeGeneratorNode, NL } from 'langium/generate';

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

export type IndentBlock = (string | IndentBlock)[];

export function toNode(block: IndentBlock, endWithNewLine = true) {
  const node = new CompositeGeneratorNode();
  block.forEach((e, idx, arr) => {
    if (typeof e === 'string') {
      node.append(e, endWithNewLine || idx + 1 < arr.length ? NL : '');
    } else {
      node.indent((i) => {
        i.append(toNode(e, true));
      });
    }
  });
  return node;
}
