import { MResolvedUnionType } from '../model.js';
import { toNode } from '../util.js';

export function generateUnionContent(
	t: MResolvedUnionType,
	nativeTypeSubstitues: Record<string, string> | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const Interface = fqn(`${interfaceBasePackage}.${t.name}`);
	const JsonObject = fqn('jakarta.json.JsonObject');

	const computeDescKey = (name: string) => {
		return t.descriminatorAliases?.[name] ?? name;
	};

	const switchOfCases = t.resolved.records.map(r => {
		return `case "${computeDescKey(r.name)}" -> new ${r.name}DataImpl(obj);`;
	});

	const switchSupportCases = [
		`case "${computeDescKey(t.resolved.records[0].name)}",`,
		[
			t.resolved.records
				.filter((_, idx) => idx > 0)
				.map((r, idx, arr) => `"${computeDescKey(r.name)}"${idx + 1 < arr.length ? ',' : ' ->'}`),
			'true;',
		],
	];

	return toNode([
		`public abstract class ${t.name}DataImpl implements ${Interface}.Data {`,
		[
			`public static boolean isSupportedType(${JsonObject} obj) {`,
			[
				`var descriminator = obj.getString("${t.descriminator}");`,
				'return switch (descriminator) {',
				[...switchSupportCases, 'default -> false;'],
				'};',
			],
			'}',
			'',
			`public static ${Interface}.Data of(${JsonObject} obj) {`,
			[
				`var descriminator = obj.getString("${t.descriminator}");`,
				'return switch (descriminator) {',
				[
					...switchOfCases,
					'default -> throw new IllegalArgumentException("Unexpected value: %s".formatted(descriminator));',
				],
				'};',
			],
			'}',
		],
		'}',
	]);
}
