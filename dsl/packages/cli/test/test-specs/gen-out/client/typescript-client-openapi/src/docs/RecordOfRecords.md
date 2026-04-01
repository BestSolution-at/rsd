
# RecordOfRecords


## Properties

Name | Type
------------ | -------------
`value` | [SimpleRecordBasic](SimpleRecordBasic.md)
`valueNull` | [SimpleRecordBasic](SimpleRecordBasic.md)
`valueOpt` | [SimpleRecordBasic](SimpleRecordBasic.md)
`valueOptNull` | [SimpleRecordBasic](SimpleRecordBasic.md)
`list` | [Array&lt;SimpleRecordBasic&gt;](SimpleRecordBasic.md)
`listNull` | [Array&lt;SimpleRecordBasic&gt;](SimpleRecordBasic.md)
`listOpt` | [Array&lt;SimpleRecordBasic&gt;](SimpleRecordBasic.md)
`listOptNull` | [Array&lt;SimpleRecordBasic&gt;](SimpleRecordBasic.md)

## Example

```typescript
import type { RecordOfRecords } from ''

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
} satisfies RecordOfRecords

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RecordOfRecords
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


