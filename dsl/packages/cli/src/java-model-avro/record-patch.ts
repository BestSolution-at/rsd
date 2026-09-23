import { CompositeGeneratorNode, NL } from 'langium/generate';

import { JavaNativeTypeSubstitutes } from '../java-gen-utils.js';
import {
	MResolvedRecordType,
	MResolvedRSDModel,
	MResolvedBaseProperty,
	MResolvedPropery,
	allResolvedRecordProperties,
} from '../model.js';

export function generateRecordPatchContent(
	t: MResolvedRecordType,
	model: MResolvedRSDModel,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
): CompositeGeneratorNode {
	const node = new CompositeGeneratorNode();
	const Interface = fqn(`${interfaceBasePackage}.${t.name}`);
	const JsonObject = fqn('jakarta.json.JsonObject');

	const allProps = allResolvedRecordProperties(t);

	node.append(`public class ${t.name}PatchImpl extends _BaseDataImpl implements ${Interface}.Patch {`, NL);
	node.indent(classBody => {});
	node.append('}', NL);

	return node;
}
