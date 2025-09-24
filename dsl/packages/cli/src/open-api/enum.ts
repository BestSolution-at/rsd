import { MResolvedEnumType } from '../model.js';

export function generateEnum(t: MResolvedEnumType) {
  const rv: Record<string, unknown> = {};
  rv[t.name] = {
    type: 'string',
    enum: t.entries.map((e) => e.name),
  };
  return rv;
}
