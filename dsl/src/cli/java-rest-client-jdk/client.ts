import { CompositeGeneratorNode, NL, toString } from "langium/generate";
import { Artifact, ArtifactGenerationConfig } from "../artifact-generator.js";
import { JavaImportsCollector, JavaRestClientAPIGeneratorConfig, generateCompilationUnit, toPath } from "../java-gen-utils.js";
import { MResolvedRSDModel } from "../model.js";

export function generateClient(m: MResolvedRSDModel, generatorConfig: ArtifactGenerationConfig, artifactConfig: JavaRestClientAPIGeneratorConfig): Artifact {
    const packageName = `${artifactConfig.rootPackageName}`;
    const basePackage = packageName.substring(0, packageName.lastIndexOf('.'));

    const importCollector = new JavaImportsCollector(packageName);
    const fqn = importCollector.importType.bind(importCollector);

    const Client = fqn(`${basePackage}.${generatorConfig.name}Client`)
    const URI = fqn('java.net.URI')
    const Map = fqn('java.util.Map');
    const HashMap = fqn('java.util.HashMap');
    const Supplier = fqn('java.util.function.Supplier');
    const BiFunction = fqn('java.util.function.BiFunction');
    const HttpClient = fqn('java.net.http.HttpClient');

    const content = new CompositeGeneratorNode();
    content.append(`public class JDK${generatorConfig.name}Client implements ${Client} {`, NL);
    content.indent( clBody => {
        clBody.append(`private static ${Map}<Class<?>, ${Supplier}<Object>> BUILDER_CREATOR_MAP = new ${HashMap}<>();`, NL);
        clBody.append(`private static ${Map}<Class<?>, ${BiFunction}<${HttpClient}, String, Object>> SERVICE_CREATOR_MAP = new ${HashMap}<>();`, NL)
        clBody.appendNewLine()
        clBody.append('static {',NL)
        clBody.indent( staticBody => {
            m.elements.forEach( e => {
                const type = fqn(`${basePackage}.dto.${e.name}`);
                const implType = fqn(`${packageName}.impl.dto.${e}Impl`);
                staticBody.append(`registerBuilderCreator(${type}.Builder.class, ${implType}.BuilderImpl::new);`, NL)
            } )
            if( m.services.length > 0 ) {
                staticBody.appendNewLine();
            }
            m.services.forEach( s => {
                const type = fqn(`${basePackage}.${s.name}`);
                const implType = fqn(`${packageName}.impl.${s.name}Impl`);
                staticBody.append(`registerServiceCreator(${type}.class, ${implType}.BuilderImpl.class);`,NL);
            })
        })
        clBody.append('}', NL)
        clBody.appendNewLine()
        clBody.append(`private static void registerBuilderCreator(Class<?> clazz, ${Supplier}<Object> constructor) {`,NL)
        clBody.append( mBody => {
            mBody.append('BUILDER_CREATOR_MAP.put(clazz, constructor);', NL)
        })
        clBody.append('}',NL)
        clBody.appendNewLine()
        clBody.append(`private static void registerServiceCreator(Class<?> clazz, ${BiFunction}<${HttpClient}, String, Object> constructor) {`,NL)
        clBody.append( mBody => {
            mBody.append('SERVICE_CREATOR_MAP.put(clazz, constructor);', NL)
        })
        clBody.append('}',NL)
        clBody.appendNewLine();
        clBody.append(`private final ${URI} baseURI;`,NL)
        clBody.append(`private final ${HttpClient} httpClient;`, NL)
        clBody.appendNewLine();
        
    })

    content.append('}')

    return {
        name: `JDK${generatorConfig.name}Client.java`,
        content: toString(generateCompilationUnit(packageName, importCollector, content)),
        path: toPath(artifactConfig.targetFolder, packageName)
    }
}