import { api } from '../../../typescript-client/src/index.js';
import { ServiceProps } from '../../../typescript-client/src/services/_fetch-type-utils.js';
import { ListSampleServiceApi } from '../apis/ListSampleServiceApi.js';
import { Configuration, ResponseError } from '../runtime.js';

export function createOpenAPIListSampleServiceService(
	props: ServiceProps<api.service.ErrorType>,
): api.service.ListSampleServiceService {
	return new ListSampleServiceServiceImpl(props);
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

class ListSampleServiceServiceImpl implements api.service.ListSampleServiceService {
	private readonly deletegate: ListSampleServiceApi;

	constructor(props: ServiceProps<api.service.ErrorType>) {
		this.deletegate = new ListSampleServiceApi(
			new Configuration({
				basePath: props.baseUrl,
				middleware: [
					{
						pre: async context => {
							if (props.lifecycleHandlers?.preFetch) {
								const rv = await props.lifecycleHandlers.preFetch('UNKNOWN_METHOD');
								return {
									url: context.url,
									init: {
										...context.init,
										...rv,
									},
								};
							}
							return {
								url: context.url,
								init: context.init,
							};
						},
					},
				],
			}),
		);
	}

	async listBoolean(): Promise<api.result.Result<boolean[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listSampleServiceListBooleanRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listShort(): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listSampleServiceListShortRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async listInt(): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listSampleServiceListIntRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async listLong(): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listSampleServiceListLongRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async listFloat(): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listSampleServiceListFloatRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async listDouble(): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listSampleServiceListDoubleRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async listString(): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listSampleServiceListStringRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async listLocalDate(): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listSampleServiceListLocalDateRaw();
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()) as unknown as string[]);
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async listLocalDateTime(): Promise<
		api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>
	> {
		try {
			const response = await this.deletegate.listSampleServiceListLocalDateTimeRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async listLocalTime(): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listSampleServiceListLocalTimeRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async listOffsetDateTime(): Promise<
		api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>
	> {
		try {
			const response = await this.deletegate.listSampleServiceListOffsetDateTimeRaw();
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()) as unknown as string[]);
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listZonedDateTime(): Promise<
		api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>
	> {
		try {
			const response = await this.deletegate.listSampleServiceListZonedDateTimeRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async listScalar(): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listSampleServiceListScalarRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async listEnum(): Promise<
		api.result.Result<api.model.SampleEnum[], api.service.StatusRSDError | api.service.NativeRSDError>
	> {
		try {
			const response = await this.deletegate.listSampleServiceListEnumRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async listSimpleRecord(): Promise<
		api.result.Result<api.model.SimpleRecord[], api.service.StatusRSDError | api.service.NativeRSDError>
	> {
		try {
			const response = await this.deletegate.listSampleServiceListSimpleRecordRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async listSimpleRecordWithError(): Promise<
		api.result.Result<
			api.model.SimpleRecord[],
			api.service.SampleErrorError | api.service.StatusRSDError | api.service.NativeRSDError
		>
	> {
		try {
			const response = await this.deletegate.listSampleServiceListSimpleRecordWithErrorRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
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
