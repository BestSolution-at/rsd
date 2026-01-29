package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleFloatHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleFloatHeaderParamNilHandler {

	@Override
	public NilResult simpleFloatHeaderParamNil(BuilderFactory _factory, Float headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleFloatHeaderParamNil'");
	}

}
