import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
  isMProperty,
  MResolvedBaseProperty,
  MResolvedPropery,
} from '../model.js';
import { computeAPIType, primitiveToObject } from '../java-gen-utils.js';
import { toFirstUpper } from '../util.js';

export function generatePropertyAccessor(
  property: MResolvedBaseProperty,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(
    `public ${computeAPIType(
      property,
      nativeTypeSubstitues,
      basePackageName,
      fqn
    )} ${property.name}();`,
    NL
  );
  return node;
}

export function generateBuilderPropertyAccessor(
  property: MResolvedBaseProperty,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string,
  returnType = 'DataBuilder'
) {
  const node = new CompositeGeneratorNode();
  node.append(
    `public ${returnType} ${property.name}(${computeAPIType(
      property,
      nativeTypeSubstitues,
      basePackageName,
      fqn
    )} ${property.name});`,
    NL
  );
  if (
    isMProperty(property) &&
    !property.array &&
    (property.variant === 'record' || property.variant === 'union')
  ) {
    const Function = fqn('java.util.function.Function');
    node.append(
      NL,
      `public <T extends ${
        property.type
      }.DataBuilder> ${returnType} with${toFirstUpper(
        property.name
      )}(Class<T> clazz, ${Function}<T, ${property.type}.Data> block);`,
      NL
    );
  }
  return node;
}

export function generatePatchPropertyAccessor(
  property: MResolvedPropery,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  if (
    property.variant === 'builtin' ||
    property.variant === 'enum' ||
    property.variant === 'inline-enum' ||
    property.variant === 'scalar'
  ) {
    let type = primitiveToObject(
      computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn, true)
    );

    if (property.array) {
      type = `_Base.ListChange<_Base.ListSetElementsChange<${type}>, _Base.ListAddRemoveChange<${type}, ${type}>>`;
    }

    if (property.optional || property.nullable) {
      node.append(`public _Base.Nillable<${type}> ${property.name}();`, NL);
    } else {
      const Optional = fqn('java.util.Optional');
      node.append(`public ${Optional}<${type}> ${property.name}();`, NL);
    }
  } else {
    let type = computeAPIType(
      property,
      nativeTypeSubstitues,
      basePackageName,
      fqn,
      true
    );

    if (property.array) {
      type = `_Base.ListChange<_Base.ListSetElementsChange<${type}>, _Base.ListAddRemoveUpdateChange<${type}, ${
        fqn(`${basePackageName}.${property.type}`) + '.Patch'
      }, String>>`; // We always use string because the one can then include the etag with {id}@{etag}
    }

    if (property.optional || property.nullable) {
      node.append(`public _Base.Nillable<${type}> ${property.name}();`, NL);
    } else {
      const Optional = fqn('java.util.Optional');
      node.append(`public ${Optional}<${type}> ${property.name}();`, NL);
    }
  }

  return node;
}

export function generatePatchBuilderPropertyAccessor(
  property: MResolvedPropery,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  if (
    property.variant === 'builtin' ||
    property.variant === 'enum' ||
    property.variant === 'inline-enum' ||
    property.variant === 'scalar'
  ) {
    let type = computeAPIType(
      property,
      nativeTypeSubstitues,
      basePackageName,
      fqn,
      true
    );
    if (property.nullable || property.optional || property.array) {
      type = primitiveToObject(type);
    }

    if (property.array) {
      node.append(
        `public PatchBuilder ${property.name}(_Base.ListChange<_Base.ListSetElementsChange<${type}>, _Base.ListAddRemoveChange<${type}, ${type}>> ${property.name});`,
        NL,
        NL
      );
      node.append(
        `public PatchBuilder ${property.name}(List<${type}> additions, List<${type}> removals);`,
        NL
      );
      node.append(
        `public PatchBuilder ${property.name}(List<${type}> elements);`,
        NL
      );
    } else {
      node.append(
        `public PatchBuilder ${property.name}(${type} ${property.name});`,
        NL
      );
    }
  } else {
    if (!property.array) {
      node.append(
        `public PatchBuilder ${property.name}(${computeAPIType(
          property,
          nativeTypeSubstitues,
          basePackageName,
          fqn
        )} ${property.name});`,
        NL
      );
      const Function = fqn('java.util.function.Function');
      node.append(
        NL,
        `public <T extends ${
          property.type
        }.DataBuilder> PatchBuilder with${toFirstUpper(
          property.name
        )}(Class<T> clazz, ${Function}<T, ${property.type}.Data> block);`,
        NL
      );
    } else {
      const type = computeAPIType(
        property,
        nativeTypeSubstitues,
        basePackageName,
        fqn,
        true
      );
      const baseType = fqn(`${basePackageName}.${property.type}`);
      node.append(
        `public PatchBuilder ${property.name}(_Base.ListChange<_Base.ListSetElementsChange<${type}>, _Base.ListAddRemoveUpdateChange<${type}, ${baseType}.Patch, String>> ${property.name});`,
        NL,
        NL
      );
      const List = fqn('java.util.List');
      node.append(
        `public PatchBuilder ${property.name}(${List}<${type}> additions, ${List}<${baseType}.Patch> updates, ${List}<String> removals);`,
        NL
      );
      node.append(
        `public PatchBuilder ${property.name}(List<${type}> elements);`,
        NL
      );
    }
  }
  return node;
}
