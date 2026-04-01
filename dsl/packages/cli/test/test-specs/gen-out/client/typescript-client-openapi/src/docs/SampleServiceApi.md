# SampleServiceApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiSamplerecordsBooleanGet**](SampleServiceApi.md#apisamplerecordsbooleanget) | **GET** /api/samplerecords/boolean |  |
| [**apiSamplerecordsDoubleGet**](SampleServiceApi.md#apisamplerecordsdoubleget) | **GET** /api/samplerecords/double |  |
| [**apiSamplerecordsEnumGet**](SampleServiceApi.md#apisamplerecordsenumget) | **GET** /api/samplerecords/enum |  |
| [**apiSamplerecordsErroroperationGet**](SampleServiceApi.md#apisamplerecordserroroperationget) | **GET** /api/samplerecords/erroroperation |  |
| [**apiSamplerecordsFloatGet**](SampleServiceApi.md#apisamplerecordsfloatget) | **GET** /api/samplerecords/float |  |
| [**apiSamplerecordsIntGet**](SampleServiceApi.md#apisamplerecordsintget) | **GET** /api/samplerecords/int |  |
| [**apiSamplerecordsLocaldateGet**](SampleServiceApi.md#apisamplerecordslocaldateget) | **GET** /api/samplerecords/localdate |  |
| [**apiSamplerecordsLocaldatetimeGet**](SampleServiceApi.md#apisamplerecordslocaldatetimeget) | **GET** /api/samplerecords/localdatetime |  |
| [**apiSamplerecordsLongGet**](SampleServiceApi.md#apisamplerecordslongget) | **GET** /api/samplerecords/long |  |
| [**apiSamplerecordsMultierroroperationGet**](SampleServiceApi.md#apisamplerecordsmultierroroperationget) | **GET** /api/samplerecords/multierroroperation |  |
| [**apiSamplerecordsScalarGet**](SampleServiceApi.md#apisamplerecordsscalarget) | **GET** /api/samplerecords/scalar |  |
| [**apiSamplerecordsShortGet**](SampleServiceApi.md#apisamplerecordsshortget) | **GET** /api/samplerecords/short |  |
| [**apiSamplerecordsSimplerecordKeyGet**](SampleServiceApi.md#apisamplerecordssimplerecordkeyget) | **GET** /api/samplerecords/simplerecord/{key} |  |
| [**apiSamplerecordsSimplerecordwitherrorKeyGet**](SampleServiceApi.md#apisamplerecordssimplerecordwitherrorkeyget) | **GET** /api/samplerecords/simplerecordwitherror/{key} |  |
| [**apiSamplerecordsStringGet**](SampleServiceApi.md#apisamplerecordsstringget) | **GET** /api/samplerecords/string |  |
| [**apiSamplerecordsVoidoperationGet**](SampleServiceApi.md#apisamplerecordsvoidoperationget) | **GET** /api/samplerecords/voidoperation |  |
| [**apiSamplerecordsZoneddatetimeGet**](SampleServiceApi.md#apisamplerecordszoneddatetimeget) | **GET** /api/samplerecords/zoneddatetime |  |



## apiSamplerecordsBooleanGet

> boolean apiSamplerecordsBooleanGet()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsBooleanGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.apiSamplerecordsBooleanGet();
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

**boolean**

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


## apiSamplerecordsDoubleGet

> number apiSamplerecordsDoubleGet()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsDoubleGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.apiSamplerecordsDoubleGet();
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

**number**

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


## apiSamplerecordsEnumGet

> SampleEnum apiSamplerecordsEnumGet()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsEnumGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.apiSamplerecordsEnumGet();
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

[**SampleEnum**](SampleEnum.md)

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


## apiSamplerecordsErroroperationGet

> apiSamplerecordsErroroperationGet()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsErroroperationGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.apiSamplerecordsErroroperationGet();
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


## apiSamplerecordsFloatGet

> number apiSamplerecordsFloatGet()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsFloatGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.apiSamplerecordsFloatGet();
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

**number**

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


## apiSamplerecordsIntGet

> number apiSamplerecordsIntGet()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsIntGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.apiSamplerecordsIntGet();
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

**number**

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


## apiSamplerecordsLocaldateGet

> Date apiSamplerecordsLocaldateGet()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsLocaldateGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.apiSamplerecordsLocaldateGet();
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

**Date**

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


## apiSamplerecordsLocaldatetimeGet

> string apiSamplerecordsLocaldatetimeGet()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsLocaldatetimeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.apiSamplerecordsLocaldatetimeGet();
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


## apiSamplerecordsLongGet

> number apiSamplerecordsLongGet()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsLongGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.apiSamplerecordsLongGet();
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

**number**

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


## apiSamplerecordsMultierroroperationGet

> apiSamplerecordsMultierroroperationGet()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsMultierroroperationGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.apiSamplerecordsMultierroroperationGet();
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
| **401** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiSamplerecordsScalarGet

> string apiSamplerecordsScalarGet()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsScalarGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.apiSamplerecordsScalarGet();
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


## apiSamplerecordsShortGet

> number apiSamplerecordsShortGet()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsShortGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.apiSamplerecordsShortGet();
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

**number**

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


## apiSamplerecordsSimplerecordKeyGet

> SimpleRecord apiSamplerecordsSimplerecordKeyGet(key)





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsSimplerecordKeyGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  const body = {
    // string | 
    key: key_example,
  } satisfies ApiSamplerecordsSimplerecordKeyGetRequest;

  try {
    const data = await api.apiSamplerecordsSimplerecordKeyGet(body);
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
| **key** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SimpleRecord**](SimpleRecord.md)

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


## apiSamplerecordsSimplerecordwitherrorKeyGet

> SimpleRecord apiSamplerecordsSimplerecordwitherrorKeyGet(key)





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsSimplerecordwitherrorKeyGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  const body = {
    // string | 
    key: key_example,
  } satisfies ApiSamplerecordsSimplerecordwitherrorKeyGetRequest;

  try {
    const data = await api.apiSamplerecordsSimplerecordwitherrorKeyGet(body);
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
| **key** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SimpleRecord**](SimpleRecord.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |
| **400** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiSamplerecordsStringGet

> string apiSamplerecordsStringGet()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsStringGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.apiSamplerecordsStringGet();
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


## apiSamplerecordsVoidoperationGet

> apiSamplerecordsVoidoperationGet()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsVoidoperationGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.apiSamplerecordsVoidoperationGet();
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
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiSamplerecordsZoneddatetimeGet

> string apiSamplerecordsZoneddatetimeGet()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { ApiSamplerecordsZoneddatetimeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.apiSamplerecordsZoneddatetimeGet();
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

