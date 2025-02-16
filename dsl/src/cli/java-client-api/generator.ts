import chalk from 'chalk';

import {
  Artifact,
  ArtifactGenerationConfig,
  ArtifactGeneratorConfig,
} from '../artifact-generator.js';
import {
  MResolvedRSDModel,
  MResolvedUserType,
  isMEnumType,
  isMMixinType,
  isMRecordType,
  isMUnionType,
} from '../model.js';
import { isDefined } from '../util.js';
import {
  JavaClientAPIGeneratorConfig,
  isJavaClientAPIGeneratorConfig,
} from '../java-gen-utils.js';

import { generateBase } from './base.js';
import { generateClient } from './client.js';
import { generateBaseService } from './base-service.js';
import { generateFactory } from './client-factory.js';
import { generateEnum } from './enum.js';
import { generateRecord } from './record.js';
import { generateUnion } from './union.js';
import { generateService } from './service.js';
import { generateError } from './error.js';
import { generateMixin } from './mixin.js';
import { generateRSDException } from './rsd-exception.js';

function generate(
  model: MResolvedRSDModel,
  generatorConfig: ArtifactGenerationConfig,
  artifactConfig: ArtifactGeneratorConfig
): readonly Artifact[] {
  console.log(chalk.cyan('Generating Java-Client-API'));

  if (!isJavaClientAPIGeneratorConfig(artifactConfig)) {
    console.log(
      chalk.red('  Invalid configuration passed aborted artifact generation')
    );
    return [];
  }

  const result = model.elements
    .map((e) => generateType(e, artifactConfig))
    .filter(isDefined);
  result.push(
    ...generateRSDException(
      model.errors,
      artifactConfig,
      artifactConfig.rootPackageName
    )
  );
  result.push(...model.errors.map((e) => generateError(e, artifactConfig)));
  result.push(generateBase(artifactConfig));
  result.push(generateBaseService(artifactConfig));
  result.push(generateClient(generatorConfig, artifactConfig));
  result.push(generateFactory(generatorConfig, artifactConfig));

  result.push(
    ...model.services
      .map((s) => generateService(s, artifactConfig))
      .filter(isDefined)
  );

  return result;
}

function generateType(
  t: MResolvedUserType,
  artifactConfig: JavaClientAPIGeneratorConfig
): Artifact | undefined {
  if (isMEnumType(t)) {
    if (
      artifactConfig.nativeTypeSubstitues &&
      t.name in artifactConfig.nativeTypeSubstitues
    ) {
      console.log(
        chalk.magenta(`  Skipped ${t.name}:`),
        `Using native ${artifactConfig.nativeTypeSubstitues[t.name]}`
      );
      return undefined;
    }
    return generateEnum(t, artifactConfig);
  } else if (isMRecordType(t)) {
    return generateRecord(t, artifactConfig);
  } else if (isMUnionType(t)) {
    return generateUnion(t, artifactConfig);
  } else if (isMMixinType(t)) {
    return generateMixin(t, artifactConfig);
  }
  return undefined;
}

export default {
  name: 'java-client-api',
  generate,
};
