import { CompositeGeneratorNode, NL, toString } from 'langium/generate';

import {
  JavaImportsCollector,
  JavaClientAPIGeneratorConfig,
  generateCompilationUnit,
  toPath,
} from '../java-gen-utils.js';
import { isMProperty, MResolvedUnionType } from '../model.js';
import { Artifact } from '../artifact-generator.js';
import { generateBuilderProperty, generateProperty } from './shared.js';
import { toFirstUpper } from '../util.js';

export function generateUnion(
  t: MResolvedUnionType,
  artifactConfig: JavaClientAPIGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.dto`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  return {
    name: `${t.name}DTO.java`,
    content: toString(
      generateCompilationUnit(
        packageName,
        importCollector,
        generateUnionContent(t, artifactConfig, fqn, packageName)
      )
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

export function generateUnionContent(
  t: MResolvedUnionType,
  artifactConfig: JavaClientAPIGeneratorConfig,
  fqn: (type: string) => string,
  packageName: string
) {
  const node = new CompositeGeneratorNode();
  t.resolved.sharedProps
    .filter(isMProperty)
    .filter((p) => p.variant === 'inline-enum')
    .forEach((p) => {
      const m = t.resolved.records
        .flatMap((r) => r.resolved.mixins)
        .find((m) => m.properties.includes(p));
      if (m) {
        fqn(`${packageName}.Mixin${m.name}DTO.${toFirstUpper(p.name)}`);
      }
    });

  node.append(`public interface ${t.name}DTO extends BaseDTO {`, NL);

  if (t.resolved.records.find((r) => r.patchable)) {
    node.indent((child) => {
      child.append('public interface Patch {}', NL);
    });
  }

  if (t.resolved.sharedProps.length > 0) {
    node.indent((child) => {
      t.resolved.sharedProps.forEach((p) =>
        generateProperty(child, p, artifactConfig, fqn)
      );
    });
    node.appendNewLine();
    node.indent((child) => {
      child.append(`public interface Builder extends BaseDTO.Builder {`, NL);
      child.indent((child) => {
        t.resolved.sharedProps.forEach((p) =>
          generateBuilderProperty(child, p, artifactConfig, fqn)
        );
        child.append(`public ${t.name}DTO build();`, NL);
      });
      child.append('}', NL);
    });
  }

  node.append('}', NL);
  return node;
}
