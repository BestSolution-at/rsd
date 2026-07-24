# EnumSubstitionServiceApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**enumSubstitionServiceFail**](EnumSubstitionServiceApi.md#enumsubstitionservicefail) | **POST** /api/enumsubstition/fail |  |
| [**enumSubstitionServiceGet**](EnumSubstitionServiceApi.md#enumsubstitionserviceget) | **GET** /api/enumsubstition/get |  |
| [**enumSubstitionServiceHeader**](EnumSubstitionServiceApi.md#enumsubstitionserviceheader) | **GET** /api/enumsubstition/header |  |
| [**enumSubstitionServiceHeaderList**](EnumSubstitionServiceApi.md#enumsubstitionserviceheaderlist) | **GET** /api/enumsubstition/headerList |  |
| [**enumSubstitionServiceHeaderListNull**](EnumSubstitionServiceApi.md#enumsubstitionserviceheaderlistnull) | **GET** /api/enumsubstition/headerListNull |  |
| [**enumSubstitionServiceHeaderListOpt**](EnumSubstitionServiceApi.md#enumsubstitionserviceheaderlistopt) | **GET** /api/enumsubstition/headerListOpt |  |
| [**enumSubstitionServiceHeaderListOptNull**](EnumSubstitionServiceApi.md#enumsubstitionserviceheaderlistoptnull) | **GET** /api/enumsubstition/headerListOptNull |  |
| [**enumSubstitionServiceHeaderNull**](EnumSubstitionServiceApi.md#enumsubstitionserviceheadernull) | **GET** /api/enumsubstition/headerNull |  |
| [**enumSubstitionServiceHeaderOpt**](EnumSubstitionServiceApi.md#enumsubstitionserviceheaderopt) | **GET** /api/enumsubstition/headerOpt |  |
| [**enumSubstitionServiceHeaderOptNull**](EnumSubstitionServiceApi.md#enumsubstitionserviceheaderoptnull) | **GET** /api/enumsubstition/headerOptNull |  |
| [**enumSubstitionServiceList**](EnumSubstitionServiceApi.md#enumsubstitionservicelist) | **GET** /api/enumsubstition/list |  |
| [**enumSubstitionServiceMultiBody**](EnumSubstitionServiceApi.md#enumsubstitionservicemultibodyoperation) | **POST** /api/enumsubstition/multiBody |  |
| [**enumSubstitionServicePost**](EnumSubstitionServiceApi.md#enumsubstitionservicepost) | **POST** /api/enumsubstition/post |  |
| [**enumSubstitionServicePostList**](EnumSubstitionServiceApi.md#enumsubstitionservicepostlist) | **POST** /api/enumsubstition/postList |  |
| [**enumSubstitionServicePostListNull**](EnumSubstitionServiceApi.md#enumsubstitionservicepostlistnull) | **POST** /api/enumsubstition/postListNull |  |
| [**enumSubstitionServicePostListOpt**](EnumSubstitionServiceApi.md#enumsubstitionservicepostlistopt) | **POST** /api/enumsubstition/postListOpt |  |
| [**enumSubstitionServicePostListOptNull**](EnumSubstitionServiceApi.md#enumsubstitionservicepostlistoptnull) | **POST** /api/enumsubstition/postListOptNull |  |
| [**enumSubstitionServicePostNull**](EnumSubstitionServiceApi.md#enumsubstitionservicepostnull) | **POST** /api/enumsubstition/postNull |  |
| [**enumSubstitionServicePostOpt**](EnumSubstitionServiceApi.md#enumsubstitionservicepostopt) | **POST** /api/enumsubstition/postOpt |  |
| [**enumSubstitionServicePostOptNull**](EnumSubstitionServiceApi.md#enumsubstitionservicepostoptnull) | **POST** /api/enumsubstition/postOptNull |  |
| [**enumSubstitionServiceQuery**](EnumSubstitionServiceApi.md#enumsubstitionservicequery) | **GET** /api/enumsubstition/query |  |
| [**enumSubstitionServiceQueryList**](EnumSubstitionServiceApi.md#enumsubstitionservicequerylist) | **GET** /api/enumsubstition/queryList |  |
| [**enumSubstitionServiceQueryListNull**](EnumSubstitionServiceApi.md#enumsubstitionservicequerylistnull) | **GET** /api/enumsubstition/queryListNull |  |
| [**enumSubstitionServiceQueryListOpt**](EnumSubstitionServiceApi.md#enumsubstitionservicequerylistopt) | **GET** /api/enumsubstition/queryListOpt |  |
| [**enumSubstitionServiceQueryListOptNull**](EnumSubstitionServiceApi.md#enumsubstitionservicequerylistoptnull) | **GET** /api/enumsubstition/queryListOptNull |  |
| [**enumSubstitionServiceQueryNull**](EnumSubstitionServiceApi.md#enumsubstitionservicequerynull) | **GET** /api/enumsubstition/queryNull |  |
| [**enumSubstitionServiceQueryOpt**](EnumSubstitionServiceApi.md#enumsubstitionservicequeryopt) | **GET** /api/enumsubstition/queryOpt |  |
| [**enumSubstitionServiceQueryOptNull**](EnumSubstitionServiceApi.md#enumsubstitionservicequeryoptnull) | **GET** /api/enumsubstition/queryOptNull |  |



## enumSubstitionServiceFail

> enumSubstitionServiceFail()





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceFailRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  try {
    const data = await api.enumSubstitionServiceFail();
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
| **400** |  |  * X-RSD-Error-Type - Contains the type information for the error transferred in the response body <br>  * X-RSD-Error-Message - Contains the error message for the error transferred in the response body <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## enumSubstitionServiceGet

> DayOfWeek enumSubstitionServiceGet()





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  try {
    const data = await api.enumSubstitionServiceGet();
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

[**DayOfWeek**](DayOfWeek.md)

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


## enumSubstitionServiceHeader

> DayOfWeek enumSubstitionServiceHeader(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceHeaderRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // DayOfWeek | 
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceHeaderRequest;

  try {
    const data = await api.enumSubstitionServiceHeader(body);
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
| **dayOfWeek** | `DayOfWeek` |  | [Defaults to `undefined`] [Enum: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY] |

### Return type

[**DayOfWeek**](DayOfWeek.md)

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


## enumSubstitionServiceHeaderList

> Array&lt;DayOfWeek&gt; enumSubstitionServiceHeaderList(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceHeaderListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // Array<DayOfWeek> | 
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceHeaderListRequest;

  try {
    const data = await api.enumSubstitionServiceHeaderList(body);
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
| **dayOfWeek** | `Array<DayOfWeek>` |  | |

### Return type

[**Array&lt;DayOfWeek&gt;**](DayOfWeek.md)

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


## enumSubstitionServiceHeaderListNull

> NilResult enumSubstitionServiceHeaderListNull(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceHeaderListNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // Array<DayOfWeek> | 
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceHeaderListNullRequest;

  try {
    const data = await api.enumSubstitionServiceHeaderListNull(body);
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
| **dayOfWeek** | `Array<DayOfWeek>` |  | |

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


## enumSubstitionServiceHeaderListOpt

> NilResult enumSubstitionServiceHeaderListOpt(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceHeaderListOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // Array<DayOfWeek> |  (optional)
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceHeaderListOptRequest;

  try {
    const data = await api.enumSubstitionServiceHeaderListOpt(body);
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
| **dayOfWeek** | `Array<DayOfWeek>` |  | [Optional] |

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


## enumSubstitionServiceHeaderListOptNull

> NilResult enumSubstitionServiceHeaderListOptNull(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceHeaderListOptNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // Array<DayOfWeek> |  (optional)
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceHeaderListOptNullRequest;

  try {
    const data = await api.enumSubstitionServiceHeaderListOptNull(body);
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
| **dayOfWeek** | `Array<DayOfWeek>` |  | [Optional] |

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


## enumSubstitionServiceHeaderNull

> NilResult enumSubstitionServiceHeaderNull(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceHeaderNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // DayOfWeek | 
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceHeaderNullRequest;

  try {
    const data = await api.enumSubstitionServiceHeaderNull(body);
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
| **dayOfWeek** | `DayOfWeek` |  | [Defaults to `undefined`] [Enum: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY] |

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


## enumSubstitionServiceHeaderOpt

> NilResult enumSubstitionServiceHeaderOpt(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceHeaderOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // DayOfWeek |  (optional)
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceHeaderOptRequest;

  try {
    const data = await api.enumSubstitionServiceHeaderOpt(body);
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
| **dayOfWeek** | `DayOfWeek` |  | [Optional] [Defaults to `undefined`] [Enum: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY] |

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


## enumSubstitionServiceHeaderOptNull

> NilResult enumSubstitionServiceHeaderOptNull(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceHeaderOptNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // DayOfWeek |  (optional)
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceHeaderOptNullRequest;

  try {
    const data = await api.enumSubstitionServiceHeaderOptNull(body);
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
| **dayOfWeek** | `DayOfWeek` |  | [Optional] [Defaults to `undefined`] [Enum: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY] |

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


## enumSubstitionServiceList

> Array&lt;DayOfWeek&gt; enumSubstitionServiceList()





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  try {
    const data = await api.enumSubstitionServiceList();
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

[**Array&lt;DayOfWeek&gt;**](DayOfWeek.md)

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


## enumSubstitionServiceMultiBody

> string enumSubstitionServiceMultiBody(enumSubstitionServiceMultiBodyRequest)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceMultiBodyOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // EnumSubstitionServiceMultiBodyRequest
    enumSubstitionServiceMultiBodyRequest: ...,
  } satisfies EnumSubstitionServiceMultiBodyOperationRequest;

  try {
    const data = await api.enumSubstitionServiceMultiBody(body);
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
| **enumSubstitionServiceMultiBodyRequest** | [EnumSubstitionServiceMultiBodyRequest](EnumSubstitionServiceMultiBodyRequest.md) |  | |

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


## enumSubstitionServicePost

> DayOfWeek enumSubstitionServicePost(body)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServicePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // string
    body: ...,
  } satisfies EnumSubstitionServicePostRequest;

  try {
    const data = await api.enumSubstitionServicePost(body);
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

[**DayOfWeek**](DayOfWeek.md)

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


## enumSubstitionServicePostList

> Array&lt;DayOfWeek&gt; enumSubstitionServicePostList(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServicePostListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // Array<DayOfWeek>
    dayOfWeek: ...,
  } satisfies EnumSubstitionServicePostListRequest;

  try {
    const data = await api.enumSubstitionServicePostList(body);
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
| **dayOfWeek** | `Array<DayOfWeek>` |  | |

### Return type

[**Array&lt;DayOfWeek&gt;**](DayOfWeek.md)

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


## enumSubstitionServicePostListNull

> NilResult enumSubstitionServicePostListNull(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServicePostListNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // Array<DayOfWeek>
    dayOfWeek: ...,
  } satisfies EnumSubstitionServicePostListNullRequest;

  try {
    const data = await api.enumSubstitionServicePostListNull(body);
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
| **dayOfWeek** | `Array<DayOfWeek>` |  | |

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


## enumSubstitionServicePostListOpt

> NilResult enumSubstitionServicePostListOpt(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServicePostListOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // Array<DayOfWeek> (optional)
    dayOfWeek: ...,
  } satisfies EnumSubstitionServicePostListOptRequest;

  try {
    const data = await api.enumSubstitionServicePostListOpt(body);
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
| **dayOfWeek** | `Array<DayOfWeek>` |  | [Optional] |

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


## enumSubstitionServicePostListOptNull

> NilResult enumSubstitionServicePostListOptNull(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServicePostListOptNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // Array<DayOfWeek> (optional)
    dayOfWeek: ...,
  } satisfies EnumSubstitionServicePostListOptNullRequest;

  try {
    const data = await api.enumSubstitionServicePostListOptNull(body);
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
| **dayOfWeek** | `Array<DayOfWeek>` |  | [Optional] |

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


## enumSubstitionServicePostNull

> NilResult enumSubstitionServicePostNull(body)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServicePostNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // string
    body: ...,
  } satisfies EnumSubstitionServicePostNullRequest;

  try {
    const data = await api.enumSubstitionServicePostNull(body);
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


## enumSubstitionServicePostOpt

> NilResult enumSubstitionServicePostOpt(body)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServicePostOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // string (optional)
    body: ...,
  } satisfies EnumSubstitionServicePostOptRequest;

  try {
    const data = await api.enumSubstitionServicePostOpt(body);
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


## enumSubstitionServicePostOptNull

> NilResult enumSubstitionServicePostOptNull(body)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServicePostOptNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // string (optional)
    body: ...,
  } satisfies EnumSubstitionServicePostOptNullRequest;

  try {
    const data = await api.enumSubstitionServicePostOptNull(body);
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


## enumSubstitionServiceQuery

> DayOfWeek enumSubstitionServiceQuery(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceQueryRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // DayOfWeek | 
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceQueryRequest;

  try {
    const data = await api.enumSubstitionServiceQuery(body);
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
| **dayOfWeek** | `DayOfWeek` |  | [Defaults to `undefined`] [Enum: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY] |

### Return type

[**DayOfWeek**](DayOfWeek.md)

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


## enumSubstitionServiceQueryList

> Array&lt;DayOfWeek&gt; enumSubstitionServiceQueryList(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceQueryListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // Array<DayOfWeek> | 
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceQueryListRequest;

  try {
    const data = await api.enumSubstitionServiceQueryList(body);
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
| **dayOfWeek** | `Array<DayOfWeek>` |  | |

### Return type

[**Array&lt;DayOfWeek&gt;**](DayOfWeek.md)

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


## enumSubstitionServiceQueryListNull

> NilResult enumSubstitionServiceQueryListNull(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceQueryListNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // Array<DayOfWeek> | 
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceQueryListNullRequest;

  try {
    const data = await api.enumSubstitionServiceQueryListNull(body);
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
| **dayOfWeek** | `Array<DayOfWeek>` |  | |

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


## enumSubstitionServiceQueryListOpt

> NilResult enumSubstitionServiceQueryListOpt(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceQueryListOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // Array<DayOfWeek> |  (optional)
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceQueryListOptRequest;

  try {
    const data = await api.enumSubstitionServiceQueryListOpt(body);
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
| **dayOfWeek** | `Array<DayOfWeek>` |  | [Optional] |

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


## enumSubstitionServiceQueryListOptNull

> NilResult enumSubstitionServiceQueryListOptNull(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceQueryListOptNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // Array<DayOfWeek> |  (optional)
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceQueryListOptNullRequest;

  try {
    const data = await api.enumSubstitionServiceQueryListOptNull(body);
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
| **dayOfWeek** | `Array<DayOfWeek>` |  | [Optional] |

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


## enumSubstitionServiceQueryNull

> NilResult enumSubstitionServiceQueryNull(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceQueryNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // DayOfWeek | 
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceQueryNullRequest;

  try {
    const data = await api.enumSubstitionServiceQueryNull(body);
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
| **dayOfWeek** | `DayOfWeek` |  | [Defaults to `undefined`] [Enum: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY] |

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


## enumSubstitionServiceQueryOpt

> NilResult enumSubstitionServiceQueryOpt(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceQueryOptRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // DayOfWeek |  (optional)
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceQueryOptRequest;

  try {
    const data = await api.enumSubstitionServiceQueryOpt(body);
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
| **dayOfWeek** | `DayOfWeek` |  | [Optional] [Defaults to `undefined`] [Enum: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY] |

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


## enumSubstitionServiceQueryOptNull

> NilResult enumSubstitionServiceQueryOptNull(dayOfWeek)





### Example

```ts
import {
  Configuration,
  EnumSubstitionServiceApi,
} from '';
import type { EnumSubstitionServiceQueryOptNullRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EnumSubstitionServiceApi();

  const body = {
    // DayOfWeek |  (optional)
    dayOfWeek: ...,
  } satisfies EnumSubstitionServiceQueryOptNullRequest;

  try {
    const data = await api.enumSubstitionServiceQueryOptNull(body);
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
| **dayOfWeek** | `DayOfWeek` |  | [Optional] [Defaults to `undefined`] [Enum: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY] |

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

