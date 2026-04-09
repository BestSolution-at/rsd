# PathParameterTypeServiceApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**pathParameterTypeServiceMultiPathParam**](PathParameterTypeServiceApi.md#pathparametertypeservicemultipathparam) | **GET** /api/pathparametertype/multipathparam/{valueA}/{valueB} |  |
| [**pathParameterTypeServiceSimpleBooleanPathParam**](PathParameterTypeServiceApi.md#pathparametertypeservicesimplebooleanpathparam) | **GET** /api/pathparametertype/boolean/{pathBoolean} |  |
| [**pathParameterTypeServiceSimpleDoublePathParam**](PathParameterTypeServiceApi.md#pathparametertypeservicesimpledoublepathparam) | **GET** /api/pathparametertype/double/{pathDouble} |  |
| [**pathParameterTypeServiceSimpleEnumPathParam**](PathParameterTypeServiceApi.md#pathparametertypeservicesimpleenumpathparam) | **GET** /api/pathparametertype/enum/{pathEnum} |  |
| [**pathParameterTypeServiceSimpleFloatPathParam**](PathParameterTypeServiceApi.md#pathparametertypeservicesimplefloatpathparam) | **GET** /api/pathparametertype/float/{pathFloat} |  |
| [**pathParameterTypeServiceSimpleIntPathParam**](PathParameterTypeServiceApi.md#pathparametertypeservicesimpleintpathparam) | **GET** /api/pathparametertype/int/{pathInt} |  |
| [**pathParameterTypeServiceSimpleLocalDatePathParam**](PathParameterTypeServiceApi.md#pathparametertypeservicesimplelocaldatepathparam) | **GET** /api/pathparametertype/localdate/{pathLocalDate} |  |
| [**pathParameterTypeServiceSimpleLocalDateTimePathParam**](PathParameterTypeServiceApi.md#pathparametertypeservicesimplelocaldatetimepathparam) | **GET** /api/pathparametertype/localdatetime/{pathLocalDateTime} |  |
| [**pathParameterTypeServiceSimpleLongPathParam**](PathParameterTypeServiceApi.md#pathparametertypeservicesimplelongpathparam) | **GET** /api/pathparametertype/long/{pathLong} |  |
| [**pathParameterTypeServiceSimpleScalarPathParam**](PathParameterTypeServiceApi.md#pathparametertypeservicesimplescalarpathparam) | **GET** /api/pathparametertype/scalar/{pathScalar} |  |
| [**pathParameterTypeServiceSimpleShortPathParam**](PathParameterTypeServiceApi.md#pathparametertypeservicesimpleshortpathparam) | **GET** /api/pathparametertype/short/{pathShort} |  |
| [**pathParameterTypeServiceSimpleStringPathParam**](PathParameterTypeServiceApi.md#pathparametertypeservicesimplestringpathparam) | **GET** /api/pathparametertype/string/{pathString} |  |
| [**pathParameterTypeServiceSimpleZonedDateTimePathParam**](PathParameterTypeServiceApi.md#pathparametertypeservicesimplezoneddatetimepathparam) | **GET** /api/pathparametertype/zoneddatetime/{pathZonedDateTime} |  |



## pathParameterTypeServiceMultiPathParam

> string pathParameterTypeServiceMultiPathParam(valueA, valueB)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { PathParameterTypeServiceMultiPathParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // string | 
    valueA: valueA_example,
    // number | 
    valueB: 8.14,
  } satisfies PathParameterTypeServiceMultiPathParamRequest;

  try {
    const data = await api.pathParameterTypeServiceMultiPathParam(body);
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


## pathParameterTypeServiceSimpleBooleanPathParam

> boolean pathParameterTypeServiceSimpleBooleanPathParam(pathBoolean)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { PathParameterTypeServiceSimpleBooleanPathParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // boolean | 
    pathBoolean: true,
  } satisfies PathParameterTypeServiceSimpleBooleanPathParamRequest;

  try {
    const data = await api.pathParameterTypeServiceSimpleBooleanPathParam(body);
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


## pathParameterTypeServiceSimpleDoublePathParam

> number pathParameterTypeServiceSimpleDoublePathParam(pathDouble)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { PathParameterTypeServiceSimpleDoublePathParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // number | 
    pathDouble: 1.2,
  } satisfies PathParameterTypeServiceSimpleDoublePathParamRequest;

  try {
    const data = await api.pathParameterTypeServiceSimpleDoublePathParam(body);
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


## pathParameterTypeServiceSimpleEnumPathParam

> SampleEnum pathParameterTypeServiceSimpleEnumPathParam(pathEnum)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { PathParameterTypeServiceSimpleEnumPathParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // SampleEnum | 
    pathEnum: ...,
  } satisfies PathParameterTypeServiceSimpleEnumPathParamRequest;

  try {
    const data = await api.pathParameterTypeServiceSimpleEnumPathParam(body);
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


## pathParameterTypeServiceSimpleFloatPathParam

> number pathParameterTypeServiceSimpleFloatPathParam(pathFloat)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { PathParameterTypeServiceSimpleFloatPathParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // number | 
    pathFloat: 3.4,
  } satisfies PathParameterTypeServiceSimpleFloatPathParamRequest;

  try {
    const data = await api.pathParameterTypeServiceSimpleFloatPathParam(body);
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


## pathParameterTypeServiceSimpleIntPathParam

> number pathParameterTypeServiceSimpleIntPathParam(pathInt)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { PathParameterTypeServiceSimpleIntPathParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // number | 
    pathInt: 8.14,
  } satisfies PathParameterTypeServiceSimpleIntPathParamRequest;

  try {
    const data = await api.pathParameterTypeServiceSimpleIntPathParam(body);
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


## pathParameterTypeServiceSimpleLocalDatePathParam

> Date pathParameterTypeServiceSimpleLocalDatePathParam(pathLocalDate)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { PathParameterTypeServiceSimpleLocalDatePathParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // Date | 
    pathLocalDate: 2013-10-20,
  } satisfies PathParameterTypeServiceSimpleLocalDatePathParamRequest;

  try {
    const data = await api.pathParameterTypeServiceSimpleLocalDatePathParam(body);
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


## pathParameterTypeServiceSimpleLocalDateTimePathParam

> string pathParameterTypeServiceSimpleLocalDateTimePathParam(pathLocalDateTime)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { PathParameterTypeServiceSimpleLocalDateTimePathParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // string | 
    pathLocalDateTime: pathLocalDateTime_example,
  } satisfies PathParameterTypeServiceSimpleLocalDateTimePathParamRequest;

  try {
    const data = await api.pathParameterTypeServiceSimpleLocalDateTimePathParam(body);
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


## pathParameterTypeServiceSimpleLongPathParam

> number pathParameterTypeServiceSimpleLongPathParam(pathLong)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { PathParameterTypeServiceSimpleLongPathParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // number | 
    pathLong: 8.14,
  } satisfies PathParameterTypeServiceSimpleLongPathParamRequest;

  try {
    const data = await api.pathParameterTypeServiceSimpleLongPathParam(body);
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


## pathParameterTypeServiceSimpleScalarPathParam

> string pathParameterTypeServiceSimpleScalarPathParam(pathScalar)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { PathParameterTypeServiceSimpleScalarPathParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // string | 
    pathScalar: pathScalar_example,
  } satisfies PathParameterTypeServiceSimpleScalarPathParamRequest;

  try {
    const data = await api.pathParameterTypeServiceSimpleScalarPathParam(body);
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


## pathParameterTypeServiceSimpleShortPathParam

> number pathParameterTypeServiceSimpleShortPathParam(pathShort)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { PathParameterTypeServiceSimpleShortPathParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // number | 
    pathShort: 8.14,
  } satisfies PathParameterTypeServiceSimpleShortPathParamRequest;

  try {
    const data = await api.pathParameterTypeServiceSimpleShortPathParam(body);
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


## pathParameterTypeServiceSimpleStringPathParam

> string pathParameterTypeServiceSimpleStringPathParam(pathString)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { PathParameterTypeServiceSimpleStringPathParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // string | 
    pathString: pathString_example,
  } satisfies PathParameterTypeServiceSimpleStringPathParamRequest;

  try {
    const data = await api.pathParameterTypeServiceSimpleStringPathParam(body);
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


## pathParameterTypeServiceSimpleZonedDateTimePathParam

> string pathParameterTypeServiceSimpleZonedDateTimePathParam(pathZonedDateTime)





### Example

```ts
import {
  Configuration,
  PathParameterTypeServiceApi,
} from '';
import type { PathParameterTypeServiceSimpleZonedDateTimePathParamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PathParameterTypeServiceApi();

  const body = {
    // string | 
    pathZonedDateTime: pathZonedDateTime_example,
  } satisfies PathParameterTypeServiceSimpleZonedDateTimePathParamRequest;

  try {
    const data = await api.pathParameterTypeServiceSimpleZonedDateTimePathParam(body);
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

