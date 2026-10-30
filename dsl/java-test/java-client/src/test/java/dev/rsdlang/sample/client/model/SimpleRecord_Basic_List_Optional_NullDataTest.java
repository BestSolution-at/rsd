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

public class SimpleRecord_Basic_List_Optional_NullDataTest extends BaseTest {
	@Nested
	class Filled {
		static SimpleRecord_Basic_List_Optional_Null.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_Basic_List_Optional_Null);
			var record = readAvroFile("SimpleRecord_Basic_List_Optional_Null.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_Basic_List_Optional_NullDataImpl.of(record);
		}

		static SimpleRecord_Basic_List_Optional_Null.Data createJsonRecord() {
			var record = readJsonFile("SimpleRecord_Basic_List_Optional_Null.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_Basic_List_Optional_NullDataImpl.of(record);
		}

		static SimpleRecord_Basic_List_Optional_Null.Data[] getRecords() {
			return new SimpleRecord_Basic_List_Optional_Null.Data[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(SimpleRecord_Basic_List_Optional_Null.Data record) {
			var data = record.valueBoolean().toOptional();
			assertTrue(data.isPresent());
			assertEquals(2, data.get().size());
			assertTrue(data.get().get(0));
			assertFalse(data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(SimpleRecord_Basic_List_Optional_Null.Data record) {
			var data = record.valueShort().toOptional();
			assertEquals(2, data.get().size());
			assertEquals(Short.MIN_VALUE, data.get().get(0));
			assertEquals(Short.MAX_VALUE, data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(SimpleRecord_Basic_List_Optional_Null.Data record) {
			var data = record.valueInt().toOptional();
			assertEquals(2, data.get().size());
			assertEquals(Integer.MIN_VALUE, data.get().get(0));
			assertEquals(Integer.MAX_VALUE, data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(SimpleRecord_Basic_List_Optional_Null.Data record) {
			var data = record.valueLong().toOptional();
			assertEquals(2, data.get().size());
			assertEquals(Long.MIN_VALUE, data.get().get(0));
			assertEquals(Long.MAX_VALUE, data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(SimpleRecord_Basic_List_Optional_Null.Data record) {
			var data = record.valueFloat().toOptional();
			assertEquals(2, data.get().size());
			assertEquals(Float.MIN_VALUE, data.get().get(0));
			assertEquals(Float.MAX_VALUE, data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(SimpleRecord_Basic_List_Optional_Null.Data record) {
			var data = record.valueDouble().toOptional();
			assertEquals(2, data.get().size());
			assertEquals(Double.MIN_VALUE, data.get().get(0));
			assertEquals(Double.MAX_VALUE, data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(SimpleRecord_Basic_List_Optional_Null.Data record) {
			var data = record.valueString().toOptional();
			assertEquals(2, data.get().size());
			assertEquals("a", data.get().get(0));
			assertEquals("b", data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(SimpleRecord_Basic_List_Optional_Null.Data record) {
			var data = record.valueLocalDate().toOptional();
			assertEquals(2, data.get().size());
			assertEquals(LocalDate.parse("2020-01-01"), data.get().get(0));
			assertEquals(LocalDate.parse("2020-12-31"), data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(SimpleRecord_Basic_List_Optional_Null.Data record) {
			var data = record.valueLocalDateTime().toOptional();
			assertEquals(2, data.get().size());
			assertEquals(LocalDateTime.parse("2020-01-01T00:00:00"), data.get().get(0));
			assertEquals(LocalDateTime.parse("2020-12-31T00:00:00"), data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(SimpleRecord_Basic_List_Optional_Null.Data record) {
			var data = record.valueLocalTime().toOptional();
			assertEquals(2, data.get().size());
			assertEquals(LocalTime.parse("00:00:00"), data.get().get(0));
			assertEquals(LocalTime.parse("23:59:59"), data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(SimpleRecord_Basic_List_Optional_Null.Data record) {
			var data = record.valueOffsetDateTime().toOptional();
			assertEquals(2, data.get().size());
			assertEquals(OffsetDateTime.parse("2020-01-01T00:00:00+01:00"), data.get().get(0));
			assertEquals(OffsetDateTime.parse("2020-12-31T00:00:00+01:00"), data.get().get(1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(SimpleRecord_Basic_List_Optional_Null.Data record) {
			var data = record.valueZonedDateTime().toOptional();
			assertEquals(2, data.get().size());
			assertEquals(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]"), data.get().get(0));
			assertEquals(ZonedDateTime.parse("2020-12-31T00:00:00+01:00[Europe/Paris]"), data.get().get(1));
		}
	}

	@Nested
	class Empty {
		static SimpleRecord_Basic_List_Optional_Null.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_Basic_List_Optional_Null);
			var record = readAvroFile("SimpleRecord_Basic_List_Optional_Null.Empty.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_Basic_List_Optional_NullDataImpl.of(record);
		}

		static SimpleRecord_Basic_List_Optional_Null.Data createJsonRecord() {
			var record = readJsonFile("SimpleRecord_Basic_List_Optional_Null.Empty.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_Basic_List_Optional_NullDataImpl.of(record);
		}

		static SimpleRecord_Basic_List_Optional_Null.Data[] getRecords() {
			return new SimpleRecord_Basic_List_Optional_Null.Data[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueBoolean().isUndefined());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueShort().isUndefined());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueInt().isUndefined());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueLong().isUndefined());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueFloat().isUndefined());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueDouble().isUndefined());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueString().isUndefined());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueLocalDate().isUndefined());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueLocalDateTime().isUndefined());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueLocalTime().isUndefined());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueOffsetDateTime().isUndefined());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueZonedDateTime().isUndefined());
		}
	}

	@Nested
	class Null {
		static SimpleRecord_Basic_List_Optional_Null.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_Basic_List_Optional_Null);
			var record = readAvroFile("SimpleRecord_Basic_List_Optional_Null.Null.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_Basic_List_Optional_NullDataImpl.of(record);
		}

		static SimpleRecord_Basic_List_Optional_Null.Data createJsonRecord() {
			var record = readJsonFile("SimpleRecord_Basic_List_Optional_Null.Null.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_Basic_List_Optional_NullDataImpl.of(record);
		}

		static SimpleRecord_Basic_List_Optional_Null.Data[] getRecords() {
			return new SimpleRecord_Basic_List_Optional_Null.Data[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueBoolean().isNull());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueShort().isNull());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueInt().isNull());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueLong().isNull());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueFloat().isNull());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueDouble().isNull());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueString().isNull());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueLocalDate().isNull());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueLocalDateTime().isNull());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueLocalTime().isNull());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueOffsetDateTime().isNull());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(SimpleRecord_Basic_List_Optional_Null.Data record) {
			assertTrue(record.valueZonedDateTime().isNull());
		}
	}
}
