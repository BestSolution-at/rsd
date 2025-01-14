import { CompositeGeneratorNode, IndentNode, NL } from 'langium/generate';
import {
  isMBuiltinType,
  isMInlineEnumType,
  isMKeyProperty,
  isMRevisionProperty,
  MBuiltinType,
  MKeyProperty,
  MProperty,
  MResolvedBaseProperty,
  MResolvedRecordType,
  MRevisionProperty,
} from '../model.js';
import {
  builtinToJavaType,
  computeAPIType,
  JavaRestClientJDKGeneratorConfig,
  resolveType,
} from '../java-gen-utils.js';
import { toType } from '../java-client-api/shared.js';
import { toFirstUpper } from '../util.js';

export function generatePropertyNG(
  owner: MResolvedRecordType,
  prop: MResolvedBaseProperty,
  nativeTypeSubstitues: Record<string, string> | undefined,
  interfaceBasePackage: string,
  fqn: (type: string) => string
) {
  const type = computeAPIType(
    owner,
    prop,
    nativeTypeSubstitues,
    interfaceBasePackage,
    fqn
  );

  const node = new CompositeGeneratorNode();
  node.append(`public ${type} ${prop.name}() {`, NL);

  node.indent((methodBody) => {
    methodBody.append(
      generatePropertyContent(
        owner,
        prop,
        nativeTypeSubstitues,
        interfaceBasePackage,
        fqn
      )
    );
  });

  node.append('}', NL);
  return node;
}

function generatePropertyContent(
  owner: MResolvedRecordType,
  prop: MResolvedBaseProperty,
  nativeTypeSubstitues: Record<string, string> | undefined,
  interfaceBasePackage: string,
  fqn: (type: string) => string
) {
  let mapper: string;
  const array =
    !isMKeyProperty(prop) && !isMRevisionProperty(prop) && prop.array;

  if (isMBuiltinType(prop.type)) {
    if (array) {
      mapper = builtinSimpleJSONArrayAccess({
        type: prop.type,
        name: prop.name,
      });
    } else {
      if (
        isMKeyProperty(prop) ||
        isMRevisionProperty(prop) ||
        (!prop.optional && !prop.nullable)
      ) {
        mapper = builtinSimpleJSONAccessNG({
          name: prop.name,
          type: prop.type,
        });
      } else {
        mapper = builtinOptionalJSONAccessNG({
          name: prop.name,
          type: prop.type,
        });
      }
    }
  } else if (isMInlineEnumType(prop.type)) {
    const Type = computeAPIType(
      owner,
      prop,
      nativeTypeSubstitues,
      interfaceBasePackage,
      fqn,
      true
    );
    if (array) {
      mapper = `_JsonUtils.mapLiterals(data, "${prop.name}", ${Type}::valueOf)`;
    } else {
      mapper = `_JsonUtils.mapLiteral(data, "${prop.name}", ${Type}::valueOf)`;
    }
  } else {
    if (!isMKeyProperty(prop) && !isMRevisionProperty(prop)) {
      if (prop.variant === 'enum') {
        if (array) {
          mapper = `_JsonUtils.mapLiterals(data, "${prop.name}", ${prop.type}::valueOf)`;
        } else {
          mapper = `_JsonUtils.mapLiteral(data, "${prop.name}", ${prop.type}::valueOf)`;
        }
      } else if (prop.variant === 'scalar') {
        const Type = computeAPIType(
          owner,
          prop,
          nativeTypeSubstitues,
          interfaceBasePackage,
          fqn,
          true
        );
        if (array) {
          mapper = `_JsonUtils.mapLiterals(data, "${prop.name}", ${Type}::of)`;
        } else {
          mapper = `_JsonUtils.mapLiteral(data, "${prop.name}", ${Type}::of)`;
        }
      } else {
        /*const Type = computeAPIType(
          owner,
          prop,
          nativeTypeSubstitues,
          interfaceBasePackage,
          fqn,
          true
        );*/
        if (array) {
          mapper = `_JsonUtils.mapObjects(data, "${prop.name}", ${prop.type}DataImpl::of)`;
        } else {
          if (prop.optional) {
            mapper = `_JsonUtils.mapObject(data, "${prop.name}", ${prop.type}DataImpl::of, null)`;
          } else {
            mapper = `_JsonUtils.mapObject(data, "${prop.name}", ${prop.type}DataImpl::of)`;
          }
        }
      }
    } else {
      mapper = 'Foo';
    }
  }

  const node = new CompositeGeneratorNode();
  node.append(`return ${mapper};`, NL);
  return node;
}

function builtinSimpleJSONAccessNG(property: {
  type: MBuiltinType;
  name: string;
}): string {
  switch (property.type) {
    case 'boolean':
      return `_JsonUtils.mapBoolean(data, "${property.name}")`;
    case 'double':
      return `_JsonUtils.mapDouble(data, "${property.name}")`;
    case 'float':
      return `_JsonUtils.mapFloat(data, "${property.name}")`;
    case 'int':
      return `_JsonUtils.mapInt(data, "${property.name}")`;
    case 'local-date':
      return `_JsonUtils.mapLocalDate(data, "${property.name}")`;
    case 'local-date-time':
      return `_JsonUtils.mapLocalDateTime(data, "${property.name}")`;
    case 'long':
      return `_JsonUtils.mapLong(data, "${property.name}")`;
    case 'short':
      return `_JsonUtils.mapShort(data, "${property.name}")`;
    case 'string':
      return `_JsonUtils.mapString(data, "${property.name}")`;
    case 'zoned-date-time':
      return `_JsonUtils.mapZonedDateTime(data, "${property.name}")`;
  }
}

function builtinSimpleJSONArrayAccess(property: {
  type: MBuiltinType;
  name: string;
}): string {
  switch (property.type) {
    case 'boolean':
      return `_JsonUtils.mapBooleans(data, "${property.name}")`;
    case 'double':
      return `_JsonUtils.mapDoubles(data, "${property.name}")`;
    case 'float':
      return `_JsonUtils.mapFloats(data, "${property.name}")`;
    case 'int':
      return `_JsonUtils.mapInts(data, "${property.name}")`;
    case 'local-date':
      return `_JsonUtils.mapLocalDates(data, "${property.name}")`;
    case 'local-date-time':
      return `_JsonUtils.mapLocalDateTimes(data, "${property.name}")`;
    case 'long':
      return `_JsonUtils.mapLongs(data, "${property.name}")`;
    case 'short':
      return `_JsonUtils.mapShorts(data, "${property.name}")`;
    case 'string':
      return `_JsonUtils.mapStrings(data, "${property.name}")`;
    case 'zoned-date-time':
      return `_JsonUtils.mapZonedDateTimes(data, "${property.name}")`;
  }
}

function builtinOptionalJSONAccessNG(property: {
  type: MBuiltinType;
  name: string;
}): string {
  switch (property.type) {
    case 'boolean':
      return `_JsonUtils.mapBoolean(data, "${property.name}", false)`;
    case 'double':
      return `_JsonUtils.mapDouble(data, "${property.name}", 0)`;
    case 'float':
      return `_JsonUtils.mapFloat(data, "${property.name}", 0)`;
    case 'int':
      return `_JsonUtils.mapInt(data, "${property.name}", 0)`;
    case 'local-date':
      return `_JsonUtils.mapLocalDate(data, "${property.name}", null)`;
    case 'local-date-time':
      return `_JsonUtils.mapLocalDateTime(data, "${property.name}", null)`;
    case 'long':
      return `_JsonUtils.mapLong(data, "${property.name}", 0)`;
    case 'short':
      return `_JsonUtils.mapShort(data, "${property.name}", (short) 0)`;
    case 'string':
      return `_JsonUtils.mapString(data, "${property.name}", null)`;
    case 'zoned-date-time':
      return `_JsonUtils.mapZonedDateTime(data, "${property.name}", null)`;
  }
}

// CLEANUP

export function generateProperty(
  node: IndentNode,
  property: MKeyProperty | MRevisionProperty | MProperty,
  artifactConfig: JavaRestClientJDKGeneratorConfig,
  fqn: (type: string) => string
) {
  if (isMKeyProperty(property) || isMRevisionProperty(property)) {
    node.append('@Override', NL);
    node.append(
      `public ${builtinToJavaType(property.type, fqn)} ${property.name}() {`,
      NL
    );
    node.indent((methodBody) => {
      methodBody.append(`return ${builtinSimpleJSONAccess(property)};`, NL);
    });
    node.append('}', NL);
  } else {
    node.append('@Override', NL);
    node.append(
      `public ${toType(property, artifactConfig, fqn, property.nullable)} ${
        property.name
      }() {`,
      NL
    );
    node.indent((methodBody) => {
      if (property.array) {
        if (property.variant === 'builtin' && isMBuiltinType(property.type)) {
          methodBody.append(
            `return ${builtinArrayJSONAccess(
              { type: property.type, name: property.name },
              fqn
            )};`,
            NL
          );
        } else if (
          property.variant === 'enum' ||
          property.variant === 'inline-enum' ||
          property.variant === 'scalar'
        ) {
          if (
            property.variant === 'enum' ||
            property.variant === 'inline-enum'
          ) {
            const type =
              typeof property.type === 'string'
                ? property.type
                : toFirstUpper(property.name);
            methodBody.append(
              `return DTOUtils.mapLiterals(data, "${
                property.name
              }", ${resolveType(
                type,
                artifactConfig.nativeTypeSubstitues,
                fqn,
                property.nullable
              )}::valueOf);`,
              NL
            );
          } else if (typeof property.type === 'string') {
            methodBody.append(
              `return DTOUtils.mapLiterals(data, "${
                property.name
              }", ${resolveType(
                property.type,
                artifactConfig.nativeTypeSubstitues,
                fqn,
                property.nullable
              )}::of);`,
              NL
            );
          }
        } else {
          methodBody.append(
            `DTOUtils.mapObjects(data, "${property.name}", ${toType(
              property,
              artifactConfig,
              fqn,
              property.nullable
            )}::of)`,
            NL
          );
        }
      } else {
        if (property.variant === 'builtin' && isMBuiltinType(property.type)) {
          if (property.nullable || property.optional) {
            methodBody.append(
              `return ${builtinOptionalJSONAccess({
                type: property.type,
                name: property.name,
              })};`,
              NL
            );
          } else {
            methodBody.append(
              `return ${builtinSimpleJSONAccess({
                type: property.type,
                name: property.name,
              })};`,
              NL
            );
          }
        } else {
          if (property.nullable || property.optional) {
            if (
              property.variant === 'enum' ||
              property.variant === 'inline-enum' ||
              property.variant === 'scalar'
            ) {
              if (
                property.variant === 'enum' ||
                property.variant === 'inline-enum'
              ) {
                methodBody.append(
                  `return DTOUtils.mapLiteral(data, "${
                    property.name
                  }", ${toType(
                    property,
                    artifactConfig,
                    fqn,
                    property.nullable
                  )}::valueOf, ${toType(
                    property,
                    artifactConfig,
                    fqn,
                    property.nullable
                  )}.values()[0]);`,
                  NL
                );
              } else {
                methodBody.append(
                  `return DTOUtils.mapLiteral(data, "${
                    property.name
                  }", ${toType(
                    property,
                    artifactConfig,
                    fqn,
                    property.nullable
                  )}::of, null);`,
                  NL
                );
              }
            } else {
              methodBody.append(
                `return DTOUtils.mapObject(data, "${property.name}", ${property.type}DTOImpl::of, null);`,
                NL
              );
            }
          } else {
            if (
              property.variant === 'enum' ||
              property.variant === 'inline-enum' ||
              property.variant === 'scalar'
            ) {
              if (
                property.variant === 'enum' ||
                property.variant === 'inline-enum'
              ) {
                methodBody.append(
                  `return DTOUtils.mapLiteral(data, "${
                    property.name
                  }", ${toType(
                    property,
                    artifactConfig,
                    fqn,
                    property.nullable
                  )}::valueOf);`,
                  NL
                );
              } else {
                methodBody.append(
                  `return DTOUtils.mapLiteral(data, "${
                    property.name
                  }", ${toType(
                    property,
                    artifactConfig,
                    fqn,
                    property.nullable
                  )}::of);`,
                  NL
                );
              }
            } else {
              methodBody.append(
                `return DTOUtils.mapObject(data, "${property.name}", ${property.type}DTOImpl::of);`,
                NL
              );
            }
          }
        }
      }
    });
    node.append('}', NL);
  }
}

function builtinArrayJSONAccess(
  property: { type: MBuiltinType; name: string },
  fqn: (type: string) => string
): string {
  switch (property.type) {
    case 'boolean':
      return `DTOUtils.mapBooleans(data, "${property.name}")`;
    case 'double':
      return `DTOUtils.mapDoubles(data, "${property.name}")`;
    case 'float':
      return `DTOUtils.mapFloats(data, "${property.name}")`;
    case 'int':
      return `DTOUtils.mapInts(data, "${property.name}")`;
    case 'local-date':
      return `DTOUtils.mapLiterals(data, "${property.name}", ${fqn(
        'java.time.LocalDate'
      )}::parse)`;
    case 'local-date-time':
      return `DTOUtils.mapLiterals(data, "${property.name}, ${fqn(
        'java.time.LocalDateTime'
      )}::parse)`;
    case 'long':
      return `DTOUtils.mapLongs(data, "${property.name}")`;
    case 'short':
      return `DTOUtils.mapShorts(data, "${property.name}")`;
    case 'string':
      return `DTOUtils.mapStrings(data, "${property.name}")`;
    case 'zoned-date-time':
      return `DTOUtils.mapLiterals(data, "${property.name}, ${fqn(
        'java.time.ZonedDateTime'
      )}::parse)`;
  }
}

function builtinSimpleJSONAccess(property: {
  type: MBuiltinType;
  name: string;
}): string {
  switch (property.type) {
    case 'boolean':
      return `DTOUtils.mapBoolean(data, "${property.name}")`;
    case 'double':
      return `DTOUtils.mapDouble(data, "${property.name}")`;
    case 'float':
      return `DTOUtils.mapFloat(data, "${property.name}")`;
    case 'int':
      return `DTOUtils.mapInt(data, "${property.name}")`;
    case 'local-date':
      return `DTOUtils.mapLocalDate(data, "${property.name}")`;
    case 'local-date-time':
      return `DTOUtils.mapLocalDateTime(data, "${property.name}")`;
    case 'long':
      return `DTOUtils.mapLong(data, "${property.name}")`;
    case 'short':
      return `DTOUtils.mapShort(data, "${property.name}")`;
    case 'string':
      return `DTOUtils.mapString(data, "${property.name}")`;
    case 'zoned-date-time':
      return `DTOUtils.mapZonedDateTime(data, "${property.name}")`;
  }
}

function builtinOptionalJSONAccess(property: {
  type: MBuiltinType;
  name: string;
}): string {
  switch (property.type) {
    case 'boolean':
      return `DTOUtils.mapBoolean(data, "${property.name}", false)`;
    case 'double':
      return `DTOUtils.mapDouble(data, "${property.name}", 0)`;
    case 'float':
      return `DTOUtils.mapFloat(data, "${property.name}", 0)`;
    case 'int':
      return `DTOUtils.mapInt(data, "${property.name}", 0)`;
    case 'local-date':
      return `DTOUtils.mapLocalDate(data, "${property.name}", null)`;
    case 'local-date-time':
      return `DTOUtils.mapLocalDateTime(data, "${property.name}", null)`;
    case 'long':
      return `DTOUtils.mapLong(data, "${property.name}", 0)`;
    case 'short':
      return `DTOUtils.mapShort(data, "${property.name}", (short) 0)`;
    case 'string':
      return `DTOUtils.mapString(data, "${property.name}", null)`;
    case 'zoned-date-time':
      return `DTOUtils.mapZonedDateTime(data, "${property.name}", null)`;
  }
}

export function generateBuilderProperty(
  node: IndentNode,
  property: MKeyProperty | MRevisionProperty | MProperty,
  artifactConfig: JavaRestClientJDKGeneratorConfig,
  fqn: (type: string) => string,
  typePrefix?: string
) {
  if (isMKeyProperty(property) || isMRevisionProperty(property)) {
    node.append('@Override', NL);
    node.append(
      `public ${typePrefix ? `${typePrefix}.` : ''}Builder ${
        property.name
      }(${builtinToJavaType(property.type, fqn)} ${property.name}) {`,
      NL
    );
    node.indent((methodBody) => {
      methodBody.append(`${builtinBuilderAccess(property)};`, NL);
      methodBody.append('return this;', NL);
    });
    node.append('}', NL);
  } else {
    node.append('@Override', NL);
    node.append(
      `public ${typePrefix ? `${typePrefix}.` : ''}Builder ${
        property.name
      }(${toType(property, artifactConfig, fqn, property.nullable)} ${
        property.name
      }) {`,
      NL
    );
    node.indent((methodBody) => {
      if (
        property.optional &&
        !property.nullable &&
        !(isMBuiltinType(property.type) && isJavaPrimitive(property.type))
      ) {
        methodBody.append(`if( ${property.name} == null ) {`, NL);
        methodBody.indent((block) => block.append('return this;', NL));
        methodBody.append('}', NL);
      }
      if (
        property.nullable &&
        !(isMBuiltinType(property.type) && isJavaPrimitive(property.type))
      ) {
        methodBody.append(`if( ${property.name} == null ) {`, NL);
        methodBody.indent((block) => {
          block.append(`$builder.addNull("${property.name}");`, NL);
          block.append('return this;', NL);
        });
        methodBody.append('}', NL);
      }
      if (property.array) {
        if (property.variant === 'builtin' && isMBuiltinType(property.type)) {
          methodBody.append(
            `${builtinBuilderArrayJSONAccess({
              type: property.type,
              name: property.name,
            })});`,
            NL
          );
        } else if (
          property.variant === 'enum' ||
          property.variant === 'inline-enum' ||
          property.variant === 'scalar'
        ) {
          methodBody.append(
            `$builder.add("${property.name}", DTOUtils.toJsonLiteralArray(${property.name}));`,
            NL
          );
        } else {
          methodBody.append(
            `$builder.add("${property.name}", DTOUtils.toJsonObjectArray(${property.name}));`,
            NL
          );
        }
      } else {
        if (property.variant === 'builtin' && isMBuiltinType(property.type)) {
          methodBody.append(
            `${builtinBuilderAccess({
              type: property.type,
              name: property.name,
            })};`,
            NL
          );
        } else if (
          property.variant === 'enum' ||
          property.variant === 'inline-enum' ||
          property.variant === 'scalar'
        ) {
          methodBody.append(
            `$builder.add("${property.name}", ${property.name}.toString());`,
            NL
          );
        } else {
          methodBody.append(
            `$builder.add("${property.name}", ((BaseDTOImpl)${property.name}).data);`,
            NL
          );
        }
      }
      methodBody.append('return this;', NL);
    });
    node.append('}', NL);
  }
}

export function builtinBuilderArrayJSONAccess(property: {
  type: MBuiltinType;
  name: string;
}): string {
  switch (property.type) {
    case 'boolean':
      return `$builder.add("${property.name}", DTOUtils.toJsonBooleanArray(${property.name})`;
    case 'double':
      return `$builder.add("${property.name}", DTOUtils.toJsonDoubleArray(${property.name})`;
    case 'float':
      return `$builder.add("${property.name}", DTOUtils.toJsonFloatArray(${property.name})`;
    case 'int':
      return `$builder.add("${property.name}", DTOUtils.toJsonIntArray(${property.name})`;
    case 'local-date':
      return `$builder.add("${property.name}", DTOUtils.toJsonLiteralArray(${property.name})`;
    case 'local-date-time':
      return `$builder.add("${property.name}", DTOUtils.toJsonLiteralArray(${property.name})::toString)`;
    case 'long':
      return `$builder.add("${property.name}", DTOUtils.toJsonLongArray(${property.name})`;
    case 'short':
      return `$builder.add("${property.name}", DTOUtils.toJsonShortArray(${property.name})`;
    case 'string':
      return `$builder.add("${property.name}", DTOUtils.toJsonStringArray(${property.name})`;
    case 'zoned-date-time':
      return `$builder.add("${property.name}", DTOUtils.toJsonLiteralArray(${property.name})`;
  }
}

export function builtinBuilderAccess(property: {
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

function isJavaPrimitive(type: MBuiltinType) {
  switch (type) {
    case 'boolean':
    case 'double':
    case 'float':
    case 'int':
    case 'long':
    case 'short':
      return true;
  }
  return false;
}
