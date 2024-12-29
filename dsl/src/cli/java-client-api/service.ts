import {
  CompositeGeneratorNode,
  IndentNode,
  NL,
  toString,
} from "langium/generate";

import { Artifact } from "../artifact-generator.js";
import {
  JavaImportsCollector,
  JavaClientAPIGeneratorConfig,
  generateCompilationUnit,
  resolveObjectType,
  resolveType,
  toPath,
} from "../java-gen-utils.js";
import { MOperation, MParameter, MReturnType, MService } from "../model.js";
import { toType } from "./shared.js";

export function generateService(
  s: MService,
  artifactConfig: JavaClientAPIGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  const node = new CompositeGeneratorNode();
  node.append(`public interface ${s.name}Service extends BaseService {`, NL);
  node.indent((child) => {
    s.operations.forEach((o) => {
      let idx = o.parameters.findIndex((p) => p.optional);
      if (idx === -1) {
        toMethod(child, o, o.parameters, artifactConfig, fqn);
      } else {
        for (idx; idx <= o.parameters.length; idx++) {
          const params = [...o.parameters];
          params.length = idx;
          toMethod(child, o, params, artifactConfig, fqn);
        }
      }
    });
  });
  node.append("}");

  return {
    name: `${s.name}Service.java`,
    content: toString(
      generateCompilationUnit(packageName, importCollector, node)
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

function toMethod(
  child: IndentNode,
  o: MOperation,
  allParameters: readonly MParameter[],
  artifactConfig: JavaClientAPIGeneratorConfig,
  fqn: (type: string) => string
) {
  const parameters = allParameters.map((p) =>
    toParameter(p, artifactConfig, fqn)
  );
  child.append(
    `public ${toResultType(o.resultType, artifactConfig, fqn)} ${
      o.name
    }(${parameters.join(",")})`
  );
  if (o.errors.length > 0) {
    child.appendNewLine();
    child.indent((throwBody) => {
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
  child.append(";", NL);
  child.appendNewLine();
}

function toParameter(
  parameter: MParameter,
  artifactConfig: JavaClientAPIGeneratorConfig,
  fqn: (type: string) => string
) {
  return `${toType(parameter, artifactConfig, fqn, parameter.nullable)} ${
    parameter.name
  }`;
}

function toResultType(
  type: MReturnType | undefined,
  artifactConfig: JavaClientAPIGeneratorConfig,
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
