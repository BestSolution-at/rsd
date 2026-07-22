package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.time.OffsetDateTime;
import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.HeaderParameterTypesService.SimpleInlineEnumHeaderParam_HeaderValue_Param$;
import dev.rsdlang.sample.client.HeaderParameterTypesService.SimpleInlineEnumHeaderParam_Result$;
import dev.rsdlang.sample.client.HeaderParameterTypesService.SimpleInlineEnumHeaderParamNil_HeaderValue_Param$;
import dev.rsdlang.sample.client.HeaderParameterTypesService.SimpleInlineEnumHeaderParamOpt_HeaderValue_Param$;
import dev.rsdlang.sample.client.HeaderParameterTypesService.SimpleInlineEnumHeaderParamOptNil_HeaderValue_Param$;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient.ContentTypeEncoding;
import dev.rsdlang.sample.client.model.NilResult;
import dev.rsdlang.sample.client.model.SampleEnum;
import dev.rsdlang.sample.client.model.SimpleRecord;
import dev.rsdlang.sample.client.model.ZoneId;

public class HeaderParameterTypesServiceTest {
	private static SpecSamplesClient JSON;
	private static SpecSamplesClient MSGPACK;

	@BeforeAll
	static void setUp() {
		var baseBuilder = JDKSpecSamplesClient.builder().baseURI(URI.create("http://localhost:3000"));
		JSON = baseBuilder.build();
		MSGPACK = baseBuilder.contentTypeEncoding(ContentTypeEncoding.APPLICATION_VND_MSGPACK).build();
	}

	static HeaderParameterTypesService[] serviceProvider() {
		return new HeaderParameterTypesService[] {
				JSON.service(HeaderParameterTypesService.class),
				MSGPACK.service(HeaderParameterTypesService.class),
		};
	}

	// --- Boolean ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParam(HeaderParameterTypesService service) {
		assertEquals(true, service.simpleBooleanHeaderParam(true).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleBooleanHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleBooleanHeaderParamOpt(true).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleBooleanHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleBooleanHeaderParamNil(true).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleBooleanHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleBooleanHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleBooleanHeaderParamOptNil(true).orThrow());
	}

	// --- Short ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParam(HeaderParameterTypesService service) {
		assertEquals((short) 42, service.simpleShortHeaderParam((short) 42).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleShortHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleShortHeaderParamOpt((short) 42).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleShortHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleShortHeaderParamNil((short) 42).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleShortHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleShortHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleShortHeaderParamOptNil((short) 42).orThrow());
	}

	// --- Int ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParam(HeaderParameterTypesService service) {
		assertEquals(123456, service.simpleIntHeaderParam(123456).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleIntHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleIntHeaderParamOpt(123456).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleIntHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleIntHeaderParamNil(123456).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleIntHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleIntHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleIntHeaderParamOptNil(123456).orThrow());
	}

	// --- Long ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParam(HeaderParameterTypesService service) {
		assertEquals(1234567890123L, service.simpleLongHeaderParam(1234567890123L).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLongHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLongHeaderParamOpt(1234567890123L).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLongHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLongHeaderParamNil(1234567890123L).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLongHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLongHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLongHeaderParamOptNil(1234567890123L).orThrow());
	}

	// --- Float ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParam(HeaderParameterTypesService service) {
		assertEquals(123.45f, service.simpleFloatHeaderParam(123.45f).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleFloatHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleFloatHeaderParamOpt(123.45f).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleFloatHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleFloatHeaderParamNil(123.45f).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleFloatHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleFloatHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleFloatHeaderParamOptNil(123.45f).orThrow());
	}

	// --- Double ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParam(HeaderParameterTypesService service) {
		assertEquals(123.456789, service.simpleDoubleHeaderParam(123.456789).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleDoubleHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleDoubleHeaderParamOpt(123.456789).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleDoubleHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleDoubleHeaderParamNil(123.456789).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleDoubleHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleDoubleHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleDoubleHeaderParamOptNil(123.456789).orThrow());
	}

	// --- String ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParam(HeaderParameterTypesService service) {
		assertEquals("hello world", service.simpleStringHeaderParam("hello world").orThrow());
		assertEquals("a Ā 𐀀 文 🦄", service.simpleStringHeaderParam("a Ā 𐀀 文 🦄").orThrow());
		assertEquals("line1\nline2\nline3", service.simpleStringHeaderParam("line1\nline2\nline3").orThrow());
		assertEquals("pre-\\uffff-post", service.simpleStringHeaderParam("pre-\\uffff-post").orThrow());
		assertEquals("	Hello, World!  ", service.simpleStringHeaderParam("	Hello, World!  ").orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleStringHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleStringHeaderParamOpt("hello world").orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleStringHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleStringHeaderParamNil("hello world").orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleStringHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleStringHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleStringHeaderParamOptNil("hello world").orThrow());
	}

	// --- LocalDate ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParam(HeaderParameterTypesService service) {
		var date = LocalDate.parse("2020-01-01");
		assertEquals(date, service.simpleLocalDateHeaderParam(date).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalDateHeaderParamOpt(LocalDate.parse("2020-01-01")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalDateHeaderParamNil(LocalDate.parse("2020-01-01")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleLocalDateHeaderParamOptNil(LocalDate.parse("2020-01-01")).orThrow());
	}

	// --- LocalDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParam(HeaderParameterTypesService service) {
		var dt = LocalDateTime.parse("2020-01-01T10:00");
		assertEquals(dt, service.simpleLocalDateTimeHeaderParam(dt).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateTimeHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleLocalDateTimeHeaderParamOpt(LocalDateTime.parse("2020-01-01T10:00")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateTimeHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleLocalDateTimeHeaderParamNil(LocalDateTime.parse("2020-01-01T10:00")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateTimeHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateTimeHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleLocalDateTimeHeaderParamOptNil(LocalDateTime.parse("2020-01-01T10:00")).orThrow());
	}

	// --- LocalTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeHeaderParam(HeaderParameterTypesService service) {
		var t = LocalTime.parse("10:00:00");
		assertEquals(t, service.simpleLocalTimeHeaderParam(t).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalTimeHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalTimeHeaderParamOpt(LocalTime.parse("10:00:00")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalTimeHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalTimeHeaderParamNil(LocalTime.parse("10:00:00")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalTimeHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalTimeHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleLocalTimeHeaderParamOptNil(LocalTime.parse("10:00:00")).orThrow());
	}

	// --- OffsetDateTime ---
	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeHeaderParam(HeaderParameterTypesService service) {
		var odt = OffsetDateTime.parse("2025-01-01T10:00:00+01:00");
		assertEquals(odt, service.simpleOffsetDateTimeHeaderParam(odt).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleOffsetDateTimeHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleOffsetDateTimeHeaderParamOpt(OffsetDateTime.parse("2025-01-01T10:00:00+01:00"))
						.orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleOffsetDateTimeHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleOffsetDateTimeHeaderParamNil(OffsetDateTime.parse("2025-01-01T10:00:00+01:00"))
						.orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleOffsetDateTimeHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleOffsetDateTimeHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleOffsetDateTimeHeaderParamOptNil(OffsetDateTime.parse("2025-01-01T10:00:00+01:00"))
						.orThrow());
	}

	// --- ZonedDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParam(HeaderParameterTypesService service) {
		var zdt = ZonedDateTime.parse("2025-01-01T10:00:00Z");
		assertEquals(zdt, service.simpleZonedDateTimeHeaderParam(zdt).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleZonedDateTimeHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleZonedDateTimeHeaderParamOpt(ZonedDateTime.parse("2025-01-01T10:00:00Z")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleZonedDateTimeHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleZonedDateTimeHeaderParamNil(ZonedDateTime.parse("2025-01-01T10:00:00Z")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleZonedDateTimeHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleZonedDateTimeHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleZonedDateTimeHeaderParamOptNil(ZonedDateTime.parse("2025-01-01T10:00:00Z")).orThrow());
	}

	// --- Scalar (ZoneId) ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParam(HeaderParameterTypesService service) {
		var zoneId = ZoneId.of("Europe/Vienna");
		assertEquals(zoneId, service.simpleScalarHeaderParam(zoneId).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleScalarHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleScalarHeaderParamOpt(ZoneId.of("Europe/Vienna")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleScalarHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleScalarHeaderParamNil(ZoneId.of("Europe/Vienna")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleScalarHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleScalarHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleScalarHeaderParamOptNil(ZoneId.of("Europe/Vienna")).orThrow());
	}

	// --- Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParam(HeaderParameterTypesService service) {
		assertEquals(SampleEnum.A, service.simpleEnumHeaderParam(SampleEnum.A).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleEnumHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleEnumHeaderParamOpt(SampleEnum.B).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleEnumHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleEnumHeaderParamNil(SampleEnum.A).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleEnumHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleEnumHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleEnumHeaderParamOptNil(SampleEnum.B).orThrow());
	}

	// --- Inline Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParam(HeaderParameterTypesService service) {
		assertEquals(SimpleInlineEnumHeaderParam_Result$.A,
				service.simpleInlineEnumHeaderParam(SimpleInlineEnumHeaderParam_HeaderValue_Param$.A).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleInlineEnumHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleInlineEnumHeaderParamOpt(SimpleInlineEnumHeaderParamOpt_HeaderValue_Param$.A).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleInlineEnumHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleInlineEnumHeaderParamNil(SimpleInlineEnumHeaderParamNil_HeaderValue_Param$.C).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleInlineEnumHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleInlineEnumHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleInlineEnumHeaderParamOptNil(SimpleInlineEnumHeaderParamOptNil_HeaderValue_Param$.D)
						.orThrow());
	}

	// --- Multi Header Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParam(HeaderParameterTypesService service) {
		var result = service.multiHeaderParam("hello", 42, ZoneId.of("UTC")).orThrow();
		assertEquals("hello-42-UTC", result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOpt_allUndefined(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.UNDEFINED, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.multiHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOpt_valueAOnly(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.DEFINED, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.multiHeaderParamOpt("hello").orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOpt_valueAAndB(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.UNDEFINED),
				service.multiHeaderParamOpt("hello", 42).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOpt_allDefined(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.DEFINED),
				service.multiHeaderParamOpt("hello", 42, ZoneId.of("UTC")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamNil_allNull(HeaderParameterTypesService service) {
		var result = service.multiHeaderParamNil(null, null, null).orThrow();
		assertEquals(List.of(NilResult.NULL, NilResult.NULL, NilResult.NULL), result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamNil_allDefined(HeaderParameterTypesService service) {
		var result = service.multiHeaderParamNil("hello", 42, ZoneId.of("UTC")).orThrow();
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.DEFINED), result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOptNil_allUndefined(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.UNDEFINED, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.multiHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOptNil_valueANull(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.NULL, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.multiHeaderParamOptNil((String) null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOptNil_valueAAndBNull(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.NULL, NilResult.NULL, NilResult.UNDEFINED),
				service.multiHeaderParamOptNil((String) null, (Integer) null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOptNil_allNull(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.NULL, NilResult.NULL, NilResult.NULL),
				service.multiHeaderParamOptNil((String) null, (Integer) null, (ZoneId) null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOptNil_allDefined(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.DEFINED),
				service.multiHeaderParamOptNil("hello", 42, ZoneId.of("UTC")).orThrow());
	}

	// --- Record Header Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParam(HeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.recordHeaderParam(record).orThrow();
		assertEquals("k", result.key());
		assertEquals("1", result.version());
		assertEquals("v", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.recordHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParamOpt_defined(HeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.recordHeaderParamOpt(record).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.recordHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParamNil_defined(HeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.recordHeaderParamNil(record).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.recordHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.recordHeaderParamOptNil((SimpleRecord.Data) null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.recordHeaderParamOptNil(record).orThrow());
	}

}
