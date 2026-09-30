package dev.rsdlang.sample.client.model.impl.avro;

import org.apache.avro.generic.GenericData;
import org.apache.avro.generic.GenericEnumSymbol;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.generic.GenericRecordBuilder;

import dev.rsdlang.sample.client.model._Base;
import jakarta.json.JsonNumber;

import org.apache.avro.Schema;
import java.util.List;
import java.util.Optional;
import java.util.OptionalDouble;
import java.util.OptionalInt;
import java.util.OptionalLong;
import java.util.function.Function;
import java.util.stream.Stream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class _AvroUtils {

	public static GenericRecordBuilder newBuilder(_AvroSchema.AvroTypes type) {
		Schema schema = _AvroSchema.getInstance().getTypeSchema(type);
		return new GenericRecordBuilder(schema);
	}

	public static final GenericData.EnumSymbol NULL = new GenericData.EnumSymbol(
			_AvroSchema.getInstance().getTypeSchema(_AvroSchema.AvroTypes.NULL), "NULL");

	private static final Optional<Boolean> OPTIONAL_FALSE = Optional.of(Boolean.FALSE);
	private static final Optional<Boolean> OPTIONAL_TRUE = Optional.of(Boolean.TRUE);
	private static final _Base.Nillable<Boolean> NILLABLE_FALSE = _NillableImpl.of(Boolean.FALSE);
	private static final _Base.Nillable<Boolean> NILLABLE_TRUE = _NillableImpl.of(Boolean.TRUE);

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
		} else if (value instanceof OffsetDateTime odt) {
			return toString(odt);
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

	public static String toString(OffsetDateTime value) {
		return DateTimeFormatter.ISO_OFFSET_DATE_TIME.format(value);
	}

	public static String toString(ZonedDateTime value) {
		return DateTimeFormatter.ISO_ZONED_DATE_TIME.format(value);
	}

	public static boolean isNull(GenericRecord object, String property) {
		if (!object.hasField(property)) {
			return false;
		}
		var data = object.get(property);
		if (data instanceof GenericEnumSymbol e) {
			return "NULL".equals(e.getSchema().getName());
		}
		return false;
	}

	public static boolean hasValue(GenericRecord object, String property) {
		if (!object.hasField(property)) {
			return false;
		}
		return object.get(property) != null;
	}

	private static boolean getBoolean(GenericRecord object, String property) {
		return (Boolean) object.get(property);
	}

	private static int getInt(GenericRecord object, String property) {
		return ((Number) object.get(property)).intValue();
	}

	private static long getLong(GenericRecord object, String property) {
		return ((Number) object.get(property)).longValue();
	}

	private static float getFloat(GenericRecord object, String property) {
		return ((Number) object.get(property)).floatValue();
	}

	private static double getDouble(GenericRecord object, String property) {
		return ((Number) object.get(property)).doubleValue();
	}

	private static String getString(GenericRecord object, String property) {
		return object.get(property).toString();
	}

	@SuppressWarnings("unchecked")
	public static <J, T> Stream<T> mapToStream(GenericRecord object, String property, Class<J> clazz,
			Function<J, T> mapper) {
		if (object.hasField(property)) {
			return mapToStream((List<J>) object.get(property), clazz, mapper);
		}
		return Stream.empty();
	}

	private static <J, T> Stream<T> mapToStream(List<J> array,
			Class<J> clazz, Function<J, T> mapper) {
		return array
				.stream()
				.map(mapper);
	}

	public static <J, T> Optional<Stream<T>> mapToNullStream(GenericRecord object, String property,
			Class<J> clazz, Function<J, T> mapper) {
		if (!isNull(object, property)) {
			return Optional.of(mapToStream(object, property, clazz, mapper));
		}
		return Optional.empty();
	}

	public static <J, T> Optional<Stream<T>> mapToOptStream(GenericRecord object, String property,
			Class<J> clazz, Function<J, T> mapper) {
		if (hasValue(object, property)) {
			return Optional.of(mapToStream(object, property, clazz, mapper));
		}
		return Optional.empty();
	}

	public static <J, T> _Base.Nillable<Stream<T>> mapToNilStream(GenericRecord object, String property,
			Class<J> clazz, Function<J, T> mapper) {
		if (hasValue(object, property)) {
			if (isNull(object, property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapToStream(object, property, clazz, mapper));
		}
		return _NillableImpl.undefined();
	}

	// ----------------

	public static <T> T mapLiteral(GenericRecord object, String property,
			Function<String, T> converter) {
		return converter.apply(object.get(property).toString());
	}

	public static <T> Optional<T> mapNullLiteral(GenericRecord object, String property, Function<String, T> converter) {
		if (isNull(object, property)) {
			return Optional.empty();
		}
		return Optional.of(mapLiteral(object, property, converter));
	}

	public static <T> Optional<T> mapOptLiteral(GenericRecord object, String property, Function<String, T> converter) {
		if (hasValue(object, property)) {
			return Optional.of(mapLiteral(object, property, converter));
		}
		return Optional.empty();
	}

	public static <T> _Base.Nillable<T> mapNilLiteral(GenericRecord object, String property,
			Function<String, T> converter) {
		if (hasValue(object, property)) {
			if (isNull(object, property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapLiteral(object, property, converter));
		}
		return _NillableImpl.undefined();
	}

	public static <T> List<T> mapLiterals(GenericRecord object, String property,
			Function<String, T> mapper) {
		return mapToStream(object, property, String.class, mapper).toList();
	}

	public static <T> Optional<List<T>> mapNullLiterals(GenericRecord object, String property,
			Function<String, T> mapper) {
		return mapToNullStream(object, property, String.class, Function.identity()).map(s -> s.map(mapper))
				.map(Stream::toList);
	}

	public static <T> Optional<List<T>> mapOptLiterals(GenericRecord object, String property,
			Function<String, T> mapper) {
		return mapToOptStream(object, property, String.class,
				Function.identity()).map(s -> s.map(mapper))
				.map(Stream::toList);
	}

	public static <T> _Base.Nillable<List<T>> mapNilLiterals(GenericRecord object,
			String property,
			Function<String, T> mapper) {
		return mapToNilStream(object, property, String.class,
				Function.identity()).map(s -> s.map(mapper))
				.map(Stream::toList);
	}

	public static <T> T mapLiteral(Object value, Function<String, T> converter) {
		if (value instanceof String s) {
			return converter.apply(s);
		}
		throw new IllegalArgumentException("Expected String but got: " + value.getClass().getName());
	}

	// ----------------

	public static <T> T mapEnum(GenericRecord object, String property,
			Function<GenericEnumSymbol<?>, T> converter) {
		return converter.apply((GenericEnumSymbol<?>) object.get(property));
	}

	public static <T> Optional<T> mapNullEnum(GenericRecord object, String property,
			Function<GenericEnumSymbol<?>, T> converter) {
		if (isNull(object, property)) {
			return Optional.empty();
		}
		return Optional.of(mapEnum(object, property, converter));
	}

	public static <T> Optional<T> mapOptEnum(GenericRecord object, String property,
			Function<GenericEnumSymbol<?>, T> converter) {
		if (hasValue(object, property)) {
			return Optional.of(mapEnum(object, property, converter));
		}
		return Optional.empty();
	}

	public static <T> _Base.Nillable<T> mapNilEnum(GenericRecord object, String property,
			Function<GenericEnumSymbol<?>, T> converter) {
		if (hasValue(object, property)) {
			if (isNull(object, property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapEnum(object, property, converter));
		}
		return _NillableImpl.undefined();
	}

	public static <T> List<T> mapEnums(GenericRecord object, String property,
			Function<GenericEnumSymbol, T> mapper) {
		return mapToStream(object, property, GenericEnumSymbol.class, mapper).toList();
	}

	public static <T> Optional<List<T>> mapNullEnums(GenericRecord object, String property,
			Function<GenericEnumSymbol, T> mapper) {
		return mapToNullStream(object, property, GenericEnumSymbol.class, Function.identity()).map(s -> s.map(mapper))
				.map(Stream::toList);
	}

	public static <T> Optional<List<T>> mapOptEnums(GenericRecord object, String property,
			Function<GenericEnumSymbol, T> mapper) {
		return mapToOptStream(object, property, GenericEnumSymbol.class,
				Function.identity()).map(s -> s.map(mapper))
				.map(Stream::toList);
	}

	public static <T> _Base.Nillable<List<T>> mapNilEnums(GenericRecord object,
			String property,
			Function<GenericEnumSymbol, T> mapper) {
		return mapToNilStream(object, property, GenericEnumSymbol.class,
				Function.identity()).map(s -> s.map(mapper))
				.map(Stream::toList);
	}

	public static <T> T mapEnum(Object value, Function<GenericEnumSymbol<?>, T> converter) {
		if (value instanceof GenericEnumSymbol<?> s) {
			return converter.apply(s);
		}
		throw new IllegalArgumentException("Expected GenericEnumSymbol but got: " + value.getClass().getName());
	}

	// public static <T> T mapNumberLiteral(Object value, Function<Number, T>
	// converter) {
	// if (value instanceof Number n) {
	// return converter.apply(n);
	// }
	// throw new IllegalArgumentException("Expected Number but got: " +
	// value.getClass().getName());
	// }

	// ----------------

	public static <T> T mapObject(GenericRecord object, String property,
			Function<GenericRecord, T> converter) {
		return converter.apply((GenericRecord) object.get(property));
	}

	public static <T> Optional<T> mapOptObject(GenericRecord object, String property,
			Function<GenericRecord, T> converter) {
		if (hasValue(object, property)) {
			return Optional.of(mapObject(object, property, converter));
		}
		return Optional.empty();
	}

	public static <T> _Base.Nillable<T> mapNilObject(GenericRecord object, String property,
			Function<GenericRecord, T> converter) {
		if (hasValue(object, property)) {
			if (isNull(object, property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapObject(object, property, converter));
		}
		return _NillableImpl.undefined();
	}

	public static <T> Optional<T> mapNullObject(GenericRecord object, String property,
			Function<GenericRecord, T> converter) {
		if (isNull(object, property)) {
			return Optional.empty();
		}
		return Optional.of(mapObject(object, property, converter));
	}

	public static <T> List<T> mapObjects(GenericRecord object, String property,
			Function<GenericRecord, T> converter) {
		return mapToStream(object, property, GenericRecord.class, converter).toList();
	}

	public static <T> Optional<List<T>> mapNullObjects(GenericRecord object, String property,
			Function<GenericRecord, T> converter) {
		return mapToNullStream(object, property, GenericRecord.class,
				converter).map(Stream::toList);
	}

	public static <T> Optional<List<T>> mapOptObjects(GenericRecord object, String property,
			Function<GenericRecord, T> converter) {
		return mapToOptStream(object, property, GenericRecord.class,
				converter).map(Stream::toList);
	}

	public static <T> _Base.Nillable<List<T>> mapNilObjects(GenericRecord object,
			String property,
			Function<GenericRecord, T> converter) {
		return mapToNilStream(object, property, GenericRecord.class,
				converter).map(Stream::toList);
	}

	// ----------------

	public static Optional<List<Boolean>> mapNullBooleans(GenericRecord object, String property) {
		return mapToNullStream(object, property, Boolean.class, Function.identity()).map(Stream::toList);
	}

	public static _Base.Nillable<List<Boolean>> mapNilBooleans(GenericRecord object, String property) {
		return mapToNilStream(object, property, Boolean.class, Function.identity()).map(Stream::toList);
	}

	public static Optional<List<Boolean>> mapOptBooleans(GenericRecord object, String property) {
		return mapToOptStream(object, property, Boolean.class, Function.identity()).map(Stream::toList);
	}

	public static List<Boolean> mapBooleans(GenericRecord object, String property) {
		return mapToStream(object, property, Boolean.class, Function.identity()).toList();
	}

	public static Optional<Boolean> mapNullBoolean(GenericRecord object, String property) {
		if (isNull(object, property)) {
			return Optional.empty();
		}
		return getBoolean(object, property) ? OPTIONAL_TRUE : OPTIONAL_FALSE;
	}

	public static _Base.Nillable<Boolean> mapNilBoolean(GenericRecord object, String property) {
		if (hasValue(object, property)) {
			if (isNull(object, property)) {
				return _NillableImpl.nill();
			}
			return getBoolean(object, property) ? NILLABLE_TRUE : NILLABLE_FALSE;
		}
		return _NillableImpl.undefined();
	}

	public static Optional<Boolean> mapOptBoolean(GenericRecord object, String property) {
		if (hasValue(object, property)) {
			return getBoolean(object, property) ? OPTIONAL_TRUE : OPTIONAL_FALSE;
		}
		return Optional.empty();
	}

	public static boolean mapBoolean(GenericRecord object, String property) {
		return getBoolean(object, property);
	}

	public static boolean mapBoolean(Object value) {
		return ((Boolean) value).booleanValue();
	}

	// ----------------

	public static Optional<List<Short>> mapNullShorts(GenericRecord object, String property) {
		return mapToNullStream(object, property, JsonNumber.class, v -> v.numberValue().shortValue()).map(Stream::toList);
	}

	public static _Base.Nillable<List<Short>> mapNilShorts(GenericRecord object,
			String property) {
		return mapToNilStream(object, property, JsonNumber.class, v -> v.numberValue().shortValue()).map(Stream::toList);
	}

	public static Optional<List<Short>> mapOptShorts(GenericRecord object, String property) {
		return mapToOptStream(object, property, JsonNumber.class, v -> v.numberValue().shortValue()).map(Stream::toList);
	}

	public static List<Short> mapShorts(GenericRecord object, String property) {
		return mapToStream(object, property, JsonNumber.class, v -> v.numberValue().shortValue()).toList();
	}

	public static Optional<Short> mapNullShort(GenericRecord object, String property) {
		if (isNull(object, property)) {
			return Optional.empty();
		}
		return Optional.of(mapShort(object, property));
	}

	public static short mapShort(GenericRecord object, String property) {
		return (short) getInt(object, property);
	}

	public static _Base.Nillable<Short> mapNilShort(GenericRecord object, String property) {
		if (hasValue(object, property)) {
			if (isNull(object, property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapShort(object, property));
		}
		return _NillableImpl.undefined();
	}

	public static Optional<Short> mapOptShort(GenericRecord object, String property) {
		if (hasValue(object, property)) {
			return Optional.of(mapShort(object, property));
		}
		return Optional.empty();
	}

	public static short mapShort(Object value) {
		if (value instanceof Number n) {
			return n.shortValue();
		}
		throw new IllegalArgumentException("Expected Number but got: " + value.getClass().getName());
	}

	// ----------------
	public static Optional<List<Integer>> mapNullInts(GenericRecord object, String property) {
		return mapToNullStream(object, property, JsonNumber.class,
				JsonNumber::intValue).map(Stream::toList);
	}

	public static _Base.Nillable<List<Integer>> mapNilInts(GenericRecord object,
			String property) {
		return mapToNilStream(object, property, JsonNumber.class,
				JsonNumber::intValue).map(Stream::toList);
	}

	public static Optional<List<Integer>> mapOptInts(GenericRecord object, String property) {
		return mapToOptStream(object, property, JsonNumber.class,
				JsonNumber::intValue).map(Stream::toList);
	}

	public static List<Integer> mapInts(GenericRecord object, String property) {
		return mapToStream(object, property, JsonNumber.class,
				JsonNumber::intValue).toList();
	}

	public static OptionalInt mapNullInt(GenericRecord object, String property) {
		if (isNull(object, property)) {
			return OptionalInt.empty();
		}
		return OptionalInt.of(mapInt(object, property));
	}

	public static int mapInt(GenericRecord object, String property) {
		return getInt(object, property);
	}

	public static _Base.Nillable<Integer> mapNilInt(GenericRecord object, String property) {
		if (hasValue(object, property)) {
			if (isNull(object, property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapInt(object, property));
		}
		return _NillableImpl.undefined();
	}

	public static OptionalInt mapOptInt(GenericRecord object, String property) {
		if (hasValue(object, property)) {
			return OptionalInt.of(mapInt(object, property));
		}
		return OptionalInt.empty();
	}

	public static int mapInt(Object value) {
		if (value instanceof Number n) {
			return n.intValue();
		}
		throw new IllegalArgumentException("Expected Number but got: " + value.getClass().getName());
	}

	public static int mapInteger(Object value) {
		if (value instanceof Number n) {
			return n.intValue();
		}
		throw new IllegalArgumentException("Expected Number but got: " + value.getClass().getName());
	}

	// ----------------
	public static Optional<List<Long>> mapNullLongs(GenericRecord object, String property) {
		return mapToNullStream(object, property, Number.class, v -> v.longValue()).map(Stream::toList);
	}

	public static _Base.Nillable<List<Long>> mapNilLongs(GenericRecord object,
			String property) {
		return mapToNilStream(object, property, Number.class, v -> v.longValue()).map(Stream::toList);
	}

	public static Optional<List<Long>> mapOptLongs(GenericRecord object, String property) {
		return mapToOptStream(object, property, Number.class, v -> v.longValue()).map(Stream::toList);
	}

	public static List<Long> mapLongs(GenericRecord object, String property) {
		return mapToStream(object, property, Number.class, v -> v.longValue()).toList();
	}

	public static OptionalLong mapNullLong(GenericRecord object, String property) {
		if (isNull(object, property)) {
			return OptionalLong.empty();
		}
		return OptionalLong.of(mapLong(object, property));
	}

	public static long mapLong(GenericRecord object, String property) {
		return getLong(object, property);
	}

	public static _Base.Nillable<Long> mapNilLong(GenericRecord object, String property) {
		if (hasValue(object, property)) {
			if (isNull(object, property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapLong(object, property));
		}
		return _NillableImpl.undefined();
	}

	public static OptionalLong mapOptLong(GenericRecord object, String property) {
		if (hasValue(object, property)) {
			return OptionalLong.of(mapLong(object, property));
		}
		return OptionalLong.empty();
	}

	public static long mapLong(Object value) {
		if (value instanceof Number n) {
			return n.longValue();
		}
		throw new IllegalArgumentException("Expected Number but got: " + value.getClass().getName());
	}

	// ----------------
	public static Optional<List<Float>> mapNullFloats(GenericRecord object, String property) {
		return mapToNullStream(object, property, Number.class, v -> v.floatValue()).map(Stream::toList);
	}

	public static _Base.Nillable<List<Float>> mapNilFloats(GenericRecord object, String property) {
		return mapToNilStream(object, property, Number.class, v -> v.floatValue()).map(Stream::toList);
	}

	public static Optional<List<Float>> mapOptFloats(GenericRecord object, String property) {
		return mapToOptStream(object, property, Number.class, v -> v.floatValue()).map(Stream::toList);
	}

	public static List<Float> mapFloats(GenericRecord object, String property) {
		return mapToStream(object, property, Number.class, v -> v.floatValue()).toList();
	}

	public static Optional<Float> mapNullFloat(GenericRecord object, String property) {
		if (isNull(object, property)) {
			return Optional.empty();
		}
		return Optional.of(mapFloat(object, property));
	}

	public static float mapFloat(GenericRecord object, String property) {
		return getFloat(object, property);
	}

	public static _Base.Nillable<Float> mapNilFloat(GenericRecord object, String property) {
		if (hasValue(object, property)) {
			if (isNull(object, property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapFloat(object, property));
		}
		return _NillableImpl.undefined();
	}

	public static Optional<Float> mapOptFloat(GenericRecord object, String property) {
		if (hasValue(object, property)) {
			return Optional.of(mapFloat(object, property));
		}
		return Optional.empty();
	}

	public static float mapFloat(Object value) {
		if (value instanceof Number n) {
			return n.floatValue();
		}
		throw new IllegalArgumentException("Expected Number but got: " + value.getClass().getName());
	}

	// ----------------
	public static Optional<List<Double>> mapNullDoubles(GenericRecord object, String property) {
		return mapToNullStream(object, property, Number.class,
				v -> v.doubleValue()).map(Stream::toList);
	}

	public static _Base.Nillable<List<Double>> mapNilDoubles(GenericRecord object,
			String property) {
		return mapToNilStream(object, property, Number.class,
				v -> v.doubleValue()).map(Stream::toList);
	}

	public static Optional<List<Double>> mapOptDoubles(GenericRecord object, String property) {
		return mapToOptStream(object, property, Number.class,
				v -> v.doubleValue()).map(Stream::toList);
	}

	public static List<Double> mapDoubles(GenericRecord object, String property) {
		return mapToStream(object, property, Number.class,
				v -> v.doubleValue()).toList();
	}

	public static OptionalDouble mapNullDouble(GenericRecord object, String property) {
		if (isNull(object, property)) {
			return OptionalDouble.empty();
		}
		return OptionalDouble.of(mapDouble(object, property));
	}

	public static double mapDouble(GenericRecord object, String property) {
		return getDouble(object, property);
	}

	public static _Base.Nillable<Double> mapNilDouble(GenericRecord object, String property) {
		if (hasValue(object, property)) {
			if (isNull(object, property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapDouble(object, property));
		}
		return _NillableImpl.undefined();
	}

	public static OptionalDouble mapOptDouble(GenericRecord object, String property) {
		if (hasValue(object, property)) {
			return OptionalDouble.of(mapDouble(object, property));
		}
		return OptionalDouble.empty();
	}

	public static double mapDouble(Object value) {
		if (value instanceof Number n) {
			return n.doubleValue();
		}
		throw new IllegalArgumentException("Expected Number but got: " + value.getClass().getName());
	}

	// ----------------
	public static Optional<List<String>> mapNullStrings(GenericRecord object, String property) {
		return mapToNullStream(object, property, String.class, Function.identity()).map(Stream::toList);
	}

	public static _Base.Nillable<List<String>> mapNilStrings(GenericRecord object,
			String property) {
		return mapToNilStream(object, property, String.class, Function.identity()).map(Stream::toList);
	}

	public static Optional<List<String>> mapOptStrings(GenericRecord object, String property) {
		return mapToOptStream(object, property, String.class, Function.identity()).map(Stream::toList);
	}

	public static List<String> mapStrings(GenericRecord object, String property) {
		return mapToStream(object, property, String.class, Function.identity()).toList();
	}

	public static Optional<String> mapNullString(GenericRecord object, String property) {
		if (isNull(object, property)) {
			return Optional.empty();
		}
		return Optional.of(mapString(object, property));
	}

	public static String mapString(GenericRecord object, String property) {
		return getString(object, property);
	}

	public static _Base.Nillable<String> mapNilString(GenericRecord object, String property) {
		if (hasValue(object, property)) {
			if (isNull(object, property)) {
				return _NillableImpl.nill();
			}
			return _NillableImpl.of(mapString(object, property));
		}
		return _NillableImpl.undefined();
	}

	public static Optional<String> mapOptString(GenericRecord object, String property) {
		if (hasValue(object, property)) {
			return Optional.of(mapString(object, property));
		}
		return Optional.empty();
	}

	public static String mapString(Object value) {
		return mapLiteral(value, Function.identity());
	}

	// ----------------
	public static Optional<List<LocalDate>> mapNullLocalDates(GenericRecord object,
			String property) {
		return mapNullLiterals(object, property, LocalDate::parse);
	}

	public static _Base.Nillable<List<LocalDate>> mapNilLocalDates(GenericRecord object, String property) {
		return mapNilLiterals(object, property, LocalDate::parse);
	}

	public static Optional<List<LocalDate>> mapOptLocalDates(GenericRecord object, String property) {
		return mapOptLiterals(object, property, LocalDate::parse);
	}

	public static List<LocalDate> mapLocalDates(GenericRecord object, String property) {
		return mapLiterals(object, property, LocalDate::parse);
	}

	public static Optional<LocalDate> mapNullLocalDate(GenericRecord object, String property) {
		return mapNullLiteral(object, property, LocalDate::parse);
	}

	public static _Base.Nillable<LocalDate> mapNilLocalDate(GenericRecord object, String property) {
		return mapNilLiteral(object, property, LocalDate::parse);
	}

	public static Optional<LocalDate> mapOptLocalDate(GenericRecord object, String property) {
		return mapOptLiteral(object, property, LocalDate::parse);
	}

	public static LocalDate mapLocalDate(GenericRecord object, String property) {
		return mapLiteral(object, property, LocalDate::parse);
	}

	public static LocalDate mapLocalDate(Object value) {
		return mapLiteral(value, LocalDate::parse);
	}

	// ----------------
	public static Optional<List<LocalDateTime>> mapNullLocalDateTimes(GenericRecord object, String property) {
		return mapNullLiterals(object, property, LocalDateTime::parse);
	}

	public static _Base.Nillable<List<LocalDateTime>> mapNilLocalDateTimes(GenericRecord object, String property) {
		return mapNilLiterals(object, property, LocalDateTime::parse);
	}

	public static Optional<List<LocalDateTime>> mapOptLocalDateTimes(GenericRecord object, String property) {
		return mapOptLiterals(object, property, LocalDateTime::parse);
	}

	public static List<LocalDateTime> mapLocalDateTimes(GenericRecord object, String property) {
		return mapLiterals(object, property, LocalDateTime::parse);
	}

	public static Optional<LocalDateTime> mapNullLocalDateTime(GenericRecord object,
			String property) {
		return mapNullLiteral(object, property, LocalDateTime::parse);
	}

	public static _Base.Nillable<LocalDateTime> mapNilLocalDateTime(GenericRecord object, String property) {
		return mapNilLiteral(object, property, LocalDateTime::parse);
	}

	public static Optional<LocalDateTime> mapOptLocalDateTime(GenericRecord object,
			String property) {
		return mapOptLiteral(object, property, LocalDateTime::parse);
	}

	public static LocalDateTime mapLocalDateTime(GenericRecord object, String property) {
		return mapLiteral(object, property, LocalDateTime::parse);
	}

	public static LocalDateTime mapLocalDateTime(Object value) {
		return mapLiteral(value, LocalDateTime::parse);
	}

	// ----------------
	public static Optional<List<ZonedDateTime>> mapNullZonedDateTimes(GenericRecord object, String property) {
		return mapNullLiterals(object, property, ZonedDateTime::parse);
	}

	public static _Base.Nillable<List<ZonedDateTime>> mapNilZonedDateTimes(GenericRecord object, String property) {
		return mapNilLiterals(object, property, ZonedDateTime::parse);
	}

	public static Optional<List<ZonedDateTime>> mapOptZonedDateTimes(GenericRecord object, String property) {
		return mapOptLiterals(object, property, ZonedDateTime::parse);
	}

	public static List<ZonedDateTime> mapZonedDateTimes(GenericRecord object, String property) {
		return mapLiterals(object, property, ZonedDateTime::parse);
	}

	public static Optional<ZonedDateTime> mapNullZonedDateTime(GenericRecord object,
			String property) {
		return mapNullLiteral(object, property, ZonedDateTime::parse);
	}

	public static _Base.Nillable<ZonedDateTime> mapNilZonedDateTime(GenericRecord object, String property) {
		return mapNilLiteral(object, property, ZonedDateTime::parse);
	}

	public static Optional<ZonedDateTime> mapOptZonedDateTime(GenericRecord object,
			String property) {
		return mapOptLiteral(object, property, ZonedDateTime::parse);
	}

	public static ZonedDateTime mapZonedDateTime(GenericRecord object, String property) {
		return mapLiteral(object, property, ZonedDateTime::parse);
	}

	public static ZonedDateTime mapZonedDateTime(Object value) {
		return mapLiteral(value, ZonedDateTime::parse);
	}

	// ----------------
	public static Optional<List<LocalTime>> mapNullLocalTimes(GenericRecord object, String property) {
		return mapNullLiterals(object, property, LocalTime::parse);
	}

	public static _Base.Nillable<List<LocalTime>> mapNilLocalTimes(GenericRecord object, String property) {
		return mapNilLiterals(object, property, LocalTime::parse);
	}

	public static Optional<List<LocalTime>> mapOptLocalTimes(GenericRecord object, String property) {
		return mapOptLiterals(object, property, LocalTime::parse);
	}

	public static List<LocalTime> mapLocalTimes(GenericRecord object, String property) {
		return mapLiterals(object, property, LocalTime::parse);
	}

	public static Optional<LocalTime> mapNullLocalTime(GenericRecord object, String property) {
		return mapNullLiteral(object, property, LocalTime::parse);
	}

	public static _Base.Nillable<LocalTime> mapNilLocalTime(GenericRecord object, String property) {
		return mapNilLiteral(object, property, LocalTime::parse);
	}

	public static Optional<LocalTime> mapOptLocalTime(GenericRecord object, String property) {
		return mapOptLiteral(object, property, LocalTime::parse);
	}

	public static LocalTime mapLocalTime(GenericRecord object, String property) {
		return mapLiteral(object, property, LocalTime::parse);
	}

	public static LocalTime mapLocalTime(Object value) {
		return mapLiteral(value, LocalTime::parse);
	}

	// ----------------
	public static Optional<List<OffsetDateTime>> mapNullOffsetDateTimes(GenericRecord object, String property) {
		return mapNullLiterals(object, property, OffsetDateTime::parse);
	}

	public static _Base.Nillable<List<OffsetDateTime>> mapNilOffsetDateTimes(GenericRecord object, String property) {
		return mapNilLiterals(object, property, OffsetDateTime::parse);
	}

	public static Optional<List<OffsetDateTime>> mapOptOffsetDateTimes(GenericRecord object, String property) {
		return mapOptLiterals(object, property, OffsetDateTime::parse);
	}

	public static List<OffsetDateTime> mapOffsetDateTimes(GenericRecord object, String property) {
		return mapLiterals(object, property, OffsetDateTime::parse);
	}

	public static Optional<OffsetDateTime> mapNullOffsetDateTime(GenericRecord object, String property) {
		return mapNullLiteral(object, property, OffsetDateTime::parse);
	}

	public static _Base.Nillable<OffsetDateTime> mapNilOffsetDateTime(GenericRecord object, String property) {
		return mapNilLiteral(object, property, OffsetDateTime::parse);
	}

	public static Optional<OffsetDateTime> mapOptOffsetDateTime(GenericRecord object, String property) {
		return mapOptLiteral(object, property, OffsetDateTime::parse);
	}

	public static OffsetDateTime mapOffsetDateTime(GenericRecord object, String property) {
		return mapLiteral(object, property, OffsetDateTime::parse);
	}

	public static OffsetDateTime mapOffsetDateTime(Object value) {
		return mapLiteral(value, OffsetDateTime::parse);
	}

}
