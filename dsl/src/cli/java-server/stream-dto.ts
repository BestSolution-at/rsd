import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaServerGeneratorConfig,
  toPath,
} from '../java-gen-utils.js';
import { MResolvedRSDModel } from '../model.js';

export function generateStreamDTO(
  artifactConfig: JavaServerGeneratorConfig,
  model: MResolvedRSDModel
): Artifact[] {
  const artifacts: Artifact[] = [];

  const streamReturns = model.services
    .flatMap((s) => s.operations)
    .filter((o) => o.resultType?.variant === 'stream');
  if (streamReturns.length > 0) {
    const packageName = `${artifactConfig.rootPackageName}.service.model`;

    {
      const importCollector = new JavaImportsCollector(packageName);
      const fqn = importCollector.importType.bind(importCollector);

      artifacts.push({
        name: 'RSDBlob.java',
        content: toString(
          generateCompilationUnit(
            packageName,
            importCollector,
            generateBlob(fqn)
          ),
          '\t'
        ),
        path: toPath(artifactConfig.targetFolder, packageName),
      });
    }

    if (streamReturns.find((o) => o.resultType?.type === 'file')) {
      const importCollector = new JavaImportsCollector(packageName);
      artifacts.push({
        name: 'RSDFile.java',
        content: toString(
          generateCompilationUnit(packageName, importCollector, generateFile()),
          '\t'
        ),
        path: toPath(artifactConfig.targetFolder, packageName),
      });
    }
  }

  return artifacts;
}

function generateBlob(fqn: (type: string) => string) {
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

function generateFile() {
  const result = new CompositeGeneratorNode();

  result.append('public interface RSDFile extends RSDBlob {', NL);
  result.indent((body) => {
    body.append('public String filename();', NL);
  });
  result.append('}', NL);

  return result;
}
