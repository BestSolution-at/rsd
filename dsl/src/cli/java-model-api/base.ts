import { CompositeGeneratorNode, NL } from 'langium/generate';

export function generateBaseContent(fqn: (type: string) => string) {
  const Function = fqn('java.util.function.Function');
  const Consumer = fqn('java.util.function.Consumer');
  const List = fqn('java.util.List');

  const result = new CompositeGeneratorNode();
  result.append('public interface _Base {', NL);
  result.indent((classBody) => {
    classBody.append('public interface Nillable<T> {', NL);
    classBody.indent((innerBody) => {
      innerBody.append(
        `public <R> R apply(${Function}<T, R> function, R defaultValue);`,
        NL,
        NL
      );
      innerBody.append(`public void accept(${Consumer}<T> block);`, NL, NL);
      innerBody.append(
        `public <R> Nillable<R> map(${Function}<T, R> mapper);`,
        NL
      );
    });
    classBody.append('}', NL, NL);

    classBody.append('public interface ListChange<D, P, K> {', NL);
    classBody.indent((innerBody) => {
      innerBody.append(`public ${List}<D> additions();`, NL, NL);
      innerBody.append(`public ${List}<P> updates();`, NL, NL);
      innerBody.append(`public ${List}<K> removals();`, NL);
    });
    classBody.append('}', NL, NL);

    classBody.append('public interface SimpleListChange<T, K> {', NL);
    classBody.indent((innerBody) => {
      innerBody.append(`public ${List}<T> additions();`, NL, NL);
      innerBody.append(`public ${List}<K> removals();`, NL);
    });
    classBody.append('}', NL, NL);

    classBody.append('public interface BaseData {', NL);
    classBody.append('}', NL, NL);
    classBody.append('public interface BaseDataBuilder<T> {', NL);
    classBody.indent((innerBody) => {
      innerBody.append('public T build();', NL);
    });
    classBody.append('}', NL);
  });
  result.append('}', NL);
  return result;
}
