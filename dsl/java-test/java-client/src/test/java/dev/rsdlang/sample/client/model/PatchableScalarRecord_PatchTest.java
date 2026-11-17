package dev.rsdlang.sample.client.model;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

import org.assertj.core.api.InstanceOfAssertFactories;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class PatchableScalarRecord_PatchTest extends BaseTest {
	@Nested
	class ListReplace {
		static PatchableScalarRecord.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableScalarRecordPatch);
			var record = readAvroFile("PatchableScalarRecord.ListReplace.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableScalarRecordPatchImpl.of(record);
		}

		static PatchableScalarRecord.Patch build(PatchableScalarRecord.PatchBuilder builder) {
			return builder.key("k-1")
					.version("v-1")
					.value(ZoneId.of("Europe/Paris"))
					.value_Null(ZoneId.of("Europe/Paris"))
					.value_Opt(ZoneId.of("Europe/Paris"))
					.value_Opt_Null(ZoneId.of("Europe/Paris"))
					.list(List.of(ZoneId.of("Europe/Paris")))
					.list_Null(List.of(ZoneId.of("Europe/Paris")))
					.list_Opt(List.of(ZoneId.of("Europe/Paris")))
					.list_Opt_Null(List.of(ZoneId.of("Europe/Paris")))
					.build();
		}

		static PatchableScalarRecord.Patch createAvroRecordBuilder() {
			return build(dev.rsdlang.sample.client.model.impl.avro.PatchableScalarRecordPatchImpl.builder());
		}

		static PatchableScalarRecord.Patch createJsonRecord() {
			var record = readJsonFile("PatchableScalarRecord.ListReplace.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableScalarRecordPatchImpl.of(record);
		}

		static PatchableScalarRecord.Patch createJsonRecordBuilder() {
			return build(dev.rsdlang.sample.client.model.impl.json.PatchableScalarRecordPatchImpl.builder());
		}

		static PatchableScalarRecord.Patch[] getRecords() {
			return new PatchableScalarRecord.Patch[] {
					createAvroRecord(),
					createAvroRecordBuilder(),
					createJsonRecord(),
					createJsonRecordBuilder()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableScalarRecord.Patch record) {
			assertThat(record.key())
					.isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableScalarRecord.Patch record) {
			assertThat(record.version())
					.isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableScalarRecord.Patch record) {
			assertThat(record.value())
					.map(e -> e.value())
					.isPresent()
					.contains("Europe/Paris");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(PatchableScalarRecord.Patch record) {
			assertThat(record.value_Null().toOptional())
					.map(e -> e.value())
					.isPresent()
					.contains("Europe/Paris");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(PatchableScalarRecord.Patch record) {
			assertThat(record.value_Opt().toOptional())
					.map(e -> e.value())
					.isPresent()
					.contains("Europe/Paris");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt_Null(PatchableScalarRecord.Patch record) {
			assertThat(record.value_Opt_Null().toOptional())
					.map(e -> e.value())
					.isPresent()
					.contains("Europe/Paris");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableScalarRecord.Patch record) {
			assertThat(record.list())
					.isPresent()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableScalarRecord.Patch.ListSetChange.class))
					.extracting(PatchableScalarRecord.Patch.ListSetChange::elements,
							InstanceOfAssertFactories.collection(ZoneId.class))
					.singleElement()
					.extracting(e -> e.value())
					.isEqualTo("Europe/Paris");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableScalarRecord.Patch record) {
			assertThat(record.list_Null().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableScalarRecord.Patch.List_NullSetChange.class))
					.extracting(PatchableScalarRecord.Patch.List_NullSetChange::elements,
							InstanceOfAssertFactories.collection(ZoneId.class))
					.singleElement()
					.extracting(e -> e.value())
					.isEqualTo("Europe/Paris");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableScalarRecord.Patch record) {
			assertThat(record.list_Opt().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableScalarRecord.Patch.List_OptSetChange.class))
					.extracting(PatchableScalarRecord.Patch.List_OptSetChange::elements,
							InstanceOfAssertFactories.collection(ZoneId.class))
					.singleElement()
					.extracting(e -> e.value())
					.isEqualTo("Europe/Paris");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableScalarRecord.Patch record) {
			assertThat(record.list_Opt_Null().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableScalarRecord.Patch.List_Opt_NullSetChange.class))
					.extracting(PatchableScalarRecord.Patch.List_Opt_NullSetChange::elements,
							InstanceOfAssertFactories.collection(ZoneId.class))
					.singleElement()
					.extracting(e -> e.value())
					.isEqualTo("Europe/Paris");
		}
	}

	@Nested
	class ListMerge {
		static PatchableScalarRecord.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableScalarRecordPatch);
			var record = readAvroFile("PatchableScalarRecord.ListMerge.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableScalarRecordPatchImpl.of(record);
		}

		static PatchableScalarRecord.Patch build(PatchableScalarRecord.PatchBuilder builder) {
			return builder
					.key("k-1")
					.version("v-1")
					.value(ZoneId.of("Europe/Paris"))
					.value_Null(ZoneId.of("Europe/Paris"))
					.value_Opt(ZoneId.of("Europe/Paris"))
					.value_Opt_Null(ZoneId.of("Europe/Paris"))
					.list(
							List.of(ZoneId.of("Europe/Paris")),
							List.of(ZoneId.of("Europe/Vienna")))
					.list_Null(
							List.of(ZoneId.of("Europe/Paris")),
							List.of(ZoneId.of("Europe/Vienna")))
					.list_Opt(
							List.of(ZoneId.of("Europe/Paris")),
							List.of(ZoneId.of("Europe/Vienna")))
					.list_Opt_Null(
							List.of(ZoneId.of("Europe/Paris")),
							List.of(ZoneId.of("Europe/Vienna")))
					.build();
		}

		static PatchableScalarRecord.Patch createAvroBuilder() {
			return build(dev.rsdlang.sample.client.model.impl.avro.PatchableScalarRecordPatchImpl.builder());
		}

		static PatchableScalarRecord.Patch createJsonRecord() {
			var record = readJsonFile("PatchableScalarRecord.ListMerge.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableScalarRecordPatchImpl.of(record);
		}

		static PatchableScalarRecord.Patch createJsonBuilder() {
			return build(dev.rsdlang.sample.client.model.impl.json.PatchableScalarRecordPatchImpl.builder());
		}

		static PatchableScalarRecord.Patch[] getRecords() {
			return new PatchableScalarRecord.Patch[] {
					createAvroRecord(),
					createJsonRecord(),
					createAvroBuilder(),
					createJsonBuilder()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableScalarRecord.Patch record) {
			assertThat(record.key())
					.isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableScalarRecord.Patch record) {
			assertThat(record.version())
					.isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableScalarRecord.Patch record) {
			assertThat(record.value())
					.map(e -> e.value())
					.isPresent()
					.contains("Europe/Paris");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(PatchableScalarRecord.Patch record) {
			assertThat(record.value_Null().toOptional())
					.map(e -> e.value())
					.isPresent()
					.contains("Europe/Paris");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(PatchableScalarRecord.Patch record) {
			assertThat(record.value_Opt().toOptional())
					.map(e -> e.value())
					.isPresent()
					.contains("Europe/Paris");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt_Null(PatchableScalarRecord.Patch record) {
			assertThat(record.value_Opt_Null().toOptional())
					.map(e -> e.value())
					.isPresent()
					.contains("Europe/Paris");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableScalarRecord.Patch record) {
			assertThat(record.list())
					.isPresent()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableScalarRecord.Patch.ListMergeChange.class))
					.extracting(PatchableScalarRecord.Patch.ListMergeChange::additions,
							InstanceOfAssertFactories.collection(ZoneId.class))
					.singleElement()
					.extracting(e -> e.value())
					.isEqualTo("Europe/Paris");
			assertThat(record.list())
					.isPresent()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableScalarRecord.Patch.ListMergeChange.class))
					.extracting(PatchableScalarRecord.Patch.ListMergeChange::removals,
							InstanceOfAssertFactories.collection(ZoneId.class))
					.singleElement()
					.extracting(e -> e.value())
					.isEqualTo("Europe/Vienna");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableScalarRecord.Patch record) {
			assertThat(record.list_Null().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableScalarRecord.Patch.List_NullMergeChange.class))
					.extracting(PatchableScalarRecord.Patch.List_NullMergeChange::additions,
							InstanceOfAssertFactories.collection(ZoneId.class))
					.singleElement()
					.extracting(e -> e.value())
					.isEqualTo("Europe/Paris");
			assertThat(record.list_Null().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableScalarRecord.Patch.List_NullMergeChange.class))
					.extracting(PatchableScalarRecord.Patch.List_NullMergeChange::removals,
							InstanceOfAssertFactories.collection(ZoneId.class))
					.singleElement()
					.extracting(e -> e.value())
					.isEqualTo("Europe/Vienna");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableScalarRecord.Patch record) {
			assertThat(record.list_Opt().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableScalarRecord.Patch.List_OptMergeChange.class))
					.extracting(PatchableScalarRecord.Patch.List_OptMergeChange::additions,
							InstanceOfAssertFactories.collection(ZoneId.class))
					.singleElement()
					.extracting(e -> e.value())
					.isEqualTo("Europe/Paris");
			assertThat(record.list_Opt().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableScalarRecord.Patch.List_OptMergeChange.class))
					.extracting(PatchableScalarRecord.Patch.List_OptMergeChange::removals,
							InstanceOfAssertFactories.collection(ZoneId.class))
					.singleElement()
					.extracting(e -> e.value())
					.isEqualTo("Europe/Vienna");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableScalarRecord.Patch record) {
			assertThat(record.list_Opt_Null().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableScalarRecord.Patch.List_Opt_NullMergeChange.class))
					.extracting(PatchableScalarRecord.Patch.List_Opt_NullMergeChange::additions,
							InstanceOfAssertFactories.collection(ZoneId.class))
					.singleElement()
					.extracting(e -> e.value())
					.isEqualTo("Europe/Paris");
			assertThat(record.list_Opt_Null().toOptional())
					.isPresent()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableScalarRecord.Patch.List_Opt_NullMergeChange.class))
					.extracting(PatchableScalarRecord.Patch.List_Opt_NullMergeChange::removals,
							InstanceOfAssertFactories.collection(ZoneId.class))
					.singleElement()
					.extracting(e -> e.value())
					.isEqualTo("Europe/Vienna");
		}
	}

	@Nested
	class Minimal {
		static PatchableScalarRecord.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableScalarRecordPatch);
			var record = readAvroFile("PatchableScalarRecord.Minimal.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableScalarRecordPatchImpl.of(record);
		}

		static PatchableScalarRecord.Patch build(PatchableScalarRecord.PatchBuilder builder) {
			return builder
					.key("k-1")
					.version("v-1")
					.build();
		}

		static PatchableScalarRecord.Patch createAvroBuilder() {
			return build(dev.rsdlang.sample.client.model.impl.avro.PatchableScalarRecordPatchImpl.builder());
		}

		static PatchableScalarRecord.Patch createJsonRecord() {
			var record = readJsonFile("PatchableScalarRecord.Minimal.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableScalarRecordPatchImpl.of(record);
		}

		static PatchableScalarRecord.Patch createJsonBuilder() {
			return build(dev.rsdlang.sample.client.model.impl.json.PatchableScalarRecordPatchImpl.builder());
		}

		static PatchableScalarRecord.Patch[] getRecords() {
			return new PatchableScalarRecord.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableScalarRecord.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableScalarRecord.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableScalarRecord.Patch record) {
			assertThat(record.value()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Null(PatchableScalarRecord.Patch record) {
			assertThat(record.value_Null().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt(PatchableScalarRecord.Patch record) {
			assertThat(record.value_Opt().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt_Null(PatchableScalarRecord.Patch record) {
			assertThat(record.value_Opt_Null().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableScalarRecord.Patch record) {
			assertThat(record.list()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableScalarRecord.Patch record) {
			assertThat(record.list_Null().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableScalarRecord.Patch record) {
			assertThat(record.list_Opt().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableScalarRecord.Patch record) {
			assertThat(record.list_Opt_Null().isUndefined()).isTrue();
		}
	}

	@Nested
	class Null {
		static PatchableScalarRecord.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableScalarRecordPatch);
			var record = readAvroFile("PatchableScalarRecord.Null.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableScalarRecordPatchImpl.of(record);
		}

		static PatchableScalarRecord.Patch build(PatchableScalarRecord.PatchBuilder builder) {
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

		static PatchableScalarRecord.Patch createBuilderRecord() {
			return build(dev.rsdlang.sample.client.model.impl.avro.PatchableScalarRecordPatchImpl.builder());
		}

		static PatchableScalarRecord.Patch createJsonBuilderRecord() {
			return build(dev.rsdlang.sample.client.model.impl.json.PatchableScalarRecordPatchImpl.builder());
		}

		static PatchableScalarRecord.Patch createJsonRecord() {
			var record = readJsonFile("PatchableScalarRecord.Null.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableScalarRecordPatchImpl.of(record);
		}

		static PatchableScalarRecord.Patch[] getRecords() {
			return new PatchableScalarRecord.Patch[] {
					createAvroRecord(),
					createJsonRecord(),
					createBuilderRecord(),
					createJsonBuilderRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableScalarRecord.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableScalarRecord.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableScalarRecord.Patch record) {
			assertThat(record.value()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Null(PatchableScalarRecord.Patch record) {
			assertThat(record.value_Null().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt(PatchableScalarRecord.Patch record) {
			assertThat(record.value_Opt().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt_Null(PatchableScalarRecord.Patch record) {
			assertThat(record.value_Opt_Null().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableScalarRecord.Patch record) {
			assertThat(record.list()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableScalarRecord.Patch record) {
			assertThat(record.list_Null().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableScalarRecord.Patch record) {
			assertThat(record.list_Opt().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableScalarRecord.Patch record) {
			assertThat(record.list_Opt_Null().isNull()).isTrue();
		}
	}
}
