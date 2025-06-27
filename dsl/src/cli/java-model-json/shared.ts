import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
  isMBuiltinType,
  isMInlineEnumType,
  isMKeyProperty,
  isMResolvedUnionType,
  isMRevisionProperty,
  MBuiltinType,
  MResolvedBaseProperty,
  MResolvedPropery,
  MResolvedRecordType,
} from '../model.js';
import { computeAPIType, primitiveToObject } from '../java-gen-utils.js';
import { BuiltinType } from '../../language/generated/ast.js';

export function generatePropertyNG(
  owner: MResolvedRecordType,
  prop: MResolvedBaseProperty,
  nativeTypeSubstitues: Record<string, string> | undefined,
  interfaceBasePackage: string,
  fqn: (type: string) => string
) {
  const type = computeAPIType(
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

export function builtinSimpleJSONAccessNG(property: {
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

export function builtinSimpleJSONArrayAccess(property: {
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

export function builtinOptionalJSONAccessNG(property: {
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

export function builtinBuilderArrayJSONAccess(property: {
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

function generatePatchPropertyAccessorContent_Builtin(property: {
  type: BuiltinType;
  name: string;
  array: boolean;
}) {
  const type = property.type;
  const methodBody = new CompositeGeneratorNode();
  methodBody.append(
    'return ',
    property.array
      ? builtinNilArrayJSONAccess({ type, name: property.name })
      : builtinNilJSONAccess({ type, name: property.name }),
    ';',
    NL
  );
  return methodBody;
}

function generatePatchPropertyAccessorContent_Scalar(
  property: MResolvedPropery,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const Type = computeAPIType(
    property,
    nativeTypeSubstitues,
    basePackageName,
    fqn,
    true
  );
  const methodBody = new CompositeGeneratorNode();
  if (property.array) {
    methodBody.append(
      `return _JsonUtils.mapNilLiterals(data, "${property.name}", ${Type}::of );`,
      NL
    );
  } else {
    methodBody.append(
      `return _JsonUtils.mapNilLiteral(data, "${property.name}", ${Type}::of );`,
      NL
    );
  }
  return methodBody;
}

function generatePatchPropertyAccessor_NoRecord(
  property: MResolvedPropery,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  const type = primitiveToObject(
    computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn)
  );
  if (property.optional || property.nullable) {
    const _Base = fqn(basePackageName + '._Base');
    node.append(`public ${_Base}.Nillable<${type}> ${property.name}() {`, NL);
    if (typeof property.type === 'string') {
      const type = property.type;
      if (isMBuiltinType(type)) {
        node.indent((methodBody) => {
          methodBody.append(
            generatePatchPropertyAccessorContent_Builtin({
              array: property.array,
              type: type,
              name: property.name,
            })
          );
        });
      } else if (property.variant === 'scalar') {
        node.indent((methodBody) => {
          methodBody.append(
            generatePatchPropertyAccessorContent_Scalar(
              property,
              nativeTypeSubstitues,
              basePackageName,
              fqn
            )
          );
        });
      } else if (property.variant === 'enum') {
        node.indent((methodBody) => {
          if (property.array) {
            methodBody.append(
              `return _JsonUtils.mapNilLiterals(data, "${property.name}", ${property.type}::valueOf);`,
              NL
            );
          } else {
            methodBody.append(
              `return _JsonUtils.mapNilLiteral(data, "${property.name}", ${property.type}::valueOf);`,
              NL
            );
          }
        });
      }
    } else {
      const Type = computeAPIType(
        property,
        nativeTypeSubstitues,
        basePackageName,
        fqn,
        true
      );
      node.indent((methodBody) => {
        if (property.array) {
          methodBody.append(
            `return _JsonUtils.mapNilLiterals(data, "${property.name}", ${Type}::valueOf)`,
            NL
          );
        } else {
          methodBody.append(
            `return _JsonUtils.mapNilLiteral(data, "${property.name}", ${Type}::valueOf)`,
            NL
          );
        }
      });
    }
    node.append('}', NL);
  } else {
    const Optional = fqn('java.util.Optional');
    node.append(`public ${Optional}<${type}> ${property.name}() {`, NL);
    if (typeof property.type === 'string') {
      const type = property.type;
      if (isMBuiltinType(type)) {
        node.indent((methodBody) => {
          methodBody.append(
            'return ',
            property.array
              ? builtinOptArrayJSONAccess({ type, name: property.name })
              : builtinOptJSONAccess({ type, name: property.name }),
            ';',
            NL
          );
        });
      } else if (property.variant === 'scalar') {
        const Type = computeAPIType(
          property,
          nativeTypeSubstitues,
          basePackageName,
          fqn,
          true
        );
        node.indent((methodBody) => {
          if (property.array) {
            methodBody.append(
              `return _JsonUtils.mapOptLiterals(data, "${property.name}", ${Type}::of);`,
              NL
            );
          } else {
            methodBody.append(
              `return _JsonUtils.mapOptLiteral(data, "${property.name}", ${Type}::of);`,
              NL
            );
          }
        });
      } else if (property.variant === 'enum') {
        node.indent((methodBody) => {
          if (property.array) {
            methodBody.append(
              `return _JsonUtils.mapOptLiterals(data, "${property.name}", ${property.type}::valueOf);`,
              NL
            );
          } else {
            methodBody.append(
              `return _JsonUtils.mapOptLiteral(data, "${property.name}", ${property.type}::valueOf);`,
              NL
            );
          }
        });
      }
    } else {
      const Type = computeAPIType(
        property,
        nativeTypeSubstitues,
        basePackageName,
        fqn,
        true
      );
      node.indent((methodBody) => {
        if (property.array) {
          methodBody.append(
            `return _JsonUtils.mapOptLiterals(data, "${property.name}", ${Type}::valueOf);`,
            NL
          );
        } else {
          methodBody.append(
            `return _JsonUtils.mapOptLiteral(data, "${property.name}", ${Type}::valueOf);`,
            NL
          );
        }
      });
    }

    node.append('}', NL);
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
    node.append(
      generatePatchPropertyAccessor_NoRecord(
        property,
        nativeTypeSubstitues,
        basePackageName,
        fqn
      )
    );
  } else {
    const type = computeAPIType(
      property,
      nativeTypeSubstitues,
      basePackageName,
      fqn
    );
    if (property.optional || property.nullable) {
      const _Base = fqn(basePackageName + '._Base');
      node.append(`public ${_Base}.Nillable<${type}> ${property.name}() {`, NL);
      node.indent((methodBody) => {
        if (property.array) {
          methodBody.append(
            `return _JsonUtils.mapNilObjects(data, "${property.name}", ${property.type}DataImpl::of);`,
            NL
          );
        } else {
          methodBody.append(
            `return _JsonUtils.mapNilObject(data, "${property.name}", ${property.type}DataImpl::of);`,
            NL
          );
        }
      });
      node.append('}', NL);
    } else {
      const Optional = fqn('java.util.Optional');
      node.append(`public ${Optional}<${type}> ${property.name}() {`, NL);
      node.indent((methodBody) => {
        if (property.array) {
          methodBody.append(
            `return _JsonUtils.mapOptObjects(data, "${property.name}", ${property.type}DataImpl::of);`,
            NL
          );
        } else {
          methodBody.append(
            `return _JsonUtils.mapOptObject(data, "${property.name}", ${property.type}DataImpl::of);`,
            NL
          );
        }
      });
      node.append('}', NL);
    }
  }

  return node;
}

function generatePatchBuilderPropertyAccessor_NoRecord(
  property: MResolvedPropery,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  let type = computeAPIType(
    property,
    nativeTypeSubstitues,
    basePackageName,
    fqn
  );

  if (property.optional || property.nullable) {
    type = primitiveToObject(type);
  }

  const node = new CompositeGeneratorNode();
  node.append('@Override', NL);
  node.append(
    `public PatchBuilder ${property.name}(${type} ${property.name}) {`,
    NL
  );

  if (property.optional || property.nullable) {
    node.indent((methodBody) => {
      methodBody.append(`if (${property.name} == null) {`, NL);
      methodBody.indent((block) => {
        block.append(`$builder.addNull("${property.name}");`, NL);
        block.append('return this;', NL);
      });
      methodBody.append('}', NL);
    });
  }

  let content: string;
  if (property.variant === 'builtin' && isMBuiltinType(property.type)) {
    if (property.array) {
      content = builtinBuilderArrayJSONAccess({
        type: property.type,
        name: property.name,
      });
    } else {
      content = builtinBuilderAccess({
        type: property.type,
        name: property.name,
      });
    }
  } else if (property.variant === 'scalar') {
    if (property.array) {
      content = `$builder.add("${property.name}", _JsonUtils.toJsonLiteralArray(${property.name}))`;
    } else {
      content = `$builder.add("${property.name}", ${property.name}.toString())`;
    }
  }
  node.indent((methodBody) => {
    methodBody.append(content, ';', NL);
    methodBody.append('return this;', NL);
  });

  node.append('}', NL);

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
    node.append(
      generatePatchBuilderPropertyAccessor_NoRecord(
        property,
        nativeTypeSubstitues,
        basePackageName,
        fqn
      )
    );
  } else {
    let type = computeAPIType(
      property,
      nativeTypeSubstitues,
      basePackageName,
      fqn
    );
    node.append('@Override', NL);
    node.append(
      `public PatchBuilder ${property.name}(${type} ${property.name}) {`,
      NL
    );

    if (property.optional || property.nullable) {
      node.indent((methodBody) => {
        methodBody.append(`if (${property.name} == null) {`, NL);
        methodBody.indent((block) => {
          block.append(`$builder.addNull("${property.name}");`, NL);
          block.append('return this;', NL);
        });
        methodBody.append('}', NL);
      });
    }

    let content: string;
    if (property.array) {
      content = `$builder.add("${property.name}", _JsonUtils.toJsonValueArray(${property.name}, $e -> ((_BaseDataImpl) $e).data))`;
    } else {
      content = `$builder.add("${property.name}", ((_BaseDataImpl) ${property.name}).data)`;
    }

    node.indent((methodBody) => {
      methodBody.append(content, ';', NL);
      methodBody.append('return this;', NL);
    });

    node.append('}', NL);
    if (!property.array) {
      const Function = fqn('java.util.function.Function');
      node.append(
        NL,
        `public <T extends ${property.type}.DataBuilder> PatchBuilder withRepeat(Class<T> clazz, ${Function}<T, ${type}> block) {`,
        NL
      );
      node.indent((methodBody) => {
        if (isMResolvedUnionType(property.resolved.resolvedObjectType)) {
          methodBody.append(`${property.type}.DataBuilder b;`, NL);
          property.resolved.resolvedObjectType.types.forEach((e, idx) => {
            if (idx > 0) {
              methodBody.append(' else ');
            }
            const Type = fqn(`${basePackageName}.${e}`);
            methodBody.append(`if (clazz == ${Type}.DataBuilder.class) {`, NL);
            methodBody.indent((block) => {
              block.append(`b = ${e}DataImpl.builder();`, NL);
            });
            methodBody.append('}');
          });
          methodBody.append(' else {', NL);
          methodBody.indent((block) => {
            block.append(
              'throw new IllegalArgumentException("Unknown builder type %s".formatted(clazz));',
              NL
            );
          });
          methodBody.append('}', NL);
        } else {
          methodBody.append(
            `${property.type}.DataBuilder b = ${property.type}.DataBuilder.builder();`,
            NL
          );
        }

        methodBody.append(`return repeat(block.apply(clazz.cast(b)));`, NL);
      });
      node.append('}', NL);
    }
  }
  return node;
}

export function builtinOptJSONAccess(property: {
  type: MBuiltinType;
  name: string;
}): string {
  switch (property.type) {
    case 'boolean':
      return `_JsonUtils.mapOptBoolean(data, "${property.name}")`;
    case 'double':
      return `_JsonUtils.mapOptDouble(data, "${property.name}")`;
    case 'float':
      return `_JsonUtils.mapOptFloat(data, "${property.name}")`;
    case 'int':
      return `_JsonUtils.mapOptInt(data, "${property.name}")`;
    case 'local-date':
      return `_JsonUtils.mapOptLocalDate(data, "${property.name}")`;
    case 'local-date-time':
      return `_JsonUtils.mapOptLocalDateTime(data, "${property.name}")`;
    case 'long':
      return `_JsonUtils.mapOptLong(data, "${property.name}")`;
    case 'short':
      return `_JsonUtils.mapOptShort(data, "${property.name}")`;
    case 'string':
      return `_JsonUtils.mapOptString(data, "${property.name}")`;
    case 'zoned-date-time':
      return `_JsonUtils.mapOptZonedDateTime(data, "${property.name}")`;
  }
}

export function builtinOptArrayJSONAccess(property: {
  type: MBuiltinType;
  name: string;
}): string {
  switch (property.type) {
    case 'boolean':
      return `_JsonUtils.mapOptBooleans(data, "${property.name}")`;
    case 'double':
      return `_JsonUtils.mapOptDoubles(data, "${property.name}")`;
    case 'float':
      return `_JsonUtils.mapOptFloats(data, "${property.name}")`;
    case 'int':
      return `_JsonUtils.mapOptInts(data, "${property.name}")`;
    case 'local-date':
      return `_JsonUtils.mapOptLocalDates(data, "${property.name}")`;
    case 'local-date-time':
      return `_JsonUtils.mapOptLocalDateTimes(data, "${property.name}")`;
    case 'long':
      return `_JsonUtils.mapOptLongs(data, "${property.name}")`;
    case 'short':
      return `_JsonUtils.mapOptShorts(data, "${property.name}")`;
    case 'string':
      return `_JsonUtils.mapOptStrings(data, "${property.name}")`;
    case 'zoned-date-time':
      return `_JsonUtils.mapOptZonedDateTimes(data, "${property.name}")`;
  }
}

export function builtinNilJSONAccess(property: {
  type: MBuiltinType;
  name: string;
}): string {
  switch (property.type) {
    case 'boolean':
      return `_JsonUtils.mapNilBoolean(data, "${property.name}")`;
    case 'double':
      return `_JsonUtils.mapNilDouble(data, "${property.name}")`;
    case 'float':
      return `_JsonUtils.mapNilFloat(data, "${property.name}")`;
    case 'int':
      return `_JsonUtils.mapNilInt(data, "${property.name}")`;
    case 'local-date':
      return `_JsonUtils.mapNilLocalDate(data, "${property.name}")`;
    case 'local-date-time':
      return `_JsonUtils.mapNilLocalDateTime(data, "${property.name}")`;
    case 'long':
      return `_JsonUtils.mapNilLong(data, "${property.name}")`;
    case 'short':
      return `_JsonUtils.mapNilShort(data, "${property.name}")`;
    case 'string':
      return `_JsonUtils.mapNilString(data, "${property.name}")`;
    case 'zoned-date-time':
      return `_JsonUtils.mapNilZonedDateTime(data, "${property.name}")`;
  }
}

export function builtinNilArrayJSONAccess(property: {
  type: MBuiltinType;
  name: string;
}): string {
  switch (property.type) {
    case 'boolean':
      return `_JsonUtils.mapNilBooleans(data, "${property.name}")`;
    case 'double':
      return `_JsonUtils.mapNilDoubles(data, "${property.name}")`;
    case 'float':
      return `_JsonUtils.mapNilFloats(data, "${property.name}")`;
    case 'int':
      return `_JsonUtils.mapNilInts(data, "${property.name}")`;
    case 'local-date':
      return `_JsonUtils.mapNilLocalDates(data, "${property.name}")`;
    case 'local-date-time':
      return `_JsonUtils.mapNilLocalDateTimes(data, "${property.name}")`;
    case 'long':
      return `_JsonUtils.mapNilLongs(data, "${property.name}")`;
    case 'short':
      return `_JsonUtils.mapNilShorts(data, "${property.name}")`;
    case 'string':
      return `_JsonUtils.mapNilStrings(data, "${property.name}")`;
    case 'zoned-date-time':
      return `_JsonUtils.mapNilZonedDateTimes(data, "${property.name}")`;
  }
}
