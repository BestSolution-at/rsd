grammar RemoteServicePersistence

entry RSDPersistenceModel:
    enums += PEnumType*
    scalars += PScalarType*
    entities += PEntity+
;

PScalarType:
    doc = (SL_DOC_COMMENT|ML_DOC_COMMENT)?
    'scalar' name=ID ';';

PBuiltinType returns string:
    'boolean'|'short'|'int'|'string'|'float'|'double'|'long'|'local-date'|'local-date-time'|'zoned-date-time';

PEnumType:
    doc = (SL_DOC_COMMENT|ML_DOC_COMMENT)?
    'enum' name=ID '='
        entries += PEnumEntry ( '|' entries += PEnumEntry )*
    ';';

PEnumEntry:
    name=ID ('=' (value=INT|STRING))?
;

PEntity:
    'entity' name=ID '{'

    '}'
;

PValueType:
    PScalarType | PEnumType
;

PValueTypeRef:
    (builtin=PBuiltinType | refType=[PValueType:ID])
;

PValueProperty:
    'val' name = ID ':' type=PValueTypeRef array?='[]'? optional?='?'? 'as' name=ID
;

PReferenceProperty:
    ('contains' name=ID ':' type=[PEntity:ID] array?='[]'? optional?='?'? )
    |
    ('refs' name=ID ':' type=[PEntity:ID] optional?='?'?)
;

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

terminal ML_DOC_COMMENT: /<\*[\s\S]*?\*>/;
terminal SL_DOC_COMMENT: /<<[^\n\r]*/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
