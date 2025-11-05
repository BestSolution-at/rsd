import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import {
	isMBuiltinType,
	isMInlineEnumType,
	MBuiltinType,
	MParameter,
	MResolvedOperation,
	MResolvedService,
	MService,
} from '../model.js';
import {
	builtinToJSType,
	generateCompilationUnit,
	TypescriptFetchClientGeneratorConfig,
	TypescriptImportCollector,
} from '../typescript-gen-utils.js';
import { toFirstUpper } from '../util.js';

export function generateService(s: MResolvedService, config: TypescriptFetchClientGeneratorConfig) {
	const collector = new TypescriptImportCollector(config);
	const fqn = collector.importType.bind(collector);
	return {
		name: `${s.name}ServiceFetchImpl.ts`,
		content: toString(generateCompilationUnit(collector, generateServiceContent(s, config, fqn)), '\t'),
		path: `${config.targetFolder}/services`,
	};
}

function generateServiceContent(
	s: MResolvedService,
	config: TypescriptFetchClientGeneratorConfig,
	fqn: (t: string, typeOnly: boolean) => string,
) {
	const node = new CompositeGeneratorNode();
	const ServiceProps = fqn('ServiceProps:./_fetch-type-utils.ts', true);
	const ErrorType = `${fqn(`api:${config.apiNamespacePath}`, false)}.service.ErrorType`;
	const Service = `${fqn(`api:${config.apiNamespacePath}`, false)}.service.${s.name}Service`;
	node.append(`export function create${s.name}Service(props: ${ServiceProps}<${ErrorType}>): ${Service} {`, NL);
	node.indent(mBody => {
		mBody.append('return {', NL);
		mBody.indent(structBody => {
			s.operations.forEach(o => {
				structBody.append(`${o.name}: fn${toFirstUpper(o.name)}(props),`, NL);
			});
		});

		mBody.append('};', NL);
	});
	node.append('}', NL);
	s.operations
		.filter(o => o.meta?.rest !== undefined)
		.forEach(o => {
			node.append(
				`function fn${toFirstUpper(o.name)}(props: ${ServiceProps}<${ErrorType}>): ${Service}['${o.name}'] {`,
				NL,
			);
			node.indent(fnBody => {
				fnBody.append('const { baseUrl, fetchAPI = fetch, lifecycleHandlers = {} } = props;', NL);
				if (o.meta?.rest?.results.find(e => e.error !== undefined)) {
					fnBody.append('const { preFetch, onSuccess, onError, onCatch, final } = lifecycleHandlers;', NL);
				} else {
					fnBody.append('const { preFetch, onSuccess, onCatch, final } = lifecycleHandlers;', NL);
				}

				fnBody.append(`return async (${o.parameters.map(p => toParameter(p, config, fqn)).join(', ')}) => {`, NL);
				fnBody.indent(code => {
					code.append('try {', NL);
					code.indent(invoke => {
						invoke.append(generateRemoteInvoke(s, o, config, fqn), NL);
					});
					code.append('} catch (e) {', NL);
					code.indent(catchBlock => {
						catchBlock.append(`onCatch?.('${o.name}', e);`, NL);
						catchBlock.append(`const ee = e instanceof Error ? e : new Error('', { cause: e });`, NL);
						catchBlock.append(`const err = { _type: '_Native', message: ee.message, error: ee } as const;`, NL);
						catchBlock.append('return api.result.ERR(err);', NL);
					});
					code.append('} finally {', NL);
					code.indent(finallyBlock => {
						finallyBlock.append(`final?.('${o.name}');`, NL);
					});
					code.append('}', NL);
				});
				fnBody.append('};', NL);
			});
			node.append('}', NL, NL);
		});
	return node;
}

function generateRemoteInvoke(
	s: MService,
	o: MResolvedOperation,
	config: TypescriptFetchClientGeneratorConfig,
	fqn: (type: string, typeOnly: boolean) => string,
) {
	if (s.meta?.rest === undefined) {
		throw new Error(`No rest meta data available for service ${s.name}`);
	}
	if (o.meta?.rest === undefined) {
		throw new Error(`No rest meta data available for operation ${s.name}.${o.name}`);
	}
	const path = s.meta.rest.path;
	const processedPath = `${path.replace(/^\//, '')}/${o.meta.rest.path}`;
	const endpoint = processedPath ? `\${baseUrl}/${processedPath}` : '${baseUrl}';
	const hasQueryParams = o.parameters.find(p => p.meta?.rest?.source === 'query');

	const node = new CompositeGeneratorNode();
	node.append(`const $init = (await preFetch?.('${o.name}')) ?? {};`, NL);

	const headerParams = o.parameters.filter(p => p.meta?.rest?.source === 'header');

	node.append(`const $headers = new Headers($init.headers ?? {});`, NL);
	node.append(`$headers.append('Content-Type', 'application/json');`, NL);
	if (headerParams.length) {
		headerParams.forEach(p => {
			if (p.variant === 'builtin' || p.variant === 'enum' || p.variant === 'inline-enum' || p.variant === 'scalar') {
				if (p.optional) {
					const ifDefined = fqn('ifDefined:./_fetch-type-utils.ts', false);
					node.append(`${ifDefined}(${p.name}, v => $headers.append('${p.name}', \`\${v}\`));`, NL);
				} else {
					node.append(`$headers.append('${p.name}',\`\${${p.name}}\`);`, NL);
				}
			} else {
				const toJSON = `${fqn(`api:${config.apiNamespacePath}`, false)}.model.${p.type}ToJSON`;

				if (p.optional) {
					const ifDefined = fqn('ifDefined:./_fetch-type-utils.ts', false);
					node.append(`${ifDefined}(${p.name}, v => $headers.append('${p.name}',JSON.strinify(${toJSON}(v)));`, NL);
				} else {
					node.append(`$headers.append('${p.name}',JSON.strinify(${toJSON}(${p.name})));`, NL);
				}
			}
		});
	}
	node.append('$init.headers = $headers;', NL, NL);

	if (hasQueryParams) {
		node.append('const $param = new URLSearchParams();', NL);
		o.parameters
			.filter(p => p.meta?.rest?.source === 'query')
			.forEach(p => {
				if (isMBuiltinType(p.type) || p.variant === 'scalar' || p.variant === 'enum' || isMInlineEnumType(p.type)) {
					if (p.optional) {
						const ifDefined = fqn('ifDefined:./_fetch-type-utils', false);
						node.append(
							`${ifDefined}($param.append(${p.name}, v => '${p.meta?.rest?.name ?? p.name}', \`\${v}\`));`,
							NL,
						);
					} else {
						node.append(`$param.append('${p.meta?.rest?.name ?? p.name}', \`\${${p.name}}\`);`, NL);
					}
				} else {
					const toJSON = `${fqn(`api:${config.apiNamespacePath}`, false)}.model.${p.type}ToJSON`;
					if (p.optional) {
						const ifDefined = fqn('ifDefined:./_fetch-type-utils', false);
						node.append(
							`${ifDefined}(${p.name}, v => $param.append('${
								p.meta?.rest?.name ?? p.name
							}', JSON.stringfy(${toJSON}(v))))`,
						);
					} else {
						node.append(`$param.append('${p.meta?.rest?.name ?? p.name}', JSON.stringfy(${toJSON}(${p.name})))`);
					}
				}
			});
		node.append(`const $path = \`${endpoint}?\${$param.toString()}\`;`, NL);
	} else {
		node.append(`const $path = \`${endpoint}\`;`, NL);
	}

	const bodyParams = o.parameters.filter(p => p.meta?.rest?.source === undefined);

	if (bodyParams.length === 0) {
		node.append(`const $response = await fetchAPI($path, { ...$init, method: '${o.meta?.rest?.method}' });`, NL, NL);
	} else {
		if (bodyParams.length === 1) {
			if (bodyParams[0].variant === 'record' || bodyParams[0].variant === 'union') {
				const toJSON = `${fqn(`api:${config.apiNamespacePath}`, false)}.model.${
					bodyParams[0].type + (bodyParams[0].patch ? 'Patch' : '')
				}ToJSON`;
				node.append(`const $body = JSON.stringify(${toJSON}(${bodyParams[0].name}));`, NL);
			} else {
				node.append(`const $body = \`\${${bodyParams[0].name}}\`;`, NL);
			}
		} else {
			node.append(`const $body = JSON.stringify({`, NL);
			node.indent(struct => {
				bodyParams.forEach(p => {
					if (p.variant === 'record' || p.variant === 'union') {
						const toJSON = `${fqn(
							`api:${config.apiNamespacePath}`,
							false,
						)}.model.${p.type + (p.patch ? 'Patch' : '')}ToJSON`;
						struct.append(`${p.name}: ${toJSON}(${p.name}),`, NL);
					} else {
						struct.append(`${p.name}: \`\${${p.name}}\`,`, NL);
					}
				});
			});
			node.append('});', NL);
		}

		node.append(
			`const $response = await fetchAPI($path, { ...$init, method: '${o.meta.rest.method}', body: $body });`,
			NL,
		);
	}

	if (o.meta.rest.results.length) {
		o.meta.rest.results.forEach((r, idx) => {
			if (idx !== 0) {
				node.append(' else ');
			}
			node.append(`if ($response.status === ${r.statusCode.toFixed()}) {`, NL);
			if (r.error === undefined) {
				node.indent(block => {
					block.append(handleOkResult(o, config, fqn));
				});
			} else {
				const err = r.error;
				node.indent(block => {
					block.append(handleErrorResult(o, err, config, fqn));
				});
			}
			node.append('}');
		});
	} else {
		const code = o.resultType ? '200' : '204';
		node.append(`if ($response.status == ${code}) {`, NL);
		node.indent(block => {
			block.append(handleOkResult(o, config, fqn));
		});
		node.append('}');
	}

	node.append(
		NL,
		`const err = { _type: '_Status', message: $response.statusText, status: $response.status } as const;`,
		NL,
	);
	node.append('return api.result.ERR(err);');

	return node;
}

function handleErrorResult(
	o: MResolvedOperation,
	error: string,
	config: TypescriptFetchClientGeneratorConfig,
	fqn: (type: string, typeOnly: boolean) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append(`const err = {`, NL);
	node.indent(struct => {
		struct.append(`_type: '${error}',`, NL);
		struct.append('message: await $response.text(),', NL);
	});
	node.append('} as const;', NL);
	const ERR = `${fqn(`api:${config.apiNamespacePath}`, false)}.result.ERR`;
	const safeExecute = fqn('safeExecute:./_fetch-type-utils.ts', false);
	node.append(`return ${safeExecute}(${ERR}(err), () => onError?.('${o.name}', err));`, NL);
	return node;
}

function handleOkResult(
	o: MResolvedOperation,
	config: TypescriptFetchClientGeneratorConfig,
	fqn: (type: string, typeOnly: boolean) => string,
) {
	const node = new CompositeGeneratorNode();

	const OK = `${fqn(`api:${config.apiNamespacePath}`, false)}.result.OK`;
	if (o.resultType === undefined) {
		const Void = `${fqn(`api:${config.apiNamespacePath}`, false)}.result.Void`;
		const safeExecute = fqn('safeExecute:./_fetch-type-utils.ts', false);
		node.append(`return ${safeExecute}(${OK}(${Void}), () => onSuccess?.('${o.name}', ${Void}));`, NL);
	} else {
		node.append('const $data = await $response.json();', NL);
		if (
			isMBuiltinType(o.resultType.type) ||
			o.resultType.variant === 'scalar' ||
			o.resultType.variant === 'enum' ||
			isMInlineEnumType(o.resultType.type)
		) {
			const safeExecute = fqn('safeExecute:./_fetch-type-utils.ts', false);
			if (o.resultType.array) {
				// TODO
			} else {
				if (isMBuiltinType(o.resultType.type)) {
					const guard = builtinTypeGuard(o.resultType.type, config, fqn);
					node.append(`if(!${guard}($data)) {`, NL);
					node.indent(block => {
						block.append(`throw new Error('Invalid result');`, NL);
					});
					node.append('}', NL);
				} else if (o.resultType.variant === 'scalar') {
					const guard = fqn(`api:${config.apiNamespacePath}`, false) + `.utils.isString`;
					node.append(`if(!${guard}($data)) {`, NL);
					node.indent(block => {
						block.append(`throw new Error('Invalid result');`, NL);
					});
					node.append('}', NL);
				} else {
					const guard = fqn(`api:${config.apiNamespacePath}`, false) + `.model.is${o.resultType.type}`;
					node.append(`if(!${guard}($data)) {`, NL);
					node.indent(block => {
						block.append(`throw new Error('Invalid result');`, NL);
					});
					node.append('}', NL);
				}
			}
			node.append(`return ${safeExecute}(${OK}($data), () => onSuccess?.('${o.name}', $data));`, NL);
		} else {
			const fromJSON = `${fqn(`api:${config.apiNamespacePath}`, false)}.model.${o.resultType.type}FromJSON`;
			if (o.resultType.array) {
				const isArray = `${fqn(`api:${config.apiNamespacePath}`, false)}.utils.isArray`;
				node.append(`if (!${isArray}) {`, NL);
				node.indent(block => {
					block.append(`throw new Error('Invalid result');`, NL);
				});
				node.append('}', NL);
				node.append(`const $result = $data.map(${fromJSON});`, NL);
			} else {
				const guard = fqn(`api:${config.apiNamespacePath}`, false) + `.utils.isRecord`;
				node.append(`if(!${guard}($data)) {`, NL);
				node.indent(block => {
					block.append(`throw new Error('Invalid result');`, NL);
				});
				node.append('}', NL);
				node.append(`const $result = ${fromJSON}($data);`, NL);
			}
			const safeExecute = fqn('safeExecute:./_fetch-type-utils.ts', false);
			node.append(`return ${safeExecute}(${OK}($result), () => onSuccess?.('${o.name}', $result));`, NL);
		}
	}
	return node;
}

function toParameter(
	parameter: MParameter,
	config: TypescriptFetchClientGeneratorConfig,
	fqn: (type: string, typeOnly: boolean) => string,
) {
	let type: string;
	if (isMBuiltinType(parameter.type)) {
		type = builtinToJSType(parameter.type);
	} else if (parameter.variant === 'scalar') {
		type = 'string';
	} else if (isMInlineEnumType(parameter.type)) {
		type = parameter.type.entries.map(e => `'${e.name}'`).join(' | ');
	} else if (parameter.variant === 'enum') {
		type = `${fqn(`api:${config.apiNamespacePath}`, false)}.model.${parameter.type}`;
	} else if (parameter.variant === 'record' || parameter.variant === 'union') {
		if (parameter.patch) {
			type = `${fqn(`api:${config.apiNamespacePath}`, false)}.model.${parameter.type}Patch`;
		} else {
			type = `${fqn(`api:${config.apiNamespacePath}`, false)}.model.${parameter.type}`;
		}
	} else {
		type = 'any';
	}
	const optional = parameter.optional ? '?' : '';
	const nullable = parameter.nullable ? ' | null' : '';
	if (parameter.array) {
		type = `${type}[]`;
	}

	return `${parameter.name}${optional}: ${type}${nullable}`;
}

function builtinTypeGuard(
	type: MBuiltinType,
	config: TypescriptFetchClientGeneratorConfig,
	fqn: (v: string, typeOnly: boolean) => string,
) {
	if (type === 'boolean') {
		return fqn(`api:${config.apiNamespacePath}`, false) + `.utils.isBoolean`;
	} else if (type === 'double' || type === 'float' || type === 'int' || type === 'long' || type === 'short') {
		return fqn(`api:${config.apiNamespacePath}`, false) + `.utils.isNumber`;
	} else {
		return fqn(`api:${config.apiNamespacePath}`, false) + `.utils.isString`;
	}
}
