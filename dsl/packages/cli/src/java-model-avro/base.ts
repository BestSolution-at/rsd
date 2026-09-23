import { CompositeGeneratorNode } from 'langium/generate';
import { toNodeTree } from '../util.js';

export function generateBaseDTOContent(): CompositeGeneratorNode {
	return toNodeTree(`
import org.apache.avro.generic.GenericRecord;

public class _BaseDataImpl {
	public final GenericRecord data;

	public _BaseDataImpl(GenericRecord data) {
		this.data = data;
	}
}`);
}
