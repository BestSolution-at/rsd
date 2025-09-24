import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import {
  isMBuiltinType,
  isMInlineEnumType,
  MParameter,
  MResolvedService,
  MReturnType,
} from '../model.js';
import {
  builtinToJSType,
  generateCompilationUnit,
  TypescriptClientAPIGeneratorConfig,
  TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateService(
  s: MResolvedService,
  config: TypescriptClientAPIGeneratorConfig
) {
  const collector = new TypescriptImportCollector(config);
  const fqn = collector.importType.bind(collector);
  return {
    name: `${s.name}Service.ts`,
    content: toString(
      generateCompilationUnit(
        collector,
        generateServiceContent(s, config, fqn)
      ),
      '\t'
    ),
    path: `${config.targetFolder}`,
  };
}

function generateServiceContent(
  s: MResolvedService,
  config: TypescriptClientAPIGeneratorConfig,
  fqn: (t: string, typeOnly: boolean) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(`export interface ${s.name}Service {`, NL);
  node.indent((classBody) => {
    s.operations.forEach((o) => {
      const parameters = o.parameters.map((p) => toParameter(p, config, fqn));
      var Result = fqn('Result:./_result-utils.ts', true);
      classBody.append(
        `${o.name}(${parameters.join(', ')}): Promise<${Result}<${toResultType(
          o.resultType,
          config,
          fqn
        )}, ${toErrorType(o.errors, fqn)}>>;`,
        NL
      );
    });
  });
  node.append('}', NL);
  return node;
}

function toErrorType(
  errors: string[],
  fqn: (type: string, typeOnly: boolean) => string
) {
  const Status = fqn(`StatusRSDError:./Errors.ts`, true);
  const Native = fqn(`NativeRSDError:./Errors.ts`, true);
  if (errors.length === 0) {
    return `${Status} | ${Native}`;
  } else {
    return (
      errors.map((e) => fqn(`${e}Error:./Errors.ts`, true)).join(' | ') +
      ` | ${Status} | ${Native}`
    );
  }
}

function toResultType(
  result: MReturnType | undefined,
  config: TypescriptClientAPIGeneratorConfig,
  fqn: (type: string, typeOnly: boolean) => string
) {
  if (result === undefined) {
    return fqn('VoidType:./_result-utils.ts', true);
  }

  let type: string;
  if (isMBuiltinType(result.type)) {
    type = builtinToJSType(result.type);
  } else if (result.variant === 'scalar') {
    type = 'string';
  } else if (isMInlineEnumType(result.type)) {
    type = `${result.type.entries.map((e) => `'${e.name}'`).join(' | ')}`;
  } else if (result.variant === 'enum') {
    type = fqn(`${result.type}:./model/${result.type}.ts`, true);
  } else if (result.variant === 'record' || result.variant === 'union') {
    type = fqn(`${result.type}:./model/${result.type}.ts`, true);
  } else {
    type = 'any';
  }
  if (result.array) {
    type = `${type}[]`;
  }
  return type;
}

function toParameter(
  parameter: MParameter,
  config: TypescriptClientAPIGeneratorConfig,
  fqn: (type: string, typeOnly: boolean) => string
) {
  let type: string;
  if (isMBuiltinType(parameter.type)) {
    type = builtinToJSType(parameter.type);
  } else if (parameter.variant === 'scalar') {
    type = 'string';
  } else if (isMInlineEnumType(parameter.type)) {
    type = `${parameter.type.entries.map((e) => `'${e.name}'`).join(' | ')}`;
  } else if (parameter.variant === 'enum') {
    type = fqn(`${parameter.type}:./model/${parameter.type}.ts`, true);
  } else if (parameter.variant === 'record' || parameter.variant === 'union') {
    if (parameter.patch) {
      type = fqn(`${parameter.type}Patch:./model/${parameter.type}.ts`, true);
    } else {
      type = fqn(`${parameter.type}:./model/${parameter.type}.ts`, true);
    }
  } else {
    type = 'any';
  }
  const optional = parameter.optional ? '?' : '';
  const nullable = parameter.nullable ? ' | null' : '';
  if (parameter.array) {
    type = `${type}[]`;
  }

  return `${parameter.name}${optional}: ${type}${nullable}`;
}
