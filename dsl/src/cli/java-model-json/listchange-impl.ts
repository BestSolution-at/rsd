import { CompositeGeneratorNode } from 'langium/generate';
import { toNode } from '../util.js';

export function generateListChangeContent(
  interfaceBasePackage: string,
  fqn: (type: string) => string
): CompositeGeneratorNode {
  fqn('java.util.List');
  fqn('java.util.Optional');
  fqn('java.util.function.Function');

  fqn('jakarta.json.JsonObject');
  fqn('jakarta.json.JsonValue');
  fqn(`${interfaceBasePackage}._Base`);

  return toNode([
    'public class _ListChangeImpl<E, D> extends _BaseDataImpl implements _Base.ListChange<E, D> {',
    [
      'private final Function<JsonObject, E> elementFactory;',
      'private final Function<JsonObject, D> deltaFactory;',
    ],
    '',
    [
      'public _ListChangeImpl(',
      [
        [
          'JsonObject data,',
          'Function<JsonObject, E> elementFactory,',
          'Function<JsonObject, D> deltaFactory) {',
        ],
        'super(data);',
        'this.elementFactory = elementFactory;',
        'this.deltaFactory = deltaFactory;',
      ],
      '}',
    ],
    '',
    [
      '@Override',
      'public Optional<D> deltaChange() {',
      [
        'if (data.getString("@type", "").equals("delta-change")) {',
        ['return Optional.of(deltaFactory.apply(data));'],
        '}',
        'return Optional.empty();',
      ],
      '}',
      '',
      '@Override',
      'public Optional<E> elementsChange() {',
      [
        'if (data.getString("@type", "").equals("elements-change")) {',
        ['return Optional.of(elementFactory.apply(data));'],
        '}',
        'return Optional.empty();',
      ],
      '}',
      '',
      'public static <T> _Base.ListChange<_Base.ListSetElementsChange<T>, _Base.ListAddRemoveChange<T, T>> of(',
      [
        ['JsonObject data,', 'Function<JsonValue, T> converter) {'],
        'return new _ListChangeImpl<>(',
        [
          [
            'data,',
            'd -> new ValueElementsChange<>(d, converter),',
            'd -> new AddRemoveListChangeImpl<>(d, converter, converter));',
          ],
        ],
      ],
      '}',
      '',
      'public static <A, U, R> _Base.ListChange<_Base.ListSetElementsChange<A>, _Base.ListAddRemoveUpdateChange<A, U, R>> of(',
      [
        [
          'JsonObject data,',
          'Function<JsonObject, A> additionConverter,',
          'Function<JsonObject, U> updateConverter,',
          'Function<JsonValue, R> removalConverter) {',
        ],
        'return new _ListChangeImpl<>(',
        [
          [
            'data,',
            'd -> new ObjectElementsChange<>(d, additionConverter),',
            'd -> new AddRemoveUpdateListChangeImpl<>(data, additionConverter, updateConverter, removalConverter));',
          ],
        ],
      ],
      '}',
      '',
      'private static class AddRemoveListChangeImpl<A, R> extends _BaseDataImpl',
      [
        ['implements _Base.ListAddRemoveChange<A, R> {'],
        'private final Function<JsonValue, A> additionConverter;',
        'private final Function<JsonValue, R> removalConverter;',
        '',
        'AddRemoveListChangeImpl(',
        [
          [
            'JsonObject data,',
            'Function<JsonValue, A> additionConverter,',
            'Function<JsonValue, R> removalConverter) {',
          ],
          'super(data);',
          'this.additionConverter = additionConverter;',
          'this.removalConverter = removalConverter;',
        ],
        '}',
        '',
        '@Override',
        'public List<A> additions() {',
        [
          'return _JsonUtils.mapToStream(',
          [
            [
              'data,',
              '"additions",',
              'JsonValue.class,',
              'additionConverter).toList();',
            ],
          ],
        ],
        '}',
        '',
        '@Override',
        'public List<R> removals() {',
        [
          'return _JsonUtils.mapToStream(',
          [
            'data,',
            '"removals",',
            'JsonValue.class,',
            'removalConverter).toList();',
          ],
        ],
        '}',
      ],
      '}',
      '',
      'private static class AddRemoveUpdateListChangeImpl<A, U, R> extends _BaseDataImpl',
      [
        ['implements _Base.ListAddRemoveUpdateChange<A, U, R> {'],
        '',
        'private final Function<JsonObject, A> additionConverter;',
        'private final Function<JsonObject, U> updateConverter;',
        'private final Function<JsonValue, R> removalConverter;',
        '',
        'public AddRemoveUpdateListChangeImpl(',
        [
          [
            'JsonObject data,',
            'Function<JsonObject, A> additionConverter,',
            'Function<JsonObject, U> updateConverter,',
            'Function<JsonValue, R> removalConverter) {',
          ],
          'super(data);',
          'this.additionConverter = additionConverter;',
          'this.updateConverter = updateConverter;',
          'this.removalConverter = removalConverter;',
        ],
        '}',
        '',
        '@Override',
        'public List<A> additions() {',
        [
          'return _JsonUtils.mapObjects(data, "additions", this.additionConverter);',
        ],
        '}',
        '',
        '@Override',
        'public List<R> removals() {',
        [
          'return _JsonUtils.mapToStream(data, "removals", JsonValue.class, this.removalConverter).toList();',
        ],
        '}',
        '',
        '@Override',
        'public List<U> updates() {',
        [
          'return _JsonUtils.mapObjects(data, "updates", this.updateConverter);',
        ],
        '}',
      ],
      '}',
      '',
      'private static class ValueElementsChange<T> extends _BaseDataImpl implements _Base.ListSetElementsChange<T> {',
      [
        'private final Function<JsonValue, T> converter;',
        '',
        'ValueElementsChange(JsonObject data, Function<JsonValue, T> converter) {',
        ['super(data);', 'this.converter = converter;'],
        '}',
        '',
        '@Override',
        'public List<T> elements() {',
        [
          'return _JsonUtils.mapToStream(data, "elements", JsonValue.class, converter).toList();',
        ],
        '}',
      ],
      '}',
      '',
      'private static class ObjectElementsChange<T> extends _BaseDataImpl implements _Base.ListSetElementsChange<T> {',
      [
        'private final Function<JsonObject, T> converter;',
        '',
        'ObjectElementsChange(JsonObject data, Function<JsonObject, T> converter) {',
        ['super(data);', 'this.converter = converter;'],
        '}',
        '',
        '@Override',
        'public List<T> elements() {',
        ['return _JsonUtils.mapObjects(data, "elements", converter);'],
        '}',
      ],
      '}',
    ],
    '}',
  ]);
}

/*
        

      
    '}',
*/
