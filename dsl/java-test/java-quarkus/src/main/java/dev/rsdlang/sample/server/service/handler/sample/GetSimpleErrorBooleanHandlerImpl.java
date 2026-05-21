package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleErrorBooleanException;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetSimpleErrorBooleanHandlerImpl implements SampleServiceServiceImpl.GetSimpleErrorBooleanHandler {

    @Override
    public void getSimpleErrorBoolean(BuilderFactory _factory) throws SampleErrorBooleanException {
        throw new SampleErrorBooleanException("This is a sample boolean error from the server", true);
    }

}
