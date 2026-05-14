import { api } from '../../../typescript-client/src/index.js';
import { encodeBase64, ServiceProps } from '../../../typescript-client/src/services/_fetch-type-utils.js';
import { ListQueryParameterTypesApi } from '../index.js';
import { Configuration, ResponseError } from '../runtime.js';

export function createOpenAPIListQueryParameterTypesService(
	props: ServiceProps<api.service.ErrorType>,
): api.service.ListQueryParameterTypesService {
	return new ListQueryParameterTypesServiceImpl(props);
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

class ListQueryParameterTypesServiceImpl implements api.service.ListQueryParameterTypesService {
	private readonly deletegate: ListQueryParameterTypesApi;

	constructor(props: ServiceProps<api.service.ErrorType>) {
		this.deletegate = new ListQueryParameterTypesApi(
			new Configuration({
				basePath: props.baseUrl,
			}),
		);
	}
	async listBooleanQueryParam(
		queryValue: boolean[],
	): Promise<api.result.Result<boolean[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListBooleanQueryParamRaw({
				queryValue,
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

	async listShortQueryParam(
		queryValue: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListShortQueryParamRaw({
				queryValue,
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

	async listIntQueryParam(
		queryValue: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListIntQueryParamRaw({
				queryValue,
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

	async listLongQueryParam(
		queryValue: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListLongQueryParamRaw({
				queryValue,
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

	async listFloatQueryParam(
		queryValue: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListFloatQueryParamRaw({
				queryValue,
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
	async listDoubleQueryParam(
		queryValue: number[],
	): Promise<api.result.Result<number[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListDoubleQueryParamRaw({
				queryValue,
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
	async listStringQueryParam(
		queryValue: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListStringQueryParamRaw({
				queryValue,
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
	async listLocalDateQueryParam(
		queryValue: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListLocalDateQueryParamRaw({
				queryValue: queryValue as unknown as Date[],
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

	async listLocalDateTimeQueryParam(
		queryValue: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListLocalDateTimeQueryParamRaw({
				queryValue,
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

	async listLocalTimeQueryParam(
		queryValue: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListLocalTimeQueryParamRaw({
				queryValue,
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

	async listOffsetDateTimeQueryParam(
		queryValue: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListOffsetDateTimeQueryParamRaw({
				queryValue: queryValue as unknown as Date[],
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

	async listZonedDateTimeQueryParam(
		queryValue: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListZonedDateTimeQueryParamRaw({
				queryValue,
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

	async listScalarQueryParam(
		queryValue: string[],
	): Promise<api.result.Result<string[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListScalarQueryParamRaw({
				queryValue,
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

	async listEnumQueryParam(
		queryValue: api.model.SampleEnum[],
	): Promise<api.result.Result<api.model.SampleEnum[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListEnumQueryParamRaw({
				queryValue,
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

	async listInlineEnumQueryParam(
		queryValue: ('A' | 'B')[],
	): Promise<api.result.Result<('A' | 'B')[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListInlineEnumQueryParamRaw({
				queryValue: queryValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()) as unknown as ('A' | 'B')[]);
			} else {
				return api.result.ERR(toRSDError(response));
			}
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async listMultiQueryParam(
		valueA: string[],
		valueB: number[],
		valueC: api.model.SimpleRecord[],
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListMultiQueryParamRaw({
				valueA,
				valueB,
				valueC: valueC.map(record => encodeBase64(JSON.stringify(record))),
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

	async listRecordQueryParam(
		queryValue: api.model.SimpleRecord[],
	): Promise<api.result.Result<api.model.SimpleRecord[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.listQueryParameterTypesListRecordQueryParamRaw({
				queryValue: queryValue.map(record => encodeBase64(JSON.stringify(record))),
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
