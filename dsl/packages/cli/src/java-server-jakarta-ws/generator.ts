import chalk from 'chalk';
import {
	isMEnumType,
	isMRecordType,
	isMScalarType,
	isMUnionType,
	MResolvedRSDModel,
	MResolvedUserType,
} from '../model.js';
import { Artifact, ArtifactGenerationConfig, ArtifactGeneratorConfig } from '../artifact-generator.js';
import {
	isJavaServerJakartaWSConfig,
	JavaNativeTypeSubstitute,
	JavaServerJakartaWSGeneratorConfig,
} from '../java-gen-utils.js';

import { generateDTOBuilderFactory } from './builder-factory.js';
import { generateRecord } from './record.js';
import { generateBase } from './base.js';
import { generateJsonUtils } from './json-utils.js';
import { generateUnion } from './union.js';
import { generateResource } from './resource.js';
import { generateResponseBuilder } from './response-builder.js';
import { generateRestUtils } from './rest-utils.js';
import { generateNillable } from './nillable-impl.js';
import { generateScopeValueProvider } from './scopevalue-provider.js';
import { generateStreamImpls } from './stream-impl.js';
import { generateChangeSupport } from './listchange.js';
import { generateScalarSupport } from './scalar-support.js';
import { generateEnumSupport } from './enum-support.js';

export function generate(
	model: MResolvedRSDModel,
	generatorConfig: ArtifactGenerationConfig,
	artifactConfig: ArtifactGeneratorConfig,
): readonly Artifact[] {
	console.log(chalk.cyan('Generating Java-Server-Jakarta-WS'));

	if (!isJavaServerJakartaWSConfig(artifactConfig)) {
		console.log(chalk.red('  Invalid configuration passed aborted artifact generation'));
		return [];
	}

	if (artifactConfig.nativeTypeSubstitues) {
		Object.entries(artifactConfig.nativeTypeSubstitues).forEach(([k, v]) => {
			const rv: JavaNativeTypeSubstitute = {
				fromJson: 'of',
				toJson: 'toString',
				type: v,
			};
			artifactConfig.nativeTypeSubstitutes ??= {};
			artifactConfig.nativeTypeSubstitutes[k] = rv;
		});
		console.log(
			chalk.yellow(
				`  Warning: Using deprecated property nativeTypeSubstitues, please use nativeTypeSubstitutes instead`,
			),
		);
	}

	const result = model.elements.flatMap(e => generateType(e, model, artifactConfig));
	result.push(generateBase(artifactConfig));
	result.push(generateJsonUtils(artifactConfig));
	result.push(generateNillable(artifactConfig));
	result.push(...model.services.flatMap(e => generateResource(e, artifactConfig)));
	result.push(generateDTOBuilderFactory(model, artifactConfig));
	result.push(...model.services.map(s => generateResponseBuilder(s, model, artifactConfig)));
	result.push(...generateRestUtils(artifactConfig, model));
	result.push(...generateScopeValueProvider(artifactConfig));
	result.push(...generateStreamImpls(artifactConfig, model));
	result.push(...generateChangeSupport(artifactConfig));
	result.push(...generateScalarSupport(model.elements.filter(isMScalarType), artifactConfig));
	result.push(...generateEnumSupport(model.elements.filter(isMEnumType), artifactConfig));

	return result;
}

function generateType(
	t: MResolvedUserType,
	model: MResolvedRSDModel,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
): Artifact[] {
	if (isMEnumType(t)) {
	} else if (isMRecordType(t)) {
		return generateRecord(t, model, artifactConfig);
	} else if (isMUnionType(t)) {
		return generateUnion(t, artifactConfig);
	}

	return [];
}

export default {
	name: 'java-server-jakarta-ws',
	generate,
};
