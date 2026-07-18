import { CompositeGeneratorNode, NL } from 'langium/generate';
import { JavaNativeTypeSubstitute, JavaNativeTypeSubstitutes } from '../java-gen-utils.js';
import { MResolvedScalarType, MScalarType } from '../model.js';

export function generateScalarSupportContent(
	scalars: readonly MResolvedScalarType[],
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append('public class _ScalarSupport {', NL);
	node.indent(classBody => {
		classBody.append('public static Object toJson(Object value) {', NL);
		classBody.indent(mBody => {
			scalars.forEach(scalar => {
				const substitute = nativeTypeSubstitutes?.[scalar.name];
				const type = substitute ? fqn(substitute.type) : fqn(`${interfaceBasePackage}.${scalar.name}`);

				mBody.append(`if (value instanceof ${type}) {`, NL);
				mBody.indent(inner => {
					inner.append(`return ${scalar.name}ToJson((${type}) value);`, NL);
				});
				mBody.append('}', NL);
			});
			mBody.append('return value;', NL);
		});
		classBody.append('}', NL, NL);
		scalars.forEach(scalar => {
			classBody.append(generateScalarMethods(scalar, nativeTypeSubstitutes, interfaceBasePackage, fqn));
		});
	});
	node.append('}', NL);

	return node;
}

export function generateScalarMethods(
	scalar: MScalarType,
	nativeTypeSubstitutes: JavaNativeTypeSubstitutes | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	if (nativeTypeSubstitutes && scalar.name in nativeTypeSubstitutes) {
		const substitute = nativeTypeSubstitutes[scalar.name];
		return generateSubstituteScalarMethods(scalar, substitute, fqn);
	} else {
		return generateDefaultScalarMethods(scalar, interfaceBasePackage, fqn);
	}
}

export function generateDefaultScalarMethods(
	scalar: MScalarType,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	const type = fqn(`${interfaceBasePackage}.${scalar.name}`);

	node.append(`public static ${type} ${scalar.name}FromJson(String s) {`, NL);
	node.indent(mBody => {
		mBody.append(`return ${type}.of(s);`, NL);
	});
	node.append('}', NL);
	node.append(`public static String ${scalar.name}ToJson(${type} value) {`, NL);
	node.indent(mBody => {
		mBody.append(`return value.toString();`, NL);
	});
	node.append('}', NL, NL);
	return node;
}

export function generateSubstituteScalarMethods(
	scalar: MScalarType,
	substitute: JavaNativeTypeSubstitute,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	const type = fqn(substitute.type);

	node.append(`public static ${type} ${scalar.name}FromJson(String s) {`, NL);
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
	node.append(`public static String ${scalar.name}ToJson(${type} value) {`, NL);
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
