package dev.rsdlang.sample.client.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class SimpleRecord_DataTest extends BaseTest {
	static SimpleRecord.Data build(SimpleRecord.DataBuilder builder) {
		builder.key("1");
		builder.value("the value");
		builder.version("1");
		return builder.build();
	}

	static SimpleRecord.Data createAvroRecord() {
		var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord);
		var record = readAvroFile("SimpleRecord.Data.avro", schema);
		return dev.rsdlang.sample.client.model.impl.avro.SimpleRecordDataImpl.of(record);
	}

	static SimpleRecord.Data createAvroRecordBuilder() {
		return build(
				dev.rsdlang.sample.client.model.impl.avro.SimpleRecordDataImpl.builder());
	}

	static SimpleRecord.Data createJsonRecord() {
		var record = readJsonFile("SimpleRecord.Data.json");
		return dev.rsdlang.sample.client.model.impl.json.SimpleRecordDataImpl.of(record);
	}

	static SimpleRecord.Data createJsonRecordBuilder() {
		return build(
				dev.rsdlang.sample.client.model.impl.json.SimpleRecordDataImpl.builder());
	}

	static SimpleRecord.Data[] getRecords() {
		return new SimpleRecord.Data[] {
				createAvroRecord(),
				createJsonRecord(),
				createAvroRecordBuilder(),
				createJsonRecordBuilder()
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
