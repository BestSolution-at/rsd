package dev.rsdlang.sample.server.service.handler.enumsub;

import java.util.List;

import dev.rsdlang.sample.server.DayOfWeek;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.EnumSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListHandlerImpl implements EnumSubstition_ServiceServiceImpl.ListHandler {

    @Override
    public List<DayOfWeek> list(BuilderFactory _factory) {
        return List.of(DayOfWeek.MONDAY, DayOfWeek.TUESDAY);
    }

}
