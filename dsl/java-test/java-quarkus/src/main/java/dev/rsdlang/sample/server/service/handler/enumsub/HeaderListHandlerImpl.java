package dev.rsdlang.sample.server.service.handler.enumsub;

import java.util.List;

import dev.rsdlang.sample.server.DayOfWeek;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.EnumSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class HeaderListHandlerImpl implements EnumSubstition_ServiceServiceImpl.HeaderListHandler {

    @Override
    public List<DayOfWeek> headerList(BuilderFactory _factory, List<DayOfWeek> dayOfWeek) {
        return dayOfWeek;
    }

}
