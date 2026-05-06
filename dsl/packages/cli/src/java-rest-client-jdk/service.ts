import { CompositeGeneratorNode, IndentNode, NL, toString } from 'langium/generate';
import { Artifact, ArtifactGenerationConfig } from '../artifact-generator.js';
import {
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
		.filter(o => {
			if (o.parameters.some(p => p.variant === 'stream')) {
				return o.parameters.some(p => p.variant !== 'stream' && p.meta?.rest?.source === undefined);
			} else {
				return (
					o.parameters.filter(p => p.variant !== 'stream').filter(p => p.meta?.rest?.source === undefined).length > 1
				);
			}
		})
		.map(o => generateServiceData(s, o, artifactConfig));
	artifacts.push(...serviceDTOs);

	return artifacts;
}

function appendWithNullGuard(
	node: CompositeGeneratorNode | IndentNode,
	paramName: string,
	nullable: boolean,
	optional: boolean,
	codeBlock: string | CompositeGeneratorNode,
	nullFallback?: string,
) {
	if (nullable) {
		node.append(`if (${paramName} != null) {`, NL);
		node.indent(tmp => tmp.append(codeBlock, NL));
		node.append('} else {', NL);
		node.indent(tmp => tmp.append(nullFallback ?? '', NL));
		node.append('}', NL);
	} else if (optional) {
		node.append(`if (${paramName} != null) {`, NL);
		node.indent(tmp => tmp.append(codeBlock, NL));
		node.append('}', NL);
	} else {
		node.append(codeBlock, NL);
	}
}

function appendMethodSignature(
	node: IndentNode,
	o: MResolvedOperation,
	allParameters: readonly MParameter[],
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
) {
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
}

function appendFormattedPath(
	methodBody: CompositeGeneratorNode,
	endpoint: string,
	variables: string[],
	fqn: (type: string) => string,
) {
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
}

function appendQueryParams(
	methodBody: CompositeGeneratorNode,
	allParameters: readonly MParameter[],
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
): boolean {
	const queryParams = allParameters.filter(p => p.meta?.rest?.source === 'query');
	if (queryParams.length === 0) return false;

	methodBody.append(`var $queryParams = new ServiceUtils.URLSearchParams();`, NL);
	queryParams.forEach(p => {
		const restName = p.meta?.rest?.name ?? p.name.toLowerCase();
		let param: string;
		if (p.variant === 'union' || p.variant === 'record') {
			const type = computeParameterAPITypeNG(
				p,
				artifactConfig.nativeTypeSubstitues,
				`${artifactConfig.rootPackageName}.model`,
				fqn,
				{ withArray: false, withOptional: false },
			);
			param = `ServiceUtils.ofObject(${p.array ? '$q' : p.name}, false, this.contentType(), ${type}.class)`;
		} else {
			param = p.array ? '$q' : p.name;
		}
		if (p.array) {
			const codeBlock = toNodeTree(`
				${p.name}.stream().forEach($q -> {
					$queryParams.append("${restName}", ${param});
				});`);
			appendWithNullGuard(
				methodBody,
				p.name,
				p.nullable,
				p.optional,
				codeBlock,
				`$queryParams.append("${restName}", "null");`,
			);
		} else {
			const codeBlock = `$queryParams.append("${restName}", ${param});`;
			appendWithNullGuard(
				methodBody,
				p.name,
				p.nullable,
				p.optional,
				codeBlock,
				`$queryParams.append("${restName}", "null");`,
			);
		}
	});
	methodBody.appendNewLine();
	return true;
}

function appendHeaderParams(
	methodBody: CompositeGeneratorNode,
	allParameters: readonly MParameter[],
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
): boolean {
	const headerParameters = allParameters.filter(p => p.meta?.rest?.source === 'header');
	if (headerParameters.length === 0) return false;

	const HashMap = fqn('java.util.HashMap');
	methodBody.append(`var $headerParams = new ${HashMap}<String, String>();`, NL);
	headerParameters.forEach(p => {
		const restName = p.meta?.rest?.name ?? p.name.toLowerCase();
		if (p.array) {
			if (p.variant === 'builtin' || p.variant === 'enum' || p.variant === 'inline-enum' || p.variant === 'scalar') {
				const toString =
					p.type === 'string'
						? '$v -> "\\"" + ServiceUtils.encodeAsciiString($v) + "\\""'
						: `${fqn('java.util.Objects')}::toString`;
				const codeBlock = `$headerParams.put("${restName}", String.join(",", ${p.name}.stream().map(${toString}).toList()));`;
				appendWithNullGuard(
					methodBody,
					p.name,
					p.nullable,
					p.optional,
					codeBlock,
					`$headerParams.put("${restName}", "null");`,
				);
			} else if (p.variant === 'stream') {
				methodBody.append('throw new UnsupportedOperationException("Stream headers are not supported yet");', NL);
			} else {
				const type = computeParameterAPITypeNG(
					p,
					artifactConfig.nativeTypeSubstitues,
					`${artifactConfig.rootPackageName}.model`,
					fqn,
					{ withArray: false, withOptional: false },
				);
				const toString = `$v -> ServiceUtils.encodeBase64(ServiceUtils.ofObject($v, false, this.contentType(), ${type}.class))`;
				const codeBlock = `$headerParams.put("${restName}", String.join(",", ${p.name}.stream().map(${toString}).toList()));`;
				appendWithNullGuard(
					methodBody,
					p.name,
					p.nullable,
					p.optional,
					codeBlock,
					`$headerParams.put("${restName}", "null");`,
				);
			}
		} else {
			if (p.variant === 'builtin') {
				if (p.type !== 'string') {
					methodBody.append(`$headerParams.put("${restName}", String.format("%s", ${p.name}));`, NL);
				} else {
					appendWithNullGuard(
						methodBody,
						p.name,
						p.nullable,
						p.optional,
						`$headerParams.put("${restName}", "\\"" + ServiceUtils.encodeAsciiString(${p.name}) + "\\"");`,
						`$headerParams.put("${restName}", "null");`,
					);
				}
			} else if (p.variant === 'record' || p.variant === 'union') {
				const type = computeParameterAPITypeNG(
					p,
					artifactConfig.nativeTypeSubstitues,
					`${artifactConfig.rootPackageName}.model`,
					fqn,
					{ withArray: false, withOptional: false },
				);
				const codeBlock = `$headerParams.put("${restName}", ServiceUtils.encodeBase64(ServiceUtils.ofObject(${p.name}, false, this.contentType(), ${type}.class)));`;
				appendWithNullGuard(
					methodBody,
					p.name,
					p.nullable,
					p.optional,
					codeBlock,
					`$headerParams.put("${restName}", "null");`,
				);
			} else if (p.variant === 'stream') {
				methodBody.append('throw new UnsupportedOperationException("Stream headers are not supported yet");', NL);
			} else {
				methodBody.append(`$headerParams.put("${restName}", String.format("%s", ${p.name}));`, NL);
			}
		}
	});
	methodBody.append('var $headers = ServiceUtils.toHeaders($headerParams);', NL);
	methodBody.appendNewLine();
	return true;
}

function generateOperationMethod(
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

	appendMethodSignature(node, o, allParameters, artifactConfig, fqn);
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
		appendFormattedPath(methodBody, endpoint, variables, fqn);
		const hasQueryParams = appendQueryParams(methodBody, allParameters, artifactConfig, fqn);
		const hasHeaderParams = appendHeaderParams(methodBody, allParameters, artifactConfig, fqn);

		if (hasQueryParams) {
			methodBody.append(`var $uri = ${URI}.create($path + $queryParams.toQueryString());`, NL);
		} else {
			methodBody.append(`var $uri = ${URI}.create($path);`, NL);
		}

		const IOException = fqn('java.io.IOException');

		methodBody.append('try {', NL);
		methodBody.indent(tryBlock => {
			if (o.parameters.find(p => p.variant === 'stream')) {
				tryBlock.append('var $formDataBuilder = RSDFormDataPublisherBuilder.create();', NL);
			}
			tryBlock.append(generateInvocation(s, o, allParameters, artifactConfig, fqn, hasHeaderParams, multiBodyParam));
		});
		methodBody.append(`} catch (${IOException} | InterruptedException e) {`, NL);
		methodBody.indent(catchBlock => {
			catchBlock.append('throw new IllegalStateException(e);', NL);
		});
		methodBody.append('}', NL);
	});
	node.append('}', NL);
}

function generateInvocation(
	s: MResolvedService,
	o: MResolvedOperation,
	allParameters: readonly MParameter[],
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
	hasHeaderParams: boolean,
	multiBodyParam: boolean,
) {
	const methodBody = new CompositeGeneratorNode();
	const method = o.meta?.rest?.method;

	if (method === 'PUT' || method === 'POST' || method === 'PATCH') {
		if (o.parameters.find(p => p.variant === 'stream')) {
			generateStreamBody(methodBody, s, o, allParameters, artifactConfig, fqn);
		} else {
			generateNonStreamBody(methodBody, s, o, allParameters, artifactConfig, fqn, multiBodyParam);
		}
		methodBody.appendNewLine();
	}

	generateRequestBuilderChain(methodBody, method, allParameters, hasHeaderParams, fqn);
	generateResponseDispatch(methodBody, o, artifactConfig, fqn);

	methodBody.append();
	return methodBody;
}

function generateStreamBody(
	methodBody: CompositeGeneratorNode,
	s: MResolvedService,
	o: MResolvedOperation,
	allParameters: readonly MParameter[],
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
) {
	const hasNonStreamBodyParams = o.parameters.some(p => p.variant !== 'stream' && p.meta?.rest?.source === undefined);
	if (hasNonStreamBodyParams) {
		const Json = fqn('jakarta.json.Json');
		methodBody.append(`var $jsonPayload = ${Json}.createObjectBuilder();`, NL);
	}
	allParameters
		.filter(p => p.meta?.rest?.source === undefined)
		.forEach(p => {
			if (p.variant === 'stream') {
				appendStreamParam(methodBody, p);
			} else {
				appendWithNullGuard(
					methodBody,
					p.name,
					p.nullable,
					p.optional,
					jsonPayloadEntry(p, artifactConfig, fqn),
					`$jsonPayload.addNull("${p.meta?.rest?.name ?? p.name}");`,
				);
			}
		});
	if (hasNonStreamBodyParams) {
		const typeName = fqn(`${artifactConfig.rootPackageName}.impl.model.json.${s.name}${toFirstUpper(o.name)}DataImpl`);
		methodBody.append(
			`$formDataBuilder.addBytes("_rsdPayload", ServiceUtils.ofObject(new ${typeName}($jsonPayload.build()), false, this.contentType(), ${typeName}.class), this.contentType());`,
			NL,
		);
	}
	methodBody.append('var $formData = $formDataBuilder.build();', NL);
	methodBody.append('var $body = $formData.publisher();', NL);
	methodBody.append('var $contentType = $formData.contentType();', NL);
}

function appendStreamParam(methodBody: CompositeGeneratorNode, p: MParameter) {
	const restName = p.meta?.rest?.name ?? p.name;
	const codeBlock = p.array
		? `${p.name}.forEach($b -> $formDataBuilder.addBlob("${restName}", $b));`
		: `$formDataBuilder.addBlob("${restName}", ${p.name});`;

	if (p.nullable && p.optional) {
		methodBody.append(`if (${p.name} != null) {`, NL);
		methodBody.indent(tmp => tmp.append(codeBlock, NL));
		methodBody.append('} else {', NL);
		methodBody.indent(tmp => tmp.append(`$formDataBuilder.addString("_rsdNull-${restName}", "true", null);`, NL));
		methodBody.append('}', NL, NL);
	} else if (p.nullable || p.optional) {
		methodBody.append(`if (${p.name} != null) {`, NL);
		methodBody.indent(tmp => tmp.append(codeBlock, NL));
		methodBody.append('}', NL);
	} else {
		methodBody.append(codeBlock, NL);
	}
}

function jsonPayloadEntry(
	p: MParameter,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
): string {
	const key = p.meta?.rest?.name ?? p.name;
	if (p.variant === 'record' || p.variant === 'union') {
		const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.impl.model.json._JsonUtils`);
		const _BaseDataImpl = fqn(`${artifactConfig.rootPackageName}.impl.model.json._BaseDataImpl`);
		return p.array
			? `$jsonPayload.add("${key}", ${_JsonUtils}.toJsonValueArray(${p.name}, i -> ((${_BaseDataImpl}) i).data));`
			: `$jsonPayload.add("${key}", ((${_BaseDataImpl}) ${p.name}).data);`;
	}
	if (p.array) {
		if (isMBuiltinNumericType(p.type) || p.type === 'boolean') {
			const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.impl.model.json._JsonUtils`);
			if (p.type === 'boolean') return `$jsonPayload.add("${key}", ${_JsonUtils}.toJsonBooleanArray(${p.name}));`;
			if (p.type === 'double') return `$jsonPayload.add("${key}", ${_JsonUtils}.toJsonDoubleArray(${p.name}));`;
			if (p.type === 'float') return `$jsonPayload.add("${key}", ${_JsonUtils}.toJsonFloatArray(${p.name}));`;
			if (p.type === 'long') return `$jsonPayload.add("${key}", ${_JsonUtils}.toJsonLongArray(${p.name}));`;
			if (p.type === 'int') return `$jsonPayload.add("${key}", ${_JsonUtils}.toJsonIntArray(${p.name}));`;
			return `$jsonPayload.add("${key}", ${_JsonUtils}.toJsonShortArray(${p.name}));`;
		}
		const Objects = fqn('java.util.Objects');
		return `$jsonPayload.add("${key}", _JsonUtils.toJsonLiteralArray(${p.name}, ${Objects}::toString));`;
	}
	if (isMBuiltinNumericType(p.type) || p.type === 'boolean' || p.type === 'string') {
		return `$jsonPayload.add("${key}", ${p.name});`;
	}
	const Objects = fqn('java.util.Objects');
	return `$jsonPayload.add("${key}", ${Objects}.toString(${p.name}));`;
}

function generateNonStreamBody(
	methodBody: CompositeGeneratorNode,
	s: MResolvedService,
	o: MResolvedOperation,
	allParameters: readonly MParameter[],
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
	multiBodyParam: boolean,
) {
	methodBody.append('var $contentType = this.contentType();', NL);
	const bodyParams = allParameters.filter(p => p.meta?.rest?.source === undefined);
	if (bodyParams.length === 0) {
		appendEmptyBody(methodBody, multiBodyParam, artifactConfig, fqn);
	} else if (bodyParams.length === 1 && !multiBodyParam) {
		appendSingleParamBody(methodBody, bodyParams[0], artifactConfig, fqn);
	} else {
		appendMultiParamBody(methodBody, s, o, bodyParams, artifactConfig, fqn);
	}
}

function appendEmptyBody(
	methodBody: CompositeGeneratorNode,
	multiBodyParam: boolean,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
) {
	const BodyPublishers = fqn('java.net.http.HttpRequest.BodyPublishers');
	const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.impl.model.json._JsonUtils`);
	const defaultContent = multiBodyParam
		? `${_JsonUtils}.encodeEmptyObject($contentType)`
		: `${_JsonUtils}.encodeEmptyValue($contentType)`;
	methodBody.append(`var $body = ${BodyPublishers}.ofByteArray(${defaultContent});`, NL);
}

function appendSingleParamBody(
	methodBody: CompositeGeneratorNode,
	param: MParameter,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
) {
	const BodyPublishers = fqn('java.net.http.HttpRequest.BodyPublishers');
	const suffix = param.array ? 'List' : '';
	const optionalEmpty =
		param.optional && !param.nullable
			? `${fqn(`${artifactConfig.rootPackageName}.impl.model.json._JsonUtils`)}.encodeEmptyValue($contentType)`
			: null;

	let baseCall: string;
	let optionalCall: string;
	if (param.variant === 'builtin') {
		const method = `ServiceUtils.of${toFirstUpper(toCamelCaseIdentifier(param.type))}${suffix}`;
		baseCall = `${method}(${param.name}, ${String(param.nullable)}, $contentType)`;
		optionalCall = `${method}(${param.name}, false, $contentType)`;
	} else if (param.variant === 'scalar' || param.variant === 'enum' || param.variant === 'inline-enum') {
		const method = `ServiceUtils.ofLiteral${suffix}`;
		baseCall = `${method}(${param.name}, ${String(param.nullable)}, $contentType)`;
		optionalCall = `${method}(${param.name}, false, $contentType)`;
	} else {
		const type = computeParameterAPITypeNG(
			param,
			artifactConfig.nativeTypeSubstitues,
			`${artifactConfig.rootPackageName}.model`,
			fqn,
			{ withArray: false, withOptional: false },
		);
		const method = `ServiceUtils.ofObject${suffix}`;
		baseCall = `${method}(${param.name}, ${String(param.nullable)}, $contentType, ${type}.class)`;
		optionalCall = `${method}(${param.name}, false, $contentType, ${type}.class)`;
	}
	const callExpr = optionalEmpty ? `${param.name} == null ? ${optionalEmpty} : ${optionalCall}` : baseCall;
	methodBody.append(`var $body = ${BodyPublishers}.ofByteArray(${callExpr});`, NL);
}

function appendMultiParamBody(
	methodBody: CompositeGeneratorNode,
	s: MResolvedService,
	o: MResolvedOperation,
	bodyParams: MParameter[],
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
) {
	const BodyPublishers = fqn('java.net.http.HttpRequest.BodyPublishers');
	const Json = fqn('jakarta.json.Json');
	methodBody.append(`var $builder = ${Json}.createObjectBuilder();`, NL);
	bodyParams.forEach(p => {
		if (p.variant === 'record' || p.variant === 'union') {
			const _BaseDataImpl = fqn(`${artifactConfig.rootPackageName}.impl.model.json._BaseDataImpl`);
			if (p.array) {
				const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.impl.model.json._JsonUtils`);
				appendBuilderAssignment(
					methodBody,
					p,
					`$builder.add("${p.name}", ${_JsonUtils}.toJsonValueArray(${p.name}, i -> ((${_BaseDataImpl}) i).data))`,
				);
			} else {
				appendBuilderAssignment(methodBody, p, `$builder.add("${p.name}", ((${_BaseDataImpl})${p.name}).data)`);
			}
		} else if (p.variant === 'builtin' && isMBuiltinType(p.type)) {
			const type = p.type;
			appendBuilderAssignment(
				methodBody,
				p,
				p.array ? builtinBuilderArrayJSONAccess({ name: p.name, type }) : builtinBuilderAccess({ name: p.name, type }),
			);
		} else {
			methodBody.append('throw new UnsupportedOperationException();', NL);
		}
	});
	const typeName = fqn(`${artifactConfig.rootPackageName}.impl.model.json.${s.name}${toFirstUpper(o.name)}DataImpl`);
	methodBody.append(
		`var $body = ${BodyPublishers}.ofByteArray(ServiceUtils.ofObject(new ${typeName}($builder.build()), false, this.contentType(), ${typeName}.class));`,
		NL,
	);
}

function appendBuilderAssignment(methodBody: CompositeGeneratorNode, p: MParameter, expr: string) {
	if (p.nullable) {
		methodBody.append(`$builder = ${p.name} == null ? $builder.addNull("${p.name}") : ${expr};`, NL);
	} else if (p.optional) {
		methodBody.append(`if(${p.name} != null) {`, NL);
		methodBody.indent(l => l.append(`$builder = ${expr};`, NL));
		methodBody.append('}', NL);
	} else {
		methodBody.append(`$builder = ${expr};`, NL);
	}
}

function generateRequestBuilderChain(
	methodBody: CompositeGeneratorNode,
	method: string | undefined,
	allParameters: readonly MParameter[],
	hasHeaderParams: boolean,
	fqn: (type: string) => string,
) {
	const HttpRequest = fqn('java.net.http.HttpRequest');
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
}

function generateResponseDispatch(
	methodBody: CompositeGeneratorNode,
	o: MResolvedOperation,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
) {
	const BodyHandlers = fqn('java.net.http.HttpResponse.BodyHandlers');
	if (o.resultType?.variant === 'stream') {
		const Files = fqn('java.nio.file.Files');
		methodBody.append(
			`var $response = this.httpClient().send($request, ${BodyHandlers}.ofFile(${Files}.createTempFile("rsd-download","tmp")));`,
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
					handleErrorResult(resBlock, o, r.error, artifactConfig, fqn);
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
}

function generateOperation(
	node: IndentNode,
	s: MResolvedService,
	o: MResolvedOperation,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
	path: string,
) {
	const firstOptional = o.parameters.findIndex(p => p.optional);

	if (firstOptional === -1) {
		generateOperationMethod(node, s, o, o.parameters, artifactConfig, fqn, path, false);
	} else {
		const hasMultipleParams = o.parameters.filter(p => p.meta?.rest?.source === undefined).length > 1;
		for (let i = firstOptional; i <= o.parameters.length; i++) {
			if (i > firstOptional) {
				node.appendNewLine();
			}
			const params = o.parameters.slice(0, i);
			generateOperationMethod(node, s, o, params, artifactConfig, fqn, path, hasMultipleParams);
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
		const modelPkg = `${artifactConfig.rootPackageName}.impl.model.json`;
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
			node.append(`return ${builtinMapExpression(type.type, type.array)};`, NL);
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

function builtinMapExpression(type: MBuiltinType, array: boolean): string {
	const names: Record<MBuiltinType, string> = {
		boolean: 'Boolean',
		double: 'Double',
		float: 'Float',
		int: 'Int',
		'local-date': 'LocalDate',
		'local-date-time': 'LocalDateTime',
		long: 'Long',
		short: 'Short',
		string: 'String',
		'zoned-date-time': 'ZonedDateTime',
	};
	return `ServiceUtils.map${names[type]}${array ? 's' : ''}($response)`;
}

function handleErrorResult(
	node: IndentNode,
	o: MResolvedOperation,
	error: string,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
) {
	const toStr = o.resultType?.variant === 'stream' ? 'mapFileToString' : 'toString';
	node.append(
		`throw new ${fqn(`${artifactConfig.rootPackageName}.${error}Exception`)}(ServiceUtils.${toStr}($response));`,
		NL,
	);
}

function toParameter(
	parameter: MParameter,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	fqn: (type: string) => string,
	methodName: string,
) {
	let type: string;
	if (parameter.variant === 'inline-enum') {
		type = computeParameterAPITypeNG(
			parameter,
			artifactConfig.nativeTypeSubstitues,
			`${artifactConfig.rootPackageName}.model`,
			fqn,
			methodName,
			{ withArray: true, withOptional: false },
		);
	} else {
		type = computeParameterAPITypeNG(
			parameter,
			artifactConfig.nativeTypeSubstitues,
			`${artifactConfig.rootPackageName}.model`,
			fqn,
			{ withArray: true, withOptional: false },
		);
	}

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
	const packageName = `${artifactConfig.rootPackageName}.impl.model.json`;
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

function jsonMapper(
	kind: 'Literal' | 'Object',
	propName: string,
	factoryRef: string,
	array: boolean,
	optional: boolean,
	nullable: boolean,
): string {
	const base = array ? `${kind}s` : kind;
	const qualifier = optional && nullable ? 'Nil' : optional ? 'Opt' : nullable ? 'Null' : '';
	return `_JsonUtils.map${qualifier}${base}(data, "${propName}", ${factoryRef})`;
}

function generateParameterContent(
	prop: MParameter,
	nativeTypeSubstitues: Record<string, string> | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
	o: MResolvedOperation,
) {
	let mapper: string;
	const { array, optional, nullable } = prop;

	if (isMBuiltinType(prop.type)) {
		mapper = array
			? builtinSimpleJSONArrayAccessNG({ type: prop.type, name: prop.name, optional, nullable })
			: builtinJSONAccess({ type: prop.type, name: prop.name, optional, nullable });
	} else if (prop.variant === 'inline-enum') {
		const Type = computeParameterValueType(prop, nativeTypeSubstitues, interfaceBasePackage, fqn, o.name);
		mapper = jsonMapper('Literal', prop.name, `${Type}::valueOf`, array, optional, nullable);
	} else if (prop.variant === 'enum') {
		mapper = jsonMapper('Literal', prop.name, `${prop.type}::valueOf`, array, optional, nullable);
	} else if (prop.variant === 'scalar') {
		const Type = computeParameterValueType(prop, nativeTypeSubstitues, interfaceBasePackage, fqn);
		mapper = jsonMapper('Literal', prop.name, `${Type}::of`, array, optional, nullable);
	} else {
		const type = prop.patch ? `${prop.type}PatchImpl` : `${prop.type}DataImpl`;
		mapper = jsonMapper('Object', prop.name, `${type}::of`, array, optional, nullable);
	}

	const node = new CompositeGeneratorNode();
	node.append(`return ${mapper};`, NL);
	return node;
}
