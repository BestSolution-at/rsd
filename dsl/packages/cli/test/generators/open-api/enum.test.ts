import { beforeAll, describe, expect, test } from 'vitest';
import { isMEnumType, MResolvedRSDModel } from '../../../src/model.js';
import { findListElement, sampleModel } from '../test-utils.js';
import { generateEnum } from '../../../src/open-api/enum.js';

let model: MResolvedRSDModel;

beforeAll(() => {
	model = sampleModel();
});

type EnumTest = {
	name: string;
	result: Record<string, unknown>;
};

const ENUM_TESTS: EnumTest[] = [
	{
		name: 'SampleEnum',
		result: {
			SampleEnum: {
				type: 'string',
				enum: ['A', 'B'],
			},
		},
	},
	//FIXME Custom valiues are currently ignored, but should be supported in the future
	{
		name: 'SampleEnumWithCustValue',
		result: {
			SampleEnumWithCustValue: {
				type: 'string',
				enum: ['A', 'B'],
			},
		},
	},
];

describe('generateEnum', () => {
	test.each(ENUM_TESTS)('should generate correct enum for $name', ({ name, result }) => {
		const t = findListElement(model.elements, isMEnumType, e => e.name === name);
		expect(generateEnum(t)).toStrictEqual(result);
	});
});
