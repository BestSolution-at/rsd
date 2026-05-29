package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleErrorIntException;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetSimpleErrorIntHandlerImpl implements SampleServiceServiceImpl.GetSimpleErrorIntHandler {

    @Override
    public void getSimpleErrorInt(BuilderFactory _factory) throws SampleErrorIntException {
        throw new SampleErrorIntException("This is a sample int error from the server", 123);
    }

}
