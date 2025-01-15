import { CompositeGeneratorNode, NL } from 'langium/generate';
import { isMProperty, MResolvedUnionType } from '../model.js';
import { generatePropertyAccessor } from './shared.js';

export function generateUnionContent(
  t: MResolvedUnionType,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(`public interface ${t.name} {`, NL);
  node.indent((classBody) => {
    classBody.append(
      generateData(t, nativeTypeSubstitues, basePackageName, fqn)
    );
    classBody.appendNewLine();
    classBody.append(generateDataBuilder(t));
  });
  node.append('}', NL);
  return node;
}

function generateData(
  t: MResolvedUnionType,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(`public interface Data extends ${t.name} {`, NL);
  node.indent((classBody) => {
    classBody.append(
      ...t.resolved.sharedProps
        .filter(isMProperty)
        .flatMap((p) => [
          generatePropertyAccessor(
            p,
            nativeTypeSubstitues,
            basePackageName,
            fqn
          ),
          NL,
        ])
    );
  });
  node.append('}', NL);
  return node;
}

function generateDataBuilder(t: MResolvedUnionType) {
  const node = new CompositeGeneratorNode();
  node.append(`public interface DataBuilder {`, NL);
  node.append('}', NL);
  return node;
}
