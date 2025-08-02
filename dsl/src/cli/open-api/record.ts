import {
  allResolvedRecordProperties,
  isMBuiltinType,
  isMInlineEnumType,
  isMKeyProperty,
  isMResolvedProperty,
  isMRevisionProperty,
  MBuiltinType,
  MResolvedBaseProperty,
  MResolvedPropery,
  MResolvedRecordType,
} from '../model.js';

export function generateRecordContent(t: MResolvedRecordType) {
  const rv: Record<string, unknown> = {};
  const allProps = allResolvedRecordProperties(t);

  {
    const properties: Record<string, unknown> = {};
    allProps.forEach((p) => {
      properties[p.name] = generateProperty(p);
    });

    if (t.resolved.unions.length > 0) {
      properties['@type'] = {
        type: 'string',
      };
    }

    const required = allProps
      .filter((p) => isMKeyProperty(p) || isMRevisionProperty(p) || !p.optional)
      .map((p) => p.name);

    rv[t.name] = {
      type: 'object',
      properties,
      required,
    };
  }

  if (t.patchable) {
    const properties: Record<string, unknown> = {};
    allProps.filter(isMResolvedProperty).forEach((p) => {
      properties[p.name] = generatePatchProperty(p);
    });
    rv[`${t.name}Patch`] = {
      type: 'object',
      properties,
    };
  }
  return rv;
}

function generatePatchProperty(p: MResolvedPropery) {
  const rv = generateProperty(p);
  if (p.optional) {
    rv['nullable'] = true;
  }
  return rv;
}

function generateProperty(p: MResolvedBaseProperty): Record<string, unknown> {
  if (isMKeyProperty(p) || isMRevisionProperty(p)) {
    return generateBuilinProperty(p.type);
  } else if (isMBuiltinType(p.type)) {
    return wrapToArray(generateBuilinProperty(p.type), p.array);
  } else if (
    p.variant === 'record' ||
    p.variant === 'union' ||
    p.variant === 'enum'
  ) {
    const type = {
      $ref: `#/components/schemas/${p.type}`,
    };
    return wrapToArray(type, p.array);
  } else if (p.variant === 'scalar') {
    const type = { type: 'string' };
    return wrapToArray(type, p.array);
  } else if (p.variant === 'inline-enum' && isMInlineEnumType(p.type)) {
    const type = {
      type: 'string',
      enum: p.type.entries.map((e) => e.name),
    };
    return wrapToArray(type, p.array);
  }
  return {
    type: 'err',
  };
}

function wrapToArray(type: Record<string, unknown>, array: boolean) {
  if (array) {
    return {
      type: 'array',
      items: type,
    };
  }
  return type;
}

export function generateBuilinProperty(t: MBuiltinType) {
  if (t === 'string') {
    return {
      type: 'string',
    };
  } else if (t === 'boolean') {
    return {
      type: 'boolean',
    };
  } else if (t === 'double') {
    return {
      type: 'number',
      format: 'double',
    };
  } else if (t === 'float') {
    return {
      type: 'number',
      format: 'float',
    };
  } else if (t === 'int' || t === 'short') {
    return {
      type: 'number',
      format: 'int32',
    };
  } else if (t === 'long') {
    return {
      type: 'number',
      format: 'int64',
    };
  } else if (t === 'local-date') {
    return {
      type: 'string',
      pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\d',
      format: 'date',
    };
  } else if (t === 'local-date-time') {
    return {
      type: 'string',
      pattern: '\\d\\d\\d\\d-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d',
      format: 'local-date-time',
    };
  } else if (t === 'zoned-date-time') {
    return {
      type: 'string',
      format: 'zoned-date-time',
    };
  }
  return {};
}
