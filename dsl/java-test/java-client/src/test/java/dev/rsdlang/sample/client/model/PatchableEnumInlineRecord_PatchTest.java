package dev.rsdlang.sample.client.model;

import static org.assertj.core.api.Assertions.assertThat;

import org.assertj.core.api.InstanceOfAssertFactories;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class PatchableEnumInlineRecord_PatchTest extends BaseTest {
	@Nested
	class ListReplace {
		static PatchableEnumInlineRecord.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableEnumInlineRecordPatch);
			var record = readAvroFile("PatchableEnumInlineRecord.ListReplace.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableEnumInlineRecordPatchImpl.of(record);
		}

		static PatchableEnumInlineRecord.Patch createJsonRecord() {
			var record = readJsonFile("PatchableEnumInlineRecord.ListReplace.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableEnumInlineRecordPatchImpl.of(record);
		}

		static PatchableEnumInlineRecord.Patch[] getRecords() {
			return new PatchableEnumInlineRecord.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value())
					.isNotEmpty()
					.contains(PatchableEnumInlineRecord.Value$.A);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value_Null().toOptional())
					.isNotEmpty()
					.contains(PatchableEnumInlineRecord.Value_Null$.C);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value_Opt().toOptional())
					.isNotEmpty()
					.contains(PatchableEnumInlineRecord.Value_Opt$.E);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOptNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value_Opt_Null().toOptional())
					.isNotEmpty()
					.contains(PatchableEnumInlineRecord.Value_Opt_Null$.G);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.list())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumInlineRecord.Patch.ListSetChange.class))
					.extracting(PatchableEnumInlineRecord.Patch.ListSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableEnumInlineRecord.Value$.class))
					.singleElement()
					.isEqualTo(PatchableEnumInlineRecord.List$.A);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.list_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumInlineRecord.Patch.List_NullSetChange.class))
					.extracting(PatchableEnumInlineRecord.Patch.List_NullSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableEnumInlineRecord.Value_Null$.class))
					.singleElement()
					.isEqualTo(PatchableEnumInlineRecord.List_Null$.C);
		}

		// @ParameterizedTest
		// @MethodSource("getRecords")
		// void listOpt(PatchableEnumInlineRecord.Patch record) {
		// assertThat(record.list_Opt().toOptional())
		// .isNotEmpty()
		// .get()
		// .asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumInlineRecord.Patch.List_OptSetChange.class))
		// .extracting(PatchableEnumInlineRecord.Patch.List_OptSetChange::elements)
		// .asInstanceOf(InstanceOfAssertFactories.list(PatchableEnumInlineRecord.Value_Opt$.class))
		// .singleElement()
		// .isEqualTo(SampleEnum.A);
		// }

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOptNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.list_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumInlineRecord.Patch.List_Opt_NullSetChange.class))
					.extracting(PatchableEnumInlineRecord.Patch.List_Opt_NullSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableEnumInlineRecord.Value_Opt_Null$.class))
					.singleElement()
					.isEqualTo(PatchableEnumInlineRecord.List_Opt_Null$.G);
		}
	}

	@Nested
	class ListMerge {
		static PatchableEnumInlineRecord.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableEnumInlineRecordPatch);
			var record = readAvroFile("PatchableEnumInlineRecord.ListMerge.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableEnumInlineRecordPatchImpl.of(record);
		}

		static PatchableEnumInlineRecord.Patch createJsonRecord() {
			var record = readJsonFile("PatchableEnumInlineRecord.ListMerge.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableEnumInlineRecordPatchImpl.of(record);
		}

		static PatchableEnumInlineRecord.Patch[] getRecords() {
			return new PatchableEnumInlineRecord.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value())
					.isNotEmpty()
					.contains(PatchableEnumInlineRecord.Value$.A);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value_Null().toOptional())
					.isNotEmpty()
					.contains(PatchableEnumInlineRecord.Value_Null$.C);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value_Opt().toOptional())
					.isNotEmpty()
					.contains(PatchableEnumInlineRecord.Value_Opt$.E);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOptNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value_Opt_Null().toOptional())
					.isNotEmpty()
					.contains(PatchableEnumInlineRecord.Value_Opt_Null$.G);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.list())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumInlineRecord.Patch.ListMergeChange.class))
					.extracting(PatchableEnumInlineRecord.Patch.ListMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableEnumInlineRecord.Value$.class))
					.singleElement()
					.isEqualTo(PatchableEnumInlineRecord.List$.A);
			assertThat(record.list())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumInlineRecord.Patch.ListMergeChange.class))
					.extracting(PatchableEnumInlineRecord.Patch.ListMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableEnumInlineRecord.Value$.class))
					.singleElement()
					.isEqualTo(PatchableEnumInlineRecord.List$.B);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.list_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumInlineRecord.Patch.List_NullMergeChange.class))
					.extracting(PatchableEnumInlineRecord.Patch.List_NullMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableEnumInlineRecord.Value_Null$.class))
					.singleElement()
					.isEqualTo(PatchableEnumInlineRecord.List_Null$.C);
			assertThat(record.list_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumInlineRecord.Patch.List_NullMergeChange.class))
					.extracting(PatchableEnumInlineRecord.Patch.List_NullMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableEnumInlineRecord.Value_Null$.class))
					.singleElement()
					.isEqualTo(PatchableEnumInlineRecord.List_Null$.D);
		}

		// @ParameterizedTest
		// @MethodSource("getRecords")
		// void listOpt(PatchableEnumInlineRecord.Patch record) {
		// assertThat(record.list_Opt().toOptional())
		// .isNotEmpty()
		// .get()
		// .asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumInlineRecord.Patch.List_OptSetChange.class))
		// .extracting(PatchableEnumInlineRecord.Patch.List_OptSetChange::elements)
		// .asInstanceOf(InstanceOfAssertFactories.list(PatchableEnumInlineRecord.Value_Opt$.class))
		// .singleElement()
		// .isEqualTo(SampleEnum.A);
		// }

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOptNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.list_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumInlineRecord.Patch.List_Opt_NullMergeChange.class))
					.extracting(PatchableEnumInlineRecord.Patch.List_Opt_NullMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableEnumInlineRecord.Value_Opt_Null$.class))
					.singleElement()
					.isEqualTo(PatchableEnumInlineRecord.List_Opt_Null$.G);
			assertThat(record.list_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableEnumInlineRecord.Patch.List_Opt_NullMergeChange.class))
					.extracting(PatchableEnumInlineRecord.Patch.List_Opt_NullMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableEnumInlineRecord.Value_Opt_Null$.class))
					.singleElement()
					.isEqualTo(PatchableEnumInlineRecord.List_Opt_Null$.H);
		}
	}

	@Nested
	class Minimal {
		static PatchableEnumInlineRecord.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableEnumInlineRecordPatch);
			var record = readAvroFile("PatchableEnumInlineRecord.Minimal.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableEnumInlineRecordPatchImpl.of(record);
		}

		static PatchableEnumInlineRecord.Patch createJsonRecord() {
			var record = readJsonFile("PatchableEnumInlineRecord.Minimal.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableEnumInlineRecordPatchImpl.of(record);
		}

		static PatchableEnumInlineRecord.Patch[] getRecords() {
			return new PatchableEnumInlineRecord.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value_Null().isUndefined())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value_Opt().isUndefined())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOptNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value_Opt_Null().isUndefined())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.list()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.list_Null().isUndefined())
					.isTrue();
		}

		// @ParameterizedTest
		// @MethodSource("getRecords")
		// void listOpt(PatchableEnumInlineRecord.Patch record) {
		// assertThat(record.list_Opt().isUndefined())
		// .isTrue();
		// }

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOptNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.list_Opt_Null().isUndefined())
					.isTrue();
		}
	}

	@Nested
	class Null {
		static PatchableEnumInlineRecord.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableEnumInlineRecordPatch);
			var record = readAvroFile("PatchableEnumInlineRecord.Null.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableEnumInlineRecordPatchImpl.of(record);
		}

		static PatchableEnumInlineRecord.Patch createJsonRecord() {
			var record = readJsonFile("PatchableEnumInlineRecord.Null.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableEnumInlineRecordPatchImpl.of(record);
		}

		static PatchableEnumInlineRecord.Patch[] getRecords() {
			return new PatchableEnumInlineRecord.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value_Null().isNull())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value_Opt().isNull())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOptNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.value_Opt_Null().isNull())
					.isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.list()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.list_Null().isNull())
					.isTrue();
		}

		// @ParameterizedTest
		// @MethodSource("getRecords")
		// void listOpt(PatchableEnumInlineRecord.Patch record) {
		// assertThat(record.list_Opt().isNull())
		// .isTrue();
		// }

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOptNull(PatchableEnumInlineRecord.Patch record) {
			assertThat(record.list_Opt_Null().isNull())
					.isTrue();
		}
	}
}
