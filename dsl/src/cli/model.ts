import { BuiltinType } from "../language/generated/ast.js";
import { isObject } from "./util.js";

export type MBuiltinType = BuiltinType;

export function isMBuiltinType(value: string): value is MBuiltinType {
    return value === 'boolean' || 
        value === 'double' ||
        value === 'float' ||
        value === 'int' || 
        value === 'local-date' || 
        value === 'local-date-time' ||
        value === 'long' || 
        value === 'short' ||
        value === 'string' ||
        value === 'zoned-date-time';
}

export type MRSDModel<T extends MUserType = MUserType> = {
    '@type': 'RSDModel'
    elements: readonly T[]
}

export type MResolvedRSDModel = MRSDModel<MResolvedUserType>;

export function isMRSDModel(value: unknown): value is MUnionType {
    return isObject(value) 
        && '@type' in value
        && value['@type'] === 'RSDModel';
}

export type MBaseProperty = MKeyProperty|MRevisionProperty|MProperty;
export type MUserType = MUnionType | MMixinType | MRecordType | MEnumType | MScalarType;
export type MResolvedUserType = MResolvedUnionType | MResolvedMixinType | MResolvedRecordType | MResolvedEnumType | MResolvedScalarType;

export type MScalarType = {
    '@type': 'ScalarType'
    name: string
}

export type MResolvedScalarType = MScalarType

export function isMScalarType(value: unknown): value is MScalarType {
    return isObject(value)
        && '@type' in value
        && value['@type'] === 'ScalarType'
}

export type MUnionType = {
    '@type': 'UnionType'
    name: string
    patchable: boolean
    types: readonly string[]
    descriminator: string
    descriminatorAliases?: Record<string, string>
}

export type MResolvedUnionType = MUnionType & {
    resolved: {
        records: readonly MResolvedRecordType[]
        sharedProps: readonly MBaseProperty[]
    }
}

export function isMUnionType(value: unknown): value is MUnionType {
    return isObject(value) 
        && '@type' in value
        && value['@type'] === 'UnionType';
}

export type MMixinType = {
    '@type': 'MixinType'
    name: string
    properties: readonly MBaseProperty[]
}

export type MResolvedMixinType = MMixinType & {
    resolved: {
        records: readonly MResolvedRecordType[]
    }
}

export function isMMixinType(value: unknown): value is MMixinType {
    return isObject(value) 
        && '@type' in value
        && value['@type'] === 'MixinType';
}

export type MRecordType = {
    '@type': 'RecordType'
    name: string
    patchable: boolean
    mixins: readonly string[]
    properties: readonly MBaseProperty[]
}

export type MResolvedRecordType = MRecordType & {
    resolved: {
        mixins: readonly MResolvedMixinType[]
        unions: readonly MResolvedUnionType[]
    }
}

export function isMRecordType(value: unknown): value is MRecordType {
    return isObject(value) 
        && '@type' in value
        && value['@type'] === 'RecordType';
}

export function isMResolvedRecordType(value: unknown): value is MResolvedRecordType {
    return isMRecordType(value) && 'resolved' in value && isObject(value.resolved);
}

export type MKeyProperty = {
    '@type': 'KeyProperty'
    name: string
    type: MBuiltinType
}

export function isMKeyProperty(value: unknown): value is MKeyProperty {
    return isObject(value) 
        && '@type' in value
        && value['@type'] === 'KeyProperty';
}

export type MRevisionProperty = {
    '@type': 'RevisionProperty'
    name: string
    type: MBuiltinType
}

export function isMRevisionProperty(value: unknown): value is MRevisionProperty {
    return isObject(value) 
        && '@type' in value
        && value['@type'] === 'RevisionProperty';
}

export type MProperty = {
    '@type': 'Property'
    name: string
    array: boolean
    arrayMaxLength?: number
    readonly: boolean
    optional: boolean
    nullable: boolean
    variant: 'enum' | 'builtin' | 'scalar' | 'union' | 'record'
    type: string
}

export function isMProperty(value: unknown): value is MProperty {
    return isObject(value) 
        && '@type' in value
        && value['@type'] === 'Property';
}

export type MEnumType = {
    '@type': 'EnumType'
    name: string
    entries: readonly MEnumEntry[]
    default?: string
}

export type MResolvedEnumType = MEnumType;

export function isMEnumType(value: unknown): value is MEnumType {
    return isObject(value) 
        && '@type' in value
        && value['@type'] === 'EnumType';
}

export type MEnumEntry = {
    '@type': 'EnumEntry'
    name: string,
    value?: number
}

export function isMEnumEntry(value: unknown): value is MEnumEntry {
    return isObject(value) 
        && '@type' in value
        && value['@type'] === 'EnumEntry';
}



export function resolve(model: MRSDModel): MResolvedRSDModel {
    const solvedMixins = new Map<string, MResolvedMixinType>()
    const solvedRecords = new Map<string, MResolvedRecordType>();
    const solvedUnions = new Map<string, MResolvedUnionType>();
    return {
        ...model,
        elements: model.elements.map( t => mapToResolved(t, model, solvedMixins, solvedRecords, solvedUnions) )
    };
}

function mapToResolved(t: MUserType, model: MRSDModel, 
    solvedMixins: Map<string, MResolvedMixinType>,
    solvedRecords: Map<string, MResolvedRecordType>,
    solvedUnions: Map<string, MResolvedUnionType>
    ): MResolvedUserType {
    
    if( isMMixinType(t) ) {
        return mapToResolvedMixinType(t, model, solvedMixins, solvedRecords, solvedUnions)
    } else if( isMRecordType(t) ) {
        return mapToResolvedRecordType(t, model, solvedMixins, solvedRecords, solvedUnions)
    } else if( isMUnionType(t) ) {
        return mapToResolvedUnionType(t, model, solvedMixins, solvedRecords, solvedUnions)
    } else if( isMEnumType(t) ) {
        return t;
    } else if( isMScalarType(t) ) {
        return t;
    }
    throw new Error(String(t["@type"]));
}

function mapToResolvedMixinType(t: MMixinType, model: MRSDModel,
    solvedMixins: Map<string, MResolvedMixinType>,
    solvedRecords: Map<string, MResolvedRecordType>,
    solvedUnions: Map<string, MResolvedUnionType>): MResolvedMixinType {
    const solved = solvedMixins.get(t.name);
    if( solved ) {
        return solved;
    }

    const records : MResolvedRecordType[] = [];
    const rv : MResolvedMixinType = {
        ...t,
        resolved: {
            records 
        }
    }
    solvedMixins.set(t.name, rv)

    const resolvedRecords = model.elements
        .filter(isMRecordType)
        .filter(r => r.mixins.includes(t.name))
        .map( r => mapToResolvedRecordType(r, model, solvedMixins, solvedRecords, solvedUnions));

    records.push(...resolvedRecords)
    
    return rv;
}

function mapToResolvedRecordType(t: MRecordType, model: MRSDModel,
    solvedMixins: Map<string, MResolvedMixinType>,
    solvedRecords: Map<string, MResolvedRecordType>,
    solvedUnions: Map<string, MResolvedUnionType>): MResolvedRecordType {
    const solved = solvedRecords.get(t.name);
    if( solved ) {
        return solved;
    }

    const mixins : MResolvedMixinType[] = []
    const unions: MResolvedUnionType[] = []

    const rv : MResolvedRecordType = {
        ...t,
        resolved: {
            mixins,
            unions
        }
    }

    solvedRecords.set(t.name, rv)

    const resolvedMixins = model.elements
        .filter(isMMixinType)
        .filter( m => t.mixins.includes(m.name))
        .map( m => mapToResolvedMixinType(m, model, solvedMixins, solvedRecords, solvedUnions))
    mixins.push(...resolvedMixins)

    const resolvedUnions = model.elements
        .filter(isMUnionType)
        .filter( u => u.types.includes(t.name))
        .map( u => mapToResolvedUnionType(u, model, solvedMixins, solvedRecords, solvedUnions))
    
    unions.push(...resolvedUnions)

    return rv;
}

function mapToResolvedUnionType(t: MUnionType, model: MRSDModel,
    solvedMixins: Map<string, MResolvedMixinType>,
    solvedRecords: Map<string, MResolvedRecordType>,
    solvedUnions: Map<string, MResolvedUnionType>): MResolvedUnionType {
    const solved = solvedUnions.get(t.name)
    if( solved ) {
        return solved;
    }

    const records: MResolvedRecordType[] = [];
    const sharedProps: MBaseProperty[] = [];

    const rv : MResolvedUnionType = {
        ...t,
        resolved: {
            records,
            sharedProps
        }
    }

    solvedUnions.set(t.name, rv);

    const resolvedRecords = model.elements
        .filter(isMRecordType)
        .filter( r => t.types.includes(r.name))
        .map( r => mapToResolvedRecordType(r, model, solvedMixins, solvedRecords, solvedUnions))
    records.push(...resolvedRecords)

    resolvedRecords.forEach(e => console.log(e))

    const allProperties = resolvedRecords.flatMap( r => {
        const result = allRecordProperties(r);
        return result;
    } );
    const groupCount = new Map<string, MBaseProperty[]>();

    allProperties.forEach( p => {
        const key = `${p.name}#${p.type}`;
        const data = groupCount.get(key);
        if( data ) {
            data.push(p);
        } else {
            groupCount.set(key, [ p ])
        }
    })

    groupCount.forEach( (e) => {
        if(e.length === resolvedRecords.length) {
            sharedProps.push(e[0]);
        }
    } )

    return rv;
}

export function allRecordProperties(record: MResolvedRecordType) {
    const properties = [
        ...record.properties,
        ...record.resolved.mixins.flatMap( m => m.properties),
    ];

    return properties;
}