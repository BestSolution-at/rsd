
# PatchableRecordOfRecordsPatch


## Properties

Name | Type
------------ | -------------
`value` | [PatchableRecordBasic](PatchableRecordBasic.md)
`valueNull` | [PatchableRecordBasic](PatchableRecordBasic.md)
`valueOpt` | [PatchableRecordBasic](PatchableRecordBasic.md)
`valueOptNull` | [PatchableRecordBasic](PatchableRecordBasic.md)
`list` | [Array&lt;PatchableRecordBasic&gt;](PatchableRecordBasic.md)
`listNull` | [Array&lt;PatchableRecordBasic&gt;](PatchableRecordBasic.md)
`listOpt` | [Array&lt;PatchableRecordBasic&gt;](PatchableRecordBasic.md)
`listOptNull` | [Array&lt;PatchableRecordBasic&gt;](PatchableRecordBasic.md)

## Example

```typescript
import type { PatchableRecordOfRecordsPatch } from ''

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


