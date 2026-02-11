import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import {
	generateCompilationUnit,
	TypescriptFetchClientGeneratorConfig,
	TypescriptImportCollector,
} from '../typescript-gen-utils.js';
import { toNodeTree } from '../util.js';

type EncodingPlugin = {
	encodeFunction: (fqn: (t: string, typeOnly: boolean) => string) => CompositeGeneratorNode;
	decodeFunction: (fqn: (t: string, typeOnly: boolean) => string) => CompositeGeneratorNode;
	encodingFunctionName: string;
	decodingFunctionName: string;
};

const encodingPlugins: Record<string, EncodingPlugin> = {
	'application/json': {
		encodeFunction: generateJsonEncodeValueFunction,
		decodeFunction: generateJsonDecodeResponseFunction,
		encodingFunctionName: 'encodeJsonBody',
		decodingFunctionName: 'decodeJsonBody',
	},
	'application/x-msgpack': {
		encodeFunction: generateMsgPackEncodeValueFunction,
		decodeFunction: generateMsgPackDecodeResponseFunction,
		encodingFunctionName: 'encodeMsgPackBody',
		decodingFunctionName: 'decodeMsgPackBody',
	},
};

export function generateFetchTypeUtils(config: TypescriptFetchClientGeneratorConfig) {
	const collector = new TypescriptImportCollector(config);
	const fqn = collector.importType.bind(collector);
	return {
		name: `_fetch-type-utils.ts`,
		content: toString(generateCompilationUnit(collector, generateFetchTypeUtilsContent(config, fqn)), '\t'),
		path: `${config.targetFolder}/services`,
	};
}

function generateFetchTypeUtilsContent(
	config: TypescriptFetchClientGeneratorConfig,
	fqn: (t: string, typeOnly: boolean) => string,
) {
	const encodings =
		config.contentTypeEncodings === undefined || config.contentTypeEncodings.length === 0
			? ['application/json']
			: config.contentTypeEncodings;

	const result = new CompositeGeneratorNode();

	const basic = toNodeTree(`
		export type ContentTypeEncodings = ${encodings.map(e => `'${e}'`).join(' | ')};
		export type Fetch = typeof fetch;
		export type ServiceProps<T extends string = string> = {
			baseUrl: string;
			fetchAPI?: Fetch;
			lifecycleHandlers?: {
				preFetch?: (method: string) => RequestInit | Promise<RequestInit>;
				onSuccess?: (method: string, value: unknown) => void;
				onError?: (method: string, err: ${fqn('api:../index.ts', false)}.result.RSDError<T>) => void;
				onCatch?: (method: string, err: unknown) => void;
				final?: (method: string) => void;
			};
			encoding?: ContentTypeEncodings;
		};

		export function encodingType(props: ServiceProps<never>): ContentTypeEncodings {
			return props.encoding ?? 'application/json';
		}
		
		export function safeExecute<T>(value: T, block: () => void): T {
			try {
				block();
			} catch (e) {
				console.error('Failed running block', e);
			}
			
			return value;
		}

		export function encodeBase64(value: string): string {
			const bytes = new TextEncoder().encode(value);
			const binString = Array.from(bytes, byte => String.fromCodePoint(byte)).join('');
			return btoa(binString);
		}

		export function encodeAsciiString(text: string): string {
			text = text.replaceAll('\\\\u', '\\\\u005Cu'); // Escape existing \\u sequences
			let b = '';
			const l = text.length;
			for (let i = 0; i < l; i++) {
				const c = text.charCodeAt(i);
				// Escape non-printable characters, comma and all non-ASCII characters
				if (c < 32 || c > 126 || c === 44) {
					b += \`\\\\u\${c.toString(16).padStart(4, '0')}\`;
				} else {
					b += text.charAt(i);
				}
			}

			return b;
		}

		export function decodeAsciiString(text: string): string {
			return text.replace(/\\\\u([0-9a-fA-F]{4})/g, (_, g1) => String.fromCharCode(parseInt(String(g1), 16)));
		}`);

	result.append(basic, NL, NL);
	if (encodings.length > 1) {
		result.append('export function encodeValue(type: ContentTypeEncodings, value: unknown) {', NL);
	} else {
		result.append('export function encodeValue(_type: ContentTypeEncodings, value: unknown) {', NL);
	}

	result.indent(mBody => {
		if (encodings.length > 1) {
			mBody.append('switch (type) {', NL);
			encodings
				.filter((_, idx) => idx > 0)
				.forEach(enc => {
					mBody.append(`case '${enc}':`, NL);
					mBody.indent(casBody => {
						casBody.append(`return ${encodingPlugins[enc].encodingFunctionName}(value);`, NL);
					});
				});
			mBody.append('default:', NL);
			mBody.indent(casBody => {
				casBody.append(`return ${encodingPlugins[encodings[0]].encodingFunctionName}(value);`, NL);
			});
			mBody.append('}', NL);
		} else {
			mBody.append(`return ${encodingPlugins[encodings[0]].encodingFunctionName}(value);`, NL);
		}
	});

	result.append('}', NL, NL);

	// Generate encoding functions
	encodings.forEach(enc => {
		result.append(encodingPlugins[enc].encodeFunction(fqn), NL, NL);
	});

	result.append(
		'export function decodeResponse<T>(response: Response, guard: (value: unknown) => value is T): Promise<T> {',
		NL,
	);
	result.indent(mBody => {
		mBody.append("const contentType = response.headers.get('Content-Type')?.split(';')[0]?.trim();", NL);
		mBody.append('switch (contentType) {', NL);
		mBody.indent(switchBody => {
			encodings.forEach(enc => {
				switchBody.append(`case '${enc}':`, NL);
				switchBody.indent(casBody => {
					casBody.append(`return ${encodingPlugins[enc].decodingFunctionName}<T>(response, guard);`, NL);
				});
			});
			switchBody.append('default:', NL);
			switchBody.indent(defBody => {
				defBody.append('throw new Error(`Unsupported response content type: ${String(contentType)}`);', NL);
			});
		});
		mBody.append('}', NL);
	});
	result.append('}', NL, NL);

	// Generate decoding function
	encodings.forEach(enc => {
		result.append(encodingPlugins[enc].decodeFunction(fqn), NL, NL);
	});

	return result;
}

function generateJsonEncodeValueFunction() {
	return toNodeTree(`
		function encodeJsonBody(body: unknown): string {
			return JSON.stringify(body);
		}`);
}

function generateMsgPackEncodeValueFunction(fqn: (t: string, typeOnly: boolean) => string) {
	return toNodeTree(`
		const encoder = new ${fqn('Encoder:@msgpack/msgpack', false)}();
		function encodeMsgPackBody(body: unknown): Uint8Array {
			return encoder.encodeSharedRef(body);
		}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateJsonDecodeResponseFunction() {
	return toNodeTree(`
		async function decodeJsonBody<T>(response: Response, guard: (value: unknown) => value is T): Promise<T> {
			const data = await response.json();
			if (!guard(data)) {
				throw new Error('Invalid result');
			}
			return data;
		}`);
}

function generateMsgPackDecodeResponseFunction(fqn: (t: string, typeOnly: boolean) => string) {
	return toNodeTree(`
		const decoder = new ${fqn('Decoder:@msgpack/msgpack', false)}();
		async function decodeMsgPackBody<T>(response: Response, guard: (value: unknown) => value is T): Promise<T> {
			const arrayBuffer = await response.arrayBuffer();
			const data = decoder.decode(arrayBuffer);
			if (!guard(data)) {
				throw new Error('Invalid result');
			}
			return data;
		}`);
}
