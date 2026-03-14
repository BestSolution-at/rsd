package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.model.SampleEnum;

public class PathParameterTypeServiceServiceTest {

	private static final SpecSamplesClient CLIENT = JDKSpecSamplesClient.create(URI.create("http://localhost:3000"));

	static PathParameterTypeServiceService[] serviceProvider() {
		return new PathParameterTypeServiceService[] {
				CLIENT.service(PathParameterTypeServiceService.class),
		};
	}

	// --- Boolean ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanPathParam(PathParameterTypeServiceService service) {
		assertEquals(true, service.simpleBooleanPathParam(true));
		assertEquals(false, service.simpleBooleanPathParam(false));
	}

	// --- Short ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortPathParam(PathParameterTypeServiceService service) {
		assertEquals((short) 42, service.simpleShortPathParam((short) 42));
	}

	// --- Int ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntPathParam(PathParameterTypeServiceService service) {
		assertEquals(123456, service.simpleIntPathParam(123456));
	}

	// --- Long ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongPathParam(PathParameterTypeServiceService service) {
		assertEquals(1234567890123L, service.simpleLongPathParam(1234567890123L));
	}

	// --- Float ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatPathParam(PathParameterTypeServiceService service) {
		assertEquals(123.45f, service.simpleFloatPathParam(123.45f));
	}

	// --- Double ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoublePathParam(PathParameterTypeServiceService service) {
		assertEquals(123.456789, service.simpleDoublePathParam(123.456789));
	}

	// --- String ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringPathParam(PathParameterTypeServiceService service) {
		assertEquals("hello world", service.simpleStringPathParam("hello world"));
		assertEquals("a Ā 𐀀 文 🦄", service.simpleStringPathParam("a Ā 𐀀 文 🦄"));
	}

	// --- LocalDate ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDatePathParam(PathParameterTypeServiceService service) {
		var date = LocalDate.parse("2020-01-01");
		assertEquals(date, service.simpleLocalDatePathParam(date));
	}

	// --- LocalDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimePathParam(PathParameterTypeServiceService service) {
		var dt = LocalDateTime.parse("2020-01-01T10:00");
		assertEquals(dt, service.simpleLocalDateTimePathParam(dt));
	}

	// --- ZonedDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimePathParam(PathParameterTypeServiceService service) {
		var zdt = ZonedDateTime.parse("2025-01-01T10:00:00Z");
		assertEquals(zdt, service.simpleZonedDateTimePathParam(zdt));
	}

	// --- Scalar (ZoneId) ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarPathParam(PathParameterTypeServiceService service) {
		var zoneId = ZoneId.of("Europe/Vienna");
		assertEquals(zoneId, service.simpleScalarPathParam(zoneId));
	}

	// --- Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumPathParam(PathParameterTypeServiceService service) {
		assertEquals(SampleEnum.A, service.simpleEnumPathParam(SampleEnum.A));
		assertEquals(SampleEnum.B, service.simpleEnumPathParam(SampleEnum.B));
	}

	// --- Multi Path Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiPathParam(PathParameterTypeServiceService service) {
		assertEquals("hello-42", service.multiPathParam("hello", 42));
	}

}
