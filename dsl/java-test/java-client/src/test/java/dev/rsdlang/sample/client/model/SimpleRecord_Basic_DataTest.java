package dev.rsdlang.sample.client.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.OffsetDateTime;
import java.time.ZonedDateTime;

import org.junit.jupiter.params.ParameterizedTest;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class SimpleRecord_Basic_DataTest extends BaseTest {
	static SimpleRecord_Basic.Data createAvroRecord() {
		var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_Basic);
		var record = readAvroFile("SimpleRecord_Basic.Data.avro", schema);
		return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_BasicDataImpl.of(record);
	}

	static SimpleRecord_Basic.Data createJsonRecord() {
		var record = readJsonFile("SimpleRecord_Basic.Data.json");
		return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_BasicDataImpl.of(record);
	}

	static SimpleRecord_Basic.Data[] getRecords() {
		return new SimpleRecord_Basic.Data[] {
				createAvroRecord(),
				createJsonRecord()
		};
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueBoolean(SimpleRecord_Basic.Data record) {
		assertEquals(false, record.valueBoolean());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueDouble(SimpleRecord_Basic.Data record) {
		assertEquals(Double.MAX_VALUE, record.valueDouble());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueFloat(SimpleRecord_Basic.Data record) {
		assertEquals(Float.MAX_VALUE, record.valueFloat());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueInt(SimpleRecord_Basic.Data record) {
		assertEquals(Integer.MAX_VALUE, record.valueInt());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLocalDate(SimpleRecord_Basic.Data record) {
		assertEquals(java.time.LocalDate.parse("2020-01-01"), record.valueLocalDate());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLocalDateTime(SimpleRecord_Basic.Data record) {
		assertEquals(java.time.LocalDateTime.parse("2020-01-01T00:00:00"), record.valueLocalDateTime());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLocalTime(SimpleRecord_Basic.Data record) {
		assertEquals(java.time.LocalTime.parse("10:00"), record.valueLocalTime());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueLong(SimpleRecord_Basic.Data record) {
		assertEquals(Long.MAX_VALUE, record.valueLong());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueOffsetDateTime(SimpleRecord_Basic.Data record) {
		assertEquals(OffsetDateTime.parse("2020-01-01T00:00:00+01:00"), record.valueOffsetDateTime());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueShort(SimpleRecord_Basic.Data record) {
		assertEquals(Short.MAX_VALUE, record.valueShort());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueString(SimpleRecord_Basic.Data record) {
		assertEquals("the string value", record.valueString());
	}

	@ParameterizedTest
	@org.junit.jupiter.params.provider.MethodSource("getRecords")
	void valueZonedDateTime(SimpleRecord_Basic.Data record) {
		// Implement your test logic here
		assertEquals(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]"), record.valueZonedDateTime());
	}
}
