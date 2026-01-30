package dev.rsdlang.sample.server.service.handler.path;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiPathParamHandlerImpl implements PathParameterTypeServiceServiceImpl.MultiPathParamHandler {

	@Override
	public String multiPathParam(BuilderFactory _factory, String valueA, int valueB) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'multiPathParam'");
	}

}
