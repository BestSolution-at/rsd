import { CompositeGeneratorNode, GeneratorNode, NL } from 'langium/generate';
import { MBuiltinType, MResolvedRSDModel } from './model.js';

export function isDefined<T>(value: T | undefined): value is T {
	return value !== undefined;
}

export function isObject(value: unknown): value is object {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function toFirstUpper(value: string) {
	return value[0].toUpperCase() + value.substring(1);
}

export function toFirstLower(value: string) {
	return value[0].toLowerCase() + value.substring(1);
}

export type IndentBlock = (
	| string
	| IndentBlock
	| GeneratorNode
	| undefined
	| null
	| (() => GeneratorNode | undefined | null)
)[];

export function toNode(block: IndentBlock, endWithNewLine = true) {
	const node = new CompositeGeneratorNode();
	block.forEach((e, idx, arr) => {
		if (e === null) {
			return;
		}
		if (e === undefined) {
			if (endWithNewLine || idx + 1 < arr.length) {
				node.append(NL);
			}
		} else if (typeof e === 'function') {
			const n = e();
			if (n) {
				node.append(n);
			}
			if (n !== null && (endWithNewLine || idx + 1 < arr.length)) {
				node.append(NL);
			}
		} else if (Array.isArray(e)) {
			node.indent(i => {
				i.append(toNode(e, true));
			});
		} else if (typeof e === 'string') {
			node.append(e, endWithNewLine || idx + 1 < arr.length ? NL : '');
		} else {
			node.append(e, endWithNewLine || idx + 1 < arr.length ? NL : '');
		}
	});
	return node;
}

export function toNodeTree(block: string): CompositeGeneratorNode {
	const nodeStack: CompositeGeneratorNode[] = [new CompositeGeneratorNode()];

	let currentIdent = 0;
	const lines = block.split(/\r?\n/);
	for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
		const l = lines[lineIndex];

		if (lineIndex === 0) {
			continue;
		} else if (lineIndex === 1) {
			currentIdent = computeIdent(l);
		} else if (l.trim().length === 0) {
			// Treat totally empty lines as they would fail ident computation
			nodeStack[nodeStack.length - 1].append(NL);
			continue;
		}

		const ident = computeIdent(l);

		const identDiff = ident - currentIdent;
		if (identDiff > 0) {
			for (let i = 0; i < identDiff; i++) {
				nodeStack.push(new CompositeGeneratorNode());
			}
		} else if (identDiff < 0) {
			for (let i = 0; i < Math.abs(identDiff); i++) {
				const node = nodeStack.pop();
				nodeStack[nodeStack.length - 1].indent(c => c.append(node));
			}
		}

		nodeStack[nodeStack.length - 1].append(l.replace(/\t*/, ''), lineIndex + 1 < lines.length ? NL : '');
		currentIdent = ident;
	}

	return nodeStack[0];
}

function computeIdent(line: string) {
	const r = /^\t*/.exec(line);
	if (r?.length === 1) {
		return r[0].length;
	}
	return 0;
}

export function toCamelCaseIdentifier(value: string) {
	let rv = '';
	for (let i = 0; i < value.length; i++) {
		if (value.charAt(i) === '-' || value.charAt(i) === '_' || value.charAt(i) === ' ') {
			i = i + 1;
			rv += value.charAt(i).toUpperCase();
		} else {
			rv += value.charAt(i);
		}
	}

	return rv.replaceAll(/\s/g, '');
}

export function hasStream(model: MResolvedRSDModel) {
	return hasStreamResult(model) || hasStreamParameter(model);
}

export function hasFileStream(model: MResolvedRSDModel) {
	return hasFileStreamResult(model) || hasFileStreamParameter(model);
}

export function hasStreamResult(model: MResolvedRSDModel): boolean {
	return model.services.flatMap(s => s.operations).find(o => o.resultType?.variant === 'stream') !== undefined;
}

export function hasFileStreamResult(model: MResolvedRSDModel): boolean {
	return (
		model.services
			.flatMap(s => s.operations)
			.filter(o => o.resultType?.variant === 'stream')
			.find(o => o.resultType?.type === 'file') !== undefined
	);
}

export function hasStreamParameter(model: MResolvedRSDModel): boolean {
	return (
		model.services
			.flatMap(s => s.operations)
			.flatMap(o => o.parameters)
			.find(p => p.variant === 'stream') !== undefined
	);
}

export function hasFileStreamParameter(model: MResolvedRSDModel): boolean {
	return (
		model.services
			.flatMap(s => s.operations)
			.flatMap(o => o.parameters)
			.filter(p => p.variant === 'stream')
			.find(p => p.type === 'file') !== undefined
	);
}

export function isStringSerializedType(type: MBuiltinType) {
	return type === 'local-date' || type === 'local-date-time' || type === 'string' || type === 'zoned-date-time';
}
