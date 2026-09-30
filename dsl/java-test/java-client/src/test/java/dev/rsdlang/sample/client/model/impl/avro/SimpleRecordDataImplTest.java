package dev.rsdlang.sample.client.model.impl.avro;

import org.junit.jupiter.api.Test;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class SimpleRecordDataImplTest extends AvorBaseTest {

	@Test
	public void key() {
		System.err.println(
				readAvroFile("SimpleRecordDataImpl.avro", _AvroSchema.getInstance().getTypeSchema(AvroTypes.SimpleRecord)));
	}
}
