package dev.rsdlang.sample.client.model;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class PatchableRecord_Basic_PatchTest extends BaseTest {
	@Nested
	class Full {
		static PatchableRecord_Basic.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecord_BasicPatch);
			var record = readAvroFile("PatchableRecord_Basic.Full.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecord_BasicPatchImpl.of(record);
		}

		static PatchableRecord_Basic.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecord_Basic.Full.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecord_BasicPatchImpl.of(record);
		}

		static PatchableRecord_Basic.Patch[] getRecords() {
			return new PatchableRecord_Basic.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecord_Basic.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecord_Basic.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueBoolean())
					.isNotEmpty()
					.get()
					.isEqualTo(true);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueDouble())
					.isNotEmpty()
					.hasValue(1.0);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueFloat())
					.isNotEmpty()
					.hasValue(1.0f);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueInt())
					.isNotEmpty()
					.hasValue(1);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueLocalDate())
					.isNotEmpty()
					.hasValue(LocalDate.parse("2020-01-01"));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueLocalDateTime())
					.isNotEmpty()
					.hasValue(LocalDateTime.parse("2020-01-01T00:00:00"));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueLocalTime())
					.isNotEmpty()
					.hasValue(LocalTime.parse("10:00:00"));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueLong())
					.isNotEmpty()
					.hasValue(1L);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueOffsetDateTime())
					.isNotEmpty()
					.hasValue(OffsetDateTime.parse("2020-01-01T00:00:00+02:00"));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueShort())
					.isNotEmpty()
					.hasValue((short) 1);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueString())
					.isNotEmpty()
					.get()
					.isEqualTo("patch-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueZonedDateTime())
					.isNotEmpty()
					.hasValue(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]"));
		}
	}

	@Nested
	class Minimal {
		static PatchableRecord_Basic.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecord_BasicPatch);
			var record = readAvroFile("PatchableRecord_Basic.Minimal.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecord_BasicPatchImpl.of(record);
		}

		static PatchableRecord_Basic.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecord_Basic.Minimal.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecord_BasicPatchImpl.of(record);
		}

		static PatchableRecord_Basic.Patch[] getRecords() {
			return new PatchableRecord_Basic.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecord_Basic.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecord_Basic.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueBoolean()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueDouble()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueFloat()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueInt()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueLocalDate()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueLocalDateTime()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueLocalTime()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueLong()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueOffsetDateTime()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueShort()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueString()).isEmpty();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(PatchableRecord_Basic.Patch record) {
			assertThat(record.valueZonedDateTime()).isEmpty();
		}
	}
}
