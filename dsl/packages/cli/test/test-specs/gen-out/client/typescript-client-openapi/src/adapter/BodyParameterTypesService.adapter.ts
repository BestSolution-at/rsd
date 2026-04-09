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
			const response = await this.deletegate.apiBodyparametertypesSimpleBooleanBodyParamPostRaw({ body: bodyBoolean });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleBooleanBodyParamOptPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleBooleanBodyParamNilPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleBooleanBodyParamOptNilPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleShortBodyParamPostRaw({ body: bodyShort });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleShortBodyParamOptPostRaw({ body: bodyShort });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleShortBodyParamNilPostRaw({ body: bodyShort });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleShortBodyParamOptNilPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleIntBodyParamPostRaw({ body: bodyInt });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleIntBodyParamOptPostRaw({ body: bodyInt });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleIntBodyParamNilPostRaw({ body: bodyInt });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleIntBodyParamOptNilPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleLongBodyParamPostRaw({ body: bodyLong });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleLongBodyParamOptPostRaw({ body: bodyLong });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleLongBodyParamNilPostRaw({ body: bodyLong });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleLongBodyParamOptNilPostRaw({ body: bodyLong });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleFloatBodyParamPostRaw({ body: bodyFloat });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleFloatBodyParamOptPostRaw({ body: bodyFloat });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleFloatBodyParamNilPostRaw({ body: bodyFloat });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleFloatBodyParamOptNilPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleDoubleBodyParamPostRaw({ body: bodyDouble });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleDoubleBodyParamOptPostRaw({ body: bodyDouble });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleDoubleBodyParamNilPostRaw({ body: bodyDouble });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleDoubleBodyParamOptNilPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleStringBodyParamPostRaw({ body: bodyString });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleStringBodyParamOptPostRaw({ body: bodyString });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleStringBodyParamNilPostRaw({ body: bodyString });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleStringBodyParamOptNilPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleLocalDateBodyParamPostRaw({
				body: new Date(bodyLocalDate),
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
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
			const response = await this.deletegate.apiBodyparametertypesSimpleLocalDateBodyParamOptPostRaw({
				body: bodyLocalDate ? new Date(bodyLocalDate) : undefined,
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
			const response = await this.deletegate.apiBodyparametertypesSimpleLocalDateBodyParamNilPostRaw({
				body: bodyLocalDate ? new Date(bodyLocalDate) : null,
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
			const response = await this.deletegate.apiBodyparametertypesSimpleLocalDateBodyParamOptNilPostRaw({
				body: bodyLocalDate ? new Date(bodyLocalDate) : undefined,
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
			const response = await this.deletegate.apiBodyparametertypesSimpleLocalDateTimeBodyParamPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleLocalDateTimeBodyParamOptPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleLocalDateTimeBodyParamNilPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleLocalDateTimeBodyParamOptNilPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleZonedDateTimeBodyParamPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleZonedDateTimeBodyParamOptPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleZonedDateTimeBodyParamNilPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleZonedDateTimeBodyParamOptNilPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleScalarBodyParamPostRaw({ body: bodyScalar });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleScalarBodyParamOptPostRaw({ body: bodyScalar });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleScalarBodyParamNilPostRaw({ body: bodyScalar });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleScalarBodyParamOptNilPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleEnumBodyParamPostRaw({ body: bodyEnum });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleEnumBodyParamOptPostRaw({ body: bodyEnum });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleEnumBodyParamNilPostRaw({ body: bodyEnum });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleEnumBodyParamOptNilPostRaw({ body: bodyEnum });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleInlineEnumBodyParamPostRaw({ body: bodyEnum });
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
			const response = await this.deletegate.apiBodyparametertypesSimpleInlineEnumBodyParamOptPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleInlineEnumBodyParamNilPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesSimpleInlineEnumBodyParamOptNilPostRaw({
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
			const response = await this.deletegate.apiBodyparametertypesMultiBodyParamPostRaw({
				apiBodyparametertypesMultiBodyParamPostRequest: {
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
			const response = await this.deletegate.apiBodyparametertypesMultiBodyParamOptPostRaw({
				apiBodyparametertypesMultiBodyParamOptPostRequest: {
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
			const response = await this.deletegate.apiBodyparametertypesMultiBodyParamNilPostRaw({
				apiBodyparametertypesMultiBodyParamNilPostRequest: {
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
			const response = await this.deletegate.apiBodyparametertypesMultiBodyParamOptNilPostRaw({
				apiBodyparametertypesMultiBodyParamOptNilPostRequest: {
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
			const response = await this.deletegate.apiBodyparametertypesMultiBodyParamFirstPostRaw({
				apiBodyparametertypesMultiBodyParamFirstPostRequest: {
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
			const response = await this.deletegate.apiBodyparametertypesRecordBodyParamPostRaw({ body: bodyRecord });
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
			const response = await this.deletegate.apiBodyparametertypesRecordBodyParamOptPostRaw({ body: bodyRecord });
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
			const response = await this.deletegate.apiBodyparametertypesRecordBodyParamNilPostRaw({ body: bodyRecord });
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
			const response = await this.deletegate.apiBodyparametertypesRecordBodyParamOptNilPostRaw({ body: bodyRecord });
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
			const response = await this.deletegate.apiBodyparametertypesUnionBodyParamPostRaw({ union: bodyUnion });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
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
			const response = await this.deletegate.apiBodyparametertypesUnionBodyParamOptPostRaw({ union: bodyUnion });
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
			const response = await this.deletegate.apiBodyparametertypesUnionBodyParamNilPostRaw({ union: bodyUnion });
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
			const response = await this.deletegate.apiBodyparametertypesUnionBodyParamOptNilPostRaw({ body: bodyUnion });
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
		throw new Error('Method not implemented.');
	}

	async patchableRecordBodyParamOpt(
		bodyRecord?: api.model.PatchableRecordPatch,
	): Promise<api.result.Result<api.model.PatchableRecord, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async patchableRecordBodyParamNil(
		bodyRecord: api.model.PatchableRecordPatch | null,
	): Promise<api.result.Result<api.model.PatchableRecord, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}

	async patchableRecordBodyParamOptNil(
		bodyRecord?: api.model.PatchableRecordPatch | null,
	): Promise<api.result.Result<api.model.PatchableRecord, api.service.StatusRSDError | api.service.NativeRSDError>> {
		throw new Error('Method not implemented.');
	}
}
