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

import dev.rsdlang.sample.client.ListQueryParameterTypesService.ListInlineEnumQueryParam_QueryValue_Param$;
import dev.rsdlang.sample.client.ListQueryParameterTypesService.ListInlineEnumQueryParam_Result$;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.model.SampleEnum;
import dev.rsdlang.sample.client.model.SimpleRecord;

public class ListQueryParameterTypesServiceTest {

	private static final SpecSamplesClient CLIENT = JDKSpecSamplesClient.create(URI.create("http://localhost:3000"));

	static ListQueryParameterTypesService[] serviceProvider() {
		return new ListQueryParameterTypesService[] {
				CLIENT.service(ListQueryParameterTypesService.class),
		};
	}

	// --- Boolean ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBooleanQueryParam(ListQueryParameterTypesService service) {
		assertEquals(List.of(true, false, true), service.listBooleanQueryParam(List.of(true, false, true)));
	}

	// --- Short ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShortQueryParam(ListQueryParameterTypesService service) {
		assertEquals(List.of((short) 1, (short) 2, (short) 42),
				service.listShortQueryParam(List.of((short) 1, (short) 2, (short) 42)));
	}

	// --- Int ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listIntQueryParam(ListQueryParameterTypesService service) {
		assertEquals(List.of(1, 2, 123456), service.listIntQueryParam(List.of(1, 2, 123456)));
	}

	// --- Long ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLongQueryParam(ListQueryParameterTypesService service) {
		assertEquals(List.of(1L, 2L, 1234567890123L), service.listLongQueryParam(List.of(1L, 2L, 1234567890123L)));
	}

	// --- Float ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloatQueryParam(ListQueryParameterTypesService service) {
		assertEquals(List.of(1.1f, 2.2f, 123.45f), service.listFloatQueryParam(List.of(1.1f, 2.2f, 123.45f)));
	}

	// --- Double ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDoubleQueryParam(ListQueryParameterTypesService service) {
		assertEquals(List.of(1.1, 2.2, 123.456789), service.listDoubleQueryParam(List.of(1.1, 2.2, 123.456789)));
	}

	// --- String ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listStringQueryParam(ListQueryParameterTypesService service) {
		assertEquals(List.of("hello", "world"), service.listStringQueryParam(List.of("hello", "world")));
	}

	// --- LocalDate ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateQueryParam(ListQueryParameterTypesService service) {
		var dates = List.of(LocalDate.parse("2020-01-01"), LocalDate.parse("2021-06-15"));
		assertEquals(dates, service.listLocalDateQueryParam(dates));
	}

	// --- LocalDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTimeQueryParam(ListQueryParameterTypesService service) {
		var dateTimes = List.of(LocalDateTime.parse("2020-01-01T10:00"), LocalDateTime.parse("2021-06-15T12:30"));
		assertEquals(dateTimes, service.listLocalDateTimeQueryParam(dateTimes));
	}

	// --- ZonedDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTimeQueryParam(ListQueryParameterTypesService service) {
		var zdts = List.of(ZonedDateTime.parse("2025-01-01T10:00:00Z"), ZonedDateTime.parse("2025-06-15T12:00:00Z"));
		assertEquals(zdts, service.listZonedDateTimeQueryParam(zdts));
	}

	// --- Scalar (ZoneId) ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalarQueryParam(ListQueryParameterTypesService service) {
		var zoneIds = List.of(ZoneId.of("Europe/Vienna"), ZoneId.of("UTC"));
		assertEquals(zoneIds, service.listScalarQueryParam(zoneIds));
	}

	// --- Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnumQueryParam(ListQueryParameterTypesService service) {
		assertEquals(List.of(SampleEnum.A, SampleEnum.B), service.listEnumQueryParam(List.of(SampleEnum.A, SampleEnum.B)));
	}

	// --- Inline Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInlineEnumQueryParam(ListQueryParameterTypesService service) {
		assertEquals(List.of(ListInlineEnumQueryParam_Result$.A),
				service.listInlineEnumQueryParam(List.of(ListInlineEnumQueryParam_QueryValue_Param$.A)));
	}

	// --- Multi List Query Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listMultiQueryParam(ListQueryParameterTypesService service) {
		var record = CLIENT.builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		assertEquals("hello-42-k", service.listMultiQueryParam(List.of("hello"), List.of(42), List.of(record)));
	}

	// --- Record List Query Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listRecordQueryParam(ListQueryParameterTypesService service) {
		var record = CLIENT.builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.listRecordQueryParam(List.of(record));
		assertEquals(1, result.size());
		assertEquals("k", result.get(0).key());
		assertEquals("1", result.get(0).version());
		assertEquals("v", result.get(0).value());
	}

}
