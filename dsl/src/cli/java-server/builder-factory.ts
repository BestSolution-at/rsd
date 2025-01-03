import { expandToString } from "langium/generate";

import { Artifact } from "../artifact-generator.js";
import { JavaClientAPIGeneratorConfig, toPath } from "../java-gen-utils.js";

export function generateDTOBuilderFactory(
  artifactConfig: JavaClientAPIGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.service`;

  return {
    name: "DTOBuilderFactory.java",
    content: generateDTOBuilderFactoryContent(packageName),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

function generateDTOBuilderFactoryContent(packageName: string) {
  const content = expandToString`
        // Generated by RSD - Do not modify
        package ${packageName};

        import ${packageName}.dto.BaseDTO;

        public interface DTOBuilderFactory {
            public interface Builder {
                public BaseDTO build();
            }

            public <T extends BaseDTO.Builder> T builder(Class<T> type);
        }`;
  return content;
}
