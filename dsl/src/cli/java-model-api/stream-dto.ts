import { CompositeGeneratorNode, NL } from 'langium/generate';

export function generateBlob(fqn: (type: string) => string) {
  const result = new CompositeGeneratorNode();
  fqn('java.io.InputStream');
  fqn('java.util.Optional');

  result.append('public interface RSDBlob {', NL);
  result.indent((body) => {
    body.append('public InputStream stream();', NL, NL);
    body.append('public Optional<String> mimeType();', NL);
  });
  result.append('}', NL);

  return result;
}

export function generateFile() {
  const result = new CompositeGeneratorNode();

  result.append('public interface RSDFile extends RSDBlob {', NL);
  result.indent((body) => {
    body.append('public String filename();', NL);
  });
  result.append('}', NL);

  return result;
}
