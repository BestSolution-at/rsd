package dev.rsdlang.sample.client.model;

import static org.assertj.core.api.Assertions.assertThat;

import org.assertj.core.api.InstanceOfAssertFactories;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro.PatchableUnionPatchImpl;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class PatchableUnion_PatchTest extends BaseTest {
	@Nested
	class PatchableUnionAPatchTest_Filled {
		static PatchableUnion.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableUnionAPatch);
			var record = readAvroFile("PatchableUnionA.Patch.avro", schema);
			return PatchableUnionPatchImpl.of(record);
		}

		static PatchableUnion.Patch createJsonRecord() {
			var record = readJsonFile("PatchableUnionA.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableUnionPatchImpl.of(record);
		}

		static PatchableUnion.Patch[] getRecords() {
			return new PatchableUnion.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionA.Patch.class))
					.extracting(PatchableUnionA.Patch::key)
					.isEqualTo("a-key");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionA.Patch.class))
					.extracting(PatchableUnionA.Patch::version)
					.isEqualTo("a-version");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void shared(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionA.Patch.class))
					.extracting(PatchableUnionA.Patch::shared, InstanceOfAssertFactories.optional(String.class))
					.isPresent()
					.contains("shared-a");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueA(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionA.Patch.class))
					.extracting(PatchableUnionA.Patch::valueA, InstanceOfAssertFactories.optional(String.class))
					.isPresent()
					.contains("value-a");
		}
	}

	@Nested
	class PatchableUnionAPatchTest_Minimal {
		static PatchableUnion.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableUnionAPatch);
			var record = readAvroFile("PatchableUnionA.Minimal.Patch.avro", schema);
			return PatchableUnionPatchImpl.of(record);
		}

		static PatchableUnion.Patch createJsonRecord() {
			var record = readJsonFile("PatchableUnionA.Minimal.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableUnionPatchImpl.of(record);
		}

		static PatchableUnion.Patch[] getRecords() {
			return new PatchableUnion.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionA.Patch.class))
					.extracting(PatchableUnionA.Patch::key)
					.isEqualTo("a-key");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionA.Patch.class))
					.extracting(PatchableUnionA.Patch::version)
					.isEqualTo("a-version");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void shared(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionA.Patch.class))
					.extracting(PatchableUnionA.Patch::shared, InstanceOfAssertFactories.optional(String.class))
					.isNotPresent();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueA(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionA.Patch.class))
					.extracting(PatchableUnionA.Patch::valueA, InstanceOfAssertFactories.optional(String.class))
					.isNotPresent();
		}
	}

	@Nested
	class PatchableUnionBPatchTest_Filled {
		static PatchableUnion.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableUnionBPatch);
			var record = readAvroFile("PatchableUnionB.Patch.avro", schema);
			return PatchableUnionPatchImpl.of(record);
		}

		static PatchableUnion.Patch createJsonRecord() {
			var record = readJsonFile("PatchableUnionB.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableUnionPatchImpl.of(record);
		}

		static PatchableUnion.Patch[] getRecords() {
			return new PatchableUnion.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionB.Patch.class))
					.extracting(PatchableUnionB.Patch::key)
					.isEqualTo("b-key");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionB.Patch.class))
					.extracting(PatchableUnionB.Patch::version)
					.isEqualTo("b-version");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void shared(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionB.Patch.class))
					.extracting(PatchableUnionB.Patch::shared, InstanceOfAssertFactories.optional(String.class))
					.isPresent()
					.contains("shared-b");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueA(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionB.Patch.class))
					.extracting(PatchableUnionB.Patch::valueB, InstanceOfAssertFactories.optional(String.class))
					.isPresent()
					.contains("value-b");
		}
	}

	@Nested
	class PatchableUnionBPatchTest_Minimal {
		static PatchableUnion.Patch createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.PatchableUnionBPatch);
			var record = readAvroFile("PatchableUnionB.Minimal.Patch.avro", schema);
			return PatchableUnionPatchImpl.of(record);
		}

		static PatchableUnion.Patch createJsonRecord() {
			var record = readJsonFile("PatchableUnionB.Minimal.Patch.json");
			return dev.rsdlang.sample.client.model.impl.json.PatchableUnionPatchImpl.of(record);
		}

		static PatchableUnion.Patch[] getRecords() {
			return new PatchableUnion.Patch[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void key(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionB.Patch.class))
					.extracting(PatchableUnionB.Patch::key)
					.isEqualTo("b-key");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void version(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionB.Patch.class))
					.extracting(PatchableUnionB.Patch::version)
					.isEqualTo("b-version");
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void shared(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionB.Patch.class))
					.extracting(PatchableUnionB.Patch::shared, InstanceOfAssertFactories.optional(String.class))
					.isNotPresent();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueA(PatchableUnion.Patch patch) {
			assertThat(patch)
					.asInstanceOf(InstanceOfAssertFactories.type(PatchableUnionB.Patch.class))
					.extracting(PatchableUnionB.Patch::valueB, InstanceOfAssertFactories.optional(String.class))
					.isNotPresent();
		}
	}
}
