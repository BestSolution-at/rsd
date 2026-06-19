import { CompositeGeneratorNode } from 'langium/generate';
import { toNodeTree } from '../util.js';

export function generateBaseUtilsContent(
	artifactConfig: { rootPackageName: string },
	fqn: (type: string) => string,
): CompositeGeneratorNode {
	fqn('java.net.URLEncoder');
	fqn('java.nio.charset.StandardCharsets');
	fqn('java.time.LocalDate');
	fqn('java.time.LocalDateTime');
	fqn('java.time.LocalTime');
	fqn('java.time.OffsetDateTime');
	fqn('java.time.ZonedDateTime');
	fqn('java.util.List');
	fqn('java.util.Map');
	fqn('java.util.stream.Collectors');
	fqn('java.util.stream.Stream');
	fqn('java.util.ArrayList');
	fqn('java.util.Base64');
	fqn('java.util.HexFormat');

	fqn(`${artifactConfig.rootPackageName}.impl.model.json._JsonUtils`);
	fqn(`${artifactConfig.rootPackageName}.impl.model.json._JsonUtils.TypeInfo`);
	fqn(`${artifactConfig.rootPackageName}.model._Base`);

	const compilationContent = toNodeTree(`
public class BaseUtils {
	private record SearchParam(String key, Object value) {

	}

	public static class URLSearchParams {
		private List<SearchParam> params = new ArrayList<>();

		public void append(String key, Object value) {
			params.add(new SearchParam(key, value));
		}

		public String toQueryString() {
			if (params.isEmpty()) {
				return "";
			}
			return "?" + params.stream()
					.map(e -> "%s=%s".formatted(encodeQueryString(e.key), encodeQueryString(e.value)))
					.collect(Collectors.joining("&"));
		}
	}

	private static String encodeQueryString(Object value) {
		if (value == null) {
			return "null";
		}

		if (value instanceof byte[] bytes) {
			return encodeBase64(bytes);
		}

		return URLEncoder.encode(value.toString(), StandardCharsets.UTF_8);
	}

	public static String[] toHeaders(Map<String, String> data) {
		return data.entrySet().stream()
				.flatMap(e -> Stream.of(e.getKey(), e.getValue()))
				.toArray(String[]::new);
	}

	public static byte[] ofBoolean(
			Boolean value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.BOOLEAN);
	}

	public static byte[] ofBooleanList(
			List<Boolean> value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.BOOLEAN.withMulti());
	}

	public static byte[] ofShort(
			Short value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.SHORT);
	}

	public static byte[] ofShortList(
			List<Short> value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.SHORT.withMulti());
	}

	public static byte[] ofInt(
			Integer value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.INTEGER);
	}

	public static byte[] ofIntList(
			List<Integer> value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.INTEGER.withMulti());
	}

	public static byte[] ofLong(
			Long value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.LONG);
	}

	public static byte[] ofLongList(
			List<Long> value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.LONG.withMulti());
	}

	public static byte[] ofFloat(
			Float value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.FLOAT);
	}

	public static byte[] ofFloatList(
			List<Float> value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.FLOAT.withMulti());
	}

	public static byte[] ofDouble(
			Double value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.DOUBLE);
	}

	public static byte[] ofDoubleList(
			List<Double> value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.DOUBLE.withMulti());
	}

	public static byte[] ofString(
			String value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.STRING);
	}

	public static byte[] ofStringList(
			List<String> value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.STRING.withMulti());
	}

	public static byte[] ofLocalDate(
			LocalDate value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.STRING);
	}

	public static byte[] ofLocalDateList(
			List<LocalDate> value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.STRING.withMulti());
	}

	public static byte[] ofLocalDateTime(
			LocalDateTime value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.STRING);
	}

	public static byte[] ofLocalDateTimeList(
			List<LocalDateTime> value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.STRING.withMulti());
	}

	public static byte[] ofZonedDateTime(
			ZonedDateTime value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.STRING);
	}

	public static byte[] ofZonedDateTimeList(
			List<ZonedDateTime> value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.STRING.withMulti());
	}

	public static byte[] ofLocalTime(
			LocalTime value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.STRING);
	}

	public static byte[] ofLocalTimeList(
			List<LocalTime> value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.STRING.withMulti());
	}

	public static byte[] ofOffsetDateTime(
			OffsetDateTime value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.STRING);
	}

	public static byte[] ofOffsetDateTimeList(
			List<OffsetDateTime> value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.STRING.withMulti());
	}

	public static byte[] ofLiteral(
			Object value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.STRING);
	}

	public static <T> byte[] ofLiteralList(
			List<T> value,
			boolean nullable,
			String contentType) {
		return of(value, nullable, contentType, TypeInfo.STRING.withMulti());
	}

	public static <T extends _Base.BaseData> byte[] ofObject(
			T value,
			boolean nullable,
			String contentType,
			Class<T> type) {
		return of(value, nullable, contentType, TypeInfo.value(type));
	}

	public static <T extends _Base.BaseData> byte[] ofObjectList(
			List<T> value,
			boolean nullable,
			String contentType,
			Class<T> type) {
		return of(value, nullable, contentType, TypeInfo.value(type).withMulti());
	}

	private static byte[] of(
			Object value,
			boolean nullable,
			String contentType,
			TypeInfo<?> baseTypeInfo) {
		var typeInfo = baseTypeInfo;
		if (nullable) {
			typeInfo = typeInfo.withNullable();
		}

		return _JsonUtils.encodeValue(value, contentType, typeInfo);
	}

	public static String encodeAsciiString(String text) {
		text = text.replace("\\\\u", "\\\\u005Cu"); // Escape existing \\\\u sequences
		int leading = 0;
		while (leading < text.length() && text.charAt(leading) == ' ') leading++;
		if (leading > 0) {
			text = "\\\\u0020".repeat(leading) + text.substring(leading);
		}
		int trailing = 0;
		int len = text.length();
		while (trailing < len && text.charAt(len - 1 - trailing) == ' ') trailing++;
		if (trailing > 0) {
			text = text.substring(0, len - trailing) + "\\\\u0020".repeat(trailing);
		}
		var b = new StringBuilder(text.length());
		var l = text.length();
		for (var i = 0; i < l; i++) {
			var c = text.charAt(i);
			// Escape non-printable characters, comma and all non-ASCII characters
			if (c < 32 || c > 126 || c == 44) {
				b.append(String.format("\\\\u%04x", (int) c));
			} else {
				b.append(c);
			}
		}

		return b.toString();
	}

	public static String encodeBase64(byte[] value) {
		return Base64.getEncoder().encodeToString(value);
	}

	public static String encodeURIComponent(String value) {
		var bytes = value.getBytes(StandardCharsets.UTF_8);
		var result = new StringBuilder();

		HexFormat hex = HexFormat.of().withUpperCase();
		for (byte b : bytes) {
			// Unreserved characters according to RFC 3986
			if ((b >= 'A' && b <= 'Z') // Alpanumeric characters uppercase
					|| (b >= 'a' && b <= 'z') // Alpanumeric characters lowercase
					|| (b >= '0' && b <= '9') // Numeric characters
					|| b == '-' || b == '_' || b == '.' // Unreserved Part 1
					|| b == '!' || b == '~' || b == '*' // Unreserved Part 2
					|| b == '\\'' || b == '(' || b == ')' // Unreserved Part 3
			) {
				result.append((char) b); // safe as we know this is an ascii character
			} else {
				result.append('%');
				hex.toHexDigits(result, b);
			}
		}
		return result.toString();
	}
}
`);

	return compilationContent;
}
