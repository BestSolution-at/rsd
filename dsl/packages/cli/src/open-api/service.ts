import { isMBuiltinType, MParameter, MResolvedService } from '../model.js';
import { generateBuilinProperty } from './record.js';

export function generateService(s: MResolvedService): Record<string, unknown> {
	const rv: Record<string, Record<string, unknown>> = {};
	const prefix = (s.meta?.rest?.path ?? '').replaceAll('$', '') + '/';
	s.operations.forEach(o => {
		if (o.meta?.rest?.path !== undefined) {
			const subPath = o.meta.rest.path.replaceAll('$', '');
			let p = prefix + subPath;
			if (p.endsWith('/')) {
				p = p.substring(0, p.length - 1);
			}
			rv[p] ??= {};

			const responses: Record<string, unknown> = {};
			const handleResultType = (s: number) => {
				if (o.resultType) {
					let schema: Record<string, unknown> = {};
					if (
						o.resultType.variant === 'record' ||
						o.resultType.variant === 'union' ||
						o.resultType.variant === 'enum'
					) {
						if (o.resultType.array) {
							schema = {
								type: 'array',
								items: {
									$ref: `#/components/schemas/${o.resultType.type}`,
								},
							};
						} else {
							schema['$ref'] = `#/components/schemas/${o.resultType.type}`;
						}
					} else if (o.resultType.variant === 'inline-enum') {
					} else if (o.resultType.variant === 'scalar') {
						schema.type = 'string';
					} else if (isMBuiltinType(o.resultType.type)) {
						if (o.resultType.array) {
							schema = {
								type: 'array',
								items: generateBuilinProperty(o.resultType.type),
							};
						} else {
							schema = generateBuilinProperty(o.resultType.type);
						}
					}
					responses[s] = {
						description: o.resultType.doc,
						content: {
							'application/json': {
								schema,
							},
						},
					};
				} else {
					responses['204'] = {
						description: 'success',
					};
				}
			};

			if (o.meta.rest.results.length === 0) {
				handleResultType(200);
			}

			o.meta.rest.results.forEach(r => {
				if (r.error) {
					responses[r.statusCode] = {
						description: '',
						content: {
							'application/json': {
								schema: {
									type: 'string',
								},
							},
						},
					};
				} else {
					handleResultType(r.statusCode);
				}
			});

			let requestBody;
			const bodyParams = o.parameters.filter(p => p.meta?.rest?.source === undefined);

			if (bodyParams.length === 1) {
				requestBody = {
					content: {
						'application/json': {
							schema: toType(bodyParams[0]),
						},
					},
				};
			} else if (bodyParams.length > 1) {
				const properties: Record<string, unknown> = {};
				bodyParams.forEach(p => {
					properties[p.name] = toType(p);
				});
				requestBody = {
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties,
							},
						},
					},
				};
			}

			const parameters = o.parameters
				.filter(p => p.meta?.rest?.source !== undefined)
				.map(p => {
					return {
						name: p.meta?.rest?.name ?? p.name,
						description: p.doc,
						in: p.meta?.rest?.source,
						required: !p.optional,
						schema: toType(p),
					};
				});

			/*
"parameters": [
					{
						"name": "key",
						"in": "path",
						"required": true,
						"schema": {
							"type": "string"
						}
					}
				],
      */

			rv[p][o.meta.rest.method.toLowerCase()] = {
				tags: [s.name],
				description: o.doc,
				parameters,
				requestBody,
				responses,
			};
		}
	});
	return rv;
}

function toType(param: MParameter) {
	let schema: Record<string, unknown> = {};
	if (param.variant === 'record' || param.variant === 'union' || param.variant === 'enum') {
		const type = param.patch ? `${param.type}Patch` : param.type;
		if (param.array) {
			schema = {
				type: 'array',
				items: {
					$ref: `#/components/schemas/${type}`,
				},
			};
		} else {
			schema['$ref'] = `#/components/schemas/${type}`;
		}
	} else if (param.variant === 'inline-enum') {
	} else if (param.variant === 'scalar') {
		schema.type = 'string';
	} else if (isMBuiltinType(param.type)) {
		if (param.array) {
			schema = {
				type: 'array',
				items: generateBuilinProperty(param.type),
			};
		} else {
			schema = generateBuilinProperty(param.type);
		}
	}
	return schema;
}
