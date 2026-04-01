
# EnumRecord


## Properties

Name | Type
------------ | -------------
`value` | [SampleEnum](SampleEnum.md)
`valueNull` | [SampleEnum](SampleEnum.md)
`valueOpt` | [SampleEnum](SampleEnum.md)
`valueOptNull` | [SampleEnum](SampleEnum.md)
`list` | [Array&lt;SampleEnum&gt;](SampleEnum.md)
`listNull` | [Array&lt;SampleEnum&gt;](SampleEnum.md)
`listOpt` | [Array&lt;SampleEnum&gt;](SampleEnum.md)
`listOptNull` | [Array&lt;SampleEnum&gt;](SampleEnum.md)

## Example

```typescript
import type { EnumRecord } from ''

// TODO: Update the object below with actual values
const example = {
  "value": null,
  "valueNull": null,
  "valueOpt": null,
  "valueOptNull": null,
  "list": null,
  "listNull": null,
  "listOpt": null,
  "listOptNull": null,
} satisfies EnumRecord

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EnumRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


