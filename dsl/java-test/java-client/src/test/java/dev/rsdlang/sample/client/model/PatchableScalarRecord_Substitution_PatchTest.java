package dev.rsdlang.sample.client.model;

import static org.assertj.core.api.Assertions.assertThat;

import org.assertj.core.api.InstanceOfAssertFactories;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.MyRange;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class PatchableScalarRecord_Substitution_PatchTest extends BaseTest {
	@Nested
	class ListReplace {
		static PatchableScalarRecord_Substitution.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableScalarRecord_SubstitutionPatch);
			var record = readAvroFile("PatchableScalarRecord_Substitution.ListReplace.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableScalarRecord_SubstitutionPatchImpl.of(record);
		}

		static PatchableScalarRecord_Substitution.Patch createJsonRecord() {
			var record = readJsonFile("PatchableScalarRecord_Substitution.ListReplace.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableScalarRecord_SubstitutionPatchImpl.of(record);
		}

		static PatchableScalarRecord_Substitution.Patch[] getRecords() {
			return new PatchableScalarRecord_Substitution.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.key())
					.isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.version())
					.isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value())
					.map(e -> MyRange.toString(e))
					.isPresent()
					.contains("[0,1]");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value_Null().toOptional())
					.map(e -> MyRange.toString(e))
					.isPresent()
					.contains("[0,1]");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value_Opt().toOptional())
					.map(e -> MyRange.toString(e))
					.isPresent()
					.contains("[0,1]");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt_Null(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value_Opt_Null().toOptional())
					.map(e -> MyRange.toString(e))
					.isPresent()
					.contains("[0,1]");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list())
					.isPresent()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableScalarRecord_Substitution.Patch.ListSetChange.class))
					.extracting(PatchableScalarRecord_Substitution.Patch.ListSetChange::elements,
							InstanceOfAssertFactories.collection(MyRange.class))
					.singleElement()
					.extracting(e -> MyRange.toString(e))
					.isEqualTo("[0,1]");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list_Null().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(
							InstanceOfAssertFactories.type(PatchableScalarRecord_Substitution.Patch.List_NullSetChange.class))
					.extracting(PatchableScalarRecord_Substitution.Patch.List_NullSetChange::elements,
							InstanceOfAssertFactories.collection(MyRange.class))
					.singleElement()
					.extracting(e -> MyRange.toString(e))
					.isEqualTo("[0,1]");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list_Opt().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(
							InstanceOfAssertFactories.type(PatchableScalarRecord_Substitution.Patch.List_OptSetChange.class))
					.extracting(PatchableScalarRecord_Substitution.Patch.List_OptSetChange::elements,
							InstanceOfAssertFactories.collection(MyRange.class))
					.singleElement()
					.extracting(e -> MyRange.toString(e))
					.isEqualTo("[0,1]");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list_Opt_Null().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(
							InstanceOfAssertFactories.type(PatchableScalarRecord_Substitution.Patch.List_Opt_NullSetChange.class))
					.extracting(PatchableScalarRecord_Substitution.Patch.List_Opt_NullSetChange::elements,
							InstanceOfAssertFactories.collection(MyRange.class))
					.singleElement()
					.extracting(e -> MyRange.toString(e))
					.isEqualTo("[0,1]");
		}
	}

	@Nested
	class ListMerge {
		static PatchableScalarRecord_Substitution.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableScalarRecord_SubstitutionPatch);
			var record = readAvroFile("PatchableScalarRecord_Substitution.ListMerge.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableScalarRecord_SubstitutionPatchImpl.of(record);
		}

		static PatchableScalarRecord_Substitution.Patch createJsonRecord() {
			var record = readJsonFile("PatchableScalarRecord_Substitution.ListMerge.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableScalarRecord_SubstitutionPatchImpl.of(record);
		}

		static PatchableScalarRecord_Substitution.Patch[] getRecords() {
			return new PatchableScalarRecord_Substitution.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.key())
					.isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.version())
					.isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value())
					.map(e -> MyRange.toString(e))
					.isPresent()
					.contains("[0,1]");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value_Null().toOptional())
					.map(e -> MyRange.toString(e))
					.isPresent()
					.contains("[0,1]");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value_Opt().toOptional())
					.map(e -> MyRange.toString(e))
					.isPresent()
					.contains("[0,1]");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt_Null(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value_Opt_Null().toOptional())
					.map(e -> MyRange.toString(e))
					.isPresent()
					.contains("[0,1]");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list())
					.isPresent()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableScalarRecord_Substitution.Patch.ListMergeChange.class))
					.extracting(PatchableScalarRecord_Substitution.Patch.ListMergeChange::additions,
							InstanceOfAssertFactories.collection(MyRange.class))
					.singleElement()
					.extracting(e -> MyRange.toString(e))
					.isEqualTo("[0,1]");
			assertThat(record.list())
					.isPresent()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableScalarRecord_Substitution.Patch.ListMergeChange.class))
					.extracting(PatchableScalarRecord_Substitution.Patch.ListMergeChange::removals,
							InstanceOfAssertFactories.collection(MyRange.class))
					.singleElement()
					.extracting(e -> MyRange.toString(e))
					.isEqualTo("[1,2]");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list_Null().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(
							InstanceOfAssertFactories.type(PatchableScalarRecord_Substitution.Patch.List_NullMergeChange.class))
					.extracting(PatchableScalarRecord_Substitution.Patch.List_NullMergeChange::additions,
							InstanceOfAssertFactories.collection(MyRange.class))
					.singleElement()
					.extracting(e -> MyRange.toString(e))
					.isEqualTo("[0,1]");
			assertThat(record.list_Null().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(
							InstanceOfAssertFactories.type(PatchableScalarRecord_Substitution.Patch.List_NullMergeChange.class))
					.extracting(PatchableScalarRecord_Substitution.Patch.List_NullMergeChange::removals,
							InstanceOfAssertFactories.collection(MyRange.class))
					.singleElement()
					.extracting(e -> MyRange.toString(e))
					.isEqualTo("[1,2]");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list_Opt().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(
							InstanceOfAssertFactories.type(PatchableScalarRecord_Substitution.Patch.List_OptMergeChange.class))
					.extracting(PatchableScalarRecord_Substitution.Patch.List_OptMergeChange::additions,
							InstanceOfAssertFactories.collection(MyRange.class))
					.singleElement()
					.extracting(e -> MyRange.toString(e))
					.isEqualTo("[0,1]");
			assertThat(record.list_Opt().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(
							InstanceOfAssertFactories.type(PatchableScalarRecord_Substitution.Patch.List_OptMergeChange.class))
					.extracting(PatchableScalarRecord_Substitution.Patch.List_OptMergeChange::removals,
							InstanceOfAssertFactories.collection(MyRange.class))
					.singleElement()
					.extracting(e -> MyRange.toString(e))
					.isEqualTo("[1,2]");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list_Opt_Null().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(
							InstanceOfAssertFactories.type(PatchableScalarRecord_Substitution.Patch.List_Opt_NullMergeChange.class))
					.extracting(PatchableScalarRecord_Substitution.Patch.List_Opt_NullMergeChange::additions,
							InstanceOfAssertFactories.collection(MyRange.class))
					.singleElement()
					.extracting(e -> MyRange.toString(e))
					.isEqualTo("[0,1]");
			assertThat(record.list_Opt_Null().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(
							InstanceOfAssertFactories.type(PatchableScalarRecord_Substitution.Patch.List_Opt_NullMergeChange.class))
					.extracting(PatchableScalarRecord_Substitution.Patch.List_Opt_NullMergeChange::removals,
							InstanceOfAssertFactories.collection(MyRange.class))
					.singleElement()
					.extracting(e -> MyRange.toString(e))
					.isEqualTo("[1,2]");
		}
	}

	@Nested
	class Minimal {
		static PatchableScalarRecord_Substitution.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableScalarRecord_SubstitutionPatch);
			var record = readAvroFile("PatchableScalarRecord_Substitution.Minimal.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableScalarRecord_SubstitutionPatchImpl.of(record);
		}

		static PatchableScalarRecord_Substitution.Patch createJsonRecord() {
			var record = readJsonFile("PatchableScalarRecord_Substitution.Minimal.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableScalarRecord_SubstitutionPatchImpl.of(record);
		}

		static PatchableScalarRecord_Substitution.Patch[] getRecords() {
			return new PatchableScalarRecord_Substitution.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Null(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value_Null().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value_Opt().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt_Null(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value_Opt_Null().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list_Null().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list_Opt().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list_Opt_Null().isUndefined()).isTrue();
		}
	}

	@Nested
	class Null {
		static PatchableScalarRecord_Substitution.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableScalarRecord_SubstitutionPatch);
			var record = readAvroFile("PatchableScalarRecord_Substitution.Null.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableScalarRecord_SubstitutionPatchImpl.of(record);
		}

		static PatchableScalarRecord_Substitution.Patch createJsonRecord() {
			var record = readJsonFile("PatchableScalarRecord_Substitution.Null.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableScalarRecord_SubstitutionPatchImpl.of(record);
		}

		static PatchableScalarRecord_Substitution.Patch[] getRecords() {
			return new PatchableScalarRecord_Substitution.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Null(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value_Null().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value_Opt().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt_Null(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.value_Opt_Null().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list_Null().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list_Opt().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableScalarRecord_Substitution.Patch record) {
			assertThat(record.list_Opt_Null().isNull()).isTrue();
		}
	}
}
