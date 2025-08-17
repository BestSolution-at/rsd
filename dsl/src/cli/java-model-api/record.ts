import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
  allResolvedRecordProperties,
  isMInlineEnumType,
  isMKeyProperty,
  isMProperty,
  isMResolvedProperty,
  isMRevisionProperty,
  MResolvedBaseProperty,
  MResolvedPropery,
  MResolvedRecordType,
} from '../model.js';
import { generateInlineEnum } from './enum.js';
import { toFirstUpper, toNode } from '../util.js';
import {
  generateBuilderPropertyAccessor,
  generatePatchBuilderPropertyAccessor,
  generatePatchPropertyAccessor,
  generatePropertyAccessor,
} from './shared.js';
import { computeAPIType, primitiveToObject } from '../java-gen-utils.js';

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
      classBody.append(
        generatePatch(t, allProps, nativeTypeSubstitues, basePackageName, fqn)
      );
      classBody.appendNewLine();
      classBody.append(
        generatePatchBuilder(
          t,
          allProps,
          nativeTypeSubstitues,
          basePackageName,
          fqn
        )
      );
    }
  });
  node.append('}', NL);
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
        generatePropertyAccessor(p, nativeTypeSubstitues, basePackageName, fqn),
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

function generatePatch(
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
          .map((u) => fqn(`${basePackageName}.${u.name}`) + '.Patch')
          .join(', ')
      : '';
  const node = new CompositeGeneratorNode();
  node.append(
    `public interface Patch extends _Base.BaseData, ${t.name}${unions} {`,
    NL
  );
  node.indent((classBody) => {
    classBody.append(
      ChangeTypes(props, nativeTypeSubstitues, basePackageName, fqn)
    );
    classBody.append(
      ...props
        .filter((p) => isMKeyProperty(p) || isMRevisionProperty(p))
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
    classBody.append(
      ...props
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
        ])
    );
  });
  node.append('}', NL);
  return node;
}

function ChangeTypes(
  props: MResolvedBaseProperty[],
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  return toNode([
    ...props
      .filter(isMResolvedProperty)
      .filter((p) => p.readonly === false)
      .filter((p) => p.array)
      .flatMap((p) => [
        ChangeType(p),
        SetChange(p, nativeTypeSubstitues, basePackageName, fqn),
        ListChange(p, nativeTypeSubstitues, basePackageName, fqn),
      ]),
  ]);
}

function ChangeType(prop: MResolvedPropery) {
  return toNode([`public interface ${toFirstUpper(prop.name)}Change {`, '}']);
}

function SetChange(
  prop: MResolvedPropery,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const type = primitiveToObject(
    computeAPIType(prop, nativeTypeSubstitues, basePackageName, fqn, true)
  );
  const prefix = toFirstUpper(prop.name);
  return toNode([
    `public interface ${prefix}SetChange extends ${prefix}Change, _Base.ListSetElementsChange<${type}> {`,
    '}',
  ]);
}

function ListChange(
  prop: MResolvedPropery,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const prefix = toFirstUpper(prop.name);

  if (prop.variant === 'record' || prop.variant === 'union') {
    const Type = fqn(`${basePackageName}.${prop.type}`);
    return toNode([
      `public interface ${prefix}MergeChange extends ${prefix}Change, _Base.ListAddRemoveUpdateChange<${Type}.Data, ${Type}.Patch, String> {`,
      '}',
    ]);
  }
  const Type = computeAPIType(
    prop,
    nativeTypeSubstitues,
    basePackageName,
    fqn,
    true
  );
  return toNode([
    `public interface ${prefix}MergeChange extends ${prefix}Change, _Base.ListAddRemoveChange<${Type}, ${Type}> {`,
    '}',
  ]);
}

function generatePatchBuilder(
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
          .map((u) => fqn(`${basePackageName}.${u.name}`) + '.PatchBuilder')
          .join(', ')
      : '';
  const node = new CompositeGeneratorNode();
  node.append(
    `public interface PatchBuilder extends _Base.BaseDataBuilder<${t.name}.Patch>${unions} {`,
    NL
  );
  node.indent((classBody) => {
    classBody.append(
      ...props
        .filter((p) => isMKeyProperty(p) || isMRevisionProperty(p))
        .flatMap((p) => [
          generateBuilderPropertyAccessor(
            p,
            nativeTypeSubstitues,
            basePackageName,
            fqn,
            'PatchBuilder'
          ),
          NL,
        ])
    );
    classBody.append(
      ...props
        .filter(isMResolvedProperty)
        .filter((p) => p.readonly === false)
        .flatMap((p) => [
          generatePatchBuilderPropertyAccessor(
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
