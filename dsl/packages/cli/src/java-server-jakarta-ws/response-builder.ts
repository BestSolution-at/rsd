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
import { MParameter, MResolvedRSDModel, MResolvedService, MReturnType } from '../model.js';
import { toFirstUpper, toNodeTree } from '../util.js';

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
				generateContent(s, model, artifactConfig, `${artifactConfig.rootPackageName}.model`, fqn),
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
				params.unshift('String $contentType');
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
					} else if (o.resultType.variant === 'scalar' || o.resultType.variant === 'enum') {
						const JsonUtils = fqn(`${artifactConfig.rootPackageName}.model.impl.json._JsonUtils`);
						const _Support =
							o.resultType.variant === 'scalar'
								? fqn(`${artifactConfig.rootPackageName}.model.impl.json._ScalarSupport`)
								: fqn(`${artifactConfig.rootPackageName}.model.impl.json._EnumSupport`);
						if (o.resultType.array) {
							const content = toNodeTree(`
							return ${Response}.status(${code.toFixed()})
								.type($contentType)
								.entity(_RestUtils.toStreamOutput(stream -> ${JsonUtils}.encodeValue(stream, $result.stream().map(${_Support}::${o.resultType.type}ToJson).toList(), $contentType, /* FIXME */ null)));`);
							methodBody.append(content);
						} else {
							const content = toNodeTree(`
							return ${Response}.status(${code.toFixed()})
								.type($contentType)
								.entity(_RestUtils.toStreamOutput(stream -> ${JsonUtils}.encodeValue(stream, ${_Support}.${o.resultType.type}ToJson($result), $contentType, /* FIXME */ null)));`);
							methodBody.append(content);
						}
					} else {
						const JsonUtils = fqn(`${artifactConfig.rootPackageName}.model.impl.json._JsonUtils`);
						const content = toNodeTree(`
							return ${Response}.status(${code.toFixed()})
								.type($contentType)
								.entity(_RestUtils.toStreamOutput(stream -> ${JsonUtils}.encodeValue(stream, $result, $contentType, /* FIXME */ null)));`);
						methodBody.append(content);
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
			t = fqn(`${artifactConfig.rootPackageName}.model._Base`) + `.Nillable<${t}>`;
		} else if (parameter.optional || parameter.nullable) {
			t = fqn('java.util.Optional') + `<${t}>`;
		}

		return `${t} ${parameter.name}`;
	}

	let type = computeParameterAPIType(
		parameter,
		artifactConfig.nativeTypeSubstitutes,
		`${artifactConfig.rootPackageName}.model`,
		fqn,
		false,
		methodName,
	);

	if (parameter.optional && parameter.nullable) {
		type = fqn(`${artifactConfig.rootPackageName}.model._Base`) + `.Nillable<${type}>`;
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
	const dtoPkg = `${artifactConfig.rootPackageName}.model`;
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
		if (artifactConfig.nativeTypeSubstitutes !== undefined && type.type in artifactConfig.nativeTypeSubstitutes) {
			rvType = fqn(artifactConfig.nativeTypeSubstitutes[type.type].type);
		} else {
			rvType = fqn(`${dtoPkg}.${type.type}`);
		}
	} else if (type.variant === 'inline-enum') {
		const Service = fqn(`${artifactConfig.rootPackageName}.service.${serviceName}Service`);
		rvType = Service + '.' + toFirstUpper(methodName) + '_Result$';
	} else if (type.variant === 'scalar') {
		if (artifactConfig.nativeTypeSubstitutes !== undefined && type.type in artifactConfig.nativeTypeSubstitutes) {
			rvType = fqn(artifactConfig.nativeTypeSubstitutes[type.type].type);
		} else {
			rvType = fqn(`${dtoPkg}.${type.type}`);
		}
	} else {
		rvType = resolveType(type.type, artifactConfig.nativeTypeSubstitutes, fqn, type.array);
	}

	if (type.array) {
		rvType = `${fqn('java.util.List')}<${rvType}>`;
	}

	return rvType;
}
