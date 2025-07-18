import { toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaServerJakartaWSGeneratorConfig,
  toPath,
} from '../java-gen-utils.js';
import {
  generateBlobImpl,
  generateFileImpl,
} from '../java-model-json/stream-impl.js';
import { MResolvedRSDModel } from '../model.js';

function hasStreamResult(model: MResolvedRSDModel): boolean {
  return (
    model.services
      .flatMap((s) => s.operations)
      .find((o) => o.resultType?.variant === 'stream') !== undefined
  );
}

function hasFileStreamResult(model: MResolvedRSDModel): boolean {
  return (
    model.services
      .flatMap((s) => s.operations)
      .filter((o) => o.resultType?.variant === 'stream')
      .find((o) => o.resultType?.type === 'file') !== undefined
  );
}

function hasStreamParameter(model: MResolvedRSDModel): boolean {
  return (
    model.services
      .flatMap((s) => s.operations)
      .flatMap((o) => o.parameters)
      .find((p) => p.variant === 'stream') !== undefined
  );
}

function hasFileStreamParameter(model: MResolvedRSDModel): boolean {
  return (
    model.services
      .flatMap((s) => s.operations)
      .flatMap((o) => o.parameters)
      .filter((p) => p.variant === 'stream')
      .find((p) => p.type === 'file') !== undefined
  );
}

export function generateStreamImpls(
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  model: MResolvedRSDModel
): Artifact[] {
  if (hasStreamResult(model) || hasStreamParameter(model)) {
    const packageName = `${artifactConfig.rootPackageName}.rest.model`;
    const importCollector = new JavaImportsCollector(packageName);
    const rv: Artifact[] = [
      {
        name: '_BlobImpl.java',
        content: toString(
          generateCompilationUnit(
            packageName,
            importCollector,
            generateBlobImpl(`${artifactConfig.rootPackageName}.service.model`)
          ),
          '\t'
        ),
        path: toPath(artifactConfig.targetFolder, packageName),
      },
    ];
    if (hasFileStreamResult(model) || hasFileStreamParameter(model)) {
      rv.push({
        name: '_FileImpl.java',
        content: toString(
          generateCompilationUnit(
            packageName,
            importCollector,
            generateFileImpl(`${artifactConfig.rootPackageName}.service.model`)
          ),
          '\t'
        ),
        path: toPath(artifactConfig.targetFolder, packageName),
      });
    }
    return rv;
  }
  return [];
}
