import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
  allResolvedRecordProperties,
  isMKeyProperty,
  isMRevisionProperty,
  MResolvedBaseProperty,
  MResolvedRecordType,
  MResolvedRSDModel,
} from '../model.js';
import { generatePropertyNG } from './shared.js';

export function generateRecordContent(
  t: MResolvedRecordType,
  model: MResolvedRSDModel,
  nativeTypeSubstitues: Record<string, string> | undefined,
  interfaceBasePackage: string,
  fqn: (type: string) => string
): CompositeGeneratorNode {
  const node = new CompositeGeneratorNode();

  const Interface = fqn(`${interfaceBasePackage}.${t.name}`);
  const JsonObject = fqn('jakarta.json.JsonObject');

  const allProps = allResolvedRecordProperties(t);
  const keyProp = allProps.find(isMKeyProperty);
  const revProp = allProps.find(isMRevisionProperty);

  node.append(
    `public class ${t.name}DataImpl extends _BaseDataImpl implements ${Interface}.Data {`,
    NL
  );
  node.indent((classBody) => {
    classBody.append(`${t.name}DataImpl(${JsonObject} data) {`, NL);
    classBody.indent((initBody) => {
      initBody.append('super(data);', NL);
    });
    classBody.append('}', NL, NL);
    classBody.append(
      generatePropertyAccessors(
        t,
        allProps,
        nativeTypeSubstitues,
        interfaceBasePackage,
        fqn
      )
    );
    classBody.append(generateOf(t, fqn), NL);
    classBody.append(generateToString(keyProp, revProp));
  });

  node.append('}', NL);

  return node;
}

function generateOf(t: MResolvedRecordType, fqn: (type: string) => string) {
  const JsonObject = fqn('jakarta.json.JsonObject');
  const node = new CompositeGeneratorNode();
  node.append(`public static ${t.name}.Data of(${JsonObject} obj) {`, NL);
  node.indent((methodBody) => {
    methodBody.append(`return new ${t.name}DataImpl(obj);`, NL);
  });
  node.append('}', NL);
  return node;
}

function generateToString(
  keyProp: MResolvedBaseProperty | undefined,
  revProp: MResolvedBaseProperty | undefined
) {
  const classBody = new CompositeGeneratorNode();
  classBody.append('public String toString() {', NL);
  classBody.indent((methodBody) => {
    if (keyProp && revProp) {
      methodBody.append(
        `return "%s[%s=%s@%s=%s]".formatted(getClass().getSimpleName(), "${keyProp.name}", ${keyProp.name}(), "${revProp.name}", ${revProp.name}());`,
        NL
      );
    } else if (keyProp) {
      methodBody.append(
        `return "%s[%s=%s]".formatted(getClass().getSimpleName(), "${keyProp.name}", ${keyProp.name}());`,
        NL
      );
    } else if (revProp) {
      methodBody.append(
        `return "%s[@%s=%s]".formatted(getClass().getSimpleName(), "${revProp.name}", ${revProp.name}());`,
        NL
      );
    } else {
      methodBody.append('return getClass().getSimpleName();', NL);
    }
  });
  classBody.append('}', NL);
  return classBody;
}

function generatePropertyAccessors(
  owner: MResolvedRecordType,
  props: MResolvedBaseProperty[],
  nativeTypeSubstitues: Record<string, string> | undefined,
  interfaceBasePackage: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(
    ...props.flatMap((p) => {
      return [
        generatePropertyNG(
          owner,
          p,
          nativeTypeSubstitues,
          interfaceBasePackage,
          fqn
        ),
        NL,
      ];
    })
  );
  return node;
}
