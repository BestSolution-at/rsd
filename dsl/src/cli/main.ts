import type { RSDModel } from '../language/generated/ast.js';
import chalk from 'chalk';
import { Command } from 'commander';
import { RemoteServiceDescriptionLanguageMetaData } from '../language/generated/module.js';
import { createRemoteServiceDescriptionServices } from '../language/remote-service-description-module.js';
import { extractAstNode } from './cli-util.js';
import { generateJavaScript, generateModel } from './generator.js';
import { NodeFileSystem } from 'langium/node';
import * as url from 'node:url';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { MRSDModel, resolve } from './model.js';
import { Artifact, ArtifactGenerator, isArtifactGenerationConfig } from './artifact-generator.js';

import JavaRestClientAPI from './java-rest-client-api/generator.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const packagePath = path.resolve(__dirname, '..', '..', 'package.json');
const packageContent = await fs.readFile(packagePath, 'utf-8');

const generatorRegistry = new Map<string, ArtifactGenerator>();
generatorRegistry.set(JavaRestClientAPI.name, JavaRestClientAPI);

export const generateAction = async (fileName: string, opts: ModelGenerateOptions): Promise<void> => {
    const services = createRemoteServiceDescriptionServices(NodeFileSystem).RemoteServiceDescription;
    const model = await extractAstNode<RSDModel>(fileName, services);
    const generatedFilePath = generateJavaScript(model, fileName, opts.destination);
    console.log(chalk.green(`JSON generated successfully: ${generatedFilePath}`));
};

export type ModelGenerateOptions = {
    destination?: string;
}

export const generateArtifact = async (fileName: string, opts: ArtifactsGenerateOptions): Promise<void> => {
    const services = createRemoteServiceDescriptionServices(NodeFileSystem).RemoteServiceDescription;
    let model : MRSDModel;

    if( fileName.endsWith('.rsd') ) {
        model = generateModel(await extractAstNode<RSDModel>(fileName, services));
    } else {
        const content = await fs.readFile(fileName);
        model = JSON.parse(content.toString());
    }
    if(! opts.configuration) {
        console.log(chalk.red('Required configuration is missing'))
    } else {
        const configuration = opts.configuration;
        const content = await fs.readFile(configuration)
        const config = JSON.parse(content.toString());

        const artifacts: Artifact[] = [];

        if( isArtifactGenerationConfig(config) ) {
            config.generators.forEach( e => {
                const artifactGen = generatorRegistry.get(e.name);
                if( artifactGen ) {
                    artifacts.push(...artifactGen.generate(resolve(model), config, e));
                } else {
                    chalk.blue(`Unable to find generator for ${e.name}`)
                }
            } );

            const configDir = path.parse(configuration).dir;
            artifacts.forEach( async a => {
                const outFolder = path.resolve(configDir,a.path)
                const outFile = path.resolve(outFolder, a.name);
                await fs.mkdir(outFolder, { recursive: true })
                fs.writeFile(outFile, a.content)
                    .then( () => console.log(`  Created ${a.name}`) );
            })
        }
    }    
}

export type ArtifactsGenerateOptions = {
    destination?: string;
    configuration?: string;
}

export default function(): void {
    const program = new Command();

    program.version(JSON.parse(packageContent).version);

    const fileExtensions = RemoteServiceDescriptionLanguageMetaData.fileExtensions.join(', ');
    program
        .command('model')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('Generate a JSON model from the DSL')
        .action(generateAction);
    program
        .command('artifacts')
        .argument('<file>', 'source model file (.json or .rsd)')
        .option('-d, --destination <dir>', 'destination directory of generating')
        .option('-c, --configuration <config-file>', 'configuration file')
        .description('Generate Artifacts (Docu, Source-code, ...)')
        .action(generateArtifact);

    program.parse(process.argv);
}
