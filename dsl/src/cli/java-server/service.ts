import {
  CompositeGeneratorNode,
  IndentNode,
  NL,
  toString,
} from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  computeParameterAPIType,
  generateCompilationUnit,
  JavaImportsCollector,
  JavaServerGeneratorConfig,
  resolveObjectType,
  resolveType,
  toPath,
} from '../java-gen-utils.js';
import { MOperation, MParameter, MReturnType, MService } from '../model.js';

export function generateService(
  s: MService,
  artifactConfig: JavaServerGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.service`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  return {
    name: `${s.name}Service.java`,
    content: toString(
      generateCompilationUnit(
        packageName,
        importCollector,
        generateServiceContent(s, artifactConfig, fqn)
      ),
      '\t'
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

function generateServiceContent(
  s: MService,
  artifactConfig: JavaServerGeneratorConfig,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(`public interface ${s.name}Service {`, NL);
  node.indent((child) => {
    s.operations.forEach((o) => {
      toMethod(child, o, o.parameters, artifactConfig, fqn);
    });
  });
  node.append('}', NL);
  return node;
}

function toMethod(
  child: IndentNode,
  o: MOperation,
  allParameters: readonly MParameter[],
  artifactConfig: JavaServerGeneratorConfig,
  fqn: (type: string) => string
) {
  child.append(generateServiceSignature(o, allParameters, artifactConfig, fqn));
  child.append(';', NL);
  child.appendNewLine();
}

export function generateServiceSignature(
  o: MOperation,
  allParameters: readonly MParameter[],
  artifactConfig: JavaServerGeneratorConfig,
  fqn: (type: string) => string
) {
  const child = new CompositeGeneratorNode();
  const scopeValues =
    artifactConfig.scopeValues?.map((s) => `${fqn(s.type)} ${s.name}`) ?? [];
  const parameters = [
    'BuilderFactory _factory',
    ...scopeValues,
    ...allParameters.map((p) => toParameter(p, artifactConfig, fqn)),
  ].join(', ');
  child.append(
    `public ${toResultType(o.resultType, artifactConfig, fqn)} ${
      o.name
    }(${parameters})`
  );
  if (o.errors.length > 0) {
    child.appendNewLine();
    child.indent((outer) => {
      outer.indent((throwBody) => {
        throwBody.append(
          'throws ',
          fqn(
            `${artifactConfig.rootPackageName}.service.${o.errors[0]}Exception`
          ),
          o.errors.length > 1 ? ',' : ''
        );
        if (o.errors.length > 1) {
          throwBody.appendNewLine();
        }
        o.errors.slice(1).forEach((e, idx, arr) => {
          throwBody.append(
            fqn(`${artifactConfig.rootPackageName}.service.${e}Exception`),
            arr.length !== idx + 1 ? ',' : ''
          );
          if (arr.length !== idx + 1) {
            throwBody.appendNewLine();
          }
        });
      });
    });
  }
  return child;
}

function toParameter(
  parameter: MParameter,
  artifactConfig: JavaServerGeneratorConfig,
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
  artifactConfig: JavaServerGeneratorConfig,
  fqn: (type: string) => string
) {
  const dtoPkg = `${artifactConfig.rootPackageName}.service.model`;
  if (type === undefined) {
    return 'void';
  }

  if (type.variant === 'stream') {
    if (type.type === 'file') {
      return fqn(`${dtoPkg}._File`);
    }
    return fqn(`${dtoPkg}._Blob`);
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
