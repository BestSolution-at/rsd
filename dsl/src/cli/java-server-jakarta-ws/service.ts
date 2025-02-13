import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  computeParameterAPIType,
  generateCompilationUnit,
  JavaImportsCollector,
  JavaServerJakartaWSGeneratorConfig,
  resolveObjectType,
  resolveType,
  toPath,
} from '../java-gen-utils.js';
import {
  isMBuiltinType,
  isMInlineEnumType,
  MParameter,
  MResolvedOperation,
  MResolvedService,
} from '../model.js';
import { toFirstUpper } from '../util.js';
import {
  builtinOptionalJSONAccessNG,
  builtinSimpleJSONAccessNG,
  builtinSimpleJSONArrayAccess,
} from '../java-model-json/shared.js';

export function generateService(
  s: MResolvedService,
  artifactConfig: JavaServerJakartaWSGeneratorConfig
): Artifact[] {
  const result: Artifact[] = [];
  const serviceDTOs = s.operations
    .filter(
      (o) =>
        o.parameters.filter((p) => p.meta?.rest?.source === undefined).length >
        1
    )
    .map((o) => generateServiceData(s, o, artifactConfig));
  result.push(...serviceDTOs);

  const resourceArtifact = generateResource(s, artifactConfig);
  if (resourceArtifact) {
    // result.push(resourceArtifact);
  }

  return result;
}

function generateResource(
  s: MResolvedService,
  artifactConfig: JavaServerJakartaWSGeneratorConfig
): Artifact | undefined {
  if (s.meta?.rest === undefined) {
    return undefined;
  }

  const packageName = `${artifactConfig.rootPackageName}.rest`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  const ApplicationScoped = fqn('jakarta.enterprise.context.ApplicationScoped');
  const Path = fqn('jakarta.ws.rs.Path');
  const Produces = fqn('jakarta.ws.rs.Produces');
  const MediaType = fqn('jakarta.ws.rs.core.MediaType');
  const Service = fqn(
    `${artifactConfig.rootPackageName}.service.${s.name}Service`
  );
  const Inject = fqn('jakarta.inject.Inject');
  const Response = fqn('jakarta.ws.rs.core.Response');

  const node = new CompositeGeneratorNode();
  node.append(`@${ApplicationScoped}`, NL);
  node.append(`@${Path}("${s.meta.rest.path.replace('$', '')}")`, NL);
  node.append(`@${Produces}(${MediaType}.APPLICATION_JSON)`, NL);
  node.append(`public class ${s.name}Resource_ {`, NL);
  node.indent((cBody) => {
    cBody.append(`private final ${Service} service;`, NL);
    cBody.append(
      `private final ${s.name}ResourceResponseBuilder responseBuilder;`,
      NL
    );
    cBody.appendNewLine();
    cBody.append(`@${Inject}`, NL);
    cBody.append(
      `public ${s.name}Resource_(${Service} service, ${s.name}ResourceResponseBuilder responseBuilder) {`,
      NL
    );
    cBody.indent((mBody) => {
      mBody.append('this.service = service;', NL);
      mBody.append('this.responseBuilder = responseBuilder;', NL);
    });
    cBody.append('}', NL);
    cBody.appendNewLine();

    s.operations.forEach((o) => {
      if (o.meta?.rest === undefined) {
        return;
      }

      cBody.append(`@${fqn(`jakarta.ws.rs.${o.meta.rest.method}`)}`, NL);
      if (o.meta.rest.path) {
        cBody.append(`@${Path}("${o.meta.rest.path.replace('$', '')}")`, NL);
      }

      const multiBody =
        o.parameters.filter((p) => p.meta?.rest?.source === undefined).length >
        1;
      const params: string[] = [];
      const serviceParams: string[] = [];

      if (multiBody) {
        params.push(
          ...o.parameters
            .filter((p) => p.meta?.rest !== undefined)
            .filter((p) => p.meta?.rest?.source !== undefined)
            .map((p) => toParameter(p, artifactConfig, fqn))
        );
        const DtoType = fqn(
          `${artifactConfig.rootPackageName}.rest.dto.${s.name}${toFirstUpper(
            o.name
          )}DTOImpl`
        );
        params.push(`${DtoType} dto`);
        serviceParams.push(
          ...o.parameters.map((p) => {
            if (p.meta?.rest?.source === undefined) {
              return `dto.${p.name}()`;
            }
            return p.name;
          })
        );
      } else {
        params.push(
          ...o.parameters.map((p) => toParameter(p, artifactConfig, fqn))
        );
        serviceParams.push(...o.parameters.map((p) => p.name));
      }

      if (params.length > 0) {
        if (params.length > 1) {
          cBody.append(`public ${Response} ${o.name}(`, NL);
          cBody.indent((paramIndent) => {
            params.forEach((p, idx, arr) => {
              paramIndent.append(`${p}`);
              if (idx + 1 < arr.length) {
                paramIndent.append(',', NL);
              } else {
                paramIndent.append(') {', NL);
              }
            });
          });
        } else {
          cBody.append(`public ${Response} ${o.name}(${params[0]}) {`, NL);
        }
      } else {
        cBody.append(`public ${Response} ${o.name}() {`, NL);
      }

      cBody.indent((mBody) => {
        mBody.append(
          `var result = service.${o.name}(${serviceParams.join(', ')});`,
          NL
        );
        mBody.appendNewLine();
        mBody.append('if (result.isOk()) {', NL);
        mBody.indent((inner) => {
          if (o.resultType) {
            if (serviceParams.length === 0) {
              inner.append(
                `return responseBuilder.${o.name}(result.value()).build();`,
                NL
              );
            } else {
              inner.append(
                `return responseBuilder.${
                  o.name
                }(result.value(),${serviceParams.join(', ')}).build();`,
                NL
              );
            }
          } else {
            inner.append(
              `return responseBuilder.${o.name}(${serviceParams.join(
                ', '
              )}).build();`,
              NL
            );
          }
        });
        mBody.append('}', NL);
        mBody.append('return RestUtils.toResponse(result);', NL);
      });
      cBody.append('}', NL);
      cBody.appendNewLine();
    });
  });

  node.append('}', NL);

  return {
    name: `${toFirstUpper(s.name)}Resource_.java`,
    content: toString(
      generateCompilationUnit(packageName, importCollector, node)
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

function toParameter(
  p: MParameter,
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  fqn: (type: string) => string
): string {
  const annotation = computeParameterAnnotation(p, fqn);
  const type = computeParameterType(p, artifactConfig, fqn);

  return `${annotation}${type} ${p.name}`;
}

function computeParameterType(
  p: MParameter,
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  fqn: (type: string) => string
): string {
  if (
    (p.variant === 'record' || p.variant === 'union') &&
    typeof p.type === 'string'
  ) {
    const Type = fqn(
      `${artifactConfig.rootPackageName}.rest.dto.${p.type}DTOImpl`
    );
    if (p.array) {
      const List = fqn('java.util.List');
      return `${List}<${Type}>`;
    } else {
      return Type;
    }
  } else if (p.variant === 'enum') {
    return 'DummyEnum';
  } else if (p.variant === 'inline-enum') {
    return 'InlineDummyEnum';
  } else {
    if (typeof p.type === 'string') {
      if (p.array) {
        const Type = resolveObjectType(
          p.type,
          artifactConfig.nativeTypeSubstitues,
          fqn
        );
        const List = fqn('java.util.List');
        return `${List}<${Type}>`;
      } else {
        return resolveType(
          p.type,
          artifactConfig.nativeTypeSubstitues,
          fqn,
          p.nullable
        );
      }
    }
    return 'String';
  }
}

function computeParameterAnnotation(
  p: MParameter,
  fqn: (type: string) => string
): string {
  if (p.meta?.rest?.source === 'path') {
    return `@${fqn('jakarta.ws.rs.PathParam')}("${p.meta.rest.name}") `;
  } else if (p.meta?.rest?.source === 'header') {
    return `@${fqn('jakarta.ws.rs.HeaderParam')}("${p.meta.rest.name}") `;
  } else if (p.meta?.rest?.source === 'cookie') {
    return `@${fqn('jakarta.ws.rs.CookieParam')}("${p.meta.rest.name}") `;
  } else if (p.meta?.rest?.source === 'query') {
    return `@${fqn('jakarta.ws.rs.QueryParam')}("${p.meta.rest.name}") `;
  }
  return '';
}

function generateServiceData(
  s: MResolvedService,
  o: MResolvedOperation,
  artifactConfig: JavaServerJakartaWSGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.rest.model`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  const JsonObject = fqn('jakarta.json.JsonObject');

  const node = new CompositeGeneratorNode();
  node.append(
    `public class ${s.name}${toFirstUpper(
      o.name
    )}DataImpl extends _BaseDataImpl {`,
    NL
  );
  node.indent((classBody) => {
    classBody.append(
      `public ${s.name}${toFirstUpper(o.name)}DataImpl(${JsonObject} data) {`,
      NL
    );
    classBody.indent((methodBody) => {
      methodBody.append('super(data);', NL);
    });
    classBody.append('}', NL, NL);
    o.parameters
      .filter((p) => p.meta?.rest?.source === undefined)
      .forEach((p) => {
        const type = computeParameterAPIType(
          p,
          artifactConfig.nativeTypeSubstitues,
          `${artifactConfig.rootPackageName}.service.model`,
          fqn
        );
        classBody.append(`public ${type} ${p.name}() {`, NL);
        classBody.indent((methodBody) => {
          methodBody.append(
            generateParameterContent(
              p,
              artifactConfig.nativeTypeSubstitues,
              `${artifactConfig.rootPackageName}.service.model`,
              fqn
            )
          );
        });
        classBody.append('}', NL, NL);
      });
  });

  node.append('}');

  return {
    name: `${s.name}${toFirstUpper(o.name)}DataImpl.java`,
    content: toString(
      generateCompilationUnit(packageName, importCollector, node),
      '\t'
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

function generateParameterContent(
  prop: MParameter,
  nativeTypeSubstitues: Record<string, string> | undefined,
  interfaceBasePackage: string,
  fqn: (type: string) => string
) {
  let mapper: string;
  const array = prop.array;

  if (isMBuiltinType(prop.type)) {
    if (array) {
      mapper = builtinSimpleJSONArrayAccess({
        type: prop.type,
        name: prop.name,
      });
    } else {
      if (!prop.optional && !prop.nullable) {
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
    const Type = computeParameterAPIType(
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
    if (prop.variant === 'enum') {
      if (array) {
        mapper = `_JsonUtils.mapLiterals(data, "${prop.name}", ${prop.type}::valueOf)`;
      } else {
        mapper = `_JsonUtils.mapLiteral(data, "${prop.name}", ${prop.type}::valueOf)`;
      }
    } else if (prop.variant === 'scalar') {
      const Type = computeParameterAPIType(
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
      const type = prop.patch
        ? `${prop.type}DataPatchImpl`
        : `${prop.type}DataImpl`;
      if (array) {
        mapper = `_JsonUtils.mapObjects(data, "${prop.name}", ${type}::of)`;
      } else {
        if (prop.optional) {
          mapper = `_JsonUtils.mapObject(data, "${prop.name}", ${type}::of, null)`;
        } else {
          mapper = `_JsonUtils.mapObject(data, "${prop.name}", ${type}::of)`;
        }
      }
    }
  }

  const node = new CompositeGeneratorNode();
  node.append(`return ${mapper};`, NL);
  return node;
}
