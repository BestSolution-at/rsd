# ListQueryParameterTypesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**listQueryParameterTypesListBooleanQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistbooleanqueryparam) | **GET** /api/listqueryparametertypes/listBooleanQueryParam |  |
| [**listQueryParameterTypesListDoubleQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistdoublequeryparam) | **GET** /api/listqueryparametertypes/listDoubleQueryParam |  |
| [**listQueryParameterTypesListEnumQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistenumqueryparam) | **GET** /api/listqueryparametertypes/listEnumQueryParam |  |
| [**listQueryParameterTypesListFloatQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistfloatqueryparam) | **GET** /api/listqueryparametertypes/listFloatQueryParam |  |
| [**listQueryParameterTypesListInlineEnumQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistinlineenumqueryparam) | **GET** /api/listqueryparametertypes/listInlineEnumQueryParam |  |
| [**listQueryParameterTypesListIntQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistintqueryparam) | **GET** /api/listqueryparametertypes/listIntQueryParam |  |
| [**listQueryParameterTypesListLocalDateQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistlocaldatequeryparam) | **GET** /api/listqueryparametertypes/listLocalDateQueryParam |  |
| [**listQueryParameterTypesListLocalDateTimeQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistlocaldatetimequeryparam) | **GET** /api/listqueryparametertypes/listLocalDateTimeQueryParam |  |
| [**listQueryParameterTypesListLocalTimeQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistlocaltimequeryparam) | **GET** /api/listqueryparametertypes/listLocalTimeQueryParam |  |
| [**listQueryParameterTypesListLongQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistlongqueryparam) | **GET** /api/listqueryparametertypes/listLongQueryParam |  |
| [**listQueryParameterTypesListMultiQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistmultiqueryparam) | **GET** /api/listqueryparametertypes/listMultiQueryParam |  |
| [**listQueryParameterTypesListOffsetDateTimeQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistoffsetdatetimequeryparam) | **GET** /api/listqueryparametertypes/listOffsetDateTimeQueryParam |  |
| [**listQueryParameterTypesListRecordQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistrecordqueryparam) | **GET** /api/listqueryparametertypes/listRecordQueryParam |  |
| [**listQueryParameterTypesListScalarQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistscalarqueryparam) | **GET** /api/listqueryparametertypes/listScalarQueryParam |  |
| [**listQueryParameterTypesListShortQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistshortqueryparam) | **GET** /api/listqueryparametertypes/listShortQueryParam |  |
| [**listQueryParameterTypesListStringQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypesliststringqueryparam) | **GET** /api/listqueryparametertypes/listStringQueryParam |  |
| [**listQueryParameterTypesListZonedDateTimeQueryParam**](ListQueryParameterTypesApi.md#listqueryparametertypeslistzoneddatetimequeryparam) | **GET** /api/listqueryparametertypes/listZonedDateTimeQueryParam |  |



## listQueryParameterTypesListBooleanQueryParam

> Array&lt;boolean&gt; listQueryParameterTypesListBooleanQueryParam(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListBooleanQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<boolean> | 
    queryValue: ...,
  } satisfies ListQueryParameterTypesListBooleanQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListBooleanQueryParam(body);
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
| **queryValue** | `Array<boolean>` |  | |

### Return type

**Array<boolean>**

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


## listQueryParameterTypesListDoubleQueryParam

> Array&lt;number&gt; listQueryParameterTypesListDoubleQueryParam(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListDoubleQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<number> | 
    queryValue: ...,
  } satisfies ListQueryParameterTypesListDoubleQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListDoubleQueryParam(body);
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
| **queryValue** | `Array<number>` |  | |

### Return type

**Array<number>**

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


## listQueryParameterTypesListEnumQueryParam

> Array&lt;SampleEnum&gt; listQueryParameterTypesListEnumQueryParam(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListEnumQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<SampleEnum> | 
    queryValue: ...,
  } satisfies ListQueryParameterTypesListEnumQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListEnumQueryParam(body);
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
| **queryValue** | `Array<SampleEnum>` |  | |

### Return type

[**Array&lt;SampleEnum&gt;**](SampleEnum.md)

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


## listQueryParameterTypesListFloatQueryParam

> Array&lt;number&gt; listQueryParameterTypesListFloatQueryParam(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListFloatQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<number> | 
    queryValue: ...,
  } satisfies ListQueryParameterTypesListFloatQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListFloatQueryParam(body);
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
| **queryValue** | `Array<number>` |  | |

### Return type

**Array<number>**

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


## listQueryParameterTypesListInlineEnumQueryParam

> Array&lt;string&gt; listQueryParameterTypesListInlineEnumQueryParam(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListInlineEnumQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<'A' | 'B'> | 
    queryValue: ...,
  } satisfies ListQueryParameterTypesListInlineEnumQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListInlineEnumQueryParam(body);
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
| **queryValue** | `A`, `B` |  | [Enum: A, B] |

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


## listQueryParameterTypesListIntQueryParam

> Array&lt;number&gt; listQueryParameterTypesListIntQueryParam(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListIntQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<number> | 
    queryValue: ...,
  } satisfies ListQueryParameterTypesListIntQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListIntQueryParam(body);
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
| **queryValue** | `Array<number>` |  | |

### Return type

**Array<number>**

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


## listQueryParameterTypesListLocalDateQueryParam

> Array&lt;Date&gt; listQueryParameterTypesListLocalDateQueryParam(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListLocalDateQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<Date> | 
    queryValue: ...,
  } satisfies ListQueryParameterTypesListLocalDateQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListLocalDateQueryParam(body);
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
| **queryValue** | `Array<Date>` |  | |

### Return type

**Array<Date>**

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


## listQueryParameterTypesListLocalDateTimeQueryParam

> Array&lt;string&gt; listQueryParameterTypesListLocalDateTimeQueryParam(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListLocalDateTimeQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<string> | 
    queryValue: ...,
  } satisfies ListQueryParameterTypesListLocalDateTimeQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListLocalDateTimeQueryParam(body);
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
| **queryValue** | `Array<string>` |  | |

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


## listQueryParameterTypesListLocalTimeQueryParam

> Array&lt;string&gt; listQueryParameterTypesListLocalTimeQueryParam(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListLocalTimeQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<string> | 
    queryValue: ...,
  } satisfies ListQueryParameterTypesListLocalTimeQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListLocalTimeQueryParam(body);
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
| **queryValue** | `Array<string>` |  | |

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


## listQueryParameterTypesListLongQueryParam

> Array&lt;number&gt; listQueryParameterTypesListLongQueryParam(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListLongQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<number> | 
    queryValue: ...,
  } satisfies ListQueryParameterTypesListLongQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListLongQueryParam(body);
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
| **queryValue** | `Array<number>` |  | |

### Return type

**Array<number>**

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


## listQueryParameterTypesListMultiQueryParam

> string listQueryParameterTypesListMultiQueryParam(valueA, valueB, valueC, xRSDParamContentType)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListMultiQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<string> | 
    valueA: ...,
    // Array<number> | 
    valueB: ...,
    // Array<string> | 
    valueC: ...,
    // string | Contains the type information for record and union types transferred in headers as a base64 blob
    xRSDParamContentType: xRSDParamContentType_example,
  } satisfies ListQueryParameterTypesListMultiQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListMultiQueryParam(body);
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
| **valueA** | `Array<string>` |  | |
| **valueB** | `Array<number>` |  | |
| **valueC** | `Array<string>` |  | |
| **xRSDParamContentType** | `string` | Contains the type information for record and union types transferred in headers as a base64 blob | [Defaults to `undefined`] |

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


## listQueryParameterTypesListOffsetDateTimeQueryParam

> Array&lt;Date&gt; listQueryParameterTypesListOffsetDateTimeQueryParam(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListOffsetDateTimeQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<Date> | 
    queryValue: ...,
  } satisfies ListQueryParameterTypesListOffsetDateTimeQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListOffsetDateTimeQueryParam(body);
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
| **queryValue** | `Array<Date>` |  | |

### Return type

**Array<Date>**

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


## listQueryParameterTypesListRecordQueryParam

> Array&lt;SimpleRecord&gt; listQueryParameterTypesListRecordQueryParam(queryValue, xRSDParamContentType)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListRecordQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<string> | 
    queryValue: ...,
    // string | Contains the type information for record and union types transferred in headers as a base64 blob
    xRSDParamContentType: xRSDParamContentType_example,
  } satisfies ListQueryParameterTypesListRecordQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListRecordQueryParam(body);
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
| **queryValue** | `Array<string>` |  | |
| **xRSDParamContentType** | `string` | Contains the type information for record and union types transferred in headers as a base64 blob | [Defaults to `undefined`] |

### Return type

[**Array&lt;SimpleRecord&gt;**](SimpleRecord.md)

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


## listQueryParameterTypesListScalarQueryParam

> Array&lt;string&gt; listQueryParameterTypesListScalarQueryParam(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListScalarQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<string> | 
    queryValue: ...,
  } satisfies ListQueryParameterTypesListScalarQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListScalarQueryParam(body);
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
| **queryValue** | `Array<string>` |  | |

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


## listQueryParameterTypesListShortQueryParam

> Array&lt;number&gt; listQueryParameterTypesListShortQueryParam(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListShortQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<number> | 
    queryValue: ...,
  } satisfies ListQueryParameterTypesListShortQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListShortQueryParam(body);
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
| **queryValue** | `Array<number>` |  | |

### Return type

**Array<number>**

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


## listQueryParameterTypesListStringQueryParam

> Array&lt;string&gt; listQueryParameterTypesListStringQueryParam(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListStringQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<string> | 
    queryValue: ...,
  } satisfies ListQueryParameterTypesListStringQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListStringQueryParam(body);
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
| **queryValue** | `Array<string>` |  | |

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


## listQueryParameterTypesListZonedDateTimeQueryParam

> Array&lt;string&gt; listQueryParameterTypesListZonedDateTimeQueryParam(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ListQueryParameterTypesListZonedDateTimeQueryParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<string> | 
    queryValue: ...,
  } satisfies ListQueryParameterTypesListZonedDateTimeQueryParamRequest;

  try {
    const data = await api.listQueryParameterTypesListZonedDateTimeQueryParam(body);
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
| **queryValue** | `Array<string>` |  | |

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

