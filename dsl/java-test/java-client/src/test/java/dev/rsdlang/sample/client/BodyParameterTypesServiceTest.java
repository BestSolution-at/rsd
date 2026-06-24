package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.time.OffsetDateTime;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.BodyParameterTypesService.SimpleInlineEnumBodyParam_BodyEnum_Param$;
import dev.rsdlang.sample.client.BodyParameterTypesService.SimpleInlineEnumBodyParam_Result$;
import dev.rsdlang.sample.client.BodyParameterTypesService.SimpleInlineEnumBodyParamNil_BodyEnum_Param$;
import dev.rsdlang.sample.client.BodyParameterTypesService.SimpleInlineEnumBodyParamOpt_BodyEnum_Param$;
import dev.rsdlang.sample.client.BodyParameterTypesService.SimpleInlineEnumBodyParamOptNil_BodyEnum_Param$;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient.ContentTypeEncoding;
import dev.rsdlang.sample.client.model.NilResult;
import dev.rsdlang.sample.client.model.PatchableRecord;
import dev.rsdlang.sample.client.model.SampleEnum;
import dev.rsdlang.sample.client.model.SimpleRecord;
import dev.rsdlang.sample.client.model.UnionA;
import dev.rsdlang.sample.client.model.ZoneId;

public class BodyParameterTypesServiceTest {

	private static SpecSamplesClient JSON;
	private static SpecSamplesClient MSGPACK;

	@BeforeAll
	static void setUp() {
		var baseBuilder = JDKSpecSamplesClient.builder().baseURI(URI.create("http://localhost:3000"));
		JSON = baseBuilder.build();
		MSGPACK = baseBuilder.contentTypeEncoding(ContentTypeEncoding.APPLICATION_VND_MSGPACK).build();
	}

	@AfterAll
	static void tearDown() {
		((JDKSpecSamplesClient) JSON).close();
		((JDKSpecSamplesClient) MSGPACK).close();
	}

	static BodyParameterTypesService[] serviceProvider() {
		return new BodyParameterTypesService[] {
				JSON.service(BodyParameterTypesService.class),
				MSGPACK.service(BodyParameterTypesService.class),
		};
	}

	// --- Boolean ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParam(BodyParameterTypesService service) {
		assertEquals(true, service.simpleBooleanBodyParam(true).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleBooleanBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleBooleanBodyParamOpt(true).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleBooleanBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleBooleanBodyParamNil(true).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleBooleanBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleBooleanBodyParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleBooleanBodyParamOptNil(true).orThrow());
	}

	// --- Short ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParam(BodyParameterTypesService service) {
		assertEquals((short) 42, service.simpleShortBodyParam((short) 42).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleShortBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleShortBodyParamOpt((short) 42).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleShortBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleShortBodyParamNil((short) 42).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleShortBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleShortBodyParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleShortBodyParamOptNil((short) 42).orThrow());
	}

	// --- Int ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParam(BodyParameterTypesService service) {
		assertEquals(123456, service.simpleIntBodyParam(123456).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleIntBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleIntBodyParamOpt(123456).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleIntBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleIntBodyParamNil(123456).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleIntBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleIntBodyParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleIntBodyParamOptNil(123456).orThrow());
	}

	// --- Long ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParam(BodyParameterTypesService service) {
		assertEquals(1234567890123L, service.simpleLongBodyParam(1234567890123L).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLongBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLongBodyParamOpt(1234567890123L).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLongBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLongBodyParamNil(1234567890123L).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLongBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLongBodyParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLongBodyParamOptNil(1234567890123L).orThrow());
	}

	// --- Float ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParam(BodyParameterTypesService service) {
		assertEquals(123.45f, service.simpleFloatBodyParam(123.45f).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleFloatBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleFloatBodyParamOpt(123.45f).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleFloatBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleFloatBodyParamNil(123.45f).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleFloatBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleFloatBodyParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleFloatBodyParamOptNil(123.45f).orThrow());
	}

	// --- Double ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParam(BodyParameterTypesService service) {
		assertEquals(123.456789, service.simpleDoubleBodyParam(123.456789).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleDoubleBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleDoubleBodyParamOpt(123.456789).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleDoubleBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleDoubleBodyParamNil(123.456789).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleDoubleBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleDoubleBodyParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoubleBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleDoubleBodyParamOptNil(123.456789).orThrow());
	}

	// --- String ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParam(BodyParameterTypesService service) {
		assertEquals("hello world", service.simpleStringBodyParam("hello world").orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleStringBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleStringBodyParamOpt("hello world").orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleStringBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleStringBodyParamNil("hello world").orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleStringBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleStringBodyParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleStringBodyParamOptNil("hello world").orThrow());
	}

	// --- LocalDate ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParam(BodyParameterTypesService service) {
		var date = LocalDate.parse("2020-01-01");
		assertEquals(date, service.simpleLocalDateBodyParam(date).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalDateBodyParamOpt(LocalDate.parse("2020-01-01")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalDateBodyParamNil(LocalDate.parse("2020-01-01")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateBodyParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleLocalDateBodyParamOptNil(LocalDate.parse("2020-01-01")).orThrow());
	}

	// --- LocalDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParam(BodyParameterTypesService service) {
		var dt = LocalDateTime.parse("2020-01-01T10:00");
		assertEquals(dt, service.simpleLocalDateTimeBodyParam(dt).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateTimeBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleLocalDateTimeBodyParamOpt(LocalDateTime.parse("2020-01-01T10:00")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateTimeBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleLocalDateTimeBodyParamNil(LocalDateTime.parse("2020-01-01T10:00")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalDateTimeBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalDateTimeBodyParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimeBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleLocalDateTimeBodyParamOptNil(LocalDateTime.parse("2020-01-01T10:00")).orThrow());
	}

	// --- LocalTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeBodyParam(BodyParameterTypesService service) {
		var t = LocalTime.parse("10:00:00");
		assertEquals(t, service.simpleLocalTimeBodyParam(t).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalTimeBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalTimeBodyParamOpt(LocalTime.parse("10:00:00")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalTimeBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalTimeBodyParamNil(LocalTime.parse("10:00:00")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleLocalTimeBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleLocalTimeBodyParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimeBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleLocalTimeBodyParamOptNil(LocalTime.parse("10:00:00")).orThrow());
	}

	// --- OffsetDateTime ---
	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeBodyParam(BodyParameterTypesService service) {
		var odt = OffsetDateTime.parse("2025-01-01T10:00:00+01:00");
		assertEquals(odt, service.simpleOffsetDateTimeBodyParam(odt).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleOffsetDateTimeBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleOffsetDateTimeBodyParamOpt(OffsetDateTime.parse("2025-01-01T10:00:00+01:00")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleOffsetDateTimeBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleOffsetDateTimeBodyParamNil(OffsetDateTime.parse("2025-01-01T10:00:00+01:00")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleOffsetDateTimeBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleOffsetDateTimeBodyParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimeBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleOffsetDateTimeBodyParamOptNil(OffsetDateTime.parse("2025-01-01T10:00:00+01:00"))
						.orThrow());
	}

	// --- ZonedDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParam(BodyParameterTypesService service) {
		var zdt = ZonedDateTime.parse("2025-01-01T10:00:00Z");
		assertEquals(zdt, service.simpleZonedDateTimeBodyParam(zdt).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleZonedDateTimeBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleZonedDateTimeBodyParamOpt(ZonedDateTime.parse("2025-01-01T10:00:00Z")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleZonedDateTimeBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleZonedDateTimeBodyParamNil(ZonedDateTime.parse("2025-01-01T10:00:00Z")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleZonedDateTimeBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleZonedDateTimeBodyParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimeBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleZonedDateTimeBodyParamOptNil(ZonedDateTime.parse("2025-01-01T10:00:00Z")).orThrow());
	}

	// --- Scalar (ZoneId) ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParam(BodyParameterTypesService service) {
		var zoneId = ZoneId.of("Europe/Vienna");
		assertEquals(zoneId, service.simpleScalarBodyParam(zoneId).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleScalarBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleScalarBodyParamOpt(ZoneId.of("Europe/Vienna")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleScalarBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleScalarBodyParamNil(ZoneId.of("Europe/Vienna")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleScalarBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleScalarBodyParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleScalarBodyParamOptNil(ZoneId.of("Europe/Vienna")).orThrow());
	}

	// --- Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParam(BodyParameterTypesService service) {
		assertEquals(SampleEnum.A, service.simpleEnumBodyParam(SampleEnum.A).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleEnumBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleEnumBodyParamOpt(SampleEnum.B).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleEnumBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleEnumBodyParamNil(SampleEnum.A).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleEnumBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleEnumBodyParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.simpleEnumBodyParamOptNil(SampleEnum.B).orThrow());
	}

	// --- Inline Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParam(BodyParameterTypesService service) {
		assertEquals(SimpleInlineEnumBodyParam_Result$.A,
				service.simpleInlineEnumBodyParam(SimpleInlineEnumBodyParam_BodyEnum_Param$.A).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleInlineEnumBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParamOpt_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleInlineEnumBodyParamOpt(SimpleInlineEnumBodyParamOpt_BodyEnum_Param$.A).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleInlineEnumBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParamNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleInlineEnumBodyParamNil(SimpleInlineEnumBodyParamNil_BodyEnum_Param$.C).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.simpleInlineEnumBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.simpleInlineEnumBodyParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleInlineEnumBodyParamOptNil_defined(BodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.simpleInlineEnumBodyParamOptNil(SimpleInlineEnumBodyParamOptNil_BodyEnum_Param$.D).orThrow());
	}

	// --- Multi Body Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParam(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals("hello-42-k", service.multiBodyParam("hello", 42, record).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOpt_allUndefined(BodyParameterTypesService service) {
		assertEquals("undefined-undefined-undefined", service.multiBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOpt_valueAOnly(BodyParameterTypesService service) {
		assertEquals("hello-undefined-undefined", service.multiBodyParamOpt("hello").orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOpt_valueAAndB(BodyParameterTypesService service) {
		assertEquals("hello-42-undefined", service.multiBodyParamOpt("hello", 42).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOpt_allDefined(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals("hello-42-k", service.multiBodyParamOpt("hello", 42, record).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamNil_allNull(BodyParameterTypesService service) {
		assertEquals("null-null-null", service.multiBodyParamNil(null, null, null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamNil_allDefined(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals("hello-42-k", service.multiBodyParamNil("hello", 42, record).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOptNil_allUndefined(BodyParameterTypesService service) {
		assertEquals("undefined-undefined-undefined", service.multiBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOptNil_valueANull(BodyParameterTypesService service) {
		assertEquals("null-undefined-undefined", service.multiBodyParamOptNil((String) null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOptNil_allNull(BodyParameterTypesService service) {
		assertEquals("null-null-null",
				service.multiBodyParamOptNil((String) null, (Integer) null, (SimpleRecord.Data) null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamOptNil_allDefined(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals("hello-42-k", service.multiBodyParamOptNil("hello", 42, record).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiBodyParamFirst_allDefined(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals("hello-42-k", service.multiBodyParamFirst("hello", 42, record).orThrow());
	}

	// --- Record Body Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParam(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.recordBodyParam(record).orThrow();
		assertEquals("k", result.key());
		assertEquals("1", result.version());
		assertEquals("v", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.recordBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParamOpt_defined(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.recordBodyParamOpt(record).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.recordBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParamNil_defined(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.recordBodyParamNil(record).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.recordBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.recordBodyParamOptNil((SimpleRecord.Data) null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void recordBodyParamOptNil_defined(BodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.recordBodyParamOptNil(record).orThrow());
	}

	// --- Union Body Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParam(BodyParameterTypesService service) {
		var union = service.client().builder(UnionA.DataBuilder.class).shared("shared").valueA("valueA").build();
		var result = service.unionBodyParam(union).orThrow();
		assertEquals("shared", result.shared());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParamOpt_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.unionBodyParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParamOpt_defined(BodyParameterTypesService service) {
		var union = service.client().builder(UnionA.DataBuilder.class).shared("shared").valueA("valueA").build();
		assertEquals(NilResult.DEFINED, service.unionBodyParamOpt(union).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParamNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.unionBodyParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParamNil_defined(BodyParameterTypesService service) {
		var union = service.client().builder(UnionA.DataBuilder.class).shared("shared").valueA("valueA").build();
		assertEquals(NilResult.DEFINED, service.unionBodyParamNil(union).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParamOptNil_undefined(BodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.unionBodyParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParamOptNil_null(BodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.unionBodyParamOptNil((UnionA.Data) null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void unionBodyParamOptNil_defined(BodyParameterTypesService service) {
		var union = service.client().builder(UnionA.DataBuilder.class).shared("shared").valueA("valueA").build();
		assertEquals(NilResult.DEFINED, service.unionBodyParamOptNil(union).orThrow());
	}

	// --- Patchable Record Body Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParam(BodyParameterTypesService service) {
		var patch = service.client().builder(PatchableRecord.PatchBuilder.class).key("k").version("1").value("v")
				.build();
		var result = service.patchableRecordBodyParam(patch).orThrow();
		assertEquals("k", result.key());
		assertEquals("1", result.version());
		assertEquals("v", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParamOpt_undefined(BodyParameterTypesService service) {
		var result = service.patchableRecordBodyParamOpt().orThrow();
		assertEquals("undefined", result.key());
		assertEquals("undefined", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParamOpt_defined(BodyParameterTypesService service) {
		var patch = service.client().builder(PatchableRecord.PatchBuilder.class).key("k").version("1").value("v")
				.build();
		var result = service.patchableRecordBodyParamOpt(patch).orThrow();
		assertEquals("k", result.key());
		assertEquals("v", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParamNil_null(BodyParameterTypesService service) {
		var result = service.patchableRecordBodyParamNil(null).orThrow();
		assertEquals("null", result.key());
		assertEquals("null", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParamNil_defined(BodyParameterTypesService service) {
		var patch = service.client().builder(PatchableRecord.PatchBuilder.class).key("k").version("1").value("v")
				.build();
		var result = service.patchableRecordBodyParamNil(patch).orThrow();
		assertEquals("k", result.key());
		assertEquals("v", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParamOptNil_undefined(BodyParameterTypesService service) {
		var result = service.patchableRecordBodyParamOptNil().orThrow();
		assertEquals("undefined", result.key());
		assertEquals("undefined", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParamOptNil_null(BodyParameterTypesService service) {
		var result = service.patchableRecordBodyParamOptNil((PatchableRecord.Patch) null).orThrow();
		assertEquals("null", result.key());
		assertEquals("null", result.value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void patchableRecordBodyParamOptNil_defined(BodyParameterTypesService service) {
		var patch = service.client().builder(PatchableRecord.PatchBuilder.class).key("k").version("1").value("v")
				.build();
		var result = service.patchableRecordBodyParamOptNil(patch).orThrow();
		assertEquals("k", result.key());
		assertEquals("v", result.value());
	}

}
