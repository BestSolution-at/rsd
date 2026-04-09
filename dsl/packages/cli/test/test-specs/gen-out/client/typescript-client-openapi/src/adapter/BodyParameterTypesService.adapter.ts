import { api } from '../../../typescript-client/src/index.js';
import { ServiceProps } from '../../../typescript-client/src/services/_fetch-type-utils.js';
import { BodyParameterTypesApi } from '../apis/BodyParameterTypesApi.js';
import { Configuration, ResponseError } from '../index.js';

export function createOpenAPIBodyParameterTypesService(
	props: ServiceProps<api.service.ErrorType>,
): api.service.BodyParameterTypesService {
	return new BodyParameterTypesServiceImpl(props);
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

class BodyParameterTypesServiceImpl implements api.service.BodyParameterTypesService {
	private deletegate: BodyParameterTypesApi;

	constructor(config: ServiceProps<api.service.ErrorType>) {
		this.deletegate = new BodyParameterTypesApi(new Configuration({ basePath: config.baseUrl }));
	}

	async simpleBooleanBodyParam(
		bodyBoolean: boolean,
	): Promise<api.result.Result<boolean, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleBooleanBodyParamRaw({ body: bodyBoolean });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleBooleanBodyParamOpt(
		bodyBoolean?: boolean,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleBooleanBodyParamOptRaw({
				body: bodyBoolean,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleBooleanBodyParamNil(
		bodyBoolean: boolean | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleBooleanBodyParamNilRaw({
				body: bodyBoolean,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleBooleanBodyParamOptNil(
		bodyBoolean?: boolean | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleBooleanBodyParamOptNilRaw({
				body: bodyBoolean,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleShortBodyParam(
		bodyShort: number,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleShortBodyParamRaw({ body: bodyShort });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleShortBodyParamOpt(
		bodyShort?: number,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleShortBodyParamOptRaw({ body: bodyShort });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleShortBodyParamNil(
		bodyShort: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleShortBodyParamNilRaw({ body: bodyShort });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleShortBodyParamOptNil(
		bodyShort?: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleShortBodyParamOptNilRaw({
				body: bodyShort,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleIntBodyParam(
		bodyInt: number,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleIntBodyParamRaw({ body: bodyInt });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleIntBodyParamOpt(
		bodyInt?: number,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleIntBodyParamOptRaw({ body: bodyInt });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleIntBodyParamNil(
		bodyInt: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleIntBodyParamNilRaw({ body: bodyInt });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleIntBodyParamOptNil(
		bodyInt?: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleIntBodyParamOptNilRaw({
				body: bodyInt,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLongBodyParam(
		bodyLong: number,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleLongBodyParamRaw({ body: bodyLong });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLongBodyParamOpt(
		bodyLong?: number,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleLongBodyParamOptRaw({ body: bodyLong });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLongBodyParamNil(
		bodyLong: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleLongBodyParamNilRaw({ body: bodyLong });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLongBodyParamOptNil(
		bodyLong?: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleLongBodyParamOptNilRaw({ body: bodyLong });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleFloatBodyParam(
		bodyFloat: number,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleFloatBodyParamRaw({ body: bodyFloat });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleFloatBodyParamOpt(
		bodyFloat?: number,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleFloatBodyParamOptRaw({ body: bodyFloat });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleFloatBodyParamNil(
		bodyFloat: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleFloatBodyParamNilRaw({ body: bodyFloat });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleFloatBodyParamOptNil(
		bodyFloat?: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleFloatBodyParamOptNilRaw({
				body: bodyFloat,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleDoubleBodyParam(
		bodyDouble: number,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleDoubleBodyParamRaw({ body: bodyDouble });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleDoubleBodyParamOpt(
		bodyDouble?: number,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleDoubleBodyParamOptRaw({ body: bodyDouble });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleDoubleBodyParamNil(
		bodyDouble: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleDoubleBodyParamNilRaw({ body: bodyDouble });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleDoubleBodyParamOptNil(
		bodyDouble?: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleDoubleBodyParamOptNilRaw({
				body: bodyDouble,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleStringBodyParam(
		bodyString: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleStringBodyParamRaw({ body: bodyString });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleStringBodyParamOpt(
		bodyString?: string,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleStringBodyParamOptRaw({ body: bodyString });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleStringBodyParamNil(
		bodyString: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleStringBodyParamNilRaw({ body: bodyString });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleStringBodyParamOptNil(
		bodyString?: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleStringBodyParamOptNilRaw({
				body: bodyString,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleLocalDateBodyParam(
		bodyLocalDate: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleLocalDateBodyParamRaw({
				body: bodyLocalDate as unknown as Date, // OpenAPI Generator inappropriately types date-only values as `Date`, so we need to cast it back to string
			});
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()) as unknown as string); // OpenAPI Generator inappropriately types date-only values as `Date`, so we need to cast it back to string
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleLocalDateBodyParamOpt(
		bodyLocalDate?: string,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleLocalDateBodyParamOptRaw({
				body: bodyLocalDate ? (bodyLocalDate as unknown as Date) : undefined, // OpenAPI Generator inappropriately types date-only values as `Date`, so we need to cast it back to string
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleLocalDateBodyParamNil(
		bodyLocalDate: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleLocalDateBodyParamNilRaw({
				body: bodyLocalDate ? (bodyLocalDate as unknown as Date) : null, // OpenAPI Generator inappropriately types date-only values as `Date`, so we need to cast it back to string
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleLocalDateBodyParamOptNil(
		bodyLocalDate?: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleLocalDateBodyParamOptNilRaw({
				body: bodyLocalDate ? (bodyLocalDate as unknown as Date) : undefined, // OpenAPI Generator inappropriately types date-only values as `Date`, so we need to cast it back to string
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleLocalDateTimeBodyParam(
		bodyLocalDateTime: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleLocalDateTimeBodyParamRaw({
				body: bodyLocalDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleLocalDateTimeBodyParamOpt(
		bodyLocalDateTime?: string,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleLocalDateTimeBodyParamOptRaw({
				body: bodyLocalDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleLocalDateTimeBodyParamNil(
		bodyLocalDateTime: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleLocalDateTimeBodyParamNilRaw({
				body: bodyLocalDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleLocalDateTimeBodyParamOptNil(
		bodyLocalDateTime?: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleLocalDateTimeBodyParamOptNilRaw({
				body: bodyLocalDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleZonedDateTimeBodyParam(
		bodyZonedDateTime: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleZonedDateTimeBodyParamRaw({
				body: bodyZonedDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleZonedDateTimeBodyParamOpt(
		bodyZonedDateTime?: string,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleZonedDateTimeBodyParamOptRaw({
				body: bodyZonedDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleZonedDateTimeBodyParamNil(
		bodyZonedDateTime: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleZonedDateTimeBodyParamNilRaw({
				body: bodyZonedDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleZonedDateTimeBodyParamOptNil(
		bodyZonedDateTime?: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleZonedDateTimeBodyParamOptNilRaw({
				body: bodyZonedDateTime,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleScalarBodyParam(
		bodyScalar: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleScalarBodyParamRaw({ body: bodyScalar });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleScalarBodyParamOpt(
		bodyScalar?: string,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleScalarBodyParamOptRaw({ body: bodyScalar });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleScalarBodyParamNil(
		bodyScalar: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleScalarBodyParamNilRaw({ body: bodyScalar });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleScalarBodyParamOptNil(
		bodyScalar?: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleScalarBodyParamOptNilRaw({
				body: bodyScalar,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleEnumBodyParam(
		bodyEnum: api.model.SampleEnum,
	): Promise<api.result.Result<api.model.SampleEnum, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleEnumBodyParamRaw({ body: bodyEnum });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleEnumBodyParamOpt(
		bodyEnum?: api.model.SampleEnum,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleEnumBodyParamOptRaw({ body: bodyEnum });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleEnumBodyParamNil(
		bodyEnum: api.model.SampleEnum | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleEnumBodyParamNilRaw({ body: bodyEnum });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleEnumBodyParamOptNil(
		bodyEnum?: api.model.SampleEnum | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleEnumBodyParamOptNilRaw({ body: bodyEnum });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleInlineEnumBodyParam(
		bodyEnum: 'A' | 'B',
	): Promise<api.result.Result<'A' | 'B', api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			// TODO File bug report because inline enums don't work
			const response = await this.deletegate.bodyParameterTypesSimpleInlineEnumBodyParamRaw({ body: bodyEnum });
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()) as 'A' | 'B');
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleInlineEnumBodyParamOpt(
		bodyEnum?: 'A' | 'B',
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleInlineEnumBodyParamOptRaw({
				body: bodyEnum,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleInlineEnumBodyParamNil(
		bodyEnum: 'C' | 'D' | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleInlineEnumBodyParamNilRaw({
				body: bodyEnum,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleInlineEnumBodyParamOptNil(
		bodyEnum?: 'C' | 'D' | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesSimpleInlineEnumBodyParamOptNilRaw({
				body: bodyEnum,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async multiBodyParam(
		valueA: string,
		valueB: number,
		valueC: api.model.SimpleRecord,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesMultiBodyParamRaw({
				bodyParameterTypesMultiBodyParamRequest: {
					valueA,
					valueB,
					valueC,
				},
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async multiBodyParamOpt(
		valueA?: string,
		valueB?: number,
		valueC?: api.model.SimpleRecord,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesMultiBodyParamOptRaw({
				bodyParameterTypesMultiBodyParamOptRequest: {
					valueA,
					valueB,
					valueC,
				},
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async multiBodyParamNil(
		valueA: string | null,
		valueB: number | null,
		valueC: api.model.SimpleRecord | null,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesMultiBodyParamNilRaw({
				bodyParameterTypesMultiBodyParamNilRequest: {
					valueA,
					valueB,
					valueC,
				},
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async multiBodyParamOptNil(
		valueA?: string | null,
		valueB?: number | null,
		valueC?: api.model.SimpleRecord | null,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesMultiBodyParamOptNilRaw({
				bodyParameterTypesMultiBodyParamOptNilRequest: {
					valueA,
					valueB,
					valueC,
				},
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async multiBodyParamFirst(
		valueA: string | undefined,
		valueB: number,
		valueC: api.model.SimpleRecord,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesMultiBodyParamFirstRaw({
				bodyParameterTypesMultiBodyParamFirstRequest: {
					valueA,
					valueB,
					valueC,
				},
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async recordBodyParam(
		bodyRecord: api.model.SimpleRecord,
	): Promise<api.result.Result<api.model.SimpleRecord, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesRecordBodyParamRaw({
				simpleRecord: bodyRecord,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async recordBodyParamOpt(
		bodyRecord?: api.model.SimpleRecord,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesRecordBodyParamOptRaw({
				simpleRecord: bodyRecord,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async recordBodyParamNil(
		bodyRecord: api.model.SimpleRecord | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesRecordBodyParamNilRaw({
				simpleRecord: bodyRecord,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async recordBodyParamOptNil(
		bodyRecord?: api.model.SimpleRecord | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesRecordBodyParamOptNilRaw({
				simpleRecord: bodyRecord,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async unionBodyParam(
		bodyUnion: api.model.Union,
	): Promise<api.result.Result<api.model.Union, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesUnionBodyParamRaw({
				union: bodyUnion['@type'] === 'union-a' ? { ...bodyUnion, type: 'union-a' } : { ...bodyUnion, type: 'union-b' },
			});
			if (response.raw.status === 200) {
				const result = await response.value();
				if (result.type === 'union-a') {
					return api.result.OK({ shared: result.shared, valueA: result.valueA, '@type': 'union-a' } as const);
				} else {
					return api.result.OK({ shared: result.shared, valueB: result.valueB, '@type': 'union-b' } as const);
				}
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async unionBodyParamOpt(
		bodyUnion?: api.model.Union,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const union = bodyUnion
				? bodyUnion['@type'] === 'union-a'
					? ({ ...bodyUnion, type: 'union-a' } as const)
					: ({ ...bodyUnion, type: 'union-b' } as const)
				: undefined;
			const response = await this.deletegate.bodyParameterTypesUnionBodyParamOptRaw({
				union,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async unionBodyParamNil(
		bodyUnion: api.model.Union | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const union = bodyUnion
				? bodyUnion['@type'] === 'union-a'
					? ({ ...bodyUnion, type: 'union-a' } as const)
					: ({ ...bodyUnion, type: 'union-b' } as const)
				: null;
			const response = await this.deletegate.bodyParameterTypesUnionBodyParamNilRaw({
				union,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async unionBodyParamOptNil(
		bodyUnion?: api.model.Union | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const union = bodyUnion
				? bodyUnion['@type'] === 'union-a'
					? ({ ...bodyUnion, type: 'union-a' } as const)
					: ({ ...bodyUnion, type: 'union-b' } as const)
				: bodyUnion === null
					? null
					: undefined;
			const response = await this.deletegate.bodyParameterTypesUnionBodyParamOptNilRaw({
				union,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async patchableRecordBodyParam(
		bodyRecord: api.model.PatchableRecordPatch,
	): Promise<api.result.Result<api.model.PatchableRecord, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesPatchableRecordBodyParamRaw({
				patchableRecordPatch: bodyRecord,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async patchableRecordBodyParamOpt(
		bodyRecord?: api.model.PatchableRecordPatch,
	): Promise<api.result.Result<api.model.PatchableRecord, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesPatchableRecordBodyParamOptRaw({
				patchableRecordPatch: bodyRecord,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async patchableRecordBodyParamNil(
		bodyRecord: api.model.PatchableRecordPatch | null,
	): Promise<api.result.Result<api.model.PatchableRecord, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesPatchableRecordBodyParamNilRaw({
				patchableRecordPatch: bodyRecord,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async patchableRecordBodyParamOptNil(
		bodyRecord?: api.model.PatchableRecordPatch | null,
	): Promise<api.result.Result<api.model.PatchableRecord, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.bodyParameterTypesPatchableRecordBodyParamOptNilRaw({
				patchableRecordPatch: bodyRecord,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}
}
