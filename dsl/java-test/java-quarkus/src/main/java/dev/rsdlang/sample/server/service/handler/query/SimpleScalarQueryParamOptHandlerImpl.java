package dev.rsdlang.sample.server.service.handler.query;

import java.time.ZoneId;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleScalarQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleScalarQueryParamOptHandler {

	@Override
	public NilResult simpleScalarQueryParamOpt(BuilderFactory _factory, ZoneId queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleScalarQueryParamOpt'");
	}

}
