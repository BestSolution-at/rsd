import { toString } from 'langium/generate';
import { Artifact, ArtifactGenerationConfig } from '../artifact-generator.js';
import { AvroGeneratorConfig, generate } from '../avro/generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaRestClientJDKGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { generateSchemaContent } from '../java-model-avro/avro-schema.js';
import {
	isMEnumType,
	isMRecordType,
	isMScalarType,
	isMUnionType,
	MResolvedEnumType,
	MResolvedRecordType,
	MResolvedRSDModel,
	MResolvedScalarType,
	MResolvedUnionType,
	MResolvedUserType,
} from '../model.js';
import { generateBaseDTOContent } from '../java-model-avro/base.js';
import { generateRecordContent } from '../java-model-avro/record.js';
import { isDefined } from '../util.js';
import { generateNillableContent } from '../java-model-json/nillable-impl.js';
import { generateEnumSupportContent } from '../java-model-avro/enum-support.js';
import { generateScalarSupportContent } from '../java-model-avro/scalar-support.js';
import { generateUnionContent } from '../java-model-avro/union.js';
import { generateRecordPatchContent } from '../java-model-avro/record-patch.js';
import { generateUnionPatchContent } from '../java-model-avro/union-patch.js';

export function generateAvro(
	model: MResolvedRSDModel,
	generatorConfig: ArtifactGenerationConfig,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
): Artifact[] {
	const artifacts: Artifact[] = [];

	const packageName = `${artifactConfig.rootPackageName}.model.impl.avro`;
	const importCollector = new JavaImportsCollector(packageName);

	const cfg: AvroGeneratorConfig = {
		targetFolder: toPath(`${artifactConfig.targetFolder}/../resources`, packageName),
		specFileName: 'avro-schema',
		generateProtocols: false,
		namespace: artifactConfig.rootPackageName,
		name: 'avro',
	};

	artifacts.push(...generate(model, generatorConfig, cfg));
	artifacts.push({
		name: '_AvroSchema.java',
		content: toString(
			generateCompilationUnit(packageName, importCollector, generateSchemaContent('avro-schema', model)),
			'\t',
		),
		path: toPath(artifactConfig.targetFolder, packageName),
	});
	artifacts.push({
		name: '_BaseDataImpl.java',
		content: toString(generateCompilationUnit(packageName, importCollector, generateBaseDTOContent()), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	});
	artifacts.push(...model.elements.flatMap(e => generateType(e, model, artifactConfig)).filter(isDefined));

	artifacts.push(...generateScalarSupport(model.elements.filter(isMScalarType), artifactConfig));
	artifacts.push(...generateEnumSupport(model.elements.filter(isMEnumType), artifactConfig));
	artifacts.push(generateNillable(artifactConfig));

	return artifacts;
}

function generateEnumSupport(
	enums: readonly MResolvedEnumType[],
	artifactConfig: JavaRestClientJDKGeneratorConfig,
): Artifact[] {
	if (enums.length === 0) {
		return [];
	}

	const packageName = `${artifactConfig.rootPackageName}.model.impl.avro`;
	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	return [
		{
			name: '_EnumSupport.java',
			content: toString(
				generateCompilationUnit(
					packageName,
					importCollector,
					generateEnumSupportContent(
						enums,
						artifactConfig.nativeTypeSubstitutes,
						`${artifactConfig.rootPackageName}.model`,
						fqn,
					),
				),
				'\t',
			),
			path: toPath(artifactConfig.targetFolder, packageName),
		},
	];
}

function generateNillable(artifactConfig: JavaRestClientJDKGeneratorConfig) {
	const packageName = `${artifactConfig.rootPackageName}.model.impl.avro`;
	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	const node = generateNillableContent(fqn, `${artifactConfig.rootPackageName}.model`);
	return {
		name: '_NillableImpl.java',
		content: toString(generateCompilationUnit(packageName, importCollector, node), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
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

function generateRecord(
	t: MResolvedRecordType,
	model: MResolvedRSDModel,
	artifactConfig: JavaRestClientJDKGeneratorConfig,
): Artifact[] {
	const packageName = `${artifactConfig.rootPackageName}.model.impl.avro`;
	const result: Artifact[] = [];

	{
		const importCollector = new JavaImportsCollector(packageName);
		const fqn = importCollector.importType.bind(importCollector);

		result.push({
			name: `${t.name}DataImpl.java`,
			content: toString(
				generateCompilationUnit(
					packageName,
					importCollector,
					generateRecordContent(
						t,
						model,
						artifactConfig.nativeTypeSubstitutes,
						`${artifactConfig.rootPackageName}.model`,
						fqn,
					),
				),
				'\t',
			),
			path: toPath(artifactConfig.targetFolder, packageName),
		});
	}

	if (t.patchable) {
		const importCollector = new JavaImportsCollector(packageName);
		const fqn = importCollector.importType.bind(importCollector);
		result.push({
			name: `${t.name}PatchImpl.java`,
			content: toString(
				generateCompilationUnit(
					packageName,
					importCollector,
					generateRecordPatchContent(
						t,
						model,
						artifactConfig.nativeTypeSubstitutes,
						`${artifactConfig.rootPackageName}.model`,
						fqn,
					),
				),
				'\t',
			),
			path: toPath(artifactConfig.targetFolder, packageName),
		});
	}

	return result;
}

function generateUnion(t: MResolvedUnionType, artifactConfig: JavaRestClientJDKGeneratorConfig): Artifact[] {
	const packageName = `${artifactConfig.rootPackageName}.model.impl.avro`;

	const result: Artifact[] = [];
	{
		const importCollector = new JavaImportsCollector(packageName);
		const fqn = importCollector.importType.bind(importCollector);

		result.push({
			name: `${t.name}DataImpl.java`,
			content: toString(
				generateCompilationUnit(
					packageName,
					importCollector,
					generateUnionContent(t, artifactConfig.nativeTypeSubstitutes, `${artifactConfig.rootPackageName}.model`, fqn),
				),
				'\t',
			),
			path: toPath(artifactConfig.targetFolder, packageName),
		});
	}

	if (t.resolved.records.find(r => r.patchable) !== undefined) {
		const importCollector = new JavaImportsCollector(packageName);
		const fqn = importCollector.importType.bind(importCollector);

		result.push({
			name: `${t.name}PatchImpl.java`,
			content: toString(
				generateCompilationUnit(
					packageName,
					importCollector,
					generateUnionPatchContent(
						t,
						artifactConfig.nativeTypeSubstitutes,
						`${artifactConfig.rootPackageName}.model`,
						fqn,
					),
				),
				'\t',
			),
			path: toPath(artifactConfig.targetFolder, packageName),
		});
	}

	return result;
}

function generateScalarSupport(
	scalars: readonly MResolvedScalarType[],
	artifactConfig: JavaRestClientJDKGeneratorConfig,
): Artifact[] {
	if (scalars.length === 0) {
		return [];
	}

	const packageName = `${artifactConfig.rootPackageName}.model.impl.avro`;
	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	return [
		{
			name: '_ScalarSupport.java',
			content: toString(
				generateCompilationUnit(
					packageName,
					importCollector,
					generateScalarSupportContent(
						scalars,
						artifactConfig.nativeTypeSubstitutes,
						`${artifactConfig.rootPackageName}.model`,
						fqn,
					),
				),
				'\t',
			),
			path: toPath(artifactConfig.targetFolder, packageName),
		},
	];
}
