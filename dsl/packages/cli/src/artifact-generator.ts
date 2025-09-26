import { MResolvedRSDModel } from './model.js';
import { isObject } from './util.js';

export type Artifact = {
	name: string;
	path: string;
	content: string;
};

export type ArtifactGenerator = {
	readonly name: string;
	generate: (
		model: MResolvedRSDModel,
		generatorConfig: ArtifactGenerationConfig,
		artifactConfig: ArtifactGeneratorConfig,
	) => readonly Artifact[];
};

export type ArtifactGenerationConfig = {
	readonly name: string;
	readonly generators: readonly ArtifactGeneratorConfig[];
};

export function isArtifactGenerationConfig(value: unknown): value is ArtifactGenerationConfig {
	return (
		isObject(value) &&
		'name' in value &&
		typeof value.name === 'string' &&
		'generators' in value &&
		Array.isArray(value.generators)
	);
}

export type ArtifactGeneratorConfig = {
	readonly name: string;
};
