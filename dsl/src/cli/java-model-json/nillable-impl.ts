import { CompositeGeneratorNode, NL } from 'langium/generate';

export function generateNillableContent(
  fqn: (type: string) => string,
  modelApiPackage: string
): CompositeGeneratorNode {
  fqn('java.util.function.Consumer');
  fqn('java.util.function.Function');
  fqn(`${modelApiPackage}._Base`);

  const node = new CompositeGeneratorNode();
  node.append(
    'public class _NillableImpl<T> implements _Base.Nillable<T> {',
    NL
  );
  node.indent((body) => {
    body.append(
      'private static _NillableImpl<?> UNDEFINED = new _NillableImpl<>(null);',
      NL
    );
    body.append(
      'private static _NillableImpl<?> NULL = new _NillableImpl<>(null);',
      NL
    );
    body.append('private final T value;', NL, NL);

    // -------

    body.append('_NillableImpl(T value) {', NL);
    body.indent((mBody) => {
      mBody.append('this.value = value;', NL);
    });
    body.append('}', NL, NL);

    // -------

    body.append('@Override', NL);
    body.append(
      'public <X> X apply(Function<T, X> function, X defaultValue) {',
      NL
    );
    body.indent((mBody) => {
      mBody.append('if (this == UNDEFINED) {', NL);
      mBody.indent((block) => {
        block.append('return defaultValue;', NL);
      });
      mBody.append('}', NL);
      mBody.append('return function.apply(value);', NL);
    });
    body.append('}', NL, NL);

    // -------
    body.append('@Override', NL);
    body.append('public void accept(Consumer<T> block) {', NL);
    body.indent((mBody) => {
      mBody.append('if (this != UNDEFINED) {', NL);
      mBody.indent((block) => {
        block.append('block.accept(value);', NL);
      });
      mBody.append('}', NL);
    });
    body.append('}', NL, NL);

    // -------
    body.append('@SuppressWarnings("unchecked")', NL);
    body.append('@Override', NL);
    body.append(
      'public <X> _Base.Nillable<X> map(Function<T, X> mapper) {',
      NL
    );
    body.indent((mBody) => {
      mBody.append('if (this == UNDEFINED) {', NL);
      mBody.indent((block) => {
        block.append('return (_Base.Nillable<X>) UNDEFINED;', NL);
      });
      mBody.append('}', NL);
      mBody.append('return of(mapper.apply(value));', NL);
    });
    body.append('}', NL, NL);

    // -------
    body.append('@SuppressWarnings("unchecked")', NL);
    body.append('public static <T> _Base.Nillable<T> undefined() {', NL);
    body.indent((mBody) => {
      mBody.append('return (_NillableImpl<T>) UNDEFINED;', NL);
    });
    body.append('}', NL, NL);

    // -------
    body.append('@SuppressWarnings("unchecked")', NL);
    body.append('public static <T> _Base.Nillable<T> nill() {', NL);
    body.indent((mBody) => {
      mBody.append('return (_NillableImpl<T>) NULL;', NL);
    });
    body.append('}', NL, NL);

    // -------
    body.append('public static <T> _Base.Nillable<T> of(T value) {', NL);
    body.indent((mBody) => {
      mBody.append('if (value != null) {', NL);
      mBody.indent((block) => {
        block.append('return new _NillableImpl<>(value);', NL);
      });
      mBody.append('}', NL);
      mBody.append('return nill();', NL);
    });
    body.append('}', NL);
  });

  node.append('}');

  return node;
}
