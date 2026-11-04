package dev.rsdlang;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.IdentityHashMap;
import java.util.Set;
import java.util.stream.Stream;

import org.apache.avro.Schema;
import org.apache.avro.SchemaParseException;
import org.apache.avro.SchemaParser;
import org.apache.avro.Schema.Type;

public class ParseSample {
	public static void main(String[] args) throws SchemaParseException, IOException {
		// Schema schema = new SchemaParser().parse("{\"type\":
		// \"boolean\"}").mainSchema();
		// System.err.println(schema.getClass());

		Schema schema = new SchemaParser()
				.parse(new File("/Users/tomschindl/git-beso/rsd/dsl/java-test/java-avro/src/main/resources/sample.avsc"))
				.mainSchema();

		Set<Schema> visited = Collections.newSetFromMap(new IdentityHashMap<>());
		schema.getTypes().stream().flatMap(t -> getAllNestedSchemas(t, visited)).distinct().forEach(s -> {
			System.err.println(s.getName() + ":" + s.getType());
		});
	}

	private static Stream<Schema> getAllNestedSchemas(Schema schema, Set<Schema> visited) {
		if (!visited.add(schema)) {
			return Stream.empty();
		}

		Stream<Schema> nestedSchemas;
		if (schema.getType() == Schema.Type.RECORD) {
			nestedSchemas = schema.getFields()
					.stream()
					.filter(f -> f.schema().getType() == Type.ENUM || f.schema().getType() == Type.UNION
							|| f.schema().getType() == Type.ARRAY)
					.map(f -> f.schema())
					.flatMap(t -> getAllNestedSchemas(t, visited));
		} else if (schema.getType() == Schema.Type.UNION) {
			nestedSchemas = schema.getTypes().stream().flatMap(t -> getAllNestedSchemas(t, visited));
		} else if (schema.getType() == Schema.Type.ARRAY) {
			nestedSchemas = getAllNestedSchemas(schema.getElementType(), visited);
		} else {
			nestedSchemas = Stream.empty();
		}

		if (schema.getType() == Schema.Type.RECORD || schema.getType() == Schema.Type.ENUM) {
			return Stream.concat(Stream.of(schema), nestedSchemas);
		}

		return nestedSchemas;
	}

}
