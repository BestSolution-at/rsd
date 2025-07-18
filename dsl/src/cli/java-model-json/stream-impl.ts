import { CompositeGeneratorNode, NL } from 'langium/generate';

export function generateBlobImpl(
  interfaceBasePackage: string
): CompositeGeneratorNode {
  const rv = new CompositeGeneratorNode();
  rv.append('import java.io.IOException;', NL);
  rv.append('import java.io.InputStream;', NL);
  rv.append('import java.nio.file.Files;', NL);
  rv.append('import java.nio.file.Path;', NL);
  rv.append('import java.util.Optional;', NL);
  rv.appendNewLine();
  rv.append(`import ${interfaceBasePackage}.RSDBlob;`, NL);
  rv.appendNewLine();
  rv.append('public class _BlobImpl implements RSDBlob {', NL);
  rv.indent((cBody) => {
    cBody.append('private final Path file;', NL);
    cBody.append('private final String mimeType;', NL);
    cBody.appendNewLine();
    cBody.append('_BlobImpl(Path file, String mimeType) {', NL);
    cBody.indent((mBody) => {
      mBody.append('this.file = file;', NL);
      mBody.append('this.mimeType = mimeType;', NL);
    });
    cBody.append('}', NL);
    cBody.appendNewLine();
    cBody.append('@Override', NL);
    cBody.append('public InputStream stream() {', NL);
    cBody.indent((mBody) => {
      mBody.append('try {', NL);
      mBody.indent((block) => {
        block.append('return Files.newInputStream(file);', NL);
      });
      mBody.append('} catch(IOException e) {', NL);
      mBody.indent((block) => {
        block.append('throw new IllegalStateException(e);', NL);
      });
      mBody.append('}', NL);
    });
    cBody.append('}', NL);
    cBody.appendNewLine();

    cBody.append('@Override', NL);
    cBody.append('public Optional<String> mimeType() {', NL);
    cBody.indent((mBody) => {
      mBody.append('return Optional.ofNullable(mimeType);', NL);
    });
    cBody.append('}', NL);
    cBody.appendNewLine();

    cBody.append('public static RSDBlob of(Path file, String mimeType) {', NL);
    cBody.indent((mBody) => {
      mBody.append('return new _BlobImpl(file, mimeType);', NL);
    });
    cBody.append('}', NL);
  });
  rv.append('}', NL);
  return rv;
}

export function generateFileImpl(interfaceBasePackage: string) {
  const rv = new CompositeGeneratorNode();
  rv.append('import java.nio.file.Path;', NL);
  rv.append('import java.util.Objects;', NL);
  rv.appendNewLine();
  rv.append(`import ${interfaceBasePackage}.RSDFile;`, NL);
  rv.appendNewLine();
  rv.append(
    'public class _FileImpl extends _BlobImpl implements RSDFile {',
    NL
  );
  rv.indent((cBody) => {
    cBody.append('private final String filename;', NL);
    cBody.appendNewLine();
    cBody.append(
      '_FileImpl(Path file, String mimeType, String filename) {',
      NL
    );
    cBody.indent((mBody) => {
      mBody.append('super(file, mimeType);', NL);
      mBody.append('this.filename = Objects.requireNonNull(filename);', NL);
    });
    cBody.append('}', NL);
    cBody.appendNewLine();
    cBody.append('@Override', NL);
    cBody.append('public String filename() {', NL);
    cBody.indent((mBody) => {
      mBody.append('return filename;', NL);
    });
    cBody.append('}', NL);
    cBody.appendNewLine();

    cBody.append(
      'public static final RSDFile of(Path file, String mimeType, String filename) {',
      NL
    );
    cBody.indent((mBody) => {
      mBody.append('return new _FileImpl(file, mimeType, filename);', NL);
    });
    cBody.append('}', NL);
  });
  rv.append('}', NL);
  return rv;
}
