import { isDefined, isObject } from './util.js';

export type FloatBuiltinType = 'double' | 'float';
export type IntegerBuiltinType = 'int' | 'long' | 'short';

export type NumericBuiltinType = FloatBuiltinType | IntegerBuiltinType;

export type MBuiltinType =
	| 'boolean'
	| 'local-date'
	| 'local-date-time'
	| 'string'
	| 'zoned-date-time'
	| NumericBuiltinType;

export function isMBuiltinType(value: unknown): value is MBuiltinType {
	return (
		value === 'boolean' ||
		value === 'local-date' ||
		value === 'local-date-time' ||
		value === 'string' ||
		value === 'zoned-date-time' ||
		isMBuiltinNumericType(value)
	);
}

export function isMBuiltinNumericType(value: unknown): value is NumericBuiltinType {
	return isMBuiltinFloatType(value) || isMBuiltinIntegerType(value);
}

export function isMBuiltinFloatType(value: unknown): value is FloatBuiltinType {
	return value === 'double' || value === 'float';
}

export function isMBuiltinIntegerType(value: unknown): value is IntegerBuiltinType {
	return value === 'int' || value === 'long' || value === 'short';
}

export type MStreamType = 'blob' | 'file';

export function isMStreamType(value: unknown): value is MStreamType {
	return value === 'blob' || value === 'file';
}

export type MRSDModel<T extends MUserType = MUserType, S extends MService = MService> = {
	'@type': 'RSDModel';
	elements: readonly T[];
	services: readonly S[];
	errors: readonly MError[];
};

export type MResolvedRSDModel = MRSDModel<MResolvedUserType, MResolvedService>;

export function isMRSDModel(value: unknown): value is MRSDModel {
	return isObject(value) && '@type' in value && value['@type'] === 'RSDModel';
}

export type MBaseProperty = MKeyProperty | MRevisionProperty | MProperty;
export type MUserType = MUnionType | MMixinType | MRecordType | MEnumType | MScalarType | MInlineEnumType;
export type MResolvedUserType =
	| MResolvedUnionType
	| MResolvedMixinType
	| MResolvedRecordType
	| MResolvedEnumType
	| MResolvedScalarType
	| MResolvedInlineEnumType;

export type MScalarType = {
	'@type': 'ScalarType';
	name: string;
	doc: string;
};

export type MResolvedScalarType = MScalarType;

export function isMScalarType(value: unknown): value is MScalarType {
	return isObject(value) && '@type' in value && value['@type'] === 'ScalarType';
}

export type MUnionType = {
	'@type': 'UnionType';
	name: string;
	patchable: boolean;
	types: readonly string[];
	descriminator: string;
	descriminatorAliases?: Record<string, string>;
	doc: string;
};

export type MResolvedUnionType = MUnionType & {
	resolved: {
		records: readonly MResolvedRecordType[];
		sharedProps: readonly MResolvedBaseProperty[];
	};
};

export type MResolvedBaseProperty = MBaseProperty & {
	resolved: {
		owner: MResolvedMixinType | MResolvedRecordType;
		resolvedObjectType: () => MResolvedUnionType | MResolvedRecordType | undefined;
	};
};

export function isMUnionType(value: unknown): value is MUnionType {
	return isObject(value) && '@type' in value && value['@type'] === 'UnionType';
}

export function isMResolvedUnionType(value: unknown): value is MResolvedUnionType {
	return isMUnionType(value) && 'resolved' in value && isObject(value.resolved);
}

export type MMixinType = {
	'@type': 'MixinType';
	name: string;
	properties: readonly MBaseProperty[];
	doc: string;
};

export type MResolvedMixinType = MMixinType & {
	resolved: {
		records: readonly MResolvedRecordType[];
		properties: readonly MResolvedBaseProperty[];
	};
};

export function isMMixinType(value: unknown): value is MMixinType {
	return isObject(value) && '@type' in value && value['@type'] === 'MixinType';
}

export type MRecordType = {
	'@type': 'RecordType';
	name: string;
	patchable: boolean;
	mixins: readonly string[];
	properties: readonly MBaseProperty[];
	doc: string;
};

export type MResolvedRecordType = MRecordType & {
	resolved: {
		mixins: readonly MResolvedMixinType[];
		unions: readonly MResolvedUnionType[];
		properties: readonly MResolvedBaseProperty[];
	};
};

export function isMRecordType(value: unknown): value is MRecordType {
	return isObject(value) && '@type' in value && value['@type'] === 'RecordType';
}

export function isMResolvedRecordType(value: unknown): value is MResolvedRecordType {
	return isMRecordType(value) && 'resolved' in value && isObject(value.resolved);
}

export type MKeyProperty = {
	'@type': 'KeyProperty';
	name: string;
	type: MBuiltinType;
	doc: string;
};

export function isMKeyProperty(value: unknown): value is MKeyProperty {
	return isObject(value) && '@type' in value && value['@type'] === 'KeyProperty';
}

export type MRevisionProperty = {
	'@type': 'RevisionProperty';
	name: string;
	type: MBuiltinType;
	doc: string;
};

export function isMRevisionProperty(value: unknown): value is MRevisionProperty {
	return isObject(value) && '@type' in value && value['@type'] === 'RevisionProperty';
}

export type MPropertyInlineProperty = {
	'@type': 'Property';
	name: string;
	array: boolean;
	arrayMaxLength?: number;
	readonly: boolean;
	optional: boolean;
	nullable: boolean;
	variant: 'inline-enum';
	type: MInlineEnumType;
	doc: string;
};

export type MPropertyNoneInlineProperty = {
	'@type': 'Property';
	name: string;
	array: boolean;
	arrayMaxLength?: number;
	readonly: boolean;
	optional: boolean;
	nullable: boolean;
	variant: 'enum' | 'builtin' | 'scalar' | 'union' | 'record';
	type: string;
	doc: string;
};

export type MProperty = MPropertyNoneInlineProperty | MPropertyInlineProperty;

export function isMPropertyNoneInlineProperty(value: MProperty): value is MPropertyNoneInlineProperty {
	return (
		value.variant === 'enum' ||
		value.variant === 'builtin' ||
		value.variant === 'scalar' ||
		value.variant === 'union' ||
		value.variant === 'record'
	);
}

export type MResolvedPropery = MProperty & MResolvedBaseProperty;

export function isMProperty(value: unknown): value is MProperty {
	return isObject(value) && '@type' in value && value['@type'] === 'Property';
}

export function isMResolvedProperty(value: unknown): value is MResolvedPropery {
	return isObject(value) && '@type' in value && value['@type'] === 'Property' && 'resolved' in value;
}

export type MEnumType = {
	'@type': 'EnumType';
	name: string;
	entries: readonly MEnumEntry[];
	doc: string;
};

export type MResolvedEnumType = MEnumType;
export type MResolvedInlineEnumType = MInlineEnumType;

export function isMEnumType(value: unknown): value is MEnumType {
	return isObject(value) && '@type' in value && value['@type'] === 'EnumType';
}

export type MInlineEnumType = {
	'@type': 'InlineEnumType';
	entries: readonly MEnumEntry[];
};

export function isMInlineEnumType(value: unknown): value is MInlineEnumType {
	return isObject(value) && '@type' in value && value['@type'] === 'InlineEnumType';
}

export type MEnumEntry = {
	'@type': 'EnumEntry';
	name: string;
	value?: number;
};

export function isMEnumEntry(value: unknown): value is MEnumEntry {
	return isObject(value) && '@type' in value && value['@type'] === 'EnumEntry';
}

export type MService<O extends MOperation = MOperation> = {
	'@type': 'Service';
	name: string;
	doc: string;
	operations: readonly O[];
	meta?: {
		rest?: {
			path: string;
		};
	};
};

export type MResolvedService = MService<MResolvedOperation>;

export type MOperation = {
	'@type': 'Operation';
	name: string;
	doc: string;
	parameters: readonly MParameter[];
	resultType?: MReturnType;
	/**
	 * @deprecated use operationErrors
	 */
	errors: string[];
	operationErrors: MOperationError[];
	meta?: {
		rest?: {
			path: string;
			method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
			results: {
				statusCode: number;
				error?: string;
			}[];
		};
	};
};

export type MOperationError = {
	'@type': 'OperationError';
	error: string;
	doc: string;
};

export type MResolvedOperation = MOperation & {
	resolved: {
		errors: MError[];
	};
};

export type MParameterInlineEnumType = {
	'@type': 'Parameter';
	name: string;
	patch: boolean;
	array: boolean;
	arrayMaxLength?: number;
	optional: boolean;
	nullable: boolean;
	variant: 'inline-enum';
	type: MInlineEnumType;
	doc: string;
	meta?: {
		rest?: {
			source: 'path' | 'header' | 'query' | 'cookie';
			name: string;
		};
	};
};

export type MParameterNoneInlineEnumType = {
	'@type': 'Parameter';
	name: string;
	patch: boolean;
	array: boolean;
	arrayMaxLength?: number;
	optional: boolean;
	nullable: boolean;
	variant: 'enum' | 'builtin' | 'scalar' | 'union' | 'record' | 'stream';
	type: string;
	doc: string;
	meta?: {
		rest?: {
			source: 'path' | 'header' | 'query' | 'cookie';
			name: string;
		};
	};
};

export type MParameter = MParameterInlineEnumType | MParameterNoneInlineEnumType;

export type MReturnTypeInlineEnumType = {
	'@type': 'ReturnType';
	variant: 'inline-enum';
	type: MInlineEnumType;
	array: boolean;
	arrayMaxLength?: number;
	doc: string;
};

export type MReturnTypeNoneInlineEnumType = {
	'@type': 'ReturnType';
	variant: 'enum' | 'builtin' | 'scalar' | 'union' | 'record' | 'stream';
	type: string;
	array: boolean;
	arrayMaxLength?: number;
	doc: string;
};

export type MReturnType = MReturnTypeInlineEnumType | MReturnTypeNoneInlineEnumType;

export type MError = {
	'@type': 'Error';
	name: string;
};

export function resolve(model: MRSDModel): MResolvedRSDModel {
	const solvedMixins = new Map<string, MResolvedMixinType>();
	const solvedRecords = new Map<string, MResolvedRecordType>();
	const solvedUnions = new Map<string, MResolvedUnionType>();
	return {
		...model,
		elements: model.elements.map(t => mapToResolved(t, model, solvedMixins, solvedRecords, solvedUnions)),
		services: model.services.map(s => mapToResolvedService(s, model)),
	};
}

function mapToResolved(
	t: MUserType,
	model: MRSDModel,
	solvedMixins: Map<string, MResolvedMixinType>,
	solvedRecords: Map<string, MResolvedRecordType>,
	solvedUnions: Map<string, MResolvedUnionType>,
): MResolvedUserType {
	if (isMMixinType(t)) {
		return mapToResolvedMixinType(t, model, solvedMixins, solvedRecords, solvedUnions);
	} else if (isMRecordType(t)) {
		return mapToResolvedRecordType(t, model, solvedMixins, solvedRecords, solvedUnions);
	} else if (isMUnionType(t)) {
		return mapToResolvedUnionType(t, model, solvedMixins, solvedRecords, solvedUnions);
	} else if (isMEnumType(t)) {
		return t;
	} else if (isMScalarType(t)) {
		return t;
	}
	throw new Error(t['@type']);
}

function mapToResolvedMixinType(
	t: MMixinType,
	model: MRSDModel,
	solvedMixins: Map<string, MResolvedMixinType>,
	solvedRecords: Map<string, MResolvedRecordType>,
	solvedUnions: Map<string, MResolvedUnionType>,
): MResolvedMixinType {
	const solved = solvedMixins.get(t.name);
	if (solved) {
		return solved;
	}

	const records: MResolvedRecordType[] = [];
	const rv: MResolvedMixinType = {
		...t,
		resolved: {
			records,
			properties: [],
		},
	};

	rv.resolved.properties = t.properties.map(p => ({
		...p,
		resolved: {
			owner: rv,
			resolvedObjectType: () =>
				isMInlineEnumType(p.type) ? undefined : (solvedUnions.get(p.type) ?? solvedRecords.get(p.type)),
		},
	}));
	rv.properties = rv.resolved.properties; // This is bogus and looks like a bug

	solvedMixins.set(t.name, rv);

	const resolvedRecords = model.elements
		.filter(isMRecordType)
		.filter(r => r.mixins.includes(t.name))
		.map(r => mapToResolvedRecordType(r, model, solvedMixins, solvedRecords, solvedUnions));

	records.push(...resolvedRecords);

	return rv;
}

function mapToResolvedRecordType(
	t: MRecordType,
	model: MRSDModel,
	solvedMixins: Map<string, MResolvedMixinType>,
	solvedRecords: Map<string, MResolvedRecordType>,
	solvedUnions: Map<string, MResolvedUnionType>,
): MResolvedRecordType {
	const solved = solvedRecords.get(t.name);
	if (solved) {
		return solved;
	}

	const mixins: MResolvedMixinType[] = [];
	const unions: MResolvedUnionType[] = [];

	const rv: MResolvedRecordType = {
		...t,
		resolved: {
			mixins,
			unions,
			properties: [],
		},
	};
	solvedRecords.set(t.name, rv);
	rv.resolved.properties = t.properties.map(p => ({
		...p,
		resolved: {
			owner: rv,
			resolvedObjectType: () =>
				isMInlineEnumType(p.type) ? undefined : (solvedUnions.get(p.type) ?? solvedRecords.get(p.type)),
		},
	}));
	rv.properties = rv.resolved.properties;

	const resolvedMixins = model.elements
		.filter(isMMixinType)
		.filter(m => t.mixins.includes(m.name))
		.map(m => mapToResolvedMixinType(m, model, solvedMixins, solvedRecords, solvedUnions));
	mixins.push(...resolvedMixins);

	const resolvedUnions = model.elements
		.filter(isMUnionType)
		.filter(u => u.types.includes(t.name))
		.map(u => mapToResolvedUnionType(u, model, solvedMixins, solvedRecords, solvedUnions));

	unions.push(...resolvedUnions);

	return rv;
}

function mapToResolvedUnionType(
	t: MUnionType,
	model: MRSDModel,
	solvedMixins: Map<string, MResolvedMixinType>,
	solvedRecords: Map<string, MResolvedRecordType>,
	solvedUnions: Map<string, MResolvedUnionType>,
): MResolvedUnionType {
	const solved = solvedUnions.get(t.name);
	if (solved) {
		return solved;
	}

	const records: MResolvedRecordType[] = [];
	const sharedProps: MResolvedBaseProperty[] = [];

	const rv: MResolvedUnionType = {
		...t,
		resolved: {
			records,
			sharedProps,
		},
	};

	solvedUnions.set(t.name, rv);

	const resolvedRecords = model.elements
		.filter(isMRecordType)
		.filter(r => t.types.includes(r.name))
		.map(r => mapToResolvedRecordType(r, model, solvedMixins, solvedRecords, solvedUnions));
	records.push(...resolvedRecords);

	const allProperties = resolvedRecords.flatMap(r => {
		return allResolvedRecordProperties(r);
	});

	const groupCount = new Map<string, MResolvedBaseProperty[]>();

	allProperties.forEach(p => {
		// Inline enums can not be shared
		if (isMInlineEnumType(p.type)) {
			return;
		}

		const key = `${p.name}#${p.type}`;
		const data = groupCount.get(key);
		if (data) {
			data.push(p);
		} else {
			groupCount.set(key, [p]);
		}
	});

	groupCount.forEach(e => {
		if (e.length === resolvedRecords.length) {
			sharedProps.push(e[0]);
		}
	});

	return rv;
}

function mapToResolvedService(m: MService, model: MRSDModel): MResolvedService {
	return {
		...m,
		operations: m.operations.map(o => mapToResolvedOperation(o, model)),
	};
}

function mapToResolvedOperation(o: MOperation, model: MRSDModel): MResolvedOperation {
	return {
		...o,
		resolved: {
			errors: o.operationErrors.map(e => model.errors.find(err => err.name === e.error)).filter(isDefined),
		},
	};
}

export function allRecordProperties(record: MResolvedRecordType) {
	const properties = [...record.properties, ...record.resolved.mixins.flatMap(m => m.properties)];

	return properties;
}

export function allResolvedRecordProperties(record: MResolvedRecordType) {
	const properties = [...record.resolved.properties, ...record.resolved.mixins.flatMap(m => m.resolved.properties)];

	return properties;
}
