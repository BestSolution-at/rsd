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
import java.net.http.HttpRequest.BodyPublisher;
import java.net.http.HttpRequest.BodyPublishers;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.Flow.Subscriber;

import ${artifactConfig.rootPackageName}.model.RSDFile;
import ${artifactConfig.rootPackageName}.model.RSDBlob;

public class RSDFormDataPublisherBuilder {
	public record RSDFormData(BodyPublisher publisher, String contentType) {
	}

	interface Part {
		String parameterName();

		String contentType();

		String filename();

		BodyPublisher content();
	}

	static class StringPart implements Part {
		private final String parameterName;
		private final String content;
		private final String contentType;

		public StringPart(String parameterName, String content, String contentType) {
			this.parameterName = parameterName;
			this.content = content;
			this.contentType = contentType;
		}

		@Override
		public String parameterName() {
			return parameterName;
		}

		@Override
		public String contentType() {
			return contentType;
		}

		@Override
		public String filename() {
			return null;
		}

		@Override
		public BodyPublisher content() {
			return BodyPublishers.ofString(content);
		}
	}

	static class BytesPart implements Part {
		private final String parameterName;
		private final byte[] content;
		private final String contentType;

		public BytesPart(String parameterName, byte[] content, String contentType) {
			this.parameterName = parameterName;
			this.content = content;
			this.contentType = contentType;
		}

		@Override
		public String parameterName() {
			return parameterName;
		}

		@Override
		public String contentType() {
			return contentType;
		}

		@Override
		public String filename() {
			return null;
		}

		@Override
		public BodyPublisher content() {
			return BodyPublishers.ofByteArray(content);
		}
	}

	static class BlobPart implements Part {
		private final String parameterName;
		private final RSDBlob blob;

		public BlobPart(String parameterName, RSDBlob blob) {
			this.parameterName = parameterName;
			this.blob = blob;
		}

		@Override
		public String parameterName() {
			return parameterName;
		}

		@Override
		public String contentType() {
			return blob.mimeType().orElse(null);
		}

		@Override
		public String filename() {
			return blob instanceof RSDFile f ? f.filename() : "blob";
		}

		@Override
		public BodyPublisher content() {
			var inputStream = blob.stream();
			return BodyPublishers.ofInputStream(() -> inputStream);
		}
	}

	class PartPublisher implements BodyPublisher {
		private static final byte[] CR_LF = "\\r\\n".getBytes();
		private static final byte[] DASHES = "--".getBytes();
		private static final byte[] FIELD_SEP = ": ".getBytes();

		private final List<BodyPublisher> publishers = new ArrayList<BodyPublisher>();
		public final String boundary = UUID.randomUUID().toString();
		private final byte[] boundaryBytes = boundary.getBytes();

		public PartPublisher(List<Part> parts) {
			if (parts.isEmpty()) {
				var quarkusDummy = new StringPart("_rsdQuarkusBugDummy", "true", "text/plain");
				parts = List.of(quarkusDummy);
			}

			for (var part : parts) {
				publishers.add(createParameterPublisher(part.parameterName(), part.contentType(), part.filename()));
				publishers.add(BodyPublishers.ofByteArray(CR_LF));
				publishers.add(part.content());
				publishers.add(BodyPublishers.ofByteArray(CR_LF));
			}
			System.err.println("BOUNDARY: %s".formatted(boundary) + " PARTS: " + parts.size());
			publishers.add(BodyPublishers.ofByteArrays(endBoundaryBytes()));
		}

		@Override
		public long contentLength() {
			long length = 0;
			for (var publisher : publishers) {
				var l = publisher.contentLength();
				if (l < 0) {
					return -1;
				} else {
					length += l;
				}
			}
			return length;
		}

		@Override
		public void subscribe(Subscriber<? super ByteBuffer> subscriber) {
			BodyPublishers.concat(publishers.toArray(new BodyPublisher[0])).subscribe(subscriber);
		}

		private BodyPublisher createParameterPublisher(String parameterName, String contentType, String filename) {
			var boundary = boundaryBytes();
			var contentDisposition = contentDispositionBytes(parameterName, filename);
			var contentTypeField = contentTypeBytes(contentType);

			var content = new ArrayList<byte[]>();
			content.addAll(boundary);
			content.addAll(contentDisposition);
			content.addAll(contentTypeField);

			return BodyPublishers.ofByteArrays(content);
		}

		private static List<byte[]> contentDispositionBytes(String name, String filename) {
			String content;

			if (filename != null) {
				content = "form-data; name=\\"%s\\"; filename=\\"%s\\"".formatted(name, filename);
			} else {
				content = "form-data; name=\\"%s\\"".formatted(name);
			}
			return fieldBytes("Content-Disposition", content);
		}

		private static List<byte[]> contentTypeBytes(String contentType) {
			return contentType == null ? List.of() : fieldBytes("Content-Type", contentType);
		}

		private static List<byte[]> fieldBytes(String name, String content) {
			return List.of(name.getBytes(), FIELD_SEP, content.getBytes(), CR_LF);
		}

		private List<byte[]> boundaryBytes() {
			return List.of(DASHES, boundaryBytes, CR_LF);
		}

		private List<byte[]> endBoundaryBytes() {
			return List.of(DASHES, boundaryBytes, DASHES, CR_LF);
		}
	}

	private final List<Part> parts = new ArrayList<>();

	public static RSDFormDataPublisherBuilder create() {
		return new RSDFormDataPublisherBuilder();
	}

	public RSDFormDataPublisherBuilder addString(String parameterName, String content, String contentType) {
		this.parts.add(new StringPart(parameterName, content, contentType));
		return this;
	}

	public RSDFormDataPublisherBuilder addBytes(String parameterName, byte[] content, String contentType) {
		this.parts.add(new BytesPart(parameterName, content, contentType));
		return this;
	}

	public RSDFormDataPublisherBuilder addBlob(String parameterName, RSDBlob blob) {
		this.parts.add(new BlobPart(parameterName, blob));
		return this;
	}

	public RSDFormData build() {
		var publisher = new PartPublisher(parts);
		var contentType = "multipart/form-data; boundary=%s".formatted(publisher.boundary);
		return new RSDFormData(publisher, contentType);
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
