import { CompositeGeneratorNode, NL } from 'langium/generate';
import { isMResolvedProperty, MResolvedUnionType } from '../model.js';
import {
  generatePatchPropertyAccessor,
  generatePropertyAccessor,
} from './shared.js';
import { toNode } from '../util.js';

export function generateUnionContent(
  t: MResolvedUnionType,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(`public interface ${t.name} {`, NL);
  node.indent((classBody) => {
    classBody.append(Builder());
    classBody.appendNewLine();
    classBody.append(
      generateData(t, nativeTypeSubstitues, basePackageName, fqn)
    );
    classBody.appendNewLine();
    classBody.append(generateDataBuilder(t));

    if (t.resolved.records.find((r) => r.patchable)) {
      classBody.append(
        NL,
        generatePatch(t, nativeTypeSubstitues, basePackageName, fqn),
        NL
      );
      classBody.append(generatePatchBuilder(t), NL);
    }
  });
  node.append('}', NL);
  return node;
}

function Builder() {
  return toNode(['public interface Builder {', '', '}']);
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
      ...t.resolved.sharedProps.flatMap((p) => [
        generatePropertyAccessor(p, nativeTypeSubstitues, basePackageName, fqn),
        NL,
      ])
    );
  });
  node.append('}', NL);
  return node;
}

function generateDataBuilder(t: MResolvedUnionType) {
  const node = new CompositeGeneratorNode();
  node.append(`public interface DataBuilder extends Builder {`, NL);
  node.append('}', NL);
  return node;
}

function generatePatch(
  t: MResolvedUnionType,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  return toNode([
    `public interface Patch extends ${t.name} {`,
    t.resolved.sharedProps
      .filter(isMResolvedProperty)
      .filter((p) => p.readonly === false)
      .flatMap((p) => [
        generatePatchPropertyAccessor(
          p,
          nativeTypeSubstitues,
          basePackageName,
          fqn
        ),
        NL,
      ]),
    '}',
  ]);
}

function generatePatchBuilder(t: MResolvedUnionType) {
  const node = new CompositeGeneratorNode();
  node.append(`public interface PatchBuilder extends Builder {`, NL);
  node.append('}', NL);
  return node;
}
