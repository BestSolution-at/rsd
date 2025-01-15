import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
  allResolvedRecordProperties,
  isMInlineEnumType,
  isMProperty,
  MResolvedBaseProperty,
  MResolvedRecordType,
} from '../model.js';
import { generateInlineEnum } from './enum.js';
import { toFirstUpper } from '../util.js';
import {
  generateBuilderPropertyAccessor,
  generatePropertyAccessor,
} from './shared.js';

export function generateRecordContent(
  t: MResolvedRecordType,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
): CompositeGeneratorNode {
  const allProps = allResolvedRecordProperties(t);

  const node = new CompositeGeneratorNode();
  node.append(`public interface ${t.name} {`, NL);
  node.indent((classBody) => {
    classBody.append(generateInlineEnums(t));
    classBody.appendNewLineIf(classBody.contents.length > 0);
    classBody.append(
      generateData(t, allProps, nativeTypeSubstitues, basePackageName, fqn)
    );
    classBody.appendNewLine();
    classBody.append(
      generateDataBuilder(
        t,
        allProps,
        nativeTypeSubstitues,
        basePackageName,
        fqn
      )
    );
    if (t.patchable) {
      classBody.appendNewLine();
      classBody.append(generatePatch(t));
      classBody.appendNewLine();
      classBody.append(generatePatchBuilder(t));
    }
  });
  node.append('}');
  return node;
}

function generateData(
  t: MResolvedRecordType,
  props: MResolvedBaseProperty[],
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const unions =
    t.resolved.unions.length > 0
      ? ', ' +
        t.resolved.unions
          .map((u) => fqn(`${basePackageName}.${u.name}`) + '.Data')
          .join(', ')
      : '';
  const mixins =
    t.resolved.mixins.length > 0
      ? ', ' +
        t.resolved.mixins
          .map((u) => fqn(`${basePackageName}.mixins.${u.name}Mixin`))
          .join(', ')
      : '';
  const node = new CompositeGeneratorNode();
  node.append(
    `public interface Data extends _Base.BaseData, ${t.name}${mixins}${unions} {`,
    NL
  );
  node.indent((classBody) => {
    classBody.append(
      ...props.flatMap((p) => [
        generatePropertyAccessor(
          t,
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

function generateDataBuilder(
  t: MResolvedRecordType,
  props: MResolvedBaseProperty[],
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const unions =
    t.resolved.unions.length > 0
      ? ', ' +
        t.resolved.unions
          .map((u) => fqn(`${basePackageName}.${u.name}`) + '.DataBuilder')
          .join(', ')
      : '';

  const node = new CompositeGeneratorNode();
  node.append(
    `public interface DataBuilder extends _Base.BaseDataBuilder<${t.name}.Data>${unions} {`,
    NL
  );
  node.indent((classBody) => {
    classBody.append(
      ...props.flatMap((p) => [
        generateBuilderPropertyAccessor(
          t,
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

function generatePatch(t: MResolvedRecordType) {
  const node = new CompositeGeneratorNode();
  node.append(`public interface Patch extends ${t.name} {`, NL);
  node.append('}', NL);
  return node;
}

function generatePatchBuilder(t: MResolvedRecordType) {
  const node = new CompositeGeneratorNode();
  node.append(`public interface PatchBuilder {`, NL);
  node.append('}', NL);
  return node;
}

function generateInlineEnums(t: MResolvedRecordType) {
  const node = new CompositeGeneratorNode();

  t.properties
    .filter(isMProperty)
    .filter((p) => p.variant === 'inline-enum')
    .forEach((p) => {
      const inlineEnum = p.type;
      if (isMInlineEnumType(inlineEnum)) {
        node.append(generateInlineEnum(inlineEnum, toFirstUpper(p.name)));
      }
    });
  node.appendNewLineIf(node.contents.length > 0);
  return node;
}
