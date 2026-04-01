# ListQueryParameterTypesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiListqueryparametertypesListBooleanQueryParamGet**](ListQueryParameterTypesApi.md#apilistqueryparametertypeslistbooleanqueryparamget) | **GET** /api/listqueryparametertypes/listBooleanQueryParam |  |
| [**apiListqueryparametertypesListDoubleQueryParamGet**](ListQueryParameterTypesApi.md#apilistqueryparametertypeslistdoublequeryparamget) | **GET** /api/listqueryparametertypes/listDoubleQueryParam |  |
| [**apiListqueryparametertypesListEnumQueryParamGet**](ListQueryParameterTypesApi.md#apilistqueryparametertypeslistenumqueryparamget) | **GET** /api/listqueryparametertypes/listEnumQueryParam |  |
| [**apiListqueryparametertypesListFloatQueryParamGet**](ListQueryParameterTypesApi.md#apilistqueryparametertypeslistfloatqueryparamget) | **GET** /api/listqueryparametertypes/listFloatQueryParam |  |
| [**apiListqueryparametertypesListInlineEnumQueryParamGet**](ListQueryParameterTypesApi.md#apilistqueryparametertypeslistinlineenumqueryparamget) | **GET** /api/listqueryparametertypes/listInlineEnumQueryParam |  |
| [**apiListqueryparametertypesListIntQueryParamGet**](ListQueryParameterTypesApi.md#apilistqueryparametertypeslistintqueryparamget) | **GET** /api/listqueryparametertypes/listIntQueryParam |  |
| [**apiListqueryparametertypesListLocalDateQueryParamGet**](ListQueryParameterTypesApi.md#apilistqueryparametertypeslistlocaldatequeryparamget) | **GET** /api/listqueryparametertypes/listLocalDateQueryParam |  |
| [**apiListqueryparametertypesListLocalDateTimeQueryParamGet**](ListQueryParameterTypesApi.md#apilistqueryparametertypeslistlocaldatetimequeryparamget) | **GET** /api/listqueryparametertypes/listLocalDateTimeQueryParam |  |
| [**apiListqueryparametertypesListLongQueryParamGet**](ListQueryParameterTypesApi.md#apilistqueryparametertypeslistlongqueryparamget) | **GET** /api/listqueryparametertypes/listLongQueryParam |  |
| [**apiListqueryparametertypesListMultiQueryParamGet**](ListQueryParameterTypesApi.md#apilistqueryparametertypeslistmultiqueryparamget) | **GET** /api/listqueryparametertypes/listMultiQueryParam |  |
| [**apiListqueryparametertypesListRecordQueryParamGet**](ListQueryParameterTypesApi.md#apilistqueryparametertypeslistrecordqueryparamget) | **GET** /api/listqueryparametertypes/listRecordQueryParam |  |
| [**apiListqueryparametertypesListScalarQueryParamGet**](ListQueryParameterTypesApi.md#apilistqueryparametertypeslistscalarqueryparamget) | **GET** /api/listqueryparametertypes/listScalarQueryParam |  |
| [**apiListqueryparametertypesListShortQueryParamGet**](ListQueryParameterTypesApi.md#apilistqueryparametertypeslistshortqueryparamget) | **GET** /api/listqueryparametertypes/listShortQueryParam |  |
| [**apiListqueryparametertypesListStringQueryParamGet**](ListQueryParameterTypesApi.md#apilistqueryparametertypesliststringqueryparamget) | **GET** /api/listqueryparametertypes/listStringQueryParam |  |
| [**apiListqueryparametertypesListZonedDateTimeQueryParamGet**](ListQueryParameterTypesApi.md#apilistqueryparametertypeslistzoneddatetimequeryparamget) | **GET** /api/listqueryparametertypes/listZonedDateTimeQueryParam |  |



## apiListqueryparametertypesListBooleanQueryParamGet

> Array&lt;boolean&gt; apiListqueryparametertypesListBooleanQueryParamGet(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ApiListqueryparametertypesListBooleanQueryParamGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<boolean> | 
    queryValue: ...,
  } satisfies ApiListqueryparametertypesListBooleanQueryParamGetRequest;

  try {
    const data = await api.apiListqueryparametertypesListBooleanQueryParamGet(body);
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


## apiListqueryparametertypesListDoubleQueryParamGet

> Array&lt;number&gt; apiListqueryparametertypesListDoubleQueryParamGet(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ApiListqueryparametertypesListDoubleQueryParamGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<number> | 
    queryValue: ...,
  } satisfies ApiListqueryparametertypesListDoubleQueryParamGetRequest;

  try {
    const data = await api.apiListqueryparametertypesListDoubleQueryParamGet(body);
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


## apiListqueryparametertypesListEnumQueryParamGet

> Array&lt;SampleEnum&gt; apiListqueryparametertypesListEnumQueryParamGet(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ApiListqueryparametertypesListEnumQueryParamGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<SampleEnum> | 
    queryValue: ...,
  } satisfies ApiListqueryparametertypesListEnumQueryParamGetRequest;

  try {
    const data = await api.apiListqueryparametertypesListEnumQueryParamGet(body);
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


## apiListqueryparametertypesListFloatQueryParamGet

> Array&lt;number&gt; apiListqueryparametertypesListFloatQueryParamGet(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ApiListqueryparametertypesListFloatQueryParamGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<number> | 
    queryValue: ...,
  } satisfies ApiListqueryparametertypesListFloatQueryParamGetRequest;

  try {
    const data = await api.apiListqueryparametertypesListFloatQueryParamGet(body);
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


## apiListqueryparametertypesListInlineEnumQueryParamGet

> any apiListqueryparametertypesListInlineEnumQueryParamGet(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ApiListqueryparametertypesListInlineEnumQueryParamGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // any | 
    queryValue: ...,
  } satisfies ApiListqueryparametertypesListInlineEnumQueryParamGetRequest;

  try {
    const data = await api.apiListqueryparametertypesListInlineEnumQueryParamGet(body);
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
| **queryValue** | `any` |  | [Defaults to `undefined`] |

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


## apiListqueryparametertypesListIntQueryParamGet

> Array&lt;number&gt; apiListqueryparametertypesListIntQueryParamGet(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ApiListqueryparametertypesListIntQueryParamGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<number> | 
    queryValue: ...,
  } satisfies ApiListqueryparametertypesListIntQueryParamGetRequest;

  try {
    const data = await api.apiListqueryparametertypesListIntQueryParamGet(body);
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


## apiListqueryparametertypesListLocalDateQueryParamGet

> Array&lt;Date&gt; apiListqueryparametertypesListLocalDateQueryParamGet(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ApiListqueryparametertypesListLocalDateQueryParamGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<Date> | 
    queryValue: ...,
  } satisfies ApiListqueryparametertypesListLocalDateQueryParamGetRequest;

  try {
    const data = await api.apiListqueryparametertypesListLocalDateQueryParamGet(body);
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


## apiListqueryparametertypesListLocalDateTimeQueryParamGet

> Array&lt;string&gt; apiListqueryparametertypesListLocalDateTimeQueryParamGet(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ApiListqueryparametertypesListLocalDateTimeQueryParamGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<string> | 
    queryValue: ...,
  } satisfies ApiListqueryparametertypesListLocalDateTimeQueryParamGetRequest;

  try {
    const data = await api.apiListqueryparametertypesListLocalDateTimeQueryParamGet(body);
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


## apiListqueryparametertypesListLongQueryParamGet

> Array&lt;number&gt; apiListqueryparametertypesListLongQueryParamGet(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ApiListqueryparametertypesListLongQueryParamGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<number> | 
    queryValue: ...,
  } satisfies ApiListqueryparametertypesListLongQueryParamGetRequest;

  try {
    const data = await api.apiListqueryparametertypesListLongQueryParamGet(body);
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


## apiListqueryparametertypesListMultiQueryParamGet

> string apiListqueryparametertypesListMultiQueryParamGet(valueA, valueB, valueC)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ApiListqueryparametertypesListMultiQueryParamGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<string> | 
    valueA: ...,
    // Array<number> | 
    valueB: ...,
    // Array<SimpleRecord> | 
    valueC: ...,
  } satisfies ApiListqueryparametertypesListMultiQueryParamGetRequest;

  try {
    const data = await api.apiListqueryparametertypesListMultiQueryParamGet(body);
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
| **valueC** | `Array<SimpleRecord>` |  | |

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


## apiListqueryparametertypesListRecordQueryParamGet

> Array&lt;SimpleRecord&gt; apiListqueryparametertypesListRecordQueryParamGet(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ApiListqueryparametertypesListRecordQueryParamGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<SimpleRecord> | 
    queryValue: ...,
  } satisfies ApiListqueryparametertypesListRecordQueryParamGetRequest;

  try {
    const data = await api.apiListqueryparametertypesListRecordQueryParamGet(body);
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
| **queryValue** | `Array<SimpleRecord>` |  | |

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


## apiListqueryparametertypesListScalarQueryParamGet

> string apiListqueryparametertypesListScalarQueryParamGet(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ApiListqueryparametertypesListScalarQueryParamGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // string | 
    queryValue: queryValue_example,
  } satisfies ApiListqueryparametertypesListScalarQueryParamGetRequest;

  try {
    const data = await api.apiListqueryparametertypesListScalarQueryParamGet(body);
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
| **queryValue** | `string` |  | [Defaults to `undefined`] |

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


## apiListqueryparametertypesListShortQueryParamGet

> Array&lt;number&gt; apiListqueryparametertypesListShortQueryParamGet(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ApiListqueryparametertypesListShortQueryParamGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<number> | 
    queryValue: ...,
  } satisfies ApiListqueryparametertypesListShortQueryParamGetRequest;

  try {
    const data = await api.apiListqueryparametertypesListShortQueryParamGet(body);
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


## apiListqueryparametertypesListStringQueryParamGet

> Array&lt;string&gt; apiListqueryparametertypesListStringQueryParamGet(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ApiListqueryparametertypesListStringQueryParamGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<string> | 
    queryValue: ...,
  } satisfies ApiListqueryparametertypesListStringQueryParamGetRequest;

  try {
    const data = await api.apiListqueryparametertypesListStringQueryParamGet(body);
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


## apiListqueryparametertypesListZonedDateTimeQueryParamGet

> Array&lt;string&gt; apiListqueryparametertypesListZonedDateTimeQueryParamGet(queryValue)





### Example

```ts
import {
  Configuration,
  ListQueryParameterTypesApi,
} from '';
import type { ApiListqueryparametertypesListZonedDateTimeQueryParamGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListQueryParameterTypesApi();

  const body = {
    // Array<string> | 
    queryValue: ...,
  } satisfies ApiListqueryparametertypesListZonedDateTimeQueryParamGetRequest;

  try {
    const data = await api.apiListqueryparametertypesListZonedDateTimeQueryParamGet(body);
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

