import { CompositeGeneratorNode, IndentNode, NL, toString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import { builtinToJavaType, generateCompilationUnit, JavaImportsCollector, JavaServerJakartaWSGeneratorConfig, resolveObjectType, resolveType, toPath } from "../java-gen-utils.js";
import { allRecordProperties, isMKeyProperty, isMRevisionProperty, MKeyProperty, MProperty, MResolvedRecordType, MResolvedUnionType, MRevisionProperty } from "../model.js";
import { toFirstUpper } from "../util.js";
import { addBuilderMethod } from "./record.js";
import { toType } from "../java-client-api/shared.js";

export function generateUnion(t: MResolvedUnionType, artifactConfig: JavaServerJakartaWSGeneratorConfig): Artifact {
    const packageName = `${artifactConfig.rootPackageName}.rest.dto`;

    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    const JsonbTypeInfo = fqn('jakarta.json.bind.annotation.JsonbTypeInfo');
    const JsonbSubtype = fqn('jakarta.json.bind.annotation.JsonbSubtype');

    const childRecords = t.resolved.records.filter(r => r.resolved.unions.length === 1);
    const node = new CompositeGeneratorNode();
    node.append(`@${JsonbTypeInfo}({`,NL)
    node.indent( child => {
        childRecords.forEach( r => {
            const desc = (t.descriminatorAliases ?? {})[r.name] ?? r.name;
            child.append(`@${JsonbSubtype}(alias = "${desc}", type = ${t.name}DTOImpl.${r.name}DTOImpl.class),`,NL);
        } )
    } );
    
    node.append('})',NL)
    node.append(`public abstract class ${t.name}DTOImpl implements ${artifactConfig.rootPackageName}.service.dto.${t.name}DTO {`,NL)
    
    node.indent( child => {
        t.resolved.sharedProps.forEach( p => generateProperty(child, p, artifactConfig, fqn) )
    })

    node.appendNewLine();
    node.indent( body => {
        body.append(`public ${t.name}DTOImpl() {}`, NL)
        body.append(`public ${t.name}DTOImpl(`, NL)
        body.indent( mBody => {
            t.resolved.sharedProps.forEach( (p, idx, arr) => generateConstructorProperty(mBody, p, idx + 1 < arr.length ? ',' : ') {', artifactConfig, fqn) )
            t.resolved.sharedProps.forEach( p => mBody.append(`this.${p.name} = ${p.name};`, NL) )
        } )
        body.append('}',NL);
    })
    
    node.indent( child => {
        t.resolved.sharedProps.forEach( p => generatePropertyAccess(child, p, artifactConfig, fqn) )
    })
    node.appendNewLine();
    node.indent( body => {
        body.append(`public static ${t.name}DTOImpl of(${artifactConfig.rootPackageName}.service.dto.${t.name}DTO source) {`, NL)
        body.indent( mBody => {
            mBody.append(`if(source instanceof ${t.name}DTOImpl) {`,NL)
            mBody.indent(inner => {
                inner.append(`return (${t.name}DTOImpl)source;`,NL)
            })
            mBody.append('}',NL)
            childRecords.forEach( r => {
                mBody.append(`if(source instanceof ${r.name}DTO t) {`, NL)
                mBody.indent( inner => {
                    inner.append(`return ${r.name}DTOImpl.of(t);`,NL);
                })
                mBody.append('}',NL)
            })
            mBody.append('throw new IllegalStateException();',NL);
        } )
        body.append('}',NL)
        body.appendNewLine();
        body.append(`public static abstract class BuilderImpl implements Builder {`, NL)
        body.indent( mBody => {
            t.resolved.sharedProps.forEach( p => generateConstructorProperty(mBody, p, ';', artifactConfig, fqn) )
            mBody.appendNewLine();
            t.resolved.sharedProps.forEach( p => addBuilderMethod(mBody, p, artifactConfig, fqn))
        })
        body.append('}',NL)
    })
    
    node.indent( child => {
        childRecords.forEach( r => {
            child.appendNewLine()
            generateUnionRecordContent(child, r, t, artifactConfig, fqn);
        } )
    })


    node.append('}');

    return {
        name: `${t.name}DTOImpl.java`,
        content: toString(generateCompilationUnit(packageName, importCollector, node)),
        path: toPath(artifactConfig.targetFolder, packageName)
    };
}

function generateUnionRecordContent(node: IndentNode, t: MResolvedRecordType, p: MResolvedUnionType, artifactConfig: JavaServerJakartaWSGeneratorConfig, fqn: (type: string) => string) {
    const iType = fqn(`${artifactConfig.rootPackageName}.service.dto.${p.name}DTO`);
    node.append(`public static class ${t.name}DTOImpl extends ${p.name}DTOImpl implements ${iType}.${t.name}DTO {`,NL)

    const sharedProps = t.resolved.unions.flatMap(u => u.resolved.sharedProps);

    const allProps = allRecordProperties(t);
    
    node.indent( child => {
        allProps.filter(p => !sharedProps.includes(p)).forEach( p => generateProperty(child, p, artifactConfig, fqn))
    })

    node.appendNewLine();
    node.indent( body => {
        body.append(`public ${t.name}DTOImpl() {}`, NL)
        body.append(`public ${t.name}DTOImpl(`, NL)
        body.indent( mBody => {
            const props = [ ...sharedProps, ...allProps.filter(p => !sharedProps.includes(p))]
            props.forEach( (p, idx, arr) => generateConstructorProperty(mBody, p, idx + 1 < arr.length ? ',' : ') {', artifactConfig, fqn) )
            mBody.append(`super(${sharedProps.map(s => s.name).join(', ')});`, NL)
            allProps.filter(p => !sharedProps.includes(p)).forEach( p => mBody.append(`this.${p.name} = ${p.name};`, NL) )
        } )
        body.append('}',NL);
    })
    
    node.indent( child => {
        allProps.filter(p => !sharedProps.includes(p)).forEach( p => generatePropertyAccess(child, p, artifactConfig, fqn))
    })
    node.appendNewLine();
    node.indent(body => {
        body.append(`public static ${t.name}DTOImpl of(${t.name}DTO source) {`,NL)
        body.indent( mbody => {
            mbody.append(`if(source instanceof ${t.name}DTOImpl) {`,NL)
            mbody.indent(inner => {
                inner.append(`return (${t.name}DTOImpl)source;`,NL)
            })
            mbody.append('}')
            mbody.appendNewLine();
            mbody.append(`return new ${t.name}DTOImpl(`,NL);
            mbody.indent( inner => {
                const props = [ ...sharedProps, ...allProps.filter(p => !sharedProps.includes(p))]
                props.forEach( (p, idx, arr) => {
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
            
            mbody.append(');',NL)
        })
        body.append('}',NL)
        body.appendNewLine();
        body.append(`public static class BuilderImpl extends ${p.name}DTOImpl.BuilderImpl implements ${iType}.${t.name}DTO.Builder {`, NL)
        body.indent( mBody => {
            allProps.filter(p => !sharedProps.includes(p)).forEach( p => generateConstructorProperty(mBody, p, ';', artifactConfig, fqn) )
            sharedProps.forEach( property => {
                if( isMKeyProperty(property) || isMRevisionProperty(property) ) {
                    mBody.append('@Override', NL)
                    mBody.append(`public ${t.name}DTO.Builder ${property.name}(${builtinToJavaType(property.type, fqn)} ${property.name}) {`, NL)
                    mBody.indent( methodBody => {
                        methodBody.append(`return (${t.name}DTO.Builder) super.${property.name}(${property.name});`, NL)
                    })
                    mBody.append('}', NL)
                } else {
                    mBody.append('@Override', NL)
                    mBody.append(`public ${t.name}DTO.Builder ${property.name}(${toType(property, artifactConfig, fqn)} ${property.name}) {`, NL)
                    mBody.indent( methodBody => {
                        methodBody.append(`return (${t.name}DTO.Builder) super.${property.name}(${property.name});`, NL)
                    })
                    mBody.append('}', NL);
                }
            })
            allProps.filter(p => !sharedProps.includes(p)).forEach( property => {
                addBuilderMethod(mBody, property, artifactConfig, fqn, `${t.name}DTO.`)
            })
            mBody.append(`public ${t.name}DTO build() {`, NL)
            mBody.indent( methodBody => {
                methodBody.append(`return new ${t.name}DTOImpl(`, NL)
                const props = [ ...sharedProps, ...allProps.filter(p => !sharedProps.includes(p))]
                methodBody.indent( inner => {
                    props.forEach( (p, idx, arr) => inner.append(`this.${p.name}${idx + 1 < arr.length ? ',' : ''}`, NL) )
                })
                methodBody.append(');', NL)
            })
            mBody.append('}', NL)
        })
        body.append('}',NL, NL)
        body.append(`public static ${iType}.${t.name}DTO.Builder builder() {`,NL)
        body.indent( mBody => {
            mBody.append('return new BuilderImpl();',NL);
        } )
        body.append('}',NL)
    })

    node.append('}',NL)
}

function generateConstructorProperty(node: IndentNode, property: MKeyProperty | MRevisionProperty | MProperty, end: string, artifactConfig: JavaServerJakartaWSGeneratorConfig, fqn: (type: string) => string) {
    if( isMKeyProperty(property) ) {
        node.append(`${builtinToJavaType(property.type, fqn)} ${property.name}`, end ,NL)
    } else if( isMRevisionProperty(property) ) {
        node.append(`${builtinToJavaType(property.type, fqn)} ${property.name}`, end,NL)
    } else {
        if( property.variant === 'union' || property.variant === 'record' ) {
            if( property.array ) {
                node.append(`${fqn('java.util.List')}<${property.type}DTOImpl> ${property.name}`, end ,NL)
            } else {
                node.append(`${property.type}DTOImpl ${property.name}`, end, NL)
            }
        } else if( typeof property.type === 'string' ) {
            if( property.array ) {
                node.append(`${fqn('java.util.List')}<${resolveObjectType(property.type, artifactConfig.nativeTypeSubstitues, fqn)}> ${property.name}`, end, NL)
            } else {
                node.append(`${resolveType(property.type, artifactConfig.nativeTypeSubstitues, fqn)} ${property.name}`, end,NL)
            }
        } else {
            node.append(`${toFirstUpper(property.name)} ${property.name}`, end, NL)
        }
    }
}

function generateProperty(node: IndentNode, property: MKeyProperty | MRevisionProperty | MProperty, artifactConfig: JavaServerJakartaWSGeneratorConfig, fqn: (type: string) => string) {
    if( isMKeyProperty(property) ) {
        node.append(`public ${builtinToJavaType(property.type, fqn)} ${property.name};`,NL)
    } else if( isMRevisionProperty(property) ) {
        node.append(`public ${builtinToJavaType(property.type, fqn)} ${property.name};`,NL)
    } else {
        if( property.variant === 'union' || property.variant === 'record' ) {
            if( property.array ) {
                node.append(`public ${fqn('java.util.List')}<${property.type}DTOImpl> ${property.name};`,NL)
            } else {
                node.append(`public ${property.type}DTOImpl ${property.name};`,NL)
            }
        } else if( typeof property.type === 'string' ) {
            if( property.array ) {
                node.append(`public ${fqn('java.util.List')}<${resolveObjectType(property.type, artifactConfig.nativeTypeSubstitues, fqn)}> ${property.name};`,NL)
            } else {
                node.append(`public ${resolveType(property.type, artifactConfig.nativeTypeSubstitues, fqn)} ${property.name};`,NL)
            }
        } else {
            node.append(`public ${toFirstUpper(property.name)} ${property.name};`,NL)
        }
    }
}

function generatePropertyAccess(node: IndentNode, property: MKeyProperty | MRevisionProperty | MProperty, artifactConfig: JavaServerJakartaWSGeneratorConfig, fqn: (type: string) => string) {
    node.appendNewLine();
    if( isMKeyProperty(property) ) {
        node.append(`public ${builtinToJavaType(property.type, fqn)} ${property.name}() {`,NL)
        node.indent( body => {
            body.append(`return this.${property.name};`,NL);
        } )
        node.append('}',NL);
    } else if( isMRevisionProperty(property) ) {
        node.append(`public ${builtinToJavaType(property.type, fqn)} ${property.name}() {`,NL)
        node.indent( body => {
            body.append(`return this.${property.name};`,NL);
        } )
        node.append('}', NL)
    } else {
        if( property.variant === 'union' || property.variant === 'record' ) {
            if( property.array ) {
                node.append(`public ${fqn('java.util.List')}<${property.type}DTO> ${property.name}() {`,NL)
                node.indent( body => {
                    body.append(`return this.${property.name};`,NL);
                } )
                node.append('}', NL)
            } else {
                node.append(`public ${property.type}DTO ${property.name}() {`,NL)
                node.indent( body => {
                    body.append(`return this.${property.name};`,NL);
                } )
                node.append('}', NL)
            }
        } else if( typeof property.type === 'string' ) {
            if( property.array ) {
                node.append(`public ${fqn('java.util.List')}<${resolveObjectType(property.type, artifactConfig.nativeTypeSubstitues, fqn)}> ${property.name}() {`,NL)
                node.indent( body => {
                    body.append(`return this.${property.name};`,NL);
                } )
                node.append('}', NL)
            } else {
                node.append(`public ${resolveType(property.type, artifactConfig.nativeTypeSubstitues, fqn)} ${property.name}() {`,NL)
                node.indent( body => {
                    body.append(`return this.${property.name};`,NL);
                } )
                node.append('}', NL)
            }
        } else {
            node.append(`public ${toFirstUpper(property.name)} ${property.name}() {`,NL)
            node.indent( body => {
                body.append(`return this.${property.name};`,NL);
            } )
            node.append('}', NL);
        }
    }
}