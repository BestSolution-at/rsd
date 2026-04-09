
# ScalarRecord


## Properties

Name | Type
------------ | -------------
`value` | string
`value_Null` | string
`value_Opt` | string
`value_Opt_Null` | string
`list` | Array&lt;string&gt;
`list_Null` | Array&lt;string&gt;
`list_Opt` | Array&lt;string&gt;
`list_Opt_Null` | Array&lt;string&gt;

## Example

```typescript
import type { ScalarRecord } from ''

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
} satisfies ScalarRecord

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScalarRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


