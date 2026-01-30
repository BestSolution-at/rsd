package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.Headers;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleErrorException;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ErrorOperationHandlerImpl implements SampleServiceServiceImpl.ErrorOperationHandler {
	@Inject
	public Headers headers;

	@Override
	public void errorOperation(BuilderFactory _factory) throws SampleErrorException {
		throw new SampleErrorException("This is a sample error from the server");
	}

}
