package dev.rsdlang.sample.client.model;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.ZoneId;

import org.assertj.core.api.InstanceOfAssertFactories;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class PatchableRecord_Basic_List_Optional_Null_PatchTest extends BaseTest {
	@Nested
	class ListReplace {
		static PatchableRecord_Basic_List_Optional_Null.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecord_Basic_List_Optional_NullPatch);
			var record = readAvroFile("PatchableRecord_Basic_List_Optional_Null.ListReplace.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecord_Basic_List_Optional_NullPatchImpl.of(record);
		}

		static PatchableRecord_Basic_List_Optional_Null.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecord_Basic_List_Optional_Null.ListReplace.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecord_Basic_List_Optional_NullPatchImpl.of(record);
		}

		static PatchableRecord_Basic_List_Optional_Null.Patch[] getRecords() {
			return new PatchableRecord_Basic_List_Optional_Null.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueBoolean().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueBooleanSetChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueBooleanSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(Boolean.class))
					.containsExactly(true);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueDouble().toOptional())
					.isNotEmpty()
					.get(
							InstanceOfAssertFactories.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueDoubleSetChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueDoubleSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(Double.class))
					.containsExactly(1.0);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueFloat().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueFloatSetChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueFloatSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(Float.class))
					.containsExactly(1.0f);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueInt().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueIntSetChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueIntSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(Integer.class))
					.containsExactly(1);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLocalDate().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalDateSetChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalDateSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalDate.class))
					.containsExactly(LocalDate.of(2020, 1, 1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLocalDateTime().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalDateTimeSetChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalDateTimeSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalDateTime.class))
					.containsExactly(LocalDateTime.of(2020, 1, 1, 0, 0));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLocalTime().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalTimeSetChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalTimeSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalTime.class))
					.containsExactly(LocalTime.of(0, 0));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLong().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLongSetChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLongSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(Long.class))
					.containsExactly(1L);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueOffsetDateTime().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueOffsetDateTimeSetChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueOffsetDateTimeSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(OffsetDateTime.class))
					.containsExactly(OffsetDateTime.of(2020, 1, 1, 0, 0, 0, 0, ZoneOffset.ofHours(2)));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueShort().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueShortSetChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueShortSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(Short.class))
					.containsExactly((short) 1);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueString().toOptional())
					.isNotEmpty()
					.get(
							InstanceOfAssertFactories.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueStringSetChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueStringSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(String.class))
					.containsExactly("string");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueZonedDateTime().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueZonedDateTimeSetChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueZonedDateTimeSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(ZonedDateTime.class))
					.containsExactly(ZonedDateTime.of(LocalDate.of(2020, 1, 1), LocalTime.of(0, 0), ZoneId.of("Europe/Berlin")));
		}
	}

	@Nested
	class ListMerge {
		static PatchableRecord_Basic_List_Optional_Null.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecord_Basic_List_Optional_NullPatch);
			var record = readAvroFile("PatchableRecord_Basic_List_Optional_Null.ListMerge.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecord_Basic_List_Optional_NullPatchImpl.of(record);
		}

		static PatchableRecord_Basic_List_Optional_Null.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecord_Basic_List_Optional_Null.ListMerge.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecord_Basic_List_Optional_NullPatchImpl.of(record);
		}

		static PatchableRecord_Basic_List_Optional_Null.Patch[] getRecords() {
			return new PatchableRecord_Basic_List_Optional_Null.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueBoolean().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueBooleanMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueBooleanMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(Boolean.class))
					.containsExactly(true);
			assertThat(record.valueBoolean().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueBooleanMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueBooleanMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(Boolean.class))
					.containsExactly(false);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueDouble().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueDoubleMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueDoubleMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(Double.class))
					.containsExactly(1.0);
			assertThat(record.valueDouble().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueDoubleMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueDoubleMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(Double.class))
					.containsExactly(2.0);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueFloat().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueFloatMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueFloatMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(Float.class))
					.containsExactly(1.0f);
			assertThat(record.valueFloat().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueFloatMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueFloatMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(Float.class))
					.containsExactly(2.0f);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueInt().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueIntMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueIntMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(Integer.class))
					.containsExactly(1);
			assertThat(record.valueInt().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueIntMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueIntMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(Integer.class))
					.containsExactly(2);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLocalDate().toOptional())
					.isNotEmpty()
					.get(
							InstanceOfAssertFactories
									.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalDateMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalDateMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalDate.class))
					.containsExactly(LocalDate.of(2020, 1, 1));
			assertThat(record.valueLocalDate().toOptional())
					.isNotEmpty()
					.get(
							InstanceOfAssertFactories
									.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalDateMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalDateMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalDate.class))
					.containsExactly(LocalDate.of(2020, 1, 2));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLocalDateTime().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalDateTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalDateTimeMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalDateTime.class))
					.containsExactly(LocalDateTime.of(2020, 1, 1, 0, 0));
			assertThat(record.valueLocalDateTime().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalDateTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalDateTimeMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalDateTime.class))
					.containsExactly(LocalDateTime.of(2020, 1, 2, 0, 0));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLocalTime().toOptional())
					.isNotEmpty()
					.get(
							InstanceOfAssertFactories
									.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalTimeMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalTime.class))
					.containsExactly(LocalTime.of(0, 0));
			assertThat(record.valueLocalTime().toOptional())
					.isNotEmpty()
					.get(
							InstanceOfAssertFactories
									.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLocalTimeMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalTime.class))
					.containsExactly(LocalTime.of(1, 0));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLong().toOptional())
					.isNotEmpty()
					.get(
							InstanceOfAssertFactories.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLongMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLongMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(Long.class))
					.containsExactly(1L);
			assertThat(record.valueLong().toOptional())
					.isNotEmpty()
					.get(
							InstanceOfAssertFactories.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLongMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueLongMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(Long.class))
					.containsExactly(2L);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueOffsetDateTime().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueOffsetDateTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueOffsetDateTimeMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(OffsetDateTime.class))
					.containsExactly(OffsetDateTime.parse("2020-01-01T00:00:00+02:00"));
			assertThat(record.valueOffsetDateTime().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueOffsetDateTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueOffsetDateTimeMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(OffsetDateTime.class))
					.containsExactly(OffsetDateTime.parse("2020-01-02T00:00:00+02:00"));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueShort().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueShortMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueShortMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(Short.class))
					.containsExactly((short) 1);
			assertThat(record.valueShort().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueShortMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueShortMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(Short.class))
					.containsExactly((short) 2);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueString().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueStringMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueStringMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(String.class))
					.containsExactly("string");
			assertThat(record.valueString().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueStringMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueStringMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(String.class))
					.containsExactly("another string");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueZonedDateTime().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueZonedDateTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueZonedDateTimeMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(ZonedDateTime.class))
					.containsExactly(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Berlin]"));
			assertThat(record.valueZonedDateTime().toOptional())
					.isNotEmpty()
					.get(InstanceOfAssertFactories
							.type(PatchableRecord_Basic_List_Optional_Null.Patch.ValueZonedDateTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List_Optional_Null.Patch.ValueZonedDateTimeMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(ZonedDateTime.class))
					.containsExactly(ZonedDateTime.parse("2020-01-02T00:00:00+01:00[Europe/Berlin]"));
		}
	}

	@Nested
	class Minimal {
		static PatchableRecord_Basic_List_Optional_Null.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecord_Basic_List_Optional_NullPatch);
			var record = readAvroFile("PatchableRecord_Basic_List_Optional_Null.Minimal.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecord_Basic_List_Optional_NullPatchImpl.of(record);
		}

		static PatchableRecord_Basic_List_Optional_Null.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecord_Basic_List_Optional_Null.Minimal.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecord_Basic_List_Optional_NullPatchImpl.of(record);
		}

		static PatchableRecord_Basic_List_Optional_Null.Patch[] getRecords() {
			return new PatchableRecord_Basic_List_Optional_Null.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueBoolean().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueDouble().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueFloat().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueInt().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLocalDate().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLocalDateTime().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLocalTime().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLong().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueOffsetDateTime().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueShort().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueString().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueZonedDateTime().isUndefined()).isTrue();
		}
	}

	@Nested
	class Null {
		static PatchableRecord_Basic_List_Optional_Null.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecord_Basic_List_OptionalPatch);
			var record = readAvroFile("PatchableRecord_Basic_List_Optional_Null.Null.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecord_Basic_List_Optional_NullPatchImpl.of(record);
		}

		static PatchableRecord_Basic_List_Optional_Null.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecord_Basic_List_Optional_Null.Null.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecord_Basic_List_Optional_NullPatchImpl.of(record);
		}

		static PatchableRecord_Basic_List_Optional_Null.Patch[] getRecords() {
			return new PatchableRecord_Basic_List_Optional_Null.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueBoolean().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueDouble().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueFloat().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueInt().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLocalDate().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLocalDateTime().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLocalTime().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueLong().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueOffsetDateTime().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueShort().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueString().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(PatchableRecord_Basic_List_Optional_Null.Patch record) {
			assertThat(record.valueZonedDateTime().isNull()).isTrue();
		}
	}
}
