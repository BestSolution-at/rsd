import { toString } from 'langium/generate';
import {
	generateCompilationUnit,
	TypescriptFetchClientGeneratorConfig,
	TypescriptImportCollector,
} from '../typescript-gen-utils.js';
import { toNodeTree } from '../util.js';

export function generateFetchTypeUtils(config: TypescriptFetchClientGeneratorConfig) {
	const collector = new TypescriptImportCollector(config);
	const fqn = collector.importType.bind(collector);
	return {
		name: `_fetch-type-utils.ts`,
		content: toString(generateCompilationUnit(collector, generateFetchTypeUtilsContent(fqn)), '\t'),
		path: `${config.targetFolder}/services`,
	};
}

function generateFetchTypeUtilsContent(fqn: (t: string, typeOnly: boolean) => string) {
	return toNodeTree(`
		export type Fetch = typeof fetch;
		export type ServiceProps<T extends string = string> = {
			baseUrl: string;
			fetchAPI?: Fetch;
			lifecycleHandlers?: {
				preFetch?: (method: string) => RequestInit | Promise<RequestInit>;
				onSuccess?: (method: string, value: unknown) => void;
				onError?: (method: string, err: ${fqn('api:../index.ts', false)}.result.RSDError<T>) => void;
				onCatch?: (method: string, err: unknown) => void;
				final?: (method: string) => void;
			};
		};
		
		export function ifDefined<T>(value: T | undefined, block: (v: T) => void) {
			if (value !== undefined) {
				block(value);
			}
		}
		
		export function safeExecute<T>(value: T, block: () => void): T {
			try {
				block();
			} catch (e) {
				console.error('Failed running block', e);
			}
			
			return value;
		}
		
		export function encodeValue(type: 'json', value: unknown) {
			return JSON.stringify(value);
		}
		
		export async function decodeResponse<T>(type: 'json', response: Response, guard: (value: unknown) => value is T): Promise<T> {
			const data = await response.json();
			if (!guard(data)) {
				throw new Error('Invalid result');
			}
			return data;
		}
	`);
}
