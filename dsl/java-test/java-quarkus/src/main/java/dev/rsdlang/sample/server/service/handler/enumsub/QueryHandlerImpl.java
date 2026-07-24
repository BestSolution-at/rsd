package dev.rsdlang.sample.server.service.handler.enumsub;

import dev.rsdlang.sample.server.DayOfWeek;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.EnumSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class QueryHandlerImpl implements EnumSubstition_ServiceServiceImpl.QueryHandler {

    @Override
    public DayOfWeek query(BuilderFactory _factory, DayOfWeek dayOfWeek) {
        System.out.println("QueryHandlerImpl.query: " + dayOfWeek);
        return dayOfWeek;
    }

}
