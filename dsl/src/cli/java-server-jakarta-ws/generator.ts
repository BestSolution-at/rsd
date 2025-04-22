import chalk from 'chalk';
import {
  isMEnumType,
  isMRecordType,
  isMUnionType,
  MResolvedRSDModel,
  MResolvedUserType,
} from '../model.js';
import {
  Artifact,
  ArtifactGenerationConfig,
  ArtifactGeneratorConfig,
} from '../artifact-generator.js';
import {
  isJavaServerJakartaWSConfig,
  JavaServerJakartaWSGeneratorConfig,
} from '../java-gen-utils.js';

import { generateDTOBuilderFactory } from './builder-factory.js';
import { generateRecord } from './record.js';
import { generateBase } from './base.js';
import { generateJsonUtils } from './json-utils.js';
import { generateUnion } from './union.js';
import { generateResource } from './resource.js';
import { generateResponseBuilder } from './response-builder.js';
import { generateRestUtils } from './rest-utils.js';
import { generateNillable } from './nillable-impl.js';

export function generate(
  model: MResolvedRSDModel,
  generatorConfig: ArtifactGenerationConfig,
  artifactConfig: ArtifactGeneratorConfig
): readonly Artifact[] {
  console.log(chalk.cyan('Generating Java-Server-Jakarta-WS'));

  if (!isJavaServerJakartaWSConfig(artifactConfig)) {
    console.log(
      chalk.red('  Invalid configuration passed aborted artifact generation')
    );
    return [];
  }

  const result = model.elements.flatMap((e) =>
    generateType(e, model, artifactConfig)
  );
  result.push(generateBase(artifactConfig));
  result.push(generateJsonUtils(artifactConfig));
  result.push(generateNillable(artifactConfig));
  result.push(
    ...model.services.flatMap((e) => generateResource(e, artifactConfig))
  );
  result.push(generateDTOBuilderFactory(model, artifactConfig));
  result.push(
    ...model.services.map((s) =>
      generateResponseBuilder(s, model, artifactConfig)
    )
  );
  result.push(generateRestUtils(artifactConfig));

  return result;
}

function generateType(
  t: MResolvedUserType,
  model: MResolvedRSDModel,
  artifactConfig: JavaServerJakartaWSGeneratorConfig
): Artifact[] {
  if (isMEnumType(t)) {
  } else if (isMRecordType(t)) {
    return generateRecord(t, model, artifactConfig);
  } else if (isMUnionType(t)) {
    return generateUnion(t, artifactConfig);
  }

  return [];
}

export default {
  name: 'java-server-jakarta-ws',
  generate,
};
