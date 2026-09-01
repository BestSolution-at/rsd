import { CompositeGeneratorNode, IndentNode, NL, toString } from 'langium/generate';

import { Artifact } from '../artifact-generator.js';
import {
	JavaImportsCollector,
	JavaClientAPIGeneratorConfig,
	computeAPIResultType,
	generateCompilationUnit,
	toPath,
	computeParameterAPIType,
} from '../java-gen-utils.js';
import { MOperation, MParameter, MResolvedService, MService } from '../model.js';
import { toFirstUpper, toNode } from '../util.js';

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
	const [rvType, errorType] = computeAPIResultType(o.resultType, o.operationErrors, services, artifactConfig, fqn, o.name);
	let rv;
	if (o.resultType?.streaming) {
		const StreamConsumer = fqn(`${artifactConfig.rootPackageName}.StreamConsumer`);
		parameters.push(`${StreamConsumer}<${rvType}, ${errorType}> consumer`);
		rv = 'void';
	} else {
		rv = `${fqn(`${artifactConfig.rootPackageName}.Result`)}<${rvType}, ${errorType}>`;
	}

	if (parameters.length <= 1) {
		child.append(toNode([`public ${rv} ${o.name}(${parameters.join(', ')})`], false));
	} else {
		child.append(
			toNode([
				`public ${rv} ${o.name}(`,
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

