import {
  CompositeGeneratorNode,
  IndentNode,
  NL,
  toString,
} from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  builtinToJavaType,
  generateCompilationUnit,
  JavaImportsCollector,
  JavaServerJakartaWSGeneratorConfig,
  resolveObjectType,
  resolveType,
  toPath,
} from '../java-gen-utils.js';
import {
  allRecordProperties,
  isMKeyProperty,
  isMProperty,
  isMRevisionProperty,
  isMUnionType,
  MBaseProperty,
  MResolvedRecordType,
  MResolvedRSDModel,
} from '../model.js';
import { toFirstUpper } from '../util.js';
import { generateProperty, generatePropertyAccess } from './shared.js';

export function generateRecord(
  t: MResolvedRecordType,
  model: MResolvedRSDModel,
  artifactConfig: JavaServerJakartaWSGeneratorConfig
): Artifact[] {
  const packageName = `${artifactConfig.rootPackageName}.rest.dto`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  const result: Artifact[] = [];
  result.push({
    name: `${t.name}DTOImpl.java`,
    content: toString(
      generateCompilationUnit(
        packageName,
        importCollector,
        generateRecordContent(t, artifactConfig, fqn, model)
      )
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  });

  return result;
}

export function generateRecordContent(
  t: MResolvedRecordType,
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  fqn: (type: string) => string,
  model: MResolvedRSDModel
): CompositeGeneratorNode {
  const node = new CompositeGeneratorNode();

  const allProps = allRecordProperties(t);

  const dtoInterface = fqn(
    `${artifactConfig.rootPackageName}.service.dto.${t.name}DTO`
  );

  if (t.resolved.unions.length === 1) {
    const shared = t.resolved.unions[0].resolved.sharedProps.map((s) => s.name);

    node.append(
      `public class ${t.name}DTOImpl extends ${t.resolved.unions[0].name}DTOImpl implements ${dtoInterface} {`,
      NL
    );
    node.indent((param) => {
      const uProps = allProps.filter((p) => !shared.includes(p.name));
      uProps.forEach((property) => {
        generateProperty(param, property, artifactConfig, fqn);
      });
      uProps.forEach((property) => {
        generatePropertyAccess(param, property, artifactConfig, fqn);
      });
    });
  } else {
    node.append(
      `public class ${t.name}DTOImpl implements ${dtoInterface} {`,
      NL
    );
    node.indent((param) => {
      allProps.forEach((property) => {
        generateProperty(param, property, artifactConfig, fqn);
      });
      allProps.forEach((property) => {
        generatePropertyAccess(param, property, artifactConfig, fqn);
      });
    });
  }

  node.appendNewLine();
  node.indent((body) => {
    body.append(
      `public static ${t.name}DTOImpl of(${dtoInterface} source) {`,
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
      mBody.append('}');
      mBody.appendNewLine();
      mBody.append(`var rv = new ${t.name}DTOImpl();`, NL);
      allProps.forEach((p, idx, arr) => {
        if (
          isMKeyProperty(p) ||
          isMRevisionProperty(p) ||
          (p.variant !== 'union' && p.variant !== 'record')
        ) {
          mBody.append(`rv.${p.name} = source.${p.name}();`);
        } else {
          if (p.array) {
            mBody.append(
              `rv.${p.name} = source.${p.name}().stream().map(${p.type}DTOImpl::of).toList();`
            );
          } else {
            mBody.append(
              `rv.${p.name} = ${p.type}DTOImpl.of(source.${p.name}());`
            );
          }
        }
        mBody.appendNewLine();
      });
      mBody.append('return rv;', NL);
    });
    body.append('}');
  });

  node.appendNewLine();
  node.indent((body) => {
    if (t.resolved.unions.length === 1) {
      body.append(
        `public static class BuilderImpl extends ${t.resolved.unions[0].name}DTOImpl.BuilderImpl implements ${dtoInterface}.Builder {`,
        NL
      );
    } else {
      body.append(
        `public static class BuilderImpl implements ${dtoInterface}.Builder {`,
        NL
      );
    }

    body.indent((param) => {
      allProps.forEach((property) => {
        generateProperty(param, property, artifactConfig, fqn);
      });
      param.appendNewLine();
      allProps.forEach((property) => {
        addBuilderMethod(
          param,
          property,
          artifactConfig,
          fqn,
          dtoInterface + '.'
        );
      });
      allProps
        .filter(isMProperty)
        .filter((p) => p.variant === 'union' || p.variant === 'record')
        .forEach((p) => {
          const functionType = fqn('java.util.function.Function');
          const iType = fqn(
            `${artifactConfig.rootPackageName}.service.dto.${p.type}DTO`
          );
          if (p.variant === 'record') {
            param.append(
              `public ${dtoInterface}.Builder with${toFirstUpper(
                p.name
              )}(${functionType}<${iType}.Builder, ${iType}> block) {`,
              NL
            );
            param.indent((methodBody) => {
              methodBody.append(
                `this.${p.name} = (${p.type}DTOImpl)block.apply(${p.type}DTOImpl.builder());`
              );
              methodBody.append('return this;', NL);
            });
            param.append('}', NL);
          } else {
            param.append(
              `public <T extends ${iType}.Builder> Builder with${toFirstUpper(
                p.name
              )}(Class<T> clazz, ${functionType}<T, ${iType}> block) {`,
              NL
            );
            param.indent((methodBody) => {
              const t = model.elements.find((m) => m.name === p.type);
              if (isMUnionType(t)) {
                methodBody.append(`${p.type}DTOImpl.Builder b;`, NL);
                t.resolved.records.forEach((r, idx) => {
                  const iFace = fqn(
                    `${artifactConfig.rootPackageName}.service.dto.${r.name}DTO`
                  );
                  methodBody.append(
                    `${
                      idx > 0 ? ' else ' : ''
                    }if( clazz == ${iFace}.Builder.class ) {`,
                    NL
                  );
                  methodBody.indent((block) => {
                    block.append(`b = new ${r.name}DTOImpl.BuilderImpl();`, NL);
                  });
                  methodBody.append('}');
                });
                methodBody.append(' else {', NL);
                methodBody.indent((block) => {
                  block.append('throw new IllegalArgumentException();', NL);
                });
                methodBody.append('}', NL);
                methodBody.append(
                  `this.${p.name} = (${p.type}DTOImpl)block.apply(clazz.cast(b));`,
                  NL
                );
              }
              methodBody.append('return this;', NL);
            });
            param.append('}', NL);
          }
        });

      param.appendNewLine();
      param.append(
        `public ${artifactConfig.rootPackageName}.service.dto.${t.name}DTO build() {`,
        NL
      );
      param.indent((methodBody) => {
        methodBody.append(`var rv = new ${t.name}DTOImpl();`, NL);
        allProps.forEach((p) => {
          methodBody.append(`rv.${p.name} = ${p.name};`, NL);
        });
        methodBody.append(`return rv;`, NL);
      });
      param.append('}', NL);
    });
    body.append('}', NL);
    body.appendNewLine();
    body.append(`public static ${dtoInterface}.Builder builder() {`, NL);
    body.indent((mBody) => {
      mBody.append('return new BuilderImpl();', NL);
    });
    body.append('}', NL);
  });

  node.append('}');

  return node;
}

export function addBuilderMethod(
  param: IndentNode,
  property: MBaseProperty,
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  fqn: (type: string) => string,
  typePrefix = ''
) {
  if (isMKeyProperty(property)) {
    param.append(
      `public ${typePrefix}Builder ${property.name}(${builtinToJavaType(
        property.type,
        fqn
      )} ${property.name}) {`,
      NL
    );
    param.indent((body) => {
      body.append(`this.${property.name} = ${property.name};`, NL);
      body.append('return this;', NL);
    });
    param.append('}', NL);
  } else if (isMRevisionProperty(property)) {
    param.append(
      `public ${typePrefix}Builder ${property.name}(${builtinToJavaType(
        property.type,
        fqn
      )} ${property.name}) {`,
      NL
    );
    param.indent((body) => {
      body.append(`this.${property.name} = ${property.name};`, NL);
      body.append('return this;', NL);
    });
    param.append('}', NL);
  } else {
    if (property.variant === 'union' || property.variant === 'record') {
      if (property.array) {
        param.append(
          `public ${typePrefix}Builder ${property.name}(${fqn(
            'java.util.List'
          )}<${artifactConfig.rootPackageName}.service.dto.${
            property.type
          }DTO> ${property.name}) {`,
          NL
        );
        param.indent((body) => {
          body.append(
            `this.${property.name} = ${property.name}.stream().map(${property.type}DTOImpl::of).toList();`,
            NL
          );
          body.append('return this;', NL);
        });
        param.append('}', NL);
      } else {
        param.append(
          `public ${typePrefix}Builder ${property.name}(${artifactConfig.rootPackageName}.service.dto.${property.type}DTO ${property.name}) {`,
          NL
        );
        param.indent((body) => {
          body.append(
            `this.${property.name} = ${property.type}DTOImpl.of(${property.name});`,
            NL
          );
          body.append('return this;', NL);
        });
        param.append('}', NL);
      }
    } else if (typeof property.type === 'string') {
      if (property.array) {
        param.append(
          `public ${typePrefix}Builder ${property.name}(${fqn(
            'java.util.List'
          )}<${resolveObjectType(
            property.type,
            artifactConfig.nativeTypeSubstitues,
            fqn
          )}> ${property.name}) {`,
          NL
        );
        param.indent((body) => {
          body.append(`this.${property.name} = ${property.name};`, NL);
          body.append('return this;', NL);
        });
        param.append('}', NL);
      } else {
        param.append(
          `public ${typePrefix}Builder ${property.name}(${resolveType(
            property.type,
            artifactConfig.nativeTypeSubstitues,
            fqn,
            property.nullable
          )} ${property.name}) {`,
          NL
        );
        param.indent((body) => {
          body.append(`this.${property.name} = ${property.name};`, NL);
          body.append('return this;', NL);
        });
        param.append('}', NL);
      }
    } else {
      param.append(
        `public ${typePrefix}Builder ${property.name}(${toFirstUpper(
          property.name
        )} ${property.name}) {`,
        NL
      );
      param.indent((body) => {
        body.append(`this.${property.name} = ${property.name};`, NL);
        body.append('return this;', NL);
      });
      param.append('}', NL);
    }
  }
}

/*function addProperty(param: IndentNode, property: MBaseProperty, end: string, artifactConfig: JavaServerJakartaWSGeneratorConfig, fqn: (type: string) => string) {
    if( isMKeyProperty(property) ) {
        param.append(`${builtinToJavaType(property.type, fqn)} ${property.name}`, end, NL)
    } else if( isMRevisionProperty(property) ) {
        param.append(`${builtinToJavaType(property.type, fqn)} ${property.name}`, end, NL)
    } else {
        if( property.variant === 'union' || property.variant === 'record' ) {
            if( property.array ) {
                param.append(`${fqn('java.util.List')}<${property.type}DTOImpl> ${property.name}`, end, NL)
            } else {
                param.append(`${property.type}DTOImpl ${property.name}`, end, NL)
            }
        } else if( typeof property.type === 'string' ) {
            if( property.array ) {
                param.append(`${fqn('java.util.List')}<${resolveObjectType(property.type, artifactConfig.nativeTypeSubstitues, fqn)}> ${property.name}`, end, NL)
            } else {
                param.append(`${resolveType(property.type, artifactConfig.nativeTypeSubstitues, fqn, property.nullable)} ${property.name}`, end, NL)
            }
        } else {
            param.append(`${toFirstUpper(property.name)} ${property.name}`, end, NL)
        }
    }
}*/
