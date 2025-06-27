import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaServerJakartaWSGeneratorConfig,
  toPath,
} from '../java-gen-utils.js';
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
      .filter((o) => o.resultType?.type === 'file') !== undefined
  );
}

export function generateRestUtils(
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  model: MResolvedRSDModel
): Artifact[] {
  if (model.errors.length === 0 && !hasStreamResult(model)) {
    return [];
  }
  const packageName = `${artifactConfig.rootPackageName}.rest`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  const node = generateRestUtilsContent(
    model,
    artifactConfig,
    packageName,
    fqn
  );

  return [
    {
      name: '_RestUtils.java',
      content: toString(
        generateCompilationUnit(packageName, importCollector, node),
        '\t'
      ),
      path: toPath(artifactConfig.targetFolder, packageName),
    },
  ];
}

function generateRestUtilsContent(
  model: MResolvedRSDModel,
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  packageName: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append('public class _RestUtils {', NL);
  node.indent((classBody) => {
    if (model.errors.length > 0) {
      classBody.append(toResponse(artifactConfig, packageName, fqn));
    }
    if (hasStreamResult(model)) {
      classBody.append(generateStreamResultHelper(artifactConfig, model, fqn));
    }
  });
  node.append('}', NL);
  return node;
}

function generateStreamResultHelper(
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  model: MResolvedRSDModel,
  fqn: (type: string) => string
) {
  const StreamingOutput = fqn('jakarta.ws.rs.core.StreamingOutput');
  const _Blob = fqn(`${artifactConfig.rootPackageName}.service.model._Blob`);
  fqn('java.io.OutputStream');
  fqn('java.io.IOException');
  fqn('jakarta.ws.rs.WebApplicationException');
  fqn('jakarta.ws.rs.core.Response');
  fqn('jakarta.ws.rs.core.MediaType');

  const result = new CompositeGeneratorNode();

  result.append(
    `public static Response.ResponseBuilder toStreamResponse(int status, ${_Blob} blob) {`,
    NL
  );
  result.indent((mBody) => {
    mBody.append(
      `class FileStreamingOutput implements ${StreamingOutput} {`,
      NL
    );
    mBody.indent((cBody) => {
      cBody.append('@Override', NL);
      cBody.append(
        'public void write(OutputStream output) throws IOException, WebApplicationException {',
        NL
      );
      cBody.indent((mInnerBody) => {
        mInnerBody.append('blob.stream().transferTo(output);', NL);
      });
      cBody.append('}', NL);
    });
    mBody.append('}', NL);
    /*

		
		if (blob instanceof _File f) {
			
			
		}
		return builder;
    */
    mBody.append(
      'var mediaType = blob.mimeType().map(MediaType::valueOf).orElse(MediaType.APPLICATION_OCTET_STREAM_TYPE);',
      NL
    );
    mBody.append(
      'var builder = Response.status(status).entity(new FileStreamingOutput()).type(mediaType);',
      NL
    );
    if (hasFileStreamResult(model)) {
      fqn(`${artifactConfig.rootPackageName}.service.model._File`);
      mBody.append('if (blob instanceof _File f) {', NL);
      mBody.indent((block) => {
        block.append('var fileName = f.filename().replace("\\"", "");', NL);
        block.append(
          'builder = builder.header("Content-Disposition", "attachment; filename=\\"" + fileName + "\\"");',
          NL
        );
      });
      mBody.append('}', NL);
    }

    mBody.append('return builder;', NL);
  });
  result.append('}', NL);
  return result;
}

function toResponse(
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  packageName: string,
  fqn: (type: string) => string
) {
  fqn(`${packageName}.model._JsonUtils`);
  fqn(`${artifactConfig.rootPackageName}.service.RSDException`);
  fqn('jakarta.ws.rs.core.Response');

  const node = new CompositeGeneratorNode();
  node.append(
    'public static Response toResponse(int status, RSDException e) {',
    NL
  );
  node.indent((methodBody) => {
    methodBody.append(
      'if (e instanceof RSDException.RSDStructuredDataException s) {',
      NL
    );
    methodBody.indent((block) => {
      block.append('return Response.status(status)', NL);
      block.indent((t) =>
        t.indent((chain) => {
          chain.append('.header("X-RSD-Error-Type", e.type)', NL);
          chain.append('.header("X-RSD-Error-Message", e.getMessage())', NL);
          chain.append(
            '.entity(_JsonUtils.toJsonString(s.data, false)).build();',
            NL
          );
        })
      );
    });
    methodBody.append('}', NL);
    methodBody.append('return Response.status(status)', NL);
    methodBody.indent((t) =>
      t.indent((chain) => {
        chain.append('.header("X-RSD-Error-Type", e.type)', NL);
        chain.append('.header("X-RSD-Error-Message", e.getMessage())', NL);
        chain.append(
          '.entity(_JsonUtils.encodeAsJsonString(e.getMessage())).build();',
          NL
        );
        chain.append();
      })
    );
  });

  node.append('}', NL);

  return node;
}
