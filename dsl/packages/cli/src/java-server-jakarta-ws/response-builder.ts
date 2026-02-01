import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	computeParameterAPIType,
	generateCompilationUnit,
	JavaImportsCollector,
	JavaServerJakartaWSGeneratorConfig,
	resolveType,
	toPath,
} from '../java-gen-utils.js';
import { isMBuiltinType, MParameter, MResolvedRSDModel, MResolvedService, MReturnType } from '../model.js';
import { toFirstUpper } from '../util.js';

export function generateResponseBuilder(
	s: MResolvedService,
	model: MResolvedRSDModel,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.rest`;
	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	return {
		name: `${s.name}ResourceResponseBuilder.java`,
		content: toString(
			generateCompilationUnit(
				packageName,
				importCollector,
				generateContent(s, model, artifactConfig, `${artifactConfig.rootPackageName}.service.model`, fqn),
			),
			'\t',
		),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}

function generateContent(
	s: MResolvedService,
	model: MResolvedRSDModel,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const Singleton = fqn('jakarta.inject.Singleton');
	const Response = fqn('jakarta.ws.rs.core.Response');
	const ResponseBuilder = fqn('jakarta.ws.rs.core.Response.ResponseBuilder');
	const node = new CompositeGeneratorNode();

	node.append(`@${Singleton}`, NL);
	node.append(`public class ${s.name}ResourceResponseBuilder {`, NL);
	node.indent(classBody => {
		s.operations.forEach(o => {
			const params = o.parameters.map(p => toParameter(p, artifactConfig, fqn, o.name, s.name));
			if (artifactConfig.scopeValues) {
				params.unshift(...artifactConfig.scopeValues.map(v => `${fqn(v.type)} $${v.name}`));
			}

			if (o.resultType !== undefined) {
				params.unshift(`${toResultType(o.resultType, artifactConfig, fqn, o.name, s.name)} $result`);
			}
			classBody.append(`public ${ResponseBuilder} ${o.name}(${params.join(', ')}) {`, NL);
			classBody.indent(methodBody => {
				const code = o.meta?.rest?.results.find(r => r.error === undefined)?.statusCode ?? (o.resultType ? 200 : 204);
				if (o.resultType) {
					if (o.resultType.variant === 'stream') {
						if (o.resultType.type === 'file') {
							methodBody.append(`return _RestUtils.toStreamResponse(${code.toFixed()}, $result);`, NL);
						} else {
							methodBody.append(`return _RestUtils.toStreamResponse(${code.toFixed()}, $result);`, NL);
						}
					} else if (o.resultType.variant === 'record' || o.resultType.variant === 'union') {
						const JsonUtils = fqn(`${artifactConfig.rootPackageName}.rest.model._JsonUtils`);
						methodBody.append(
							`return ${Response}.status(${code.toFixed()}).entity(${JsonUtils}.toJsonString($result, false));`,
							NL,
						);
					} else {
						if (!o.resultType.array && isMBuiltinType(o.resultType.type) && o.resultType.type === 'string') {
							const JsonUtils = fqn(`${artifactConfig.rootPackageName}.rest.model._JsonUtils`);
							methodBody.append(
								`return ${Response}.status(${code.toFixed()}).entity(${JsonUtils}.encodeAsJsonString($result));`,
								NL,
							);
						} else {
							methodBody.append(`return ${Response}.status(${code.toFixed()}).entity($result);`, NL);
						}
					}
				} else {
					methodBody.append(`return ${Response}.status(${code.toFixed()});`, NL);
				}
			});
			classBody.append('}', NL, NL);
		});
	});
	node.append('}', NL);
	return node;
}

function toParameter(
	parameter: MParameter,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	fqn: (type: string) => string,
	methodName: string,
	serviceName: string,
) {
	if (parameter.variant === 'inline-enum') {
		const Service = fqn(`${artifactConfig.rootPackageName}.service.${serviceName}Service`);
		let t = `${Service}.${toFirstUpper(methodName)}_${toFirstUpper(parameter.name)}_Param$`;
		if (parameter.array) {
			const List = fqn('java.util.List');
			t = `${List}<${t}>`;
		}

		if (parameter.optional && parameter.nullable) {
			t = fqn(`${artifactConfig.rootPackageName}.service.model._Base`) + `.Nillable<${t}>`;
		} else if (parameter.optional || parameter.nullable) {
			t = fqn('java.util.Optional') + `<${t}>`;
		}

		return `${t} ${parameter.name}`;
	}

	let type = computeParameterAPIType(
		parameter,
		artifactConfig.nativeTypeSubstitues,
		`${artifactConfig.rootPackageName}.service.model`,
		fqn,
		false,
		methodName,
	);

	if (parameter.optional && parameter.nullable) {
		type = fqn(`${artifactConfig.rootPackageName}.service.model._Base`) + `.Nillable<${type}>`;
	} else if (parameter.optional || parameter.nullable) {
		if (!parameter.array && parameter.type === 'int') {
			type = fqn('java.util.OptionalInt');
		} else if (!parameter.array && parameter.type === 'long') {
			type = fqn('java.util.OptionalLong');
		} else if (!parameter.array && parameter.type === 'double') {
			type = fqn('java.util.OptionalDouble');
		} else {
			type = fqn('java.util.Optional') + `<${type}>`;
		}
	}

	return `${type} ${parameter.name}`;
}

function toResultType(
	type: MReturnType | undefined,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	fqn: (type: string) => string,
	methodName: string,
	serviceName: string,
) {
	const dtoPkg = `${artifactConfig.rootPackageName}.service.model`;
	if (type === undefined) {
		return 'void';
	}

	let rvType: string;
	if (type.variant === 'stream') {
		if (type.type === 'file') {
			rvType = fqn(`${dtoPkg}.RSDFile`);
		} else {
			rvType = fqn(`${dtoPkg}.RSDBlob`);
		}
	} else if (type.variant === 'union' || type.variant === 'record') {
		rvType = fqn(`${dtoPkg}.${type.type}`) + '.Data';
	} else if (type.variant === 'enum') {
		rvType = fqn(`${dtoPkg}.${type.type}`);
	} else if (typeof type.type === 'string') {
		rvType = resolveType(type.type, artifactConfig.nativeTypeSubstitues, fqn, type.array);
	} else {
		const Service = fqn(`${artifactConfig.rootPackageName}.service.${serviceName}Service`);
		rvType = Service + '.' + toFirstUpper(methodName) + '_Result$';
	}

	if (type.array) {
		rvType = `${fqn('java.util.List')}<${rvType}>`;
	}

	return rvType;
}
