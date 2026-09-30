package dev.rsdlang.sample.client.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.OffsetDateTime;
import java.time.ZonedDateTime;

import org.junit.jupiter.params.ParameterizedTest;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class SimpleRecord_Basic_Null_DataTest extends BaseTest {
	static SimpleRecord_Basic_Null.Data createAvroRecord() {
		var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_Basic_Null);
		var record = readAvroFile("SimpleRecord_Basic_Null.Data.avro", schema);
		return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_Basic_NullDataImpl.of(record);
	}

	static SimpleRecord_Basic_Null.Data createJsonRecord() {
		var record = readJsonFile("SimpleRecord_Basic_Null.Data.json");
		return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_Basic_NullDataImpl.of(record);
	}

	static SimpleRecord_Basic_Null.Data[] getRecords() {
		return new SimpleRecord_Basic_Null.Data[] {
				createAvroRecord(),
				createJsonRecord()
		};
	}

	static SimpleRecord_Basic_Null.Data createAvroRecordNull() {
		var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_Basic_Null);
		var record = readAvroFile("SimpleRecord_Basic_Null.Null.Data.avro", schema);
		return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_Basic_NullDataImpl.of(record);
	}

	static SimpleRecord_Basic_Null.Data createJsonRecordNull() {
		var record = readJsonFile("SimpleRecord_Basic_Null.Null.Data.json");
		return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_Basic_NullDataImpl.of(record);
	}

	static SimpleRecord_Basic_Null.Data[] getRecordsNull() {
		return new SimpleRecord_Basic_Null.Data[] {
				createAvroRecordNull(),
				createJsonRecordNull()
		};
	}

	// Filled

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueBoolean(SimpleRecord_Basic_Null.Data record) {
		assertEquals(false, record.valueBoolean().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueDouble(SimpleRecord_Basic_Null.Data record) {
		assertEquals(Double.MAX_VALUE, record.valueDouble().getAsDouble());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueFloat(SimpleRecord_Basic_Null.Data record) {
		assertEquals(Float.MAX_VALUE, record.valueFloat().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueInt(SimpleRecord_Basic_Null.Data record) {
		assertEquals(Integer.MAX_VALUE, record.valueInt().getAsInt());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLocalDate(SimpleRecord_Basic_Null.Data record) {
		assertEquals(java.time.LocalDate.parse("2020-01-01"), record.valueLocalDate().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLocalDateTime(SimpleRecord_Basic_Null.Data record) {
		assertEquals(java.time.LocalDateTime.parse("2020-01-01T00:00:00"), record.valueLocalDateTime().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLocalTime(SimpleRecord_Basic_Null.Data record) {
		assertEquals(java.time.LocalTime.parse("10:00"), record.valueLocalTime().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLong(SimpleRecord_Basic_Null.Data record) {
		assertEquals(Long.MAX_VALUE, record.valueLong().getAsLong());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueOffsetDateTime(SimpleRecord_Basic_Null.Data record) {
		assertEquals(OffsetDateTime.parse("2020-01-01T00:00:00+01:00"), record.valueOffsetDateTime().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueShort(SimpleRecord_Basic_Null.Data record) {
		assertEquals(Short.MAX_VALUE, record.valueShort().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueString(SimpleRecord_Basic_Null.Data record) {
		assertEquals("the string value", record.valueString().get());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueZonedDateTime(SimpleRecord_Basic_Null.Data record) {
		assertEquals(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]"), record.valueZonedDateTime().get());
	}

	// Null
	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueBooleanNull(SimpleRecord_Basic_Null.Data record) {
		assertTrue(record.valueBoolean().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueDoubleNull(SimpleRecord_Basic_Null.Data record) {
		assertTrue(record.valueDouble().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueFloatNull(SimpleRecord_Basic_Null.Data record) {
		assertTrue(record.valueFloat().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueIntNull(SimpleRecord_Basic_Null.Data record) {
		assertTrue(record.valueInt().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueLocalDateNull(SimpleRecord_Basic_Null.Data record) {
		assertTrue(record.valueLocalDate().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueLocalDateTimeNull(SimpleRecord_Basic_Null.Data record) {
		assertTrue(record.valueLocalDateTime().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueLocalTimeNull(SimpleRecord_Basic_Null.Data record) {
		assertTrue(record.valueLocalTime().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueLongNull(SimpleRecord_Basic_Null.Data record) {
		assertTrue(record.valueLong().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueOffsetDateTimeNull(SimpleRecord_Basic_Null.Data record) {
		assertTrue(record.valueOffsetDateTime().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueShortNull(SimpleRecord_Basic_Null.Data record) {
		assertTrue(record.valueShort().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueStringNull(SimpleRecord_Basic_Null.Data record) {
		assertTrue(record.valueString().isEmpty());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueZonedDateTimeNull(SimpleRecord_Basic_Null.Data record) {
		assertTrue(record.valueZonedDateTime().isEmpty());
	}
}
