package dev.rsdlang.sample.client.model;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class PatchableRecord_PatchTest extends BaseTest {
	@Nested
	class Full {
		static PatchableRecord.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecordPatch);
			var record = readAvroFile("PatchableRecord.Full.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecordPatchImpl.of(record);
		}

		static PatchableRecord.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecord.Full.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecordPatchImpl.of(record);
		}

		static PatchableRecord.Patch[] getRecords() {
			return new PatchableRecord.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecord.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecord.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableRecord.Patch record) {
			assertThat(record.value())
					.isNotEmpty()
					.get()
					.isEqualTo("a-value");
		}
	}

	@Nested
	class Minimal {
		static PatchableRecord.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableRecordPatch);
			var record = readAvroFile("PatchableRecord.Minimal.Patch.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.PatchableRecordPatchImpl.of(record);
		}

		static PatchableRecord.Patch createJsonRecord() {
			var record = readJsonFile("PatchableRecord.Minimal.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableRecordPatchImpl.of(record);
		}

		static PatchableRecord.Patch[] getRecords() {
			return new PatchableRecord.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableRecord.Patch record) {
			assertThat(record.key()).isEqualTo("k-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableRecord.Patch record) {
			assertThat(record.version()).isEqualTo("v-1");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(PatchableRecord.Patch record) {
			assertThat(record.value()).isEmpty();
		}
	}
}
