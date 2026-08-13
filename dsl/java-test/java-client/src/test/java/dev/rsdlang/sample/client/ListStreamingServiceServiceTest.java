package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;
import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.ListStreamingServiceService.StreamInlineEnum_Result$;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient.ContentTypeEncoding;
import dev.rsdlang.sample.client.model.SampleEnum;
import dev.rsdlang.sample.client.model.UnionA;
import dev.rsdlang.sample.client.model.UnionB;

public class ListStreamingServiceServiceTest {
	private static SpecSamplesClient JSON;
	private static SpecSamplesClient MSGPACK;

	@BeforeAll
	static void setUp() {
		var baseBuilder = JDKSpecSamplesClient.builder().baseURI(URI.create("http://localhost:3000"));
		JSON = baseBuilder.build();
		MSGPACK = baseBuilder.contentTypeEncoding(ContentTypeEncoding.APPLICATION_VND_MSGPACK).build();
	}

	static ListStreamingServiceService[] serviceProvider() {
		return new ListStreamingServiceService[] {
				JSON.service(ListStreamingServiceService.class),
				MSGPACK.service(ListStreamingServiceService.class),
		};
	}

	record StreamResult<T, E>(List<T> value, List<E> error) {
	}

	private static <T, E extends RSDError> StreamResult<T, E> runStream(Consumer<StreamConsumer<T, E>> streamFunction) {
		List<T> values = new CopyOnWriteArrayList<>();
		List<E> errors = new CopyOnWriteArrayList<>();
		CountDownLatch latch = new CountDownLatch(1);
		streamFunction.accept((value, error, done) -> {
			if (done) {
				latch.countDown();
				return;
			}
			if (error != null) {
				errors.add(error);
			} else {
				values.add(value);
			}
		});
		try {
			latch.await(5, TimeUnit.SECONDS);
		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
		}

		return new StreamResult<>(values, errors);

	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamBoolean(ListStreamingServiceService service) {
		var result = runStream(service::streamBoolean);
		assertEquals(0, result.error().size());
		assertEquals(2, result.value().size());
		assertTrue(result.value().get(0));
		assertFalse(result.value().get(1));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamShort(ListStreamingServiceService service) {
		var result = runStream(service::streamShort);
		assertEquals(0, result.error().size());
		assertEquals(2, result.value().size());
		assertEquals(Short.MIN_VALUE, result.value().get(0));
		assertEquals(Short.MAX_VALUE, result.value().get(1));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamInt(ListStreamingServiceService service) {
		var result = runStream(service::streamInt);
		assertEquals(0, result.error().size());
		assertEquals(2, result.value().size());
		assertEquals(Integer.MIN_VALUE, result.value().get(0));
		assertEquals(Integer.MAX_VALUE, result.value().get(1));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamLong(ListStreamingServiceService service) {
		var result = runStream(service::streamLong);
		assertEquals(0, result.error().size());
		assertEquals(2, result.value().size());
		assertEquals(Long.MIN_VALUE, result.value().get(0));
		assertEquals(Long.MAX_VALUE, result.value().get(1));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamFloat(ListStreamingServiceService service) {
		var result = runStream(service::streamFloat);
		assertEquals(0, result.error().size());
		assertEquals(2, result.value().size());
		assertEquals(Float.MIN_VALUE, result.value().get(0));
		assertEquals(Float.MAX_VALUE, result.value().get(1));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamDouble(ListStreamingServiceService service) {
		var result = runStream(service::streamDouble);
		assertEquals(0, result.error().size());
		assertEquals(2, result.value().size());
		assertEquals(Double.MIN_VALUE, result.value().get(0));
		assertEquals(Double.MAX_VALUE, result.value().get(1));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamString(ListStreamingServiceService service) {
		var result = runStream(service::streamString);
		assertEquals(0, result.error().size());
		assertEquals(8, result.value().size());
		assertEquals("Hello", result.value().get(0));
		assertEquals("World", result.value().get(1));
		assertEquals("This", result.value().get(2));
		assertEquals("is", result.value().get(3));
		assertEquals("a", result.value().get(4));
		assertEquals("stream", result.value().get(5));
		assertEquals("of", result.value().get(6));
		assertEquals("strings", result.value().get(7));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamLocalDate(ListStreamingServiceService service) {
		var result = runStream(service::streamLocalDate);
		assertEquals(0, result.error().size());
		assertEquals(2, result.value().size());
		assertEquals(LocalDate.parse("2020-01-01"), result.value().get(0));
		assertEquals(LocalDate.parse("1970-01-01"), result.value().get(1));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamLocalDateTime(ListStreamingServiceService service) {
		var result = runStream(service::streamLocalDateTime);
		assertEquals(0, result.error().size());
		assertEquals(2, result.value().size());
		assertEquals(LocalDateTime.parse("2020-01-01T00:00:00"), result.value().get(0));
		assertEquals(LocalDateTime.parse("1970-01-01T00:00:00"), result.value().get(1));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamLocalTime(ListStreamingServiceService service) {
		var result = runStream(service::streamLocalTime);
		assertEquals(0, result.error().size());
		assertEquals(2, result.value().size());
		assertEquals(LocalTime.parse("12:00"), result.value().get(0));
		assertEquals(LocalTime.parse("23:59"), result.value().get(1));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamOffsetDateTime(ListStreamingServiceService service) {
		var result = runStream(service::streamOffsetDateTime);
		assertEquals(0, result.error().size());
		assertEquals(2, result.value().size());
		assertEquals(OffsetDateTime.parse("2020-01-01T00:00:00+00:00"), result.value().get(0));
		assertEquals(OffsetDateTime.parse("1970-01-01T00:00:00+00:00"), result.value().get(1));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamZonedDateTime(ListStreamingServiceService service) {
		var result = runStream(service::streamZonedDateTime);
		assertEquals(0, result.error().size());
		assertEquals(2, result.value().size());
		assertEquals(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Vienna]"), result.value().get(0));
		assertEquals(ZonedDateTime.parse("1970-01-01T00:00:00+01:00[Europe/Vienna]"), result.value().get(1));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamScalar(ListStreamingServiceService service) {
		var result = runStream(service::streamScalar);
		assertEquals(0, result.error().size());
		assertEquals(2, result.value().size());
		assertEquals(1, result.value().get(0).getStart());
		assertEquals(10, result.value().get(0).getEnd());
		assertEquals(20, result.value().get(1).getStart());
		assertEquals(30, result.value().get(1).getEnd());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamEnum(ListStreamingServiceService service) {
		var result = runStream(service::streamEnum);
		assertEquals(0, result.error().size());
		assertEquals(2, result.value().size());
		assertEquals(SampleEnum.A, result.value().get(0));
		assertEquals(SampleEnum.B, result.value().get(1));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamInlineEnum(ListStreamingServiceService service) {
		var result = runStream(service::streamInlineEnum);
		assertEquals(0, result.error().size());
		assertEquals(2, result.value().size());
		assertEquals(StreamInlineEnum_Result$.A, result.value().get(0));
		assertEquals(StreamInlineEnum_Result$.B, result.value().get(1));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamRecord(ListStreamingServiceService service) {
		var result = runStream(service::streamRecord);
		assertEquals(0, result.error().size());
		assertEquals(3, result.value().size());
		assertEquals("key-0", result.value().get(0).key());
		assertEquals("key-1", result.value().get(1).key());
		assertEquals("key-2", result.value().get(2).key());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void streamUnion(ListStreamingServiceService service) {
		var result = runStream(service::streamUnion);
		assertEquals(0, result.error().size());
		assertEquals(2, result.value().size());
		assertEquals("Foo", result.value().get(0).shared());
		assertEquals("Bar", result.value().get(1).shared());
		assertEquals("A", ((UnionA.Data) result.value().get(0)).valueA());
		assertEquals("B", ((UnionB.Data) result.value().get(1)).valueB());
	}

}
