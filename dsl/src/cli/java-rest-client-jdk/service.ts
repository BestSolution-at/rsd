import {
  CompositeGeneratorNode,
  IndentNode,
  NL,
  toString,
} from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaRestClientJDKGeneratorConfig,
  resolveObjectType,
  resolveType,
  toPath,
} from "../java-gen-utils.js";
import {
  MBuiltinType,
  MOperation,
  MParameter,
  MResolvedOperation,
  MResolvedService,
  MReturnType,
} from "../model.js";
import { toType } from "../java-client-api/shared.js";
import {
  builtinBuilderAccess,
  builtinBuilderArrayJSONAccess,
} from "./shared.js";
import { isBuiltinType } from "../../language/generated/ast.js";

export function generateService(
  s: MResolvedService,
  artifactConfig: JavaRestClientJDKGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  const ServiceInterface = fqn(
    `${artifactConfig.rootPackageName}.${s.name}Service`
  );
  const HttpClient = fqn("java.net.http.HttpClient");

  const node = new CompositeGeneratorNode();
  node.append(
    `public class ${s.name}ServiceImpl implements ${ServiceInterface} {`,
    NL
  );
  node.indent((classBody) => {
    classBody.append("private final String baseURI;", NL);
    classBody.append(`private final ${HttpClient} client;`, NL);
    classBody.appendNewLine();
    classBody.append(
      `public ${s.name}ServiceImpl(${HttpClient} client, String baseURI) {`,
      NL
    );
    classBody.indent((initBody) => {
      initBody.append("this.baseURI = baseURI;", NL);
      initBody.append("this.client = client;", NL);
    });
    classBody.append("}", NL);
    s.operations.forEach((o) => {
      classBody.appendNewLine();
      generateOperation(
        classBody,
        o,
        artifactConfig,
        fqn,
        s.meta?.rest?.path ?? s.name.toLowerCase()
      );
    });
  });
  node.append("}", NL);

  return {
    name: `${s.name}ServiceImpl.java`,
    content: toString(
      generateCompilationUnit(packageName, importCollector, node)
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

function generateOpertationMethod(
  node: IndentNode,
  o: MResolvedOperation,
  allParameters: readonly MParameter[],
  artifactConfig: JavaRestClientJDKGeneratorConfig,
  fqn: (type: string) => string,
  path: string
) {
  const URI = fqn("java.net.URI");
  const HttpRequest = fqn("java.net.http.HttpRequest");

  const parameters = allParameters.map((p) =>
    toParameter(p, artifactConfig, fqn)
  );
  node.append(
    `public ${toResultType(o.resultType, artifactConfig, fqn)} ${
      o.name
    }(${parameters.join(", ")})`
  );
  if (o.errors.length > 0) {
    node.appendNewLine();
    node.indent((throwBody) => {
      throwBody.append(
        "throws ",
        fqn(`${artifactConfig.rootPackageName}.${o.errors[0]}Exception`),
        o.errors.length > 1 ? "," : ""
      );
      if (o.errors.length > 1) {
        throwBody.appendNewLine();
      }
      throwBody.indent((other) => {
        o.errors.slice(1).forEach((e, idx, arr) => {
          other.append(
            fqn(`${artifactConfig.rootPackageName}.${e}Exception`),
            arr.length !== idx + 1 ? "," : ""
          );
          if (arr.length !== idx + 1) {
            other.appendNewLine();
          }
        });
      });
    });
  }
  node.append(" {", NL);
  node.indent((methodBody) => {
    const processedPath = computePath(
      `${path.replace(/^\//, "")}/${o.meta?.rest?.path ?? ""}`
    );
    const endpoint = processedPath.path ? `%s/${processedPath.path}` : "%s";
    const variables = ["this.baseURI", ...processedPath.variables];
    allParameters
      .filter((p) => !p.nullable)
      .forEach((p, idx, arr) => {
        const Objects = fqn("java.util.Objects");
        methodBody.append(
          `${Objects}.requireNonNull(${p.name}, "${p.name} must not be null");`,
          NL
        );
        if (idx + 1 === arr.length) {
          methodBody.appendNewLine();
        }
      });
    methodBody.append(`var $path = "${endpoint}".formatted(`, NL);
    methodBody.indent((formatted) => {
      variables.forEach((v, idx) =>
        formatted.append(`${v}${idx + 1 < variables.length ? "," : ""}`, NL)
      );
    });
    methodBody.append(");", NL);
    methodBody.appendNewLine();
    const hasQueryParams = allParameters.find(
      (p) => p.meta?.rest?.source === "query"
    );
    if (hasQueryParams) {
      const Map = fqn("java.util.Map");
      methodBody.append(`var $queryParams = ${Map}.of(`, NL);
      allParameters
        .filter((p) => p.meta?.rest?.source === "query")
        .forEach((p, idx, arr) => {
          const last = idx + 1 === arr.length;
          methodBody.indent((map) => {
            map.append(
              `"${
                p.meta?.rest?.name ?? p.name.toLowerCase()
              }",ServiceUtils.toQueryString(${p.name})${last ? "" : ","}`,
              NL
            );
          });
        });
      methodBody.append(");", NL);
      methodBody.append(
        "var $queryParamString = ServiceUtils.toURLQueryPart($queryParams);",
        NL
      );
      methodBody.appendNewLine();
    }
    const hasHeaderParams = allParameters.find(
      (p) => p.meta?.rest?.source === "header"
    );
    if (hasHeaderParams) {
      const Map = fqn("java.util.Map");
      methodBody.append(`var $headerParams = ${Map}.of(`, NL);
      allParameters
        .filter((p) => p.meta?.rest?.source === "header")
        .forEach((p, idx, arr) => {
          const last = idx + 1 === arr.length;
          const Objects = fqn("java.util.Objects");
          methodBody.indent((map) => {
            map.append(
              `"${
                p.meta?.rest?.name ?? p.name.toLowerCase()
              }",${Objects}.toString(${p.name})${last ? "" : ","}`,
              NL
            );
          });
        });
      methodBody.append(");", NL);
      methodBody.append(
        "var $headers = ServiceUtils.toHeaders($headerParams);",
        NL
      );
      methodBody.appendNewLine();
    }

    const method = o.meta?.rest?.method;
    if (method === "PUT" || method === "POST") {
      const BodyPublishers = fqn("java.net.http.HttpRequest.BodyPublishers");
      const bodyParams = allParameters.filter(
        (p) => p.meta?.rest?.source === undefined
      );
      if (bodyParams.length === 0) {
        methodBody.append(`var $body = ${BodyPublishers}.ofString("");`, NL);
      } else if (bodyParams.length === 1) {
        if (bodyParams[0].variant === "record") {
          const DTOUtils = fqn(
            `${artifactConfig.rootPackageName}.jdkhttp.impl.dto.DTOUtils`
          );
          methodBody.append(
            `var $body = ${BodyPublishers}.ofString(${DTOUtils}.toJsonString(${bodyParams[0].name}, false));`,
            NL
          );
        } else {
          methodBody.append(
            `var $body = ${BodyPublishers}.ofString(String.format("\\"%s\\"",${bodyParams[0].name}));`,
            NL
          );
        }
      } else {
        const Json = fqn("jakarta.json.Json");
        methodBody.append(`var $builder = ${Json}.createObjectBuilder();`, NL);
        bodyParams.forEach((p) => {
          if (p.variant === "record" || p.variant === "union") {
            if (p.array) {
              methodBody.append(
                "throw new UnsupportedOperationException();",
                NL
              );
            } else {
              const BaseDTOImpl = fqn(
                `${artifactConfig.rootPackageName}.jdkhttp.impl.dto.BaseDTOImpl`
              );
              methodBody.append(
                `.add("${p.name}", ((${BaseDTOImpl})${p.name}).data)`,
                NL
              );
            }
          } else if (p.variant === "builtin" && isBuiltinType(p.type)) {
            if (p.array) {
              methodBody.append(
                "$builder = " +
                  builtinBuilderArrayJSONAccess({
                    name: p.name,
                    type: p.type,
                  }) +
                  ";",
                NL
              );
            } else {
              if (p.nullable) {
                methodBody.append(
                  `$builder = ${p.name} == null ? $builder.addNull('${p.name}') : ` +
                    builtinBuilderAccess({ name: p.name, type: p.type }) +
                    ";",
                  NL
                );
              } else {
                methodBody.append(
                  "$builder = " +
                    builtinBuilderAccess({ name: p.name, type: p.type }) +
                    ";",
                  NL
                );
              }
            }
          } else {
            methodBody.append("throw new UnsupportedOperationException();", NL);
          }
        });
        const DTOUtils = fqn(
          `${artifactConfig.rootPackageName}.jdkhttp.impl.dto.DTOUtils`
        );
        methodBody.append(
          `var $body = ${BodyPublishers}.ofString(${DTOUtils}.toJsonString($builder.build(),false));`,
          NL
        );
      }
      methodBody.appendNewLine();
    }

    if (hasQueryParams) {
      methodBody.append(
        `var $uri = ${URI}.create($path + $queryParamString);`,
        NL
      );
    } else {
      methodBody.append(`var $uri = ${URI}.create($path);`, NL);
    }

    methodBody.append(`var $request = ${HttpRequest}.newBuilder()`, NL);

    methodBody.indent((tmp) => {
      tmp.indent((l) => {
        l.append(`.uri($uri)`, NL);
        if (hasHeaderParams) {
          l.append(".headers($headers)", NL);
        }

        if (method === "GET") {
          l.append(".GET()", NL);
        } else if (method === "DELETE") {
          l.append(".DELETE()", NL);
        } else if (method === "PUT" || method === "POST") {
          l.append('.header("Content-Type", "application/json")', NL);
          if (method === "PUT") {
            l.append(".PUT($body)", NL);
          } else {
            l.append(".POST($body)", NL);
          }
        } else if (method === "PATCH") {
          l.append('.method("PATCH")', NL);
        }
        l.append(".build();", NL);
      });
    });
    methodBody.appendNewLine();

    const IOException = fqn("java.io.IOException");
    const BodyHandlers = fqn("java.net.http.HttpResponse.BodyHandlers");
    methodBody.append(`try {`, NL);
    methodBody.indent((tryBlock) => {
      tryBlock.append(
        `var $response = this.client.send($request, ${BodyHandlers}.ofString());`,
        NL
      );
      if (o.meta?.rest?.results.length) {
        o.meta.rest.results.forEach((r, idx) => {
          tryBlock.append(
            `${idx === 0 ? "" : " else "}if ($response.statusCode() == ${
              r.statusCode
            } ) {`,
            NL
          );
          tryBlock.indent((resBlock) => {
            if (r.error === undefined) {
              handleOkResult(resBlock, o, artifactConfig, fqn);
            } else {
              handleErroResult(resBlock, o, r.error, artifactConfig, fqn);
            }
          });
          tryBlock.append("}");
        });
        tryBlock.appendNewLine();
      } else {
        const code = o.resultType ? "200" : "204";
        tryBlock.append(`if ($response.statusCode() == ${code}) {`, NL);
        tryBlock.indent((resBlock) => {
          handleOkResult(resBlock, o, artifactConfig, fqn);
        });
        tryBlock.append("}", NL);
      }

      tryBlock.append(
        "throw new IllegalStateException(String.format(\"Unsupported Http-Status '%s':\\n%s\", $response.statusCode(), $response.body()));",
        NL
      );

      tryBlock.append();
    });
    methodBody.append(
      `} catch (${IOException} | InterruptedException e) {`,
      NL
    );
    methodBody.indent((catchBlock) => {
      catchBlock.append("throw new IllegalStateException(e);", NL);
    });
    methodBody.append("}", NL);
  });
  node.append("}", NL);
}

function generateOperation(
  node: IndentNode,
  o: MResolvedOperation,
  artifactConfig: JavaRestClientJDKGeneratorConfig,
  fqn: (type: string) => string,
  path: string
) {
  let idx = o.parameters.findIndex((p) => p.optional);

  if (idx === -1) {
    generateOpertationMethod(node, o, o.parameters, artifactConfig, fqn, path);
  } else {
    for (idx; idx <= o.parameters.length; idx++) {
      const params = [...o.parameters];
      params.length = idx;
      generateOpertationMethod(node, o, params, artifactConfig, fqn, path);
      node.appendNewLine();
    }
  }
}

function handleOkResult(
  node: IndentNode,
  o: MOperation,
  artifactConfig: JavaRestClientJDKGeneratorConfig,
  fqn: (type: string) => string
) {
  if (o.resultType === undefined) {
    node.append("return;", NL);
    return;
  }
  if (o.resultType.variant === "record" || o.resultType.variant === "union") {
    const dtoPkg = `${artifactConfig.rootPackageName}.jdkhttp.impl.dto`;
    const dtoType = fqn(`${dtoPkg}.${o.resultType.type}DTOImpl`);
    if (o.resultType.array) {
      node.append(
        `return ServiceUtils.mapObjects($response, ${dtoType}::of);`,
        NL
      );
    } else {
      node.append(
        `return ServiceUtils.mapObject($response, ${dtoType}::of);`,
        NL
      );
    }
  } else if (o.resultType.variant === "builtin") {
    if (isBuiltinType(o.resultType.type)) {
      if (o.resultType.array) {
        node.append(`return ${builtinArrayMap(o.resultType.type)};`, NL);
      } else {
        node.append(`return ${builtinMap(o.resultType.type)};`, NL);
      }
    }
  } else if (o.resultType.variant === "scalar") {
  } else {
  }
}

function builtinArrayMap(type: MBuiltinType): string {
  switch (type) {
    case "boolean":
      return "ServiceUtils.mapBooleans($response)";
    case "double":
      return "ServiceUtils.mapDoubles($response)";
    case "float":
      return "ServiceUtils.mapFloats($response)";
    case "int":
      return "ServiceUtils.mapInts($response)";
    case "local-date":
      return "ServiceUtils.mapLocalDates($response)";
    case "local-date-time":
      return "ServiceUtils.mapLocalDateTimes($response)";
    case "long":
      return "ServiceUtils.mapLongs($response)";
    case "short":
      return "ServiceUtils.mapShorts($response)";
    case "string":
      return "ServiceUtils.mapStrings($response)";
    case "zoned-date-time":
      return "ServiceUtils.mapZonedDateTimes($response)";
  }
}

function builtinMap(type: MBuiltinType): string {
  switch (type) {
    case "boolean":
      return "ServiceUtils.mapBoolean($response)";
    case "double":
      return "ServiceUtils.mapDouble($response)";
    case "float":
      return "ServiceUtils.mapFloat($response)";
    case "int":
      return "ServiceUtils.mapInt($response)";
    case "local-date":
      return "ServiceUtils.mapLocalDate($response)";
    case "local-date-time":
      return "ServiceUtils.mapLocalDateTime($response)";
    case "long":
      return "ServiceUtils.mapLong($response)";
    case "short":
      return "ServiceUtils.mapShort($response)";
    case "string":
      return "ServiceUtils.mapString($response)";
    case "zoned-date-time":
      return "ServiceUtils.mapZonedDateTime($response)";
  }
}

function handleErroResult(
  node: IndentNode,
  o: MResolvedOperation,
  error: string,
  artifactConfig: JavaRestClientJDKGeneratorConfig,
  fqn: (type: string) => string
) {
  // o.resolved.errors.find( e => e.name === error );

  node.append(
    `throw new ${fqn(
      `${artifactConfig.rootPackageName}.${error}Exception`
    )}(ServiceUtils.mapString($response), null);`,
    NL
  );
}

function computePath(orignalPath: string): {
  path: string;
  variables: string[];
} {
  const regex = /(\$\{\w+\})/g;

  let lastMatchEnd = 0;
  let path = "";
  const variables: string[] = [];
  for (const match of orignalPath.matchAll(regex)) {
    if (match === undefined || match.index === undefined) {
      continue;
    }
    if (match.index - lastMatchEnd > 0) {
      path += orignalPath.substring(lastMatchEnd, match.index);
    }
    if (match[0].length > 0) {
      path += "%s";
      variables.push(match[0].substring(2, match[0].length - 1));
    }
    lastMatchEnd = match.index + match[0].length;
  }
  if (lastMatchEnd < orignalPath.length) {
    path += orignalPath.substring(lastMatchEnd);
  }

  return { path, variables };
}

function toParameter(
  parameter: MParameter,
  artifactConfig: JavaRestClientJDKGeneratorConfig,
  fqn: (type: string) => string
) {
  return `${toType(parameter, artifactConfig, fqn, parameter.nullable)} ${
    parameter.name
  }`;
}

function toResultType(
  type: MReturnType | undefined,
  artifactConfig: JavaRestClientJDKGeneratorConfig,
  fqn: (type: string) => string
) {
  const dtoPkg = `${artifactConfig.rootPackageName}.dto`;
  if (type === undefined) {
    return "void";
  }

  if (type.variant === "union" || type.variant === "record") {
    const dtoType = fqn(`${dtoPkg}.${type.type}DTO`);
    if (type.array) {
      return `${fqn("java.util.List")}<${dtoType}>`;
    } else {
      return dtoType;
    }
  } else if (typeof type.type === "string") {
    if (type.array) {
      return `${fqn("java.util.List")}<${resolveObjectType(
        type.type,
        artifactConfig.nativeTypeSubstitues,
        fqn
      )}>`;
    } else {
      return `${resolveType(
        type.type,
        artifactConfig.nativeTypeSubstitues,
        fqn,
        false
      )}`;
    }
  }
  return type.type;
}
