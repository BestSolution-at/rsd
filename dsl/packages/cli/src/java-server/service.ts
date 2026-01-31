import { CompositeGeneratorNode, IndentNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	computeParameterAPIType,
	generateCompilationUnit,
	JavaImportsCollector,
	JavaServerGeneratorConfig,
	resolveType,
	toPath,
} from '../java-gen-utils.js';
import { MOperation, MParameter, MReturnType, MService } from '../model.js';
import { toFirstUpper } from '../util.js';

export function generateService(s: MService, artifactConfig: JavaServerGeneratorConfig): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.service`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	return {
		name: `${s.name}Service.java`,
		content: toString(
			generateCompilationUnit(packageName, importCollector, generateServiceContent(s, artifactConfig, fqn)),
			'\t',
		),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}

function generateServiceContent(s: MService, artifactConfig: JavaServerGeneratorConfig, fqn: (type: string) => string) {
	const node = new CompositeGeneratorNode();
	node.append(`public interface ${s.name}Service {`, NL);
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
			toMethod(child, o, o.parameters, artifactConfig, fqn);
		});
	});
	node.append('}', NL);
	return node;
}

function toMethod(
	child: IndentNode,
	o: MOperation,
	allParameters: readonly MParameter[],
	artifactConfig: JavaServerGeneratorConfig,
	fqn: (type: string) => string,
) {
	child.append(generateServiceSignature(o, allParameters, artifactConfig, fqn));
	child.append(';', NL);
	child.appendNewLine();
}

export function generateServiceSignature(
	o: MOperation,
	allParameters: readonly MParameter[],
	artifactConfig: JavaServerGeneratorConfig,
	fqn: (type: string) => string,
) {
	const child = new CompositeGeneratorNode();
	const scopeValues = artifactConfig.scopeValues?.map(s => `${fqn(s.type)} ${s.name}`) ?? [];
	const parameters = [
		'BuilderFactory _factory',
		...scopeValues,
		...allParameters.map(p => toParameter(p, artifactConfig, fqn, o.name)),
	].join(', ');
	child.append(`public ${toResultType(o.resultType, artifactConfig, fqn, o.name)} ${o.name}(${parameters})`);
	if (o.operationErrors.length > 0) {
		child.appendNewLine();
		child.indent(outer => {
			outer.indent(throwBody => {
				throwBody.append(
					'throws ',
					fqn(`${artifactConfig.rootPackageName}.service.${o.operationErrors[0].error}Exception`),
					o.operationErrors.length > 1 ? ',' : '',
				);
				if (o.operationErrors.length > 1) {
					throwBody.appendNewLine();
				}
				o.operationErrors.slice(1).forEach((e, idx, arr) => {
					throwBody.append(
						fqn(`${artifactConfig.rootPackageName}.service.${e.error}Exception`),
						arr.length !== idx + 1 ? ',' : '',
					);
					if (arr.length !== idx + 1) {
						throwBody.appendNewLine();
					}
				});
			});
		});
	}
	return child;
}

function toParameter(
	parameter: MParameter,
	artifactConfig: JavaServerGeneratorConfig,
	fqn: (type: string) => string,
	methodName: string,
) {
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
		if (parameter.type === 'int') {
			type = fqn('java.util.OptionalInt');
		} else if (parameter.type === 'long') {
			type = fqn('java.util.OptionalLong');
		} else if (parameter.type === 'double') {
			type = fqn('java.util.OptionalDouble');
		} else {
			type = fqn('java.util.Optional') + `<${type}>`;
		}
	}

	return `${type} ${parameter.name}`;
}

function toResultType(
	type: MReturnType | undefined,
	artifactConfig: JavaServerGeneratorConfig,
	fqn: (type: string) => string,
	methodName: string,
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
		rvType = toFirstUpper(methodName) + '_Result$';
	}

	if (type.array) {
		rvType = `${fqn('java.util.List')}<${rvType}>`;
	}

	return rvType;
}
