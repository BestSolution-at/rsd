import { CompositeGeneratorNode, IndentNode, NL } from 'langium/generate';

import {
  MKeyProperty,
  MProperty,
  MRevisionProperty,
  isMKeyProperty,
  isMRevisionProperty,
} from '../model.js';
import {
  JavaClientAPIGeneratorConfig,
  builtinToJavaType,
  resolveObjectType,
  resolveType,
} from '../java-gen-utils.js';
import { toFirstUpper } from '../util.js';

export function generateBuilderProperty(
  node: IndentNode,
  property: MKeyProperty | MRevisionProperty | MProperty,
  artifactConfig: JavaClientAPIGeneratorConfig,
  fqn: (type: string) => string
) {
  if (isMKeyProperty(property)) {
    node.append(
      `public Builder ${property.name}(${builtinToJavaType(
        property.type,
        fqn
      )} ${property.name});`,
      NL
    );
  } else if (isMRevisionProperty(property)) {
    node.append(
      `public Builder ${property.name}(${builtinToJavaType(
        property.type,
        fqn
      )} ${property.name});`,
      NL
    );
  } else {
    if (property.variant === 'union' || property.variant === 'record') {
      if (property.array) {
        node.append(
          `public Builder ${property.name}(${fqn('java.util.List')}<${
            property.type
          }DTO> ${property.name});`,
          NL
        );
      } else {
        node.append(
          `public Builder ${property.name}(${property.type}DTO ${property.name});`,
          NL
        );
      }
    } else if (typeof property.type === 'string') {
      if (property.array) {
        node.append(
          `public Builder ${property.name}(${fqn(
            'java.util.List'
          )}<${resolveObjectType(
            property.type,
            artifactConfig.nativeTypeSubstitues,
            fqn
          )}> ${property.name});`,
          NL
        );
      } else {
        node.append(
          `public Builder ${property.name}(${resolveType(
            property.type,
            artifactConfig.nativeTypeSubstitues,
            fqn,
            property.nullable
          )} ${property.name});`,
          NL
        );
      }
    } else {
      node.append(
        `public Builder ${property.name}(${toFirstUpper(property.name)} ${
          property.name
        });`,
        NL
      );
    }
  }
}

export function generateProperty(
  node: CompositeGeneratorNode,
  property: MKeyProperty | MRevisionProperty | MProperty,
  artifactConfig: JavaClientAPIGeneratorConfig,
  fqn: (type: string) => string,
  isPatch?: boolean
) {
  if (property.doc) {
    node.append('/**', NL);
    node.append(' * ', property.doc, NL);
    node.append(' */', NL);
  }
  if (isMKeyProperty(property)) {
    node.append(
      `public ${builtinToJavaType(property.type, fqn)} ${property.name}();`,
      NL
    );
  } else if (isMRevisionProperty(property)) {
    node.append(
      `public ${builtinToJavaType(property.type, fqn)} ${property.name}();`,
      NL
    );
  } else {
    if (property.variant === 'union' || property.variant === 'record') {
      const type = isPatch
        ? `${property.type}DTO.Patch`
        : `${property.type}DTO`;
      if (property.array) {
        node.append(
          `public ${fqn('java.util.List')}<${type}> ${property.name}();`,
          NL
        );
      } else {
        node.append(`public ${type} ${property.name}();`, NL);
      }
    } else if (typeof property.type === 'string') {
      if (property.array) {
        node.append(
          `public ${fqn('java.util.List')}<${resolveObjectType(
            property.type,
            artifactConfig.nativeTypeSubstitues,
            fqn
          )}> ${property.name}();`,
          NL
        );
      } else {
        node.append(
          `public ${resolveType(
            property.type,
            artifactConfig.nativeTypeSubstitues,
            fqn,
            property.nullable || (isPatch === true && property.optional)
          )} ${property.name}();`,
          NL
        );
      }
    } else {
      node.append(
        `public ${toFirstUpper(property.name)} ${property.name}();`,
        NL
      );
    }
  }
}

export function toType(
  typeOwner: Pick<MProperty, 'variant' | 'array' | 'type' | 'name'>,
  artifactConfig: Pick<
    JavaClientAPIGeneratorConfig,
    'rootPackageName' | 'nativeTypeSubstitues'
  >,
  fqn: (type: string) => string,
  useBuiltinObject: boolean
) {
  if (typeOwner.variant === 'union' || typeOwner.variant === 'record') {
    const dtoType = fqn(
      `${artifactConfig.rootPackageName}.dto.${typeOwner.type}DTO`
    );
    if (typeOwner.array) {
      return `${fqn('java.util.List')}<${dtoType}>`;
    } else {
      return dtoType;
    }
  } else if (typeof typeOwner.type === 'string') {
    if (typeOwner.array) {
      return `${fqn('java.util.List')}<${resolveObjectType(
        typeOwner.type,
        artifactConfig.nativeTypeSubstitues,
        fqn
      )}>`;
    } else {
      return `${resolveType(
        typeOwner.type,
        artifactConfig.nativeTypeSubstitues,
        fqn,
        useBuiltinObject
      )}`;
    }
  }
  return `${toFirstUpper(typeOwner.name)}`;
}
