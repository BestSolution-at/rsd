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
