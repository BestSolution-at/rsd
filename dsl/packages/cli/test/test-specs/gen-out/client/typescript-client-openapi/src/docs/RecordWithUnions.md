
# RecordWithUnions


## Properties

Name | Type
------------ | -------------
`value` | [Union](Union.md)
`valueNull` | [Union](Union.md)
`valueOpt` | [Union](Union.md)
`valueOptNull` | [Union](Union.md)
`list` | [Array&lt;Union&gt;](Union.md)
`listNull` | [Array&lt;Union&gt;](Union.md)
`listOpt` | [Array&lt;Union&gt;](Union.md)
`listOptNull` | [Array&lt;Union&gt;](Union.md)

## Example

```typescript
import type { RecordWithUnions } from ''

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
} satisfies RecordWithUnions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RecordWithUnions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


