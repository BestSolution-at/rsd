package dev.rsdlang.sample.server.service.handler.path;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleBooleanPathParamHandlerImpl
		implements PathParameterTypeServiceServiceImpl.SimpleBooleanPathParamHandler {

	@Override
	public boolean simpleBooleanPathParam(BuilderFactory _factory, boolean pathBoolean) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleBooleanPathParam'");
	}

}
