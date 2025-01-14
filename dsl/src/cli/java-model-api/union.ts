import { CompositeGeneratorNode, NL } from 'langium/generate';
import { MResolvedUnionType } from '../model.js';

export function generateUnionContent(
  t: MResolvedUnionType,
  nativeTypeSubstitues: Record<string, string> | undefined,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(`public interface ${t.name} {`, NL);
  node.indent((classBody) => {
    classBody.append(generateData(t));
    classBody.appendNewLine();
    classBody.append(generateDataBuilder(t));
  });
  node.append('}', NL);
  return node;
}

function generateData(t: MResolvedUnionType) {
  const node = new CompositeGeneratorNode();
  node.append(`public interface Data extends ${t.name} {`, NL);
  node.append('}', NL);
  return node;
}

function generateDataBuilder(t: MResolvedUnionType) {
  const node = new CompositeGeneratorNode();
  node.append(`public interface DataBuilder {`, NL);
  node.append('}', NL);
  return node;
}
