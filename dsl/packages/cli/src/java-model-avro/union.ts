import { CompositeGeneratorNode, NL } from 'langium/generate';
import { JavaNativeTypeSubstitutes } from '../java-gen-utils.js';
import { MResolvedUnionType } from '../model.js';
import { toNodeTree } from '../util.js';

export function generateUnionContent(
	t: MResolvedUnionType,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const Interface = fqn(`${interfaceBasePackage}.${t.name}`);
	const GenericRecord = fqn('org.apache.avro.generic.GenericRecord');

	return toNodeTree(
		`
public abstract class ${t.name}DataImpl implements ${Interface}.Data {
	public static boolean isSupportedType(${GenericRecord} obj) {
		var type = obj.getSchema().getName();
		return switch (type) {
			%supportSwitchCases%
		};
	}

	public static ${Interface}.Data of(${GenericRecord} obj) {
		var type = obj.getSchema().getName();
		return switch (type) {
			%ofSwitchCases%
		};
	}
}
`,
		false,
		name => dynamicContentResolver(name, t),
	);
}

function dynamicContentResolver(name: string, t: MResolvedUnionType) {
	if (name === 'ofSwitchCases') {
		return ofSwitchCases(t);
	} else if (name === 'supportSwitchCases') {
		return supportSwitchCases(t);
	}
	return undefined;
}

function ofSwitchCases(t: MResolvedUnionType) {
	const ofSwitchCases = new CompositeGeneratorNode();
	t.resolved.records.forEach(r => {
		ofSwitchCases.append(`case "${r.name}" -> new ${r.name}DataImpl(obj);`, NL);
	});
	ofSwitchCases.append('default -> throw new IllegalArgumentException("Unexpected value: %s".formatted(type));');
	return ofSwitchCases;
}

function supportSwitchCases(t: MResolvedUnionType) {
	const supportSwitchCases = new CompositeGeneratorNode();
	t.resolved.records.forEach(r => {
		supportSwitchCases.append(`case "${r.name}" -> true;`, NL);
	});
	supportSwitchCases.append('default -> false;');
	return supportSwitchCases;
}
