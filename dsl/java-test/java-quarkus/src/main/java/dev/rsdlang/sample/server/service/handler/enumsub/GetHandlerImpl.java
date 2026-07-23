package dev.rsdlang.sample.server.service.handler.enumsub;

import dev.rsdlang.sample.server.DayOfWeek;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.EnumSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetHandlerImpl implements EnumSubstition_ServiceServiceImpl.GetHandler {

    @Override
    public DayOfWeek get(BuilderFactory _factory) {
        return DayOfWeek.MONDAY;
    }

}
