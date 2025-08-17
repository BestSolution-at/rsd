import { CompositeGeneratorNode } from 'langium/generate';
import { toNode } from '../util.js';

export function generateListChangeContent(
  interfaceBasePackage: string,
  fqn: (type: string) => string
): CompositeGeneratorNode {
  fqn('java.util.List');
  fqn('java.util.function.Function');

  fqn('jakarta.json.JsonObject');
  fqn('jakarta.json.JsonValue');
  fqn(`${interfaceBasePackage}._Base`);

  return toNode([
    'public class _ListChangeSupport {',
    [
      'public static <T> T of(JsonObject o, String descProperty, Function<JsonObject, T> setFactory, Function<JsonObject, T> deltaFactory) {',
      [
        'var type = o.getString(descProperty);',
        'return switch (type) {',
        [
          'case "set-change" -> setFactory.apply(o);',
          'case "merge-change" -> deltaFactory.apply(o);',
          `default -> throw new IllegalStateException("Unknown @type '%s'".formatted(type));`,
        ],
        '};',
      ],
      '}',
      '',
      'public abstract static class AddRemoveListChangeImpl<A, R> extends _BaseDataImpl',
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
      'public abstract static class AddRemoveUpdateListChangeImpl<A, U, R> extends _BaseDataImpl',
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
      'public abstract static class ValueElementsChange<T> extends _BaseDataImpl implements _Base.ListSetElementsChange<T> {',
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
      'public abstract static class ObjectElementsChange<T> extends _BaseDataImpl implements _Base.ListSetElementsChange<T> {',
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
