import { CompositeGeneratorNode } from 'langium/generate';
import { toNode } from '../util.js';

export function generateListChangeContent(
  interfaceBasePackage: string,
  fqn: (type: string) => string
): CompositeGeneratorNode {
  fqn('java.util.List');
  fqn('java.util.function.Function');
  fqn('jakarta.json.Json');
  fqn('jakarta.json.JsonObject');
  fqn('jakarta.json.JsonObjectBuilder');
  fqn('jakarta.json.JsonValue');
  fqn(`${interfaceBasePackage}._Base`);

  return toNode([
    'public class _ListChangeImpl<D, P, K> extends _BaseDataImpl implements _Base.ListChange<D, P, K> {',
    [
      'private final Function<JsonObject, D> dataConverter;',
      'private final Function<JsonObject, P> patchConverter;',
      'private final Function<JsonValue, K> keyConverter;',
    ],
    '',
    [
      'public _ListChangeImpl(',
      [
        [
          'JsonObject data,',
          'Function<JsonObject, D> dataConverter,',
          'Function<JsonObject, P> patchConverter,',
          'Function<JsonValue, K> keyConverter) {',
        ],
        'super(data);',
        'this.dataConverter = dataConverter;',
        'this.patchConverter = patchConverter;',
        'this.keyConverter = keyConverter;',
      ],
      '}',
    ],
    '',
    [
      '@Override',
      'public List<D> additions() {',
      ['return _JsonUtils.mapObjects(data, "additions", this.dataConverter);'],
      '}',
    ],
    '',
    [
      '@Override',
      'public List<P> updates() {',
      ['return _JsonUtils.mapObjects(data, "updates", this.patchConverter);'],
      '}',
    ],
    '',
    [
      '@Override',
      'public List<K> removals() {',
      [
        'return _JsonUtils.mapToStream(data, "removals", JsonValue.class, this.keyConverter).toList();',
      ],
      '}',
    ],
    '',
    [
      'public static <D, P, K> _Base.ListChange<D, P, K> of(',
      [
        [
          'JsonObject data,',
          'Function<JsonObject, D> dataConverter,',
          'Function<JsonObject, P> patchConverter,',
          'Function<JsonValue, K> keyConverter) {',
        ],
        'return new _ListChangeImpl<>(data,',
        [['dataConverter,', 'patchConverter,', 'keyConverter);']],
      ],
      '}',
    ],
    '',
    [
      'public static class ListChangeBuilderImpl<D, P, K> {',
      [
        'private final JsonObjectBuilder $builder = Json.createObjectBuilder();',
        'private final Function<K, JsonValue> keyConverter;',
        '',
        'ListChangeBuilderImpl(Function<K, JsonValue> keyConverter) {',
        ['this.keyConverter = keyConverter;'],
        '}',
        '',
        'public ListChangeBuilderImpl<D, P, K> removals(List<K> items) {',
        [
          '$builder.add("removals", _JsonUtils.toJsonValueArray(items, keyConverter));',
          'return this;',
        ],
        '}',
        '',
        'public ListChangeBuilderImpl<D, P, K> additions(List<D> items) {',
        [
          '$builder.add("additions", _JsonUtils.toJsonValueArray(items, $e -> ((_BaseDataImpl) $e).data));',
          'return this;',
        ],
        '}',
        '',
        'public ListChangeBuilderImpl<D, P, K> updates(List<P> items) {',
        [
          '$builder.add("updates", _JsonUtils.toJsonValueArray(items, $e -> ((_BaseDataImpl) $e).data));',
          'return this;',
        ],
        '}',
        '',
        'public JsonObject build() {',
        ['return $builder.build();'],
        '}',
      ],
      '}',
    ],
    '}',
  ]);
}
