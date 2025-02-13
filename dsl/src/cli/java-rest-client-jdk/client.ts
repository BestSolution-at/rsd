import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact, ArtifactGenerationConfig } from '../artifact-generator.js';
import {
  JavaImportsCollector,
  JavaRestClientJDKGeneratorConfig,
  generateCompilationUnit,
  toPath,
} from '../java-gen-utils.js';
import { isMResolvedRecordType, MResolvedRSDModel } from '../model.js';

export function generateClient(
  m: MResolvedRSDModel,
  generatorConfig: ArtifactGenerationConfig,
  artifactConfig: JavaRestClientJDKGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.jdkhttp`;
  const basePackage = artifactConfig.rootPackageName;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  const Client = fqn(`${basePackage}.${generatorConfig.name}Client`);
  const URI = fqn('java.net.URI');
  const Map = fqn('java.util.Map');
  const HashMap = fqn('java.util.HashMap');
  const Supplier = fqn('java.util.function.Supplier');
  const BiFunction = fqn('java.util.function.BiFunction');
  const HttpClient = fqn('java.net.http.HttpClient');
  const Base = fqn(`${basePackage}.model._Base`);
  const BaseService = fqn(`${basePackage}.BaseService`);

  const content = new CompositeGeneratorNode();
  content.append(
    `public class JDK${generatorConfig.name}Client implements ${Client} {`,
    NL
  );
  content.indent((clBody) => {
    clBody.append(
      `private static ${Map}<Class<?>, ${Supplier}<Object>> BUILDER_CREATOR_MAP = new ${HashMap}<>();`,
      NL
    );
    clBody.append(
      `private static ${Map}<Class<?>, ${BiFunction}<${HttpClient}, String, Object>> SERVICE_CREATOR_MAP = new ${HashMap}<>();`,
      NL
    );
    clBody.appendNewLine();
    clBody.append('static {', NL);
    clBody.indent((staticBody) => {
      m.elements.filter(isMResolvedRecordType).forEach((e) => {
        const type = fqn(`${basePackage}.model.${e.name}`);
        const implType = fqn(`${packageName}.impl.model.${e.name}DataImpl`);
        staticBody.append(
          `registerBuilderCreator(${type}.DataBuilder.class, ${implType}.DataBuilderImpl::new);`,
          NL
        );
      });

      m.elements
        .filter(isMResolvedRecordType)
        .filter((t) => t.patchable)
        .forEach((e, idx) => {
          const type = fqn(`${basePackage}.model.${e.name}`);
          const implType = fqn(
            `${packageName}.impl.model.${e.name}DataPatchImpl`
          );
          if (idx === 0) {
            staticBody.append(NL);
          }
          staticBody.append(
            `registerBuilderCreator(${type}.PatchBuilder.class, ${implType}.PatchBuilderImpl::new);`,
            NL
          );
        });
      if (m.services.length > 0) {
        staticBody.appendNewLine();
      }
      m.services.forEach((s) => {
        const type = fqn(`${basePackage}.${s.name}Service`);
        const implType = fqn(`${packageName}.impl.${s.name}ServiceImpl`);
        staticBody.append(
          `registerServiceCreator(${type}.class, ${implType}::new);`,
          NL
        );
      });
    });
    clBody.append('}', NL);
    clBody.appendNewLine();
    clBody.append(
      `private static void registerBuilderCreator(Class<?> clazz, ${Supplier}<Object> constructor) {`,
      NL
    );
    clBody.indent((mBody) => {
      mBody.append('BUILDER_CREATOR_MAP.put(clazz, constructor);', NL);
    });
    clBody.append('}', NL);
    clBody.appendNewLine();
    clBody.append(
      `private static void registerServiceCreator(Class<?> clazz, ${BiFunction}<${HttpClient}, String, Object> constructor) {`,
      NL
    );
    clBody.indent((mBody) => {
      mBody.append('SERVICE_CREATOR_MAP.put(clazz, constructor);', NL);
    });
    clBody.append('}', NL);
    clBody.appendNewLine();
    clBody.append(`private final ${URI} baseURI;`, NL);
    clBody.append(`private final ${HttpClient} httpClient;`, NL);
    clBody.appendNewLine();
    clBody.append(`JDK${generatorConfig.name}Client(${URI} baseURI) {`, NL);
    clBody.indent((initBlock) => {
      initBlock.append('this.baseURI = baseURI;', NL);
      initBlock.append('this.httpClient = HttpClient.newHttpClient();', NL);
    });
    clBody.append('}', NL);
    clBody.appendNewLine();
    clBody.append(
      `public static ${generatorConfig.name}Client create(${URI} baseURI) {`,
      NL
    );
    clBody.indent((mBody) => {
      mBody.append('return new JDKQutiClient(baseURI);', NL);
    });
    clBody.append('}', NL);
    clBody.appendNewLine();
    clBody.append('@SuppressWarnings("unchecked")', NL);
    clBody.append('@Override', NL);
    clBody.append(
      `public <T extends ${Base}.BaseDataBuilder<?>> T builder(Class<T> clazz) {`,
      NL
    );
    clBody.indent((mBody) => {
      mBody.append(
        'var builderConstructor = BUILDER_CREATOR_MAP.get(clazz);',
        NL
      );
      mBody.append('if( builderConstructor != null ) {', NL);
      mBody.indent((block) => {
        block.append('return (T)builderConstructor.get();', NL);
      });
      mBody.append('}', NL);
      mBody.append(
        `throw new IllegalArgumentException(String.format("Unsupported build '%s'", clazz));`,
        NL
      );
    });
    clBody.append('}', NL);
    clBody.appendNewLine();
    clBody.append('@SuppressWarnings("unchecked")', NL);
    clBody.append('@Override', NL);
    clBody.append(
      `public <T extends ${BaseService}> T service(Class<T> clazz) {`,
      NL
    );
    clBody.indent((mBody) => {
      mBody.append(
        'var serviceConstructor = SERVICE_CREATOR_MAP.get(clazz);',
        NL
      );
      mBody.append('if( serviceConstructor != null ) {', NL);
      mBody.indent((block) => {
        block.append(
          'return (T) serviceConstructor.apply(this.httpClient, this.baseURI.toString());',
          NL
        );
      });
      mBody.append('}', NL);
      mBody.append(
        `throw new IllegalArgumentException(String.format("Unsupported service '%s'", clazz));`,
        NL
      );
    });
    clBody.append('}');
  });

  content.append('}');

  return {
    name: `JDK${generatorConfig.name}Client.java`,
    content: toString(
      generateCompilationUnit(packageName, importCollector, content)
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}
