import { toString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import { generateCompilationUnit, JavaImportsCollector, JavaServerGeneratorConfig, toPath } from "../java-gen-utils.js";
import { MResolvedRecordType, MResolvedRSDModel } from "../model.js";
import { generateRecordContent } from "../java-client-api/record.js";

export function generateRecord(t: MResolvedRecordType, model: MResolvedRSDModel, artifactConfig: JavaServerGeneratorConfig): Artifact | undefined {
    if( t.resolved.unions.length === 1 ) {
        return undefined;
    }
    const packageName = `${artifactConfig.rootPackageName}.service.dto`;

    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    return {
        name: `${t.name}DTO.java`,
        content: toString(generateCompilationUnit(packageName, importCollector, generateRecordContent(t, artifactConfig, fqn))),
        path: toPath(artifactConfig.targetFolder, packageName)
    };
}