import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
  allResolvedRecordProperties,
  isMResolvedProperty,
  MResolvedBaseProperty,
  MResolvedRecordType,
  MResolvedRSDModel,
} from '../model.js';
import { generatePatchPropertyAccessor } from './shared.js';

export function generateRecordPatchContent(
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
  /*const keyProp = allProps.find(isMKeyProperty);
  const revProp = allProps.find(isMRevisionProperty);*/

  node.append(
    `public class ${t.name}DataPatchImpl_ extends _BaseDataImpl implements ${Interface}.Patch {`,
    NL
  );
  node.indent((classBody) => {
    classBody.append(`${t.name}DataPatchImpl_(${JsonObject} data) {`, NL);
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
  });
  node.append('}', NL);

  return node;
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
    ...props.filter(isMResolvedProperty).flatMap((p) => {
      return [
        generatePatchPropertyAccessor(
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
