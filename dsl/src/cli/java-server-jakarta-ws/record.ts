import { CompositeGeneratorNode, IndentNode, NL, toString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import { builtinToJavaType, generateCompilationUnit, JavaImportsCollector, JavaServerJakartaWSGeneratorConfig, resolveObjectType, resolveType, toPath } from "../java-gen-utils.js";
import { allRecordProperties, isMKeyProperty, isMRevisionProperty, MBaseProperty, MResolvedRecordType } from "../model.js";
import { toFirstUpper } from "../util.js";

export function generateRecord(t: MResolvedRecordType, artifactConfig: JavaServerJakartaWSGeneratorConfig): Artifact | undefined {
    if( t.resolved.unions.length === 1 ) {
        return undefined;
    }
    const packageName = `${artifactConfig.rootPackageName}.rest.dto`;

    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    return {
        name: `${t.name}DTOImpl.java`,
        content: toString(generateCompilationUnit(packageName, importCollector, generateRecordContent(t, artifactConfig, fqn))),
        path: toPath(artifactConfig.targetFolder, packageName)
    };
}

export function generateRecordContent(t: MResolvedRecordType, artifactConfig: JavaServerJakartaWSGeneratorConfig, fqn: (type: string) => string): CompositeGeneratorNode {
    const node = new CompositeGeneratorNode();

    const allProps = allRecordProperties(t);
    
    node.append(`public record ${t.name}DTOImpl(`,NL)
    node.indent( param => {
        allProps.forEach( (property, idx, arr) => {
            const end = idx + 1 < arr.length ? ',' : `) implements ${artifactConfig.rootPackageName}.service.dto.${t.name}DTO {`
            addProperty(param, property, end, artifactConfig, fqn);
        });
    })

    node.appendNewLine();
    node.append(`public static ${t.name}DTOImpl of(${artifactConfig.rootPackageName}.service.dto.${t.name}DTO source) {`,NL)
    node.indent( body => {
        body.append(`if(source instanceof ${t.name}DTOImpl) {`,NL)
        body.indent(inner => {
            inner.append(`return (${t.name}DTOImpl)source;`,NL)
        })
        body.append('}')
        body.appendNewLine();
        body.append(`return new ${t.name}DTOImpl(`,NL);
        body.indent( inner => {
            allProps.forEach( (p, idx, arr) => {
                if( isMKeyProperty(p) || isMRevisionProperty(p) || (p.variant !== 'union' && p.variant !== 'record') ) {
                    inner.append(`source.${p.name}()`)
                } else {
                    if( p.array ) {
                        inner.append(`source.${p.name}().stream().map(${p.type}DTOImpl::of).toList()`)
                    } else {
                        inner.append(`${p.type}DTOImpl.of(source.${p.name}())`)
                    }
                }
                if( idx + 1 < arr.length ) {
                    inner.append(',')
                }
                inner.appendNewLine()
            });
        })
        
        body.append(');',NL)
    })
    node.append('}')
    /*node.appendNewLine();
    node.indent( body => {
        body.append(`public static class BuilderImpl implements Builder {`, NL);
        body.indent( param => {
            allProps.forEach( (property) => {
                addProperty(param, property, ";", artifactConfig, fqn);
            });
            param.appendNewLine();
            allProps.forEach( (property) => {
                addBuilderMethod(param, property, artifactConfig, fqn);
            });
            allProps
                .filter(isMProperty)
                .filter(p => p.variant === 'union' || p.variant === 'record')
                .forEach(p => {
                    const functionType = fqn('java.util.function.Function');
                    param.append(`public <T extends ${p.type}DTO.Builder> Builder with${toFirstUpper(p.name)}(Class<T> clazz, ${functionType}<T, ${artifactConfig.rootPackageName}.service.dto.${p.type}DTO> block) {`,NL)
                    param.indent( methodBody => {
                        methodBody.append('return this;',NL)
                    })
                    param.append('}', NL)
                });

            param.appendNewLine();
            param.append(`public ${artifactConfig.rootPackageName}.service.dto.${t.name}DTO build() {`,NL)
            param.indent( methodBody => {
                methodBody.append(`return new ${t.name}DTOImpl(${allProps.map(p => p.name).join(', ')});`,NL)
            })
            param.append('}', NL)
        });
        body.append('}')
    })*/
    
    node.append('}')

    return node;
}

/*
function addBuilderMethod(param: IndentNode, property: MBaseProperty, artifactConfig: JavaServerJakartaWSGeneratorConfig, fqn: (type: string) => string) {
    if( isMKeyProperty(property) ) {
        param.append(`public Builder ${property.name}(${builtinToJavaType(property.type, fqn)} ${property.name}) {`, NL)
        param.indent( body => {
            body.append(`this.${property.name} = ${property.name};`,NL)
            body.append('return this;',NL)
        })
        param.append('}', NL)
    } else if( isMRevisionProperty(property) ) {
        param.append(`public Builder ${property.name}(${builtinToJavaType(property.type, fqn)} ${property.name}) {`, NL)
        param.indent( body => {
            body.append(`this.${property.name} = ${property.name};`,NL)
            body.append('return this;',NL)
        })
        param.append('}', NL)
    } else {
        if( property.variant === 'union' || property.variant === 'record' ) {
            if( property.array ) {
                param.append(`public Builder ${property.name}(${fqn('java.util.List')}<${artifactConfig.rootPackageName}.service.dto.${property.type}DTO> ${property.name}) {`, NL)
                param.indent( body => {
                    body.append(`this.${property.name} = ${property.name};`,NL)
                    body.append('return this;',NL)
                })
                param.append('}', NL)                        
            } else {
                param.append(`public Builder ${property.name}(${artifactConfig.rootPackageName}.service.dto.${property.type}DTO ${property.name}) {`, NL)
                param.indent( body => {
                    body.append(`this.${property.name} = ${property.name};`,NL)
                    body.append('return this;',NL)
                })
                param.append('}', NL)                        
            }
        } else if( typeof property.type === 'string' ) {
            if( property.array ) {
                param.append(`public Builder ${property.name}(${fqn('java.util.List')}<${resolveObjectType(property.type, artifactConfig.nativeTypeSubstitues, fqn)}> ${property.name}) {`, NL)
                param.indent( body => {
                    body.append(`this.${property.name} = ${property.name};`,NL)
                    body.append('return this;',NL)
                })
                param.append('}', NL)                        
            } else {
                param.append(`public Builder ${property.name}(${resolveType(property.type, artifactConfig.nativeTypeSubstitues, fqn)} ${property.name}) {`, NL)
                param.indent( body => {
                    body.append(`this.${property.name} = ${property.name};`,NL)
                    body.append('return this;',NL)
                })
                param.append('}', NL)                        
            }
        } else {
            param.append(`public Builder ${property.name}(${toFirstUpper(property.name)} ${property.name}) {`, NL)
            param.indent( body => {
                body.append(`this.${property.name} = ${property.name};`,NL)
                body.append('return this;',NL)
            })
            param.append('}', NL)                        
        }
    }
}*/


function addProperty(param: IndentNode, property: MBaseProperty, end: string, artifactConfig: JavaServerJakartaWSGeneratorConfig, fqn: (type: string) => string) {
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
                param.append(`${resolveType(property.type, artifactConfig.nativeTypeSubstitues, fqn)} ${property.name}`, end, NL)
            }
        } else {
            param.append(`${toFirstUpper(property.name)} ${property.name}`, end, NL)
        }
    }
}