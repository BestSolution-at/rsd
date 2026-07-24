package dev.rsdlang.sample.server.service.handler.enumsub;

import dev.rsdlang.sample.server.DayOfWeek;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleErrorEnumSubException;
import dev.rsdlang.sample.server.service.impl.EnumSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class FailHandlerImpl implements EnumSubstition_ServiceServiceImpl.FailHandler {

    @Override
    public void fail(BuilderFactory _factory) throws SampleErrorEnumSubException {
        throw new SampleErrorEnumSubException("This is a sample error from the server", DayOfWeek.MONDAY);
    }

}
