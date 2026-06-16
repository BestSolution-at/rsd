
# PatchableScalarRecordSubstitutionPatch


## Properties

Name | Type
------------ | -------------
`key` | string
`version` | string
`value` | string
`value_Null` | string
`value_Opt` | string
`value_Opt_Null` | string
`list` | [PatchableScalarRecordSubstitutionPatchList](PatchableScalarRecordSubstitutionPatchList.md)
`list_Null` | [PatchableScalarRecordSubstitutionPatchListNull](PatchableScalarRecordSubstitutionPatchListNull.md)
`list_Opt` | [PatchableScalarRecordSubstitutionPatchListOpt](PatchableScalarRecordSubstitutionPatchListOpt.md)
`list_Opt_Null` | [PatchableScalarRecordSubstitutionPatchListOptNull](PatchableScalarRecordSubstitutionPatchListOptNull.md)

## Example

```typescript
import type { PatchableScalarRecordSubstitutionPatch } from ''

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
} satisfies PatchableScalarRecordSubstitutionPatch

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchableScalarRecordSubstitutionPatch
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


