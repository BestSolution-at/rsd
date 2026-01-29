package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleLongHeaderParamOptHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleLongHeaderParamOptHandler {

	@Override
	public NilResult simpleLongHeaderParamOpt(BuilderFactory _factory, Long headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLongHeaderParamOpt'");
	}

}
