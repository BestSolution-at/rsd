import { api } from '../../../typescript-client/src/index.js';
import { PathParameterTypeServiceService } from '../../../typescript-client/src/PathParameterTypeServiceService.js';
import { ServiceProps } from '../../../typescript-client/src/services/_fetch-type-utils.js';
import { PathParameterTypeServiceApi } from '../apis/PathParameterTypeServiceApi.js';
import { Configuration, ResponseError } from '../runtime.js';

export function createOpenAPIPathParameterTypeServiceService(
	props: ServiceProps<api.service.ErrorType>,
): api.service.PathParameterTypeServiceService {
	return new PathParameterTypeServiceServiceImpl(props);
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

class PathParameterTypeServiceServiceImpl implements PathParameterTypeServiceService {
	private readonly deletegate: PathParameterTypeServiceApi;

	constructor(props: ServiceProps<api.service.ErrorType>) {
		this.deletegate = new PathParameterTypeServiceApi(new Configuration({ basePath: props.baseUrl }));
	}

	async simpleBooleanPathParam(
		pathBoolean: boolean,
	): Promise<api.result.Result<boolean, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.pathParameterTypeServiceSimpleBooleanPathParamRaw({ pathBoolean });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleShortPathParam(
		pathShort: number,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.pathParameterTypeServiceSimpleShortPathParamRaw({ pathShort });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleIntPathParam(
		pathInt: number,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.pathParameterTypeServiceSimpleIntPathParamRaw({ pathInt });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLongPathParam(
		pathLong: number,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.pathParameterTypeServiceSimpleLongPathParamRaw({ pathLong });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleFloatPathParam(
		pathFloat: number,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.pathParameterTypeServiceSimpleFloatPathParamRaw({ pathFloat });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleDoublePathParam(
		pathDouble: number,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.pathParameterTypeServiceSimpleDoublePathParamRaw({ pathDouble });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleStringPathParam(
		pathString: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.pathParameterTypeServiceSimpleStringPathParamRaw({ pathString });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLocalDatePathParam(
		pathLocalDate: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.pathParameterTypeServiceSimpleLocalDatePathParamRaw({
				pathLocalDate: new Date(pathLocalDate),
			});
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()) as unknown as string); // OpenAPI Generator inappropriately types date-only values as `Date`, so we need to cast it back to string
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLocalDateTimePathParam(
		pathLocalDateTime: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.pathParameterTypeServiceSimpleLocalDateTimePathParamRaw({
				pathLocalDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLocalTimePathParam(
		pathLocalTime: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.pathParameterTypeServiceSimpleLocalTimePathParamRaw({
				pathLocalTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleOffsetDateTimePathParam(
		pathOffsetDateTime: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.pathParameterTypeServiceSimpleOffsetDateTimePathParamRaw({
				pathOffsetDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}


	async simpleZonedDateTimePathParam(
		pathZonedDateTime: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.pathParameterTypeServiceSimpleZonedDateTimePathParamRaw({
				pathZonedDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleScalarPathParam(
		pathScalar: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.pathParameterTypeServiceSimpleScalarPathParamRaw({ pathScalar });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleEnumPathParam(
		pathEnum: api.model.SampleEnum,
	): Promise<api.result.Result<api.model.SampleEnum, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.pathParameterTypeServiceSimpleEnumPathParamRaw({ pathEnum });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async multiPathParam(
		valueA: string,
		valueB: number,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.pathParameterTypeServiceMultiPathParamRaw({ valueA, valueB });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
}
