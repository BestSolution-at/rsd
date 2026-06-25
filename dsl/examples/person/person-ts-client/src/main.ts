import { createPersonService } from './lib/index.js';

const personService = createPersonService({
	baseUrl: 'http://localhost:8080',
});

await personService.create({ id: '1', version: '0', firstName: 'Tom', lastName: 'Schindl' });

const [person, err] = await personService.get('1');

if (person) {
	console.log(`Person: ${person.lastName} ${person.firstName}`);
} else {
	console.error('Error', err);
}
