package dev.rsdlang.sample.server.service.handler.header;

import java.time.LocalDate;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleLocalDateHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleLocalDateHeaderParamNilHandler {

	@Override
	public NilResult simpleLocalDateHeaderParamNil(BuilderFactory _factory, LocalDate headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLocalDateHeaderParamNil'");
	}

}
