package dev.rsdlang.sample.client.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class SimpleRecord_KeyVersion_Int_Int_DataTest extends BaseTest {

	static SimpleRecord_KeyVersion_Int_Int.Data build(SimpleRecord_KeyVersion_Int_Int.DataBuilder builder) {
		builder.key(1);
		builder.version(1);
		return builder.build();
	}

	static SimpleRecord_KeyVersion_Int_Int.Data createAvroRecord() {
		var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_KeyVersion_Int_Int);
		var record = readAvroFile("SimpleRecord_KeyVersion_Int_Int.Data.avro", schema);
		return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_KeyVersion_Int_IntDataImpl.of(record);
	}

	static SimpleRecord_KeyVersion_Int_Int.Data createAvroRecordBuilder() {
		return build(
				dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_KeyVersion_Int_IntDataImpl.builder());
	}

	static SimpleRecord_KeyVersion_Int_Int.Data createJsonRecord() {
		var record = readJsonFile("SimpleRecord_KeyVersion_Int_Int.Data.json");
		return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_KeyVersion_Int_IntDataImpl.of(record);
	}

	static SimpleRecord_KeyVersion_Int_Int.Data createJsonRecordBuilder() {
		return build(
				dev.rsdlang.sample.client.model.impl.json.SimpleRecord_KeyVersion_Int_IntDataImpl.builder());
	}

	static SimpleRecord_KeyVersion_Int_Int.Data[] getRecords() {
		return new SimpleRecord_KeyVersion_Int_Int.Data[] {
				createAvroRecord(),
				createJsonRecord(),
				createAvroRecordBuilder(),
				createJsonRecordBuilder()
		};
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void key(SimpleRecord_KeyVersion_Int_Int.Data record) {
		assertEquals(1, record.key());
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void version(SimpleRecord_KeyVersion_Int_Int.Data record) {
		assertEquals(1, record.version());
	}
}
