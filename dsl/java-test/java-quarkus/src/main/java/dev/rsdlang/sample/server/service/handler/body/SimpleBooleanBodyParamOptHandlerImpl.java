package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleBooleanBodyParamOptHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleBooleanBodyParamOptHandler {

	@Override
	public NilResult simpleBooleanBodyParamOpt(BuilderFactory _factory, Boolean bodyBoolean) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleBooleanBodyParamOpt'");
	}

}
