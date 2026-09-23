import { CompositeGeneratorNode, NL } from 'langium/generate';
import { toNodeTree } from '../util.js';
import {
	allResolvedRecordProperties,
	isMEnumType,
	isMResolvedRecordType,
	isMResolvedUnionType,
	MResolvedRSDModel,
} from '../model.js';

export function generateSchemaContent(specFileName: string, model: MResolvedRSDModel): CompositeGeneratorNode {
	return toNodeTree(
		`
import java.io.IOException;
import java.util.Collections;
import java.util.EnumMap;
import java.util.IdentityHashMap;
import java.util.Set;
import java.util.stream.Stream;

import org.apache.avro.Schema;
import org.apache.avro.SchemaParseException;
import org.apache.avro.SchemaParser;

public class _AvroSchema {
	private static class Holder {
		private static final _AvroSchema INSTANCE = new _AvroSchema();
	}

	public enum AvroTypes {
		NULL,
		%types%;
	}

	private final EnumMap<AvroTypes, Schema> typeSchemas;

	_AvroSchema() {
		try {
			this.typeSchemas = new EnumMap<>(AvroTypes.class);
			var parser = new SchemaParser();
			var schema = parser.parse(_AvroSchema.class.getResourceAsStream("avro-schema.avsc")).mainSchema();
			Set<Schema> visited = Collections.newSetFromMap(new IdentityHashMap<>());
			schema.getTypes().stream().flatMap(t -> getAllNestedSchemas(t, visited)).distinct().forEach(s -> {
				this.typeSchemas.put(AvroTypes.valueOf(s.getName()), s);
			});
		} catch (SchemaParseException | IOException e) {
			throw new IllegalStateException("Failed to parse Avro schema", e);
		}
	}

	private static Stream<Schema> getAllNestedSchemas(Schema schema, Set<Schema> visited) {
		if (!visited.add(schema)) {
			return Stream.empty();
		}

		Stream<Schema> nestedSchemas;
		if (schema.getType() == Schema.Type.RECORD) {
			nestedSchemas = schema.getFields()
					.stream()
					.filter(f -> f.schema().getType() == Schema.Type.ENUM || f.schema().getType() == Schema.Type.UNION
							|| f.schema().getType() == Schema.Type.ARRAY)
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

	public Schema getTypeSchema(AvroTypes type) {
		return typeSchemas.get(type);
	}

	public static _AvroSchema getInstance() {
		return Holder.INSTANCE;
	}
}`,
		false,
		(key: string) => {
			if (key === 'types') {
				const rv = new CompositeGeneratorNode();
				model.elements
					.filter(e => isMResolvedRecordType(e))
					.forEach(e => {
						allResolvedRecordProperties(e)
							.filter(p => typeof p.type !== 'string')
							.forEach(p => {
								rv.append(e.name + '_' + p.name + ',', NL);
							});
					});
				model.elements
					.filter(e => isMResolvedRecordType(e) || isMResolvedUnionType(e) || isMEnumType(e))
					.forEach((element, idx, arr) => {
						if (arr.length - 1 === idx) {
							rv.append(element.name);
						} else {
							rv.append(`${element.name},`, NL);
						}
					});

				return rv;
			}
			return undefined;
		},
	);
}
