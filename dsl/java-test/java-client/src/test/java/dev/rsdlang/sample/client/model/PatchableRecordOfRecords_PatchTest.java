package dev.rsdlang.sample.client.model;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;
import java.util.function.Supplier;
import java.util.List;

import org.assertj.core.api.InstanceOfAssertFactories;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class PatchableRecordOfRecords_PatchTest extends BaseTest {
	static PatchableRecord_Basic.Data basic(PatchableRecord_Basic.DataBuilder builder) {
		return builder
				.key("data-1")
				.version("v-1")
				.valueBoolean(true)
				.valueShort((short) 1)
				.valueInt(1)
				.valueLong(1l)
				.valueFloat((float) 1.0)
				.valueDouble(1.0)
				.valueString("value-1")
				.valueLocalDate(LocalDate.parse("2020-01-01"))
				.valueLocalDateTime(LocalDateTime.parse("2020-01-01T00:00:00"))
				.valueLocalTime(LocalTime.parse("10:00:00"))
				.valueZonedDateTime(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]"))
				.valueOffsetDateTime(OffsetDateTime.parse("2020-01-01T00:00:00+00:00"))
				.build();
	}

	static PatchableRecord_Basic.Patch basicPatch(PatchableRecord_Basic.PatchBuilder builder) {
		return builder
				.key("patch-k-1")
				.version("patch-k-1")
				.build();
	}

	@Nested
	class ListReplace {
		static PatchableRecordOfRecords.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecordOfRecordsPatch);
			var record = readAvroFile("PatchableRecordOfRecords.ListReplace.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecordOfRecordsPatchImpl.of(record);
		}

		static PatchableRecordOfRecords.Patch build(
				PatchableRecordOfRecords.PatchBuilder builder,
				Supplier<PatchableRecord_Basic.DataBuilder> basic) {
			return builder
					.key("k-1")
					.version("v-1")
					.value(basic(basic.get()))
					.value_Null(basic(basic.get()))
					.value_Opt(basic(basic.get()))
					.value_Opt_Null(basic(basic.get()))
					.list(List.of(basic(basic.get())))
					.list_Null(List.of(basic(basic.get())))
					.list_Opt(List.of(basic(basic.get())))
					.list_Opt_Null(List.of(basic(basic.get())))
					.build();
		}

		static PatchableRecordOfRecords.Patch createAvroBuilderRecord() {
			return build(
					dev.rsdlang.sample.client.model.impl.avro.PatchableRecordOfRecordsPatchImpl.builder(),
					dev.rsdlang.sample.client.model.impl.avro.PatchableRecord_BasicDataImpl::builder);
		}

		static PatchableRecordOfRecords.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecordOfRecords.ListReplace.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecordOfRecordsPatchImpl.of(record);
		}

		static PatchableRecordOfRecords.Patch createJsonBuilderRecord() {
			return build(
					dev.rsdlang.sample.client.model.impl.json.PatchableRecordOfRecordsPatchImpl.builder(),
					dev.rsdlang.sample.client.model.impl.json.PatchableRecord_BasicDataImpl::builder);
		}

		static PatchableRecordOfRecords.Patch[] getRecords() {
			return new PatchableRecordOfRecords.Patch[] {
					createAvroRecord(),
					createJsonRecord(),
					createAvroBuilderRecord(),
					createJsonBuilderRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecord_Basic.Data.class))
					.extracting(PatchableRecord_Basic.Data::key)
					.isEqualTo("data-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecord_Basic.Data.class))
					.extracting(PatchableRecord_Basic.Data::key)
					.isEqualTo("data-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value_Opt().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecord_Basic.Data.class))
					.extracting(PatchableRecord_Basic.Data::key)
					.isEqualTo("data-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecord_Basic.Data.class))
					.extracting(PatchableRecord_Basic.Data::key)
					.isEqualTo("data-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.ListSetChange.class))
					.extracting(PatchableRecordOfRecords.Patch.ListSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableRecord_Basic.Data.class))
					.singleElement()
					.extracting(PatchableRecord_Basic.Data::key)
					.isEqualTo("data-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.List_NullSetChange.class))
					.extracting(PatchableRecordOfRecords.Patch.List_NullSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableRecord_Basic.Data.class))
					.singleElement()
					.extracting(PatchableRecord_Basic.Data::key)
					.isEqualTo("data-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list_Opt().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.List_OptSetChange.class))
					.extracting(PatchableRecordOfRecords.Patch.List_OptSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableRecord_Basic.Data.class))
					.singleElement()
					.extracting(PatchableRecord_Basic.Data::key)
					.isEqualTo("data-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.List_Opt_NullSetChange.class))
					.extracting(PatchableRecordOfRecords.Patch.List_Opt_NullSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableRecord_Basic.Data.class))
					.singleElement()
					.extracting(PatchableRecord_Basic.Data::key)
					.isEqualTo("data-1");
		}
	}

	@Nested
	class ListMerge {
		static PatchableRecordOfRecords.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecordOfRecordsPatch);
			var record = readAvroFile("PatchableRecordOfRecords.ListMerge.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecordOfRecordsPatchImpl.of(record);
		}

		static PatchableRecordOfRecords.Patch build(
				PatchableRecordOfRecords.PatchBuilder builder,
				Supplier<PatchableRecord_Basic.DataBuilder> basic,
				Supplier<PatchableRecord_Basic.PatchBuilder> basicPatch) {
			return builder
					.key("k-1")
					.version("v-1")
					.value(basicPatch(basicPatch.get()))
					.value_Null(basicPatch(basicPatch.get()))
					.value_Opt(basicPatch(basicPatch.get()))
					.value_Opt_Null(basicPatch(basicPatch.get()))
					.list(
							List.of(basic(basic.get())),
							List.of(basicPatch(basicPatch.get())),
							List.of("k-1"))
					.list_Null(
							List.of(basic(basic.get())),
							List.of(basicPatch(basicPatch.get())),
							List.of("k-1"))
					.list_Opt(
							List.of(basic(basic.get())),
							List.of(basicPatch(basicPatch.get())),
							List.of("k-1"))
					.list_Opt_Null(
							List.of(basic(basic.get())),
							List.of(basicPatch(basicPatch.get())),
							List.of("k-1"))
					.build();
		}

		static PatchableRecordOfRecords.Patch createAvroBuilderRecord() {
			return build(
					dev.rsdlang.sample.client.model.impl.avro.PatchableRecordOfRecordsPatchImpl.builder(),
					dev.rsdlang.sample.client.model.impl.avro.PatchableRecord_BasicDataImpl::builder,
					dev.rsdlang.sample.client.model.impl.avro.PatchableRecord_BasicPatchImpl::builder);
		}

		static PatchableRecordOfRecords.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecordOfRecords.ListMerge.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecordOfRecordsPatchImpl.of(record);
		}

		static PatchableRecordOfRecords.Patch createJsonBuilderRecord() {
			return build(
					dev.rsdlang.sample.client.model.impl.json.PatchableRecordOfRecordsPatchImpl.builder(),
					dev.rsdlang.sample.client.model.impl.json.PatchableRecord_BasicDataImpl::builder,
					dev.rsdlang.sample.client.model.impl.json.PatchableRecord_BasicPatchImpl::builder);
		}

		static PatchableRecordOfRecords.Patch[] getRecords() {
			return new PatchableRecordOfRecords.Patch[] {
					createAvroRecord(),
					createJsonRecord(),
					createAvroBuilderRecord(),
					createJsonBuilderRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecord_Basic.Patch.class))
					.extracting(PatchableRecord_Basic.Patch::key)
					.isEqualTo("patch-k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecord_Basic.Patch.class))
					.extracting(PatchableRecord_Basic.Patch::key)
					.isEqualTo("patch-k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value_Opt().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecord_Basic.Patch.class))
					.extracting(PatchableRecord_Basic.Patch::key)
					.isEqualTo("patch-k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecord_Basic.Patch.class))
					.extracting(PatchableRecord_Basic.Patch::key)
					.isEqualTo("patch-k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.ListMergeChange.class))
					.extracting(PatchableRecordOfRecords.Patch.ListMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableRecord_Basic.Data.class))
					.singleElement()
					.extracting(PatchableRecord_Basic.Data::key)
					.isEqualTo("data-1");
			assertThat(patch.list())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.ListMergeChange.class))
					.extracting(PatchableRecordOfRecords.Patch.ListMergeChange::updates)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableRecord_Basic.Patch.class))
					.singleElement()
					.extracting(PatchableRecord_Basic.Patch::key)
					.isEqualTo("patch-k-1");
			assertThat(patch.list())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.ListMergeChange.class))
					.extracting(PatchableRecordOfRecords.Patch.ListMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(String.class))
					.singleElement()
					.isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.List_NullMergeChange.class))
					.extracting(PatchableRecordOfRecords.Patch.List_NullMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableRecord_Basic.Data.class))
					.singleElement()
					.extracting(PatchableRecord_Basic.Data::key)
					.isEqualTo("data-1");
			assertThat(patch.list_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.List_NullMergeChange.class))
					.extracting(PatchableRecordOfRecords.Patch.List_NullMergeChange::updates)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableRecord_Basic.Patch.class))
					.singleElement()
					.extracting(PatchableRecord_Basic.Patch::key)
					.isEqualTo("patch-k-1");
			assertThat(patch.list_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.List_NullMergeChange.class))
					.extracting(PatchableRecordOfRecords.Patch.List_NullMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(String.class))
					.singleElement()
					.isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list_Opt().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.List_OptMergeChange.class))
					.extracting(PatchableRecordOfRecords.Patch.List_OptMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableRecord_Basic.Data.class))
					.singleElement()
					.extracting(PatchableRecord_Basic.Data::key)
					.isEqualTo("data-1");
			assertThat(patch.list_Opt().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.List_OptMergeChange.class))
					.extracting(PatchableRecordOfRecords.Patch.List_OptMergeChange::updates)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableRecord_Basic.Patch.class))
					.singleElement()
					.extracting(PatchableRecord_Basic.Patch::key)
					.isEqualTo("patch-k-1");
			assertThat(patch.list_Opt().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.List_OptMergeChange.class))
					.extracting(PatchableRecordOfRecords.Patch.List_OptMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(String.class))
					.singleElement()
					.isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.List_Opt_NullMergeChange.class))
					.extracting(PatchableRecordOfRecords.Patch.List_Opt_NullMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableRecord_Basic.Data.class))
					.singleElement()
					.extracting(PatchableRecord_Basic.Data::key)
					.isEqualTo("data-1");
			assertThat(patch.list_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.List_Opt_NullMergeChange.class))
					.extracting(PatchableRecordOfRecords.Patch.List_Opt_NullMergeChange::updates)
					.asInstanceOf(InstanceOfAssertFactories.list(PatchableRecord_Basic.Patch.class))
					.singleElement()
					.extracting(PatchableRecord_Basic.Patch::key)
					.isEqualTo("patch-k-1");
			assertThat(patch.list_Opt_Null().toOptional())
					.isNotEmpty()
					.get()
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableRecordOfRecords.Patch.List_Opt_NullMergeChange.class))
					.extracting(PatchableRecordOfRecords.Patch.List_Opt_NullMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(String.class))
					.singleElement()
					.isEqualTo("k-1");
		}
	}

	@Nested
	class Minimal {
		static PatchableRecordOfRecords.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecordOfRecordsPatch);
			var record = readAvroFile("PatchableRecordOfRecords.Minimal.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecordOfRecordsPatchImpl.of(record);
		}

		static PatchableRecordOfRecords.Patch build(PatchableRecordOfRecords.PatchBuilder builder) {
			return builder
					.key("k-1")
					.version("v-1")
					.build();
		}

		static PatchableRecordOfRecords.Patch createAvroBuilderRecord() {
			return build(dev.rsdlang.sample.client.model.impl.avro.PatchableRecordOfRecordsPatchImpl.builder());
		}

		static PatchableRecordOfRecords.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecordOfRecords.Minimal.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecordOfRecordsPatchImpl.of(record);
		}

		static PatchableRecordOfRecords.Patch createJsonBuilderRecord() {
			return build(dev.rsdlang.sample.client.model.impl.json.PatchableRecordOfRecordsPatchImpl.builder());
		}

		static PatchableRecordOfRecords.Patch[] getRecords() {
			return new PatchableRecordOfRecords.Patch[] {
					createAvroRecord(),
					createJsonRecord(),
					createAvroBuilderRecord(),
					createJsonBuilderRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value_Null().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value_Opt().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value_Opt_Null().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list_Null().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list_Opt().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list_Opt_Null().isUndefined()).isTrue();
		}
	}

	@Nested
	class Null {
		static PatchableRecordOfRecords.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecordOfRecordsPatch);
			var record = readAvroFile("PatchableRecordOfRecords.Null.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecordOfRecordsPatchImpl.of(record);
		}

		static PatchableRecordOfRecords.Patch build(PatchableRecordOfRecords.PatchBuilder builder) {
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

		static PatchableRecordOfRecords.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecordOfRecords.Null.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecordOfRecordsPatchImpl.of(record);
		}

		static PatchableRecordOfRecords.Patch createAvroBuilderRecord() {
			return build(dev.rsdlang.sample.client.model.impl.avro.PatchableRecordOfRecordsPatchImpl.builder());
		}

		static PatchableRecordOfRecords.Patch createJsonBuilderRecord() {
			return build(dev.rsdlang.sample.client.model.impl.json.PatchableRecordOfRecordsPatchImpl.builder());
		}

		static PatchableRecordOfRecords.Patch[] getRecords() {
			return new PatchableRecordOfRecords.Patch[] {
					createAvroRecord(),
					createJsonRecord(),
					createAvroBuilderRecord(),
					createJsonBuilderRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value_Null().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value_Opt().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value_Opt_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.value_Opt_Null().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list_Null().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list_Opt().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list_Opt_Null(PatchableRecordOfRecords.Patch patch) {
			assertThat(patch.list_Opt_Null().isNull()).isTrue();
		}
	}
}
