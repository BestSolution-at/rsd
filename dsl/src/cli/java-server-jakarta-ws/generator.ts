import chalk from "chalk";
import { isMEnumType, isMRecordType, isMUnionType, MResolvedRSDModel, MResolvedUserType } from "../model.js";
import { Artifact, ArtifactGenerationConfig, ArtifactGeneratorConfig } from "../artifact-generator.js";
import { isJavaServerJakartaWSConfig, JavaServerJakartaWSGeneratorConfig } from "../java-gen-utils.js";
import { isDefined } from "../util.js";
import { generateRecord } from "./record.js";
import { generateUnion } from "./union.js";
import { generateService } from "./service.js";

export function generate(model: MResolvedRSDModel, generatorConfig: ArtifactGenerationConfig, artifactConfig: ArtifactGeneratorConfig): readonly Artifact [] {
    console.log(chalk.cyan('Generating Java-Server-Jakarta-WS'));

    if( ! isJavaServerJakartaWSConfig(artifactConfig) ) {
        console.log(chalk.red('  Invalid configuration passed aborted artifact generation'));
        return [];
    }

    const result = model.elements.map( e => generateType(e, artifactConfig) ).filter(isDefined)
    result.push(...model.services.flatMap( e => generateService(e, artifactConfig)))

    return result;
}

function generateType(t: MResolvedUserType, artifactConfig: JavaServerJakartaWSGeneratorConfig): Artifact | undefined {
    if( isMEnumType(t) ) {

    } else if( isMRecordType(t) ) {
        return generateRecord(t, artifactConfig);
    } else if( isMUnionType(t) ) {
        return generateUnion(t, artifactConfig)
    }
    return undefined;
}

export default {
    name: 'java-server-jakarta-ws',
    generate
}