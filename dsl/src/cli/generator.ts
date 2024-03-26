import { UserType, type RSDModel, isEnumType, EnumType, EnumEntry, MixinType, isMixinType, KeyProperty, RevisionProperty, Property, RecordType, isRecordType, UnionType, isUnionType, ScalarType, isScalarType } from '../language/generated/ast.js';
// import { expandToNode, joinToNode, toString } from 'langium/generate';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { extractDestinationAndName } from './cli-util.js';
import { MEnumEntry, MEnumType, MInlineEnumType, MKeyProperty, MMixinType, MProperty, MRSDModel, MRecordType, MRevisionProperty, MScalarType, MUnionType, MUserType } from './model.js';
import { isDefined } from './util.js';

export function generateJavaScript(model: RSDModel, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.json`;

    const result = generateModel(model);

    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    fs.writeFileSync(generatedFilePath, JSON.stringify(result, null, 2));
    return generatedFilePath;
}

export function generateModel(model: RSDModel): MRSDModel {
    return {
        '@type': 'RSDModel',
        elements: model.elements.map(mapUserType)
    };
}

function mapUserType(userType: UserType): MUserType {
    if( isEnumType(userType) ) {
        return mapEnumType(userType)
    } else if( isMixinType(userType) ) {
        return mapMixinType(userType)
    } else if( isRecordType(userType) ) {
        return mapRecord(userType);
    } else if( isUnionType(userType) ) {
        return mapUnionType(userType)
    } else if( isScalarType(userType) ) {
        return mapScalarType(userType)
    }
    throw new Error(userType)
}

function mapScalarType(scalarType: ScalarType) {
    const rv : MScalarType = {
        '@type': 'ScalarType',
        name: scalarType.name
    }
    return rv;
}

function mapUnionType(unionType: UnionType) {
    const rv : MUnionType = {
        '@type': 'UnionType',
        name: unionType.name,
        patchable: unionType.patchable,
        types: unionType.records.map(r => r.record.ref).filter(isDefined).map(ref => ref.name),
        descriminator: unionType.descProp ?? '@type'
    };
    if( unionType.records.find( r => r.value ) ) {
        const alias : Record<string, string> = {}
        rv['descriminatorAliases'] = alias;
        unionType.records
            .filter(r => r.value)
            .forEach( r => {
                alias[r.record.ref?.name ?? ''] = r.value ?? ''
            });
    }
    return rv;
}

function mapRecord(recordType: RecordType) {
    const properties: (MKeyProperty|MRevisionProperty|MProperty)[] = [];
    const mixins: string[] = recordType.mixins.map(m => m.ref?.name).filter(isDefined)
    
    if( recordType.keyProperty ) {
        properties.push(mapKeyProperty(recordType.keyProperty));
    }
    if( recordType.revProperty ) {
        properties.push(mapRevisionProperty(recordType.revProperty))
    }

    properties.push(...recordType.property.map(mapProperty));

    const rv : MRecordType = {
        '@type': 'RecordType',
        name: recordType.name,
        patchable: recordType.patchable,
        mixins,
        properties
    };
    
    return rv;
}

function mapMixinType(mixinType: MixinType) {
    const properties: (MKeyProperty|MRevisionProperty|MProperty)[] = [];

    if( mixinType.keyProperty ) {
        properties.push(mapKeyProperty(mixinType.keyProperty));
    }
    if( mixinType.revProperty ) {
        properties.push(mapRevisionProperty(mixinType.revProperty))
    }

    properties.push(...mixinType.property.map(mapProperty));


    const rv : MMixinType = {
        '@type': 'MixinType',
        name: mixinType.name,
        properties
    };
    
    return rv;
}

function mapProperty(property: Property) {
    const rv : MProperty = {
        '@type': 'Property',
        name: property.namedType.name,
        array: property.namedType.array,
        arrayMaxLength: property.namedType.maxLength,
        readonly: property.readonly,
        optional: property.namedType.optional,
        nullable: property.namedType.nullable,
        variant: computeVariant(property),
        type: computeType(property)
    };
    return rv;
}

function computeType(property: Property) {
    if( property.namedType.inlineEnum ) {
        const rv : MInlineEnumType = {
            '@type': 'InlineEnumType',
            entries: property.namedType.inlineEnum.entries.map(mapEnumEntry)
        }
        return rv;
    } else if( property.namedType.typeRef ) {
        if( property.namedType.typeRef.builtin ) {
            return property.namedType.typeRef.builtin;
        } else {
            return property.namedType.typeRef.refType?.ref?.name ?? '**fail**';
        }
    }
    throw new Error();
}

function computeVariant(property: Property) {
    if( property.namedType.inlineEnum ) {
        return 'inline-enum';
    } else if( property.namedType.typeRef ) {
        if( property.namedType.typeRef.builtin ) {
            return 'builtin';
        } else if( isEnumType(property.namedType.typeRef.refType?.ref) ) {
            return 'enum'
        } else if( isUnionType(property.namedType.typeRef.refType?.ref) ) {
            return 'union'
        } else if( isRecordType(property.namedType.typeRef.refType?.ref) ) {
            return 'record'
        } else if( isScalarType(property.namedType.typeRef.refType?.ref) ) {
            return 'scalar'
        }
    }
    throw new Error();
}

function mapKeyProperty(keyProperty: KeyProperty) {
    const rv : MKeyProperty = {
        '@type': 'KeyProperty',
        name: keyProperty.name,
        type: keyProperty.typeRef
    };
    return rv;
}

function mapRevisionProperty(revisionProperty: RevisionProperty) {
    const rv : MRevisionProperty = {
        '@type': 'RevisionProperty',
        name: revisionProperty.name,
        type: revisionProperty.typeRef
    };
    return rv;
}

function mapEnumType(enumType: EnumType) {
    
    const rv : MEnumType = {
        '@type': 'EnumType',
        name: enumType.name,
        entries: enumType.entries.map(mapEnumEntry),
    };
    
    return rv;
}

function mapEnumEntry(enumEntry: EnumEntry) {
    const rv : MEnumEntry = {
        '@type': 'EnumEntry',
        name: enumEntry.name,
        value: enumEntry.value
    };
    
    return rv;
}


