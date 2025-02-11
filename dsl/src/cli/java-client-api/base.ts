import { CompositeGeneratorNode, NL, toString } from 'langium/generate';

import { Artifact } from '../artifact-generator.js';
import {
  generateCompilationUnit,
  JavaClientAPIGeneratorConfig,
  JavaImportsCollector,
  toPath,
} from '../java-gen-utils.js';

import { generateBaseContent } from '../java-model-api/base.js';

export function generateBase(
  artifactConfig: JavaClientAPIGeneratorConfig
): Artifact {
  const packageName = `${artifactConfig.rootPackageName}.model`;
  const importCollector = new JavaImportsCollector(packageName);
  const fqn = importCollector.importType.bind(importCollector);
  return {
    name: '_Base.java',
    content: toString(
      generateCompilationUnit(
        packageName,
        importCollector,
        generateBaseContent(fqn)
      ),
      '\t'
    ),
    path: toPath(artifactConfig.targetFolder, packageName),
  };
}

export function generateBaseDTOContent() {
  const node = new CompositeGeneratorNode();
  node.append('import java.util.function.Consumer;', NL);
  node.append('import java.util.function.Function;', NL);
  node.append('import java.util.Objects;', NL);
  node.append('import java.util.Optional;', NL);
  node.appendNewLine();
  node.append(`public interface BaseDTO {`, NL);
  node.indent((child) => {
    child.append('public static class Either<T, U> {', NL);
    child.indent((classBody) => {
      classBody.append('private T left;', NL);
      classBody.append('private U right;', NL);
      classBody.appendNewLine();
      classBody.append('private Either(T left, U right) {', NL);
      classBody.indent((methodBody) => {
        methodBody.append('this.left = left;', NL);
        methodBody.append('this.right = right;', NL);
      });
      classBody.append('}', NL);
      classBody.appendNewLine();
      classBody.append('public static <T, U> Either<T, U> left(T left) {', NL);
      classBody.indent((methodBoy) => {
        methodBoy.append('Objects.requireNonNull(left);', NL);
        methodBoy.append('return new Either<T, U>(left, null);', NL);
      });
      classBody.append('}', NL);
      classBody.appendNewLine();
      classBody.append(
        'public static <T, U> Either<T, U> right(U right) {',
        NL
      );
      classBody.indent((methodBoy) => {
        methodBoy.append('Objects.requireNonNull(right);', NL);
        methodBoy.append('return new Either<T, U>(null, right);', NL);
      });
      classBody.append('}', NL);
      classBody.appendNewLine();
      classBody.append(
        'public Optional<U> isLeftPresent(Consumer<T> consumer) {',
        NL
      );
      classBody.indent((methodBoy) => {
        methodBoy.append('if (left == null) {', NL);
        methodBoy.indent((block) => {
          block.append('return Optional.of(right);', NL);
        });
        methodBoy.append('}', NL);
        methodBoy.append('consumer.accept(left);', NL);
        methodBoy.append('return Optional.empty();', NL);
      });
      classBody.append('}', NL);
      classBody.appendNewLine();
      classBody.append(
        'public void accept(Consumer<T> consumerLeft, Consumer<U> consumerRight) {',
        NL
      );
      classBody.indent((methodBody) => {
        methodBody.append('if (left != null) {', NL);
        methodBody.indent((block) => {
          block.append('consumerLeft.accept(left);', NL);
        });
        methodBody.append('} else {', NL);
        methodBody.indent((block) => {
          block.append('consumerRight.accept(right);', NL);
        });
        methodBody.append('}', NL);
      });
      classBody.append('}', NL);
      classBody.appendNewLine();
      classBody.append(
        'public <R> R apply(Function<T, R> transformLeft, Function<U, R> transformRight) {',
        NL
      );
      classBody.indent((methodBody) => {
        methodBody.append('if (left != null) {', NL);
        methodBody.indent((block) => {
          block.append('return transformLeft.apply(left);', NL);
        });
        methodBody.append('}', NL);
        methodBody.append('return transformRight.apply(right);', NL);
      });
      classBody.append('}', NL);
    });
    child.append('}', NL);
    child.appendNewLine();
    child.append(`public interface Builder {`, NL);
    child.indent((body) => {
      body.append('public BaseDTO build();', NL);
    });
    child.append('}', NL);
  });
  node.append('}', NL);
  return node;
}
