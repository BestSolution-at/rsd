package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleBooleanHeaderParamOptHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleBooleanHeaderParamOptHandler {

	@Override
	public NilResult simpleBooleanHeaderParamOpt(BuilderFactory _factory, Boolean headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleBooleanHeaderParamOpt'");
	}

}
