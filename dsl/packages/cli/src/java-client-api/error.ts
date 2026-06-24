import { CompositeGeneratorNode, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaClientAPIGeneratorConfig,
	JavaImportsCollector,
	toAPIType,
	toPath,
} from '../java-gen-utils.js';
import { MResolvedError, MResolvedService } from '../model.js';
import { computeServiceErrorCombination } from './service-errors.js';
import { toNodeTree } from '../util.js';

export function generateError(
	t: MResolvedError,
	services: readonly MResolvedService[],
	artifactConfig: JavaClientAPIGeneratorConfig,
	packageName: string,
): Artifact {
	const importCollector = new JavaImportsCollector(packageName);

	return {
		name: `${t.name}.java`,
		content: toString(
			generateCompilationUnit(
				packageName,
				importCollector,
				generateSource(t, services, artifactConfig, importCollector.importType.bind(importCollector)),
			),
			'\t',
		),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}

function generateSource(
	t: MResolvedError,
	services: readonly MResolvedService[],
	artifactConfig: JavaClientAPIGeneratorConfig,
	fqn: (type: string) => string,
): CompositeGeneratorNode {
	const combinations = [...computeServiceErrorCombination(services).values()]
		.filter(c => c.errorNames.includes(t.name))
		.map(c => `RSDError.${c.interfaceName}`);
	combinations.unshift('RSDError');

	if (t.resolvedContentType) {
		const type = toAPIType(
			t.resolvedContentType,
			artifactConfig.nativeTypeSubstitues,
			artifactConfig.rootPackageName + '.model',
			fqn,
		);
		return toNodeTree(`
public record ${t.name}(String message, ${type} data) implements ${combinations.join(', ')} {
	@Override
	public Type type() {
		return Type.${t.name};
	}
}
`);
	} else {
		return toNodeTree(`
public record ${t.name}(String message) implements ${combinations.join(', ')} {
	@Override
	public Type type() {
		return Type.${t.name};
	}
}
`);
	}
}
