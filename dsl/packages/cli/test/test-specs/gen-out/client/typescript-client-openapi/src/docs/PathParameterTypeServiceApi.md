# PathParameterTypeServiceApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiPathparametertypeBooleanPathBooleanGet**](PathParameterTypeServiceApi.md#apipathparametertypebooleanpathbooleanget) | **GET** /api/pathparametertype/boolean/{pathBoolean} |  |
| [**apiPathparametertypeDoublePathDoubleGet**](PathParameterTypeServiceApi.md#apipathparametertypedoublepathdoubleget) | **GET** /api/pathparametertype/double/{pathDouble} |  |
| [**apiPathparametertypeEnumPathEnumGet**](PathParameterTypeServiceApi.md#apipathparametertypeenumpathenumget) | **GET** /api/pathparametertype/enum/{pathEnum} |  |
| [**apiPathparametertypeFloatPathFloatGet**](PathParameterTypeServiceApi.md#apipathparametertypefloatpathfloatget) | **GET** /api/pathparametertype/float/{pathFloat} |  |
| [**apiPathparametertypeIntPathIntGet**](PathParameterTypeServiceApi.md#apipathparametertypeintpathintget) | **GET** /api/pathparametertype/int/{pathInt} |  |
| [**apiPathparametertypeLocaldatePathLocalDateGet**](PathParameterTypeServiceApi.md#apipathparametertypelocaldatepathlocaldateget) | **GET** /api/pathparametertype/localdate/{pathLocalDate} |  |
| [**apiPathparametertypeLocaldatetimePathLocalDateTimeGet**](PathParameterTypeServiceApi.md#apipathparametertypelocaldatetimepathlocaldatetimeget) | **GET** /api/pathparametertype/localdatetime/{pathLocalDateTime} |  |
| [**apiPathparametertypeLongPathLongGet**](PathParameterTypeServiceApi.md#apipathparametertypelongpathlongget) | **GET** /api/pathparametertype/long/{pathLong} |  |
| [**apiPathparametertypeMultipathparamValueAValueBGet**](PathParameterTypeServiceApi.md#apipathparametertypemultipathparamvalueavaluebget) | **GET** /api/pathparametertype/multipathparam/{valueA}/{valueB} |  |
| [**apiPathparametertypeScalarPathScalarGet**](PathParameterTypeServiceApi.md#apipathparametertypescalarpathscalarget) | **GET** /api/pathparametertype/scalar/{pathScalar} |  |
| [**apiPathparametertypeShortPathShortGet**](PathParameterTypeServiceApi.md#apipathparametertypeshortpathshortget) | **GET** /api/pathparametertype/short/{pathShort} |  |
| [**apiPathparametertypeStringPathStringGet**](PathParameterTypeServiceApi.md#apipathparametertypestringpathstringget) | **GET** /api/pathparametertype/string/{pathString} |  |
| [**apiPathparametertypeZoneddatetimePathZonedDateTimeGet**](PathParameterTypeServiceApi.md#apipathparametertypezoneddatetimepathzoneddatetimeget) | **GET** /api/pathparametertype/zoneddatetime/{pathZonedDateTime} |  |



## apiPathparametertypeBooleanPathBooleanGet

> boolean apiPathparametertypeBooleanPathBooleanGet(pathBoolean)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { ApiPathparametertypeBooleanPathBooleanGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // boolean | 
    pathBoolean: true,
  } satisfies ApiPathparametertypeBooleanPathBooleanGetRequest;

  try {
    const data = await api.apiPathparametertypeBooleanPathBooleanGet(body);
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
| **pathBoolean** | `boolean` |  | [Defaults to `undefined`] |

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


## apiPathparametertypeDoublePathDoubleGet

> number apiPathparametertypeDoublePathDoubleGet(pathDouble)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { ApiPathparametertypeDoublePathDoubleGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // number | 
    pathDouble: 1.2,
  } satisfies ApiPathparametertypeDoublePathDoubleGetRequest;

  try {
    const data = await api.apiPathparametertypeDoublePathDoubleGet(body);
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
| **pathDouble** | `number` |  | [Defaults to `undefined`] |

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


## apiPathparametertypeEnumPathEnumGet

> SampleEnum apiPathparametertypeEnumPathEnumGet(pathEnum)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { ApiPathparametertypeEnumPathEnumGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // SampleEnum | 
    pathEnum: ...,
  } satisfies ApiPathparametertypeEnumPathEnumGetRequest;

  try {
    const data = await api.apiPathparametertypeEnumPathEnumGet(body);
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
| **pathEnum** | `SampleEnum` |  | [Defaults to `undefined`] [Enum: A, B] |

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


## apiPathparametertypeFloatPathFloatGet

> number apiPathparametertypeFloatPathFloatGet(pathFloat)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { ApiPathparametertypeFloatPathFloatGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // number | 
    pathFloat: 3.4,
  } satisfies ApiPathparametertypeFloatPathFloatGetRequest;

  try {
    const data = await api.apiPathparametertypeFloatPathFloatGet(body);
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
| **pathFloat** | `number` |  | [Defaults to `undefined`] |

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


## apiPathparametertypeIntPathIntGet

> number apiPathparametertypeIntPathIntGet(pathInt)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { ApiPathparametertypeIntPathIntGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // number | 
    pathInt: 8.14,
  } satisfies ApiPathparametertypeIntPathIntGetRequest;

  try {
    const data = await api.apiPathparametertypeIntPathIntGet(body);
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
| **pathInt** | `number` |  | [Defaults to `undefined`] |

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


## apiPathparametertypeLocaldatePathLocalDateGet

> Date apiPathparametertypeLocaldatePathLocalDateGet(pathLocalDate)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { ApiPathparametertypeLocaldatePathLocalDateGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // Date | 
    pathLocalDate: 2013-10-20,
  } satisfies ApiPathparametertypeLocaldatePathLocalDateGetRequest;

  try {
    const data = await api.apiPathparametertypeLocaldatePathLocalDateGet(body);
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
| **pathLocalDate** | `Date` |  | [Defaults to `undefined`] |

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


## apiPathparametertypeLocaldatetimePathLocalDateTimeGet

> string apiPathparametertypeLocaldatetimePathLocalDateTimeGet(pathLocalDateTime)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { ApiPathparametertypeLocaldatetimePathLocalDateTimeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // string | 
    pathLocalDateTime: pathLocalDateTime_example,
  } satisfies ApiPathparametertypeLocaldatetimePathLocalDateTimeGetRequest;

  try {
    const data = await api.apiPathparametertypeLocaldatetimePathLocalDateTimeGet(body);
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
| **pathLocalDateTime** | `string` |  | [Defaults to `undefined`] |

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


## apiPathparametertypeLongPathLongGet

> number apiPathparametertypeLongPathLongGet(pathLong)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { ApiPathparametertypeLongPathLongGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // number | 
    pathLong: 8.14,
  } satisfies ApiPathparametertypeLongPathLongGetRequest;

  try {
    const data = await api.apiPathparametertypeLongPathLongGet(body);
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
| **pathLong** | `number` |  | [Defaults to `undefined`] |

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


## apiPathparametertypeMultipathparamValueAValueBGet

> string apiPathparametertypeMultipathparamValueAValueBGet(valueA, valueB)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { ApiPathparametertypeMultipathparamValueAValueBGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // string | 
    valueA: valueA_example,
    // number | 
    valueB: 8.14,
  } satisfies ApiPathparametertypeMultipathparamValueAValueBGetRequest;

  try {
    const data = await api.apiPathparametertypeMultipathparamValueAValueBGet(body);
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
| **valueA** | `string` |  | [Defaults to `undefined`] |
| **valueB** | `number` |  | [Defaults to `undefined`] |

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


## apiPathparametertypeScalarPathScalarGet

> string apiPathparametertypeScalarPathScalarGet(pathScalar)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { ApiPathparametertypeScalarPathScalarGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // string | 
    pathScalar: pathScalar_example,
  } satisfies ApiPathparametertypeScalarPathScalarGetRequest;

  try {
    const data = await api.apiPathparametertypeScalarPathScalarGet(body);
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
| **pathScalar** | `string` |  | [Defaults to `undefined`] |

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


## apiPathparametertypeShortPathShortGet

> number apiPathparametertypeShortPathShortGet(pathShort)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { ApiPathparametertypeShortPathShortGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // number | 
    pathShort: 8.14,
  } satisfies ApiPathparametertypeShortPathShortGetRequest;

  try {
    const data = await api.apiPathparametertypeShortPathShortGet(body);
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
| **pathShort** | `number` |  | [Defaults to `undefined`] |

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


## apiPathparametertypeStringPathStringGet

> string apiPathparametertypeStringPathStringGet(pathString)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { ApiPathparametertypeStringPathStringGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // string | 
    pathString: pathString_example,
  } satisfies ApiPathparametertypeStringPathStringGetRequest;

  try {
    const data = await api.apiPathparametertypeStringPathStringGet(body);
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


## apiPathparametertypeZoneddatetimePathZonedDateTimeGet

> string apiPathparametertypeZoneddatetimePathZonedDateTimeGet(pathZonedDateTime)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { ApiPathparametertypeZoneddatetimePathZonedDateTimeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // string | 
    pathZonedDateTime: pathZonedDateTime_example,
  } satisfies ApiPathparametertypeZoneddatetimePathZonedDateTimeGetRequest;

  try {
    const data = await api.apiPathparametertypeZoneddatetimePathZonedDateTimeGet(body);
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
| **pathZonedDateTime** | `string` |  | [Defaults to `undefined`] |

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

