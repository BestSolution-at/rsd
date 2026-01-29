package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleError2Exception;
import dev.rsdlang.sample.server.service.SampleErrorException;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;

public class MultiErrorOperationHandlerImpl implements SampleServiceServiceImpl.MultiErrorOperationHandler {

	@Override
	public void multiErrorOperation(BuilderFactory _factory) throws SampleErrorException, SampleError2Exception {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'multiErrorOperation'");
	}

}
