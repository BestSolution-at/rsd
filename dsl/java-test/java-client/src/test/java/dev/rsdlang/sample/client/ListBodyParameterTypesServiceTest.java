package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.ListBodyParameterTypesService.ListInlineEnumBodyParam_BodyEnum_Param$;
import dev.rsdlang.sample.client.ListBodyParameterTypesService.ListInlineEnumBodyParam_Result$;
import dev.rsdlang.sample.client.ListBodyParameterTypesService.ListInlineEnumBodyParamNil_BodyEnum_Param$;
import dev.rsdlang.sample.client.ListBodyParameterTypesService.ListInlineEnumBodyParamOpt_BodyEnum_Param$;
import dev.rsdlang.sample.client.ListBodyParameterTypesService.ListInlineEnumBodyParamOptNil_BodyEnum_Param$;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient.ContentTypeEncoding;
import dev.rsdlang.sample.client.model.NilResult;
import dev.rsdlang.sample.client.model.SampleEnum;
import dev.rsdlang.sample.client.model.SimpleRecord;

public class ListBodyParameterTypesServiceTest {

	static ListBodyParameterTypesService[] serviceProvider() {
		var baseBuilder = JDKSpecSamplesClient.builder().baseURI(URI.create("http://localhost:3000"));
		var JSON = baseBuilder.build();
		var MSGPACK = baseBuilder.contentTypeEncoding(ContentTypeEncoding.APPLICATION_VND_MSGPACK).build();
		return new ListBodyParameterTypesService[] {
				JSON.service(ListBodyParameterTypesService.class),
				MSGPACK.service(ListBodyParameterTypesService.class),
		};
	}

	// --- Boolean ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanBodyParam(ListBodyParameterTypesService service) {
		assertEquals(List.of(true, false), service.listBooleanBodyParam(List.of(true, false)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanBodyParamOpt_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listBooleanBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanBodyParamOpt_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listBooleanBodyParamOpt(List.of(true)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanBodyParamNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listBooleanBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanBodyParamNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listBooleanBodyParamNil(List.of(true)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanBodyParamOptNil_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listBooleanBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanBodyParamOptNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listBooleanBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanBodyParamOptNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listBooleanBodyParamOptNil(List.of(true)));
	}

	// --- Short ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortBodyParam(ListBodyParameterTypesService service) {
		assertEquals(List.of((short) 42, (short) 7), service.listShortBodyParam(List.of((short) 42, (short) 7)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortBodyParamOpt_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listShortBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortBodyParamOpt_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listShortBodyParamOpt(List.of((short) 42)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortBodyParamNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listShortBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortBodyParamNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listShortBodyParamNil(List.of((short) 42)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortBodyParamOptNil_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listShortBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortBodyParamOptNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listShortBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortBodyParamOptNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listShortBodyParamOptNil(List.of((short) 42)));
	}

	// --- Int ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntBodyParam(ListBodyParameterTypesService service) {
		assertEquals(List.of(123456, 789), service.listIntBodyParam(List.of(123456, 789)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntBodyParamOpt_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listIntBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntBodyParamOpt_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listIntBodyParamOpt(List.of(123456)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntBodyParamNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listIntBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntBodyParamNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listIntBodyParamNil(List.of(123456)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntBodyParamOptNil_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listIntBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntBodyParamOptNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listIntBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntBodyParamOptNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listIntBodyParamOptNil(List.of(123456)));
	}

	// --- Long ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongBodyParam(ListBodyParameterTypesService service) {
		assertEquals(List.of(1234567890123L, 456L), service.listLongBodyParam(List.of(1234567890123L, 456L)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongBodyParamOpt_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLongBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongBodyParamOpt_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLongBodyParamOpt(List.of(1234567890123L)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongBodyParamNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLongBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongBodyParamNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLongBodyParamNil(List.of(1234567890123L)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongBodyParamOptNil_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLongBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongBodyParamOptNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLongBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongBodyParamOptNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLongBodyParamOptNil(List.of(1234567890123L)));
	}

	// --- Float ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatBodyParam(ListBodyParameterTypesService service) {
		assertEquals(List.of(123.45f, 6.78f), service.listFloatBodyParam(List.of(123.45f, 6.78f)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatBodyParamOpt_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listFloatBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatBodyParamOpt_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listFloatBodyParamOpt(List.of(123.45f)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatBodyParamNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listFloatBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatBodyParamNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listFloatBodyParamNil(List.of(123.45f)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatBodyParamOptNil_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listFloatBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatBodyParamOptNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listFloatBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatBodyParamOptNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listFloatBodyParamOptNil(List.of(123.45f)));
	}

	// --- Double ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleBodyParam(ListBodyParameterTypesService service) {
		assertEquals(List.of(123.456789, 9.87), service.listDoubleBodyParam(List.of(123.456789, 9.87)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleBodyParamOpt_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listDoubleBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleBodyParamOpt_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listDoubleBodyParamOpt(List.of(123.456789)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleBodyParamNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listDoubleBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleBodyParamNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listDoubleBodyParamNil(List.of(123.456789)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleBodyParamOptNil_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listDoubleBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleBodyParamOptNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listDoubleBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleBodyParamOptNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listDoubleBodyParamOptNil(List.of(123.456789)));
	}

	// --- String ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringBodyParam(ListBodyParameterTypesService service) {
		assertEquals(List.of("hello", "world"), service.listStringBodyParam(List.of("hello", "world")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringBodyParamOpt_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listStringBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringBodyParamOpt_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listStringBodyParamOpt(List.of("hello")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringBodyParamNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listStringBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringBodyParamNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listStringBodyParamNil(List.of("hello")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringBodyParamOptNil_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listStringBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringBodyParamOptNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listStringBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringBodyParamOptNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listStringBodyParamOptNil(List.of("hello")));
	}

	// --- LocalDate ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateBodyParam(ListBodyParameterTypesService service) {
		var dates = List.of(LocalDate.parse("2020-01-01"), LocalDate.parse("2021-06-15"));
		assertEquals(dates, service.listLocalDateBodyParam(dates));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateBodyParamOpt_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalDateBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateBodyParamOpt_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLocalDateBodyParamOpt(List.of(LocalDate.parse("2020-01-01"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateBodyParamNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalDateBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateBodyParamNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLocalDateBodyParamNil(List.of(LocalDate.parse("2020-01-01"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateBodyParamOptNil_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalDateBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateBodyParamOptNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalDateBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateBodyParamOptNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLocalDateBodyParamOptNil(List.of(LocalDate.parse("2020-01-01"))));
	}

	// --- LocalDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeBodyParam(ListBodyParameterTypesService service) {
		var dts = List.of(LocalDateTime.parse("2020-01-01T10:00"), LocalDateTime.parse("2021-06-15T12:30"));
		assertEquals(dts, service.listLocalDateTimeBodyParam(dts));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeBodyParamOpt_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalDateTimeBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeBodyParamOpt_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listLocalDateTimeBodyParamOpt(List.of(LocalDateTime.parse("2020-01-01T10:00"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeBodyParamNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalDateTimeBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeBodyParamNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listLocalDateTimeBodyParamNil(List.of(LocalDateTime.parse("2020-01-01T10:00"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeBodyParamOptNil_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalDateTimeBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeBodyParamOptNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalDateTimeBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeBodyParamOptNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listLocalDateTimeBodyParamOptNil(List.of(LocalDateTime.parse("2020-01-01T10:00"))));
	}

	// --- LocalTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeBodyParam(ListBodyParameterTypesService service) {
		var times = List.of(LocalTime.parse("10:00:00"), LocalTime.parse("11:30:00"));
		assertEquals(times, service.listLocalTimeBodyParam(times));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeBodyParamOpt_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalTimeBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeBodyParamOpt_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLocalTimeBodyParamOpt(List.of(LocalTime.parse("10:00:00"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeBodyParamNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalTimeBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeBodyParamNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLocalTimeBodyParamNil(List.of(LocalTime.parse("10:00:00"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeBodyParamOptNil_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalTimeBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeBodyParamOptNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalTimeBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeBodyParamOptNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLocalTimeBodyParamOptNil(List.of(LocalTime.parse("10:00:00"))));
	}

	// --- ZonedDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeBodyParam(ListBodyParameterTypesService service) {
		var zdts = List.of(ZonedDateTime.parse("2025-01-01T10:00:00Z"), ZonedDateTime.parse("2025-06-15T12:00:00Z"));
		assertEquals(zdts, service.listZonedDateTimeBodyParam(zdts));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeBodyParamOpt_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listZonedDateTimeBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeBodyParamOpt_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listZonedDateTimeBodyParamOpt(List.of(ZonedDateTime.parse("2025-01-01T10:00:00Z"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeBodyParamNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listZonedDateTimeBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeBodyParamNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listZonedDateTimeBodyParamNil(List.of(ZonedDateTime.parse("2025-01-01T10:00:00Z"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeBodyParamOptNil_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listZonedDateTimeBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeBodyParamOptNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listZonedDateTimeBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeBodyParamOptNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listZonedDateTimeBodyParamOptNil(List.of(ZonedDateTime.parse("2025-01-01T10:00:00Z"))));
	}

	// --- Scalar (ZoneId) ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarBodyParam(ListBodyParameterTypesService service) {
		var zoneIds = List.of(ZoneId.of("Europe/Vienna"), ZoneId.of("UTC"));
		assertEquals(zoneIds, service.listScalarBodyParam(zoneIds));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarBodyParamOpt_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listScalarBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarBodyParamOpt_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listScalarBodyParamOpt(List.of(ZoneId.of("Europe/Vienna"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarBodyParamNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listScalarBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarBodyParamNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listScalarBodyParamNil(List.of(ZoneId.of("Europe/Vienna"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarBodyParamOptNil_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listScalarBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarBodyParamOptNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listScalarBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarBodyParamOptNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listScalarBodyParamOptNil(List.of(ZoneId.of("Europe/Vienna"))));
	}

	// --- Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumBodyParam(ListBodyParameterTypesService service) {
		assertEquals(List.of(SampleEnum.A, SampleEnum.B), service.listEnumBodyParam(List.of(SampleEnum.A, SampleEnum.B)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumBodyParamOpt_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listEnumBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumBodyParamOpt_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listEnumBodyParamOpt(List.of(SampleEnum.B)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumBodyParamNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listEnumBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumBodyParamNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listEnumBodyParamNil(List.of(SampleEnum.A)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumBodyParamOptNil_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listEnumBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumBodyParamOptNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listEnumBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumBodyParamOptNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listEnumBodyParamOptNil(List.of(SampleEnum.B)));
	}

	// --- Inline Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumBodyParam(ListBodyParameterTypesService service) {
		assertEquals(List.of(ListInlineEnumBodyParam_Result$.A),
				service.listInlineEnumBodyParam(List.of(ListInlineEnumBodyParam_BodyEnum_Param$.A)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumBodyParamOpt_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listInlineEnumBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumBodyParamOpt_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listInlineEnumBodyParamOpt(List.of(ListInlineEnumBodyParamOpt_BodyEnum_Param$.A)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumBodyParamNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listInlineEnumBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumBodyParamNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listInlineEnumBodyParamNil(List.of(ListInlineEnumBodyParamNil_BodyEnum_Param$.C)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumBodyParamOptNil_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listInlineEnumBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumBodyParamOptNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listInlineEnumBodyParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumBodyParamOptNil_defined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listInlineEnumBodyParamOptNil(List.of(ListInlineEnumBodyParamOptNil_BodyEnum_Param$.D)));
	}

	// --- List Multi Body Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiBodyParam(ListBodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals("hello-42-k", service.listMultiBodyParam(List.of("hello"), List.of(42), List.of(record)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiBodyParamOpt_allUndefined(ListBodyParameterTypesService service) {
		assertEquals(List.of(NilResult.UNDEFINED, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.listMultiBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiBodyParamOpt_valueAOnly(ListBodyParameterTypesService service) {
		assertEquals(List.of(NilResult.DEFINED, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.listMultiBodyParamOpt(List.of("hello")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiBodyParamOpt_valueAAndB(ListBodyParameterTypesService service) {
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.UNDEFINED),
				service.listMultiBodyParamOpt(List.of("hello"), List.of(42)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiBodyParamOpt_allDefined(ListBodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.DEFINED),
				service.listMultiBodyParamOpt(List.of("hello"), List.of(42), List.of(record)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiBodyParamNil_allNull(ListBodyParameterTypesService service) {
		assertEquals(List.of(NilResult.NULL, NilResult.NULL, NilResult.NULL),
				service.listMultiBodyParamNil(null, null, null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiBodyParamNil_allDefined(ListBodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.DEFINED),
				service.listMultiBodyParamNil(List.of("hello"), List.of(42), List.of(record)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiBodyParamOptNil_allUndefined(ListBodyParameterTypesService service) {
		assertEquals(List.of(NilResult.UNDEFINED, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.listMultiBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiBodyParamOptNil_valueANull(ListBodyParameterTypesService service) {
		assertEquals(List.of(NilResult.NULL, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.listMultiBodyParamOptNil((List<String>) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiBodyParamOptNil_allNull(ListBodyParameterTypesService service) {
		assertEquals(List.of(NilResult.NULL, NilResult.NULL, NilResult.NULL),
				service.listMultiBodyParamOptNil((List<String>) null, (List<Integer>) null, (List<SimpleRecord.Data>) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiBodyParamOptNil_allDefined(ListBodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.DEFINED),
				service.listMultiBodyParamOptNil(List.of("hello"), List.of(42), List.of(record)));
	}

	// --- List Record Body Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordBodyParam(ListBodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.listRecordBodyParam(List.of(record));
		assertEquals(1, result.size());
		assertEquals("k", result.get(0).key());
		assertEquals("1", result.get(0).version());
		assertEquals("v", result.get(0).value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordBodyParamOpt_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listRecordBodyParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordBodyParamOpt_defined(ListBodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.listRecordBodyParamOpt(List.of(record)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordBodyParamNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listRecordBodyParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordBodyParamNil_defined(ListBodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.listRecordBodyParamNil(List.of(record)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordBodyParamOptNil_undefined(ListBodyParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listRecordBodyParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordBodyParamOptNil_null(ListBodyParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listRecordBodyParamOptNil((List<SimpleRecord.Data>) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordBodyParamOptNil_defined(ListBodyParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.listRecordBodyParamOptNil(List.of(record)));
	}

}
