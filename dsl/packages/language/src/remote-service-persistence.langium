grammar RemoteServicePersistence

entry RSDPersistenceModel:
	enums+=PEnumType*
    scalars+=PScalarType*
    mixins+=PMixinEntity*
    entities+=PBaseEntity+
;

PScalarType:
	doc=(SL_DOC_COMMENT|ML_DOC_COMMENT)?
    'scalar' name=ID ';';

PBuiltinType returns string:
	'boolean'|'short'|'int'|'string'|'float'|'double'|'long'|'local-date'|'local-date-time'|'local-time'|'offset-date-time'|'zoned-date-time';

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
		properties+=PProperty*
		uniques+=PUniqueConstraint*
	'}'
;

PBaseEntity:
	PEntity|PAbstractEntity;

PEntity:
	'entity' name=ID ('extends' parent=[PAbstractEntity:ID]'('(descrimatorValue=STRING|INT)')')? '{'
				('include' mixins+=[PMixinEntity:ID])*
        properties+=PProperty*
        uniques+=PUniqueConstraint*
    '}'
;

PAbstractEntity:
	'abstract' 'entity' name=ID '('discriminator=ID ':' discriminatorType=('string'|'int')')' '{'
				('include' mixins+=[PMixinEntity:ID])*
				properties+=PProperty*
				uniques+=PUniqueConstraint*
		'}';

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
	name=ID optional?='?'? ':' type=PValueTypeRef array?='[]'?
;

PKeyProperty:
	'@id' name=ID ':' type=PValueTypeRef array?='[]'?
;

PRevProperty:
	'@rev' name=ID ':' type=PValueTypeRef array?='[]'?
;

PUniqueConstraint:
	'@unique-key' name=ID '(' props+=[PProperty:ID] (',' props+=[PProperty:ID])* ')'
;


PReferenceProperty:
	PRefProperty
	| PContainerProperty | PContainsProperty
;

PRefProperty:
	('@ref'  name=ID optional?='?'? ':' type=[PBaseEntity:ID] array?='[]'? ('on' ref=[PRefProperty:ID])? )
;

PContainsProperty:
	'@contains' name=ID optional?='?'? ':' type=[PBaseEntity:ID] array?='[]'? ('on' ref=[PContainerProperty:ID])?;

PContainerProperty:
	'@container' name=ID ':' type=[PBaseEntity:ID];


hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

terminal ML_DOC_COMMENT: /<\*[\s\S]*?\*>/;
terminal SL_DOC_COMMENT: /<<[^\n\r]*/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
