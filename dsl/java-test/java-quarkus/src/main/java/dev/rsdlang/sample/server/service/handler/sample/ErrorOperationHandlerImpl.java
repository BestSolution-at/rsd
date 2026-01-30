package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleErrorException;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ErrorOperationHandlerImpl implements SampleServiceServiceImpl.ErrorOperationHandler {

	@Override
	public void errorOperation(BuilderFactory _factory) throws SampleErrorException {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'errorOperation'");
	}

}
