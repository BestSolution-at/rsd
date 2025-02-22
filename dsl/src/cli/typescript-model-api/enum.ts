import { CompositeGeneratorNode, NL } from 'langium/generate';
import { MResolvedEnumType } from '../model.js';

export function generateEnumContent(t: MResolvedEnumType) {
  const node = new CompositeGeneratorNode();
  node.append(
    `export type ${t.name} = ${t.entries
      .map((e) => `'${e.name}'`)
      .join(' | ')};`,
    NL,
    NL
  );
  node.append(`export function is${t.name}(value: unknown) {`, NL);
  node.indent((mBody) => {
    mBody.append('return ');
    mBody.append(
      t.entries
        .map((e) => {
          return `value === '${e.name}'`;
        })
        .join(' || ')
    );
    mBody.append(';', NL);
  });
  node.append('}', NL);
  return node;
}
