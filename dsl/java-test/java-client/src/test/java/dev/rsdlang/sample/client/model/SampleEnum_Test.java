package dev.rsdlang.sample.client.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.avro.generic.GenericEnumSymbol;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;
import jakarta.json.JsonString;

public class SampleEnum_Test extends BaseTest {
	@Nested
	class SampleEnum_A_Test {
		static SampleEnum createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SampleEnum);
			GenericEnumSymbol<?> record = readAvroFileGeneric("SampleEnum.A.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro._EnumSupport.SampleEnumFromAvro(record);
		}

		static SampleEnum createJsonRecord() {
			JsonString record = readJsonFileGeneric("SampleEnum.A.json");
			return dev.rsdlang.sample.client.model.impl.json._EnumSupport.SampleEnumFromJson(record.getString());
		}

		static SampleEnum[] getRecords() {
			return new SampleEnum[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void testSampleEnum(SampleEnum sampleEnum) {
			assertEquals(SampleEnum.A, sampleEnum);
		}
	}

	@Nested
	class SampleEnum_B_Test {
		static SampleEnum createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SampleEnum);
			GenericEnumSymbol<?> record = readAvroFileGeneric("SampleEnum.B.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro._EnumSupport.SampleEnumFromAvro(record);
		}

		static SampleEnum createJsonRecord() {
			JsonString record = readJsonFileGeneric("SampleEnum.B.json");
			return dev.rsdlang.sample.client.model.impl.json._EnumSupport.SampleEnumFromJson(record.getString());
		}

		static SampleEnum[] getRecords() {
			return new SampleEnum[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void testSampleEnum(SampleEnum sampleEnum) {
			assertEquals(SampleEnum.B, sampleEnum);
		}
	}
}
