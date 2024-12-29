import { toString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaServerGeneratorConfig,
  toPath,
} from "../java-gen-utils.js";
import { MResolvedMixinType } from "../model.js";
import { generateMixinContent } from "../java-client-api/mixin.js";

export function generateMixin(
  t: MResolvedMixinType,
  artifactConfig: JavaServerGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.service.dto`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  return {
    name: `Mixin${t.name}DTO.java`,
    content: toString(
      generateCompilationUnit(
        packageName,
        importCollector,
        generateMixinContent(t, artifactConfig, fqn)
      )
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}
