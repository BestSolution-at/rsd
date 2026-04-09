
# PatchableRecordOfRecordsPatch


## Properties

Name | Type
------------ | -------------
`key` | string
`version` | string
`value` | [PatchableRecordBasic](PatchableRecordBasic.md)
`value_Null` | [PatchableRecordBasic](PatchableRecordBasic.md)
`value_Opt` | [PatchableRecordBasic](PatchableRecordBasic.md)
`value_Opt_Null` | [PatchableRecordBasic](PatchableRecordBasic.md)
`list` | [Array&lt;PatchableRecordBasic&gt;](PatchableRecordBasic.md)
`list_Null` | [Array&lt;PatchableRecordBasic&gt;](PatchableRecordBasic.md)
`list_Opt` | [Array&lt;PatchableRecordBasic&gt;](PatchableRecordBasic.md)
`list_Opt_Null` | [Array&lt;PatchableRecordBasic&gt;](PatchableRecordBasic.md)

## Example

```typescript
import type { PatchableRecordOfRecordsPatch } from ''

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
} satisfies PatchableRecordOfRecordsPatch

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchableRecordOfRecordsPatch
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


