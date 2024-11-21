import { CompositeGeneratorNode, NL, toString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import { JavaImportsCollector, JavaClientAPIGeneratorConfig, generateCompilationUnit, toPath } from "../java-gen-utils.js";
import { MResolvedRecordType, allRecordProperties, isMInlineEnumType, isMProperty } from "../model.js";
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
    });
    node.append('}',NL)
    return node
}

