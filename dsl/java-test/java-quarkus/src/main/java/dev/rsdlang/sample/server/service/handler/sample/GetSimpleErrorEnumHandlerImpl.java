package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleErrorEnumException;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import dev.rsdlang.sample.server.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetSimpleErrorEnumHandlerImpl implements SampleServiceServiceImpl.GetSimpleErrorEnumHandler {

    @Override
    public void getSimpleErrorEnum(BuilderFactory _factory) throws SampleErrorEnumException {
        throw new SampleErrorEnumException("This is a sample enum error from the server", SampleEnum.A);
    }

}
