import { CompositeGeneratorNode } from 'langium/generate';
import { toNode } from '../util.js';

export function generateSimpleListChangeContent(
  interfaceBasePackage: string,
  fqn: (type: string) => string
): CompositeGeneratorNode {
  fqn('java.util.List');
  fqn('java.util.function.Function');

  fqn('jakarta.json.JsonObject');
  fqn('jakarta.json.JsonValue');

  fqn(`${interfaceBasePackage}._Base`);

  return toNode([
    'public class _SimpleListChangeImpl<T, K> extends _BaseDataImpl implements _Base.SimpleListChange<T, K> {',
    [
      'private final Function<JsonValue, T> addConverter;',
      'private final Function<JsonValue, K> removeConverter;',
      '',
      '_SimpleListChangeImpl(JsonObject data,',
      [
        [
          'Function<JsonValue, T> addConverter,',
          'Function<JsonValue, K> removeConverter) {',
        ],
        'super(data);',
        'this.addConverter = addConverter;',
        'this.removeConverter = removeConverter;',
      ],
      '}',
      '',
      'public static <T, K> _Base.SimpleListChange<T, K> of(',
      [
        [
          'JsonObject data,',
          'Function<JsonValue, T> addConverter,',
          'Function<JsonValue, K> removeConverter) {',
        ],
        'return new _SimpleListChangeImpl<>(data, addConverter, removeConverter);',
      ],
      '}',
      '',
      'public static <T> _Base.SimpleListChange<T, T> of(',
      [
        ['JsonObject data,', 'Function<JsonValue, T> converter) {'],
        'return new _SimpleListChangeImpl<>(data, converter, converter);',
      ],
      '}',
      '',
      '@Override',
      'public List<T> additions() {',
      [
        'return _JsonUtils.mapToStream(data, "additions", JsonValue.class, addConverter).toList();',
      ],
      '}',
      '',
      '@Override',
      'public List<K> removals() {',
      [
        'return _JsonUtils.mapToStream(data, "removals", JsonValue.class, removeConverter).toList();',
      ],
      '}',
    ],
    '}',
  ]);
}
