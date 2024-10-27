import { 
    toString
} from "langium/generate";

import { 
    JavaImportsCollector,
    JavaClientAPIGeneratorConfig, generateCompilationUnit, toPath 
} from "../java-gen-utils.js";
import { 
    MResolvedUnionType, 
} from "../model.js";
import { 
    Artifact 
} from "../artifact-generator.js";
import { generateUnionContent } from "../java-client-api/union.js";


export function generateUnion(t: MResolvedUnionType, artifactConfig: JavaClientAPIGeneratorConfig): Artifact {
    const packageName = `${artifactConfig.rootPackageName}.service.dto`;

    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    
    return {
        name: `${t.name}DTO.java`,
        content: toString(generateCompilationUnit(packageName, importCollector, generateUnionContent(t, artifactConfig, fqn))),
        path: toPath(artifactConfig.targetFolder, packageName)
    };
}
