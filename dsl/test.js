const response = await fetch('http://localhost:3000/hello/custom-multi');
const reader = response.body.getReader();
// console.log('READER', reader);
console.log('RESPONSE', response);
const decoder = new TextDecoder();
let result = '';
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  var v = decoder.decode(value);
  //console.log('===========================');
  console.log("Chunk: " + v);
  result += v;
}
// console.log(result);