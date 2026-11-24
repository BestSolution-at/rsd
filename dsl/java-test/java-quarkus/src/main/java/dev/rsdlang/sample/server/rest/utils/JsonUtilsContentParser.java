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
import dev.rsdlang.sample.server.model.impl.json._JsonUtils;
import jakarta.json.JsonObject;

public class JsonUtilsContentParser implements ContentParser {
	private final String contentType;

	public JsonUtilsContentParser(String contentType) {
		this.contentType = contentType;
	}

	public boolean parseBoolean(InputStream inputStream) {
		return _JsonUtils.parseBoolean(inputStream, this.contentType);
	}

	public Optional<Boolean> parseOptBoolean(InputStream inputStream) {
		return _JsonUtils.parseOptBoolean(inputStream, this.contentType);
	}

	public Optional<Boolean> parseNullBoolean(InputStream inputStream) {
		return _JsonUtils.parseNullBoolean(inputStream, this.contentType);
	}

	public _Base.Nillable<Boolean> parseNilBoolean(InputStream inputStream) {
		return _JsonUtils.parseNilBoolean(inputStream, this.contentType);
	}

	public List<Boolean> parseBooleans(InputStream inputStream) {
		return _JsonUtils.parseBooleans(inputStream, this.contentType);
	}

	public Optional<List<Boolean>> parseOptBooleans(InputStream inputStream) {
		return _JsonUtils.parseOptBooleans(inputStream, this.contentType);
	}

	public Optional<List<Boolean>> parseNullBooleans(InputStream inputStream) {
		return _JsonUtils.parseNullBooleans(inputStream, this.contentType);
	}

	public _Base.Nillable<List<Boolean>> parseNilBooleans(InputStream inputStream) {
		return _JsonUtils.parseNilBooleans(inputStream, this.contentType);
	}

	// ----------------
	public short parseShort(InputStream inputStream) {
		return _JsonUtils.parseShort(inputStream, this.contentType);
	}

	public Optional<Short> parseOptShort(InputStream inputStream) {
		return _JsonUtils.parseOptShort(inputStream, this.contentType);
	}

	public Optional<Short> parseNullShort(InputStream inputStream) {
		return _JsonUtils.parseNullShort(inputStream, this.contentType);
	}

	public _Base.Nillable<Short> parseNilShort(InputStream inputStream) {
		return _JsonUtils.parseNilShort(inputStream, this.contentType);
	}

	public List<Short> parseShorts(InputStream inputStream) {
		return _JsonUtils.parseShorts(inputStream, this.contentType);
	}

	public Optional<List<Short>> parseOptShorts(InputStream inputStream) {
		return _JsonUtils.parseOptShorts(inputStream, this.contentType);
	}

	public Optional<List<Short>> parseNullShorts(InputStream inputStream) {
		return _JsonUtils.parseNullShorts(inputStream, this.contentType);
	}

	public _Base.Nillable<List<Short>> parseNilShorts(InputStream inputStream) {
		return _JsonUtils.parseNilShorts(inputStream, this.contentType);
	}

	// ----------------
	public int parseInt(InputStream inputStream) {
		return _JsonUtils.parseInt(inputStream, this.contentType);
	}

	public OptionalInt parseOptInt(InputStream inputStream) {
		return _JsonUtils.parseOptInt(inputStream, this.contentType);
	}

	public OptionalInt parseNullInt(InputStream inputStream) {
		return _JsonUtils.parseNullInt(inputStream, this.contentType);
	}

	public _Base.Nillable<Integer> parseNilInt(InputStream inputStream) {
		return _JsonUtils.parseNilInt(inputStream, this.contentType);
	}

	public List<Integer> parseInts(InputStream inputStream) {
		return _JsonUtils.parseInts(inputStream, this.contentType);
	}

	public Optional<List<Integer>> parseOptInts(InputStream inputStream) {
		return _JsonUtils.parseOptInts(inputStream, this.contentType);
	}

	public Optional<List<Integer>> parseNullInts(InputStream inputStream) {
		return _JsonUtils.parseNullInts(inputStream, this.contentType);
	}

	public _Base.Nillable<List<Integer>> parseNilInts(InputStream inputStream) {
		return _JsonUtils.parseNilInts(inputStream, this.contentType);
	}

	// ----------------
	public long parseLong(InputStream inputStream) {
		return _JsonUtils.parseLong(inputStream, this.contentType);
	}

	public OptionalLong parseOptLong(InputStream inputStream) {
		return _JsonUtils.parseOptLong(inputStream, this.contentType);
	}

	public OptionalLong parseNullLong(InputStream inputStream) {
		return _JsonUtils.parseNullLong(inputStream, this.contentType);
	}

	public _Base.Nillable<Long> parseNilLong(InputStream inputStream) {
		return _JsonUtils.parseNilLong(inputStream, this.contentType);
	}

	public List<Long> parseLongs(InputStream inputStream) {
		return _JsonUtils.parseLongs(inputStream, this.contentType);
	}

	public Optional<List<Long>> parseOptLongs(InputStream inputStream) {
		return _JsonUtils.parseOptLongs(inputStream, this.contentType);
	}

	public Optional<List<Long>> parseNullLongs(InputStream inputStream) {
		return _JsonUtils.parseNullLongs(inputStream, this.contentType);
	}

	public _Base.Nillable<List<Long>> parseNilLongs(InputStream inputStream) {
		return _JsonUtils.parseNilLongs(inputStream, this.contentType);
	}

	// ----------------
	public double parseDouble(InputStream inputStream) {
		return _JsonUtils.parseDouble(inputStream, this.contentType);
	}

	public OptionalDouble parseOptDouble(InputStream inputStream) {
		return _JsonUtils.parseOptDouble(inputStream, this.contentType);
	}

	public OptionalDouble parseNullDouble(InputStream inputStream) {
		return _JsonUtils.parseNullDouble(inputStream, this.contentType);
	}

	public _Base.Nillable<Double> parseNilDouble(InputStream inputStream) {
		return _JsonUtils.parseNilDouble(inputStream, this.contentType);
	}

	public List<Double> parseDoubles(InputStream inputStream) {
		return _JsonUtils.parseDoubles(inputStream, this.contentType);
	}

	public Optional<List<Double>> parseOptDoubles(InputStream inputStream) {
		return _JsonUtils.parseOptDoubles(inputStream, this.contentType);
	}

	public Optional<List<Double>> parseNullDoubles(InputStream inputStream) {
		return _JsonUtils.parseNullDoubles(inputStream, this.contentType);
	}

	public _Base.Nillable<List<Double>> parseNilDoubles(InputStream inputStream) {
		return _JsonUtils.parseNilDoubles(inputStream, this.contentType);
	}

	// ----------------
	public float parseFloat(InputStream inputStream) {
		return _JsonUtils.parseFloat(inputStream, this.contentType);
	}

	public Optional<Float> parseOptFloat(InputStream inputStream) {
		return _JsonUtils.parseOptFloat(inputStream, this.contentType);
	}

	public Optional<Float> parseNullFloat(InputStream inputStream) {
		return _JsonUtils.parseNullFloat(inputStream, this.contentType);
	}

	public _Base.Nillable<Float> parseNilFloat(InputStream inputStream) {
		return _JsonUtils.parseNilFloat(inputStream, this.contentType);
	}

	public List<Float> parseFloats(InputStream inputStream) {
		return _JsonUtils.parseFloats(inputStream, this.contentType);
	}

	public Optional<List<Float>> parseOptFloats(InputStream inputStream) {
		return _JsonUtils.parseOptFloats(inputStream, this.contentType);
	}

	public Optional<List<Float>> parseNullFloats(InputStream inputStream) {
		return _JsonUtils.parseNullFloats(inputStream, this.contentType);
	}

	public _Base.Nillable<List<Float>> parseNilFloats(InputStream inputStream) {
		return _JsonUtils.parseNilFloats(inputStream, this.contentType);
	}

	// ----------------
	public String parseString(InputStream inputStream) {
		return _JsonUtils.parseString(inputStream, this.contentType);
	}

	public Optional<String> parseOptString(InputStream inputStream) {
		return _JsonUtils.parseOptString(inputStream, this.contentType);
	}

	public Optional<String> parseNullString(InputStream inputStream) {
		return _JsonUtils.parseNullString(inputStream, this.contentType);
	}

	public _Base.Nillable<String> parseNilString(InputStream inputStream) {
		return _JsonUtils.parseNilString(inputStream, this.contentType);
	}

	public List<String> parseStrings(InputStream inputStream) {
		return _JsonUtils.parseStrings(inputStream, this.contentType);
	}

	public Optional<List<String>> parseOptStrings(InputStream inputStream) {
		return _JsonUtils.parseOptStrings(inputStream, this.contentType);
	}

	public Optional<List<String>> parseNullStrings(InputStream inputStream) {
		return _JsonUtils.parseNullStrings(inputStream, this.contentType);
	}

	public _Base.Nillable<List<String>> parseNilStrings(InputStream inputStream) {
		return _JsonUtils.parseNilStrings(inputStream, this.contentType);
	}

	// ----------------
	public <T> T parseLiteral(InputStream inputStream, Function<String, T> parser) {
		return _JsonUtils.parseLiteral(inputStream, this.contentType, parser);
	}

	public <T> Optional<T> parseOptLiteral(InputStream inputStream, Function<String, T> parser) {
		return _JsonUtils.parseOptLiteral(inputStream, this.contentType, parser);
	}

	public <T> Optional<T> parseNullLiteral(InputStream inputStream, Function<String, T> parser) {
		return _JsonUtils.parseNullLiteral(inputStream, this.contentType, parser);
	}

	public <T> _Base.Nillable<T> parseNilLiteral(InputStream inputStream, Function<String, T> parser) {
		return _JsonUtils.parseNilLiteral(inputStream, this.contentType, parser);
	}

	public <T> List<T> parseLiterals(InputStream inputStream, Function<String, T> parser) {
		return _JsonUtils.parseLiterals(inputStream, this.contentType, parser);
	}

	public <T> Optional<List<T>> parseOptLiterals(InputStream inputStream, Function<String, T> parser) {
		return _JsonUtils.parseOptLiterals(inputStream, this.contentType, parser);
	}

	public <T> Optional<List<T>> parseNullLiterals(InputStream inputStream, Function<String, T> parser) {
		return _JsonUtils.parseNullLiterals(inputStream, this.contentType, parser);
	}

	public <T> _Base.Nillable<List<T>> parseNilLiterals(InputStream inputStream, Function<String, T> parser) {
		return _JsonUtils.parseNilLiterals(inputStream, this.contentType, parser);
	}

	// ----------------
	public LocalDate parseLocalDate(InputStream inputStream) {
		return _JsonUtils.parseLocalDate(inputStream, this.contentType);
	}

	public Optional<LocalDate> parseOptLocalDate(InputStream inputStream) {
		return _JsonUtils.parseOptLocalDate(inputStream, this.contentType);
	}

	public Optional<LocalDate> parseNullLocalDate(InputStream inputStream) {
		return _JsonUtils.parseNullLocalDate(inputStream, this.contentType);
	}

	public _Base.Nillable<LocalDate> parseNilLocalDate(InputStream inputStream) {
		return _JsonUtils.parseNilLocalDate(inputStream, this.contentType);
	}

	public List<LocalDate> parseLocalDates(InputStream inputStream) {
		return _JsonUtils.parseLocalDates(inputStream, this.contentType);
	}

	public Optional<List<LocalDate>> parseOptLocalDates(InputStream inputStream) {
		return _JsonUtils.parseOptLocalDates(inputStream, this.contentType);
	}

	public Optional<List<LocalDate>> parseNullLocalDates(InputStream inputStream) {
		return _JsonUtils.parseNullLocalDates(inputStream, this.contentType);
	}

	public _Base.Nillable<List<LocalDate>> parseNilLocalDates(InputStream inputStream) {
		return _JsonUtils.parseNilLocalDates(inputStream, this.contentType);
	}

	// ----------------
	public LocalDateTime parseLocalDateTime(InputStream inputStream) {
		return _JsonUtils.parseLocalDateTime(inputStream, this.contentType);
	}

	public Optional<LocalDateTime> parseOptLocalDateTime(InputStream inputStream) {
		return _JsonUtils.parseOptLocalDateTime(inputStream, this.contentType);
	}

	public Optional<LocalDateTime> parseNullLocalDateTime(InputStream inputStream) {
		return _JsonUtils.parseNullLocalDateTime(inputStream, this.contentType);
	}

	public _Base.Nillable<LocalDateTime> parseNilLocalDateTime(InputStream inputStream) {
		return _JsonUtils.parseNilLocalDateTime(inputStream, this.contentType);
	}

	public List<LocalDateTime> parseLocalDateTimes(InputStream inputStream) {
		return _JsonUtils.parseLocalDateTimes(inputStream, this.contentType);
	}

	public Optional<List<LocalDateTime>> parseOptLocalDateTimes(InputStream inputStream) {
		return _JsonUtils.parseOptLocalDateTimes(inputStream, this.contentType);
	}

	public Optional<List<LocalDateTime>> parseNullLocalDateTimes(InputStream inputStream) {
		return _JsonUtils.parseNullLocalDateTimes(inputStream, this.contentType);
	}

	public _Base.Nillable<List<LocalDateTime>> parseNilLocalDateTimes(InputStream inputStream) {
		return _JsonUtils.parseNilLocalDateTimes(inputStream, this.contentType);
	}

	// ----------------
	public ZonedDateTime parseZonedDateTime(InputStream inputStream) {
		return _JsonUtils.parseZonedDateTime(inputStream, this.contentType);
	}

	public Optional<ZonedDateTime> parseOptZonedDateTime(InputStream inputStream) {
		return _JsonUtils.parseOptZonedDateTime(inputStream, this.contentType);
	}

	public Optional<ZonedDateTime> parseNullZonedDateTime(InputStream inputStream) {
		return _JsonUtils.parseNullZonedDateTime(inputStream, this.contentType);
	}

	public _Base.Nillable<ZonedDateTime> parseNilZonedDateTime(InputStream inputStream) {
		return _JsonUtils.parseNilZonedDateTime(inputStream, this.contentType);
	}

	public List<ZonedDateTime> parseZonedDateTimes(InputStream inputStream) {
		return _JsonUtils.parseZonedDateTimes(inputStream, this.contentType);
	}

	public Optional<List<ZonedDateTime>> parseOptZonedDateTimes(InputStream inputStream) {
		return _JsonUtils.parseOptZonedDateTimes(inputStream, this.contentType);
	}

	public Optional<List<ZonedDateTime>> parseNullZonedDateTimes(InputStream inputStream) {
		return _JsonUtils.parseNullZonedDateTimes(inputStream, this.contentType);
	}

	public _Base.Nillable<List<ZonedDateTime>> parseNilZonedDateTimes(InputStream inputStream) {
		return _JsonUtils.parseNilZonedDateTimes(inputStream, this.contentType);
	}

	// ----------------
	public LocalTime parseLocalTime(InputStream inputStream) {
		return _JsonUtils.parseLocalTime(inputStream, this.contentType);
	}

	public Optional<LocalTime> parseOptLocalTime(InputStream inputStream) {
		return _JsonUtils.parseOptLocalTime(inputStream, this.contentType);
	}

	public Optional<LocalTime> parseNullLocalTime(InputStream inputStream) {
		return _JsonUtils.parseNullLocalTime(inputStream, this.contentType);
	}

	public _Base.Nillable<LocalTime> parseNilLocalTime(InputStream inputStream) {
		return _JsonUtils.parseNilLocalTime(inputStream, this.contentType);
	}

	public List<LocalTime> parseLocalTimes(InputStream inputStream) {
		return _JsonUtils.parseLocalTimes(inputStream, this.contentType);
	}

	public Optional<List<LocalTime>> parseOptLocalTimes(InputStream inputStream) {
		return _JsonUtils.parseOptLocalTimes(inputStream, this.contentType);
	}

	public Optional<List<LocalTime>> parseNullLocalTimes(InputStream inputStream) {
		return _JsonUtils.parseNullLocalTimes(inputStream, this.contentType);
	}

	public _Base.Nillable<List<LocalTime>> parseNilLocalTimes(InputStream inputStream) {
		return _JsonUtils.parseNilLocalTimes(inputStream, this.contentType);
	}

	// ----------------
	public OffsetDateTime parseOffsetDateTime(InputStream inputStream) {
		return _JsonUtils.parseOffsetDateTime(inputStream, this.contentType);
	}

	public Optional<OffsetDateTime> parseOptOffsetDateTime(InputStream inputStream) {
		return _JsonUtils.parseOptOffsetDateTime(inputStream, this.contentType);
	}

	public Optional<OffsetDateTime> parseNullOffsetDateTime(InputStream inputStream) {
		return _JsonUtils.parseNullOffsetDateTime(inputStream, this.contentType);
	}

	public _Base.Nillable<OffsetDateTime> parseNilOffsetDateTime(InputStream inputStream) {
		return _JsonUtils.parseNilOffsetDateTime(inputStream, this.contentType);
	}

	public List<OffsetDateTime> parseOffsetDateTimes(InputStream inputStream) {
		return _JsonUtils.parseOffsetDateTimes(inputStream, this.contentType);
	}

	public Optional<List<OffsetDateTime>> parseOptOffsetDateTimes(InputStream inputStream) {
		return _JsonUtils.parseOptOffsetDateTimes(inputStream, this.contentType);
	}

	public Optional<List<OffsetDateTime>> parseNullOffsetDateTimes(InputStream inputStream) {
		return _JsonUtils.parseNullOffsetDateTimes(inputStream, this.contentType);
	}

	public _Base.Nillable<List<OffsetDateTime>> parseNilOffsetDateTimes(InputStream inputStream) {
		return _JsonUtils.parseNilOffsetDateTimes(inputStream, this.contentType);
	}

	// ----------------
	public <T> T parseObject(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type) {
		return _JsonUtils.parseObject(inputStream, this.contentType, parser, type);
	}

	public <T> Optional<T> parseOptObject(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type) {
		return _JsonUtils.parseOptObject(inputStream, this.contentType, parser, type);
	}

	public <T> Optional<T> parseNullObject(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type) {
		return _JsonUtils.parseNullObject(inputStream, this.contentType, parser, type);
	}

	public <T> _Base.Nillable<T> parseNilObject(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type) {
		return _JsonUtils.parseNilObject(inputStream, this.contentType, parser, type);
	}

	public <T> List<T> parseObjects(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type) {
		return _JsonUtils.parseObjects(inputStream, this.contentType, parser, type);
	}

	public <T> Optional<List<T>> parseOptObjects(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type) {
		return _JsonUtils.parseOptObjects(inputStream, this.contentType, parser, type);
	}

	public <T> Optional<List<T>> parseNullObjects(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type) {
		return _JsonUtils.parseNullObjects(inputStream, this.contentType, parser, type);
	}

	public <T> _Base.Nillable<List<T>> parseNilObjects(
			InputStream inputStream,
			Function<JsonObject, T> parser,
			Class<T> type) {
		return _JsonUtils.parseNilObjects(inputStream, this.contentType, parser, type);
	}
}
