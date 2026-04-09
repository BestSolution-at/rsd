import { MResolvedUnionType } from '../model.js';

export function generateUnionContent(t: MResolvedUnionType) {
	const rv: Record<string, unknown> = {};

	const mapping: Record<string, string> = {};
	t.resolved.records.forEach(r => {
		const key = t.descriminatorAliases ? (t.descriminatorAliases[r.name] ?? r.name) : r.name;
		mapping[key] = `#/components/schemas/${r.name}`;
	});

	rv[t.name] = {
		oneOf: t.resolved.records.map(r => ({
			$ref: `#/components/schemas/${r.name}`,
		})),
		discriminator: {
			propertyName: t.descriminator,
			mapping,
		},
	};

	if (t.resolved.records.find(r => r.patchable)) {
		const patchMapping: Record<string, string> = {};
		t.resolved.records.forEach(r => {
			const key = t.descriminatorAliases ? (t.descriminatorAliases[r.name] ?? r.name) : r.name;
			patchMapping[`patch:${key}`] = `#/components/schemas/${r.name}Patch`;
		});
		rv[`${t.name}Patch`] = {
			oneOf: t.resolved.records.map(r => ({
				$ref: `#/components/schemas/${r.name}Patch`,
			})),
			discriminator: {
				propertyName: t.descriminator,
				mapping: patchMapping,
			},
		};
	}
	return rv;
}
