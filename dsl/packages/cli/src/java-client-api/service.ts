import {
  CompositeGeneratorNode,
  IndentNode,
  NL,
  toString,
} from 'langium/generate';

import { Artifact } from '../artifact-generator.js';
import {
  JavaImportsCollector,
  JavaClientAPIGeneratorConfig,
  generateCompilationUnit,
  resolveObjectType,
  resolveType,
  toPath,
  computeParameterAPIType,
} from '../java-gen-utils.js';
import { MOperation, MParameter, MReturnType, MService } from '../model.js';
import { toNode } from '../util.js';

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
  node.append('}', NL);

  return {
    name: `${s.name}Service.java`,
    content: toString(
      generateCompilationUnit(packageName, importCollector, node),
      '\t'
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
  if (parameters.length <= 1) {
    child.append(
      toNode(
        [
          `public ${toResultType(o.resultType, artifactConfig, fqn)} ${
            o.name
          }(${parameters.join(', ')})`,
        ],
        false
      )
    );
  } else {
    child.append(
      toNode([
        `public ${toResultType(o.resultType, artifactConfig, fqn)} ${o.name}(`,
        [
          parameters
            .filter((_, idx, arr) => idx + 1 < arr.length)
            .map((p) => p + ', '),
        ],
      ])
    );
    child.indent((i1) =>
      i1.indent((i2) => i2.append(parameters[parameters.length - 1] + ')'))
    );
  }

  if (o.operationErrors.length > 0) {
    child.append(
      ' throws ' +
        o.operationErrors
          .map((e, idx, arr) =>
            fqn(
              `${artifactConfig.rootPackageName}.${o.operationErrors[0].error}Exception`
            )
          )
          .join(', ')
    );
  }
  child.append(';', NL);
  child.appendNewLine();
}

function toParameter(
  parameter: MParameter,
  artifactConfig: JavaClientAPIGeneratorConfig,
  fqn: (type: string) => string
) {
  const type = computeParameterAPIType(
    parameter,
    artifactConfig.nativeTypeSubstitues,
    `${artifactConfig.rootPackageName}.model`,
    fqn
  );
  return `${type} ${parameter.name}`;
}

function toResultType(
  type: MReturnType | undefined,
  artifactConfig: JavaClientAPIGeneratorConfig,
  fqn: (type: string) => string
) {
  const dtoPkg = `${artifactConfig.rootPackageName}.model`;
  if (type === undefined) {
    return 'void';
  }

  if (type.variant === 'stream') {
    if (type.type === 'file') {
      return fqn(`${dtoPkg}.RSDFile`);
    }
    return fqn(`${dtoPkg}.RSDBlob`);
  } else if (type.variant === 'union' || type.variant === 'record') {
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
