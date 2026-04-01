
# EnumInlineRecord


## Properties

Name | Type
------------ | -------------
`value` | string
`valueNull` | string
`valueOpt` | string
`valueOptNull` | string
`list` | Array&lt;string&gt;
`listNull` | Array&lt;string&gt;
`listOptNull` | Array&lt;string&gt;

## Example

```typescript
import type { EnumInlineRecord } from ''

// TODO: Update the object below with actual values
const example = {
  "value": null,
  "valueNull": null,
  "valueOpt": null,
  "valueOptNull": null,
  "list": null,
  "listNull": null,
  "listOptNull": null,
} satisfies EnumInlineRecord

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EnumInlineRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


