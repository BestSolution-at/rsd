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
