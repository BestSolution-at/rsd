import { MResolvedUnionType } from '../model.js';

export function generateUnionContent(t: MResolvedUnionType) {
  const rv: Record<string, unknown> = {};

  const mapping: Record<string, string> = {};
  t.resolved.records.forEach((r) => {
    const key = t.descriminatorAliases
      ? t.descriminatorAliases[r.name] ?? r.name
      : r.name;
    mapping[key] = `#/components/schemas/${r.name}`;
  });

  rv[t.name] = {
    oneOf: t.resolved.records.map((r) => ({
      $ref: `#/components/schemas/${r.name}`,
    })),
    discriminator: {
      propertyName: `${t.descriminator}`,
      mapping,
    },
  };
  return rv;
}
