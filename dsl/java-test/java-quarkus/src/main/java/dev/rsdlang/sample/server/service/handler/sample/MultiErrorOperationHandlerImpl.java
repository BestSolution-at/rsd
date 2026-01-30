package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.Headers;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleError2Exception;
import dev.rsdlang.sample.server.service.SampleErrorException;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class MultiErrorOperationHandlerImpl implements SampleServiceServiceImpl.MultiErrorOperationHandler {
	@Inject
	Headers headers;

	@Override
	public void multiErrorOperation(BuilderFactory _factory) throws SampleErrorException, SampleError2Exception {
		if (headers.error401) {
			throw new SampleError2Exception("This is a sample error 2 from the server");
		}
		throw new SampleErrorException("This is a sample error from the server");
	}

}
