import { toNodeTree } from '../util.js';

export function generateBlob(fqn: (type: string) => string) {
	fqn('java.io.InputStream');
	fqn('java.util.Optional');

	return toNodeTree(`
		public interface RSDBlob {
			public InputStream stream();

			public Optional<String> mimeType();

			// public void dispose();
		}`);
}

export function generateFile() {
	return toNodeTree(`
		public interface RSDFile extends RSDBlob {
			public String filename();
		}`);
}
