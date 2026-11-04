import { CompositeGeneratorNode, NL } from 'langium/generate';
import { toNodeTree } from '../util.js';
import {
	allResolvedRecordProperties,
	isMEnumType,
	isMResolvedProperty,
	isMResolvedRecordType,
	isMResolvedUnionType,
	MResolvedRSDModel,
} from '../model.js';

export function generateSchemaContent(specFileName: string, model: MResolvedRSDModel): CompositeGeneratorNode {
	return toNodeTree(
		`
import java.io.IOException;
import java.util.EnumMap;

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
			schema.getTypes().stream().forEach(s -> {
				this.typeSchemas.put(AvroTypes.valueOf(s.getName()), s);
			});
		} catch (SchemaParseException | IOException e) {
			throw new IllegalStateException("Failed to parse Avro schema", e);
		}
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
				const types: string[] = [];
				model.elements
					.filter(e => isMResolvedRecordType(e))
					.forEach(e => {
						allResolvedRecordProperties(e)
							.filter(p => typeof p.type !== 'string')
							.forEach(p => {
								types.push(e.name + '_' + p.name);
							});
					});
				model.elements
					.filter(e => isMResolvedRecordType(e) || isMResolvedUnionType(e) || isMEnumType(e))
					.forEach((element, idx, arr) => {
						if (isMResolvedRecordType(element)) {
							const props = allResolvedRecordProperties(element);
							if (element.patchable) {
								types.push(element.name + 'Patch');
								types.push(
									...props
										.filter(isMResolvedProperty)
										.filter(p => p.array)
										.flatMap(p => {
											return [element.name + '_' + p.name + 'PatchReplace', element.name + '_' + p.name + 'PatchMerge'];
										}),
								);
							}
						} else if (isMResolvedUnionType(element) && element.patchable) {
							types.push(element.name + 'Patch');
						}

						if (arr.length - 1 === idx) {
							types.push(element.name);
						} else {
							types.push(element.name);
						}
					});
				model.errors.forEach(error => {
					types.push(error.name);
				});

				const x = new CompositeGeneratorNode();
				types.forEach((item, idx, arr) => {
					if (arr.length - 1 === idx) {
						x.append(item);
					} else {
						x.append(item, ',', NL);
					}
				});
				return x;
			}
			return undefined;
		},
	);
}
