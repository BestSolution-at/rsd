package dev.rsdlang.sample.client.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.OffsetDateTime;
import java.time.ZonedDateTime;

import org.junit.jupiter.params.ParameterizedTest;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class SimpleRecord_Basic_Optional_Null_DataTest extends BaseTest {
	static SimpleRecord_Basic_Optional_Null.Data createAvroRecord() {
		var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_Basic_Optional_Null);
		var record = readAvroFile("SimpleRecord_Basic_Optional_Null.Data.avro", schema);
		return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_Basic_Optional_NullDataImpl.of(record);
	}

	static SimpleRecord_Basic_Optional_Null.Data createJsonRecord() {
		var record = readJsonFile("SimpleRecord_Basic_Optional_Null.Data.json");
		return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_Basic_Optional_NullDataImpl.of(record);
	}

	static SimpleRecord_Basic_Optional_Null.Data[] getRecords() {
		return new SimpleRecord_Basic_Optional_Null.Data[] {
				createAvroRecord(),
				createJsonRecord()
		};
	}

	static SimpleRecord_Basic_Optional_Null.Data createAvroRecordEmpty() {
		var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_Basic_Optional_Null);
		var record = readAvroFile("SimpleRecord_Basic_Optional_Null.Empty.Data.avro", schema);
		return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_Basic_Optional_NullDataImpl.of(record);
	}

	static SimpleRecord_Basic_Optional_Null.Data createJsonRecordEmpty() {
		var record = readJsonFile("SimpleRecord_Basic_Optional_Null.Empty.Data.json");
		return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_Basic_Optional_NullDataImpl.of(record);
	}

	static SimpleRecord_Basic_Optional_Null.Data[] getRecordsEmpty() {
		return new SimpleRecord_Basic_Optional_Null.Data[] {
				createAvroRecordEmpty(),
				createJsonRecordEmpty()
		};
	}

	static SimpleRecord_Basic_Optional_Null.Data createAvroRecordNull() {
		var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_Basic_Optional_Null);
		var record = readAvroFile("SimpleRecord_Basic_Optional_Null.Null.Data.avro", schema);
		return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_Basic_Optional_NullDataImpl.of(record);
	}

	static SimpleRecord_Basic_Optional_Null.Data createJsonRecordNull() {
		var record = readJsonFile("SimpleRecord_Basic_Optional_Null.Null.Data.json");
		return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_Basic_Optional_NullDataImpl.of(record);
	}

	static SimpleRecord_Basic_Optional_Null.Data[] getRecordsNull() {
		return new SimpleRecord_Basic_Optional_Null.Data[] {
				createAvroRecordNull(),
				createJsonRecordNull()
		};
	}

	// Filled

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueBoolean(SimpleRecord_Basic_Optional_Null.Data record) {
		assertFalse(record.valueBoolean().isNull());
		assertFalse(record.valueBoolean().isUndefined());
		assertEquals(false, record.valueBoolean().orElse(null));
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueDouble(SimpleRecord_Basic_Optional_Null.Data record) {
		assertFalse(record.valueDouble().isNull());
		assertFalse(record.valueDouble().isUndefined());
		assertEquals(Double.MAX_VALUE, record.valueDouble().orElse(null));
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueFloat(SimpleRecord_Basic_Optional_Null.Data record) {
		assertFalse(record.valueFloat().isNull());
		assertFalse(record.valueFloat().isUndefined());
		assertEquals(Float.MAX_VALUE, record.valueFloat().orElse(null));
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueInt(SimpleRecord_Basic_Optional_Null.Data record) {
		assertFalse(record.valueInt().isNull());
		assertFalse(record.valueInt().isUndefined());
		assertEquals(Integer.MAX_VALUE, record.valueInt().orElse(null));
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLocalDate(SimpleRecord_Basic_Optional_Null.Data record) {
		assertFalse(record.valueLocalDate().isNull());
		assertFalse(record.valueLocalDate().isUndefined());
		assertEquals(java.time.LocalDate.parse("2020-01-01"), record.valueLocalDate().orElse(null));
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLocalDateTime(SimpleRecord_Basic_Optional_Null.Data record) {
		assertFalse(record.valueLocalDateTime().isNull());
		assertFalse(record.valueLocalDateTime().isUndefined());
		assertEquals(java.time.LocalDateTime.parse("2020-01-01T00:00:00"), record.valueLocalDateTime().orElse(null));
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLocalTime(SimpleRecord_Basic_Optional_Null.Data record) {
		assertFalse(record.valueLocalTime().isNull());
		assertFalse(record.valueLocalTime().isUndefined());
		assertEquals(java.time.LocalTime.parse("10:00"), record.valueLocalTime().orElse(null));
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLong(SimpleRecord_Basic_Optional_Null.Data record) {
		assertFalse(record.valueLong().isNull());
		assertFalse(record.valueLong().isUndefined());
		assertEquals(Long.MAX_VALUE, record.valueLong().orElse(null));
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueOffsetDateTime(SimpleRecord_Basic_Optional_Null.Data record) {
		assertFalse(record.valueOffsetDateTime().isNull());
		assertFalse(record.valueOffsetDateTime().isUndefined());
		assertEquals(OffsetDateTime.parse("2020-01-01T00:00:00+01:00"), record.valueOffsetDateTime().orElse(null));
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueShort(SimpleRecord_Basic_Optional_Null.Data record) {
		assertFalse(record.valueShort().isNull());
		assertFalse(record.valueShort().isUndefined());
		assertEquals(Short.MAX_VALUE, record.valueShort().orElse(null));
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueString(SimpleRecord_Basic_Optional_Null.Data record) {
		assertFalse(record.valueString().isNull());
		assertFalse(record.valueString().isUndefined());
		assertEquals("the string value", record.valueString().orElse(null));
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueZonedDateTime(SimpleRecord_Basic_Optional_Null.Data record) {
		assertFalse(record.valueZonedDateTime().isNull());
		assertFalse(record.valueZonedDateTime().isUndefined());
		assertEquals(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]"),
				record.valueZonedDateTime().orElse(null));
	}

	// Empty

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueBooleanEmpty(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueBoolean().isUndefined());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueDoubleEmpty(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueDouble().isUndefined());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueFloatEmpty(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueFloat().isUndefined());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueIntEmpty(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueInt().isUndefined());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueLocalDateEmpty(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueLocalDate().isUndefined());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueLocalDateTimeEmpty(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueLocalDateTime().isUndefined());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueLocalTimeEmpty(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueLocalTime().isUndefined());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueLongEmpty(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueLong().isUndefined());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueOffsetDateTimeEmpty(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueOffsetDateTime().isUndefined());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueShortEmpty(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueShort().isUndefined());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueStringEmpty(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueString().isUndefined());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsEmpty")
	void valueZonedDateTimeEmpty(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueZonedDateTime().isUndefined());
	}

	// Null

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueBooleanNull(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueBoolean().isNull());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueDoubleNull(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueDouble().isNull());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueFloatNull(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueFloat().isNull());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueIntNull(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueInt().isNull());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueLocalDateNull(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueLocalDate().isNull());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueLocalDateTimeNull(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueLocalDateTime().isNull());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueLocalTimeNull(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueLocalTime().isNull());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueLongNull(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueLong().isNull());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueOffsetDateTimeNull(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueOffsetDateTime().isNull());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueShortNull(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueShort().isNull());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueStringNull(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueString().isNull());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecordsNull")
	void valueZonedDateTimeNull(SimpleRecord_Basic_Optional_Null.Data record) {
		assertTrue(record.valueZonedDateTime().isNull());
	}

}
