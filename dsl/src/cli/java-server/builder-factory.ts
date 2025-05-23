import { CompositeGeneratorNode, NL, toString } from 'langium/generate';

import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaClientAPIGeneratorConfig,
  JavaImportsCollector,
  toPath,
} from '../java-gen-utils.js';

export function generateDTOBuilderFactory(
  artifactConfig: JavaClientAPIGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.service`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  return {
    name: 'BuilderFactory.java',
    content: toString(
      generateCompilationUnit(
        packageName,
        importCollector,
        generateDTOBuilderFactoryContent(packageName, fqn)
      ),
      '\t'
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

function generateDTOBuilderFactoryContent(
  packageName: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append('public interface BuilderFactory {', NL);
  node.indent((classBody) => {
    const Base = fqn(`${packageName}.model._Base`);
    classBody.append(
      `public <T extends ${Base}.BaseDataBuilder<?>> T builder(Class<T> type);`,
      NL
    );
  });
  node.append('}', NL);

  return node;
}
