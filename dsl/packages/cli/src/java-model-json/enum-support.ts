import { CompositeGeneratorNode, NL } from 'langium/generate';
import { JavaNativeTypeSubstitute, JavaNativeTypeSubstitutes } from '../java-gen-utils.js';
import { MResolvedEnumType } from '../model.js';

export function generateEnumSupportContent(
	enums: readonly MResolvedEnumType[],
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append('public class _EnumSupport {', NL);
	node.indent(classBody => {
		classBody.append('public static Object toJson(Object value) {', NL);
		classBody.indent(mBody => {
			enums.forEach(enm => {
				const substitute = nativeTypeSubstitutes?.[enm.name];
				const type = substitute ? fqn(substitute.type) : fqn(`${interfaceBasePackage}.${enm.name}`);

				mBody.append(`if (value instanceof ${type}) {`, NL);
				mBody.indent(inner => {
					inner.append(`return ${enm.name}ToJson((${type}) value);`, NL);
				});
				mBody.append('}', NL);
			});
			mBody.append('return value;', NL);
		});
		classBody.append('}', NL, NL);
		enums.forEach(enm => {
			classBody.append(generateEnumMethods(enm, nativeTypeSubstitutes, interfaceBasePackage, fqn));
		});
	});
	node.append('}', NL);

	return node;
}

export function generateEnumMethods(
	enm: MResolvedEnumType,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	if (nativeTypeSubstitutes && enm.name in nativeTypeSubstitutes) {
		const substitute = nativeTypeSubstitutes[enm.name];
		return generateSubstituteEnumMethods(enm, substitute, fqn);
	} else {
		return generateDefaultEnumMethods(enm, interfaceBasePackage, fqn);
	}
}

export function generateDefaultEnumMethods(
	enm: MResolvedEnumType,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	const type = fqn(`${interfaceBasePackage}.${enm.name}`);

	node.append(`public static ${type} ${enm.name}FromJson(String s) {`, NL);
	node.indent(mBody => {
		mBody.append(`return ${type}.valueOf(s);`, NL);
	});
	node.append('}', NL);
	node.append(`public static String ${enm.name}ToJson(${type} value) {`, NL);
	node.indent(mBody => {
		mBody.append(`return value.toString();`, NL);
	});
	node.append('}', NL, NL);
	return node;
}

export function generateSubstituteEnumMethods(
	enm: MResolvedEnumType,
	substitute: JavaNativeTypeSubstitute,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	const type = fqn(substitute.type);

	node.append(`public static ${type} ${enm.name}FromJson(String s) {`, NL);
	node.indent(mBody => {
		if (substitute.fromJson.includes('.')) {
			const idx = substitute.fromJson.lastIndexOf('.');
			const type = fqn(substitute.fromJson.substring(0, idx));
			const method = substitute.fromJson.substring(idx + 1);
			mBody.append(`return ${type}.${method}(s);`, NL);
		} else {
			mBody.append(`return ${type}.${substitute.fromJson}(s);`, NL);
		}
	});
	node.append('}', NL);
	node.append(`public static String ${enm.name}ToJson(${type} value) {`, NL);
	node.indent(mBody => {
		if (substitute.toJson.includes('.')) {
			const idx = substitute.toJson.lastIndexOf('.');
			const type = fqn(substitute.toJson.substring(0, idx));
			const method = substitute.toJson.substring(idx + 1);
			mBody.append(`return ${type}.${method}(value);`, NL);
		} else {
			if (substitute.toJson.startsWith('::')) {
				mBody.append(`return ${type}.${substitute.toJson.substring(2)}(value);`, NL);
			} else {
				mBody.append(`return value.${substitute.toJson}();`, NL);
			}
		}
	});
	node.append('}', NL, NL);
	return node;
}
