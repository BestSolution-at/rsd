import { CompositeGeneratorNode, IndentNode, NL, toString } from 'langium/generate';
import { Artifact, ArtifactGenerationConfig } from '../artifact-generator.js';
import {
	computeParameterAPIType,
	computeParameterAPITypeNG,
	computeParameterValueType,
	generateCompilationUnit,
	JavaImportsCollector,
	JavaRestClientJDKGeneratorConfig,
	resolveType,
	toPath,
} from '../java-gen-utils.js';
import {
	isMBuiltinNumericType,
	isMBuiltinType,
	MBuiltinType,
	MOperation,
	MParameter,
	MResolvedOperation,
	MResolvedService,
	MReturnType,
} from '../model.js';
import {
	builtinBuilderAccess,
	builtinBuilderArrayJSONAccess,
	builtinJSONAccess,
	builtinSimpleJSONArrayAccessNG,
} from '../java-model-json/shared.js';
import { computePath } from '../rest-utils.js';
import { toCamelCaseIdentifier, toFirstUpper, toNodeTree } from '../util.js';

export function generateService(
	s: MResolvedService,
	generatorConfig: ArtifactGenerationConfig,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
): Artifact[] {
	const artifacts: Artifact[] = [];
	const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	const ServiceInterface = fqn(`${artifactConfig.rootPackageName}.${s.name}Service`);
	const JDKClient = fqn(
		`${artifactConfig.rootPackageName}.jdkhttp.JDK${toCamelCaseIdentifier(generatorConfig.name)}Client`,
	);

	const node = new CompositeGeneratorNode();
	node.append(`public class ${s.name}ServiceImpl implements ${ServiceInterface} {`, NL);
	node.indent(classBody => {
		classBody.append(`private final ${JDKClient} client;`, NL);
		classBody.appendNewLine();
		classBody.append(`public ${s.name}ServiceImpl(${JDKClient} client) {`, NL);
		classBody.indent(initBody => {
			initBody.append('this.client = client;', NL);
		});
		classBody.append('}', NL, NL);
		classBody.append(`public ${JDKClient} client() {`, NL);
		classBody.indent(mBody => {
			mBody.append('return this.client;', NL);
		});
		classBody.append('}', NL);
		classBody.appendNewLine();
		classBody.append('private String baseURI() {', NL);
		classBody.indent(baseUriBody => {
			baseUriBody.append('return this.client.baseURI().toString();', NL);
		});
		classBody.append('}', NL);

		classBody.appendNewLine();
		classBody.append(`private ${fqn('java.net.http.HttpClient')} httpClient() {`, NL);
		classBody.indent(httpClientBody => {
			httpClientBody.append('return this.client.httpClient();', NL);
		});
		classBody.append('}', NL);

		classBody.appendNewLine();
		classBody.append(`private String contentType() {`, NL);
		classBody.indent(httpClientBody => {
			httpClientBody.append('return this.client.contentTypeEncoding().contentType;', NL);
		});
		classBody.append('}', NL);

		s.operations.forEach(o => {
			classBody.appendNewLine();
			generateOperation(classBody, s, o, artifactConfig, fqn, s.meta?.rest?.path ?? s.name.toLowerCase());
		});
	});
	node.append('}', NL);

	artifacts.push({
		name: `${s.name}ServiceImpl.java`,
		content: toString(generateCompilationUnit(packageName, importCollector, node), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	});

	const serviceDTOs = s.operations
		.filter(
			o => o.parameters.filter(p => p.variant !== 'stream').filter(p => p.meta?.rest?.source === undefined).length > 1,
		)
		.map(o => generateServiceData(s, o, artifactConfig));
	artifacts.push(...serviceDTOs);

	return artifacts;
}

function generateOpertationMethod(
	node: IndentNode,
	s: MResolvedService,
	o: MResolvedOperation,
	allParameters: readonly MParameter[],
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
	path: string,
	multiBodyParam: boolean,
) {
	const URI = fqn('java.net.URI');

	const parameters = allParameters.map(p => toParameter(p, artifactConfig, fqn, o.name));
	node.append(`public ${toResultType(o.resultType, artifactConfig, fqn, o.name)} ${o.name}(${parameters.join(', ')})`);
	if (o.operationErrors.length > 0) {
		node.appendNewLine();
		node.indent(throwBody => {
			throwBody.indent(other => {
				other.append(
					'throws ',
					fqn(`${artifactConfig.rootPackageName}.${o.operationErrors[0].error}Exception`),
					o.operationErrors.length > 1 ? ',' : '',
				);
				if (o.operationErrors.length > 1) {
					other.appendNewLine();
				}
				o.operationErrors.slice(1).forEach((e, idx, arr) => {
					other.append(fqn(`${artifactConfig.rootPackageName}.${e.error}Exception`), arr.length !== idx + 1 ? ',' : '');
					if (arr.length !== idx + 1) {
						other.appendNewLine();
					}
				});
			});
		});
	}
	node.append(' {', NL);
	node.indent(methodBody => {
		const processedPath = computePath(`${path.replace(/^\//, '')}/${o.meta?.rest?.path ?? ''}`);
		const endpoint = processedPath.path ? `%s/${processedPath.path}` : '%s';
		const variables = ['this.baseURI()', ...processedPath.variables];
		allParameters
			.filter(p => !p.nullable && !p.optional && !isMBuiltinNumericType(p.type) && p.type !== 'boolean')
			.forEach((p, idx, arr) => {
				const Objects = fqn('java.util.Objects');
				methodBody.append(`${Objects}.requireNonNull(${p.name}, "${p.name} must not be null");`, NL);
				if (idx + 1 === arr.length) {
					methodBody.appendNewLine();
				}
			});
		methodBody.append(`var $path = "${endpoint}".formatted(`, NL);
		methodBody.indent(tmp =>
			tmp.indent(formatted => {
				variables.forEach((v, idx) => {
					if (idx === 0) {
						formatted.append(`${v}${idx + 1 < variables.length ? ',' : ''}`, idx + 1 < variables.length ? NL : '');
					} else {
						const Objects = fqn('java.util.Objects');
						formatted.append(
							`ServiceUtils.encodeURIComponent(${Objects}.toString(${v}))${idx + 1 < variables.length ? ',' : ''}`,
							idx + 1 < variables.length ? NL : '',
						);
					}
				});
			}),
		);
		methodBody.append(');', NL);
		methodBody.appendNewLine();
		const hasQueryParams = allParameters.find(p => p.meta?.rest?.source === 'query');
		if (hasQueryParams) {
			methodBody.append(`var $queryParams = new ServiceUtils.URLSearchParams();`, NL);
			allParameters
				.filter(p => p.meta?.rest?.source === 'query')
				.forEach(p => {
					if (p.array) {
						const param =
							p.variant === 'union' || p.variant === 'record'
								? // eslint-disable-next-line @typescript-eslint/no-deprecated
									`ServiceUtils.ofObject($q, false, this.contentType(), ${computeParameterAPIType(
										// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
										p as any,
										artifactConfig.nativeTypeSubstitues,
										`${artifactConfig.rootPackageName}.model`,
										fqn,
										true,
									)}.class)`
								: '$q';
						const codeBlock = toNodeTree(`
							${p.name}.stream().forEach($q -> {
								$queryParams.append("${p.meta?.rest?.name ?? p.name.toLowerCase()}", ${param});
							});`);
						if (p.nullable) {
							methodBody.append(`if(${p.name} != null) {`, NL);
							methodBody.indent(tmp => {
								tmp.append(codeBlock, NL);
							});
							methodBody.append('} else {', NL);
							methodBody.indent(tmp => {
								tmp.append(`$queryParams.append("${p.meta?.rest?.name ?? p.name.toLowerCase()}", "null");`, NL);
							});
							methodBody.append('}', NL);
						} else if (p.optional) {
							methodBody.append(`if(${p.name} != null) {`, NL);
							methodBody.indent(tmp => {
								tmp.append(codeBlock, NL);
							});
							methodBody.append('}', NL);
						} else {
							methodBody.append(codeBlock, NL);
						}
					} else {
						const param =
							p.variant === 'union' || p.variant === 'record'
								? // eslint-disable-next-line @typescript-eslint/no-deprecated
									`ServiceUtils.ofObject(${p.name}, false, this.contentType(), ${computeParameterAPIType(
										// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
										p as any,
										artifactConfig.nativeTypeSubstitues,
										`${artifactConfig.rootPackageName}.model`,
										fqn,
										true,
									)}.class)`
								: p.name;

						const codeBlock = `$queryParams.append("${p.meta?.rest?.name ?? p.name.toLowerCase()}", ${param});`;
						if (p.nullable) {
							methodBody.append(`if(${p.name} != null) {`, NL);
							methodBody.indent(tmp => {
								tmp.append(codeBlock, NL);
							});
							methodBody.append('} else {', NL);
							methodBody.indent(tmp => {
								tmp.append(`$queryParams.append("${p.meta?.rest?.name ?? p.name.toLowerCase()}", "null");`, NL);
							});
							methodBody.append('}', NL);
						} else if (p.optional) {
							methodBody.append(`if(${p.name} != null) {`, NL);
							methodBody.indent(tmp => {
								tmp.append(codeBlock, NL);
							});
							methodBody.append('}', NL);
						} else {
							methodBody.append(codeBlock, NL);
						}
					}
				});
			methodBody.appendNewLine();
		}
		const hasHeaderParams = allParameters.find(p => p.meta?.rest?.source === 'header') !== undefined;
		if (hasHeaderParams) {
			const headerParameters = allParameters.filter(p => p.meta?.rest?.source === 'header');
			const HashMap = fqn('java.util.HashMap');
			methodBody.append(`var $headerParams = new ${HashMap}<String, String>();`, NL);
			headerParameters.forEach(p => {
				if (p.array) {
					if (
						p.variant === 'builtin' ||
						p.variant === 'enum' ||
						p.variant === 'inline-enum' ||
						p.variant === 'scalar'
					) {
						const toString =
							p.type === 'string'
								? '$v -> "\\"" + ServiceUtils.encodeAsciiString($v) + "\\""'
								: `${fqn('java.util.Objects')}::toString`;
						const codeBlock = `$headerParams.put("${p.meta?.rest?.name ?? p.name.toLowerCase()}", String.join(",", ${p.name}.stream().map(${toString}).toList()));`;
						if (p.nullable) {
							methodBody.append(`if(${p.name} != null) {`, NL);
							methodBody.indent(tmp => {
								tmp.append(codeBlock, NL);
							});
							methodBody.append('} else {', NL);
							methodBody.indent(tmp => {
								tmp.append(`$headerParams.put("${p.meta?.rest?.name ?? p.name.toLowerCase()}", "null");`, NL);
							});
							methodBody.append('}', NL);
						} else if (p.optional) {
							methodBody.append(`if(${p.name} != null) {`, NL);
							methodBody.indent(tmp => {
								tmp.append(codeBlock, NL);
							});
							methodBody.append('}', NL);
						} else {
							methodBody.append(codeBlock, NL);
						}
					} else if (p.variant === 'stream') {
						methodBody.append('new UnsupportedOperationException("Stream headers are not supported yet");', NL);
					} else {
						// eslint-disable-next-line @typescript-eslint/no-deprecated
						const toString = `$v -> ServiceUtils.encodeBase64(ServiceUtils.ofObject($v, false, this.contentType(), ${computeParameterAPIType(p, artifactConfig.nativeTypeSubstitues, `${artifactConfig.rootPackageName}.model`, fqn, true)}.class))`;
						const codeBlock = `$headerParams.put("${p.meta?.rest?.name ?? p.name.toLowerCase()}", String.join(",", ${p.name}.stream().map(${toString}).toList()));`;
						if (p.nullable) {
							methodBody.append(`if(${p.name} != null) {`, NL);
							methodBody.indent(tmp => {
								tmp.append(codeBlock, NL);
							});
							methodBody.append('} else {', NL);
							methodBody.indent(tmp => {
								tmp.append(`$headerParams.put("${p.meta?.rest?.name ?? p.name.toLowerCase()}", "null");`, NL);
							});
							methodBody.append('}', NL);
						} else if (p.optional) {
							methodBody.append(`if(${p.name} != null) {`, NL);
							methodBody.indent(tmp => {
								tmp.append(codeBlock, NL);
							});
							methodBody.append('}', NL);
						} else {
							methodBody.append(codeBlock, NL);
						}
					}
				} else {
					if (p.variant === 'builtin') {
						if (p.type !== 'string') {
							methodBody.append(
								`$headerParams.put("${p.meta?.rest?.name ?? p.name.toLowerCase()}", String.format("%s", ${p.name}));`,
								NL,
							);
						} else {
							if (p.nullable) {
								methodBody.append(`if (${p.name} != null) {`, NL);
								methodBody.indent(tmp => {
									tmp.append(
										`$headerParams.put("${p.meta?.rest?.name ?? p.name.toLowerCase()}", "\\"" + ServiceUtils.encodeAsciiString(${p.name}) + "\\"");`,
										NL,
									);
								});
								methodBody.append('} else {', NL);
								methodBody.indent(tmp => {
									tmp.append(`$headerParams.put("${p.meta?.rest?.name ?? p.name.toLowerCase()}", "null");`, NL);
								});
								methodBody.append('}', NL);
							} else if (p.optional) {
								methodBody.append('if(' + p.name + ' != null) {', NL);
								methodBody.indent(tmp => {
									tmp.append(
										`$headerParams.put("${p.meta?.rest?.name ?? p.name.toLowerCase()}", "\\"" + ServiceUtils.encodeAsciiString(${p.name}) + "\\"");`,
										NL,
									);
								});
								methodBody.append('}', NL);
							} else {
								methodBody.append(
									`$headerParams.put("${p.meta?.rest?.name ?? p.name.toLowerCase()}", "\\"" + ServiceUtils.encodeAsciiString(${p.name}) + "\\"");`,
									NL,
								);
							}
						}
					} else if (p.variant === 'record' || p.variant === 'union') {
						// eslint-disable-next-line @typescript-eslint/no-deprecated
						const codeBlock = `$headerParams.put("${p.meta?.rest?.name ?? p.name.toLowerCase()}", ServiceUtils.encodeBase64(ServiceUtils.ofObject(${p.name}, false, this.contentType(), ${computeParameterAPIType(p, artifactConfig.nativeTypeSubstitues, `${artifactConfig.rootPackageName}.model`, fqn, true)}.class)));`;
						if (p.nullable) {
							methodBody.append(`if(${p.name} != null) {`, NL);
							methodBody.indent(tmp => {
								tmp.append(codeBlock, NL);
							});
							methodBody.append('} else {', NL);
							methodBody.indent(tmp => {
								tmp.append(`$headerParams.put("${p.meta?.rest?.name ?? p.name.toLowerCase()}", "null");`, NL);
							});
							methodBody.append('}', NL);
						} else if (p.optional) {
							methodBody.append(`if(${p.name} != null) {`, NL);
							methodBody.indent(tmp => {
								tmp.append(codeBlock, NL);
							});
							methodBody.append('}', NL);
						} else {
							methodBody.append(codeBlock, NL);
						}
					} else if (p.variant === 'stream') {
						methodBody.append('new UnsupportedOperationException("Stream headers are not supported yet");', NL);
					} else {
						methodBody.append(
							`$headerParams.put("${p.meta?.rest?.name ?? p.name.toLowerCase()}", String.format("%s", ${p.name}));`,
							NL,
						);
					}
				}
			});
			methodBody.append('var $headers = ServiceUtils.toHeaders($headerParams);', NL);
			methodBody.appendNewLine();
		}

		if (hasQueryParams) {
			methodBody.append(`var $uri = ${URI}.create($path + $queryParams.toQueryString());`, NL);
		} else {
			methodBody.append(`var $uri = ${URI}.create($path);`, NL);
		}

		const IOException = fqn('java.io.IOException');

		if (o.parameters.find(p => p.variant === 'stream')) {
			methodBody.append('try {', NL);
			methodBody.indent(tryBlock => {
				tryBlock.append('var $formDataBuilder = RSDFormDataPublisherBuilder.create();', NL);
			});
		} else {
			methodBody.append('try {', NL);
		}

		methodBody.indent(tryBlock => {
			tryBlock.append(generateInvokation(s, o, allParameters, artifactConfig, fqn, hasHeaderParams, multiBodyParam));
		});
		methodBody.append(`} catch (${IOException} | InterruptedException e) {`, NL);
		methodBody.indent(catchBlock => {
			catchBlock.append('throw new IllegalStateException(e);', NL);
		});
		methodBody.append('}', NL);
	});
	node.append('}', NL);
}

function generateInvokation(
	s: MResolvedService,
	o: MResolvedOperation,
	allParameters: readonly MParameter[],
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
	hasHeaderParams: boolean,
	multiBodyParam: boolean,
) {
	const HttpRequest = fqn('java.net.http.HttpRequest');

	const methodBody = new CompositeGeneratorNode();
	const method = o.meta?.rest?.method;
	if (method === 'PUT' || method === 'POST' || method === 'PATCH') {
		if (o.parameters.find(p => p.variant === 'stream')) {
			if (o.parameters.find(p => p.variant !== 'stream' && p.meta?.rest?.source === undefined)) {
				const Json = fqn('jakarta.json.Json');
				methodBody.append(`var $jsonPayload = ${Json}.createObjectBuilder();`, NL);
			}
			allParameters
				.filter(p => p.meta?.rest?.source === undefined)
				.forEach(p => {
					let codeBlock: string;
					if (p.variant === 'stream') {
						if (p.array) {
							codeBlock = `${p.name}.forEach($b -> $formDataBuilder.addBlob("${p.meta?.rest?.name ?? p.name}", $b));`;
						} else {
							codeBlock = `$formDataBuilder.addBlob("${p.meta?.rest?.name ?? p.name}", ${p.name});`;
						}
						if (p.nullable && p.optional) {
							methodBody.append(`if (${p.name} != null) {`, NL);
							methodBody.indent(tmp => {
								tmp.append(codeBlock, NL);
							});
							methodBody.append('} else {', NL);
							methodBody.indent(tmp => {
								tmp.append(`$formDataBuilder.addString("_rsdNull-${p.meta?.rest?.name ?? p.name}", "true", null);`, NL);
							});
							methodBody.append('}', NL, NL);
						} else if (p.nullable || p.optional) {
							methodBody.append(`if (${p.name} != null) {`, NL);
							methodBody.indent(tmp => {
								tmp.append(codeBlock, NL);
							});
							methodBody.append('}', NL);
						} else {
							methodBody.append(codeBlock, NL);
						}
					} else {
						if (p.variant === 'record' || p.variant === 'union') {
							const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.jdkhttp.impl.model._JsonUtils`);
							const _BaseDataImpl = fqn(`${artifactConfig.rootPackageName}.jdkhttp.impl.model._BaseDataImpl`);
							if (p.array) {
								codeBlock = `$jsonPayload.add("${p.meta?.rest?.name ?? p.name}", ${_JsonUtils}.toJsonValueArray(${p.name}, i -> ((${_BaseDataImpl}) i).data));`;
							} else {
								codeBlock = `$jsonPayload.add("${p.meta?.rest?.name ?? p.name}", ((${_BaseDataImpl}) ${p.name}).data);`;
							}
						} else {
							if (p.array) {
								if (isMBuiltinNumericType(p.type) || p.type === 'boolean') {
									const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.jdkhttp.impl.model._JsonUtils`);
									if (p.type === 'boolean') {
										codeBlock = `$jsonPayload.add("${p.meta?.rest?.name ?? p.name}", ${_JsonUtils}.toJsonBooleanArray(${p.name}));`;
									} else if (p.type === 'double') {
										codeBlock = `$jsonPayload.add("${p.meta?.rest?.name ?? p.name}", ${_JsonUtils}.toJsonDoubleArray(${p.name}));`;
									} else if (p.type === 'float') {
										codeBlock = `$jsonPayload.add("${p.meta?.rest?.name ?? p.name}", ${_JsonUtils}.toJsonFloatArray(${p.name}));`;
									} else if (p.type === 'long') {
										codeBlock = `$jsonPayload.add("${p.meta?.rest?.name ?? p.name}", ${_JsonUtils}.toJsonLongArray(${p.name}));`;
									} else if (p.type === 'int') {
										codeBlock = `$jsonPayload.add("${p.meta?.rest?.name ?? p.name}", ${_JsonUtils}.toJsonIntArray(${p.name}));`;
									} else {
										codeBlock = `$jsonPayload.add("${p.meta?.rest?.name ?? p.name}", ${_JsonUtils}.toJsonShortArray(${p.name}));`;
									}
								} else {
									const Objects = fqn('java.util.Objects');
									codeBlock = `$jsonPayload.add("${p.meta?.rest?.name ?? p.name}", _JsonUtils.toJsonLiteralArray(${p.name}, ${Objects}::toString));`;
								}
							} else {
								if (isMBuiltinNumericType(p.type) || p.type === 'boolean' || p.type === 'string') {
									codeBlock = `$jsonPayload.add("${p.meta?.rest?.name ?? p.name}", ${p.name});`;
								} else {
									const Objects = fqn('java.util.Objects');
									codeBlock = `$jsonPayload.add("${p.meta?.rest?.name ?? p.name}", ${Objects}.toString(${p.name}));`;
								}
							}
						}

						if (p.nullable) {
							methodBody.append(`if (${p.name} != null) {`, NL);
							methodBody.indent(tmp => {
								tmp.append(codeBlock, NL);
							});
							methodBody.append('} else {', NL);
							methodBody.indent(tmp => {
								tmp.append(`$jsonPayload.addNull("${p.meta?.rest?.name ?? p.name}");`, NL);
							});
							methodBody.append('}', NL, NL);
						} else if (p.optional) {
							methodBody.append(`if (${p.name} != null) {`, NL);
							methodBody.indent(tmp => {
								tmp.append(codeBlock, NL);
							});
							methodBody.append('}', NL);
						} else {
							methodBody.append(codeBlock, NL);
						}
					}
				});
			if (o.parameters.find(p => p.variant !== 'stream' && p.meta?.rest?.source === undefined)) {
				const typeName = fqn(
					`${artifactConfig.rootPackageName}.jdkhttp.impl.model.${s.name}${toFirstUpper(o.name)}DataImpl`,
				);

				methodBody.append(
					`$formDataBuilder.addBytes("_rsdPayload", ServiceUtils.ofObject(new ${typeName}($jsonPayload.build()), false, this.contentType(), ${typeName}.class), this.contentType());`,
					NL,
				);
			}
			methodBody.append('var $formData = $formDataBuilder.build();', NL);
			methodBody.append('var $body = $formData.publisher();', NL);
			methodBody.append('var $contentType = $formData.contentType();', NL);
		} else {
			methodBody.append('var $contentType = this.contentType();', NL);
			const BodyPublishers = fqn('java.net.http.HttpRequest.BodyPublishers');
			const bodyParams = allParameters.filter(p => p.meta?.rest?.source === undefined);
			if (bodyParams.length === 0) {
				const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.jdkhttp.impl.model._JsonUtils`);
				const defaultContent = multiBodyParam
					? `${_JsonUtils}.encodeEmptyObject($contentType)`
					: `${_JsonUtils}.encodeEmptyValue($contentType)`;
				methodBody.append(`var $body = ${BodyPublishers}.ofByteArray(${defaultContent});`, NL);
			} else if (bodyParams.length === 1 && !multiBodyParam) {
				const param = bodyParams[0];
				if (param.variant === 'builtin') {
					if (param.optional && !param.nullable) {
						const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.jdkhttp.impl.model._JsonUtils`);
						methodBody.append(
							`var $body = ${BodyPublishers}.ofByteArray(${param.name} == null ? ${_JsonUtils}.encodeEmptyValue($contentType) : ServiceUtils.of${toFirstUpper(toCamelCaseIdentifier(param.type))}${param.array ? 'List' : ''}(${param.name}, false, $contentType));`,
							NL,
						);
					} else {
						methodBody.append(
							`var $body = ${BodyPublishers}.ofByteArray(ServiceUtils.of${toFirstUpper(toCamelCaseIdentifier(param.type))}${param.array ? 'List' : ''}(${param.name}, ${String(param.nullable)}, $contentType));`,
							NL,
						);
					}
				} else if (param.variant === 'scalar' || param.variant === 'enum' || param.variant === 'inline-enum') {
					if (param.optional && !param.nullable) {
						const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.jdkhttp.impl.model._JsonUtils`);
						methodBody.append(
							`var $body = ${BodyPublishers}.ofByteArray(${param.name} == null ? ${_JsonUtils}.encodeEmptyValue($contentType) : ServiceUtils.ofLiteral${param.array ? 'List' : ''}(${param.name}, false, $contentType));`,
							NL,
						);
					} else {
						methodBody.append(
							`var $body = ${BodyPublishers}.ofByteArray(ServiceUtils.ofLiteral${param.array ? 'List' : ''}(${param.name}, ${String(param.nullable)}, $contentType));`,
							NL,
						);
					}
				} else {
					// eslint-disable-next-line @typescript-eslint/no-deprecated
					const type = computeParameterAPIType(
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
						param as any,
						artifactConfig.nativeTypeSubstitues,
						`${artifactConfig.rootPackageName}.model`,
						fqn,
						true,
					);

					if (param.optional && !param.nullable) {
						const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.jdkhttp.impl.model._JsonUtils`);
						methodBody.append(
							`var $body = ${BodyPublishers}.ofByteArray( ${param.name} == null ? ${_JsonUtils}.encodeEmptyValue($contentType) : ServiceUtils.ofObject${param.array ? 'List' : ''}(${param.name}, ${String(param.nullable)}, $contentType, ${type}.class));`,
							NL,
						);
					} else {
						methodBody.append(
							`var $body = ${BodyPublishers}.ofByteArray(ServiceUtils.ofObject${param.array ? 'List' : ''}(${param.name}, ${String(param.nullable)}, $contentType, ${type}.class));`,
							NL,
						);
					}
				}
			} else {
				const Json = fqn('jakarta.json.Json');
				methodBody.append(`var $builder = ${Json}.createObjectBuilder();`, NL);
				bodyParams.forEach(p => {
					if (p.variant === 'record' || p.variant === 'union') {
						const _BaseDataImpl = fqn(`${artifactConfig.rootPackageName}.jdkhttp.impl.model._BaseDataImpl`);
						if (p.array) {
							const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.jdkhttp.impl.model._JsonUtils`);
							if (p.nullable) {
								methodBody.append(
									`$builder = ${p.name} == null ? $builder.addNull("${p.name}") : $builder.add("${p.name}", ${_JsonUtils}.toJsonValueArray(${p.name}, i -> ((_BaseDataImpl) i).data));`,
									NL,
								);
							} else {
								if (p.optional) {
									methodBody.append('if(' + p.name + ' != null) {', NL);
									methodBody.indent(l => {
										l.append(
											`$builder = $builder.add("${p.name}", ${_JsonUtils}.toJsonValueArray(${p.name}, i -> ((_BaseDataImpl) i).data));`,
											NL,
										);
									});
									methodBody.append('}', NL);
								} else {
									methodBody.append(
										`$builder = $builder.add("${p.name}", ${_JsonUtils}.toJsonValueArray(${p.name}, i -> ((_BaseDataImpl) i).data));`,
										NL,
									);
								}
							}
						} else {
							if (p.nullable) {
								methodBody.append(
									`$builder = ${p.name} == null ? $builder.addNull("${p.name}") : $builder.add("${p.name}", ((${_BaseDataImpl})${p.name}).data);`,
									NL,
								);
							} else {
								if (p.optional) {
									methodBody.append('if(' + p.name + ' != null) {', NL);
									methodBody.indent(l => {
										l.append(`$builder = $builder.add("${p.name}", ((${_BaseDataImpl})${p.name}).data);`, NL);
									});
									methodBody.append('}', NL);
								} else {
									methodBody.append(`$builder = $builder.add("${p.name}", ((${_BaseDataImpl})${p.name}).data);`, NL);
								}
							}
						}
					} else if (p.variant === 'builtin' && isMBuiltinType(p.type)) {
						const type = p.type;
						if (p.array) {
							if (p.nullable) {
								methodBody.append(
									`$builder = ${p.name} == null ? $builder.addNull("${p.name}") : ` +
										builtinBuilderArrayJSONAccess({
											name: p.name,
											type,
										}) +
										';',
									NL,
								);
							} else {
								if (p.optional) {
									methodBody.append('if(' + p.name + ' != null) {', NL);
									methodBody.indent(l => {
										l.append(
											`$builder = ${builtinBuilderArrayJSONAccess({
												name: p.name,
												type,
											})};`,
											NL,
										);
									});
									methodBody.append('}', NL);
								} else {
									methodBody.append(
										'$builder = ' +
											builtinBuilderArrayJSONAccess({
												name: p.name,
												type,
											}) +
											';',
										NL,
									);
								}
							}
						} else {
							if (p.nullable) {
								methodBody.append(
									`$builder = ${p.name} == null ? $builder.addNull("${p.name}") : ` +
										builtinBuilderAccess({ name: p.name, type }) +
										';',
									NL,
								);
							} else {
								if (p.optional) {
									methodBody.append('if(' + p.name + ' != null) {', NL);
									methodBody.indent(l => {
										l.append('$builder = ' + builtinBuilderAccess({ name: p.name, type }) + ';', NL);
									});
									methodBody.append('}', NL);
								} else {
									methodBody.append('$builder = ' + builtinBuilderAccess({ name: p.name, type }) + ';', NL);
								}
							}
						}
					} else {
						methodBody.append('throw new UnsupportedOperationException();', NL);
					}
				});
				const typeName = fqn(
					`${artifactConfig.rootPackageName}.jdkhttp.impl.model.${s.name}${toFirstUpper(o.name)}DataImpl`,
				);

				methodBody.append(
					`var $body = ${BodyPublishers}.ofByteArray(ServiceUtils.ofObject(new ${typeName}($builder.build()), false, this.contentType(), ${typeName}.class));`,
					NL,
				);
			}
			methodBody.appendNewLine();
		}
	}

	methodBody.append(`var $requestBuilder = ${HttpRequest}.newBuilder()`, NL);

	methodBody.indent(tmp => {
		tmp.indent(l => {
			l.append(`.uri($uri)`, NL);
			l.append(`.header("Accept", this.contentType())`, NL);

			if (
				allParameters.some(
					p =>
						(p.meta?.rest?.source === 'header' || p.meta?.rest?.source === 'query') &&
						(p.variant === 'record' || p.variant === 'union'),
				)
			) {
				l.append(`.header("X-RSD-Param-Content-Type", this.contentType())`, NL);
			}
			if (method === 'GET') {
				l.append('.GET();', NL);
			} else if (method === 'DELETE') {
				l.append('.DELETE();', NL);
			} else if (method === 'PUT' || method === 'POST') {
				l.append('.header("Content-Type", $contentType)', NL);
				if (method === 'PUT') {
					l.append('.PUT($body);', NL);
				} else {
					l.append('.POST($body);', NL);
				}
			} else if (method === 'PATCH') {
				l.append('.header("Content-Type", $contentType)', NL);
				l.append('.method("PATCH", $body);', NL);
			}
		});
	});
	if (hasHeaderParams) {
		methodBody.append('if($headers.length > 0) {', NL);
		methodBody.indent(tmp => {
			tmp.append('$requestBuilder = $requestBuilder.headers($headers);', NL);
		});
		methodBody.append('}', NL);
	}
	methodBody.append('var $request = $requestBuilder.build();', NL);
	methodBody.appendNewLine();

	const BodyHandlers = fqn('java.net.http.HttpResponse.BodyHandlers');
	if (o.resultType?.variant === 'stream') {
		methodBody.append(
			`var $response = this.httpClient().send($request, ${BodyHandlers}.ofFile(${fqn(
				'java.nio.file.Files',
			)}.createTempFile("rsd-download","tmp")));`,
			NL,
		);
	} else {
		methodBody.append(`var $response = this.httpClient().send($request, ${BodyHandlers}.ofInputStream());`, NL);
	}
	if (o.meta?.rest?.results.length) {
		o.meta.rest.results.forEach((r, idx) => {
			methodBody.append(`${idx === 0 ? '' : ' else '}if ($response.statusCode() == ${r.statusCode.toFixed(0)}) {`, NL);
			methodBody.indent(resBlock => {
				if (r.error === undefined) {
					handleOkResult(resBlock, o, artifactConfig, fqn);
				} else {
					handleErroResult(resBlock, o, r.error, artifactConfig, fqn);
				}
			});
			methodBody.append('}');
		});
		methodBody.appendNewLine();
	} else {
		const code = o.resultType ? '200' : '204';
		methodBody.append(`if ($response.statusCode() == ${code}) {`, NL);
		methodBody.indent(resBlock => {
			handleOkResult(resBlock, o, artifactConfig, fqn);
		});
		methodBody.append('}', NL);
	}

	const toStringMethod = o.resultType?.variant === 'stream' ? 'mapFileToString' : 'toString';

	methodBody.append(
		`throw new IllegalStateException(String.format("Unsupported Http-Status '%s':\\n%s", $response.statusCode(), ServiceUtils.${toStringMethod}($response)));`,
		NL,
	);

	methodBody.append();
	return methodBody;
}

function generateOperation(
	node: IndentNode,
	s: MResolvedService,
	o: MResolvedOperation,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
	path: string,
) {
	let idx = o.parameters.findIndex(p => p.optional);

	if (idx === -1) {
		generateOpertationMethod(node, s, o, o.parameters, artifactConfig, fqn, path, false);
	} else {
		const hasMultipleParams = o.parameters.filter(p => p.meta?.rest?.source === undefined).length > 1;
		let first = true;
		for (idx; idx <= o.parameters.length; idx++) {
			const params = [...o.parameters];
			params.length = idx;
			if (!first) {
				node.appendNewLine();
			}
			generateOpertationMethod(node, s, o, params, artifactConfig, fqn, path, hasMultipleParams);
			first = false;
		}
	}
}

function handleOkResult(
	node: IndentNode,
	o: MOperation,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
) {
	const type = o.resultType;

	if (type === undefined) {
		node.append('return;', NL);
		return;
	}
	if (type.variant === 'stream') {
		if (type.type === 'file') {
			node.append('return ServiceUtils.mapFile($response);', NL);
		} else {
			node.append('return ServiceUtils.mapBlob($response);', NL);
		}
	} else if (type.variant === 'record' || type.variant === 'union') {
		const modelPkg = `${artifactConfig.rootPackageName}.jdkhttp.impl.model`;
		const modelType = fqn(`${modelPkg}.${type.type}DataImpl`);
		if (type.array) {
			node.append(
				`return ServiceUtils.mapObjects($response, ${modelType}::of, ${toResultType(type, artifactConfig, fqn, '', true)}.class);`,
				NL,
			);
		} else {
			node.append(
				`return ServiceUtils.mapObject($response, ${modelType}::of, ${toResultType(type, artifactConfig, fqn, '', true)}.class);`,
				NL,
			);
		}
	} else if (type.variant === 'builtin') {
		if (isMBuiltinType(type.type)) {
			if (type.array) {
				node.append(`return ${builtinArrayMap(type.type)};`, NL);
			} else {
				node.append(`return ${builtinMap(type.type)};`, NL);
			}
		}
	} else if (type.variant === 'scalar') {
		const resolvedType = resolveType(type.type, artifactConfig.nativeTypeSubstitues, fqn, false);
		if (type.array) {
			node.append(`return ServiceUtils.mapLiterals($response, ${resolvedType}::of);`, NL);
		} else {
			node.append(`return ServiceUtils.mapLiteral($response, ${resolvedType}::of);`, NL);
		}
	} else if (type.variant === 'enum') {
		const resolvedType = resolveType(type.type, artifactConfig.nativeTypeSubstitues, fqn, false);
		if (type.array) {
			node.append(`return ServiceUtils.mapLiterals($response, ${resolvedType}::valueOf);`, NL);
		} else {
			node.append(`return ServiceUtils.mapLiteral($response, ${resolvedType}::valueOf);`, NL);
		}
	} else {
		if (type.array) {
			node.append(`return ServiceUtils.mapLiterals($response, ${toFirstUpper(o.name)}_Result$::valueOf);`, NL);
		} else {
			node.append(`return ServiceUtils.mapLiteral($response, ${toFirstUpper(o.name)}_Result$::valueOf);`, NL);
		}
	}
}

function builtinArrayMap(type: MBuiltinType): string {
	switch (type) {
		case 'boolean':
			return 'ServiceUtils.mapBooleans($response)';
		case 'double':
			return 'ServiceUtils.mapDoubles($response)';
		case 'float':
			return 'ServiceUtils.mapFloats($response)';
		case 'int':
			return 'ServiceUtils.mapInts($response)';
		case 'local-date':
			return 'ServiceUtils.mapLocalDates($response)';
		case 'local-date-time':
			return 'ServiceUtils.mapLocalDateTimes($response)';
		case 'long':
			return 'ServiceUtils.mapLongs($response)';
		case 'short':
			return 'ServiceUtils.mapShorts($response)';
		case 'string':
			return 'ServiceUtils.mapStrings($response)';
		case 'zoned-date-time':
			return 'ServiceUtils.mapZonedDateTimes($response)';
	}
}

function builtinMap(type: MBuiltinType): string {
	switch (type) {
		case 'boolean':
			return 'ServiceUtils.mapBoolean($response)';
		case 'double':
			return 'ServiceUtils.mapDouble($response)';
		case 'float':
			return 'ServiceUtils.mapFloat($response)';
		case 'int':
			return 'ServiceUtils.mapInt($response)';
		case 'local-date':
			return 'ServiceUtils.mapLocalDate($response)';
		case 'local-date-time':
			return 'ServiceUtils.mapLocalDateTime($response)';
		case 'long':
			return 'ServiceUtils.mapLong($response)';
		case 'short':
			return 'ServiceUtils.mapShort($response)';
		case 'string':
			return 'ServiceUtils.mapString($response)';
		case 'zoned-date-time':
			return 'ServiceUtils.mapZonedDateTime($response)';
	}
}

function handleErroResult(
	node: IndentNode,
	o: MResolvedOperation,
	error: string,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
) {
	if (o.resultType?.variant === 'stream') {
		node.append(
			`throw new ${fqn(
				`${artifactConfig.rootPackageName}.${error}Exception`,
			)}(ServiceUtils.mapFileToString($response));`,
			NL,
		);
	} else {
		node.append(
			`throw new ${fqn(`${artifactConfig.rootPackageName}.${error}Exception`)}(ServiceUtils.toString($response));`,
			NL,
		);
	}
}

function toParameter(
	parameter: MParameter,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
	methodName: string,
) {
	const type = computeParameterAPIType(
		parameter,
		artifactConfig.nativeTypeSubstitues,
		`${artifactConfig.rootPackageName}.model`,
		fqn,
		false,
		methodName,
	);
	return `${type} ${parameter.name}`;
}

function toResultType(
	type: MReturnType | undefined,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
	methodName: string,
	noArray = false,
): string {
	const modelPkg = `${artifactConfig.rootPackageName}.model`;
	if (type === undefined) {
		return 'void';
	}

	let rvType: string;
	if (type.variant === 'stream') {
		if (type.type === 'file') {
			rvType = fqn(`${modelPkg}.RSDFile`);
		} else {
			rvType = fqn(`${modelPkg}.RSDBlob`);
		}
	} else if (type.variant === 'union' || type.variant === 'record') {
		rvType = fqn(`${modelPkg}.${type.type}`) + '.Data';
	} else if (type.variant === 'enum') {
		rvType = fqn(`${modelPkg}.${type.type}`);
	} else if (typeof type.type === 'string') {
		rvType = resolveType(type.type, artifactConfig.nativeTypeSubstitues, fqn, type.array);
	} else {
		rvType = toFirstUpper(methodName) + '_Result$';
	}

	if (type.array && !noArray) {
		rvType = `${fqn('java.util.List')}<${rvType}>`;
	}

	return rvType;
}

function generateServiceData(
	s: MResolvedService,
	o: MResolvedOperation,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl.model`;
	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	const JsonObject = fqn('jakarta.json.JsonObject');

	const node = new CompositeGeneratorNode();
	node.append(
		`public class ${s.name}${toFirstUpper(o.name)}DataImpl extends _BaseDataImpl implements ${artifactConfig.rootPackageName}.model._Base.BaseData {`,
		NL,
	);
	node.indent(classBody => {
		classBody.append(`public ${s.name}${toFirstUpper(o.name)}DataImpl(${JsonObject} data) {`, NL);
		classBody.indent(methodBody => {
			methodBody.append('super(data);', NL);
		});
		classBody.append('}', NL, NL);
		o.parameters
			.filter(p => p.variant !== 'stream')
			.filter(p => p.meta?.rest?.source === undefined)
			.forEach(p => {
				const type =
					p.variant === 'inline-enum'
						? computeParameterAPITypeNG(
								p,
								artifactConfig.nativeTypeSubstitues,
								`${artifactConfig.rootPackageName}.model`,
								fqn,
								o.name,
							)
						: computeParameterAPITypeNG(
								p,
								artifactConfig.nativeTypeSubstitues,
								`${artifactConfig.rootPackageName}.model`,
								fqn,
							);
				classBody.append(`public ${type} ${p.name}() {`, NL);
				classBody.indent(methodBody => {
					methodBody.append(
						generateParameterContent(
							p,
							artifactConfig.nativeTypeSubstitues,
							`${artifactConfig.rootPackageName}.model`,
							fqn,
							o,
						),
					);
				});
				classBody.append('}', NL, NL);
			});
	});

	node.append('}');

	return {
		name: `${s.name}${toFirstUpper(o.name)}DataImpl.java`,
		content: toString(generateCompilationUnit(packageName, importCollector, node), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}

function generateParameterContent(
	prop: MParameter,
	nativeTypeSubstitues: Record<string, string> | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
	o: MResolvedOperation,
) {
	let mapper: string;
	const array = prop.array;

	if (isMBuiltinType(prop.type)) {
		if (array) {
			mapper = builtinSimpleJSONArrayAccessNG({
				type: prop.type,
				name: prop.name,
				optional: prop.optional,
				nullable: prop.nullable,
			});
		} else {
			mapper = builtinJSONAccess({
				type: prop.type,
				name: prop.name,
				optional: prop.optional,
				nullable: prop.nullable,
			});
		}
	} else if (prop.variant === 'inline-enum') {
		const Type = computeParameterValueType(prop, nativeTypeSubstitues, interfaceBasePackage, fqn, o.name);
		if (array) {
			if (prop.optional && prop.nullable) {
				mapper = `_JsonUtils.mapNilLiterals(data, "${prop.name}", ${Type}::valueOf)`;
			} else if (prop.optional) {
				mapper = `_JsonUtils.mapOptLiterals(data, "${prop.name}", ${Type}::valueOf)`;
			} else if (prop.nullable) {
				mapper = `_JsonUtils.mapNullLiterals(data, "${prop.name}", ${Type}::valueOf)`;
			} else {
				mapper = `_JsonUtils.mapLiterals(data, "${prop.name}", ${Type}::valueOf)`;
			}
		} else {
			if (prop.optional && prop.nullable) {
				mapper = `_JsonUtils.mapNilLiteral(data, "${prop.name}", ${Type}::valueOf)`;
			} else if (prop.optional) {
				mapper = `_JsonUtils.mapOptLiteral(data, "${prop.name}", ${Type}::valueOf)`;
			} else if (prop.nullable) {
				mapper = `_JsonUtils.mapNullLiteral(data, "${prop.name}", ${Type}::valueOf)`;
			} else {
				mapper = `_JsonUtils.mapLiteral(data, "${prop.name}", ${Type}::valueOf)`;
			}
		}
	} else {
		if (prop.variant === 'enum') {
			if (array) {
				if (prop.optional && prop.nullable) {
					mapper = `_JsonUtils.mapNilLiterals(data, "${prop.name}", ${prop.type}::valueOf)`;
				} else if (prop.optional) {
					mapper = `_JsonUtils.mapOptLiterals(data, "${prop.name}", ${prop.type}::valueOf)`;
				} else if (prop.nullable) {
					mapper = `_JsonUtils.mapNullLiterals(data, "${prop.name}", ${prop.type}::valueOf)`;
				} else {
					mapper = `_JsonUtils.mapLiterals(data, "${prop.name}", ${prop.type}::valueOf)`;
				}
			} else {
				if (prop.optional && prop.nullable) {
					mapper = `_JsonUtils.mapNilLiteral(data, "${prop.name}", ${prop.type}::valueOf)`;
				} else if (prop.optional) {
					mapper = `_JsonUtils.mapOptLiteral(data, "${prop.name}", ${prop.type}::valueOf)`;
				} else if (prop.nullable) {
					mapper = `_JsonUtils.mapNullLiteral(data, "${prop.name}", ${prop.type}::valueOf)`;
				} else {
					mapper = `_JsonUtils.mapLiteral(data, "${prop.name}", ${prop.type}::valueOf)`;
				}
			}
		} else if (prop.variant === 'scalar') {
			const Type = computeParameterValueType(prop, nativeTypeSubstitues, interfaceBasePackage, fqn);
			if (array) {
				if (prop.optional && prop.nullable) {
					mapper = `_JsonUtils.mapNilLiterals(data, "${prop.name}", ${Type}::of)`;
				} else if (prop.optional) {
					mapper = `_JsonUtils.mapOptLiterals(data, "${prop.name}", ${Type}::of)`;
				} else if (prop.nullable) {
					mapper = `_JsonUtils.mapNullLiterals(data, "${prop.name}", ${Type}::of)`;
				} else {
					mapper = `_JsonUtils.mapLiterals(data, "${prop.name}", ${Type}::of)`;
				}
			} else {
				if (prop.optional && prop.nullable) {
					mapper = `_JsonUtils.mapNilLiteral(data, "${prop.name}", ${Type}::of)`;
				} else if (prop.optional) {
					mapper = `_JsonUtils.mapOptLiteral(data, "${prop.name}", ${Type}::of)`;
				} else if (prop.nullable) {
					mapper = `_JsonUtils.mapNullLiteral(data, "${prop.name}", ${Type}::of)`;
				} else {
					mapper = `_JsonUtils.mapLiteral(data, "${prop.name}", ${Type}::of)`;
				}
			}
		} else {
			const type = prop.patch ? `${prop.type}PatchImpl` : `${prop.type}DataImpl`;
			if (array) {
				if (prop.optional && prop.nullable) {
					mapper = `_JsonUtils.mapNilObjects(data, "${prop.name}", ${type}::of)`;
				} else if (prop.optional) {
					mapper = `_JsonUtils.mapOptObjects(data, "${prop.name}", ${type}::of)`;
				} else if (prop.nullable) {
					mapper = `_JsonUtils.mapNullObjects(data, "${prop.name}", ${type}::of)`;
				} else {
					mapper = `_JsonUtils.mapObjects(data, "${prop.name}", ${type}::of)`;
				}
			} else {
				if (prop.nullable && prop.optional) {
					mapper = `_JsonUtils.mapNilObject(data, "${prop.name}", ${type}::of)`;
				} else if (prop.optional) {
					mapper = `_JsonUtils.mapOptObject(data, "${prop.name}", ${type}::of)`;
				} else if (prop.nullable) {
					mapper = `_JsonUtils.mapNullObject(data, "${prop.name}", ${type}::of)`;
				} else {
					mapper = `_JsonUtils.mapObject(data, "${prop.name}", ${type}::of)`;
				}
			}
		}
	}
	const node = new CompositeGeneratorNode();
	node.append(`return ${mapper};`, NL);
	return node;
}
