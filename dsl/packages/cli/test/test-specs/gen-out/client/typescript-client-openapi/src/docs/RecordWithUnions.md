
# RecordWithUnions


## Properties

Name | Type
------------ | -------------
`value` | [Union](Union.md)
`value_Null` | [Union](Union.md)
`value_Opt` | [Union](Union.md)
`value_Opt_Null` | [Union](Union.md)
`list` | [Array&lt;Union&gt;](Union.md)
`list_Null` | [Array&lt;Union&gt;](Union.md)
`list_Opt` | [Array&lt;Union&gt;](Union.md)
`list_Opt_Null` | [Array&lt;Union&gt;](Union.md)

## Example

```typescript
import type { RecordWithUnions } from ''

// TODO: Update the object below with actual values
const example = {
  "value": null,
  "value_Null": null,
  "value_Opt": null,
  "value_Opt_Null": null,
  "list": null,
  "list_Null": null,
  "list_Opt": null,
  "list_Opt_Null": null,
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


