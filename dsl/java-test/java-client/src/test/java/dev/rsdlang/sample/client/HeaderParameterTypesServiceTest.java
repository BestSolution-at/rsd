package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.HeaderParameterTypesService.SimpleInlineEnumHeaderParam_HeaderValue_Param$;
import dev.rsdlang.sample.client.HeaderParameterTypesService.SimpleInlineEnumHeaderParam_Result$;
import dev.rsdlang.sample.client.HeaderParameterTypesService.SimpleInlineEnumHeaderParamNil_HeaderValue_Param$;
import dev.rsdlang.sample.client.HeaderParameterTypesService.SimpleInlineEnumHeaderParamOpt_HeaderValue_Param$;
import dev.rsdlang.sample.client.HeaderParameterTypesService.SimpleInlineEnumHeaderParamOptNil_HeaderValue_Param$;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.model.NilResult;
import dev.rsdlang.sample.client.model.SampleEnum;
import dev.rsdlang.sample.client.model.SimpleRecord;

public class HeaderParameterTypesServiceTest {

	private static final SpecSamplesClient JDK_CLIENT = JDKSpecSamplesClient.create(URI.create("http://localhost:3000"));

	static HeaderParameterTypesService[] serviceProvider() {
		return new HeaderParameterTypesService[] {
				JDK_CLIENT.service(HeaderParameterTypesService.class),
		};
	}

	// --- Boolean ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParam(HeaderParameterTypesService service) {
		assertEquals(true, service.simpleBooleanHeaderParam(true));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleBooleanHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleBooleanHeaderParamOpt(true));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleBooleanHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleBooleanHeaderParamNil(true));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleBooleanHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleBooleanHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleBooleanHeaderParamOptNil(true));
	}

	// --- Short ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParam(HeaderParameterTypesService service) {
		assertEquals((short) 42, service.simpleShortHeaderParam((short) 42));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleShortHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleShortHeaderParamOpt((short) 42));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleShortHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleShortHeaderParamNil((short) 42));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleShortHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleShortHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleShortHeaderParamOptNil((short) 42));
	}

	// --- Int ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParam(HeaderParameterTypesService service) {
		assertEquals(123456, service.simpleIntHeaderParam(123456));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleIntHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleIntHeaderParamOpt(123456));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleIntHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleIntHeaderParamNil(123456));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleIntHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleIntHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleIntHeaderParamOptNil(123456));
	}

	// --- Long ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParam(HeaderParameterTypesService service) {
		assertEquals(1234567890123L, service.simpleLongHeaderParam(1234567890123L));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLongHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLongHeaderParamOpt(1234567890123L));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLongHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLongHeaderParamNil(1234567890123L));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLongHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLongHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLongHeaderParamOptNil(1234567890123L));
	}

	// --- Float ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParam(HeaderParameterTypesService service) {
		assertEquals(123.45f, service.simpleFloatHeaderParam(123.45f));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleFloatHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleFloatHeaderParamOpt(123.45f));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleFloatHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleFloatHeaderParamNil(123.45f));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleFloatHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleFloatHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleFloatHeaderParamOptNil(123.45f));
	}

	// --- Double ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParam(HeaderParameterTypesService service) {
		assertEquals(123.456789, service.simpleDoubleHeaderParam(123.456789));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleDoubleHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleDoubleHeaderParamOpt(123.456789));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleDoubleHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleDoubleHeaderParamNil(123.456789));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleDoubleHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleDoubleHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleDoubleHeaderParamOptNil(123.456789));
	}

	// --- String ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParam(HeaderParameterTypesService service) {
		assertEquals("hello world", service.simpleStringHeaderParam("hello world"));
		assertEquals("a Ā 𐀀 文 🦄", service.simpleStringHeaderParam("a Ā 𐀀 文 🦄"));
		assertEquals("line1\nline2\nline3", service.simpleStringHeaderParam("line1\nline2\nline3"));
		assertEquals("pre-\\uffff-post", service.simpleStringHeaderParam("pre-\\uffff-post"));
		assertEquals("	Hello, World!  ", service.simpleStringHeaderParam("	Hello, World!  "));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleStringHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleStringHeaderParamOpt("hello world"));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleStringHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleStringHeaderParamNil("hello world"));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleStringHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleStringHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleStringHeaderParamOptNil("hello world"));
	}

	// --- LocalDate ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParam(HeaderParameterTypesService service) {
		var date = LocalDate.parse("2020-01-01");
		assertEquals(date, service.simpleLocalDateHeaderParam(date));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalDateHeaderParamOpt(LocalDate.parse("2020-01-01")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalDateHeaderParamNil(LocalDate.parse("2020-01-01")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalDateHeaderParamOptNil(LocalDate.parse("2020-01-01")));
	}

	// --- LocalDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParam(HeaderParameterTypesService service) {
		var dt = LocalDateTime.parse("2020-01-01T10:00");
		assertEquals(dt, service.simpleLocalDateTimeHeaderParam(dt));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateTimeHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleLocalDateTimeHeaderParamOpt(LocalDateTime.parse("2020-01-01T10:00")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateTimeHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleLocalDateTimeHeaderParamNil(LocalDateTime.parse("2020-01-01T10:00")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateTimeHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateTimeHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleLocalDateTimeHeaderParamOptNil(LocalDateTime.parse("2020-01-01T10:00")));
	}

	// --- ZonedDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParam(HeaderParameterTypesService service) {
		var zdt = ZonedDateTime.parse("2025-01-01T10:00:00Z");
		assertEquals(zdt, service.simpleZonedDateTimeHeaderParam(zdt));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleZonedDateTimeHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleZonedDateTimeHeaderParamOpt(ZonedDateTime.parse("2025-01-01T10:00:00Z")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleZonedDateTimeHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleZonedDateTimeHeaderParamNil(ZonedDateTime.parse("2025-01-01T10:00:00Z")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleZonedDateTimeHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleZonedDateTimeHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleZonedDateTimeHeaderParamOptNil(ZonedDateTime.parse("2025-01-01T10:00:00Z")));
	}

	// --- Scalar (ZoneId) ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParam(HeaderParameterTypesService service) {
		var zoneId = ZoneId.of("Europe/Vienna");
		assertEquals(zoneId, service.simpleScalarHeaderParam(zoneId));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleScalarHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleScalarHeaderParamOpt(ZoneId.of("Europe/Vienna")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleScalarHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleScalarHeaderParamNil(ZoneId.of("Europe/Vienna")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleScalarHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleScalarHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleScalarHeaderParamOptNil(ZoneId.of("Europe/Vienna")));
	}

	// --- Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParam(HeaderParameterTypesService service) {
		assertEquals(SampleEnum.A, service.simpleEnumHeaderParam(SampleEnum.A));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleEnumHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleEnumHeaderParamOpt(SampleEnum.B));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleEnumHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleEnumHeaderParamNil(SampleEnum.A));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleEnumHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleEnumHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleEnumHeaderParamOptNil(SampleEnum.B));
	}

	// --- Inline Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParam(HeaderParameterTypesService service) {
		assertEquals(SimpleInlineEnumHeaderParam_Result$.A,
				service.simpleInlineEnumHeaderParam(SimpleInlineEnumHeaderParam_HeaderValue_Param$.A));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleInlineEnumHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParamOpt_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleInlineEnumHeaderParamOpt(SimpleInlineEnumHeaderParamOpt_HeaderValue_Param$.A));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleInlineEnumHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParamNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleInlineEnumHeaderParamNil(SimpleInlineEnumHeaderParamNil_HeaderValue_Param$.C));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleInlineEnumHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleInlineEnumHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleInlineEnumHeaderParamOptNil(SimpleInlineEnumHeaderParamOptNil_HeaderValue_Param$.D));
	}

	// --- Multi Header Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParam(HeaderParameterTypesService service) {
		assertEquals("hello-42", service.multiHeaderParam("hello", 42));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOpt_allUndefined(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.UNDEFINED, NilResult.UNDEFINED), service.multiHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOpt_valueAOnly(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.DEFINED, NilResult.UNDEFINED), service.multiHeaderParamOpt("hello"));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOpt_allDefined(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED), service.multiHeaderParamOpt("hello", 42));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamNil_allNull(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.NULL, NilResult.NULL), service.multiHeaderParamNil(null, null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamNil_allDefined(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED), service.multiHeaderParamNil("hello", 42));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOptNil_allUndefined(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.UNDEFINED, NilResult.UNDEFINED), service.multiHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOptNil_valueANull(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.NULL, NilResult.UNDEFINED),
				service.multiHeaderParamOptNil((String) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOptNil_allNull(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.NULL, NilResult.NULL),
				service.multiHeaderParamOptNil((String) null, (Integer) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiHeaderParamOptNil_allDefined(HeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED),
				service.multiHeaderParamOptNil("hello", 42));
	}

	// --- Record Header Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParam(HeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.recordHeaderParam(record);
		assertEquals("k", result.key());
		assertEquals("1", result.version());
		assertEquals("v", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParamOpt_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.recordHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParamOpt_defined(HeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.recordHeaderParamOpt(record));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParamNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.recordHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParamNil_defined(HeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.recordHeaderParamNil(record));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParamOptNil_undefined(HeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.recordHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParamOptNil_null(HeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.recordHeaderParamOptNil((SimpleRecord.Data) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordHeaderParamOptNil_defined(HeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.recordHeaderParamOptNil(record));
	}

}
