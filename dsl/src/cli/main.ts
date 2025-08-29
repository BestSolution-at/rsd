import type { RSDModel, RSDRestModel } from '../language/generated/ast.js';
import chalk from 'chalk';
import { Command } from 'commander';
import { RemoteServiceDefinitionLanguageMetaData } from '../language/generated/module.js';
import { createRemoteServiceDescriptionServices } from '../language/remote-service-description-module.js';
import { extractAstNode } from './cli-util.js';
import { generateJSON, generateModel } from './generator.js';
import { NodeFileSystem } from 'langium/node';
import * as url from 'node:url';
import * as fs from 'node:fs/promises';
import * as fsync from 'node:fs';
import * as path from 'node:path';
import { MRSDModel, resolve } from './model.js';
import { Artifact, ArtifactGenerator, isArtifactGenerationConfig } from './artifact-generator.js';

import JavaClientAPI from './java-client-api/generator.js';
import JavaRestClientJDK from './java-rest-client-jdk/generator.js';
import JavaServerJakartaWS from './java-server-jakarta-ws/generator.js';
import JavaServer from './java-server/generator.js';
import OpenAPI from './open-api/generator.js';
import TypescriptClientAPI from './typescript-client-api/generator.js';
import TypescriptRestClientFetch from './typescript-rest-client-fetch/generator.js';

import { existsSync } from 'node:fs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const packagePath = path.resolve(__dirname, '..', '..', 'package.json');
const packageContent = await fs.readFile(packagePath, 'utf-8');

const generatorRegistry = new Map<string, ArtifactGenerator>();
generatorRegistry.set(JavaClientAPI.name, JavaClientAPI);
generatorRegistry.set(JavaRestClientJDK.name, JavaRestClientJDK);
generatorRegistry.set(JavaServerJakartaWS.name, JavaServerJakartaWS);
generatorRegistry.set(JavaServer.name, JavaServer);
generatorRegistry.set(OpenAPI.name, OpenAPI);
generatorRegistry.set(TypescriptClientAPI.name, TypescriptClientAPI);
generatorRegistry.set(TypescriptRestClientFetch.name, TypescriptRestClientFetch);

export const generateAction = async (fileName: string, opts: ModelGenerateOptions): Promise<void> => {
	const services = createRemoteServiceDescriptionServices(NodeFileSystem);
	const typeService = services.RemoteServiceDefinition;
	const restService = services.RemoteServiceREST;

	const model = await extractAstNode<RSDModel>(fileName, typeService);

	const rsdIdx = fileName.lastIndexOf('.rsd');
	const rrsdFile = rsdIdx === -1 ? fileName + '.rrsd' : fileName.substring(0, rsdIdx) + '.rrsd';
	const restModel = existsSync(rrsdFile) ? await extractAstNode<RSDRestModel>(rrsdFile, restService) : undefined;

	const generatedFilePath = generateJSON({ model, restModel }, fileName, opts.destination);
	console.log(chalk.green(`JSON generated successfully: ${generatedFilePath}`));
};

export type ModelGenerateOptions = {
	destination?: string;
};

export const generateArtifact = async (fileName: string, opts: ArtifactsGenerateOptions): Promise<void> => {
	const services = createRemoteServiceDescriptionServices(NodeFileSystem);
	const typeService = services.RemoteServiceDefinition;
	const restService = services.RemoteServiceREST;

	let model: MRSDModel;

	if (fileName.endsWith('.rsd')) {
		const typeModel = await extractAstNode<RSDModel>(fileName, typeService);
		const rsdIdx = fileName.lastIndexOf('.rsd');
		const rrsdFile = rsdIdx === -1 ? fileName + '.rrsd' : fileName.substring(0, rsdIdx) + '.rrsd';
		const restModel = existsSync(rrsdFile) ? await extractAstNode<RSDRestModel>(rrsdFile, restService) : undefined;

		model = generateModel({
			model: typeModel,
			restModel,
		});
	} else {
		const content = await fs.readFile(fileName);
		model = JSON.parse(content.toString());
	}
	if (!opts.configuration) {
		console.log(chalk.red('Required configuration is missing'));
	} else {
		const configuration = opts.configuration;
		const content = await fs.readFile(configuration);
		const config = JSON.parse(content.toString());
		const resolvedModel = resolve(model);

		if (isArtifactGenerationConfig(config)) {
			config.generators.forEach(e => {
				const artifacts: Artifact[] = [];

				const artifactGen = generatorRegistry.get(e.name);
				if (artifactGen) {
					artifacts.push(...artifactGen.generate(resolvedModel, config, e));
				} else {
					chalk.blue(`Unable to find generator for ${e.name}`);
				}

				const configDir = path.parse(configuration).dir;
				artifacts.forEach(a => {
					const outFolder = path.resolve(configDir, a.path);
					const outFile = path.resolve(outFolder, a.name);
					fsync.mkdirSync(outFolder, { recursive: true });
					fsync.writeFileSync(outFile, a.content);
					console.log(chalk.blue('  Created'), `${a.name}`);
				});
			});
		}
	}
};

export type ArtifactsGenerateOptions = {
	destination?: string;
	configuration?: string;
};

export default function (): void {
	const program = new Command();

	program.version(JSON.parse(packageContent).version);

	const fileExtensions = RemoteServiceDefinitionLanguageMetaData.fileExtensions.join(', ');
	program.command('model').argument('<file>', `source file (possible file extensions: ${fileExtensions})`).option('-d, --destination <dir>', 'destination directory of generating').description('Generate a JSON model from the DSL').action(generateAction);
	program.command('artifacts').argument('<file>', 'source model file (.json or .rsd)').option('-d, --destination <dir>', 'destination directory of generating').option('-c, --configuration <config-file>', 'configuration file').description('Generate Artifacts (Docu, Source-code, ...)').action(generateArtifact);

	program.parse(process.argv);
}
