# BinaryTypesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**binaryTypesDownloadBlob**](BinaryTypesApi.md#binarytypesdownloadblob) | **GET** /api/binarytypes/downloadBlob |  |
| [**binaryTypesDownloadFile**](BinaryTypesApi.md#binarytypesdownloadfile) | **GET** /api/binarytypes/downloadFile |  |
| [**binaryTypesMixed**](BinaryTypesApi.md#binarytypesmixed) | **POST** /api/binarytypes/mixed/{pathString}/{pathNumber} |  |
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
| [**binaryTypesUploadMixed**](BinaryTypesApi.md#binarytypesuploadmixedoperation) | **PUT** /api/binarytypes/uploadMixed |  |
| [**binaryTypesUploadMixedNil**](BinaryTypesApi.md#binarytypesuploadmixedniloperation) | **PUT** /api/binarytypes/uploadMixedNil |  |
| [**binaryTypesUploadMixedOpt**](BinaryTypesApi.md#binarytypesuploadmixedoptoperation) | **PUT** /api/binarytypes/uploadMixedOpt |  |
| [**binaryTypesUploadMixedOptNil**](BinaryTypesApi.md#binarytypesuploadmixedoptniloperation) | **PUT** /api/binarytypes/uploadMixedOptNil |  |



## binaryTypesDownloadBlob

> any binaryTypesDownloadBlob()





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

**any**

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

> any binaryTypesDownloadFile()





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

**any**

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

> binaryTypesMixed(pathString, pathNumber, headerString, headerNumber, headerRecord, queryString, queryNumber, queryRecord, xRSDParamContentType, body)





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
    // any
    body: ...,
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
| **body** | `any` |  | |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlob

> number binaryTypesUploadBlob(body)





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
    // any
    body: ...,
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
| **body** | `any` |  | |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlobList

> number binaryTypesUploadBlobList(body)





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
    // any
    body: ...,
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
| **body** | `any` |  | |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlobListNil

> number binaryTypesUploadBlobListNil(body)





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
    // any
    body: ...,
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
| **body** | `any` |  | |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlobListOpt

> number binaryTypesUploadBlobListOpt(body)





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
    // any (optional)
    body: ...,
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
| **body** | `any` |  | [Optional] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlobListOptNil

> number binaryTypesUploadBlobListOptNil(body)





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
    // any (optional)
    body: ...,
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
| **body** | `any` |  | [Optional] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlobNil

> number binaryTypesUploadBlobNil(body)





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
    // any
    body: ...,
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
| **body** | `any` |  | |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlobOpt

> number binaryTypesUploadBlobOpt(body)





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
    // any (optional)
    body: ...,
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
| **body** | `any` |  | [Optional] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadBlobOptNil

> number binaryTypesUploadBlobOptNil(body)





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
    // any (optional)
    body: ...,
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
| **body** | `any` |  | [Optional] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFile

> number binaryTypesUploadFile(body)





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
    // any
    body: ...,
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
| **body** | `any` |  | |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFileList

> number binaryTypesUploadFileList(body)





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
    // any
    body: ...,
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
| **body** | `any` |  | |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFileListNil

> number binaryTypesUploadFileListNil(body)





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
    // any
    body: ...,
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
| **body** | `any` |  | |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFileListOpt

> number binaryTypesUploadFileListOpt(body)





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
    // any (optional)
    body: ...,
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
| **body** | `any` |  | [Optional] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFileListOptNil

> number binaryTypesUploadFileListOptNil(body)





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
    // any (optional)
    body: ...,
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
| **body** | `any` |  | [Optional] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFileNil

> number binaryTypesUploadFileNil(body)





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
    // any
    body: ...,
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
| **body** | `any` |  | |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFileOpt

> number binaryTypesUploadFileOpt(body)





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
    // any (optional)
    body: ...,
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
| **body** | `any` |  | [Optional] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadFileOptNil

> number binaryTypesUploadFileOptNil(body)





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
    // any (optional)
    body: ...,
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
| **body** | `any` |  | [Optional] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadMixed

> UploadMixedResult binaryTypesUploadMixed(binaryTypesUploadMixedRequest)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadMixedOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // BinaryTypesUploadMixedRequest
    binaryTypesUploadMixedRequest: ...,
  } satisfies BinaryTypesUploadMixedOperationRequest;

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
| **binaryTypesUploadMixedRequest** | [BinaryTypesUploadMixedRequest](BinaryTypesUploadMixedRequest.md) |  | |

### Return type

[**UploadMixedResult**](UploadMixedResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadMixedNil

> UploadMixedResult binaryTypesUploadMixedNil(binaryTypesUploadMixedNilRequest)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadMixedNilOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // BinaryTypesUploadMixedNilRequest
    binaryTypesUploadMixedNilRequest: ...,
  } satisfies BinaryTypesUploadMixedNilOperationRequest;

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
| **binaryTypesUploadMixedNilRequest** | [BinaryTypesUploadMixedNilRequest](BinaryTypesUploadMixedNilRequest.md) |  | |

### Return type

[**UploadMixedResult**](UploadMixedResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadMixedOpt

> UploadMixedResult binaryTypesUploadMixedOpt(binaryTypesUploadMixedOptRequest)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadMixedOptOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // BinaryTypesUploadMixedOptRequest
    binaryTypesUploadMixedOptRequest: ...,
  } satisfies BinaryTypesUploadMixedOptOperationRequest;

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
| **binaryTypesUploadMixedOptRequest** | [BinaryTypesUploadMixedOptRequest](BinaryTypesUploadMixedOptRequest.md) |  | |

### Return type

[**UploadMixedResult**](UploadMixedResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## binaryTypesUploadMixedOptNil

> UploadMixedResult binaryTypesUploadMixedOptNil(binaryTypesUploadMixedOptNilRequest)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { BinaryTypesUploadMixedOptNilOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // BinaryTypesUploadMixedOptNilRequest
    binaryTypesUploadMixedOptNilRequest: ...,
  } satisfies BinaryTypesUploadMixedOptNilOperationRequest;

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
| **binaryTypesUploadMixedOptNilRequest** | [BinaryTypesUploadMixedOptNilRequest](BinaryTypesUploadMixedOptNilRequest.md) |  | |

### Return type

[**UploadMixedResult**](UploadMixedResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

