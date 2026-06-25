package dev.rsdlang.person.server.service.impl.handlers.personservice;

import dev.rsdlang.person.server.model.Person;
import dev.rsdlang.person.server.service.BuilderFactory;
import dev.rsdlang.person.server.service.impl.PersonServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UpdateHandlerImpl implements PersonServiceImpl.UpdateHandler {
    @Override
    public Person.Data update(BuilderFactory f, String id, Person.Data person) {
        MemoryStore.getInstance().update(id, person);
        return person;
    }

}
