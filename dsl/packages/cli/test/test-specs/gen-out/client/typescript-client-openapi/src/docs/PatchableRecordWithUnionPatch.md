
# PatchableRecordWithUnionPatch


## Properties

Name | Type
------------ | -------------
`value` | [PatchableUnion](PatchableUnion.md)
`valueNull` | [PatchableUnion](PatchableUnion.md)
`valueOpt` | [PatchableUnion](PatchableUnion.md)
`valueOptNull` | [PatchableUnion](PatchableUnion.md)
`list` | [Array&lt;PatchableUnion&gt;](PatchableUnion.md)
`listNull` | [Array&lt;PatchableUnion&gt;](PatchableUnion.md)
`listOpt` | [Array&lt;PatchableUnion&gt;](PatchableUnion.md)
`listOptNull` | [Array&lt;PatchableUnion&gt;](PatchableUnion.md)

## Example

```typescript
import type { PatchableRecordWithUnionPatch } from ''

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
} satisfies PatchableRecordWithUnionPatch

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchableRecordWithUnionPatch
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


