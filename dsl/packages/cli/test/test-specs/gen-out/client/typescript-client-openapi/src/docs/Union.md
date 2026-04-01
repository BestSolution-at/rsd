
# Union


## Properties

Name | Type
------------ | -------------
`shared` | string
`valueA` | string
`type` | string
`valueB` | string

## Example

```typescript
import type { Union } from ''

// TODO: Update the object below with actual values
const example = {
  "shared": null,
  "valueA": null,
  "type": null,
  "valueB": null,
} satisfies Union

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Union
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


