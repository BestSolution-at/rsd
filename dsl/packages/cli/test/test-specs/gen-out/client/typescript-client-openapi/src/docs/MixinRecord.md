
# MixinRecord


## Properties

Name | Type
------------ | -------------
`sample` | string
`mValueString` | string
`mValueString2` | string
`myUnion` | [Union](Union.md)
`myRecord` | [SimpleRecord](SimpleRecord.md)

## Example

```typescript
import type { MixinRecord } from ''

// TODO: Update the object below with actual values
const example = {
  "sample": null,
  "mValueString": null,
  "mValueString2": null,
  "myUnion": null,
  "myRecord": null,
} satisfies MixinRecord

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MixinRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


