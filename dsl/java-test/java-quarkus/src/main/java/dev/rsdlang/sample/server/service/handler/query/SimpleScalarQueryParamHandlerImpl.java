package dev.rsdlang.sample.server.service.handler.query;

import java.time.ZoneId;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;

public class SimpleScalarQueryParamHandlerImpl implements QueryParameterTypesServiceImpl.SimpleScalarQueryParamHandler {

	@Override
	public ZoneId simpleScalarQueryParam(BuilderFactory _factory, ZoneId queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleScalarQueryParam'");
	}

}
