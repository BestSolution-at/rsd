package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.model.ErrorData;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleError2Exception;
import dev.rsdlang.sample.server.service.SampleErrorException;
import dev.rsdlang.sample.server.service.SampleErrorWithValueException;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiErrorSameCodeHandlerImpl implements SampleServiceServiceImpl.MultiErrorSameCodeHandler {

    @Override
    public void multiErrorSameCode(BuilderFactory _factory, int errorType)
            throws SampleErrorException, SampleError2Exception, SampleErrorWithValueException {
        if (errorType == 0) {
            throw new SampleErrorException("This is a sample error from the server");
        } else if (errorType == 1) {
            throw new SampleError2Exception("This is a sample error 2 from the server");
        } else if (errorType == 2) {
            var data = _factory.builder(ErrorData.DataBuilder.class)
                    .message("An error message")
                    .build();
            throw new SampleErrorWithValueException("This is a sample error with value from the server", data);
        }
    }

}
