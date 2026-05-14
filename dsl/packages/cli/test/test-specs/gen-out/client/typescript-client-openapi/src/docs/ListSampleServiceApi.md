# ListSampleServiceApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**listSampleServiceListBoolean**](ListSampleServiceApi.md#listsampleservicelistboolean) | **GET** /api/listsamplerecords/boolean |  |
| [**listSampleServiceListDouble**](ListSampleServiceApi.md#listsampleservicelistdouble) | **GET** /api/listsamplerecords/double |  |
| [**listSampleServiceListEnum**](ListSampleServiceApi.md#listsampleservicelistenum) | **GET** /api/listsamplerecords/enum |  |
| [**listSampleServiceListFloat**](ListSampleServiceApi.md#listsampleservicelistfloat) | **GET** /api/listsamplerecords/float |  |
| [**listSampleServiceListInt**](ListSampleServiceApi.md#listsampleservicelistint) | **GET** /api/listsamplerecords/int |  |
| [**listSampleServiceListLocalDate**](ListSampleServiceApi.md#listsampleservicelistlocaldate) | **GET** /api/listsamplerecords/localdate |  |
| [**listSampleServiceListLocalDateTime**](ListSampleServiceApi.md#listsampleservicelistlocaldatetime) | **GET** /api/listsamplerecords/localdatetime |  |
| [**listSampleServiceListLocalTime**](ListSampleServiceApi.md#listsampleservicelistlocaltime) | **GET** /api/listsamplerecords/localtime |  |
| [**listSampleServiceListLong**](ListSampleServiceApi.md#listsampleservicelistlong) | **GET** /api/listsamplerecords/long |  |
| [**listSampleServiceListOffsetDateTime**](ListSampleServiceApi.md#listsampleservicelistoffsetdatetime) | **GET** /api/listsamplerecords/offsetdatetime |  |
| [**listSampleServiceListScalar**](ListSampleServiceApi.md#listsampleservicelistscalar) | **GET** /api/listsamplerecords/scalar |  |
| [**listSampleServiceListShort**](ListSampleServiceApi.md#listsampleservicelistshort) | **GET** /api/listsamplerecords/short |  |
| [**listSampleServiceListSimpleRecord**](ListSampleServiceApi.md#listsampleservicelistsimplerecord) | **GET** /api/listsamplerecords/simplerecord |  |
| [**listSampleServiceListSimpleRecordWithError**](ListSampleServiceApi.md#listsampleservicelistsimplerecordwitherror) | **GET** /api/listsamplerecords/simplerecordwitherror |  |
| [**listSampleServiceListString**](ListSampleServiceApi.md#listsampleserviceliststring) | **GET** /api/listsamplerecords/string |  |
| [**listSampleServiceListZonedDateTime**](ListSampleServiceApi.md#listsampleservicelistzoneddatetime) | **GET** /api/listsamplerecords/zoneddatetime |  |



## listSampleServiceListBoolean

> Array&lt;boolean&gt; listSampleServiceListBoolean()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListBooleanRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListBoolean();
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


## listSampleServiceListDouble

> Array&lt;number&gt; listSampleServiceListDouble()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListDoubleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListDouble();
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


## listSampleServiceListEnum

> Array&lt;SampleEnum&gt; listSampleServiceListEnum()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListEnumRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListEnum();
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


## listSampleServiceListFloat

> Array&lt;number&gt; listSampleServiceListFloat()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListFloatRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListFloat();
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


## listSampleServiceListInt

> Array&lt;number&gt; listSampleServiceListInt()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListIntRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListInt();
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


## listSampleServiceListLocalDate

> Array&lt;Date&gt; listSampleServiceListLocalDate()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListLocalDateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListLocalDate();
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


## listSampleServiceListLocalDateTime

> Array&lt;string&gt; listSampleServiceListLocalDateTime()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListLocalDateTimeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListLocalDateTime();
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


## listSampleServiceListLocalTime

> Array&lt;string&gt; listSampleServiceListLocalTime()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListLocalTimeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListLocalTime();
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


## listSampleServiceListLong

> Array&lt;number&gt; listSampleServiceListLong()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListLongRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListLong();
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


## listSampleServiceListOffsetDateTime

> Array&lt;string&gt; listSampleServiceListOffsetDateTime()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListOffsetDateTimeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListOffsetDateTime();
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


## listSampleServiceListScalar

> Array&lt;string&gt; listSampleServiceListScalar()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListScalarRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListScalar();
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


## listSampleServiceListShort

> Array&lt;number&gt; listSampleServiceListShort()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListShortRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListShort();
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


## listSampleServiceListSimpleRecord

> Array&lt;SimpleRecord&gt; listSampleServiceListSimpleRecord()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListSimpleRecordRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListSimpleRecord();
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


## listSampleServiceListSimpleRecordWithError

> Array&lt;SimpleRecord&gt; listSampleServiceListSimpleRecordWithError()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListSimpleRecordWithErrorRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListSimpleRecordWithError();
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
| **400** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listSampleServiceListString

> Array&lt;string&gt; listSampleServiceListString()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListStringRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListString();
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


## listSampleServiceListZonedDateTime

> Array&lt;string&gt; listSampleServiceListZonedDateTime()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ListSampleServiceListZonedDateTimeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.listSampleServiceListZonedDateTime();
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

