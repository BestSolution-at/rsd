import { CompositeGeneratorNode, NL, toString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import { generateCompilationUnit, JavaImportsCollector, JavaRestClientJDKGeneratorConfig, toPath } from "../java-gen-utils.js";
import { MResolvedOperation, MResolvedService } from "../model.js";
import { toFirstUpper } from "../util.js";
import { toType } from "../java-client-api/shared.js";

export function generateService(s: MResolvedService, artifactConfig: JavaRestClientJDKGeneratorConfig): Artifact[] {
    const result : Artifact[] = []; 
    const serviceDTOs = s.operations
        .filter( o => o.parameters.filter( p => p.meta?.rest?.source === undefined).length > 1 )
        .map( o => generateServiceDTO(s, o, artifactConfig) )
    result.push(...serviceDTOs)

    return result;
}

function generateServiceDTO(s: MResolvedService, o: MResolvedOperation, artifactConfig: JavaRestClientJDKGeneratorConfig): Artifact {
    const packageName = `${artifactConfig.rootPackageName}.dto`;

    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    const node = new CompositeGeneratorNode();
    node.append(`public record ${s.name}${toFirstUpper(o.name)}DTO(`,NL);
    node.indent( argNode => {
        o.parameters
        .filter( p => p.meta?.rest?.source === undefined )
        .forEach( (p, idx, arr) => {
            argNode.append(`${toType(p, artifactConfig, fqn)} ${p.name}`)
            if( idx + 1 < arr.length ) {
                argNode.append(',',NL)
            } else {
                argNode.append(') {', NL)
            }
        } )
    } )

    node.append('}')

    return {
        name: `${s.name}${toFirstUpper(o.name)}DTO.java`,
        content: toString(generateCompilationUnit(packageName, importCollector, node)),
        path: toPath(artifactConfig.targetFolder, packageName)
    };
}