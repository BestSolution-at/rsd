package dev.rsdlang.sample.server.service.handler.body;

import java.time.LocalDate;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleLocalDateBodyParamOptHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleLocalDateBodyParamOptHandler {

	@Override
	public NilResult simpleLocalDateBodyParamOpt(BuilderFactory _factory, LocalDate bodyLocalDate) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLocalDateBodyParamOpt'");
	}

}
