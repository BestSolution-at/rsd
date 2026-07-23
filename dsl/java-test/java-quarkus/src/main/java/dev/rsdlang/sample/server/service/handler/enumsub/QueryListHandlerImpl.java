package dev.rsdlang.sample.server.service.handler.enumsub;

import java.util.List;

import dev.rsdlang.sample.server.DayOfWeek;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.EnumSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class QueryListHandlerImpl implements EnumSubstition_ServiceServiceImpl.QueryListHandler {

    @Override
    public List<DayOfWeek> queryList(BuilderFactory _factory, List<DayOfWeek> dayOfWeek) {
        return dayOfWeek;
    }

}
