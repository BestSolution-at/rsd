import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaServerJakartaWSGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { MResolvedRSDModel } from '../model.js';
import { hasFileStreamResult, hasStreamResult, toNodeTree } from '../util.js';

export function generateRestUtils(
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	model: MResolvedRSDModel,
): Artifact[] {
	if (model.errors.length === 0 && !hasStreamResult(model)) {
		return [];
	}
	const packageName = `${artifactConfig.rootPackageName}.rest`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	const node = generateRestUtilsContent(model, artifactConfig, packageName, fqn);

	return [
		{
			name: '_RestUtils.java',
			content: toString(generateCompilationUnit(packageName, importCollector, node), '\t'),
			path: toPath(artifactConfig.targetFolder, packageName),
		},
	];
}

function generateRestUtilsContent(
	model: MResolvedRSDModel,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	packageName: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	node.append('public class _RestUtils {', NL);
	node.indent(classBody => {
		classBody.append(parseFunctions(artifactConfig, fqn));
		if (model.errors.length > 0) {
			classBody.append(toResponse(artifactConfig, packageName, fqn));
		}
		if (hasStreamResult(model)) {
			classBody.append(NL, NL);
			classBody.append(generateStreamResultHelper(artifactConfig, model, fqn));
		}
	});
	node.append('}', NL);
	return node;
}

function generateStreamResultHelper(
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	model: MResolvedRSDModel,
	fqn: (type: string) => string,
) {
	const StreamingOutput = fqn('jakarta.ws.rs.core.StreamingOutput');
	const _Blob = fqn(`${artifactConfig.rootPackageName}.service.model.RSDBlob`);
	fqn('java.io.OutputStream');
	fqn('java.io.IOException');
	fqn('jakarta.ws.rs.WebApplicationException');
	fqn('jakarta.ws.rs.core.Response');
	fqn('jakarta.ws.rs.core.MediaType');

	const result = new CompositeGeneratorNode();

	result.append(`public static Response.ResponseBuilder toStreamResponse(int status, ${_Blob} blob) {`, NL);
	result.indent(mBody => {
		mBody.append(`class FileStreamingOutput implements ${StreamingOutput} {`, NL);
		mBody.indent(cBody => {
			cBody.append('@Override', NL);
			cBody.append('public void write(OutputStream output) throws IOException, WebApplicationException {', NL);
			cBody.indent(mInnerBody => {
				mInnerBody.append('blob.stream().transferTo(output);', NL);
			});
			cBody.append('}', NL);
		});
		mBody.append('}', NL);
		mBody.append(
			'var mediaType = blob.mimeType().map(MediaType::valueOf).orElse(MediaType.APPLICATION_OCTET_STREAM_TYPE);',
			NL,
		);
		mBody.append('var builder = Response.status(status).entity(new FileStreamingOutput()).type(mediaType);', NL);
		if (hasFileStreamResult(model)) {
			fqn(`${artifactConfig.rootPackageName}.service.model.RSDFile`);
			mBody.append('if (blob instanceof RSDFile f) {', NL);
			mBody.indent(block => {
				block.append('var fileName = f.filename().replace("\\"", "");', NL);
				block.append(
					'builder = builder.header("Content-Disposition", "attachment; filename=\\"" + fileName + "\\"");',
					NL,
				);
			});
			mBody.append('}', NL);
		}

		mBody.append('return builder;', NL);
	});
	result.append('}', NL);
	return result;
}

function toResponse(
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	packageName: string,
	fqn: (type: string) => string,
) {
	fqn(`${packageName}.model._JsonUtils`);
	fqn(`${artifactConfig.rootPackageName}.service.RSDException`);
	fqn('jakarta.ws.rs.core.Response');

	return toNodeTree(`
public static Response toResponse(int status, RSDException e) {
	if (e instanceof RSDException.RSDStructuredDataException s) {
		return Response.status(status)
				.header("X-RSD-Error-Type", e.type)
				.header("X-RSD-Error-Message", e.getMessage())
				.type(MediaType.APPLICATION_JSON_TYPE)
				.entity(_JsonUtils.toJsonString(s.data, false)).build();
	}
	return Response.status(status)
			.header("X-RSD-Error-Type", e.type)
			.header("X-RSD-Error-Message", e.getMessage())
			.type(MediaType.TEXT_PLAIN_TYPE)
			.entity(e.getMessage()).build();
}`);
}

function parseFunctions(artifactConfig: JavaServerJakartaWSGeneratorConfig, fqn: (type: string) => string) {
	fqn('java.time.ZonedDateTime');
	fqn('java.time.LocalDateTime');
	fqn('java.time.LocalDate');
	fqn('java.util.Optional');
	fqn('java.util.OptionalLong');
	fqn('java.util.OptionalInt');
	fqn('java.util.Optional');
	fqn('java.util.OptionalDouble');
	fqn('java.util.function.Function');
	fqn('java.util.List');
	fqn('java.util.regex.Pattern');
	fqn(`${artifactConfig.rootPackageName}.service.model._Base`);
	fqn(`${artifactConfig.rootPackageName}.rest.model._NillableImpl`);
	return toNodeTree(`
public static String fromEscapedAscii(String value) {
	var p = Pattern.compile("\\\\\\\\u([0-9a-fA-F]{4})").matcher(value);
	while (p.find()) {
		String ch = String.valueOf((char) Integer.parseInt(p.group(1), 16));
		value = value.replace(p.group(0), ch);
	}
	return value;
}

public static <T> T parseLiteral(String value, Function<String, T> parser) {
	return parser.apply(value);
}

public static <T> Optional<T> parseOptLiteral(String value, Function<String, T> parser) {
	return value != null ? Optional.of(parser.apply(value)) : Optional.empty();
}

public static <T> Optional<T> parseNullLiteral(String value, Function<String, T> parser) {
	return "null".equals(value) ? Optional.empty() : Optional.of(parser.apply(value));
}

public static <T> _Base.Nillable<T> parseNilLiteral(String value, Function<String, T> parser) {
	if (value == null) {
		return _NillableImpl.undefined();
	} else if ("null".equals(value)) {
		return _NillableImpl.nill();
	} else {
		return _NillableImpl.of(parser.apply(value));
	}
}

public static String parseString(String value) {
	return value;
}

public static Optional<String> parseOptString(String value) {
	return parseOptLiteral(value, Function.identity());
}

public static Optional<String> parseNullString(String value) {
	return "null".equals(value) ? Optional.empty() : Optional.of(value);
}

public static _Base.Nillable<String> parseNilString(String value) {
	return parseNilLiteral(value, Function.identity());
}

public static short parseShort(String value) {
	return Short.parseShort(value);
}

public static Optional<Short> parseOptShort(String value) {
	return parseOptLiteral(value, Short::valueOf);
}

public static Optional<Short> parseNullShort(String value) {
	return parseNullLiteral(value, Short::valueOf);
}

public static _Base.Nillable<Short> parseNilShort(String value) {
	return parseNilLiteral(value, Short::valueOf);
}

public static int parseInt(String value) {
	return Integer.parseInt(value);
}

public static OptionalInt parseOptInt(String value) {
	return value != null ? OptionalInt.of(Integer.parseInt(value)) : OptionalInt.empty();
}

public static OptionalInt parseNullInt(String value) {
	return "null".equals(value) ? OptionalInt.empty() : OptionalInt.of(Integer.parseInt(value));
}

public static _Base.Nillable<Integer> parseNilInt(String value) {
	return parseNilLiteral(value, Integer::valueOf);
}

public static long parseLong(String value) {
	return Long.parseLong(value);
}

public static OptionalLong parseOptLong(String value) {
	return value != null ? OptionalLong.of(Long.parseLong(value)) : OptionalLong.empty();
}

public static OptionalLong parseNullLong(String value) {
	return "null".equals(value) ? OptionalLong.empty() : OptionalLong.of(Long.parseLong(value));
}

public static _Base.Nillable<Long> parseNilLong(String value) {
	return parseNilLiteral(value, Long::valueOf);
}

public static boolean parseBoolean(String value) {
	return Boolean.parseBoolean(value);
}

public static Optional<Boolean> parseOptBoolean(String value) {
	return parseOptLiteral(value, Boolean::valueOf);
}

public static Optional<Boolean> parseNullBoolean(String value) {
	return parseNullLiteral(value, Boolean::valueOf);
}

public static _Base.Nillable<Boolean> parseNilBoolean(String value) {
	return parseNilLiteral(value, Boolean::valueOf);
}

public static float parseFloat(String value) {
	return Float.parseFloat(value);
}

public static Optional<Float> parseOptFloat(String value) {
	return parseOptLiteral(value, Float::valueOf);
}

public static Optional<Float> parseNullFloat(String value) {
	return parseNullLiteral(value, Float::valueOf);
}

public static _Base.Nillable<Float> parseNilFloat(String value) {
	return parseNilLiteral(value, Float::valueOf);
}

public static double parseDouble(String value) {
	return Double.parseDouble(value);
}

public static OptionalDouble parseOptDouble(String value) {
	return value != null ? OptionalDouble.of(Double.parseDouble(value)) : OptionalDouble.empty();
}

public static OptionalDouble parseNullDouble(String value) {
	return "null".equals(value) ? OptionalDouble.empty() : OptionalDouble.of(Double.parseDouble(value));
}

public static _Base.Nillable<Double> parseNilDouble(String value) {
	return parseNilLiteral(value, Double::valueOf);
}

public static LocalDate parseLocalDate(String value) {
	return parseLiteral(value, LocalDate::parse);
}

public static Optional<LocalDate> parseOptLocalDate(String value) {
	return parseOptLiteral(value, LocalDate::parse);
}

public static Optional<LocalDate> parseNullLocalDate(String value) {
	return parseNullLiteral(value, LocalDate::parse);
}

public static _Base.Nillable<LocalDate> parseNilLocalDate(String value) {
	return parseNilLiteral(value, LocalDate::parse);
}

public static LocalDateTime parseLocalDateTime(String value) {
	return parseLiteral(value, LocalDateTime::parse);
}

public static Optional<LocalDateTime> parseOptLocalDateTime(String value) {
	return parseOptLiteral(value, LocalDateTime::parse);
}

public static Optional<LocalDateTime> parseNullLocalDateTime(String value) {
	return parseNullLiteral(value, LocalDateTime::parse);
}

public static _Base.Nillable<LocalDateTime> parseNilLocalDateTime(String value) {
	return parseNilLiteral(value, LocalDateTime::parse);
}

public static ZonedDateTime parseZonedDateTime(String value) {
	return parseLiteral(value, ZonedDateTime::parse);
}

public static Optional<ZonedDateTime> parseOptZonedDateTime(String value) {
	return parseOptLiteral(value, ZonedDateTime::parse);
}

public static Optional<ZonedDateTime> parseNullZonedDateTime(String value) {
	return parseNullLiteral(value, ZonedDateTime::parse);
}

public static _Base.Nillable<ZonedDateTime> parseNilZonedDateTime(String value) {
	return parseNilLiteral(value, ZonedDateTime::parse);
}

public static <T> List<T> mapLiterals(List<String> data, Function<String, T> mapper) {
	return data.stream().map(mapper).toList();
}

public static <T> Optional<List<T>> mapOptLiterals(List<String> data, Function<String, T> mapper) {
	return data != null ? Optional.of(data.stream().map(mapper).toList()) : Optional.empty();
}

public static <T> Optional<List<T>> mapNullLiterals(List<String> data, Function<String, T> mapper) {
	if (data == null) {
		return Optional.empty();
	}
	return Optional.of(data.stream().map(mapper).toList());
}

public static <T> _Base.Nillable<List<T>> mapNilLiterals(List<String> data, Function<String, T> mapper) {
	if (data == null) {
		return _NillableImpl.undefined();
	}
	return _NillableImpl.of(data.stream().map(mapper).toList());
}

public static List<Boolean> mapBooleans(List<String> data) {
	return mapLiterals(data, Boolean::valueOf);
}

public static Optional<List<Boolean>> mapOptBooleans(List<String> data) {
	return mapOptLiterals(data, Boolean::valueOf);
}

public static Optional<List<Boolean>> mapNullBooleans(List<String> data) {
	return mapNullLiterals(data, Boolean::valueOf);
}

public static _Base.Nillable<List<Boolean>> mapNilBooleans(List<String> data) {
	return mapNilLiterals(data, Boolean::valueOf);
}

public static List<Short> mapShorts(List<String> data) {
	return mapLiterals(data, Short::valueOf);
}

public static Optional<List<Short>> mapOptShorts(List<String> data) {
	return mapOptLiterals(data, Short::valueOf);
}

public static Optional<List<Short>> mapNullShorts(List<String> data) {
	return mapNullLiterals(data, Short::valueOf);
}

public static _Base.Nillable<List<Short>> mapNilShorts(List<String> data) {
	return mapNilLiterals(data, Short::valueOf);
}

public static List<Integer> mapInts(List<String> data) {
	return mapLiterals(data, Integer::valueOf);
}

public static Optional<List<Integer>> mapOptInts(List<String> data) {
	return mapOptLiterals(data, Integer::valueOf);
}

public static Optional<List<Integer>> mapNullInts(List<String> data) {
	return mapNullLiterals(data, Integer::valueOf);
}

public static _Base.Nillable<List<Integer>> mapNilInts(List<String> data) {
	return mapNilLiterals(data, Integer::valueOf);
}

public static List<Long> mapLongs(List<String> data) {
	return mapLiterals(data, Long::valueOf);
}

public static Optional<List<Long>> mapOptLongs(List<String> data) {
	return mapOptLiterals(data, Long::valueOf);
}

public static Optional<List<Long>> mapNullLongs(List<String> data) {
	return mapNullLiterals(data, Long::valueOf);
}

public static _Base.Nillable<List<Long>> mapNilLongs(List<String> data) {
	return mapNilLiterals(data, Long::valueOf);
}

public static List<Float> mapFloats(List<String> data) {
	return mapLiterals(data, Float::valueOf);
}

public static Optional<List<Float>> mapOptFloats(List<String> data) {
	return mapOptLiterals(data, Float::valueOf);
}

public static Optional<List<Float>> mapNullFloats(List<String> data) {
	return mapNullLiterals(data, Float::valueOf);
}

public static _Base.Nillable<List<Float>> mapNilFloats(List<String> data) {
	return mapNilLiterals(data, Float::valueOf);
}

public static List<Double> mapDoubles(List<String> data) {
	return mapLiterals(data, Double::valueOf);
}

public static Optional<List<Double>> mapOptDoubles(List<String> data) {
	return mapOptLiterals(data, Double::valueOf);
}

public static Optional<List<Double>> mapNullDoubles(List<String> data) {
	return mapNullLiterals(data, Double::valueOf);
}

public static _Base.Nillable<List<Double>> mapNilDoubles(List<String> data) {
	return mapNilLiterals(data, Double::valueOf);
}

public static List<String> mapStrings(List<String> data) {
	return mapLiterals(data, Function.identity());
}

public static Optional<List<String>> mapOptStrings(List<String> data) {
	return mapOptLiterals(data, Function.identity());
}

public static Optional<List<String>> mapNullStrings(List<String> data) {
	return mapNullLiterals(data, Function.identity());
}

public static _Base.Nillable<List<String>> mapNilStrings(List<String> data) {
	return mapNilLiterals(data, Function.identity());
}

public static List<LocalDate> mapLocalDates(List<String> data) {
	return mapLiterals(data, LocalDate::parse);
}

public static Optional<List<LocalDate>> mapOptLocalDates(List<String> data) {
	return mapOptLiterals(data, LocalDate::parse);
}

public static Optional<List<LocalDate>> mapNullLocalDates(List<String> data) {
	return mapNullLiterals(data, LocalDate::parse);
}

public static _Base.Nillable<List<LocalDate>> mapNilLocalDates(List<String> data) {
	return mapNilLiterals(data, LocalDate::parse);
}

public static List<LocalDateTime> mapLocalDateTimes(List<String> data) {
	return mapLiterals(data, LocalDateTime::parse);
}

public static Optional<List<LocalDateTime>> mapOptLocalDateTimes(List<String> data) {
	return mapOptLiterals(data, LocalDateTime::parse);
}

public static Optional<List<LocalDateTime>> mapNullLocalDateTimes(List<String> data) {
	return mapNullLiterals(data, LocalDateTime::parse);
}

public static _Base.Nillable<List<LocalDateTime>> mapNilLocalDateTimes(List<String> data) {
	return mapNilLiterals(data, LocalDateTime::parse);
}

public static List<ZonedDateTime> mapZonedDateTimes(List<String> data) {
	return mapLiterals(data, ZonedDateTime::parse);
}

public static Optional<List<ZonedDateTime>> mapOptZonedDateTimes(List<String> data) {
	return mapOptLiterals(data, ZonedDateTime::parse);
}

public static Optional<List<ZonedDateTime>> mapNullZonedDateTimes(List<String> data) {
	return mapNullLiterals(data, ZonedDateTime::parse);
}

public static _Base.Nillable<List<ZonedDateTime>> mapNilZonedDateTimes(List<String> data) {
	return mapNilLiterals(data, ZonedDateTime::parse);
}

public static <T> List<T> mapObjects(List<String> data, Function<String, T> mapper) {
	return data.stream().map(mapper).toList();
}

public static <T> Optional<List<T>> mapOptObjects(List<String> data, Function<String, T> mapper) {
	return data != null ? Optional.of(data.stream().map(mapper).toList()) : Optional.empty();
}

public static <T> Optional<List<T>> mapNullObjects(List<String> data, Function<String, T> mapper) {
	if (data == null) {
		return Optional.empty();
	}
	return Optional.of(data.stream().map(mapper).toList());
}

public static <T> _Base.Nillable<List<T>> mapNilObjects(List<String> data, Function<String, T> mapper) {
	if (data == null) {
		return _NillableImpl.undefined();
	}
	return _NillableImpl.of(data.stream().map(mapper).toList());
}

public static <T> T parseObject(String value, Function<String, T> parser) {
	return parseLiteral(value, parser);
}

public static <T> Optional<T> parseOptObject(String value, Function<String, T> parser) {
	return parseOptLiteral(value, parser);
}

public static <T> Optional<T> parseNullObject(String value, Function<String, T> parser) {
	return parseNullLiteral(value, parser);
}

public static <T> _Base.Nillable<T> parseNilObject(String value, Function<String, T> parser) {
	return parseNilLiteral(value, parser);
}
`);
}
