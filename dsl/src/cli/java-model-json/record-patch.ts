import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
  allResolvedRecordProperties,
  isMKeyProperty,
  isMResolvedProperty,
  isMRevisionProperty,
  MKeyProperty,
  MResolvedBaseProperty,
  MResolvedRecordType,
  MResolvedRSDModel,
  MRevisionProperty,
} from '../model.js';
import {
  builtinBuilderAccess,
  generatePatchBuilderPropertyAccessor,
  generatePatchPropertyAccessor,
  generatePropertyNG,
} from './shared.js';
import { computeAPIType } from '../java-gen-utils.js';

export function generateRecordPatchContent(
  t: MResolvedRecordType,
  model: MResolvedRSDModel,
  nativeTypeSubstitues: Record<string, string> | undefined,
  interfaceBasePackage: string,
  fqn: (type: string) => string
): CompositeGeneratorNode {
  const node = new CompositeGeneratorNode();
  const Interface = fqn(`${interfaceBasePackage}.${t.name}`);
  const JsonObject = fqn('jakarta.json.JsonObject');

  const allProps = allResolvedRecordProperties(t);
  /*const keyProp = allProps.find(isMKeyProperty);
  const revProp = allProps.find(isMRevisionProperty);*/

  node.append(
    `public class ${t.name}DataPatchImpl extends _BaseDataImpl implements ${Interface}.Patch {`,
    NL
  );
  node.indent((classBody) => {
    classBody.append(`${t.name}DataPatchImpl(${JsonObject} data) {`, NL);
    classBody.indent((initBody) => {
      initBody.append('super(data);', NL);
    });
    classBody.append('}', NL, NL);
    classBody.append(
      generatePropertyAccessors(
        t,
        allProps,
        nativeTypeSubstitues,
        interfaceBasePackage,
        fqn
      )
    );
    classBody.append(
      generatePatchBuilderImpl(
        t,
        model,
        allProps,
        nativeTypeSubstitues,
        interfaceBasePackage,
        fqn
      )
    );
    classBody.append(
      NL,
      `public static ${t.name}.Patch of(JsonObject obj) {`,
      NL
    );
    classBody.indent((methodBody) => {
      methodBody.append(`return new ${t.name}DataPatchImpl(obj);`, NL);
    });
    classBody.append('}', NL);
    classBody.append(NL, 'public static PatchBuilderImpl builder() {', NL);
    classBody.indent((methodBody) => {
      methodBody.append('return new PatchBuilderImpl();', NL);
    });
    classBody.append('}', NL);
  });
  node.append('}', NL);

  return node;
}

function generatePatchBuilderImpl(
  t: MResolvedRecordType,
  model: MResolvedRSDModel,
  props: MResolvedBaseProperty[],
  nativeTypeSubstitues: Record<string, string> | undefined,
  interfaceBasePackage: string,
  fqn: (type: string) => string
) {
  const Json = fqn('jakarta.json.Json');
  const JsonObjectBuilder = fqn('jakarta.json.JsonObjectBuilder');
  const node = new CompositeGeneratorNode();
  node.append(
    `public static class PatchBuilderImpl implements ${t.name}.PatchBuilder {`,
    NL
  );
  node.indent((classBody) => {
    classBody.append(
      `private ${JsonObjectBuilder} $builder = ${Json}.createObjectBuilder();`,
      NL,
      NL
    );
    if (t.resolved.unions.length > 0) {
      classBody.append('public PatchBuilderImpl() {', NL);
      classBody.indent((methodBody) => {
        const key =
          (t.resolved.unions[0].descriminatorAliases ?? {})[t.name] ?? t.name;
        methodBody.append(`$builder.add("@type", "patch:${key}");`, NL);
      });
      classBody.append('}', NL, NL);
    }
    classBody.append(
      ...props
        .filter((p) => isMKeyProperty(p) || isMRevisionProperty(p))
        .flatMap((p) => {
          return [
            generateKeyRevBuilderPropertyAccessor(
              t,
              p as (MKeyProperty | MRevisionProperty) & MResolvedBaseProperty, // FIXME Typesystem woes!?!
              nativeTypeSubstitues,
              interfaceBasePackage,
              fqn
            ),
            NL,
          ];
        })
    );
    classBody.append(
      ...props
        .filter(isMResolvedProperty)
        .filter((p) => p.readonly === false)
        .flatMap((p) => {
          return [
            generatePatchBuilderPropertyAccessor(
              t,
              p,
              nativeTypeSubstitues,
              interfaceBasePackage,
              fqn
            ),
            NL,
          ];
        })
    );
    classBody.append('@Override', NL);
    classBody.append(`public ${t.name}.Patch build() {`, NL);
    classBody.indent((methodBody) => {
      methodBody.append(
        `return new ${t.name}DataPatchImpl($builder.build());`,
        NL
      );
    });
    classBody.append('}', NL);
  });

  node.append('}', NL);
  return node;
}

function generateKeyRevBuilderPropertyAccessor(
  t: MResolvedRecordType,
  p: (MKeyProperty | MRevisionProperty) & MResolvedBaseProperty,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const rv = new CompositeGeneratorNode();
  rv.append(
    `public ${t.name}.PatchBuilder ${p.name}(${computeAPIType(
      p as MResolvedBaseProperty,
      nativeTypeSubstitues,
      basePackageName,
      fqn
    )} ${p.name}) {`,
    NL
  );
  rv.indent((mBody) => {
    var content = builtinBuilderAccess({
      type: p.type,
      name: p.name,
    });
    mBody.append(content, ';', NL);
    mBody.append('return this;', NL);
  });
  rv.append('}', NL);

  return rv;
}

function generatePropertyAccessors(
  owner: MResolvedRecordType,
  props: MResolvedBaseProperty[],
  nativeTypeSubstitues: Record<string, string> | undefined,
  interfaceBasePackage: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(
    ...props
      .filter((p) => isMKeyProperty(p) || isMRevisionProperty(p))
      .flatMap((p) => [
        generatePropertyNG(
          owner,
          p,
          nativeTypeSubstitues,
          interfaceBasePackage,
          fqn
        ),
        NL,
      ])
  );
  node.append(
    ...props
      .filter(isMResolvedProperty)
      .filter((p) => p.readonly === false)
      .flatMap((p) => {
        return [
          generatePatchPropertyAccessor(
            p,
            nativeTypeSubstitues,
            interfaceBasePackage,
            fqn
          ),
          NL,
        ];
      })
  );
  return node;
}
