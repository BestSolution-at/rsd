package dev.rsdlang.sample.server.rest.utils;

import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.OptionalDouble;
import java.util.OptionalInt;
import java.util.OptionalLong;
import java.util.function.Function;

import dev.rsdlang.sample.server.model._Base;
import jakarta.json.JsonObject;

public interface ContentParser {
	public boolean parseBoolean(InputStream inputStream);

	public Optional<Boolean> parseOptBoolean(InputStream inputStream);

	public Optional<Boolean> parseNullBoolean(InputStream inputStream);

	public _Base.Nillable<Boolean> parseNilBoolean(InputStream inputStream);

	public List<Boolean> parseBooleans(InputStream inputStream);

	public Optional<List<Boolean>> parseOptBooleans(InputStream inputStream);

	public Optional<List<Boolean>> parseNullBooleans(InputStream inputStream);

	public _Base.Nillable<List<Boolean>> parseNilBooleans(InputStream inputStream);

	// ----------------
	public short parseShort(InputStream inputStream);

	public Optional<Short> parseOptShort(InputStream inputStream);

	public Optional<Short> parseNullShort(InputStream inputStream);

	public _Base.Nillable<Short> parseNilShort(InputStream inputStream);

	public List<Short> parseShorts(InputStream inputStream);

	public Optional<List<Short>> parseOptShorts(InputStream inputStream);

	public Optional<List<Short>> parseNullShorts(InputStream inputStream);

	public _Base.Nillable<List<Short>> parseNilShorts(InputStream inputStream);

	// ----------------
	public int parseInt(InputStream inputStream);

	public OptionalInt parseOptInt(InputStream inputStream);

	public OptionalInt parseNullInt(InputStream inputStream);

	public _Base.Nillable<Integer> parseNilInt(InputStream inputStream);

	public List<Integer> parseInts(InputStream inputStream);

	public Optional<List<Integer>> parseOptInts(InputStream inputStream);

	public Optional<List<Integer>> parseNullInts(InputStream inputStream);

	public _Base.Nillable<List<Integer>> parseNilInts(InputStream inputStream);

	// ----------------
	public long parseLong(InputStream inputStream);

	public OptionalLong parseOptLong(InputStream inputStream);

	public OptionalLong parseNullLong(InputStream inputStream);

	public _Base.Nillable<Long> parseNilLong(InputStream inputStream);

	public List<Long> parseLongs(InputStream inputStream);

	public Optional<List<Long>> parseOptLongs(InputStream inputStream);

	public Optional<List<Long>> parseNullLongs(InputStream inputStream);

	public _Base.Nillable<List<Long>> parseNilLongs(InputStream inputStream);

	// ----------------
	public double parseDouble(InputStream inputStream);

	public OptionalDouble parseOptDouble(InputStream inputStream);

	public OptionalDouble parseNullDouble(InputStream inputStream);

	public _Base.Nillable<Double> parseNilDouble(InputStream inputStream);

	public List<Double> parseDoubles(InputStream inputStream);

	public Optional<List<Double>> parseOptDoubles(InputStream inputStream);

	public Optional<List<Double>> parseNullDoubles(InputStream inputStream);

	public _Base.Nillable<List<Double>> parseNilDoubles(InputStream inputStream);

	// ----------------
	public float parseFloat(InputStream inputStream);

	public Optional<Float> parseOptFloat(InputStream inputStream);

	public Optional<Float> parseNullFloat(InputStream inputStream);

	public _Base.Nillable<Float> parseNilFloat(InputStream inputStream);

	public List<Float> parseFloats(InputStream inputStream);

	public Optional<List<Float>> parseOptFloats(InputStream inputStream);

	public Optional<List<Float>> parseNullFloats(InputStream inputStream);

	public _Base.Nillable<List<Float>> parseNilFloats(InputStream inputStream);

	// ----------------
	public String parseString(InputStream inputStream);

	public Optional<String> parseOptString(InputStream inputStream);

	public Optional<String> parseNullString(InputStream inputStream);

	public _Base.Nillable<String> parseNilString(InputStream inputStream);

	public List<String> parseStrings(InputStream inputStream);

	public Optional<List<String>> parseOptStrings(InputStream inputStream);

	public Optional<List<String>> parseNullStrings(InputStream inputStream);

	public _Base.Nillable<List<String>> parseNilStrings(InputStream inputStream);

	// ----------------
	public <T> T parseLiteral(InputStream inputStream, Function<String, T> parser);

	public <T> Optional<T> parseOptLiteral(InputStream inputStream, Function<String, T> parser);

	public <T> Optional<T> parseNullLiteral(InputStream inputStream, Function<String, T> parser);

	public <T> _Base.Nillable<T> parseNilLiteral(InputStream inputStream, Function<String, T> parser);

	public <T> List<T> parseLiterals(InputStream inputStream, Function<String, T> parser);

	public <T> Optional<List<T>> parseOptLiterals(InputStream inputStream, Function<String, T> parser);

	public <T> Optional<List<T>> parseNullLiterals(InputStream inputStream, Function<String, T> parser);

	public <T> _Base.Nillable<List<T>> parseNilLiterals(InputStream inputStream, Function<String, T> parser);

	// ----------------
	public LocalDate parseLocalDate(InputStream inputStream);

	public Optional<LocalDate> parseOptLocalDate(InputStream inputStream);

	public Optional<LocalDate> parseNullLocalDate(InputStream inputStream);

	public _Base.Nillable<LocalDate> parseNilLocalDate(InputStream inputStream);

	public List<LocalDate> parseLocalDates(InputStream inputStream);

	public Optional<List<LocalDate>> parseOptLocalDates(InputStream inputStream);

	public Optional<List<LocalDate>> parseNullLocalDates(InputStream inputStream);

	public _Base.Nillable<List<LocalDate>> parseNilLocalDates(InputStream inputStream);

	// ----------------
	public LocalDateTime parseLocalDateTime(InputStream inputStream);

	public Optional<LocalDateTime> parseOptLocalDateTime(InputStream inputStream);

	public Optional<LocalDateTime> parseNullLocalDateTime(InputStream inputStream);

	public _Base.Nillable<LocalDateTime> parseNilLocalDateTime(InputStream inputStream);

	public List<LocalDateTime> parseLocalDateTimes(InputStream inputStream);

	public Optional<List<LocalDateTime>> parseOptLocalDateTimes(InputStream inputStream);

	public Optional<List<LocalDateTime>> parseNullLocalDateTimes(InputStream inputStream);

	public _Base.Nillable<List<LocalDateTime>> parseNilLocalDateTimes(InputStream inputStream);

	// ----------------
	public ZonedDateTime parseZonedDateTime(InputStream inputStream);

	public Optional<ZonedDateTime> parseOptZonedDateTime(InputStream inputStream);

	public Optional<ZonedDateTime> parseNullZonedDateTime(InputStream inputStream);

	public _Base.Nillable<ZonedDateTime> parseNilZonedDateTime(InputStream inputStream);

	public List<ZonedDateTime> parseZonedDateTimes(InputStream inputStream);

	public Optional<List<ZonedDateTime>> parseOptZonedDateTimes(InputStream inputStream);

	public Optional<List<ZonedDateTime>> parseNullZonedDateTimes(InputStream inputStream);

	public _Base.Nillable<List<ZonedDateTime>> parseNilZonedDateTimes(InputStream inputStream);

	// ----------------
	public LocalTime parseLocalTime(InputStream inputStream);

	public Optional<LocalTime> parseOptLocalTime(InputStream inputStream);

	public Optional<LocalTime> parseNullLocalTime(InputStream inputStream);

	public _Base.Nillable<LocalTime> parseNilLocalTime(InputStream inputStream);

	public List<LocalTime> parseLocalTimes(InputStream inputStream);

	public Optional<List<LocalTime>> parseOptLocalTimes(InputStream inputStream);

	public Optional<List<LocalTime>> parseNullLocalTimes(InputStream inputStream);

	public _Base.Nillable<List<LocalTime>> parseNilLocalTimes(InputStream inputStream);

	// ----------------
	public OffsetDateTime parseOffsetDateTime(InputStream inputStream);

	public Optional<OffsetDateTime> parseOptOffsetDateTime(InputStream inputStream);

	public Optional<OffsetDateTime> parseNullOffsetDateTime(InputStream inputStream);

	public _Base.Nillable<OffsetDateTime> parseNilOffsetDateTime(InputStream inputStream);

	public List<OffsetDateTime> parseOffsetDateTimes(InputStream inputStream);

	public Optional<List<OffsetDateTime>> parseOptOffsetDateTimes(InputStream inputStream);

	public Optional<List<OffsetDateTime>> parseNullOffsetDateTimes(InputStream inputStream);

	public _Base.Nillable<List<OffsetDateTime>> parseNilOffsetDateTimes(InputStream inputStream);

	// ----------------
	public <T> T parseObject(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type);

	public <T> Optional<T> parseOptObject(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type);

	public <T> Optional<T> parseNullObject(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type);

	public <T> _Base.Nillable<T> parseNilObject(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type);

	public <T> List<T> parseObjects(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type);

	public <T> Optional<List<T>> parseOptObjects(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type);

	public <T> Optional<List<T>> parseNullObjects(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type);

	public <T> _Base.Nillable<List<T>> parseNilObjects(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type);
}
