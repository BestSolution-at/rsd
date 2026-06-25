package dev.rsdlang.person.server.service.impl.handlers.personservice;

import jakarta.enterprise.context.ApplicationScoped;
import dev.rsdlang.person.server.service.impl.PersonServiceImpl;

@ApplicationScoped
public class DeleteHandlerImpl implements PersonServiceImpl.DeleteHandler {
    @Override
    public void delete(dev.rsdlang.person.server.service.BuilderFactory f, String id) {
        MemoryStore.getInstance().delete(id);
    }

}
