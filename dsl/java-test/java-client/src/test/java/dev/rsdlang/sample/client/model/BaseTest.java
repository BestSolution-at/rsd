package dev.rsdlang.sample.client.model;

import java.io.IOException;
import java.io.InputStream;

import org.apache.avro.Schema;

import org.apache.avro.generic.GenericDatumReader;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.io.BinaryDecoder;
import org.apache.avro.io.DecoderFactory;

public abstract class BaseTest {
	public static GenericRecord readAvroFile(String name, Schema schema) {
		try (InputStream in = BaseTest.class.getResourceAsStream(name)) {
			BinaryDecoder decoder = DecoderFactory.get().binaryDecoder(in, null);
			return new GenericDatumReader<GenericRecord>(schema).read(null, decoder);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
