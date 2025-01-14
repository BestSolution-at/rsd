import { CompositeGeneratorNode, NL } from 'langium/generate';

export function generateBaseContent() {
  const result = new CompositeGeneratorNode();
  result.append('public interface _Base {', NL);
  result.indent((classBody) => {
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
