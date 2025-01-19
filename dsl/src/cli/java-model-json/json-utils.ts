import { CompositeGeneratorNode, NL } from 'langium/generate';

export function generateJsonUtilsContent(
  fqn: (type: string) => string
): CompositeGeneratorNode {
  fqn('java.io.StringReader');
  fqn('java.io.StringWriter');
  fqn('java.time.LocalDate');
  fqn('java.time.LocalDateTime');
  fqn('java.time.ZonedDateTime');
  fqn('java.util.List');
  fqn('java.util.Map');
  fqn('java.util.function.Function');
  fqn('java.util.stream.Collector');
  fqn('java.util.stream.Stream');
  fqn('jakarta.json.Json');
  fqn('jakarta.json.JsonArray');
  fqn('jakarta.json.JsonArrayBuilder');
  fqn('jakarta.json.JsonNumber');
  fqn('jakarta.json.JsonObject');
  fqn('jakarta.json.JsonString');
  fqn('jakarta.json.JsonValue');
  fqn('jakarta.json.stream.JsonGenerator');

  const node = new CompositeGeneratorNode();
  node.append('public class _JsonUtils {', NL);
  node.indent((classBody) => {
    classBody.append(
      generateSingleLineMethod(
        'public static boolean hasValue(JsonObject object, String property)',
        'return object.containsKey(property) && !object.isNull(property)'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static String mapString(JsonObject object, String property)',
        'return object.getString(property)'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static String mapString(JsonObject object, String property, String defaultValue)',
        'return object.getString(property, defaultValue)'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static boolean mapBoolean(JsonObject object, String property)',
        'return object.getBoolean(property)'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static boolean mapBoolean(JsonObject object, String property, boolean defaultValue)',
        'return object.getBoolean(property, defaultValue)'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static short mapShort(JsonObject object, String property)',
        'return (short) object.getInt(property)'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static short mapShort(JsonObject object, String property, short defaultValue)',
        'return (short) object.getInt(property, defaultValue)'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static int mapInt(JsonObject object, String property)',
        'return object.getInt(property)'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static int mapInt(JsonObject object, String property, int defaultValue)',
        'return object.getInt(property, defaultValue)'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static long mapLong(JsonObject object, String property)',
        'return object.getJsonNumber(property).longValue()'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static long mapLong(JsonObject object, String property, long defaultValue)',
        'return hasValue(object, property) ? mapLong(object, property) : defaultValue'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static double mapDouble(JsonObject object, String property)',
        'return object.getJsonNumber(property).doubleValue()'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static double mapDouble(JsonObject object, String property, double defaultValue)',
        'return hasValue(object, property) ? mapDouble(object, property) : defaultValue'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static float mapFloat(JsonObject object, String property)',
        'return (float) object.getJsonNumber(property).doubleValue()'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static float mapFloat(JsonObject object, String property, float defaultValue)',
        'return hasValue(object, property) ? mapFloat(object, property) : defaultValue'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static <T> T mapLiteral(JsonObject object, String property, Function<String, T> converter)',
        'return converter.apply(object.getString(property))'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static <T> T mapLiteral(JsonObject object, String property, Function<String, T> converter, T defaultValue)',
        'return hasValue(object, property) ? mapLiteral(object, property, converter) : defaultValue'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static LocalDate mapLocalDate(JsonObject object, String property)',
        'return mapLiteral(object, property, LocalDate::parse)'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static LocalDate mapLocalDate(JsonObject object, String property, LocalDate defaultValue)',
        'return mapLiteral(object, property, LocalDate::parse, defaultValue)'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static LocalDateTime mapLocalDateTime(JsonObject object, String property)',
        'return mapLiteral(object, property, LocalDateTime::parse)'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static LocalDateTime mapLocalDateTime(JsonObject object, String property, LocalDateTime defaultValue)',
        'return mapLiteral(object, property, LocalDateTime::parse, defaultValue)'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static ZonedDateTime mapZonedDateTime(JsonObject object, String property)',
        'return mapLiteral(object, property, ZonedDateTime::parse)'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static ZonedDateTime mapZonedDateTime(JsonObject object, String property, ZonedDateTime defaultValue)',
        'return mapLiteral(object, property, ZonedDateTime::parse, defaultValue)'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static <T> T mapObject(JsonObject object, String property, Function<JsonObject, T> converter)',
        'return converter.apply(object.getJsonObject(property))'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static <T> T mapObject(JsonObject object, String property, Function<JsonObject, T> converter, T defaultValue)',
        'return hasValue(object, property) ? mapObject(object, property, converter) : defaultValue'
      )
    );

    classBody.append(
      'public static <J extends JsonValue, T> Stream<T> mapToStream(JsonObject object, String property, Class<J> clazz, Function<J, T> mapper) {',
      NL
    );
    classBody.indent((methoBody) => {
      methoBody.append('if (object.containsKey(property)) {', NL);
      methoBody.indent((block) => {
        block.append(
          'return mapToStream(object.getJsonArray(property), clazz, mapper);',
          NL
        );
      });
      methoBody.append('}', NL);
      methoBody.append('return Stream.empty();', NL);
    });
    classBody.append('}', NL, NL);
    classBody.append(
      'public static <J extends JsonValue, T> Stream<T> mapToStream(JsonArray array, Class<J> clazz, Function<J, T> mapper) {',
      NL
    );
    classBody.indent((methoBody) => {
      methoBody.append('return array', NL);
      methoBody.indent((tmp) => {
        tmp.indent((chain) => {
          chain.append('.getValuesAs(clazz)', NL);
          chain.append('.stream()', NL);
          chain.append('.map(mapper);', NL);
        });
      });
    });
    classBody.append('}', NL, NL);

    classBody.append(
      generateListMappers(
        'Boolean',
        'mapBooleans',
        'JsonValue',
        'v -> v == JsonValue.TRUE'
      )
    );

    classBody.append(
      generateListMappers(
        'Short',
        'mapShorts',
        'JsonNumber',
        'v -> v.numberValue().shortValue()'
      )
    );
    classBody.append(
      generateListMappers(
        'Integer',
        'mapInts',
        'JsonNumber',
        'JsonNumber::intValue'
      )
    );
    classBody.append(
      generateListMappers(
        'Long',
        'mapLongs',
        'JsonNumber',
        'v -> v.numberValue().longValue()'
      )
    );
    classBody.append(
      generateListMappers(
        'Double',
        'mapDoubles',
        'JsonNumber',
        'JsonNumber::doubleValue'
      )
    );
    classBody.append(
      generateListMappers(
        'Float',
        'mapFloats',
        'JsonNumber',
        'v -> v.numberValue().floatValue()'
      )
    );
    classBody.append(
      generateListMappers(
        'String',
        'mapStrings',
        'JsonString',
        'JsonString::getString'
      )
    );

    classBody.append(
      generateSingleLineMethod(
        'public static <T> List<T> mapObjects(JsonObject object, String property, Function<JsonObject, T> converter)',
        'return mapToStream(object, property, JsonObject.class, converter).toList()'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static <T> List<T> mapObjects(JsonArray array, Function<JsonObject, T> converter)',
        'return mapToStream(array, JsonObject.class, converter).toList()'
      )
    );

    classBody.append(
      generateSingleLineMethod(
        'public static <T> List<T> mapLiterals(JsonObject object, String property, Function<String, T> mapper)',
        'return mapToStream(object, property, JsonString.class, JsonString::getString).map(mapper).toList()'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static <T> List<T> mapLiterals(JsonArray array, Function<String, T> mapper)',
        'return mapToStream(array, JsonString.class, JsonString::getString).map(mapper).toList()'
      )
    );

    classBody.append(generateToJsonArray('String', 'String'));
    classBody.append(generateToJsonArray('Int', 'Integer'));
    classBody.append(generateToJsonArray('Short', 'Short'));
    classBody.append(generateToJsonArray('Long', 'Long'));
    classBody.append(generateToJsonArray('Double', 'Double'));
    classBody.append(generateToJsonArray('Float', 'Float'));
    classBody.append(generateToJsonArray('Boolean', 'Boolean'));
    classBody.append(
      'public static Collector<JsonValue, ?, JsonArray> toArray() {',
      NL
    );
    classBody.indent((methodBody) => {
      methodBody.append('return Collector.of(', NL);
      methodBody.indent((i) =>
        i.indent((chain) => {
          chain.append('Json::createArrayBuilder,', NL);
          chain.append('JsonArrayBuilder::add,', NL);
          chain.append('JsonArrayBuilder::add,', NL);
          chain.append('JsonArrayBuilder::build);', NL);
        })
      );
    });
    classBody.append('}', NL, NL);
    classBody.append(
      generateSingleLineMethod(
        'public static <T> JsonArray toJsonLiteralArray(List<T> value, Function<T, String> converter)',
        'return value.stream().map(converter).collect(toStringArray())'
      )
    );
    classBody.append(
      generateSingleLineMethod(
        'public static <T> JsonArray toJsonLiteralArray(List<T> value)',
        'return value.stream().map(Object::toString).collect(toStringArray())'
      )
    );
    classBody.append(
      'public static <T> Collector<T, ?, JsonArray> toArray(Function<T, JsonValue> jsonValueConverter) {',
      NL
    );
    classBody.indent((methodBody) => {
      methodBody.append('return Collector.of(', NL);
      methodBody.indent((i) =>
        i.indent((chain) => {
          chain.append('Json::createArrayBuilder,', NL);
          chain.append('(b, v) -> jsonValueConverter.apply(v),', NL);
          chain.append('JsonArrayBuilder::add,', NL);
          chain.append('JsonArrayBuilder::build);', NL);
        })
      );
    });
    classBody.append('}', NL, NL);
    classBody.append(
      'public static String toJsonString(Object o, boolean pretty) {',
      NL
    );
    classBody.indent((methodBody) => {
      methodBody.append('if (o instanceof List<?> list) {', NL);
      methodBody.indent((block) => {
        block.append('var writer = new StringWriter();', NL);
        block.append(
          'var config = Map.of(JsonGenerator.PRETTY_PRINTING, pretty);',
          NL
        );
        block.append('var generator = Json', NL);
        block.indent((tmp) => {
          tmp.indent((chain) => {
            chain.append('.createGeneratorFactory(config)', NL);
            chain.append('.createGenerator(writer);', NL);
          });
        });
        block.append('generator.writeStartArray();', NL);
        block.append('list.forEach(e -> {', NL);
        block.indent((forBlock) => {
          forBlock.append('if (e instanceof _BaseDataImpl b) {', NL);
          forBlock.indent((ifBlock) => {
            ifBlock.append('generator.write(b.data);', NL);
          });
          forBlock.append('} else {', NL);
          forBlock.indent((ifBlock) => {
            ifBlock.append('throw new IllegalStateException();', NL);
          });
          forBlock.append('}', NL);
        });
        block.append('});', NL);
        block.append('generator.writeEnd();', NL);
        block.append('generator.close();', NL);
        block.append('return writer.toString();', NL);
      });
      methodBody.append('}', NL);
      methodBody.append('if (o instanceof _BaseDataImpl) {', NL);
      methodBody.indent((block) => {
        block.append(
          'return toJsonString(((_BaseDataImpl) o).data, pretty);',
          NL
        );
      });
      methodBody.append('}', NL);
      methodBody.append('return o.toString();', NL);
    });
    classBody.append('}', NL, NL);
    classBody.append(
      'public static String toJsonString(JsonObject object, boolean pretty) {',
      NL
    );
    classBody.indent((methodBody) => {
      methodBody.append('var writer = new StringWriter();', NL);
      methodBody.append(
        'var config = Map.of(JsonGenerator.PRETTY_PRINTING, pretty);',
        NL
      );
      methodBody.append('var generator = Json', NL);
      methodBody.indent((i) =>
        i.indent((chain) => {
          chain.append('.createGeneratorFactory(config)', NL);
          chain.append('.createGenerator(writer);', NL);
        })
      );
      methodBody.append('generator.write(object);', NL);
      methodBody.append('generator.close();', NL);
      methodBody.append('return writer.toString();', NL);
    });
    classBody.append('}', NL, NL);
    classBody.append('public static JsonObject fromString(String data) {', NL);
    classBody.indent((methodBody) => {
      methodBody.append(
        'try (var reader = Json.createReader(new StringReader(data))) {',
        NL
      );
      methodBody.indent((block) => {
        block.append('return reader.readObject();', NL);
      });
      methodBody.append('}', NL);
    });
    classBody.append('}', NL, NL);
    classBody.append(
      'public static <T> T fromString(String data, Function<JsonObject, T> constructor) {',
      NL
    );
    classBody.indent((methodBody) => {
      methodBody.append('return constructor.apply(fromString(data));', NL);
    });
    classBody.append('}', NL);
  });

  node.append('}', NL);
  return node;
}

function generateListMappers(
  result: string,
  methodName: string,
  jsonValueType: string,
  converter: string
) {
  const rv = new CompositeGeneratorNode();
  rv.append(
    generateSingleLineMethod(
      `public static List<${result}> ${methodName}(JsonObject object, String property)`,
      `return mapToStream(object, property, ${jsonValueType}.class, ${converter}).toList()`
    )
  );
  rv.append(
    generateSingleLineMethod(
      `public static List<${result}> ${methodName}(JsonArray array)`,
      `return mapToStream(array, ${jsonValueType}.class, ${converter}).toList()`
    )
  );
  return rv;
}

function generateToJsonArray(name: string, type: string) {
  const rv = new CompositeGeneratorNode();
  rv.append(
    `public static Collector<${type}, ?, JsonArray> to${name}Array() {`,
    NL
  );
  rv.indent((methodBody) => {
    methodBody.append('return Collector.of(', NL);
    methodBody.indent((i) =>
      i.indent((chain) => {
        chain.append('Json::createArrayBuilder,', NL);
        chain.append('JsonArrayBuilder::add,', NL);
        chain.append('JsonArrayBuilder::add,', NL);
        chain.append('JsonArrayBuilder::build);', NL);
      })
    );
  });
  rv.append('}');
  rv.append(NL, NL);
  rv.append(
    generateSingleLineMethod(
      `public static JsonArray toJson${name}Array(List<${type}> value)`,
      `return value.stream().collect(to${name}Array())`
    )
  );
  return rv;
}

function generateSingleLineMethod(signature: string, ...content: string[]) {
  const node = new CompositeGeneratorNode();
  node.append(signature, ' {', NL);
  node.indent((mehodBody) => {
    content.forEach((c) => mehodBody.append(c, ';', NL));
  });
  node.append('}', NL, NL);
  return node;
}
