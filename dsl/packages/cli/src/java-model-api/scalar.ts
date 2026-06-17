import { MScalarType } from '../model.js';
import { toNodeTree } from '../util.js';

export function generateScalarContent(t: MScalarType) {
	return toNodeTree(`
public record ${t.name}(String value) {
    public static ${t.name} of(String value) {
        return new ${t.name}(value);
    }

    @Override
    public String toString() {
        return value;
    }
}
`);
}
