import chalk from 'chalk';
import {
  Artifact,
  ArtifactGenerationConfig,
  ArtifactGeneratorConfig,
} from '../artifact-generator.js';
import { MResolvedRSDModel } from '../model.js';
import { isTypescriptFetchClientGeneratorConfig } from '../typescript-gen-utils.js';
import { generateService } from './service.js';

function generate(
  model: MResolvedRSDModel,
  generatorConfig: ArtifactGenerationConfig,
  artifactConfig: ArtifactGeneratorConfig
): readonly Artifact[] {
  console.log(chalk.cyan('Generating Typescript Rest-Client-Fetch'));

  if (!isTypescriptFetchClientGeneratorConfig(artifactConfig)) {
    console.log(
      chalk.red('  Invalid configuration passed aborted artifact generation')
    );

    return [];
  }
  return model.services.map((s) => generateService(s, artifactConfig));
}

export default {
  name: 'typescript-rest-client-fetch',
  generate,
};
