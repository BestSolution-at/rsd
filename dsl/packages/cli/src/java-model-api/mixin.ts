import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
  isMInlineEnumType,
  isMProperty,
  MResolvedMixinType,
} from '../model.js';
import { generateInlineEnum } from './enum.js';
import { toFirstUpper } from '../util.js';
import { generatePropertyAccessor } from './shared.js';

export function generateMixinContent(
  t: MResolvedMixinType,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(`public interface ${t.name}Mixin {`, NL);
  node.indent((classBody) => {
    classBody.append(generateInlineEnums(t));
    // classBody.append(generateBuilder(t));
    classBody.append(
      generatePropertyAccessors(t, nativeTypeSubstitues, basePackageName, fqn)
    );
  });
  node.append('}', NL);

  return node;
}

function generateInlineEnums(t: MResolvedMixinType) {
  const node = new CompositeGeneratorNode();

  t.properties
    .filter(isMProperty)
    .filter((p) => p.variant === 'inline-enum')
    .forEach((p) => {
      const inlineEnum = p.type;
      if (isMInlineEnumType(inlineEnum)) {
        node.append(generateInlineEnum(inlineEnum, toFirstUpper(p.name)));
      }
    });
  node.appendNewLineIf(node.contents.length > 0);
  return node;
}

function generatePropertyAccessors(
  t: MResolvedMixinType,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string
) {
  const node = new CompositeGeneratorNode();
  t.resolved.properties.forEach((p) => {
    node.append(
      generatePropertyAccessor(p, nativeTypeSubstitues, basePackageName, fqn)
    );
    node.append(NL);
  });
  return node;
}

/*
function generateBuilder(t: MResolvedMixinType) {
  const node = new CompositeGeneratorNode();
  node.append('public interface Builder {}', NL);
  return node;
}
*/
