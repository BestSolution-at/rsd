import { CompositeGeneratorNode } from 'langium/generate';
import { toNodeTree } from '../util.js';

export function generateBlobImpl(interfaceBasePackage: string, fqn: (type: string) => string): CompositeGeneratorNode {
	fqn('java.io.InputStream');
	fqn('java.util.Optional');
	fqn('java.util.function.Consumer');
	fqn('java.nio.file.Path');
	fqn('java.nio.file.Files');
	fqn('java.io.IOException');

	fqn(`${interfaceBasePackage}.RSDBlob`);

	return toNodeTree(`
public class _BlobImpl implements RSDBlob {
	private final Path file;
	private final String mimeType;
	protected boolean disposed = false;
	private boolean consumed = false;
	private final Consumer<Path> disposer;

	_BlobImpl(Path file, String mimeType, Consumer<Path> disposer) {
		this.file = file;
		this.mimeType = mimeType;
		this.disposer = disposer;
	}

	@Override
	public InputStream stream() {
		if (disposed) {
			throw new IllegalStateException("Blob has been disposed");
		}
		if (consumed) {
			throw new IllegalStateException("Stream has already been consumed");
		}
		consumed = true;
		try {
			return Files.newInputStream(file);
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	@Override
	public Optional<String> mimeType() {
		if (disposed) {
			throw new IllegalStateException("Blob has been disposed");
		}
		return Optional.ofNullable(mimeType);
	}

	public static RSDBlob of(Path file, String mimeType) {
		return new _BlobImpl(file, mimeType, null);
	}

	public static RSDBlob of(Path file, String mimeType, Consumer<Path> disposer) {
		return new _BlobImpl(file, mimeType, disposer);
	}

	@Override
	public void dispose() {
		disposed = true;
		if (disposer != null) {
			disposer.accept(file);
		}
	}
}`);
}

export function generateFileImpl(interfaceBasePackage: string, fqn: (type: string) => string) {
	fqn('java.util.Objects');
	fqn('java.nio.file.Path');
	fqn('java.util.function.Consumer');
	fqn(`${interfaceBasePackage}.RSDFile`);

	return toNodeTree(`
public class _FileImpl extends _BlobImpl implements RSDFile {
	private final String filename;

	_FileImpl(Path file, String mimeType, String filename, Consumer<Path> disposer) {
		super(file, mimeType, disposer);
		this.filename = Objects.requireNonNull(filename);
	}

	@Override
	public String filename() {
		if (disposed) {
			throw new IllegalStateException("File has been disposed");
		}
		return filename;
	}

	public static final RSDFile of(Path file, String mimeType, String filename) {
		return new _FileImpl(file, mimeType, filename, null);
	}

	public static final RSDFile of(Path file, String mimeType, String filename, Consumer<Path> disposer) {
		return new _FileImpl(file, mimeType, filename, disposer);
	}
}`);
}

export function generateStreamBlobImpl(
	interfaceBasePackage: string,
	fqn: (type: string) => string,
): CompositeGeneratorNode {
	fqn('java.io.InputStream');
	fqn('java.util.Optional');
	fqn(`${interfaceBasePackage}.RSDBlob`);

	return toNodeTree(`
public class _StreamBlobImpl implements RSDBlob {
	private final String mimeType;
	private final InputStream stream;
	private boolean consumed = false;
	private boolean disposed = false;

	public _StreamBlobImpl(InputStream stream, String mimeType) {
		this.mimeType = mimeType;
		this.stream = stream;
	}

	@Override
	public InputStream stream() {
		if (disposed) {
			throw new IllegalStateException("Blob has been disposed");
		}

		if (consumed) {
			throw new IllegalStateException("Stream has already been consumed");
		}
		consumed = true;
		return stream;
	}

	@Override
	public Optional<String> mimeType() {
		if (disposed) {
			throw new IllegalStateException("Blob has been disposed");
		}
		return Optional.ofNullable(mimeType);
	}

	public static RSDBlob of(InputStream stream, String mimeType) {
		return new _StreamBlobImpl(stream, mimeType);
	}

	@Override
	public void dispose() {
		disposed = true;
	}
}`);
}

export function generateStreamFileImpl(interfaceBasePackage: string, fqn: (type: string) => string) {
	fqn('java.io.InputStream');
	fqn('java.util.Objects');
	fqn(`${interfaceBasePackage}.RSDFile`);

	return toNodeTree(`
public class _StreamFileImpl extends _StreamBlobImpl implements RSDFile {
	private final String filename;
	private boolean disposed = false;

	public _StreamFileImpl(InputStream stream, String mimeType, String filename) {
		super(stream, mimeType);
		this.filename = Objects.requireNonNull(filename);
	}

	@Override
	public String filename() {
		if (disposed) {
			throw new IllegalStateException("File has been disposed");
		}
		return filename;
	}

	public static RSDFile of(InputStream stream, String mimeType, String filename) {
		return new _StreamFileImpl(stream, mimeType, filename);
	}

}`);
}
