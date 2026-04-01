# BinaryTypesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiBinarytypesDownloadBlobGet**](BinaryTypesApi.md#apibinarytypesdownloadblobget) | **GET** /api/binarytypes/downloadBlob |  |
| [**apiBinarytypesDownloadFileGet**](BinaryTypesApi.md#apibinarytypesdownloadfileget) | **GET** /api/binarytypes/downloadFile |  |
| [**apiBinarytypesMixedPathStringPathNumberPost**](BinaryTypesApi.md#apibinarytypesmixedpathstringpathnumberpost) | **POST** /api/binarytypes/mixed/{pathString}/{pathNumber} |  |
| [**apiBinarytypesUploadBlobListNilPut**](BinaryTypesApi.md#apibinarytypesuploadbloblistnilput) | **PUT** /api/binarytypes/uploadBlobListNil |  |
| [**apiBinarytypesUploadBlobListOptNilPut**](BinaryTypesApi.md#apibinarytypesuploadbloblistoptnilput) | **PUT** /api/binarytypes/uploadBlobListOptNil |  |
| [**apiBinarytypesUploadBlobListOptPut**](BinaryTypesApi.md#apibinarytypesuploadbloblistoptput) | **PUT** /api/binarytypes/uploadBlobListOpt |  |
| [**apiBinarytypesUploadBlobListPut**](BinaryTypesApi.md#apibinarytypesuploadbloblistput) | **PUT** /api/binarytypes/uploadBlobList |  |
| [**apiBinarytypesUploadBlobNilPost**](BinaryTypesApi.md#apibinarytypesuploadblobnilpost) | **POST** /api/binarytypes/uploadBlobNil |  |
| [**apiBinarytypesUploadBlobOptNilPost**](BinaryTypesApi.md#apibinarytypesuploadbloboptnilpost) | **POST** /api/binarytypes/uploadBlobOptNil |  |
| [**apiBinarytypesUploadBlobOptPost**](BinaryTypesApi.md#apibinarytypesuploadbloboptpost) | **POST** /api/binarytypes/uploadBlobOpt |  |
| [**apiBinarytypesUploadBlobPost**](BinaryTypesApi.md#apibinarytypesuploadblobpost) | **POST** /api/binarytypes/uploadBlob |  |
| [**apiBinarytypesUploadFileListNilPut**](BinaryTypesApi.md#apibinarytypesuploadfilelistnilput) | **PUT** /api/binarytypes/uploadFileListNil |  |
| [**apiBinarytypesUploadFileListOptNilPut**](BinaryTypesApi.md#apibinarytypesuploadfilelistoptnilput) | **PUT** /api/binarytypes/uploadFileListOptNil |  |
| [**apiBinarytypesUploadFileListOptPut**](BinaryTypesApi.md#apibinarytypesuploadfilelistoptput) | **PUT** /api/binarytypes/uploadFileListOpt |  |
| [**apiBinarytypesUploadFileListPut**](BinaryTypesApi.md#apibinarytypesuploadfilelistput) | **PUT** /api/binarytypes/uploadFileList |  |
| [**apiBinarytypesUploadFileNilPost**](BinaryTypesApi.md#apibinarytypesuploadfilenilpost) | **POST** /api/binarytypes/uploadFileNil |  |
| [**apiBinarytypesUploadFileOptNilPost**](BinaryTypesApi.md#apibinarytypesuploadfileoptnilpost) | **POST** /api/binarytypes/uploadFileOptNil |  |
| [**apiBinarytypesUploadFileOptPost**](BinaryTypesApi.md#apibinarytypesuploadfileoptpost) | **POST** /api/binarytypes/uploadFileOpt |  |
| [**apiBinarytypesUploadFilePost**](BinaryTypesApi.md#apibinarytypesuploadfilepost) | **POST** /api/binarytypes/uploadFile |  |
| [**apiBinarytypesUploadMixedNilPut**](BinaryTypesApi.md#apibinarytypesuploadmixednilput) | **PUT** /api/binarytypes/uploadMixedNil |  |
| [**apiBinarytypesUploadMixedOptNilPut**](BinaryTypesApi.md#apibinarytypesuploadmixedoptnilput) | **PUT** /api/binarytypes/uploadMixedOptNil |  |
| [**apiBinarytypesUploadMixedOptPut**](BinaryTypesApi.md#apibinarytypesuploadmixedoptput) | **PUT** /api/binarytypes/uploadMixedOpt |  |
| [**apiBinarytypesUploadMixedPut**](BinaryTypesApi.md#apibinarytypesuploadmixedputoperation) | **PUT** /api/binarytypes/uploadMixed |  |



## apiBinarytypesDownloadBlobGet

> any apiBinarytypesDownloadBlobGet()





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesDownloadBlobGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  try {
    const data = await api.apiBinarytypesDownloadBlobGet();
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


## apiBinarytypesDownloadFileGet

> any apiBinarytypesDownloadFileGet()





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesDownloadFileGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  try {
    const data = await api.apiBinarytypesDownloadFileGet();
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


## apiBinarytypesMixedPathStringPathNumberPost

> apiBinarytypesMixedPathStringPathNumberPost(pathString, pathNumber, headerString, headerNumber, headerRecord, queryString, queryNumber, queryRecord, body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesMixedPathStringPathNumberPostRequest } from '';

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
    // SimpleRecord | 
    headerRecord: ...,
    // string | 
    queryString: queryString_example,
    // number | 
    queryNumber: 8.14,
    // SimpleRecord | 
    queryRecord: ...,
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesMixedPathStringPathNumberPostRequest;

  try {
    const data = await api.apiBinarytypesMixedPathStringPathNumberPost(body);
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
| **headerRecord** | [](.md) |  | [Defaults to `undefined`] |
| **queryString** | `string` |  | [Defaults to `undefined`] |
| **queryNumber** | `number` |  | [Defaults to `undefined`] |
| **queryRecord** | [](.md) |  | [Defaults to `undefined`] |
| **body** | `any` |  | [Optional] |

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


## apiBinarytypesUploadBlobListNilPut

> number apiBinarytypesUploadBlobListNilPut(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadBlobListNilPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadBlobListNilPutRequest;

  try {
    const data = await api.apiBinarytypesUploadBlobListNilPut(body);
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


## apiBinarytypesUploadBlobListOptNilPut

> number apiBinarytypesUploadBlobListOptNilPut(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadBlobListOptNilPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadBlobListOptNilPutRequest;

  try {
    const data = await api.apiBinarytypesUploadBlobListOptNilPut(body);
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


## apiBinarytypesUploadBlobListOptPut

> number apiBinarytypesUploadBlobListOptPut(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadBlobListOptPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadBlobListOptPutRequest;

  try {
    const data = await api.apiBinarytypesUploadBlobListOptPut(body);
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


## apiBinarytypesUploadBlobListPut

> number apiBinarytypesUploadBlobListPut(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadBlobListPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadBlobListPutRequest;

  try {
    const data = await api.apiBinarytypesUploadBlobListPut(body);
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


## apiBinarytypesUploadBlobNilPost

> number apiBinarytypesUploadBlobNilPost(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadBlobNilPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadBlobNilPostRequest;

  try {
    const data = await api.apiBinarytypesUploadBlobNilPost(body);
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


## apiBinarytypesUploadBlobOptNilPost

> number apiBinarytypesUploadBlobOptNilPost(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadBlobOptNilPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadBlobOptNilPostRequest;

  try {
    const data = await api.apiBinarytypesUploadBlobOptNilPost(body);
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


## apiBinarytypesUploadBlobOptPost

> number apiBinarytypesUploadBlobOptPost(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadBlobOptPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadBlobOptPostRequest;

  try {
    const data = await api.apiBinarytypesUploadBlobOptPost(body);
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


## apiBinarytypesUploadBlobPost

> number apiBinarytypesUploadBlobPost(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadBlobPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadBlobPostRequest;

  try {
    const data = await api.apiBinarytypesUploadBlobPost(body);
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


## apiBinarytypesUploadFileListNilPut

> number apiBinarytypesUploadFileListNilPut(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadFileListNilPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadFileListNilPutRequest;

  try {
    const data = await api.apiBinarytypesUploadFileListNilPut(body);
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


## apiBinarytypesUploadFileListOptNilPut

> number apiBinarytypesUploadFileListOptNilPut(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadFileListOptNilPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadFileListOptNilPutRequest;

  try {
    const data = await api.apiBinarytypesUploadFileListOptNilPut(body);
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


## apiBinarytypesUploadFileListOptPut

> number apiBinarytypesUploadFileListOptPut(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadFileListOptPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadFileListOptPutRequest;

  try {
    const data = await api.apiBinarytypesUploadFileListOptPut(body);
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


## apiBinarytypesUploadFileListPut

> number apiBinarytypesUploadFileListPut(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadFileListPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadFileListPutRequest;

  try {
    const data = await api.apiBinarytypesUploadFileListPut(body);
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


## apiBinarytypesUploadFileNilPost

> number apiBinarytypesUploadFileNilPost(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadFileNilPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadFileNilPostRequest;

  try {
    const data = await api.apiBinarytypesUploadFileNilPost(body);
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


## apiBinarytypesUploadFileOptNilPost

> number apiBinarytypesUploadFileOptNilPost(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadFileOptNilPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadFileOptNilPostRequest;

  try {
    const data = await api.apiBinarytypesUploadFileOptNilPost(body);
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


## apiBinarytypesUploadFileOptPost

> number apiBinarytypesUploadFileOptPost(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadFileOptPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadFileOptPostRequest;

  try {
    const data = await api.apiBinarytypesUploadFileOptPost(body);
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


## apiBinarytypesUploadFilePost

> number apiBinarytypesUploadFilePost(body)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadFilePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // any (optional)
    body: ...,
  } satisfies ApiBinarytypesUploadFilePostRequest;

  try {
    const data = await api.apiBinarytypesUploadFilePost(body);
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


## apiBinarytypesUploadMixedNilPut

> UploadMixedResult apiBinarytypesUploadMixedNilPut(apiBinarytypesUploadMixedPutRequest)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadMixedNilPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // ApiBinarytypesUploadMixedPutRequest (optional)
    apiBinarytypesUploadMixedPutRequest: ...,
  } satisfies ApiBinarytypesUploadMixedNilPutRequest;

  try {
    const data = await api.apiBinarytypesUploadMixedNilPut(body);
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
| **apiBinarytypesUploadMixedPutRequest** | [ApiBinarytypesUploadMixedPutRequest](ApiBinarytypesUploadMixedPutRequest.md) |  | [Optional] |

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


## apiBinarytypesUploadMixedOptNilPut

> UploadMixedResult apiBinarytypesUploadMixedOptNilPut(apiBinarytypesUploadMixedPutRequest)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadMixedOptNilPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // ApiBinarytypesUploadMixedPutRequest (optional)
    apiBinarytypesUploadMixedPutRequest: ...,
  } satisfies ApiBinarytypesUploadMixedOptNilPutRequest;

  try {
    const data = await api.apiBinarytypesUploadMixedOptNilPut(body);
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
| **apiBinarytypesUploadMixedPutRequest** | [ApiBinarytypesUploadMixedPutRequest](ApiBinarytypesUploadMixedPutRequest.md) |  | [Optional] |

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


## apiBinarytypesUploadMixedOptPut

> UploadMixedResult apiBinarytypesUploadMixedOptPut(apiBinarytypesUploadMixedPutRequest)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadMixedOptPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // ApiBinarytypesUploadMixedPutRequest (optional)
    apiBinarytypesUploadMixedPutRequest: ...,
  } satisfies ApiBinarytypesUploadMixedOptPutRequest;

  try {
    const data = await api.apiBinarytypesUploadMixedOptPut(body);
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
| **apiBinarytypesUploadMixedPutRequest** | [ApiBinarytypesUploadMixedPutRequest](ApiBinarytypesUploadMixedPutRequest.md) |  | [Optional] |

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


## apiBinarytypesUploadMixedPut

> UploadMixedResult apiBinarytypesUploadMixedPut(apiBinarytypesUploadMixedPutRequest)





### Example

```ts
import {
  Configuration,
  BinaryTypesApi,
} from '';
import type { ApiBinarytypesUploadMixedPutOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BinaryTypesApi();

  const body = {
    // ApiBinarytypesUploadMixedPutRequest (optional)
    apiBinarytypesUploadMixedPutRequest: ...,
  } satisfies ApiBinarytypesUploadMixedPutOperationRequest;

  try {
    const data = await api.apiBinarytypesUploadMixedPut(body);
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
| **apiBinarytypesUploadMixedPutRequest** | [ApiBinarytypesUploadMixedPutRequest](ApiBinarytypesUploadMixedPutRequest.md) |  | [Optional] |

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

