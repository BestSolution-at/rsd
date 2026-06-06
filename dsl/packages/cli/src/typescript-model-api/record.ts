import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
	allResolvedRecordProperties,
	isMBuiltinType,
	isMInlineEnumType,
	isMKeyProperty,
	isMPropertyNoneInlineProperty,
	isMResolvedProperty,
	isMRevisionProperty,
	MBaseProperty,
	MInlineEnumType,
	MPropertyNoneInlineProperty,
	MResolvedBaseProperty,
	MResolvedPropery,
	MResolvedRecordType,
} from '../model.js';
import { toFirstUpper, toNode, toNodeTree } from '../util.js';
import {
	builtinFromJSON,
	builtinFromJsonTypeGuard,
	builtinToJSON,
	builtinToType,
	builtinTypeGuard,
} from '../typescript-gen-utils.js';

export function generateRecordContent(t: MResolvedRecordType, fqn: (t: string, typeOnly: boolean) => string) {
	const allProps = allResolvedRecordProperties(t);
	const node = new CompositeGeneratorNode();
	node.append(
		...allProps
			.filter(isMResolvedProperty)
			.filter(p => p.variant === 'inline-enum')
			.map(p => InlineEnumType(p.name, p.type)),
	);
	allProps
		.filter(p => isMInlineEnumType(p.type))
		.forEach(p => node.append(generateInlineMethods(t, p, p.type as MInlineEnumType)));
	node.appendNewLineIf(!node.isEmpty());
	node.append(RecordType(t, allProps, fqn), NL);
	node.append(RecordTypeguard(t, allProps, fqn), NL);
	node.append(FromJSON(t, allProps, fqn), NL);
	node.append(ToJSON(t, allProps, fqn), NL);

	if (t.patchable) {
		allProps
			.filter(isMResolvedProperty)
			.filter(p => !p.readonly)
			.filter(p => p.array)
			.forEach(p => {
				node.append(ListChangeTypes(p, fqn), NL);
			});

		const valueChange = new CompositeGeneratorNode();
		allProps
			.filter(isMResolvedProperty)
			.filter(p => !p.readonly)
			.filter(p => !p.array)
			.filter(p => isMPropertyNoneInlineProperty(p))
			.filter(p => p.variant === 'record' || p.variant === 'union')
			.forEach(p => valueChange.append(ValueChangeTypes(p, fqn)));
		valueChange.appendNewLineIf(!valueChange.isEmpty());
		node.append(valueChange);

		node.append(RecordTypePatch(t, allProps, fqn), NL);

		const valueChangeTypeGuard = new CompositeGeneratorNode();
		allProps
			.filter(isMResolvedProperty)
			.filter(p => !p.readonly)
			.filter(p => !p.array)
			.filter(p => isMPropertyNoneInlineProperty(p))
			.filter(p => p.variant === 'record')
			.forEach(p => valueChangeTypeGuard.append(ValueChangeTypeGuard(p, fqn)));
		valueChangeTypeGuard.appendNewLineIf(!valueChangeTypeGuard.isEmpty());
		node.append(valueChangeTypeGuard);

		node.append(RecordTypeguardPatch(t, allProps, fqn), NL);
		node.append(FromJSONPatch(t, allProps, fqn), NL);
		node.append(ToJSONPatch(t, allProps, fqn), NL);
	}

	return node;
}

function InlineEnumType(propName: string, type: MInlineEnumType) {
	return toNode([
		//
		`type ${toFirstUpper(propName)}Enum = ${type.entries.map(e => `'${e.name}'`).join(' | ')};`,
	]);
}

function generateInlineMethods(t: MResolvedRecordType, prop: MBaseProperty, type: MInlineEnumType) {
	const node = new CompositeGeneratorNode();
	node.append(NL, generateInlineTypeguard(t, prop, type), NL);
	node.append(generateInlineToJSON(t, prop), NL);
	node.append(generateInlineFromJSON(t, prop), NL);
	return node;
}

function generateInlineTypeguard(t: MResolvedRecordType, prop: MBaseProperty, type: MInlineEnumType) {
	const node = new CompositeGeneratorNode();
	node.append(
		`export function is${t.name}_${toFirstUpper(prop.name)}(value: unknown): value is ${toFirstUpper(prop.name)}Enum {`,
		NL,
	);
	node.indent(mBody => {
		mBody.append('return ');
		mBody.append(
			type.entries
				.map(e => {
					return `value === '${e.name}'`;
				})
				.join(' || '),
		);
		mBody.append(';', NL);
	});
	node.append('}', NL);
	return node;
}

function generateInlineToJSON(t: MResolvedRecordType, prop: MBaseProperty) {
	const node = new CompositeGeneratorNode();
	node.append(
		`export function ${t.name}_${toFirstUpper(prop.name)}ToJSON(value: ${toFirstUpper(prop.name)}Enum): string {`,
		NL,
	);
	node.indent(mBody => {
		mBody.append('return value;', NL);
	});
	node.append('}', NL);
	return node;
}

function generateInlineFromJSON(t: MResolvedRecordType, prop: MBaseProperty) {
	const node = new CompositeGeneratorNode();
	node.append(
		`export function ${t.name}_${toFirstUpper(prop.name)}FromJSON(value: string): ${toFirstUpper(prop.name)}Enum {`,
		NL,
	);
	node.indent(mBody => {
		const guardName = `is${t.name}_${toFirstUpper(prop.name)}`;
		mBody.append(`if (!${guardName}(value)) {`, NL);
		mBody.indent(cBody => {
			cBody.append(`throw new Error('Invalid value for ${toFirstUpper(prop.name)}');`, NL);
		});
		mBody.append('}', NL);
		mBody.append('return value;', NL);
	});
	node.append('}', NL);
	return node;
}

export function RecordType(
	t: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	fqn: (t: string, type: boolean) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append(`export type ${t.name} = {`, NL);
	node.indent(classBody => {
		if (t.resolved.unions.length === 1) {
			const alias = t.resolved.unions[0].descriminatorAliases?.[t.name] ?? t.name;
			classBody.append(`'${t.resolved.unions[0].descriminator}': '${alias}';`, NL);
		}
		props.forEach(p => {
			classBody.append(generateProperty(p, fqn), NL);
		});
	});
	node.append('};', NL);

	return node;
}

export function FromJSON(
	t: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	fqn: (t: string, typeOnly: boolean) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append(`export function ${t.name}FromJSON($value: Record<string, unknown>): ${t.name} {`, NL);
	node.indent(fBody => {
		props.forEach(p => {
			if (isMKeyProperty(p) || isMRevisionProperty(p)) {
				const propMappedValue = fqn('propMappedValue:../_type-utils.ts', false);
				const mapper = builtinFromJSON(p.type, fqn, './');
				const guard = builtinFromJsonTypeGuard(p.type, fqn);
				fBody.append(`const ${p.name} = ${propMappedValue}('${p.name}', $value, ${guard}, ${mapper});`, NL);
			} else {
				let allow = '';
				if (p.optional && p.nullable) {
					allow = ", 'optional_null'";
				} else if (p.optional) {
					allow = ", 'optional'";
				} else if (p.nullable) {
					allow = ", 'null'";
				}

				let guard = '';
				let fromJSON = '';
				if (isMBuiltinType(p.type)) {
					guard = builtinFromJsonTypeGuard(p.type, fqn);
					fromJSON = builtinFromJSON(p.type, fqn, './');
				} else if (p.variant === 'scalar') {
					guard = fqn('isString:../_type-utils.ts', false);
					fromJSON = fqn(`${p.type}FromJSON:./Scalars.ts`, false);
				} else if (p.variant === 'enum') {
					guard = fqn('isString:../_type-utils.ts', false);
					fromJSON = fqn(`${p.type}FromJSON:./${p.type}.ts`, false);
				} else if (isMInlineEnumType(p.type)) {
					guard = `is${t.name}_${toFirstUpper(p.name)}`;
					fromJSON = `${t.name}_${toFirstUpper(p.name)}FromJSON`;
				} else {
					guard = fqn('isRecord:../_type-utils.ts', false);
					fromJSON = fqn(`${p.type}FromJSON:./${p.type}.ts`, false);
				}

				if (fromJSON) {
					if (p.array) {
						const propMappedListValue = fqn('propMappedListValue:../_type-utils.ts', false);
						fBody.append(
							`const ${p.name} = ${propMappedListValue}('${p.name}', $value, ${guard}, ${fromJSON}`,
							allow,
							');',
							NL,
						);
					} else {
						const propMappedValue = fqn('propMappedValue:../_type-utils.ts', false);
						fBody.append(
							`const ${p.name} = ${propMappedValue}('${p.name}', $value, ${guard}, ${fromJSON}`,
							allow,
							');',
							NL,
						);
					}
				} else {
					if (p.array) {
						const propListValue = fqn('propListValue:../_type-utils.ts', false);
						fBody.append(`const ${p.name} = ${propListValue}('${p.name}', $value, ${guard}`, allow, ');', NL);
					} else {
						const propValue = fqn('propValue:../_type-utils.ts', false);
						fBody.append(`const ${p.name} = ${propValue}('${p.name}', $value, ${guard}`, allow, ');', NL);
					}
				}
			}
		});

		fBody.append('return {', NL);
		fBody.indent(pBody => {
			if (t.resolved.unions.length === 1) {
				const alias = t.resolved.unions[0].descriminatorAliases?.[t.name] ?? t.name;
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

export function ToJSON(
	t: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	fqn: (t: string, typeOnly: boolean) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append(`export function ${t.name}ToJSON($value: ${t.name}): Record<string, unknown> {`, NL);
	node.indent(mBody => {
		props.forEach(p => {
			if (isMKeyProperty(p) || isMRevisionProperty(p)) {
				const ToJSON = builtinToJSON(p.type, fqn, './');
				mBody.append(`const ${p.name} = ${ToJSON}($value.${p.name});`, NL);
			} else {
				mBody.append(`const ${p.name} = `);

				let ToJSON = '';

				if (isMBuiltinType(p.type)) {
					ToJSON = builtinToJSON(p.type, fqn, './');
				} else if (p.variant === 'enum') {
					ToJSON = fqn(`${p.type}ToJSON:./${p.type}.ts`, false);
				} else if (isMInlineEnumType(p.type)) {
					ToJSON = `${t.name}_${toFirstUpper(p.name)}ToJSON`;
				} else if (p.variant === 'scalar') {
					ToJSON = fqn(`${p.type}ToJSON:./Scalars.ts`, false);
				} else {
					ToJSON = fqn(`${p.type}ToJSON:./${p.type}.ts`, false);
				}

				if (ToJSON) {
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
				} else {
					mBody.append(`$value.${p.name};`, NL);
				}
			}
		});
		mBody.append(NL, 'return {', NL);
		mBody.indent(propBody => {
			if (t.resolved.unions.length > 0) {
				const alias = t.resolved.unions[0].descriminatorAliases?.[t.name] ?? t.name;
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

export function RecordTypeguard(
	t: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	fqn: (t: string, typeOnly: boolean) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append(`export function is${t.name}(value: unknown): value is ${t.name} {`, NL);
	node.indent(mBody => {
		const isRecord = fqn('isRecord:../_type-utils.ts', false);
		mBody.append(`return ${isRecord}(value) &&`, NL);
		mBody.indent(andBlock => {
			if (t.resolved.unions.length > 0) {
				const checkProp = fqn('checkProp:../_type-utils.ts', false);
				const createIsStringTypeGuard = fqn('createIsStringTypeGuard:../_type-utils.ts', false);
				const alias = t.resolved.unions[0].descriminatorAliases?.[t.name] ?? t.name;
				andBlock.append(
					`${checkProp}(value, '${t.resolved.unions[0].descriminator}', ${createIsStringTypeGuard}('${alias}')) &&`,
					NL,
				);
			}
			props.forEach((p, idx, arr) => {
				if (idx > 0) {
					andBlock.append(' &&', NL);
				}

				if (isMKeyProperty(p) || isMRevisionProperty(p)) {
					const guard = builtinTypeGuard(p.type, fqn, './');
					const checkProp = fqn('checkProp:../_type-utils.ts', false);
					andBlock.append(`${checkProp}(value, '${p.name}', ${guard})`);
				} else {
					let guard: string;

					if (isMBuiltinType(p.type)) {
						guard = builtinTypeGuard(p.type, fqn, './');
					} else if (isMInlineEnumType(p.type)) {
						guard = `is${t.name}_${toFirstUpper(p.name)}`;
					} else if (p.variant === 'scalar') {
						guard = fqn(`is${p.type}:./Scalars.ts`, false);
					} else {
						guard = fqn(`is${p.type}:./${p.type}.ts`, false);
					}

					const check = p.optional
						? fqn('checkOptProp:../_type-utils.ts', false)
						: fqn('checkProp:../_type-utils.ts', false);
					if (p.nullable) {
						const nullGuard = fqn('isNull:../_type-utils.ts', false);
						andBlock.append(`(${check}(value, '${p.name}', ${nullGuard}) || `);
					}

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

export function RecordTypePatch(
	t: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	fqn: (t: string, typeOnly: boolean) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append(`export type ${t.name}Patch = {`, NL);
	node.indent(classBody => {
		if (t.resolved.unions.length === 1) {
			const alias = t.resolved.unions[0].descriminatorAliases?.[t.name] ?? t.name;
			classBody.append(`'${t.resolved.unions[0].descriminator}': 'patch:${alias}';`, NL);
		}
		props
			.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
			.forEach(p => {
				classBody.append(generateProperty(p, fqn), NL);
			});

		props
			.filter(isMResolvedProperty)
			.filter(p => !p.readonly)
			.forEach(p => {
				classBody.append(generatePatchProperty(p, fqn), NL);
			});
	});
	node.append('};', NL);
	return node;
}

export function ValueChangeTypes(
	prop: MResolvedPropery & MPropertyNoneInlineProperty,
	fqn: (t: string, typeOnly: boolean) => string,
) {
	const type = fqn(`${prop.type}:./${prop.type}.ts`, true);
	const patchType = fqn(`${prop.type}Patch:./${prop.type}.ts`, true);

	if (prop.variant === 'union') {
		return toNode([
			//
			`type $${toFirstUpper(prop.name)}Patch = ${type} | ${patchType};`,
		]);
	}

	const Replace = fqn('Replace:../_type-utils.ts', true);
	const Merge = fqn('Merge:../_type-utils.ts', true);
	return toNode([
		//
		`type $${toFirstUpper(prop.name)}Patch = (${type} & ${Replace}) | (${patchType} & ${Merge});`,
	]);
}

export function ValueChangeTypeGuard(
	prop: MResolvedPropery & MPropertyNoneInlineProperty,
	fqn: (t: string, typeOnly: boolean) => string,
) {
	const isReplace = fqn('isReplace:../_type-utils.ts', false);
	const isMerge = fqn('isMerge:../_type-utils.ts', false);
	const isRecord = fqn(`is${prop.type}:./${prop.type}.ts`, false);
	const isRecordPatch = fqn(`is${prop.type}Patch:./${prop.type}.ts`, false);

	return toNodeTree(`
		function is${toFirstUpper(prop.name)}Patch(v: unknown): v is $${toFirstUpper(prop.name)}Patch {
			return (${isReplace}(v) && ${isRecord}(v)) || (${isMerge}(v) && ${isRecordPatch}(v));
		}
		`);
}

export function ListChangeTypes(prop: MResolvedPropery, fqn: (t: string, typeOnly: boolean) => string) {
	let type = 'string';
	if (isMBuiltinType(prop.type)) {
		type = builtinToType(prop.type, fqn, './');
	} else if (prop.variant === 'scalar') {
		type = fqn(`${prop.type}:./Scalars.ts`, true);
	} else if (isMInlineEnumType(prop.type)) {
		type = toFirstUpper(prop.name) + 'Enum';
	} else if (prop.variant === 'enum' || prop.variant === 'record' || prop.variant === 'union') {
		type = fqn(`${prop.type}:./${prop.type}.ts`, true);
	} else {
		type = 'any';
	}

	const ListReplace = fqn('ListReplace:../_type-utils.ts', true);
	if (prop.variant === 'record' || prop.variant === 'union') {
		const patchType = fqn(`${prop.type}Patch:./${prop.type}.ts`, true);
		const ListMergeAddUpdateRemove = fqn('ListMergeAddUpdateRemove:../_type-utils.ts', true);
		return toNode([
			//
			`type $${toFirstUpper(prop.name)}Replace = ${ListReplace}<${type}>;`,
			`type $${toFirstUpper(prop.name)}Merge = ${ListMergeAddUpdateRemove}<${type}, ${patchType}, string>;`,
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

export function RecordTypeguardPatch(
	t: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	fqn: (t: string, typeOnly: boolean) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append(`export function is${t.name}Patch(value: unknown): value is ${t.name}Patch {`, NL);
	node.indent(mBody => {
		const isRecord = fqn('isRecord:../_type-utils.ts', false);
		mBody.append(`return ${isRecord}(value) &&`, NL);
		mBody.indent(andBlock => {
			if (t.resolved.unions.length > 0) {
				const checkProp = fqn('checkProp:../_type-utils.ts', false);
				const createIsStringTypeGuard = fqn('createIsStringTypeGuard:../_type-utils.ts', false);
				const alias = t.resolved.unions[0].descriminatorAliases?.[t.name] ?? t.name;
				andBlock.append(
					`${checkProp}(value, '${t.resolved.unions[0].descriminator}', ${createIsStringTypeGuard}('patch:${alias}'))`,
				);
			}
			props
				.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
				.forEach(p => {
					if (!andBlock.isEmpty()) {
						andBlock.append(' &&', NL);
					}

					const guard = builtinTypeGuard(p.type, fqn, './');
					const checkProp = fqn('checkProp:../_type-utils.ts', false);
					andBlock.append(`${checkProp}(value, '${p.name}', ${guard})`);
				});
			props
				.filter(isMResolvedProperty)
				.filter(p => !p.readonly)
				.forEach((p, idx, arr) => {
					if (!andBlock.isEmpty()) {
						andBlock.append(' &&', NL);
					}

					let guard: string;

					if (isMBuiltinType(p.type)) {
						guard = builtinTypeGuard(p.type, fqn, './');
					} else if (isMInlineEnumType(p.type)) {
						guard = `is${t.name}_${toFirstUpper(p.name)}`;
					} else if (p.variant === 'scalar') {
						guard = fqn(`is${p.type}:./Scalars.ts`, false);
					} else if (p.variant === 'enum') {
						guard = fqn(`is${p.type}:./${p.type}.ts`, false);
					} else if (p.variant === 'union') {
						const typeGuard = fqn(`is${p.type}:./${p.type}.ts`, false);
						const patchGuard = fqn(`is${p.type}Patch:./${p.type}.ts`, false);
						guard = `v => ${typeGuard}(v) || ${patchGuard}(v)`;
					} else {
						guard = `is${toFirstUpper(p.name)}Patch`;
					}

					const check = fqn('checkOptProp:../_type-utils.ts', false);

					if (p.nullable || p.optional) {
						const nullGuard = fqn('isNull:../_type-utils.ts', false);
						andBlock.append(`(${check}(value, '${p.name}', ${nullGuard}) || `);
					}

					if (p.array) {
						if (p.variant === 'record' || p.variant === 'union') {
							guard = fqn(`is${p.type}:./${p.type}.ts`, false);
							const createReplaceAddUpdateRemoveGuard = fqn(
								'createReplaceAddUpdateRemoveGuard:../_type-utils.ts',
								false,
							);
							const patchGuard = fqn(`is${p.type}Patch:./${p.type}.ts`, false);
							const isStringGuard = fqn('isString:../_type-utils.ts', false);
							andBlock.append(
								`${check}(value, '${p.name}', ${createReplaceAddUpdateRemoveGuard}(${guard}, ${patchGuard}, ${isStringGuard}))`,
							);
						} else {
							const createReplaceAddRemoveGuard = fqn('createReplaceAddRemoveGuard:../_type-utils.ts', false);
							andBlock.append(`${check}(value, '${p.name}', ${createReplaceAddRemoveGuard}(${guard}))`);
						}
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

export function FromJSONPatch(
	t: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	fqn: (t: string, typeOnly: boolean) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append(`export function ${t.name}PatchFromJSON($value: Record<string, unknown>): ${t.name}Patch {`, NL);
	node.indent(fBody => {
		props
			.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
			.forEach(p => {
				const propMappedValue = fqn('propMappedValue:../_type-utils.ts', false);
				const mapper = builtinFromJSON(p.type, fqn, './');
				const guard = builtinFromJsonTypeGuard(p.type, fqn);
				fBody.append(`const ${p.name} = ${propMappedValue}('${p.name}', $value, ${guard}, ${mapper});`, NL);
			});
		props
			.filter(isMResolvedProperty)
			.filter(p => !p.readonly)
			.forEach(p => {
				if (p.variant === 'inline-enum' || p.variant === 'builtin' || p.variant === 'enum' || p.variant === 'scalar') {
					let guard: string;

					if (isMBuiltinType(p.type)) {
						guard = builtinFromJsonTypeGuard(p.type, fqn);
					} else if (isMInlineEnumType(p.type)) {
						guard = fqn('isString:../_type-utils.ts', false);
					} else if (p.variant === 'enum') {
						guard = fqn('isString:../_type-utils.ts', false);
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
						const propValue = fqn('propMappedValue:../_type-utils.ts', false);
						const isRecord = fqn('isRecord:../_type-utils.ts', false);
						let fromJSON: string;
						if (isMBuiltinType(p.type)) {
							fromJSON = builtinFromJSON(p.type, fqn, './');
						} else if (p.variant === 'scalar') {
							fromJSON = fqn(`${p.type}FromJSON:./Scalars.ts`, false);
						} else if (p.variant === 'enum') {
							fromJSON = fqn(`${p.type}FromJSON:./${p.type}.ts`, false);
						} else if (isMInlineEnumType(p.type)) {
							fromJSON = `${t.name}_${toFirstUpper(p.name)}FromJSON`;
						} else {
							throw new Error('Unsupported type');
						}
						const isListReplace = fqn('isListReplace:../_type-utils.ts', false);
						const ListMergeAddRemoveFromJSON = fqn('ListMergeAddRemoveFromJSON:../_type-utils.ts', false);
						const ListReplaceFromJSON = fqn('ListReplaceFromJSON:../_type-utils.ts', false);

						fBody.append(
							`const ${p.name} = ${propValue}('${p.name}', $value, ${isRecord}, v => ${isListReplace}(v, ${guard}) ? ${ListReplaceFromJSON}(v, ${guard}, ${fromJSON}) : ${ListMergeAddRemoveFromJSON}(v, ${guard}, ${fromJSON}, ${guard}, ${fromJSON})`,
							allow,
							');',
							NL,
						);
					} else {
						let fromJSON = '';
						if (isMBuiltinType(p.type)) {
							fromJSON = builtinFromJSON(p.type, fqn, './');
						} else if (p.variant === 'scalar') {
							fromJSON = fqn(`${p.type}FromJSON:./Scalars.ts`, false);
						} else if (isMInlineEnumType(p.type)) {
							fromJSON = `${t.name}_${toFirstUpper(p.name)}FromJSON`;
						} else if (p.variant === 'enum') {
							fromJSON = fqn(`${p.type}FromJSON:./${p.type}.ts`, false);
						}
						if (fromJSON) {
							const propValue = fqn('propMappedValue:../_type-utils.ts', false);
							fBody.append(
								`const ${p.name} = ${propValue}('${p.name}', $value, ${guard}, ${fromJSON}`,
								allow,
								');',
								NL,
							);
						} else {
							const propValue = fqn('propValue:../_type-utils.ts', false);
							fBody.append(`const ${p.name} = ${propValue}('${p.name}', $value, ${guard}`, allow, ');', NL);
						}
					}
				} else {
					let allow = ", 'optional'";
					if (p.optional || p.nullable) {
						allow = ", 'optional_null'";
					}

					const guard = fqn('isRecord:../_type-utils.ts', false);
					const map = fqn(`${p.type}FromJSON:./${p.type}.ts`, false);
					const patchMap = fqn(`${p.type}PatchFromJSON:./${p.type}.ts`, false);

					if (p.array) {
						const noopMap = fqn('noopMap:../_type-utils.ts', false);
						const isString = fqn('isString:../_type-utils.ts', false);

						const ListMergeAddUpdateRemoveFromJSON = fqn('ListMergeAddUpdateRemoveFromJSON:../_type-utils.ts', false);
						const isListReplace = fqn('isListReplace:../_type-utils.ts', false);
						const ListReplaceFromJSON = fqn('ListReplaceFromJSON:../_type-utils.ts', false);
						const propMappedListValue = fqn('propMappedValue:../_type-utils.ts', false);
						const map = fqn(`${p.type}FromJSON:./${p.type}.ts`, false);
						fBody.append(
							`const ${p.name} = ${propMappedListValue}('${p.name}', $value, ${guard}, v => ${isListReplace}(v, ${guard}) ? ${ListReplaceFromJSON}(v, ${guard}, ${map}) : ${ListMergeAddUpdateRemoveFromJSON}(v, ${guard}, ${map}, ${guard}, ${patchMap}, ${isString}, ${noopMap})`,
							allow,
							');',
							NL,
						);
					} else {
						if (p.variant === 'union') {
							const propMappedValue = fqn('propMappedValue:../_type-utils.ts', false);
							const orPatchMap = fqn(`${p.type}OrPatchFromJSON:./${p.type}.ts`, false);
							fBody.append(
								`const ${p.name} = ${propMappedValue}('${p.name}', $value, ${guard}, ${orPatchMap}`,
								allow,
								');',
								NL,
							);
						} else {
							const ReplaceOrMergeFromJSON = fqn('ReplaceOrMergeFromJSON:../_type-utils.ts', false);
							const propMappedValue = fqn('propMappedValue:../_type-utils.ts', false);
							fBody.append(
								`const ${p.name} = ${propMappedValue}('${p.name}', $value, ${guard}, v => ${ReplaceOrMergeFromJSON}(v, ${map}, ${patchMap})`,
								allow,
								');',
								NL,
							);
						}
					}
				}
			});

		fBody.append('return {', NL);
		fBody.indent(pBody => {
			if (t.resolved.unions.length === 1) {
				const alias = t.resolved.unions[0].descriminatorAliases?.[t.name] ?? t.name;
				pBody.append(`'${t.resolved.unions[0].descriminator}': 'patch:${alias}',`, NL);
			}
			props
				.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
				.forEach(p => {
					pBody.append(`${p.name},`, NL);
				});
			props
				.filter(isMResolvedProperty)
				.filter(p => !p.readonly)
				.forEach(p => {
					pBody.append(`${p.name},`, NL);
				});
		});
		fBody.append('};', NL);
	});
	node.append('}', NL);
	return node;
}

export function ToJSONPatch(
	t: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	fqn: (t: string, typeOnly: boolean) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append(`export function ${t.name}PatchToJSON($value: ${t.name}Patch): Record<string, unknown> {`, NL);
	node.indent(mBody => {
		props
			.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
			.forEach(p => {
				const toJSON = builtinToJSON(p.type, fqn, './');
				mBody.append(`const ${p.name} = ${toJSON}($value.${p.name});`, NL);
			});
		props
			.filter(isMResolvedProperty)
			.filter(p => !p.readonly)
			.forEach(p => {
				if (p.variant === 'builtin' || p.variant === 'inline-enum' || p.variant === 'enum' || p.variant === 'scalar') {
					let toJSON: string;

					if (isMBuiltinType(p.type)) {
						toJSON = builtinToJSON(p.type, fqn, './');
					} else if (p.variant === 'inline-enum') {
						toJSON = `${t.name}_${toFirstUpper(p.name)}ToJSON`;
					} else if (p.variant === 'scalar') {
						toJSON = fqn(`${p.type}ToJSON:./Scalars.ts`, false);
					} else {
						toJSON = fqn(`${p.type}ToJSON:./${p.type}.ts`, false);
					}

					if (toJSON) {
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
							const isListReplace = fqn('isListReplace:../_type-utils.ts', false);
							const ListReplaceToJSON = fqn('ListReplaceToJSON:../_type-utils.ts', false);
							const ListMergeAddRemoveFromJSON = fqn('ListMergeAddRemoveToJSON:../_type-utils.ts', false);
							let guard: string;

							if (isMBuiltinType(p.type)) {
								guard = builtinTypeGuard(p.type, fqn, './');
							} else if (isMInlineEnumType(p.type)) {
								guard = `is${t.name}_${toFirstUpper(p.name)}`;
							} else if (p.variant === 'scalar') {
								guard = fqn(`is${p.type}:./Scalars.ts`, false);
							} else {
								guard = fqn(`is${p.type}:./${p.type}.ts`, false);
							}

							mBody.append(
								`${isListReplace}($value.${p.name}, ${guard}) ? ${ListReplaceToJSON}($value.${p.name}, ${toJSON}) : ${ListMergeAddRemoveFromJSON}($value.${p.name}, ${toJSON}, ${toJSON});`,
								NL,
							);
						} else {
							mBody.append(`${toJSON}($value.${p.name});`, NL);
						}
					} else {
						mBody.append(`const ${p.name} = $value.${p.name};`, NL);
					}
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
						const ToJSONPatch = fqn(`${p.type}PatchToJSON:./${p.type}.ts`, false);
						const noopMap = fqn('noopMap:../_type-utils.ts', false);
						const ReplaceOrMergeToJSON = fqn('ReplaceOrMergeToJSON:../_type-utils.ts', false);
						const createListReplaceToJSON = fqn('createListReplaceToJSON:../_type-utils.ts', false);
						const createListMergeUpdateRemoveToJSON = fqn('createListMergeUpdateRemoveToJSON:../_type-utils.ts', false);

						const AddType = fqn(`${p.type}:./${p.type}.ts`, false);
						const UpdateType = fqn(`${p.type}Patch:./${p.type}.ts`, false);
						const RemoveType = 'string';
						const MergeType = `$${toFirstUpper(p.name)}Merge`;

						mBody.append(
							`${ReplaceOrMergeToJSON}($value.${p.name}, ${createListReplaceToJSON}(${ToJSON}), ${createListMergeUpdateRemoveToJSON}<${AddType}, ${UpdateType}, ${RemoveType}, ${MergeType}>(${ToJSON}, ${ToJSONPatch}, ${noopMap}));`,
							NL,
						);
					} else {
						if (p.variant === 'union') {
							const OrPatchToJSON = fqn(`${p.type}OrPatchToJSON:./${p.type}.ts`, false);
							mBody.append(`${OrPatchToJSON}($value.${p.name});`, NL);
						} else {
							const ToJSONPatch = fqn(`${p.type}PatchToJSON:./${p.type}.ts`, false);
							const ReplaceOrMergeToJSON = fqn('ReplaceOrMergeToJSON:../_type-utils.ts', false);
							mBody.append(`${ReplaceOrMergeToJSON}($value.${p.name}, ${ToJSON}, ${ToJSONPatch});`, NL);
						}
					}
				}
			});
		mBody.append(NL, 'return {', NL);
		mBody.indent(propBody => {
			if (t.resolved.unions.length > 0) {
				const alias = t.resolved.unions[0].descriminatorAliases?.[t.name] ?? t.name;
				propBody.append(`'${t.resolved.unions[0].descriminator}': 'patch:${alias}',`, NL);
			}
			props
				.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
				.forEach(p => {
					propBody.append(`${p.name},`, NL);
				});
			props
				.filter(isMResolvedProperty)
				.filter(p => !p.readonly)
				.forEach(p => {
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
		const type = builtinToType(prop.type, fqn, './');
		node.append(`readonly ${prop.name}: ${type};`);
	} else {
		let type = 'string';
		if (isMBuiltinType(prop.type)) {
			type = builtinToType(prop.type, fqn, './');
		} else if (prop.variant === 'scalar') {
			type = fqn(`${prop.type}:./Scalars.ts`, true);
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
	let type = 'string';
	if (prop.array) {
		type = `$${toFirstUpper(prop.name)}Patch`;
	} else if (isMBuiltinType(prop.type)) {
		type = builtinToType(prop.type, fqn, './');
	} else if (prop.variant === 'scalar') {
		type = fqn(`${prop.type}:./Scalars.ts`, true);
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
		false,
	);
}
