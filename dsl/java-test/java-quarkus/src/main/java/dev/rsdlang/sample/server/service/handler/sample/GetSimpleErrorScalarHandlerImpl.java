package dev.rsdlang.sample.server.service.handler.sample;

import java.time.ZoneId;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleErrorScalarException;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetSimpleErrorScalarHandlerImpl implements SampleServiceServiceImpl.GetSimpleErrorScalarHandler {

    @Override
    public void getSimpleErrorScalar(BuilderFactory _factory) throws SampleErrorScalarException {
        throw new SampleErrorScalarException("This is a sample scalar error from the server",
                ZoneId.of("America/New_York"));
    }

}
