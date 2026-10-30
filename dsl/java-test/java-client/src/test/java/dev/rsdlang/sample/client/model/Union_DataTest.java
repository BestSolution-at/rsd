package dev.rsdlang.sample.client.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro.UnionDataImpl;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class Union_DataTest extends BaseTest {
	@Nested
	class Union_A {
		static Union.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.UnionA);
			var record = readAvroFile("UnionA.Data.avro", schema);
			return UnionDataImpl.of(record);
		}

		static Union.Data createJsonRecord() {
			var record = readJsonFile("UnionA.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.UnionDataImpl.of(record);
		}

		static Union.Data[] getRecords() {
			return new Union.Data[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void shared(Union.Data record) {
			assertEquals("Shared of A", record.shared());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueA(Union.Data record) {
			assertInstanceOf(UnionA.Data.class, record);
			assertEquals("A", ((UnionA.Data) record).valueA());
		}
	}

	@Nested
	class Union_B {
		static Union.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.UnionB);
			var record = readAvroFile("UnionB.Data.avro", schema);
			return UnionDataImpl.of(record);
		}

		static Union.Data createJsonRecord() {
			var record = readJsonFile("UnionB.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.UnionDataImpl.of(record);
		}

		static Union.Data[] getRecords() {
			return new Union.Data[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void shared(Union.Data record) {
			assertEquals("Shared of B", record.shared());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueB(Union.Data record) {
			assertInstanceOf(UnionB.Data.class, record);
			assertEquals("B", ((UnionB.Data) record).valueB());
		}
	}

}
