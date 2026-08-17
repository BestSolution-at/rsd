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
	decodeStreamFunction: (fqn: (t: string, typeOnly: boolean) => string) => CompositeGeneratorNode;
	encodingFunctionName: string;
	decodingFunctionName: string;
	decodeStreamFunctionName: string;
};

const encodingPlugins: Record<string, EncodingPlugin> = {
	'application/json': {
		encodeFunction: generateJsonEncodeValueFunction,
		decodeFunction: generateJsonDecodeResponseFunction,
		decodeStreamFunction: generateJsonStreamDecodeResponseFunction,
		encodingFunctionName: 'encodeJsonBody',
		decodingFunctionName: 'decodeJsonBody',
		decodeStreamFunctionName: 'decodeJsonStream',
	},
	'application/vnd.msgpack': {
		encodeFunction: generateMsgPackEncodeValueFunction,
		decodeFunction: generateMsgPackDecodeResponseFunction,
		decodeStreamFunction: generateMsgPackStreamDecodeResponseFunction,
		encodingFunctionName: 'encodeMsgPackBody',
		decodingFunctionName: 'decodeMsgPackBody',
		decodeStreamFunctionName: 'decodeMsgPackStream',
	},
};

export function generateFetchTypeUtils(config: TypescriptFetchClientGeneratorConfig) {
	const collector = new TypescriptImportCollector(config, '_fetch-type-utils.ts');
	const fqn = collector.importType.bind(collector);
	return {
		name: '_fetch-type-utils.ts',
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

		export function encodeBase64(value: string | Uint8Array): string {
			const bytes = typeof value === 'string' ? new TextEncoder().encode(value) : value;
			const binString = Array.from(bytes, byte => String.fromCodePoint(byte)).join('');
			return btoa(binString);
		}

		export function encodeAsciiString(text: string): string {
			text = text.replaceAll('\\\\u', '\\\\u005Cu'); // Escape existing \\u sequences
			text = text.replace(/^ +/, match => '\\\\u0020'.repeat(match.length));
			text = text.replace(/ +$/, match => '\\\\u0020'.repeat(match.length));

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
			mBody.indent(switchBody => {
				encodings
					.filter((_, idx) => idx > 0)
					.forEach(enc => {
						switchBody.append(`case '${enc}':`, NL);
						switchBody.indent(casBody => {
							casBody.append(`return ${encodingPlugins[enc].encodingFunctionName}(value);`, NL);
						});
					});
				switchBody.append('default:', NL);
				switchBody.indent(casBody => {
					casBody.append(`return ${encodingPlugins[encodings[0]].encodingFunctionName}(value);`, NL);
				});
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

	result.append(
		'export function decodeResponseStream<T>(response: Response, guard: (value: unknown) => value is T, comsumer: (value: T) => void): Promise<void> {',
		NL,
	);
	result.indent(mBody => {
		mBody.append("const contentType = response.headers.get('Content-Type')?.split(';')[0]?.trim();", NL);
		mBody.append('switch (contentType) {', NL);
		mBody.indent(switchBody => {
			encodings.forEach(enc => {
				switchBody.append(`case '${enc}':`, NL);
				switchBody.indent(casBody => {
					casBody.append(`return ${encodingPlugins[enc].decodeStreamFunctionName}<T>(response, guard, comsumer);`, NL);
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

	// Generate decoding stream function
	encodings.forEach(enc => {
		result.append(encodingPlugins[enc].decodeStreamFunction(fqn), NL, NL);
	});

	return result;
}

function generateJsonEncodeValueFunction() {
	return toNodeTree(`
		function encodeJsonBody(body: unknown): string {
			if (body === undefined) {
				return '';
			}
			return JSON.stringify(body, (_, v: unknown) => {
				if (typeof v === 'bigint') {
					if ('rawJSON' in JSON && typeof JSON.rawJSON === 'function') {
						// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
						return JSON.rawJSON(String(v));
					} else {
						throw new Error('BigInt values are not supported in JSON encoding without JSON.rawJSON function');
					}
				}
				return v;
			});
		}`);
}

function generateMsgPackEncodeValueFunction(fqn: (t: string, typeOnly: boolean) => string) {
	return toNodeTree(`
		const encoder = new ${fqn('Encoder:@msgpack/msgpack', false)}({ ignoreUndefined: true, useBigInt64: true });
		function encodeMsgPackBody(body: unknown): Uint8Array {
			if (body === undefined) {
				return new Uint8Array();
			}
			return encoder.encodeSharedRef(body);
		}`);
}

function generateJsonDecodeResponseFunction() {
	return toNodeTree(`
		async function decodeJsonBody<T>(response: Response, guard: (value: unknown) => value is T): Promise<T> {
			const text = await response.text();
			const data = parseJson(text);
			if (!guard(data)) {
				throw new Error('Invalid result');
			}
			return data;
		}

		function parseJson(text: string): unknown {
			return JSON.parse(text, (_, v: unknown, ...args: unknown[]) => {
				if (typeof v === 'number') {
					const context = args[0];
					if (context && typeof context === 'object' && 'source' in context && typeof context.source === 'string') {
						if (context.source.length > 15 && !context.source.includes('.')) {
							const bigintValue = BigInt(context.source);
							if (bigintValue > Number.MAX_SAFE_INTEGER || bigintValue < Number.MIN_SAFE_INTEGER) {
								return bigintValue;
							}
						}
					} else {
						console.warn('Unable to determine if number value is a BigInt due to missing context, returning as number:', v);
					}
				}

				return v;
			});
		}
		`);
}

function generateMsgPackDecodeResponseFunction(fqn: (t: string, typeOnly: boolean) => string) {
	return toNodeTree(`
		const decoder = new ${fqn('Decoder:@msgpack/msgpack', false)}({ useBigInt64: true });
		async function decodeMsgPackBody<T>(response: Response, guard: (value: unknown) => value is T): Promise<T> {
			const arrayBuffer = await response.arrayBuffer();
			const data = decoder.decode(arrayBuffer);
			if (!guard(data)) {
				throw new Error('Invalid result');
			}
			return data;
		}`);
}

function generateJsonStreamDecodeResponseFunction() {
	return toNodeTree(`
function decodeJsonStream<T>(
	response: Response,
	guard: (value: unknown) => value is T,
	comsumer: (value: T) => void,
): Promise<void> {
	const stream = response.body;
	if (stream) {
		const textDecoder = new TextDecoder();
		const stream: ReadableStream<Uint8Array> = response.body;

		async function readStream() {
			let buffer = '';
			for await (const value of stream) {
				const text = textDecoder.decode(value, { stream: true });
				buffer += text;

				const lines = buffer.split('\\n');
				// Pop the last line from the array and keep it in the
				// buffer for the next iteration. If the line ended with
				// newline the element will be an empty string, which is fine.
				buffer = lines.pop() ?? '';
				for (const line of lines) {
					if (line.trim().length > 0) {
						const data = parseJson(line);
						if (guard(data)) {
							comsumer(data);
						} else {
							console.error('Invalid result', data);
						}
					}
				}
			}
		}

		return readStream();
	} else {
		return Promise.reject(new Error(\`Response body is not available for JSON stream decoding\`));
	}
}`);
}

function generateMsgPackStreamDecodeResponseFunction(fqn: (t: string, typeOnly: boolean) => string) {
	return toNodeTree(`
function decodeMsgPackStream<T>(
	response: Response,
	guard: (value: unknown) => value is T,
	comsumer: (value: T) => void,
): Promise<void> {
	const stream = response.body;
	if (stream) {
		const stream = response.body;
		async function readStream() {
			const streamDecoder = new ${fqn('Decoder:@msgpack/msgpack', false)}({ useBigInt64: true });
			let count = 0;
			for await (const record of streamDecoder.decodeStream(stream)) {
				if(count % 2 === 0) {
					if (guard(record)) {
						comsumer(record);
					} else {
						console.error('Invalid result', record);
					}
				}
				count += 1;
			}
		}
		return readStream();
	} else {
		return Promise.reject(new Error(\`Response body is not available for MessagePack stream decoding\`));
	}
}`);
}
