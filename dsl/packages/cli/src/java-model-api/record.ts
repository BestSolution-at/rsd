import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
	allResolvedRecordProperties,
	isMInlineEnumType,
	isMKeyProperty,
	isMProperty,
	isMResolvedProperty,
	isMRevisionProperty,
	MResolvedBaseProperty,
	MResolvedPropery,
	MResolvedRecordType,
} from '../model.js';
import { generateInlineEnum } from './enum.js';
import { toFirstUpper, toNode } from '../util.js';
import {
	generateBuilderPropertyAccessor,
	generatePatchBuilderPropertyAccessor,
	generatePatchPropertyAccessor,
	generatePropertyAccessor,
} from './shared.js';
import { computeAPIType, JavaNativeTypeSubstitutes, primitiveToObject } from '../java-gen-utils.js';

export function generateRecordContent(
	t: MResolvedRecordType,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
): CompositeGeneratorNode {
	const allProps = allResolvedRecordProperties(t);

	const node = new CompositeGeneratorNode();
	node.append(`public interface ${t.name} {`, NL);
	node.indent(classBody => {
		if (t.patchable) {
			classBody.append(`public interface Builder {}`, NL);
		}
		classBody.append(generateInlineEnums(t));
		classBody.appendNewLineIf(classBody.contents.length > 0);
		classBody.append(generateData(t, allProps, nativeTypeSubstitutes, basePackageName, fqn));
		classBody.appendNewLine();
		classBody.append(generateDataBuilder(t, allProps, nativeTypeSubstitutes, basePackageName, fqn));
		if (t.patchable) {
			classBody.appendNewLine();
			classBody.append(generatePatch(t, allProps, nativeTypeSubstitutes, basePackageName, fqn));
			classBody.appendNewLine();
			classBody.append(generatePatchBuilder(t, allProps, nativeTypeSubstitutes, basePackageName, fqn));
		}
	});
	node.append('}', NL);
	return node;
}

function generateData(
	t: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const unions =
		t.resolved.unions.length > 0
			? ', ' + t.resolved.unions.map(u => fqn(`${basePackageName}.${u.name}`) + '.Data').join(', ')
			: '';
	const mixins =
		t.resolved.mixins.length > 0
			? ', ' + t.resolved.mixins.map(u => fqn(`${basePackageName}.mixins.${u.name}Mixin`)).join(', ')
			: '';
	const node = new CompositeGeneratorNode();
	node.append(`public interface Data extends _Base.BaseData, ${t.name}${mixins}${unions} {`, NL);
	node.indent(classBody => {
		classBody.append(
			...props.flatMap(p => [
				generatePropertyAccessor(p, nativeTypeSubstitutes, basePackageName, fqn, t.name !== p.resolved.owner.name),
				NL,
			]),
		);
	});
	node.append('}', NL);
	return node;
}

function generateDataBuilder(
	t: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const unions =
		t.resolved.unions.length > 0
			? ', ' + t.resolved.unions.map(u => fqn(`${basePackageName}.${u.name}`) + '.DataBuilder').join(', ')
			: '';

	const node = new CompositeGeneratorNode();
	if (t.patchable) {
		node.append(`public interface DataBuilder extends Builder, _Base.BaseDataBuilder<${t.name}.Data>${unions} {`, NL);
	} else {
		node.append(`public interface DataBuilder extends _Base.BaseDataBuilder<${t.name}.Data>${unions} {`, NL);
	}

	node.indent(classBody => {
		classBody.append(
			...props.flatMap(p => [generateBuilderPropertyAccessor(p, nativeTypeSubstitutes, basePackageName, fqn), NL]),
		);
	});
	node.append('}', NL);
	return node;
}

function generatePatch(
	t: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const unions =
		t.resolved.unions.length > 0
			? ', ' + t.resolved.unions.map(u => fqn(`${basePackageName}.${u.name}`) + '.Patch').join(', ')
			: '';
	const node = new CompositeGeneratorNode();
	node.append(`public interface Patch extends _Base.BaseData, ${t.name}${unions} {`, NL);
	node.indent(classBody => {
		classBody.append(ChangeTypes(props, nativeTypeSubstitutes, basePackageName, fqn));
		classBody.append(
			...props
				.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
				.flatMap(p => [
					generatePropertyAccessor(p, nativeTypeSubstitutes, basePackageName, fqn, t.name !== p.resolved.owner.name),
					NL,
				]),
		);
		classBody.append(
			...props
				.filter(isMResolvedProperty)
				.filter(p => !p.readonly)
				.flatMap(p => [generatePatchPropertyAccessor(p, nativeTypeSubstitutes, basePackageName, fqn), NL]),
		);
	});
	node.append('}', NL);
	return node;
}

function ChangeTypes(
	props: MResolvedBaseProperty[],
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	return toNode([
		...props
			.filter(isMResolvedProperty)
			.filter(p => !p.readonly)
			.filter(p => p.array)
			.flatMap(p => [
				ChangeType(p),
				SetChange(p, nativeTypeSubstitutes, basePackageName, fqn),
				ListChange(p, nativeTypeSubstitutes, basePackageName, fqn),
			]),
	]);
}

function ChangeType(prop: MResolvedPropery) {
	return toNode([`public interface ${toFirstUpper(prop.name)}Change {`, '}']);
}

function SetChange(
	prop: MResolvedPropery,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const type = primitiveToObject(computeAPIType(prop, nativeTypeSubstitutes, basePackageName, fqn, true));
	const prefix = toFirstUpper(prop.name);
	return toNode([`public interface ${prefix}SetChange extends ${prefix}Change, _Base.ListReplace<${type}> {`, '}']);
}

function ListChange(
	prop: MResolvedPropery,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const prefix = toFirstUpper(prop.name);

	if (prop.variant === 'record' || prop.variant === 'union') {
		const Type = fqn(`${basePackageName}.${prop.type}`);
		return toNode([
			`public interface ${prefix}MergeChange extends ${prefix}Change, _Base.ListMergeAddRemoveUpdate<${Type}.Data, ${Type}.Patch, String> {`,
			'}',
		]);
	}
	const Type = computeAPIType(prop, nativeTypeSubstitutes, basePackageName, fqn, true);
	return toNode([
		`public interface ${prefix}MergeChange extends ${prefix}Change, _Base.ListMergeAddRemove<${Type}, ${Type}> {`,
		'}',
	]);
}

function generatePatchBuilder(
	t: MResolvedRecordType,
	props: MResolvedBaseProperty[],
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const unions =
		t.resolved.unions.length > 0
			? ', ' + t.resolved.unions.map(u => fqn(`${basePackageName}.${u.name}`) + '.PatchBuilder').join(', ')
			: '';
	const node = new CompositeGeneratorNode();
	node.append(`public interface PatchBuilder extends Builder, _Base.BaseDataBuilder<${t.name}.Patch>${unions} {`, NL);
	node.indent(classBody => {
		classBody.append(
			...props
				.filter(p => isMKeyProperty(p) || isMRevisionProperty(p))
				.flatMap(p => [
					generateBuilderPropertyAccessor(p, nativeTypeSubstitutes, basePackageName, fqn, 'PatchBuilder'),
					NL,
				]),
		);
		classBody.append(
			...props
				.filter(isMResolvedProperty)
				.filter(p => !p.readonly)
				.flatMap(p => [generatePatchBuilderPropertyAccessor(p, nativeTypeSubstitutes, basePackageName, fqn), NL]),
		);
	});
	node.append('}', NL);
	return node;
}

function generateInlineEnums(t: MResolvedRecordType) {
	const node = new CompositeGeneratorNode();

	t.properties
		.filter(isMProperty)
		.filter(p => p.variant === 'inline-enum')
		.forEach(p => {
			const inlineEnum = p.type;
			if (isMInlineEnumType(inlineEnum)) {
				node.append(generateInlineEnum(inlineEnum, toFirstUpper(p.name)));
			}
		});
	node.appendNewLineIf(node.contents.length > 0);
	return node;
}
