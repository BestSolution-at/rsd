package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.time.OffsetDateTime;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient.ContentTypeEncoding;
import dev.rsdlang.sample.client.model.SampleEnum;
import dev.rsdlang.sample.client.model.ZoneId;

public class PathParameterTypeServiceServiceTest {

	private static SpecSamplesClient JSON;
	private static SpecSamplesClient MSGPACK;

	@BeforeAll
	static void setUp() {
		var baseBuilder = JDKSpecSamplesClient.builder().baseURI(URI.create("http://localhost:3000"));
		JSON = baseBuilder.build();
		MSGPACK = baseBuilder.contentTypeEncoding(ContentTypeEncoding.APPLICATION_VND_MSGPACK).build();
	}

	static PathParameterTypeServiceService[] serviceProvider() {
		return new PathParameterTypeServiceService[] {
				JSON.service(PathParameterTypeServiceService.class),
				MSGPACK.service(PathParameterTypeServiceService.class),
		};
	}

	// --- Boolean ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleBooleanPathParam(PathParameterTypeServiceService service) {
		assertEquals(true, service.simpleBooleanPathParam(true).orThrow());
		assertEquals(false, service.simpleBooleanPathParam(false).orThrow());
	}

	// --- Short ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleShortPathParam(PathParameterTypeServiceService service) {
		assertEquals((short) 42, service.simpleShortPathParam((short) 42).orThrow());
	}

	// --- Int ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleIntPathParam(PathParameterTypeServiceService service) {
		assertEquals(123456, service.simpleIntPathParam(123456).orThrow());
	}

	// --- Long ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLongPathParam(PathParameterTypeServiceService service) {
		assertEquals(1234567890123L, service.simpleLongPathParam(1234567890123L).orThrow());
	}

	// --- Float ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleFloatPathParam(PathParameterTypeServiceService service) {
		assertEquals(123.45f, service.simpleFloatPathParam(123.45f).orThrow());
	}

	// --- Double ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleDoublePathParam(PathParameterTypeServiceService service) {
		assertEquals(123.456789, service.simpleDoublePathParam(123.456789).orThrow());
	}

	// --- String ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleStringPathParam(PathParameterTypeServiceService service) {
		assertEquals("hello world", service.simpleStringPathParam("hello world").orThrow());
		assertEquals("a Ā 𐀀 文 🦄", service.simpleStringPathParam("a Ā 𐀀 文 🦄").orThrow());
	}

	// --- LocalDate ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDatePathParam(PathParameterTypeServiceService service) {
		var date = LocalDate.parse("2020-01-01");
		assertEquals(date, service.simpleLocalDatePathParam(date).orThrow());
	}

	// --- LocalDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalDateTimePathParam(PathParameterTypeServiceService service) {
		var dt = LocalDateTime.parse("2020-01-01T10:00");
		assertEquals(dt, service.simpleLocalDateTimePathParam(dt).orThrow());
	}

	// --- LocalTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleLocalTimePathParam(PathParameterTypeServiceService service) {
		var t = LocalTime.parse("10:00:00");
		assertEquals(t, service.simpleLocalTimePathParam(t).orThrow());
	}

	// --- OffsetDateTime ---
	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleOffsetDateTimePathParam(PathParameterTypeServiceService service) {
		var odt = OffsetDateTime.parse("2025-01-01T10:00:00+01:00");
		assertEquals(odt, service.simpleOffsetDateTimePathParam(odt).orThrow());
	}

	// --- ZonedDateTime ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleZonedDateTimePathParam(PathParameterTypeServiceService service) {
		var zdt = ZonedDateTime.parse("2025-01-01T10:00:00Z");
		assertEquals(zdt, service.simpleZonedDateTimePathParam(zdt).orThrow());
	}

	// --- Scalar (ZoneId) ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleScalarPathParam(PathParameterTypeServiceService service) {
		var zoneId = ZoneId.of("Europe/Vienna");
		assertEquals(zoneId, service.simpleScalarPathParam(zoneId).orThrow());
	}

	// --- Enum ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void simpleEnumPathParam(PathParameterTypeServiceService service) {
		assertEquals(SampleEnum.A, service.simpleEnumPathParam(SampleEnum.A).orThrow());
		assertEquals(SampleEnum.B, service.simpleEnumPathParam(SampleEnum.B).orThrow());
	}

	// --- Multi Path Param ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiPathParam(PathParameterTypeServiceService service) {
		assertEquals("hello-42", service.multiPathParam("hello", 42).orThrow());
	}

}
