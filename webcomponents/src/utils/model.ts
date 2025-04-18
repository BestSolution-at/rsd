import { isDefined, isObject } from './util.js';

export type MBuiltinType = 'boolean' | 'double' | 'float' | 'int' | 'local-date' | 'local-date-time' | 'long' | 'short' | 'string' | 'zoned-date-time';

export function isMBuiltinType(value: unknown): value is MBuiltinType {
  return (
    value === 'boolean' ||
    value === 'double' ||
    value === 'float' ||
    value === 'int' ||
    value === 'local-date' ||
    value === 'local-date-time' ||
    value === 'long' ||
    value === 'short' ||
    value === 'string' ||
    value === 'zoned-date-time'
  );
}

export type MRSDModel<T extends MUserType = MUserType, S extends MService = MService> = {
  '@type': 'RSDModel';
  'elements': readonly T[];
  'services': readonly S[];
  'errors': readonly MError[];
};

export type MResolvedRSDModel = MRSDModel<MResolvedUserType, MResolvedService>;

export function isMRSDModel(value: unknown): value is MRSDModel {
  return isObject(value) && '@type' in value && value['@type'] === 'RSDModel';
}

export type MBaseProperty = MKeyProperty | MRevisionProperty | MProperty;
export type MUserType = MUnionType | MMixinType | MRecordType | MEnumType | MScalarType;
export type MResolvedUserType = MResolvedUnionType | MResolvedMixinType | MResolvedRecordType | MResolvedEnumType | MResolvedScalarType;

export type MScalarType = {
  '@type': 'ScalarType';
  'name': string;
  'doc': string;
};

export type MResolvedScalarType = MScalarType;

export function isMScalarType(value: unknown): value is MScalarType {
  return isObject(value) && '@type' in value && value['@type'] === 'ScalarType';
}

export type MUnionType = {
  '@type': 'UnionType';
  'name': string;
  'patchable': boolean;
  'types': readonly string[];
  'descriminator': string;
  'descriminatorAliases'?: Record<string, string>;
  'doc': string;
};

export type MResolvedUnionType = MUnionType & {
  resolved: {
    records: readonly MResolvedRecordType[];
    sharedProps: readonly MResolvedBaseProperty[];
  };
};

export type MResolvedBaseProperty = MBaseProperty & {
  resolved: {
    owner: MResolvedMixinType | MResolvedRecordType;
    resolvedObjectType: MResolvedUnionType | MResolvedRecordType | undefined;
  };
};

export function isMUnionType(value: unknown): value is MUnionType {
  return isObject(value) && '@type' in value && value['@type'] === 'UnionType';
}

export function isMResolvedUnionType(value: unknown): value is MResolvedUnionType {
  return isMUnionType(value) && 'resolved' in value && isObject(value.resolved);
}

export type MMixinType = {
  '@type': 'MixinType';
  'name': string;
  'properties': readonly MBaseProperty[];
  'doc': string;
};

export type MResolvedMixinType = MMixinType & {
  resolved: {
    records: readonly MResolvedRecordType[];
    properties: readonly MResolvedBaseProperty[];
  };
};

export function isMMixinType(value: unknown): value is MMixinType {
  return isObject(value) && '@type' in value && value['@type'] === 'MixinType';
}

export type MRecordType = {
  '@type': 'RecordType';
  'name': string;
  'patchable': boolean;
  'mixins': readonly string[];
  'properties': readonly MBaseProperty[];
  'doc': string;
};

export type MResolvedRecordType = MRecordType & {
  resolved: {
    mixins: readonly MResolvedMixinType[];
    unions: readonly MResolvedUnionType[];
    properties: readonly MResolvedBaseProperty[];
  };
};

export function isMRecordType(value: unknown): value is MRecordType {
  return isObject(value) && '@type' in value && value['@type'] === 'RecordType';
}

export function isMResolvedRecordType(value: unknown): value is MResolvedRecordType {
  return isMRecordType(value) && 'resolved' in value && isObject(value.resolved);
}

export type MKeyProperty = {
  '@type': 'KeyProperty';
  'name': string;
  'type': MBuiltinType;
  'doc': string;
};

export function isMKeyProperty(value: unknown): value is MKeyProperty {
  return isObject(value) && '@type' in value && value['@type'] === 'KeyProperty';
}

export type MRevisionProperty = {
  '@type': 'RevisionProperty';
  'name': string;
  'type': MBuiltinType;
  'doc': string;
};

export function isMRevisionProperty(value: unknown): value is MRevisionProperty {
  return isObject(value) && '@type' in value && value['@type'] === 'RevisionProperty';
}

export type MProperty = {
  '@type': 'Property';
  'name': string;
  'array': boolean;
  'arrayMaxLength'?: number;
  'readonly': boolean;
  'optional': boolean;
  'nullable': boolean;
  'variant': 'enum' | 'builtin' | 'scalar' | 'union' | 'record' | 'inline-enum';
  'type': string | MInlineEnumType;
  'doc': string;
};

export type MResolvedPropery = MProperty & MResolvedBaseProperty;

export function isMProperty(value: unknown): value is MProperty {
  return isObject(value) && '@type' in value && value['@type'] === 'Property';
}

export function isMResolvedProperty(value: unknown): value is MResolvedPropery {
  return isObject(value) && '@type' in value && value['@type'] === 'Property' && 'resolved' in value;
}

export type MEnumType = {
  '@type': 'EnumType';
  'name': string;
  'entries': readonly MEnumEntry[];
  'doc': string;
};

export type MResolvedEnumType = MEnumType;

export function isMEnumType(value: unknown): value is MEnumType {
  return isObject(value) && '@type' in value && value['@type'] === 'EnumType';
}

export type MInlineEnumType = {
  '@type': 'InlineEnumType';
  'entries': readonly MEnumEntry[];
};

export function isMInlineEnumType(value: unknown): value is MInlineEnumType {
  return isObject(value) && '@type' in value && value['@type'] === 'InlineEnumType';
}

export type MEnumEntry = {
  '@type': 'EnumEntry';
  'name': string;
  'value'?: number;
};

export function isMEnumEntry(value: unknown): value is MEnumEntry {
  return isObject(value) && '@type' in value && value['@type'] === 'EnumEntry';
}

export type MService<O extends MOperation = MOperation> = {
  '@type': 'Service';
  'name': string;
  'doc': string;
  'operations': readonly O[];
  'meta'?: {
    rest?: {
      path: string;
    };
  };
};

export type MResolvedService = MService<MResolvedOperation>;

export type MOperation = {
  '@type': 'Operation';
  'name': string;
  'doc': string;
  'parameters': readonly MParameter[];
  'resultType'?: MReturnType;
  /**
   * @deprecated use operationErrors
   */
  'errors': string[];
  'operationErrors': MOperationError[];
  'meta'?: {
    rest?: {
      path: string;
      method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
      results: {
        statusCode: number;
        error?: string;
      }[];
    };
  };
};

export type MOperationError = {
  '@type': 'OperationError';
  'error': string;
  'doc': string;
};

export type MResolvedOperation = MOperation & {
  resolved: {
    errors: MError[];
  };
};

export type MParameter = {
  '@type': 'Parameter';
  'name': string;
  'patch': boolean;
  'array': boolean;
  'arrayMaxLength'?: number;
  'optional': boolean;
  'nullable': boolean;
  'variant': 'enum' | 'builtin' | 'scalar' | 'union' | 'record' | 'inline-enum';
  'type': string | MInlineEnumType;
  'doc': string;
  'meta'?: {
    rest?: {
      source: 'path' | 'header' | 'query' | 'cookie';
      name: string;
    };
  };
};

export type MReturnType = {
  '@type': 'ReturnType';
  'variant': 'enum' | 'builtin' | 'scalar' | 'union' | 'record' | 'inline-enum';
  'type': string | MInlineEnumType;
  'array': boolean;
  'arrayMaxLength'?: number;
  'doc': string;
};

export type MError = {
  '@type': 'Error';
  'name': string;
};

export function resolve(model: MRSDModel): MResolvedRSDModel {
  const solvedMixins = new Map<string, MResolvedMixinType>();
  const solvedRecords = new Map<string, MResolvedRecordType>();
  const solvedUnions = new Map<string, MResolvedUnionType>();
  return {
    ...model,
    elements: model.elements.map(t => mapToResolved(t, model, solvedMixins, solvedRecords, solvedUnions)),
    services: model.services.map(s => mapToResolvedService(s, model)),
  };
}

function mapToResolved(
  t: MUserType,
  model: MRSDModel,
  solvedMixins: Map<string, MResolvedMixinType>,
  solvedRecords: Map<string, MResolvedRecordType>,
  solvedUnions: Map<string, MResolvedUnionType>,
): MResolvedUserType {
  if (isMMixinType(t)) {
    return mapToResolvedMixinType(t, model, solvedMixins, solvedRecords, solvedUnions);
  } else if (isMRecordType(t)) {
    return mapToResolvedRecordType(t, model, solvedMixins, solvedRecords, solvedUnions);
  } else if (isMUnionType(t)) {
    return mapToResolvedUnionType(t, model, solvedMixins, solvedRecords, solvedUnions);
  } else if (isMEnumType(t)) {
    return t;
  } else if (isMScalarType(t)) {
    return t;
  }
  throw new Error(String(t['@type']));
}

function mapToResolvedMixinType(
  t: MMixinType,
  model: MRSDModel,
  solvedMixins: Map<string, MResolvedMixinType>,
  solvedRecords: Map<string, MResolvedRecordType>,
  solvedUnions: Map<string, MResolvedUnionType>,
): MResolvedMixinType {
  const solved = solvedMixins.get(t.name);
  if (solved) {
    return solved;
  }

  const records: MResolvedRecordType[] = [];
  const rv: MResolvedMixinType = {
    ...t,
    resolved: {
      records,
      properties: [],
    },
  };

  rv.resolved.properties = t.properties.map(p => ({
    ...p,
    resolved: {
      owner: rv,
      resolvedObjectType: solvedUnions.get(String(p.type)) ?? solvedRecords.get(String(p.type)),
    },
  }));
  rv.properties = rv.resolved.properties; // This is bogus and looks like a bug

  solvedMixins.set(t.name, rv);

  const resolvedRecords = model.elements
    .filter(isMRecordType)
    .filter(r => r.mixins.includes(t.name))
    .map(r => mapToResolvedRecordType(r, model, solvedMixins, solvedRecords, solvedUnions));

  records.push(...resolvedRecords);

  return rv;
}

function mapToResolvedRecordType(
  t: MRecordType,
  model: MRSDModel,
  solvedMixins: Map<string, MResolvedMixinType>,
  solvedRecords: Map<string, MResolvedRecordType>,
  solvedUnions: Map<string, MResolvedUnionType>,
): MResolvedRecordType {
  const solved = solvedRecords.get(t.name);
  if (solved) {
    return solved;
  }

  const mixins: MResolvedMixinType[] = [];
  const unions: MResolvedUnionType[] = [];

  const rv: MResolvedRecordType = {
    ...t,
    resolved: {
      mixins,
      unions,
      properties: [],
    },
  };

  rv.resolved.properties = t.properties.map(p => ({
    ...p,
    resolved: {
      owner: rv,
      resolvedObjectType: solvedUnions.get(String(p.type)) ?? solvedRecords.get(String(p.type)),
    },
  }));
  rv.properties = rv.resolved.properties;

  solvedRecords.set(t.name, rv);

  const resolvedMixins = model.elements
    .filter(isMMixinType)
    .filter(m => t.mixins.includes(m.name))
    .map(m => mapToResolvedMixinType(m, model, solvedMixins, solvedRecords, solvedUnions));
  mixins.push(...resolvedMixins);

  const resolvedUnions = model.elements
    .filter(isMUnionType)
    .filter(u => u.types.includes(t.name))
    .map(u => mapToResolvedUnionType(u, model, solvedMixins, solvedRecords, solvedUnions));

  unions.push(...resolvedUnions);

  return rv;
}

function mapToResolvedUnionType(
  t: MUnionType,
  model: MRSDModel,
  solvedMixins: Map<string, MResolvedMixinType>,
  solvedRecords: Map<string, MResolvedRecordType>,
  solvedUnions: Map<string, MResolvedUnionType>,
): MResolvedUnionType {
  const solved = solvedUnions.get(t.name);
  if (solved) {
    return solved;
  }

  const records: MResolvedRecordType[] = [];
  const sharedProps: MResolvedBaseProperty[] = [];

  const rv: MResolvedUnionType = {
    ...t,
    resolved: {
      records,
      sharedProps,
    },
  };

  solvedUnions.set(t.name, rv);

  const resolvedRecords = model.elements
    .filter(isMRecordType)
    .filter(r => t.types.includes(r.name))
    .map(r => mapToResolvedRecordType(r, model, solvedMixins, solvedRecords, solvedUnions));
  records.push(...resolvedRecords);

  const allProperties = resolvedRecords.flatMap(r => {
    return allResolvedRecordProperties(r);
  });

  const groupCount = new Map<string, MResolvedBaseProperty[]>();

  allProperties.forEach(p => {
    const key = `${p.name}#${p.type}`;
    const data = groupCount.get(key);
    if (data) {
      data.push(p);
    } else {
      groupCount.set(key, [p]);
    }
  });

  groupCount.forEach(e => {
    if (e.length === resolvedRecords.length) {
      sharedProps.push(e[0]);
    }
  });

  return rv;
}

function mapToResolvedService(m: MService, model: MRSDModel): MResolvedService {
  return {
    ...m,
    operations: m.operations.map(o => mapToResolvedOperation(o, model)),
  };
}

function mapToResolvedOperation(o: MOperation, model: MRSDModel): MResolvedOperation {
  return {
    ...o,
    resolved: {
      errors: o.errors.map(e => model.errors.find(err => err.name === e)).filter(isDefined),
    },
  };
}

export function allRecordProperties(record: MResolvedRecordType) {
  const properties = [...record.properties, ...record.resolved.mixins.flatMap(m => m.properties)];

  return properties;
}

export function allResolvedRecordProperties(record: MResolvedRecordType) {
  const properties = [...record.resolved.properties, ...record.resolved.mixins.flatMap(m => m.resolved.properties)];

  return properties;
}
