import { MEnumType } from '../model.js';
import { AvroEnum } from './avro-types.js';
import { AvroGeneratorConfig } from './generator.js';

export function generateEnum(enumType: MEnumType, artifactConfig: AvroGeneratorConfig): AvroEnum {
	return {
		namespace: artifactConfig.namespace,
		type: 'enum',
		name: enumType.name,
		doc: enumType.doc,
		symbols: enumType.entries.map(e => e.name),
	};
}
