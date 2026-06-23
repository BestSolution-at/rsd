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

	static SampleServiceService[] serviceProvider() {
		return new SampleServiceService[] {
				JSON.service(SampleServiceService.class),
				MSGPACK.service(SampleServiceService.class),
		};
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getBoolean(SampleServiceService service) {
		boolean result = service.getBoolean();
		assertTrue(result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getShort(SampleServiceService service) {
		short result = service.getShort();
		assertEquals(123, result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getInt(SampleServiceService service) {
		int result = service.getInt();
		assertEquals(123456, result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getLong(SampleServiceService service) {
		long result = service.getLong();
		assertEquals(1234567890123L, result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getFloat(SampleServiceService service) {
		float result = service.getFloat();
		assertEquals(123.45f, result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getDouble(SampleServiceService service) {
		double result = service.getDouble();
		assertEquals(123.456789, result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getString(SampleServiceService service) {
		String result = service.getString();
		assertEquals("sample string", result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getLocalDate(SampleServiceService service) {
		var result = service.getLocalDate();
		assertEquals(LocalDate.parse("2020-01-01"), result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getLocalDateTime(SampleServiceService service) {
		var result = service.getLocalDateTime();
		assertEquals(LocalDateTime.parse("2020-01-01T10:00"), result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getLocalTime(SampleServiceService service) {
		var result = service.getLocalTime();
		assertEquals(LocalTime.parse("10:00:00"), result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getOffsetDateTime(SampleServiceService service) {
		var result = service.getOffsetDateTime();
		assertEquals(OffsetDateTime.parse("2025-01-01T10:00:00+01:00"), result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getZonedDateTime(SampleServiceService service) {
		var result = service.getZonedDateTime();
		assertEquals(ZonedDateTime.parse("2025-01-01T10:00:00Z"), result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getScalar(SampleServiceService service) {
		var result = service.getScalar();
		assertEquals(ZoneId.of("Europe/Vienna"), result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getEnum(SampleServiceService service) {
		var result = service.getEnum();
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
		try {
			service.errorOperation();
		} catch (SampleErrorException e) {
			assertEquals("This is a sample error from the server", e.getMessage());
		}
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void multiErrorOperation(SampleServiceService service) {
		try {
			service.multiErrorOperation();
			fail("Expected SampleErrorException to be thrown");
		} catch (SampleErrorException e) {
			assertEquals("This is a sample error from the server", e.getMessage());
		}
		// FIXME Need to test error2
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleRecord(SampleServiceService service) {
		var result = service.getSimpleRecord("123");
		assertEquals("123", result.key());
		assertEquals("1", result.version());
		assertEquals("Sample Name", result.value());
		// FIXME Test invalid data
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleRecordWithError(SampleServiceService service) {
		try {
			service.getSimpleRecordWithError("123");
			fail("Expected SampleErrorException to be thrown");
		} catch (SampleErrorException e) {
			assertEquals("This is a sample error from the server", e.getMessage());
		}
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleErrorWithValue(SampleServiceService service) {
		try {
			service.getSimpleErrorWithValue();
			fail("Expected SampleErrorWithValueException to be thrown");
		} catch (SampleErrorWithValueException e) {
			assertEquals("This is a sample error with value from the server", e.getMessage());
			assertEquals("An error message", e.data().message());
		}
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleErrorInt(SampleServiceService service) {
		try {
			service.getSimpleErrorInt();
			fail("Expected SampleErrorIntException to be thrown");
		} catch (SampleErrorIntException e) {
			assertEquals("This is a sample int error from the server", e.getMessage());
			assertEquals(123, e.data());
		}
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleErrorBoolean(SampleServiceService service) {
		try {
			service.getSimpleErrorBoolean();
			fail("Expected SampleErrorBooleanException to be thrown");
		} catch (SampleErrorBooleanException e) {
			assertEquals("This is a sample boolean error from the server", e.getMessage());
			assertTrue(e.data());
		}
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleErrorEnum(SampleServiceService service) {
		try {
			service.getSimpleErrorEnum();
			fail("Expected SampleErrorEnumException to be thrown");
		} catch (SampleErrorEnumException e) {
			assertEquals("This is a sample enum error from the server", e.getMessage());
			assertEquals(SampleEnum.A, e.data());
		}
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleErrorScalar(SampleServiceService service) {
		try {
			service.getSimpleErrorScalar();
			fail("Expected SampleErrorScalarException to be thrown");
		} catch (SampleErrorScalarException e) {
			assertEquals("This is a sample scalar error from the server", e.getMessage());
			assertEquals(ZoneId.of("America/New_York"), e.data());
		}
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void getSimpleErrorUnion(SampleServiceService service) {
		try {
			service.getSimpleErrorUnion();
			fail("Expected SampleErrorUnionException to be thrown");
		} catch (SampleErrorUnionException e) {
			assertEquals("This is a sample union error from the server", e.getMessage());
		}
	}
}
