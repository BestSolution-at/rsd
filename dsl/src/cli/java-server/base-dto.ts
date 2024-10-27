import { toString } from "langium/generate";

import { Artifact } from "../artifact-generator.js";
import { generateCompilationUnit, JavaClientAPIGeneratorConfig, JavaImportsCollector, toPath } from "../java-gen-utils.js";
import { generateBaseDTOContent } from "../java-client-api/base-dto.js";

export function generateBaseDTO(artifactConfig: JavaClientAPIGeneratorConfig): Artifact {
    const packageName = `${artifactConfig.rootPackageName}.service.dto`;
    
    return {
        name: 'BaseDTO.java',
        content: toString(generateCompilationUnit(packageName, new JavaImportsCollector(packageName), generateBaseDTOContent())),
        path: toPath(artifactConfig.targetFolder, packageName)
    }
}