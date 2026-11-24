package dev.rsdlang.sample.client.model;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class ScalarRecord_DataTest extends BaseTest {

	@Nested
	class Filled {
		static ScalarRecord.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.ScalarRecord);
			var record = readAvroFile("ScalarRecord.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.ScalarRecordDataImpl.of(record);
		}

		static ScalarRecord.Data build(ScalarRecord.DataBuilder builder) {
			builder.value(ZoneId.of("Europe/Paris"));
			builder.value_Null(ZoneId.of("Europe/Paris"));
			builder.value_Opt(ZoneId.of("Europe/Paris"));
			builder.value_Opt_Null(ZoneId.of("Europe/Paris"));
			builder.list(List.of(ZoneId.of("Europe/Paris"), ZoneId.of("America/Los_Angeles")));
			builder.list_Null(List.of(ZoneId.of("Europe/Paris"), ZoneId.of("America/Los_Angeles")));
			builder.list_Opt(List.of(ZoneId.of("Europe/Paris"), ZoneId.of("America/Los_Angeles")));
			builder.list_Opt_Null(List.of(ZoneId.of("Europe/Paris"), ZoneId.of("America/Los_Angeles")));
			return builder.build();
		}

		static ScalarRecord.Data createAvroRecordBuilder() {
			return build(dev.rsdlang.sample.client.model.impl.avro.ScalarRecordDataImpl.builder());
		}

		static ScalarRecord.Data createJsonRecord() {
			var record = readJsonFile("ScalarRecord.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.ScalarRecordDataImpl.of(record);
		}

		static ScalarRecord.Data createJsonRecordBuilder() {
			return build(dev.rsdlang.sample.client.model.impl.json.ScalarRecordDataImpl.builder());
		}

		static ScalarRecord.Data[] getRecords() {
			return new ScalarRecord.Data[] {
					createAvroRecord(),
					createJsonRecord(),
					createAvroRecordBuilder(),
					createJsonRecordBuilder()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(ScalarRecord.Data record) {
			assertEquals(ZoneId.of("Europe/Paris"), record.value());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Null(ScalarRecord.Data record) {
			assertEquals(ZoneId.of("Europe/Paris"), record.value_Null().orElse(null));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt(ScalarRecord.Data record) {
			assertEquals(ZoneId.of("Europe/Paris"), record.value_Opt().orElse(null));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt_Null(ScalarRecord.Data record) {
			assertEquals(ZoneId.of("Europe/Paris"), record.value_Opt_Null().orElse(null));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(ScalarRecord.Data record) {
			assertEquals(
					List.of(ZoneId.of("Europe/Paris"), ZoneId.of("America/Los_Angeles")),
					record.list());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(ScalarRecord.Data record) {
			assertEquals(
					List.of(ZoneId.of("Europe/Paris"), ZoneId.of("America/Los_Angeles")),
					record.list_Null().orElse(null));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(ScalarRecord.Data record) {
			assertEquals(
					List.of(ZoneId.of("Europe/Paris"), ZoneId.of("America/Los_Angeles")),
					record.list_Opt().orElse(null));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(ScalarRecord.Data record) {
			assertEquals(
					List.of(ZoneId.of("Europe/Paris"), ZoneId.of("America/Los_Angeles")),
					record.list_Opt_Null().orElse(null));
		}

	}

	@Nested
	class Minimal {
		static ScalarRecord.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.ScalarRecord);
			var record = readAvroFile("ScalarRecord.Minimal.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.ScalarRecordDataImpl.of(record);
		}

		static ScalarRecord.Data build(ScalarRecord.DataBuilder builder) {
			builder.value(ZoneId.of("Europe/Paris"));
			builder.value_Null(null);
			builder.list(List.of(ZoneId.of("Europe/Paris"), ZoneId.of("America/Los_Angeles")));
			builder.list_Null(null);
			return builder.build();
		}

		static ScalarRecord.Data createAvroRecordBuilder() {
			return build(dev.rsdlang.sample.client.model.impl.avro.ScalarRecordDataImpl.builder());
		}

		static ScalarRecord.Data createJsonRecord() {
			var record = readJsonFile("ScalarRecord.Minimal.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.ScalarRecordDataImpl.of(record);
		}

		static ScalarRecord.Data createJsonRecordBuilder() {
			return build(dev.rsdlang.sample.client.model.impl.json.ScalarRecordDataImpl.builder());
		}

		static ScalarRecord.Data[] getRecords() {
			return new ScalarRecord.Data[] {
					createAvroRecord(),
					createJsonRecord(),
					createAvroRecordBuilder(),
					createJsonRecordBuilder()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Null(ScalarRecord.Data record) {
			assertTrue(record.value_Null().isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt(ScalarRecord.Data record) {
			assertTrue(record.value_Opt().isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt_Null(ScalarRecord.Data record) {
			assertTrue(record.value_Opt_Null().isUndefined());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(ScalarRecord.Data record) {
			assertEquals(
					List.of(ZoneId.of("Europe/Paris"), ZoneId.of("America/Los_Angeles")),
					record.list());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(ScalarRecord.Data record) {
			assertTrue(record.list_Null().isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(ScalarRecord.Data record) {
			assertTrue(record.list_Opt().isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(ScalarRecord.Data record) {
			assertTrue(record.list_Opt_Null().isUndefined());
		}

	}

	@Nested
	class Null {
		static ScalarRecord.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.ScalarRecord);
			var record = readAvroFile("ScalarRecord.Null.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.ScalarRecordDataImpl.of(record);
		}

		static ScalarRecord.Data build(ScalarRecord.DataBuilder builder) {
			builder.value(ZoneId.of("Europe/Paris"));
			builder.value_Null(null);
			builder.value_Opt_Null(null);
			builder.list(List.of(ZoneId.of("Europe/Paris"), ZoneId.of("America/Los_Angeles")));
			builder.list_Null(null);
			builder.list_Opt_Null(null);
			return builder.build();
		}

		static ScalarRecord.Data createAvroRecordBuilder() {
			return build(dev.rsdlang.sample.client.model.impl.avro.ScalarRecordDataImpl.builder());
		}

		static ScalarRecord.Data createJsonRecord() {
			var record = readJsonFile("ScalarRecord.Null.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.ScalarRecordDataImpl.of(record);
		}

		static ScalarRecord.Data createJsonRecordBuilder() {
			return build(dev.rsdlang.sample.client.model.impl.json.ScalarRecordDataImpl.builder());
		}

		static ScalarRecord.Data[] getRecords() {
			return new ScalarRecord.Data[] {
					createAvroRecord(),
					createJsonRecord(),
					createAvroRecordBuilder(),
					createJsonRecordBuilder(),
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(ScalarRecord.Data record) {
			assertEquals(ZoneId.of("Europe/Paris"), record.value());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Null(ScalarRecord.Data record) {
			assertTrue(record.value_Null().isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt(ScalarRecord.Data record) {
			assertTrue(record.value_Opt().isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt_Null(ScalarRecord.Data record) {
			assertTrue(record.value_Opt_Null().isNull());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(ScalarRecord.Data record) {
			assertEquals(
					List.of(ZoneId.of("Europe/Paris"), ZoneId.of("America/Los_Angeles")),
					record.list());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(ScalarRecord.Data record) {
			assertTrue(record.list_Null().isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(ScalarRecord.Data record) {
			assertTrue(record.list_Opt().isEmpty());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(ScalarRecord.Data record) {
			assertTrue(record.list_Opt_Null().isNull());
		}
	}

}
