package dev.rsdlang.sample.client.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro.SimpleRecordDataImpl;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class SimpleRecord_DataTest extends BaseTest {
	static SimpleRecord.Data createAvroRecord() {
		var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord);
		var record = readAvroFile("SimpleRecord.Data.avro", schema);
		return SimpleRecordDataImpl.of(record);
	}

	static SimpleRecord.Data[] getRecords() {
		return new SimpleRecord.Data[] {
				createAvroRecord()
		};
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	public void key(SimpleRecord.Data record) {
		assertEquals(record.key(), "1");
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	public void value(SimpleRecord.Data record) {
		assertEquals(record.value(), "the value");
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	public void version(SimpleRecord.Data record) {
		assertEquals(record.version(), "1");
	}
}
