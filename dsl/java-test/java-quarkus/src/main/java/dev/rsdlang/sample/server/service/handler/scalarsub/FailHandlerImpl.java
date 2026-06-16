package dev.rsdlang.sample.server.service.handler.scalarsub;

import dev.rsdlang.sample.server.MyRange;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleErrorScalarSubException;
import dev.rsdlang.sample.server.service.impl.ScalarSubstition_ServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class FailHandlerImpl implements ScalarSubstition_ServiceServiceImpl.FailHandler {

    @Override
    public void fail(BuilderFactory _factory) throws SampleErrorScalarSubException {
        throw new SampleErrorScalarSubException("This is a sample error from the server", new MyRange(0, 0));
    }

}
