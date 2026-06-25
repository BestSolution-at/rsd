import { api } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import { ErrorDataFromJSON } from '../../test-specs/gen-out/client/typescript-client/src/model/ErrorData.js';
import { UnionFromJSON } from '../../test-specs/gen-out/client/typescript-client/src/model/Union.js';
import { ServiceProps } from '../../test-specs/gen-out/client/typescript-client/src/services/_fetch-type-utils.js';
import { SampleServiceApi } from '../../test-specs/gen-out/client/typescript-client-openapi/src/apis/SampleServiceApi.js';
import { Configuration, ResponseError } from '../../test-specs/gen-out/client/typescript-client-openapi/src/runtime.js';
import { RSDLong } from '../../test-specs/gen-out/client/typescript-client/src/model/_Builtins.js';

export function createOpenAPISampleServiceService(
	props: ServiceProps<api.service.ErrorType>,
): api.service.SampleServiceService {
	return new SampleServiceServiceImpl(props);
}

function toRSDError(error: unknown): api.service.NativeRSDError | api.service.StatusRSDError {
	if (error instanceof ResponseError) {
		return {
			_type: '_Status',
			status: error.response.status,
			message: error.message,
		};
	} else if (error instanceof Error) {
		return {
			_type: '_Native',
			error,
			message: error.message,
		};
	} else {
		return {
			_type: '_Native',
			error: new Error(String(error)),
			message: String(error),
		};
	}
}

class SampleServiceServiceImpl implements api.service.SampleServiceService {
	private readonly delegate: SampleServiceApi;

	constructor(props: ServiceProps<api.service.ErrorType>) {
		this.delegate = new SampleServiceApi(new Configuration({ basePath: props.baseUrl }));
	}

	async getBoolean(): Promise<api.result.Result<boolean, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.sampleServiceGetBooleanRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async getShort(): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.sampleServiceGetShortRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async getInt(): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.sampleServiceGetIntRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async getLong(): Promise<api.result.Result<RSDLong, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.sampleServiceGetLongRaw();
			if (response.raw.status === 200) {
				return api.result.OK(BigInt(await response.value()));
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async getFloat(): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.sampleServiceGetFloatRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async getDouble(): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.sampleServiceGetDoubleRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async getString(): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.sampleServiceGetStringRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async getLocalDate(): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.sampleServiceGetLocalDateRaw();
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()) as unknown as string); // OpenAPI Generator inappropriately types date-only values as `Date`, so we need to cast it back to string
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async getLocalDateTime(): Promise<
		api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>
	> {
		try {
			const response = await this.delegate.sampleServiceGetLocalDateTimeRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async getLocalTime(): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.sampleServiceGetLocalTimeRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async getOffsetDateTime(): Promise<
		api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>
	> {
		try {
			const response = await this.delegate.sampleServiceGetOffsetDateTimeRaw();
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()) as unknown as string); // OpenAPI Generator inappropriately types date-time values as `Date`, so we need to cast it back to string
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async getZonedDateTime(): Promise<
		api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>
	> {
		try {
			const response = await this.delegate.sampleServiceGetZonedDateTimeRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async getScalar(): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.sampleServiceGetScalarRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async getEnum(): Promise<
		api.result.Result<api.model.SampleEnum, api.service.StatusRSDError | api.service.NativeRSDError>
	> {
		try {
			const response = await this.delegate.sampleServiceGetEnumRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async voidOperation(): Promise<
		api.result.Result<api.result.VoidType, api.service.StatusRSDError | api.service.NativeRSDError>
	> {
		try {
			const response = await this.delegate.sampleServiceVoidOperationRaw();
			if (response.raw.status === 204) {
				return api.result.OK(api.result.Void);
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async errorOperation(): Promise<
		api.result.Result<
			api.result.VoidType,
			api.service.SampleErrorError | api.service.StatusRSDError | api.service.NativeRSDError
		>
	> {
		try {
			const response = await this.delegate.sampleServiceErrorOperationRaw();
			if (response.raw.status === 204) {
				return api.result.OK(api.result.Void);
			} else if (response.raw.status === 400) {
				const err = {
					_type: 'SampleError',
					message: await response.raw.text(),
				} as const;
				return api.result.ERR(err);
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			if (error instanceof ResponseError) {
				if (error.response.status === 400) {
					const err = {
						_type: 'SampleError',
						message: await error.response.text(),
					} as const;
					return api.result.ERR(err);
				}
			}
			return api.result.ERR(toRSDError(error));
		}
	}
	async multiErrorOperation(): Promise<
		api.result.Result<
			api.result.VoidType,
			| api.service.SampleErrorError
			| api.service.SampleError2Error
			| api.service.StatusRSDError
			| api.service.NativeRSDError
		>
	> {
		try {
			const response = await this.delegate.sampleServiceMultiErrorOperationRaw();
			if (response.raw.status === 204) {
				return api.result.OK(api.result.Void);
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			if (error instanceof ResponseError) {
				if (error.response.status === 400) {
					const err = {
						_type: 'SampleError',
						message: await error.response.text(),
					} as const;
					return api.result.ERR(err);
				} else if (error.response.status === 401) {
					const err = {
						_type: 'SampleError2',
						message: await error.response.text(),
					} as const;
					return api.result.ERR(err);
				}
			}
			return api.result.ERR(toRSDError(error));
		}
	}
	async getSimpleRecord(
		key: string,
	): Promise<api.result.Result<api.model.SimpleRecord, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.sampleServiceGetSimpleRecordRaw({ key });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async getSimpleRecordWithError(
		key: string,
	): Promise<
		api.result.Result<
			api.model.SimpleRecord,
			api.service.SampleErrorError | api.service.StatusRSDError | api.service.NativeRSDError
		>
	> {
		try {
			const response = await this.delegate.sampleServiceGetSimpleRecordWithErrorRaw({ key });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			if (error instanceof ResponseError) {
				if (error.response.status === 400) {
					const err = {
						_type: 'SampleError',
						message: await error.response.text(),
					} as const;
					return api.result.ERR(err);
				}
			}
			return api.result.ERR(toRSDError(error));
		}
	}

	async getSimpleErrorWithValue(): Promise<
		api.result.Result<
			api.result.VoidType,
			api.service.SampleErrorWithValueError | api.service.StatusRSDError | api.service.NativeRSDError
		>
	> {
		try {
			const response = await this.delegate.sampleServiceGetSimpleErrorWithValueRaw();
			if (response.raw.status === 204) {
				return api.result.OK(api.result.Void);
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			if (error instanceof ResponseError) {
				if (error.response.status === 400) {
					const result = (await error.response.json()) as Record<string, unknown>;
					const data = ErrorDataFromJSON(result);
					const err = {
						_type: 'SampleErrorWithValue',
						data,
					} as const;
					return api.result.ERR(err);
				}
			}
			return api.result.ERR(toRSDError(error));
		}
	}

	async getSimpleErrorInt(): Promise<
		api.result.Result<
			api.result.VoidType,
			api.service.SampleErrorIntError | api.service.StatusRSDError | api.service.NativeRSDError
		>
	> {
		try {
			const response = await this.delegate.sampleServiceGetSimpleErrorIntRaw();
			if (response.raw.status === 204) {
				return api.result.OK(api.result.Void);
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			if (error instanceof ResponseError) {
				if (error.response.status === 400) {
					const err = {
						_type: 'SampleErrorInt',
						data: (await error.response.json()) as number,
					} as const;
					return api.result.ERR(err);
				}
			}
			return api.result.ERR(toRSDError(error));
		}
	}

	async getSimpleErrorBoolean(): Promise<
		api.result.Result<
			api.result.VoidType,
			api.service.SampleErrorBooleanError | api.service.StatusRSDError | api.service.NativeRSDError
		>
	> {
		try {
			const response = await this.delegate.sampleServiceGetSimpleErrorBooleanRaw();
			if (response.raw.status === 204) {
				return api.result.OK(api.result.Void);
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			if (error instanceof ResponseError) {
				if (error.response.status === 400) {
					const err = {
						_type: 'SampleErrorBoolean',
						data: (await error.response.json()) as boolean,
					} as const;
					return api.result.ERR(err);
				}
			}
			return api.result.ERR(toRSDError(error));
		}
	}

	async getSimpleErrorEnum(): Promise<
		api.result.Result<
			api.result.VoidType,
			api.service.SampleErrorEnumError | api.service.StatusRSDError | api.service.NativeRSDError
		>
	> {
		try {
			const response = await this.delegate.sampleServiceGetSimpleErrorEnumRaw();
			if (response.raw.status === 204) {
				return api.result.OK(api.result.Void);
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			if (error instanceof ResponseError) {
				if (error.response.status === 400) {
					const err = {
						_type: 'SampleErrorEnum',
						data: (await error.response.json()) as api.model.SampleEnum,
					} as const;
					return api.result.ERR(err);
				}
			}
			return api.result.ERR(toRSDError(error));
		}
	}

	async getSimpleErrorScalar(): Promise<
		api.result.Result<
			api.result.VoidType,
			api.service.SampleErrorScalarError | api.service.StatusRSDError | api.service.NativeRSDError
		>
	> {
		try {
			const response = await this.delegate.sampleServiceGetSimpleErrorScalarRaw();
			if (response.raw.status === 204) {
				return api.result.OK(api.result.Void);
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			if (error instanceof ResponseError) {
				if (error.response.status === 400) {
					const err = {
						_type: 'SampleErrorScalar',
						data: (await error.response.json()) as string,
					} as const;
					return api.result.ERR(err);
				}
			}
			return api.result.ERR(toRSDError(error));
		}
	}

	async getSimpleErrorUnion(): Promise<
		api.result.Result<
			api.result.VoidType,
			api.service.SampleErrorUnionError | api.service.StatusRSDError | api.service.NativeRSDError
		>
	> {
		try {
			const response = await this.delegate.sampleServiceGetSimpleErrorUnionRaw();
			if (response.raw.status === 204) {
				return api.result.OK(api.result.Void);
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			if (error instanceof ResponseError) {
				if (error.response.status === 400) {
					const result = (await error.response.json()) as Record<string, unknown>;
					const data = UnionFromJSON(result);
					const err = {
						_type: 'SampleErrorUnion',
						data,
					} as const;
					return api.result.ERR(err);
				}
			}
			return api.result.ERR(toRSDError(error));
		}
	}

	async multiErrorSameCode(
		errorType: api.model.RSDInt,
	): Promise<
		api.result.Result<
			api.result.VoidType,
			| api.service.SampleErrorError
			| api.service.SampleError2Error
			| api.service.SampleErrorWithValueError
			| api.service.StatusRSDError
			| api.service.NativeRSDError
		>
	> {
		try {
			const response = await this.delegate.sampleServiceMultiErrorSameCodeRaw({ errorType });
			if (response.raw.status === 204) {
				return api.result.OK(api.result.Void);
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			if (error instanceof ResponseError) {
				if (error.response.status === 400) {
					if (error.response.headers.get('X-RSD-Error-Type') === 'SampleError') {
						const err = {
							_type: 'SampleError',
							message: await error.response.text(),
						} as const;
						return api.result.ERR(err);
					}
				}
				if (error.response.status === 400) {
					if (error.response.headers.get('X-RSD-Error-Type') === 'SampleError2') {
						const err = {
							_type: 'SampleError2',
							message: await error.response.text(),
						} as const;
						return api.result.ERR(err);
					}
				}

				if (error.response.status === 400) {
					if (error.response.headers.get('X-RSD-Error-Type') === 'SampleErrorWithValue') {
						const result = (await error.response.json()) as Record<string, unknown>;
						const data = ErrorDataFromJSON(result);
						const err = {
							_type: 'SampleErrorWithValue',
							data,
						} as const;
						return api.result.ERR(err);
					}
				}
			}
			return api.result.ERR(toRSDError(error));
		}
	}
}
