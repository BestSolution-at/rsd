package dev.rsdlang.person.server.service.impl.handlers.personservice;

import dev.rsdlang.person.server.model.Person;
import dev.rsdlang.person.server.service.BuilderFactory;
import dev.rsdlang.person.server.service.impl.PersonServiceImpl;

public class GetHandlerImpl implements PersonServiceImpl.GetHandler {
    @Override
    public Person.Data get(BuilderFactory f, String id) {
        return MemoryStore.getInstance().get(id);
    }

}
