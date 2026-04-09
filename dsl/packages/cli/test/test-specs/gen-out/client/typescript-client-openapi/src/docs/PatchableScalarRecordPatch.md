
# PatchableScalarRecordPatch


## Properties

Name | Type
------------ | -------------
`key` | string
`version` | string
`value` | string
`value_Null` | string
`value_Opt` | string
`value_Opt_Null` | string
`list` | [PatchableScalarRecordPatchList](PatchableScalarRecordPatchList.md)
`list_Null` | [PatchableScalarRecordPatchListNull](PatchableScalarRecordPatchListNull.md)
`list_Opt` | [PatchableScalarRecordPatchListOpt](PatchableScalarRecordPatchListOpt.md)
`list_Opt_Null` | [PatchableScalarRecordPatchListOptNull](PatchableScalarRecordPatchListOptNull.md)

## Example

```typescript
import type { PatchableScalarRecordPatch } from ''

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
} satisfies PatchableScalarRecordPatch

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchableScalarRecordPatch
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


