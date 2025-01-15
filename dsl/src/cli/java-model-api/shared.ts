import { CompositeGeneratorNode, NL } from 'langium/generate';
import { isMProperty, MResolvedBaseProperty } from '../model.js';
import { computeAPIType } from '../java-gen-utils.js';
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
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(
    `public DataBuilder ${property.name}(${computeAPIType(
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
      }.DataBuilder> DataBuilder with${toFirstUpper(
        property.name
      )}(Class<T> clazz, ${Function}<T, ${property.type}.Data> block);`,
      NL
    );
  }
  return node;
}
