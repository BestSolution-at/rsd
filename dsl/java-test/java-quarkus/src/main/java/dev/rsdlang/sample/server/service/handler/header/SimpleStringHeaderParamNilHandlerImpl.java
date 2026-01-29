package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleStringHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleStringHeaderParamNilHandler {

	@Override
	public NilResult simpleStringHeaderParamNil(BuilderFactory _factory, String headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleStringHeaderParamNil'");
	}

}
