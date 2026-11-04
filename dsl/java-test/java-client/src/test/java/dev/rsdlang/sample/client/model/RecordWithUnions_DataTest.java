package dev.rsdlang.sample.client.model;

import static org.assertj.core.api.Assertions.assertThat;

import org.assertj.core.api.InstanceOfAssertFactories;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class RecordWithUnions_DataTest extends BaseTest {
	@Nested
	class Filled {
		static RecordWithUnions.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.RecordWithUnions);
			var record = readAvroFile("RecordWithUnions.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.RecordWithUnionsDataImpl.of(record);
		}

		static RecordWithUnions.Data createJsonRecord() {
			var record = readJsonFile("RecordWithUnions.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.RecordWithUnionsDataImpl.of(record);
		}

		static RecordWithUnions.Data[] getRecords() {
			return new RecordWithUnions.Data[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(RecordWithUnions.Data record) {
			assertThat(record.value())
					.asInstanceOf(InstanceOfAssertFactories.type(UnionA.Data.class))
					.extracting(Union.Data::shared, UnionA.Data::valueA)
					.containsExactly("Shared of A", "A");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(RecordWithUnions.Data record) {
			assertThat(record.value_Null()).isPresent().get()
					.asInstanceOf(InstanceOfAssertFactories.type(UnionB.Data.class))
					.extracting(Union.Data::shared, UnionB.Data::valueB)
					.containsExactly("Shared of B", "B");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(RecordWithUnions.Data record) {
			assertThat(record.value_Opt()).isPresent().get()
					.asInstanceOf(InstanceOfAssertFactories.type(UnionA.Data.class))
					.extracting(Union.Data::shared, UnionA.Data::valueA)
					.containsExactly("Shared of A", "A");
			;
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOptNull(RecordWithUnions.Data record) {
			assertThat(record.value_Opt_Null().toOptional()).isPresent().get()
					.asInstanceOf(InstanceOfAssertFactories.type(UnionB.Data.class))
					.extracting(Union.Data::shared, UnionB.Data::valueB)
					.containsExactly("Shared of B", "B");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(RecordWithUnions.Data record) {
			var list = record.list();

			assertThat(list).isNotEmpty();
			assertThat(list).hasSize(2);

			assertThat(list).element(0)
					.asInstanceOf(InstanceOfAssertFactories.type(UnionA.Data.class))
					.extracting(UnionA.Data::shared, UnionA.Data::valueA)
					.containsExactly("Shared of A", "A");

			assertThat(list).element(1)
					.asInstanceOf(InstanceOfAssertFactories.type(UnionB.Data.class))
					.extracting(UnionB.Data::shared, UnionB.Data::valueB)
					.containsExactly("Shared of B", "B");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listNull(RecordWithUnions.Data record) {
			var data = record.list_Null();

			var list = assertThat(data).isPresent().get().actual();
			assertThat(list).isNotEmpty();
			assertThat(list).hasSize(2);

			assertThat(list).element(0)
					.asInstanceOf(InstanceOfAssertFactories.type(UnionA.Data.class))
					.extracting(UnionA.Data::shared, UnionA.Data::valueA)
					.containsExactly("Shared of A", "A");

			assertThat(list).element(1)
					.asInstanceOf(InstanceOfAssertFactories.type(UnionB.Data.class))
					.extracting(UnionB.Data::shared, UnionB.Data::valueB)
					.containsExactly("Shared of B", "B");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOpt(RecordWithUnions.Data record) {
			var data = record.list_Opt();

			var list = assertThat(data).isPresent().get().actual();
			assertThat(list).isNotEmpty();
			assertThat(list).hasSize(2);

			assertThat(list).element(0)
					.asInstanceOf(InstanceOfAssertFactories.type(UnionA.Data.class))
					.extracting(UnionA.Data::shared, UnionA.Data::valueA)
					.containsExactly("Shared of A", "A");

			assertThat(list).element(1)
					.asInstanceOf(InstanceOfAssertFactories.type(UnionB.Data.class))
					.extracting(UnionB.Data::shared, UnionB.Data::valueB)
					.containsExactly("Shared of B", "B");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOptNull(RecordWithUnions.Data record) {
			var data = record.list_Opt_Null().toOptional();

			var list = assertThat(data).isPresent().get().actual();
			assertThat(list).isNotEmpty();
			assertThat(list).hasSize(2);

			assertThat(list).element(0)
					.asInstanceOf(InstanceOfAssertFactories.type(UnionA.Data.class))
					.extracting(UnionA.Data::shared, UnionA.Data::valueA)
					.containsExactly("Shared of A", "A");

			assertThat(list).element(1)
					.asInstanceOf(InstanceOfAssertFactories.type(UnionB.Data.class))
					.extracting(UnionB.Data::shared, UnionB.Data::valueB)
					.containsExactly("Shared of B", "B");
		}
	}

	@Nested
	class Null {
		static RecordWithUnions.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.RecordWithUnions);
			var record = readAvroFile("RecordWithUnions.Null.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.RecordWithUnionsDataImpl.of(record);
		}

		static RecordWithUnions.Data createJsonRecord() {
			var record = readJsonFile("RecordWithUnions.Null.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.RecordWithUnionsDataImpl.of(record);
		}

		static RecordWithUnions.Data[] getRecords() {
			return new RecordWithUnions.Data[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(RecordWithUnions.Data record) {
			assertThat(record.value())
					.asInstanceOf(InstanceOfAssertFactories.type(UnionA.Data.class))
					.extracting(Union.Data::shared, UnionA.Data::valueA)
					.containsExactly("Shared of A", "A");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(RecordWithUnions.Data record) {
			assertThat(record.value_Null()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(RecordWithUnions.Data record) {
			assertThat(record.value_Opt()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOptNull(RecordWithUnions.Data record) {
			assertThat(record.value_Opt_Null().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(RecordWithUnions.Data record) {
			var list = record.list();

			assertThat(list).isNotEmpty();
			assertThat(list).hasSize(2);

			assertThat(list).element(0)
					.asInstanceOf(InstanceOfAssertFactories.type(UnionA.Data.class))
					.extracting(UnionA.Data::shared, UnionA.Data::valueA)
					.containsExactly("Shared of A", "A");

			assertThat(list).element(1)
					.asInstanceOf(InstanceOfAssertFactories.type(UnionB.Data.class))
					.extracting(UnionB.Data::shared, UnionB.Data::valueB)
					.containsExactly("Shared of B", "B");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listNull(RecordWithUnions.Data record) {
			assertThat(record.list_Null()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOpt(RecordWithUnions.Data record) {
			assertThat(record.list_Opt()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOptNull(RecordWithUnions.Data record) {
			assertThat(record.list_Opt_Null().isNull()).isTrue();
		}
	}

	@Nested
	class Minimal {
		static RecordWithUnions.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.RecordWithUnions);
			var record = readAvroFile("RecordWithUnions.Minimal.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.RecordWithUnionsDataImpl.of(record);
		}

		static RecordWithUnions.Data createJsonRecord() {
			var record = readJsonFile("RecordWithUnions.Minimal.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.RecordWithUnionsDataImpl.of(record);
		}

		static RecordWithUnions.Data[] getRecords() {
			return new RecordWithUnions.Data[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(RecordWithUnions.Data record) {
			assertThat(record.value())
					.asInstanceOf(InstanceOfAssertFactories.type(UnionA.Data.class))
					.extracting(Union.Data::shared, UnionA.Data::valueA)
					.containsExactly("Shared of A", "A");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(RecordWithUnions.Data record) {
			assertThat(record.value_Null()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(RecordWithUnions.Data record) {
			assertThat(record.value_Opt()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOptNull(RecordWithUnions.Data record) {
			assertThat(record.value_Opt_Null().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(RecordWithUnions.Data record) {
			var list = record.list();

			assertThat(list).isNotEmpty();
			assertThat(list).hasSize(2);

			assertThat(list).element(0)
					.asInstanceOf(InstanceOfAssertFactories.type(UnionA.Data.class))
					.extracting(UnionA.Data::shared, UnionA.Data::valueA)
					.containsExactly("Shared of A", "A");

			assertThat(list).element(1)
					.asInstanceOf(InstanceOfAssertFactories.type(UnionB.Data.class))
					.extracting(UnionB.Data::shared, UnionB.Data::valueB)
					.containsExactly("Shared of B", "B");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listNull(RecordWithUnions.Data record) {
			assertThat(record.list_Null()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOpt(RecordWithUnions.Data record) {
			assertThat(record.list_Opt()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOptNull(RecordWithUnions.Data record) {
			assertThat(record.list_Opt_Null().isUndefined()).isTrue();
		}
	}
}
