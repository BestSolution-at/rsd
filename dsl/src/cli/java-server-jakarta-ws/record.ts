import { CompositeGeneratorNode, NL, toString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import { builtinToJavaType, generateCompilationUnit, JavaImportsCollector, JavaServerJakartaWSConfig, resolveObjectType, resolveType, toPath } from "../java-gen-utils.js";
import { allRecordProperties, isMInlineEnumType, isMKeyProperty, isMProperty, isMRevisionProperty, MResolvedRecordType } from "../model.js";
import { toFirstUpper } from "../util.js";
import { generateInlineEnum } from "./enum.js";

export function generateRecord(t: MResolvedRecordType, artifactConfig: JavaServerJakartaWSConfig): Artifact | undefined {
    if( t.resolved.unions.length === 1 ) {
        return undefined;
    }
    const packageName = `${artifactConfig.rootPackageName}.rest.dto`;

    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    return {
        name: `${t.name}DTO.java`,
        content: toString(generateCompilationUnit(packageName, importCollector, generateRecordContent(t, artifactConfig, fqn))),
        path: toPath(artifactConfig.targetFolder, packageName)
    };
}

export function generateRecordContent(t: MResolvedRecordType, artifactConfig: JavaServerJakartaWSConfig, fqn: (type: string) => string): CompositeGeneratorNode {
    const node = new CompositeGeneratorNode();

    const allProps = allRecordProperties(t);
    
    node.append(`public record ${t.name}DTO(`,NL)
    node.indent( param => {
        allProps.forEach( (property, idx, arr) => {
            const end = idx + 1 < arr.length ? ',' : ') {'
            if( isMKeyProperty(property) ) {
                param.append(`${builtinToJavaType(property.type, fqn)} ${property.name}`, end, NL)
            } else if( isMRevisionProperty(property) ) {
                param.append(`${builtinToJavaType(property.type, fqn)} ${property.name}`, end, NL)
            } else {
                if( property.variant === 'union' || property.variant === 'record' ) {
                    if( property.array ) {
                        param.append(`${fqn('java.util.List')}<${property.type}DTO> ${property.name}`, end, NL)
                    } else {
                        param.append(`${property.type}DTO ${property.name}`, end, NL)
                    }
                } else if( typeof property.type === 'string' ) {
                    if( property.array ) {
                        param.append(`${fqn('java.util.List')}<${resolveObjectType(property.type, artifactConfig.nativeTypeSubstitues, fqn)}> ${property.name}`, end, NL)
                    } else {
                        param.append(`${resolveType(property.type, artifactConfig.nativeTypeSubstitues, fqn)} ${property.name}`, end, NL)
                    }
                } else {
                    param.append(`${toFirstUpper(property.name)} ${property.name}`, end, NL)
                }
            }
        });
    })

    allProps
        .filter(isMProperty)
        .filter(p => p.variant === 'inline-enum')
        .forEach( p => {
            const inlineEnum = p.type;
            if( isMInlineEnumType(inlineEnum) ) {
                generateInlineEnum(inlineEnum, toFirstUpper(p.name), node)
            }
        });
    
    node.append('}')

    return node;
}