
# BinaryTypesUploadMixedRequestRsdPayload


## Properties

Name | Type
------------ | -------------
`text` | string
`number` | number
`rec` | [SimpleRecord](SimpleRecord.md)
`scalar_` | string
`textList` | Array&lt;string&gt;
`numberList` | Array&lt;number&gt;
`recList` | [Array&lt;SimpleRecord&gt;](SimpleRecord.md)
`scalarList` | Array&lt;string&gt;

## Example

```typescript
import type { BinaryTypesUploadMixedRequestRsdPayload } from ''

// TODO: Update the object below with actual values
const example = {
  "text": null,
  "number": null,
  "rec": null,
  "scalar_": null,
  "textList": null,
  "numberList": null,
  "recList": null,
  "scalarList": null,
} satisfies BinaryTypesUploadMixedRequestRsdPayload

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BinaryTypesUploadMixedRequestRsdPayload
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


