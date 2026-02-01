package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleBooleanHeaderParamOptNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleBooleanHeaderParamOptNilHandler {

	@Override
	public NilResult simpleBooleanHeaderParamOptNil(BuilderFactory _factory, Nillable<Boolean> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleBooleanHeaderParamOptNil'");
	}

}
