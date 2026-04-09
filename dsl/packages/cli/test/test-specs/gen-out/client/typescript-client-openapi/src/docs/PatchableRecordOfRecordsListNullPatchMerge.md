
# PatchableRecordOfRecordsListNullPatchMerge


## Properties

Name | Type
------------ | -------------
`type` | string
`additions` | [Array&lt;PatchableRecordBasic&gt;](PatchableRecordBasic.md)
`updates` | [Array&lt;PatchableRecordBasicPatch&gt;](PatchableRecordBasicPatch.md)
`removals` | Array&lt;string&gt;

## Example

```typescript
import type { PatchableRecordOfRecordsListNullPatchMerge } from ''

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "additions": null,
  "updates": null,
  "removals": null,
} satisfies PatchableRecordOfRecordsListNullPatchMerge

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchableRecordOfRecordsListNullPatchMerge
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


