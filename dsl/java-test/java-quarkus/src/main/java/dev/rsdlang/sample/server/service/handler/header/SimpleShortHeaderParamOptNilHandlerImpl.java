package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleShortHeaderParamOptNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleShortHeaderParamOptNilHandler {

	@Override
	public NilResult simpleShortHeaderParamOptNil(BuilderFactory _factory, Nillable<Short> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleShortHeaderParamOptNil'");
	}

}
