package dev.rsdlang;

import java.net.URI;

import dev.rsdlang.person.client.PersonService;
import dev.rsdlang.person.client.Result.ERR;
import dev.rsdlang.person.client.Result.OK;
import dev.rsdlang.person.client.jdkhttp.JDKPersonClient;
import dev.rsdlang.person.client.model.Person;

public class Main {
    public static void main(String[] args) {
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
        switch (result) {
            case OK(var value) -> System.out.println("%s %s".formatted(value.lastName(), value.firstName()));
            case ERR(var error) -> System.err.println("Something went terribly wrong");
        }
    }
}