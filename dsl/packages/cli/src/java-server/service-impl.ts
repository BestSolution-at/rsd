import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import { generateCompilationUnit, JavaImportsCollector, JavaServerGeneratorConfig, toPath } from '../java-gen-utils.js';
import { MService } from '../model.js';
import { generateServiceSignature } from './service.js';
import { toFirstUpper } from '../util.js';

export function generateServiceImpl(s: MService, artifactConfig: JavaServerGeneratorConfig): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.service.impl`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	return {
		name: `${s.name}ServiceImpl.java`,
		content: toString(
			generateCompilationUnit(packageName, importCollector, generateServiceContent(s, artifactConfig, fqn)),
			'\t',
		),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}

function generateServiceContent(s: MService, artifactConfig: JavaServerGeneratorConfig, fqn: (type: string) => string) {
	const ApplicationScoped = fqn('jakarta.enterprise.context.ApplicationScoped');
	const Service = fqn(`${artifactConfig.rootPackageName}.service.${s.name}Service`);
	fqn(`${artifactConfig.rootPackageName}.service.BuilderFactory`);
	const node = new CompositeGeneratorNode();
	node.append(`@${ApplicationScoped}`, NL);
	node.append(`public class ${s.name}ServiceImpl implements ${Service} {`, NL);
	node.indent(classBody => {
		s.operations.forEach(o => {
			classBody.append(`private final ${toFirstUpper(o.name)}Handler ${o.name}Handler;`, NL);
		});
		classBody.append(NL);

		classBody.append(
			`public ${s.name}ServiceImpl(${s.operations
				.map(o => `${toFirstUpper(o.name)}Handler ${o.name}Handler`)
				.join(', ')}) {`,
			NL,
		);
		classBody.indent(methodBody => {
			s.operations.forEach(o => {
				methodBody.append(`this.${o.name}Handler = ${o.name}Handler;`, NL);
			});
		});
		classBody.append('}', NL, NL);

		s.operations.forEach(o => {
			classBody.append('@Override', NL);
			classBody.append(generateServiceSignature(o, o.parameters, artifactConfig, fqn), ' {', NL);
			classBody.indent(methodBody => {
				const parameters = [
					'_factory',
					...(artifactConfig.scopeValues?.map(s => s.name) ?? []),
					...o.parameters.map(p => p.name),
				].join(', ');
				if (o.resultType) {
					methodBody.append(`return ${o.name}Handler.${o.name}(${parameters});`, NL);
				} else {
					methodBody.append(`${o.name}Handler.${o.name}(${parameters});`, NL);
				}
			});
			classBody.append('}', NL, NL);
		});

		s.operations.forEach(o => {
			classBody.append(`public interface ${toFirstUpper(o.name)}Handler {`, NL);
			classBody.indent(classBody => {
				classBody.append(generateServiceSignature(o, o.parameters, artifactConfig, fqn), ';', NL);
			});
			classBody.append('}', NL, NL);
		});
	});
	node.append('}', NL);
	return node;
}
