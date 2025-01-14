import { CompositeGeneratorNode, NL } from 'langium/generate';
import { MResolvedUnionType } from '../model.js';

export function generateUnionContent(
  t: MResolvedUnionType,
  nativeTypeSubstitues: Record<string, string> | undefined,
  interfaceBasePackage: string,
  fqn: (type: string) => string
) {
  const Interface = fqn(`${interfaceBasePackage}.${t.name}`);
  const JsonObject = fqn('jakarta.json.JsonObject');

  const node = new CompositeGeneratorNode();
  node.append(
    `public abstract class ${t.name}DataImpl implements ${Interface}.Data {`,
    NL
  );
  node.indent((classBody) => {
    classBody.append(
      `public static ${Interface}.Data of(${JsonObject} obj) {`,
      NL
    );
    classBody.indent((methodBody) => {
      methodBody.append(
        `var descriminator = obj.getString("${t.descriminator}");`,
        NL
      );
      methodBody.append('return switch(descriminator) {', NL);
      methodBody.indent((caseBody) => {
        t.resolved.records.forEach((r, idx) => {
          const key = (t.descriminatorAliases ?? {})[r.name] ?? r;
          caseBody.append(`case "${key}" -> new ${r.name}DataImpl(obj);`, NL);
        });
        caseBody.append(
          'default -> throw new IllegalArgumentException("Unexpected value: %s".formatted(descriminator));',
          NL
        );
      });

      methodBody.append('};', NL);
    });
    classBody.append('}', NL);
  });
  node.append('}');
  return node;
}

/*
export function generateUnionContent(
  t: MResolvedUnionType,
  artifactConfig: JavaRestClientJDKGeneratorConfig,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();

  const DTOInterface = fqn(
    `${artifactConfig.rootPackageName}.dto.${t.name}DTO`
  );
  const JsonObject = fqn('jakarta.json.JsonObject');
  const JsonArray = fqn('jakarta.json.JsonArray');
  const Json = fqn('jakarta.json.Json');
  const JsonObjectBuilder = fqn('jakarta.json.JsonObjectBuilder');
  node.append(
    `public abstract class ${t.name}DTOImpl extends BaseDTOImpl implements ${DTOInterface} {`,
    NL
  );

  t.resolved.sharedProps
    .filter(isMProperty)
    .filter((p) => p.variant === 'inline-enum')
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
      initBody.append('super(data);', NL);
    });
    classBody.append('}', NL);

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
      methodBody.append('};', NL);
    });
    classBody.append('}', NL);
    classBody.appendNewLine();
    classBody.append(
      `public static ${fqn('java.util.List')}<${
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
    classBody.append('}', NL);
    const keyProp = t.resolved.sharedProps.find(
      (e) => e['@type'] === 'KeyProperty'
    );
    if (keyProp) {
      classBody.appendNewLine();
      classBody.append('@Override', NL);
      classBody.append('public String toString() {', NL);
      classBody.indent((methodBody) => {
        methodBody.append(
          `return "%s[%s=%s]".formatted(getClass().getSimpleName(), "${keyProp.name}", ${keyProp.name}());`,
          NL
        );
      });
      classBody.append('}', NL);
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
    classBody.append('}', NL);
  });

  node.append('}', NL);

  return node;
}
*/
