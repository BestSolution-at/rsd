package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleStringQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleStringQueryParamOptHandler {

	@Override
	public NilResult simpleStringQueryParamOpt(BuilderFactory _factory, String queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleStringQueryParamOpt'");
	}

}
