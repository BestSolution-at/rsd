package dev.rsdlang.sample.client.model;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

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

public class PatchableRecord_Basic_List_PatchTest extends BaseTest {
	@Nested
	class ListReplace {
		static PatchableRecord_Basic_List.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecord_Basic_ListPatch);
			var record = readAvroFile("PatchableRecord_Basic_List.ListReplace.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecord_Basic_ListPatchImpl.of(record);
		}

		static PatchableRecord_Basic_List.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecord_Basic_List.ListReplace.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecord_Basic_ListPatchImpl.of(record);
		}

		static PatchableRecord_Basic_List.Patch[] getRecords() {
			return new PatchableRecord_Basic_List.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueBoolean())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueBooleanSetChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueBooleanSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(Boolean.class))
					.containsExactly(true);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueDouble())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueDoubleSetChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueDoubleSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(Double.class))
					.containsExactly(1.0);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueFloat())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueFloatSetChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueFloatSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(Float.class))
					.containsExactly(1.0f);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueInt())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueIntSetChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueIntSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(Integer.class))
					.containsExactly(1);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueLocalDate())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueLocalDateSetChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueLocalDateSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalDate.class))
					.containsExactly(LocalDate.of(2020, 1, 1));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueLocalDateTime())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueLocalDateTimeSetChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueLocalDateTimeSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalDateTime.class))
					.containsExactly(LocalDateTime.of(2020, 1, 1, 0, 0));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueLocalTime())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueLocalTimeSetChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueLocalTimeSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalTime.class))
					.containsExactly(LocalTime.of(0, 0));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueLong())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueLongSetChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueLongSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(Long.class))
					.containsExactly(1L);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueOffsetDateTime())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueOffsetDateTimeSetChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueOffsetDateTimeSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(OffsetDateTime.class))
					.containsExactly(OffsetDateTime.of(2020, 1, 1, 0, 0, 0, 0, ZoneOffset.ofHours(2)));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueShort())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueShortSetChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueShortSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(Short.class))
					.containsExactly((short) 1);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueString())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueStringSetChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueStringSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(String.class))
					.containsExactly("s-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueZonedDateTime())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueZonedDateTimeSetChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueZonedDateTimeSetChange::elements)
					.asInstanceOf(InstanceOfAssertFactories.list(ZonedDateTime.class))
					.containsExactly(ZonedDateTime.of(LocalDate.of(2020, 1, 1), LocalTime.of(0, 0), ZoneId.of("Europe/Berlin")));
		}
	}

	@Nested
	class ListMerge {
		static PatchableRecord_Basic_List.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecord_Basic_ListPatch);
			var record = readAvroFile("PatchableRecord_Basic_List.ListMerge.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecord_Basic_ListPatchImpl.of(record);
		}

		static PatchableRecord_Basic_List.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecord_Basic_List.ListMerge.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecord_Basic_ListPatchImpl.of(record);
		}

		static PatchableRecord_Basic_List.Patch[] getRecords() {
			return new PatchableRecord_Basic_List.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueBoolean())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueBooleanMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueBooleanMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(Boolean.class))
					.containsExactly(true);
			assertThat(record.valueBoolean())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueBooleanMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueBooleanMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(Boolean.class))
					.containsExactly(false);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueDouble())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueDoubleMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueDoubleMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(Double.class))
					.containsExactly(1.0);
			assertThat(record.valueDouble())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueDoubleMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueDoubleMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(Double.class))
					.containsExactly(2.0);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueFloat())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueFloatMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueFloatMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(Float.class))
					.containsExactly(1.0f);
			assertThat(record.valueFloat())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueFloatMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueFloatMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(Float.class))
					.containsExactly(2.0f);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueInt())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueIntMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueIntMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(Integer.class))
					.containsExactly(1);
			assertThat(record.valueInt())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueIntMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueIntMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(Integer.class))
					.containsExactly(2);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueLocalDate())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueLocalDateMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueLocalDateMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalDate.class))
					.containsExactly(LocalDate.of(2020, 1, 1));
			assertThat(record.valueLocalDate())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueLocalDateMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueLocalDateMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalDate.class))
					.containsExactly(LocalDate.of(2020, 1, 2));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueLocalDateTime())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueLocalDateTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueLocalDateTimeMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalDateTime.class))
					.containsExactly(LocalDateTime.of(2020, 1, 1, 0, 0));
			assertThat(record.valueLocalDateTime())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueLocalDateTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueLocalDateTimeMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalDateTime.class))
					.containsExactly(LocalDateTime.of(2020, 1, 1, 1, 0));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueLocalTime())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueLocalTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueLocalTimeMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalTime.class))
					.containsExactly(LocalTime.of(0, 0));
			assertThat(record.valueLocalTime())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueLocalTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueLocalTimeMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(LocalTime.class))
					.containsExactly(LocalTime.of(1, 0));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueLong())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueLongMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueLongMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(Long.class))
					.containsExactly(1L);
			assertThat(record.valueLong())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueLongMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueLongMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(Long.class))
					.containsExactly(2L);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueOffsetDateTime())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueOffsetDateTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueOffsetDateTimeMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(OffsetDateTime.class))
					.containsExactly(OffsetDateTime.parse("2020-01-01T00:00:00+02:00"));
			assertThat(record.valueOffsetDateTime())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueOffsetDateTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueOffsetDateTimeMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(OffsetDateTime.class))
					.containsExactly(OffsetDateTime.parse("2020-01-01T01:00:00+02:00"));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueShort())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueShortMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueShortMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(Short.class))
					.containsExactly((short) 1);
			assertThat(record.valueShort())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueShortMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueShortMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(Short.class))
					.containsExactly((short) 2);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueString())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueStringMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueStringMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(String.class))
					.containsExactly("s-1");
			assertThat(record.valueString())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueStringMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueStringMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(String.class))
					.containsExactly("s-2");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueZonedDateTime())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueZonedDateTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueZonedDateTimeMergeChange::additions)
					.asInstanceOf(InstanceOfAssertFactories.list(ZonedDateTime.class))
					.containsExactly(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Berlin]"));
			assertThat(record.valueZonedDateTime())
					.isNotEmpty()
					.get(InstanceOfAssertFactories.type(PatchableRecord_Basic_List.Patch.ValueZonedDateTimeMergeChange.class))
					.extracting(PatchableRecord_Basic_List.Patch.ValueZonedDateTimeMergeChange::removals)
					.asInstanceOf(InstanceOfAssertFactories.list(ZonedDateTime.class))
					.containsExactly(ZonedDateTime.parse("2020-01-01T01:00:00+01:00[Europe/Berlin]"));
		}
	}

	@Nested
	class Minimal {
		static PatchableRecord_Basic_List.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecord_Basic_ListPatch);
			var record = readAvroFile("PatchableRecord_Basic_List.Minimal.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecord_Basic_ListPatchImpl.of(record);
		}

		static PatchableRecord_Basic_List.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecord_Basic_List.Minimal.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecord_Basic_ListPatchImpl.of(record);
		}

		static PatchableRecord_Basic_List.Patch[] getRecords() {
			return new PatchableRecord_Basic_List.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueBoolean()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueDouble()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueFloat()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueInt()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueLocalDate()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueLocalDateTime()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueLocalTime()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueLong()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueOffsetDateTime()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueShort()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueString()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(PatchableRecord_Basic_List.Patch record) {
			assertThat(record.valueZonedDateTime()).isEmpty();
		}
	}
}
