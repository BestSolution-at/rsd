import { MBuiltinType } from '../model.js';
import { AvroPrimitiveType } from './avro-types.js';

export function mapBuilinType(type: MBuiltinType): AvroPrimitiveType {
	switch (type) {
		case 'string':
			return 'string';
		case 'short':
		case 'int':
			return 'int';
		case 'long':
			return 'long';
		case 'boolean':
			return 'boolean';
		case 'float':
			return 'float';
		case 'double':
			return 'double';
		case 'local-date':
		case 'local-date-time':
		case 'local-time':
		case 'offset-date-time':
		case 'zoned-date-time':
			return 'string';
	}
}
