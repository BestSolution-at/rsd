import { expandToString } from "langium/generate";
import { Artifact } from "../artifact-generator.js";
import { JavaRestClientJDKGeneratorConfig, toPath } from "../java-gen-utils.js";

export function generateServiceUtils(artifactConfig: JavaRestClientJDKGeneratorConfig): Artifact {
    const packageName = `${artifactConfig.rootPackageName}.jdkhttp.impl`;

    const content = expandToString`
        // Generated by RSD - Do not modify
        package ${packageName};

        import java.io.StringReader;
        import java.net.URLEncoder;
        import java.net.http.HttpResponse;
        import java.nio.charset.StandardCharsets;
        import java.time.LocalDate;
        import java.time.LocalDateTime;
        import java.time.ZonedDateTime;
        import java.util.List;
        import java.util.Map;
        import java.util.function.Function;
        import java.util.stream.Collectors;
        import java.util.stream.Stream;

        import at.bestsolution.quti.client.jdkhttp.impl.dto.DTOUtils;
        import jakarta.json.Json;
        import jakarta.json.JsonNumber;
        import jakarta.json.JsonObject;
        import jakarta.json.JsonString;
        import jakarta.json.JsonValue;

        public class ServiceUtils {
            public static String toQueryString(Object value) {
                if( value == null ) {
                    return null;
                }
                var text = DTOUtils.toJsonString(value, false);
                return URLEncoder.encode(text, StandardCharsets.UTF_8);
            }

            private static String toQueryStringNoEncoding(Object value) {
                if( value == null ) {
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
                    .map( e -> "%s=%s".formatted(e.getKey(), e.getValue()))
                    .collect(Collectors.joining("&"));
                return result.isEmpty() ? "" : "?" + result;
            }

            public static String[] toHeaders(Map<String, String> data) {
                return data.entrySet().stream()
                    .flatMap( e -> Stream.of(e.getKey(), e.getValue()))
                    .toArray(String[]::new);
            }

            public static <T> T mapObject(HttpResponse<String> response, Function<JsonObject, T> factory) {
                var data = Json.createReader(new StringReader(response.body())).readObject();
                return factory.apply(data);
            }

            public static String mapString(HttpResponse<String> response) {
                var b = response.body();
                if( "null".equals(b) ) {
                    return null;
                } else if( b.startsWith("\\"") && b.endsWith("\\"") ) {
                    return b.substring(1, b.length() - 1);
                }
                return response.body();
            }

            public static boolean mapBoolean(HttpResponse<String> response) {
                return Boolean.parseBoolean(response.body());
            }

            public static short mapShort(HttpResponse<String> response) {
                return Short.parseShort(response.body());
            }

            public static int mapInt(HttpResponse<String> response) {
                return Integer.parseInt(response.body());
            }

            public static long mapLong(HttpResponse<String> response) {
                return Long.parseLong(response.body());
            }

            public static double mapDouble(HttpResponse<String> response) {
                return Double.parseDouble(response.body());
            }

            public static float mapFloat(HttpResponse<String> response) {
                return Float.parseFloat(response.body());
            }

            public static <T> T mapLiteral(HttpResponse<String> response, Function<String, T> factory) {
                return factory.apply(response.body());
            }

            public static LocalDate mapLocalDate(HttpResponse<String> response) {
                return mapLiteral(response, LocalDate::parse);
            }

            public static LocalDateTime mapLocalDateTime(HttpResponse<String> response) {
                return mapLiteral(response, LocalDateTime::parse);
            }

            public static ZonedDateTime mapZonedDateTime(HttpResponse<String> response) {
                return mapLiteral(response, ZonedDateTime::parse);
            }



            public static <T> List<T> mapObjects(HttpResponse<String> response, Function<JsonObject, T> factory) {
                var data = Json.createReader(new StringReader(response.body())).readArray();
                return data.getValuesAs(JsonObject.class)
                    .stream()
                    .map(factory)
                    .toList();
            }

            public static List<String> mapStrings(HttpResponse<String> response) {
                var data = Json.createReader(new StringReader(response.body())).readArray();
                return data.getValuesAs(JsonString.class)
                    .stream()
                    .map(JsonString::getString)
                    .toList();
            }

            public static List<Boolean> mapBooleans(HttpResponse<String> response) {
                var data = Json.createReader(new StringReader(response.body())).readArray();
                return data.getValuesAs( v -> v == JsonValue.TRUE)
                    .stream()
                    .toList();
            }

            public static List<Short> mapShorts(HttpResponse<String> response) {
                var data = Json.createReader(new StringReader(response.body())).readArray();
                return data
                    .getValuesAs(JsonNumber.class)
                    .stream()
                    .map( v -> v.numberValue().shortValue())
                    .toList();
            }

            public static List<Integer> mapInts(HttpResponse<String> response) {
                var data = Json.createReader(new StringReader(response.body())).readArray();
                return data
                    .getValuesAs(JsonNumber.class)
                    .stream()
                    .map( v -> v.numberValue().intValue())
                    .toList();
            }

            public static List<Long> mapLongs(HttpResponse<String> response) {
                var data = Json.createReader(new StringReader(response.body())).readArray();
                return data
                    .getValuesAs(JsonNumber.class)
                    .stream()
                    .map( v -> v.numberValue().longValue())
                    .toList();
            }

            public static List<Double> mapDoubles(HttpResponse<String> response) {
                var data = Json.createReader(new StringReader(response.body())).readArray();
                return data
                    .getValuesAs(JsonNumber.class)
                    .stream()
                    .map( v -> v.numberValue().doubleValue())
                    .toList();
            }

            public static List<Float> mapFloats(HttpResponse<String> response) {
                var data = Json.createReader(new StringReader(response.body())).readArray();
                return data
                    .getValuesAs(JsonNumber.class)
                    .stream()
                    .map( v -> v.numberValue().floatValue())
                    .toList();
            }

            public static <T> List<T> mapLiterals(HttpResponse<String> response, Function<String, T> factory) {
                return mapStrings(response).stream().map(factory).toList();
            }

            public static List<LocalDate> mapLocalDates(HttpResponse<String> response) {
                return mapLiterals(response, LocalDate::parse);
            }

            public static List<LocalDateTime> mapLocalDateTimes(HttpResponse<String> response) {
                return mapLiterals(response, LocalDateTime::parse);
            }

            public static List<ZonedDateTime> mapZonedDateTimes(HttpResponse<String> response) {
                return mapLiterals(response, ZonedDateTime::parse);
            }
        }
    `;
    return {
        name: 'ServiceUtils.java',
        content,
        path: toPath(artifactConfig.targetFolder, packageName)
    }
}