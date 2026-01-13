import { CompositeGeneratorNode, NL } from 'langium/generate';
import { isMKeyProperty, isMProperty, isMRevisionProperty, MResolvedBaseProperty, MResolvedPropery } from '../model.js';
import { computeAPIType, primitiveToObject } from '../java-gen-utils.js';
import { toFirstUpper } from '../util.js';

export function generatePropertyAccessor(
	property: MResolvedBaseProperty,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
	inherited = false,
) {
	const node = new CompositeGeneratorNode();
	if (inherited) {
		node.append('@Override', NL);
	}
	node.append(`public ${computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn)} ${property.name}();`, NL);
	return node;
}

export function generateBuilderPropertyAccessor(
	property: MResolvedBaseProperty,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
	returnType = 'DataBuilder',
) {
	const node = new CompositeGeneratorNode();
	node.append(
		`public ${returnType} ${property.name}(${computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn)} ${property.name});`,
		NL,
	);
	if (isMProperty(property) && !property.array && (property.variant === 'record' || property.variant === 'union')) {
		const Function = fqn('java.util.function.Function');
		node.append(
			NL,
			`public <T extends ${property.type}.DataBuilder> ${returnType} with${toFirstUpper(property.name)}(Class<T> clazz, ${Function}<T, ${property.type}.Data> block);`,
			NL,
		);
	}
	return node;
}

export function generatePatchPropertyAccessor(
	property: MResolvedBaseProperty,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	if (isMKeyProperty(property) || isMRevisionProperty(property)) {
		const type = computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn, true);
		node.append(`public ${type} ${property.name}();`, NL);
	} else if (
		property.variant === 'builtin' ||
		property.variant === 'enum' ||
		property.variant === 'inline-enum' ||
		property.variant === 'scalar'
	) {
		let type = primitiveToObject(computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn, true));

		if (property.array) {
			type = `${toFirstUpper(property.name)}Change`;
		}

		if (property.optional || property.nullable) {
			node.append(`public _Base.Nillable<${type}> ${property.name}();`, NL);
		} else {
			if (type === 'Integer') {
				const Optional = fqn('java.util.OptionalInt');
				node.append(`public ${Optional} ${property.name}();`, NL);
			} else if (type === 'Long') {
				const Optional = fqn('java.util.OptionalLong');
				node.append(`public ${Optional} ${property.name}();`, NL);
			} else if (type === 'Double') {
				const Optional = fqn('java.util.OptionalLong');
				node.append(`public ${Optional} ${property.name}();`, NL);
			} else {
				const Optional = fqn('java.util.Optional');
				node.append(`public ${Optional}<${type}> ${property.name}();`, NL);
			}
		}
	} else {
		let type = computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn, true);

		if (property.array) {
			type = `${toFirstUpper(property.name)}Change`;
		} else {
			type = `${basePackageName}.${property.type}`;
		}

		if (property.optional || property.nullable) {
			node.append(`public _Base.Nillable<${type}> ${property.name}();`, NL);
		} else {
			const Optional = fqn('java.util.Optional');
			node.append(`public ${Optional}<${type}> ${property.name}();`, NL);
		}
	}

	return node;
}

export function generatePatchBuilderPropertyAccessor(
	property: MResolvedPropery,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	if (
		property.variant === 'builtin' ||
		property.variant === 'enum' ||
		property.variant === 'inline-enum' ||
		property.variant === 'scalar'
	) {
		let type = computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn, true);
		if (property.nullable || property.optional || property.array) {
			type = primitiveToObject(type);
		}

		if (property.array) {
			node.append(
				`public PatchBuilder ${property.name}(Patch.${toFirstUpper(property.name)}Change ${property.name});`,
				NL,
			);
			node.append(`public PatchBuilder ${property.name}(List<${type}> additions, List<${type}> removals);`, NL);
			node.append(`public PatchBuilder ${property.name}(List<${type}> elements);`, NL);
		} else {
			node.append(`public PatchBuilder ${property.name}(${type} ${property.name});`, NL);
		}
	} else {
		if (!property.array) {
			const baseType = fqn(`${basePackageName}.${property.type}`);
			const Function = fqn('java.util.function.Function');
			node.append(`public PatchBuilder ${property.name}(${baseType} ${property.name});`, NL);
			node.append(
				`public <T extends ${baseType}.Builder> PatchBuilder with${toFirstUpper(property.name)}(Class<T> clazz, ${Function}<T, ${baseType}> block);`,
				NL,
			);
		} else {
			const type = computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn, true);
			const baseType = fqn(`${basePackageName}.${property.type}`);
			const prefix = toFirstUpper(property.name);
			node.append(`public PatchBuilder ${property.name}(Patch.${prefix}Change ${property.name});`, NL);
			const List = fqn('java.util.List');
			node.append(
				`public PatchBuilder ${property.name}(${List}<${type}> additions, ${List}<${baseType}.Patch> updates, ${List}<String> removals);`,
				NL,
			);
			node.append(`public PatchBuilder ${property.name}(List<${type}> elements);`, NL);
		}
	}
	return node;
}
