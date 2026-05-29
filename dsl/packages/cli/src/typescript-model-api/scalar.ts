import { CompositeGeneratorNode, NL } from 'langium/generate';
import { MResolvedScalarType } from '../model.js';

export function generateScalarsContent(scalars: MResolvedScalarType[]): CompositeGeneratorNode {
	const node = new CompositeGeneratorNode();
	scalars.forEach(scalar => {
		node.append(`export type ${scalar.name} = string;`, NL);
		node.append(`export function ${scalar.name}FromString(value: string): ${scalar.name} {`, NL);
		node.indent(mBody => {
			mBody.append(`return value;`, NL);
		});
		node.append('}', NL, NL);
	});
	return node;
}
