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
      methodBody.append('return switch (descriminator) {', NL);
      methodBody.indent((caseBody) => {
        t.resolved.records.forEach((r, idx) => {
          const key = (t.descriminatorAliases ?? {})[r.name] ?? r.name;
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
  node.append('}', NL);
  return node;
}
