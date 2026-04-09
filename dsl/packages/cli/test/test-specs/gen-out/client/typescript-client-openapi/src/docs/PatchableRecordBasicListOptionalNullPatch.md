
# PatchableRecordBasicListOptionalNullPatch


## Properties

Name | Type
------------ | -------------
`key` | string
`version` | string
`valueBoolean` | Array&lt;boolean&gt;
`valueShort` | Array&lt;number&gt;
`valueInt` | Array&lt;number&gt;
`valueLong` | Array&lt;number&gt;
`valueFloat` | Array&lt;number&gt;
`valueDouble` | Array&lt;number&gt;
`valueString` | Array&lt;string&gt;
`valueLocalDate` | Array&lt;Date&gt;
`valueLocalDateTime` | Array&lt;string&gt;
`valueZonedDateTime` | Array&lt;string&gt;

## Example

```typescript
import type { PatchableRecordBasicListOptionalNullPatch } from ''

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
} satisfies PatchableRecordBasicListOptionalNullPatch

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchableRecordBasicListOptionalNullPatch
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


