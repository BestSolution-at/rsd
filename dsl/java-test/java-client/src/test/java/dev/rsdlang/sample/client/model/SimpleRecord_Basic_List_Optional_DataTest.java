package dev.rsdlang.sample.client.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class SimpleRecord_Basic_List_Optional_DataTest extends BaseTest {
	@Nested
	class Filled {
		static SimpleRecord_Basic_List_Optional.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_Basic_List_Optional);
			var record = readAvroFile("SimpleRecord_Basic_List_Optional.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_Basic_List_OptionalDataImpl.of(record);
		}

		static SimpleRecord_Basic_List_Optional.Data createJsonRecord() {
			var record = readJsonFile("SimpleRecord_Basic_List_Optional.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_Basic_List_OptionalDataImpl.of(record);
		}

		static SimpleRecord_Basic_List_Optional.Data[] getRecords() {
			return new SimpleRecord_Basic_List_Optional.Data[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueBoolean();
			assertTrue(data.isPresent());
			assertEquals(2, data.get().size());
			assertTrue(data.get().get(0));
			assertFalse(data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueShort();
			assertEquals(2, data.get().size());
			assertEquals(Short.MIN_VALUE, data.get().get(0));
			assertEquals(Short.MAX_VALUE, data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueInt();
			assertEquals(2, data.get().size());
			assertEquals(Integer.MIN_VALUE, data.get().get(0));
			assertEquals(Integer.MAX_VALUE, data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueLong();
			assertEquals(2, data.get().size());
			assertEquals(Long.MIN_VALUE, data.get().get(0));
			assertEquals(Long.MAX_VALUE, data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueFloat();
			assertEquals(2, data.get().size());
			assertEquals(Float.MIN_VALUE, data.get().get(0));
			assertEquals(Float.MAX_VALUE, data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueDouble();
			assertEquals(2, data.get().size());
			assertEquals(Double.MIN_VALUE, data.get().get(0));
			assertEquals(Double.MAX_VALUE, data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueString();
			assertEquals(2, data.get().size());
			assertEquals("a", data.get().get(0));
			assertEquals("b", data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueLocalDate();
			assertEquals(2, data.get().size());
			assertEquals(LocalDate.parse("2020-01-01"), data.get().get(0));
			assertEquals(LocalDate.parse("2020-12-31"), data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueLocalDateTime();
			assertEquals(2, data.get().size());
			assertEquals(LocalDateTime.parse("2020-01-01T00:00:00"), data.get().get(0));
			assertEquals(LocalDateTime.parse("2020-12-31T00:00:00"), data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueLocalTime();
			assertEquals(2, data.get().size());
			assertEquals(LocalTime.parse("00:00:00"), data.get().get(0));
			assertEquals(LocalTime.parse("23:59:59"), data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueOffsetDateTime();
			assertEquals(2, data.get().size());
			assertEquals(OffsetDateTime.parse("2020-01-01T00:00:00+01:00"), data.get().get(0));
			assertEquals(OffsetDateTime.parse("2020-12-31T00:00:00+01:00"), data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueZonedDateTime();
			assertEquals(2, data.get().size());
			assertEquals(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]"), data.get().get(0));
			assertEquals(ZonedDateTime.parse("2020-12-31T00:00:00+01:00[Europe/Paris]"), data.get().get(1));
		}
	}

	@Nested
	class Empty {
		static SimpleRecord_Basic_List_Optional.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_Basic_List_Optional);
			var record = readAvroFile("SimpleRecord_Basic_List_Optional.Empty.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_Basic_List_OptionalDataImpl.of(record);
		}

		static SimpleRecord_Basic_List_Optional.Data createJsonRecord() {
			var record = readJsonFile("SimpleRecord_Basic_List_Optional.Empty.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_Basic_List_OptionalDataImpl.of(record);
		}

		static SimpleRecord_Basic_List_Optional.Data[] getRecords() {
			return new SimpleRecord_Basic_List_Optional.Data[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueBoolean();
			assertTrue(data.isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueShort();
			assertTrue(data.isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueInt();
			assertTrue(data.isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueLong();
			assertTrue(data.isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueFloat();
			assertTrue(data.isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueDouble();
			assertTrue(data.isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueString();
			assertTrue(data.isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueLocalDate();
			assertTrue(data.isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueLocalDateTime();
			assertTrue(data.isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueLocalTime();
			assertTrue(data.isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueOffsetDateTime();
			assertTrue(data.isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(SimpleRecord_Basic_List_Optional.Data record) {
			var data = record.valueZonedDateTime();
			assertTrue(data.isEmpty());
		}
	}
}
