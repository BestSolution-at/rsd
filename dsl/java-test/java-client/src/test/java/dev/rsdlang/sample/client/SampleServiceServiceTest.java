package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

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

import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient.ContentTypeEncoding;
import dev.rsdlang.sample.client.model.SampleEnum;
import dev.rsdlang.sample.client.model.ZoneId;

public class SampleServiceServiceTest {
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

	static SampleServiceService[] serviceProvider() {
		return new SampleServiceService[] {
				JSON.service(SampleServiceService.class),
				MSGPACK.service(SampleServiceService.class),
		};
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getBoolean(SampleServiceService service) {
		boolean result = service.getBoolean().orThrow();
		assertTrue(result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getShort(SampleServiceService service) {
		short result = service.getShort().orThrow();
		assertEquals(123, result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getInt(SampleServiceService service) {
		int result = service.getInt().orThrow();
		assertEquals(123456, result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getLong(SampleServiceService service) {
		long result = service.getLong().orThrow();
		assertEquals(1234567890123L, result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getFloat(SampleServiceService service) {
		float result = service.getFloat().orThrow();
		assertEquals(123.45f, result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getDouble(SampleServiceService service) {
		double result = service.getDouble().orThrow();
		assertEquals(123.456789, result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getString(SampleServiceService service) {
		String result = service.getString().orThrow();
		assertEquals("sample string", result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getLocalDate(SampleServiceService service) {
		var result = service.getLocalDate().orThrow();
		assertEquals(LocalDate.parse("2020-01-01"), result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getLocalDateTime(SampleServiceService service) {
		var result = service.getLocalDateTime().orThrow();
		assertEquals(LocalDateTime.parse("2020-01-01T10:00"), result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getLocalTime(SampleServiceService service) {
		var result = service.getLocalTime().orThrow();
		assertEquals(LocalTime.parse("10:00:00"), result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getOffsetDateTime(SampleServiceService service) {
		var result = service.getOffsetDateTime().orThrow();
		assertEquals(OffsetDateTime.parse("2025-01-01T10:00:00+01:00"), result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getZonedDateTime(SampleServiceService service) {
		var result = service.getZonedDateTime().orThrow();
		assertEquals(ZonedDateTime.parse("2025-01-01T10:00:00Z"), result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getScalar(SampleServiceService service) {
		var result = service.getScalar().orThrow();
		assertEquals(ZoneId.of("Europe/Vienna"), result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getEnum(SampleServiceService service) {
		var result = service.getEnum().orThrow();
		assertEquals(SampleEnum.A, result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void voidOperation(SampleServiceService service) {
		service.voidOperation();
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void errorOperation(SampleServiceService service) {
		var result = service.errorOperation();
		switch (result) {
			case Result.OK(var value) -> fail("Expected SampleErrorException to be thrown");
			case Result.ERR(SampleError error) ->
				assertEquals("This is a sample error from the server", error.message());
			default -> fail("Unexpected result type: " + result.getClass().getName());
		}

	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiErrorOperation(SampleServiceService service) {
		var result = service.multiErrorOperation();
		switch (result) {
			case Result.OK(var value) -> fail("Expected SampleErrorException to be thrown");
			case Result.ERR(SampleError error) ->
				assertEquals("This is a sample error from the server", error.message());
			default -> fail("Unexpected result type: " + result.getClass().getName());
		}

		// FIXME Need to test error2
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleRecord(SampleServiceService service) {
		var result = service.getSimpleRecord("123").orThrow();
		assertEquals("123", result.key());
		assertEquals("1", result.version());
		assertEquals("Sample Name", result.value());
		// FIXME Test invalid data
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleRecordWithError(SampleServiceService service) {
		var result = service.getSimpleRecordWithError("123");
		switch (result) {
			case Result.OK(var value) -> fail("Expected SampleErrorException to be thrown");
			case Result.ERR(SampleError error) ->
				assertEquals("This is a sample error from the server", error.message());
			default -> fail("Unexpected result type: " + result.getClass().getName());
		}
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleErrorWithValue(SampleServiceService service) {
		var result = service.getSimpleErrorWithValue();
		switch (result) {
			case Result.OK(var value) -> fail("Expected SampleErrorWithValueException to be thrown");
			case Result.ERR(SampleErrorWithValue error) -> {
				assertEquals("This is a sample error with value from the server", error.message());
				assertEquals("An error message", error.data().message());
			}
			default -> fail("Unexpected result type: " + result.getClass().getName());
		}

	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleErrorInt(SampleServiceService service) {
		var result = service.getSimpleErrorInt();
		switch (result) {
			case Result.OK(var value) -> fail("Expected SampleErrorIntException to be thrown");
			case Result.ERR(SampleErrorInt error) -> {
				assertEquals("This is a sample int error from the server", error.message());
				assertEquals(123, error.data());
			}
			default -> fail("Unexpected result type: " + result.getClass().getName());
		}
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleErrorBoolean(SampleServiceService service) {
		var result = service.getSimpleErrorBoolean();
		switch (result) {
			case Result.OK(var value) -> fail("Expected SampleErrorBooleanException to be thrown");
			case Result.ERR(SampleErrorBoolean error) -> {
				assertEquals("This is a sample boolean error from the server", error.message());
				assertTrue(error.data());
			}
			default -> fail("Unexpected result type: " + result.getClass().getName());
		}
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleErrorEnum(SampleServiceService service) {
		var result = service.getSimpleErrorEnum();
		switch (result) {
			case Result.OK(var value) -> fail("Expected SampleErrorEnumException to be thrown");
			case Result.ERR(SampleErrorEnum error) -> {
				assertEquals("This is a sample enum error from the server", error.message());
				assertEquals(SampleEnum.A, error.data());
			}
			default -> fail("Unexpected result type: " + result.getClass().getName());
		}
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleErrorScalar(SampleServiceService service) {
		var result = service.getSimpleErrorScalar();
		switch (result) {
			case Result.OK(var value) -> fail("Expected SampleErrorScalarException to be thrown");
			case Result.ERR(SampleErrorScalar error) -> {
				assertEquals("This is a sample scalar error from the server", error.message());
				assertEquals(ZoneId.of("America/New_York"), error.data());
			}
			default -> fail("Unexpected result type: " + result.getClass().getName());
		}
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleErrorUnion(SampleServiceService service) {
		var result = service.getSimpleErrorUnion();
		switch (result) {
			case Result.OK(var value) -> fail("Expected SampleErrorUnionException to be thrown");
			case Result.ERR(SampleErrorUnion error) -> {
				assertEquals("This is a sample union error from the server", error.message());
			}
			default -> fail("Unexpected result type: " + result.getClass().getName());
		}
	}
}
