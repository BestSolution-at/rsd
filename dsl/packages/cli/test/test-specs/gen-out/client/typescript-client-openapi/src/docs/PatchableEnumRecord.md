
# PatchableEnumRecord


## Properties

Name | Type
------------ | -------------
`key` | string
`version` | string
`value` | [SampleEnum](SampleEnum.md)
`value_Null` | [SampleEnum](SampleEnum.md)
`value_Opt` | [SampleEnum](SampleEnum.md)
`value_Opt_Null` | [SampleEnum](SampleEnum.md)
`list` | [Array&lt;SampleEnum&gt;](SampleEnum.md)
`list_Null` | [Array&lt;SampleEnum&gt;](SampleEnum.md)
`list_Opt` | [Array&lt;SampleEnum&gt;](SampleEnum.md)
`list_Opt_Null` | [Array&lt;SampleEnum&gt;](SampleEnum.md)

## Example

```typescript
import type { PatchableEnumRecord } from ''

// TODO: Update the object below with actual values
const example = {
  "key": null,
  "version": null,
  "value": null,
  "value_Null": null,
  "value_Opt": null,
  "value_Opt_Null": null,
  "list": null,
  "list_Null": null,
  "list_Opt": null,
  "list_Opt_Null": null,
} satisfies PatchableEnumRecord

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchableEnumRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


