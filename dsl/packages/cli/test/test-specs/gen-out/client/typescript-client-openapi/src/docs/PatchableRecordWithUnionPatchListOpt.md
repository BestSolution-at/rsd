
# PatchableRecordWithUnionPatchListOpt


## Properties

Name | Type
------------ | -------------
`type` | string
`elements` | [Array&lt;PatchableUnion&gt;](PatchableUnion.md)
`additions` | [Array&lt;PatchableUnion&gt;](PatchableUnion.md)
`updates` | [Array&lt;PatchableUnionPatch&gt;](PatchableUnionPatch.md)
`removals` | Array&lt;string&gt;

## Example

```typescript
import type { PatchableRecordWithUnionPatchListOpt } from ''

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "elements": null,
  "additions": null,
  "updates": null,
  "removals": null,
} satisfies PatchableRecordWithUnionPatchListOpt

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchableRecordWithUnionPatchListOpt
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


