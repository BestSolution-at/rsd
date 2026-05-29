package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleErrorWithValueException;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import dev.rsdlang.sample.server.service.model.ErrorData;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetSimpleErrorWithValueHandlerImpl implements SampleServiceServiceImpl.GetSimpleErrorWithValueHandler {

    @Override
    public void getSimpleErrorWithValue(BuilderFactory _factory) throws SampleErrorWithValueException {
        var data = _factory.builder(ErrorData.DataBuilder.class)
                .message("An error message")
                .build();
        throw new SampleErrorWithValueException("This is a sample error with value from the server", data);
    }

}
