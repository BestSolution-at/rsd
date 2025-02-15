import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaImportsCollector,
  JavaServerJakartaWSGeneratorConfig,
  toPath,
} from '../java-gen-utils.js';

export function generateRestUtils(
  artifactConfig: JavaServerJakartaWSGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.rest`;

  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);

  const node = generateRestUtilsContent(artifactConfig, packageName, fqn);

  return {
    name: '_RestUtils.java',
    content: toString(
      generateCompilationUnit(packageName, importCollector, node),
      '\t'
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

function generateRestUtilsContent(
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  packageName: string,
  fqn: (type: string) => string
) {
  fqn(`${packageName}.model._JsonUtils`);
  fqn(`${artifactConfig.rootPackageName}.service.RSDException`);
  fqn('jakarta.ws.rs.core.Response');
  const node = new CompositeGeneratorNode();
  node.append('public class _RestUtils {', NL);
  node.indent((classBody) => {
    classBody.append(toResponse());
  });
  node.append('}', NL);
  return node;
}

function toResponse() {
  const node = new CompositeGeneratorNode();
  node.append(
    'public static Response toResponse(int status, RSDException e) {',
    NL
  );
  node.indent((methodBody) => {
    methodBody.append(
      'if (e instanceof RSDException.RSDMessageException m) {',
      NL
    );
    methodBody.indent((block) => {
      block.append(
        'return Response.status(status).header("X-RSD-Error-Type", e.type).entity(_JsonUtils.encodeAsJsonString(m.message)).build();',
        NL
      );
    });
    methodBody.append(
      '} else if (e instanceof RSDException.RSDStructuredDataException s) {',
      NL
    );
    methodBody.indent((block) => {
      block.append(
        'return Response.status(status).header("X-RSD-Error-Type", e.type).entity(_JsonUtils.toJsonString(s.data, false)).build();',
        NL
      );
    });
    methodBody.append('}', NL);
    methodBody.append(
      'return Response.serverError().entity("Unknown error \'%\'".formatted(e.getClass().getName())).build();',
      NL
    );
  });

  node.append('}', NL);

  return node;
}

// if (e instanceof _RSDException.RSDMessageException m) {
//   return Response.status(status).entity(m.message).build();
// } else if (e instanceof _RSDException.RSDStructuredDataException s) {
//   return Response.status(status).entity(_JsonUtils.toJsonString(s.data, false)).build();
// }
// return Response.serverError().build();
