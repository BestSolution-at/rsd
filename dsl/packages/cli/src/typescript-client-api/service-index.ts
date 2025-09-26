import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import { MResolvedRSDModel } from '../model.js';
import {
	generateCompilationUnit,
	TypescriptClientAPIGeneratorConfig,
	TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateServiceIndex(model: MResolvedRSDModel, config: TypescriptClientAPIGeneratorConfig): Artifact {
	const collector = new TypescriptImportCollector(config);
	return {
		name: `index-service.ts`,
		content: toString(
			generateCompilationUnit(collector, generateIndexContent(model, config.allowImportingTsExtensions ?? false)),
			'\t',
		),
		path: config.targetFolder,
	};
}

function generateIndexContent(model: MResolvedRSDModel, allowImportingTsExtensions: boolean) {
	const node = new CompositeGeneratorNode();
	model.services.forEach(e => {
		if (allowImportingTsExtensions) {
			node.append(`export * from './${e.name}Service.ts'`, NL);
		} else {
			node.append(`export * from './${e.name}Service.js'`, NL);
		}
	});
	if (model.errors.length > 0) {
		if (allowImportingTsExtensions) {
			node.append(`export * from './Errors.ts'`, NL);
		} else {
			node.append(`export * from './Errors.js'`, NL);
		}
	}

	return node;
}
