# DogControllerApi

All URIs are relative to *http://192.168.0.185:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getAllDogs**](#getalldogs) | **GET** /api/dogs | |
|[**getDogById**](#getdogbyid) | **GET** /api/dogs/{id} | |
|[**getDogsByEnergyRange**](#getdogsbyenergyrange) | **GET** /api/dogs/by-energy | |
|[**getDogsBySize**](#getdogsbysize) | **GET** /api/dogs/by-size/{size} | |

# **getAllDogs**
> Array<DogDto> getAllDogs()


### Example

```typescript
import {
    DogControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DogControllerApi(configuration);

const { status, data } = await apiInstance.getAllDogs();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<DogDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDogById**
> DogDto getDogById()


### Example

```typescript
import {
    DogControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DogControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getDogById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**DogDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDogsByEnergyRange**
> Array<DogDto> getDogsByEnergyRange()


### Example

```typescript
import {
    DogControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DogControllerApi(configuration);

let minEnergy: string; // (default to undefined)
let maxEnergy: string; // (default to undefined)

const { status, data } = await apiInstance.getDogsByEnergyRange(
    minEnergy,
    maxEnergy
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **minEnergy** | [**string**] |  | defaults to undefined|
| **maxEnergy** | [**string**] |  | defaults to undefined|


### Return type

**Array<DogDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDogsBySize**
> Array<DogDto> getDogsBySize()


### Example

```typescript
import {
    DogControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DogControllerApi(configuration);

let size: string; // (default to undefined)

const { status, data } = await apiInstance.getDogsBySize(
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **size** | [**string**] |  | defaults to undefined|


### Return type

**Array<DogDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

