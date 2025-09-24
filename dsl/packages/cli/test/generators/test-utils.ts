import * as fs from 'fs';
import { MResolvedRSDModel, resolve } from '../../src/model.js';
import { TypescriptClientAPIGeneratorConfig } from '../../src/typescript-gen-utils.js';

export function loadTestSpecFile(path: string) {
	return fs.readFileSync(`${__dirname}/../test-specs/check/${path}`).toString();
}

let RESOLVED_MODEL: MResolvedRSDModel | undefined;

export function sampleModel(): MResolvedRSDModel {
	if (RESOLVED_MODEL === undefined) {
		const content = fs.readFileSync(`${__dirname}/../test-specs/sample.json`).toString();
		const model = JSON.parse(content) as MResolvedRSDModel;
		RESOLVED_MODEL = resolve(model);
	}
	return RESOLVED_MODEL;
}

export function findListElement<T>(list: readonly unknown[], typeGuard: (v: unknown) => v is T, predicate: (r: T) => boolean): T {
	const rv = list.filter(typeGuard).find(predicate);
	if (rv === undefined) {
		throw new Error(`No matching value was found`);
	}
	return rv;
}

export function createTypescriptClientAPIGeneratorConfig(): TypescriptClientAPIGeneratorConfig {
	return {
		name: 'typescript-client-api',
		targetFolder: './gen-out/client/typescript-client/src',
	};
}
