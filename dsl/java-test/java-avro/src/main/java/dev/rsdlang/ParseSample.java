package dev.rsdlang;

import org.apache.avro.Schema;
import org.apache.avro.SchemaParser;

public class ParseSample {
	public static void main(String[] args) {
		Schema schema = new SchemaParser().parse("{\"type\": \"boolean\"}").mainSchema();
		System.err.println(schema.getClass());
	}
}
