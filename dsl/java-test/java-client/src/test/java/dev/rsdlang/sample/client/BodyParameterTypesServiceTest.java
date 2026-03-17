package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.BodyParameterTypesService.SimpleInlineEnumBodyParam_BodyEnum_Param$;
import dev.rsdlang.sample.client.BodyParameterTypesService.SimpleInlineEnumBodyParam_Result$;
import dev.rsdlang.sample.client.BodyParameterTypesService.SimpleInlineEnumBodyParamNil_BodyEnum_Param$;
import dev.rsdlang.sample.client.BodyParameterTypesService.SimpleInlineEnumBodyParamOpt_BodyEnum_Param$;
import dev.rsdlang.sample.client.BodyParameterTypesService.SimpleInlineEnumBodyParamOptNil_BodyEnum_Param$;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.model.NilResult;
import dev.rsdlang.sample.client.model.PatchableRecord;
import dev.rsdlang.sample.client.model.SampleEnum;
import dev.rsdlang.sample.client.model.SimpleRecord;
import dev.rsdlang.sample.client.model.UnionA;

public class BodyParameterTypesServiceTest {

	private static final SpecSamplesClient JDK_CLIENT = JDKSpecSamplesClient.create(URI.create("http://localhost:3000"));

	static BodyParameterTypesService[] serviceProvider() {
		return new BodyParameterTypesService[] {
				JDK_CLIENT.service(BodyParameterTypesService.class),
		};
	}

	// --- Boolean ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParam(BodyParameterTypesService service) {
		assertEquals(true, service.simpleBooleanBodyParam(true));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleBooleanBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleBooleanBodyParamOpt(true));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleBooleanBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleBooleanBodyParamNil(true));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleBooleanBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleBooleanBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleBooleanBodyParamOptNil(true));
	}

	// --- Short ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParam(BodyParameterTypesService service) {
		assertEquals((short) 42, service.simpleShortBodyParam((short) 42));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleShortBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleShortBodyParamOpt((short) 42));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleShortBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleShortBodyParamNil((short) 42));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleShortBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleShortBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleShortBodyParamOptNil((short) 42));
	}

	// --- Int ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParam(BodyParameterTypesService service) {
		assertEquals(123456, service.simpleIntBodyParam(123456));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleIntBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleIntBodyParamOpt(123456));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleIntBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleIntBodyParamNil(123456));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleIntBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleIntBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleIntBodyParamOptNil(123456));
	}

	// --- Long ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParam(BodyParameterTypesService service) {
		assertEquals(1234567890123L, service.simpleLongBodyParam(1234567890123L));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLongBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLongBodyParamOpt(1234567890123L));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLongBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLongBodyParamNil(1234567890123L));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLongBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLongBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLongBodyParamOptNil(1234567890123L));
	}

	// --- Float ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParam(BodyParameterTypesService service) {
		assertEquals(123.45f, service.simpleFloatBodyParam(123.45f));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleFloatBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleFloatBodyParamOpt(123.45f));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleFloatBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleFloatBodyParamNil(123.45f));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleFloatBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleFloatBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleFloatBodyParamOptNil(123.45f));
	}

	// --- Double ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParam(BodyParameterTypesService service) {
		assertEquals(123.456789, service.simpleDoubleBodyParam(123.456789));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleDoubleBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleDoubleBodyParamOpt(123.456789));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleDoubleBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleDoubleBodyParamNil(123.456789));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleDoubleBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleDoubleBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleDoubleBodyParamOptNil(123.456789));
	}

	// --- String ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParam(BodyParameterTypesService service) {
		assertEquals("hello world", service.simpleStringBodyParam("hello world"));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleStringBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleStringBodyParamOpt("hello world"));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleStringBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleStringBodyParamNil("hello world"));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleStringBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleStringBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleStringBodyParamOptNil("hello world"));
	}

	// --- LocalDate ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParam(BodyParameterTypesService service) {
		var date = LocalDate.parse("2020-01-01");
		assertEquals(date, service.simpleLocalDateBodyParam(date));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalDateBodyParamOpt(LocalDate.parse("2020-01-01")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalDateBodyParamNil(LocalDate.parse("2020-01-01")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalDateBodyParamOptNil(LocalDate.parse("2020-01-01")));
	}

	// --- LocalDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParam(BodyParameterTypesService service) {
		var dt = LocalDateTime.parse("2020-01-01T10:00");
		assertEquals(dt, service.simpleLocalDateTimeBodyParam(dt));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateTimeBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalDateTimeBodyParamOpt(LocalDateTime.parse("2020-01-01T10:00")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateTimeBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalDateTimeBodyParamNil(LocalDateTime.parse("2020-01-01T10:00")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateTimeBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateTimeBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleLocalDateTimeBodyParamOptNil(LocalDateTime.parse("2020-01-01T10:00")));
	}

	// --- ZonedDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParam(BodyParameterTypesService service) {
		var zdt = ZonedDateTime.parse("2025-01-01T10:00:00Z");
		assertEquals(zdt, service.simpleZonedDateTimeBodyParam(zdt));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleZonedDateTimeBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleZonedDateTimeBodyParamOpt(ZonedDateTime.parse("2025-01-01T10:00:00Z")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleZonedDateTimeBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleZonedDateTimeBodyParamNil(ZonedDateTime.parse("2025-01-01T10:00:00Z")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleZonedDateTimeBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleZonedDateTimeBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleZonedDateTimeBodyParamOptNil(ZonedDateTime.parse("2025-01-01T10:00:00Z")));
	}

	// --- Scalar (ZoneId) ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParam(BodyParameterTypesService service) {
		var zoneId = ZoneId.of("Europe/Vienna");
		assertEquals(zoneId, service.simpleScalarBodyParam(zoneId));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleScalarBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleScalarBodyParamOpt(ZoneId.of("Europe/Vienna")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleScalarBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleScalarBodyParamNil(ZoneId.of("Europe/Vienna")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleScalarBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleScalarBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleScalarBodyParamOptNil(ZoneId.of("Europe/Vienna")));
	}

	// --- Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParam(BodyParameterTypesService service) {
		assertEquals(SampleEnum.A, service.simpleEnumBodyParam(SampleEnum.A));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleEnumBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleEnumBodyParamOpt(SampleEnum.B));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleEnumBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleEnumBodyParamNil(SampleEnum.A));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleEnumBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleEnumBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleEnumBodyParamOptNil(SampleEnum.B));
	}

	// --- Inline Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParam(BodyParameterTypesService service) {
		assertEquals(SimpleInlineEnumBodyParam_Result$.A,
				service.simpleInlineEnumBodyParam(SimpleInlineEnumBodyParam_BodyEnum_Param$.A));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleInlineEnumBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleInlineEnumBodyParamOpt(SimpleInlineEnumBodyParamOpt_BodyEnum_Param$.A));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleInlineEnumBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleInlineEnumBodyParamNil(SimpleInlineEnumBodyParamNil_BodyEnum_Param$.C));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleInlineEnumBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleInlineEnumBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleInlineEnumBodyParamOptNil(SimpleInlineEnumBodyParamOptNil_BodyEnum_Param$.D));
	}

	// --- Multi Body Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParam(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals("hello-42-k", service.multiBodyParam("hello", 42, record));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOpt_allUndefined(BodyParameterTypesService service) {
		assertEquals("undefined-undefined-undefined", service.multiBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOpt_valueAOnly(BodyParameterTypesService service) {
		assertEquals("hello-undefined-undefined", service.multiBodyParamOpt("hello"));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOpt_valueAAndB(BodyParameterTypesService service) {
		assertEquals("hello-42-undefined", service.multiBodyParamOpt("hello", 42));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOpt_allDefined(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals("hello-42-k", service.multiBodyParamOpt("hello", 42, record));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamNil_allNull(BodyParameterTypesService service) {
		assertEquals("null-null-null", service.multiBodyParamNil(null, null, null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamNil_allDefined(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals("hello-42-k", service.multiBodyParamNil("hello", 42, record));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOptNil_allUndefined(BodyParameterTypesService service) {
		assertEquals("undefined-undefined-undefined", service.multiBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOptNil_valueANull(BodyParameterTypesService service) {
		assertEquals("null-undefined-undefined", service.multiBodyParamOptNil((String) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOptNil_allNull(BodyParameterTypesService service) {
		assertEquals("null-null-null",
				service.multiBodyParamOptNil((String) null, (Integer) null, (SimpleRecord.Data) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOptNil_allDefined(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals("hello-42-k", service.multiBodyParamOptNil("hello", 42, record));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamFirst_allDefined(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals("hello-42-k", service.multiBodyParamFirst("hello", 42, record));
	}

	// --- Record Body Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParam(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.recordBodyParam(record);
		assertEquals("k", result.key());
		assertEquals("1", result.version());
		assertEquals("v", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.recordBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParamOpt_defined(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.recordBodyParamOpt(record));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.recordBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParamNil_defined(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.recordBodyParamNil(record));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.recordBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.recordBodyParamOptNil((SimpleRecord.Data) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParamOptNil_defined(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.recordBodyParamOptNil(record));
	}

	// --- Union Body Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParam(BodyParameterTypesService service) {
		var union = service.client().builder(UnionA.DataBuilder.class).shared("shared").valueA("valueA").build();
		var result = service.unionBodyParam(union);
		assertEquals("shared", result.shared());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.unionBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParamOpt_defined(BodyParameterTypesService service) {
		var union = service.client().builder(UnionA.DataBuilder.class).shared("shared").valueA("valueA").build();
		assertEquals(NilResult.DEFINED, service.unionBodyParamOpt(union));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.unionBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParamNil_defined(BodyParameterTypesService service) {
		var union = service.client().builder(UnionA.DataBuilder.class).shared("shared").valueA("valueA").build();
		assertEquals(NilResult.DEFINED, service.unionBodyParamNil(union));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.unionBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.unionBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParamOptNil_defined(BodyParameterTypesService service) {
		var union = service.client().builder(UnionA.DataBuilder.class).shared("shared").valueA("valueA").build();
		assertEquals(NilResult.DEFINED, service.unionBodyParamOptNil(union));
	}

	// --- Patchable Record Body Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParam(BodyParameterTypesService service) {
		var patch = service.client().builder(PatchableRecord.PatchBuilder.class).key("k").version("1").value("v").build();
		var result = service.patchableRecordBodyParam(patch);
		assertEquals("k", result.key());
		assertEquals("1", result.version());
		assertEquals("v", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParamOpt_undefined(BodyParameterTypesService service) {
		var result = service.patchableRecordBodyParamOpt();
		assertEquals("undefined", result.key());
		assertEquals("undefined", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParamOpt_defined(BodyParameterTypesService service) {
		var patch = service.client().builder(PatchableRecord.PatchBuilder.class).key("k").version("1").value("v").build();
		var result = service.patchableRecordBodyParamOpt(patch);
		assertEquals("k", result.key());
		assertEquals("v", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParamNil_null(BodyParameterTypesService service) {
		var result = service.patchableRecordBodyParamNil(null);
		assertEquals("null", result.key());
		assertEquals("null", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParamNil_defined(BodyParameterTypesService service) {
		var patch = service.client().builder(PatchableRecord.PatchBuilder.class).key("k").version("1").value("v").build();
		var result = service.patchableRecordBodyParamNil(patch);
		assertEquals("k", result.key());
		assertEquals("v", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParamOptNil_undefined(BodyParameterTypesService service) {
		var result = service.patchableRecordBodyParamOptNil();
		assertEquals("undefined", result.key());
		assertEquals("undefined", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParamOptNil_null(BodyParameterTypesService service) {
		var result = service.patchableRecordBodyParamOptNil((PatchableRecord.Patch) null);
		assertEquals("null", result.key());
		assertEquals("null", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParamOptNil_defined(BodyParameterTypesService service) {
		var patch = service.client().builder(PatchableRecord.PatchBuilder.class).key("k").version("1").value("v").build();
		var result = service.patchableRecordBodyParamOptNil(patch);
		assertEquals("k", result.key());
		assertEquals("v", result.value());
	}

}
