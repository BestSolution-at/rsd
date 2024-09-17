import { 
    CompositeGeneratorNode, 
    NL, 
    toString
} from "langium/generate";

import { 
    JavaImportsCollector,
    JavaClientAPIGeneratorConfig, generateCompilationUnit, toPath 
} from "../java-gen-utils.js";
import { 
    MResolvedUnionType, 
    isMInlineEnumType, 
    isMProperty 
} from "../model.js";
import { 
    Artifact 
} from "../artifact-generator.js";
import { 
    generateInlineEnum 
} from "./enum.js";
import { 
    toFirstUpper 
} from "../util.js";
import { 
    generateBuilderProperty, 
    generateProperty 
} from "./shared.js";
import { generateRecordContent } from "./record.js";

export function generateUnion(t: MResolvedUnionType, artifactConfig: JavaClientAPIGeneratorConfig): Artifact {
    const packageName = `${artifactConfig.rootPackageName}.dto`;

    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    const node = new CompositeGeneratorNode();
    node.append(`public interface ${t.name}DTO extends BaseDTO {`,NL)

    t.resolved.sharedProps
        .filter(isMProperty)
        .filter(p => p.variant === 'inline-enum')
        .forEach( p => {
            const inlineEnum = p.type;
            if( isMInlineEnumType(inlineEnum) ) {
                generateInlineEnum(inlineEnum, toFirstUpper(p.name), node)
            }
        });
    
    if( t.resolved.sharedProps.length > 0 ) {
        node.indent( child => {
            t.resolved.sharedProps.forEach( p => generateProperty(child, p, artifactConfig, fqn) )
        })
        node.appendNewLine()
        node.indent( child => {
            child.append(`public interface Builder extends BaseDTO.Builder {`, NL)
            child.indent( child => {
                t.resolved.sharedProps.forEach( p => generateBuilderProperty(child, p, artifactConfig, fqn) )
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
                child.append(generateRecordContent(r, artifactConfig, fqn));
            } )
        })
    }

    node.append('}',NL)

    return {
        name: `${t.name}DTO.java`,
        content: toString(generateCompilationUnit(packageName, importCollector, node)),
        path: toPath(artifactConfig.targetFolder, packageName)
    };
}