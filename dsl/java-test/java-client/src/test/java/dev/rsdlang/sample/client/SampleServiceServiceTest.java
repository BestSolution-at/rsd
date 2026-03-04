package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.model.SampleEnum;

public class SampleServiceServiceTest {
	static SampleServiceService[] serviceProvider() {
		return new SampleServiceService[] {
				JDKSpecSamplesClient.create(URI.create("http://localhost:3000")).service(SampleServiceService.class),
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
	}
}
