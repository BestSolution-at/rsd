import { CompositeGeneratorNode, NL, toString } from "langium/generate";

import { Artifact } from "../artifact-generator.js";
import { generateCompilationUnit, JavaClientAPIGeneratorConfig, JavaImportsCollector, toPath } from "../java-gen-utils.js";

export function generateBaseDTO(artifactConfig: JavaClientAPIGeneratorConfig): Artifact {
    const packageName = `${artifactConfig.rootPackageName}.dto`;
    
    return {
        name: 'BaseDTO.java',
        content: toString(generateCompilationUnit(packageName, new JavaImportsCollector(packageName), generateBaseDTOContent())),
        path: toPath(artifactConfig.targetFolder, packageName)
    }
}

export function generateBaseDTOContent() {
    const node = new CompositeGeneratorNode()
    node.append(`public interface BaseDTO {`,NL)
    node.indent( child => {
        child.append(`public interface Builder {`, NL)
        child.indent( body => {
            body.append('public BaseDTO build();',NL)
        });
        child.append('}',NL)
    });
    node.append('}',NL)
    return node;
}