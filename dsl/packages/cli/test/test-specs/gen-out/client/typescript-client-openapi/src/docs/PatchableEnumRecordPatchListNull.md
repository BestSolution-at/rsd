
# PatchableEnumRecordPatchListNull


## Properties

Name | Type
------------ | -------------
`type` | string
`elements` | [Array&lt;SampleEnum&gt;](SampleEnum.md)
`additions` | [Array&lt;SampleEnum&gt;](SampleEnum.md)
`removals` | [Array&lt;SampleEnum&gt;](SampleEnum.md)

## Example

```typescript
import type { PatchableEnumRecordPatchListNull } from ''

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "elements": null,
  "additions": null,
  "removals": null,
} satisfies PatchableEnumRecordPatchListNull

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchableEnumRecordPatchListNull
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


