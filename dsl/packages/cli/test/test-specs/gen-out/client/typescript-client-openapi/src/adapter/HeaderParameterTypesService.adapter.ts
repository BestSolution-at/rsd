import { api } from '../../../typescript-client/src/index.js';
import {
	encodeAsciiString,
	encodeBase64,
	ServiceProps,
} from '../../../typescript-client/src/services/_fetch-type-utils.js';
import { HeaderParameterTypesApi } from '../apis/HeaderParameterTypesApi.js';
import { Configuration, ResponseError } from '../runtime.js';

export function createOpenAPIHeaderParameterTypesService(
	props: ServiceProps<api.service.ErrorType>,
): api.service.HeaderParameterTypesService {
	return new HeaderParameterTypesServiceImpl(props);
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

class HeaderParameterTypesServiceImpl implements api.service.HeaderParameterTypesService {
	private readonly deletegate: HeaderParameterTypesApi;

	constructor(props: ServiceProps<api.service.ErrorType>) {
		this.deletegate = new HeaderParameterTypesApi(new Configuration({ basePath: props.baseUrl }));
	}

	async simpleBooleanHeaderParam(
		headerValue: boolean,
	): Promise<api.result.Result<boolean, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleBooleanHeaderParamRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleBooleanHeaderParamOpt(
		headerValue?: boolean,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleBooleanHeaderParamOptRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleBooleanHeaderParamNil(
		headerValue: boolean | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleBooleanHeaderParamNilRaw({
				headerValue: (headerValue ?? 'null') as unknown as boolean,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleBooleanHeaderParamOptNil(
		headerValue?: boolean | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleBooleanHeaderParamOptNilRaw({
				headerValue: (headerValue === null ? 'null' : headerValue) as unknown as boolean,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleShortHeaderParam(
		headerValue: number,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleShortHeaderParamRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleShortHeaderParamOpt(
		headerValue?: number,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleShortHeaderParamOptRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleShortHeaderParamNil(
		headerValue: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleShortHeaderParamNilRaw({
				headerValue: (headerValue ?? 'null') as unknown as number,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleShortHeaderParamOptNil(
		headerValue?: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleShortHeaderParamOptNilRaw({
				headerValue: (headerValue === null ? 'null' : headerValue) as unknown as number,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleIntHeaderParam(
		headerValue: number,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleIntHeaderParamRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleIntHeaderParamOpt(
		headerValue?: number,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleIntHeaderParamOptRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleIntHeaderParamNil(
		headerValue: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleIntHeaderParamNilRaw({
				headerValue: (headerValue ?? 'null') as unknown as number,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleIntHeaderParamOptNil(
		headerValue?: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleIntHeaderParamOptNilRaw({
				headerValue: (headerValue === null ? 'null' : headerValue) as unknown as number,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLongHeaderParam(
		headerValue: number,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleLongHeaderParamRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLongHeaderParamOpt(
		headerValue?: number,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleLongHeaderParamOptRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLongHeaderParamNil(
		headerValue: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleLongHeaderParamNilRaw({
				headerValue: (headerValue ?? 'null') as unknown as number,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLongHeaderParamOptNil(
		headerValue?: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleLongHeaderParamOptNilRaw({
				headerValue: (headerValue === null ? 'null' : headerValue) as unknown as number,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleFloatHeaderParam(
		headerValue: number,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleFloatHeaderParamRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleFloatHeaderParamOpt(
		headerValue?: number,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleFloatHeaderParamOptRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleFloatHeaderParamNil(
		headerValue: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleFloatHeaderParamNilRaw({
				headerValue: (headerValue ?? 'null') as unknown as number,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleFloatHeaderParamOptNil(
		headerValue?: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleFloatHeaderParamOptNilRaw({
				headerValue: (headerValue === null ? 'null' : headerValue) as unknown as number,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleDoubleHeaderParam(
		headerValue: number,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleDoubleHeaderParamRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleDoubleHeaderParamOpt(
		headerValue?: number,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleDoubleHeaderParamOptRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleDoubleHeaderParamNil(
		headerValue: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleDoubleHeaderParamNilRaw({
				headerValue: (headerValue ?? 'null') as unknown as number,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleDoubleHeaderParamOptNil(
		headerValue?: number | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleDoubleHeaderParamOptNilRaw({
				headerValue: (headerValue === null ? 'null' : headerValue) as unknown as number,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleStringHeaderParam(
		headerValue: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleStringHeaderParamRaw({
				headerValue: '"' + encodeAsciiString(headerValue) + '"',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleStringHeaderParamOpt(
		headerValue?: string,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleStringHeaderParamOptRaw({
				headerValue: headerValue !== undefined ? '"' + encodeAsciiString(headerValue) + '"' : undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleStringHeaderParamNil(
		headerValue: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleStringHeaderParamNilRaw({
				headerValue: headerValue !== null ? '"' + encodeAsciiString(headerValue) + '"' : 'null',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleStringHeaderParamOptNil(
		headerValue?: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleStringHeaderParamOptNilRaw({
				headerValue:
					headerValue !== undefined
						? headerValue !== null
							? '"' + encodeAsciiString(headerValue) + '"'
							: 'null'
						: undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async simpleLocalDateHeaderParam(
		headerValue: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleLocalDateHeaderParamRaw({
				headerValue: headerValue as unknown as Date,
			});
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()) as unknown as string); // OpenAPI Generator inappropriately types date-only values as `Date`, so we need to cast it back to string
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLocalDateHeaderParamOpt(
		headerValue?: string,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleLocalDateHeaderParamOptRaw({
				headerValue: headerValue !== undefined ? (headerValue as unknown as Date) : undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLocalDateHeaderParamNil(
		headerValue: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleLocalDateHeaderParamNilRaw({
				headerValue: headerValue !== null ? (headerValue as unknown as Date) : ('null' as unknown as Date),
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLocalDateHeaderParamOptNil(
		headerValue?: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleLocalDateHeaderParamOptNilRaw({
				headerValue:
					headerValue !== undefined
						? headerValue !== null
							? (headerValue as unknown as Date)
							: ('null' as unknown as Date)
						: undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLocalDateTimeHeaderParam(
		headerValue: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleLocalDateTimeHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLocalDateTimeHeaderParamOpt(
		headerValue?: string,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleLocalDateTimeHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLocalDateTimeHeaderParamNil(
		headerValue: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleLocalDateTimeHeaderParamNilRaw({
				headerValue: headerValue ?? 'null',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleLocalDateTimeHeaderParamOptNil(
		headerValue?: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleLocalDateTimeHeaderParamOptNilRaw({
				headerValue: headerValue !== undefined ? (headerValue ?? 'null') : undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleZonedDateTimeHeaderParam(
		headerValue: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleZonedDateTimeHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleZonedDateTimeHeaderParamOpt(
		headerValue?: string,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleZonedDateTimeHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleZonedDateTimeHeaderParamNil(
		headerValue: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleZonedDateTimeHeaderParamNilRaw({
				headerValue: headerValue ?? 'null',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleZonedDateTimeHeaderParamOptNil(
		headerValue?: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleZonedDateTimeHeaderParamOptNilRaw({
				headerValue: headerValue !== undefined ? (headerValue ?? 'null') : undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleScalarHeaderParam(
		headerValue: string,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleScalarHeaderParamRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleScalarHeaderParamOpt(
		headerValue?: string,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleScalarHeaderParamOptRaw({
				headerValue,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleScalarHeaderParamNil(
		headerValue: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleScalarHeaderParamNilRaw({
				headerValue: headerValue ?? 'null',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleScalarHeaderParamOptNil(
		headerValue?: string | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleScalarHeaderParamOptNilRaw({
				headerValue: headerValue !== undefined ? (headerValue ?? 'null') : undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleEnumHeaderParam(
		headerValue: api.model.SampleEnum,
	): Promise<api.result.Result<api.model.SampleEnum, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleEnumHeaderParamRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleEnumHeaderParamOpt(
		headerValue?: api.model.SampleEnum,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleEnumHeaderParamOptRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleEnumHeaderParamNil(
		headerValue: api.model.SampleEnum | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleEnumHeaderParamNilRaw({
				headerValue: headerValue ?? 'null',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleEnumHeaderParamOptNil(
		headerValue?: api.model.SampleEnum | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleEnumHeaderParamOptNilRaw({
				headerValue: (headerValue !== undefined ? (headerValue ?? 'null') : undefined) as unknown as null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleInlineEnumHeaderParam(
		headerValue: 'A' | 'B',
	): Promise<api.result.Result<'A' | 'B', api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleInlineEnumHeaderParamRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()) as 'A' | 'B');
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleInlineEnumHeaderParamOpt(
		headerValue?: 'A' | 'B',
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleInlineEnumHeaderParamOptRaw({ headerValue });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleInlineEnumHeaderParamNil(
		headerValue: 'C' | 'D' | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleInlineEnumHeaderParamNilRaw({
				headerValue: (headerValue ?? 'null') as unknown as 'C' | 'D',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async simpleInlineEnumHeaderParamOptNil(
		headerValue?: 'C' | 'D' | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesSimpleInlineEnumHeaderParamOptNilRaw({
				headerValue: (headerValue !== undefined ? (headerValue ?? 'null') : undefined) as unknown as 'C' | 'D',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async multiHeaderParam(
		valueA: string,
		valueB: number,
	): Promise<api.result.Result<string, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesMultiHeaderParamRaw({
				valueA: `"${encodeAsciiString(valueA)}"`,
				valueB,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async multiHeaderParamOpt(
		valueA?: string,
		valueB?: number,
	): Promise<api.result.Result<api.model.NilResult[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesMultiHeaderParamOptRaw({
				valueA: valueA !== undefined ? `"${encodeAsciiString(valueA)}"` : undefined,
				valueB,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async multiHeaderParamNil(
		valueA: string | null,
		valueB: number | null,
	): Promise<api.result.Result<api.model.NilResult[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesMultiHeaderParamNilRaw({
				valueA: valueA !== null ? `"${encodeAsciiString(valueA)}"` : 'null',
				valueB: (valueB ?? 'null') as unknown as number,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async multiHeaderParamOptNil(
		valueA?: string | null,
		valueB?: number | null,
	): Promise<api.result.Result<api.model.NilResult[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesMultiHeaderParamOptNilRaw({
				valueA: valueA !== undefined ? (valueA !== null ? `"${encodeAsciiString(valueA)}"` : 'null') : undefined,
				valueB: valueB !== undefined ? ((valueB ?? 'null') as unknown as number) : undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async recordHeaderParam(
		headerValue: api.model.SimpleRecord,
	): Promise<api.result.Result<api.model.SimpleRecord, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesRecordHeaderParamRaw({
				headerValue: encodeBase64(JSON.stringify(headerValue)),
				xRSDParamContentType: 'application/json',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async recordHeaderParamOpt(
		headerValue?: api.model.SimpleRecord,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesRecordHeaderParamOptRaw({
				headerValue: headerValue !== undefined ? encodeBase64(JSON.stringify(headerValue)) : undefined,
				xRSDParamContentType: 'application/json',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async recordHeaderParamNil(
		headerValue: api.model.SimpleRecord | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesRecordHeaderParamNilRaw({
				headerValue: headerValue !== null ? encodeBase64(JSON.stringify(headerValue)) : 'null',
				xRSDParamContentType: 'application/json',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async recordHeaderParamOptNil(
		headerValue?: api.model.SimpleRecord | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesRecordHeaderParamOptNilRaw({
				headerValue:
					headerValue !== undefined
						? headerValue !== null
							? encodeBase64(JSON.stringify(headerValue))
							: 'null'
						: undefined,
				xRSDParamContentType: 'application/json',
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async mixed(
		pathString: string,
		pathNumber: number,
		headerString: string,
		headerNumber: number,
		headerRecord: api.model.SimpleRecord,
		body: api.model.SimpleRecord,
		queryString: string,
		queryNumber: number,
		queryRecord: api.model.SimpleRecord,
	): Promise<api.result.Result<api.result.VoidType, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.deletegate.headerParameterTypesMixedRaw({
				pathString: `"${encodeAsciiString(pathString)}"`,
				pathNumber,
				headerString: `"${encodeAsciiString(headerString)}"`,
				headerNumber,
				headerRecord: encodeBase64(JSON.stringify(headerRecord)),
				xRSDParamContentType: 'application/json',
				simpleRecord: body,
				queryString: `"${encodeAsciiString(queryString)}"`,
				queryNumber,
				queryRecord: encodeBase64(JSON.stringify(queryRecord)),
			});
			if (response.raw.status === 204) {
				return api.result.OK(api.result.Void);
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
}
