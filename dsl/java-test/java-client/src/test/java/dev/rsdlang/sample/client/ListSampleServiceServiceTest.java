package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.OffsetDateTime;
import java.util.List;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.model.SampleEnum;

public class ListSampleServiceServiceTest {

	private static final SpecSamplesClient CLIENT = JDKSpecSamplesClient.create(URI.create("http://localhost:3000"));

	static ListSampleServiceService[] serviceProvider() {
		return new ListSampleServiceService[] {
				CLIENT.service(ListSampleServiceService.class),
		};
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listBoolean(ListSampleServiceService service) {
		assertEquals(List.of(true, false, true), service.listBoolean());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listShort(ListSampleServiceService service) {
		assertEquals(List.of((short) 123, (short) 456, (short) 789), service.listShort());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listInt(ListSampleServiceService service) {
		assertEquals(List.of(123456, 789012, 345678), service.listInt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLong(ListSampleServiceService service) {
		assertEquals(List.of(1234567890123L, 2345678901234L, 3456789012345L), service.listLong());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listFloat(ListSampleServiceService service) {
		assertEquals(List.of(12.34f, 56.78f, 90.12f), service.listFloat());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listDouble(ListSampleServiceService service) {
		assertEquals(List.of(12.3456789, 98.7654321, 54.3210987), service.listDouble());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listString(ListSampleServiceService service) {
		assertEquals(List.of("first", "second", "third"), service.listString());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDate(ListSampleServiceService service) {
		assertEquals(
				List.of(LocalDate.parse("2020-01-01"), LocalDate.parse("2021-02-02"), LocalDate.parse("2022-03-03")),
				service.listLocalDate());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalDateTime(ListSampleServiceService service) {
		assertEquals(
				List.of(LocalDateTime.parse("2020-01-01T10:00:00"), LocalDateTime.parse("2021-02-02T11:30:00"),
						LocalDateTime.parse("2022-03-03T12:45:00")),
				service.listLocalDateTime());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listLocalTime(ListSampleServiceService service) {
		assertEquals(
				List.of(LocalTime.parse("10:00:00"), LocalTime.parse("11:30:00"), LocalTime.parse("12:45:00")),
				service.listLocalTime());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listOffsetDateTime(ListSampleServiceService service) {
		assertEquals(
				List.of(OffsetDateTime.parse("2020-01-01T10:00:00+01:00"),
						OffsetDateTime.parse("2021-02-02T11:30:00+01:00"),
						OffsetDateTime.parse("2022-03-03T12:45:00+01:00")),
				service.listOffsetDateTime());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listZonedDateTime(ListSampleServiceService service) {
		assertEquals(
				List.of(ZonedDateTime.parse("2020-01-01T10:00:00Z"), ZonedDateTime.parse("2021-02-02T11:30:00Z"),
						ZonedDateTime.parse("2022-03-03T12:45:00Z")),
				service.listZonedDateTime());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listScalar(ListSampleServiceService service) {
		assertEquals(
				List.of(ZoneId.of("Europe/Vienna"), ZoneId.of("America/New_York"), ZoneId.of("Asia/Tokyo")),
				service.listScalar());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listEnum(ListSampleServiceService service) {
		assertEquals(List.of(SampleEnum.A, SampleEnum.B), service.listEnum());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listSimpleRecord(ListSampleServiceService service) {
		var result = service.listSimpleRecord();
		assertEquals(1, result.size());
		assertEquals("123", result.get(0).key());
		assertEquals("1", result.get(0).version());
		assertEquals("Sample Name", result.get(0).value());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void listSimpleRecordWithError(ListSampleServiceService service) {
		try {
			service.listSimpleRecordWithError();
			fail("Expected SampleErrorException to be thrown");
		} catch (SampleErrorException e) {
			assertEquals("My error", e.getMessage());
		}
	}

}
