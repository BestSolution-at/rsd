package dev.rsdlang.sample.client.model;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.function.Supplier;
import java.util.List;

import org.assertj.core.api.InstanceOfAssertFactories;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class PatchableRecordWithUnion_PatchTest extends BaseTest {
	static PatchableUnionA.Data unionA(PatchableUnionA.DataBuilder builder) {
		return builder
				.key("data-a")
				.version("v-1")
				.shared("shared-a")
				.valueA("value-a")
				.build();
	}

	static PatchableUnionB.Patch unionBPatch(PatchableUnionB.PatchBuilder builder) {
		return builder
				.key("patch-b")
				.version("v-1")
				.shared("shared-b")
				.valueB("value-b")
				.build();
	}

	@Nested
	class ListReplace {
		static PatchableRecordWithUnion.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecordWithUnionPatch);
			var record = readAvroFile("PatchableRecordWithUnion.ListReplace.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecordWithUnionPatchImpl.of(record);
		}

		static PatchableRecordWithUnion.Patch build(
				PatchableRecordWithUnion.PatchBuilder builder,
				Supplier<PatchableUnionA.DataBuilder> unionA) {
			return builder
					.key("k-1")
					.version("v-1")
					.value(unionA(unionA.get()))
					.value_Null(unionA(unionA.get()))
					.value_Opt(unionA(unionA.get()))
					.value_Opt_Null(unionA(unionA.get()))
					.list(List.of(unionA(unionA.get())))
					.list_Null(List.of(unionA(unionA.get())))
					.list_Opt(List.of(unionA(unionA.get())))
					.list_Opt_Null(List.of(unionA(unionA.get())))
					.build();
		}

		static PatchableRecordWithUnion.Patch createAvroBuilder() {
			return build(
					dev.rsdlang.sample.client.model.impl.avro.PatchableRecordWithUnionPatchImpl.builder(),
					dev.rsdlang.sample.client.model.impl.avro.PatchableUnionADataImpl::builder);
		}

		static PatchableRecordWithUnion.Patch createJsonBuilder() {
			return build(
					dev.rsdlang.sample.client.model.impl.json.PatchableRecordWithUnionPatchImpl.builder(),
					dev.rsdlang.sample.client.model.impl.json.PatchableUnionADataImpl::builder);
		}

		static PatchableRecordWithUnion.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecordWithUnion.ListReplace.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecordWithUnionPatchImpl.of(record);
		}

		static PatchableRecordWithUnion.Patch[] getRecords() {
			return new PatchableRecordWithUnion.Patch[] {
					createAvroRecord(),
					createAvroBuilder(),
					createJsonRecord(),
					createJsonBuilder()
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

		static PatchableRecordWithUnion.Patch build(
				PatchableRecordWithUnion.PatchBuilder builder,
				Supplier<PatchableUnionA.DataBuilder> unionA,
				Supplier<PatchableUnionB.PatchBuilder> unionB) {
			return builder
					.key("k-1")
					.version("v-1")
					.value(unionBPatch(unionB.get()))
					.value_Null(unionBPatch(unionB.get()))
					.value_Opt(unionBPatch(unionB.get()))
					.value_Opt_Null(unionBPatch(unionB.get()))
					.list(
							List.of(unionA(unionA.get())),
							List.of(unionBPatch(unionB.get())),
							List.of("k-1:v1"))
					.list_Null(
							List.of(unionA(unionA.get())),
							List.of(unionBPatch(unionB.get())),
							List.of("k-1:v1"))
					.list_Opt(
							List.of(unionA(unionA.get())),
							List.of(unionBPatch(unionB.get())),
							List.of("k-1:v1"))
					.list_Opt_Null(
							List.of(unionA(unionA.get())),
							List.of(unionBPatch(unionB.get())),
							List.of("k-1:v1"))
					.build();
		}

		static PatchableRecordWithUnion.Patch createAvroBuilderRecord() {
			return build(
					dev.rsdlang.sample.client.model.impl.avro.PatchableRecordWithUnionPatchImpl.builder(),
					dev.rsdlang.sample.client.model.impl.avro.PatchableUnionADataImpl::builder,
					dev.rsdlang.sample.client.model.impl.avro.PatchableUnionBPatchImpl::builder);
		}

		static PatchableRecordWithUnion.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecordWithUnion.ListMerge.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecordWithUnionPatchImpl.of(record);
		}

		static PatchableRecordWithUnion.Patch createJsonBuilderRecord() {
			return build(
					dev.rsdlang.sample.client.model.impl.json.PatchableRecordWithUnionPatchImpl.builder(),
					dev.rsdlang.sample.client.model.impl.json.PatchableUnionADataImpl::builder,
					dev.rsdlang.sample.client.model.impl.json.PatchableUnionBPatchImpl::builder);
		}

		static PatchableRecordWithUnion.Patch[] getRecords() {
			return new PatchableRecordWithUnion.Patch[] {
					createAvroRecord(),
					createJsonRecord(),
					createAvroBuilderRecord(),
					createJsonBuilderRecord()
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

		static PatchableRecordWithUnion.Patch build(PatchableRecordWithUnion.PatchBuilder builder) {
			return builder.key("k-1")
					.version("v-1")
					.build();
		}

		static PatchableRecordWithUnion.Patch createAvroBuilderRecord() {
			return build(dev.rsdlang.sample.client.model.impl.avro.PatchableRecordWithUnionPatchImpl.builder());
		}

		static PatchableRecordWithUnion.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecordWithUnion.Minimal.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecordWithUnionPatchImpl.of(record);
		}

		static PatchableRecordWithUnion.Patch createJsonBuilderRecord() {
			return build(dev.rsdlang.sample.client.model.impl.json.PatchableRecordWithUnionPatchImpl.builder());
		}

		static PatchableRecordWithUnion.Patch[] getRecords() {
			return new PatchableRecordWithUnion.Patch[] {
					createAvroRecord(),
					createJsonRecord(),
					createAvroBuilderRecord(),
					createJsonBuilderRecord()
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

		static PatchableRecordWithUnion.Patch build(PatchableRecordWithUnion.PatchBuilder builder) {
			return builder
					.key("k-1")
					.version("v-1")
					.value_NullNull()
					.value_OptNull()
					.value_Opt_NullNull()
					.list_NullNull()
					.list_OptNull()
					.list_Opt_NullNull()
					.build();
		}

		static PatchableRecordWithUnion.Patch createAvroBuilderRecord() {
			return build(dev.rsdlang.sample.client.model.impl.avro.PatchableRecordWithUnionPatchImpl.builder());
		}

		static PatchableRecordWithUnion.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecordWithUnion.Null.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecordWithUnionPatchImpl.of(record);
		}

		static PatchableRecordWithUnion.Patch createJsonBuilderRecord() {
			return build(dev.rsdlang.sample.client.model.impl.json.PatchableRecordWithUnionPatchImpl.builder());
		}

		static PatchableRecordWithUnion.Patch[] getRecords() {
			return new PatchableRecordWithUnion.Patch[] {
					createAvroRecord(),
					createJsonRecord(),
					createAvroBuilderRecord(),
					createJsonBuilderRecord()
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
