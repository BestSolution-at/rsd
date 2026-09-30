package dev.rsdlang.sample.client.model.impl.avro;

import java.io.IOException;

import org.apache.avro.Schema;

import org.apache.avro.file.DataFileStream;
import org.apache.avro.generic.GenericDatumReader;
import org.apache.avro.generic.GenericRecord;

public abstract class AvorBaseTest {
	public static GenericRecord readAvroFile(String name, Schema schema) {
		try (var in = AvorBaseTest.class.getResourceAsStream(name);
				DataFileStream<GenericRecord> dataFileStream = new DataFileStream<>(in, new GenericDatumReader<>(schema))) {
			return dataFileStream.next();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
