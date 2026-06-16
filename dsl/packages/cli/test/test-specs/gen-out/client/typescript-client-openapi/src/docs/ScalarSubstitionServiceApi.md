# ScalarSubstitionServiceApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**scalarSubstitionServiceFail**](ScalarSubstitionServiceApi.md#scalarsubstitionservicefail) | **POST** /api/scalarsubstitution/fail |  |
| [**scalarSubstitionServiceGet**](ScalarSubstitionServiceApi.md#scalarsubstitionserviceget) | **GET** /api/scalarsubstitution/get |  |
| [**scalarSubstitionServiceHeader**](ScalarSubstitionServiceApi.md#scalarsubstitionserviceheader) | **GET** /api/scalarsubstitution/header |  |
| [**scalarSubstitionServiceHeaderList**](ScalarSubstitionServiceApi.md#scalarsubstitionserviceheaderlist) | **GET** /api/scalarsubstitution/headerList |  |
| [**scalarSubstitionServiceHeaderListNull**](ScalarSubstitionServiceApi.md#scalarsubstitionserviceheaderlistnull) | **GET** /api/scalarsubstitution/headerListNull |  |
| [**scalarSubstitionServiceHeaderListOpt**](ScalarSubstitionServiceApi.md#scalarsubstitionserviceheaderlistopt) | **GET** /api/scalarsubstitution/headerListOpt |  |
| [**scalarSubstitionServiceHeaderListOptNull**](ScalarSubstitionServiceApi.md#scalarsubstitionserviceheaderlistoptnull) | **GET** /api/scalarsubstitution/headerListOptNull |  |
| [**scalarSubstitionServiceHeaderNull**](ScalarSubstitionServiceApi.md#scalarsubstitionserviceheadernull) | **GET** /api/scalarsubstitution/headerNull |  |
| [**scalarSubstitionServiceHeaderOpt**](ScalarSubstitionServiceApi.md#scalarsubstitionserviceheaderopt) | **GET** /api/scalarsubstitution/headerOpt |  |
| [**scalarSubstitionServiceHeaderOptNull**](ScalarSubstitionServiceApi.md#scalarsubstitionserviceheaderoptnull) | **GET** /api/scalarsubstitution/headerOptNull |  |
| [**scalarSubstitionServiceList**](ScalarSubstitionServiceApi.md#scalarsubstitionservicelist) | **GET** /api/scalarsubstitution/list |  |
| [**scalarSubstitionServicePost**](ScalarSubstitionServiceApi.md#scalarsubstitionservicepost) | **POST** /api/scalarsubstitution/post |  |
| [**scalarSubstitionServicePostList**](ScalarSubstitionServiceApi.md#scalarsubstitionservicepostlist) | **POST** /api/scalarsubstitution/postList |  |
| [**scalarSubstitionServicePostListNull**](ScalarSubstitionServiceApi.md#scalarsubstitionservicepostlistnull) | **POST** /api/scalarsubstitution/postListNull |  |
| [**scalarSubstitionServicePostListOpt**](ScalarSubstitionServiceApi.md#scalarsubstitionservicepostlistopt) | **POST** /api/scalarsubstitution/postListOpt |  |
| [**scalarSubstitionServicePostListOptNull**](ScalarSubstitionServiceApi.md#scalarsubstitionservicepostlistoptnull) | **POST** /api/scalarsubstitution/postListOptNull |  |
| [**scalarSubstitionServicePostNull**](ScalarSubstitionServiceApi.md#scalarsubstitionservicepostnull) | **POST** /api/scalarsubstitution/postNull |  |
| [**scalarSubstitionServicePostOpt**](ScalarSubstitionServiceApi.md#scalarsubstitionservicepostopt) | **POST** /api/scalarsubstitution/postOpt |  |
| [**scalarSubstitionServicePostOptNull**](ScalarSubstitionServiceApi.md#scalarsubstitionservicepostoptnull) | **POST** /api/scalarsubstitution/postOptNull |  |
| [**scalarSubstitionServiceQuery**](ScalarSubstitionServiceApi.md#scalarsubstitionservicequery) | **GET** /api/scalarsubstitution/query |  |
| [**scalarSubstitionServiceQueryList**](ScalarSubstitionServiceApi.md#scalarsubstitionservicequerylist) | **GET** /api/scalarsubstitution/queryList |  |
| [**scalarSubstitionServiceQueryListNull**](ScalarSubstitionServiceApi.md#scalarsubstitionservicequerylistnull) | **GET** /api/scalarsubstitution/queryListNull |  |
| [**scalarSubstitionServiceQueryListOpt**](ScalarSubstitionServiceApi.md#scalarsubstitionservicequerylistopt) | **GET** /api/scalarsubstitution/queryListOpt |  |
| [**scalarSubstitionServiceQueryListOptNull**](ScalarSubstitionServiceApi.md#scalarsubstitionservicequerylistoptnull) | **GET** /api/scalarsubstitution/queryListOptNull |  |
| [**scalarSubstitionServiceQueryNull**](ScalarSubstitionServiceApi.md#scalarsubstitionservicequerynull) | **GET** /api/scalarsubstitution/queryNull |  |
| [**scalarSubstitionServiceQueryOpt**](ScalarSubstitionServiceApi.md#scalarsubstitionservicequeryopt) | **GET** /api/scalarsubstitution/queryOpt |  |
| [**scalarSubstitionServiceQueryOptNull**](ScalarSubstitionServiceApi.md#scalarsubstitionservicequeryoptnull) | **GET** /api/scalarsubstitution/queryOptNull |  |



## scalarSubstitionServiceFail

> scalarSubstitionServiceFail()





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceFailRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  try {
    const data = await api.scalarSubstitionServiceFail();
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

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | success |  -  |
| **400** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## scalarSubstitionServiceGet

> string scalarSubstitionServiceGet()





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  try {
    const data = await api.scalarSubstitionServiceGet();
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

**string**

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


## scalarSubstitionServiceHeader

> string scalarSubstitionServiceHeader(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceHeaderRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // string | 
    range: range_example,
  } satisfies ScalarSubstitionServiceHeaderRequest;

  try {
    const data = await api.scalarSubstitionServiceHeader(body);
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
| **range** | `string` |  | [Defaults to `undefined`] |

### Return type

**string**

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


## scalarSubstitionServiceHeaderList

> Array&lt;string&gt; scalarSubstitionServiceHeaderList(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceHeaderListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // Array<string> | 
    range: ...,
  } satisfies ScalarSubstitionServiceHeaderListRequest;

  try {
    const data = await api.scalarSubstitionServiceHeaderList(body);
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
| **range** | `Array<string>` |  | |

### Return type

**Array<string>**

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


## scalarSubstitionServiceHeaderListNull

> NilResult scalarSubstitionServiceHeaderListNull(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceHeaderListNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // Array<string> | 
    range: ...,
  } satisfies ScalarSubstitionServiceHeaderListNullRequest;

  try {
    const data = await api.scalarSubstitionServiceHeaderListNull(body);
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
| **range** | `Array<string>` |  | |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServiceHeaderListOpt

> NilResult scalarSubstitionServiceHeaderListOpt(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceHeaderListOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // Array<string> |  (optional)
    range: ...,
  } satisfies ScalarSubstitionServiceHeaderListOptRequest;

  try {
    const data = await api.scalarSubstitionServiceHeaderListOpt(body);
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
| **range** | `Array<string>` |  | [Optional] |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServiceHeaderListOptNull

> NilResult scalarSubstitionServiceHeaderListOptNull(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceHeaderListOptNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // Array<string> |  (optional)
    range: ...,
  } satisfies ScalarSubstitionServiceHeaderListOptNullRequest;

  try {
    const data = await api.scalarSubstitionServiceHeaderListOptNull(body);
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
| **range** | `Array<string>` |  | [Optional] |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServiceHeaderNull

> NilResult scalarSubstitionServiceHeaderNull(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceHeaderNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // string | 
    range: range_example,
  } satisfies ScalarSubstitionServiceHeaderNullRequest;

  try {
    const data = await api.scalarSubstitionServiceHeaderNull(body);
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
| **range** | `string` |  | [Defaults to `undefined`] |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServiceHeaderOpt

> NilResult scalarSubstitionServiceHeaderOpt(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceHeaderOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // string |  (optional)
    range: range_example,
  } satisfies ScalarSubstitionServiceHeaderOptRequest;

  try {
    const data = await api.scalarSubstitionServiceHeaderOpt(body);
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
| **range** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServiceHeaderOptNull

> NilResult scalarSubstitionServiceHeaderOptNull(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceHeaderOptNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // string |  (optional)
    range: range_example,
  } satisfies ScalarSubstitionServiceHeaderOptNullRequest;

  try {
    const data = await api.scalarSubstitionServiceHeaderOptNull(body);
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
| **range** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServiceList

> Array&lt;string&gt; scalarSubstitionServiceList()





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  try {
    const data = await api.scalarSubstitionServiceList();
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

**Array<string>**

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


## scalarSubstitionServicePost

> string scalarSubstitionServicePost(body)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServicePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // string
    body: body_example,
  } satisfies ScalarSubstitionServicePostRequest;

  try {
    const data = await api.scalarSubstitionServicePost(body);
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
| **body** | `string` |  | |

### Return type

**string**

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


## scalarSubstitionServicePostList

> Array&lt;string&gt; scalarSubstitionServicePostList(requestBody)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServicePostListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // Array<string>
    requestBody: ...,
  } satisfies ScalarSubstitionServicePostListRequest;

  try {
    const data = await api.scalarSubstitionServicePostList(body);
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
| **requestBody** | `Array<string>` |  | |

### Return type

**Array<string>**

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


## scalarSubstitionServicePostListNull

> NilResult scalarSubstitionServicePostListNull(requestBody)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServicePostListNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // Array<string>
    requestBody: ...,
  } satisfies ScalarSubstitionServicePostListNullRequest;

  try {
    const data = await api.scalarSubstitionServicePostListNull(body);
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
| **requestBody** | `Array<string>` |  | |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServicePostListOpt

> NilResult scalarSubstitionServicePostListOpt(requestBody)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServicePostListOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // Array<string> (optional)
    requestBody: ...,
  } satisfies ScalarSubstitionServicePostListOptRequest;

  try {
    const data = await api.scalarSubstitionServicePostListOpt(body);
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
| **requestBody** | `Array<string>` |  | [Optional] |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServicePostListOptNull

> NilResult scalarSubstitionServicePostListOptNull(requestBody)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServicePostListOptNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // Array<string> (optional)
    requestBody: ...,
  } satisfies ScalarSubstitionServicePostListOptNullRequest;

  try {
    const data = await api.scalarSubstitionServicePostListOptNull(body);
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
| **requestBody** | `Array<string>` |  | [Optional] |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServicePostNull

> NilResult scalarSubstitionServicePostNull(body)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServicePostNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // string
    body: body_example,
  } satisfies ScalarSubstitionServicePostNullRequest;

  try {
    const data = await api.scalarSubstitionServicePostNull(body);
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
| **body** | `string` |  | |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServicePostOpt

> NilResult scalarSubstitionServicePostOpt(body)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServicePostOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // string (optional)
    body: body_example,
  } satisfies ScalarSubstitionServicePostOptRequest;

  try {
    const data = await api.scalarSubstitionServicePostOpt(body);
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
| **body** | `string` |  | [Optional] |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServicePostOptNull

> NilResult scalarSubstitionServicePostOptNull(body)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServicePostOptNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // string (optional)
    body: body_example,
  } satisfies ScalarSubstitionServicePostOptNullRequest;

  try {
    const data = await api.scalarSubstitionServicePostOptNull(body);
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
| **body** | `string` |  | [Optional] |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServiceQuery

> string scalarSubstitionServiceQuery(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceQueryRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // string | 
    range: range_example,
  } satisfies ScalarSubstitionServiceQueryRequest;

  try {
    const data = await api.scalarSubstitionServiceQuery(body);
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
| **range** | `string` |  | [Defaults to `undefined`] |

### Return type

**string**

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


## scalarSubstitionServiceQueryList

> Array&lt;string&gt; scalarSubstitionServiceQueryList(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceQueryListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // Array<string> | 
    range: ...,
  } satisfies ScalarSubstitionServiceQueryListRequest;

  try {
    const data = await api.scalarSubstitionServiceQueryList(body);
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
| **range** | `Array<string>` |  | |

### Return type

**Array<string>**

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


## scalarSubstitionServiceQueryListNull

> NilResult scalarSubstitionServiceQueryListNull(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceQueryListNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // Array<string> | 
    range: ...,
  } satisfies ScalarSubstitionServiceQueryListNullRequest;

  try {
    const data = await api.scalarSubstitionServiceQueryListNull(body);
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
| **range** | `Array<string>` |  | |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServiceQueryListOpt

> NilResult scalarSubstitionServiceQueryListOpt(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceQueryListOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // Array<string> |  (optional)
    range: ...,
  } satisfies ScalarSubstitionServiceQueryListOptRequest;

  try {
    const data = await api.scalarSubstitionServiceQueryListOpt(body);
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
| **range** | `Array<string>` |  | [Optional] |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServiceQueryListOptNull

> NilResult scalarSubstitionServiceQueryListOptNull(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceQueryListOptNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // Array<string> |  (optional)
    range: ...,
  } satisfies ScalarSubstitionServiceQueryListOptNullRequest;

  try {
    const data = await api.scalarSubstitionServiceQueryListOptNull(body);
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
| **range** | `Array<string>` |  | [Optional] |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServiceQueryNull

> NilResult scalarSubstitionServiceQueryNull(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceQueryNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // string | 
    range: range_example,
  } satisfies ScalarSubstitionServiceQueryNullRequest;

  try {
    const data = await api.scalarSubstitionServiceQueryNull(body);
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
| **range** | `string` |  | [Defaults to `undefined`] |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServiceQueryOpt

> NilResult scalarSubstitionServiceQueryOpt(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceQueryOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // string |  (optional)
    range: range_example,
  } satisfies ScalarSubstitionServiceQueryOptRequest;

  try {
    const data = await api.scalarSubstitionServiceQueryOpt(body);
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
| **range** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**NilResult**](NilResult.md)

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


## scalarSubstitionServiceQueryOptNull

> NilResult scalarSubstitionServiceQueryOptNull(range)





### Example

```ts
import {
  Configuration,
  ScalarSubstitionServiceApi,
} from '';
import type { ScalarSubstitionServiceQueryOptNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScalarSubstitionServiceApi();

  const body = {
    // string |  (optional)
    range: range_example,
  } satisfies ScalarSubstitionServiceQueryOptNullRequest;

  try {
    const data = await api.scalarSubstitionServiceQueryOptNull(body);
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
| **range** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**NilResult**](NilResult.md)

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

