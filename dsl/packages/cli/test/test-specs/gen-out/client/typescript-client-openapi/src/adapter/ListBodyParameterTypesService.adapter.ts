import { api } from '../../../typescript-client/src/index.js';
import { ListBodyParameterTypesService } from '../../../typescript-client/src/ListBodyParameterTypesService.js';
import { ServiceProps } from '../../../typescript-client/src/services/_fetch-type-utils.js';
import { ListBodyParameterTypesApi } from '../apis/ListBodyParameterTypesApi.js';
import { Configuration, ResponseError } from '../runtime.js';

export function createOpenAPIListBodyParameterTypesService(
	props: ServiceProps<api.service.ErrorType>,
): ListBodyParameterTypesService {
	return new ListBodyParameterTypesServiceImpl(props);
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
class ListBodyParameterTypesServiceImpl implements ListBodyParameterTypesService {
	private delegate: ListBodyParameterTypesApi;

	constructor(props: ServiceProps<api.service.ErrorType>) {
		this.delegate = new ListBodyParameterTypesApi(new Configuration({ basePath: props.baseUrl }));
	}

	async listBooleanBodyParam(
		bodyBoolean: boolean[],
	): Promise<api.result.Result<boolean[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListBooleanBodyParamRaw({
				requestBody: bodyBoolean,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listBooleanBodyParamOpt(
		bodyBoolean?: boolean[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListBooleanBodyParamOptRaw({
				requestBody: bodyBoolean,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listBooleanBodyParamNil(
		bodyBoolean: boolean[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListBooleanBodyParamNilRaw({
				requestBody: bodyBoolean,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listBooleanBodyParamOptNil(
		bodyBoolean?: boolean[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListBooleanBodyParamOptNilRaw({
				requestBody: bodyBoolean,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listShortBodyParam(
		bodyShort: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListShortBodyParamRaw({
				requestBody: bodyShort,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listShortBodyParamOpt(
		bodyShort?: number[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListShortBodyParamOptRaw({
				requestBody: bodyShort,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listShortBodyParamNil(
		bodyShort: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListShortBodyParamNilRaw({
				requestBody: bodyShort,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listShortBodyParamOptNil(
		bodyShort?: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListShortBodyParamOptNilRaw({
				requestBody: bodyShort,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listIntBodyParam(
		bodyInt: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListIntBodyParamRaw({
				requestBody: bodyInt,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listIntBodyParamOpt(
		bodyInt?: number[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListIntBodyParamOptRaw({
				requestBody: bodyInt,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listIntBodyParamNil(
		bodyInt: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListIntBodyParamNilRaw({
				requestBody: bodyInt,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listIntBodyParamOptNil(
		bodyInt?: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListIntBodyParamOptNilRaw({
				requestBody: bodyInt,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLongBodyParam(
		bodyLong: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLongBodyParamRaw({
				requestBody: bodyLong,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLongBodyParamOpt(
		bodyLong?: number[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLongBodyParamOptRaw({
				requestBody: bodyLong,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLongBodyParamNil(
		bodyLong: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLongBodyParamNilRaw({
				requestBody: bodyLong,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLongBodyParamOptNil(
		bodyLong?: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLongBodyParamOptNilRaw({
				requestBody: bodyLong,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listFloatBodyParam(
		bodyFloat: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListFloatBodyParamRaw({
				requestBody: bodyFloat,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listFloatBodyParamOpt(
		bodyFloat?: number[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListFloatBodyParamOptRaw({
				requestBody: bodyFloat,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listFloatBodyParamNil(
		bodyFloat: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListFloatBodyParamNilRaw({
				requestBody: bodyFloat,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listFloatBodyParamOptNil(
		bodyFloat?: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListFloatBodyParamOptNilRaw({
				requestBody: bodyFloat,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listDoubleBodyParam(
		bodyDouble: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListDoubleBodyParamRaw({
				requestBody: bodyDouble,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listDoubleBodyParamOpt(
		bodyDouble?: number[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListDoubleBodyParamOptRaw({
				requestBody: bodyDouble,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listDoubleBodyParamNil(
		bodyDouble: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListDoubleBodyParamNilRaw({
				requestBody: bodyDouble,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listDoubleBodyParamOptNil(
		bodyDouble?: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListDoubleBodyParamOptNilRaw({
				requestBody: bodyDouble,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listStringBodyParam(
		bodyString: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListStringBodyParamRaw({
				requestBody: bodyString,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listStringBodyParamOpt(
		bodyString?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListStringBodyParamOptRaw({
				requestBody: bodyString,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listStringBodyParamNil(
		bodyString: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListStringBodyParamNilRaw({
				requestBody: bodyString,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listStringBodyParamOptNil(
		bodyString?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListStringBodyParamOptNilRaw({
				requestBody: bodyString,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateBodyParam(
		bodyLocalDate: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLocalDateBodyParamRaw({
				requestBody: bodyLocalDate as unknown as Date[], // OpenAPI Generator inappropriately types date-only values as `Date`, so we need to cast it back to string
			});
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()) as unknown as string[]); // OpenAPI Generator inappropriately types date-only values as `Date`, so we need to cast it back to string
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateBodyParamOpt(
		bodyLocalDate?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLocalDateBodyParamOptRaw({
				requestBody: bodyLocalDate as unknown as Date[] | undefined, // OpenAPI Generator inappropriately types date-only values as `Date`, so we need to cast it back to string
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateBodyParamNil(
		bodyLocalDate: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLocalDateBodyParamNilRaw({
				requestBody: bodyLocalDate as unknown as Date[] | null, // OpenAPI Generator inappropriately types date-only values as `Date`, so we need to cast it back to string
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateBodyParamOptNil(
		bodyLocalDate?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLocalDateBodyParamOptNilRaw({
				requestBody: bodyLocalDate as unknown as Date[] | null | undefined, // OpenAPI Generator inappropriately types date-only values as `Date`, so we need to cast it back to string
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateTimeBodyParam(
		bodyLocalDateTime: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLocalDateTimeBodyParamRaw({
				requestBody: bodyLocalDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateTimeBodyParamOpt(
		bodyLocalDateTime?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLocalDateTimeBodyParamOptRaw({
				requestBody: bodyLocalDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateTimeBodyParamNil(
		bodyLocalDateTime: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLocalDateTimeBodyParamNilRaw({
				requestBody: bodyLocalDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalDateTimeBodyParamOptNil(
		bodyLocalDateTime?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLocalDateTimeBodyParamOptNilRaw({
				requestBody: bodyLocalDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalTimeBodyParam(
		bodyLocalTime: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLocalTimeBodyParamRaw({
				requestBody: bodyLocalTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalTimeBodyParamOpt(
		bodyLocalTime?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLocalTimeBodyParamOptRaw({
				requestBody: bodyLocalTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalTimeBodyParamNil(
		bodyLocalTime: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLocalTimeBodyParamNilRaw({
				requestBody: bodyLocalTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listLocalTimeBodyParamOptNil(
		bodyLocalTime?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListLocalTimeBodyParamOptNilRaw({
				requestBody: bodyLocalTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listOffsetDateTimeBodyParam(
		bodyOffsetDateTime: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListOffsetDateTimeBodyParamRaw({
				requestBody: bodyOffsetDateTime as unknown as Date[], // OpenAPI Generator inappropriately types date-time values as `Date`, so we need to cast it back to string
			});
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()) as unknown as string[]); // OpenAPI Generator inappropriately types date-time values as `Date`, so we need to cast it back to string
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listOffsetDateTimeBodyParamOpt(
		bodyOffsetDateTime?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListOffsetDateTimeBodyParamOptRaw({
				requestBody: bodyOffsetDateTime as unknown as Date[] | undefined, // OpenAPI Generator inappropriately types date-time values as `Date`, so we need to cast it back to string
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listOffsetDateTimeBodyParamNil(
		bodyOffsetDateTime: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListOffsetDateTimeBodyParamNilRaw({
				requestBody: bodyOffsetDateTime as unknown as Date[] | null, // OpenAPI Generator inappropriately types date-time values as `Date`, so we need to cast it back to string
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listOffsetDateTimeBodyParamOptNil(
		bodyOffsetDateTime?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListOffsetDateTimeBodyParamOptNilRaw({
				requestBody: bodyOffsetDateTime as unknown as Date[] | null | undefined, // OpenAPI Generator inappropriately types date-time values as `Date`, so we need to cast it back to string
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listZonedDateTimeBodyParam(
		bodyZonedDateTime: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListZonedDateTimeBodyParamRaw({
				requestBody: bodyZonedDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listZonedDateTimeBodyParamOpt(
		bodyZonedDateTime?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListZonedDateTimeBodyParamOptRaw({
				requestBody: bodyZonedDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listZonedDateTimeBodyParamNil(
		bodyZonedDateTime: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListZonedDateTimeBodyParamNilRaw({
				requestBody: bodyZonedDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async listZonedDateTimeBodyParamOptNil(
		bodyZonedDateTime?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListZonedDateTimeBodyParamOptNilRaw({
				requestBody: bodyZonedDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listScalarBodyParam(
		bodyScalar: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListScalarBodyParamRaw({
				requestBody: bodyScalar,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listScalarBodyParamOpt(
		bodyScalar?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListScalarBodyParamOptRaw({
				requestBody: bodyScalar,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listScalarBodyParamNil(
		bodyScalar: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListScalarBodyParamNilRaw({
				requestBody: bodyScalar,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listScalarBodyParamOptNil(
		bodyScalar?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListScalarBodyParamOptNilRaw({
				requestBody: bodyScalar,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listEnumBodyParam(
		bodyEnum: api.model.SampleEnum[],
	): Promise<api.result.Result<api.model.SampleEnum[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListEnumBodyParamRaw({
				sampleEnum: bodyEnum,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listEnumBodyParamOpt(
		bodyEnum?: api.model.SampleEnum[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListEnumBodyParamOptRaw({
				sampleEnum: bodyEnum,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listEnumBodyParamNil(
		bodyEnum: api.model.SampleEnum[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListEnumBodyParamNilRaw({
				sampleEnum: bodyEnum,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listEnumBodyParamOptNil(
		bodyEnum?: api.model.SampleEnum[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListEnumBodyParamOptNilRaw({
				sampleEnum: bodyEnum,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listInlineEnumBodyParam(
		bodyEnum: ('A' | 'B')[],
	): Promise<api.result.Result<('A' | 'B')[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListInlineEnumBodyParamRaw({
				requestBody: bodyEnum,
			});
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()) as ('A' | 'B')[]);
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listInlineEnumBodyParamOpt(
		bodyEnum?: ('A' | 'B')[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListInlineEnumBodyParamOptRaw({
				requestBody: bodyEnum,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listInlineEnumBodyParamNil(
		bodyEnum: ('C' | 'D')[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListInlineEnumBodyParamNilRaw({
				requestBody: bodyEnum,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listInlineEnumBodyParamOptNil(
		bodyEnum?: ('C' | 'D')[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListInlineEnumBodyParamOptNilRaw({
				requestBody: bodyEnum,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listMultiBodyParam(
		valueA: string[],
		valueB: number[],
		valueC: api.model.SimpleRecord[],
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListMultiBodyParamRaw({
				listBodyParameterTypesListMultiBodyParamRequest: {
					valueA,
					valueB,
					valueC,
				},
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listMultiBodyParamOpt(
		valueA?: string[],
		valueB?: number[],
		valueC?: api.model.SimpleRecord[],
	): Promise<api.result.Result<api.model.NilResult[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListMultiBodyParamOptRaw({
				listBodyParameterTypesListMultiBodyParamOptRequest: {
					valueA,
					valueB,
					valueC,
				},
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listMultiBodyParamNil(
		valueA: string[] | null,
		valueB: number[] | null,
		valueC: api.model.SimpleRecord[] | null,
	): Promise<api.result.Result<api.model.NilResult[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListMultiBodyParamNilRaw({
				listBodyParameterTypesListMultiBodyParamNilRequest: {
					valueA,
					valueB,
					valueC,
				},
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listMultiBodyParamOptNil(
		valueA?: string[] | null,
		valueB?: number[] | null,
		valueC?: api.model.SimpleRecord[] | null,
	): Promise<api.result.Result<api.model.NilResult[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListMultiBodyParamOptNilRaw({
				listBodyParameterTypesListMultiBodyParamOptNilRequest: {
					valueA,
					valueB,
					valueC,
				},
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listRecordBodyParam(
		bodyRecord: api.model.SimpleRecord[],
	): Promise<api.result.Result<api.model.SimpleRecord[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListRecordBodyParamRaw({
				simpleRecord: bodyRecord,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listRecordBodyParamOpt(
		bodyRecord?: api.model.SimpleRecord[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListRecordBodyParamOptRaw({
				simpleRecord: bodyRecord,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listRecordBodyParamNil(
		bodyRecord: api.model.SimpleRecord[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListRecordBodyParamNilRaw({
				simpleRecord: bodyRecord,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listRecordBodyParamOptNil(
		bodyRecord?: api.model.SimpleRecord[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.listBodyParameterTypesListRecordBodyParamOptNilRaw({
				simpleRecord: bodyRecord,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(response));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
}
