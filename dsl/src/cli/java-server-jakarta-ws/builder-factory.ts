import { CompositeGeneratorNode, NL, toString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import { generateCompilationUnit, JavaImportsCollector, JavaServerJakartaWSGeneratorConfig, toPath } from "../java-gen-utils.js";
import { isMRecordType, isMUnionType, MResolvedRecordType, MResolvedRSDModel, MResolvedUnionType } from "../model.js";

export function generateDTOBuilderFactory(model: MResolvedRSDModel, artifactConfig: JavaServerJakartaWSGeneratorConfig): Artifact {
    const packageName = `${artifactConfig.rootPackageName}.rest`;
    
    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    return {
        name: 'RestDTOBuilderFactory.java',
        content: toString(generateCompilationUnit(packageName, importCollector, generateDTOBuilderFactoryContent(model, artifactConfig, fqn))),
        path: toPath(artifactConfig.targetFolder, packageName)
    }
}

function generateDTOBuilderFactoryContent(model: MResolvedRSDModel, artifactConfig: JavaServerJakartaWSGeneratorConfig, fqn: (type: string) => string) {
    const node = new CompositeGeneratorNode();

    const Singleton = fqn('jakarta.inject.Singleton');
    const DTOBuilderFactory = fqn(`${artifactConfig.rootPackageName}.service.DTOBuilderFactory`);
    const BaseDTO = fqn(`${artifactConfig.rootPackageName}.service.dto.BaseDTO`);

    node.append(`@${Singleton}`, NL)
    node.append(`public class RestDTOBuilderFactory implements ${DTOBuilderFactory} {`,NL)
    node.indent( body => {
        body.append('@Override',NL)
        body.append(`public <T extends ${BaseDTO}.Builder> T builder(Class<T> type) {`,NL)
        body.indent( mBody => {
            model.elements
                .filter(isMRecordType)
                .filter( t => (t as MResolvedRecordType).resolved.unions.length !== 1)
                .forEach( t => {
                    const InterfaceType = fqn(`${artifactConfig.rootPackageName}.service.dto.${t.name}DTO`);
                    const ImplType = fqn(`${artifactConfig.rootPackageName}.rest.dto.${t.name}DTOImpl`);
                    mBody.append(`if( type == ${InterfaceType}.Builder.class) {`, NL);
                    mBody.indent( block => {
                        block.append(`return type.cast(${ImplType}.builder());`,NL);
                    })
                    mBody.append('}',NL)
            });
            model.elements
                .filter(isMUnionType)
                .forEach( u => {
                    (u as MResolvedUnionType).types.forEach( t => {
                        const InterfaceType = fqn(`${artifactConfig.rootPackageName}.service.dto.${u.name}DTO.${t}DTO`);
                        const ImplType = fqn(`${artifactConfig.rootPackageName}.rest.dto.${u.name}DTOImpl.${t}DTOImpl`);
                        mBody.append(`if( type == ${InterfaceType}.Builder.class) {`, NL);
                        mBody.indent( block => {
                            block.append(`return type.cast(${ImplType}.builder());`,NL);
                        })
                        mBody.append('}',NL)
                    } )
                })
            mBody.append('throw new IllegalArgumentException("Unsupported Builder \'%s\'".formatted(type));',NL)
        })
        body.append('}',NL)
    })
    node.append('}', NL)

    return node;
}