import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
  allResolvedRecordProperties,
  isMBuiltinType,
  isMKeyProperty,
  isMProperty,
  isMResolvedUnionType,
  isMRevisionProperty,
  MBuiltinType,
  MResolvedBaseProperty,
  MResolvedRecordType,
  MResolvedRSDModel,
} from '../model.js';
import { generatePropertyNG } from './shared.js';
import { computeAPIType } from '../java-gen-utils.js';
import { toFirstUpper } from '../util.js';

export function generateRecordContent(
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
  const keyProp = allProps.find(isMKeyProperty);
  const revProp = allProps.find(isMRevisionProperty);

  node.append(
    `public class ${t.name}DataImpl extends _BaseDataImpl implements ${Interface}.Data {`,
    NL
  );
  node.indent((classBody) => {
    classBody.append(`${t.name}DataImpl(${JsonObject} data) {`, NL);
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
    classBody.append(generateOf(t, fqn), NL);
    classBody.append(generateToString(keyProp, revProp), NL);
    classBody.append(
      generateBuilder(
        t,
        allProps,
        nativeTypeSubstitues,
        interfaceBasePackage,
        fqn
      ),
      NL
    );
    classBody.append(`public static ${t.name}.DataBuilder builder() {`, NL);
    classBody.indent((methodBody) => {
      methodBody.append('return new DataBuilderImpl();', NL);
    });
    classBody.append('}', NL);
  });

  node.append('}', NL);

  return node;
}

function generateBuilder(
  t: MResolvedRecordType,
  props: MResolvedBaseProperty[],
  nativeTypeSubstitues: Record<string, string> | undefined,
  interfaceBasePackage: string,
  fqn: (type: string) => string
) {
  const JsonObjectBuilder = fqn('jakarta.json.JsonObjectBuilder');
  const Json = fqn('jakarta.json.Json');

  const node = new CompositeGeneratorNode();
  node.append(
    `public static class DataBuilderImpl implements ${t.name}.DataBuilder {`,
    NL
  );
  node.indent((classBody) => {
    classBody.append(
      `private ${JsonObjectBuilder} $builder = ${Json}.createObjectBuilder();`,
      NL,
      NL
    );
    if (t.resolved.unions.length > 0) {
      classBody.append('public DataBuilderImpl() {', NL);
      classBody.indent((methodBody) => {
        const key =
          (t.resolved.unions[0].descriminatorAliases ?? {})[t.name] ?? t.name;
        methodBody.append(`$builder.add("@type", "${key}");`, NL);
      });
      classBody.append('}', NL, NL);
    }
    classBody.append(
      generateBuilderPropertyMethods(
        t,
        props,
        nativeTypeSubstitues,
        interfaceBasePackage,
        fqn
      )
    );
    classBody.append(`public ${t.name}.Data build() {`, NL);
    classBody.indent((methodBody) => {
      methodBody.append(`return new ${t.name}DataImpl($builder.build());`, NL);
    });
    classBody.append('}', NL);
  });
  node.append('}', NL);
  return node;
}

function generateBuilderPropertyMethods(
  owner: MResolvedRecordType,
  props: MResolvedBaseProperty[],
  nativeTypeSubstitues: Record<string, string> | undefined,
  interfaceBasePackage: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  props.forEach((prop) => {
    const type = computeAPIType(
      prop,
      nativeTypeSubstitues,
      interfaceBasePackage,
      fqn
    );
    node.append(
      `public ${owner.name}.DataBuilder ${prop.name}(${type} ${prop.name}) {`,
      NL
    );
    node.indent((methodBody) => {
      if (isMProperty(prop)) {
        if (isNullableType(type)) {
          methodBody.append(`if (${prop.name} == null) {`, NL);
          methodBody.indent((block) => {
            if (prop.nullable) {
              block.append(`$builder.addNull("${prop.name}");`, NL);
            }
            block.append('return this;', NL);
          });

          methodBody.append('}', NL);
        }
      }
      methodBody.append(generateJSONBuilder(prop), ';', NL);
      methodBody.append('return this;', NL);
    });
    node.append('}', NL, NL);
    if (
      isMProperty(prop) &&
      !prop.array &&
      (prop.variant === 'record' || prop.variant === 'union')
    ) {
      const Function = fqn('java.util.function.Function');
      node.append(
        NL,
        `public <T extends ${
          prop.type
        }.DataBuilder> DataBuilder with${toFirstUpper(
          prop.name
        )}(Class<T> clazz, ${Function}<T, ${prop.type}.Data> block) {`,
        NL
      );
      node.indent((methodBody) => {
        if (prop.variant === 'union') {
          if (isMResolvedUnionType(prop.resolved.resolvedObjectType)) {
            methodBody.append(
              `${fqn(interfaceBasePackage + '.' + prop.type)}.DataBuilder b;`,
              NL
            );
            prop.resolved.resolvedObjectType.types.forEach((t, idx) => {
              const Type = fqn(`${interfaceBasePackage}.${t}`);
              if (idx === 0) {
                methodBody.append(
                  `if (clazz == ${Type}.DataBuilder.class) {`,
                  NL
                );
              } else {
                methodBody.append(
                  `} else if (clazz == ${Type}.DataBuilder.class) {`,
                  NL
                );
              }
              methodBody.indent((block) => {
                block.append(`b = ${t}DataImpl.builder();`, NL);
              });
            });
            methodBody.append('} else {', NL);
            methodBody.indent((block) => {
              block.append('throw new IllegalArgumentException();', NL);
            });
            methodBody.append('}', NL);
          } else {
            methodBody.append('RESOLVE FAILURE');
          }
        } else {
          methodBody.append(`var b = ${prop.type}DataImpl.builder();`, NL);
        }
        methodBody.append(
          `return ${prop.name}(block.apply(clazz.cast(b)));`,
          NL
        );
      });

      node.append('}', NL, NL);
    }
  });

  return node;
}

const PRIMTIVE_TYPES = new Set([
  'boolean',
  'short',
  'int',
  'long',
  'double',
  'float',
]);

function isNullableType(type: string) {
  return !PRIMTIVE_TYPES.has(type);
}

function generateJSONBuilder(prop: MResolvedBaseProperty): string {
  if (isMKeyProperty(prop) || isMRevisionProperty(prop)) {
    return builtinBuilderAccess(prop);
  }

  if (prop.array) {
    if (isMBuiltinType(prop.type)) {
      return builtinBuilderArrayJSONAccess({
        type: prop.type,
        name: prop.name,
      });
    } else if (
      prop.variant === 'enum' ||
      prop.variant === 'inline-enum' ||
      prop.variant === 'scalar'
    ) {
      return `$builder.add("${prop.name}", _JsonUtils.toJsonLiteralArray(${prop.name}))`;
    } else {
      return `$builder.add("${prop.name}", _JsonUtils.toJsonValueArray(${prop.name}, $e -> ((_BaseDataImpl) $e).data))`;
    }
  }

  if (isMBuiltinType(prop.type)) {
    return builtinBuilderAccess({ type: prop.type, name: prop.name });
  } else if (
    prop.variant === 'enum' ||
    prop.variant === 'inline-enum' ||
    prop.variant === 'scalar'
  ) {
    return `$builder.add("${prop.name}", ${prop.name}.toString())`;
  } else {
    return `$builder.add("${prop.name}", ((_BaseDataImpl) ${prop.name}).data)`;
  }
}

function builtinBuilderAccess(property: {
  type: MBuiltinType;
  name: string;
}): string {
  switch (property.type) {
    case 'boolean':
    case 'double':
    case 'float':
    case 'int':
    case 'long':
    case 'short':
    case 'string':
      return `$builder.add("${property.name}", ${property.name})`;
    case 'local-date':
    case 'local-date-time':
    case 'zoned-date-time':
      return `$builder.add("${property.name}", ${property.name}.toString())`;
  }
}

function builtinBuilderArrayJSONAccess(property: {
  type: MBuiltinType;
  name: string;
}): string {
  switch (property.type) {
    case 'boolean':
      return `$builder.add("${property.name}", _JsonUtils.toJsonBooleanArray(${property.name}))`;
    case 'double':
      return `$builder.add("${property.name}", _JsonUtils.toJsonDoubleArray(${property.name}))`;
    case 'float':
      return `$builder.add("${property.name}", _JsonUtils.toJsonFloatArray(${property.name}))`;
    case 'int':
      return `$builder.add("${property.name}", _JsonUtils.toJsonIntArray(${property.name}))`;
    case 'local-date':
      return `$builder.add("${property.name}", _JsonUtils.toJsonLiteralArray(${property.name}))`;
    case 'local-date-time':
      return `$builder.add("${property.name}", _JsonUtils.toJsonLiteralArray(${property.name})::toString))`;
    case 'long':
      return `$builder.add("${property.name}", _JsonUtils.toJsonLongArray(${property.name}))`;
    case 'short':
      return `$builder.add("${property.name}", _JsonUtils.toJsonShortArray(${property.name}))`;
    case 'string':
      return `$builder.add("${property.name}", _JsonUtils.toJsonStringArray(${property.name}))`;
    case 'zoned-date-time':
      return `$builder.add("${property.name}", _JsonUtils.toJsonLiteralArray(${property.name}))`;
  }
}

function generateOf(t: MResolvedRecordType, fqn: (type: string) => string) {
  const JsonObject = fqn('jakarta.json.JsonObject');
  const node = new CompositeGeneratorNode();
  node.append(`public static ${t.name}.Data of(${JsonObject} obj) {`, NL);
  node.indent((methodBody) => {
    methodBody.append(`return new ${t.name}DataImpl(obj);`, NL);
  });
  node.append('}', NL);
  return node;
}

function generateToString(
  keyProp: MResolvedBaseProperty | undefined,
  revProp: MResolvedBaseProperty | undefined
) {
  const classBody = new CompositeGeneratorNode();
  classBody.append('public String toString() {', NL);
  classBody.indent((methodBody) => {
    if (keyProp && revProp) {
      methodBody.append(
        `return "%s[%s=%s@%s=%s]".formatted(getClass().getSimpleName(), "${keyProp.name}", ${keyProp.name}(), "${revProp.name}", ${revProp.name}());`,
        NL
      );
    } else if (keyProp) {
      methodBody.append(
        `return "%s[%s=%s]".formatted(getClass().getSimpleName(), "${keyProp.name}", ${keyProp.name}());`,
        NL
      );
    } else if (revProp) {
      methodBody.append(
        `return "%s[@%s=%s]".formatted(getClass().getSimpleName(), "${revProp.name}", ${revProp.name}());`,
        NL
      );
    } else {
      methodBody.append('return getClass().getSimpleName();', NL);
    }
  });
  classBody.append('}', NL);
  return classBody;
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
    ...props.flatMap((p) => {
      return [
        generatePropertyNG(
          owner,
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
