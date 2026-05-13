# BinaryTypesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**binaryTypesDownloadBlob**](BinaryTypesApi.md#binarytypesdownloadblob) | **GET** /api/binarytypes/downloadBlob |  |
| [**binaryTypesDownloadFile**](BinaryTypesApi.md#binarytypesdownloadfile) | **GET** /api/binarytypes/downloadFile |  |
| [**binaryTypesMixed**](BinaryTypesApi.md#binarytypesmixed) | **POST** /api/binarytypes/mixed/{pathString}/{pathNumber} |  |
| [**binaryTypesSingleBodyAddition**](BinaryTypesApi.md#binarytypessinglebodyaddition) | **POST** /api/binarytypes/singleBodyAddition |  |
| [**binaryTypesTwoBinariesAddition**](BinaryTypesApi.md#binarytypestwobinariesaddition) | **POST** /api/binarytypes/twoBinariesAddition |  |
| [**binaryTypesUploadBlob**](BinaryTypesApi.md#binarytypesuploadblob) | **POST** /api/binarytypes/uploadBlob |  |
| [**binaryTypesUploadBlobList**](BinaryTypesApi.md#binarytypesuploadbloblist) | **PUT** /api/binarytypes/uploadBlobList |  |
| [**binaryTypesUploadBlobListNil**](BinaryTypesApi.md#binarytypesuploadbloblistnil) | **PUT** /api/binarytypes/uploadBlobListNil |  |
| [**binaryTypesUploadBlobListOpt**](BinaryTypesApi.md#binarytypesuploadbloblistopt) | **PUT** /api/binarytypes/uploadBlobListOpt |  |
| [**binaryTypesUploadBlobListOptNil**](BinaryTypesApi.md#binarytypesuploadbloblistoptnil) | **PUT** /api/binarytypes/uploadBlobListOptNil |  |
| [**binaryTypesUploadBlobNil**](BinaryTypesApi.md#binarytypesuploadblobnil) | **POST** /api/binarytypes/uploadBlobNil |  |
| [**binaryTypesUploadBlobOpt**](BinaryTypesApi.md#binarytypesuploadblobopt) | **POST** /api/binarytypes/uploadBlobOpt |  |
| [**binaryTypesUploadBlobOptNil**](BinaryTypesApi.md#binarytypesuploadbloboptnil) | **POST** /api/binarytypes/uploadBlobOptNil |  |
| [**binaryTypesUploadFile**](BinaryTypesApi.md#binarytypesuploadfile) | **POST** /api/binarytypes/uploadFile |  |
| [**binaryTypesUploadFileList**](BinaryTypesApi.md#binarytypesuploadfilelist) | **PUT** /api/binarytypes/uploadFileList |  |
| [**binaryTypesUploadFileListNil**](BinaryTypesApi.md#binarytypesuploadfilelistnil) | **PUT** /api/binarytypes/uploadFileListNil |  |
| [**binaryTypesUploadFileListOpt**](BinaryTypesApi.md#binarytypesuploadfilelistopt) | **PUT** /api/binarytypes/uploadFileListOpt |  |
| [**binaryTypesUploadFileListOptNil**](BinaryTypesApi.md#binarytypesuploadfilelistoptnil) | **PUT** /api/binarytypes/uploadFileListOptNil |  |
| [**binaryTypesUploadFileNil**](BinaryTypesApi.md#binarytypesuploadfilenil) | **POST** /api/binarytypes/uploadFileNil |  |
| [**binaryTypesUploadFileOpt**](BinaryTypesApi.md#binarytypesuploadfileopt) | **POST** /api/binarytypes/uploadFileOpt |  |
| [**binaryTypesUploadFileOptNil**](BinaryTypesApi.md#binarytypesuploadfileoptnil) | **POST** /api/binarytypes/uploadFileOptNil |  |
| [**binaryTypesUploadMixed**](BinaryTypesApi.md#binarytypesuploadmixed) | **PUT** /api/binarytypes/uploadMixed |  |
| [**binaryTypesUploadMixedNil**](BinaryTypesApi.md#binarytypesuploadmixednil) | **PUT** /api/binarytypes/uploadMixedNil |  |
| [**binaryTypesUploadMixedOpt**](BinaryTypesApi.md#binarytypesuploadmixedopt) | **PUT** /api/binarytypes/uploadMixedOpt |  |
| [**binaryTypesUploadMixedOptNil**](BinaryTypesApi.md#binarytypesuploadmixedoptnil) | **PUT** /api/binarytypes/uploadMixedOptNil |  |



## binaryTypesDownloadBlob

> Blob binaryTypesDownloadBlob()





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesDownloadBlobRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  try {
    const data = await api.binaryTypesDownloadBlob();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

**Blob**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesDownloadFile

> Blob binaryTypesDownloadFile()





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesDownloadFileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  try {
    const data = await api.binaryTypesDownloadFile();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

**Blob**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesMixed

> binaryTypesMixed(pathString, pathNumber, headerString, headerNumber, headerRecord, queryString, queryNumber, queryRecord, xRSDParamContentType, dataBlob)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesMixedRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // string | 
    pathString: pathString_example,
    // number | 
    pathNumber: 8.14,
    // string | 
    headerString: headerString_example,
    // number | 
    headerNumber: 8.14,
    // string | 
    headerRecord: headerRecord_example,
    // string | 
    queryString: queryString_example,
    // number | 
    queryNumber: 8.14,
    // string | 
    queryRecord: queryRecord_example,
    // string | Contains the type information for record and union types transferred in headers as a base64 blob
    xRSDParamContentType: xRSDParamContentType_example,
    // Blob
    dataBlob: BINARY_DATA_HERE,
  } satisfies BinaryTypesMixedRequest;

  try {
    const data = await api.binaryTypesMixed(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **pathString** | `string` |  | [Defaults to `undefined`] |
| **pathNumber** | `number` |  | [Defaults to `undefined`] |
| **headerString** | `string` |  | [Defaults to `undefined`] |
| **headerNumber** | `number` |  | [Defaults to `undefined`] |
| **headerRecord** | `string` |  | [Defaults to `undefined`] |
| **queryString** | `string` |  | [Defaults to `undefined`] |
| **queryNumber** | `number` |  | [Defaults to `undefined`] |
| **queryRecord** | `string` |  | [Defaults to `undefined`] |
| **xRSDParamContentType** | `string` | Contains the type information for record and union types transferred in headers as a base64 blob | [Defaults to `undefined`] |
| **dataBlob** | `Blob` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesSingleBodyAddition

> binaryTypesSingleBodyAddition(dataBlob, rsdPayload)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesSingleBodyAdditionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Blob
    dataBlob: BINARY_DATA_HERE,
    // BinaryTypesSingleBodyAdditionRequestRsdPayload (optional)
    rsdPayload: ...,
  } satisfies BinaryTypesSingleBodyAdditionRequest;

  try {
    const data = await api.binaryTypesSingleBodyAddition(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **dataBlob** | `Blob` |  | [Defaults to `undefined`] |
| **rsdPayload** | [BinaryTypesSingleBodyAdditionRequestRsdPayload](BinaryTypesSingleBodyAdditionRequestRsdPayload.md) |  | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesTwoBinariesAddition

> binaryTypesTwoBinariesAddition(dataBlob, dataFile)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesTwoBinariesAdditionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Blob
    dataBlob: BINARY_DATA_HERE,
    // Blob
    dataFile: BINARY_DATA_HERE,
  } satisfies BinaryTypesTwoBinariesAdditionRequest;

  try {
    const data = await api.binaryTypesTwoBinariesAddition(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **dataBlob** | `Blob` |  | [Defaults to `undefined`] |
| **dataFile** | `Blob` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlob

> number binaryTypesUploadBlob(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadBlobRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Blob
    data: BINARY_DATA_HERE,
  } satisfies BinaryTypesUploadBlobRequest;

  try {
    const data = await api.binaryTypesUploadBlob(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Blob` |  | [Defaults to `undefined`] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlobList

> number binaryTypesUploadBlobList(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadBlobListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Array<Blob>
    data: /path/to/file.txt,
  } satisfies BinaryTypesUploadBlobListRequest;

  try {
    const data = await api.binaryTypesUploadBlobList(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Array<Blob>` |  | |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlobListNil

> number binaryTypesUploadBlobListNil(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadBlobListNilRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Array<Blob>
    data: /path/to/file.txt,
  } satisfies BinaryTypesUploadBlobListNilRequest;

  try {
    const data = await api.binaryTypesUploadBlobListNil(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Array<Blob>` |  | |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlobListOpt

> number binaryTypesUploadBlobListOpt(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadBlobListOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Array<Blob> (optional)
    data: /path/to/file.txt,
  } satisfies BinaryTypesUploadBlobListOptRequest;

  try {
    const data = await api.binaryTypesUploadBlobListOpt(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Array<Blob>` |  | [Optional] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlobListOptNil

> number binaryTypesUploadBlobListOptNil(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadBlobListOptNilRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Array<Blob> (optional)
    data: /path/to/file.txt,
  } satisfies BinaryTypesUploadBlobListOptNilRequest;

  try {
    const data = await api.binaryTypesUploadBlobListOptNil(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Array<Blob>` |  | [Optional] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlobNil

> number binaryTypesUploadBlobNil(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadBlobNilRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Blob
    data: BINARY_DATA_HERE,
  } satisfies BinaryTypesUploadBlobNilRequest;

  try {
    const data = await api.binaryTypesUploadBlobNil(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Blob` |  | [Defaults to `undefined`] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlobOpt

> number binaryTypesUploadBlobOpt(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadBlobOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Blob (optional)
    data: BINARY_DATA_HERE,
  } satisfies BinaryTypesUploadBlobOptRequest;

  try {
    const data = await api.binaryTypesUploadBlobOpt(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Blob` |  | [Optional] [Defaults to `undefined`] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlobOptNil

> number binaryTypesUploadBlobOptNil(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadBlobOptNilRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Blob (optional)
    data: BINARY_DATA_HERE,
  } satisfies BinaryTypesUploadBlobOptNilRequest;

  try {
    const data = await api.binaryTypesUploadBlobOptNil(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Blob` |  | [Optional] [Defaults to `undefined`] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFile

> number binaryTypesUploadFile(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadFileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Blob
    data: BINARY_DATA_HERE,
  } satisfies BinaryTypesUploadFileRequest;

  try {
    const data = await api.binaryTypesUploadFile(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Blob` |  | [Defaults to `undefined`] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFileList

> number binaryTypesUploadFileList(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadFileListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Array<Blob>
    data: /path/to/file.txt,
  } satisfies BinaryTypesUploadFileListRequest;

  try {
    const data = await api.binaryTypesUploadFileList(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Array<Blob>` |  | |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFileListNil

> number binaryTypesUploadFileListNil(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadFileListNilRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Array<Blob>
    data: /path/to/file.txt,
  } satisfies BinaryTypesUploadFileListNilRequest;

  try {
    const data = await api.binaryTypesUploadFileListNil(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Array<Blob>` |  | |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFileListOpt

> number binaryTypesUploadFileListOpt(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadFileListOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Array<Blob> (optional)
    data: /path/to/file.txt,
  } satisfies BinaryTypesUploadFileListOptRequest;

  try {
    const data = await api.binaryTypesUploadFileListOpt(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Array<Blob>` |  | [Optional] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFileListOptNil

> number binaryTypesUploadFileListOptNil(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadFileListOptNilRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Array<Blob> (optional)
    data: /path/to/file.txt,
  } satisfies BinaryTypesUploadFileListOptNilRequest;

  try {
    const data = await api.binaryTypesUploadFileListOptNil(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Array<Blob>` |  | [Optional] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFileNil

> number binaryTypesUploadFileNil(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadFileNilRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Blob
    data: BINARY_DATA_HERE,
  } satisfies BinaryTypesUploadFileNilRequest;

  try {
    const data = await api.binaryTypesUploadFileNil(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Blob` |  | [Defaults to `undefined`] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFileOpt

> number binaryTypesUploadFileOpt(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadFileOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Blob (optional)
    data: BINARY_DATA_HERE,
  } satisfies BinaryTypesUploadFileOptRequest;

  try {
    const data = await api.binaryTypesUploadFileOpt(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Blob` |  | [Optional] [Defaults to `undefined`] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFileOptNil

> number binaryTypesUploadFileOptNil(data)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadFileOptNilRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Blob (optional)
    data: BINARY_DATA_HERE,
  } satisfies BinaryTypesUploadFileOptNilRequest;

  try {
    const data = await api.binaryTypesUploadFileOptNil(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **data** | `Blob` |  | [Optional] [Defaults to `undefined`] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadMixed

> UploadMixedResult binaryTypesUploadMixed(dataFile, dataBlob, rsdPayload)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadMixedRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Blob
    dataFile: BINARY_DATA_HERE,
    // Blob
    dataBlob: BINARY_DATA_HERE,
    // BinaryTypesUploadMixedRequestRsdPayload (optional)
    rsdPayload: ...,
  } satisfies BinaryTypesUploadMixedRequest;

  try {
    const data = await api.binaryTypesUploadMixed(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **dataFile** | `Blob` |  | [Defaults to `undefined`] |
| **dataBlob** | `Blob` |  | [Defaults to `undefined`] |
| **rsdPayload** | [BinaryTypesUploadMixedRequestRsdPayload](BinaryTypesUploadMixedRequestRsdPayload.md) |  | [Optional] [Defaults to `undefined`] |

### Return type

[**UploadMixedResult**](UploadMixedResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadMixedNil

> UploadMixedResult binaryTypesUploadMixedNil(dataFile, dataBlob, rsdPayload)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadMixedNilRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Blob
    dataFile: BINARY_DATA_HERE,
    // Blob
    dataBlob: BINARY_DATA_HERE,
    // BinaryTypesUploadMixedNilRequestRsdPayload (optional)
    rsdPayload: ...,
  } satisfies BinaryTypesUploadMixedNilRequest;

  try {
    const data = await api.binaryTypesUploadMixedNil(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **dataFile** | `Blob` |  | [Defaults to `undefined`] |
| **dataBlob** | `Blob` |  | [Defaults to `undefined`] |
| **rsdPayload** | [BinaryTypesUploadMixedNilRequestRsdPayload](BinaryTypesUploadMixedNilRequestRsdPayload.md) |  | [Optional] [Defaults to `undefined`] |

### Return type

[**UploadMixedResult**](UploadMixedResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadMixedOpt

> UploadMixedResult binaryTypesUploadMixedOpt(dataFile, dataBlob, rsdPayload)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadMixedOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Blob (optional)
    dataFile: BINARY_DATA_HERE,
    // Blob (optional)
    dataBlob: BINARY_DATA_HERE,
    // BinaryTypesUploadMixedOptRequestRsdPayload (optional)
    rsdPayload: ...,
  } satisfies BinaryTypesUploadMixedOptRequest;

  try {
    const data = await api.binaryTypesUploadMixedOpt(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **dataFile** | `Blob` |  | [Optional] [Defaults to `undefined`] |
| **dataBlob** | `Blob` |  | [Optional] [Defaults to `undefined`] |
| **rsdPayload** | [BinaryTypesUploadMixedOptRequestRsdPayload](BinaryTypesUploadMixedOptRequestRsdPayload.md) |  | [Optional] [Defaults to `undefined`] |

### Return type

[**UploadMixedResult**](UploadMixedResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadMixedOptNil

> UploadMixedResult binaryTypesUploadMixedOptNil(dataFile, dataBlob, rsdPayload)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadMixedOptNilRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // Blob (optional)
    dataFile: BINARY_DATA_HERE,
    // Blob (optional)
    dataBlob: BINARY_DATA_HERE,
    // BinaryTypesUploadMixedOptNilRequestRsdPayload (optional)
    rsdPayload: ...,
  } satisfies BinaryTypesUploadMixedOptNilRequest;

  try {
    const data = await api.binaryTypesUploadMixedOptNil(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **dataFile** | `Blob` |  | [Optional] [Defaults to `undefined`] |
| **dataBlob** | `Blob` |  | [Optional] [Defaults to `undefined`] |
| **rsdPayload** | [BinaryTypesUploadMixedOptNilRequestRsdPayload](BinaryTypesUploadMixedOptNilRequestRsdPayload.md) |  | [Optional] [Defaults to `undefined`] |

### Return type

[**UploadMixedResult**](UploadMixedResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

