package dev.rsdlang.sample.server.service.handler.enumsub;

import dev.rsdlang.sample.server.DayOfWeek;
import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.model._Base.Nillable;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.EnumSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class HeaderOptNullHandlerImpl implements EnumSubstition_ServiceServiceImpl.HeaderOptNullHandler {

    @Override
    public NilResult headerOptNull(BuilderFactory _factory, Nillable<DayOfWeek> dayOfWeek) {
        if (dayOfWeek.isNull()) {
            return NilResult.NULL;
        } else if (dayOfWeek.isUndefined()) {
            return NilResult.UNDEFINED;
        }
        return NilResult.DEFINED;
    }

}
