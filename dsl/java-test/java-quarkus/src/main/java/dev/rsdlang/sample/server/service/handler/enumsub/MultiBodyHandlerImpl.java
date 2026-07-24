package dev.rsdlang.sample.server.service.handler.enumsub;

import java.time.Month;

import dev.rsdlang.sample.server.DayOfWeek;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.EnumSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiBodyHandlerImpl implements EnumSubstition_ServiceServiceImpl.MultiBodyHandler {

    @Override
    public String multiBody(BuilderFactory _factory, DayOfWeek valueA, Month valueB) {
        return DayOfWeek.toString(valueA) + " " + valueB.name();
    }

}
