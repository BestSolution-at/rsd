grammar RemoteServiceDefinition

entry RSDModel:
    elements += UserType*
    errorCodes += ErrorCode*
    services += Service*
;

UserType:
    EnumType | RecordType | MixinType | UnionType | ScalarType;

ScalarType:
    doc = (SL_DOC_COMMENT|ML_DOC_COMMENT)?
    'scalar' name=ID ';';

BuiltinType returns string:
    'boolean'|'short'|'int'|'string'|'float'|'double'|'long'|'local-date'|'local-date-time'|'zoned-date-time';

EnumType:
    doc = (SL_DOC_COMMENT|ML_DOC_COMMENT)?
    'enum' name=ID '='
        entries += EnumEntry ( '|' entries += EnumEntry )*
    ';';

InlineEnumType:
    'enum' entries += EnumEntry ( '|' entries += EnumEntry )*
;

EnumEntry:
    name=ID ('=' (value=INT|STRING))?
;

RecordType:
    doc = (SL_DOC_COMMENT|ML_DOC_COMMENT)?
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
    doc = (SL_DOC_COMMENT|ML_DOC_COMMENT)?
    patchable?='patchable'? 'union' name=ID '='
        records += UnionRecord ('|' records+=UnionRecord )+
    ('descriminated-with' descProp=ID)? ';'
;

MixinType:
    doc = (SL_DOC_COMMENT|ML_DOC_COMMENT)?
    'mixin' name=ID '{'
        (
            keyProperty = KeyProperty
            revProperty = RevisionProperty?
        )?
        property += Property*
    '}'
;

KeyProperty:
    '@id' name=ID ':' typeRef=BuiltinType doc=SL_DOC_COMMENT?;

RevisionProperty:
    '@rev' name=ID ':' typeRef=BuiltinType doc=SL_DOC_COMMENT?;

NamedType:
    name=ID optional?='?'? ':' (typeRef=TypeRef | inlineEnum=InlineEnumType) (array?='[' maxLength=INT? ']')? nullable?='?'?
;

Property:
    readonly?='@readonly'? namedType=NamedType doc=SL_DOC_COMMENT?;

TypeRef:
    (builtin=BuiltinType | refType=[UserType:ID])
;

DefaultParameter:
    name=ID ':' typeRef=TypeRef
;

Service:
    doc = (SL_DOC_COMMENT|ML_DOC_COMMENT)?
    'service' name=ID ('(' (defaultParameters += DefaultParameter) (',' defaultParameters += DefaultParameter)* ')')? '{'
        operations += Operation*
    '}'
;

Parameter:
    patch?='@patch'? namedType=NamedType
;

ReturnType:
    (typeRef=TypeRef | inlineEnum=InlineEnumType) (array?='[' maxLength=INT? ']')?
;

ErrorCode:
    doc = (SL_DOC_COMMENT|ML_DOC_COMMENT)?
    'error' name=ID ('=' value=TypeRef)? ';'
;

Operation:
    doc = (SL_DOC_COMMENT|ML_DOC_COMMENT)?
    'operation' name=ID '(' (parameters += Parameter ( ',' parameters += Parameter )*)? ')' 
    (':' returnType = ReturnType)?
    ('throws' failures += OperationFail* )? 
    ';'
;

OperationFail:
    code = [ErrorCode:ID] doc=SL_DOC_COMMENT?
;

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

terminal ML_DOC_COMMENT: /<\*[\s\S]*?\*>/;
terminal SL_DOC_COMMENT: /<<[^\n\r]*/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
