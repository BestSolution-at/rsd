package dev.rsdlang.sample.server.service.handler.path;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleIntPathParamHandlerImpl implements PathParameterTypeServiceServiceImpl.SimpleIntPathParamHandler {

	@Override
	public int simpleIntPathParam(BuilderFactory _factory, int pathInt) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleIntPathParam'");
	}

}
