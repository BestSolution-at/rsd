import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import { MError } from '../model.js';
import {
  generateCompilationUnit,
  TypescriptClientAPIGeneratorConfig,
  TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateErrors(
  errors: readonly MError[],
  config: TypescriptClientAPIGeneratorConfig
): Artifact {
  const collector = new TypescriptImportCollector(config);
  const fqn = collector.importType.bind(collector);
  return {
    name: `Errors.ts`,
    content: toString(
      generateCompilationUnit(collector, generateErrorsContent(errors, fqn)),
      '\t'
    ),
    path: `${config.targetFolder}`,
  };
}

function generateErrorsContent(
  errors: readonly MError[],
  fqn: (t: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(
    `const errorTypes = new Set(['_Native', '_Status', ${errors
      .map((e) => `'${e.name}'`)
      .join(', ')}]);`,
    NL,
    NL
  );
  node.append(
    `export type ErrorType = '_Native' | '_Status'${
      errors.length > 0 ? ' | ' : ''
    }${errors.map((e) => `'${e.name}'`).join(' | ')};`,
    NL,
    NL
  );
  const RSDError = fqn('RSDError:./_result-utils.ts');
  node.append(
    `export function isKnownRSDError(value: unknown): value is ${RSDError}<ErrorType> {`,
    NL
  );
  node.indent((mBody) => {
    mBody.append('return (', NL);
    mBody.indent((andBlock) => {
      const isRecord = fqn('isRecord:./_type-utils.ts');
      const isString = fqn('isString:./_type-utils.ts');
      const checkProp = fqn('checkProp:./_type-utils.ts');
      andBlock.append(`${isRecord}(value) &&`, NL);
      andBlock.append(
        `${checkProp}(value, '_type', ${isString}, errorTypes.has.bind(errorTypes))`,
        NL
      );
    });
    mBody.append(');', NL);
  });
  node.append('}', NL, NL);
  node.append(`export type NativeRSDError = RSDError<'_Native'> & {`, NL);
  node.indent((block) => {
    block.append('error: Error;', NL);
  });
  node.append('};', NL, NL);
  node.append(`export type StatusRSDError = RSDError<'_Status'> & {`, NL);
  node.indent((block) => {
    block.append('status: number;', NL);
    block.append('message: string;', NL);
  });
  node.append('};', NL, NL);

  errors.forEach((e) => {
    const RSDError = fqn('RSDError:./_result-utils.ts');
    node.append(
      `export type ${e.name}Error = ${RSDError}<'${e.name}'> & { message: string };`,
      NL
    );
  });
  node.append(NL);
  node.append(
    `export function isNativeError(value: unknown): value is NativeRSDError {`,
    NL
  );
  node.indent((mBody) => {
    mBody.append(`return (`);
    mBody.indent((block) => {
      const isString = fqn('isString:./_type-utils.ts');
      const isRecord = fqn('isRecord:./_type-utils.ts');
      const checkProp = fqn('checkProp:./_type-utils.ts');

      block.append(`${isRecord}(value) &&`, NL);
      block.append(
        `${checkProp}(value, '_type', (v) => v === '_Native') &&`,
        NL
      );
      block.append(`${checkProp}(value, 'message', ${isString}) &&`, NL);
      block.append(
        `${checkProp}(value, 'error', (v) => v instanceof Error)`,
        NL
      );
    });
    mBody.append(`);`, NL);
  });
  node.append('}', NL, NL);
  node.append(
    `export function isStatusError(value: unknown): value is StatusRSDError {`,
    NL
  );
  node.indent((mBody) => {
    mBody.append(`return (`, NL);
    mBody.indent((block) => {
      const isString = fqn('isString:./_type-utils.ts');
      const isNumber = fqn('isNumber:./_type-utils.ts');
      const isRecord = fqn('isRecord:./_type-utils.ts');
      const checkProp = fqn('checkProp:./_type-utils.ts');

      block.append(`${isRecord}(value) &&`, NL);
      block.append(
        `${checkProp}(value, '_type', (v) => v === '_Status') &&`,
        NL
      );
      block.append(`${checkProp}(value, 'message', ${isString}) &&`, NL);
      block.append(`${checkProp}(value, 'status', ${isNumber})`, NL);
    });
    mBody.append(');', NL);
  });
  node.append('}', NL, NL);

  errors.forEach((e) => {
    node.append(
      `export function is${e.name}Error(value: unknown): value is ${e.name}Error {`,
      NL
    );
    node.indent((mBody) => {
      mBody.append('return (', NL);
      mBody.indent((andBlock) => {
        const isRecord = fqn('isRecord:./_type-utils.ts');
        const isString = fqn('isString:./_type-utils.ts');
        const checkProp = fqn('checkProp:./_type-utils.ts');
        andBlock.append(`${isRecord}(value) &&`, NL);
        andBlock.append(
          `${checkProp}(value, '_type', v => v === '${e.name}') &&`,
          NL
        );
        andBlock.append(`${checkProp}(value, 'message', ${isString})`, NL);
      });
      mBody.append(');', NL);
    });
    node.append('}', NL);
  });
  return node;
}
