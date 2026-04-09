
# PatchableRecordBasicOptionalNullPatch


## Properties

Name | Type
------------ | -------------
`key` | string
`version` | string
`valueBoolean` | boolean
`valueShort` | number
`valueInt` | number
`valueLong` | number
`valueFloat` | number
`valueDouble` | number
`valueString` | string
`valueLocalDate` | Date
`valueLocalDateTime` | string
`valueZonedDateTime` | string

## Example

```typescript
import type { PatchableRecordBasicOptionalNullPatch } from ''

// TODO: Update the object below with actual values
const example = {
  "key": null,
  "version": null,
  "valueBoolean": null,
  "valueShort": null,
  "valueInt": null,
  "valueLong": null,
  "valueFloat": null,
  "valueDouble": null,
  "valueString": null,
  "valueLocalDate": null,
  "valueLocalDateTime": null,
  "valueZonedDateTime": null,
} satisfies PatchableRecordBasicOptionalNullPatch

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchableRecordBasicOptionalNullPatch
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


