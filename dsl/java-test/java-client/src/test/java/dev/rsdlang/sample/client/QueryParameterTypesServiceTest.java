package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.time.OffsetDateTime;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient.ContentTypeEncoding;
import dev.rsdlang.sample.client.model.NilResult;
import dev.rsdlang.sample.client.model.SampleEnum;
import dev.rsdlang.sample.client.model.SimpleRecord;
import dev.rsdlang.sample.client.model.ZoneId;

public class QueryParameterTypesServiceTest {

	private static SpecSamplesClient JSON;
	private static SpecSamplesClient MSGPACK;

	@BeforeAll
	static void setUp() {
		var baseBuilder = JDKSpecSamplesClient.builder().baseURI(URI.create("http://localhost:3000"));
		JSON = baseBuilder.build();
		MSGPACK = baseBuilder.contentTypeEncoding(ContentTypeEncoding.APPLICATION_VND_MSGPACK).build();
	}

	static QueryParameterTypesService[] serviceProvider() {
		return new QueryParameterTypesService[] {
				JSON.service(QueryParameterTypesService.class),
				MSGPACK.service(QueryParameterTypesService.class),
		};
	}

	// --- Boolean ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanQueryParam(QueryParameterTypesService service) {
		assertEquals(true, service.simpleBooleanQueryParam(true).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleBooleanQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleBooleanQueryParamOpt(true).orThrow());
	}

	// --- Short ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortQueryParam(QueryParameterTypesService service) {
		assertEquals((short) 42, service.simpleShortQueryParam((short) 42).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleShortQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleShortQueryParamOpt((short) 42).orThrow());
	}

	// --- Int ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntQueryParam(QueryParameterTypesService service) {
		assertEquals(123456, service.simpleIntQueryParam(123456).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleIntQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleIntQueryParamOpt(123456).orThrow());
	}

	// --- Long ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongQueryParam(QueryParameterTypesService service) {
		assertEquals(1234567890123L, service.simpleLongQueryParam(1234567890123L).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLongQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLongQueryParamOpt(1234567890123L).orThrow());
	}

	// --- Float ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatQueryParam(QueryParameterTypesService service) {
		assertEquals(123.45f, service.simpleFloatQueryParam(123.45f).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleFloatQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleFloatQueryParamOpt(123.45f).orThrow());
	}

	// --- Double ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleQueryParam(QueryParameterTypesService service) {
		assertEquals(123.456789, service.simpleDoubleQueryParam(123.456789).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleDoubleQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleDoubleQueryParamOpt(123.456789).orThrow());
	}

	// --- String ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringQueryParam(QueryParameterTypesService service) {
		assertEquals("hello world", service.simpleStringQueryParam("hello world").orThrow());
		assertEquals("a Ā 𐀀 文 🦄", service.simpleStringQueryParam("a Ā 𐀀 文 🦄").orThrow());
		assertEquals("line1\nline2\nline3", service.simpleStringQueryParam("line1\nline2\nline3").orThrow());
		assertEquals("pre-\\uffff-post", service.simpleStringQueryParam("pre-\\uffff-post").orThrow());
		assertEquals("	Hello, World!  ", service.simpleStringQueryParam("	Hello, World!  ").orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleStringQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleStringQueryParamOpt("hello world").orThrow());
		assertEquals(NilResult.UNDEFINED, service.simpleStringQueryParamOpt(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringQueryParamOpt_null(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleStringQueryParamOpt(null).orThrow());
	}

	// --- LocalDate ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateQueryParam(QueryParameterTypesService service) {
		var date = LocalDate.parse("2020-01-01");
		assertEquals(date, service.simpleLocalDateQueryParam(date).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalDateQueryParamOpt(LocalDate.parse("2020-01-01")).orThrow());
	}

	// --- LocalDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeQueryParam(QueryParameterTypesService service) {
		var dt = LocalDateTime.parse("2020-01-01T10:00");
		assertEquals(dt, service.simpleLocalDateTimeQueryParam(dt).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateTimeQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleLocalDateTimeQueryParamOpt(LocalDateTime.parse("2020-01-01T10:00")).orThrow());
	}

	// --- LocalTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeQueryParam(QueryParameterTypesService service) {
		var t = LocalTime.parse("10:00:00");
		assertEquals(t, service.simpleLocalTimeQueryParam(t).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalTimeQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalTimeQueryParamOpt(LocalTime.parse("10:00:00")).orThrow());
	}

	// --- OffsetDateTime ---
	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeQueryParam(QueryParameterTypesService service) {
		var odt = OffsetDateTime.parse("2025-01-01T10:00:00+01:00");
		assertEquals(odt, service.simpleOffsetDateTimeQueryParam(odt).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleOffsetDateTimeQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleOffsetDateTimeQueryParamOpt(OffsetDateTime.parse("2025-01-01T10:00:00+01:00")).orThrow());
	}

	// --- ZonedDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeQueryParam(QueryParameterTypesService service) {
		var zdt = ZonedDateTime.parse("2025-01-01T10:00:00Z");
		assertEquals(zdt, service.simpleZonedDateTimeQueryParam(zdt).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleZonedDateTimeQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleZonedDateTimeQueryParamOpt(ZonedDateTime.parse("2025-01-01T10:00:00Z")).orThrow());
	}

	// --- Scalar (ZoneId) ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarQueryParam(QueryParameterTypesService service) {
		var zoneId = ZoneId.of("Europe/Vienna");
		assertEquals(zoneId, service.simpleScalarQueryParam(zoneId).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleScalarQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleScalarQueryParamOpt(ZoneId.of("Europe/Vienna")).orThrow());
	}

	// --- Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumQueryParam(QueryParameterTypesService service) {
		assertEquals(SampleEnum.A, service.simpleEnumQueryParam(SampleEnum.A).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleEnumQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumQueryParamOpt_defined(QueryParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleEnumQueryParamOpt(SampleEnum.B).orThrow());
	}

	// --- Multi Query Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiQueryParam(QueryParameterTypesService service) {
		assertEquals("hello-42", service.multiQueryParam("hello", 42).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiQueryParamOpt_allUndefined(QueryParameterTypesService service) {
		assertEquals("undefined-undefined", service.multiQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiQueryParamOpt_valueAOnly(QueryParameterTypesService service) {
		assertEquals("hello-undefined", service.multiQueryParamOpt("hello").orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiQueryParamOpt_allDefined(QueryParameterTypesService service) {
		assertEquals("hello-42", service.multiQueryParamOpt("hello", 42).orThrow());
	}

	// --- Record Query Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordQueryParam(QueryParameterTypesService service) {
		var record = JSON.builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.recordQueryParam(record).orThrow();
		assertEquals("k", result.key());
		assertEquals("1", result.version());
		assertEquals("v", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordQueryParamOpt_undefined(QueryParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.recordQueryParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordQueryParamOpt_defined(QueryParameterTypesService service) {
		var record = JSON.builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.recordQueryParamOpt(record).orThrow());
	}

}
