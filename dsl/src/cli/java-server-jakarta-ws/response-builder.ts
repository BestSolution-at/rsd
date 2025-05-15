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
  MParameter,
  MResolvedRSDModel,
  MResolvedService,
  MReturnType,
} from '../model.js';

export function generateResponseBuilder(
  s: MResolvedService,
  model: MResolvedRSDModel,
  artifactConfig: JavaServerJakartaWSGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.rest`;
  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  return {
    name: `${s.name}ResourceResponseBuilder.java`,
    content: toString(
      generateCompilationUnit(
        packageName,
        importCollector,
        generateContent(
          s,
          model,
          artifactConfig,
          `${artifactConfig.rootPackageName}.service.model`,
          fqn
        )
      ),
      '\t'
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

function generateContent(
  s: MResolvedService,
  model: MResolvedRSDModel,
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  interfaceBasePackage: string,
  fqn: (type: string) => string
) {
  const Singleton = fqn('jakarta.inject.Singleton');
  const Response = fqn('jakarta.ws.rs.core.Response');
  const ResponseBuilder = fqn('jakarta.ws.rs.core.Response.ResponseBuilder');
  const node = new CompositeGeneratorNode();

  node.append(`@${Singleton}`, NL);
  node.append(`public class ${s.name}ResourceResponseBuilder {`, NL);
  node.indent((classBody) => {
    s.operations.forEach((o) => {
      const params = o.parameters.map((p) =>
        toParameter(p, artifactConfig, fqn)
      );
      if (o.resultType !== undefined) {
        params.unshift(
          `${toResultType(o.resultType, artifactConfig, fqn)} result`
        );
      }
      classBody.append(
        `public ${ResponseBuilder} ${o.name}(${params.join(', ')}) {`,
        NL
      );
      classBody.indent((methodBody) => {
        const code =
          o.meta?.rest?.results.find((r) => r.error === undefined)
            ?.statusCode ?? (o.resultType ? 200 : 204);
        if (o.resultType) {
          if (
            o.resultType.variant === 'record' ||
            o.resultType.variant === 'union'
          ) {
            const JsonUtils = fqn(
              `${artifactConfig.rootPackageName}.rest.model._JsonUtils`
            );
            methodBody.append(
              `return ${Response}.status(${code}).entity(${JsonUtils}.toJsonString(result, false));`,
              NL
            );
          } else {
            if (
              isMBuiltinType(o.resultType.type) &&
              o.resultType.type === 'string'
            ) {
              const JsonUtils = fqn(
                `${artifactConfig.rootPackageName}.rest.model._JsonUtils`
              );
              methodBody.append(
                `return ${Response}.status(${code}).entity(${JsonUtils}.encodeAsJsonString(result));`,
                NL
              );
            } else {
              methodBody.append(
                `return ${Response}.status(${code}).entity(result);`,
                NL
              );
            }
          }
        } else {
          methodBody.append(`return ${Response}.status(${code});`, NL);
        }
      });
      classBody.append('}', NL, NL);
    });
  });
  node.append('}', NL);
  return node;
}

function toParameter(
  parameter: MParameter,
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  fqn: (type: string) => string
) {
  const type = computeParameterAPIType(
    parameter,
    artifactConfig.nativeTypeSubstitues,
    `${artifactConfig.rootPackageName}.service.model`,
    fqn
  );
  return `${type} ${parameter.name}`;
}

function toResultType(
  type: MReturnType | undefined,
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  fqn: (type: string) => string
) {
  const dtoPkg = `${artifactConfig.rootPackageName}.service.model`;
  if (type === undefined) {
    return 'void';
  }

  if (type.variant === 'union' || type.variant === 'record') {
    const dtoType = fqn(`${dtoPkg}.${type.type}`) + '.Data';
    if (type.array) {
      return `${fqn('java.util.List')}<${dtoType}>`;
    } else {
      return dtoType;
    }
  } else if (typeof type.type === 'string') {
    if (type.array) {
      return `${fqn('java.util.List')}<${resolveObjectType(
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
