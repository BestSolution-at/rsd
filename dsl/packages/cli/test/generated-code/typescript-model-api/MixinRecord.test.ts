import { describe, expect, test } from 'vitest';
import {
	isMixinRecord,
	MixinRecord,
	MixinRecordFromJSON,
	MixinRecordToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/MixinRecord.js';
import { addFooProperty, invalidateArrayProperty, invalidateProperty, removeProperty } from './utils.js';

const Simple: MixinRecord = {
	mValueString: 'a',
	mValueString2: 'b',
	sample: 'c',
};

describe('MixinRecordFromJSON', () => {
	test('simple', () => {
		expect(MixinRecordFromJSON(Simple)).toStrictEqual(Simple);
	});
	test('remove-unknown', () => {
		expect(MixinRecordFromJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(() => MixinRecordFromJSON(withOut)).toThrow();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(() => MixinRecordFromJSON(invalidateProperty(Simple, data))).toThrow();
	});
	test.each(Object.keys(Simple).filter(p => p.includes('list')))('invalid prop $0', data => {
		expect(() => MixinRecordFromJSON(invalidateArrayProperty(Simple, data))).toThrow();
	});
});
describe('isMixinRecord', () => {
	test('simple', () => {
		expect(isMixinRecord(Simple)).toBeTruthy();
	});
	test('additional props', () => {
		expect(isMixinRecord(addFooProperty(Simple))).toBeTruthy();
	});
	test.each(Object.keys(Simple).filter(v => !v.toLowerCase().includes('opt')))('missing prop $0', data => {
		const { withOut } = removeProperty(Simple, data);
		expect(isMixinRecord(withOut)).toBeFalsy();
	});
	test.each(Object.keys(Simple))('invalid prop $0', data => {
		expect(isMixinRecord(invalidateProperty(Simple, data))).toBeFalsy();
	});
});
describe('MixinRecordToJSON', () => {
	test('simple', () => {
		expect(MixinRecordToJSON(Simple)).toStrictEqual(Simple);
		expect(MixinRecordToJSON(Simple)).not.toBe(Simple);
	});
	test('additional props', () => {
		expect(MixinRecordToJSON(addFooProperty(Simple))).toStrictEqual(Simple);
	});
});
