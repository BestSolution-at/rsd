import { CompositeGeneratorNode, NL, toString } from "langium/generate";

import { Artifact } from "../artifact-generator.js";
import { JavaImportsCollector, JavaClientAPIGeneratorConfig, generateCompilationUnit, resolveObjectType, resolveType, toPath } from "../java-gen-utils.js";
import { MParameter, MReturnType, MService } from "../model.js";
import { toType } from "./shared.js";

export function generateService(s: MService, artifactConfig: JavaClientAPIGeneratorConfig): Artifact {
    const packageName = `${artifactConfig.rootPackageName}`;

    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    const node = new CompositeGeneratorNode()
    node.append(`public interface ${s.name}Service extends BaseService {`, NL)
    node.indent( child => {
        s.operations.forEach( o => {
            const parameters = o.parameters.map( p => toParameter(p, artifactConfig, fqn))
            child.append(`public ${toResultType(o.resultType, artifactConfig, fqn)} ${o.name}(${parameters.join(',')});`, NL)
        } )
    })    
    node.append('}')

    return {
        name: `${s.name}Service.java`,
        content: toString(generateCompilationUnit(packageName,importCollector, node)),
        path: toPath(artifactConfig.targetFolder, packageName)
    }
}

function toParameter(parameter: MParameter, artifactConfig: JavaClientAPIGeneratorConfig, fqn: (type: string) => string) {
    return `${toType(parameter, artifactConfig, fqn)} ${parameter.name}`;
}

function toResultType(type: MReturnType | undefined, artifactConfig: JavaClientAPIGeneratorConfig, fqn: (type: string) => string) {
    const dtoPkg = `${artifactConfig.rootPackageName}.dto`;
    if( type === undefined ) {
        return 'void'
    }

    if( type.variant === 'union' || type.variant === 'record' ) {
        const dtoType = fqn(`${dtoPkg}.${type.type}DTO`);
        if( type.array ) {
            return `${fqn('java.util.List')}<${dtoType}>`
        } else {
            return dtoType
        }
    } else if( typeof type.type === 'string') {
        if( type.array ) {
            return `${fqn('java.util.List')}<${resolveObjectType(type.type, artifactConfig.nativeTypeSubstitues, fqn)}>`
        } else {
            return `${resolveType(type.type, artifactConfig.nativeTypeSubstitues, fqn)}`;
        }
    }
    return type.type;
}