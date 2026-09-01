# ListStreamingServiceApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**listStreamingServiceStreamBoolean**](ListStreamingServiceApi.md#liststreamingservicestreamboolean) | **GET** /api/liststreaming/streamBoolean |  |
| [**listStreamingServiceStreamDouble**](ListStreamingServiceApi.md#liststreamingservicestreamdouble) | **GET** /api/liststreaming/streamDouble |  |
| [**listStreamingServiceStreamEnum**](ListStreamingServiceApi.md#liststreamingservicestreamenum) | **GET** /api/liststreaming/streamEnum |  |
| [**listStreamingServiceStreamFloat**](ListStreamingServiceApi.md#liststreamingservicestreamfloat) | **GET** /api/liststreaming/streamFloat |  |
| [**listStreamingServiceStreamInlineEnum**](ListStreamingServiceApi.md#liststreamingservicestreaminlineenum) | **GET** /api/liststreaming/streamInlineEnum |  |
| [**listStreamingServiceStreamInt**](ListStreamingServiceApi.md#liststreamingservicestreamint) | **GET** /api/liststreaming/streamInt |  |
| [**listStreamingServiceStreamLocalDate**](ListStreamingServiceApi.md#liststreamingservicestreamlocaldate) | **GET** /api/liststreaming/streamLocalDate |  |
| [**listStreamingServiceStreamLocalDateTime**](ListStreamingServiceApi.md#liststreamingservicestreamlocaldatetime) | **GET** /api/liststreaming/streamLocalDateTime |  |
| [**listStreamingServiceStreamLocalTime**](ListStreamingServiceApi.md#liststreamingservicestreamlocaltime) | **GET** /api/liststreaming/streamLocalTime |  |
| [**listStreamingServiceStreamLong**](ListStreamingServiceApi.md#liststreamingservicestreamlong) | **GET** /api/liststreaming/streamLong |  |
| [**listStreamingServiceStreamOffsetDateTime**](ListStreamingServiceApi.md#liststreamingservicestreamoffsetdatetime) | **GET** /api/liststreaming/streamOffsetDateTime |  |
| [**listStreamingServiceStreamRecord**](ListStreamingServiceApi.md#liststreamingservicestreamrecord) | **GET** /api/liststreaming/streamRecord |  |
| [**listStreamingServiceStreamScalar**](ListStreamingServiceApi.md#liststreamingservicestreamscalar) | **GET** /api/liststreaming/streamScalar |  |
| [**listStreamingServiceStreamShort**](ListStreamingServiceApi.md#liststreamingservicestreamshort) | **GET** /api/liststreaming/streamShort |  |
| [**listStreamingServiceStreamString**](ListStreamingServiceApi.md#liststreamingservicestreamstring) | **GET** /api/liststreaming/streamString |  |
| [**listStreamingServiceStreamUnion**](ListStreamingServiceApi.md#liststreamingservicestreamunion) | **GET** /api/liststreaming/streamUnion |  |
| [**listStreamingServiceStreamZonedDateTime**](ListStreamingServiceApi.md#liststreamingservicestreamzoneddatetime) | **GET** /api/liststreaming/streamZonedDateTime |  |
| [**listStreamingServiceUploadFileStreamRecords**](ListStreamingServiceApi.md#liststreamingserviceuploadfilestreamrecords) | **POST** /api/liststreaming/uploadFileStreamRecords |  |



## listStreamingServiceStreamBoolean

> Array&lt;boolean&gt; listStreamingServiceStreamBoolean()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamBooleanRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamBoolean();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamDouble

> Array&lt;number&gt; listStreamingServiceStreamDouble()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamDoubleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamDouble();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamEnum

> Array&lt;SampleEnum&gt; listStreamingServiceStreamEnum()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamEnumRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamEnum();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamFloat

> Array&lt;number&gt; listStreamingServiceStreamFloat()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamFloatRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamFloat();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamInlineEnum

> Array&lt;string&gt; listStreamingServiceStreamInlineEnum()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamInlineEnumRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamInlineEnum();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamInt

> Array&lt;number&gt; listStreamingServiceStreamInt()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamIntRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamInt();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamLocalDate

> Array&lt;Date&gt; listStreamingServiceStreamLocalDate()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamLocalDateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamLocalDate();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamLocalDateTime

> Array&lt;string&gt; listStreamingServiceStreamLocalDateTime()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamLocalDateTimeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamLocalDateTime();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamLocalTime

> Array&lt;string&gt; listStreamingServiceStreamLocalTime()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamLocalTimeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamLocalTime();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamLong

> Array&lt;number&gt; listStreamingServiceStreamLong()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamLongRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamLong();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamOffsetDateTime

> Array&lt;Date&gt; listStreamingServiceStreamOffsetDateTime()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamOffsetDateTimeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamOffsetDateTime();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamRecord

> Array&lt;SimpleRecord&gt; listStreamingServiceStreamRecord()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamRecordRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamRecord();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamScalar

> Array&lt;string&gt; listStreamingServiceStreamScalar()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamScalarRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamScalar();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamShort

> Array&lt;number&gt; listStreamingServiceStreamShort()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamShortRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamShort();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamString

> Array&lt;string&gt; listStreamingServiceStreamString()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamStringRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamString();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamUnion

> Array&lt;Union&gt; listStreamingServiceStreamUnion()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamUnionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamUnion();
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

[**Array&lt;Union&gt;**](Union.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceStreamZonedDateTime

> Array&lt;string&gt; listStreamingServiceStreamZonedDateTime()





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceStreamZonedDateTimeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  try {
    const data = await api.listStreamingServiceStreamZonedDateTime();
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
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listStreamingServiceUploadFileStreamRecords

> Array&lt;SimpleRecord&gt; listStreamingServiceUploadFileStreamRecords(data)





### Example

```ts
import {
  Configuration,
  ListStreamingServiceApi,
} from '';
import type { ListStreamingServiceUploadFileStreamRecordsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListStreamingServiceApi();

  const body = {
    // Blob
    data: BINARY_DATA_HERE,
  } satisfies ListStreamingServiceUploadFileStreamRecordsRequest;

  try {
    const data = await api.listStreamingServiceUploadFileStreamRecords(body);
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

[**Array&lt;SimpleRecord&gt;**](SimpleRecord.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

