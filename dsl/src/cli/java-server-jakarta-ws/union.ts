import { CompositeGeneratorNode, IndentNode, NL, toString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import { builtinToJavaType, generateCompilationUnit, JavaImportsCollector, JavaServerJakartaWSConfig, resolveObjectType, resolveType, toPath } from "../java-gen-utils.js";
import { allRecordProperties, isMInlineEnumType, isMKeyProperty, isMProperty, isMRevisionProperty, MKeyProperty, MProperty, MResolvedRecordType, MResolvedUnionType, MRevisionProperty } from "../model.js";
import { generateInlineEnum } from "./enum.js";
import { toFirstUpper } from "../util.js";

export function generateUnion(t: MResolvedUnionType, artifactConfig: JavaServerJakartaWSConfig): Artifact {
    const packageName = `${artifactConfig.rootPackageName}.rest.dto!`;

    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    const JsonbTypeInfo = fqn('jakarta.json.bind.annotation.JsonbTypeInfo');
    const JsonbSubtype = fqn('jakarta.json.bind.annotation.JsonbSubtype');

    const childRecords = t.resolved.records.filter(r => r.resolved.unions.length === 1);
    const node = new CompositeGeneratorNode();
    node.append(`@${JsonbTypeInfo}({`,NL)
    node.indent( child => {
        childRecords.forEach( r => {
            const desc = (t.descriminatorAliases ?? {})[r.name] ?? r.name;
            child.append(`@${JsonbSubtype}(alias = "${desc}", type = ${t.name}DTO.${r.name}DTO.class),`,NL);
        } )
    } );
    
    node.append('})',NL)
    node.append(`public abstract class ${t.name}DTO {`,NL)
    t.resolved.sharedProps
        .filter(isMProperty)
        .filter(p => p.variant === 'inline-enum')
        .forEach( p => {
            const inlineEnum = p.type;
            if( isMInlineEnumType(inlineEnum) ) {
                generateInlineEnum(inlineEnum, toFirstUpper(p.name), node)
            }
        });

    
    node.indent( child => {
        t.resolved.sharedProps.forEach( p => generateProperty(child, p, artifactConfig, fqn) )
    })

    
    node.indent( child => {
        childRecords.forEach( r => {
            child.appendNewLine()
            generateUnionRecordContent(child, r, t, artifactConfig, fqn);
        } )
    })


    node.append('}');

    return {
        name: `${t.name}DTO.java`,
        content: toString(generateCompilationUnit(packageName, importCollector, node)),
        path: toPath(artifactConfig.targetFolder, packageName)
    };
}

function generateUnionRecordContent(node: IndentNode, t: MResolvedRecordType, p: MResolvedUnionType, artifactConfig: JavaServerJakartaWSConfig, fqn: (type: string) => string) {
    node.append(`public static class ${t.name}DTO extends ${p.name}DTO {`,NL)

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
    
    node.append('}',NL)
}

function generateProperty(node: IndentNode, property: MKeyProperty | MRevisionProperty | MProperty, artifactConfig: JavaServerJakartaWSConfig, fqn: (type: string) => string) {
    if( isMKeyProperty(property) ) {
        node.append(`public ${builtinToJavaType(property.type, fqn)} ${property.name};`,NL)
    } else if( isMRevisionProperty(property) ) {
        node.append(`public ${builtinToJavaType(property.type, fqn)} ${property.name};`,NL)
    } else {
        if( property.variant === 'union' || property.variant === 'record' ) {
            if( property.array ) {
                node.append(`public ${fqn('java.util.List')}<${property.type}DTO> ${property.name};`,NL)
            } else {
                node.append(`public ${property.type}DTO ${property.name};`,NL)
            }
        } else if( typeof property.type === 'string' ) {
            if( property.array ) {
                node.append(`public ${fqn('java.util.List')}<${resolveObjectType(property.type, artifactConfig.nativeTypeSubstitues, fqn)}> ${property.name};`,NL)
            } else {
                node.append(`public ${resolveType(property.type, artifactConfig.nativeTypeSubstitues, fqn)} ${property.name};`,NL)
            }
        } else {
            node.append(`public ${toFirstUpper(property.name)} ${property.name};`,NL)
        }
    }
}