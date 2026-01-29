package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleIntHeaderParamOptNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleIntHeaderParamOptNilHandler {

	@Override
	public NilResult simpleIntHeaderParamOptNil(BuilderFactory _factory, Integer headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleIntHeaderParamOptNil'");
	}

}
