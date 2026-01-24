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
import { MOperation, MParameter, MReturnType, MService } from '../model.js';
import { toFirstUpper, toNode } from '../util.js';

export function generateService(s: MService, artifactConfig: JavaClientAPIGeneratorConfig): Artifact {
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
				toMethod(child, o, o.parameters, artifactConfig, fqn);
			} else {
				for (idx; idx <= o.parameters.length; idx++) {
					const params = [...o.parameters];
					params.length = idx;
					toMethod(child, o, params, artifactConfig, fqn);
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
	allParameters: readonly MParameter[],
	artifactConfig: JavaClientAPIGeneratorConfig,
	fqn: (type: string) => string,
) {
	const parameters = allParameters.map(p => toParameter(p, artifactConfig, fqn, o.name));
	if (parameters.length <= 1) {
		child.append(
			toNode(
				[`public ${toResultType(o.resultType, artifactConfig, fqn, o.name)} ${o.name}(${parameters.join(', ')})`],
				false,
			),
		);
	} else {
		child.append(
			toNode([
				`public ${toResultType(o.resultType, artifactConfig, fqn, o.name)} ${o.name}(`,
				[parameters.filter((_, idx, arr) => idx + 1 < arr.length).map(p => p + ', ')],
			]),
		);
		child.indent(i1 => i1.indent(i2 => i2.append(parameters[parameters.length - 1] + ')')));
	}

	if (o.operationErrors.length > 0) {
		child.append(
			' throws ' +
				o.operationErrors
					.map((e, idx, arr) => fqn(`${artifactConfig.rootPackageName}.${o.operationErrors[0].error}Exception`))
					.join(', '),
		);
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
	artifactConfig: JavaClientAPIGeneratorConfig,
	fqn: (type: string) => string,
	methodName: string,
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
		rvType = fqn(`${dtoPkg}.${type.type}`);
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
