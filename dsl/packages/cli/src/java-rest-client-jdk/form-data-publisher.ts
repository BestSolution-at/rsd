import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaServerJakartaWSGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { MResolvedRSDModel } from '../model.js';
import { hasStreamParameter, toNodeTree } from '../util.js';

export function generateFormDataPublisherBuilder(
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	model: MResolvedRSDModel,
): Artifact[] {
	if (hasStreamParameter(model)) {
		const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl`;
		const importCollector = new JavaImportsCollector(packageName);
		return [
			{
				name: 'RSDFormDataPublisherBuilder.java',
				content: toString(
					generateCompilationUnit(
						packageName,
						importCollector,
						toNodeTree(`
import java.io.Closeable;
import java.io.IOException;
import java.io.OutputStream;
import java.net.http.HttpRequest.BodyPublisher;
import java.net.http.HttpRequest.BodyPublishers;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import ${artifactConfig.rootPackageName}.model.RSDFile;
import ${artifactConfig.rootPackageName}.model.RSDBlob;

public class RSDFormDataPublisherBuilder implements Closeable {
    public record RSDFormData(BodyPublisher publisher, String contentType) {
    }

    private final String boundary = UUID.randomUUID().toString();
    private final byte[] boundaryBytes = boundary.getBytes();
    private final Path tempFile;
    private final OutputStream stream;

    private static final byte[] CR_LF = "\\r\\n".getBytes();
    private static final byte[] DASHES = "--".getBytes();
    private static final byte[] FIELD_SEP = ": ".getBytes();

    private RSDFormDataPublisherBuilder() {
        try {
            tempFile = Files.createTempFile("multi-form-data", "tmp");
            stream = Files.newOutputStream(tempFile);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    public static RSDFormDataPublisherBuilder create() {
        return new RSDFormDataPublisherBuilder();
    }

    public RSDFormDataPublisherBuilder addString(String parameterName, String content, String contentType) {
        writeBoundary();
        writeField("Content-Disposition", "form-data; name=\\"%s\\"".formatted(parameterName));
        if (contentType != null && !contentType.isBlank()) {
            writeField("Content-Type", contentType);
        }
        write(CR_LF);
        write(content.getBytes());
        write(CR_LF);
        return this;
    }

    public RSDFormDataPublisherBuilder addBlob(String parameterName, RSDBlob blob) {
        writeBoundary();
        writeField("Content-Disposition",
                "form-data; name=\\"%s\\"; filename=\\"%s\\"".formatted(parameterName, blob instanceof RSDFile f ? f.filename() : "blob"));
        blob.mimeType().ifPresent(m -> {
            writeField("Content-Type", m);
        });

        write(CR_LF);
        try {
            blob.stream().transferTo(stream);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
        write(CR_LF);
        return this;
    }

		public RSDFormDataPublisherBuilder addBlob(String parameterName, CharSequence text, String contentType) {
			writeBoundary();
			writeField("Content-Disposition", "form-data; name=\\"%s\\"; filename=\\"%s\\"".formatted(parameterName, "blob"));
			writeField("Content-Type", contentType);

			write(CR_LF);

			try {
				stream.write(text.toString().getBytes());
			} catch (IOException e) {
				throw new IllegalStateException(e);
			}
			write(CR_LF);
			return this;
		}

    public RSDFormData build() {
        try {
            writeEndBoundary();
            stream.close();
            return new RSDFormData(BodyPublishers.ofFile(tempFile),
                    "multipart/form-data; boundary=%s".formatted(boundary));
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    @Override
    public void close() throws IOException {
        this.stream.close();
        Files.deleteIfExists(this.tempFile);
    }

    private void writeBoundary() {
        write(DASHES);
        write(boundaryBytes);
        write(CR_LF);
    }

    private void writeEndBoundary() {
        write(DASHES);
        write(boundaryBytes);
        write(DASHES);
        write(CR_LF);
    }

    private void writeField(String name, String content) {
        write(name.getBytes());
        write(FIELD_SEP);
        write(content.getBytes());
        write(CR_LF);
    }

    private void write(byte[] bytes) {
        try {
            stream.write(bytes);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }
}
`),
					),
					'\t',
				),
				path: toPath(artifactConfig.targetFolder, packageName),
			},
		];
	}
	return [];
}
