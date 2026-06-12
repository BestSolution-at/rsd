import { CompositeGeneratorNode, NL } from 'langium/generate';
import { MResolvedScalarType } from '../model.js';
import { TypescriptClientAPIGeneratorConfig } from '../typescript-gen-utils.js';

export function generateScalarsContent(
	scalars: MResolvedScalarType[],
	config: TypescriptClientAPIGeneratorConfig,
	fqn: (t: string, typeOnly: boolean) => string,
): CompositeGeneratorNode {
	const node = new CompositeGeneratorNode();
	scalars.forEach(scalar => {
		const substitute = config.nativeScalarTypeSubstitues?.[scalar.name];
		if (substitute) {
			const type = fqn(`#${substitute.type}:${substitute.import}`, true);
			node.append(`export type ${scalar.name} = ${type};`, NL);
		} else {
			node.append(`export type ${scalar.name} = string;`, NL);
		}
		node.append(`export function ${scalar.name}FromJSON(value: string): ${scalar.name} {`, NL);
		node.indent(mBody => {
			if (substitute) {
				const fromJson = fqn('#' + substitute.fromJson + ':./' + substitute.import, false);
				mBody.append(`return ${fromJson}(value);`, NL);
			} else {
				mBody.append(`return value;`, NL);
			}
		});
		node.append('}', NL);
		node.append(`export function ${scalar.name}ToJSON(value: ${scalar.name}): string {`, NL);
		node.indent(mBody => {
			if (substitute) {
				const toJson = fqn('#' + substitute.toJson + ':./' + substitute.import, false);
				mBody.append(`return ${toJson}(value);`, NL);
			} else {
				mBody.append(`return value;`, NL);
			}
		});
		node.append('}', NL);
		node.append('export function is' + scalar.name + '(value: unknown): value is ' + scalar.name + ' {', NL);
		node.indent(mBody => {
			if (substitute) {
				const guard = fqn('#' + substitute.guard + ':./' + substitute.import, false);
				mBody.append(`return ${guard}(value);`, NL);
			} else {
				mBody.append(`return typeof value === 'string';`, NL);
			}
		});
		node.append('}', NL);
		node.append(NL);
	});
	return node;
}
