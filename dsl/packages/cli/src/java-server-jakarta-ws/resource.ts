import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	computeParameterAPIType,
	computeParameterAPITypeNG,
	computeParameterValueType,
	generateCompilationUnit,
	JavaImportsCollector,
	JavaServerJakartaWSGeneratorConfig,
	resolveType,
	toPath,
} from '../java-gen-utils.js';
import {
	isMBuiltinType,
	MOperation,
	MParameter,
	MParameterInlineEnumType,
	MParameterNoneInlineEnumType,
	MResolvedOperation,
	MResolvedService,
} from '../model.js';
import { toCamelCaseIdentifier, toFirstUpper } from '../util.js';
import { builtinJSONAccess, builtinSimpleJSONArrayAccessNG } from '../java-model-json/shared.js';

export function generateResource(s: MResolvedService, artifactConfig: JavaServerJakartaWSGeneratorConfig): Artifact[] {
	const result: Artifact[] = [];
	const serviceDTOs = s.operations
		.filter(
			o => o.parameters.find(p => p.variant === 'stream') == undefined, // If there's a stream we have to use multi-part
		)
		.filter(o => o.parameters.filter(p => p.meta?.rest?.source === undefined).length > 1)
		.map(o => generateServiceData(s, o, artifactConfig));
	result.push(...serviceDTOs);

	const resourceArtifact = _generateResource(s, artifactConfig);
	if (resourceArtifact) {
		result.push(resourceArtifact);
	}

	return result;
}

function _generateResource(
	s: MResolvedService,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
): Artifact | undefined {
	if (s.meta?.rest === undefined) {
		return undefined;
	}

	const packageName = `${artifactConfig.rootPackageName}.rest`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	const ApplicationScoped = fqn('jakarta.enterprise.context.ApplicationScoped');
	const Path = fqn('jakarta.ws.rs.Path');
	const Produces = fqn('jakarta.ws.rs.Produces');
	const MediaType = fqn('jakarta.ws.rs.core.MediaType');
	const Service = fqn(`${artifactConfig.rootPackageName}.service.${s.name}Service`);
	const Inject = fqn('jakarta.inject.Inject');
	const Response = fqn('jakarta.ws.rs.core.Response');

	const node = new CompositeGeneratorNode();
	node.append(`@${ApplicationScoped}`, NL);
	node.append(`@${Path}("${s.meta.rest.path.replaceAll('$', '')}")`, NL);
	node.append(`@${Produces}(${MediaType}.APPLICATION_JSON)`, NL);
	node.append(`public class ${s.name}Resource {`, NL);
	node.indent(cBody => {
		cBody.append('private final RestBuilderFactory builderFactory;', NL);
		cBody.append(`private final ${Service} service;`, NL);
		cBody.append(`private final ${s.name}ResourceResponseBuilder responseBuilder;`, NL);
		if (artifactConfig.scopeValues) {
			artifactConfig.scopeValues.forEach(v => {
				cBody.append('@Inject', NL);
				cBody.append(`_ScopeValueProvider.${toFirstUpper(v.name)}Provider ${v.name}Provider;`, NL);
			});
		}
		cBody.appendNewLine();
		cBody.append(`@${Inject}`, NL);
		cBody.append(
			`public ${s.name}Resource(${Service} service, ${s.name}ResourceResponseBuilder responseBuilder, RestBuilderFactory builderFactory) {`,
			NL,
		);
		cBody.indent(mBody => {
			mBody.append('this.builderFactory = builderFactory;', NL);
			mBody.append('this.service = service;', NL);
			mBody.append('this.responseBuilder = responseBuilder;', NL);
		});
		cBody.append('}', NL);
		cBody.appendNewLine();

		s.operations
			.filter(o => o.parameters.find(p => p.variant === 'stream') === undefined)
			.forEach(o => {
				if (o.meta?.rest === undefined) {
					return;
				}

				cBody.append(`@${fqn(`jakarta.ws.rs.${o.meta.rest.method}`)}`, NL);
				if (o.meta.rest.path) {
					cBody.append(`@${Path}("${o.meta.rest.path.replaceAll('$', '')}")`, NL);
				}

				const multiBody = o.parameters.filter(p => p.meta?.rest?.source === undefined).length > 1;
				const params: string[] = [];
				const serviceParams: string[] = [];

				if (multiBody) {
					params.push(
						...o.parameters
							.filter(p => p.meta?.rest !== undefined)
							.filter(p => p.meta?.rest?.source !== undefined)
							.map(p => toParameter(p, false, artifactConfig, fqn, false)),
					);

					params.push(`String data`);
					serviceParams.push(
						...o.parameters.map(p => {
							if (p.meta?.rest?.source === undefined) {
								return `dto.${p.name}()`;
							}
							return p.name;
						}),
					);
				} else {
					params.push(...o.parameters.map(p => toParameter(p, false, artifactConfig, fqn, false)));
					serviceParams.push(...o.parameters.map(p => p.name));
				}

				if (artifactConfig.scopeValues) {
					serviceParams.unshift(...artifactConfig.scopeValues.map(v => `$${v.name}`));
				}

				if (params.length > 0) {
					if (params.length > 1) {
						cBody.append(`public ${Response} ${o.name}(`, NL);
						cBody.indent(tmp =>
							tmp.indent(paramIndent => {
								params.forEach((p, idx, arr) => {
									paramIndent.append(p);
									if (idx + 1 < arr.length) {
										paramIndent.append(',', NL);
									} else {
										paramIndent.append(') {', NL);
									}
								});
							}),
						);
					} else {
						cBody.append(`public ${Response} ${o.name}(${params[0]}) {`, NL);
					}
				} else {
					cBody.append(`public ${Response} ${o.name}() {`, NL);
				}
				cBody.indent(mBody => {
					o.parameters.forEach(p => {
						if (multiBody && p.meta?.rest?.source === undefined) {
							return;
						}
						if (p.variant === 'record' || p.variant === 'union') {
							mBody.append(
								recordUnionParameter(p, artifactConfig, fqn, packageName, p.meta?.rest?.source === undefined),
							);
						} else if (p.variant === 'builtin') {
							mBody.append(builtinParameter(p, fqn, packageName, p.meta?.rest?.source === undefined));
						} else if (p.variant === 'enum') {
							mBody.append(enumParameter(p, artifactConfig, fqn, packageName, p.meta?.rest?.source === undefined));
						} else if (p.variant === 'inline-enum') {
							mBody.append(inlineEnumParameter(p, o, Service, fqn, packageName, p.meta?.rest?.source === undefined));
						} else if (p.variant === 'scalar') {
							mBody.append(scalarParameter(p, artifactConfig, fqn, packageName, p.meta?.rest?.source === undefined));
						}
					});
					if (multiBody) {
						const _JsonUtils = fqn(`${packageName}.model._JsonUtils`);
						const Type = fqn(`${packageName}.model.${s.name}${toFirstUpper(o.name)}DataImpl`);
						mBody.append(`var dto = ${_JsonUtils}.parseObject(data, ${Type}::new);`, NL);
					}
					if (artifactConfig.scopeValues) {
						artifactConfig.scopeValues.forEach(v => {
							mBody.append(`var $${v.name} = this.${v.name}Provider.${v.name}();`, NL);
						});
					}

					const errors = o.meta?.rest?.results.filter(e => e.error);
					if (errors && errors.length > 0) {
						mBody.append('try {', NL);
						mBody.indent(inner => {
							inner.append(okResultContent(o, serviceParams));
						});
						errors.forEach(e => {
							const Type = fqn(`${artifactConfig.rootPackageName}.service.${e.error ?? ''}Exception`);
							mBody.append(`} catch (${Type} e) {`, NL);
							mBody.indent(inner => {
								inner.append(`return _RestUtils.toResponse(${e.statusCode.toFixed()}, e);`, NL);
							});
						});
						mBody.append('}', NL);
					} else {
						mBody.append(okResultContent(o, serviceParams));
					}
				});
				cBody.append('}', NL);
				cBody.appendNewLine();
			});

		s.operations
			.filter(o => o.parameters.find(p => p.variant === 'stream') !== undefined)
			.forEach(o => {
				if (o.meta?.rest === undefined) {
					return;
				}

				cBody.append(`@${fqn(`jakarta.ws.rs.${o.meta.rest.method}`)}`, NL);
				if (o.meta.rest.path) {
					cBody.append(`@${Path}("${o.meta.rest.path.replace('$', '')}")`, NL);
				}
				cBody.append(
					`@${fqn('jakarta.ws.rs.Consumes')}(${fqn('jakarta.ws.rs.core.MediaType')}.MULTIPART_FORM_DATA)`,
					NL,
				);
				const params: string[] = o.parameters.map(p => toParameter(p, true, artifactConfig, fqn, true));
				const nullableStreamParams = o.parameters
					.filter(p => p.variant === 'stream' && p.optional && p.nullable)
					.map(p => `@RestForm("_rsdNull-${p.name}") boolean $is${toFirstUpper(p.name)}Null`);
				params.push(...nullableStreamParams);
				const serviceParams: string[] = [];

				serviceParams.push(...o.parameters.map(p => p.name));
				if (artifactConfig.scopeValues) {
					serviceParams.unshift(...artifactConfig.scopeValues.map(v => `$${v.name}`));
				}

				cBody.append(`public ${fqn('jakarta.ws.rs.core.Response')} ${o.name}(${params.join(', ')}) {`, NL);
				cBody.indent(mBody => {
					o.parameters.forEach(p => {
						if (p.variant === 'stream') {
							if (p.type === 'file') {
								if (p.array) {
									if (p.optional && p.nullable) {
										const type = `${fqn('java.util.List')}<${fqn(`${artifactConfig.rootPackageName}.service.model.RSDFile`)}>`;
										mBody.append(
											`var ${p.name} = _data == null || _data.isEmpty() ? ($is${toFirstUpper(p.name)}Null ? _NillableImpl.<${type}>nill() : _NillableImpl.<${type}>undefined()) : ${fqn(`${artifactConfig.rootPackageName}.rest.model._NillableImpl`)}.of(_data.stream().map($e -> builderFactory.createFile($e.filePath(), $e.contentType(), $e.fileName())).toList());`,
											NL,
										);
									} else if (p.optional || p.nullable) {
										mBody.append(
											`var ${p.name} = _data == null || _data.isEmpty() ? ${fqn('java.util.Optional')}.<${fqn('java.util.List')}<${fqn(`${artifactConfig.rootPackageName}.service.model.RSDFile`)}>>empty() : ${fqn('java.util.Optional')}.of(_data.stream().map($e -> builderFactory.createFile($e.filePath(), $e.contentType(), $e.fileName())).toList());`,
											NL,
										);
									} else {
										mBody.append(
											`var ${p.name} = _data.stream().map($e -> builderFactory.createFile($e.filePath(), $e.contentType(), $e.fileName())).toList();`,
											NL,
										);
									}
								} else {
									if (p.optional && p.nullable) {
										const nillType = fqn(`${artifactConfig.rootPackageName}.rest.model._NillableImpl`);
										const type = fqn(`${artifactConfig.rootPackageName}.service.model.RSDFile`);
										mBody.append(
											`var ${p.name} = _${p.name} == null ? ($is${toFirstUpper(p.name)}Null ? ${nillType}.<${type}>nill() : ${nillType}.<${type}>undefined()) : ${nillType}.of(builderFactory.createFile(_${p.name}.filePath(), _${p.name}.contentType(), _${p.name}.fileName()));`,
											NL,
										);
									} else if (p.optional || p.nullable) {
										mBody.append(
											`var ${p.name} = _${p.name} != null ? ${fqn('java.util.Optional')}.of(builderFactory.createFile(_${p.name}.filePath(), _${p.name}.contentType(), _${p.name}.fileName())) : Optional.<${fqn(`${artifactConfig.rootPackageName}.service.model.RSDFile`)}>empty();`,
											NL,
										);
									} else {
										mBody.append(
											`var ${p.name} = builderFactory.createFile(_${p.name}.filePath(), _${p.name}.contentType(), _${p.name}.fileName());`,
											NL,
										);
									}
								}
							} else {
								if (p.array) {
									if (p.optional && p.nullable) {
										const type = `${fqn('java.util.List')}<${fqn(`${artifactConfig.rootPackageName}.service.model.RSDBlob`)}>`;
										mBody.append(
											`var ${p.name} = _data == null || _data.isEmpty() ? ($is${toFirstUpper(p.name)}Null ? _NillableImpl.<${type}>nill() : _NillableImpl.<${type}>undefined()) : ${fqn(`${artifactConfig.rootPackageName}.rest.model._NillableImpl`)}.of(_data.stream().map($e -> builderFactory.createBlob($e.filePath(), $e.contentType())).toList());`,
											NL,
										);
									} else if (p.optional || p.nullable) {
										mBody.append(
											`var ${p.name} = _data == null || _data.isEmpty() ? ${fqn('java.util.Optional')}.<${fqn('java.util.List')}<${fqn(`${artifactConfig.rootPackageName}.service.model.RSDBlob`)}>>empty() : ${fqn('java.util.Optional')}.of(_data.stream().map($e -> builderFactory.createBlob($e.filePath(), $e.contentType())).toList());`,
											NL,
										);
									} else {
										mBody.append(
											`var ${p.name} = _data.stream().map($e -> builderFactory.createBlob($e.filePath(), $e.contentType())).toList();`,
											NL,
										);
									}
								} else {
									if (p.optional && p.nullable) {
										const nillType = fqn(`${artifactConfig.rootPackageName}.rest.model._NillableImpl`);
										const type = fqn(`${artifactConfig.rootPackageName}.service.model.RSDBlob`);
										mBody.append(
											`var ${p.name} = _${p.name} == null ? ($is${toFirstUpper(p.name)}Null ? ${nillType}.<${type}>nill() : ${nillType}.<${type}>undefined()) : ${nillType}.of(builderFactory.createBlob(_${p.name}.filePath(), _${p.name}.contentType()));`,
											NL,
										);
									} else if (p.optional || p.nullable) {
										mBody.append(
											`var ${p.name} = _${p.name} != null ? ${fqn('java.util.Optional')}.of(builderFactory.createBlob(_${p.name}.filePath(), _${p.name}.contentType())) : Optional.<${fqn(`${artifactConfig.rootPackageName}.service.model.RSDBlob`)}>empty();`,
											NL,
										);
									} else {
										mBody.append(
											`var ${p.name} = builderFactory.createBlob(_${p.name}.filePath(), _${p.name}.contentType());`,
											NL,
										);
									}
								}
							}
						} else {
							if (p.variant === 'record' || p.variant === 'union') {
								mBody.append(recordUnionParameter(p, artifactConfig, fqn, packageName, false));
							} else if (p.variant === 'builtin') {
								mBody.append(builtinParameter(p, fqn, packageName, false));
							} else if (p.variant === 'enum') {
								mBody.append(enumParameter(p, artifactConfig, fqn, packageName, false));
							} else if (p.variant === 'inline-enum') {
								mBody.append(inlineEnumParameter(p, o, Service, fqn, packageName, false));
							} /* else if (p.variant === 'scalar')*/ else {
								mBody.append(scalarParameter(p, artifactConfig, fqn, packageName, false));
							}
						}
					});
					if (artifactConfig.scopeValues) {
						artifactConfig.scopeValues.forEach(v => {
							mBody.append(`var $${v.name} = this.${v.name}Provider.${v.name}();`, NL);
						});
					}
					const errors = o.meta?.rest?.results.filter(e => e.error);
					if (errors && errors.length > 0) {
						mBody.append('try {', NL);
						mBody.indent(inner => {
							inner.append(okResultContent(o, serviceParams));
						});
						errors.forEach(e => {
							const Type = fqn(`${artifactConfig.rootPackageName}.service.${e.error ?? ''}Exception`);
							mBody.append(`} catch (${Type} e) {`, NL);
							mBody.indent(inner => {
								inner.append(`return _RestUtils.toResponse(${e.statusCode.toFixed()}, e);`, NL);
							});
						});
						mBody.append('}', NL);
					} else {
						mBody.append(okResultContent(o, serviceParams));
					}
				});
				cBody.append('}', NL);
			});
	});

	node.append('}', NL);

	return {
		name: `${toFirstUpper(s.name)}Resource.java`,
		content: toString(generateCompilationUnit(packageName, importCollector, node), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}

function enumParameter(
	p: MParameterNoneInlineEnumType,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	fqn: (type: string) => string,
	packageName: string,
	asJSON: boolean,
) {
	const t = fqn(`${artifactConfig.rootPackageName}.service.model.${p.type}`);
	const _Util = asJSON ? fqn(`${packageName}.model._JsonUtils`) : '_RestUtils';
	const node = new CompositeGeneratorNode();
	if (p.array) {
		if (asJSON) {
			if (p.optional && p.nullable) {
				node.append(`var ${p.name} = ${_Util}.parseNilLiterals(_${p.name}, ${t}::valueOf);`, NL);
			} else if (p.optional) {
				node.append(`var ${p.name} = ${_Util}.parseOptLiterals(_${p.name}, ${t}::valueOf);`, NL);
			} else if (p.nullable) {
				node.append(`var ${p.name} = ${_Util}.parseNullLiterals(_${p.name}, ${t}::valueOf);`, NL);
			} else {
				node.append(`var ${p.name} = ${_Util}.parseLiterals(_${p.name}, ${t}::valueOf);`, NL);
			}
		} else {
			if (p.optional && p.nullable) {
				node.append(`var ${p.name} = ${_Util}.mapNilLiterals(_${p.name}, ${t}::valueOf);`, NL);
			} else if (p.optional) {
				node.append(`var ${p.name} = ${_Util}.mapOptLiterals(_${p.name}, ${t}::valueOf);`, NL);
			} else if (p.nullable) {
				node.append(`var ${p.name} = ${_Util}.mapNullLiterals(_${p.name}, ${t}::valueOf);`, NL);
			} else {
				node.append(`var ${p.name} = ${_Util}.mapLiterals(_${p.name}, ${t}::valueOf);`, NL);
			}
		}
	} else {
		if (p.optional && p.nullable) {
			node.append(`var ${p.name} = ${_Util}.parseNilLiteral(_${p.name}, ${t}::valueOf);`, NL);
		} else if (p.optional) {
			node.append(`var ${p.name} = ${_Util}.parseOptLiteral(_${p.name}, ${t}::valueOf);`, NL);
		} else if (p.nullable) {
			node.append(`var ${p.name} = ${_Util}.parseNullLiteral(_${p.name}, ${t}::valueOf);`, NL);
		} else {
			node.append(`var ${p.name} = ${_Util}.parseLiteral(_${p.name}, ${t}::valueOf);`, NL);
		}
	}
	return node;
}

function builtinParameter(
	p: MParameterNoneInlineEnumType,
	fqn: (type: string) => string,
	packageName: string,
	asJSON: boolean,
) {
	const _Util = asJSON ? fqn(`${packageName}.model._JsonUtils`) : '_RestUtils';
	const node = new CompositeGeneratorNode();
	if (p.array) {
		if (asJSON) {
			if (p.optional && p.nullable) {
				node.append(
					`var ${p.name} = ${_Util}.parseNil${toFirstUpper(toCamelCaseIdentifier(p.type))}s(_${p.name});`,
					NL,
				);
			} else if (p.optional) {
				node.append(
					`var ${p.name} = ${_Util}.parseOpt${toFirstUpper(toCamelCaseIdentifier(p.type))}s(_${p.name});`,
					NL,
				);
			} else if (p.nullable) {
				node.append(
					`var ${p.name} = ${_Util}.parseNull${toFirstUpper(toCamelCaseIdentifier(p.type))}s(_${p.name});`,
					NL,
				);
			} else {
				node.append(`var ${p.name} = ${_Util}.parse${toFirstUpper(toCamelCaseIdentifier(p.type))}s(_${p.name});`, NL);
			}
		} else {
			if (p.meta?.rest?.source === 'header' && p.type === 'string') {
				if (p.optional && p.nullable) {
					node.append(
						`var ${p.name} = ${_Util}.mapNil${toFirstUpper(toCamelCaseIdentifier(p.type))}s(_${p.name}, $hv -> _RestUtils.fromEscapedAscii($hv.substring(1, $hv.length() - 1)));`,
						NL,
					);
				} else if (p.optional) {
					node.append(
						`var ${p.name} = ${_Util}.mapOpt${toFirstUpper(toCamelCaseIdentifier(p.type))}s(_${p.name}, $hv -> _RestUtils.fromEscapedAscii($hv.substring(1, $hv.length() - 1)));`,
						NL,
					);
				} else if (p.nullable) {
					node.append(
						`var ${p.name} = ${_Util}.mapNull${toFirstUpper(toCamelCaseIdentifier(p.type))}s(_${p.name}, $hv -> _RestUtils.fromEscapedAscii($hv.substring(1, $hv.length() - 1)));`,
						NL,
					);
				} else {
					node.append(
						`var ${p.name} = ${_Util}.map${toFirstUpper(toCamelCaseIdentifier(p.type))}s(_${p.name}, $hv -> _RestUtils.fromEscapedAscii($hv.substring(1, $hv.length() - 1)));`,
						NL,
					);
				}
			} else {
				if (p.optional && p.nullable) {
					node.append(
						`var ${p.name} = ${_Util}.mapNil${toFirstUpper(toCamelCaseIdentifier(p.type))}s(_${p.name});`,
						NL,
					);
				} else if (p.optional) {
					node.append(
						`var ${p.name} = ${_Util}.mapOpt${toFirstUpper(toCamelCaseIdentifier(p.type))}s(_${p.name});`,
						NL,
					);
				} else if (p.nullable) {
					node.append(
						`var ${p.name} = ${_Util}.mapNull${toFirstUpper(toCamelCaseIdentifier(p.type))}s(_${p.name});`,
						NL,
					);
				} else {
					node.append(`var ${p.name} = ${_Util}.map${toFirstUpper(toCamelCaseIdentifier(p.type))}s(_${p.name});`, NL);
				}
			}
		}
	} else {
		const transformer =
			p.type === 'string' && p.meta?.rest?.source === 'header'
				? `, $hv -> ${_Util}.fromEscapedAscii($hv.substring(1, $hv.length() - 1))`
				: '';
		if (p.optional && p.nullable) {
			node.append(
				`var ${p.name} = ${_Util}.parseNil${toFirstUpper(toCamelCaseIdentifier(p.type))}(_${p.name}${transformer});`,
				NL,
			);
		} else if (p.optional) {
			node.append(
				`var ${p.name} = ${_Util}.parseOpt${toFirstUpper(toCamelCaseIdentifier(p.type))}(_${p.name}${transformer});`,
				NL,
			);
		} else if (p.nullable) {
			node.append(
				`var ${p.name} = ${_Util}.parseNull${toFirstUpper(toCamelCaseIdentifier(p.type))}(_${p.name}${transformer});`,
				NL,
			);
		} else {
			node.append(
				`var ${p.name} = ${_Util}.parse${toFirstUpper(toCamelCaseIdentifier(p.type))}(_${p.name}${transformer});`,
				NL,
			);
		}
	}
	return node;
}

function recordUnionParameter(
	p: MParameterNoneInlineEnumType,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	fqn: (type: string) => string,
	packageName: string,
	asJSON: boolean,
) {
	const type = computeParameterAPIType(
		p,
		artifactConfig.nativeTypeSubstitues,
		`${artifactConfig.rootPackageName}.service.model`,
		fqn,
		true,
	);
	const _JsonUtils = fqn(`${packageName}.model._JsonUtils`);
	const node = new CompositeGeneratorNode();
	if (p.array) {
		if (asJSON) {
			if (p.optional && p.nullable) {
				node.append(
					`var ${p.name} = ${_JsonUtils}.parseNilObjects(_${p.name}, $j -> builderFactory.of(${type}.class, $j));`,
					NL,
				);
			} else if (p.optional) {
				node.append(
					`var ${p.name} = ${_JsonUtils}.parseOptObjects(_${p.name}, $j -> builderFactory.of(${type}.class, $j));`,
					NL,
				);
			} else if (p.nullable) {
				node.append(
					`var ${p.name} = ${_JsonUtils}.parseNullObjects(_${p.name}, $j -> builderFactory.of(${type}.class, $j));`,
					NL,
				);
			} else {
				node.append(
					`var ${p.name} = ${_JsonUtils}.parseObjects(_${p.name}, $j -> builderFactory.of(${type}.class, $j));`,
					NL,
				);
			}
		} else {
			if (p.meta?.rest?.source === 'header') {
				if (p.optional && p.nullable) {
					node.append(
						`var ${p.name} = _RestUtils.mapNilObjects(_${p.name}, $o -> ${_JsonUtils}.parseObject(_RestUtils.decodeBase64($o), $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				} else if (p.optional) {
					node.append(
						`var ${p.name} = _RestUtils.mapOptObjects(_${p.name}, $o -> ${_JsonUtils}.parseObject(_RestUtils.decodeBase64($o), $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				} else if (p.nullable) {
					node.append(
						`var ${p.name} = _RestUtils.mapNullObjects(_${p.name}, $o -> ${_JsonUtils}.parseObject(_RestUtils.decodeBase64($o), $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				} else {
					node.append(
						`var ${p.name} = _RestUtils.mapObjects(_${p.name}, $o -> ${_JsonUtils}.parseObject(_RestUtils.decodeBase64($o), $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				}
			} else {
				if (p.optional && p.nullable) {
					node.append(
						`var ${p.name} = _RestUtils.mapNilObjects(_${p.name}, $o -> ${_JsonUtils}.parseObject($o, $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				} else if (p.optional) {
					node.append(
						`var ${p.name} = _RestUtils.mapOptObjects(_${p.name}, $o -> ${_JsonUtils}.parseObject($o, $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				} else if (p.nullable) {
					node.append(
						`var ${p.name} = _RestUtils.mapNullObjects(_${p.name}, $o -> ${_JsonUtils}.parseObject($o, $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				} else {
					node.append(
						`var ${p.name} = _RestUtils.mapObjects(_${p.name}, $o -> ${_JsonUtils}.parseObject($o, $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				}
			}
		}
	} else {
		if (asJSON) {
			if (p.optional && p.nullable) {
				node.append(
					`var ${p.name} = ${_JsonUtils}.parseNilObject(_${p.name}, $j -> builderFactory.of(${type}.class, $j));`,
					NL,
				);
			} else if (p.optional) {
				node.append(
					`var ${p.name} = ${_JsonUtils}.parseOptObject(_${p.name}, $j -> builderFactory.of(${type}.class, $j));`,
					NL,
				);
			} else if (p.nullable) {
				node.append(
					`var ${p.name} = ${_JsonUtils}.parseNullObject(_${p.name}, $j -> builderFactory.of(${type}.class, $j));`,
					NL,
				);
			} else {
				node.append(
					`var ${p.name} = ${_JsonUtils}.parseObject(_${p.name}, $j -> builderFactory.of(${type}.class, $j));`,
					NL,
				);
			}
		} else {
			if (p.meta?.rest?.source === 'header') {
				if (p.optional && p.nullable) {
					node.append(
						`var ${p.name} = _RestUtils.parseNilObject(_${p.name}, $o -> _JsonUtils.parseObject(_RestUtils.decodeBase64($o), $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				} else if (p.optional) {
					node.append(
						`var ${p.name} = _RestUtils.parseOptObject(_${p.name}, $o -> _JsonUtils.parseObject(_RestUtils.decodeBase64($o), $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				} else if (p.nullable) {
					node.append(
						`var ${p.name} = _RestUtils.parseNullObject(_${p.name}, $o -> _JsonUtils.parseObject(_RestUtils.decodeBase64($o), $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				} else {
					node.append(
						`var ${p.name} = _RestUtils.parseObject(_${p.name}, $o -> _JsonUtils.parseObject(_RestUtils.decodeBase64($o), $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				}
			} else {
				if (p.optional && p.nullable) {
					node.append(
						`var ${p.name} = _RestUtils.parseNilObject(_${p.name}, $o -> _JsonUtils.parseObject($o, $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				} else if (p.optional) {
					node.append(
						`var ${p.name} = _RestUtils.parseOptObject(_${p.name}, $o -> _JsonUtils.parseObject($o, $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				} else if (p.nullable) {
					node.append(
						`var ${p.name} = _RestUtils.parseNullObject(_${p.name}, $o -> _JsonUtils.parseObject($o, $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				} else {
					node.append(
						`var ${p.name} = _RestUtils.parseObject(_${p.name}, $o -> _JsonUtils.parseObject($o, $j -> builderFactory.of(${type}.class, $j)));`,
						NL,
					);
				}
			}
		}
	}
	return node;
}

function inlineEnumParameter(
	p: MParameterInlineEnumType,
	o: MOperation,
	Service: string,
	fqn: (type: string) => string,
	packageName: string,
	asJSON: boolean,
) {
	const t = `${Service}.` + toFirstUpper(o.name) + '_' + toFirstUpper(p.name) + '_Param$';
	const _Util = asJSON ? fqn(`${packageName}.model._JsonUtils`) : '_RestUtils';
	const node = new CompositeGeneratorNode();
	if (p.array) {
		if (asJSON) {
			if (p.optional && p.nullable) {
				node.append(`var ${p.name} = ${_Util}.parseNilLiterals(_${p.name}, ${t}::valueOf);`, NL);
			} else if (p.optional) {
				node.append(`var ${p.name} = ${_Util}.parseOptLiterals(_${p.name}, ${t}::valueOf);`, NL);
			} else if (p.nullable) {
				node.append(`var ${p.name} = ${_Util}.parseNullLiterals(_${p.name}, ${t}::valueOf);`, NL);
			} else {
				node.append(`var ${p.name} = ${_Util}.parseLiterals(_${p.name}, ${t}::valueOf);`, NL);
			}
		} else {
			if (p.optional && p.nullable) {
				node.append(`var ${p.name} = ${_Util}.mapNilLiterals(_${p.name}, ${t}::valueOf);`, NL);
			} else if (p.optional) {
				node.append(`var ${p.name} = ${_Util}.mapOptLiterals(_${p.name}, ${t}::valueOf);`, NL);
			} else if (p.nullable) {
				node.append(`var ${p.name} = ${_Util}.mapNullLiterals(_${p.name}, ${t}::valueOf);`, NL);
			} else {
				node.append(`var ${p.name} = ${_Util}.mapLiterals(_${p.name}, ${t}::valueOf);`, NL);
			}
		}
	} else {
		if (p.optional && p.nullable) {
			node.append(`var ${p.name} = ${_Util}.parseNilLiteral(_${p.name}, ${t}::valueOf);`, NL);
		} else if (p.optional) {
			node.append(`var ${p.name} = ${_Util}.parseOptLiteral(_${p.name}, ${t}::valueOf);`, NL);
		} else if (p.nullable) {
			node.append(`var ${p.name} = ${_Util}.parseNullLiteral(_${p.name}, ${t}::valueOf);`, NL);
		} else {
			node.append(`var ${p.name} = ${_Util}.parseLiteral(_${p.name}, ${t}::valueOf);`, NL);
		}
	}
	return node;
}

function scalarParameter(
	p: MParameterNoneInlineEnumType,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	fqn: (type: string) => string,
	packageName: string,
	asJSON: boolean,
) {
	const type = p.type;
	const t = resolveType(type, artifactConfig.nativeTypeSubstitues, fqn, false);
	const _Util = asJSON ? fqn(`${packageName}.model._JsonUtils`) : '_RestUtils';
	const node = new CompositeGeneratorNode();
	if (p.array) {
		if (asJSON) {
			if (p.optional && p.nullable) {
				node.append(`var ${p.name} = ${_Util}.parseNilLiterals(_${p.name}, ${t}::of);`, NL);
			} else if (p.optional) {
				node.append(`var ${p.name} = ${_Util}.parseOptLiterals(_${p.name}, ${t}::of);`, NL);
			} else if (p.nullable) {
				node.append(`var ${p.name} = ${_Util}.parseNullLiterals(_${p.name}, ${t}::of);`, NL);
			} else {
				node.append(`var ${p.name} = ${_Util}.parseLiterals(_${p.name}, ${t}::of);`, NL);
			}
		} else {
			const transformerPre = p.meta?.rest?.source === 'header' ? `${_Util}.preprocessEscapedAscii(` : '';
			const transformerPost = p.meta?.rest?.source === 'header' ? `)` : '';

			if (p.optional && p.nullable) {
				node.append(
					`var ${p.name} = ${_Util}.mapNilLiterals(_${p.name}, ${transformerPre}${t}::of${transformerPost});`,
					NL,
				);
			} else if (p.optional) {
				node.append(
					`var ${p.name} = ${_Util}.mapOptLiterals(_${p.name}, ${transformerPre}${t}::of${transformerPost});`,
					NL,
				);
			} else if (p.nullable) {
				node.append(
					`var ${p.name} = ${_Util}.mapNullLiterals(_${p.name}, ${transformerPre}${t}::of${transformerPost});`,
					NL,
				);
			} else {
				node.append(
					`var ${p.name} = ${_Util}.mapLiterals(_${p.name}, ${transformerPre}${t}::of${transformerPost});`,
					NL,
				);
			}
		}
	} else {
		const transformerPre = p.meta?.rest?.source === 'header' ? `${_Util}.preprocessEscapedAscii(` : '';
		const transformerPost = p.meta?.rest?.source === 'header' ? `)` : '';
		if (p.optional && p.nullable) {
			node.append(
				`var ${p.name} = ${_Util}.parseNilLiteral(_${p.name}, ${transformerPre}${t}::of${transformerPost});`,
				NL,
			);
		} else if (p.optional) {
			node.append(
				`var ${p.name} = ${_Util}.parseOptLiteral(_${p.name}, ${transformerPre}${t}::of${transformerPost});`,
				NL,
			);
		} else if (p.nullable) {
			node.append(
				`var ${p.name} = ${_Util}.parseNullLiteral(_${p.name}, ${transformerPre}${t}::of${transformerPost});`,
				NL,
			);
		} else {
			node.append(
				`var ${p.name} = ${_Util}.parseLiteral(_${p.name}, ${transformerPre}${t}::of${transformerPost});`,
				NL,
			);
		}
	}
	return node;
}

function okResultContent(o: MOperation, serviceParams: string[]) {
	const node = new CompositeGeneratorNode();

	if (o.resultType) {
		if (serviceParams.length === 0) {
			node.append(`var result = service.${o.name}(builderFactory);`, NL);
		} else {
			node.append(`var result = service.${o.name}(builderFactory, ${serviceParams.join(', ')});`, NL);
		}
	} else {
		if (serviceParams.length === 0) {
			node.append(`service.${o.name}(builderFactory);`, NL);
		} else {
			node.append(`service.${o.name}(builderFactory, ${serviceParams.join(', ')});`, NL);
		}
	}
	if (o.resultType) {
		if (serviceParams.length === 0) {
			node.append(`return responseBuilder.${o.name}(result).build();`, NL);
		} else {
			node.append(`return responseBuilder.${o.name}(result, ${serviceParams.join(', ')}).build();`, NL);
		}
	} else {
		node.append(`return responseBuilder.${o.name}(${serviceParams.join(', ')}).build();`, NL);
	}
	return node;
}

function toParameter(
	p: MParameter,
	form: boolean,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	fqn: (type: string) => string,
	multiForm: boolean,
): string {
	const annotation = computeParameterAnnotation(p, form, fqn);
	const type = computeParameterType(p, artifactConfig, fqn, multiForm);

	return `${annotation}${type} _${p.name}`;
}

function computeParameterType(
	p: MParameter,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	fqn: (type: string) => string,
	multiForm: boolean,
): string {
	if (p.variant === 'stream') {
		const t = fqn('org.jboss.resteasy.reactive.multipart.FileUpload');
		if (p.array) {
			const List = fqn('java.util.List');
			return `${List}<${t}>`;
		}
		return t;
	}
	if (p.array) {
		if (p.meta?.rest?.source === 'header' || (!multiForm && p.meta?.rest?.source === undefined)) {
			return 'String';
		} else {
			return fqn('java.util.List') + '<String>';
		}
	}
	return 'String';
}

function computeParameterAnnotation(p: MParameter, form: boolean, fqn: (type: string) => string): string {
	if (p.meta?.rest?.source === 'path') {
		return `@${fqn('jakarta.ws.rs.PathParam')}("${p.meta.rest.name}") `;
	} else if (p.meta?.rest?.source === 'header') {
		return `@${fqn('jakarta.ws.rs.HeaderParam')}("${p.meta.rest.name}") `;
	} else if (p.meta?.rest?.source === 'cookie') {
		return `@${fqn('jakarta.ws.rs.CookieParam')}("${p.meta.rest.name}") `;
	} else if (p.meta?.rest?.source === 'query') {
		return `@${fqn('jakarta.ws.rs.QueryParam')}("${p.meta.rest.name}") `;
	} else if (form) {
		return `@${fqn('org.jboss.resteasy.reactive.RestForm')}("${p.name}") `;
	}
	return '';
}

function generateServiceData(
	s: MResolvedService,
	o: MResolvedOperation,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.rest.model`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	const JsonObject = fqn('jakarta.json.JsonObject');

	const node = new CompositeGeneratorNode();
	node.append(`public class ${s.name}${toFirstUpper(o.name)}DataImpl extends _BaseDataImpl {`, NL);
	node.indent(classBody => {
		classBody.append(`public ${s.name}${toFirstUpper(o.name)}DataImpl(${JsonObject} data) {`, NL);
		classBody.indent(methodBody => {
			methodBody.append('super(data);', NL);
		});
		classBody.append('}', NL, NL);
		o.parameters
			.filter(p => p.meta?.rest?.source === undefined)
			.forEach(p => {
				const type =
					p.variant === 'inline-enum'
						? computeParameterAPITypeNG(
								p,
								artifactConfig.nativeTypeSubstitues,
								`${artifactConfig.rootPackageName}.service.model`,
								fqn,
								o.name,
							)
						: computeParameterAPITypeNG(
								p,
								artifactConfig.nativeTypeSubstitues,
								`${artifactConfig.rootPackageName}.service.model`,
								fqn,
							);
				classBody.append(`public ${type} ${p.name}() {`, NL);
				classBody.indent(methodBody => {
					methodBody.append(
						generateParameterContent(
							p,
							artifactConfig.nativeTypeSubstitues,
							`${artifactConfig.rootPackageName}.service.model`,
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
