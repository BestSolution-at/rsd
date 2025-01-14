import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
  MResolvedBaseProperty,
  MResolvedMixinType,
  MResolvedRecordType,
} from '../model.js';
import { computeAPIType } from '../java-gen-utils.js';

export function generatePropertyAccessor(
  owner: MResolvedMixinType | MResolvedRecordType,
  property: MResolvedBaseProperty,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(
    `public ${computeAPIType(
      owner,
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
  owner: MResolvedMixinType | MResolvedRecordType,
  property: MResolvedBaseProperty,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(
    `public DataBuilder ${property.name}(${computeAPIType(
      owner,
      property,
      nativeTypeSubstitues,
      basePackageName,
      fqn
    )} ${property.name});`,
    NL
  );
  return node;
}
