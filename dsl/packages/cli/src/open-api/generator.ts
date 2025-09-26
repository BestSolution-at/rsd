import chalk from 'chalk';
import { Artifact, ArtifactGenerationConfig, ArtifactGeneratorConfig } from '../artifact-generator.js';
import { isMEnumType, isMRecordType, isMUnionType, MResolvedRSDModel, MResolvedUserType } from '../model.js';
import { generateRecordContent } from './record.js';
import { generateUnionContent } from './union.js';
import { generateService } from './service.js';
import { generateEnum } from './enum.js';

export type OpenAPIGeneratorConfig = ArtifactGeneratorConfig & {
	targetFolder: string;
	specFileName: string;
	staticSpec?: Record<string, unknown>;
};

function isOpenAPIGeneratorConfig(artifactConfig: ArtifactGeneratorConfig): artifactConfig is OpenAPIGeneratorConfig {
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
	console.log(chalk.cyan('Generating Open Specs'));

	if (!isOpenAPIGeneratorConfig(artifactConfig)) {
		console.log(chalk.red('  Invalid configuration passed aborted artifact generation'));
		return [];
	}

	const rv: Artifact[] = [
		{
			name: `${artifactConfig.specFileName}.json`,
			content: JSON.stringify(generateOpenAPISpec(model, artifactConfig), null, 2),
			path: `${artifactConfig.targetFolder}`,
		},
	];
	return rv;
}

function generateOpenAPISpec(model: MResolvedRSDModel, artifactConfig: OpenAPIGeneratorConfig) {
	let schemas: Record<string, unknown> = {};
	model.elements
		.flatMap(t => generateType(t, model, artifactConfig))
		.forEach(x => {
			schemas = { ...schemas, ...x };
		});
	let paths: Record<string, unknown> = {};
	model.services
		.map(s => generateService(s))
		.forEach(x => {
			paths = { ...paths, ...x };
		});
	return {
		openapi: '3.0.1',
		...artifactConfig.staticSpec,
		tags: model.services.map(s => ({
			name: s.name,
			description: s.doc,
		})),
		paths,
		components: {
			schemas,
		},
	};
}

function generateType(
	t: MResolvedUserType,
	model: MResolvedRSDModel,
	artifactConfig: OpenAPIGeneratorConfig,
): Record<string, unknown>[] {
	if (isMEnumType(t)) {
		return [generateEnum(t)];
	} else if (isMRecordType(t)) {
		return [generateRecordContent(t)];
	} else if (isMUnionType(t)) {
		return [generateUnionContent(t)];
	}

	return [];
}

export default {
	name: 'openapi',
	generate,
};
