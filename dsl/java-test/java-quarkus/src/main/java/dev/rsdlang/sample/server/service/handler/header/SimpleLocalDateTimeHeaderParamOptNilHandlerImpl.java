package dev.rsdlang.sample.server.service.handler.header;

import java.time.LocalDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleLocalDateTimeHeaderParamOptNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleLocalDateTimeHeaderParamOptNilHandler {

	@Override
	public NilResult simpleLocalDateTimeHeaderParamOptNil(BuilderFactory _factory, LocalDateTime headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLocalDateTimeHeaderParamOptNil'");
	}

}
