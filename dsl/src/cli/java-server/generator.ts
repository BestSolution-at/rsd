import chalk from "chalk";
import { Artifact, ArtifactGenerationConfig, ArtifactGeneratorConfig } from "../artifact-generator.js";
import { isMEnumType, isMRecordType, isMUnionType, MResolvedRSDModel, MResolvedUserType } from "../model.js";
import { isJavaServerConfig, JavaServerGeneratorConfig } from "../java-gen-utils.js";
import { isDefined } from "../util.js";
import { generateRecord } from "./record.js";
import { generateBaseDTO } from "./base-dto.js";
import { generateUnion } from "./union.js";
import { generateDTOBuilderFactory } from "./builder-factory.js";

export function generate(model: MResolvedRSDModel, generatorConfig: ArtifactGenerationConfig, artifactConfig: ArtifactGeneratorConfig): readonly Artifact[] {
    console.log(chalk.cyan('Generating Java-Server'));

    if( ! isJavaServerConfig(artifactConfig) ) {
        console.log(chalk.red('  Invalid configuration passed aborted artifact generation'));
        return [];
    }

    const result = model.elements.map( e => generateType(e, model, artifactConfig) ).filter(isDefined)
    result.push(generateBaseDTO(artifactConfig))
    result.push(generateDTOBuilderFactory(artifactConfig))
    // result.push(...model.services.flatMap( e => generateService(e, artifactConfig)))

    return result;
}

function generateType(t: MResolvedUserType, model: MResolvedRSDModel, artifactConfig: JavaServerGeneratorConfig): Artifact | undefined {
    if( isMEnumType(t) ) {
        if( artifactConfig.nativeTypeSubstitues && t.name in artifactConfig.nativeTypeSubstitues ) {
            console.log(chalk.magenta(`  Skipped ${t.name}:`), `Using native ${artifactConfig.nativeTypeSubstitues[t.name]}`);
            return undefined;
        }
        //return generateEnum(t, artifactConfig);
    } else if( isMRecordType(t) ) {
        return generateRecord(t, model, artifactConfig);
    } else if( isMUnionType(t) ) {
        return generateUnion(t, artifactConfig)
    }
    return undefined
}

export default {
    name: 'java-server-base',
    generate
}