import { CompositeGeneratorNode, NL, toString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import {
  builtinToJavaType,
  generateCompilationUnit,
  JavaImportsCollector,
  JavaRestClientJDKGeneratorConfig,
  toPath,
} from "../java-gen-utils.js";
import {
  isMKeyProperty,
  isMProperty,
  isMRevisionProperty,
  MResolvedUnionType,
} from "../model.js";
import { generateBuilderProperty, generateProperty } from "./shared.js";
import { toType } from "../java-client-api/shared.js";
import { toFirstUpper } from "../util.js";

export function generateUnion(
  t: MResolvedUnionType,
  artifactConfig: JavaRestClientJDKGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl.dto`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  return {
    name: `${t.name}DTOImpl.java`,
    content: toString(
      generateCompilationUnit(
        packageName,
        importCollector,
        generateUnionContent(t, artifactConfig, fqn)
      )
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

function generateUnionContent(
  t: MResolvedUnionType,
  artifactConfig: JavaRestClientJDKGeneratorConfig,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();

  const DTOInterface = fqn(
    `${artifactConfig.rootPackageName}.dto.${t.name}DTO`
  );
  const JsonObject = fqn("jakarta.json.JsonObject");
  const JsonArray = fqn("jakarta.json.JsonArray");
  const Json = fqn("jakarta.json.Json");
  const JsonObjectBuilder = fqn("jakarta.json.JsonObjectBuilder");
  node.append(
    `public abstract class ${t.name}DTOImpl extends BaseDTOImpl implements ${DTOInterface} {`,
    NL
  );

  t.resolved.sharedProps
    .filter(isMProperty)
    .filter((p) => p.variant === "inline-enum")
    .forEach((p) => {
      const m = t.resolved.records
        .flatMap((r) => r.resolved.mixins)
        .find((m) => m.properties.includes(p));
      if (m) {
        fqn(
          `${artifactConfig.rootPackageName}.dto.Mixin${
            m.name
          }DTO.${toFirstUpper(p.name)}`
        );
      }
    });

  node.indent((classBody) => {
    classBody.append(`${t.name}DTOImpl(${JsonObject} data) {`, NL);
    classBody.indent((initBody) => {
      initBody.append("super(data);", NL);
    });
    classBody.append("}", NL);

    if (t.resolved.sharedProps.length > 0) {
      t.resolved.sharedProps.forEach((p) => {
        classBody.appendNewLine();
        generateProperty(classBody, p, artifactConfig, fqn);
      });
    }

    classBody.appendNewLine();
    classBody.append(`public static ${t.name}DTO of(${JsonObject} data) {`, NL);
    classBody.indent((methodBody) => {
      methodBody.append(
        `var descriminator = data.getString("${t.descriminator}");`,
        NL
      );
      methodBody.append(`return switch(descriminator) {`, NL);
      methodBody.indent((switchBlock) => {
        t.types.forEach((subtype) => {
          const key = (t.descriminatorAliases ?? {})[subtype] ?? subtype;
          switchBlock.append(
            `case "${key}" -> new ${subtype}DTOImpl(data);`,
            NL
          );
        });
        switchBlock.append(
          `default -> throw new IllegalArgumentException("Unexpected value: %s".formatted(descriminator));`,
          NL
        );
      });
      methodBody.append("};", NL);
    });
    classBody.append("}", NL);
    classBody.appendNewLine();
    classBody.append(
      `public static ${fqn("java.util.List")}<${
        t.name
      }DTO> of(${JsonArray} data) {`,
      NL
    );
    classBody.indent((methodBody) => {
      methodBody.append(
        `return DTOUtils.mapObjects(data, ${t.name}DTOImpl::of);`,
        NL
      );
    });
    classBody.append("}", NL);
    const keyProp = t.resolved.sharedProps.find(
      (e) => e["@type"] === "KeyProperty"
    );
    if (keyProp) {
      classBody.appendNewLine();
      classBody.append("@Override", NL);
      classBody.append("public String toString() {", NL);
      classBody.indent((methodBody) => {
        methodBody.append(
          `return "%s[%s=%s]".formatted(getClass().getSimpleName(), "${keyProp.name}", ${keyProp.name}());`,
          NL
        );
      });
      classBody.append("}", NL);
    }
    classBody.appendNewLine();
    classBody.append(
      `public static abstract class BuilderImpl<T extends ${t.name}DTO> implements ${t.name}DTO.Builder {`,
      NL
    );
    classBody.indent((builderBody) => {
      builderBody.append(
        `protected final ${JsonObjectBuilder} $builder = ${Json}.createObjectBuilder();`,
        NL
      );
      t.resolved.sharedProps.forEach((p) => {
        builderBody.appendNewLine();
        generateBuilderProperty(builderBody, p, artifactConfig, fqn);
      });
    });
    classBody.append("}", NL);
    t.resolved.records.forEach((subtype) => {
      classBody.appendNewLine();
      classBody.append(
        `public static class ${subtype.name}DTOImpl extends ${t.name}DTOImpl implements ${subtype.name}DTO {`,
        NL
      );
      classBody.indent((subtypeBody) => {
        subtypeBody.append(`${subtype.name}DTOImpl(${JsonObject} data) {`, NL);
        subtypeBody.indent((initBody) => {
          initBody.append("super(data);", NL);
        });
        subtypeBody.append("}", NL);

        subtype.properties.forEach((prop) => {
          subtypeBody.appendNewLine();
          generateProperty(subtypeBody, prop, artifactConfig, fqn);
        });

        subtypeBody.append(
          `public static class BuilderImpl extends ${t.name}DTOImpl.BuilderImpl<${subtype.name}DTO> implements ${subtype.name}DTO.Builder {`,
          NL
        );
        subtypeBody.indent((subtypeBuilderBody) => {
          subtypeBuilderBody.append(`public BuilderImpl() {`, NL); // builder.add("@type", "daily");
          subtypeBuilderBody.indent((initBody) => {
            initBody.append(
              `$builder.add("@type","${
                (t.descriminatorAliases ?? {})[subtype.name] ?? subtype.name
              }");`,
              NL
            );
          });
          subtypeBuilderBody.append("}", NL);
          t.resolved.sharedProps.forEach((property) => {
            subtypeBuilderBody.appendNewLine();
            if (isMKeyProperty(property) || isMRevisionProperty(property)) {
              subtypeBuilderBody.append("@Override", NL);
              subtypeBuilderBody.append(
                `public ${subtype.name}DTO.Builder ${
                  property.name
                }(${builtinToJavaType(property.type, fqn)} ${property.name}) {`,
                NL
              );
              subtypeBuilderBody.indent((methodBody) => {
                methodBody.append(
                  `return (${subtype.name}DTO.Builder) super.${property.name}(${property.name});`,
                  NL
                );
              });
              subtypeBuilderBody.append("}", NL);
            } else {
              subtypeBuilderBody.append("@Override", NL);
              subtypeBuilderBody.append(
                `public ${subtype.name}DTO.Builder ${property.name}(${toType(
                  property,
                  artifactConfig,
                  fqn,
                  property.nullable
                )} ${property.name}) {`,
                NL
              );
              subtypeBuilderBody.indent((methodBody) => {
                methodBody.append(
                  `return (${subtype.name}DTO.Builder) super.${property.name}(${property.name});`,
                  NL
                );
              });
              subtypeBuilderBody.append("}", NL);
            }
          });
          subtype.properties.forEach((prop) => {
            subtypeBuilderBody.appendNewLine();
            generateBuilderProperty(
              subtypeBuilderBody,
              prop,
              artifactConfig,
              fqn,
              `${subtype.name}DTO`
            );
          });
          subtypeBuilderBody.appendNewLine();
          subtypeBuilderBody.append(`public ${subtype.name}DTO build() {`, NL);
          subtypeBuilderBody.indent((methodBody) => {
            methodBody.append(
              `return new ${subtype.name}DTOImpl($builder.build());`,
              NL
            );
          });
          subtypeBuilderBody.append("}", NL);
        });

        subtypeBody.append("}", NL);
      });
      classBody.append("}", NL);
    });
  });

  node.append("}", NL);

  return node;
}
