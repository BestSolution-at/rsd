package dev.rsdlang.sample.server.service.handler.enumsub;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.DayOfWeek;
import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.EnumSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class QueryListOptHandlerImpl implements EnumSubstition_ServiceServiceImpl.QueryListOptHandler {

    @Override
    public NilResult queryListOpt(BuilderFactory _factory, Optional<List<DayOfWeek>> dayOfWeek) {
        if (dayOfWeek.isPresent()) {
            return NilResult.DEFINED;
        }
        return NilResult.UNDEFINED;
    }

}
