import { CompositeGeneratorNode, NL } from 'langium/generate';

import { MEnumType, MInlineEnumType } from '../model.js';

export function generateEnumContent(t: MEnumType): CompositeGeneratorNode {
	const node = new CompositeGeneratorNode();
	node.append(`public enum ${t.name} {`, NL);
	node.indent(child => {
		t.entries.forEach(e => child.append(e.name, ',', NL));
	});
	node.append('}', NL);

	return node;
}

export function generateInlineEnum(t: MInlineEnumType, name: string) {
	const node = new CompositeGeneratorNode();
	node.append(`public enum ${name} {`, NL);
	node.indent(enumBody => {
		t.entries.forEach(e => {
			enumBody.append(`${e.name},`, NL);
		});
	});
	node.append('}', NL);
	return node;
}
