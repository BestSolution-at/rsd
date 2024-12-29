import chalk from "chalk";
import {
  isMEnumType,
  isMRecordType,
  isMUnionType,
  MResolvedRSDModel,
  MResolvedUserType,
} from "../model.js";
import {
  Artifact,
  ArtifactGenerationConfig,
  ArtifactGeneratorConfig,
} from "../artifact-generator.js";
import {
  isJavaServerJakartaWSConfig,
  JavaServerJakartaWSGeneratorConfig,
} from "../java-gen-utils.js";

import { generateRecord } from "./record.js";
import { generateUnion } from "./union.js";
import { generateService } from "./service.js";
import { generateDTOBuilderFactory } from "./builder-factory.js";

export function generate(
  model: MResolvedRSDModel,
  generatorConfig: ArtifactGenerationConfig,
  artifactConfig: ArtifactGeneratorConfig
): readonly Artifact[] {
  console.log(chalk.cyan("Generating Java-Server-Jakarta-WS"));

  if (!isJavaServerJakartaWSConfig(artifactConfig)) {
    console.log(
      chalk.red("  Invalid configuration passed aborted artifact generation")
    );
    return [];
  }

  const result = model.elements.flatMap((e) =>
    generateType(e, model, artifactConfig)
  );
  result.push(
    ...model.services.flatMap((e) => generateService(e, artifactConfig))
  );
  result.push(generateDTOBuilderFactory(model, artifactConfig));

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
  name: "java-server-jakarta-ws",
  generate,
};
