import { toString } from 'langium/generate';
import { describe, expect, test } from 'vitest';
import { MResolvedScalarType } from '../../../src/model.js';
import { generateScalarsContent } from '../../../src/typescript-model-api/scalar.js';

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

describe('generateScalarsContent', () => {
	test('single scalar', () => {
		const result = toString(generateScalarsContent([scalar('ZoneId')]), '\t').trim();
		expect(result).toBe(ZoneId_Result);
	});

	test('multiple scalars', () => {
		const result = toString(generateScalarsContent([scalar('ZoneId'), scalar('LocalDate')]), '\t').trim();
		expect(result).toBe(MultipleScalars_Result);
	});

	test('empty list produces no output', () => {
		const result = toString(generateScalarsContent([]), '\t').trim();
		expect(result).toBe('');
	});
});
