grammar RemoteServicePersistence

entry RSDPersistenceModel:
    enums+=PEnumType*
    scalars+=PScalarType*
    mixins+=PMixinEntity*
    entities+=PEntity+
;

PScalarType:
    doc=(SL_DOC_COMMENT|ML_DOC_COMMENT)?
    'scalar' name=ID ';';

PBuiltinType returns string:
    'boolean'|'short'|'int'|'string'|'float'|'double'|'long'|'local-date'|'local-date-time'|'zoned-date-time';

PEnumType:
    doc=(SL_DOC_COMMENT|ML_DOC_COMMENT)?
    'enum' name=ID '='
        entries+=PEnumEntry ( '|' entries+=PEnumEntry )*
    ';';

PEnumEntry:
    name=ID ('=' (value=INT|STRING))?
;

PMixinEntity:
    'mixin' name=ID '{'
    '}'
;

PEntity:
    'entity' name=ID ('extends' parent=[PEntity:ID]'('(descrimatorValue=STRING|INT)')')? '{'
        properties+=PProperty*
        uniques+=PUniqueConstraint*
        descrimination=PDescrimination?
    '}'
;

PProperty:
    PValueProperty|PKeyProperty|PRevProperty|PReferenceProperty
;

PValueType:
    PScalarType | PEnumType
;

PValueTypeRef:
    (builtin=PBuiltinType | refType=[PValueType:ID])
;

PValueProperty:
    name=ID ':' type=PValueTypeRef array?='[]'? optional?='?'? 'as' propName=ID
;

PKeyProperty:
    '@id' name=ID ':' type=PValueTypeRef array?='[]'? optional?='?'? 'as' propName=ID
;

PRevProperty:
    '@rev' name=ID ':' type=PValueTypeRef array?='[]'? optional?='?'? 'as' propName=ID
;

PUniqueConstraint:
    'unique-key' name=ID '(' props+=[PProperty:ID] (',' props+=[PProperty:ID])* ')'
;

PDescrimination:
    'descriminated-by' name=ID ':' columnType=('string'|'int') 'as' propName=ID;

PReferenceProperty:
    POneToManyProperty
    |
    PManyToOneProperty
    |
    POneToOneProperty
;

POneToManyProperty:
    ('one-to-many' type=[PEntity:ID] ('.' ref=[PManyToOneProperty:ID])? 'as' propName=ID )
;

PManyToOneProperty:
    ('many-to-one' name=ID ':' type=[PEntity:ID] 'as' propName=ID )
;

POneToOneProperty:
    ('one-to-one' name=ID ':' type=[PEntity:ID] 'as' propName=ID )
    |
    ('one-to-one' type=[PEntity:ID] '.' ref=ID 'as' propName=ID )
;

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

terminal ML_DOC_COMMENT: /<\*[\s\S]*?\*>/;
terminal SL_DOC_COMMENT: /<<[^\n\r]*/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
