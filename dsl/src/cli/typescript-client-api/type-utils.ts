import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { generateCompilationUnit, TypescriptClientAPIGeneratorConfig, TypescriptImportCollector } from '../typescript-gen-utils.js';
import { toNode } from '../util.js';

export function generateTypeUtils(config: TypescriptClientAPIGeneratorConfig) {
	const collector = new TypescriptImportCollector(config);
	const fqn = collector.importType.bind(collector);
	return {
		name: `_type-utils.ts`,
		content: toString(generateCompilationUnit(collector, generateTypeUtilsContent(fqn)), '\t'),
		path: `${config.targetFolder}`,
	};
}

function generateTypeUtilsContent(fqn: (t: string, typeOnly: boolean) => string) {
	const node = new CompositeGeneratorNode();
	node.append('type Guard<T> = (value: unknown) => value is T;', NL, NL);
	node.append(singleStatementFunction('export function isDefined<T>(value: T | undefined): value is T', 'return value !== undefined'), NL);
	node.append(singleStatementFunction('export function isUndefined<T>(value: T | undefined): value is undefined', 'return value === undefined'), NL);
	node.append(singleStatementFunction('export function isNotNull<T>(value: T | null): value is T', 'return value !== null'), NL);
	node.append(singleStatementFunction('export function isNull<T>(value: T | null): value is null', 'return value === null'), NL);
	node.append(singleStatementFunction('export function isValue<T>(value: T | undefined | null): value is T', 'return isNotNull(value) && isDefined(value)'), NL);
	node.append(singleStatementFunction('export function isBoolean(value: unknown): value is boolean', `return typeof value === 'boolean'`), NL);
	node.append(singleStatementFunction('export function isNumber(value: unknown): value is number', `return typeof value === 'number'`), NL);
	node.append(singleStatementFunction('export function isArray(value: unknown): value is Array<unknown>', 'return isNotNull(value) && isDefined(value) && Array.isArray(value)'), NL);
	node.append(singleStatementFunction('export function isRecord(value: unknown): value is Record<string, unknown>', `return isNotNull(value) && typeof value === 'object' && !isArray(value)`), NL);
	node.append(singleStatementFunction('export function isString(value: unknown): value is string', `return typeof value === 'string'`), NL);
	node.append(singleStatementFunction('export function isStringType<T extends string>(value: unknown, type: T): value is T', 'return value === type'), NL);
	node.append(singleStatementFunction('export function createIsStringTypeGuard<T extends string>(type: T): (v: unknown) => v is T', 'return v => isStringType(v, type)'), NL);
	node.append(singleStatementFunction('export function createTypedArrayGuard<T>(guard: (v: unknown) => v is T): (v: unknown) => v is T[]', 'return v => isTypedArray(v, guard)'), NL);
	node.append(isTypedArray(), NL);
	node.append(PropertyCheckErrorContent(), NL);
	node.append(propValue(), NL);
	node.append(propListValue(), NL);
	node.append(propMappedValue(), NL);
	node.append(propMappedListValue(), NL);
	node.append(checkProp(), NL);
	node.append(checkOptProp(), NL);
	node.append(checkListProp(), NL);
	node.append(ListReplace(), NL);
	node.append(ListMergeAddRemove(), NL);
	node.append(ListMergeAddUpdateRemove(), NL);
	node.append(createReplaceAddRemoveGuard(), NL);
	node.append(createReplaceAddUpdateRemoveGuard(), NL);
	node.append(createListReplaceGuard(), NL);
	node.append(isListReplace(), NL);
	node.append(createListMergeAddRemoveGuard(), NL);
	node.append(isListMergeAddRemove(), NL);
	node.append(createListMergeAddUpdateRemoveGuard(), NL);
	node.append(isListMergeAddUpdateRemove(), NL);
	node.append(ListReplaceFromJSON(), NL);
	node.append(ListReplaceToJSON(), NL);
	node.append(ListMergeAddRemoveFromJSON(), NL);
	node.append(ListMergeAddRemoveToJSON(), NL);
	node.append(ListMergeAddUpdateRemoveFromJSON(), NL);
	node.append(ListMergeAddUpdateRemoveToJSON(), NL);
	node.append(SetOrPatchChangeFromJSON(), NL);
	node.append(noopMap(), NL);
	node.append(JsonValue(), NL);
	node.append(JsonObject(), NL);
	node.append(JsonArray());
	return node;
}

function isTypedArray() {
	const node = new CompositeGeneratorNode();
	node.append('export function isTypedArray<T>(value: unknown, guard: (v: unknown) => v is T): value is Array<T> {', NL);
	node.indent(mBody => {
		mBody.append('if (isArray(value)) {', NL);
		mBody.indent(block => {
			block.append('if (value.length === 0) {', NL);
			block.indent(block2 => {
				block2.append('return true;', NL);
			});
			block.append('}', NL);
			block.append('return value.find(guard) === undefined;', NL);
		});
		mBody.append('}', NL);
		mBody.append('return false;', NL);
	});
	node.append('}', NL);
	return node;
}

function checkOptProp() {
	const node = new CompositeGeneratorNode();
	node.append('export function checkOptProp<T, K extends string>(value: Record<string, unknown>, property: K, typeCheck: (value: unknown) => value is T, valueCheck?: (value: T) => boolean): value is Record<K, T | undefined> {', NL);
	node.indent(mBody => {
		mBody.append('if (!(property in value)) {', NL);
		mBody.indent(block => {
			block.append('return true;', NL);
		});
		mBody.append('}', NL);
		mBody.append('return checkProp(value, property, typeCheck, valueCheck);', NL);
	});
	node.append('}', NL);
	return node;
}

function checkProp() {
	const node = new CompositeGeneratorNode();
	node.append('export function checkProp<T, K extends string>(value: Record<string, unknown>, property: K, typeCheck: (value: unknown) => value is T, valueCheck?: (value: T) => boolean): value is Record<K, T> {', NL);
	node.indent(mBody => {
		mBody.append('if (property in value) {', NL);
		mBody.indent(block => {
			block.append('const v = value[property];', NL);
			block.append('return (', NL);
			block.indent(block2 => {
				block2.append('v !== undefined && //', NL);
				block2.append('v !== null &&', NL);
				block2.append('typeCheck(v) &&', NL);
				block2.append('(valueCheck === undefined || valueCheck(v))', NL);
			});
			block.append(');', NL);
		});
		mBody.append('}', NL);
		mBody.append('return false;', NL);
	});
	node.append('}', NL);
	return node;
}

function propMappedListValue() {
	const node = new CompositeGeneratorNode();
	node.append(`export function propMappedListValue<T, U>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, map: (v: T) => U, allow?: 'optional' | 'null' | 'optional_null'): U[];`, NL);
	node.append(`export function propMappedListValue<T, U>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, map: (v: T) => U, allow?: 'optional' | 'null' | 'optional_null'): U[] | undefined | null {`, NL);
	node.indent(mBody => {
		mBody.append('const v = record[name];', NL);
		mBody.append(`if (allow === 'optional' || allow === 'optional_null') {`, NL);
		mBody.indent(block => {
			block.append('if (isUndefined(v)) {', NL);
			block.indent(block2 => {
				block2.append('return undefined;', NL);
			});
			block.append('}', NL);
		});
		mBody.append('}', NL);
		mBody.append(`if (allow === 'null' || allow === 'optional_null') {`, NL);
		mBody.indent(block => {
			block.append('if (isNull(v)) {', NL);
			block.indent(block2 => {
				block2.append('return null;', NL);
			});
			block.append('}', NL);
		});
		mBody.append('}', NL);
		mBody.append('if (isTypedArray(v, guard)) {', NL);
		mBody.indent(block => {
			block.append('return v.map(map);', NL);
		});
		mBody.append('}', NL);
		mBody.append('throw new PropertyCheckError(`Value in property ${name} is invalid`, name, record);', NL);
	});
	node.append('}', NL);
	return node;
}

function propMappedValue() {
	const node = new CompositeGeneratorNode();
	node.append('export function propMappedValue<T, U>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, map: (v: T) => U): U;', NL);
	node.append(`export function propMappedValue<T, U>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, map: (v: T) => U, allow: 'optional'): U | undefined;`, NL);
	node.append(`export function propMappedValue<T, U>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, map: (v: T) => U, allow: 'null'): U | null;`, NL);
	node.append(`export function propMappedValue<T, U>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, map: (v: T) => U, allow: 'optional_null'): U | undefined | null;`, NL);
	node.append(`export function propMappedValue<T, U>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, map: (v: T) => U, allow?: 'optional' | 'null' | 'optional_null'): U | undefined | null {`, NL);
	node.indent(mBody => {
		mBody.append('const v = record[name];', NL);
		mBody.append(`if (allow === 'optional' || allow === 'optional_null') {`, NL);
		mBody.indent(block => {
			block.append('if (isUndefined(v)) {', NL);
			block.indent(block2 => {
				block2.append('return undefined;', NL);
			});
			block.append('}', NL);
		});
		mBody.append('}', NL);
		mBody.append(`if (allow === 'null' || allow === 'optional_null') {`, NL);
		mBody.indent(block => {
			block.append('if (isNull(v)) {', NL);
			block.indent(block2 => {
				block2.append('return null;', NL);
			});
			block.append('}', NL);
		});
		mBody.append('}', NL);
		mBody.append('if (guard(v)) {', NL);
		mBody.indent(block => {
			block.append('return map(v);', NL);
		});
		mBody.append('}', NL);
		mBody.append('throw new PropertyCheckError(`Value in property ${name} is invalid`, name, record);', NL);
	});
	node.append('}', NL);
	return node;
}

function propListValue() {
	const node = new CompositeGeneratorNode();
	node.append('export function propListValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T): T[];', NL);
	node.append(`export function propListValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow: 'optional'): T[] | undefined;`, NL);
	node.append(`export function propListValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow: 'null'): T[] | null;`, NL);
	node.append(`export function propListValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow: 'optional_null'): T[] | undefined | null;`, NL);
	node.append(`export function propListValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow?: 'optional' | 'null' | 'optional_null'): T[] | undefined | null {`, NL);
	node.indent(mBody => {
		mBody.append('const v = record[name];', NL);
		mBody.append(`if (allow === 'optional' || allow == 'optional_null') {`, NL);
		mBody.indent(block => {
			block.append('if (isUndefined(v)) {', NL);
			block.indent(block2 => {
				block2.append('return undefined;', NL);
			});
			block.append('}', NL);
		});
		mBody.append('}', NL);
		mBody.append(`if (allow === 'null' || allow === 'optional_null') {`, NL);
		mBody.indent(block => {
			block.append('if (isNull(v)) {', NL);
			block.indent(block2 => {
				block2.append('return null;', NL);
			});
			block.append('}', NL);
		});
		mBody.append('}', NL);
		mBody.append('if (isTypedArray(v, guard)) {', NL);
		mBody.indent(block => {
			block.append('return v;', NL);
		});
		mBody.append('}', NL);
		mBody.append('throw new PropertyCheckError(`Value in property ${name} is invalid`, name, record);', NL);
	});
	node.append('}', NL);

	return node;
}

function propValue() {
	const node = new CompositeGeneratorNode();
	node.append('export function propValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T): T;', NL);
	node.append(`export function propValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow: 'optional'): T | undefined;`, NL);
	node.append(`export function propValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow: 'null'): T | null;`, NL);
	node.append(`export function propValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow: 'optional_null'): T | null | undefined;`, NL);

	node.append(`export function propValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow?: 'optional' | 'null' | 'optional_null'): T | null | undefined {`, NL);
	node.indent(mBody => {
		mBody.append('const v = record[name];', NL);
		mBody.append(`if (allow === 'optional' || allow === 'optional_null') {`, NL);
		mBody.indent(block => {
			block.append('if (isUndefined(v)) {', NL);
			block.indent(block2 => {
				block2.append('return undefined;', NL);
			});
			block.append('}', NL);
		});
		mBody.append('}', NL);

		mBody.append(`if (allow === 'null' || allow === 'optional_null') {`, NL);
		mBody.indent(block => {
			block.append('if (isNull(v)) {', NL);
			block.indent(block2 => {
				block2.append('return null;', NL);
			});
			block.append('}', NL);
		});
		mBody.append('}', NL);
		mBody.append('if (guard(v)) {', NL);
		mBody.indent(block => {
			block.append('return v;', NL);
		});
		mBody.append('}', NL, NL);
		mBody.append('throw new PropertyCheckError(`Value in property ${name} is invalid`, name, record);', NL);
	});
	node.append('}', NL);
	return node;
}

function PropertyCheckErrorContent() {
	const node = new CompositeGeneratorNode();
	node.append('export class PropertyCheckError extends Error {', NL);
	node.indent(clBody => {
		clBody.append('readonly property: string;', NL);
		clBody.append('readonly record: Record<string, unknown>;', NL, NL);
		clBody.append('constructor(message: string, property: string, record: Record<string, unknown>) {', NL);
		clBody.indent(mBody => {
			mBody.append('super(message);', NL);
			mBody.append('this.property = property;', NL);
			mBody.append('this.record = record;', NL);
		});
		clBody.append('}', NL);
	});
	node.append('}', NL);
	return node;
}

function checkListProp() {
	return toNode([
		//
		'function checkListProp<T, K extends string>(value: Record<string, unknown>, property: K, typeCheck: (value: unknown) => value is T, valueCheck?: (value: T) => boolean): value is Record<K, T[]> {',
		[
			//
			'return checkProp(',
			[
				//
				'value,',
				'property,',
				'isArray,',
				'arr =>',
				[
					//
					'arr.find(v => {',
					[
						//
						'if (typeCheck(v)) {',
						[
							//
							'if (valueCheck === undefined) {',
							['return false;'],
							'} else {',
							['return !valueCheck(v);'],
							'}',
						],
						'} else {',
						['return true;'],
						'}',
					],
					'}) === undefined',
				],
			],
			');',
		],
		'}',
	]);
}

function ListReplace() {
	return toNode([
		//
		'export type ListReplace<T> = {',
		[
			//
			`'@type': 'replace';`,
			'readonly elements: readonly T[];',
		],
		'};',
	]);
}

function ListMergeAddRemove() {
	return toNode([
		//
		'export type ListMergeAddRemove<A, R> = {',
		[
			//
			`'@type': 'merge';`,
			'readonly additions: readonly A[];',
			'readonly removals: readonly R[];',
		],
		'};',
	]);
}

function ListMergeAddUpdateRemove() {
	return toNode([
		//
		`export type ListMergeAddUpdateRemove<A, U, R> = {`,
		[
			//
			`'@type': 'merge';`,
			'readonly additions: readonly A[];',
			'readonly updates: readonly U[];',
			'readonly removals: readonly R[];',
		],
		'};',
	]);
}

function createReplaceAddRemoveGuard() {
	return toNode([
		//
		'export function createReplaceAddRemoveGuard<T>(guard: Guard<T>): Guard<ListReplace<T> | ListMergeAddRemove<T, T>> {',
		['return v => isListReplace(v, guard) || isListMergeAddRemove(v, guard, guard);'],
		'}',
	]);
}

function createReplaceAddUpdateRemoveGuard() {
	return toNode([
		//
		'export function createReplaceAddUpdateRemoveGuard<A, U, R>(guardReplaceAdd: Guard<A>, guardUpdate: Guard<U>, guardRemove: Guard<R>): Guard<ListReplace<A> | ListMergeAddUpdateRemove<A, U, R>> {',
		['return v => isListReplace(v, guardReplaceAdd) || isListMergeAddUpdateRemove(v, guardReplaceAdd, guardUpdate, guardRemove);'],
		'}',
	]);
}

function createListReplaceGuard() {
	return toNode([
		//
		'export function createListReplaceGuard<T>(guard: Guard<T>): Guard<ListReplace<T>> {',
		['return v => isListReplace(v, guard);'],
		'}',
	]);
}

function isListReplace() {
	return toNode([
		//
		'export function isListReplace<T>(value: unknown, typeCheck: Guard<T>): value is ListReplace<T> {',
		[
			//
			'return (',
			[
				//
				'isRecord(value) && //',
				`checkProp(value, '@type', isString, v => v === 'replace') &&`,
				`checkListProp(value, 'elements', typeCheck)`,
			],
			');',
		],
		'}',
	]);
}

function isListMergeAddRemove() {
	return toNode([
		//
		'export function isListMergeAddRemove<A, R>(value: unknown, addTypeCheck: Guard<A>, removeTypeCheck: Guard<R>): value is ListMergeAddRemove<A, R> {',
		[
			'return (',
			[
				//
				'isRecord(value) && //',
				`checkProp(value, '@type', isString, v => v === 'merge') &&`,
				`checkListProp(value, 'additions', addTypeCheck) &&`,
				`checkListProp(value, 'removals', removeTypeCheck)`,
			],
			');',
		],
		'}',
	]);
}

function createListMergeAddRemoveGuard() {
	return toNode([
		//
		'export function createListMergeAddRemoveGuard<A, R>(addGuard: Guard<A>, removeGuard: Guard<R>): Guard<ListMergeAddRemove<A, R>> {',
		['return v => isListMergeAddRemove(v, addGuard, removeGuard);'],
		'}',
	]);
}

function isListMergeAddUpdateRemove() {
	return toNode([
		//
		'export function isListMergeAddUpdateRemove<A, U, R>(value: unknown, addTypeCheck: Guard<A>, updateTypeCheck: Guard<U>, removeTypeCheck: Guard<R>): value is ListMergeAddUpdateRemove<A, U, R> {',
		[
			//
			'return (',
			[
				//
				'isRecord(value) && //',
				`checkProp(value, '@type', isString, v => v === 'merge') &&`,
				`checkListProp(value, 'additions', addTypeCheck) &&`,
				`checkListProp(value, 'updates', updateTypeCheck) &&`,
				`checkListProp(value, 'removals', removeTypeCheck)`,
			],
			');',
		],
		'}',
	]);
}

function createListMergeAddUpdateRemoveGuard() {
	return toNode([
		//
		'export function createListMergeAddUpdateRemoveGuard<A, U, R>(addGuard: Guard<A>, updateGuard: Guard<U>, removeGuard: Guard<R>): Guard<ListMergeAddUpdateRemove<A, U, R>> {',
		['return v => isListMergeAddUpdateRemove(v, addGuard, updateGuard, removeGuard);'],
		'}',
	]);
}

function ListReplaceFromJSON() {
	return toNode([
		//
		`export function ListReplaceFromJSON<T, U>(value: Record<string, unknown>, typeGuard: (v: unknown) => v is U, map: (v: U) => T): ListReplace<T> {`,
		[
			//
			`const elements = propMappedListValue('elements', value, typeGuard, map);`,
			'return {',
			[
				//
				`'@type': 'replace',`,
				'elements,',
			],
			'};',
		],
		'}',
	]);
}

function ListReplaceToJSON() {
	return toNode([
		//
		'export function ListReplaceToJSON<T>(value: ListReplace<T>, map: (value: T) => JsonValue) {',
		[
			//
			'const elements = value.elements.map(map);',
			'return {',
			[
				//
				`'@type': 'replace',`,
				'elements,',
			],
			'};',
		],
		'}',
	]);
}

function ListMergeAddRemoveFromJSON() {
	return toNode([
		//
		'export function ListMergeAddRemoveFromJSON<A, X, R, Y>(value: Record<string, unknown>, addTypeGuard: (v: unknown) => v is X, addMap: (v: X) => A, removeTypeGuard: (v: unknown) => v is Y, removeMap: (v: Y) => R): ListMergeAddRemove<A, R> {',
		[
			//
			`const additions = propMappedListValue('additions', value, addTypeGuard, addMap);`,
			`const removals = propMappedListValue('removals', value, removeTypeGuard, removeMap);`,
			'return {',
			[
				//
				`'@type': 'merge',`,
				'additions,',
				'removals,',
			],
			'};',
		],
		'}',
	]);
}

function ListMergeAddRemoveToJSON() {
	return toNode([
		//
		'export function ListMergeAddRemoveToJSON<A, R>(value: ListMergeAddRemove<A, R>, addMap: (value: A) => unknown, removeMap: (value: R) => unknown) {',
		[
			//
			'const additions = value.additions.map(addMap);',
			'const removals = value.removals.map(removeMap);',
			'return {',
			[
				//
				`'@type': 'merge',`,
				'additions,',
				'removals,',
			],
			'};',
		],
		'}',
	]);
}

function ListMergeAddUpdateRemoveFromJSON() {
	return toNode([
		//
		'export function ListMergeAddUpdateRemoveFromJSON<A, X, U, Y, R, Z>(value: Record<string, unknown>, addTypeGuard: (v: unknown) => v is X, addMap: (v: X) => A, updateTypeGuard: (v: unknown) => v is Y, updateMap: (v: Y) => U, removeTypeGuard: (v: unknown) => v is Z, removeMap: (v: Z) => R): ListMergeAddUpdateRemove<A, U, R> {',
		[
			//
			`const additions = propMappedListValue('additions', value, addTypeGuard, addMap);`,
			`const updates = propMappedListValue('updates', value, updateTypeGuard, updateMap);`,
			`const removals = propMappedListValue('removals', value, removeTypeGuard, removeMap);`,
			'return {',
			[
				//
				`'@type': 'merge',`,
				'additions,',
				'updates,',
				'removals,',
			],
			'};',
		],
		'}',
	]);
}

function ListMergeAddUpdateRemoveToJSON() {
	return toNode([
		//
		'export function ListMergeAddUpdateRemoveToJSON<A, U, R>(value: ListMergeAddUpdateRemove<A, U, R>, addMap: (value: A) => unknown, updateMap: (value: U) => unknown, removeMap: (value: R) => unknown) {',
		[
			//
			'const additions = value.additions.map(addMap);',
			'const updates = value.updates.map(updateMap);',
			'const removals = value.removals.map(removeMap);',
			'return {',
			[
				//
				`'@type': 'merge',`,
				'additions,',
				'updates,',
				'removals,',
			],
			'};',
		],
		'}',
	]);
}

function SetOrPatchChangeFromJSON() {
	return toNode([
		//
		'export function SetOrPatchChangeFromJSON<S, P>(value: Record<string, unknown>, setMapper: (value: Record<string, unknown>) => S, patchMapper: (value: Record<string, unknown>) => P): S | P {',
		[
			//
			`if (value['@type'] === 'replace') {`,
			['return setMapper(value);'],
			'}',
			'return patchMapper(value);',
		],
		'}',
	]);
}

function noopMap() {
	return toNode([
		//
		'export function noopMap<T>(v: T): T {',
		[
			//
			'return v;',
		],
		'}',
	]);
}

function JsonValue() {
	return toNode([
		//
		'type JsonValue =',
		[
			//
			'| undefined //',
			'| null',
			'| string',
			'| number',
			'| boolean',
			'| JsonObject',
			'| JsonArray;',
		],
	]);
}

function JsonObject() {
	return toNode([
		//
		'type JsonObject = {',
		[
			//
			'[x: string]: JsonValue;',
		],
		'};',
	]);
}

function JsonArray() {
	return toNode(['type JsonArray = Array<JsonValue>;']);
}

function singleStatementFunction(method: string, content: string) {
	const node = new CompositeGeneratorNode();
	node.append(method, ' {', NL);
	node.indent(mBody => {
		mBody.append(content, ';', NL);
	});
	node.append('}', NL);
	return node;
}
