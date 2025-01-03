import { CompositeGeneratorNode, NL, toString } from "langium/generate";

import { Artifact } from "../artifact-generator.js";
import { JavaClientAPIGeneratorConfig, toPath } from "../java-gen-utils.js";
import { MEnumType, MInlineEnumType } from "../model.js";

export function generateEnum(
  t: MEnumType,
  artifactConfig: JavaClientAPIGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.dto`;

  const node = new CompositeGeneratorNode();
  node.append("// Generated by RSD - Do not modify", NL);
  node.append(`package ${packageName};`, NL, NL);
  node.append(`public enum ${t.name} {`, NL);
  node.indent((child) => {
    t.entries.forEach((e) => child.append(e.name, ",", NL));
  });
  node.append("}", NL);

  return {
    name: `${t.name}.java`,
    content: toString(node),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

export function generateInlineEnum(
  t: MInlineEnumType,
  name: string,
  node: CompositeGeneratorNode
) {
  node.indent((child) => {
    child.append(`public enum ${name} {`, NL);
    child.indent((enumBody) => {
      t.entries.forEach((e) => {
        enumBody.append(`${e.name},`, NL);
      });
    });
    child.append("}", NL, NL);
  });
}
