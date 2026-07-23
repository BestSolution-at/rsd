package dev.rsdlang.sample.server.service.handler.enumsub;

import dev.rsdlang.sample.server.DayOfWeek;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.EnumSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PostHandlerImpl implements EnumSubstition_ServiceServiceImpl.PostHandler {

    @Override
    public DayOfWeek post(BuilderFactory _factory, DayOfWeek dayOfWeek) {
        return dayOfWeek;
    }

}
