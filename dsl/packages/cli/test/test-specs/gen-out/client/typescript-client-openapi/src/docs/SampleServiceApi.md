# SampleServiceApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**sampleServiceErrorOperation**](SampleServiceApi.md#sampleserviceerroroperation) | **GET** /api/samplerecords/erroroperation |  |
| [**sampleServiceGetBoolean**](SampleServiceApi.md#sampleservicegetboolean) | **GET** /api/samplerecords/boolean |  |
| [**sampleServiceGetDouble**](SampleServiceApi.md#sampleservicegetdouble) | **GET** /api/samplerecords/double |  |
| [**sampleServiceGetEnum**](SampleServiceApi.md#sampleservicegetenum) | **GET** /api/samplerecords/enum |  |
| [**sampleServiceGetFloat**](SampleServiceApi.md#sampleservicegetfloat) | **GET** /api/samplerecords/float |  |
| [**sampleServiceGetInt**](SampleServiceApi.md#sampleservicegetint) | **GET** /api/samplerecords/int |  |
| [**sampleServiceGetLocalDate**](SampleServiceApi.md#sampleservicegetlocaldate) | **GET** /api/samplerecords/localdate |  |
| [**sampleServiceGetLocalDateTime**](SampleServiceApi.md#sampleservicegetlocaldatetime) | **GET** /api/samplerecords/localdatetime |  |
| [**sampleServiceGetLong**](SampleServiceApi.md#sampleservicegetlong) | **GET** /api/samplerecords/long |  |
| [**sampleServiceGetScalar**](SampleServiceApi.md#sampleservicegetscalar) | **GET** /api/samplerecords/scalar |  |
| [**sampleServiceGetShort**](SampleServiceApi.md#sampleservicegetshort) | **GET** /api/samplerecords/short |  |
| [**sampleServiceGetSimpleRecord**](SampleServiceApi.md#sampleservicegetsimplerecord) | **GET** /api/samplerecords/simplerecord/{key} |  |
| [**sampleServiceGetSimpleRecordWithError**](SampleServiceApi.md#sampleservicegetsimplerecordwitherror) | **GET** /api/samplerecords/simplerecordwitherror/{key} |  |
| [**sampleServiceGetString**](SampleServiceApi.md#sampleservicegetstring) | **GET** /api/samplerecords/string |  |
| [**sampleServiceGetZonedDateTime**](SampleServiceApi.md#sampleservicegetzoneddatetime) | **GET** /api/samplerecords/zoneddatetime |  |
| [**sampleServiceMultiErrorOperation**](SampleServiceApi.md#sampleservicemultierroroperation) | **GET** /api/samplerecords/multierroroperation |  |
| [**sampleServiceVoidOperation**](SampleServiceApi.md#sampleservicevoidoperation) | **GET** /api/samplerecords/voidoperation |  |



## sampleServiceErrorOperation

> sampleServiceErrorOperation()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceErrorOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.sampleServiceErrorOperation();
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


## sampleServiceGetBoolean

> boolean sampleServiceGetBoolean()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceGetBooleanRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.sampleServiceGetBoolean();
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


## sampleServiceGetDouble

> number sampleServiceGetDouble()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceGetDoubleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.sampleServiceGetDouble();
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


## sampleServiceGetEnum

> SampleEnum sampleServiceGetEnum()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceGetEnumRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.sampleServiceGetEnum();
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


## sampleServiceGetFloat

> number sampleServiceGetFloat()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceGetFloatRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.sampleServiceGetFloat();
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


## sampleServiceGetInt

> number sampleServiceGetInt()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceGetIntRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.sampleServiceGetInt();
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


## sampleServiceGetLocalDate

> Date sampleServiceGetLocalDate()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceGetLocalDateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.sampleServiceGetLocalDate();
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


## sampleServiceGetLocalDateTime

> string sampleServiceGetLocalDateTime()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceGetLocalDateTimeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.sampleServiceGetLocalDateTime();
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


## sampleServiceGetLong

> number sampleServiceGetLong()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceGetLongRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.sampleServiceGetLong();
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


## sampleServiceGetScalar

> string sampleServiceGetScalar()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceGetScalarRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.sampleServiceGetScalar();
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


## sampleServiceGetShort

> number sampleServiceGetShort()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceGetShortRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.sampleServiceGetShort();
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


## sampleServiceGetSimpleRecord

> SimpleRecord sampleServiceGetSimpleRecord(key)





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceGetSimpleRecordRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  const body = {
    // string | 
    key: key_example,
  } satisfies SampleServiceGetSimpleRecordRequest;

  try {
    const data = await api.sampleServiceGetSimpleRecord(body);
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


## sampleServiceGetSimpleRecordWithError

> SimpleRecord sampleServiceGetSimpleRecordWithError(key)





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceGetSimpleRecordWithErrorRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  const body = {
    // string | 
    key: key_example,
  } satisfies SampleServiceGetSimpleRecordWithErrorRequest;

  try {
    const data = await api.sampleServiceGetSimpleRecordWithError(body);
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


## sampleServiceGetString

> string sampleServiceGetString()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceGetStringRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.sampleServiceGetString();
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


## sampleServiceGetZonedDateTime

> string sampleServiceGetZonedDateTime()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceGetZonedDateTimeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.sampleServiceGetZonedDateTime();
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


## sampleServiceMultiErrorOperation

> sampleServiceMultiErrorOperation()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceMultiErrorOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.sampleServiceMultiErrorOperation();
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


## sampleServiceVoidOperation

> sampleServiceVoidOperation()





### Example

```ts
import {
  Configuration,
  SampleServiceApi,
} from '';
import type { SampleServiceVoidOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SampleServiceApi();

  try {
    const data = await api.sampleServiceVoidOperation();
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

