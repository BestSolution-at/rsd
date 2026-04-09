
# PatchableUnionBPatch


## Properties

Name | Type
------------ | -------------
`key` | string
`version` | string
`shared` | string
`valueB` | string

## Example

```typescript
import type { PatchableUnionBPatch } from ''

// TODO: Update the object below with actual values
const example = {
  "key": null,
  "version": null,
  "shared": null,
  "valueB": null,
} satisfies PatchableUnionBPatch

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchableUnionBPatch
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


