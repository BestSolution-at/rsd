import chalk from "chalk";
import { Artifact, ArtifactGenerationConfig, ArtifactGeneratorConfig } from "../artifact-generator.js";
import { MResolvedRSDModel } from "../model.js";

export function generate(model: MResolvedRSDModel, generatorConfig: ArtifactGenerationConfig, artifactConfig: ArtifactGeneratorConfig): readonly Artifact [] {
    console.log(chalk.cyan('Generating Java-JDK-REST-Client'));
    

    return [];
}