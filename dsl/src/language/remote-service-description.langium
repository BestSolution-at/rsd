grammar RemoteServiceDescription

entry RSDModel:
    elements += UserType*
    errorCodes += ErrorCode*
    services += Service*
;

UserType:
    EnumType | RecordType | MixinType | UnionType | ScalarType;

ScalarType:
    'scalar' name=ID;

BuiltinType returns string:
    'boolean'|'short'|'int'|'string'|'float'|'double'|'long'|'local-date'|'local-date-time'|'zoned-date-time';

EnumType:
    docs += SL_DOC_COMMENT*
    'enum' name=ID '{'
        entries += EnumEntry+
    '}';

EnumEntry:
    default?='default'? name=ID ('=' (value=INT|STRING))?
;

RecordType:
    patchable?='patchable'? 'record' name=ID
    '{'
        (
            keyProperty = KeyProperty
            revProperty = RevisionProperty?
        )?
        ('include' mixins += [MixinType:ID])*
        property += Property*
    '}'
;

UnionRecord:
    record=[RecordType:ID] ('(' value=STRING ')')?
;

UnionType:
    patchable?='patchable'? 'union' name=ID '='
        records += UnionRecord (',' records+=UnionRecord )+
    ('descriminated-with' descProp=ID)? ';'
;

MixinType:
    'mixin' name=ID '{'
        (
            keyProperty = KeyProperty
            revProperty = RevisionProperty?
        )?
        property += Property*
    '}'
;

KeyProperty:
    '<id>' name=ID ':' typeRef=BuiltinType doc=SL_DOC_COMMENT?;

RevisionProperty:
    '<rev>' name=ID ':' typeRef=BuiltinType doc=SL_DOC_COMMENT?;

NamedType:
    name=ID optional?='?'? ':' typeRef=TypeRef (array?='[' maxLength=INT? ']')? nullable?='?'?
;

Property:
    readonly?='<ro>'? namedType=NamedType doc=SL_DOC_COMMENT?;

TypeRef:
    (builtin=BuiltinType | refType=[UserType:ID])
;

DefaultParameter:
    name=ID ':' typeRef=TypeRef
;

Service:
    'service' name=ID ('(' (defaultParameters += DefaultParameter) (',' defaultParameters += DefaultParameter)* ')')? '{'
        operations += Operation*
    '}'
;

Parameter:
    patch?='patch'? namedType=NamedType
;

ReturnType:
    typeRef=TypeRef (array?='[' maxLength=INT? ']')?
;

ErrorCode:
    'error' name=ID '=' value=INT ';'
;

ErrorRefOrDef:
    (errorRef = [ErrorCode:ID]) | (name=ID '=' value=INT)
;

Operation:
    'operation' name=ID '(' (parameters += Parameter ( ',' parameters += Parameter )*)? ')' 
    (':' returnType = ReturnType)?
    ('fails-with' errorCodes += ErrorRefOrDef (',' errorCodes += ErrorRefOrDef)* )? 
    ';'
;

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

// terminal ML_DOC_COMMENT: /\/\--[\s\S]*?\--\//;
terminal SL_DOC_COMMENT: /-- [^\n\r]*/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
