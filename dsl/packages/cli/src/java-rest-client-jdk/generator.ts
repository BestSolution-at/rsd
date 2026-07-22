import chalk from 'chalk';
import { Artifact, ArtifactGenerationConfig, ArtifactGeneratorConfig } from '../artifact-generator.js';
import { isMRecordType, isMScalarType, isMUnionType, MResolvedRSDModel, MResolvedUserType } from '../model.js';
import { generateClient } from './client.js';
import {
	isJavaRestClientJDKGeneratorConfig,
	JavaNativeTypeSubstitute,
	JavaRestClientJDKGeneratorConfig,
} from '../java-gen-utils.js';
import { generateBase } from './base.js';
import { isDefined } from '../util.js';
import { generateRecord } from './record.js';
import { generateJsonUtils } from './json-utils.js';
import { generateUnion } from './union.js';
import { generateService } from './service.js';
import { generateJDKHttpClientResponseUtils } from './response-utils.js';
import { generateNillable } from './nillable-impl.js';
import { generateStreamImpls } from './stream-impl.js';
import { generateChangeSupport } from './listchange.js';
import { generateFormDataPublisherBuilder } from './form-data-publisher.js';
import { generateBaseUtils } from './base-utils.js';
import { generateScalarSupport } from './scalar-support.js';

export function generate(
	model: MResolvedRSDModel,
	generatorConfig: ArtifactGenerationConfig,
	artifactConfig: ArtifactGeneratorConfig,
): readonly Artifact[] {
	console.log(chalk.cyan('Generating Java-JDK-REST-Client'));

	if (!isJavaRestClientJDKGeneratorConfig(artifactConfig)) {
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

	const result: Artifact[] = [];
	result.push(generateClient(model, generatorConfig, artifactConfig));
	result.push(generateBase(artifactConfig));
	result.push(generateNillable(artifactConfig));
	result.push(generateJsonUtils(artifactConfig));
	result.push(generateJDKHttpClientResponseUtils(artifactConfig, model));
	result.push(...model.elements.flatMap(e => generateType(e, model, artifactConfig)).filter(isDefined));
	result.push(...model.services.flatMap(e => generateService(e, model.services, generatorConfig, artifactConfig)));
	result.push(...generateStreamImpls(artifactConfig, model));
	result.push(...generateChangeSupport(artifactConfig));
	result.push(...generateFormDataPublisherBuilder(artifactConfig, model));
	result.push(generateBaseUtils(artifactConfig));
	result.push(...generateScalarSupport(model.elements.filter(isMScalarType), artifactConfig));

	return result;
}

function generateType(
	t: MResolvedUserType,
	model: MResolvedRSDModel,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
): Artifact[] {
	if (isMRecordType(t)) {
		return generateRecord(t, model, artifactConfig);
	} else if (isMUnionType(t)) {
		return generateUnion(t, artifactConfig);
	}
	return [];
}

export default {
	name: 'java-rest-client-jdk',
	generate,
};
