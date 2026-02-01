package dev.rsdlang.sample.server.service.handler.header;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleShortHeaderParamOptHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleShortHeaderParamOptHandler {

	@Override
	public NilResult simpleShortHeaderParamOpt(BuilderFactory _factory, Optional<Short> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleShortHeaderParamOpt'");
	}

}
