import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaRestClientJDKGeneratorConfig,
  toPath,
} from '../java-gen-utils.js';
import { generateChangeContent } from '../java-model-json/change-impl.js';

export function generateChange(
  artifactConfig: JavaRestClientJDKGeneratorConfig
): Artifact[] {
  const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl.model`;
  const rv: Artifact[] = [];

  {
    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    rv.push({
      name: `_ChangeImpl.java`,
      content: toString(
        generateCompilationUnit(
          packageName,
          importCollector,
          generateChangeContent(`${artifactConfig.rootPackageName}.model`, fqn)
        ),
        '\t'
      ),
      path: toPath(artifactConfig.targetFolder, packageName),
    });
  }

  return rv;
}
