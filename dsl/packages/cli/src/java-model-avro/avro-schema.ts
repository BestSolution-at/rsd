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
			%unions%
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
				return types(model);
			}
			if (key === 'unions') {
				return unions(model);
			}
			return undefined;
		},
	);
}

function unions(model: MResolvedRSDModel) {
	const rv = new CompositeGeneratorNode();
	model.elements.filter(isMResolvedUnionType).forEach(union => {
		rv.append(`this.typeSchemas.put(AvroTypes.`, union.name, ',', ' Schema.createUnion(', NL);
		rv.indent(_ => {
			_.indent(block => {
				union.types.forEach((t, idx, arr) => {
					if (idx === arr.length - 1) {
						block.append('getTypeSchema(AvroTypes.', t, ')));', NL);
					} else {
						block.append('getTypeSchema(AvroTypes.', t, '),', NL);
					}
				});
			});
		});

		if (union.patchable) {
			rv.append(`this.typeSchemas.put(AvroTypes.`, union.name, 'Patch,', ' Schema.createUnion(', NL);
			rv.indent(_ => {
				_.indent(block => {
					union.types.forEach((t, idx, arr) => {
						if (idx === arr.length - 1) {
							block.append('getTypeSchema(AvroTypes.', t, 'Patch)));', NL);
						} else {
							block.append('getTypeSchema(AvroTypes.', t, 'Patch),', NL);
						}
					});
				});
			});
		}
	});
	return rv;
}

function types(model: MResolvedRSDModel) {
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
		.forEach(element => {
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

			types.push(element.name);
		});
	model.errors.forEach(error => {
		types.push(error.name);
	});

	const rv = new CompositeGeneratorNode();
	types.forEach((item, idx, arr) => {
		if (arr.length - 1 === idx) {
			rv.append(item);
		} else {
			rv.append(item, ',', NL);
		}
	});
	return rv;
}
