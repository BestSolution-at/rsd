import { CompositeGeneratorNode, NL } from 'langium/generate';

export function generateBaseDTOContent(
  fqn: (type: string) => string
): CompositeGeneratorNode {
  fqn('jakarta.json.JsonObject');
  const rv = new CompositeGeneratorNode();
  rv.append('public abstract class _BaseDataImpl {', NL);
  rv.indent((classBody) => {
    classBody.append('public final JsonObject data;', NL);
    classBody.appendNewLine();
    classBody.append('public _BaseDataImpl(JsonObject data) {', NL);
    classBody.indent((methodBody) => {
      methodBody.append('this.data = data;', NL);
    });
    classBody.append('}', NL);
  });
  rv.append('}', NL);

  return rv;
}
