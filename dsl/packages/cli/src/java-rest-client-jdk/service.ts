import { CompositeGeneratorNode, IndentNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	computeParameterAPIType,
	generateCompilationUnit,
	JavaImportsCollector,
	JavaRestClientJDKGeneratorConfig,
	resolveType,
	toPath,
} from '../java-gen-utils.js';
import {
	isMBuiltinType,
	MBuiltinType,
	MOperation,
	MParameter,
	MResolvedOperation,
	MResolvedService,
	MReturnType,
} from '../model.js';
import { builtinBuilderAccess, builtinBuilderArrayJSONAccess } from '../java-model-json/shared.js';
import { computePath } from '../rest-utils.js';
import { toFirstUpper } from '../util.js';

export function generateService(s: MResolvedService, artifactConfig: JavaRestClientJDKGeneratorConfig): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	const ServiceInterface = fqn(`${artifactConfig.rootPackageName}.${s.name}Service`);
	const HttpClient = fqn('java.net.http.HttpClient');

	const node = new CompositeGeneratorNode();
	node.append(`public class ${s.name}ServiceImpl implements ${ServiceInterface} {`, NL);
	node.indent(classBody => {
		classBody.append('private final String baseURI;', NL);
		classBody.append(`private final ${HttpClient} client;`, NL);
		classBody.appendNewLine();
		classBody.append(`public ${s.name}ServiceImpl(${HttpClient} client, String baseURI) {`, NL);
		classBody.indent(initBody => {
			initBody.append('this.baseURI = baseURI;', NL);
			initBody.append('this.client = client;', NL);
		});
		classBody.append('}', NL);
		s.operations.forEach(o => {
			classBody.appendNewLine();
			generateOperation(classBody, o, artifactConfig, fqn, s.meta?.rest?.path ?? s.name.toLowerCase());
		});
	});
	node.append('}', NL);

	return {
		name: `${s.name}ServiceImpl.java`,
		content: toString(generateCompilationUnit(packageName, importCollector, node), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}

function generateOpertationMethod(
	node: IndentNode,
	o: MResolvedOperation,
	allParameters: readonly MParameter[],
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
	path: string,
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
		const variables = ['this.baseURI', ...processedPath.variables];
		allParameters
			.filter(p => !p.nullable)
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
				variables.forEach((v, idx) =>
					formatted.append(`${v}${idx + 1 < variables.length ? ',' : ''}`, idx + 1 < variables.length ? NL : ''),
				);
			}),
		);
		methodBody.append(');', NL);
		methodBody.appendNewLine();
		const hasQueryParams = allParameters.find(p => p.meta?.rest?.source === 'query');
		if (hasQueryParams) {
			const Map = fqn('java.util.Map');
			methodBody.append(`var $queryParams = ${Map}.of(`, NL);
			allParameters
				.filter(p => p.meta?.rest?.source === 'query')
				.forEach((p, idx, arr) => {
					const last = idx + 1 === arr.length;
					methodBody.indent(tmp =>
						tmp.indent(map => {
							map.append(
								`"${
									p.meta?.rest?.name ?? p.name.toLowerCase()
								}", ServiceUtils.toQueryString(${p.name})${last ? '' : ','}`,
								last ? '' : NL,
							);
						}),
					);
				});
			methodBody.append(');', NL);
			methodBody.append('var $queryParamString = ServiceUtils.toURLQueryPart($queryParams);', NL);
			methodBody.appendNewLine();
		}
		const hasHeaderParams = allParameters.find(p => p.meta?.rest?.source === 'header') !== undefined;
		if (hasHeaderParams) {
			const Map = fqn('java.util.Map');
			methodBody.append(`var $headerParams = ${Map}.of(`, NL);
			allParameters
				.filter(p => p.meta?.rest?.source === 'header')
				.forEach((p, idx, arr) => {
					const last = idx + 1 === arr.length;
					const Objects = fqn('java.util.Objects');
					methodBody.indent(tmp =>
						tmp.indent(map => {
							map.append(
								`"${p.meta?.rest?.name ?? p.name.toLowerCase()}", ${Objects}.toString(${p.name})${last ? '' : ','}`,
								last ? '' : NL,
							);
						}),
					);
				});
			methodBody.append(');', NL);
			methodBody.append('var $headers = ServiceUtils.toHeaders($headerParams);', NL);
			methodBody.appendNewLine();
		}

		if (hasQueryParams) {
			methodBody.append(`var $uri = ${URI}.create($path + $queryParamString);`, NL);
		} else {
			methodBody.append(`var $uri = ${URI}.create($path);`, NL);
		}

		const IOException = fqn('java.io.IOException');

		if (o.parameters.find(p => p.variant === 'stream')) {
			methodBody.append('try (var $formDataBuilder = RSDFormDataPublisherBuilder.create()) {', NL);
		} else {
			methodBody.append('try {', NL);
		}

		methodBody.indent(tryBlock => {
			tryBlock.append(generateInvokation(o, allParameters, artifactConfig, fqn, hasHeaderParams));
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
	o: MResolvedOperation,
	allParameters: readonly MParameter[],
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
	hasHeaderParams: boolean,
) {
	const HttpRequest = fqn('java.net.http.HttpRequest');

	const methodBody = new CompositeGeneratorNode();
	const method = o.meta?.rest?.method;
	if (method === 'PUT' || method === 'POST' || method === 'PATCH') {
		if (o.parameters.find(p => p.variant === 'stream')) {
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
					} else {
						const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.jdkhttp.impl.model._JsonUtils`);

						if (p.variant === 'record' || p.variant === 'union') {
							if (p.array) {
								codeBlock = `${p.name}.forEach($i -> $formDataBuilder.addBlob("${p.meta?.rest?.name ?? p.name}", ${_JsonUtils}.toJsonString($i, false),"application/json"));`;
							} else {
								codeBlock = `$formDataBuilder.addBlob("${p.meta?.rest?.name ?? p.name}",${_JsonUtils}.toJsonString(${
									p.name
								}, false),"application/json");`;
							}
						} else {
							if (p.array) {
								codeBlock = `${p.name}.forEach($v -> $formDataBuilder.addString("${p.meta?.rest?.name ?? p.name}", Objects.toString($v),"text/plain; charset=utf-8"));`;
							} else {
								codeBlock = `$formDataBuilder.addString("${p.meta?.rest?.name ?? p.name}",Objects.toString(${p.name}),"text/plain; charset=utf-8");`;
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
							tmp.append(
								`$formDataBuilder.addString("${p.meta?.rest?.name ?? p.name}", "null","text/plain; charset=utf-8");`,
								NL,
							);
						});
						methodBody.append('}', NL, NL);
					} else {
						methodBody.append(codeBlock, NL);
					}
				});
			methodBody.append('var $formData = $formDataBuilder.build();', NL);
			methodBody.append('var $body = $formData.publisher();', NL);
			methodBody.append('var $contentType = $formData.contentType();', NL);
		} else {
			methodBody.append('var $contentType = "application/json";', NL);
			const BodyPublishers = fqn('java.net.http.HttpRequest.BodyPublishers');
			const bodyParams = allParameters.filter(p => p.meta?.rest?.source === undefined);
			if (bodyParams.length === 0) {
				methodBody.append(`var $body = ${BodyPublishers}.ofString("");`, NL);
			} else if (bodyParams.length === 1) {
				if (bodyParams[0].variant === 'record') {
					const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.jdkhttp.impl.model._JsonUtils`);
					methodBody.append(
						`var $body = ${BodyPublishers}.ofString(${_JsonUtils}.toJsonString(${bodyParams[0].name}, false));`,
						NL,
					);
				} else {
					methodBody.append(
						`var $body = ${BodyPublishers}.ofString(String.format("\\"%s\\"", ${bodyParams[0].name}));`,
						NL,
					);
				}
			} else {
				const Json = fqn('jakarta.json.Json');
				methodBody.append(`var $builder = ${Json}.createObjectBuilder();`, NL);
				bodyParams.forEach(p => {
					if (p.variant === 'record' || p.variant === 'union') {
						const _BaseDataImpl = fqn(`${artifactConfig.rootPackageName}.jdkhttp.impl.model._BaseDataImpl`);
						if (p.array) {
							const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.jdkhttp.impl.model._JsonUtils`);
							methodBody.append(
								`$builder = $builder.add("${p.name}", ${_JsonUtils}.toJsonValueArray(${p.name}, i -> ((_BaseDataImpl) i).data));`,
								NL,
							);
						} else {
							methodBody.append(`$builder = $builder.add("${p.name}", ((${_BaseDataImpl})${p.name}).data);`, NL);
						}
					} else if (p.variant === 'builtin' && isMBuiltinType(p.type)) {
						if (p.array) {
							methodBody.append(
								'$builder = ' +
									builtinBuilderArrayJSONAccess({
										name: p.name,
										type: p.type,
									}) +
									';',
								NL,
							);
						} else {
							if (p.nullable) {
								methodBody.append(
									`$builder = ${p.name} == null ? $builder.addNull("${p.name}") : ` +
										builtinBuilderAccess({ name: p.name, type: p.type }) +
										';',
									NL,
								);
							} else {
								methodBody.append('$builder = ' + builtinBuilderAccess({ name: p.name, type: p.type }) + ';', NL);
							}
						}
					} else {
						methodBody.append('throw new UnsupportedOperationException();', NL);
					}
				});
				const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.jdkhttp.impl.model._JsonUtils`);
				methodBody.append(
					`var $body = ${BodyPublishers}.ofString(${_JsonUtils}.toJsonString($builder.build(), false));`,
					NL,
				);
			}
			methodBody.appendNewLine();
		}
	}

	methodBody.append(`var $request = ${HttpRequest}.newBuilder()`, NL);

	methodBody.indent(tmp => {
		tmp.indent(l => {
			l.append(`.uri($uri)`, NL);
			if (hasHeaderParams) {
				l.append('.headers($headers)', NL);
			}

			if (method === 'GET') {
				l.append('.GET()', NL);
			} else if (method === 'DELETE') {
				l.append('.DELETE()', NL);
			} else if (method === 'PUT' || method === 'POST') {
				l.append('.header("Content-Type", $contentType)', NL);
				if (method === 'PUT') {
					l.append('.PUT($body)', NL);
				} else {
					l.append('.POST($body)', NL);
				}
			} else if (method === 'PATCH') {
				l.append('.header("Content-Type", $contentType)', NL);
				l.append('.method("PATCH", $body)', NL);
			}
			l.append('.build();', NL);
		});
	});
	methodBody.appendNewLine();

	const BodyHandlers = fqn('java.net.http.HttpResponse.BodyHandlers');
	if (o.resultType?.variant === 'stream') {
		methodBody.append(
			`var $response = this.client.send($request, ${BodyHandlers}.ofFile(${fqn(
				'java.nio.file.Files',
			)}.createTempFile("rsd-download","tmp")));`,
			NL,
		);
	} else {
		methodBody.append(`var $response = this.client.send($request, ${BodyHandlers}.ofString());`, NL);
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

	methodBody.append(
		'throw new IllegalStateException(String.format("Unsupported Http-Status \'%s\':\\n%s", $response.statusCode(), $response.body()));',
		NL,
	);

	methodBody.append();
	return methodBody;
}

function generateOperation(
	node: IndentNode,
	o: MResolvedOperation,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
	path: string,
) {
	let idx = o.parameters.findIndex(p => p.optional);

	if (idx === -1) {
		generateOpertationMethod(node, o, o.parameters, artifactConfig, fqn, path);
	} else {
		let first = true;
		for (idx; idx <= o.parameters.length; idx++) {
			const params = [...o.parameters];
			params.length = idx;
			if (!first) {
				node.appendNewLine();
			}
			generateOpertationMethod(node, o, params, artifactConfig, fqn, path);
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
		node.append('return ServiceUtils.mapFile($response);', NL);
	} else if (type.variant === 'record' || type.variant === 'union') {
		const modelPkg = `${artifactConfig.rootPackageName}.jdkhttp.impl.model`;
		const modelType = fqn(`${modelPkg}.${type.type}DataImpl`);
		if (type.array) {
			node.append(`return ServiceUtils.mapObjects($response, ${modelType}::of);`, NL);
		} else {
			node.append(`return ServiceUtils.mapObject($response, ${modelType}::of);`, NL);
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
			`throw new ${fqn(`${artifactConfig.rootPackageName}.${error}Exception`)}(ServiceUtils.mapString($response));`,
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

	if (type.array) {
		rvType = `${fqn('java.util.List')}<${rvType}>`;
	}

	return rvType;
}
