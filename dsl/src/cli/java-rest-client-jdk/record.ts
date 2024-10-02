import { 
    CompositeGeneratorNode, 
    IndentNode, 
    NL, 
    toString 
} from "langium/generate";
import { 
    Artifact 
} from "../artifact-generator.js";
import { 
    JavaImportsCollector, 
    JavaRestClientJDKGeneratorConfig, 
    generateCompilationUnit, 
    toPath 
} from "../java-gen-utils.js";
import { 
    allRecordProperties, 
    isMProperty, 
    isMUnionType,
    MProperty, MResolvedRecordType, MResolvedRSDModel
} from "../model.js";
import { toFirstUpper } from "../util.js";
import { generateBuilderProperty, generateProperty } from "./shared.js";

export function generateRecord(t: MResolvedRecordType, model: MResolvedRSDModel, artifactConfig: JavaRestClientJDKGeneratorConfig): Artifact | undefined {
    if( t.resolved.unions.length === 1 ) {
        return undefined;
    }

    const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl.dto`;

    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    return {
        name: `${t.name}DTOImpl.java`,
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
    const JsonArray = fqn('jakarta.json.JsonArray')
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
        classBody.append(`public static ${fqn('java.util.List')}<${t.name}DTO> of(${JsonArray} data) {`, NL)
        classBody.indent( methodBody => {
            methodBody.append(`return DTOUtils.mapObjects(data, ${t.name}DTOImpl::of);`, NL)
        });
        classBody.append('}', NL)
        const keyProp = t.properties.find( e => e["@type"] === 'KeyProperty');
        if( keyProp ) {
            classBody.appendNewLine();
            classBody.append('@Override',NL)
            classBody.append('public String toString() {',NL)
            classBody.indent( methodBody => {
                methodBody.append(`return "%s[%s=%s]".formatted(getClass().getSimpleName(), "${keyProp.name}", ${keyProp.name}());`,NL)
            });
            classBody.append('}',NL)
        }
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
                methodBody.append(`return new ${t.name}DTOImpl(builder.build());`, NL);
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
