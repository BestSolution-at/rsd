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
			classBody.append(NL);
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

	const node = new CompositeGeneratorNode();
	node.append('public static Response toResponse(int status, RSDException e) {', NL);
	node.indent(methodBody => {
		methodBody.append('if (e instanceof RSDException.RSDStructuredDataException s) {', NL);
		methodBody.indent(block => {
			block.append('return Response.status(status)', NL);
			block.indent(t =>
				t.indent(chain => {
					chain.append('.header("X-RSD-Error-Type", e.type)', NL);
					chain.append('.header("X-RSD-Error-Message", e.getMessage())', NL);
					chain.append('.entity(_JsonUtils.toJsonString(s.data, false)).build();', NL);
				}),
			);
		});
		methodBody.append('}', NL);
		methodBody.append('return Response.status(status)', NL);
		methodBody.indent(t =>
			t.indent(chain => {
				chain.append('.header("X-RSD-Error-Type", e.type)', NL);
				chain.append('.header("X-RSD-Error-Message", e.getMessage())', NL);
				chain.append('.entity(_JsonUtils.encodeAsJsonString(e.getMessage())).build();', NL);
				chain.append();
			}),
		);
	});

	node.append('}', NL);

	return node;
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
	fqn(`${artifactConfig.rootPackageName}.service.model._Base`);
	fqn(`${artifactConfig.rootPackageName}.rest.model._NillableImpl`);
	return toNodeTree(`
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

public static String parseNullString(String value) {
	return "null".equals(value) ? null : value;
}

public static _Base.Nillable<String> parseNilableString(String value) {
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

public static _Base.Nillable<Short> parseNilableShort(String value) {
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

public static _Base.Nillable<Integer> parseNilableInt(String value) {
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

public static _Base.Nillable<Long> parseNilableLong(String value) {
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

public static _Base.Nillable<Boolean> parseNilableBoolean(String value) {
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

public static _Base.Nillable<Float> parseNilableFloat(String value) {
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

public static _Base.Nillable<Double> parseNilableDouble(String value) {
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

public static _Base.Nillable<LocalDate> parseNilableLocalDate(String value) {
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

public static _Base.Nillable<LocalDateTime> parseNilableLocalDateTime(String value) {
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

public static _Base.Nillable<ZonedDateTime> parseNilableZonedDateTime(String value) {
	return parseNilLiteral(value, ZonedDateTime::parse);
}
`);
}
