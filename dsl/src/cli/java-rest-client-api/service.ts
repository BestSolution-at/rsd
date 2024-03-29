import { CompositeGeneratorNode, NL, toString } from "langium/generate";

import { Artifact } from "../artifact-generator.js";
import { JavaRestClientAPIGeneratorConfig, resolveObjectType, resolveType, toPath } from "../java-gen-utils.js";
import { MReturnType, MService } from "../model.js";

export function generateService(s: MService, artifactConfig: JavaRestClientAPIGeneratorConfig): Artifact {
    const packageName = `${artifactConfig.rootPackageName}`;

    const node = new CompositeGeneratorNode()
    node.append('// Generated by RSD - Do not modify',NL)
    node.append(`package ${packageName};`, NL, NL)
    node.append(`public interface ${s.name}Service {`, NL)
    node.indent( child => {
        s.operations.forEach( o => {
            child.append(`public ${toResultType(o.resultType, artifactConfig)} ${o.name}();`, NL)
        } )
    })    
    node.append('}')

    return {
        name: `${s.name}Service.java`,
        content: toString(node),
        path: toPath(artifactConfig.targetFolder, packageName)
    }
}

function toResultType(type: MReturnType | undefined, artifactConfig: JavaRestClientAPIGeneratorConfig) {
    if( type === undefined ) {
        return 'void'
    }

    if( type.variant === 'union' || type.variant === 'record' ) {
        if( type.array ) {
            return `java.util.List<${type.type}DTO>`
        } else {
            return `${type.type}DTO`
        }
    } else if( typeof type.type === 'string') {
        if( type.array ) {
            return `java.util.List<${resolveObjectType(type.type, artifactConfig.nativeTypeSubstitues)}>`
        } else {
            return `${resolveType(type.type, artifactConfig.nativeTypeSubstitues)}`;
        }
    }
    return type.type;
}