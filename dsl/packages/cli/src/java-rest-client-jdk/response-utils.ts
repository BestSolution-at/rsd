import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaRestClientJDKGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { hasFileStreamResult, hasStreamResult, toNodeTree } from '../util.js';
import { MResolvedRSDModel } from '../model.js';

export function generateJDKHttpClientResponseUtils(
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	model: MResolvedRSDModel,
): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl`;

	const importCollector = new JavaImportsCollector(packageName);
	importCollector.importType('java.io.InputStream');
	importCollector.importType('java.io.PipedInputStream');
	importCollector.importType('java.io.PipedOutputStream');
	importCollector.importType('java.io.ByteArrayInputStream');

	importCollector.importType('java.net.http.HttpResponse');
	importCollector.importType('java.net.http.HttpResponse.BodySubscriber');
	importCollector.importType('java.net.http.HttpResponse.BodySubscribers');
	importCollector.importType('java.net.http.HttpResponse.ResponseInfo');
	importCollector.importType('java.nio.ByteBuffer');
	importCollector.importType('java.nio.charset.StandardCharsets');
	importCollector.importType('java.time.LocalDate');
	importCollector.importType('java.time.LocalDateTime');
	importCollector.importType('java.time.LocalTime');
	importCollector.importType('java.time.OffsetDateTime');
	importCollector.importType('java.time.ZonedDateTime');
	importCollector.importType('java.util.function.Consumer');
	importCollector.importType('java.util.List');
	importCollector.importType('java.util.function.Function');
	importCollector.importType('java.util.Optional');
	importCollector.importType('java.util.concurrent.Flow');
	importCollector.importType('java.util.concurrent.Flow.Subscription');
	importCollector.importType('jakarta.json.JsonValue');

	importCollector.importType('java.io.IOException');
	if (hasStreamResult(model)) {
		importCollector.importType('java.nio.file.Files');
		importCollector.importType('java.nio.file.Path');
		importCollector.importType('java.nio.file.StandardCopyOption');
		importCollector.importType(`${artifactConfig.rootPackageName}.model.impl.json._BlobImpl`);
		importCollector.importType(`${artifactConfig.rootPackageName}.model.RSDBlob`);
		if (hasFileStreamResult(model)) {
			importCollector.importType(`${artifactConfig.rootPackageName}.model.impl.json._FileImpl`);
			importCollector.importType(`${artifactConfig.rootPackageName}.model.RSDFile`);
		}
	}

	importCollector.importType('jakarta.json.JsonObject');

	importCollector.importType(`${artifactConfig.rootPackageName}.model.impl.json._JsonUtils`);

	const compilationContent = toNodeTree(`
public class JDKHttpClientResponseUtils {

	public static String toString(HttpResponse<InputStream> response) {
		try (var is = response.body()) {
			return new String(is.readAllBytes(), StandardCharsets.UTF_8);
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	private static String contentType(HttpResponse<InputStream> response) {
		return response.headers().firstValue("Content-Type")
				.orElseThrow(() -> new IllegalStateException("Response is missing Content-Type header"));
	}

	public static <T> T mapObject(HttpResponse<InputStream> response, Function<JsonObject, T> factory, Class<T> type) {
		try (var body = response.body()) {
			return _JsonUtils.parseObject(body, contentType(response), factory, type);
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static String mapString(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseString(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static boolean mapBoolean(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseBoolean(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static short mapShort(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseShort(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static int mapInt(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseInt(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static long mapLong(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseLong(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static double mapDouble(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseDouble(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static float mapFloat(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseFloat(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static <T> T mapLiteral(HttpResponse<InputStream> response, Function<String, T> factory) {
		try (var body = response.body()) {
			return _JsonUtils.parseLiteral(body, contentType(response), factory);
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static LocalDate mapLocalDate(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseLocalDate(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static LocalDateTime mapLocalDateTime(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseLocalDateTime(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static ZonedDateTime mapZonedDateTime(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseZonedDateTime(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static LocalTime mapLocalTime(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseLocalTime(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static OffsetDateTime mapOffsetDateTime(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseOffsetDateTime(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static <T> List<T> mapObjects(HttpResponse<InputStream> response, Function<JsonObject, T> factory, Class<T> type) {
		try (var body = response.body()) {
			return _JsonUtils.parseObjects(body, contentType(response), factory, type);
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static List<String> mapStrings(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseStrings(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static List<Boolean> mapBooleans(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseBooleans(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static List<Short> mapShorts(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseShorts(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static List<Integer> mapInts(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseInts(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static List<Long> mapLongs(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseLongs(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static List<Double> mapDoubles(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseDoubles(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static List<Float> mapFloats(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseFloats(body, contentType(response));
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static <T> List<T> mapLiterals(HttpResponse<InputStream> response, Function<String, T> factory) {
		try (var body = response.body()) {
			return _JsonUtils.parseLiterals(body, contentType(response), factory);
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static List<LocalDate> mapLocalDates(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseLiterals(body, contentType(response), LocalDate::parse);
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static List<LocalDateTime> mapLocalDateTimes(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseLiterals(body, contentType(response), LocalDateTime::parse);
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static List<ZonedDateTime> mapZonedDateTimes(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseLiterals(body, contentType(response), ZonedDateTime::parse);
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static List<LocalTime> mapLocalTimes(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseLiterals(body, contentType(response), LocalTime::parse);
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static List<OffsetDateTime> mapOffsetDateTimes(HttpResponse<InputStream> response) {
		try (var body = response.body()) {
			return _JsonUtils.parseLiterals(body, contentType(response), OffsetDateTime::parse);
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public static BodySubscriber<Void> streamSubscriber(
			ResponseInfo responseInfo,
			Consumer<JsonValue> consumer,
			_JsonUtils.TypeInfo<?> typeInfo) {
		var contentType = responseInfo.headers()
				.firstValue("Content-Type")
				.orElseThrow(() -> new IllegalStateException("Response is missing Content-Type header"));
		if (contentType.startsWith("application/json")) {
			System.err.println("Streaming JSON response");
			return BodySubscribers.ofByteArrayConsumer(new ByteConsumer(b -> {
				consumer.accept(_JsonUtils.decodeValue(new ByteArrayInputStream(b), contentType, typeInfo));
			}));
		} else if (contentType.startsWith("application/vnd.msgpack")) {
			System.err.println("Streaming MsgPack response");
			try {
				var subscriber = new MsgpackStreamSubscriber(consumer);
				return BodySubscribers.fromSubscriber(subscriber);
			} catch (IOException e) {
				throw new IllegalStateException(e);
			}
		} else {
			throw new IllegalStateException("Streaming is not supported for content type: " + contentType);
		}
	}

	static class ByteConsumer implements Consumer<Optional<byte[]>> {
		byte[] buffer = new byte[0];

		private final Consumer<byte[]> consumer;

		ByteConsumer(Consumer<byte[]> consumer) {
			this.consumer = consumer;
		}

		@Override
		public void accept(Optional<byte[]> bytes) {
			bytes.ifPresent(b -> {
				if (b[b.length - 1] == '\\n') {
					if (buffer.length == 0) {
						consumer.accept(b);
					} else {
						var newBuffer = new byte[buffer.length + b.length];
						System.arraycopy(buffer, 0, newBuffer, 0, buffer.length);
						System.arraycopy(b, 0, newBuffer, buffer.length, b.length);
						consumer.accept(newBuffer);
						buffer = new byte[0];
					}
				} else {
					var newBuffer = new byte[buffer.length + b.length];
					System.arraycopy(buffer, 0, newBuffer, 0, buffer.length);
					System.arraycopy(b, 0, newBuffer, buffer.length, b.length);
					buffer = newBuffer;
				}
			});
		}
	}

	static class MsgpackStreamSubscriber implements Flow.Subscriber<List<ByteBuffer>> {
		private final PipedOutputStream out = new PipedOutputStream();
		private final PipedInputStream in;
		private Subscription subscription;

		MsgpackStreamSubscriber(Consumer<JsonValue> consumer) throws IOException {
			in = new PipedInputStream(out, 16 * 1024); // match/exceed typical onNext chunk size
			Thread.ofVirtual().start(() -> {
				_JsonUtils.decodeStream(in, "application/vnd.msgpack", consumer, null);
			});
		}

		public void onSubscribe(Subscription s) {
			subscription = s;
			s.request(1);
		}

		public void onNext(List<ByteBuffer> items) {
			try {
				for (ByteBuffer bb : items) {
					byte[] b = new byte[bb.remaining()];
					bb.get(b);
					out.write(b); // blocks here if the unpacker thread is behind — built-in backpressure
				}
				subscription.request(1);
			} catch (IOException e) {
				subscription.cancel();
			}
		}

		public void onError(Throwable t) {
			try {
				out.close();
			} catch (IOException ignored) {
			}
		}

		public void onComplete() {
			try {
				out.close();
			} catch (IOException ignored) {
			}
		}
	}
}`);

	if (hasStreamResult(model)) {
		const blobContent = new CompositeGeneratorNode(NL);
		blobContent.indent(block => {
			block.append(
				toNodeTree(`
public static String mapFileToString(HttpResponse<Path> response) {
	var file = response.body();
	try {
		return Files.readString(file);
	} catch (IOException e) {
		throw new IllegalStateException(e);
	}
}

public static RSDBlob mapBlob(HttpResponse<InputStream> response) {
	var mimeType = response.headers().firstValue("Content-Type")
			.orElse(null);
	try (var inputStream = response.body()) {
		var file = Files.createTempFile("blob", null);
		Files.copy(inputStream, file, StandardCopyOption.REPLACE_EXISTING);
		return _BlobImpl.of(file, mimeType);
	} catch (IOException e) {
		throw new IllegalStateException(e);
	}
}
`),
			);
			if (hasFileStreamResult(model)) {
				block.append(
					toNodeTree(`
public static RSDFile mapFile(HttpResponse<InputStream> response) {
	var mimeType = response.headers().firstValue("Content-Type")
			.orElse(null);
	var dispoHeader = response.headers()
			.firstValue("Content-Disposition").orElseThrow();
	var fileNameWithQuotes = dispoHeader.substring(dispoHeader.indexOf("filename=") + "filename=".length());
	var fileName = fileNameWithQuotes.substring(1, fileNameWithQuotes.length() - 1);
	try (var inputStream = response.body()) {
		var file = Files.createTempFile("file-blob", null);
		Files.copy(inputStream, file, StandardCopyOption.REPLACE_EXISTING);
		return _FileImpl.of(file, mimeType, fileName);
	} catch (IOException e) {
		throw new IllegalStateException(e);
	}
}
`),
				);
			}
		});

		compilationContent.contents.splice(compilationContent.contents.length - 1, 0, blobContent);
	}

	return {
		name: 'JDKHttpClientResponseUtils.java',
		content: toString(generateCompilationUnit(packageName, importCollector, compilationContent), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
