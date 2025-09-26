import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import { isMEnumType, isMRecordType, isMUnionType, MResolvedRSDModel } from '../model.js';
import {
	generateCompilationUnit,
	TypescriptClientAPIGeneratorConfig,
	TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateModelIndex(model: MResolvedRSDModel, config: TypescriptClientAPIGeneratorConfig): Artifact {
	const collector = new TypescriptImportCollector(config);
	return {
		name: `index.ts`,
		content: toString(
			generateCompilationUnit(collector, generateIndexContent(model, config.allowImportingTsExtensions ?? false)),
			'\t',
		),
		path: `${config.targetFolder}/model`,
	};
}

function generateIndexContent(model: MResolvedRSDModel, allowImportingTsExtensions: boolean) {
	const node = new CompositeGeneratorNode();
	model.elements.forEach(e => {
		if (isMEnumType(e) || isMUnionType(e) || isMRecordType(e)) {
			if (allowImportingTsExtensions) {
				node.append(`export * from './${e.name}.ts'`, NL);
			} else {
				node.append(`export * from './${e.name}.js'`, NL);
			}
		}
	});
	return node;
}
