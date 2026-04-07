import { beforeAll, describe, expect, test } from 'vitest';
import { findListElement, sampleModel } from '../test-utils.js';
import { isMResolvedUnionType, MResolvedRSDModel } from '../../../src/model.js';
import { generateUnionContent } from '../../../src/open-api/union.js';

let model: MResolvedRSDModel;

beforeAll(() => {
	model = sampleModel();
});

type UnionTest = {
	name: string;
	result: Record<string, unknown>;
};

const UNION_TESTS: UnionTest[] = [
	{
		name: 'Union',
		result: {
			Union: {
				discriminator: {
					propertyName: '@type',
					mapping: {
						'union-a': '#/components/schemas/UnionA',
						'union-b': '#/components/schemas/UnionB',
					},
				},
				oneOf: [
					{
						$ref: '#/components/schemas/UnionA',
					},
					{
						$ref: '#/components/schemas/UnionB',
					},
				],
			},
		},
	},
];

describe('generateUnionContent', () => {
	test.each(UNION_TESTS)('should generate correct union content for $name', ({ name, result }) => {
		const t = findListElement(model.elements, isMResolvedUnionType, e => e.name === name);
		expect(generateUnionContent(t)).toStrictEqual(result);
	});
});
