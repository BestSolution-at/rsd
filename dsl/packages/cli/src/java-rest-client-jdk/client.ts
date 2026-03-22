import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact, ArtifactGenerationConfig } from '../artifact-generator.js';
import {
	JavaImportsCollector,
	JavaRestClientJDKGeneratorConfig,
	generateCompilationUnit,
	toPath,
} from '../java-gen-utils.js';
import { isMResolvedRecordType, MResolvedRSDModel } from '../model.js';
import { hasFileStream, hasStream, toCamelCaseIdentifier, toNodeTree } from '../util.js';

function toEnumLiteral(value: string): string {
	return value.toLocaleUpperCase().replaceAll('/', '_').replaceAll('-', '_').replaceAll('.', '_');
}

export function generateClient(
	m: MResolvedRSDModel,
	generatorConfig: ArtifactGenerationConfig,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.jdkhttp`;
	const basePackage = artifactConfig.rootPackageName;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	const Client = fqn(`${basePackage}.${toCamelCaseIdentifier(generatorConfig.name)}Client`);
	const URI = fqn('java.net.URI');
	const Map = fqn('java.util.Map');
	const HashMap = fqn('java.util.HashMap');
	const Supplier = fqn('java.util.function.Supplier');
	const Function = fqn('java.util.function.Function');
	const HttpClient = fqn('java.net.http.HttpClient');
	const Base = fqn(`${basePackage}.model._Base`);
	const BaseService = fqn(`${basePackage}.BaseService`);

	const content = new CompositeGeneratorNode();
	content.append(`public class JDK${toCamelCaseIdentifier(generatorConfig.name)}Client implements ${Client} {`, NL);
	content.indent(classBody => {
		const contentEncodings =
			artifactConfig.contentTypeEncodings === undefined || artifactConfig.contentTypeEncodings.length === 0
				? (['application/json'] as const)
				: artifactConfig.contentTypeEncodings;
		classBody.append('public enum ContentTypeEncoding {', NL);
		classBody.indent(enumBody => {
			contentEncodings.forEach((e, idx) => {
				enumBody.append(`${toEnumLiteral(e)}("${e}")${idx < contentEncodings.length - 1 ? ',' : ';'}`, NL);
			});
			enumBody.appendNewLine();
			enumBody.append('public final String contentType;', NL);
			enumBody.appendNewLine();
			enumBody.append('ContentTypeEncoding(String contentType) {', NL);
			enumBody.indent(enumConstructorBody => {
				enumConstructorBody.append('this.contentType = contentType;', NL);
			});
			enumBody.append('}', NL);
		});
		classBody.append('}', NL);
		classBody.appendNewLine();

		const builder = toNodeTree(`
			public static class Builder {
				private URI baseURI;
				private HttpClient httpClient;
				private ContentTypeEncoding contentTypeEncoding;

				public Builder baseURI(URI baseURI) {
					this.baseURI = baseURI;
					return this;
				}

				public Builder httpClient(HttpClient httpClient) {
					this.httpClient = httpClient;
					return this;
				}

				public Builder contentTypeEncoding(ContentTypeEncoding contentTypeEncoding) {
					this.contentTypeEncoding = contentTypeEncoding;
					return this;
				}

				public SpecSamplesClient build() {
					if (baseURI == null) {
						throw new IllegalStateException("baseURI must be set");
					}
					if (httpClient == null) {
						httpClient = HttpClient.newHttpClient();
					}
					if (contentTypeEncoding == null) {
						contentTypeEncoding = ContentTypeEncoding.${toEnumLiteral(contentEncodings[0])};
					}
					return new JDK${toCamelCaseIdentifier(generatorConfig.name)}Client(baseURI, httpClient, contentTypeEncoding);
				}
			}`);
		classBody.append(builder, NL);
	});

	content.indent(clBody => {
		clBody.append(`private static ${Map}<Class<?>, ${Supplier}<Object>> BUILDER_CREATOR_MAP = new ${HashMap}<>();`, NL);
		clBody.append(
			`private static ${Map}<Class<?>, ${Function}<JDK${toCamelCaseIdentifier(generatorConfig.name)}Client, Object>> SERVICE_CREATOR_MAP = new ${HashMap}<>();`,
			NL,
		);
		clBody.appendNewLine();
		clBody.append('static {', NL);
		clBody.indent(staticBody => {
			m.elements.filter(isMResolvedRecordType).forEach(e => {
				const type = fqn(`${basePackage}.model.${e.name}`);
				const implType = fqn(`${packageName}.impl.model.${e.name}DataImpl`);
				staticBody.append(`registerBuilderCreator(${type}.DataBuilder.class, ${implType}.DataBuilderImpl::new);`, NL);
			});

			m.elements
				.filter(isMResolvedRecordType)
				.filter(t => t.patchable)
				.forEach((e, idx) => {
					const type = fqn(`${basePackage}.model.${e.name}`);
					const implType = fqn(`${packageName}.impl.model.${e.name}PatchImpl`);
					if (idx === 0) {
						staticBody.append(NL);
					}
					staticBody.append(
						`registerBuilderCreator(${type}.PatchBuilder.class, ${implType}.PatchBuilderImpl::new);`,
						NL,
					);
				});
			if (m.services.length > 0) {
				staticBody.appendNewLine();
			}
			m.services.forEach(s => {
				const type = fqn(`${basePackage}.${s.name}Service`);
				const implType = fqn(`${packageName}.impl.${s.name}ServiceImpl`);
				staticBody.append(`registerServiceCreator(${type}.class, ${implType}::new);`, NL);
			});
		});
		clBody.append('}', NL);
		clBody.appendNewLine();
		clBody.append(`private static void registerBuilderCreator(Class<?> clazz, ${Supplier}<Object> constructor) {`, NL);
		clBody.indent(mBody => {
			mBody.append('BUILDER_CREATOR_MAP.put(clazz, constructor);', NL);
		});
		clBody.append('}', NL);
		clBody.appendNewLine();
		clBody.append(
			`private static void registerServiceCreator(Class<?> clazz, ${Function}<JDK${toCamelCaseIdentifier(generatorConfig.name)}Client, Object> constructor) {`,
			NL,
		);
		clBody.indent(mBody => {
			mBody.append('SERVICE_CREATOR_MAP.put(clazz, constructor);', NL);
		});
		clBody.append('}', NL);
		clBody.appendNewLine();
		clBody.append(`private final ${URI} baseURI;`, NL);
		clBody.append(`private final ${HttpClient} httpClient;`, NL);
		clBody.append(`private final ContentTypeEncoding contentTypeEncoding;`, NL);
		clBody.appendNewLine();
		clBody.append(
			`JDK${toCamelCaseIdentifier(
				generatorConfig.name,
			)}Client(${URI} baseURI, ${HttpClient} httpClient, ContentTypeEncoding contentTypeEncoding) {`,
			NL,
		);
		clBody.indent(initBlock => {
			initBlock.append('this.baseURI = baseURI;', NL);
			initBlock.append('this.httpClient = httpClient;', NL);
			initBlock.append('this.contentTypeEncoding = contentTypeEncoding;', NL);
		});
		clBody.append('}', NL);

		const getters = toNodeTree(`
		public ContentTypeEncoding contentTypeEncoding() {
			return this.contentTypeEncoding;
		}
		
		public HttpClient httpClient() {
			return this.httpClient;
		}
				
		public URI baseURI() {
			return this.baseURI;
		}`);
		clBody.append(NL, getters, NL);

		// Factory methods
		clBody.appendNewLine();
		clBody.append(`public static ${toCamelCaseIdentifier(generatorConfig.name)}Client create(${URI} baseURI) {`, NL);
		clBody.indent(mBody => {
			mBody.append(`return builder().baseURI(baseURI).build();`, NL);
		});
		clBody.append('}', NL);

		clBody.appendNewLine();
		clBody.append(
			`public static ${toCamelCaseIdentifier(
				generatorConfig.name,
			)}Client create(${URI} baseURI, ${HttpClient} httpClient) {`,
			NL,
		);
		clBody.indent(mBody => {
			mBody.append(`return builder().baseURI(baseURI).httpClient(httpClient).build();`, NL);
		});
		clBody.append('}', NL);

		clBody.append('public static Builder builder() {', NL);
		clBody.indent(mBody => {
			mBody.append('return new Builder();', NL);
		});
		clBody.append('}', NL);

		clBody.appendNewLine();
		clBody.append('@SuppressWarnings("unchecked")', NL);
		clBody.append('@Override', NL);
		clBody.append(`public <T extends ${Base}.BaseDataBuilder<?>> T builder(Class<T> clazz) {`, NL);
		clBody.indent(mBody => {
			mBody.append('var builderConstructor = BUILDER_CREATOR_MAP.get(clazz);', NL);
			mBody.append('if (builderConstructor != null) {', NL);
			mBody.indent(block => {
				block.append('return (T) builderConstructor.get();', NL);
			});
			mBody.append('}', NL);
			mBody.append(`throw new IllegalArgumentException(String.format("Unsupported build '%s'", clazz));`, NL);
		});
		clBody.append('}', NL);
		clBody.appendNewLine();
		clBody.append('@SuppressWarnings("unchecked")', NL);
		clBody.append('@Override', NL);
		clBody.append(`public <T extends ${BaseService}> T service(Class<T> clazz) {`, NL);
		clBody.indent(mBody => {
			mBody.append('var serviceConstructor = SERVICE_CREATOR_MAP.get(clazz);', NL);
			mBody.append('if (serviceConstructor != null) {', NL);
			mBody.indent(block => {
				block.append('return (T) serviceConstructor.apply(this);', NL);
			});
			mBody.append('}', NL);
			mBody.append(`throw new IllegalArgumentException(String.format("Unsupported service '%s'", clazz));`, NL);
		});
		clBody.append('}', NL);

		if (hasStream(m)) {
			clBody.appendNewLine();
			clBody.append(
				`public ${fqn(
					`${artifactConfig.rootPackageName}.model.RSDBlob`,
				)} createBlob(${fqn('java.nio.file.Path')} file, String mimeType) {`,
				NL,
			);
			clBody.indent(mBody => {
				mBody.append(`return ${fqn(`${packageName}.impl.model._BlobImpl`)}.of(file, mimeType);`, NL);
			});
			clBody.append('}', NL);
			if (hasFileStream(m)) {
				clBody.appendNewLine();
				clBody.append(
					`public ${fqn(`${artifactConfig.rootPackageName}.model.RSDFile`)} createFile(${fqn(
						'java.nio.file.Path',
					)} file, String mimeType, String filename) {`,
					NL,
				);
				clBody.indent(mBody => {
					mBody.append(`return ${fqn(`${packageName}.impl.model._FileImpl`)}.of(file, mimeType, filename);`, NL);
				});
				clBody.append('}', NL);
			}
		}
	});

	content.append('}', NL);

	return {
		name: `JDK${toCamelCaseIdentifier(generatorConfig.name)}Client.java`,
		content: toString(generateCompilationUnit(packageName, importCollector, content), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
