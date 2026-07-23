import { CompositeGeneratorNode, IndentNode, NL, toString } from 'langium/generate';

import { Artifact } from '../artifact-generator.js';
import {
	JavaImportsCollector,
	JavaClientAPIGeneratorConfig,
	generateCompilationUnit,
	resolveType,
	toPath,
	computeParameterAPIType,
} from '../java-gen-utils.js';
import { MOperation, MOperationError, MParameter, MResolvedService, MReturnType, MService } from '../model.js';
import { toFirstUpper, toNode } from '../util.js';
import { computeServiceErrorCombination } from './service-errors.js';

export function generateService(
	s: MService,
	services: readonly MResolvedService[],
	artifactConfig: JavaClientAPIGeneratorConfig,
): Artifact {
	const packageName = artifactConfig.rootPackageName;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	const node = new CompositeGeneratorNode();
	node.append(`public interface ${s.name}Service extends BaseService {`, NL);
	for (const o of s.operations) {
		const resultType = o.resultType;
		if (resultType?.variant === 'inline-enum') {
			const enumName = toFirstUpper(o.name) + '_Result$';
			node.indent(child => {
				child.append(`public enum ${enumName} {`, NL);
				child.indent(grandChild => {
					resultType.type.entries.forEach(v => {
						grandChild.append(`${v.name},`, NL);
					});
				});
				child.append('}', NL);
			});
		}
		for (const p of o.parameters) {
			if (p.variant === 'inline-enum') {
				const paramType = p.type;
				const enumName = toFirstUpper(o.name) + '_' + toFirstUpper(p.name) + '_Param$';
				node.indent(child => {
					child.append(`public enum ${enumName} {`, NL);
					child.indent(grandChild => {
						paramType.entries.forEach(v => {
							grandChild.append(`${v.name},`, NL);
						});
					});
					child.append('}', NL);
				});
			}
		}
	}

	node.indent(child => {
		s.operations.forEach(o => {
			let idx = o.parameters.findIndex(p => p.optional);
			if (idx === -1) {
				toMethod(child, o, services, o.parameters, artifactConfig, fqn);
			} else {
				for (idx; idx <= o.parameters.length; idx++) {
					const params = [...o.parameters];
					params.length = idx;
					toMethod(child, o, services, params, artifactConfig, fqn);
				}
			}
		});
	});
	node.append('}', NL);

	return {
		name: `${s.name}Service.java`,
		content: toString(generateCompilationUnit(packageName, importCollector, node), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}

function toMethod(
	child: IndentNode,
	o: MOperation,
	services: readonly MResolvedService[],
	allParameters: readonly MParameter[],
	artifactConfig: JavaClientAPIGeneratorConfig,
	fqn: (type: string) => string,
) {
	const parameters = allParameters.map(p => toParameter(p, artifactConfig, fqn, o.name));
	if (parameters.length <= 1) {
		child.append(
			toNode(
				[
					`public ${toResultType(o.resultType, o.operationErrors, services, artifactConfig, fqn, o.name)} ${o.name}(${parameters.join(', ')})`,
				],
				false,
			),
		);
	} else {
		child.append(
			toNode([
				`public ${toResultType(o.resultType, o.operationErrors, services, artifactConfig, fqn, o.name)} ${o.name}(`,
				[parameters.filter((_, idx, arr) => idx + 1 < arr.length).map(p => p + ', ')],
			]),
		);
		child.indent(i1 => i1.indent(i2 => i2.append(parameters[parameters.length - 1] + ')')));
	}

	child.append(';', NL);
	child.appendNewLine();
}

function toParameter(
	parameter: MParameter,
	artifactConfig: JavaClientAPIGeneratorConfig,
	fqn: (type: string) => string,
	methodName: string,
) {
	const type = computeParameterAPIType(
		parameter,
		artifactConfig.nativeTypeSubstitutes,
		`${artifactConfig.rootPackageName}.model`,
		fqn,
		false,
		methodName,
	);
	return `${type} ${parameter.name}`;
}

function toResultType(
	type: MReturnType | undefined,
	errors: readonly MOperationError[],
	services: readonly MResolvedService[],
	artifactConfig: JavaClientAPIGeneratorConfig,
	fqn: (type: string) => string,
	methodName: string,
) {
	const Result = fqn(`${artifactConfig.rootPackageName}.Result`);
	const error = computeErrorType(errors, services, artifactConfig, fqn);

	const dtoPkg = `${artifactConfig.rootPackageName}.model`;
	if (type === undefined) {
		return `${Result}<Void, ${error}>`;
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
		rvType = toFirstUpper(methodName) + '_Result$';
	} else if (type.variant === 'scalar') {
		if (artifactConfig.nativeTypeSubstitutes !== undefined && type.type in artifactConfig.nativeTypeSubstitutes) {
			rvType = fqn(artifactConfig.nativeTypeSubstitutes[type.type].type);
		} else {
			rvType = fqn(`${dtoPkg}.${type.type}`);
		}
	} else {
		rvType = resolveType(type.type, artifactConfig.nativeTypeSubstitutes, fqn, true);
	}

	if (type.array) {
		rvType = `${fqn('java.util.List')}<${rvType}>`;
	}

	return `${Result}<${rvType}, ${error}>`;
}

function computeErrorType(
	errors: readonly MOperationError[],
	services: readonly MResolvedService[],
	artifactConfig: JavaClientAPIGeneratorConfig,
	fqn: (type: string) => string,
) {
	if (errors.length === 0) {
		return fqn(`${artifactConfig.rootPackageName}.RSDError`) + '.$GenericError';
	} else {
		const combinations = computeServiceErrorCombination(services);
		const errorNames = errors
			.map(e => e.error)
			.sort()
			.join(',');
		const errorCombination = combinations.get(errorNames);
		if (errorCombination) {
			return fqn(`${artifactConfig.rootPackageName}.RSDError`) + `.${errorCombination.interfaceName}`;
		} else {
			return fqn(`${artifactConfig.rootPackageName}.RSDError`) + '.$GenericError';
		}
	}
}
