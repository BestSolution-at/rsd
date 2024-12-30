import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaServerJakartaWSGeneratorConfig,
  toPath,
} from '../java-gen-utils.js';
import { isMProperty, MResolvedUnionType } from '../model.js';

import { addBuilderMethod } from './record.js';
import {
  generateConstructorProperty,
  generateProperty,
  generatePropertyAccess,
} from './shared.js';
import { toFirstUpper } from '../util.js';

export function generateUnion(
  t: MResolvedUnionType,
  artifactConfig: JavaServerJakartaWSGeneratorConfig
): Artifact[] {
  const packageName = `${artifactConfig.rootPackageName}.rest.dto`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  const JsonbTypeInfo = fqn('jakarta.json.bind.annotation.JsonbTypeInfo');
  const JsonbSubtype = fqn('jakarta.json.bind.annotation.JsonbSubtype');

  t.resolved.sharedProps
    .filter(isMProperty)
    .filter((p) => p.variant === 'inline-enum')
    .forEach((p) => {
      const m = t.resolved.records
        .flatMap((r) => r.resolved.mixins)
        .find((m) => m.properties.includes(p));
      if (m) {
        fqn(
          `${artifactConfig.rootPackageName}.service.dto.Mixin${
            m.name
          }DTO.${toFirstUpper(p.name)}`
        );
      }
    });

  const childRecords = t.resolved.records.filter(
    (r) => r.resolved.unions.length === 1
  );
  const node = new CompositeGeneratorNode();
  node.append(`@${JsonbTypeInfo}({`, NL);
  node.indent((child) => {
    childRecords.forEach((r) => {
      const desc = (t.descriminatorAliases ?? {})[r.name] ?? r.name;
      child.append(
        `@${JsonbSubtype}(alias = "${desc}", type = ${r.name}DTOImpl.class),`,
        NL
      );
    });
  });

  node.append('})', NL);
  node.append(
    `public abstract class ${t.name}DTOImpl implements ${artifactConfig.rootPackageName}.service.dto.${t.name}DTO {`,
    NL
  );

  node.indent((child) => {
    t.resolved.sharedProps.forEach((p) =>
      generateProperty(child, p, artifactConfig, fqn)
    );
  });

  node.appendNewLine();
  node.indent((body) => {
    body.append(`public ${t.name}DTOImpl() {}`, NL);
    body.append(`public ${t.name}DTOImpl(`, NL);
    body.indent((mBody) => {
      t.resolved.sharedProps.forEach((p, idx, arr) =>
        generateConstructorProperty(
          mBody,
          p,
          idx + 1 < arr.length ? ',' : ') {',
          artifactConfig,
          fqn
        )
      );
      t.resolved.sharedProps.forEach((p) =>
        mBody.append(`this.${p.name} = ${p.name};`, NL)
      );
    });
    body.append('}', NL);
  });

  node.indent((child) => {
    t.resolved.sharedProps.forEach((p) =>
      generatePropertyAccess(child, p, artifactConfig, fqn)
    );
  });
  node.appendNewLine();
  node.indent((body) => {
    body.append(
      `public static ${t.name}DTOImpl of(${artifactConfig.rootPackageName}.service.dto.${t.name}DTO source) {`,
      NL
    );
    body.indent((mBody) => {
      mBody.append('if(source == null) {', NL);
      mBody.indent((inner) => {
        inner.append('return null;', NL);
      });
      mBody.append('}', NL);
      mBody.append(`else if(source instanceof ${t.name}DTOImpl) {`, NL);
      mBody.indent((inner) => {
        inner.append(`return (${t.name}DTOImpl)source;`, NL);
      });
      mBody.append('}', NL);
      childRecords.forEach((r) => {
        const iface = fqn(
          `${artifactConfig.rootPackageName}.service.dto.${r.name}DTO`
        );
        mBody.append(`if(source instanceof ${iface} t) {`, NL);
        mBody.indent((inner) => {
          inner.append(`return ${r.name}DTOImpl.of(t);`, NL);
        });
        mBody.append('}', NL);
      });
      mBody.append(
        'throw new IllegalStateException("Unsupported type \'%s\'".formatted(source));',
        NL
      );
    });
    body.append('}', NL);
    body.appendNewLine();
    body.append(
      `public static abstract class BuilderImpl implements Builder {`,
      NL
    );
    body.indent((mBody) => {
      t.resolved.sharedProps.forEach((p) =>
        generateConstructorProperty(mBody, p, ';', artifactConfig, fqn)
      );
      mBody.appendNewLine();
      t.resolved.sharedProps.forEach((p) =>
        addBuilderMethod(mBody, p, artifactConfig, fqn)
      );
    });
    body.append('}', NL);
  });

  node.append('}');

  return [
    {
      name: `${t.name}DTOImpl.java`,
      content: toString(
        generateCompilationUnit(packageName, importCollector, node)
      ),
      path: toPath(artifactConfig.targetFolder, packageName),
    },
  ];
}
