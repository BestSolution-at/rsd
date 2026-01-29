package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleDoubleHeaderParamOptNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleDoubleHeaderParamOptNilHandler {

	@Override
	public NilResult simpleDoubleHeaderParamOptNil(BuilderFactory _factory, Double headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleDoubleHeaderParamOptNil'");
	}

}
