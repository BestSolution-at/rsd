
# MixedResult


## Properties

Name | Type
------------ | -------------
`pathString` | string
`pathNumber` | number
`headerString` | string
`headerNumber` | number
`headerRecord` | [SimpleRecord](SimpleRecord.md)
`queryString` | string
`queryNumber` | number
`queryRecord` | [SimpleRecord](SimpleRecord.md)
`dataBlob` | number

## Example

```typescript
import type { MixedResult } from ''

// TODO: Update the object below with actual values
const example = {
  "pathString": null,
  "pathNumber": null,
  "headerString": null,
  "headerNumber": null,
  "headerRecord": null,
  "queryString": null,
  "queryNumber": null,
  "queryRecord": null,
  "dataBlob": null,
} satisfies MixedResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MixedResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


