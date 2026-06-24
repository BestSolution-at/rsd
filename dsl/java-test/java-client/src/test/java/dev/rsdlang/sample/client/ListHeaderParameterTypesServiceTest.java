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

import dev.rsdlang.sample.client.ListHeaderParameterTypesService.ListInlineEnumHeaderParam_HeaderValue_Param$;
import dev.rsdlang.sample.client.ListHeaderParameterTypesService.ListInlineEnumHeaderParam_Result$;
import dev.rsdlang.sample.client.ListHeaderParameterTypesService.ListInlineEnumHeaderParamNil_HeaderValue_Param$;
import dev.rsdlang.sample.client.ListHeaderParameterTypesService.ListInlineEnumHeaderParamOpt_HeaderValue_Param$;
import dev.rsdlang.sample.client.ListHeaderParameterTypesService.ListInlineEnumHeaderParamOptNil_HeaderValue_Param$;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient.ContentTypeEncoding;
import dev.rsdlang.sample.client.model.NilResult;
import dev.rsdlang.sample.client.model.SampleEnum;
import dev.rsdlang.sample.client.model.SimpleRecord;
import dev.rsdlang.sample.client.model.ZoneId;

public class ListHeaderParameterTypesServiceTest {
	private static SpecSamplesClient JSON;
	private static SpecSamplesClient MSGPACK;

	@BeforeAll
	static void setUp() {
		var baseBuilder = JDKSpecSamplesClient.builder().baseURI(URI.create("http://localhost:3000"));
		JSON = baseBuilder.build();
		MSGPACK = baseBuilder.contentTypeEncoding(ContentTypeEncoding.APPLICATION_VND_MSGPACK).build();
	}

	static ListHeaderParameterTypesService[] serviceProvider() {
		return new ListHeaderParameterTypesService[] {
				JSON.service(ListHeaderParameterTypesService.class),
				MSGPACK.service(ListHeaderParameterTypesService.class),
		};
	}

	// --- Boolean ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of(true, false, true), service.listBooleanHeaderParam(List.of(true, false, true)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listBooleanHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listBooleanHeaderParamOpt(List.of(true, false)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listBooleanHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listBooleanHeaderParamNil(List.of(true, false)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listBooleanHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listBooleanHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listBooleanHeaderParamOptNil(List.of(true, false)).orThrow());
	}

	// --- Short ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of((short) 1, (short) 2, (short) 42),
				service.listShortHeaderParam(List.of((short) 1, (short) 2, (short) 42)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listShortHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listShortHeaderParamOpt(List.of((short) 1, (short) 42)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listShortHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listShortHeaderParamNil(List.of((short) 1, (short) 42)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listShortHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listShortHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listShortHeaderParamOptNil(List.of((short) 1, (short) 42)).orThrow());
	}

	// --- Int ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of(1, 2, 123456), service.listIntHeaderParam(List.of(1, 2, 123456)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listIntHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listIntHeaderParamOpt(List.of(1, 123456)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listIntHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listIntHeaderParamNil(List.of(1, 123456)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listIntHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listIntHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listIntHeaderParamOptNil(List.of(1, 123456)).orThrow());
	}

	// --- Long ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of(1L, 2L, 1234567890123L),
				service.listLongHeaderParam(List.of(1L, 2L, 1234567890123L)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLongHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLongHeaderParamOpt(List.of(1L, 1234567890123L)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLongHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLongHeaderParamNil(List.of(1L, 1234567890123L)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLongHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLongHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listLongHeaderParamOptNil(List.of(1L, 1234567890123L)).orThrow());
	}

	// --- Float ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of(1.1f, 2.2f, 123.45f),
				service.listFloatHeaderParam(List.of(1.1f, 2.2f, 123.45f)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listFloatHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listFloatHeaderParamOpt(List.of(1.1f, 123.45f)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listFloatHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listFloatHeaderParamNil(List.of(1.1f, 123.45f)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listFloatHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listFloatHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listFloatHeaderParamOptNil(List.of(1.1f, 123.45f)).orThrow());
	}

	// --- Double ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of(1.1, 2.2, 123.456789),
				service.listDoubleHeaderParam(List.of(1.1, 2.2, 123.456789)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listDoubleHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listDoubleHeaderParamOpt(List.of(1.1, 123.456789)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listDoubleHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listDoubleHeaderParamNil(List.of(1.1, 123.456789)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listDoubleHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listDoubleHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listDoubleHeaderParamOptNil(List.of(1.1, 123.456789)).orThrow());
	}

	// --- String ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of("hello", "world"), service.listStringHeaderParam(List.of("hello", "world")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listStringHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listStringHeaderParamOpt(List.of("hello", "world")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listStringHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listStringHeaderParamNil(List.of("hello", "world")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listStringHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listStringHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listStringHeaderParamOptNil(List.of("hello", "world")).orThrow());
	}

	// --- LocalDate ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParam(ListHeaderParameterTypesService service) {
		var dates = List.of(LocalDate.parse("2020-01-01"), LocalDate.parse("2021-06-15"));
		assertEquals(dates, service.listLocalDateHeaderParam(dates).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalDateHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listLocalDateHeaderParamOpt(List.of(LocalDate.parse("2020-01-01"))).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalDateHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listLocalDateHeaderParamNil(List.of(LocalDate.parse("2020-01-01"))).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalDateHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalDateHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listLocalDateHeaderParamOptNil(List.of(LocalDate.parse("2020-01-01"))).orThrow());
	}

	// --- LocalDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParam(ListHeaderParameterTypesService service) {
		var dateTimes = List.of(LocalDateTime.parse("2020-01-01T10:00"), LocalDateTime.parse("2021-06-15T12:30"));
		assertEquals(dateTimes, service.listLocalDateTimeHeaderParam(dateTimes).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalDateTimeHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listLocalDateTimeHeaderParamOpt(List.of(LocalDateTime.parse("2020-01-01T10:00"))).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalDateTimeHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listLocalDateTimeHeaderParamNil(List.of(LocalDateTime.parse("2020-01-01T10:00"))).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalDateTimeHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalDateTimeHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listLocalDateTimeHeaderParamOptNil(List.of(LocalDateTime.parse("2020-01-01T10:00"))).orThrow());
	}

	// --- LocalTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeHeaderParam(ListHeaderParameterTypesService service) {
		var times = List.of(LocalTime.parse("10:00:00"), LocalTime.parse("11:30:00"));
		assertEquals(times, service.listLocalTimeHeaderParam(times).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalTimeHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listLocalTimeHeaderParamOpt(List.of(LocalTime.parse("10:00:00"))).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalTimeHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listLocalTimeHeaderParamNil(List.of(LocalTime.parse("10:00:00"))).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listLocalTimeHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listLocalTimeHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTimeHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listLocalTimeHeaderParamOptNil(List.of(LocalTime.parse("10:00:00"))).orThrow());
	}

	// --- OffsetDateTime ---
	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listOffsetDateTimeHeaderParam(ListHeaderParameterTypesService service) {
		var times = List.of(OffsetDateTime.parse("2025-01-01T10:00:00+01:00"),
				OffsetDateTime.parse("2021-02-02T11:30:00+01:00"));
		assertEquals(times, service.listOffsetDateTimeHeaderParam(times).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listOffsetDateTimeHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listOffsetDateTimeHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listOffsetDateTimeHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listOffsetDateTimeHeaderParamOpt(List.of(OffsetDateTime.parse("2025-01-01T10:00:00+01:00")))
						.orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listOffsetDateTimeHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listOffsetDateTimeHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listOffsetDateTimeHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listOffsetDateTimeHeaderParamNil(List.of(OffsetDateTime.parse("2025-01-01T10:00:00+01:00")))
						.orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listOffsetDateTimeHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listOffsetDateTimeHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listOffsetDateTimeHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listOffsetDateTimeHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listOffsetDateTimeHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service
				.listOffsetDateTimeHeaderParamOptNil(List.of(OffsetDateTime.parse("2025-01-01T10:00:00+01:00")))
				.orThrow());
	}

	// --- ZonedDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParam(ListHeaderParameterTypesService service) {
		var zdts = List.of(ZonedDateTime.parse("2025-01-01T10:00:00Z"), ZonedDateTime.parse("2025-06-15T12:00:00Z"));
		assertEquals(zdts, service.listZonedDateTimeHeaderParam(zdts).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listZonedDateTimeHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listZonedDateTimeHeaderParamOpt(List.of(ZonedDateTime.parse("2025-01-01T10:00:00Z")))
						.orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listZonedDateTimeHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listZonedDateTimeHeaderParamNil(List.of(ZonedDateTime.parse("2025-01-01T10:00:00Z")))
						.orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listZonedDateTimeHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listZonedDateTimeHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listZonedDateTimeHeaderParamOptNil(List.of(ZonedDateTime.parse("2025-01-01T10:00:00Z")))
						.orThrow());
	}

	// --- Scalar (ZoneId) ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParam(ListHeaderParameterTypesService service) {
		var zoneIds = List.of(ZoneId.of("Europe/Vienna"), ZoneId.of("UTC"));
		assertEquals(zoneIds, service.listScalarHeaderParam(zoneIds).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listScalarHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listScalarHeaderParamOpt(List.of(ZoneId.of("Europe/Vienna"))).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listScalarHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listScalarHeaderParamNil(List.of(ZoneId.of("Europe/Vienna"))).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listScalarHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listScalarHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listScalarHeaderParamOptNil(List.of(ZoneId.of("Europe/Vienna"))).orThrow());
	}

	// --- Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of(SampleEnum.A, SampleEnum.B),
				service.listEnumHeaderParam(List.of(SampleEnum.A, SampleEnum.B)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listEnumHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listEnumHeaderParamOpt(List.of(SampleEnum.A)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listEnumHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listEnumHeaderParamNil(List.of(SampleEnum.B)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listEnumHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listEnumHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED, service.listEnumHeaderParamOptNil(List.of(SampleEnum.A)).orThrow());
	}

	// --- Inline Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParam(ListHeaderParameterTypesService service) {
		assertEquals(List.of(ListInlineEnumHeaderParam_Result$.A),
				service.listInlineEnumHeaderParam(List.of(ListInlineEnumHeaderParam_HeaderValue_Param$.A)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listInlineEnumHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listInlineEnumHeaderParamOpt(List.of(ListInlineEnumHeaderParamOpt_HeaderValue_Param$.A))
						.orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listInlineEnumHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listInlineEnumHeaderParamNil(List.of(ListInlineEnumHeaderParamNil_HeaderValue_Param$.C))
						.orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listInlineEnumHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listInlineEnumHeaderParamOptNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.DEFINED,
				service.listInlineEnumHeaderParamOptNil(List.of(ListInlineEnumHeaderParamOptNil_HeaderValue_Param$.D))
						.orThrow());
	}

	// --- Multi List Header Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParam(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals("hello-42-k",
				service.listMultiHeaderParam(List.of("hello"), List.of(42), List.of(record)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOpt_allUndefined(ListHeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.UNDEFINED, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.listMultiHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOpt_valueAOnly(ListHeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.DEFINED, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.listMultiHeaderParamOpt(List.of("hello")).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOpt_valueAAndB(ListHeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.UNDEFINED),
				service.listMultiHeaderParamOpt(List.of("hello"), List.of(42)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOpt_allDefined(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.DEFINED),
				service.listMultiHeaderParamOpt(List.of("hello"), List.of(42), List.of(record)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamNil_allDefined(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.DEFINED),
				service.listMultiHeaderParamNil(List.of("hello"), List.of(42), List.of(record)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamNil_allNull(ListHeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.NULL, NilResult.NULL, NilResult.NULL),
				service.listMultiHeaderParamNil(null, null, null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOptNil_allUndefined(ListHeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.UNDEFINED, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.listMultiHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOptNil_valueANull(ListHeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.NULL, NilResult.UNDEFINED, NilResult.UNDEFINED),
				service.listMultiHeaderParamOptNil((List<String>) null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOptNil_valueAAndBNull(ListHeaderParameterTypesService service) {
		assertEquals(List.of(NilResult.NULL, NilResult.NULL, NilResult.UNDEFINED),
				service.listMultiHeaderParamOptNil((List<String>) null, (List<Integer>) null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiHeaderParamOptNil_allDefined(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(List.of(NilResult.DEFINED, NilResult.DEFINED, NilResult.DEFINED),
				service.listMultiHeaderParamOptNil(List.of("hello"), List.of(42), List.of(record)).orThrow());
	}

	// --- Record List Header Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParam(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.listRecordHeaderParam(List.of(record)).orThrow();
		assertEquals(1, result.size());
		assertEquals("k", result.get(0).key());
		assertEquals("1", result.get(0).version());
		assertEquals("v", result.get(0).value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParamOpt_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listRecordHeaderParamOpt().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParamOpt_defined(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.listRecordHeaderParamOpt(List.of(record)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParamNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listRecordHeaderParamNil(null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParamNil_defined(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.listRecordHeaderParamNil(List.of(record)).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParamOptNil_undefined(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.UNDEFINED, service.listRecordHeaderParamOptNil().orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParamOptNil_null(ListHeaderParameterTypesService service) {
		assertEquals(NilResult.NULL, service.listRecordHeaderParamOptNil((List<SimpleRecord.Data>) null).orThrow());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordHeaderParamOptNil_defined(ListHeaderParameterTypesService service) {
		var record = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals(NilResult.DEFINED, service.listRecordHeaderParamOptNil(List.of(record)).orThrow());
	}

}
