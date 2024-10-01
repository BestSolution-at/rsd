import { CompositeGeneratorNode, IndentNode, NL, toString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import { JavaImportsCollector, JavaRestClientJDKGeneratorConfig, builtinToJavaType, generateCompilationUnit, toPath } from "../java-gen-utils.js";
import { allRecordProperties, isMBuiltinType, isMKeyProperty, isMProperty, isMRevisionProperty, isMUnionType, MBuiltinType, MKeyProperty, MProperty, MResolvedRecordType, MResolvedRSDModel, MRevisionProperty } from "../model.js";
import { toType } from "../java-client-api/shared.js";
import { toFirstUpper } from "../util.js";

export function generateRecord(t: MResolvedRecordType, model: MResolvedRSDModel, artifactConfig: JavaRestClientJDKGeneratorConfig): Artifact | undefined {
    if( t.resolved.unions.length === 1 ) {
        return undefined;
    }

    const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl.dto`;

    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    return {
        name: `${t.name}DTOImpl_.java`,
        content: toString(generateCompilationUnit(packageName, importCollector, generateRecordContent(t, model, artifactConfig, fqn))),
        path: toPath(artifactConfig.targetFolder, packageName)
    };
}

export function generateRecordContent(t: MResolvedRecordType, model: MResolvedRSDModel, artifactConfig: JavaRestClientJDKGeneratorConfig, fqn: (type: string) => string): CompositeGeneratorNode {
    const node = new CompositeGeneratorNode();

/*    const superTypes = t.resolved.unions.length > 0 ? [
        ...t.resolved.unions.map( u => `${u.name}DTOImpl`)
    ] : [ 'BaseDTOImpl' ];
     */

    const DTOInterface = fqn(`${artifactConfig.rootPackageName}.dto.${t.name}DTO`)
    const JsonObject = fqn('jakarta.json.JsonObject')
    const Json = fqn('jakarta.json.Json')
    const JsonObjectBuilder = fqn('jakarta.json.JsonObjectBuilder');

    const allProps = allRecordProperties(t);

    node.append(`public class ${t.name}DTOImpl extends BaseDTOImpl implements ${DTOInterface} {`, NL)
    node.appendNewLine();
    node.indent( classBody => {
        classBody.append(`${t.name}DTOImpl(${JsonObject} data) {`, NL);
        classBody.indent( initBody => {
            initBody.append('super(data);', NL)
        })
        classBody.append('}', NL)
        
        allProps.forEach( p =>  {
            classBody.appendNewLine();
            generateProperty(classBody, p, artifactConfig, fqn);
        });
        classBody.appendNewLine();
        classBody.append(`public static ${t.name}DTO of(${JsonObject} data) {`, NL)
        classBody.indent( methodBody => {
            methodBody.append(`return new ${t.name}DTOImpl(data);`, NL)
        });
        classBody.append('}', NL)
        classBody.appendNewLine()
        classBody.append('public static class BuilderImpl implements Builder {', NL)
        classBody.indent( builderBody => {
            builderBody.append(`private ${JsonObjectBuilder} builder = ${Json}.createObjectBuilder();`, NL)
            allProps.forEach( p => {
                builderBody.appendNewLine()
                generateBuilderProperty(builderBody, p, artifactConfig, fqn);
            })

            allProps.filter(isMProperty)
                .filter(p => p.variant === 'union' || p.variant === 'record')
                .forEach(p => {
                    builderBody.appendNewLine()
                    generateBuilderWith(builderBody, p, model, artifactConfig, fqn);
                })
            builderBody.appendNewLine();
            builderBody.append(`public ${DTOInterface} build() {`, NL)
            builderBody.indent( methodBody => {
                methodBody.append(`return new ${t.name}DTOImpl(builder.build());`);
            });
            builderBody.append('}', NL)
        })
        
        classBody.append('}', NL)
    } )
    node.append('}', NL)


    return node;
}

function generateBuilderWith(node: IndentNode, property: MProperty, model: MResolvedRSDModel , artifactConfig: JavaRestClientJDKGeneratorConfig, fqn: (type: string) => string) {
    const functionType = fqn('java.util.function.Function');
    node.append(`public <T extends ${property.type}DTO.Builder> Builder with${toFirstUpper(property.name)}(Class<T> clazz, ${functionType}<T, ${property.type}DTO> block) {`,NL);
    node.indent( methodBody => {
        if( property.variant === 'record' ) {
            methodBody.append('// Record', NL)
        } else {
            methodBody.append(`${property.type}DTOImpl.Builder b = null;`, NL)
            const t = model.elements
                .find( m => m.name === property.type )
            if( isMUnionType(t) ) {
                t.resolved.records.forEach( (r, idx) => {
                    methodBody.append(`${idx > 0 ? ' else ' : ''}if( clazz == ${property.type}DTO.${r.name}DTO.Builder.class ) {`, NL);
                    methodBody.indent( block => {
                        block.append(`b = new ${property.type}DTOImpl.${r.name}DTOImpl.BuilderImpl();`, NL)
                    });
                    methodBody.append('}')
                });
                methodBody.append(' else {', NL);
                methodBody.indent( block => {
                    block.append('throw new IllegalArgumentException();', NL);
                });
                methodBody.append('}',NL)
                methodBody.append(`builder.add("${property.name}", ((${property.type}DTOImpl)block.apply((T) b)).data);`, NL)
            } else {
                methodBody.append(`// Could not find union-type "${property.type}"`, NL)
            }
        }
        methodBody.append('return this;', NL)
    })
    node.append('}', NL)
}

function generateBuilderProperty(node: IndentNode, property: MKeyProperty | MRevisionProperty | MProperty, artifactConfig: JavaRestClientJDKGeneratorConfig, fqn: (type: string) => string) {
    if( isMKeyProperty(property) || isMRevisionProperty(property) ) {
        node.append('@Override', NL)
        node.append(`public Builder ${property.name}(${builtinToJavaType(property.type, fqn)} ${property.name}) {`, NL)
        node.indent( methodBody => {
            methodBody.append(`${builtinBuilderAccess(property)};`, NL)
            methodBody.append('return this;', NL)
        })
        node.append('}', NL)
    } else {
        node.append('@Override', NL)
        node.append(`public Builder ${property.name}(${toType(property, artifactConfig, fqn)} ${property.name}) {`, NL)
        node.indent( methodBody => {
            if( property.array ) {
                if( property.variant === 'builtin' && isMBuiltinType(property.type) ) {
                    methodBody.append(`${builtinBuilderArrayJSONAccess({ type: property.type, name: property.name })});`, NL)
                } else if( property.variant === 'enum' || property.variant === 'inline-enum' || property.variant === 'scalar' ) {
                    methodBody.append(`builder.add("${property.name}", DTOUtils.toJsonLiteralArray(${property.name}));`, NL);
                } else {
                    methodBody.append(`builder.add("${property.name}", DTOUtils.toJsonObjectArray(${property.name}));`, NL);
                }
            } else {
                if( property.variant === 'builtin' && isMBuiltinType(property.type) ) {
                    methodBody.append(`${builtinBuilderAccess({ type: property.type, name: property.name })};`, NL)
                } else if( property.variant === 'enum' || property.variant === 'inline-enum' || property.variant === 'scalar' ) {
                    methodBody.append(`builder.add("${property.name}", ${property.name}.toString());`, NL);
                } else {
                    methodBody.append(`builder.add("${property.name}", ((BaseDTOImpl)${property.name}).data);`, NL);
                }
            
            }
            methodBody.append('return this;', NL)
        });
        node.append('}', NL)
    }
}

function generateProperty(node: IndentNode, property: MKeyProperty | MRevisionProperty | MProperty, artifactConfig: JavaRestClientJDKGeneratorConfig, fqn: (type: string) => string) {
    if( isMKeyProperty(property) || isMRevisionProperty(property) ) {
        node.append('@Override', NL)
        node.append(`public ${builtinToJavaType(property.type, fqn)} ${property.name}() {`, NL)
        node.indent( methodBody => {
            methodBody.append(`return ${builtinSimpleJSONAccess(property)};`, NL)
        })
        node.append('}', NL)
    } else {
        node.append('@Override', NL)
        node.append(`public ${toType(property, artifactConfig, fqn)} ${property.name}() {`, NL)
        node.indent( methodBody => {
            if( property.array ) {
                if( property.variant === 'builtin' && isMBuiltinType(property.type) ) {
                    methodBody.append(`return ${builtinArrayJSONAccess( { type: property.type, name: property.name }, fqn )};`,NL)
                } else if( property.variant === 'enum' || property.variant === 'inline-enum' || property.variant === 'scalar' ) {
                    if( property.variant === 'enum' || property.variant === 'inline-enum') {
                        methodBody.append(`DTOUtils.mapLiterals(data, "${property.name}", ${toType(property, artifactConfig, fqn)}::valueOf, List.of())`, NL);
                    } else {
                        methodBody.append(`DTOUtils.mapLiterals(data, "${property.name}", ${toType(property, artifactConfig, fqn)}::of, List.of())`, NL);
                    }
                } else {
                    methodBody.append(`DTOUtils.mapObjects(data, "${property.name}", ${toType(property, artifactConfig, fqn)}::of, List.of())`, NL);
                }
            
            } else {
                if( property.variant === 'builtin' && isMBuiltinType(property.type) ) {
                    if( property.nullable || property.optional ) {
                        methodBody.append(`return ${builtinOptionalJSONAccess( { type: property.type, name: property.name })};`, NL);
                    } else {
                        methodBody.append(`return ${builtinSimpleJSONAccess( { type: property.type, name: property.name })};`, NL);
                    }
                } else {
                    if( property.nullable || property.optional ) {
                        if( property.variant === 'enum' || property.variant === 'inline-enum' || property.variant === 'scalar' ) {
                            if( property.variant === 'enum' || property.variant === 'inline-enum') {
                                methodBody.append(`return DTOUtils.mapLiteral(data, "${property.name}", ${toType(property, artifactConfig, fqn)}::valueOf, ${toType(property, artifactConfig, fqn)}.values()[0])`, NL);
                            } else {
                                methodBody.append(`return DTOUtils.mapLiteral(data, "${property.name}", ${toType(property, artifactConfig, fqn)}::of, null)`, NL);
                            }
                        } else {
                            methodBody.append(`return DTOUtils.mapObject(data, "${property.name}", ${property.type}DTOImpl::of, null);`, NL);
                        }
                    } else {
                        if( property.variant === 'enum' || property.variant === 'inline-enum' || property.variant === 'scalar' ) {
                            if( property.variant === 'enum' || property.variant === 'inline-enum') {
                                methodBody.append(`return DTOUtils.mapLiteral(data, "${property.name}", ${toType(property, artifactConfig, fqn)}::valueOf)`, NL);
                            } else {
                                methodBody.append(`return DTOUtils.mapLiteral(data, "${property.name}", ${toType(property, artifactConfig, fqn)}::of)`, NL);
                            }
                        } else {
                            methodBody.append(`return DTOUtils.mapObject(data, "${property.name}", ${property.type}DTOImpl::of);`, NL);
                        }
                    }
                }
            }            
        } )
        node.append('}', NL)
    }
}

function builtinBuilderArrayJSONAccess(property: { type: MBuiltinType, name: string }): string {
    switch(property.type) {
        case 'boolean': return `builder.add("${property.name}", DTOUtils.toJsonBooleanArray(${property.name})`;
        case 'double': return `builder.add("${property.name}", DTOUtils.toJsonDoubleArray(${property.name})`;
        case 'float': return `builder.add("${property.name}", DTOUtils.toJsonFloatArray(${property.name})`;
        case 'int': return `builder.add("${property.name}", DTOUtils.toJsonIntArray(${property.name})`;
        case 'local-date': return `builder.add("${property.name}", DTOUtils.toJsonLiteralArray(${property.name})`;
        case 'local-date-time': return `builder.add("${property.name}", DTOUtils.toJsonLiteralArray(${property.name})::toString)`;
        case 'long': return `builder.add("${property.name}", DTOUtils.toJsonLongArray(${property.name})`;
        case 'short': return `builder.add("${property.name}", DTOUtils.toJsonShortArray(${property.name})`;
        case 'string': return `builder.add("${property.name}", DTOUtils.toJsonStringArray(${property.name})`;
        case 'zoned-date-time': return `builder.add("${property.name}", DTOUtils.toJsonLiteralArray(${property.name})`;
    }
}


function builtinBuilderAccess(property: { type: MBuiltinType, name: string }): string {
    switch(property.type) {
        case 'boolean': 
        case 'double':
        case 'float':
        case 'int':
        case 'long':
        case 'short':
        case 'string':
            return `builder.add("${property.name}", ${property.name})`;
        case 'local-date':
        case 'local-date-time':
        case 'zoned-date-time':
            return `builder.add("${property.name}", ${property.name}.toString())`;
    }
}

function builtinArrayJSONAccess(property: { type: MBuiltinType, name: string }, fqn: (type: string) => string): string {
    switch(property.type) {
        case 'boolean': return `DTOUtils.mapBooleans(data, "${property.name}")`;
        case 'double': return `DTOUtils.mapDoubles(data, "${property.name}")`;
        case 'float': return `DTOUtils.mapFloats(data, "${property.name}")`;
        case 'int': return `DTOUtils.mapInts(data, "${property.name}")`;
        case 'local-date': return `DTOUtils.mapLiterals(data, "${property.name}", ${fqn('java.time.LocalDate')}::parse)`;
        case 'local-date-time': return `DTOUtils.mapLiterals(data, "${property.name}, ${fqn('java.time.LocalDateTime')}::parse)`;
        case 'long': return `DTOUtils.mapLongs(data, "${property.name}")`;
        case 'short': return `DTOUtils.mapShorts(data, "${property.name}")`;
        case 'string': return `DTOUtils.mapStrings(data, "${property.name}")`;
        case 'zoned-date-time': return `DTOUtils.mapLiterals(data, "${property.name}, ${fqn('java.time.ZonedDateTime')}::parse)`;
    }
}


function builtinSimpleJSONAccess(property: { type: MBuiltinType, name: string }): string {
    switch(property.type) {
        case 'boolean': return `DTOUtils.mapBoolean(data, "${property.name}")`;
        case 'double': return `DTOUtils.mapDouble(data, "${property.name}")`;
        case 'float': return `DTOUtils.mapFloat(data, "${property.name}")`;
        case 'int': return `DTOUtils.mapInt(data, "${property.name}")`;
        case 'local-date': return `DTOUtils.mapLocalDate(data, "${property.name}")`;
        case 'local-date-time': return `DTOUtils.mapLocalDateTime(data, "${property.name}")`;
        case 'long': return `DTOUtils.mapLong(data, "${property.name}")`;
        case 'short': return `DTOUtils.mapShort(data, "${property.name}")`;
        case 'string': return `DTOUtils.mapString(data, "${property.name}")`;
        case 'zoned-date-time': return `DTOUtils.mapZonedDateTime(data, "${property.name}")`;
    }
}

function builtinOptionalJSONAccess(property: { type: MBuiltinType, name: string }): string {
    switch(property.type) {
        case 'boolean': return `DTOUtils.mapBoolean(data, "${property.name}", false)`;
        case 'double': return `DTOUtils.mapDouble(data, "${property.name}", 0)`;
        case 'float': return `DTOUtils.mapFloat(data, "${property.name}", 0)`;
        case 'int': return `DTOUtils.mapInt(data, "${property.name}", 0)`;
        case 'local-date': return `DTOUtils.mapLocalDate(data, "${property.name}", null)`;
        case 'local-date-time': return `DTOUtils.mapLocalDateTime(data, "${property.name}", null)`;
        case 'long': return `DTOUtils.mapLong(data, "${property.name}", 0)`;
        case 'short': return `DTOUtils.mapShort(data, "${property.name}", (short) 0)`;
        case 'string': return `DTOUtils.mapString(data, "${property.name}", null)`;
        case 'zoned-date-time': return `DTOUtils.mapZonedDateTime(data, "${property.name}", null)`;
    }
}