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
		const GenericEnumSymbol = fqn('org.apache.avro.generic.GenericEnumSymbol');
		const GenericData = fqn('org.apache.avro.generic.GenericData');
		const HashMap = fqn('java.util.HashMap');
		const Map = fqn('java.util.Map');
		const Schema = fqn('org.apache.avro.Schema');
		classBody.append(
			`private static final ${Map}<String, ${GenericEnumSymbol}<?>> AVRO_ENUM_SYMBOL_CACHE = new ${HashMap}<>();`,
			NL,
			NL,
		);
		classBody.append(`private static ${GenericEnumSymbol}<?> getEnumSymbol(${Schema} schema, String enumValue) {`, NL);
		classBody.indent(mBody => {
			mBody.append('var cacheKey = schema.getName() + ":" + enumValue;', NL);
			mBody.append(
				`return AVRO_ENUM_SYMBOL_CACHE.computeIfAbsent(cacheKey, k -> new ${GenericData}.EnumSymbol(schema, enumValue));`,
				NL,
			);
		});
		classBody.append('}', NL, NL);
		classBody.append('public static <T extends Enum<T>> T fromAvro(GenericEnumSymbol<?> s, Class<T> enumType) {', NL);
		classBody.indent(mBody => {
			mBody.append('return Enum.valueOf(enumType, s.toString());', NL);
		});
		classBody.append('}', NL, NL);
		classBody.append(
			'public static <T extends Enum<T>> GenericEnumSymbol<?> toAvro(T value, _AvroSchema.AvroTypes avroType) {',
			NL,
		);
		classBody.indent(mBody => {
			mBody.append('return getEnumSymbol(_AvroSchema.getInstance().getTypeSchema(avroType), value.toString());', NL);
		});
		classBody.append('}', NL, NL);
		classBody.append('public static Object toAvro(Object value) {', NL);
		classBody.indent(mBody => {
			enums.forEach(enm => {
				const substitute = nativeTypeSubstitutes?.[enm.name];
				const type = substitute ? fqn(substitute.type) : fqn(`${interfaceBasePackage}.${enm.name}`);

				mBody.append(`if (value instanceof ${type}) {`, NL);
				mBody.indent(inner => {
					inner.append(`return ${enm.name}ToAvro((${type}) value);`, NL);
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
	const GenericEnumSymbol = fqn('org.apache.avro.generic.GenericEnumSymbol');

	node.append(`public static ${type} ${enm.name}FromAvro(${GenericEnumSymbol}<?> s) {`, NL);
	node.indent(mBody => {
		mBody.append(`return ${type}.valueOf(s.toString());`, NL);
	});
	node.append('}', NL);
	node.append(`public static ${GenericEnumSymbol}<?> ${enm.name}ToAvro(${type} value) {`, NL);
	node.indent(mBody => {
		mBody.append(
			`return getEnumSymbol(_AvroSchema.getInstance().getTypeSchema(_AvroSchema.AvroTypes.${enm.name}), value.toString());`,
			NL,
		);
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
	const GenericEnumSymbol = fqn('org.apache.avro.generic.GenericEnumSymbol');

	node.append(`public static ${type} ${enm.name}FromAvro(${GenericEnumSymbol}<?> s) {`, NL);
	node.indent(mBody => {
		if (substitute.fromJson.includes('.')) {
			const idx = substitute.fromJson.lastIndexOf('.');
			const type = fqn(substitute.fromJson.substring(0, idx));
			const method = substitute.fromJson.substring(idx + 1);
			mBody.append(`return ${type}.${method}(s.toString());`, NL);
		} else {
			mBody.append(`return ${type}.${substitute.fromJson}(s.toString());`, NL);
		}
	});
	node.append('}', NL);
	node.append(`public static ${GenericEnumSymbol}<?> ${enm.name}ToAvro(${type} value) {`, NL);
	node.indent(mBody => {
		if (substitute.toJson.includes('.')) {
			const idx = substitute.toJson.lastIndexOf('.');
			const type = fqn(substitute.toJson.substring(0, idx));
			const method = substitute.toJson.substring(idx + 1);
			mBody.append(`return ${type}.${method}(value);`, NL);
		} else {
			if (substitute.toJson.startsWith('::')) {
				mBody.append(
					`return getEnumSymbol(_AvroSchema.getInstance().getTypeSchema(_AvroSchema.AvroTypes.${enm.name}), ${type}.${substitute.toJson.substring(2)}(value));`,
					NL,
				);
			} else {
				mBody.append(
					`return getEnumSymbol(_AvroSchema.getInstance().getTypeSchema(_AvroSchema.AvroTypes.${enm.name}), value.${substitute.toJson}());`,
					NL,
				);
			}
		}
	});
	node.append('}', NL, NL);
	return node;
}
