import {
  CompositeGeneratorNode,
  IndentNode,
  NL,
  toString,
} from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  JavaImportsCollector,
  JavaClientAPIGeneratorConfig,
  generateCompilationUnit,
  toPath,
  resolveObjectType,
} from '../java-gen-utils.js';
import {
  MBaseProperty,
  MResolvedRecordType,
  allRecordProperties,
  isMInlineEnumType,
  isMKeyProperty,
  isMProperty,
  isMRevisionProperty,
} from '../model.js';
import { generateInlineEnum } from './enum.js';
import { toFirstUpper } from '../util.js';
import { generateBuilderProperty, generateProperty } from './shared.js';
import { generateRecordContent as generateRecordContent_ } from '../java-model-api/record.js';

export function generateRecord(
  t: MResolvedRecordType,
  artifactConfig: JavaClientAPIGeneratorConfig
): Artifact | undefined {
  const packageName = `${artifactConfig.rootPackageName}.model`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  return {
    name: `${t.name}.java`,
    content: toString(
      generateCompilationUnit(
        packageName,
        importCollector,
        generateRecordContent_(
          t,
          artifactConfig.nativeTypeSubstitues,
          packageName,
          fqn
        )
      ),
      '\t'
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

export function generateRecordPatch(
  child: IndentNode,
  allProps: readonly MBaseProperty[],
  artifactConfig: JavaClientAPIGeneratorConfig,
  fqn: (type: string) => string,
  superPatchTypes: string[]
) {
  if (superPatchTypes.length > 0) {
    child.append(
      `public interface Patch extends ${superPatchTypes
        .map((t) => `${t}.Patch`)
        .join(', ')} {`,
      NL
    );
  } else {
    child.append('public interface Patch {', NL);
  }

  child.indent((patchBody) => {
    if (allProps.find((p) => !isMKeyProperty(p) && !isMRevisionProperty(p))) {
      patchBody.append('public enum Props {', NL);
      patchBody.indent((enumBody) => {
        allProps
          .filter((p) => !isMKeyProperty(p) && !isMRevisionProperty(p))
          .forEach((p, idx) => {
            enumBody.append(`${p.name.toUpperCase()},`, NL);
          });
      });

      patchBody.append('}', NL, NL);

      patchBody.append('public boolean isSet(Props prop);', NL, NL);
    }

    allProps.forEach((p) => {
      if (isMKeyProperty(p) || isMRevisionProperty(p)) {
        generateProperty(patchBody, p, artifactConfig, fqn);
      } else {
        if (p.array === false) {
          generateProperty(patchBody, p, artifactConfig, fqn, true);
        } else {
          if (
            p.variant === 'inline-enum' ||
            p.variant === 'enum' ||
            p.variant === 'builtin'
          ) {
            generateProperty(patchBody, p, artifactConfig, fqn, true);
          }
        }
      }
    });

    allProps.forEach((p) => {
      if (!isMKeyProperty(p) && !isMRevisionProperty(p)) {
        let singleType = '';
        if (isMInlineEnumType(p.type)) {
          singleType = toFirstUpper(p.name);
        } else if (p.variant === 'record' || p.variant === 'union') {
          singleType = `Either<${p.type}DTO.Patch, ${p.type}DTO>`;
        } else {
          singleType = resolveObjectType(
            p.type,
            artifactConfig.nativeTypeSubstitues,
            fqn
          );
        }

        const type = p.array
          ? `${fqn('java.util.List')}<${singleType}>`
          : singleType;
        const Consumer = fqn('java.util.function.Consumer');
        const Function = fqn('java.util.function.Function');

        patchBody.append(
          `public static void if${toFirstUpper(
            p.name
          )}(Patch dto, ${Consumer}<${type}> consumer) {`,
          NL
        );
        patchBody.indent((mBody) => {
          mBody.append(`if( dto.isSet(Props.${p.name.toUpperCase()}) ) {`, NL);
          mBody.indent((block) => {
            block.append(`consumer.accept(dto.${p.name}());`, NL);
          });
          mBody.append('}', NL);
        });
        patchBody.append('}', NL);

        patchBody.append(
          `public static <T> T if${toFirstUpper(
            p.name
          )}(Patch dto, ${Function}<${type}, T> consumer, T defaultValue) {`,
          NL
        );
        patchBody.indent((mBody) => {
          mBody.append(`if( dto.isSet(Props.${p.name.toUpperCase()}) ) {`, NL);
          mBody.indent((block) => {
            block.append(`return consumer.apply(dto.${p.name}());`, NL);
          });
          mBody.append('}', NL);

          mBody.append('return defaultValue;', NL);
        });

        patchBody.append('}', NL);
      }
    });
    /*allProps.forEach((p) => {
      if (!isMKeyProperty(p) && !isMRevisionProperty(p)) {
        if (p.array) {
          if (p.variant === 'inline-enum' || p.variant === 'enum') {
            let type: string = '';
            if (typeof p.type === 'string') {
              type = resolveType(
                p.type,
                artifactConfig.nativeTypeSubstitues,
                fqn,
                p.nullable || p.optional || p.array
              );
            } else {
              type = toFirstUpper(p.name);
            }

            const Consumer = fqn('java.util.function.Consumer');
            const Function = fqn('java.util.function.Function');
            const List = fqn('java.util.List');

            patchBody.append(
              `public static void if${toFirstUpper(
                p.name
              )}(Patch dto, ${Consumer}<${List}<${type}>> consumer) {`,
              NL
            );
            patchBody.indent((mBody) => {
              mBody.append(
                `if( dto.isSet(Props.${p.name.toUpperCase()}) ) {`,
                NL
              );
              mBody.indent((block) => {
                block.append(`consumer.accept(dto.${p.name}());`, NL);
              });
              mBody.append('}', NL);
            });
            patchBody.append('}', NL);
            patchBody.append(
              `public static <T> T if${toFirstUpper(
                p.name
              )}(Patch dto, ${Function}<${List}<${resolveObjectType(
                type,
                artifactConfig.nativeTypeSubstitues,
                fqn
              )}>, T> consumer, T defaultValue) {`,
              NL
            );
            patchBody.indent((mBody) => {
              mBody.append(
                `if( dto.isSet(Props.${p.name.toUpperCase()}) ) {`,
                NL
              );
              mBody.indent((block) => {
                block.append(`return consumer.apply(dto.${p.name}());`, NL);
              });
              mBody.append('}', NL);

              mBody.append('return defaultValue;', NL);
            });

            patchBody.append('}', NL);
            return;
          } else {
            // TODO handle correctly
            return;
          }
        }

        const Consumer = fqn('java.util.function.Consumer');
        const Function = fqn('java.util.function.Function');

        if (p.variant === 'union' || p.variant === 'record') {
        } else if (typeof p.type === 'string') {
          patchBody.append(
            `public static void if${toFirstUpper(
              p.name
            )}(Patch dto, ${Consumer}<${resolveObjectType(
              p.type,
              artifactConfig.nativeTypeSubstitues,
              fqn
            )}> consumer) {`,
            NL
          );
          patchBody.indent((mBody) => {
            mBody.append(
              `if( dto.isSet(Props.${p.name.toUpperCase()}) ) {`,
              NL
            );
            mBody.indent((block) => {
              block.append(`consumer.accept(dto.${p.name}());`, NL);
            });
            mBody.append('}', NL);
          });
          patchBody.append('}', NL);

          patchBody.append(
            `public static <T> T if${toFirstUpper(
              p.name
            )}(Patch dto, ${Function}<${resolveObjectType(
              p.type,
              artifactConfig.nativeTypeSubstitues,
              fqn
            )}, T> consumer, T defaultValue) {`,
            NL
          );
          patchBody.indent((mBody) => {
            mBody.append(
              `if( dto.isSet(Props.${p.name.toUpperCase()}) ) {`,
              NL
            );
            mBody.indent((block) => {
              block.append(`return consumer.apply(dto.${p.name}());`, NL);
            });
            mBody.append('}', NL);

            mBody.append('return defaultValue;', NL);
          });

          patchBody.append('}', NL);
        }
      }
    });*/
  });
  child.append('}', NL);
}

export function generateRecordContent(
  t: MResolvedRecordType,
  artifactConfig: JavaClientAPIGeneratorConfig,
  fqn: (type: string) => string
): CompositeGeneratorNode {
  const node = new CompositeGeneratorNode();

  const superTypes =
    t.resolved.unions.length > 0
      ? [
          ...t.resolved.unions.map((u) => `${u.name}DTO`),
          ...t.mixins.map((m) => `Mixin${m}DTO`),
        ]
      : ['BaseDTO', ...t.mixins.map((m) => `Mixin${m}DTO`)];

  const superPatchTypes =
    t.resolved.unions.length > 0
      ? [...t.resolved.unions.map((u) => `${u.name}DTO`)]
      : [];

  node.append(
    `public interface ${t.name}DTO extends ${superTypes.join(', ')} {`,
    NL
  );

  const sharedProps = t.resolved.unions.flatMap((u) => u.resolved.sharedProps);

  const allProps = allRecordProperties(t);
  allProps
    .filter(isMProperty)
    .filter((p) => p.variant === 'inline-enum')
    .filter((p) => !sharedProps.includes(p))
    .forEach((p) => {
      const inlineEnum = p.type;
      if (isMInlineEnumType(inlineEnum)) {
        generateInlineEnum(inlineEnum, toFirstUpper(p.name), node);
      }
    });

  node.indent((child) => {
    allProps
      .filter((p) => !sharedProps.includes(p))
      .forEach((p) => generateProperty(child, p, artifactConfig, fqn));
  });
  node.appendNewLine();

  node.indent((child) => {
    child.append(
      `public interface Builder extends ${superTypes
        .map((s) => `${s}.Builder`)
        .join(', ')} {`,
      NL
    );
    child.indent((builderChild) => {
      allProps.forEach((p) =>
        generateBuilderProperty(builderChild, p, artifactConfig, fqn)
      );
      allProps
        .filter(isMProperty)
        .filter((p) => p.variant === 'union' || p.variant === 'record')
        .forEach((p) => {
          const functionType = fqn('java.util.function.Function');
          if (p.variant === 'record') {
            builderChild.append(
              `public Builder with${toFirstUpper(p.name)}(${functionType}<${
                p.type
              }DTO.Builder, ${p.type}DTO> block);`,
              NL
            );
          } else {
            builderChild.append(
              `public <T extends ${
                p.type
              }DTO.Builder> Builder with${toFirstUpper(
                p.name
              )}(Class<T> clazz, ${functionType}<T, ${p.type}DTO> block);`,
              NL
            );
          }
        });
      builderChild.append(`public ${t.name}DTO build();`, NL);
    });
    child.append('}', NL);
    if (t.patchable) {
      generateRecordPatch(
        child,
        allProps,
        artifactConfig,
        fqn,
        superPatchTypes
      );
    }
  });
  node.append('}', NL);
  return node;
}
