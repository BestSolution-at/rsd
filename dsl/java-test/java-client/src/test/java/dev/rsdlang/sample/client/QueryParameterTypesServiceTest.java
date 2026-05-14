package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.OffsetDateTime;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.model.NilResult;
import dev.rsdlang.sample.client.model.SampleEnum;
import dev.rsdlang.sample.client.model.SimpleRecord;

public class QueryParameterTypesServiceTest {

	private static final SpecSamplesClient CLIENT = JDKSpecSamplesClient.create(URI.create("http://localhost:3000"));

	static QueryParameterTypesService[] serviceProvider() {
		return new QueryParameterTypesService[] {
				CLIENT.service(QueryParameterTypesService.class),
		};
	}

	// --- Boolean ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanQueryParam(QueryParameterTypesService service) {
		assertEquals(true, service.simpleBooleanQueryParam(true));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleBooleanQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleBooleanQueryParamOpt(true));
	}

	// --- Short ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortQueryParam(QueryParameterTypesService service) {
		assertEquals((short) 42, service.simpleShortQueryParam((short) 42));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleShortQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleShortQueryParamOpt((short) 42));
	}

	// --- Int ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntQueryParam(QueryParameterTypesService service) {
		assertEquals(123456, service.simpleIntQueryParam(123456));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleIntQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleIntQueryParamOpt(123456));
	}

	// --- Long ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongQueryParam(QueryParameterTypesService service) {
		assertEquals(1234567890123L, service.simpleLongQueryParam(1234567890123L));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLongQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLongQueryParamOpt(1234567890123L));
	}

	// --- Float ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatQueryParam(QueryParameterTypesService service) {
		assertEquals(123.45f, service.simpleFloatQueryParam(123.45f));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleFloatQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleFloatQueryParamOpt(123.45f));
	}

	// --- Double ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleQueryParam(QueryParameterTypesService service) {
		assertEquals(123.456789, service.simpleDoubleQueryParam(123.456789));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleDoubleQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleDoubleQueryParamOpt(123.456789));
	}

	// --- String ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringQueryParam(QueryParameterTypesService service) {
		assertEquals("hello world", service.simpleStringQueryParam("hello world"));
		assertEquals("a Ā 𐀀 文 🦄", service.simpleStringQueryParam("a Ā 𐀀 文 🦄"));
		assertEquals("line1\nline2\nline3", service.simpleStringQueryParam("line1\nline2\nline3"));
		assertEquals("pre-\\uffff-post", service.simpleStringQueryParam("pre-\\uffff-post"));
		assertEquals("	Hello, World!  ", service.simpleStringQueryParam("	Hello, World!  "));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleStringQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleStringQueryParamOpt("hello world"));
		assertEquals(NilResult.UNDEFINED, service.simpleStringQueryParamOpt(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringQueryParamOpt_null(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleStringQueryParamOpt(null));
	}

	// --- LocalDate ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateQueryParam(QueryParameterTypesService service) {
		var date = LocalDate.parse("2020-01-01");
		assertEquals(date, service.simpleLocalDateQueryParam(date));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalDateQueryParamOpt(LocalDate.parse("2020-01-01")));
	}

	// --- LocalDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeQueryParam(QueryParameterTypesService service) {
		var dt = LocalDateTime.parse("2020-01-01T10:00");
		assertEquals(dt, service.simpleLocalDateTimeQueryParam(dt));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateTimeQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleLocalDateTimeQueryParamOpt(LocalDateTime.parse("2020-01-01T10:00")));
	}

	// --- LocalTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeQueryParam(QueryParameterTypesService service) {
		var t = LocalTime.parse("10:00:00");
		assertEquals(t, service.simpleLocalTimeQueryParam(t));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalTimeQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalTimeQueryParamOpt(LocalTime.parse("10:00:00")));
	}

	// --- OffsetDateTime ---
	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeQueryParam(QueryParameterTypesService service) {
		var odt = OffsetDateTime.parse("2025-01-01T10:00:00+01:00");
		assertEquals(odt, service.simpleOffsetDateTimeQueryParam(odt));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleOffsetDateTimeQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleOffsetDateTimeQueryParamOpt(OffsetDateTime.parse("2025-01-01T10:00:00+01:00")));
	}

	// --- ZonedDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeQueryParam(QueryParameterTypesService service) {
		var zdt = ZonedDateTime.parse("2025-01-01T10:00:00Z");
		assertEquals(zdt, service.simpleZonedDateTimeQueryParam(zdt));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleZonedDateTimeQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleZonedDateTimeQueryParamOpt(ZonedDateTime.parse("2025-01-01T10:00:00Z")));
	}

	// --- Scalar (ZoneId) ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarQueryParam(QueryParameterTypesService service) {
		var zoneId = ZoneId.of("Europe/Vienna");
		assertEquals(zoneId, service.simpleScalarQueryParam(zoneId));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleScalarQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleScalarQueryParamOpt(ZoneId.of("Europe/Vienna")));
	}

	// --- Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumQueryParam(QueryParameterTypesService service) {
		assertEquals(SampleEnum.A, service.simpleEnumQueryParam(SampleEnum.A));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleEnumQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleEnumQueryParamOpt(SampleEnum.B));
	}

	// --- Multi Query Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiQueryParam(QueryParameterTypesService service) {
		assertEquals("hello-42", service.multiQueryParam("hello", 42));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiQueryParamOpt_allUndefined(QueryParameterTypesService service) {
		assertEquals("undefined-undefined", service.multiQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiQueryParamOpt_valueAOnly(QueryParameterTypesService service) {
		assertEquals("hello-undefined", service.multiQueryParamOpt("hello"));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiQueryParamOpt_allDefined(QueryParameterTypesService service) {
		assertEquals("hello-42", service.multiQueryParamOpt("hello", 42));
	}

	// --- Record Query Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordQueryParam(QueryParameterTypesService service) {
		var record = CLIENT.builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.recordQueryParam(record);
		assertEquals("k", result.key());
		assertEquals("1", result.version());
		assertEquals("v", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.recordQueryParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordQueryParamOpt_defined(QueryParameterTypesService service) {
		var record = CLIENT.builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.recordQueryParamOpt(record));
	}

}
