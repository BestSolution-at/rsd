
# PatchableRecordOfRecordsPatch


## Properties

Name | Type
------------ | -------------
`key` | string
`version` | string
`value` | [PatchableRecordOfRecordsPatchValue](PatchableRecordOfRecordsPatchValue.md)
`value_Null` | [PatchableRecordOfRecordsPatchValueNull](PatchableRecordOfRecordsPatchValueNull.md)
`value_Opt` | [PatchableRecordOfRecordsPatchValueOpt](PatchableRecordOfRecordsPatchValueOpt.md)
`value_Opt_Null` | [PatchableRecordOfRecordsPatchValueOptNull](PatchableRecordOfRecordsPatchValueOptNull.md)
`list` | [PatchableRecordOfRecordsPatchList](PatchableRecordOfRecordsPatchList.md)
`list_Null` | [PatchableRecordOfRecordsPatchListNull](PatchableRecordOfRecordsPatchListNull.md)
`list_Opt` | [PatchableRecordOfRecordsPatchListOpt](PatchableRecordOfRecordsPatchListOpt.md)
`list_Opt_Null` | [PatchableRecordOfRecordsPatchListOptNull](PatchableRecordOfRecordsPatchListOptNull.md)

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


