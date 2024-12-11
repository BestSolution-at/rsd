import { CompositeGeneratorNode, NL, toString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import { JavaImportsCollector, JavaClientAPIGeneratorConfig, generateCompilationUnit, toPath, resolveObjectType } from "../java-gen-utils.js";
import { MResolvedRecordType, allRecordProperties, isMInlineEnumType, isMKeyProperty, isMProperty, isMRevisionProperty } from "../model.js";
import { generateInlineEnum } from "./enum.js";
import { toFirstUpper } from "../util.js";
import { generateBuilderProperty, generateProperty } from "./shared.js";

export function generateRecord(t: MResolvedRecordType, artifactConfig: JavaClientAPIGeneratorConfig): Artifact | undefined {
    if( t.resolved.unions.length === 1 ) {
        return undefined;
    }
    const packageName = `${artifactConfig.rootPackageName}.dto`;

    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    return {
        name: `${t.name}DTO.java`,
        content: toString(generateCompilationUnit(packageName, importCollector, generateRecordContent(t, artifactConfig, fqn))),
        path: toPath(artifactConfig.targetFolder, packageName)
    };
}

export function generateRecordContent(t: MResolvedRecordType, artifactConfig: JavaClientAPIGeneratorConfig, fqn: (type: string) => string): CompositeGeneratorNode {
    const node = new CompositeGeneratorNode();

    const superTypes = t.resolved.unions.length > 0 ? [
        ...t.resolved.unions.map( u => `${u.name}DTO`)
    ] : [ 'BaseDTO' ];

    node.append(`public interface ${t.name}DTO extends ${superTypes.join(', ')} {`, NL)

    const sharedProps = t.resolved.unions.flatMap(u => u.resolved.sharedProps);

    const allProps = allRecordProperties(t);
    allProps
        .filter(isMProperty)
        .filter(p => p.variant === 'inline-enum')
        .filter(p => !sharedProps.includes(p))
        .forEach( p => {
            const inlineEnum = p.type;
            if( isMInlineEnumType(inlineEnum) ) {
                generateInlineEnum(inlineEnum, toFirstUpper(p.name), node)
            }
        });
    
    node.indent( child => {
        allProps.filter(p => !sharedProps.includes(p)).forEach( p => generateProperty(child, p, artifactConfig, fqn))
    })
    node.appendNewLine();

    node.indent(child => {
        child.append(`public interface Builder extends ${superTypes.map(s => `${s}.Builder`).join(', ')} {`, NL)
        child.indent( builderChild => {
            allProps.forEach(p => generateBuilderProperty(builderChild, p, artifactConfig, fqn))
            allProps
                .filter(isMProperty)
                .filter(p => p.variant === 'union' || p.variant === 'record')
                .forEach(p => {
                    const functionType = fqn('java.util.function.Function');
                    if( p.variant === 'record' ) {
                        builderChild.append(`public Builder with${toFirstUpper(p.name)}(${functionType}<${p.type}DTO.Builder, ${p.type}DTO> block);`,NL)
                    } else {
                        builderChild.append(`public <T extends ${p.type}DTO.Builder> Builder with${toFirstUpper(p.name)}(Class<T> clazz, ${functionType}<T, ${p.type}DTO> block);`,NL)
                    }
                });
            builderChild.append(`public ${t.name}DTO build();`, NL)
        } )
        child.append('}', NL)
        if( t.patchable ) {
            child.append('public interface Patch {',NL)
            child.indent( patchBody => {
                if( allProps.find( p => !isMKeyProperty(p) && !isMRevisionProperty(p) ) ) {
                    patchBody.append('public enum Props {',NL)
                    patchBody.indent(enumBody => {
                        allProps.filter( p => !isMKeyProperty(p) && !isMRevisionProperty(p) ).forEach( (p, idx) => {
                            enumBody.append(`${p.name.toUpperCase()},`,NL)
                        })
                    })
                    
                    patchBody.append('}',NL,NL)

                    patchBody.append('public boolean isSet(Props prop);', NL,NL)
                }
                
                allProps.forEach( p => {
                    if( isMKeyProperty(p) || isMRevisionProperty(p) ) {
                        generateProperty(patchBody, p, artifactConfig, fqn)
                    } else if( p.nullable === false && p.array === false ) {
                        generateProperty(patchBody, p, artifactConfig, fqn)
                    }
                } )
                allProps.forEach( p => {
                    if( ! isMKeyProperty(p) && ! isMRevisionProperty(p) && p.nullable === false && p.array === false ) {
                        const Consumer = fqn('java.util.function.Consumer');
                        if( p.variant === 'union' || p.variant === 'record' ) {

                        } else if( typeof p.type === 'string' ) {
                            patchBody.append(`public static void if${toFirstUpper(p.name)}(Patch dto, ${Consumer}<${resolveObjectType(p.type, artifactConfig.nativeTypeSubstitues, fqn)}> consumer) {`,NL)
                            patchBody.indent( mBody => {
                                mBody.append(`if( dto.isSet(Props.${p.name.toUpperCase()}) ) {`,NL)
                                mBody.indent( block => {
                                    block.append(`consumer.accept(dto.${p.name}());`,NL)
                                })
                                mBody.append('}',NL)
                            } )
                            patchBody.append('}',NL)
                        }
                    }
                })
            })
            child.append('}',NL)
        }
    });
    node.append('}',NL)
    return node
}

