import { CompositeGeneratorNode, NL, toString } from "langium/generate";

import { Artifact, ArtifactGenerationConfig } from "../artifact-generator.js";
import {
  JavaImportsCollector,
  JavaClientAPIGeneratorConfig,
  generateCompilationUnit,
  toPath,
} from "../java-gen-utils.js";
import { toFirstUpper } from "../util.js";

export function generateClient(
  generatorConfig: ArtifactGenerationConfig,
  artifactConfig: JavaClientAPIGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  const uriType = fqn("java.net.URI");
  const slType = fqn("java.util.ServiceLoader");
  const clFactoryType = fqn(
    `${artifactConfig.rootPackageName}.spi.${toFirstUpper(
      generatorConfig.name
    )}ClientFactory`
  );
  const baseDTOType = fqn(`${artifactConfig.rootPackageName}.dto.BaseDTO`);

  const content = new CompositeGeneratorNode();

  content.append(
    `public interface ${toFirstUpper(generatorConfig.name)}Client {`,
    NL
  );
  content.indent((client) => {
    client.append(
      `public static ${toFirstUpper(
        generatorConfig.name
      )}Client create(${uriType} baseURL) {`,
      NL
    );
    client.indent((body) => {
      body.append(
        `return ${slType}.load(${clFactoryType}.class).iterator().next().create(baseURL);`,
        NL
      );
    });
    client.append("}", NL);
    client.append(
      `public <T extends ${baseDTOType}.Builder> T builder(Class<T> clazz);`,
      NL
    );
    client.append(
      "public <T extends BaseService> T service(Class<T> clazz);",
      NL
    );
  });

  content.append("}", NL);

  return {
    name: `${toFirstUpper(generatorConfig.name)}Client.java`,
    content: toString(
      generateCompilationUnit(packageName, importCollector, content)
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}
