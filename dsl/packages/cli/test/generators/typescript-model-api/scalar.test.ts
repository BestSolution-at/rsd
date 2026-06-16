import { toString } from 'langium/generate';
import { describe, expect, test } from 'vitest';
import { MResolvedScalarType } from '../../../src/model.js';
import { generateScalarsContent } from '../../../src/typescript-model-api/scalar.js';
import { TypescriptImportCollector } from '../../../src/typescript-gen-utils.js';

function scalar(name: string): MResolvedScalarType {
	return { '@type': 'ScalarType', name, doc: '' };
}

const ZoneId_Result = `
export type ZoneId = string;
export function ZoneIdFromJSON(value: string): ZoneId {
	return value;
}
export function ZoneIdToJSON(value: ZoneId): string {
	return value;
}
export function isZoneId(value: unknown): value is ZoneId {
	return typeof value === 'string';
}
`.trim();

const ZoneId_Result_Substitute = `
export type ZoneId = ZoneId_;
export function ZoneIdFromJSON(value: string): ZoneId {
	return ZoneIdFromJSON_(value);
}
export function ZoneIdToJSON(value: ZoneId): string {
	return ZoneIdToJSON_(value);
}
export function isZoneId(value: unknown): value is ZoneId {
	return isZoneId_(value);
}
`.trim();

const MultipleScalars_Result = `
export type ZoneId = string;
export function ZoneIdFromJSON(value: string): ZoneId {
	return value;
}
export function ZoneIdToJSON(value: ZoneId): string {
	return value;
}
export function isZoneId(value: unknown): value is ZoneId {
	return typeof value === 'string';
}

export type LocalDate = string;
export function LocalDateFromJSON(value: string): LocalDate {
	return value;
}
export function LocalDateToJSON(value: LocalDate): string {
	return value;
}
export function isLocalDate(value: unknown): value is LocalDate {
	return typeof value === 'string';
}
`.trim();

const SIMPLE_CONFIG = { name: 'test', targetFolder: 'src' } as const;

describe('generateScalarsContent', () => {
	test('single scalar', () => {
		const collector = new TypescriptImportCollector(SIMPLE_CONFIG, '_Scalars.ts');
		const fqn = collector.importType.bind(collector);
		const result = toString(generateScalarsContent([scalar('ZoneId')], SIMPLE_CONFIG, fqn), '\t').trim();
		expect(result).toBe(ZoneId_Result);
	});

	test('multiple scalars', () => {
		const collector = new TypescriptImportCollector(SIMPLE_CONFIG, '_Scalars.ts');
		const fqn = collector.importType.bind(collector);
		const result = toString(
			generateScalarsContent([scalar('ZoneId'), scalar('LocalDate')], SIMPLE_CONFIG, fqn),
			'\t',
		).trim();
		expect(result).toBe(MultipleScalars_Result);
	});

	test('native scalar type substitute', () => {
		const config = {
			...SIMPLE_CONFIG,
			nativeScalarTypeSubstitues: {
				ZoneId: {
					type: 'ZoneId',
					import: 'foo.ts',
					fromJson: 'ZoneIdFromJSON',
					toJson: 'ZoneIdToJSON',
					guard: 'isZoneId',
				},
			},
		};
		const collector = new TypescriptImportCollector(config, '_Scalars.ts');
		const fqn = collector.importType.bind(collector);
		const result = toString(generateScalarsContent([scalar('ZoneId')], config, fqn), '\t').trim();
		expect(result).toBe(ZoneId_Result_Substitute);
	});

	test('empty list produces no output', () => {
		const collector = new TypescriptImportCollector(SIMPLE_CONFIG, '_Scalars.ts');
		const fqn = collector.importType.bind(collector);
		const result = toString(generateScalarsContent([], SIMPLE_CONFIG, fqn), '\t').trim();
		expect(result).toBe('');
	});
});
