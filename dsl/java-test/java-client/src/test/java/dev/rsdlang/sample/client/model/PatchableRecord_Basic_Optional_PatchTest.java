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

public class PatchableRecord_Basic_Optional_PatchTest extends BaseTest {
	@Nested
	class Full {
		static PatchableRecord_Basic_Optional.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecord_BasicPatch);
			var record = readAvroFile("PatchableRecord_Basic.Full.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecord_Basic_OptionalPatchImpl.of(record);
		}

		static PatchableRecord_Basic_Optional.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecord_Basic.Full.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecord_Basic_OptionalPatchImpl.of(record);
		}

		static PatchableRecord_Basic_Optional.Patch[] getRecords() {
			return new PatchableRecord_Basic_Optional.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueBoolean().toOptional())
					.isNotEmpty()
					.get()
					.isEqualTo(true);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueDouble().toOptional())
					.isNotEmpty()
					.hasValue(1.0);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueFloat().toOptional())
					.isNotEmpty()
					.hasValue(1.0f);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueInt().toOptional())
					.isNotEmpty()
					.hasValue(1);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueLocalDate().toOptional())
					.isNotEmpty()
					.hasValue(LocalDate.parse("2020-01-01"));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueLocalDateTime().toOptional())
					.isNotEmpty()
					.hasValue(LocalDateTime.parse("2020-01-01T00:00:00"));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueLocalTime().toOptional())
					.isNotEmpty()
					.hasValue(LocalTime.parse("10:00:00"));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueLong().toOptional())
					.isNotEmpty()
					.hasValue(1L);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueOffsetDateTime().toOptional())
					.isNotEmpty()
					.hasValue(OffsetDateTime.parse("2020-01-01T00:00:00+02:00"));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueShort().toOptional())
					.isNotEmpty()
					.hasValue((short) 1);
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueString().toOptional())
					.isNotEmpty()
					.hasValue("patch-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueZonedDateTime().toOptional())
					.isNotEmpty()
					.hasValue(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]"));
		}
	}

	@Nested
	class Minimal {
		static PatchableRecord_Basic_Optional.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecord_Basic_OptionalPatch);
			var record = readAvroFile("PatchableRecord_Basic_Optional.Minimal.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecord_Basic_OptionalPatchImpl.of(record);
		}

		static PatchableRecord_Basic_Optional.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecord_Basic_Optional.Minimal.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecord_Basic_OptionalPatchImpl.of(record);
		}

		static PatchableRecord_Basic_Optional.Patch[] getRecords() {
			return new PatchableRecord_Basic_Optional.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueBoolean().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueDouble().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueFloat().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueInt().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueLocalDate().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueLocalDateTime().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueLocalTime().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueLong().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueOffsetDateTime().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueShort().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueString().isUndefined()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueZonedDateTime().isUndefined()).isTrue();
		}
	}

	@Nested
	class Null {
		static PatchableRecord_Basic_Optional.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecord_Basic_OptionalPatch);
			var record = readAvroFile("PatchableRecord_Basic_Optional.Null.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecord_Basic_OptionalPatchImpl.of(record);
		}

		static PatchableRecord_Basic_Optional.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecord_Basic_Optional.Null.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecord_Basic_OptionalPatchImpl.of(record);
		}

		static PatchableRecord_Basic_Optional.Patch[] getRecords() {
			return new PatchableRecord_Basic_Optional.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueBoolean(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueBoolean().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueDouble(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueDouble().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueFloat(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueFloat().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueInt(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueInt().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDate(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueLocalDate().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalDateTime(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueLocalDateTime().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLocalTime(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueLocalTime().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueLong(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueLong().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOffsetDateTime(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueOffsetDateTime().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueShort(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueShort().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueString(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueString().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueZonedDateTime(PatchableRecord_Basic_Optional.Patch record) {
			assertThat(record.valueZonedDateTime().isNull()).isTrue();
		}
	}
}
