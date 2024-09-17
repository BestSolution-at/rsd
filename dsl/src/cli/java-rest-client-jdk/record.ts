import { CompositeGeneratorNode, IndentNode, NL, toString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import { JavaImportsCollector, JavaRestClientJDKGeneratorConfig, builtinToJavaType, generateCompilationUnit, toPath } from "../java-gen-utils.js";
import { allRecordProperties, isMBuiltinType, isMKeyProperty, isMRevisionProperty, MBuiltinType, MKeyProperty, MProperty, MResolvedRecordType, MRevisionProperty } from "../model.js";
import { toType } from "../java-client-api/shared.js";

// import { MResolvedRecordType, allRecordProperties, isMInlineEnumType, isMProperty } from "../model.js";
// import { generateInlineEnum } from "./enum.js";
// import { toFirstUpper } from "../util.js";
// import { generateBuilderProperty, generateProperty } from "./shared.js";

export function generateRecord(t: MResolvedRecordType, artifactConfig: JavaRestClientJDKGeneratorConfig): Artifact | undefined {
    if( t.resolved.unions.length === 1 ) {
        return undefined;
    }

    const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl.dto`;

    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    return {
        name: `${t.name}DTOImpl_.java`,
        content: toString(generateCompilationUnit(packageName, importCollector, generateRecordContent(t, artifactConfig, fqn))),
        path: toPath(artifactConfig.targetFolder, packageName)
    };
}

export function generateRecordContent(t: MResolvedRecordType, artifactConfig: JavaRestClientJDKGeneratorConfig, fqn: (type: string) => string): CompositeGeneratorNode {
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
        classBody.append(`public ${t.name}DTOImpl(${JsonObject} data) {`, NL);
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
        })
        classBody.append('}', NL)
    } )
    node.append('}', NL)


    return node;
}

function generateBuilderProperty(node: IndentNode, property: MKeyProperty | MRevisionProperty | MProperty, _artifactConfig: JavaRestClientJDKGeneratorConfig, fqn: (type: string) => string) {
    if( isMKeyProperty(property) || isMRevisionProperty(property) ) {
        node.append('@Override', NL)
        node.append(`public Builder ${property.name}(${builtinToJavaType(property.type, fqn)} ${property.name}) {`, NL)
        node.indent( methodBody => {
            methodBody.append(`${builtinBuilderAccess(property)};`, NL)
            methodBody.append('return this;', NL)
        })
        node.append('}', NL)
    } else {

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

            } else {
                if( property.variant === 'builtin' && isMBuiltinType(property.type) ) {
                    if( property.nullable || property.optional ) {
                        methodBody.append(`return ${builtinOptionalJSONAccess( { type: property.type, name: property.name })};`, NL);
                    } else {
                        methodBody.append(`return ${builtinSimpleJSONAccess( { type: property.type, name: property.name })};`, NL);
                    }
                }    
            }            
        } )
        node.append('}', NL)
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