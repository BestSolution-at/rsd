import { ScalarSubstitionServiceApi } from '../../test-specs/gen-out/client/typescript-client-openapi/src/index.js';
import { Configuration, ResponseError } from '../../test-specs/gen-out/client/typescript-client-openapi/src/runtime.js';
import { Void } from '../../test-specs/gen-out/client/typescript-client/src/_result-utils.js';
import { api } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import { RangeFromJSON, RangeToJSON } from '../../test-specs/gen-out/client/typescript-client/src/model/_Scalars.js';
import { ServiceProps } from '../../test-specs/gen-out/client/typescript-client/src/services/_fetch-type-utils.js';

export function createOpenAPIScalarSubstition_ServiceService(
	props: ServiceProps<api.service.ErrorType>,
): api.service.ScalarSubstition_ServiceService {
	return new ScalarSubstition_ServiceServiceImpl(props);
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

class ScalarSubstition_ServiceServiceImpl implements api.service.ScalarSubstition_ServiceService {
	private readonly delegate: ScalarSubstitionServiceApi;

	constructor(props: ServiceProps<api.service.ErrorType>) {
		this.delegate = new ScalarSubstitionServiceApi(new Configuration({ basePath: props.baseUrl }));
	}

	async get(): Promise<api.result.Result<api.model.Range, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceGetRaw();
			if (response.raw.status === 200) {
				return api.result.OK(RangeFromJSON(await response.value()));
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async list(): Promise<api.result.Result<api.model.Range[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceListRaw();
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()).map(RangeFromJSON));
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async post(
		range: api.model.Range,
	): Promise<api.result.Result<api.model.Range, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServicePostRaw({ body: RangeToJSON(range) });
			if (response.raw.status === 200) {
				return api.result.OK(RangeFromJSON(await response.value()));
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async postOpt(
		range?: api.model.Range,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServicePostOptRaw({
				body: range ? RangeToJSON(range) : undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async postNull(
		range: api.model.Range | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServicePostNullRaw({
				body: range ? RangeToJSON(range) : null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async postOptNull(
		range?: api.model.Range | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServicePostOptNullRaw({
				body: range ? RangeToJSON(range) : null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async postList(
		range: api.model.Range[],
	): Promise<api.result.Result<api.model.Range[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServicePostListRaw({
				requestBody: range.map(RangeToJSON),
			});
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()).map(RangeFromJSON));
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async postListOpt(
		range?: api.model.Range[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServicePostListOptRaw({
				requestBody: range ? range.map(RangeToJSON) : undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async postListNull(
		range: api.model.Range[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServicePostListNullRaw({
				requestBody: range ? range.map(RangeToJSON) : null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async postListOptNull(
		range?: api.model.Range[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServicePostListOptNullRaw({
				requestBody: range ? range.map(RangeToJSON) : null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async query(
		range: api.model.Range,
	): Promise<api.result.Result<api.model.Range, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceQueryRaw({ range: RangeToJSON(range) });
			if (response.raw.status === 200) {
				return api.result.OK(RangeFromJSON(await response.value()));
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async queryOpt(
		range?: api.model.Range,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceQueryOptRaw({
				range: range ? RangeToJSON(range) : undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async queryNull(
		range: api.model.Range | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceQueryNullRaw({
				range: range ? RangeToJSON(range) : null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async queryOptNull(
		range?: api.model.Range | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceQueryOptNullRaw({
				range: range ? RangeToJSON(range) : null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async queryList(
		range: api.model.Range[],
	): Promise<api.result.Result<api.model.Range[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceQueryListRaw({
				range: range.map(RangeToJSON),
			});
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()).map(RangeFromJSON));
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async queryListOpt(
		range?: api.model.Range[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceQueryListOptRaw({
				range: range ? range.map(RangeToJSON) : undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async queryListNull(
		range: api.model.Range[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceQueryListNullRaw({
				range: range ? range.map(RangeToJSON) : null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async queryListOptNull(
		range?: api.model.Range[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceQueryListOptNullRaw({
				range: range ? range.map(RangeToJSON) : null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async header(
		range: api.model.Range,
	): Promise<api.result.Result<api.model.Range, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceHeaderRaw({ range: RangeToJSON(range) });
			if (response.raw.status === 200) {
				return api.result.OK(RangeFromJSON(await response.value()));
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async headerOpt(
		range?: api.model.Range,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceHeaderOptRaw({
				range: range ? RangeToJSON(range) : undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async headerNull(
		range: api.model.Range | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceHeaderNullRaw({
				range: range ? RangeToJSON(range) : null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async headerOptNull(
		range?: api.model.Range | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceHeaderOptNullRaw({
				range: range ? RangeToJSON(range) : null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async headerList(
		range: api.model.Range[],
	): Promise<api.result.Result<api.model.Range[], api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceHeaderListRaw({
				range: range.map(RangeToJSON),
			});
			if (response.raw.status === 200) {
				return api.result.OK((await response.value()).map(RangeFromJSON));
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async headerListOpt(
		range?: api.model.Range[],
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceHeaderListOptRaw({
				range: range ? range.map(RangeToJSON) : undefined,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async headerListNull(
		range: api.model.Range[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceHeaderListNullRaw({
				range: range ? range.map(RangeToJSON) : null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async headerListOptNull(
		range?: api.model.Range[] | null,
	): Promise<api.result.Result<api.model.NilResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceHeaderListOptNullRaw({
				range: range ? range.map(RangeToJSON) : null,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async fail(): Promise<
		api.result.Result<
			api.result.VoidType,
			api.service.SampleErrorScalarSubError | api.service.StatusRSDError | api.service.NativeRSDError
		>
	> {
		try {
			const response = await this.delegate.scalarSubstitionServiceFailRaw();
			if (response.raw.status === 200) {
				return api.result.OK(Void);
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error: unknown) {
			if (error instanceof ResponseError) {
				if (error.response.status === 400) {
					const $data = await error.response.text();
					const $result = api.model.RangeFromJSON($data);
					const err = {
						_type: 'SampleErrorScalarSub',
						data: $result,
					} as const;

					return api.result.ERR(err);
				}
			}
			return api.result.ERR(toRSDError(error));
		}
	}

	async multiBody(
		valueA: api.model.Range,
		valueB: api.model.ZoneId,
	): Promise<api.result.Result<api.model.RSDString, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.scalarSubstitionServiceMultiBodyRaw({
				scalarSubstitionServiceMultiBodyRequest: {
					valueA: RangeToJSON(valueA),
					valueB,
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
}
