import { api } from '../../test-specs/gen-out/client/typescript-client/src/index.js';
import {
	RSDBooleanFromJSON,
	RSDDoubleFromJSON,
	RSDFloatFromJSON,
	RSDIntFromJSON,
	RSDLocalDateFromJSON,
	RSDLocalDateTimeFromJSON,
	RSDLocalTimeFromJSON,
	RSDLongFromJSON,
	RSDOffsetDateTimeFromJSON,
	RSDShortFromJSON,
	RSDStringFromJSON,
	RSDZonedDateTimeFromJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/_Builtins.js';
import { RangeFromJSON } from '../../test-specs/gen-out/client/typescript-client/src/model/_Scalars.js';
import { ServiceProps } from '../../test-specs/gen-out/client/typescript-client/src/services/_fetch-type-utils.js';
import { ListStreamingServiceApi } from '../../test-specs/gen-out/client/typescript-client-openapi/src/apis/ListStreamingServiceApi.js';
import {
	Configuration,
	ResponseError,
	type ApiResponse,
} from '../../test-specs/gen-out/client/typescript-client-openapi/src/runtime.js';

export function createOpenAPIListStreamingServiceService(
	config: ServiceProps<api.service.ErrorType>,
): api.service.ListStreamingServiceService {
	return new ListStreamingServiceServiceImpl(config);
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

type StreamCallbacks<T> = {
	value: (value: T) => void;
	error: (error: api.service.StatusRSDError | api.service.NativeRSDError) => void;
	final: () => void;
};

class ListStreamingServiceServiceImpl implements api.service.ListStreamingServiceService {
	private delegate: ListStreamingServiceApi;

	constructor(config: ServiceProps<api.service.ErrorType>) {
		this.delegate = new ListStreamingServiceApi(
			new Configuration({
				basePath: config.baseUrl,
			}),
		);
	}

	// OpenAPI has no streaming primitive, so the complete-array response (the same
	// one described as "application/json" in the generated spec) is fetched in one
	// shot and replayed element-by-element through the streaming callbacks.
	private async runArrayAsStream<Raw, T>(
		fetchArray: () => Promise<ApiResponse<Raw[]>>,
		convert: (value: Raw) => T,
		callbacks: StreamCallbacks<T>,
	): Promise<void> {
		try {
			const response = await fetchArray();
			if (response.raw.status === 200) {
				(await response.value()).forEach(item => {
					callbacks.value(convert(item));
				});
			} else {
				callbacks.error(toRSDError(new ResponseError(response.raw, await response.raw.text())));
			}
		} catch (error) {
			callbacks.error(toRSDError(error));
		} finally {
			callbacks.final();
		}
	}

	async streamBoolean(callbacks: StreamCallbacks<api.model.RSDBoolean>): Promise<void> {
		return this.runArrayAsStream(
			() => this.delegate.listStreamingServiceStreamBooleanRaw(),
			RSDBooleanFromJSON,
			callbacks,
		);
	}

	async streamShort(callbacks: StreamCallbacks<api.model.RSDShort>): Promise<void> {
		return this.runArrayAsStream(() => this.delegate.listStreamingServiceStreamShortRaw(), RSDShortFromJSON, callbacks);
	}

	async streamInt(callbacks: StreamCallbacks<api.model.RSDInt>): Promise<void> {
		return this.runArrayAsStream(() => this.delegate.listStreamingServiceStreamIntRaw(), RSDIntFromJSON, callbacks);
	}

	async streamLong(callbacks: StreamCallbacks<api.model.RSDLong>): Promise<void> {
		return this.runArrayAsStream(() => this.delegate.listStreamingServiceStreamLongRaw(), RSDLongFromJSON, callbacks);
	}

	async streamFloat(callbacks: StreamCallbacks<api.model.RSDFloat>): Promise<void> {
		return this.runArrayAsStream(() => this.delegate.listStreamingServiceStreamFloatRaw(), RSDFloatFromJSON, callbacks);
	}

	async streamDouble(callbacks: StreamCallbacks<api.model.RSDDouble>): Promise<void> {
		return this.runArrayAsStream(
			() => this.delegate.listStreamingServiceStreamDoubleRaw(),
			RSDDoubleFromJSON,
			callbacks,
		);
	}

	async streamString(callbacks: StreamCallbacks<api.model.RSDString>): Promise<void> {
		return this.runArrayAsStream(
			() => this.delegate.listStreamingServiceStreamStringRaw(),
			RSDStringFromJSON,
			callbacks,
		);
	}

	async streamLocalDate(callbacks: StreamCallbacks<api.model.RSDLocalDate>): Promise<void> {
		return this.runArrayAsStream(
			() => this.delegate.listStreamingServiceStreamLocalDateRaw(),
			// OpenAPI Generator inappropriately types date-only values as `Date`, so we need to cast it back to string
			item => RSDLocalDateFromJSON(item as unknown as string),
			callbacks,
		);
	}

	async streamLocalDateTime(callbacks: StreamCallbacks<api.model.RSDLocalDateTime>): Promise<void> {
		return this.runArrayAsStream(
			() => this.delegate.listStreamingServiceStreamLocalDateTimeRaw(),
			RSDLocalDateTimeFromJSON,
			callbacks,
		);
	}

	async streamLocalTime(callbacks: StreamCallbacks<api.model.RSDLocalTime>): Promise<void> {
		return this.runArrayAsStream(
			() => this.delegate.listStreamingServiceStreamLocalTimeRaw(),
			RSDLocalTimeFromJSON,
			callbacks,
		);
	}

	async streamOffsetDateTime(callbacks: StreamCallbacks<api.model.RSDOffsetDateTime>): Promise<void> {
		return this.runArrayAsStream(
			() => this.delegate.listStreamingServiceStreamOffsetDateTimeRaw(),
			// OpenAPI Generator inappropriately types date-time values as `Date`, so we need to cast it back to string
			item => RSDOffsetDateTimeFromJSON(item as unknown as string),
			callbacks,
		);
	}

	async streamZonedDateTime(callbacks: StreamCallbacks<api.model.RSDZonedDateTime>): Promise<void> {
		return this.runArrayAsStream(
			() => this.delegate.listStreamingServiceStreamZonedDateTimeRaw(),
			RSDZonedDateTimeFromJSON,
			callbacks,
		);
	}

	async streamScalar(callbacks: StreamCallbacks<api.model.Range>): Promise<void> {
		return this.runArrayAsStream(() => this.delegate.listStreamingServiceStreamScalarRaw(), RangeFromJSON, callbacks);
	}

	async streamEnum(callbacks: StreamCallbacks<api.model.SampleEnum>): Promise<void> {
		return this.runArrayAsStream(
			() => this.delegate.listStreamingServiceStreamEnumRaw(),
			value => value,
			callbacks,
		);
	}

	async streamInlineEnum(callbacks: StreamCallbacks<'A' | 'B'>): Promise<void> {
		return this.runArrayAsStream(
			() => this.delegate.listStreamingServiceStreamInlineEnumRaw(),
			value => value as 'A' | 'B',
			callbacks,
		);
	}

	async streamRecord(callbacks: StreamCallbacks<api.model.SimpleRecord>): Promise<void> {
		return this.runArrayAsStream(
			() => this.delegate.listStreamingServiceStreamRecordRaw(),
			value => value,
			callbacks,
		);
	}

	async streamUnion(callbacks: StreamCallbacks<api.model.Union>): Promise<void> {
		return this.runArrayAsStream(
			() => this.delegate.listStreamingServiceStreamUnionRaw(),
			// OpenAPI Generator discriminates unions with a `type` field, RSD's own model with `@type`.
			value =>
				value.type === 'union-a'
					? ({ shared: value.shared, valueA: value.valueA, '@type': 'union-a' } as const)
					: ({ shared: value.shared, valueB: value.valueB, '@type': 'union-b' } as const),
			callbacks,
		);
	}

	async uploadFileStreamRecords(callbacks: StreamCallbacks<api.model.SimpleRecord>, data: File): Promise<void> {
		return this.runArrayAsStream(
			() => this.delegate.listStreamingServiceUploadFileStreamRecordsRaw({ data }),
			value => value,
			callbacks,
		);
	}
}
