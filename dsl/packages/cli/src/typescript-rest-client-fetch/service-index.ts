import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { MResolvedRSDModel } from '../model.js';
import {
	generateCompilationUnit,
	TypescriptFetchClientGeneratorConfig,
	TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateServiceIndex(model: MResolvedRSDModel, config: TypescriptFetchClientGeneratorConfig) {
	const collector = new TypescriptImportCollector(config);
	return {
		name: `index.ts`,
		content: toString(
			generateCompilationUnit(
				collector,
				generateServiceIndexContent(model, config.allowImportingTsExtensions ?? false),
			),
			'\t',
		),
		path: `${config.targetFolder}/services`,
	};
}

function generateServiceIndexContent(model: MResolvedRSDModel, allowImportingTsExtensions: boolean) {
	const node = new CompositeGeneratorNode();
	model.services.forEach(e => {
		if (allowImportingTsExtensions) {
			node.append(`export * from './${e.name}ServiceFetchImpl.ts'`, NL);
		} else {
			node.append(`export * from './${e.name}ServiceFetchImpl.js'`, NL);
		}
	});
	return node;
}
