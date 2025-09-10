import { CompositeGeneratorNode, NL } from 'langium/generate';
import { allResolvedRecordProperties, isMBuiltinType, isMInlineEnumType, isMKeyProperty, isMResolvedProperty, isMRevisionProperty, MBaseProperty, MBuiltinType, MInlineEnumType, MResolvedBaseProperty, MResolvedPropery, MResolvedRecordType } from '../model.js';
import { toFirstUpper, toNode } from '../util.js';
import { builtinToJSType } from '../typescript-gen-utils.js';

export function generateRecordContent(t: MResolvedRecordType, fqn: (t: string, typeOnly: boolean) => string) {
	const allProps = allResolvedRecordProperties(t);
	const node = new CompositeGeneratorNode();
	node.append(
		...allProps
			.filter(isMResolvedProperty)
			.filter(p => p.variant === 'inline-enum')
			.map(p => InlineEnumType(p.name, p.type as MInlineEnumType))
	);
	allProps.filter(p => isMInlineEnumType(p.type)).forEach(p => node.append(generateInlineTypeguard(t, p, p.type as MInlineEnumType)));
	node.appendNewLineIf(!node.isEmpty());
	node.append(RecordType(t, allProps, fqn), NL);
	node.append(generateTypeguard(t, allProps, fqn), NL);
	node.append(generateFromJSON(t, allProps, fqn), NL);
	node.append(generateToJSON(t, allProps, fqn), NL);

	if (t.patchable) {
		allProps
			.filter(isMResolvedProperty)
			.filter(p => p.array)
			.forEach(p => {
				node.append(ListChangeTypes(p, fqn), NL);
			});

		const valueChange = new CompositeGeneratorNode();
		allProps
			.filter(isMResolvedProperty)
			.filter(p => !p.array)
			.filter(p => p.variant === 'record' || p.variant === 'union')
			.forEach(p => valueChange.append(ValueChangeTypes(p, fqn)));
		valueChange.appendNewLineIf(!valueChange.isEmpty());
		node.append(valueChange);

		node.append(RecordTypePatch(t, allProps, fqn), NL);
		node.append(generatePatchTypeguard(t, allProps, fqn), NL);
		node.append(generatePatchFromJSON(t, allProps, fqn), NL);
		node.append(generatePatchToJSON(t, allProps, fqn), NL);
	}

	return node;
}

function InlineEnumType(propName: string, type: MInlineEnumType) {
	return toNode([
		//
		`type ${toFirstUpper(propName)}Enum = ${type.entries.map(e => `'${e.name}'`).join(' | ')};`,
	]);
}

function generateInlineTypeguard(t: MResolvedRecordType, prop: MBaseProperty, type: MInlineEnumType) {
	const node = new CompositeGeneratorNode();
	node.append(NL, `export function is${t.name}_${toFirstUpper(prop.name)}(value: unknown): value is ${toFirstUpper(prop.name)}Enum {`, NL);
	node.indent(mBody => {
		mBody.append('return ');
		mBody.append(
			type.entries
				.map(e => {
					return `value === '${e.name}'`;
				})
				.join(' || ')
		);
		mBody.append(';', NL);
	});
	node.append('}', NL);
	return node;
}

export function RecordType(t: MResolvedRecordType, props: MResolvedBaseProperty[], fqn: (t: string, type: boolean) => string) {
	const node = new CompositeGeneratorNode();
	node.append(`export type ${t.name} = {`, NL);
	node.indent(classBody => {
		if (t.resolved.unions.length === 1) {
			const alias = (t.resolved.unions[0].descriminatorAliases ?? {})[t.name] ?? t.name;
			classBody.append(`'${t.resolved.unions[0].descriminator}': '${alias}',`, NL);
		}
		props.forEach(p => {
			classBody.append(generateProperty(p, fqn), NL);
		});
	});
	node.append('};', NL);

	return node;
}

function generateFromJSON(t: MResolvedRecordType, props: MResolvedBaseProperty[], fqn: (t: string, typeOnly: boolean) => string) {
	const node = new CompositeGeneratorNode();
	node.append(`export function ${t.name}FromJSON($value: Record<string, unknown>): ${t.name} {`, NL);
	node.indent(fBody => {
		props.forEach(p => {
			if (isMKeyProperty(p) || isMRevisionProperty(p)) {
				const propValue = fqn('propValue:../_type-utils.ts', false);
				const guard = builtinTypeGuard(p.type as MBuiltinType, fqn);
				fBody.append(`const ${p.name} = ${propValue}('${p.name}', $value, ${guard});`, NL);
			} else if (p.variant === 'inline-enum' || p.variant === 'builtin' || p.variant === 'enum' || p.variant === 'scalar') {
				let guard: string;

				if (isMBuiltinType(p.type)) {
					guard = builtinTypeGuard(p.type, fqn);
				} else if (isMInlineEnumType(p.type)) {
					guard = `is${t.name}_${toFirstUpper(p.name)}`;
				} else if (p.variant === 'enum') {
					guard = fqn(`is${p.type}:./${p.type}.ts`, false);
				} else if (p.variant === 'scalar') {
					guard = fqn('isString:../_type-utils.ts', false);
				} else {
					guard = 'err';
				}

				let allow = '';
				if (p.optional && p.nullable) {
					allow = ", 'optional_null'";
				} else if (p.optional) {
					allow = ", 'optional'";
				} else if (p.nullable) {
					allow = ", 'null'";
				}

				if (p.array) {
					const propListValue = fqn('propListValue:../_type-utils.ts', false);
					fBody.append(`const ${p.name} = ${propListValue}('${p.name}', $value, ${guard}`, allow, ');', NL);
				} else {
					const propValue = fqn('propValue:../_type-utils.ts', false);
					fBody.append(`const ${p.name} = ${propValue}('${p.name}', $value, ${guard}`, allow, ');', NL);
				}
			} else {
				let allow = '';
				if (p.optional && p.nullable) {
					allow = ", 'optional_null'";
				} else if (p.optional) {
					allow = ", 'optional'";
				} else if (p.nullable) {
					allow = ", 'null'";
				}

				const guard = fqn('isRecord:../_type-utils.ts', false);
				const map = fqn(`${p.type}FromJSON:./${p.type}.ts`, false);

				if (p.array) {
					const propMappedListValue = fqn('propMappedListValue:../_type-utils.ts', false);
					fBody.append(`const ${p.name} = ${propMappedListValue}('${p.name}', $value, ${guard}, ${map}`, allow, ');', NL);
				} else {
					const propMappedValue = fqn('propMappedValue:../_type-utils.ts', false);
					fBody.append(`const ${p.name} = ${propMappedValue}('${p.name}', $value, ${guard}, ${map}`, allow, ');', NL);
				}
			}
		});

		fBody.append('return {', NL);
		fBody.indent(pBody => {
			if (t.resolved.unions.length === 1) {
				const alias = (t.resolved.unions[0].descriminatorAliases ?? {})[t.name] ?? t.name;
				pBody.append(`'${t.resolved.unions[0].descriminator}': '${alias}',`, NL);
			}
			props.forEach(p => {
				pBody.append(`${p.name},`, NL);
			});
		});
		fBody.append('};', NL);
	});
	node.append('}', NL);
	return node;
}

function generateToJSON(t: MResolvedRecordType, props: MResolvedBaseProperty[], fqn: (t: string, typeOnly: boolean) => string) {
	const node = new CompositeGeneratorNode();
	node.append(`export function ${t.name}ToJSON($value: ${t.name}): Record<string, unknown> {`, NL);
	node.indent(mBody => {
		props.forEach(p => {
			if (isMKeyProperty(p) || isMRevisionProperty(p)) {
				mBody.append(`const ${p.name} = $value.${p.name};`, NL);
			} else if (p.variant === 'inline-enum' || p.variant === 'builtin' || p.variant === 'enum' || p.variant === 'scalar') {
				mBody.append(`const ${p.name} = $value.${p.name};`, NL);
			} else {
				const ToJSON = fqn(`${p.type}ToJSON:./${p.type}.ts`, false);
				mBody.append(`const ${p.name} = `);

				if (p.optional && p.nullable) {
					const isUndefined = fqn('isUndefined:../_type-utils.ts', false);
					const isNull = fqn('isNull:../_type-utils.ts', false);
					mBody.append(`${isUndefined}($value.${p.name}) || ${isNull}($value.${p.name}) ? $value.${p.name} : `);
				} else if (p.optional) {
					const isUndefined = fqn('isUndefined:../_type-utils.ts', false);
					mBody.append(`${isUndefined}($value.${p.name}) ? undefined : `);
				} else if (p.nullable) {
					const isNull = fqn('isNull:../_type-utils.ts', false);
					mBody.append(`${isNull}($value.${p.name}) ? null : `);
				}

				if (p.array) {
					mBody.append(`$value.${p.name}.map(${ToJSON});`, NL);
				} else {
					mBody.append(`${ToJSON}($value.${p.name});`, NL);
				}
			}
		});
		mBody.append(NL, 'return {', NL);
		mBody.indent(propBody => {
			if (t.resolved.unions.length > 0) {
				const alias = (t.resolved.unions[0].descriminatorAliases ?? {})[t.name] ?? t.name;
				propBody.append(`'${t.resolved.unions[0].descriminator}': '${alias}',`, NL);
			}
			props.forEach(p => {
				propBody.append(`${p.name},`, NL);
			});
		});
		mBody.append('};', NL);
	});
	node.append('}', NL);
	return node;
}

function generateTypeguard(t: MResolvedRecordType, props: MResolvedBaseProperty[], fqn: (t: string, typeOnly: boolean) => string) {
	const node = new CompositeGeneratorNode();
	node.append(`export function is${t.name}(value: unknown): value is ${t.name} {`, NL);
	node.indent(mBody => {
		const isRecord = fqn('isRecord:../_type-utils.ts', false);
		mBody.append(`return ${isRecord}(value) &&`, NL);
		mBody.indent(andBlock => {
			if (t.resolved.unions.length > 0) {
				const checkProp = fqn('checkProp:../_type-utils.ts', false);
				const createIsStringTypeGuard = fqn('createIsStringTypeGuard:../_type-utils.ts', false);
				const alias = (t.resolved.unions[0].descriminatorAliases ?? {})[t.name] ?? t.name;
				andBlock.append(`${checkProp}(value, '${t.resolved.unions[0].descriminator}', ${createIsStringTypeGuard}('${alias}')) &&`, NL);
			}
			props.forEach((p, idx, arr) => {
				if (idx > 0) {
					andBlock.append(' &&', NL);
				}

				if (isMKeyProperty(p) || isMRevisionProperty(p)) {
					const guard = builtinTypeGuard(p.type, fqn);
					const checkProp = fqn('checkProp:../_type-utils.ts', false);
					andBlock.append(`${checkProp}(value, '${p.name}', ${guard})`);
				} else {
					let guard: string;

					if (isMBuiltinType(p.type)) {
						guard = builtinTypeGuard(p.type, fqn);
					} else if (isMInlineEnumType(p.type)) {
						guard = `is${t.name}_${toFirstUpper(p.name)}`;
					} else if (p.variant === 'scalar') {
						guard = fqn('isString:../_type-utils.ts', false);
					} else {
						guard = fqn(`is${p.type}:./${p.type}.ts`, false);
					}

					if (p.nullable) {
						const nullGuard = fqn('isNull:../_type-utils.ts', false);
						andBlock.append('(', `${nullGuard}(value.${p.name}) || `);
					}

					const check = p.optional ? fqn('checkOptProp:../_type-utils.ts', false) : fqn('checkProp:../_type-utils.ts', false);
					if (p.array) {
						const createTypedArrayGuard = fqn('createTypedArrayGuard:../_type-utils.ts', false);
						andBlock.append(`${check}(value, '${p.name}', ${createTypedArrayGuard}(${guard}))`);
					} else {
						andBlock.append(`${check}(value, '${p.name}', ${guard})`);
					}

					if (p.nullable) {
						andBlock.append(')');
					}
					if (idx + 1 === arr.length) {
						andBlock.append(';');
					}
				}
			});
		});
	});
	node.append(NL, '}', NL);
	return node;
}

export function RecordTypePatch(t: MResolvedRecordType, props: MResolvedBaseProperty[], fqn: (t: string, typeOnly: boolean) => string) {
	const node = new CompositeGeneratorNode();
	node.append(`export type ${t.name}Patch = {`, NL);
	node.indent(classBody => {
		if (t.resolved.unions.length === 1) {
			const alias = (t.resolved.unions[0].descriminatorAliases ?? {})[t.name] ?? t.name;
			classBody.append(`'${t.resolved.unions[0].descriminator}': '${alias}-patch',`, NL);
		}
		props
			.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
			.forEach(p => {
				classBody.append(generateProperty(p, fqn), NL);
			});

		props.filter(isMResolvedProperty).forEach(p => {
			classBody.append(generatePatchProperty(p, fqn), NL);
		});
	});
	node.append('};', NL);
	return node;
}

export function ValueChangeTypes(prop: MResolvedPropery, fqn: (t: string, typeOnly: boolean) => string) {
	const type = fqn(`${prop.type}:./${prop.type}.ts`, true);
	const patchType = fqn(`${prop.type}Patch:./${prop.type}.ts`, true);

	if (prop.variant === 'union') {
		return toNode([
			//
			`type $${toFirstUpper(prop.name)}Patch = ${type} | ${patchType};`,
		]);
	}

	return toNode([
		//
		`type $${toFirstUpper(prop.name)}Patch = (${type} & { '@type': 'replace' }) | (${patchType} & { '@type': 'merge' });`,
	]);
}

export function ListChangeTypes(prop: MResolvedPropery, fqn: (t: string, typeOnly: boolean) => string) {
	let type: string = 'string';
	if (isMBuiltinType(prop.type)) {
		type = builtinToJSType(prop.type);
	} else if (prop.variant === 'scalar') {
		type = 'string';
	} else if (isMInlineEnumType(prop.type)) {
		type = toFirstUpper(prop.name) + 'Enum';
	} else if (prop.variant === 'enum' || prop.variant === 'record' || prop.variant === 'union') {
		type = fqn(`${prop.type}:./${prop.type}.ts`, true);
	} else {
		type = 'any';
	}

	const ListReplace = fqn('ListReplace:../_type-utils.ts', true);
	if (prop.variant === 'record' || prop.variant === 'union') {
		const patchType = (type = fqn(`${prop.type}Patch:./${prop.type}.ts`, true));
		const ListMergeAddUpdateRemove = fqn('ListMergeAddUpdateRemove:../_type-utils.ts', true);
		return toNode([
			//
			`type $${toFirstUpper(prop.name)}Replace = ${ListReplace}<${type}>;`,
			`type $${toFirstUpper(prop.name)}Merge = ${ListMergeAddUpdateRemove}<${type}, ${patchType},string>;`,
			`type $${toFirstUpper(prop.name)}Patch = $${toFirstUpper(prop.name)}Replace | $${toFirstUpper(prop.name)}Merge;`,
		]);
	}
	const ListMergeAddRemove = fqn('ListMergeAddRemove:../_type-utils.ts', true);
	return toNode([
		//
		`type $${toFirstUpper(prop.name)}Replace = ${ListReplace}<${type}>;`,
		`type $${toFirstUpper(prop.name)}Merge = ${ListMergeAddRemove}<${type}, ${type}>;`,
		`type $${toFirstUpper(prop.name)}Patch = $${toFirstUpper(prop.name)}Replace | $${toFirstUpper(prop.name)}Merge;`,
	]);
}

function generatePatchTypeguard(t: MResolvedRecordType, props: MResolvedBaseProperty[], fqn: (t: string, typeOnly: boolean) => string) {
	const node = new CompositeGeneratorNode();
	node.append(`export function is${t.name}Patch(value: unknown): value is ${t.name}Patch {`, NL);
	node.indent(mBody => {
		const isRecord = fqn('isRecord:../_type-utils.ts', false);
		mBody.append(`return ${isRecord}(value) &&`, NL);
		mBody.indent(andBlock => {
			if (t.resolved.unions.length > 0) {
				const checkProp = fqn('checkProp:../_type-utils.ts', false);
				const createIsStringTypeGuard = fqn('createIsStringTypeGuard:../_type-utils.ts', false);
				const alias = (t.resolved.unions[0].descriminatorAliases ?? {})[t.name] ?? t.name;
				andBlock.append(`${checkProp}(value, '${t.resolved.unions[0].descriminator}', ${createIsStringTypeGuard}('${alias}')) &&`, NL);
			}
			props
				.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
				.forEach(p => {
					if (!andBlock.isEmpty()) {
						andBlock.append(' &&', NL);
					}

					const guard = builtinTypeGuard(p.type as MBuiltinType, fqn);
					const checkProp = fqn('checkProp:../_type-utils.ts', false);
					andBlock.append(`${checkProp}(value, '${p.name}', ${guard})`);
				});
			props.filter(isMResolvedProperty).forEach((p, idx, arr) => {
				if (!andBlock.isEmpty()) {
					andBlock.append(' &&', NL);
				}

				let guard: string;

				if (isMBuiltinType(p.type)) {
					guard = builtinTypeGuard(p.type, fqn);
				} else if (isMInlineEnumType(p.type)) {
					guard = `is${t.name}_${toFirstUpper(p.name)}`;
				} else if (p.variant === 'scalar') {
					guard = fqn('isString:../_type-utils.ts', false);
				} else {
					guard = fqn(`is${p.type}:./${p.type}.ts`, false);
				}

				if (p.nullable || p.optional) {
					const nullGuard = fqn('isNull:../_type-utils.ts', false);
					andBlock.append('(', `${nullGuard}(value.${p.name}) || `);
				}

				const check = fqn('checkOptProp:../_type-utils.ts', false);
				if (p.array) {
					const createTypedArrayGuard = fqn('createTypedArrayGuard:../_type-utils.ts', false);
					andBlock.append(`${check}(value, '${p.name}', ${createTypedArrayGuard}(${guard}))`);
				} else {
					andBlock.append(`${check}(value, '${p.name}', ${guard})`);
				}

				if (p.nullable || p.optional) {
					andBlock.append(')');
				}
				if (idx + 1 === arr.length) {
					andBlock.append(';');
				}
			});
		});
	});
	node.append(NL, '}', NL);
	return node;
}

function generatePatchFromJSON(t: MResolvedRecordType, props: MResolvedBaseProperty[], fqn: (t: string, typeOnly: boolean) => string) {
	const node = new CompositeGeneratorNode();
	node.append(`export function ${t.name}PatchFromJSON($value: Record<string, unknown>): ${t.name}Patch {`, NL);
	node.indent(fBody => {
		props
			.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
			.forEach(p => {
				const guard = builtinTypeGuard(p.type as MBuiltinType, fqn);
				const propValue = fqn('propValue:../_type-utils.ts', false);
				fBody.append(`const ${p.name} = ${propValue}('${p.name}', $value, ${guard});`, NL);
			});
		props.filter(isMResolvedProperty).forEach(p => {
			if (p.variant === 'inline-enum' || p.variant === 'builtin' || p.variant === 'enum' || p.variant === 'scalar') {
				let guard: string;

				if (isMBuiltinType(p.type)) {
					guard = builtinTypeGuard(p.type, fqn);
				} else if (isMInlineEnumType(p.type)) {
					guard = `is${t.name}_${toFirstUpper(p.name)}`;
				} else if (p.variant === 'enum') {
					guard = fqn(`is${p.type}:./${p.type}.ts`, false);
				} else if (p.variant === 'scalar') {
					guard = fqn('isString:../_type-utils.ts', false);
				} else {
					guard = 'err';
				}

				let allow = ", 'optional'";
				if (p.nullable || p.optional) {
					allow = ", 'optional_null'";
				}

				if (p.array) {
					const propListValue = fqn('propListValue:../_type-utils.ts', false);
					fBody.append(`const ${p.name} = ${propListValue}('${p.name}', $value, ${guard}`, allow, ');', NL);
				} else {
					const propValue = fqn('propValue:../_type-utils.ts', false);
					fBody.append(`const ${p.name} = ${propValue}('${p.name}', $value, ${guard}`, allow, ');', NL);
				}
			} else {
				let allow = ", 'optional'";
				if (p.optional || p.nullable) {
					allow = ", 'optional_null'";
				}

				const guard = fqn('isRecord:../_type-utils.ts', false);
				const map = fqn(`${p.type}FromJSON:./${p.type}.ts`, false);

				if (p.array) {
					const propMappedListValue = fqn('propMappedListValue:../_type-utils.ts', false);
					fBody.append(`const ${p.name} = ${propMappedListValue}('${p.name}', $value, ${guard}, ${map}`, allow, ');', NL);
				} else {
					const propMappedValue = fqn('propMappedValue:../_type-utils.ts', false);
					fBody.append(`const ${p.name} = ${propMappedValue}('${p.name}', $value, ${guard}, ${map}`, allow, ');', NL);
				}
			}
		});

		fBody.append('return {', NL);
		fBody.indent(pBody => {
			if (t.resolved.unions.length === 1) {
				const alias = (t.resolved.unions[0].descriminatorAliases ?? {})[t.name] ?? t.name;
				pBody.append(`'${t.resolved.unions[0].descriminator}': '${alias}-patch',`, NL);
			}
			props
				.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
				.forEach(p => {
					pBody.append(`${p.name},`, NL);
				});
			props.filter(isMResolvedProperty).forEach(p => {
				pBody.append(`${p.name},`, NL);
			});
		});
		fBody.append('};', NL);
	});
	node.append('}', NL);
	return node;
}

function generatePatchToJSON(t: MResolvedRecordType, props: MResolvedBaseProperty[], fqn: (t: string, typeOnly: boolean) => string) {
	const node = new CompositeGeneratorNode();
	node.append(`export function ${t.name}PatchToJSON($value: ${t.name}Patch): Record<string, unknown> {`, NL);
	node.indent(mBody => {
		props
			.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
			.forEach(p => {
				mBody.append(`const ${p.name} = $value.${p.name};`, NL);
			});
		props.filter(isMResolvedProperty).forEach(p => {
			if (p.variant === 'inline-enum' || p.variant === 'builtin' || p.variant === 'enum' || p.variant === 'scalar') {
				mBody.append(`const ${p.name} = $value.${p.name};`, NL);
			} else {
				const ToJSON = fqn(`${p.type}ToJSON:./${p.type}.ts`, false);
				mBody.append(`const ${p.name} = `);

				if (p.optional || p.nullable) {
					const isUndefined = fqn('isUndefined:../_type-utils.ts', false);
					const isNull = fqn('isNull:../_type-utils.ts', false);
					mBody.append(`${isUndefined}($value.${p.name}) || ${isNull}($value.${p.name}) ? $value.${p.name} : `);
				} else {
					const isUndefined = fqn('isUndefined:../_type-utils.ts', false);
					mBody.append(`${isUndefined}($value.${p.name}) ? undefined : `);
				}

				if (p.array) {
					mBody.append(`$value.${p.name}.map(${ToJSON});`, NL);
				} else {
					mBody.append(`${ToJSON}($value.${p.name});`, NL);
				}
			}
		});
		mBody.append(NL, 'return {', NL);
		mBody.indent(propBody => {
			if (t.resolved.unions.length > 0) {
				const alias = (t.resolved.unions[0].descriminatorAliases ?? {})[t.name] ?? t.name;
				propBody.append(`'${t.resolved.unions[0].descriminator}': '${alias}-patch',`, NL);
			}
			props
				.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
				.forEach(p => {
					propBody.append(`${p.name},`, NL);
				});
			props.filter(isMResolvedProperty).forEach(p => {
				propBody.append(`${p.name},`, NL);
			});
		});
		mBody.append('};', NL);
	});
	node.append('}', NL);
	return node;
}

function generateProperty(prop: MResolvedBaseProperty, fqn: (t: string, typeOnly: boolean) => string) {
	const node = new CompositeGeneratorNode();
	if (isMKeyProperty(prop) || isMRevisionProperty(prop)) {
		const type = builtinToJSType(prop.type);
		node.append(`readonly ${prop.name}: ${type};`);
	} else {
		let type: string = 'string';
		if (isMBuiltinType(prop.type)) {
			type = builtinToJSType(prop.type);
		} else if (prop.variant === 'scalar') {
			type = 'string';
		} else if (isMInlineEnumType(prop.type)) {
			type = toFirstUpper(prop.name) + 'Enum';
		} else if (prop.variant === 'enum' || prop.variant === 'record' || prop.variant === 'union') {
			type = fqn(`${prop.type}:./${prop.type}.ts`, true);
		} else {
			type = 'any';
		}

		if (prop.array) {
			type = `${type}[]`;
		}

		if (prop.nullable) {
			type = `${type} | null`;
		}

		node.append(`readonly ${prop.name}${prop.optional ? '?' : ''}: ${type};`);
	}
	return node;
}

function generatePatchProperty(prop: MResolvedPropery, fqn: (t: string, typeOnly: boolean) => string) {
	let type: string = 'string';
	if (prop.array) {
		type = `$${toFirstUpper(prop.name)}Patch`;
	} else if (isMBuiltinType(prop.type)) {
		type = builtinToJSType(prop.type);
	} else if (prop.variant === 'scalar') {
		type = 'string';
	} else if (isMInlineEnumType(prop.type)) {
		type = toFirstUpper(prop.name) + 'Enum';
	} else if (prop.variant === 'enum') {
		type = fqn(`${prop.type}:./${prop.type}.ts`, true);
	} else if (prop.variant === 'record' || prop.variant === 'union') {
		type = `$${toFirstUpper(prop.name)}Patch`;
	} else {
		type = 'any';
	}

	if (prop.optional || prop.nullable) {
		type = `${type} | null`;
	}

	return toNode(
		[
			//
			`readonly ${prop.name}?: ${type};`,
		],
		false
	);
}

function builtinTypeGuard(type: MBuiltinType, fqn: (v: string, typeOnly: boolean) => string) {
	if (type === 'boolean') {
		return fqn('isBoolean:../_type-utils.ts', false);
	} else if (type === 'double' || type === 'float' || type === 'int' || type === 'long' || type === 'short') {
		return fqn('isNumber:../_type-utils.ts', false);
	} else {
		return fqn('isString:../_type-utils.ts', false);
	}
}
