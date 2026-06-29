import chalk from 'chalk';
import { Artifact, ArtifactGenerationConfig, ArtifactGeneratorConfig } from '../artifact-generator.js';
import {
	isMEnumType,
	isMMixinType,
	isMRecordType,
	isMScalarType,
	isMUnionType,
	MResolvedRSDModel,
	MResolvedUserType,
} from '../model.js';
import { isJavaServerConfig, JavaNativeTypeSubstitute, JavaServerGeneratorConfig } from '../java-gen-utils.js';
import { isDefined } from '../util.js';
import { generateRecord } from './record.js';
import { generateBaseDTO } from './base-dto.js';
import { generateUnion } from './union.js';
import { generateDTOBuilderFactory } from './builder-factory.js';
import { generateMixin } from './mixin.js';
import { generateService } from './service.js';
import { generateServiceImpl } from './service-impl.js';
import { generateStreamDTO } from './stream-dto.js';
import { generateEnum } from './enum.js';
import { generateScalar } from './scalar.js';
import { generateRSDException } from './rsd-exception.js';
import { generateError } from './error.js';

export function generate(
	model: MResolvedRSDModel,
	generatorConfig: ArtifactGenerationConfig,
	artifactConfig: ArtifactGeneratorConfig,
): readonly Artifact[] {
	console.log(chalk.cyan('Generating Java-Server'));

	if (!isJavaServerConfig(artifactConfig)) {
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

	const result = model.elements.map(e => generateType(e, model, artifactConfig)).filter(isDefined);
	result.push(generateBaseDTO(artifactConfig));
	result.push(...generateStreamDTO(artifactConfig, model));
	result.push(generateDTOBuilderFactory(artifactConfig, model));
	result.push(...model.services.map(e => generateService(e, artifactConfig)));
	result.push(...model.services.map(e => generateServiceImpl(e, artifactConfig)));
	result.push(...generateRSDException(model.errors, artifactConfig, `${artifactConfig.rootPackageName}.service`));
	result.push(...model.errors.map(e => generateError(e, artifactConfig, `${artifactConfig.rootPackageName}.service`)));

	return result;
}

function generateType(
	t: MResolvedUserType,
	model: MResolvedRSDModel,
	artifactConfig: JavaServerGeneratorConfig,
): Artifact | undefined {
	if (isMEnumType(t)) {
		if (artifactConfig.nativeTypeSubstitues && t.name in artifactConfig.nativeTypeSubstitues) {
			console.log(chalk.magenta(`  Skipped ${t.name}:`), `Using native ${artifactConfig.nativeTypeSubstitues[t.name]}`);
			return undefined;
		}
		return generateEnum(t, artifactConfig);
	} else if (isMRecordType(t)) {
		return generateRecord(t, model, artifactConfig);
	} else if (isMUnionType(t)) {
		return generateUnion(t, artifactConfig);
	} else if (isMMixinType(t)) {
		return generateMixin(t, artifactConfig);
	} else if (isMScalarType(t)) {
		return generateScalar(t, artifactConfig);
	}
	return undefined;
}

export default {
	name: 'java-server-base',
	generate,
};
