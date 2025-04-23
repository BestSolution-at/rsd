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
  const collector = new TypescriptImportCollector();
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
    `const errorTypes = new Set([${errors
      .map((e) => `'${e.name}'`)
      .join(', ')}]);`,
    NL,
    NL
  );
  node.append(
    `export type ErrorType = ${errors.map((e) => `'${e.name}'`).join(' | ')};`,
    NL,
    NL
  );
  const RSDError = fqn('RSDError:./_result-utils.ts');
  node.append(
    `export function isRSDError(value: unknown): value is ${RSDError}<ErrorType> {`,
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
  errors.forEach((e) => {
    const RSDError = fqn('RSDError:./_result-utils.ts');
    node.append(
      `export type ${e.name}Error = ${RSDError}<'${e.name}'> & { message: string };`,
      NL
    );
  });
  node.append(NL);
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
        andBlock.append(`${checkProp}(value, '_type', ${isString})`, NL);
      });
      mBody.append(');', NL);
    });
    node.append('}', NL);
  });
  return node;
}
