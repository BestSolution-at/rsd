package dev.rsdlang.sample.client.model;

import static org.assertj.core.api.Assertions.assertThat;

import org.assertj.core.api.InstanceOfAssertFactories;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class PatchableRecordWithUnion_PatchTest extends BaseTest {
	@Nested
	class ListReplace {
		static PatchableRecordWithUnion.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecordWithUnionPatch);
			var record = readAvroFile("PatchableRecordWithUnion.ListReplace.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecordWithUnionPatchImpl.of(record);
		}

		static PatchableRecordWithUnion.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecordWithUnion.ListReplace.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecordWithUnionPatchImpl.of(record);
		}

		static PatchableRecordWithUnion.Patch[] getRecords() {
			return new PatchableRecordWithUnion.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecordWithUnion.Patch record) {
			assertThat(record.key())
					.isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecordWithUnion.Patch record) {
			assertThat(record.version())
					.isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionA.Data.class))
					.extracting(PatchableUnionA.Data::key)
					.isEqualTo("data-a");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionA.Data.class))
					.extracting(PatchableUnionA.Data::key)
					.isEqualTo("data-a");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value_Opt().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionA.Data.class))
					.extracting(PatchableUnionA.Data::key)
					.isEqualTo("data-a");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionA.Data.class))
					.extracting(PatchableUnionA.Data::key)
					.isEqualTo("data-a");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.ListSetChange.class))
					.extracting(PatchableRecordWithUnion.Patch.ListSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableUnionA.Data.class))
					.singleElement()
					.extracting(PatchableUnionA.Data::key)
					.isEqualTo("data-a");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.List_NullSetChange.class))
					.extracting(PatchableRecordWithUnion.Patch.List_NullSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableUnionA.Data.class))
					.singleElement()
					.extracting(PatchableUnionA.Data::key)
					.isEqualTo("data-a");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list_Opt().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.List_OptSetChange.class))
					.extracting(PatchableRecordWithUnion.Patch.List_OptSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableUnionA.Data.class))
					.singleElement()
					.extracting(PatchableUnionA.Data::key)
					.isEqualTo("data-a");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.List_Opt_NullSetChange.class))
					.extracting(PatchableRecordWithUnion.Patch.List_Opt_NullSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableUnionA.Data.class))
					.singleElement()
					.extracting(PatchableUnionA.Data::key)
					.isEqualTo("data-a");
		}
	}

	@Nested
	class ListMerge {
		static PatchableRecordWithUnion.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecordWithUnionPatch);
			var record = readAvroFile("PatchableRecordWithUnion.ListMerge.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecordWithUnionPatchImpl.of(record);
		}

		static PatchableRecordWithUnion.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecordWithUnion.ListMerge.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecordWithUnionPatchImpl.of(record);
		}

		static PatchableRecordWithUnion.Patch[] getRecords() {
			return new PatchableRecordWithUnion.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecordWithUnion.Patch record) {
			assertThat(record.key())
					.isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecordWithUnion.Patch record) {
			assertThat(record.version())
					.isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionB.Patch.class))
					.extracting(PatchableUnionB.Patch::key)
					.isEqualTo("patch-b");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionB.Patch.class))
					.extracting(PatchableUnionB.Patch::key)
					.isEqualTo("patch-b");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value_Opt().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionB.Patch.class))
					.extracting(PatchableUnionB.Patch::key)
					.isEqualTo("patch-b");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionB.Patch.class))
					.extracting(PatchableUnionB.Patch::key)
					.isEqualTo("patch-b");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.ListMergeChange.class))
					.extracting(PatchableRecordWithUnion.Patch.ListMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableUnionA.Data.class))
					.singleElement()
					.extracting(PatchableUnionA.Data::key)
					.isEqualTo("data-a");
			assertThat(record.list())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.ListMergeChange.class))
					.extracting(PatchableRecordWithUnion.Patch.ListMergeChange::updates)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableUnionB.Patch.class))
					.singleElement()
					.extracting(PatchableUnionB.Patch::key)
					.isEqualTo("patch-b");
			assertThat(record.list())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.ListMergeChange.class))
					.extracting(PatchableRecordWithUnion.Patch.ListMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(String.class))
					.singleElement()
					.isEqualTo("k-1:v1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.List_NullMergeChange.class))
					.extracting(PatchableRecordWithUnion.Patch.List_NullMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableUnionA.Data.class))
					.singleElement()
					.extracting(PatchableUnionA.Data::key)
					.isEqualTo("data-a");
			assertThat(record.list_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.List_NullMergeChange.class))
					.extracting(PatchableRecordWithUnion.Patch.List_NullMergeChange::updates)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableUnionB.Patch.class))
					.singleElement()
					.extracting(PatchableUnionB.Patch::key)
					.isEqualTo("patch-b");
			assertThat(record.list_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.List_NullMergeChange.class))
					.extracting(PatchableRecordWithUnion.Patch.List_NullMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(String.class))
					.singleElement()
					.isEqualTo("k-1:v1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list_Opt().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.List_OptMergeChange.class))
					.extracting(PatchableRecordWithUnion.Patch.List_OptMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableUnionA.Data.class))
					.singleElement()
					.extracting(PatchableUnionA.Data::key)
					.isEqualTo("data-a");
			assertThat(record.list_Opt().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.List_OptMergeChange.class))
					.extracting(PatchableRecordWithUnion.Patch.List_OptMergeChange::updates)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableUnionB.Patch.class))
					.singleElement()
					.extracting(PatchableUnionB.Patch::key)
					.isEqualTo("patch-b");
			assertThat(record.list_Opt().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.List_OptMergeChange.class))
					.extracting(PatchableRecordWithUnion.Patch.List_OptMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(String.class))
					.singleElement()
					.isEqualTo("k-1:v1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.List_Opt_NullMergeChange.class))
					.extracting(PatchableRecordWithUnion.Patch.List_Opt_NullMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableUnionA.Data.class))
					.singleElement()
					.extracting(PatchableUnionA.Data::key)
					.isEqualTo("data-a");
			assertThat(record.list_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.List_Opt_NullMergeChange.class))
					.extracting(PatchableRecordWithUnion.Patch.List_Opt_NullMergeChange::updates)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableUnionB.Patch.class))
					.singleElement()
					.extracting(PatchableUnionB.Patch::key)
					.isEqualTo("patch-b");
			assertThat(record.list_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordWithUnion.Patch.List_Opt_NullMergeChange.class))
					.extracting(PatchableRecordWithUnion.Patch.List_Opt_NullMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(String.class))
					.singleElement()
					.isEqualTo("k-1:v1");
		}
	}

	@Nested
	class Minimal {
		static PatchableRecordWithUnion.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecordWithUnionPatch);
			var record = readAvroFile("PatchableRecordWithUnion.Minimal.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecordWithUnionPatchImpl.of(record);
		}

		static PatchableRecordWithUnion.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecordWithUnion.Minimal.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecordWithUnionPatchImpl.of(record);
		}

		static PatchableRecordWithUnion.Patch[] getRecords() {
			return new PatchableRecordWithUnion.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecordWithUnion.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecordWithUnion.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value_Null().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value_Opt().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value_Opt_Null().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list_Null().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list_Opt().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list_Opt_Null().isUndefined()).isTrue();
		}
	}

	@Nested
	class Null {
		static PatchableRecordWithUnion.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecordWithUnionPatch);
			var record = readAvroFile("PatchableRecordWithUnion.Null.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecordWithUnionPatchImpl.of(record);
		}

		static PatchableRecordWithUnion.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecordWithUnion.Null.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecordWithUnionPatchImpl.of(record);
		}

		static PatchableRecordWithUnion.Patch[] getRecords() {
			return new PatchableRecordWithUnion.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecordWithUnion.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecordWithUnion.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value_Null().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value_Opt().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.value_Opt_Null().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list_Null().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list_Opt().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableRecordWithUnion.Patch record) {
			assertThat(record.list_Opt_Null().isNull()).isTrue();
		}
	}
}
