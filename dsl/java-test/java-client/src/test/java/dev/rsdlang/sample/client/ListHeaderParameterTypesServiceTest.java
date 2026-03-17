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

import dev.rsdlang.sample.client.ListHeaderParameterTypesService.ListInlineEnumHeaderParam_HeaderValue_Param$;
import dev.rsdlang.sample.client.ListHeaderParameterTypesService.ListInlineEnumHeaderParam_Result$;
import dev.rsdlang.sample.client.ListHeaderParameterTypesService.ListInlineEnumHeaderParamNil_HeaderValue_Param$;
import dev.rsdlang.sample.client.ListHeaderParameterTypesService.ListInlineEnumHeaderParamOpt_HeaderValue_Param$;
import dev.rsdlang.sample.client.ListHeaderParameterTypesService.ListInlineEnumHeaderParamOptNil_HeaderValue_Param$;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.model.NilResult;
import dev.rsdlang.sample.client.model.SampleEnum;
import dev.rsdlang.sample.client.model.SimpleRecord;

public class ListHeaderParameterTypesServiceTest {

	private static final SpecSamplesClient JDK_CLIENT = JDKSpecSamplesClient.create(URI.create("http://localhost:3000"));

	static ListHeaderParameterTypesService[] serviceProvider() {
		return new ListHeaderParameterTypesService[] {
				JDK_CLIENT.service(ListHeaderParameterTypesService.class),
		};
	}

	// --- Boolean ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of(true, false, true), service.listBooleanHeaderParam(List.of(true, false, true)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listBooleanHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listBooleanHeaderParamOpt(List.of(true, false)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listBooleanHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listBooleanHeaderParamNil(List.of(true, false)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listBooleanHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listBooleanHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listBooleanHeaderParamOptNil(List.of(true, false)));
	}

	// --- Short ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of((short) 1, (short) 2, (short) 42),
				service.listShortHeaderParam(List.of((short) 1, (short) 2, (short) 42)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listShortHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listShortHeaderParamOpt(List.of((short) 1, (short) 42)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listShortHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listShortHeaderParamNil(List.of((short) 1, (short) 42)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listShortHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listShortHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listShortHeaderParamOptNil(List.of((short) 1, (short) 42)));
	}

	// --- Int ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of(1, 2, 123456), service.listIntHeaderParam(List.of(1, 2, 123456)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listIntHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listIntHeaderParamOpt(List.of(1, 123456)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listIntHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listIntHeaderParamNil(List.of(1, 123456)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listIntHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listIntHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listIntHeaderParamOptNil(List.of(1, 123456)));
	}

	// --- Long ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of(1L, 2L, 1234567890123L), service.listLongHeaderParam(List.of(1L, 2L, 1234567890123L)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLongHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLongHeaderParamOpt(List.of(1L, 1234567890123L)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLongHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLongHeaderParamNil(List.of(1L, 1234567890123L)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLongHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLongHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLongHeaderParamOptNil(List.of(1L, 1234567890123L)));
	}

	// --- Float ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of(1.1f, 2.2f, 123.45f), service.listFloatHeaderParam(List.of(1.1f, 2.2f, 123.45f)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listFloatHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listFloatHeaderParamOpt(List.of(1.1f, 123.45f)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listFloatHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listFloatHeaderParamNil(List.of(1.1f, 123.45f)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listFloatHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listFloatHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listFloatHeaderParamOptNil(List.of(1.1f, 123.45f)));
	}

	// --- Double ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of(1.1, 2.2, 123.456789), service.listDoubleHeaderParam(List.of(1.1, 2.2, 123.456789)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listDoubleHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listDoubleHeaderParamOpt(List.of(1.1, 123.456789)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listDoubleHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listDoubleHeaderParamNil(List.of(1.1, 123.456789)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listDoubleHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listDoubleHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listDoubleHeaderParamOptNil(List.of(1.1, 123.456789)));
	}

	// --- String ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of("hello", "world"), service.listStringHeaderParam(List.of("hello", "world")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listStringHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listStringHeaderParamOpt(List.of("hello", "world")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listStringHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listStringHeaderParamNil(List.of("hello", "world")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listStringHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listStringHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listStringHeaderParamOptNil(List.of("hello", "world")));
	}

	// --- LocalDate ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParam(ListHeaderParameterTypesService service) {
		var dates = List.of(LocalDate.parse("2020-01-01"), LocalDate.parse("2021-06-15"));
		assertEquals(dates, service.listLocalDateHeaderParam(dates));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalDateHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLocalDateHeaderParamOpt(List.of(LocalDate.parse("2020-01-01"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalDateHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLocalDateHeaderParamNil(List.of(LocalDate.parse("2020-01-01"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalDateHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalDateHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLocalDateHeaderParamOptNil(List.of(LocalDate.parse("2020-01-01"))));
	}

	// --- LocalDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParam(ListHeaderParameterTypesService service) {
		var dateTimes = List.of(LocalDateTime.parse("2020-01-01T10:00"), LocalDateTime.parse("2021-06-15T12:30"));
		assertEquals(dateTimes, service.listLocalDateTimeHeaderParam(dateTimes));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalDateTimeHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listLocalDateTimeHeaderParamOpt(List.of(LocalDateTime.parse("2020-01-01T10:00"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalDateTimeHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listLocalDateTimeHeaderParamNil(List.of(LocalDateTime.parse("2020-01-01T10:00"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalDateTimeHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalDateTimeHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listLocalDateTimeHeaderParamOptNil(List.of(LocalDateTime.parse("2020-01-01T10:00"))));
	}

	// --- ZonedDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParam(ListHeaderParameterTypesService service) {
		var zdts = List.of(ZonedDateTime.parse("2025-01-01T10:00:00Z"), ZonedDateTime.parse("2025-06-15T12:00:00Z"));
		assertEquals(zdts, service.listZonedDateTimeHeaderParam(zdts));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listZonedDateTimeHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listZonedDateTimeHeaderParamOpt(List.of(ZonedDateTime.parse("2025-01-01T10:00:00Z"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listZonedDateTimeHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listZonedDateTimeHeaderParamNil(List.of(ZonedDateTime.parse("2025-01-01T10:00:00Z"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listZonedDateTimeHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listZonedDateTimeHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listZonedDateTimeHeaderParamOptNil(List.of(ZonedDateTime.parse("2025-01-01T10:00:00Z"))));
	}

	// --- Scalar (ZoneId) ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParam(ListHeaderParameterTypesService service) {
		var zoneIds = List.of(ZoneId.of("Europe/Vienna"), ZoneId.of("UTC"));
		assertEquals(zoneIds, service.listScalarHeaderParam(zoneIds));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listScalarHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listScalarHeaderParamOpt(List.of(ZoneId.of("Europe/Vienna"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listScalarHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listScalarHeaderParamNil(List.of(ZoneId.of("Europe/Vienna"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listScalarHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listScalarHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listScalarHeaderParamOptNil(List.of(ZoneId.of("Europe/Vienna"))));
	}

	// --- Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of(SampleEnum.A, SampleEnum.B), service.listEnumHeaderParam(List.of(SampleEnum.A, SampleEnum.B)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listEnumHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listEnumHeaderParamOpt(List.of(SampleEnum.A)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listEnumHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listEnumHeaderParamNil(List.of(SampleEnum.B)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listEnumHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listEnumHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listEnumHeaderParamOptNil(List.of(SampleEnum.A)));
	}

	// --- Inline Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of(ListInlineEnumHeaderParam_Result$.A),
				service.listInlineEnumHeaderParam(List.of(ListInlineEnumHeaderParam_HeaderValue_Param$.A)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listInlineEnumHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listInlineEnumHeaderParamOpt(List.of(ListInlineEnumHeaderParamOpt_HeaderValue_Param$.A)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listInlineEnumHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listInlineEnumHeaderParamNil(List.of(ListInlineEnumHeaderParamNil_HeaderValue_Param$.C)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listInlineEnumHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listInlineEnumHeaderParamOptNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listInlineEnumHeaderParamOptNil(List.of(ListInlineEnumHeaderParamOptNil_HeaderValue_Param$.D)));
	}

	// --- Multi List Header Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParam(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals("hello-42-k", service.listMultiHeaderParam(List.of("hello"), List.of(42), List.of(record)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOpt_allUndefined(ListHeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.UNDEFINED, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.listMultiHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOpt_valueAOnly(ListHeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.DEFINED, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.listMultiHeaderParamOpt(List.of("hello")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOpt_valueAAndB(ListHeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.UNDEFINED),
				service.listMultiHeaderParamOpt(List.of("hello"), List.of(42)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOpt_allDefined(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.DEFINED),
				service.listMultiHeaderParamOpt(List.of("hello"), List.of(42), List.of(record)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamNil_allDefined(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.DEFINED),
				service.listMultiHeaderParamNil(List.of("hello"), List.of(42), List.of(record)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamNil_allNull(ListHeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.NULL, NilResult.NULL, NilResult.NULL),
				service.listMultiHeaderParamNil(null, null, null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOptNil_allUndefined(ListHeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.UNDEFINED, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.listMultiHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOptNil_valueANull(ListHeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.NULL, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.listMultiHeaderParamOptNil((List<String>) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOptNil_valueAAndBNull(ListHeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.NULL, NilResult.NULL, NilResult.UNDEFINED),
				service.listMultiHeaderParamOptNil((List<String>) null, (List<Integer>) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOptNil_allDefined(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.DEFINED),
				service.listMultiHeaderParamOptNil(List.of("hello"), List.of(42), List.of(record)));
	}

	// --- Record List Header Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParam(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.listRecordHeaderParam(List.of(record));
		assertEquals(1, result.size());
		assertEquals("k", result.get(0).key());
		assertEquals("1", result.get(0).version());
		assertEquals("v", result.get(0).value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listRecordHeaderParamOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.listRecordHeaderParamOpt(List.of(record)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listRecordHeaderParamNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.listRecordHeaderParamNil(List.of(record)));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listRecordHeaderParamOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listRecordHeaderParamOptNil((List<SimpleRecord.Data>) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.listRecordHeaderParamOptNil(List.of(record)));
	}

}
