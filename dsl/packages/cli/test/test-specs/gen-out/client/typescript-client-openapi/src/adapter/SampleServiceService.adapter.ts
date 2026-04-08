import { api } from '../../../typescript-client/src/index.js';
import { ServiceProps } from '../../../typescript-client/src/services/_fetch-type-utils.js';
import { SampleServiceApi } from '../apis/SampleServiceApi.js';
import { Configuration, ResponseError } from '../runtime.js';

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
			const response = await this.delegate.apiSamplerecordsBooleanGetRaw();
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
			const response = await this.delegate.apiSamplerecordsShortGetRaw();
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
			const response = await this.delegate.apiSamplerecordsIntGetRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async getLong(): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.apiSamplerecordsLongGetRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async getFloat(): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.apiSamplerecordsFloatGetRaw();
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
			const response = await this.delegate.apiSamplerecordsDoubleGetRaw();
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
			const response = await this.delegate.apiSamplerecordsStringGetRaw();
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
			const response = await this.delegate.apiSamplerecordsLocaldateGetRaw();
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
			const response = await this.delegate.apiSamplerecordsLocaldatetimeGetRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
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
			const response = await this.delegate.apiSamplerecordsZoneddatetimeGetRaw();
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
			const response = await this.delegate.apiSamplerecordsScalarGetRaw();
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
			const response = await this.delegate.apiSamplerecordsEnumGetRaw();
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
			const response = await this.delegate.apiSamplerecordsVoidoperationGetRaw();
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
			const response = await this.delegate.apiSamplerecordsErroroperationGetRaw();
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
			const response = await this.delegate.apiSamplerecordsMultierroroperationGetRaw();
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
			const response = await this.delegate.apiSamplerecordsSimplerecordKeyGetRaw({ key });
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
			const response = await this.delegate.apiSamplerecordsSimplerecordwitherrorKeyGetRaw({ key });
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
}
