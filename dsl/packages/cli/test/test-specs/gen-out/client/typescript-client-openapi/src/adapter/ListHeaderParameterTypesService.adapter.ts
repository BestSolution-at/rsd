import { api } from '../../../typescript-client/src/index.js';
import {
	encodeAsciiString,
	encodeBase64,
	ServiceProps,
} from '../../../typescript-client/src/services/_fetch-type-utils.js';
import { ListHeaderParameterTypesApi } from '../index.js';
import { Configuration, ResponseError } from '../runtime.js';

export function createOpenAPIListHeaderParameterTypesService(
	props: ServiceProps<api.service.ErrorType>,
): api.service.ListHeaderParameterTypesService {
	return new ListHeaderParameterTypesServiceImpl(props);
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

class ListHeaderParameterTypesServiceImpl implements api.service.ListHeaderParameterTypesService {
	private readonly deletegate: ListHeaderParameterTypesApi;

	constructor(props: ServiceProps<api.service.ErrorType>) {
		this.deletegate = new ListHeaderParameterTypesApi(
			new Configuration({
				basePath: props.baseUrl,
			}),
		);
	}

	async listBooleanHeaderParam(
		headerValue: boolean[],
	): Promise<api.result.Result<boolean[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListBooleanHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listBooleanHeaderParamOpt(
		headerValue?: boolean[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListBooleanHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listBooleanHeaderParamNil(
		headerValue: boolean[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListBooleanHeaderParamNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listBooleanHeaderParamOptNil(
		headerValue?: boolean[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListBooleanHeaderParamOptNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listShortHeaderParam(
		headerValue: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListShortHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listShortHeaderParamOpt(
		headerValue?: number[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListShortHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listShortHeaderParamNil(
		headerValue: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListShortHeaderParamNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listShortHeaderParamOptNil(
		headerValue?: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListShortHeaderParamOptNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listIntHeaderParam(
		headerValue: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListIntHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listIntHeaderParamOpt(
		headerValue?: number[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListIntHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listIntHeaderParamNil(
		headerValue: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListIntHeaderParamNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listIntHeaderParamOptNil(
		headerValue?: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListIntHeaderParamOptNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLongHeaderParam(
		headerValue: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLongHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLongHeaderParamOpt(
		headerValue?: number[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLongHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLongHeaderParamNil(
		headerValue: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLongHeaderParamNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLongHeaderParamOptNil(
		headerValue?: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLongHeaderParamOptNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listFloatHeaderParam(
		headerValue: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListFloatHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listFloatHeaderParamOpt(
		headerValue?: number[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListFloatHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listFloatHeaderParamNil(
		headerValue: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListFloatHeaderParamNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listFloatHeaderParamOptNil(
		headerValue?: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListFloatHeaderParamOptNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listDoubleHeaderParam(
		headerValue: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListDoubleHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listDoubleHeaderParamOpt(
		headerValue?: number[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListDoubleHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listDoubleHeaderParamNil(
		headerValue: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListDoubleHeaderParamNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listDoubleHeaderParamOptNil(
		headerValue?: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListDoubleHeaderParamOptNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listStringHeaderParam(
		headerValue: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListStringHeaderParamRaw({
				headerValue: headerValue.map(e => '"' + encodeAsciiString(e) + '"'),
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listStringHeaderParamOpt(
		headerValue?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListStringHeaderParamOptRaw({
				headerValue: headerValue?.map(e => '"' + encodeAsciiString(e) + '"'),
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listStringHeaderParamNil(
		headerValue: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListStringHeaderParamNilRaw({
				headerValue: headerValue?.map(e => '"' + encodeAsciiString(e) + '"') ?? null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listStringHeaderParamOptNil(
		headerValue?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListStringHeaderParamOptNilRaw({
				headerValue: headerValue === null ? null : headerValue?.map(e => '"' + encodeAsciiString(e) + '"'),
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateHeaderParam(
		headerValue: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLocalDateHeaderParamRaw({
				headerValue: headerValue as unknown as Date[],
			});
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()) as unknown as string[]);
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateHeaderParamOpt(
		headerValue?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLocalDateHeaderParamOptRaw({
				headerValue: headerValue as unknown as Date[] | undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateHeaderParamNil(
		headerValue: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLocalDateHeaderParamNilRaw({
				headerValue: headerValue as unknown as Date[] | null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateHeaderParamOptNil(
		headerValue?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLocalDateHeaderParamOptNilRaw({
				headerValue: headerValue as unknown as Date[] | null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateTimeHeaderParam(
		headerValue: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLocalDateTimeHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateTimeHeaderParamOpt(
		headerValue?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLocalDateTimeHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateTimeHeaderParamNil(
		headerValue: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLocalDateTimeHeaderParamNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateTimeHeaderParamOptNil(
		headerValue?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLocalDateTimeHeaderParamOptNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalTimeHeaderParam(
		headerValue: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLocalTimeHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalTimeHeaderParamOpt(
		headerValue?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLocalTimeHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalTimeHeaderParamNil(
		headerValue: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLocalTimeHeaderParamNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalTimeHeaderParamOptNil(
		headerValue?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListLocalTimeHeaderParamOptNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listOffsetDateTimeHeaderParam(
		headerValue: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListOffsetDateTimeHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listOffsetDateTimeHeaderParamOpt(
		headerValue?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListOffsetDateTimeHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listOffsetDateTimeHeaderParamNil(
		headerValue: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListOffsetDateTimeHeaderParamNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listOffsetDateTimeHeaderParamOptNil(
		headerValue?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListOffsetDateTimeHeaderParamOptNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}


	async listZonedDateTimeHeaderParam(
		headerValue: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListZonedDateTimeHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listZonedDateTimeHeaderParamOpt(
		headerValue?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListZonedDateTimeHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listZonedDateTimeHeaderParamNil(
		headerValue: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListZonedDateTimeHeaderParamNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listZonedDateTimeHeaderParamOptNil(
		headerValue?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListZonedDateTimeHeaderParamOptNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listScalarHeaderParam(
		headerValue: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListScalarHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listScalarHeaderParamOpt(
		headerValue?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListScalarHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listScalarHeaderParamNil(
		headerValue: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListScalarHeaderParamNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listScalarHeaderParamOptNil(
		headerValue?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListScalarHeaderParamOptNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listEnumHeaderParam(
		headerValue: api.model.SampleEnum[],
	): Promise<api.result.Result<api.model.SampleEnum[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListEnumHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listEnumHeaderParamOpt(
		headerValue?: api.model.SampleEnum[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListEnumHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listEnumHeaderParamNil(
		headerValue: api.model.SampleEnum[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListEnumHeaderParamNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listEnumHeaderParamOptNil(
		headerValue?: api.model.SampleEnum[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListEnumHeaderParamOptNilRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listInlineEnumHeaderParam(
		headerValue: ('A' | 'B')[],
	): Promise<api.result.Result<('A' | 'B')[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListInlineEnumHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()) as ('A' | 'B')[]);
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listInlineEnumHeaderParamOpt(
		headerValue?: ('A' | 'B')[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListInlineEnumHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listInlineEnumHeaderParamNil(
		headerValue: ('C' | 'D')[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListInlineEnumHeaderParamNilRaw({
				headerValue: headerValue as unknown as ('C' | 'D')[],
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listInlineEnumHeaderParamOptNil(
		headerValue?: ('C' | 'D')[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListInlineEnumHeaderParamOptNilRaw({
				headerValue: headerValue as unknown as ('C' | 'D')[] | undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listMultiHeaderParam(
		valueA: string[],
		valueB: number[],
		valueC: api.model.SimpleRecord[],
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListMultiHeaderParamRaw({
				valueA: valueA.map(e => '"' + encodeAsciiString(e) + '"'),
				valueB,
				valueC: valueC.map(e => encodeBase64(JSON.stringify(e))),
				xRSDParamContentType: 'application/json',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listMultiHeaderParamOpt(
		valueA?: string[],
		valueB?: number[],
		valueC?: api.model.SimpleRecord[],
	): Promise<api.result.Result<api.model.NilResult[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListMultiHeaderParamOptRaw({
				valueA: valueA?.map(e => '"' + encodeAsciiString(e) + '"'),
				valueB,
				valueC: valueC?.map(e => encodeBase64(JSON.stringify(e))),
				xRSDParamContentType: 'application/json',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async listMultiHeaderParamNil(
		valueA: string[] | null,
		valueB: number[] | null,
		valueC: api.model.SimpleRecord[] | null,
	): Promise<api.result.Result<api.model.NilResult[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListMultiHeaderParamNilRaw({
				valueA: valueA?.map(e => '"' + encodeAsciiString(e) + '"') ?? null,
				valueB,
				valueC: valueC?.map(e => encodeBase64(JSON.stringify(e))) ?? null,
				xRSDParamContentType: 'application/json',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listMultiHeaderParamOptNil(
		valueA?: string[] | null,
		valueB?: number[] | null,
		valueC?: api.model.SimpleRecord[] | null,
	): Promise<api.result.Result<api.model.NilResult[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListMultiHeaderParamOptNilRaw({
				valueA: valueA === null ? null : valueA?.map(e => '"' + encodeAsciiString(e) + '"'),
				valueB,
				valueC: valueC === null ? null : valueC?.map(e => encodeBase64(JSON.stringify(e))),
				xRSDParamContentType: 'application/json',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listRecordHeaderParam(
		headerValue: api.model.SimpleRecord[],
	): Promise<api.result.Result<api.model.SimpleRecord[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListRecordHeaderParamRaw({
				headerValue: headerValue.map(e => encodeBase64(JSON.stringify(e))),
				xRSDParamContentType: 'application/json',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listRecordHeaderParamOpt(
		headerValue?: api.model.SimpleRecord[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListRecordHeaderParamOptRaw({
				headerValue: headerValue?.map(e => encodeBase64(JSON.stringify(e))),
				xRSDParamContentType: 'application/json',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listRecordHeaderParamNil(
		headerValue: api.model.SimpleRecord[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListRecordHeaderParamNilRaw({
				headerValue: headerValue?.map(e => encodeBase64(JSON.stringify(e))) ?? null,
				xRSDParamContentType: 'application/json',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listRecordHeaderParamOptNil(
		headerValue?: api.model.SimpleRecord[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listHeaderParameterTypesListRecordHeaderParamOptNilRaw({
				headerValue: headerValue === null ? null : headerValue?.map(e => encodeBase64(JSON.stringify(e))),
				xRSDParamContentType: 'application/json',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
}
