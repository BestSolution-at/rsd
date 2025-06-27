import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  builtinToJavaObjectType,
  builtinToJavaType,
  computeParameterAPIType,
  generateCompilationUnit,
  JavaImportsCollector,
  JavaServerJakartaWSGeneratorConfig,
  resolveType,
  toPath,
} from '../java-gen-utils.js';
import {
  isMBuiltinType,
  isMInlineEnumType,
  MOperation,
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

export function generateResource(
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

  const resourceArtifact = _generateResource(s, artifactConfig);
  if (resourceArtifact) {
    result.push(resourceArtifact);
  }

  return result;
}

function _generateResource(
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
  node.append(`public class ${s.name}Resource {`, NL);
  node.indent((cBody) => {
    cBody.append('private final RestBuilderFactory builderFactory;', NL);
    cBody.append(`private final ${Service} service;`, NL);
    cBody.append(
      `private final ${s.name}ResourceResponseBuilder responseBuilder;`,
      NL
    );
    if (artifactConfig.scopeValues) {
      artifactConfig.scopeValues.forEach((v) => {
        cBody.append('@Inject', NL);
        cBody.append(
          `_ScopeValueProvider.${toFirstUpper(v.name)}Provider ${
            v.name
          }Provider;`,
          NL
        );
      });
    }
    cBody.appendNewLine();
    cBody.append(`@${Inject}`, NL);
    cBody.append(
      `public ${s.name}Resource(${Service} service, ${s.name}ResourceResponseBuilder responseBuilder, RestBuilderFactory builderFactory) {`,
      NL
    );
    cBody.indent((mBody) => {
      mBody.append('this.builderFactory = builderFactory;', NL);
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

        params.push(`String data`);
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

      if (artifactConfig.scopeValues) {
        serviceParams.unshift(
          ...artifactConfig.scopeValues.map((v) => `$${v.name}`)
        );
      }

      if (params.length > 0) {
        if (params.length > 1) {
          cBody.append(`public ${Response} ${o.name}(`, NL);
          cBody.indent((tmp) =>
            tmp.indent((paramIndent) => {
              params.forEach((p, idx, arr) => {
                paramIndent.append(`${p}`);
                if (idx + 1 < arr.length) {
                  paramIndent.append(',', NL);
                } else {
                  paramIndent.append(') {', NL);
                }
              });
            })
          );
        } else {
          cBody.append(`public ${Response} ${o.name}(${params[0]}) {`, NL);
        }
      } else {
        cBody.append(`public ${Response} ${o.name}() {`, NL);
      }
      cBody.indent((mBody) => {
        o.parameters.forEach((p) => {
          if (multiBody && p.meta?.rest?.source === undefined) {
            return;
          }
          if (p.variant === 'record' || p.variant === 'union') {
            const type = computeParameterAPIType(
              p,
              artifactConfig.nativeTypeSubstitues,
              `${artifactConfig.rootPackageName}.service.model`,
              fqn
            );
            mBody.append(
              `var ${p.name} = builderFactory.of(${type}.class, _${p.name});`,
              NL
            );
          } else if (p.variant === 'builtin') {
            mBody.append(`var ${p.name} = _${p.name};`, NL);
          } else if (p.variant === 'scalar') {
            const type = p.type;
            if (typeof type === 'string') {
              const t = resolveType(
                type,
                artifactConfig.nativeTypeSubstitues,
                fqn,
                false
              );
              mBody.append(
                `var ${p.name} = _${p.name} == null ? null : ${t}.of(_${p.name});`,
                NL
              );
            }
          }
        });
        if (multiBody) {
          const _JsonUtils = fqn(`${packageName}.model._JsonUtils`);
          const Type = fqn(
            `${packageName}.model.${s.name}${toFirstUpper(o.name)}DataImpl`
          );
          mBody.append(
            `var dto = ${_JsonUtils}.fromString(data, ${Type}::new);`,
            NL
          );
        }
        if (artifactConfig.scopeValues) {
          artifactConfig.scopeValues.forEach((v) => {
            mBody.append(
              `var $${v.name} = this.${v.name}Provider.${v.name}();`,
              NL
            );
          });
        }

        const errors = o.meta?.rest?.results.filter((e) => e.error);
        if (errors && errors.length > 0) {
          mBody.append('try {', NL);
          mBody.indent((inner) => {
            inner.append(okResultContent(o, serviceParams));
          });
          errors.forEach((e) => {
            const Type = fqn(
              `${artifactConfig.rootPackageName}.service.${e.error}Exception`
            );
            mBody.append(`} catch (${Type} e) {`, NL);
            mBody.indent((inner) => {
              inner.append(
                `return _RestUtils.toResponse(${e.statusCode}, e);`,
                NL
              );
            });
          });
          mBody.append('}', NL);
        } else {
          mBody.append(okResultContent(o, serviceParams));
        }
      });
      cBody.append('}', NL);
      cBody.appendNewLine();
    });
  });

  node.append('}', NL);

  return {
    name: `${toFirstUpper(s.name)}Resource.java`,
    content: toString(
      generateCompilationUnit(packageName, importCollector, node),
      '\t'
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

function okResultContent(o: MOperation, serviceParams: string[]) {
  const node = new CompositeGeneratorNode();

  if (o.resultType) {
    node.append(
      `var result = service.${o.name}(builderFactory, ${serviceParams.join(
        ', '
      )});`,
      NL
    );
  } else {
    node.append(
      `service.${o.name}(builderFactory, ${serviceParams.join(', ')});`,
      NL
    );
  }
  if (o.resultType) {
    if (serviceParams.length === 0) {
      node.append(`return responseBuilder.${o.name}(result).build();`, NL);
    } else {
      node.append(
        `return responseBuilder.${o.name}(result, ${serviceParams.join(
          ', '
        )}).build();`,
        NL
      );
    }
  } else {
    node.append(
      `return responseBuilder.${o.name}(${serviceParams.join(', ')}).build();`,
      NL
    );
  }
  return node;
}

function toParameter(
  p: MParameter,
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  fqn: (type: string) => string
): string {
  const annotation = computeParameterAnnotation(p, fqn);
  const type = computeParameterType(p, artifactConfig, fqn);

  return `${annotation}${type} _${p.name}`;
}

function computeParameterType(
  p: MParameter,
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  fqn: (type: string) => string
): string {
  if (
    p.variant === 'record' ||
    p.variant === 'union' ||
    p.variant === 'scalar'
  ) {
    return 'String';
  } else if (p.variant === 'enum') {
    return 'DummyEnum';
  } else if (p.variant === 'inline-enum') {
    return 'InlineDummyEnum';
  } else {
    const type = p.type;
    if (isMBuiltinType(type)) {
      if (p.array) {
        const t = builtinToJavaObjectType(type, fqn);
        const List = fqn('java.util.List');
        return `${List}<${t}>`;
      } else if (p.optional || p.nullable) {
        return builtinToJavaObjectType(type, fqn);
      } else {
        return builtinToJavaType(type, fqn);
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
