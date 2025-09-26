import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaServerJakartaWSGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { toFirstUpper } from '../util.js';

export function generateScopeValueProvider(artifactConfig: JavaServerJakartaWSGeneratorConfig): Artifact[] {
	if (artifactConfig.scopeValues) {
		const packageName = `${artifactConfig.rootPackageName}.rest`;
		const importCollector = new JavaImportsCollector(packageName);
		const fqn = importCollector.importType.bind(importCollector);

		return [
			{
				name: '_ScopeValueProvider.java',
				content: toString(
					generateCompilationUnit(packageName, importCollector, generateContent(artifactConfig, fqn)),
					'\t',
				),
				path: toPath(artifactConfig.targetFolder, packageName),
			},
		];
	}
	return [];
}

function generateContent(artifactConfig: JavaServerJakartaWSGeneratorConfig, fqn: (type: string) => string) {
	const result = new CompositeGeneratorNode();
	result.append(`public interface _ScopeValueProvider {`, NL);
	result.indent(cBody => {
		if (artifactConfig.scopeValues) {
			artifactConfig.scopeValues.forEach(v => {
				cBody.append(`public interface ${toFirstUpper(v.name)}Provider {`, NL);
				cBody.indent(iBody => {
					iBody.append(`public ${fqn(v.type)} ${v.name}();`, NL);
				});
				cBody.append('}', NL);
			});
		}
	});
	result.append('}', NL);
	return result;
}
