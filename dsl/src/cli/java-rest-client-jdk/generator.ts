import chalk from 'chalk';
import {
  Artifact,
  ArtifactGenerationConfig,
  ArtifactGeneratorConfig,
} from '../artifact-generator.js';
import {
  isMRecordType,
  isMUnionType,
  MResolvedRSDModel,
  MResolvedUserType,
} from '../model.js';
import { generateClient } from './client.js';
import {
  isJavaRestClientJDKGeneratorConfig,
  JavaRestClientJDKGeneratorConfig,
} from '../java-gen-utils.js';
import { generateBase } from './base.js';
import { isDefined } from '../util.js';
import { generateRecord } from './record.js';
import { generateJsonUtils } from './json-utils.js';
import { generateUnion } from './union.js';
import { generateService } from './service.js';
import { generateServiceUtils } from './service-utils.js';
import { generateNillable } from './nillable-impl.js';
import { generateStreamImpls } from './stream-impl.js';

export function generate(
  model: MResolvedRSDModel,
  generatorConfig: ArtifactGenerationConfig,
  artifactConfig: ArtifactGeneratorConfig
): readonly Artifact[] {
  console.log(chalk.cyan('Generating Java-JDK-REST-Client'));

  if (!isJavaRestClientJDKGeneratorConfig(artifactConfig)) {
    console.log(
      chalk.red('  Invalid configuration passed aborted artifact generation')
    );
    return [];
  }

  const result: Artifact[] = [];
  result.push(generateClient(model, generatorConfig, artifactConfig));
  result.push(generateBase(artifactConfig));
  result.push(generateNillable(artifactConfig));
  result.push(generateJsonUtils(artifactConfig));
  result.push(generateServiceUtils(artifactConfig, model));
  result.push(
    ...model.elements
      .flatMap((e) => generateType(e, model, artifactConfig))
      .filter(isDefined)
  );
  result.push(...model.services.map((e) => generateService(e, artifactConfig)));
  result.push(...generateStreamImpls(artifactConfig, model));

  return result;
}

function generateType(
  t: MResolvedUserType,
  model: MResolvedRSDModel,
  artifactConfig: JavaRestClientJDKGeneratorConfig
): Artifact[] {
  if (isMRecordType(t)) {
    return generateRecord(t, model, artifactConfig);
  } else if (isMUnionType(t)) {
    return [generateUnion(t, artifactConfig)];
  }
  return [];
}

export default {
  name: 'java-rest-client-jdk',
  generate,
};
