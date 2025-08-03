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
    const type = primitiveToObject(
      computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn)
    );
    if (property.optional || property.nullable) {
      node.append(`public _Base.Nillable<${type}> ${property.name}();`, NL);
    } else {
      const Optional = fqn('java.util.Optional');
      node.append(`public ${Optional}<${type}> ${property.name}();`, NL);
    }
  } else {
    const type = computeAPIType(
      property,
      nativeTypeSubstitues,
      basePackageName,
      fqn
    );
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
      fqn
    );
    if (property.nullable || property.optional) {
      type = primitiveToObject(type);
    }
    node.append(
      `public PatchBuilder ${property.name}(${type} ${property.name});`,
      NL
    );
  } else {
    node.append(
      `public PatchBuilder ${property.name}(${computeAPIType(
        property,
        nativeTypeSubstitues,
        basePackageName,
        fqn
      )} ${property.name});`,
      NL
    );
    if (!property.array) {
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
    }
  }
  return node;
}
