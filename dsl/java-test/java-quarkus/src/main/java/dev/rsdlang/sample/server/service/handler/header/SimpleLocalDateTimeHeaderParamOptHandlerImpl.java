package dev.rsdlang.sample.server.service.handler.header;

import java.time.LocalDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleLocalDateTimeHeaderParamOptHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleLocalDateTimeHeaderParamOptHandler {

	@Override
	public NilResult simpleLocalDateTimeHeaderParamOpt(BuilderFactory _factory, LocalDateTime headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLocalDateTimeHeaderParamOpt'");
	}

}
