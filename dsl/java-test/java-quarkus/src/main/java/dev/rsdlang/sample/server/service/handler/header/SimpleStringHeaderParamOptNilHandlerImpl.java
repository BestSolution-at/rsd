package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleStringHeaderParamOptNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleStringHeaderParamOptNilHandler {

	@Override
	public NilResult simpleStringHeaderParamOptNil(BuilderFactory _factory, Nillable<String> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleStringHeaderParamOptNil'");
	}

}
