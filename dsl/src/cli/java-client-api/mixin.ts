import { CompositeGeneratorNode, NL, toString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import {
  generateCompilationUnit,
  JavaClientAPIGeneratorConfig,
  JavaImportsCollector,
  toPath,
} from "../java-gen-utils.js";
import {
  isMInlineEnumType,
  isMProperty,
  MResolvedMixinType,
} from "../model.js";
import { generateInlineEnum } from "./enum.js";
import { toFirstUpper } from "../util.js";
import { generateProperty } from "./shared.js";

export function generateMixin(
  t: MResolvedMixinType,
  artifactConfig: JavaClientAPIGeneratorConfig
): Artifact | undefined {
  const packageName = `${artifactConfig.rootPackageName}.dto`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  return {
    name: `Mixin${t.name}DTO.java`,
    content: toString(
      generateCompilationUnit(
        packageName,
        importCollector,
        generateMixinContent(t, artifactConfig, fqn)
      ),
      "\t"
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

export function generateMixinContent(
  t: MResolvedMixinType,
  artifactConfig: JavaClientAPIGeneratorConfig,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(`public interface Mixin${t.name}DTO {`, NL);
  node.indent((classBody) => {
    classBody.append(generateInlineEnums(t));
    classBody.append(generateBuilder(t));
    classBody.append(generatePropertyAccessors(t, artifactConfig, fqn));
  });
  node.append("}");

  return node;
}

function generateInlineEnums(t: MResolvedMixinType) {
  const node = new CompositeGeneratorNode();

  t.properties
    .filter(isMProperty)
    .filter((p) => p.variant === "inline-enum")
    .forEach((p) => {
      const inlineEnum = p.type;
      if (isMInlineEnumType(inlineEnum)) {
        generateInlineEnum(inlineEnum, toFirstUpper(p.name), node);
      }
    });
  return node;
}

function generatePropertyAccessors(
  t: MResolvedMixinType,
  artifactConfig: JavaClientAPIGeneratorConfig,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  t.properties.forEach((p) => {
    generateProperty(node, p, artifactConfig, fqn);
  });
  return node;
}

function generateBuilder(t: MResolvedMixinType) {
  const node = new CompositeGeneratorNode();
  node.append("public interface Builder {}", NL);
  return node;
}
