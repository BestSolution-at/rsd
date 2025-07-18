import {
  UserType,
  type RSDModel,
  isEnumType,
  EnumType,
  EnumEntry,
  MixinType,
  isMixinType,
  KeyProperty,
  RevisionProperty,
  Property,
  RecordType,
  isRecordType,
  UnionType,
  isUnionType,
  ScalarType,
  isScalarType,
  Service,
  Operation,
  Parameter,
  NamedType,
  ReturnType,
  RSDRestModel,
  RSDResource,
  EnpointPoint,
  ErrorType,
} from '../language/generated/ast.js';

import * as fs from 'node:fs';
import * as path from 'node:path';
import { extractDestinationAndName } from './cli-util.js';
import {
  MEnumEntry,
  MEnumType,
  MError,
  MInlineEnumType,
  MKeyProperty,
  MMixinType,
  MOperation,
  MParameter,
  MProperty,
  MRSDModel,
  MRecordType,
  MReturnType,
  MRevisionProperty,
  MScalarType,
  MService,
  MUnionType,
  MUserType,
} from './model.js';
import { isDefined } from './util.js';

export type Models = {
  model: RSDModel;
  restModel?: RSDRestModel;
};

export function generateJSON(
  models: Models,
  filePath: string,
  destination: string | undefined
): string {
  const data = extractDestinationAndName(filePath, destination);
  const generatedFilePath = `${path.join(data.destination, data.name)}.json`;

  const result = generateModel(models);

  if (!fs.existsSync(data.destination)) {
    fs.mkdirSync(data.destination, { recursive: true });
  }
  fs.writeFileSync(generatedFilePath, JSON.stringify(result, null, 2));
  return generatedFilePath;
}

export function generateModel(models: Models): MRSDModel {
  let result: MRSDModel = {
    '@type': 'RSDModel',
    elements: models.model.elements.map(mapUserType),
    services: models.model.services.map(mapService),
    errors: models.model.errors.map(mapError),
  };

  if (models.restModel) {
    result = mergeRest(result, models.restModel);
  }

  return result;
}

function mergeRest(model: MRSDModel, restModel: RSDRestModel) {
  restModel.resources.forEach((r) => {
    const name = r.service.ref?.name;
    const service = model.services.find((s) => s.name === name);
    if (service) {
      mergeRestService(service, r);
    }
  });
  return model;
}

function mergeRestService(service: MService, resource: RSDResource) {
  service.meta = {
    ...service.meta,
    rest: { path: resource.basePath },
  };
  resource.endpoints.forEach((e) => {
    const name = e.operation.ref?.name;
    const operation = service.operations.find((o) => o.name === name);
    if (operation) {
      mergeRestOperation(operation, e, resource.basePath);
    }
  });
}

function mergeRestOperation(
  operation: MOperation,
  endpoint: EnpointPoint,
  basePath: string
) {
  const results = endpoint.results.map((r) => ({
    statusCode: r.statusCode,
    error: r.error?.ref?.name,
  }));

  operation.meta = {
    ...operation.meta,
    rest: {
      method: endpoint.method,
      path: endpoint.path,
      results,
    },
  };

  const fullPath = `${basePath}/${endpoint.path}`;
  const pathParams = /\${(\w+)}/g;
  let result;
  while ((result = pathParams.exec(fullPath)) !== null) {
    const name = result[1];
    const param = operation.parameters.find((p) => p.name === name);
    if (param) {
      param.meta = {
        ...param.meta,
        rest: {
          name: name,
          source: 'path',
        },
      };
    }
  }

  endpoint.specialParameters.forEach((sp) => {
    const name = sp.parameter.ref?.namedType.name;
    if (name === undefined) {
      return;
    }
    const param = operation.parameters.find((p) => p.name === name);
    if (param) {
      param.meta = {
        ...param.meta,
        rest: {
          name: sp.parameterName ?? name,
          source: restTransportTypeToSource(sp.transportType),
        },
      };
    }
  });
}

function restTransportTypeToSource(
  transportType: 'cookie-param' | 'header-param' | 'query-param'
): 'header' | 'query' | 'cookie' {
  switch (transportType) {
    case 'cookie-param':
      return 'cookie';
    case 'header-param':
      return 'header';
    case 'query-param':
      return 'query';
  }
}

const COMMENT_PREFIX = /^[^\w@]+/;

function removeCommentPrefix(value: string | undefined) {
  if (value === undefined) {
    return '';
  }

  return value.replace(COMMENT_PREFIX, '').trim();
}

function mapService(service: Service): MService {
  return {
    '@type': 'Service',
    name: service.name,
    doc: buildDocContentString(service.doc),
    operations: service.operations.map(mapOperation),
  };
}

function buildDocContentString(doc: string | undefined) {
  if (doc === undefined) {
    return '';
  }
  const docs = doc.split(/\r?\n/).map(removeCommentPrefix);
  const contentDocs: string[] = [];

  // Search for the first line with @
  for (let i = 0; i < docs.length; i++) {
    const v = docs[i];
    if (!v.startsWith('@')) {
      contentDocs.push(docs[i]);
    }
  }

  // remove empty lines at the start
  while (contentDocs.length) {
    if (contentDocs[0]) {
      break;
    }
    contentDocs.shift();
  }

  // remove empty lines at the end
  while (contentDocs.length) {
    if (contentDocs[contentDocs.length - 1]) {
      break;
    }
    contentDocs.pop();
  }

  let result = '';
  for (let i = 0; i < contentDocs.length; i++) {
    if (contentDocs[i]) {
      result = !result.endsWith('\n')
        ? `${result} ${contentDocs[i]}`
        : `${result}${contentDocs[i]}`;
    } else {
      // Remove multiple empty lines
      while (contentDocs[i] === '') {
        i += 1;
      }
      i -= 1;
      result += '\n\n';
    }
  }
  return result;
}

function mapError(error: ErrorType): MError {
  return {
    '@type': 'Error',
    name: error.name,
  };
}

function mapOperation(operation: Operation): MOperation {
  const clearDocLines = (operation.doc ?? '')
    .split(/\r?\n/)
    .map(removeCommentPrefix);
  const params = clearDocLines
    .filter((d) => d.startsWith('@param '))
    .map((d) => d.substring(7))
    .map((d) => {
      const parts = d.split('-', 2).map((d) => d.trim());
      return [parts[0], parts[1]] as const;
    });

  const paramDocMap = new Map(params);
  const returnDoc = clearDocLines
    .find((d) => d.startsWith('@returns '))
    ?.substring(9);
  const operationErrors = operation.failures
    .map(
      (f) =>
        ({
          '@type': 'OperationError',
          error: f.error.ref?.name ?? '',
          doc: removeCommentPrefix(f.doc),
        } as const)
    )
    .filter((e) => e.error);

  return {
    '@type': 'Operation',
    name: operation.name,
    doc: buildDocContentString(operation.doc),
    parameters: operation.parameters.map((p) => mapParameter(p, paramDocMap)),
    resultType: operation.returnType
      ? mapReturnType(operation.returnType, returnDoc ?? '')
      : undefined,
    errors: operationErrors.map((e) => e.error),
    operationErrors,
  };
}

function mapParameter(
  parameter: Parameter,
  docMap: Map<string, string>
): MParameter {
  return {
    '@type': 'Parameter',
    name: parameter.namedType.name,
    array: parameter.namedType.array,
    arrayMaxLength: parameter.namedType.maxLength,
    nullable: parameter.namedType.nullable,
    optional: parameter.namedType.optional,
    patch: parameter.patch,
    variant: parameter.namedType.stream
      ? 'stream'
      : computeVariant(parameter.namedType),
    type: parameter.namedType.stream
      ? parameter.namedType.stream
      : computeType(parameter.namedType),
    doc: docMap.get(parameter.namedType.name) ?? '',
  };
}

function mapReturnType(returnType: ReturnType, doc: string): MReturnType {
  return {
    '@type': 'ReturnType',
    array: returnType.array,
    arrayMaxLength: returnType.maxLength,
    variant: returnType.stream ? 'stream' : computeVariant(returnType),
    type: returnType.stream ? returnType.stream : computeType(returnType),
    doc,
  };
}

function mapUserType(userType: UserType): MUserType {
  if (isEnumType(userType)) {
    return mapEnumType(userType);
  } else if (isMixinType(userType)) {
    return mapMixinType(userType);
  } else if (isRecordType(userType)) {
    return mapRecord(userType);
  } else if (isUnionType(userType)) {
    return mapUnionType(userType);
  } else if (isScalarType(userType)) {
    return mapScalarType(userType);
  }
  throw new Error(userType);
}

function mapScalarType(scalarType: ScalarType) {
  const rv: MScalarType = {
    '@type': 'ScalarType',
    name: scalarType.name,
    doc: removeCommentPrefix(scalarType.doc),
  };
  return rv;
}

function mapUnionType(unionType: UnionType) {
  const rv: MUnionType = {
    '@type': 'UnionType',
    name: unionType.name,
    patchable: unionType.patchable,
    types: unionType.records
      .map((r) => r.record.ref)
      .filter(isDefined)
      .map((ref) => ref.name),
    descriminator: unionType.descProp ?? '@type',
    doc: removeCommentPrefix(unionType.doc),
  };
  if (unionType.records.find((r) => r.value)) {
    const alias: Record<string, string> = {};
    rv['descriminatorAliases'] = alias;
    unionType.records
      .filter((r) => r.value)
      .forEach((r) => {
        alias[r.record.ref?.name ?? ''] = r.value ?? '';
      });
  }
  return rv;
}

function mapRecord(recordType: RecordType) {
  const properties: (MKeyProperty | MRevisionProperty | MProperty)[] = [];
  const mixins: string[] = recordType.mixins
    .map((m) => m.ref?.name)
    .filter(isDefined);

  if (recordType.keyProperty) {
    properties.push(mapKeyProperty(recordType.keyProperty));
  }
  if (recordType.revProperty) {
    properties.push(mapRevisionProperty(recordType.revProperty));
  }

  properties.push(...recordType.property.map(mapProperty));

  const rv: MRecordType = {
    '@type': 'RecordType',
    name: recordType.name,
    patchable: recordType.patchable,
    mixins,
    properties,
    doc: removeCommentPrefix(recordType.doc),
  };

  return rv;
}

function mapMixinType(mixinType: MixinType) {
  const properties: (MKeyProperty | MRevisionProperty | MProperty)[] = [];

  if (mixinType.keyProperty) {
    properties.push(mapKeyProperty(mixinType.keyProperty));
  }
  if (mixinType.revProperty) {
    properties.push(mapRevisionProperty(mixinType.revProperty));
  }

  properties.push(...mixinType.property.map(mapProperty));

  const rv: MMixinType = {
    '@type': 'MixinType',
    name: mixinType.name,
    properties,
    doc: removeCommentPrefix(mixinType.doc),
  };

  return rv;
}

function mapProperty(property: Property) {
  const rv: MProperty = {
    '@type': 'Property',
    name: property.namedType.name,
    array: property.namedType.array,
    arrayMaxLength: property.namedType.maxLength,
    readonly: property.readonly,
    optional: property.namedType.optional,
    nullable: property.namedType.nullable,
    variant: computeVariant(property.namedType),
    type: computeType(property.namedType),
    doc: removeCommentPrefix(property.doc),
  };
  return rv;
}

function computeType(namedType: Pick<NamedType, 'inlineEnum' | 'typeRef'>) {
  if (namedType.inlineEnum) {
    const rv: MInlineEnumType = {
      '@type': 'InlineEnumType',
      entries: namedType.inlineEnum.entries.map(mapEnumEntry),
    };
    return rv;
  } else if (namedType.typeRef) {
    if (namedType.typeRef.builtin) {
      return namedType.typeRef.builtin;
    } else {
      return namedType.typeRef.refType?.ref?.name ?? '**fail**';
    }
  }
  throw new Error();
}

function computeVariant(namedType: Pick<NamedType, 'inlineEnum' | 'typeRef'>) {
  if (namedType.inlineEnum) {
    return 'inline-enum';
  } else if (namedType.typeRef) {
    if (namedType.typeRef.builtin) {
      return 'builtin';
    } else if (isEnumType(namedType.typeRef.refType?.ref)) {
      return 'enum';
    } else if (isUnionType(namedType.typeRef.refType?.ref)) {
      return 'union';
    } else if (isRecordType(namedType.typeRef.refType?.ref)) {
      return 'record';
    } else if (isScalarType(namedType.typeRef.refType?.ref)) {
      return 'scalar';
    }
  }
  throw new Error();
}

function mapKeyProperty(keyProperty: KeyProperty) {
  const rv: MKeyProperty = {
    '@type': 'KeyProperty',
    name: keyProperty.name,
    type: keyProperty.typeRef,
    doc: removeCommentPrefix(keyProperty.doc),
  };
  return rv;
}

function mapRevisionProperty(revisionProperty: RevisionProperty) {
  const rv: MRevisionProperty = {
    '@type': 'RevisionProperty',
    name: revisionProperty.name,
    type: revisionProperty.typeRef,
    doc: removeCommentPrefix(revisionProperty.doc),
  };
  return rv;
}

function mapEnumType(enumType: EnumType) {
  const rv: MEnumType = {
    '@type': 'EnumType',
    name: enumType.name,
    entries: enumType.entries.map(mapEnumEntry),
    doc: buildDocContentString(enumType.doc),
  };

  return rv;
}

function mapEnumEntry(enumEntry: EnumEntry) {
  const rv: MEnumEntry = {
    '@type': 'EnumEntry',
    name: enumEntry.name,
    value: enumEntry.value,
  };

  return rv;
}
