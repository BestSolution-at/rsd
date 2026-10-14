package dev.rsdlang.sample.client.model;

import java.io.IOException;
import java.io.InputStream;

import org.apache.avro.Schema;
import org.apache.avro.generic.GenericContainer;
import org.apache.avro.generic.GenericDatumReader;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.io.BinaryDecoder;
import org.apache.avro.io.DecoderFactory;

import jakarta.json.JsonObject;
import jakarta.json.JsonValue;

public abstract class BaseTest {
	public static <T extends GenericContainer> T readAvroFileGeneric(String name, Schema schema) {
		try (InputStream in = BaseTest.class.getResourceAsStream(name)) {
			BinaryDecoder decoder = DecoderFactory.get().binaryDecoder(in, null);
			return new GenericDatumReader<T>(schema).read(null, decoder);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public static GenericRecord readAvroFile(String name, Schema schema) {
		return readAvroFileGeneric(name, schema);
	}

	public static <T extends JsonValue> T readJsonFileGeneric(String name) {
		try (InputStream in = BaseTest.class.getResourceAsStream(name)) {
			var reader = jakarta.json.Json.createReader(in);
			return (T) reader.readValue();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public static JsonObject readJsonFile(String name) {
		return readJsonFileGeneric(name);
	}
}
