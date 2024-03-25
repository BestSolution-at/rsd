import chalk from "chalk";
import { Artifact, ArtifactGenerationConfig, ArtifactGeneratorConfig } from "../artifact-generator.js";
import { MEnumType, MKeyProperty, MProperty, MRSDModel, MResolvedRSDModel, MResolvedRecordType, MResolvedUnionType, MResolvedUserType, MRevisionProperty, allRecordProperties, isMEnumType, isMKeyProperty, isMProperty, isMRecordType, isMRevisionProperty, isMUnionType } from "../model.js";
import { CompositeGeneratorNode, IndentNode, NL, toString } from "langium/generate";
import { isDefined, toFirstUpper } from "../util.js";
import { builtinToJavaType, reolveType } from "../java-gen-utils.js";

export type JavaRestClientAPIGeneratorConfig = ArtifactGenerationConfig & {
    targetFolder: string
    rootPackageName: string
    nativeTypeSubstitues?: Record<string, string>
}

function toPath(targetFolder: string, packageName: string) {
    return `${targetFolder}/${packageName.replaceAll('.','/')}`; 
}

function isJavaRestClientAPIGeneratorConfig(config: ArtifactGeneratorConfig): config is JavaRestClientAPIGeneratorConfig {
    return 'targetFolder' in config && typeof config.targetFolder === 'string'
        && 'rootPackageName' in config && typeof config.rootPackageName === 'string';
}

function generate(model: MResolvedRSDModel, generatorConfig: ArtifactGenerationConfig, artifactConfig: ArtifactGeneratorConfig): readonly Artifact [] {
    console.log(chalk.cyan('Generating Java-Client-API!'));
    
    if( ! isJavaRestClientAPIGeneratorConfig(artifactConfig) ) {
        console.log(chalk.red('  Invalid configuration passed aborted artifact generation'));
        return [];
    }

    const result = model.elements.map( e => generateType(e, model, artifactConfig) ).filter(isDefined)
    result.push(generateBaseDTO(artifactConfig))

    return result;
}

function generateBaseDTO(artifactConfig: JavaRestClientAPIGeneratorConfig): Artifact {
    const packageName = `${artifactConfig.rootPackageName}.dto`;
    const node = new CompositeGeneratorNode()
    node.append(`package ${packageName};`, NL, NL)
    node.append(`public interface BaseDTO {`,NL)
    node.indent( child => {
        child.append(`public interface Builder {`, NL)
        child.indent( body => {
            body.append('public BaseDTO build();',NL)
        });
        child.append('}',NL)
    });
    node.append('}',NL)
    return {
        name: 'BaseDTO.java',
        content: toString(node),
        path: toPath(artifactConfig.targetFolder, packageName)
    }
}

function generateType(t: MResolvedUserType, model: MRSDModel, artifactConfig: JavaRestClientAPIGeneratorConfig): Artifact | undefined {
    if( isMEnumType(t) ) {
        if( artifactConfig.nativeTypeSubstitues && t.name in artifactConfig.nativeTypeSubstitues ) {
            console.log(chalk.magenta(`  Skipped ${t.name}:`), `Using native ${artifactConfig.nativeTypeSubstitues[t.name]}`);
            return undefined;
        }
        return generateEnum(t, artifactConfig);
    } else if( isMRecordType(t) ) {
        return generateRecord(t, artifactConfig);
    } else if( isMUnionType(t) ) {
        return generateUnion(t, artifactConfig)
    }
    return undefined
}

function generateUnion(t: MResolvedUnionType, artifactConfig: JavaRestClientAPIGeneratorConfig): Artifact {
    const packageName = `${artifactConfig.rootPackageName}.dto`;

    const node = new CompositeGeneratorNode()
    node.append(`package ${packageName};`, NL, NL)
    node.append(`public interface ${t.name}DTO extends BaseDTO {`,NL)
    
    if( t.resolved.sharedProps.length > 0 ) {
        node.indent( child => {
            t.resolved.sharedProps.forEach( p => generateProperty(child, p, artifactConfig) )
        })
        node.appendNewLine()
        node.indent( child => {
            child.append(`public interface Builder extends BaseDTO.Builder {`, NL)
            child.indent( child => {
                t.resolved.sharedProps.forEach( p => generateBuilderProperty(child, p, artifactConfig) )
                child.append(`public ${t.name}DTO build();`, NL)
            })
            child.append('}',NL)
        });
    }

    const childRecords = t.resolved.records.filter(r => r.resolved.unions.length === 1);
    if( childRecords.length > 0 ) {
        node.indent( child => {
            childRecords.forEach( r => {
                child.appendNewLine()
                generateRecordContent(child, r, artifactConfig);
            } )
        })
    }

    node.append('}',NL)

    return {
        name: `${t.name}DTO.java`,
        content: toString(node),
        path: toPath(artifactConfig.targetFolder, packageName)
    };
}

function generateEnum(t: MEnumType, artifactConfig: JavaRestClientAPIGeneratorConfig): Artifact {
    const packageName = `${artifactConfig.rootPackageName}.dto`;

    const node = new CompositeGeneratorNode()

    node.append(`package ${packageName};`, NL, NL)
    node.append(`public enum ${t.name} {`, NL)
    node.indent( child => {
        t.entries.forEach( e => child.append(e.name, ',', NL) )
    } )
    node.append('}',NL)

    return {
        name: `${t.name}.java`,
        content: toString(node),
        path: toPath(artifactConfig.targetFolder, packageName)
    };
}

function generateRecord(t: MResolvedRecordType, artifactConfig: JavaRestClientAPIGeneratorConfig): Artifact | undefined {
    if( t.resolved.unions.length === 1 ) {
        return undefined;
    }
    const packageName = `${artifactConfig.rootPackageName}.dto`;
    const node = new CompositeGeneratorNode();
    node.append(`package ${packageName};`, NL, NL)

    return {
        name: `${t.name}DTO.java`,
        content: toString(generateRecordContent(node, t, artifactConfig)),
        path: toPath(artifactConfig.targetFolder, packageName)
    };
}

function generateRecordContent(node: CompositeGeneratorNode, t: MResolvedRecordType, artifactConfig: JavaRestClientAPIGeneratorConfig): CompositeGeneratorNode {
    const superTypes = t.resolved.unions.length > 0 ? [
        ...t.resolved.unions.map( u => `${u.name}DTO`)
    ] : [ 'BaseDTO' ];

    node.append(`public interface ${t.name}DTO extends ${superTypes.join(', ')} {`, NL)

    const allProps = allRecordProperties(t);
    node.indent( child => {
        allProps.forEach( p => generateProperty(child, p, artifactConfig))
    })
    node.appendNewLine();
    node.indent(child => {
        child.append(`public interface Builder extends ${superTypes.map(s => `${s}.Builder`).join(', ')} {`, NL)
        child.indent( builderChild => {
            allProps.forEach(p => generateBuilderProperty(builderChild, p, artifactConfig))
            allProps
                .filter(isMProperty)
                .filter(p => p.variant === 'union' || p.variant === 'record')
                .forEach(p => {
                    builderChild.append(`public <T extends ${p.type}DTO.Builder> Builder with${toFirstUpper(p.name)}(Class<T> clazz, java.util.function.Function<T, ${p.type}DTO>);`,NL)
                });
            builderChild.append(`public ${t.name}DTO build();`, NL)
        } )
        child.append('}', NL)
    });
    node.append('}',NL)
    return node
}

function generateBuilderProperty(node: IndentNode, property: MKeyProperty | MRevisionProperty | MProperty, artifactConfig: JavaRestClientAPIGeneratorConfig) {
    if( isMKeyProperty(property) ) {
        node.append(`public Builder ${property.name}(${builtinToJavaType(property.type)} ${property.name});`,NL)
    } else if( isMRevisionProperty(property) ) {
        node.append(`public Builder ${property.name}(${builtinToJavaType(property.type)} ${property.name});`,NL)
    } else {
        if( property.variant === 'union' || property.variant === 'record' ) {
            node.append(`public Builder ${property.name}(${property.type}DTO ${property.name});`,NL)
        } else {
            node.append(`public Builder ${property.name}(${reolveType(property.type, artifactConfig.nativeTypeSubstitues)} ${property.name});`,NL)
        }
        
    }
}

function generateProperty(node: IndentNode, property: MKeyProperty | MRevisionProperty | MProperty, artifactConfig: JavaRestClientAPIGeneratorConfig) {
    if( isMKeyProperty(property) ) {
        node.append(`public ${builtinToJavaType(property.type)} ${property.name}();`,NL)
    } else if( isMRevisionProperty(property) ) {
        node.append(`public ${builtinToJavaType(property.type)} ${property.name}();`,NL)
    } else {
        if( property.variant === 'union' || property.variant === 'record' ) {
            node.append(`public ${property.type}DTO ${property.name}();`,NL)
        } else {
            node.append(`public ${reolveType(property.type, artifactConfig.nativeTypeSubstitues)} ${property.name}();`,NL)
        }
        
    }
}

export default {
    name: 'java-rest-client-api',
    generate
}