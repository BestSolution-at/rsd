package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleDoubleHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleDoubleHeaderParamNilHandler {

	@Override
	public NilResult simpleDoubleHeaderParamNil(BuilderFactory _factory, Double headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleDoubleHeaderParamNil'");
	}

}
