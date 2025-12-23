import { encode, decode } from '@msgpack/msgpack';

const object = {
	nil: null,
	integer: 1,
	float: Math.PI,
	string: 'Hello, world!',
	binary: Uint8Array.from([1, 2, 3]),
	array: [10, 20, 30],
	map: { foo: 'bar' },
	timestampExt: new Date(),
};

const encoded: Uint8Array = encode(object);
const result = await fetch('http://localhost:3001/msgpack', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/msgpack',
	},
	body: encoded,
});

const arrayBuffer = await result.arrayBuffer();
console.log('RESULT', decode(arrayBuffer));

/*const decoded: any = decode(encoded);

console.log('Original Object:', object);
console.log('Encoded Uint8Array:', encoded);
console.log('Decoded Object:', decoded);
*/
