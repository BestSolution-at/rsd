package dev.rsdlang.sample.server.service.handler.enumsub;

import java.util.List;

import dev.rsdlang.sample.server.DayOfWeek;
import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.model._Base.Nillable;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.EnumSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class QueryListOptNullHandlerImpl implements EnumSubstition_ServiceServiceImpl.QueryListOptNullHandler {

    @Override
    public NilResult queryListOptNull(BuilderFactory _factory, Nillable<List<DayOfWeek>> dayOfWeek) {
        if (dayOfWeek.isNull()) {
            return NilResult.NULL;
        } else if (dayOfWeek.isUndefined()) {
            return NilResult.UNDEFINED;
        }
        return NilResult.DEFINED;
    }

}
