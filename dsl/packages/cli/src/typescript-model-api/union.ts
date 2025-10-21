import { CompositeGeneratorNode, NL } from 'langium/generate';
import { MResolvedUnionType } from '../model.js';

export function generateUnionContent(u: MResolvedUnionType, fqn: (t: string, typeOnly: boolean) => string) {
	const node = new CompositeGeneratorNode();
	node.append(
		`export type ${u.name} = ${u.resolved.records
			.map(r => {
				return fqn(`${r.name}:./${r.name}.ts`, true);
			})
			.join(' | ')};`,
		NL,
	);
	if (u.resolved.records.find(r => r.patchable)) {
		node.append(
			`export type ${u.name}Patch = ${u.resolved.records
				.map(r => {
					return fqn(`${r.name}Patch:./${r.name}.ts`, true);
				})
				.join(' | ')};`,
			NL,
		);
	}
	node.append(NL);
	node.append(generateTypeguard(u, fqn));
	node.append(generateFromJSON(u, fqn));
	node.append(generateToJSON(u, fqn));

	if (u.patchable) {
		node.append(
			`export type ${u.name}Patch = ${u.resolved.records
				.map(r => {
					return fqn(`${r.name}:./${r.name}.ts`, true);
				})
				.join(' | ')};`,
			NL,
			NL,
		);
	}

	return node;
}

function generateTypeguard(u: MResolvedUnionType, fqn: (t: string, typeOnly: boolean) => string) {
	const node = new CompositeGeneratorNode();
	node.append(`export function is${u.name}(value: unknown): value is ${u.name} {`, NL);
	node.indent(mBody => {
		mBody.append(
			`return ${u.resolved.records
				.map(r => {
					const check = fqn(`is${r.name}:./${r.name}.ts`, false);
					return `${check}(value)`;
				})
				.join(' || ')};`,
			NL,
		);
	});
	node.append('}', NL, NL);
	if (u.resolved.records.find(r => r.patchable)) {
		node.append(`export function is${u.name}Patch(value: unknown): value is ${u.name}Patch {`, NL);
		node.indent(mBody => {
			mBody.append(
				`return ${u.resolved.records
					.map(r => {
						const check = fqn(`is${r.name}Patch:./${r.name}.ts`, false);
						return `${check}(value)`;
					})
					.join(' || ')};`,
				NL,
			);
		});
		node.append('}', NL, NL);
	}

	return node;
}

function generateFromJSON(u: MResolvedUnionType, fqn: (t: string, typeOnly: boolean) => string) {
	const node = new CompositeGeneratorNode();
	const isString = fqn('isString:../_type-utils.ts', false);
	if (u.resolved.records.find(r => r.patchable)) {
		node.append('function isSupportedType(type: string): boolean {', NL);
		node.indent(mBody => {
			mBody.append(
				'return ',
				u.resolved.records.map(r => `type === '${u.descriminatorAliases?.[r.name] ?? r.name}'`).join(' || '),
				';',
				NL,
			);
		});
		node.append('}', NL, NL);
		node.append(
			`export function ${u.name}OrPatchFromJSON(value: Record<string, unknown>): ${u.name} | ${u.name}Patch {`,
			NL,
		);
		node.indent(mBody => {
			const checkProp = fqn('checkProp:../_type-utils.ts', false);
			mBody.append(`if (${checkProp}(value, '${u.descriminator}', ${isString})) {`, NL);
			mBody.indent(block => {
				block.append(
					`return isSupportedType(value['${u.descriminator}']) ? ${u.name}FromJSON(value) : ${u.name}PatchFromJSON(value);`,
					NL,
				);
			});
			mBody.append('}', NL);
			mBody.append("throw new Error('No valid descriminator found');", NL);
		});
		node.append('}', NL, NL);
	}
	node.append(`export function ${u.name}FromJSON(value: Record<string, unknown>): ${u.name} {`, NL);
	node.indent(mBody => {
		mBody.append(`const descriminator = value['${u.descriminator}'];`, NL, NL);
		mBody.append(`if (!${isString}(descriminator)) {`, NL);
		mBody.indent(block => {
			block.append("throw new Error('No valid descriminator found');", NL);
		});
		mBody.append('}', NL);
		mBody.append('switch (descriminator) {', NL);
		mBody.indent(switchBlock => {
			u.resolved.records.map(r => {
				const alias = u.descriminatorAliases?.[r.name] ?? r.name;
				switchBlock.append(`case '${alias}':`, NL);
				switchBlock.indent(caseBlock => {
					const mapper = fqn(`${r.name}FromJSON:./${r.name}.ts`, false);
					caseBlock.append(`return ${mapper}(value);`, NL);
				});
			});
			switchBlock.append('default:', NL);
			switchBlock.indent(caseBlock => {
				caseBlock.append('throw new Error(`Unknown descriminator "${descriminator}"`);', NL);
			});
		});
		mBody.append('}', NL);
	});
	node.append('}', NL, NL);
	if (u.resolved.records.find(r => r.patchable)) {
		node.append(`export function ${u.name}PatchFromJSON(value: Record<string, unknown>): ${u.name}Patch {`, NL);
		node.indent(mBody => {
			mBody.append(`const descriminator = value['${u.descriminator}'];`, NL, NL);
			mBody.append(`if (!${isString}(descriminator)) {`, NL);
			mBody.indent(block => {
				block.append("throw new Error('No valid descriminator found');", NL);
			});
			mBody.append('}', NL);
			mBody.append('switch (descriminator) {', NL);
			mBody.indent(switchBlock => {
				u.resolved.records.map(r => {
					const alias = u.descriminatorAliases?.[r.name] ?? r.name;
					switchBlock.append(`case 'patch:${alias}':`, NL);
					switchBlock.indent(caseBlock => {
						const mapper = fqn(`${r.name}PatchFromJSON:./${r.name}.ts`, false);
						caseBlock.append(`return ${mapper}(value);`, NL);
					});
				});
				switchBlock.append('default:', NL);
				switchBlock.indent(caseBlock => {
					caseBlock.append('throw new Error(`Unknown descriminator "${descriminator}"`);', NL);
				});
			});
			mBody.append('}', NL);
		});
		node.append('}', NL);
	}

	return node;
}

function generateToJSON(u: MResolvedUnionType, fqn: (t: string, typeOnly: boolean) => string) {
	const node = new CompositeGeneratorNode();
	if (u.resolved.records.find(r => r.patchable)) {
		node.append(
			`export function ${u.name}OrPatchToJSON(value: ${u.name} | ${u.name}Patch): Record<string, unknown> {`,
			NL,
		);
		node.indent(mBody => {
			mBody.append(`return is${u.name}(value) ? ${u.name}ToJSON(value) : ${u.name}PatchToJSON(value);`, NL);
		});
		node.append('}', NL, NL);
	}
	node.append(`export function ${u.name}ToJSON(value: ${u.name}): Record<string, unknown> {`, NL);
	node.indent(mBody => {
		mBody.append(`const $desc = value['${u.descriminator}'];`, NL);
		mBody.append(`switch ($desc) {`, NL);
		mBody.indent(switchBlock => {
			u.resolved.records.forEach(r => {
				const alias = u.descriminatorAliases?.[r.name] ?? r.name;
				switchBlock.append(`case '${alias}':`, NL);
				switchBlock.indent(caseBlock => {
					const mapper = fqn(`${r.name}ToJSON:./${r.name}.ts`, false);
					caseBlock.append(`return ${mapper}(value);`, NL);
				});
			});
		});
		mBody.append('}', NL);
	});
	node.append('}', NL, NL);
	if (u.resolved.records.find(r => r.patchable)) {
		node.append(`export function ${u.name}PatchToJSON(value: ${u.name}Patch): Record<string, unknown> {`, NL);
		node.indent(mBody => {
			mBody.append(`const $desc = value['${u.descriminator}'];`, NL);
			mBody.append(`switch ($desc) {`, NL);
			mBody.indent(switchBlock => {
				u.resolved.records.forEach(r => {
					const alias = u.descriminatorAliases?.[r.name] ?? r.name;
					switchBlock.append(`case 'patch:${alias}':`, NL);
					switchBlock.indent(caseBlock => {
						const mapper = fqn(`${r.name}PatchToJSON:./${r.name}.ts`, false);
						caseBlock.append(`return ${mapper}(value);`, NL);
					});
				});
			});
			mBody.append('}', NL);
		});
		node.append('}', NL, NL);
	}
	return node;
}
