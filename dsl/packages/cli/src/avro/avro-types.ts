// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type AvroType = AvroPrimitiveType | AvroEnum | AvroRecord | AvroArray | AvroTypeRef;

export type AvroTypeRef = string;
export type AvroPrimitiveType = 'null' | 'boolean' | 'int' | 'long' | 'float' | 'double' | 'bytes' | 'string';

export type AvroEnum = {
	type: 'enum';
	name: string;
	namespace?: string;
	doc?: string;
	symbols: string[];
	default?: string;
};

export type AvroRecord = {
	type: 'record';
	name: string;
	namespace?: string;
	doc?: string;
	aliases?: string[];
	fields: AvroField[];
};

export type AvroError = {
	type: 'error';
	name: string;
	namespace?: string;
	doc?: string;
	aliases?: string[];
	fields: AvroField[];
};

export type AvroField = {
	name: string;
	type: AvroType | AvroType[];
	doc?: string;
	order?: 'ascending' | 'descending' | 'ignore';
	aliases?: string[];
	default?: unknown;
};

export type AvroArray = {
	type: 'array';
	items: AvroType | AvroType[];
};

export type AvroProtocol = {
	protocol: string;
	namespace?: string;
	doc?: string;
	types: (AvroType | AvroError)[];
	messages: Record<string, AvroMessage>;
};

export type AvroMessage = {
	request: AvroRequestParameter[];
	response: AvroType | AvroType[];
	doc?: string;
	errors?: string[];
	'one-way'?: boolean;
};

export type AvroRequestParameter = {
	name: string;
	type: AvroType | AvroType[];
};
