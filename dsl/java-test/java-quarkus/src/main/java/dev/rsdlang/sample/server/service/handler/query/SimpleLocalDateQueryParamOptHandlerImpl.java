package dev.rsdlang.sample.server.service.handler.query;

import java.time.LocalDate;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleLocalDateQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleLocalDateQueryParamOptHandler {

	@Override
	public NilResult simpleLocalDateQueryParamOpt(BuilderFactory _factory, LocalDate queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLocalDateQueryParamOpt'");
	}

}
