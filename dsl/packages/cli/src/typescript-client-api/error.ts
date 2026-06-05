import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import { isMEnumType, isMRecordType, isMScalarType, isMUnionType, MResolvedError } from '../model.js';
import {
	builtinToType,
	builtinTypeGuard,
	generateCompilationUnit,
	TypescriptClientAPIGeneratorConfig,
	TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateErrors(
	errors: readonly MResolvedError[],
	config: TypescriptClientAPIGeneratorConfig,
): Artifact {
	const collector = new TypescriptImportCollector(config, 'Errors.ts');
	const fqn = collector.importType.bind(collector);
	return {
		name: 'Errors.ts',
		content: toString(generateCompilationUnit(collector, generateErrorsContent(errors, fqn)), '\t'),
		path: config.targetFolder,
	};
}

function generateErrorsContent(errors: readonly MResolvedError[], fqn: (t: string, typeOnly: boolean) => string) {
	const node = new CompositeGeneratorNode();
	node.append(
		`const errorTypes = new Set(['_Native', '_Status', ${errors.map(e => `'${e.name}'`).join(', ')}]);`,
		NL,
		NL,
	);
	node.append(
		`export type ErrorType = '_Native' | '_Status'${
			errors.length > 0 ? ' | ' : ''
		}${errors.map(e => `'${e.name}'`).join(' | ')};`,
		NL,
		NL,
	);
	const RSDError = fqn('RSDError:./_result-utils.ts', true);
	node.append(`export function isKnownRSDError(value: unknown): value is ${RSDError}<ErrorType> {`, NL);
	node.indent(mBody => {
		mBody.append('return (', NL);
		mBody.indent(andBlock => {
			const isRecord = fqn('isRecord:./_type-utils.ts', false);
			const isString = fqn('isString:./_type-utils.ts', false);
			const checkProp = fqn('checkProp:./_type-utils.ts', false);
			andBlock.append(`${isRecord}(value) &&`, NL);
			andBlock.append(`${checkProp}(value, '_type', ${isString}, errorTypes.has.bind(errorTypes))`, NL);
		});
		mBody.append(');', NL);
	});
	node.append('}', NL, NL);
	node.append(`export type NativeRSDError = RSDError<'_Native'> & {`, NL);
	node.indent(block => {
		block.append('error: Error;', NL);
		block.append('message: string;', NL);
	});
	node.append('};', NL, NL);
	node.append(`export type StatusRSDError = RSDError<'_Status'> & {`, NL);
	node.indent(block => {
		block.append('status: number;', NL);
		block.append('message: string;', NL);
	});
	node.append('};', NL, NL);

	errors.forEach(e => {
		const RSDError = fqn('RSDError:./_result-utils.ts', true);
		if (e.resolvedContentType) {
			if (
				isMRecordType(e.resolvedContentType) ||
				isMUnionType(e.resolvedContentType) ||
				isMEnumType(e.resolvedContentType)
			) {
				const typeName = e.resolvedContentType.name;
				const importedType = fqn(`${typeName}:./model/${typeName}.ts`, true);
				node.append(`export type ${e.name}Error = ${RSDError}<'${e.name}'> & { data: ${importedType} };`, NL);
			} else if (isMScalarType(e.resolvedContentType)) {
				node.append(`export type ${e.name}Error = ${RSDError}<'${e.name}'> & { data: string };`, NL);
			} else {
				const type = builtinToType(e.resolvedContentType, fqn, './model/');
				node.append(`export type ${e.name}Error = ${RSDError}<'${e.name}'> & { data: ${type} };`, NL);
			}
		} else {
			node.append(`export type ${e.name}Error = ${RSDError}<'${e.name}'> & { message: string };`, NL);
		}
	});
	node.append(NL);
	node.append(`export function isNativeError(value: unknown): value is NativeRSDError {`, NL);
	node.indent(mBody => {
		mBody.append(`return (`, NL);
		mBody.indent(block => {
			const isString = fqn('isString:./_type-utils.ts', false);
			const isRecord = fqn('isRecord:./_type-utils.ts', false);
			const checkProp = fqn('checkProp:./_type-utils.ts', false);

			block.append(`${isRecord}(value) &&`, NL);
			block.append(`${checkProp}(value, '_type', (v) => v === '_Native') &&`, NL);
			block.append(`${checkProp}(value, 'message', ${isString}) &&`, NL);
			block.append(`${checkProp}(value, 'error', (v) => v instanceof Error)`, NL);
		});
		mBody.append(`);`, NL);
	});
	node.append('}', NL, NL);
	node.append(`export function isStatusError(value: unknown): value is StatusRSDError {`, NL);
	node.indent(mBody => {
		mBody.append(`return (`, NL);
		mBody.indent(block => {
			const isString = fqn('isString:./_type-utils.ts', false);
			const isNumber = fqn('isNumber:./_type-utils.ts', false);
			const isRecord = fqn('isRecord:./_type-utils.ts', false);
			const checkProp = fqn('checkProp:./_type-utils.ts', false);

			block.append(`${isRecord}(value) &&`, NL);
			block.append(`${checkProp}(value, '_type', (v) => v === '_Status') &&`, NL);
			block.append(`${checkProp}(value, 'message', ${isString}) &&`, NL);
			block.append(`${checkProp}(value, 'status', ${isNumber})`, NL);
		});
		mBody.append(');', NL);
	});
	node.append('}', NL, NL);

	errors.forEach(e => {
		node.append(`export function is${e.name}Error(value: unknown): value is ${e.name}Error {`, NL);
		node.indent(mBody => {
			mBody.append('return (', NL);
			mBody.indent(andBlock => {
				const isRecord = fqn('isRecord:./_type-utils.ts', false);
				const checkProp = fqn('checkProp:./_type-utils.ts', false);
				andBlock.append(`${isRecord}(value) &&`, NL);
				andBlock.append(`${checkProp}(value, '_type', v => v === '${e.name}') &&`, NL);
				if (e.resolvedContentType) {
					if (
						isMRecordType(e.resolvedContentType) ||
						isMUnionType(e.resolvedContentType) ||
						isMEnumType(e.resolvedContentType)
					) {
						const typeName = e.resolvedContentType.name;
						const typeguard = fqn(`is${typeName}:./model/${typeName}.ts`, false);
						andBlock.append(`${checkProp}(value, 'data', ${typeguard})`, NL);
					} else if (isMScalarType(e.resolvedContentType)) {
						const isString = fqn('isString:./_type-utils.ts', false);
						andBlock.append(`${checkProp}(value, 'data', ${isString})`, NL);
					} else {
						const typeguard = builtinTypeGuard(e.resolvedContentType, fqn, './model/');
						andBlock.append(`${checkProp}(value, 'data', ${typeguard})`, NL);
					}
				} else {
					const isString = fqn('isString:./_type-utils.ts', false);

					andBlock.append(`${checkProp}(value, 'message', ${isString})`, NL);
				}
			});
			mBody.append(');', NL);
		});
		node.append('}', NL);
	});
	return node;
}
