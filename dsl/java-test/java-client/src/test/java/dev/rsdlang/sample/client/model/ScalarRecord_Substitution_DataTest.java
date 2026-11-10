package dev.rsdlang.sample.client.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;

import dev.rsdlang.sample.client.MyRange;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class ScalarRecord_Substitution_DataTest extends BaseTest {
	@Nested
	class Filled {
		static ScalarRecord_Substitution.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.ScalarRecord);
			var record = readAvroFile("ScalarRecord_Substitution.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.ScalarRecord_SubstitutionDataImpl.of(record);
		}

		static ScalarRecord_Substitution.Data createAvroRecordBuilder() {
			var builder = dev.rsdlang.sample.client.model.impl.avro.ScalarRecord_SubstitutionDataImpl.builder();
			builder.value(new MyRange(0, 1));
			builder.value_Null(new MyRange(0, 1));
			builder.value_Opt(new MyRange(0, 1));
			builder.value_Opt_Null(new MyRange(0, 1));
			builder.list(java.util.List.of(new MyRange(0, 1), new MyRange(1, 2)));
			builder.list_Null(java.util.List.of(new MyRange(0, 1), new MyRange(1, 2)));
			builder.list_Opt(java.util.List.of(new MyRange(0, 1), new MyRange(1, 2)));
			builder.list_Opt_Null(java.util.List.of(new MyRange(0, 1), new MyRange(1, 2)));
			return builder.build();
		}

		static ScalarRecord_Substitution.Data createJsonRecord() {
			var record = readJsonFile("ScalarRecord_Substitution.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.ScalarRecord_SubstitutionDataImpl.of(record);
		}

		static ScalarRecord_Substitution.Data createJsonRecordBuilder() {
			var builder = dev.rsdlang.sample.client.model.impl.json.ScalarRecord_SubstitutionDataImpl.builder();
			builder.value(new MyRange(0, 1));
			builder.value_Null(new MyRange(0, 1));
			builder.value_Opt(new MyRange(0, 1));
			builder.value_Opt_Null(new MyRange(0, 1));
			builder.list(java.util.List.of(new MyRange(0, 1), new MyRange(1, 2)));
			builder.list_Null(java.util.List.of(new MyRange(0, 1), new MyRange(1, 2)));
			builder.list_Opt(java.util.List.of(new MyRange(0, 1), new MyRange(1, 2)));
			builder.list_Opt_Null(java.util.List.of(new MyRange(0, 1), new MyRange(1, 2)));
			return builder.build();
		}

		static ScalarRecord_Substitution.Data[] getRecords() {
			return new ScalarRecord_Substitution.Data[] {
					createAvroRecord(),
					createJsonRecord(),
					createAvroRecordBuilder(),
					createJsonRecordBuilder()
			};
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void value(ScalarRecord_Substitution.Data record) {
			assertEquals("[0,1]", MyRange.toString(record.value()));
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void value_Null(ScalarRecord_Substitution.Data record) {
			assertEquals("[0,1]", record.value_Null().map(v -> MyRange.toString(v)).orElse(null));
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void value_Opt(ScalarRecord_Substitution.Data record) {
			assertEquals("[0,1]", record.value_Opt().map(v -> MyRange.toString(v)).orElse(null));
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void value_Opt_Null(ScalarRecord_Substitution.Data record) {
			assertEquals("[0,1]", record.value_Opt_Null().map(v -> MyRange.toString(v)).orElse(null));
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void list(ScalarRecord_Substitution.Data record) {
			var list = record.list();
			assertEquals(2, list.size());
			assertEquals("[0,1]", MyRange.toString(list.get(0)));
			assertEquals("[1,2]", MyRange.toString(list.get(1)));
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void list_Null(ScalarRecord_Substitution.Data record) {
			var list = record.list_Null();
			assertTrue(list.isPresent());
			assertEquals("[0,1]", MyRange.toString(list.get().get(0)));
			assertEquals("[1,2]", MyRange.toString(list.get().get(1)));
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void list_Opt(ScalarRecord_Substitution.Data record) {
			var list = record.list_Opt();
			assertTrue(list.isPresent());
			assertEquals("[0,1]", MyRange.toString(list.get().get(0)));
			assertEquals("[1,2]", MyRange.toString(list.get().get(1)));
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void list_Opt_Null(ScalarRecord_Substitution.Data record) {
			var list = record.list_Opt_Null();
			assertFalse(list.isNull());
			assertFalse(list.isUndefined());
			assertEquals("[0,1]", MyRange.toString(list.toOptional().get().get(0)));
			assertEquals("[1,2]", MyRange.toString(list.toOptional().get().get(1)));
		}
	}

	@Nested
	class Minimal {
		static ScalarRecord_Substitution.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.ScalarRecord);
			var record = readAvroFile("ScalarRecord_Substitution.Minimal.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.ScalarRecord_SubstitutionDataImpl.of(record);
		}

		static ScalarRecord_Substitution.Data createAvroRecordBuilder() {
			var builder = dev.rsdlang.sample.client.model.impl.avro.ScalarRecord_SubstitutionDataImpl.builder();
			builder.value(new MyRange(0, 1));
			builder.value_Null(null);
			builder.list(java.util.List.of(new MyRange(0, 1), new MyRange(1, 2)));
			builder.list_Null(null);
			return builder.build();
		}

		static ScalarRecord_Substitution.Data createJsonRecord() {
			var record = readJsonFile("ScalarRecord_Substitution.Minimal.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.ScalarRecord_SubstitutionDataImpl.of(record);
		}

		static ScalarRecord_Substitution.Data createJsonRecordBuilder() {
			var builder = dev.rsdlang.sample.client.model.impl.json.ScalarRecord_SubstitutionDataImpl.builder();
			builder.value(new MyRange(0, 1));
			builder.value_Null(null);
			builder.list(java.util.List.of(new MyRange(0, 1), new MyRange(1, 2)));
			builder.list_Null(null);
			return builder.build();
		}

		static ScalarRecord_Substitution.Data[] getRecords() {
			return new ScalarRecord_Substitution.Data[] {
					createAvroRecord(),
					createJsonRecord(),
					createAvroRecordBuilder(),
					createJsonRecordBuilder()
			};
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void value(ScalarRecord_Substitution.Data record) {
			assertEquals("[0,1]", MyRange.toString(record.value()));
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void value_Null(ScalarRecord_Substitution.Data record) {
			assertTrue(record.value_Null().isEmpty());
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void value_Opt(ScalarRecord_Substitution.Data record) {
			assertTrue(record.value_Opt().isEmpty());
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void value_Opt_Null(ScalarRecord_Substitution.Data record) {
			assertTrue(record.value_Opt_Null().isUndefined());
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void list(ScalarRecord_Substitution.Data record) {
			var list = record.list();
			assertEquals(2, list.size());
			assertEquals("[0,1]", MyRange.toString(list.get(0)));
			assertEquals("[1,2]", MyRange.toString(list.get(1)));
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void list_Null(ScalarRecord_Substitution.Data record) {
			var list = record.list_Null();
			assertTrue(list.isEmpty());
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void list_Opt(ScalarRecord_Substitution.Data record) {
			var list = record.list_Opt();
			assertTrue(list.isEmpty());
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void list_Opt_Null(ScalarRecord_Substitution.Data record) {
			var list = record.list_Opt_Null();
			assertFalse(list.isNull());
			assertTrue(list.isUndefined());
		}
	}

	@Nested
	class Null {
		static ScalarRecord_Substitution.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.ScalarRecord);
			var record = readAvroFile("ScalarRecord_Substitution.Null.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.ScalarRecord_SubstitutionDataImpl.of(record);
		}

		static ScalarRecord_Substitution.Data createAvroRecordBuilder() {
			var builder = dev.rsdlang.sample.client.model.impl.avro.ScalarRecord_SubstitutionDataImpl.builder();
			builder.value(new MyRange(0, 1));
			builder.value_Null(null);
			builder.value_Opt_Null(null);
			builder.list(java.util.List.of(new MyRange(0, 1), new MyRange(1, 2)));
			builder.list_Null(null);
			builder.list_Opt_Null(null);
			return builder.build();
		}

		static ScalarRecord_Substitution.Data createJsonRecord() {
			var record = readJsonFile("ScalarRecord_Substitution.Null.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.ScalarRecord_SubstitutionDataImpl.of(record);
		}

		static ScalarRecord_Substitution.Data createJsonRecordBuilder() {
			var builder = dev.rsdlang.sample.client.model.impl.json.ScalarRecord_SubstitutionDataImpl.builder();
			builder.value(new MyRange(0, 1));
			builder.value_Null(null);
			builder.value_Opt_Null(null);
			builder.list(java.util.List.of(new MyRange(0, 1), new MyRange(1, 2)));
			builder.list_Null(null);
			builder.list_Opt_Null(null);
			return builder.build();
		}

		static ScalarRecord_Substitution.Data[] getRecords() {
			return new ScalarRecord_Substitution.Data[] {
					createAvroRecord(),
					createJsonRecord(),
					createAvroRecordBuilder(),
					createJsonRecordBuilder()
			};
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void value(ScalarRecord_Substitution.Data record) {
			assertEquals("[0,1]", MyRange.toString(record.value()));
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void value_Null(ScalarRecord_Substitution.Data record) {
			assertTrue(record.value_Null().isEmpty());
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void value_Opt(ScalarRecord_Substitution.Data record) {
			assertTrue(record.value_Opt().isEmpty());
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void value_Opt_Null(ScalarRecord_Substitution.Data record) {
			assertTrue(record.value_Opt_Null().isNull());
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void list(ScalarRecord_Substitution.Data record) {
			var list = record.list();
			assertEquals(2, list.size());
			assertEquals("[0,1]", MyRange.toString(list.get(0)));
			assertEquals("[1,2]", MyRange.toString(list.get(1)));
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void list_Null(ScalarRecord_Substitution.Data record) {
			var list = record.list_Null();
			assertTrue(list.isEmpty());
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void list_Opt(ScalarRecord_Substitution.Data record) {
			var list = record.list_Opt();
			assertTrue(list.isEmpty());
		}

		@ParameterizedTest
		@org.junit.jupiter.params.provider.MethodSource("getRecords")
		void list_Opt_Null(ScalarRecord_Substitution.Data record) {
			var list = record.list_Opt_Null();
			assertTrue(list.isNull());
			assertFalse(list.isUndefined());
		}
	}
}
