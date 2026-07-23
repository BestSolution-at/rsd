package dev.rsdlang.sample.server.service.handler.enumsub;

import java.util.Optional;

import dev.rsdlang.sample.server.DayOfWeek;
import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.EnumSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class QueryNullHandlerImpl implements EnumSubstition_ServiceServiceImpl.QueryNullHandler {

    @Override
    public NilResult queryNull(BuilderFactory _factory, Optional<DayOfWeek> dayOfWeek) {
        if (dayOfWeek.isPresent()) {
            return NilResult.DEFINED;
        }
        return NilResult.NULL;
    }

}
