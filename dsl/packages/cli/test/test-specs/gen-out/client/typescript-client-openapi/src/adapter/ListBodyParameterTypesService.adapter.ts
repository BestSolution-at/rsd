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
		throw new Error('Method not implemented.');
	}

	async listLongBodyParamOpt(
		bodyLong?: number[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async listLongBodyParamNil(
		bodyLong: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async listLongBodyParamOptNil(
		bodyLong?: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async listFloatBodyParam(
		bodyFloat: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async listFloatBodyParamOpt(
		bodyFloat?: number[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async listFloatBodyParamNil(
		bodyFloat: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async listFloatBodyParamOptNil(
		bodyFloat?: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async listDoubleBodyParam(
		bodyDouble: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async listDoubleBodyParamOpt(
		bodyDouble?: number[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async listDoubleBodyParamNil(
		bodyDouble: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async listDoubleBodyParamOptNil(
		bodyDouble?: number[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async listStringBodyParam(
		bodyString: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async listStringBodyParamOpt(
		bodyString?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async listStringBodyParamNil(
		bodyString: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async listStringBodyParamOptNil(
		bodyString?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listLocalDateBodyParam(
		bodyLocalDate: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listLocalDateBodyParamOpt(
		bodyLocalDate?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listLocalDateBodyParamNil(
		bodyLocalDate: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listLocalDateBodyParamOptNil(
		bodyLocalDate?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listLocalDateTimeBodyParam(
		bodyLocalDateTime: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listLocalDateTimeBodyParamOpt(
		bodyLocalDateTime?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listLocalDateTimeBodyParamNil(
		bodyLocalDateTime: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listLocalDateTimeBodyParamOptNil(
		bodyLocalDateTime?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listZonedDateTimeBodyParam(
		bodyZonedDateTime: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listZonedDateTimeBodyParamOpt(
		bodyZonedDateTime?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listZonedDateTimeBodyParamNil(
		bodyZonedDateTime: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listZonedDateTimeBodyParamOptNil(
		bodyZonedDateTime?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listScalarBodyParam(
		bodyScalar: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listScalarBodyParamOpt(
		bodyScalar?: string[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listScalarBodyParamNil(
		bodyScalar: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listScalarBodyParamOptNil(
		bodyScalar?: string[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listEnumBodyParam(
		bodyEnum: api.model.SampleEnum[],
	): Promise<api.result.Result<api.model.SampleEnum[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listEnumBodyParamOpt(
		bodyEnum?: api.model.SampleEnum[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listEnumBodyParamNil(
		bodyEnum: api.model.SampleEnum[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listEnumBodyParamOptNil(
		bodyEnum?: api.model.SampleEnum[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listInlineEnumBodyParam(
		bodyEnum: ('A' | 'B')[],
	): Promise<api.result.Result<('A' | 'B')[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listInlineEnumBodyParamOpt(
		bodyEnum?: ('A' | 'B')[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listInlineEnumBodyParamNil(
		bodyEnum: ('C' | 'D')[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listInlineEnumBodyParamOptNil(
		bodyEnum?: ('C' | 'D')[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listMultiBodyParam(
		valueA: string[],
		valueB: number[],
		valueC: api.model.SimpleRecord[],
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listMultiBodyParamOpt(
		valueA?: string[],
		valueB?: number[],
		valueC?: api.model.SimpleRecord[],
	): Promise<api.result.Result<api.model.NilResult[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listMultiBodyParamNil(
		valueA: string[] | null,
		valueB: number[] | null,
		valueC: api.model.SimpleRecord[] | null,
	): Promise<api.result.Result<api.model.NilResult[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listMultiBodyParamOptNil(
		valueA?: string[] | null,
		valueB?: number[] | null,
		valueC?: api.model.SimpleRecord[] | null,
	): Promise<api.result.Result<api.model.NilResult[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listRecordBodyParam(
		bodyRecord: api.model.SimpleRecord[],
	): Promise<api.result.Result<api.model.SimpleRecord[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listRecordBodyParamOpt(
		bodyRecord?: api.model.SimpleRecord[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listRecordBodyParamNil(
		bodyRecord: api.model.SimpleRecord[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
	async listRecordBodyParamOptNil(
		bodyRecord?: api.model.SimpleRecord[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
}
