import { CompositeGeneratorNode, NL } from 'langium/generate';
import { isMResolvedProperty, MResolvedUnionType } from '../model.js';
import { generatePatchPropertyAccessor, generatePropertyAccessor } from './shared.js';
import { toNode } from '../util.js';

export function generateUnionContent(
	t: MResolvedUnionType,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append(`public interface ${t.name} {`, NL);
	node.indent(classBody => {
		classBody.append(Builder());
		classBody.appendNewLine();
		classBody.append(generateData(t, nativeTypeSubstitues, basePackageName, fqn));
		classBody.appendNewLine();
		classBody.append(generateDataBuilder());

		if (t.resolved.records.find(r => r.patchable)) {
			classBody.append(NL, generatePatch(t, nativeTypeSubstitues, basePackageName, fqn), NL);
			classBody.append(generatePatchBuilder(), NL);
		}
	});
	node.append('}', NL);
	return node;
}

function Builder() {
	return toNode(['public interface Builder {', '', '}']);
}

function generateData(
	t: MResolvedUnionType,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append(`public interface Data extends _Base.BaseData, ${t.name} {`, NL);
	node.indent(classBody => {
		classBody.append(
			...t.resolved.sharedProps.flatMap(p => [
				generatePropertyAccessor(p, nativeTypeSubstitues, basePackageName, fqn),
				NL,
			]),
		);
	});
	node.append('}', NL);
	return node;
}

function generateDataBuilder() {
	const node = new CompositeGeneratorNode();
	node.append(`public interface DataBuilder extends Builder {`, NL);
	node.append('}', NL);
	return node;
}

function generatePatch(
	t: MResolvedUnionType,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	return toNode([
		//
		`public interface Patch extends _Base.BaseData, ${t.name} {`,
		t.resolved.sharedProps
			.filter(p => {
				if (isMResolvedProperty(p)) {
					return !p.readonly;
				}
				return true;
			})
			.flatMap(p => [generatePatchPropertyAccessor(p, nativeTypeSubstitues, basePackageName, fqn)]),
		'}',
	]);
}

function generatePatchBuilder() {
	const node = new CompositeGeneratorNode();
	node.append(`public interface PatchBuilder extends Builder {`, NL);
	node.append('}', NL);
	return node;
}
