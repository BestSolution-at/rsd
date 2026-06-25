# RSD - Remote Service Description

RSD is a DSL to define services and generated client and server code for it.

## Supported protocols

### REST

RSD provides the possibility to define REST-APIs and generated:

- Java Server Code
  - Jakarta WS (eg to use in Quarkus)
- Java Client Code
  - Backed by JDK HTTP Client
- Typescript Client Code
  - Backed by `fetch` use able in any JS/TS environment (Node, Browser, bun, ...)
- Generation of OpenAPI Specification

The following encodings are supported:

- Java Server: JSON, msgpack
- Java Client: JSON, msgpack
- TS/JS Client: JSON, msgpack

## Sample

The following is a very simple sample

### Define your API

In a file named `person.rsd` you define the basic API

```ts
record Person {
	@id id: string
	@rev version: string

	firstName: string
	lastName: string
	birthDate?: local-date // Optional
}

service Person {
	operation create(person: Person): Person;
	operation get(id: string): Person;
	operation update(id: string, person: Person): Person;
	operation delete(id: string);
}
```

### Define the REST-Binding

In a file named `person.rrsd` you define how to map this API as a REST resource

```ts
resource Person at '/api/person' {
	POST create at 'create' => {
		201
	}
	GET get at 'get/${id}' => {
		200
	}
	PUT update at 'update/${id}' => {
		200
	}
	DELETE delete at 'delete/${id}' => {
		204
	}
}
```

### Implement server code

The code generator already created REST-Resources. The custom code the user has to write are so called handlers for each operation. So one has to implement the following handlers:

- `CreateHandler`
- `GetHandler`
- `UpdateHandler`
- `DeleteHandler`

The `CreateHandler` implementation might look like this:

```java
package dev.rsdlang.person.server.service.impl.handlers.personservice;

import dev.rsdlang.person.server.model.Person;
import dev.rsdlang.person.server.service.BuilderFactory;
import dev.rsdlang.person.server.service.impl.PersonServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CreateHandlerImpl implements PersonServiceImpl.CreateHandler {
    @Override
    public Person.Data create(BuilderFactory f, Person.Data person) {
        MemoryStore.getInstance().put(person.id(), person);
        return person;
    }

}
```

### Use of generated client code

Depending on the configuration of the code generator your can invoke APIs in your favorite language like this

#### Java

```java
var client = JDKPersonClient.builder()
  .baseURI(URI.create("http://localhost:8080"))
  .build();
var personService = client.service(PersonService.class);

var person = client.builder(Person.DataBuilder.class)
  .id("1")
  .version("0")
  .firstName("Tom")
  .lastName("Schindl")
  .build();

personService.create(person);

var result = personService.get("1");
switch(result) {
  case OK(var value)
    -> System.out.println("%s %s".formatted(value.lastName(), value.firstName()));
  case ERR(var error)
    -> System.err.println("Something went terribly wrong");
}
```

#### Typescript

```ts
import { createPersonService } from "./lib/index.js";

const personService = createPersonService({
  baseUrl: "http://localhost:8080",
});

await personService.create({
  id: "1",
  version: "0",
  firstName: "Tom",
  lastName: "Schindl",
});

const [person, err] = await personService.get("1");

if (person) {
  console.log(`${person.lastName} ${person.firstName}`);
} else {
  console.error("Error", err);
}
```
