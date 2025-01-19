import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaServerGeneratorConfig,
  toPath,
} from '../java-gen-utils.js';
import { MResolvedMixinType } from '../model.js';
import { generateMixinContent as generateMixinContent_ } from '../java-model-api/mixin.js';

export function generateMixin(
  t: MResolvedMixinType,
  artifactConfig: JavaServerGeneratorConfig
): Artifact {
  const basePackageName = `${artifactConfig.rootPackageName}.service.model`;
  const packageName = `${basePackageName}.mixins`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  return {
    name: `${t.name}Mixin.java`,
    content: toString(
      generateCompilationUnit(
        packageName,
        importCollector,
        generateMixinContent_(
          t,
          artifactConfig.nativeTypeSubstitues,
          basePackageName,
          fqn
        )
      ),
      '\t'
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}
