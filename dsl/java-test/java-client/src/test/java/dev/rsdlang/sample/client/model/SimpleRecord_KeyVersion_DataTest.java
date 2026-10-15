package dev.rsdlang.sample.client.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class SimpleRecord_KeyVersion_DataTest extends BaseTest {
	static SimpleRecord_KeyVersion.Data createAvroRecord() {
		var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord_KeyVersion);
		var record = readAvroFile("SimpleRecord_KeyVersion.Data.avro", schema);
		return dev.rsdlang.sample.client.model.impl.avro.SimpleRecord_KeyVersionDataImpl.of(record);
	}

	static SimpleRecord_KeyVersion.Data createJsonRecord() {
		var record = readJsonFile("SimpleRecord_KeyVersion.Data.json");
		return dev.rsdlang.sample.client.model.impl.json.SimpleRecord_KeyVersionDataImpl.of(record);
	}

	static SimpleRecord_KeyVersion.Data[] getRecords() {
		return new SimpleRecord_KeyVersion.Data[] {
				createAvroRecord(),
				createJsonRecord()
		};
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void key(SimpleRecord_KeyVersion.Data record) {
		assertEquals("2", record.key());
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void version(SimpleRecord_KeyVersion.Data record) {
		assertEquals("2", record.version());
	}
}
