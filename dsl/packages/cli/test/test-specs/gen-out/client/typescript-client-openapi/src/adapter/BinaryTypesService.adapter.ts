import { api } from '../../../typescript-client/src/index.js';
import { encodeBase64, ServiceProps } from '../../../typescript-client/src/services/_fetch-type-utils.js';
import { BinaryTypesApi } from '../apis/BinaryTypesApi.js';
import { Configuration, ResponseError } from '../runtime.js';

export function createOpenAPIBinaryTypesService(
	config: ServiceProps<api.service.ErrorType>,
): api.service.BinaryTypesService {
	return new BinaryTypesServiceImpl(config);
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

class BinaryTypesServiceImpl implements api.service.BinaryTypesService {
	private delegate: BinaryTypesApi;

	constructor(config: ServiceProps<api.service.ErrorType>) {
		this.delegate = new BinaryTypesApi(
			new Configuration({
				basePath: config.baseUrl,
			}),
		);
	}

	async uploadFile(
		data: File,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadFileRaw({ data });
			if (response.raw.status === 201) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadFileOpt(
		data?: File,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadFileOptRaw({ data });
			if (response.raw.status === 201) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadFileNil(
		data: File | null,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadFileNilRaw({ data });
			if (response.raw.status === 201) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadFileOptNil(
		data?: File | null,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadFileOptNilRaw({ data });
			if (response.raw.status === 201) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadBlob(
		data: Blob,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadBlobRaw({ data });
			if (response.raw.status === 201) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadBlobOpt(
		data?: Blob,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadBlobOptRaw({ data });
			if (response.raw.status === 201) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadBlobNil(
		data: Blob | null,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadBlobNilRaw({ data });
			if (response.raw.status === 201) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadBlobOptNil(
		data?: Blob | null,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadBlobOptNilRaw({ data });
			if (response.raw.status === 201) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadFileList(
		data: File[],
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadFileListRaw({ data });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadFileListOpt(
		data?: File[],
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadFileListOptRaw({ data });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadFileListNil(
		data: File[] | null,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadFileListNilRaw({ data });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadFileListOptNil(
		data?: File[] | null,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadFileListOptNilRaw({ data });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadBlobList(
		data: Blob[],
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadBlobListRaw({ data });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadBlobListOpt(
		data?: Blob[],
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadBlobListOptRaw({ data });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadBlobListNil(
		data: Blob[] | null,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadBlobListNilRaw({ data });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadBlobListOptNil(
		data?: Blob[] | null,
	): Promise<api.result.Result<number, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadBlobListOptNilRaw({ data });
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadMixed(
		text: string,
		number: number,
		rec: api.model.SimpleRecord,
		textList: string[],
		numberList: number[],
		recList: api.model.SimpleRecord[],
		dataFile: File,
		dataBlob: Blob,
	): Promise<api.result.Result<api.model.UploadMixedResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadMixedRaw({
				rsdPayload: {
					text,
					number,
					rec,
					textList,
					numberList,
					recList,
				},
				dataFile,
				dataBlob,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async uploadMixedOpt(
		text?: string,
		number?: number,
		rec?: api.model.SimpleRecord,
		textList?: string[],
		numberList?: number[],
		recList?: api.model.SimpleRecord[],
		dataFile?: File,
		dataBlob?: Blob,
	): Promise<api.result.Result<api.model.UploadMixedResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadMixedOptRaw({
				rsdPayload: {
					text,
					number,
					rec,
					textList,
					numberList,
					recList,
				},
				dataFile,
				dataBlob,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async uploadMixedNil(
		text: string | null,
		number: number | null,
		rec: api.model.SimpleRecord | null,
		textList: string[] | null,
		numberList: number[] | null,
		recList: api.model.SimpleRecord[] | null,
		dataFile: File | null,
		dataBlob: Blob | null,
	): Promise<api.result.Result<api.model.UploadMixedResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadMixedNilRaw({
				rsdPayload: {
					text,
					number,
					rec,
					textList,
					numberList,
					recList,
				},
				dataFile,
				dataBlob,
			});
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async uploadMixedOptNil(
		text?: string | null,
		number?: number | null,
		rec?: api.model.SimpleRecord | null,
		textList?: string[] | null,
		numberList?: number[] | null,
		recList?: api.model.SimpleRecord[] | null,
		dataFile?: File | null,
		dataBlob?: Blob | null,
	): Promise<api.result.Result<api.model.UploadMixedResult, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesUploadMixedOptNilRaw({
				rsdPayload: {
					text,
					number,
					rec,
					textList,
					numberList,
					recList,
				},
				dataFile,
				dataBlob,
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
		queryString: string,
		queryNumber: number,
		queryRecord: api.model.SimpleRecord,
		dataBlob: Blob,
	): Promise<api.result.Result<api.result.VoidType, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesMixedRaw({
				pathString,
				pathNumber,
				headerString,
				headerNumber,
				headerRecord: encodeBase64(JSON.stringify(headerRecord)),
				queryString,
				queryNumber,
				queryRecord: encodeBase64(JSON.stringify(queryRecord)),
				dataBlob,
				xRSDParamContentType: 'application/json',
			});
			if (response.raw.status === 200) {
				return api.result.OK(api.result.Void);
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async singleBodyAddition(
		name: string,
		dataBlob: Blob,
	): Promise<api.result.Result<api.result.VoidType, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesSingleBodyAdditionRaw({
				rsdPayload: {
					name,
				},
				dataBlob,
			});
			if (response.raw.status === 200) {
				return api.result.OK(api.result.Void);
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
	async twoBinariesAddition(
		dataBlob: Blob,
		dataFile: File,
	): Promise<api.result.Result<api.result.VoidType, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesTwoBinariesAdditionRaw({
				dataBlob,
				dataFile,
			});
			if (response.raw.status === 200) {
				return api.result.OK(api.result.Void);
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async downloadFile(): Promise<api.result.Result<File, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesDownloadFileRaw();
			if (response.raw.status === 200) {
				let fileName = 'unknown';
				const dispoHeader = response.raw.headers.get('Content-Disposition');
				if (dispoHeader?.includes('filename=')) {
					const fileNameWithQuotes = dispoHeader.substring(dispoHeader.indexOf('filename=') + 'filename='.length);
					fileName = fileNameWithQuotes.substring(1, fileNameWithQuotes.length - 1);
				}

				const blob = await response.value();
				return api.result.OK(new File([blob], fileName, { type: blob.type }));
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}

	async downloadBlob(): Promise<api.result.Result<Blob, api.service.StatusRSDError | api.service.NativeRSDError>> {
		try {
			const response = await this.delegate.binaryTypesDownloadBlobRaw();
			if (response.raw.status === 200) {
				return api.result.OK(await response.value());
			}
			return api.result.ERR(toRSDError(new ResponseError(response.raw, await response.raw.text())));
		} catch (error) {
			return api.result.ERR(toRSDError(error));
		}
	}
}
