import { CompositeGeneratorNode } from 'langium/generate';
import { toNode } from '../util.js';

export function generateChangeContent(
  interfaceBasePackage: string,
  fqn: (type: string) => string
): CompositeGeneratorNode {
  fqn('java.util.Optional');
  fqn('java.util.function.Function');

  fqn('jakarta.json.JsonObject');
  fqn(`${interfaceBasePackage}._Base`);

  return toNode([
    'public class _ChangeImpl<T, U> extends _BaseDataImpl implements _Base.Change<T, U> {',
    [
      'private final Function<JsonObject, T> valueFactory;',
      'private final Function<JsonObject, U> deltaFactory;',
      '',
      '_ChangeImpl(JsonObject data, Function<JsonObject, T> valueFactory, Function<JsonObject, U> deltaFactory) {',
      [
        'super(data);',
        'this.valueFactory = valueFactory;',
        'this.deltaFactory = deltaFactory;',
      ],
      '}',
      '',
      '@Override',
      'public Optional<T> setChange() {',
      [
        'if (data.getString("@type", "").equals("set-change")) {',
        ['return Optional.of(valueFactory.apply(data));'],
        '}',
        'return Optional.empty();',
      ],
      '}',
      '',
      '@Override',
      'public Optional<U> deltaChange() {',
      [
        'if (data.getString("@type", "").equals("delta-change")) {',
        ['return Optional.of(deltaFactory.apply(data));'],
        '}',
        'return Optional.empty();',
      ],
      '}',
      '',
      'public static <T, U> _Base.Change<_Base.SetChange<T>, _Base.DeltaChange<U>> of(',
      [
        [
          'JsonObject data,',
          'Function<JsonObject, T> setConverter,',
          'Function<JsonObject, U> deltaConverter) {',
        ],
        'return new _ChangeImpl<>(',
        [
          [
            'data,',
            'd -> new SetChangeImpl<>(d, setConverter),',
            'd -> new DeltaChangeImpl<>(d, deltaConverter));',
          ],
        ],
      ],
      '}',
      '',
      'private static class SetChangeImpl<T> extends _BaseDataImpl implements _Base.SetChange<T> {',
      [
        'private final Function<JsonObject, T> converter;',
        '',
        'SetChangeImpl(JsonObject data, Function<JsonObject, T> converter) {',
        ['super(data);', 'this.converter = converter;'],
        '}',
        '',
        '@Override',
        'public T value() {',
        ['return _JsonUtils.mapObject(data, "value", converter);'],
        '}',
      ],
      '}',
      '',
      'private static class DeltaChangeImpl<T> extends _BaseDataImpl implements _Base.DeltaChange<T> {',
      [
        'private final Function<JsonObject, T> converter;',
        '',
        'public DeltaChangeImpl(JsonObject data, Function<JsonObject, T> converter) {',
        ['super(data);', 'this.converter = converter;'],
        '}',
        '',
        '@Override',
        'public T delta() {',
        ['return _JsonUtils.mapObject(data, "delta", converter);'],
        '}',
      ],
      '}',
    ],
    '}',
  ]);
}
