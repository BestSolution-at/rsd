package dev.rsdlang.sample.client.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class SimpleRecord_Basic_List_DataTest extends BaseTest {
	static SimpleRecord_Basic_List.Data createAvroRecord() {
		var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_Basic_List);
		var record = readAvroFile("SimpleRecord_Basic_List.Data.avro", schema);
		return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_Basic_ListDataImpl.of(record);
	}

	static SimpleRecord_Basic_List.Data createJsonRecord() {
		var record = readJsonFile("SimpleRecord_Basic_List.Data.json");
		return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_Basic_ListDataImpl.of(record);
	}

	static SimpleRecord_Basic_List.Data[] getRecords() {
		return new SimpleRecord_Basic_List.Data[] {
				createAvroRecord(),
				createJsonRecord()
		};
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void valueBoolean(SimpleRecord_Basic_List.Data record) {
		var data = record.valueBoolean();
		assertEquals(2, data.size());
		assertTrue(data.get(0));
		assertFalse(data.get(1));
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void valueShort(SimpleRecord_Basic_List.Data record) {
		var data = record.valueShort();
		assertEquals(2, data.size());
		assertEquals(Short.MIN_VALUE, data.get(0));
		assertEquals(Short.MAX_VALUE, data.get(1));
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void valueInt(SimpleRecord_Basic_List.Data record) {
		var data = record.valueInt();
		assertEquals(2, data.size());
		assertEquals(Integer.MIN_VALUE, data.get(0));
		assertEquals(Integer.MAX_VALUE, data.get(1));
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void valueLong(SimpleRecord_Basic_List.Data record) {
		var data = record.valueLong();
		assertEquals(2, data.size());
		assertEquals(Long.MIN_VALUE, data.get(0));
		assertEquals(Long.MAX_VALUE, data.get(1));
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void valueFloat(SimpleRecord_Basic_List.Data record) {
		var data = record.valueFloat();
		assertEquals(2, data.size());
		assertEquals(Float.MIN_VALUE, data.get(0));
		assertEquals(Float.MAX_VALUE, data.get(1));
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void valueDouble(SimpleRecord_Basic_List.Data record) {
		var data = record.valueDouble();
		assertEquals(2, data.size());
		// assertEquals(Double.MIN_VALUE, data.get(0));
		assertEquals(Double.MAX_VALUE, data.get(1));
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void valueString(SimpleRecord_Basic_List.Data record) {
		var data = record.valueString();
		assertEquals(2, data.size());
		assertEquals("a", data.get(0));
		assertEquals("b", data.get(1));
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void valueLocalDate(SimpleRecord_Basic_List.Data record) {
		var data = record.valueLocalDate();
		assertEquals(2, data.size());
		assertEquals(LocalDate.parse("2020-01-01"), data.get(0));
		assertEquals(LocalDate.parse("2020-12-31"), data.get(1));
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void valueLocalDateTime(SimpleRecord_Basic_List.Data record) {
		var data = record.valueLocalDateTime();
		assertEquals(2, data.size());
		assertEquals(LocalDateTime.parse("2020-01-01T00:00:00"), data.get(0));
		assertEquals(LocalDateTime.parse("2020-12-31T00:00:00"), data.get(1));
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void valueLocalTime(SimpleRecord_Basic_List.Data record) {
		var data = record.valueLocalTime();
		assertEquals(2, data.size());
		assertEquals(LocalTime.parse("00:00:00"), data.get(0));
		assertEquals(LocalTime.parse("23:59:59"), data.get(1));
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void valueOffsetDateTime(SimpleRecord_Basic_List.Data record) {
		var data = record.valueOffsetDateTime();
		assertEquals(2, data.size());
		assertEquals(OffsetDateTime.parse("2020-01-01T00:00:00+01:00"), data.get(0));
		assertEquals(OffsetDateTime.parse("2020-12-31T00:00:00+01:00"), data.get(1));
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void valueZonedDateTime(SimpleRecord_Basic_List.Data record) {
		var data = record.valueZonedDateTime();
		assertEquals(2, data.size());
		assertEquals(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]"), data.get(0));
		assertEquals(ZonedDateTime.parse("2020-12-31T00:00:00+01:00[Europe/Paris]"), data.get(1));
	}
}
