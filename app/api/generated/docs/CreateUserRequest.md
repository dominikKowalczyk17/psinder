# CreateUserRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [default to undefined]
**password** | **string** |  | [default to undefined]
**age** | **number** |  | [optional] [default to undefined]
**bio** | **string** |  | [optional] [default to undefined]
**dog** | [**CreateDogRequest**](CreateDogRequest.md) |  | [default to undefined]

## Example

```typescript
import { CreateUserRequest } from './api';

const instance: CreateUserRequest = {
    name,
    password,
    age,
    bio,
    dog,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
