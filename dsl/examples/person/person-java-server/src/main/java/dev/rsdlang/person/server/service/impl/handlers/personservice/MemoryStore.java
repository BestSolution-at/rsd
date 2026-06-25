package dev.rsdlang.person.server.service.impl.handlers.personservice;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import dev.rsdlang.person.server.model.Person;

public class MemoryStore {
    private static class Holder {
        private static final MemoryStore INSTANCE = new MemoryStore();
    }

    public static MemoryStore getInstance() {
        return Holder.INSTANCE;
    }

    private static final Map<String, Person.Data> store = new ConcurrentHashMap<>();

    public void put(String id, Person.Data person) {
        synchronized (store) {
            if (store.containsKey(id)) {
                throw new IllegalArgumentException("Person with id " + id + " already exists");
            }
            store.put(id, person);
        }
    }

    public Person.Data get(String id) {
        return store.get(id);
    }

    public void update(String id, Person.Data person) {
        synchronized (store) {
            if (!store.containsKey(id)) {
                throw new IllegalArgumentException("Person with id " + id + " does not exist");
            }
            store.put(id, person);
        }
    }

    public void delete(String id) {
        synchronized (store) {
            if (!store.containsKey(id)) {
                throw new IllegalArgumentException("Person with id " + id + " does not exist");
            }
            store.remove(id);
        }
    }

    public List<Person.Data> getAll() {
        return new ArrayList<>(store.values());
    }
}
