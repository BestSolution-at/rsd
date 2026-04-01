# ListSampleServiceApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiListsamplerecordsBooleanGet**](ListSampleServiceApi.md#apilistsamplerecordsbooleanget) | **GET** /api/listsamplerecords/boolean |  |
| [**apiListsamplerecordsDoubleGet**](ListSampleServiceApi.md#apilistsamplerecordsdoubleget) | **GET** /api/listsamplerecords/double |  |
| [**apiListsamplerecordsEnumGet**](ListSampleServiceApi.md#apilistsamplerecordsenumget) | **GET** /api/listsamplerecords/enum |  |
| [**apiListsamplerecordsFloatGet**](ListSampleServiceApi.md#apilistsamplerecordsfloatget) | **GET** /api/listsamplerecords/float |  |
| [**apiListsamplerecordsIntGet**](ListSampleServiceApi.md#apilistsamplerecordsintget) | **GET** /api/listsamplerecords/int |  |
| [**apiListsamplerecordsLocaldateGet**](ListSampleServiceApi.md#apilistsamplerecordslocaldateget) | **GET** /api/listsamplerecords/localdate |  |
| [**apiListsamplerecordsLocaldatetimeGet**](ListSampleServiceApi.md#apilistsamplerecordslocaldatetimeget) | **GET** /api/listsamplerecords/localdatetime |  |
| [**apiListsamplerecordsLongGet**](ListSampleServiceApi.md#apilistsamplerecordslongget) | **GET** /api/listsamplerecords/long |  |
| [**apiListsamplerecordsScalarGet**](ListSampleServiceApi.md#apilistsamplerecordsscalarget) | **GET** /api/listsamplerecords/scalar |  |
| [**apiListsamplerecordsShortGet**](ListSampleServiceApi.md#apilistsamplerecordsshortget) | **GET** /api/listsamplerecords/short |  |
| [**apiListsamplerecordsSimplerecordGet**](ListSampleServiceApi.md#apilistsamplerecordssimplerecordget) | **GET** /api/listsamplerecords/simplerecord |  |
| [**apiListsamplerecordsSimplerecordwitherrorGet**](ListSampleServiceApi.md#apilistsamplerecordssimplerecordwitherrorget) | **GET** /api/listsamplerecords/simplerecordwitherror |  |
| [**apiListsamplerecordsStringGet**](ListSampleServiceApi.md#apilistsamplerecordsstringget) | **GET** /api/listsamplerecords/string |  |
| [**apiListsamplerecordsZoneddatetimeGet**](ListSampleServiceApi.md#apilistsamplerecordszoneddatetimeget) | **GET** /api/listsamplerecords/zoneddatetime |  |



## apiListsamplerecordsBooleanGet

> Array&lt;boolean&gt; apiListsamplerecordsBooleanGet()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ApiListsamplerecordsBooleanGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.apiListsamplerecordsBooleanGet();
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


## apiListsamplerecordsDoubleGet

> Array&lt;number&gt; apiListsamplerecordsDoubleGet()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ApiListsamplerecordsDoubleGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.apiListsamplerecordsDoubleGet();
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


## apiListsamplerecordsEnumGet

> Array&lt;SampleEnum&gt; apiListsamplerecordsEnumGet()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ApiListsamplerecordsEnumGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.apiListsamplerecordsEnumGet();
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


## apiListsamplerecordsFloatGet

> Array&lt;number&gt; apiListsamplerecordsFloatGet()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ApiListsamplerecordsFloatGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.apiListsamplerecordsFloatGet();
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


## apiListsamplerecordsIntGet

> Array&lt;number&gt; apiListsamplerecordsIntGet()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ApiListsamplerecordsIntGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.apiListsamplerecordsIntGet();
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


## apiListsamplerecordsLocaldateGet

> Array&lt;Date&gt; apiListsamplerecordsLocaldateGet()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ApiListsamplerecordsLocaldateGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.apiListsamplerecordsLocaldateGet();
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


## apiListsamplerecordsLocaldatetimeGet

> Array&lt;string&gt; apiListsamplerecordsLocaldatetimeGet()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ApiListsamplerecordsLocaldatetimeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.apiListsamplerecordsLocaldatetimeGet();
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


## apiListsamplerecordsLongGet

> Array&lt;number&gt; apiListsamplerecordsLongGet()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ApiListsamplerecordsLongGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.apiListsamplerecordsLongGet();
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


## apiListsamplerecordsScalarGet

> string apiListsamplerecordsScalarGet()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ApiListsamplerecordsScalarGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.apiListsamplerecordsScalarGet();
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


## apiListsamplerecordsShortGet

> Array&lt;number&gt; apiListsamplerecordsShortGet()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ApiListsamplerecordsShortGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.apiListsamplerecordsShortGet();
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


## apiListsamplerecordsSimplerecordGet

> Array&lt;SimpleRecord&gt; apiListsamplerecordsSimplerecordGet()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ApiListsamplerecordsSimplerecordGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.apiListsamplerecordsSimplerecordGet();
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


## apiListsamplerecordsSimplerecordwitherrorGet

> Array&lt;SimpleRecord&gt; apiListsamplerecordsSimplerecordwitherrorGet()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ApiListsamplerecordsSimplerecordwitherrorGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.apiListsamplerecordsSimplerecordwitherrorGet();
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


## apiListsamplerecordsStringGet

> Array&lt;string&gt; apiListsamplerecordsStringGet()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ApiListsamplerecordsStringGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.apiListsamplerecordsStringGet();
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


## apiListsamplerecordsZoneddatetimeGet

> Array&lt;string&gt; apiListsamplerecordsZoneddatetimeGet()





### Example

```ts
import {
  Configuration,
  ListSampleServiceApi,
} from '';
import type { ApiListsamplerecordsZoneddatetimeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ListSampleServiceApi();

  try {
    const data = await api.apiListsamplerecordsZoneddatetimeGet();
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

