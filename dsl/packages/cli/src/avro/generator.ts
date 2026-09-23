import chalk from 'chalk';
import { Artifact, ArtifactGenerationConfig, ArtifactGeneratorConfig } from '../artifact-generator.js';
import {
	isMEnumType,
	isMMixinType,
	isMProperty,
	isMRecordType,
	isMResolvedRecordType,
	MResolvedRSDModel,
} from '../model.js';
import { AvroType } from './avro-types.js';
import { generateRecordContent } from './record.js';
import { generateEnum } from './enum.js';
import { generateProtocolContent } from './service.js';

export type AvroGeneratorConfig = ArtifactGeneratorConfig & {
	targetFolder: string;
	specFileName: string;
	generateProtocols?: boolean;
	namespace?: string;
};

function isAvroGeneratorConfig(artifactConfig: ArtifactGeneratorConfig): artifactConfig is AvroGeneratorConfig {
	return (
		'targetFolder' in artifactConfig &&
		typeof artifactConfig.targetFolder === 'string' &&
		'specFileName' in artifactConfig &&
		typeof artifactConfig.specFileName === 'string'
	);
}

export function generate(
	model: MResolvedRSDModel,
	generatorConfig: ArtifactGenerationConfig,
	artifactConfig: ArtifactGeneratorConfig,
): Artifact[] {
	console.log(chalk.cyan('Generating Avro artifacts'));

	if (!isAvroGeneratorConfig(artifactConfig)) {
		console.log(chalk.red('  Invalid configuration passed aborted artifact generation'));
		return [];
	}

	const rv: Artifact[] = [
		{
			name: `${artifactConfig.specFileName}.avsc`,
			content: JSON.stringify(generateAvroSpec(model, artifactConfig), null, 2),
			path: artifactConfig.targetFolder,
		},
	];
	if (artifactConfig.generateProtocols) {
		model.services.forEach(service => {
			rv.push({
				name: `${service.name}.avpr`,
				content: JSON.stringify(generateProtocolContent(service, model, artifactConfig), null, 2),
				path: artifactConfig.targetFolder,
			});
		});
	}

	return rv;
}

function generateAvroSpec(model: MResolvedRSDModel, artifactConfig: AvroGeneratorConfig): AvroType[] {
	const rv: AvroType[] = [];
	if (
		model.elements
			.filter(e => isMRecordType(e) || isMMixinType(e))
			.some(e => e.properties.filter(isMProperty).some(p => p.nullable))
	) {
		rv.push({
			namespace: artifactConfig.namespace,
			type: 'enum',
			name: 'NULL',
			symbols: ['NULL'],
		});
	}
	model.elements.filter(isMEnumType).forEach(enumType => {
		rv.push(generateEnum(enumType, artifactConfig));
	});

	model.elements.filter(isMResolvedRecordType).forEach(record => {
		rv.push(...generateRecordContent(record, artifactConfig));
	});

	return rv;
}

export default {
	name: 'avro',
	generate,
};
