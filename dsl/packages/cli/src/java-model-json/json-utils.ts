import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { toNodeTree } from '../util.js';

type EncodingPlugin = {
	encodeFunction: (fqn: (t: string) => string) => CompositeGeneratorNode;
	decodeFunction: (fqn: (t: string) => string) => CompositeGeneratorNode;
	encodingFunctionName: string;
	decodingFunctionName: string;
	emptyObjectBytes: number[];
	encodeEmptyValueFunctionName: string;
	encodeEmptyObjectFunctionName: string;
};

const encodingPlugins: Record<string, EncodingPlugin> = {
	'application/vnd.msgpack': {
		encodeFunction: generateMsgPackEncodeValueFunction,
		decodeFunction: generateMsgPackDecodeValueFunction,
		encodingFunctionName: 'encodeMsgPackValue',
		decodingFunctionName: 'decodeMsgPackValue',
		emptyObjectBytes: [-128],
		encodeEmptyValueFunctionName: 'encodeEmptyMsgpackValue',
		encodeEmptyObjectFunctionName: 'encodeEmptyMsgpackObject',
	},
	'application/json': {
		encodeFunction: generateJsonEncodeValueFunction,
		decodeFunction: generateJsonDecodeValueFunction,
		encodingFunctionName: 'encodeJsonValue',
		decodingFunctionName: 'decodeJsonValue',
		emptyObjectBytes: [123, 125],
		encodeEmptyValueFunctionName: 'encodeEmptyJsonValue',
		encodeEmptyObjectFunctionName: 'encodeEmptyJsonObject',
	},
};

function generateJsonDecodeValueFunction(fqn: (t: string) => string): CompositeGeneratorNode {
	const InputStream = fqn('java.io.InputStream');
	const JsonValue = fqn('jakarta.json.JsonValue');
	const Json = fqn('jakarta.json.Json');
	const InputStreamReader = fqn('java.io.InputStreamReader');
	const StandardCharsets = fqn('java.nio.charset.StandardCharsets');
	return toNodeTree(`
private static ${JsonValue} decodeJsonValue(${InputStream} stream) {
	try (var reader = ${Json}.createReader(new ${InputStreamReader}(stream, ${StandardCharsets}.UTF_8))) {
		return reader.readValue();
	}
}`);
}

function generateJsonEncodeValueFunction(fqn: (t: string) => string): CompositeGeneratorNode {
	const StringWriter = fqn('java.io.StringWriter');
	const OutputStream = fqn('java.io.OutputStream');

	const Json = fqn('jakarta.json.Json');
	const JsonGenerator = fqn('jakarta.json.stream.JsonGenerator');
	const JsonValue = fqn('jakarta.json.JsonValue');
	return toNodeTree(`
private static byte[] encodeEmptyJsonValue() {
	return EMPTY_VALUE_BYTES;
}

private static byte[] encodeEmptyJsonObject() {
	return APPLICATION_JSON_EMPTY_OBJECT_BYTES;
}

private static byte[] encodeJsonValue(Object data) {
	${StringWriter} stringWriter = new ${StringWriter}();
	try (var generator = ${Json}.createGenerator(stringWriter)) {
		encodeJsonValue(generator, data);
	}
	return stringWriter.toString().getBytes();
}

private static void encodeJsonValue(${OutputStream} stream, Object data) {
	try (var generator = ${Json}.createGenerator(stream)) {
		encodeJsonValue(generator, data);
	}
}

private static void encodeJsonValue(${JsonGenerator} generator, Object data) {
	if (data == null) {
		generator.writeNull();
	} else if (data instanceof ${JsonValue} jsonValue) {
		generator.write(jsonValue);
	} else if (data instanceof String s) {
		generator.write(s);
	} else if (data instanceof Number n) {
		if (data instanceof Byte || data instanceof Short || data instanceof Integer || data instanceof Character) {
			generator.write(n.intValue());
		} else if (data instanceof Long) {
			generator.write(n.longValue());
		} else if (data instanceof Float || data instanceof Double) {
			generator.write(n.doubleValue());
		} else if (data instanceof BigInteger) {
			generator.write(((BigInteger) n).longValue());
		} else if (data instanceof BigDecimal) {
			generator.write(((BigDecimal) n).doubleValue());
		} else {
			throw new IllegalArgumentException("Unsupported number type: " + data.getClass());
		}
	} else if (data instanceof Boolean b) {
		generator.write(b);
	} else if (data instanceof _BaseDataImpl baseData) {
		encodeJsonValue(generator, baseData.data);
	} else if (data instanceof List<?> list) {
		generator.writeStartArray();
		for (Object item : list) {
			encodeJsonValue(generator, item);
		}
		generator.writeEnd();
	} else {
		generator.write(toString(data));
	}
}`);
}

function generateMsgPackDecodeValueFunction(fqn: (t: string) => string): CompositeGeneratorNode {
	const IOException = fqn('java.io.IOException');
	const InputStream = fqn('java.io.InputStream');
	const JsonValue = fqn('jakarta.json.JsonValue');
	const MsgpackJson = fqn('at.bestsolution.msgpack.json.MsgpackJson');
	const MessagePack = fqn('org.msgpack.core.MessagePack');
	const MessagePackException = fqn('org.msgpack.core.MessagePackException');
	const JsonException = fqn('jakarta.json.JsonException');
	return toNodeTree(`
private static ${JsonValue} decodeMsgPackValue(${InputStream} stream) {
	try {
		var msgpackJson = ${MsgpackJson}.builder()
				.build();
		var unpacker = ${MessagePack}.newDefaultUnpacker(stream);
		return msgpackJson.decode(unpacker);
	} catch (${MessagePackException} e) {
		throw new ${JsonException}(e.getMessage(), e);
	} catch (${IOException} e) {
		throw new IllegalStateException(e);
	}
}`);
}

function generateMsgPackEncodeValueFunction(fqn: (t: string) => string): CompositeGeneratorNode {
	fqn('org.msgpack.core.MessagePack');
	fqn('org.msgpack.core.MessagePacker');
	fqn('at.bestsolution.msgpack.json.MsgpackJson');
	return toNodeTree(`
// -----------------
private static byte[] encodeEmptyMsgpackValue() {
	return EMPTY_VALUE_BYTES;
}

private static byte[] encodeEmptyMsgpackObject() {
	return APPLICATION_VND_MSGPACK_EMPTY_OBJECT_BYTES;
}

private static byte[] encodeMsgPackValue(Object data) {
	try {
		var msgpackJson = MsgpackJson.builder()
				.build();
		var value = createJsonValue(data);
		var packer = MessagePack.newDefaultBufferPacker();
		encodeMsgPackValue(msgpackJson, packer, value);
		packer.flush();
		var result = packer.toByteArray();
		packer.close();
		return result;
	} catch (IOException e) {
		throw new IllegalStateException(e);
	}
}

private static void encodeMsgPackValue(OutputStream stream, Object data) {
	try {
		var msgpackJson = MsgpackJson.builder()
				.build();
		var value = createJsonValue(data);
		var packer = MessagePack.newDefaultPacker(stream);
		encodeMsgPackValue(msgpackJson, packer, value);
		packer.flush();
	} catch (IOException e) {
		throw new IllegalStateException(e);
	}

}

private static void encodeMsgPackValue(MsgpackJson generator, MessagePacker packer, Object data) throws IOException {
	generator.encode(packer, createJsonValue(data));
}
`);
}

export function generateJsonUtilsContent(
	fqn: (type: string) => string,
	modelApiPackage: string,
	contentTypeEncodings?: ('application/json' | 'application/vnd.msgpack')[],
) {
	contentTypeEncodings =
		contentTypeEncodings === undefined || contentTypeEncodings.length === 0
			? ['application/json']
			: contentTypeEncodings;
	const encodeValueMethods = new CompositeGeneratorNode();
	encodeValueMethods.append(
		'public static void encodeValue(OutputStream stream, Object data, String contentType, TypeInfo<?> typeInfo) {',
		NL,
	);
	encodeValueMethods.indent(mBody => {
		if (contentTypeEncodings.length > 1) {
			mBody.append('switch (contentType) {', NL);
			mBody.indent(switchBody => {
				contentTypeEncodings.forEach(enc => {
					switchBody.append(`case "${enc}":`, NL);
					switchBody.indent(casBody => {
						casBody.append(`${encodingPlugins[enc].encodingFunctionName}(stream, data);`, NL);
						casBody.append('break;', NL);
					});
				});
				switchBody.append('default:', NL);
				switchBody.indent(defBody => {
					defBody.append(
						`throw new IllegalArgumentException("Unsupported content type: %".formatted(contentType));`,
						NL,
					);
				});
			});
			mBody.append('}', NL);
		} else {
			mBody.append(`if ("${contentTypeEncodings[0]}".equals(contentType)) {`, NL);
			mBody.indent(blockBody => {
				blockBody.append(`${encodingPlugins[contentTypeEncodings[0]].encodingFunctionName}(stream, data);`, NL);
				blockBody.append('return;', NL);
			});
			mBody.append('}', NL);
			mBody.append(`throw new IllegalArgumentException("Unsupported content type: ".formatted(contentType));`, NL);
		}
	});
	encodeValueMethods.append('}', NL, NL);
	encodeValueMethods.append(
		'public static byte[] encodeValue(Object data, String contentType, TypeInfo<?> typeInfo) {',
		NL,
	);
	encodeValueMethods.indent(mBody => {
		if (contentTypeEncodings.length > 1) {
			mBody.append('return switch (contentType) {', NL);
			mBody.indent(switchBody => {
				contentTypeEncodings.forEach(enc => {
					switchBody.append(`case "${enc}" -> ${encodingPlugins[enc].encodingFunctionName}(data);`, NL);
				});
				switchBody.append(
					'default -> throw new IllegalArgumentException("Unsupported content type: ".formatted(contentType));',
					NL,
				);
			});
			mBody.append('};', NL);
		} else {
			mBody.append(`if ("${contentTypeEncodings[0]}".equals(contentType)) {`, NL);
			mBody.indent(blockBody => {
				blockBody.append(`return ${encodingPlugins[contentTypeEncodings[0]].encodingFunctionName}(data);`, NL);
			});
			mBody.append('}', NL);
			mBody.append(`throw new IllegalArgumentException("Unsupported content type: ".formatted(contentType));`, NL);
		}
	});
	encodeValueMethods.append('}', NL);
	encodeValueMethods.appendNewLine();
	encodeValueMethods.append(`public static byte[] encodeEmptyValue(String contentType) {`, NL);
	encodeValueMethods.indent(mBody => {
		if (contentTypeEncodings.length > 1) {
			mBody.append('return switch (contentType) {', NL);
			mBody.indent(switchBody => {
				contentTypeEncodings.forEach(enc => {
					switchBody.append(`case "${enc}" -> ${encodingPlugins[enc].encodeEmptyValueFunctionName}();`, NL);
				});
				switchBody.append(
					'default -> throw new IllegalArgumentException("Unsupported content type: ".formatted(contentType));',
					NL,
				);
			});
			mBody.append('};', NL);
		} else {
			mBody.append(`if ("${contentTypeEncodings[0]}".equals(contentType)) {`, NL);
			mBody.indent(blockBody => {
				blockBody.append(`return ${encodingPlugins[contentTypeEncodings[0]].encodeEmptyValueFunctionName}();`, NL);
			});
			mBody.append('}', NL);
			mBody.append(`throw new IllegalArgumentException("Unsupported content type: ".formatted(contentType));`, NL);
		}
	});
	encodeValueMethods.append('}', NL);
	encodeValueMethods.appendNewLine();
	encodeValueMethods.append(`public static byte[] encodeEmptyObject(String contentType) {`, NL);
	encodeValueMethods.indent(mBody => {
		if (contentTypeEncodings.length > 1) {
			mBody.append('return switch (contentType) {', NL);
			mBody.indent(switchBody => {
				contentTypeEncodings.forEach(enc => {
					switchBody.append(`case "${enc}" -> ${encodingPlugins[enc].encodeEmptyObjectFunctionName}();`, NL);
				});
				switchBody.append(
					'default -> throw new IllegalArgumentException("Unsupported content type: ".formatted(contentType));',
					NL,
				);
			});
			mBody.append('};', NL);
		} else {
			mBody.append(`if ("${contentTypeEncodings[0]}".equals(contentType)) {`, NL);
			mBody.indent(blockBody => {
				blockBody.append(`return ${encodingPlugins[contentTypeEncodings[0]].encodeEmptyObjectFunctionName}();`, NL);
			});
			mBody.append('}', NL);
			mBody.append(`throw new IllegalArgumentException("Unsupported content type: ".formatted(contentType));`, NL);
		}
	});
	encodeValueMethods.append('}', NL);

	const encodeFunctions = new CompositeGeneratorNode();
	encodeFunctions.indent(content => {
		content.append(encodeValueMethods, NL);
		contentTypeEncodings.forEach(enc => {
			content.append(encodingPlugins[enc].encodeFunction(fqn), NL, NL);
		});
	});

	const emptyObjectValues = new CompositeGeneratorNode();
	emptyObjectValues.indent(content => {
		contentTypeEncodings.forEach(enc => {
			content.append(
				`private static byte[] ${enc.replaceAll('/', '_').replaceAll('.', '_').toUpperCase()}_EMPTY_OBJECT_BYTES = new byte[] { ${encodingPlugins[enc].emptyObjectBytes.join(', ')} };`,
				NL,
			);
		});
	});

	const JsonValue = fqn('jakarta.json.JsonValue');
	const InputStream = fqn('java.io.InputStream');

	const decodeValueMethods = new CompositeGeneratorNode();
	decodeValueMethods.append(
		`public static ${JsonValue} decodeValue(${InputStream} stream, String contentType, TypeInfo<?> typeInfo) {`,
		NL,
	);
	decodeValueMethods.indent(mBody => {
		if (contentTypeEncodings.length > 1) {
			mBody.append('return switch (contentType) {', NL);
			mBody.indent(switchBody => {
				contentTypeEncodings.forEach(enc => {
					switchBody.append(`case "${enc}" -> ${encodingPlugins[enc].decodingFunctionName}(stream);`, NL);
				});
				switchBody.append(
					'default -> throw new IllegalArgumentException("Unsupported content type: ".formatted(contentType));',
					NL,
				);
			});
			mBody.append('};', NL);
		} else {
			mBody.append(`if ("${contentTypeEncodings[0]}".equals(contentType)) {`, NL);
			mBody.indent(blockBody => {
				blockBody.append(`return ${encodingPlugins[contentTypeEncodings[0]].decodingFunctionName}(stream);`, NL);
			});
			mBody.append('}', NL);
			mBody.append(`throw new IllegalArgumentException("Unsupported content type: ".formatted(contentType));`, NL);
		}
	});
	decodeValueMethods.append('}', NL, NL);

	const decodeFunctions = new CompositeGeneratorNode();
	decodeFunctions.indent(content => {
		content.append(decodeValueMethods, NL);
		contentTypeEncodings.forEach(enc => {
			content.append(encodingPlugins[enc].decodeFunction(fqn), NL, NL);
		});
	});

	fqn('java.io.IOException');
	fqn('java.io.IOException');
	fqn('java.io.InputStream');
	fqn('java.io.OutputStream');
	fqn('java.io.StringWriter');
	fqn('java.math.BigDecimal');
	fqn('java.math.BigInteger');
	fqn('java.nio.file.Files');
	fqn('java.nio.file.Path');
	fqn('java.time.LocalDate');
	fqn('java.time.LocalDateTime');
	fqn('java.time.LocalTime');
	fqn('java.time.ZonedDateTime');
	fqn('java.time.format.DateTimeFormatter');
	fqn('java.util.function.Function');
	fqn('java.util.List');
	fqn('java.util.Optional');
	fqn('java.util.OptionalDouble');
	fqn('java.util.OptionalInt');
	fqn('java.util.OptionalLong');
	fqn('java.util.stream.Collector');
	fqn('java.util.stream.Stream');

	fqn('jakarta.json.Json');
	fqn('jakarta.json.JsonArray');
	fqn('jakarta.json.JsonArrayBuilder');
	fqn('jakarta.json.JsonNumber');
	fqn('jakarta.json.JsonObject');
	fqn('jakarta.json.JsonString');
	fqn('jakarta.json.JsonValue');
	fqn('jakarta.json.stream.JsonGenerator');
	fqn('jakarta.json.JsonException');

	fqn(`${modelApiPackage}._Base`);

	return toNodeTree(`
public class _JsonUtils {
	public static class TypeInfo<T> {
		public final Class<T> type;
		public final boolean optional;
		public final boolean nullable;
		public final boolean multi;

		public static <T> TypeInfo<T> value(Class<T> type) {
			return new TypeInfo<>(type, false, false, false);
		}

		public static <T> TypeInfo<T> list(Class<T> type) {
			return new TypeInfo<>(type, false, false, true);
		}

		public static <T> TypeInfo<T> nullable(Class<T> type) {
			return new TypeInfo<>(type, false, true, false);
		}

		public static <T> TypeInfo<T> nullableList(Class<T> type) {
			return new TypeInfo<>(type, false, true, true);
		}

		public static <T> TypeInfo<T> optional(Class<T> type) {
			return new TypeInfo<>(type, true, false, false);
		}

		public static <T> TypeInfo<T> optionalList(Class<T> type) {
			return new TypeInfo<>(type, true, false, true);
		}

		public static <T> TypeInfo<T> nillable(Class<T> type) {
			return new TypeInfo<>(type, true, true, false);
		}

		public static <T> TypeInfo<T> nillableList(Class<T> type) {
			return new TypeInfo<>(type, true, true, true);
		}

		private TypeInfo(Class<T> type, boolean optional, boolean nullable, boolean multi) {
			this.type = type;
			this.optional = optional;
			this.nullable = nullable;
			this.multi = multi;
		}

		public TypeInfo<T> withOptional() {
			return new TypeInfo<>(type, true, nullable, multi);
		}

		public TypeInfo<T> withNullable() {
			return new TypeInfo<>(type, optional, true, multi);
		}

		public TypeInfo<T> withMulti() {
			return new TypeInfo<>(type, optional, nullable, true);
		}

		public TypeInfo<T> withNillable() {
			return new TypeInfo<>(type, true, true, multi);
		}

		public static final TypeInfo<Boolean> BOOLEAN = TypeInfo.value(Boolean.class);
		public static final TypeInfo<Short> SHORT = TypeInfo.value(Short.class);
		public static final TypeInfo<Integer> INTEGER = TypeInfo.value(Integer.class);
		public static final TypeInfo<Long> LONG = TypeInfo.value(Long.class);
		public static final TypeInfo<Float> FLOAT = TypeInfo.value(Float.class);
		public static final TypeInfo<Double> DOUBLE = TypeInfo.value(Double.class);
		public static final TypeInfo<String> STRING = TypeInfo.value(String.class);
	}

	private static final Optional<Boolean> OPTIONAL_FALSE = Optional.of(Boolean.FALSE);
	private static final Optional<Boolean> OPTIONAL_TRUE = Optional.of(Boolean.TRUE);
	private static final _Base.Nillable<Boolean> NILLABLE_FALSE = _NillableImpl.of(Boolean.FALSE);
	private static final _Base.Nillable<Boolean> NILLABLE_TRUE = _NillableImpl.of(Boolean.TRUE);
	
	private static final byte[] EMPTY_VALUE_BYTES = new byte[0];
${toString(emptyObjectValues, '\t')}

	public static String toString(Object value) {
		if (value == null) {
			return null;
		}

		if (value instanceof LocalDate d) {
			return toString(d);
		} else if (value instanceof LocalDateTime dt) {
			return toString(dt);
		} else if (value instanceof LocalTime t) {
			return toString(t);
		} else if (value instanceof ZonedDateTime zdt) {
			return toString(zdt);
		}
		return value.toString();
	}

	public static String toString(LocalDateTime value) {
		return DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(value);
	}

	public static String toString(LocalDate value) {
		return DateTimeFormatter.ISO_DATE.format(value);
	}

	public static String toString(LocalTime value) {
		return DateTimeFormatter.ISO_LOCAL_TIME.format(value);
	}

	public static String toString(ZonedDateTime value) {
		return DateTimeFormatter.ISO_ZONED_DATE_TIME.format(value);
	}

	public static <J extends JsonValue, T> Stream<T> mapToStream(JsonObject object, String property, Class<J> clazz,
			Function<J, T> mapper) {
		if (object.containsKey(property)) {
			return mapToStream(object.getJsonArray(property), clazz, mapper);
		}
		return Stream.empty();
	}

	private static <J extends JsonValue, T> Stream<T> mapToStream(JsonArray array,
			Class<J> clazz, Function<J, T> mapper) {
		return array
				.getValuesAs(clazz)
				.stream()
				.map(mapper);
	}

	public static <J extends JsonValue, T> Optional<Stream<T>> mapToNullStream(JsonObject object, String property,
			Class<J> clazz, Function<J, T> mapper) {
		if (!object.isNull(property)) {
			return Optional.of(mapToStream(object, property, clazz, mapper));
		}
		return Optional.empty();
	}

	public static <J extends JsonValue, T> Optional<Stream<T>> mapToOptStream(JsonObject object, String property,
			Class<J> clazz, Function<J, T> mapper) {
		if (object.containsKey(property)) {
			return Optional.of(mapToStream(object, property, clazz, mapper));
		}
		return Optional.empty();
	}

	public static <J extends JsonValue, T> _Base.Nillable<Stream<T>> mapToNilStream(JsonObject object, String property,
			Class<J> clazz, Function<J, T> mapper) {
		if (object.containsKey(property)) {
			if (object.isNull(property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapToStream(object, property, clazz, mapper));
		}
		return _NillableImpl.undefined();
	}

	// ----------------

	public static <T> List<T> mapObjects(JsonObject object, String property,
			Function<JsonObject, T> converter) {
		return mapToStream(object, property, JsonObject.class, converter).toList();
	}

	public static <T> T mapLiteral(JsonObject object, String property,
			Function<String, T> converter) {
		return converter.apply(object.getString(property));
	}

	public static <T> Optional<T> mapNullLiteral(JsonObject object, String property, Function<String, T> converter) {
		if (object.isNull(property)) {
			return Optional.empty();
		}
		return Optional.of(mapLiteral(object, property, converter));
	}

	public static <T> Optional<T> mapOptLiteral(JsonObject object, String property, Function<String, T> converter) {
		if (object.containsKey(property)) {
			return Optional.of(mapLiteral(object, property, converter));
		}
		return Optional.empty();
	}

	public static <T> _Base.Nillable<T> mapNilLiteral(JsonObject object, String property, Function<String, T> converter) {
		if (object.containsKey(property)) {
			if (object.isNull(property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapLiteral(object, property, converter));
		}
		return _NillableImpl.undefined();
	}

	public static <T> List<T> mapLiterals(JsonObject object, String property,
			Function<String, T> mapper) {
		return mapToStream(object, property, JsonString.class,
				JsonString::getString).map(mapper).toList();
	}

	public static <T> Optional<List<T>> mapNullLiterals(JsonObject object, String property, Function<String, T> mapper) {
		return mapToNullStream(object, property, JsonString.class,
				JsonString::getString).map(s -> s.map(mapper)).map(Stream::toList);
	}

	public static <T> Optional<List<T>> mapOptLiterals(JsonObject object, String property, Function<String, T> mapper) {
		return mapToOptStream(object, property, JsonString.class,
				JsonString::getString).map(s -> s.map(mapper))
				.map(Stream::toList);
	}

	public static <T> _Base.Nillable<List<T>> mapNilLiterals(JsonObject object,
			String property,
			Function<String, T> mapper) {
		return mapToNilStream(object, property, JsonString.class,
				JsonString::getString).map(s -> s.map(mapper))
				.map(Stream::toList);
	}

	// ----------------

	public static <T> T mapObject(JsonObject object, String property,
			Function<JsonObject, T> converter) {
		return converter.apply(object.getJsonObject(property));
	}

	public static <T> Optional<T> mapOptObject(JsonObject object, String property, Function<JsonObject, T> converter) {
		if (object.containsKey(property)) {
			return Optional.of(mapObject(object, property, converter));
		}
		return Optional.empty();
	}

	public static <T> _Base.Nillable<T> mapNilObject(JsonObject object, String property,
			Function<JsonObject, T> converter) {
		if (object.containsKey(property)) {
			if (object.isNull(property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapObject(object, property, converter));
		}
		return _NillableImpl.undefined();
	}

	public static <T> Optional<T> mapNullObject(JsonObject object, String property,
			Function<JsonObject, T> converter) {
		if (object.isNull(property)) {
			return Optional.empty();
		}
		return Optional.of(mapObject(object, property, converter));
	}

	public static <T> Optional<List<T>> mapNullObjects(JsonObject object, String property,
			Function<JsonObject, T> converter) {
		return mapToNullStream(object, property, JsonObject.class,
				converter).map(Stream::toList);
	}

	public static <T> Optional<List<T>> mapOptObjects(JsonObject object, String property,
			Function<JsonObject, T> converter) {
		return mapToOptStream(object, property, JsonObject.class,
				converter).map(Stream::toList);
	}

	public static <T> _Base.Nillable<List<T>> mapNilObjects(JsonObject object,
			String property,
			Function<JsonObject, T> converter) {
		return mapToNilStream(object, property, JsonObject.class,
				converter).map(Stream::toList);
	}

	// ----------------

	public static Optional<List<Boolean>> mapNullBooleans(JsonObject object,
			String property) {
		return mapToNullStream(object, property, JsonValue.class, v -> v == JsonValue.TRUE).map(Stream::toList);
	}

	public static _Base.Nillable<List<Boolean>> mapNilBooleans(JsonObject object,
			String property) {
		return mapToNilStream(object, property, JsonValue.class, v -> v == JsonValue.TRUE).map(Stream::toList);
	}

	public static Optional<List<Boolean>> mapOptBooleans(JsonObject object,
			String property) {
		return mapToOptStream(object, property, JsonValue.class, v -> v == JsonValue.TRUE).map(Stream::toList);
	}

	public static List<Boolean> mapBooleans(JsonObject object, String property) {
		return mapToStream(object, property, JsonValue.class, v -> v == JsonValue.TRUE).toList();
	}

	public static Optional<Boolean> mapNullBoolean(JsonObject object, String property) {
		if (object.isNull(property)) {
			return Optional.empty();
		}
		return object.getBoolean(property) ? OPTIONAL_TRUE : OPTIONAL_FALSE;
	}

	public static _Base.Nillable<Boolean> mapNilBoolean(JsonObject object, String property) {
		if (object.containsKey(property)) {
			if (object.isNull(property)) {
				return _NillableImpl.nill();
			}
			return object.getBoolean(property) ? NILLABLE_TRUE : NILLABLE_FALSE;
		}
		return _NillableImpl.undefined();
	}

	public static Optional<Boolean> mapOptBoolean(JsonObject object, String property) {
		if (object.containsKey(property)) {
			return object.getBoolean(property) ? OPTIONAL_TRUE : OPTIONAL_FALSE;
		}
		return Optional.empty();
	}

	public static boolean mapBoolean(JsonObject object, String property) {
		return object.getBoolean(property);
	}

	// ----------------

	public static Optional<List<Short>> mapNullShorts(JsonObject object, String property) {
		return mapToNullStream(object, property, JsonNumber.class, v -> v.numberValue().shortValue()).map(Stream::toList);
	}

	public static _Base.Nillable<List<Short>> mapNilShorts(JsonObject object,
			String property) {
		return mapToNilStream(object, property, JsonNumber.class, v -> v.numberValue().shortValue()).map(Stream::toList);
	}

	public static Optional<List<Short>> mapOptShorts(JsonObject object, String property) {
		return mapToOptStream(object, property, JsonNumber.class, v -> v.numberValue().shortValue()).map(Stream::toList);
	}

	public static List<Short> mapShorts(JsonObject object, String property) {
		return mapToStream(object, property, JsonNumber.class, v -> v.numberValue().shortValue()).toList();
	}

	public static Optional<Short> mapNullShort(JsonObject object, String property) {
		if (object.isNull(property)) {
			return Optional.empty();
		}
		return Optional.of(mapShort(object, property));
	}

	public static short mapShort(JsonObject object, String property) {
		return (short) object.getInt(property);
	}

	public static _Base.Nillable<Short> mapNilShort(JsonObject object, String property) {
		if (object.containsKey(property)) {
			if (object.isNull(property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapShort(object, property));
		}
		return _NillableImpl.undefined();
	}

	public static Optional<Short> mapOptShort(JsonObject object, String property) {
		if (object.containsKey(property)) {
			return Optional.of(mapShort(object, property));
		}
		return Optional.empty();
	}

	// ----------------
	public static Optional<List<Integer>> mapNullInts(JsonObject object, String property) {
		return mapToNullStream(object, property, JsonNumber.class,
				JsonNumber::intValue).map(Stream::toList);
	}

	public static _Base.Nillable<List<Integer>> mapNilInts(JsonObject object,
			String property) {
		return mapToNilStream(object, property, JsonNumber.class,
				JsonNumber::intValue).map(Stream::toList);
	}

	public static Optional<List<Integer>> mapOptInts(JsonObject object, String property) {
		return mapToOptStream(object, property, JsonNumber.class,
				JsonNumber::intValue).map(Stream::toList);
	}

	public static List<Integer> mapInts(JsonObject object, String property) {
		return mapToStream(object, property, JsonNumber.class,
				JsonNumber::intValue).toList();
	}

	public static OptionalInt mapNullInt(JsonObject object, String property) {
		if (object.isNull(property)) {
			return OptionalInt.empty();
		}
		return OptionalInt.of(mapInt(object, property));
	}

	public static int mapInt(JsonObject object, String property) {
		return object.getInt(property);
	}

	public static _Base.Nillable<Integer> mapNilInt(JsonObject object, String property) {
		if (object.containsKey(property)) {
			if (object.isNull(property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapInt(object, property));
		}
		return _NillableImpl.undefined();
	}

	public static OptionalInt mapOptInt(JsonObject object, String property) {
		if (object.containsKey(property)) {
			return OptionalInt.of(mapInt(object, property));
		}
		return OptionalInt.empty();
	}

	// ----------------
	public static Optional<List<Long>> mapNullLongs(JsonObject object, String property) {
		return mapToNullStream(object, property, JsonNumber.class, v -> v.numberValue().longValue()).map(Stream::toList);
	}

	public static _Base.Nillable<List<Long>> mapNilLongs(JsonObject object,
			String property) {
		return mapToNilStream(object, property, JsonNumber.class, v -> v.numberValue().longValue()).map(Stream::toList);
	}

	public static Optional<List<Long>> mapOptLongs(JsonObject object, String property) {
		return mapToOptStream(object, property, JsonNumber.class, v -> v.numberValue().longValue()).map(Stream::toList);
	}

	public static List<Long> mapLongs(JsonObject object, String property) {
		return mapToStream(object, property, JsonNumber.class, v -> v.numberValue().longValue()).toList();
	}

	public static OptionalLong mapNullLong(JsonObject object, String property) {
		if (object.isNull(property)) {
			return OptionalLong.empty();
		}
		return OptionalLong.of(mapLong(object, property));
	}

	public static long mapLong(JsonObject object, String property) {
		return object.getJsonNumber(property).longValue();
	}

	public static _Base.Nillable<Long> mapNilLong(JsonObject object, String property) {
		if (object.containsKey(property)) {
			if (object.isNull(property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapLong(object, property));
		}
		return _NillableImpl.undefined();
	}

	public static OptionalLong mapOptLong(JsonObject object, String property) {
		if (object.containsKey(property)) {
			return OptionalLong.of(mapLong(object, property));
		}
		return OptionalLong.empty();
	}

	// ----------------
	public static Optional<List<Float>> mapNullFloats(JsonObject object, String property) {
		return mapToNullStream(object, property, JsonNumber.class, v -> v.numberValue().floatValue()).map(Stream::toList);
	}

	public static _Base.Nillable<List<Float>> mapNilFloats(JsonObject object,
			String property) {
		return mapToNilStream(object, property, JsonNumber.class, v -> v.numberValue().floatValue()).map(Stream::toList);
	}

	public static Optional<List<Float>> mapOptFloats(JsonObject object, String property) {
		return mapToOptStream(object, property, JsonNumber.class, v -> v.numberValue().floatValue()).map(Stream::toList);
	}

	public static List<Float> mapFloats(JsonObject object, String property) {
		return mapToStream(object, property, JsonNumber.class, v -> v.numberValue().floatValue()).toList();
	}

	public static Optional<Float> mapNullFloat(JsonObject object, String property) {
		if (object.isNull(property)) {
			return Optional.empty();
		}
		return Optional.of(mapFloat(object, property));
	}

	public static float mapFloat(JsonObject object, String property) {
		return (float) object.getJsonNumber(property).doubleValue();
	}

	public static _Base.Nillable<Float> mapNilFloat(JsonObject object, String property) {
		if (object.containsKey(property)) {
			if (object.isNull(property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapFloat(object, property));
		}
		return _NillableImpl.undefined();
	}

	public static Optional<Float> mapOptFloat(JsonObject object, String property) {
		if (object.containsKey(property)) {
			return Optional.of(mapFloat(object, property));
		}
		return Optional.empty();
	}

	// ----------------
	public static Optional<List<Double>> mapNullDoubles(JsonObject object, String property) {
		return mapToNullStream(object, property, JsonNumber.class,
				JsonNumber::doubleValue).map(Stream::toList);
	}

	public static _Base.Nillable<List<Double>> mapNilDoubles(JsonObject object,
			String property) {
		return mapToNilStream(object, property, JsonNumber.class,
				JsonNumber::doubleValue).map(Stream::toList);
	}

	public static Optional<List<Double>> mapOptDoubles(JsonObject object, String property) {
		return mapToOptStream(object, property, JsonNumber.class,
				JsonNumber::doubleValue).map(Stream::toList);
	}

	public static List<Double> mapDoubles(JsonObject object, String property) {
		return mapToStream(object, property, JsonNumber.class,
				JsonNumber::doubleValue).toList();
	}

	public static OptionalDouble mapNullDouble(JsonObject object, String property) {
		if (object.isNull(property)) {
			return OptionalDouble.empty();
		}
		return OptionalDouble.of(mapDouble(object, property));
	}

	public static double mapDouble(JsonObject object, String property) {
		return object.getJsonNumber(property).doubleValue();
	}

	public static _Base.Nillable<Double> mapNilDouble(JsonObject object, String property) {
		if (object.containsKey(property)) {
			if (object.isNull(property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapDouble(object, property));
		}
		return _NillableImpl.undefined();
	}

	public static OptionalDouble mapOptDouble(JsonObject object, String property) {
		if (object.containsKey(property)) {
			return OptionalDouble.of(mapDouble(object, property));
		}
		return OptionalDouble.empty();
	}

	// ----------------
	public static Optional<List<String>> mapNullStrings(JsonObject object, String property) {
		return mapToNullStream(object, property, JsonString.class,
				JsonString::getString).map(Stream::toList);
	}

	public static _Base.Nillable<List<String>> mapNilStrings(JsonObject object,
			String property) {
		return mapToNilStream(object, property, JsonString.class,
				JsonString::getString).map(Stream::toList);
	}

	public static Optional<List<String>> mapOptStrings(JsonObject object, String property) {
		return mapToOptStream(object, property, JsonString.class,
				JsonString::getString).map(Stream::toList);
	}

	public static List<String> mapStrings(JsonObject object, String property) {
		return mapToStream(object, property, JsonString.class,
				JsonString::getString).toList();
	}

	public static Optional<String> mapNullString(JsonObject object, String property) {
		if (object.isNull(property)) {
			return Optional.empty();
		}
		return Optional.of(mapString(object, property));
	}

	public static String mapString(JsonObject object, String property) {
		return object.getString(property);
	}

	public static _Base.Nillable<String> mapNilString(JsonObject object, String property) {
		if (object.containsKey(property)) {
			if (object.isNull(property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapString(object, property));
		}
		return _NillableImpl.undefined();
	}

	public static Optional<String> mapOptString(JsonObject object, String property) {
		if (object.containsKey(property)) {
			return Optional.of(mapString(object, property));
		}
		return Optional.empty();
	}

	// ----------------
	public static Optional<List<LocalDate>> mapNullLocalDates(JsonObject object,
			String property) {
		return mapNullLiterals(object, property, LocalDate::parse);
	}

	public static _Base.Nillable<List<LocalDate>> mapNilLocalDates(JsonObject object, String property) {
		return mapNilLiterals(object, property, LocalDate::parse);
	}

	public static Optional<List<LocalDate>> mapOptLocalDates(JsonObject object,
			String property) {
		return mapOptLiterals(object, property, LocalDate::parse);
	}

	public static List<LocalDate> mapLocalDates(JsonObject object, String property) {
		return mapLiterals(object, property, LocalDate::parse);
	}

	public static Optional<LocalDate> mapNullLocalDate(JsonObject object, String property) {
		return mapNullLiteral(object, property, LocalDate::parse);
	}

	public static _Base.Nillable<LocalDate> mapNilLocalDate(JsonObject object,
			String property) {
		return mapNilLiteral(object, property, LocalDate::parse);
	}

	public static Optional<LocalDate> mapOptLocalDate(JsonObject object, String property) {
		return mapOptLiteral(object, property, LocalDate::parse);
	}

	public static LocalDate mapLocalDate(JsonObject object, String property) {
		return mapLiteral(object, property, LocalDate::parse);
	}

	// ----------------
	public static Optional<List<LocalDateTime>> mapNullLocalDateTimes(JsonObject object, String property) {
		return mapNullLiterals(object, property, LocalDateTime::parse);
	}

	public static _Base.Nillable<List<LocalDateTime>> mapNilLocalDateTimes(JsonObject object, String property) {
		return mapNilLiterals(object, property, LocalDateTime::parse);
	}

	public static Optional<List<LocalDateTime>> mapOptLocalDateTimes(JsonObject object, String property) {
		return mapOptLiterals(object, property, LocalDateTime::parse);
	}

	public static List<LocalDateTime> mapLocalDateTimes(JsonObject object, String property) {
		return mapLiterals(object, property, LocalDateTime::parse);
	}

	public static Optional<LocalDateTime> mapNullLocalDateTime(JsonObject object,
			String property) {
		return mapNullLiteral(object, property, LocalDateTime::parse);
	}

	public static _Base.Nillable<LocalDateTime> mapNilLocalDateTime(JsonObject object, String property) {
		return mapNilLiteral(object, property, LocalDateTime::parse);
	}

	public static Optional<LocalDateTime> mapOptLocalDateTime(JsonObject object,
			String property) {
		return mapOptLiteral(object, property, LocalDateTime::parse);
	}

	public static LocalDateTime mapLocalDateTime(JsonObject object, String property) {
		return mapLiteral(object, property, LocalDateTime::parse);
	}

	// ----------------
	public static Optional<List<ZonedDateTime>> mapNullZonedDateTimes(JsonObject object, String property) {
		return mapNullLiterals(object, property, ZonedDateTime::parse);
	}

	public static _Base.Nillable<List<ZonedDateTime>> mapNilZonedDateTimes(JsonObject object, String property) {
		return mapNilLiterals(object, property, ZonedDateTime::parse);
	}

	public static Optional<List<ZonedDateTime>> mapOptZonedDateTimes(JsonObject object, String property) {
		return mapOptLiterals(object, property, ZonedDateTime::parse);
	}

	public static List<ZonedDateTime> mapZonedDateTimes(JsonObject object, String property) {
		return mapLiterals(object, property, ZonedDateTime::parse);
	}

	public static Optional<ZonedDateTime> mapNullZonedDateTime(JsonObject object,
			String property) {
		return mapNullLiteral(object, property, ZonedDateTime::parse);
	}

	public static _Base.Nillable<ZonedDateTime> mapNilZonedDateTime(JsonObject object, String property) {
		return mapNilLiteral(object, property, ZonedDateTime::parse);
	}

	public static Optional<ZonedDateTime> mapOptZonedDateTime(JsonObject object,
			String property) {
		return mapOptLiteral(object, property, ZonedDateTime::parse);
	}

	public static ZonedDateTime mapZonedDateTime(JsonObject object, String property) {
		return mapLiteral(object, property, ZonedDateTime::parse);
	}

	// ----------------
	public static Optional<List<LocalTime>> mapNullLocalTimes(JsonObject object, String property) {
		return mapNullLiterals(object, property, LocalTime::parse);
	}

	public static _Base.Nillable<List<LocalTime>> mapNilLocalTimes(JsonObject object, String property) {
		return mapNilLiterals(object, property, LocalTime::parse);
	}

	public static Optional<List<LocalTime>> mapOptLocalTimes(JsonObject object, String property) {
		return mapOptLiterals(object, property, LocalTime::parse);
	}

	public static List<LocalTime> mapLocalTimes(JsonObject object, String property) {
		return mapLiterals(object, property, LocalTime::parse);
	}

	public static Optional<LocalTime> mapNullLocalTime(JsonObject object, String property) {
		return mapNullLiteral(object, property, LocalTime::parse);
	}

	public static _Base.Nillable<LocalTime> mapNilLocalTime(JsonObject object, String property) {
		return mapNilLiteral(object, property, LocalTime::parse);
	}

	public static Optional<LocalTime> mapOptLocalTime(JsonObject object, String property) {
		return mapOptLiteral(object, property, LocalTime::parse);
	}

	public static LocalTime mapLocalTime(JsonObject object, String property) {
		return mapLiteral(object, property, LocalTime::parse);
	}

	// ----------------
	private static Collector<String, ?, JsonArray> toStringArray() {
		return Collector.of(
				Json::createArrayBuilder,
				JsonArrayBuilder::add,
				JsonArrayBuilder::add,
				JsonArrayBuilder::build);
	}

	public static <T> JsonArray toJsonLiteralArray(List<T> value, Function<T, String> converter) {
		return value.stream().map(converter).collect(toStringArray());
	}

	public static <T> JsonArray toJsonLiteralArray(List<T> value) {
		return value.stream().map(Object::toString).collect(toStringArray());
	}

	// ----------------
	private static Collector<Boolean, ?, JsonArray> toBooleanArray() {
		return Collector.of(
				Json::createArrayBuilder,
				JsonArrayBuilder::add,
				JsonArrayBuilder::add,
				JsonArrayBuilder::build);
	}

	public static JsonArray toJsonBooleanArray(List<Boolean> value) {
		return value.stream().collect(toBooleanArray());
	}

	// ----------------
	private static Collector<Short, ?, JsonArray> toShortArray() {
		return Collector.of(
				Json::createArrayBuilder,
				JsonArrayBuilder::add,
				JsonArrayBuilder::add,
				JsonArrayBuilder::build);
	}

	public static JsonArray toJsonShortArray(List<Short> value) {
		return value.stream().collect(toShortArray());
	}

	// ----------------
	private static Collector<Integer, ?, JsonArray> toIntArray() {
		return Collector.of(
				Json::createArrayBuilder,
				JsonArrayBuilder::add,
				JsonArrayBuilder::add,
				JsonArrayBuilder::build);
	}

	public static JsonArray toJsonIntArray(List<Integer> value) {
		return value.stream().collect(toIntArray());
	}

	// ----------------
	private static Collector<Long, ?, JsonArray> toLongArray() {
		return Collector.of(
				Json::createArrayBuilder,
				JsonArrayBuilder::add,
				JsonArrayBuilder::add,
				JsonArrayBuilder::build);
	}

	public static JsonArray toJsonLongArray(List<Long> value) {
		return value.stream().collect(toLongArray());
	}

	// ----------------
	public static Collector<Float, ?, JsonArray> toFloatArray() {
		return Collector.of(
				Json::createArrayBuilder,
				JsonArrayBuilder::add,
				JsonArrayBuilder::add,
				JsonArrayBuilder::build);
	}

	public static JsonArray toJsonFloatArray(List<Float> value) {
		return value.stream().collect(toFloatArray());
	}

	// ----------------
	public static Collector<Double, ?, JsonArray> toDoubleArray() {
		return Collector.of(
				Json::createArrayBuilder,
				JsonArrayBuilder::add,
				JsonArrayBuilder::add,
				JsonArrayBuilder::build);
	}

	public static JsonArray toJsonDoubleArray(List<Double> value) {
		return value.stream().collect(toDoubleArray());
	}

	// ----------------
	public static JsonArray toJsonStringArray(List<String> value) {
		return value.stream().collect(toStringArray());
	}

	// ----------------
	public static <T> JsonArray toJsonValueArray(List<T> value, Function<T, ? extends JsonValue> jsonValueConverter) {
		return value.stream().collect(toArray(jsonValueConverter));
	}

	public static <T> Collector<T, ?, JsonArray> toArray(Function<T, ? extends JsonValue> jsonValueConverter) {
		return Collector.of(
				Json::createArrayBuilder,
				(b, v) -> b.add(jsonValueConverter.apply(v)),
				JsonArrayBuilder::add,
				JsonArrayBuilder::build);
	}

	// ----------------
${toString(encodeFunctions, '\t')}
	public static JsonValue createJsonValue(Object data) {
		if (data == null) {
			return JsonValue.NULL;
		} else if (data instanceof JsonValue jsonValue) {
			return jsonValue;
		} else if (data instanceof String s) {
			return Json.createValue(s);
		} else if (data instanceof Number n) {
			if (data instanceof Byte || data instanceof Short || data instanceof Integer || data instanceof Character) {
				return Json.createValue(n.intValue());
			} else if (data instanceof Long) {
				return Json.createValue(n.longValue());
			} else if (data instanceof Float || data instanceof Double) {
				return Json.createValue(n.doubleValue());
			} else if (data instanceof BigInteger) {
				return Json.createValue((BigInteger) n);
			} else if (data instanceof BigDecimal) {
				return Json.createValue((BigDecimal) n);
			} else {
				throw new IllegalArgumentException("Unsupported number type: " + data.getClass());
			}
		} else if (data instanceof Boolean b) {
			return b ? JsonValue.TRUE : JsonValue.FALSE;
		} else if (data instanceof _BaseDataImpl baseData) {
			return baseData.data;
		} else if (data instanceof List<?> list) {
			var arrayBuilder = Json.createArrayBuilder();
			list.stream().map(v -> createJsonValue(v)).forEach(arrayBuilder::add);
			return arrayBuilder.build();
		} else {
			return Json.createValue(toString(data));
		}
	}
	
	// ----------------

	private enum StreamState {
		EMPTY, UNKNOWN, NON_EMPTY
	}

	private static StreamState streamState(InputStream inputStream) {
		try {
			if (inputStream.available() > 0) {
				return StreamState.NON_EMPTY;
			} else if (inputStream.markSupported()) {
				inputStream.mark(1);
				int read = inputStream.read();
				inputStream.reset();
				if (read == -1) {
					return StreamState.EMPTY;
				} else {
					return StreamState.NON_EMPTY;
				}
			}
			return StreamState.UNKNOWN;
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	private static <T> Optional<T> parseOptStream(InputStream inputStream, Function<InputStream, Optional<T>> parser) {
		var state = streamState(inputStream);
		if (state == StreamState.EMPTY) {
			return Optional.empty();
		} else if (state == StreamState.UNKNOWN) {
			try {
				return parser.apply(inputStream);
			} catch (JsonException e) {
				return Optional.empty();
			}
		} else {
			return parser.apply(inputStream);
		}
	}

	private static <T> _Base.Nillable<T> parseNilStream(InputStream inputStream, Function<InputStream, _Base.Nillable<T>> parser) {
		var state = streamState(inputStream);
		if (state == StreamState.EMPTY) {
			return _NillableImpl.undefined();
		} else if (state == StreamState.UNKNOWN) {
			try {
				return parser.apply(inputStream);
			} catch (JsonException e) {
				return _NillableImpl.undefined();
			}
		} else {
			return parser.apply(inputStream);
		}
	}

	private static <T> List<T> parseListStream(
			InputStream inputStream, 
			String contentType,
			Function<JsonValue, T> mapper, 
			TypeInfo<?> typeInfo) {
		var value = decodeValue(inputStream, contentType, typeInfo);
		if (value.getValueType() != JsonValue.ValueType.ARRAY) {
			throw new IllegalArgumentException("Expected array value, but got: " + value);
		}
		return ((JsonArray) value).stream().map(mapper).toList();
	}

	private static <T> List<T> parseListStream(
			InputStream inputStream, 
			String contentType,
			Function<JsonValue, T> mapper, 
			Class<?> type) {
		return parseListStream(inputStream, contentType, mapper, TypeInfo.list(type));
	}

	private static <T> Optional<List<T>> parseOptListStream(
			InputStream inputStream, 
			String contentType,
			Function<JsonValue, T> mapper,
			Class<?> type) {
		return parseOptStream(inputStream, is -> {
			return Optional.of(parseListStream(is, contentType, mapper, type));
		});
	}

	private static <T> Optional<List<T>> parseNullListStream(
			InputStream inputStream, 
			String contentType,
			Function<JsonValue, T> mapper,
			Class<?> type) {
		var value = decodeValue(inputStream, contentType, TypeInfo.nullableList(type));
		if (value.getValueType() == JsonValue.ValueType.NULL) {
			return Optional.empty();
		} else if (value.getValueType() == JsonValue.ValueType.ARRAY) {
			return Optional.of(((JsonArray) value).stream().map(mapper).toList());
		}
		throw new IllegalArgumentException("Expected array value or null, but got: " + value);
	}

	private static <T> _Base.Nillable<List<T>> parseNilListStream(
			InputStream inputStream, 
			String contentType,
			Function<JsonValue, T> mapper,
			Class<?> type) {
		return parseNilStream(inputStream, is -> {
			var value = decodeValue(is, contentType, TypeInfo.nullableList(type));
			if (value.getValueType() == JsonValue.ValueType.NULL) {
				return _NillableImpl.nill();
			} else if (value.getValueType() == JsonValue.ValueType.ARRAY) {
				return _NillableImpl.of(((JsonArray) value).stream().map(mapper).toList());
			}
			throw new IllegalArgumentException("Expected array value or null, but got: " + value);
		});
	}

	// ----------------

	public static boolean parseBoolean(InputStream inputStream, String contentType) {
		var value = decodeValue(inputStream, contentType, TypeInfo.BOOLEAN);
		if (value.getValueType() != JsonValue.ValueType.TRUE
				&& value.getValueType() != JsonValue.ValueType.FALSE) {
			throw new IllegalArgumentException("Expected boolean value, but got: " + value);
		}
		return value.getValueType() == JsonValue.ValueType.TRUE;
	}

	private static Boolean parseBooleanNull(InputStream inputStream, String contentType) {
		var value = decodeValue(inputStream, contentType, TypeInfo.BOOLEAN.withNullable());
		if (value.getValueType() == JsonValue.ValueType.TRUE) {
			return Boolean.TRUE;
		} else if (value.getValueType() == JsonValue.ValueType.FALSE) {
			return Boolean.FALSE;
		} else if (value.getValueType() == JsonValue.ValueType.NULL) {
			return null;
		}
		throw new IllegalArgumentException("Expected boolean value or null, but got: " + value);
	}

	public static Optional<Boolean> parseOptBoolean(InputStream inputStream, String contentType) {
		return parseOptStream(inputStream, is -> {
			var value = decodeValue(is, contentType, TypeInfo.BOOLEAN);
			if (value.getValueType() == JsonValue.ValueType.TRUE) {
				return OPTIONAL_TRUE;
			} else if (value.getValueType() == JsonValue.ValueType.FALSE) {
				return OPTIONAL_FALSE;
			}
			throw new IllegalArgumentException("Expected boolean value or null, but got: " + value);
		});
	}

	public static Optional<Boolean> parseNullBoolean(InputStream inputStream, String contentType) {
		var result = parseBooleanNull(inputStream, contentType);
		if (result == null) {
			return Optional.empty();
		} else if (result.booleanValue()) {
			return OPTIONAL_TRUE;
		} else {
			return OPTIONAL_FALSE;
		}
	}

	public static _Base.Nillable<Boolean> parseNilBoolean(InputStream inputStream, String contentType) {
		return parseNilStream(inputStream, is -> {
			var result = parseBooleanNull(is, contentType);
			if (result == null) {
				return _NillableImpl.nill();
			} else if (result.booleanValue()) {
				return NILLABLE_TRUE;
			} else {
				return NILLABLE_FALSE;
			}
		});
	}

	public static List<Boolean> parseBooleans(InputStream inputStream, String contentType) {
		return parseListStream(inputStream, contentType, v -> {
			if (v.getValueType() == JsonValue.ValueType.TRUE) {
				return Boolean.TRUE;
			} else if (v.getValueType() == JsonValue.ValueType.FALSE) {
				return Boolean.FALSE;
			}
			throw new IllegalArgumentException("Expected boolean value, but got: " + v);
		}, Boolean.class);
	}

	public static Optional<List<Boolean>> parseOptBooleans(InputStream inputStream, String contentType) {
		return parseOptListStream(inputStream, contentType, v -> {
			if (v.getValueType() == JsonValue.ValueType.TRUE) {
				return Boolean.TRUE;
			} else if (v.getValueType() == JsonValue.ValueType.FALSE) {
				return Boolean.FALSE;
			}
			throw new IllegalArgumentException("Expected boolean value, but got: " + v);
		}, Boolean.class);
	}

	public static Optional<List<Boolean>> parseNullBooleans(InputStream inputStream, String contentType) {
		return parseNullListStream(inputStream, contentType, v -> {
			if (v.getValueType() == JsonValue.ValueType.TRUE) {
				return Boolean.TRUE;
			} else if (v.getValueType() == JsonValue.ValueType.FALSE) {
				return Boolean.FALSE;
			}
			throw new IllegalArgumentException("Expected boolean value, but got: " + v);
		}, Boolean.class);
	}

	public static _Base.Nillable<List<Boolean>> parseNilBooleans(InputStream inputStream, String contentType) {
		return parseNilListStream(inputStream, contentType, v -> {
			if (v.getValueType() == JsonValue.ValueType.TRUE) {
				return Boolean.TRUE;
			} else if (v.getValueType() == JsonValue.ValueType.FALSE) {
				return Boolean.FALSE;
			}
			throw new IllegalArgumentException("Expected boolean value, but got: " + v);
		}, Boolean.class);
	}

	// ----------------
	public static short parseShort(InputStream inputStream, String contentType) {
		var value = decodeValue(inputStream, contentType, TypeInfo.SHORT);
		if (value.getValueType() != JsonValue.ValueType.NUMBER) {
			throw new IllegalArgumentException("Expected number value, but got: " + value);
		}
		return (short) ((JsonNumber) value).intValue();
	}

	public static Optional<Short> parseOptShort(InputStream inputStream, String contentType) {
		return parseOptStream(inputStream, is -> {
			var value = decodeValue(is, contentType, TypeInfo.SHORT);
			if (value.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + value);
			}
			return Optional.of((short) ((JsonNumber) value).intValue());
		});
	}

	public static Optional<Short> parseNullShort(InputStream inputStream, String contentType) {
		var value = decodeValue(inputStream, contentType, TypeInfo.SHORT.withNullable());
		if (value.getValueType() == JsonValue.ValueType.NULL) {
			return Optional.empty();
		} else if (value.getValueType() == JsonValue.ValueType.NUMBER) {
			return Optional.of((short) ((JsonNumber) value).intValue());
		}
		throw new IllegalArgumentException("Expected number value or null, but got: " + value);
	}

	public static _Base.Nillable<Short> parseNilShort(InputStream inputStream, String contentType) {
		return parseNilStream(inputStream, is -> {
			var value = decodeValue(is, contentType, TypeInfo.SHORT.withNullable());
			if (value.getValueType() == JsonValue.ValueType.NULL) {
				return _NillableImpl.nill();
			} else if (value.getValueType() == JsonValue.ValueType.NUMBER) {
				return _NillableImpl.of((short) ((JsonNumber) value).intValue());
			}
			throw new IllegalArgumentException("Expected number value or null, but got: " + value);
		});
	}

	public static List<Short> parseShorts(InputStream inputStream, String contentType) {
		return parseListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return (short) ((JsonNumber) v).intValue();
		}, Short.class);
	}

	public static Optional<List<Short>> parseOptShorts(InputStream inputStream, String contentType) {
		return parseOptListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return (short) ((JsonNumber) v).intValue();
		}, Short.class);
	}

	public static Optional<List<Short>> parseNullShorts(InputStream inputStream, String contentType) {
		return parseNullListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return (short) ((JsonNumber) v).intValue();
		}, Short.class);
	}

	public static _Base.Nillable<List<Short>> parseNilShorts(InputStream inputStream, String contentType) {
		return parseNilListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return (short) ((JsonNumber) v).intValue();
		}, Short.class);
	}

	// ----------------
	public static int parseInt(InputStream inputStream, String contentType) {
		var value = decodeValue(inputStream, contentType, TypeInfo.INTEGER);
		if (value.getValueType() != JsonValue.ValueType.NUMBER) {
			throw new IllegalArgumentException("Expected number value, but got: " + value);
		}
		return ((JsonNumber) value).intValue();
	}

	public static OptionalInt parseOptInt(InputStream inputStream, String contentType) {
		var state = streamState(inputStream);
		if (state == StreamState.EMPTY) {
			return OptionalInt.empty();
		} else if (state == StreamState.UNKNOWN) {
			try {
				return OptionalInt.of(parseInt(inputStream, contentType));
			} catch (JsonException e) {
				return OptionalInt.empty();
			}
		} else {
			return OptionalInt.of(parseInt(inputStream, contentType));
		}
	}

	public static OptionalInt parseNullInt(InputStream inputStream, String contentType) {
		var value = decodeValue(inputStream, contentType, TypeInfo.INTEGER.withNullable());
		if (value.getValueType() == JsonValue.ValueType.NULL) {
			return OptionalInt.empty();
		} else if (value.getValueType() == JsonValue.ValueType.NUMBER) {
			return OptionalInt.of(((JsonNumber) value).intValue());
		}
		throw new IllegalArgumentException("Expected number value or null, but got: " + value);
	}

	public static _Base.Nillable<Integer> parseNilInt(InputStream inputStream, String contentType) {
		return parseNilStream(inputStream, is -> {
			var value = decodeValue(is, contentType, TypeInfo.INTEGER.withNullable());
			if (value.getValueType() == JsonValue.ValueType.NULL) {
				return _NillableImpl.nill();
			} else if (value.getValueType() == JsonValue.ValueType.NUMBER) {
				return _NillableImpl.of(((JsonNumber) value).intValue());
			}
			throw new IllegalArgumentException("Expected number value or null, but got: " + value);
		});
	}

	public static List<Integer> parseInts(InputStream inputStream, String contentType) {
		return parseListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return ((JsonNumber) v).intValue();
		}, Integer.class);
	}

	public static Optional<List<Integer>> parseOptInts(InputStream inputStream, String contentType) {
		return parseOptListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return ((JsonNumber) v).intValue();
		}, Integer.class);
	}

	public static Optional<List<Integer>> parseNullInts(InputStream inputStream, String contentType) {
		return parseNullListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return ((JsonNumber) v).intValue();
		}, Integer.class);
	}

	public static _Base.Nillable<List<Integer>> parseNilInts(InputStream inputStream, String contentType) {
		return parseNilListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return ((JsonNumber) v).intValue();
		}, Integer.class);
	}

	// ----------------
	public static long parseLong(InputStream inputStream, String contentType) {
		var value = decodeValue(inputStream, contentType, TypeInfo.LONG);
		if (value.getValueType() != JsonValue.ValueType.NUMBER) {
			throw new IllegalArgumentException("Expected number value, but got: " + value);
		}
		return ((JsonNumber) value).longValue();
	}

	public static OptionalLong parseOptLong(InputStream inputStream, String contentType) {
		var state = streamState(inputStream);
		if (state == StreamState.EMPTY) {
			return OptionalLong.empty();
		} else if (state == StreamState.UNKNOWN) {
			try {
				return OptionalLong.of(parseLong(inputStream, contentType));
			} catch (JsonException e) {
				return OptionalLong.empty();
			}
		} else {
			return OptionalLong.of(parseLong(inputStream, contentType));
		}
	}

	public static OptionalLong parseNullLong(InputStream inputStream, String contentType) {
		var value = decodeValue(inputStream, contentType, TypeInfo.LONG.withNullable());
		if (value.getValueType() == JsonValue.ValueType.NULL) {
			return OptionalLong.empty();
		} else if (value.getValueType() == JsonValue.ValueType.NUMBER) {
			return OptionalLong.of(((JsonNumber) value).longValue());
		}
		throw new IllegalArgumentException("Expected number value or null, but got: " + value);
	}

	public static _Base.Nillable<Long> parseNilLong(InputStream inputStream, String contentType) {
		return parseNilStream(inputStream, is -> {
			var value = decodeValue(is, contentType, TypeInfo.LONG.withNullable());
			if (value.getValueType() == JsonValue.ValueType.NULL) {
				return _NillableImpl.nill();
			} else if (value.getValueType() == JsonValue.ValueType.NUMBER) {
				return _NillableImpl.of(((JsonNumber) value).longValue());
			}
			throw new IllegalArgumentException("Expected number value or null, but got: " + value);
		});
	}

	public static List<Long> parseLongs(InputStream inputStream, String contentType) {
		return parseListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return ((JsonNumber) v).longValue();
		}, Long.class);
	}

	public static Optional<List<Long>> parseOptLongs(InputStream inputStream, String contentType) {
		return parseOptListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return ((JsonNumber) v).longValue();
		}, Long.class);
	}

	public static Optional<List<Long>> parseNullLongs(InputStream inputStream, String contentType) {
		return parseNullListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return ((JsonNumber) v).longValue();
		}, Long.class);
	}

	public static _Base.Nillable<List<Long>> parseNilLongs(InputStream inputStream, String contentType) {
		return parseNilListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return ((JsonNumber) v).longValue();
		}, Long.class);
	}

	// ----------------
	public static double parseDouble(InputStream inputStream, String contentType) {
		var value = decodeValue(inputStream, contentType, TypeInfo.DOUBLE);
		if (value.getValueType() != JsonValue.ValueType.NUMBER) {
			throw new IllegalArgumentException("Expected number value, but got: " + value);
		}
		return ((JsonNumber) value).doubleValue();
	}

	public static OptionalDouble parseOptDouble(InputStream inputStream, String contentType) {
		var state = streamState(inputStream);
		if (state == StreamState.EMPTY) {
			return OptionalDouble.empty();
		} else if (state == StreamState.UNKNOWN) {
			try {
				return OptionalDouble.of(parseDouble(inputStream, contentType));
			} catch (JsonException e) {
				return OptionalDouble.empty();
			}
		} else {
			return OptionalDouble.of(parseDouble(inputStream, contentType));
		}
	}

	public static OptionalDouble parseNullDouble(InputStream inputStream, String contentType) {
		var value = decodeValue(inputStream, contentType, TypeInfo.DOUBLE.withNullable());
		if (value.getValueType() == JsonValue.ValueType.NULL) {
			return OptionalDouble.empty();
		} else if (value.getValueType() == JsonValue.ValueType.NUMBER) {
			return OptionalDouble.of(((JsonNumber) value).doubleValue());
		}
		throw new IllegalArgumentException("Expected number value or null, but got: " + value);
	}

	public static _Base.Nillable<Double> parseNilDouble(InputStream inputStream, String contentType) {
		return parseNilStream(inputStream, is -> {
			var value = decodeValue(is, contentType, TypeInfo.DOUBLE.withNullable());
			if (value.getValueType() == JsonValue.ValueType.NULL) {
				return _NillableImpl.nill();
			} else if (value.getValueType() == JsonValue.ValueType.NUMBER) {
				return _NillableImpl.of(((JsonNumber) value).doubleValue());
			}
			throw new IllegalArgumentException("Expected number value or null, but got: " + value);
		});
	}

	public static List<Double> parseDoubles(InputStream inputStream, String contentType) {
		return parseListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return ((JsonNumber) v).doubleValue();
		}, Double.class);
	}

	public static Optional<List<Double>> parseOptDoubles(InputStream inputStream, String contentType) {
		return parseOptListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return ((JsonNumber) v).doubleValue();
		}, Double.class);
	}

	public static Optional<List<Double>> parseNullDoubles(InputStream inputStream, String contentType) {
		return parseNullListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return ((JsonNumber) v).doubleValue();
		}, Double.class);
	}

	public static _Base.Nillable<List<Double>> parseNilDoubles(InputStream inputStream, String contentType) {
		return parseNilListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return ((JsonNumber) v).doubleValue();
		}, Double.class);
	}

	// ----------------
	public static Float parseFloat(InputStream inputStream, String contentType) {
		var value = decodeValue(inputStream, contentType, TypeInfo.FLOAT);
		if (value.getValueType() != JsonValue.ValueType.NUMBER) {
			throw new IllegalArgumentException("Expected number value, but got: " + value);
		}
		return (float) ((JsonNumber) value).doubleValue();
	}

	public static Optional<Float> parseOptFloat(InputStream inputStream, String contentType) {
		return parseOptStream(inputStream, is -> {
			var value = decodeValue(is, contentType, TypeInfo.FLOAT);
			if (value.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + value);
			}
			return Optional.of((float) ((JsonNumber) value).doubleValue());
		});
	}

	public static Optional<Float> parseNullFloat(InputStream inputStream, String contentType) {
		var value = decodeValue(inputStream, contentType, TypeInfo.FLOAT.withNullable());
		if (value.getValueType() == JsonValue.ValueType.NULL) {
			return Optional.empty();
		} else if (value.getValueType() == JsonValue.ValueType.NUMBER) {
			return Optional.of((float) ((JsonNumber) value).doubleValue());
		}
		throw new IllegalArgumentException("Expected number value or null, but got: " + value);
	}

	public static _Base.Nillable<Float> parseNilFloat(InputStream inputStream, String contentType) {
		return parseNilStream(inputStream, is -> {
			var value = decodeValue(is, contentType, TypeInfo.FLOAT.withNullable());
			if (value.getValueType() == JsonValue.ValueType.NULL) {
				return _NillableImpl.nill();
			} else if (value.getValueType() == JsonValue.ValueType.NUMBER) {
				return _NillableImpl.of((float) ((JsonNumber) value).doubleValue());
			}
			throw new IllegalArgumentException("Expected number value or null, but got: " + value);
		});
	}

	public static List<Float> parseFloats(InputStream inputStream, String contentType) {
		return parseListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return (float) ((JsonNumber) v).doubleValue();
		}, Float.class);
	}

	public static Optional<List<Float>> parseOptFloats(InputStream inputStream, String contentType) {
		return parseOptListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return (float) ((JsonNumber) v).doubleValue();
		}, Float.class);
	}

	public static Optional<List<Float>> parseNullFloats(InputStream inputStream, String contentType) {
		return parseNullListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return (float) ((JsonNumber) v).doubleValue();
		}, Float.class);
	}

	public static _Base.Nillable<List<Float>> parseNilFloats(InputStream inputStream, String contentType) {
		return parseNilListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.NUMBER) {
				throw new IllegalArgumentException("Expected number value, but got: " + v);
			}
			return (float) ((JsonNumber) v).doubleValue();
		}, Float.class);
	}

	// ----------------
	public static String parseString(InputStream inputStream, String contentType) {
		var value = decodeValue(inputStream, contentType, TypeInfo.STRING);
		if (value.getValueType() != JsonValue.ValueType.STRING) {
			throw new IllegalArgumentException("Expected string value, but got: " + value);
		}
		return ((JsonString) value).getString();
	}

	public static Optional<String> parseOptString(InputStream inputStream, String contentType) {
		return parseOptStream(inputStream, is -> {
			var value = decodeValue(is, contentType, TypeInfo.STRING);
			if (value.getValueType() != JsonValue.ValueType.STRING) {
				throw new IllegalArgumentException("Expected string value, but got: " + value);
			}
			return Optional.of(((JsonString) value).getString());
		});
	}

	public static Optional<String> parseNullString(InputStream inputStream, String contentType) {
		var value = decodeValue(inputStream, contentType, TypeInfo.STRING.withNullable());
		if (value.getValueType() == JsonValue.ValueType.NULL) {
			return Optional.empty();
		} else if (value.getValueType() == JsonValue.ValueType.STRING) {
			return Optional.of(((JsonString) value).getString());
		}
		throw new IllegalArgumentException("Expected string value or null, but got: " + value);
	}

	public static _Base.Nillable<String> parseNilString(InputStream inputStream, String contentType) {
		return parseNilStream(inputStream, is -> {
			var value = decodeValue(is, contentType, TypeInfo.STRING.withNullable());
			if (value.getValueType() == JsonValue.ValueType.NULL) {
				return _NillableImpl.nill();
			} else if (value.getValueType() == JsonValue.ValueType.STRING) {
				return _NillableImpl.of(((JsonString) value).getString());
			}
			throw new IllegalArgumentException("Expected string value or null, but got: " + value);
		});
	}

	public static List<String> parseStrings(InputStream inputStream, String contentType) {
		return parseListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.STRING) {
				throw new IllegalArgumentException("Expected string value, but got: " + v);
			}
			return ((JsonString) v).getString();
		}, String.class);
	}

	public static Optional<List<String>> parseOptStrings(InputStream inputStream, String contentType) {
		return parseOptListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.STRING) {
				throw new IllegalArgumentException("Expected string value, but got: " + v);
			}
			return ((JsonString) v).getString();
		}, String.class);
	}

	public static Optional<List<String>> parseNullStrings(InputStream inputStream, String contentType) {
		return parseNullListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.STRING) {
				throw new IllegalArgumentException("Expected string value, but got: " + v);
			}
			return ((JsonString) v).getString();
		}, String.class);
	}

	public static _Base.Nillable<List<String>> parseNilStrings(InputStream inputStream, String contentType) {
		return parseNilListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.STRING) {
				throw new IllegalArgumentException("Expected string value, but got: " + v);
			}
			return ((JsonString) v).getString();
		}, String.class);
	}

	// ----------------
	public static <T> T parseLiteral(InputStream inputStream, String contentType, Function<String, T> parser) {
		var value = decodeValue(inputStream, contentType, TypeInfo.STRING);
		if (value.getValueType() != JsonValue.ValueType.STRING) {
			throw new IllegalArgumentException("Expected string value, but got: " + value);
		}
		return parser.apply(((JsonString) value).getString());
	}

	public static <T> Optional<T> parseOptLiteral(InputStream inputStream, String contentType,
			Function<String, T> parser) {
		return parseOptStream(inputStream, is -> {
			var value = decodeValue(is, contentType, TypeInfo.STRING);
			if (value.getValueType() != JsonValue.ValueType.STRING) {
				throw new IllegalArgumentException("Expected string value, but got: " + value);
			}
			return Optional.of(parser.apply(((JsonString) value).getString()));
		});
	}

	public static <T> Optional<T> parseNullLiteral(InputStream inputStream, String contentType,
			Function<String, T> parser) {
		var value = decodeValue(inputStream, contentType, TypeInfo.STRING.withNullable());
		if (value.getValueType() == JsonValue.ValueType.NULL) {
			return Optional.empty();
		} else if (value.getValueType() == JsonValue.ValueType.STRING) {
			return Optional.of(parser.apply(((JsonString) value).getString()));
		}
		throw new IllegalArgumentException("Expected string value or null, but got: " + value);
	}

	public static <T> _Base.Nillable<T> parseNilLiteral(InputStream inputStream, String contentType,
			Function<String, T> parser) {
		return parseNilStream(inputStream, is -> {
			var value = decodeValue(is, contentType, TypeInfo.STRING.withNullable());
			if (value.getValueType() == JsonValue.ValueType.NULL) {
				return _NillableImpl.nill();
			} else if (value.getValueType() == JsonValue.ValueType.STRING) {
				return _NillableImpl.of(parser.apply(((JsonString) value).getString()));
			}
			throw new IllegalArgumentException("Expected string value or null, but got: " + value);
		});
	}

	public static <T> List<T> parseLiterals(InputStream inputStream, String contentType,
			Function<String, T> parser) {
		return parseListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.STRING) {
				throw new IllegalArgumentException("Expected string value, but got: " + v);
			}
			return parser.apply(((JsonString) v).getString());
		}, String.class);
	}

	public static <T> Optional<List<T>> parseOptLiterals(InputStream inputStream, String contentType,
			Function<String, T> parser) {
		return parseOptListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.STRING) {
				throw new IllegalArgumentException("Expected string value, but got: " + v);
			}
			return parser.apply(((JsonString) v).getString());
		}, String.class);
	}

	public static <T> Optional<List<T>> parseNullLiterals(InputStream inputStream, String contentType,
			Function<String, T> parser) {
		return parseNullListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.STRING) {
				throw new IllegalArgumentException("Expected string value or null, but got: " + v);
			}
			return parser.apply(((JsonString) v).getString());
		}, String.class);
	}

	public static <T> _Base.Nillable<List<T>> parseNilLiterals(InputStream inputStream, String contentType,
			Function<String, T> parser) {
		return parseNilListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.STRING) {
				throw new IllegalArgumentException("Expected string value or null, but got: " + v);
			}
			return parser.apply(((JsonString) v).getString());
		}, String.class);
	}

	// ----------------
	public static LocalDate parseLocalDate(InputStream inputStream, String contentType) {
		return parseLiteral(inputStream, contentType, LocalDate::parse);
	}

	public static Optional<LocalDate> parseOptLocalDate(InputStream inputStream, String contentType) {
		return parseOptLiteral(inputStream, contentType, LocalDate::parse);
	}

	public static Optional<LocalDate> parseNullLocalDate(InputStream inputStream, String contentType) {
		return parseNullLiteral(inputStream, contentType, LocalDate::parse);
	}

	public static _Base.Nillable<LocalDate> parseNilLocalDate(InputStream inputStream, String contentType) {
		return parseNilLiteral(inputStream, contentType, LocalDate::parse);
	}

	public static List<LocalDate> parseLocalDates(InputStream inputStream, String contentType) {
		return parseLiterals(inputStream, contentType, LocalDate::parse);
	}

	public static Optional<List<LocalDate>> parseOptLocalDates(InputStream inputStream, String contentType) {
		return parseOptLiterals(inputStream, contentType, LocalDate::parse);
	}

	public static Optional<List<LocalDate>> parseNullLocalDates(InputStream inputStream, String contentType) {
		return parseNullLiterals(inputStream, contentType, LocalDate::parse);
	}

	public static _Base.Nillable<List<LocalDate>> parseNilLocalDates(InputStream inputStream, String contentType) {
		return parseNilLiterals(inputStream, contentType, LocalDate::parse);
	}

	// ----------------
	public static LocalDateTime parseLocalDateTime(InputStream inputStream, String contentType) {
		return parseLiteral(inputStream, contentType, LocalDateTime::parse);
	}

	public static Optional<LocalDateTime> parseOptLocalDateTime(InputStream inputStream, String contentType) {
		return parseOptLiteral(inputStream, contentType, LocalDateTime::parse);
	}

	public static Optional<LocalDateTime> parseNullLocalDateTime(InputStream inputStream, String contentType) {
		return parseNullLiteral(inputStream, contentType, LocalDateTime::parse);
	}

	public static _Base.Nillable<LocalDateTime> parseNilLocalDateTime(InputStream inputStream, String contentType) {
		return parseNilLiteral(inputStream, contentType, LocalDateTime::parse);
	}

	public static List<LocalDateTime> parseLocalDateTimes(InputStream inputStream, String contentType) {
		return parseLiterals(inputStream, contentType, LocalDateTime::parse);
	}

	public static Optional<List<LocalDateTime>> parseNullLocalDateTimes(InputStream inputStream, String contentType) {
		return parseNullLiterals(inputStream, contentType, LocalDateTime::parse);
	}

	public static Optional<List<LocalDateTime>> parseOptLocalDateTimes(InputStream inputStream, String contentType) {
		return parseOptLiterals(inputStream, contentType, LocalDateTime::parse);
	}

	public static _Base.Nillable<List<LocalDateTime>> parseNilLocalDateTimes(InputStream inputStream,
			String contentType) {
		return parseNilLiterals(inputStream, contentType, LocalDateTime::parse);
	}

	// ----------------
	public static ZonedDateTime parseZonedDateTime(InputStream inputStream, String contentType) {
		return parseLiteral(inputStream, contentType, ZonedDateTime::parse);
	}

	public static Optional<ZonedDateTime> parseOptZonedDateTime(InputStream inputStream, String contentType) {
		return parseOptLiteral(inputStream, contentType, ZonedDateTime::parse);
	}

	public static Optional<ZonedDateTime> parseNullZonedDateTime(InputStream inputStream, String contentType) {
		return parseNullLiteral(inputStream, contentType, ZonedDateTime::parse);
	}

	public static _Base.Nillable<ZonedDateTime> parseNilZonedDateTime(InputStream inputStream, String contentType) {
		return parseNilLiteral(inputStream, contentType, ZonedDateTime::parse);
	}

	public static List<ZonedDateTime> parseZonedDateTimes(InputStream inputStream, String contentType) {
		return parseLiterals(inputStream, contentType, ZonedDateTime::parse);
	}

	public static Optional<List<ZonedDateTime>> parseOptZonedDateTimes(InputStream inputStream, String contentType) {
		return parseOptLiterals(inputStream, contentType, ZonedDateTime::parse);
	}

	public static Optional<List<ZonedDateTime>> parseNullZonedDateTimes(InputStream inputStream, String contentType) {
		return parseNullLiterals(inputStream, contentType, ZonedDateTime::parse);
	}

	public static _Base.Nillable<List<ZonedDateTime>> parseNilZonedDateTimes(InputStream inputStream,
			String contentType) {
		return parseNilLiterals(inputStream, contentType, ZonedDateTime::parse);
	}

	// ----------------
	public static LocalTime parseLocalTime(InputStream inputStream, String contentType) {
		return parseLiteral(inputStream, contentType, LocalTime::parse);
	}

	public static Optional<LocalTime> parseOptLocalTime(InputStream inputStream, String contentType) {
		return parseOptLiteral(inputStream, contentType, LocalTime::parse);
	}

	public static Optional<LocalTime> parseNullLocalTime(InputStream inputStream, String contentType) {
		return parseNullLiteral(inputStream, contentType, LocalTime::parse);
	}

	public static _Base.Nillable<LocalTime> parseNilLocalTime(InputStream inputStream, String contentType) {
		return parseNilLiteral(inputStream, contentType, LocalTime::parse);
	}

	public static List<LocalTime> parseLocalTimes(InputStream inputStream, String contentType) {
		return parseLiterals(inputStream, contentType, LocalTime::parse);
	}

	public static Optional<List<LocalTime>> parseOptLocalTimes(InputStream inputStream, String contentType) {
		return parseOptLiterals(inputStream, contentType, LocalTime::parse);
	}

	public static Optional<List<LocalTime>> parseNullLocalTimes(InputStream inputStream, String contentType) {
		return parseNullLiterals(inputStream, contentType, LocalTime::parse);
	}

	public static _Base.Nillable<List<LocalTime>> parseNilLocalTimes(InputStream inputStream, String contentType) {
		return parseNilLiterals(inputStream, contentType, LocalTime::parse);
	}

	// ----------------
	public static <T> T parseObject(
		InputStream inputStream, 
		String contentType, 
		Function<JsonObject, T> parser, 
		Class<T> type) {
		var value = decodeValue(inputStream, contentType, TypeInfo.value(type));
		if (value.getValueType() != JsonValue.ValueType.OBJECT) {
			throw new IllegalArgumentException("Expected object value, but got: " + value);
		}
		return parser.apply((JsonObject) value);
	}

	public static <T> Optional<T> parseOptObject(
			InputStream inputStream, 
			String contentType,
			Function<JsonObject, T> parser,
			Class<T> type) {
		return parseOptStream(inputStream, is -> {
			var value = decodeValue(is, contentType, TypeInfo.value(type));
			if (value.getValueType() != JsonValue.ValueType.OBJECT) {
				throw new IllegalArgumentException("Expected object value, but got: " + value);
			}
			return Optional.of(parser.apply((JsonObject) value));
		});
	}

	public static <T> Optional<T> parseNullObject(
			InputStream inputStream, 
			String contentType,
			Function<JsonObject, T> parser,
			Class<T> type) {
		var value = decodeValue(inputStream, contentType, TypeInfo.value(type).withNullable());
		if (value.getValueType() == JsonValue.ValueType.NULL) {
			return Optional.empty();
		} else if (value.getValueType() == JsonValue.ValueType.OBJECT) {
			return Optional.of(parser.apply((JsonObject) value));
		}
		throw new IllegalArgumentException("Expected object value or null, but got: " + value);
	}

	public static <T> _Base.Nillable<T> parseNilObject(
			InputStream inputStream, 
			String contentType,
			Function<JsonObject, T> parser,
			Class<T> type) {
		return parseNilStream(inputStream, is -> {
			var value = decodeValue(is, contentType, TypeInfo.value(type).withNullable());
			if (value.getValueType() == JsonValue.ValueType.NULL) {
				return _NillableImpl.nill();
			} else if (value.getValueType() == JsonValue.ValueType.OBJECT) {
				return _NillableImpl.of(parser.apply((JsonObject) value));
			}
			throw new IllegalArgumentException("Expected object value or null, but got: " + value);
		});
	}

	public static <T> List<T> parseObjects(
			InputStream inputStream, 
			String contentType, 
			Function<JsonObject, T> parser,
			Class<T> type) {
		return parseListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.OBJECT) {
				throw new IllegalArgumentException("Expected object value, but got: " + v);
			}
			return parser.apply((JsonObject) v);
		}, type);
	}

	public static <T> Optional<List<T>> parseOptObjects(
			InputStream inputStream, 
			String contentType,
			Function<JsonObject, T> parser, 
			Class<T> type) {
		return parseOptListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.OBJECT) {
				throw new IllegalArgumentException("Expected object value, but got: " + v);
			}
			return parser.apply((JsonObject) v);
		}, type);
	}

	public static <T> Optional<List<T>> parseNullObjects(
			InputStream inputStream, 
			String contentType,
			Function<JsonObject, T> parser, 
			Class<T> type) {
		return parseNullListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.OBJECT) {
				throw new IllegalArgumentException("Expected object value, but got: " + v);
			}
			return parser.apply((JsonObject) v);
		}, type);
	}

	public static <T> _Base.Nillable<List<T>> parseNilObjects(
			InputStream inputStream, 
			String contentType,
			Function<JsonObject, T> parser, 
			Class<T> type) {
		return parseNilListStream(inputStream, contentType, v -> {
			if (v.getValueType() != JsonValue.ValueType.OBJECT) {
				throw new IllegalArgumentException("Expected object value, but got: " + v);
			}
			return parser.apply((JsonObject) v);
		}, type);
	}

	// ----------------

	public static JsonValue parseValue(Path path, String contentType, TypeInfo<?> type) {
		try (InputStream inputStream = Files.newInputStream(path)) {
			return decodeValue(inputStream, contentType, type);
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	// ----------------
${toString(decodeFunctions, '\t')}
}`);
}
