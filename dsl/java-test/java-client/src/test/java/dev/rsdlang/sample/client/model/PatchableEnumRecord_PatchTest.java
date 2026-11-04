package dev.rsdlang.sample.client.model;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

import static org.assertj.core.api.Assertions.assertThat;

import org.assertj.core.api.InstanceOfAssertFactories;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

public class PatchableEnumRecord_PatchTest extends BaseTest {
	@Nested
	class ListReplace {
		static PatchableEnumRecord.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableEnumRecordPatch);
			var record = readAvroFile("PatchableEnumRecord.ListReplace.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableEnumRecordPatchImpl.of(record);
		}

		static PatchableEnumRecord.Patch createJsonRecord() {
			var record = readJsonFile("PatchableEnumRecord.ListReplace.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableEnumRecordPatchImpl.of(record);
		}

		static PatchableEnumRecord.Patch[] getRecords() {
			return new PatchableEnumRecord.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableEnumRecord.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableEnumRecord.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableEnumRecord.Patch record) {
			assertThat(record.value())
					.isNotEmpty()
					.contains(SampleEnum.A);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(PatchableEnumRecord.Patch record) {
			assertThat(record.value_Null().toOptional())
					.isNotEmpty()
					.contains(SampleEnum.A);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(PatchableEnumRecord.Patch record) {
			assertThat(record.value_Opt().toOptional())
					.isNotEmpty()
					.contains(SampleEnum.A);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOptNull(PatchableEnumRecord.Patch record) {
			assertThat(record.value_Opt_Null().toOptional())
					.isNotEmpty()
					.contains(SampleEnum.A);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableEnumRecord.Patch record) {
			assertThat(record.list())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumRecord.Patch.ListSetChange.class))
					.extracting(PatchableEnumRecord.Patch.ListSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(SampleEnum.class))
					.singleElement()
					.isEqualTo(SampleEnum.A);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listNull(PatchableEnumRecord.Patch record) {
			assertThat(record.list_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumRecord.Patch.List_NullSetChange.class))
					.extracting(PatchableEnumRecord.Patch.List_NullSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(SampleEnum.class))
					.singleElement()
					.isEqualTo(SampleEnum.A);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOpt(PatchableEnumRecord.Patch record) {
			assertThat(record.list_Opt().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumRecord.Patch.List_OptSetChange.class))
					.extracting(PatchableEnumRecord.Patch.List_OptSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(SampleEnum.class))
					.singleElement()
					.isEqualTo(SampleEnum.A);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOptNull(PatchableEnumRecord.Patch record) {
			assertThat(record.list_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumRecord.Patch.List_Opt_NullSetChange.class))
					.extracting(PatchableEnumRecord.Patch.List_Opt_NullSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(SampleEnum.class))
					.singleElement()
					.isEqualTo(SampleEnum.A);
		}
	}

	@Nested
	class ListMerge {
		static PatchableEnumRecord.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableEnumRecordPatch);
			var record = readAvroFile("PatchableEnumRecord.ListMerge.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableEnumRecordPatchImpl.of(record);
		}

		static PatchableEnumRecord.Patch createJsonRecord() {
			var record = readJsonFile("PatchableEnumRecord.ListMerge.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableEnumRecordPatchImpl.of(record);
		}

		static PatchableEnumRecord.Patch[] getRecords() {
			return new PatchableEnumRecord.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableEnumRecord.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableEnumRecord.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableEnumRecord.Patch record) {
			assertThat(record.value())
					.isNotEmpty()
					.contains(SampleEnum.A);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(PatchableEnumRecord.Patch record) {
			assertThat(record.value_Null().toOptional())
					.isNotEmpty()
					.contains(SampleEnum.A);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(PatchableEnumRecord.Patch record) {
			assertThat(record.value_Opt().toOptional())
					.isNotEmpty()
					.contains(SampleEnum.A);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOptNull(PatchableEnumRecord.Patch record) {
			assertThat(record.value_Opt_Null().toOptional())
					.isNotEmpty()
					.contains(SampleEnum.A);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableEnumRecord.Patch record) {
			assertThat(record.list())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumRecord.Patch.ListMergeChange.class))
					.extracting(PatchableEnumRecord.Patch.ListMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(SampleEnum.class))
					.singleElement()
					.isEqualTo(SampleEnum.A);
			assertThat(record.list())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumRecord.Patch.ListMergeChange.class))
					.extracting(PatchableEnumRecord.Patch.ListMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(SampleEnum.class))
					.singleElement()
					.isEqualTo(SampleEnum.B);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listNull(PatchableEnumRecord.Patch record) {
			assertThat(record.list_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumRecord.Patch.List_NullMergeChange.class))
					.extracting(PatchableEnumRecord.Patch.List_NullMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(SampleEnum.class))
					.singleElement()
					.isEqualTo(SampleEnum.A);
			assertThat(record.list_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumRecord.Patch.List_NullMergeChange.class))
					.extracting(PatchableEnumRecord.Patch.List_NullMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(SampleEnum.class))
					.singleElement()
					.isEqualTo(SampleEnum.B);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOpt(PatchableEnumRecord.Patch record) {
			assertThat(record.list_Opt().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumRecord.Patch.List_OptMergeChange.class))
					.extracting(PatchableEnumRecord.Patch.List_OptMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(SampleEnum.class))
					.singleElement()
					.isEqualTo(SampleEnum.A);
			assertThat(record.list_Opt().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumRecord.Patch.List_OptMergeChange.class))
					.extracting(PatchableEnumRecord.Patch.List_OptMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(SampleEnum.class))
					.singleElement()
					.isEqualTo(SampleEnum.B);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOptNull(PatchableEnumRecord.Patch record) {
			assertThat(record.list_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumRecord.Patch.List_Opt_NullMergeChange.class))
					.extracting(PatchableEnumRecord.Patch.List_Opt_NullMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(SampleEnum.class))
					.singleElement()
					.isEqualTo(SampleEnum.A);
			assertThat(record.list_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumRecord.Patch.List_Opt_NullMergeChange.class))
					.extracting(PatchableEnumRecord.Patch.List_Opt_NullMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(SampleEnum.class))
					.singleElement()
					.isEqualTo(SampleEnum.B);
		}
	}

	@Nested
	class Minimal {
		static PatchableEnumRecord.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableEnumRecordPatch);
			var record = readAvroFile("PatchableEnumRecord.Minimal.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableEnumRecordPatchImpl.of(record);
		}

		static PatchableEnumRecord.Patch createJsonRecord() {
			var record = readJsonFile("PatchableEnumRecord.Minimal.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableEnumRecordPatchImpl.of(record);
		}

		static PatchableEnumRecord.Patch[] getRecords() {
			return new PatchableEnumRecord.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableEnumRecord.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableEnumRecord.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableEnumRecord.Patch record) {
			assertThat(record.value()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(PatchableEnumRecord.Patch record) {
			assertThat(record.value_Null().isUndefined())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(PatchableEnumRecord.Patch record) {
			assertThat(record.value_Opt().isUndefined())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOptNull(PatchableEnumRecord.Patch record) {
			assertThat(record.value_Opt_Null().isUndefined())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableEnumRecord.Patch record) {
			assertThat(record.list()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listNull(PatchableEnumRecord.Patch record) {
			assertThat(record.list_Null().isUndefined())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOpt(PatchableEnumRecord.Patch record) {
			assertThat(record.list_Opt().isUndefined())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOptNull(PatchableEnumRecord.Patch record) {
			assertThat(record.list_Opt_Null().isUndefined())
					.isTrue();
		}
	}

	@Nested
	class Null {
		static PatchableEnumRecord.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableEnumRecordPatch);
			var record = readAvroFile("PatchableEnumRecord.Null.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableEnumRecordPatchImpl.of(record);
		}

		static PatchableEnumRecord.Patch createJsonRecord() {
			var record = readJsonFile("PatchableEnumRecord.Null.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableEnumRecordPatchImpl.of(record);
		}

		static PatchableEnumRecord.Patch[] getRecords() {
			return new PatchableEnumRecord.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableEnumRecord.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableEnumRecord.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableEnumRecord.Patch record) {
			assertThat(record.value()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(PatchableEnumRecord.Patch record) {
			assertThat(record.value_Null().isNull())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(PatchableEnumRecord.Patch record) {
			assertThat(record.value_Opt().isNull())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOptNull(PatchableEnumRecord.Patch record) {
			assertThat(record.value_Opt_Null().isNull())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableEnumRecord.Patch record) {
			assertThat(record.list()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listNull(PatchableEnumRecord.Patch record) {
			assertThat(record.list_Null().isNull())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOpt(PatchableEnumRecord.Patch record) {
			assertThat(record.list_Opt().isNull())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOptNull(PatchableEnumRecord.Patch record) {
			assertThat(record.list_Opt_Null().isNull())
					.isTrue();
		}
	}
}
