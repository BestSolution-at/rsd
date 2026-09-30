package dev.rsdlang.sample.client.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.OffsetDateTime;
import java.time.ZonedDateTime;

import org.junit.jupiter.params.ParameterizedTest;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class SimpleRecord_Basic_Optional_DataTest extends BaseTest {
	static SimpleRecord_Basic_Optional.Data createAvroRecord() {
		var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_Basic_Optional);
		var record = readAvroFile("SimpleRecord_Basic_Optional.Data.avro", schema);
		return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_Basic_OptionalDataImpl.of(record);
	}

	static SimpleRecord_Basic_Optional.Data createJsonRecord() {
		var record = readJsonFile("SimpleRecord_Basic_Optional.Data.json");
		return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_Basic_OptionalDataImpl.of(record);
	}

	static SimpleRecord_Basic_Optional.Data[] getRecords() {
		return new SimpleRecord_Basic_Optional.Data[] {
				createAvroRecord(),
				createJsonRecord()
		};
	}

	static SimpleRecord_Basic_Optional.Data createAvroRecordEmpty() {
		var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_Basic_Optional);
		var record = readAvroFile("SimpleRecord_Basic_Optional.Empty.Data.avro", schema);
		return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_Basic_OptionalDataImpl.of(record);
	}

	static SimpleRecord_Basic_Optional.Data createJsonRecordEmpty() {
		var record = readJsonFile("SimpleRecord_Basic_Optional.Empty.Data.json");
		return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_Basic_OptionalDataImpl.of(record);
	}

	static SimpleRecord_Basic_Optional.Data[] getRecordsEmpty() {
		return new SimpleRecord_Basic_Optional.Data[] {
				createAvroRecordEmpty(),
				createJsonRecordEmpty()
		};
	}

	// Filled

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueBoolean(SimpleRecord_Basic_Optional.Data record) {
		assertEquals(false, record.valueBoolean().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueDouble(SimpleRecord_Basic_Optional.Data record) {
		assertEquals(Double.MAX_VALUE, record.valueDouble().getAsDouble());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueFloat(SimpleRecord_Basic_Optional.Data record) {
		assertEquals(Float.MAX_VALUE, record.valueFloat().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueInt(SimpleRecord_Basic_Optional.Data record) {
		assertEquals(Integer.MAX_VALUE, record.valueInt().getAsInt());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLocalDate(SimpleRecord_Basic_Optional.Data record) {
		assertEquals(java.time.LocalDate.parse("2020-01-01"), record.valueLocalDate().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLocalDateTime(SimpleRecord_Basic_Optional.Data record) {
		assertEquals(java.time.LocalDateTime.parse("2020-01-01T00:00:00"), record.valueLocalDateTime().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLocalTime(SimpleRecord_Basic_Optional.Data record) {
		assertEquals(java.time.LocalTime.parse("10:00"), record.valueLocalTime().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLong(SimpleRecord_Basic_Optional.Data record) {
		assertEquals(Long.MAX_VALUE, record.valueLong().getAsLong());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueOffsetDateTime(SimpleRecord_Basic_Optional.Data record) {
		assertEquals(OffsetDateTime.parse("2020-01-01T00:00:00+01:00"), record.valueOffsetDateTime().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueShort(SimpleRecord_Basic_Optional.Data record) {
		assertEquals(Short.MAX_VALUE, record.valueShort().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueString(SimpleRecord_Basic_Optional.Data record) {
		assertEquals("the string value", record.valueString().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueZonedDateTime(SimpleRecord_Basic_Optional.Data record) {
		assertEquals(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]"), record.valueZonedDateTime().get());
	}

	// Empty
	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueBooleanEmpty(SimpleRecord_Basic_Optional.Data record) {
		assertTrue(record.valueBoolean().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueDoubleEmpty(SimpleRecord_Basic_Optional.Data record) {
		assertTrue(record.valueDouble().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueFloatEmpty(SimpleRecord_Basic_Optional.Data record) {
		assertTrue(record.valueFloat().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueIntEmpty(SimpleRecord_Basic_Optional.Data record) {
		assertTrue(record.valueInt().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueLocalDateEmpty(SimpleRecord_Basic_Optional.Data record) {
		assertTrue(record.valueLocalDate().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueLocalDateTimeEmpty(SimpleRecord_Basic_Optional.Data record) {
		assertTrue(record.valueLocalDateTime().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueLocalTimeEmpty(SimpleRecord_Basic_Optional.Data record) {
		assertTrue(record.valueLocalTime().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueLongEmpty(SimpleRecord_Basic_Optional.Data record) {
		assertTrue(record.valueLong().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueOffsetDateTimeEmpty(SimpleRecord_Basic_Optional.Data record) {
		assertTrue(record.valueOffsetDateTime().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueShortEmpty(SimpleRecord_Basic_Optional.Data record) {
		assertTrue(record.valueShort().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueStringEmpty(SimpleRecord_Basic_Optional.Data record) {
		assertTrue(record.valueString().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueZonedDateTimeEmpty(SimpleRecord_Basic_Optional.Data record) {
		assertTrue(record.valueZonedDateTime().isEmpty());
	}
}
