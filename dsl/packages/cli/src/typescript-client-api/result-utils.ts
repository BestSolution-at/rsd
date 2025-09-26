import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import {
	generateCompilationUnit,
	TypescriptClientAPIGeneratorConfig,
	TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateResultUtils(config: TypescriptClientAPIGeneratorConfig) {
	const collector = new TypescriptImportCollector(config);
	const fqn = collector.importType.bind(collector);
	return {
		name: `_result-utils.ts`,
		content: toString(generateCompilationUnit(collector, generateResultUtilsContent(fqn)), '\t'),
		path: config.targetFolder,
	};
}

function generateResultUtilsContent(fqn: (t: string, typeOnly: boolean) => string) {
	fqn(`isRecord:./_type-utils.ts`, false);
	fqn(`checkProp:./_type-utils.ts`, false);
	fqn(`isString:./_type-utils.ts`, false);
	const node = new CompositeGeneratorNode();
	node.append(`const _Void: unique symbol = Symbol('Void');`, NL);
	node.append('export type VoidType = { _: typeof _Void };', NL);
	node.append('export const Void: VoidType = Object.freeze({ _: _Void });', NL, NL);

	node.append('export type NonUndefined = NonNullable<unknown> | null;', NL, NL);

	node.append('export type Ok<T extends NonUndefined> = readonly [ok: T, err: null];', NL);
	node.append('export type Err<E extends RSDError> = readonly [ok: undefined, err: E];', NL);
	node.append('export type Result<T extends NonUndefined, E extends RSDError> = Ok<T> | Err<E>;', NL, NL);

	node.append('export type RSDError<T extends string = string> = {', NL);
	node.indent(block => {
		block.append('_type: T;', NL);
	});
	node.append('};', NL, NL);

	node.append('export function isRSDError(value: unknown): value is RSDError {', NL);
	node.indent(block => {
		block.append(`return isRecord(value) && checkProp(value, '_type', isString);`, NL);
	});
	node.append('}', NL, NL);

	node.append(
		'export function isOk<T extends NonUndefined, E extends RSDError>(value: Result<T, E>): value is Ok<T> {',
		NL,
	);
	node.indent(mBody => {
		mBody.append('const [err] = value;', NL);
		mBody.append('return err === null;', NL);
	});
	node.append('}', NL, NL);

	node.append('export function OK<T extends NonUndefined>(value: T): Ok<T> {', NL);
	node.indent(mBody => {
		mBody.append('return [value, null];', NL);
	});
	node.append('}', NL, NL);

	node.append('export function ERR<E extends RSDError>(err: E): Err<E> {', NL);
	node.indent(mBody => {
		mBody.append('return [undefined, err];', NL);
	});
	node.append('}', NL, NL);

	node.append(
		'export async function $<X extends NonUndefined, Y extends RSDError>(source: Promise<Result<X, Y>>): Promise<X> {',
		NL,
	);
	node.indent(mBody => {
		mBody.append('const [o, r] = await source;', NL);
		mBody.append('if (r !== null) {', NL);
		mBody.indent(block => {
			block.append('throw r;', NL);
		});
		mBody.append('}', NL);
		mBody.append('throw o;', NL);
	});
	node.append('}', NL, NL);

	return node;
}
