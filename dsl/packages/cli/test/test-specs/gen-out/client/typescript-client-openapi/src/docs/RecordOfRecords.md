
# RecordOfRecords


## Properties

Name | Type
------------ | -------------
`value` | [SimpleRecordBasic](SimpleRecordBasic.md)
`value_Null` | [SimpleRecordBasic](SimpleRecordBasic.md)
`value_Opt` | [SimpleRecordBasic](SimpleRecordBasic.md)
`value_Opt_Null` | [SimpleRecordBasic](SimpleRecordBasic.md)
`list` | [Array&lt;SimpleRecordBasic&gt;](SimpleRecordBasic.md)
`list_Null` | [Array&lt;SimpleRecordBasic&gt;](SimpleRecordBasic.md)
`list_Opt` | [Array&lt;SimpleRecordBasic&gt;](SimpleRecordBasic.md)
`list_Opt_Null` | [Array&lt;SimpleRecordBasic&gt;](SimpleRecordBasic.md)

## Example

```typescript
import type { RecordOfRecords } from ''

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


