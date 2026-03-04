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

export function generateServiceUtils(
	artifactConfig: JavaRestClientJDKGeneratorConfig,
	model: MResolvedRSDModel,
): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl`;

	const importCollector = new JavaImportsCollector(packageName);
	importCollector.importType('java.io.InputStream');
	importCollector.importType('java.io.InputStreamReader');

	importCollector.importType('java.net.URLEncoder');
	importCollector.importType('java.net.http.HttpResponse');
	importCollector.importType('java.nio.charset.StandardCharsets');
	importCollector.importType('java.time.LocalDate');
	importCollector.importType('java.time.LocalDateTime');
	importCollector.importType('java.time.ZonedDateTime');
	importCollector.importType('java.util.List');
	importCollector.importType('java.util.Map');
	importCollector.importType('java.util.function.Function');
	importCollector.importType('java.util.stream.Collectors');
	importCollector.importType('java.util.stream.Stream');
	importCollector.importType(`${packageName}.model._JsonUtils`);

	if (hasStreamResult(model)) {
		importCollector.importType('java.io.IOException');
		importCollector.importType('java.nio.file.Files');
		importCollector.importType('java.nio.file.Path');
		importCollector.importType(`${packageName}.model._BlobImpl`);
		importCollector.importType(`${artifactConfig.rootPackageName}.model.RSDBlob`);
		if (hasFileStreamResult(model)) {
			importCollector.importType(`${packageName}.model._FileImpl`);
			importCollector.importType(`${artifactConfig.rootPackageName}.model.RSDFile`);
		}
	}

	importCollector.importType('jakarta.json.Json');
	importCollector.importType('jakarta.json.JsonNumber');
	importCollector.importType('jakarta.json.JsonObject');
	importCollector.importType('jakarta.json.JsonString');
	importCollector.importType('jakarta.json.JsonValue');

	const compilationContent = toNodeTree(`
public class ServiceUtils {
	public static String toQueryString(Object value) {
		if (value == null) {
			return null;
		}
		var text = _JsonUtils.toJsonString(value, false);
		return URLEncoder.encode(text, StandardCharsets.UTF_8);
	}

	public static String toString(HttpResponse<InputStream> response) {
		try (var is = response.body()) {
			return new String(is.readAllBytes(), StandardCharsets.UTF_8);
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	private static JsonValue decodeResponse(HttpResponse<InputStream> response) {
		var contentType = response.headers().firstValue("Content-Type")
				.orElseThrow(() -> new IllegalStateException("Response is missing Content-Type header"));
		if (contentType.startsWith("application/json")) {
			return decodeJsonResponse(response);
		}
		throw new Error("Unsupported response content type: " + contentType);
	}

	private static JsonValue decodeJsonResponse(HttpResponse<InputStream> response) {
		try (var is = response.body()) {
			return Json.createReader(new InputStreamReader(is, StandardCharsets.UTF_8)).readValue();
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	private static String toQueryStringNoEncoding(Object value) {
		if (value == null) {
			return null;
		}
		return value.toString();
	}

	public static String toQueryString(Number value) {
		return toQueryStringNoEncoding(value);
	}

	public static String toQueryString(LocalDate date) {
		return toQueryStringNoEncoding(date);
	}

	public static String toURLQueryPart(Map<String, String> data) {
		var result = data.entrySet().stream()
				.map(e -> "%s=%s".formatted(e.getKey(), e.getValue()))
				.collect(Collectors.joining("&"));
		return result.isEmpty() ? "" : "?" + result;
	}

	public static String[] toHeaders(Map<String, String> data) {
		return data.entrySet().stream()
				.flatMap(e -> Stream.of(e.getKey(), e.getValue()))
				.toArray(String[]::new);
	}

	public static <T> T mapObject(HttpResponse<InputStream> response, Function<JsonObject, T> factory) {
		var data = decodeResponse(response).asJsonObject();
		return factory.apply(data);
	}

	public static String mapString(HttpResponse<InputStream> response) {
		var value = decodeResponse(response);
		return ((JsonString) value).getString();
	}

	public static boolean mapBoolean(HttpResponse<InputStream> response) {
		var value = decodeResponse(response);
		return ((JsonValue.TRUE.equals(value)) ? true : false);
	}

	public static short mapShort(HttpResponse<InputStream> response) {
		var value = decodeResponse(response);
		return (short) ((JsonNumber) value).intValue();
	}

	public static int mapInt(HttpResponse<InputStream> response) {
		var value = decodeResponse(response);
		return ((JsonNumber) value).intValue();
	}

	public static long mapLong(HttpResponse<InputStream> response) {
		var value = decodeResponse(response);
		return ((JsonNumber) value).longValue();
	}

	public static double mapDouble(HttpResponse<InputStream> response) {
		var value = decodeResponse(response);
		return ((JsonNumber) value).doubleValue();
	}

	public static float mapFloat(HttpResponse<InputStream> response) {
		var value = decodeResponse(response);
		return (float) ((JsonNumber) value).doubleValue();
	}

	public static <T> T mapLiteral(HttpResponse<InputStream> response, Function<String, T> factory) {
		return factory.apply(mapString(response));
	}

	public static LocalDate mapLocalDate(HttpResponse<InputStream> response) {
		return mapLiteral(response, LocalDate::parse);
	}

	public static LocalDateTime mapLocalDateTime(HttpResponse<InputStream> response) {
		return mapLiteral(response, LocalDateTime::parse);
	}

	public static ZonedDateTime mapZonedDateTime(HttpResponse<InputStream> response) {
		return mapLiteral(response, ZonedDateTime::parse);
	}

	public static <T> List<T> mapObjects(HttpResponse<InputStream> response, Function<JsonObject, T> factory) {
		var data = decodeResponse(response).asJsonArray();
		return data.getValuesAs(JsonObject.class)
				.stream()
				.map(factory)
				.toList();
	}

	public static List<String> mapStrings(HttpResponse<InputStream> response) {
		var data = decodeResponse(response).asJsonArray();
		return data.getValuesAs(JsonString.class)
				.stream()
				.map(JsonString::getString)
				.toList();
	}

	public static List<Boolean> mapBooleans(HttpResponse<InputStream> response) {
		var data = decodeResponse(response).asJsonArray();
		return data.getValuesAs(v -> v == JsonValue.TRUE)
				.stream()
				.toList();
	}

	public static List<Short> mapShorts(HttpResponse<InputStream> response) {
		var data = decodeResponse(response).asJsonArray();
		return data
				.getValuesAs(JsonNumber.class)
				.stream()
				.map(v -> (short) v.intValue())
				.toList();
	}

	public static List<Integer> mapInts(HttpResponse<InputStream> response) {
		var data = decodeResponse(response).asJsonArray();
		return data
				.getValuesAs(JsonNumber.class)
				.stream()
				.map(v -> v.intValue())
				.toList();
	}

	public static List<Long> mapLongs(HttpResponse<InputStream> response) {
		var data = decodeResponse(response).asJsonArray();
		return data
				.getValuesAs(JsonNumber.class)
				.stream()
				.map(v -> v.longValue())
				.toList();
	}

	public static List<Double> mapDoubles(HttpResponse<InputStream> response) {
		var data = decodeResponse(response).asJsonArray();
		return data
				.getValuesAs(JsonNumber.class)
				.stream()
				.map(v -> v.doubleValue())
				.toList();
	}

	public static List<Float> mapFloats(HttpResponse<InputStream> response) {
		var data = decodeResponse(response).asJsonArray();
		return data
				.getValuesAs(JsonNumber.class)
				.stream()
				.map(v -> (float) v.doubleValue())
				.toList();
	}

	public static <T> List<T> mapLiterals(HttpResponse<InputStream> response, Function<String, T> factory) {
		return mapStrings(response).stream().map(factory).toList();
	}

	public static List<LocalDate> mapLocalDates(HttpResponse<InputStream> response) {
		return mapLiterals(response, LocalDate::parse);
	}

	public static List<LocalDateTime> mapLocalDateTimes(HttpResponse<InputStream> response) {
		return mapLiterals(response, LocalDateTime::parse);
	}

	public static List<ZonedDateTime> mapZonedDateTimes(HttpResponse<InputStream> response) {
		return mapLiterals(response, ZonedDateTime::parse);
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

public static RSDBlob mapBlob(HttpResponse<Path> response) {
	var mimeType = response.headers().firstValue("Content-Type")
			.orElse(null);
	var file = response.body();
	return _BlobImpl.of(file, mimeType);
}
`),
			);
			if (hasFileStreamResult(model)) {
				block.append(
					toNodeTree(`
public static RSDFile mapFile(HttpResponse<Path> response) {
	var mimeType = response.headers().firstValue("Content-Type")
			.orElse(null);
	var file = response.body();
	var dispoHeader = response.headers()
			.firstValue("Content-Disposition").orElseThrow();
	var fileNameWithQuotes = dispoHeader.substring(dispoHeader.indexOf("filename=") + "filename=".length());
	var fileName = fileNameWithQuotes.substring(1, fileNameWithQuotes.length() - 1);
	return _FileImpl.of(file, mimeType, fileName);
}
`),
				);
			}
		});

		compilationContent.contents.splice(compilationContent.contents.length - 1, 0, blobContent);
	}

	return {
		name: 'ServiceUtils.java',
		content: toString(generateCompilationUnit(packageName, importCollector, compilationContent), '\t'),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}
