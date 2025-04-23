import chalk from 'chalk';
import {
  Artifact,
  ArtifactGenerationConfig,
  ArtifactGeneratorConfig,
} from '../artifact-generator.js';
import {
  isMEnumType,
  isMRecordType,
  isMUnionType,
  MResolvedRSDModel,
  MResolvedUserType,
} from '../model.js';
import {
  isTypescriptClientAPIGeneratorConfig,
  TypescriptClientAPIGeneratorConfig,
} from '../typescript-gen-utils.js';
import { isDefined } from '../util.js';
import { generateRecord } from './record.js';
import { generateEnum } from './enum.js';
import { generateUnion } from './union.js';
import { generateErrors } from './error.js';
import { generateService } from './service.js';
import { generateModelIndex } from './model-index.js';
import { generateServiceIndex } from './service-index.js';
import { generateApiIndex } from './api-index.js';

function generate(
  model: MResolvedRSDModel,
  generatorConfig: ArtifactGenerationConfig,
  artifactConfig: ArtifactGeneratorConfig
): readonly Artifact[] {
  console.log(chalk.cyan('Generating Typescript-Client-API'));

  if (!isTypescriptClientAPIGeneratorConfig(artifactConfig)) {
    console.log(
      chalk.red('  Invalid configuration passed aborted artifact generation')
    );

    return [];
  }
  const result = model.elements
    .map((e) => generateType(e, artifactConfig))
    .filter(isDefined);
  if (model.errors.length > 0) {
    result.push(generateErrors(model.errors, artifactConfig));
  }
  result.push(...model.services.map((s) => generateService(s, artifactConfig)));
  result.push(generateModelIndex(model, artifactConfig));
  result.push(generateServiceIndex(model, artifactConfig));
  result.push(generateApiIndex(artifactConfig));
  return result;
}

function generateType(
  t: MResolvedUserType,
  config: TypescriptClientAPIGeneratorConfig
): Artifact | undefined {
  if (isMRecordType(t)) {
    return generateRecord(t, config);
  } else if (isMEnumType(t)) {
    return generateEnum(t, config);
  } else if (isMUnionType(t)) {
    return generateUnion(t, config);
  }
  return undefined;
}

export default {
  name: 'typescript-client-api',
  generate,
};
