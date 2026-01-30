package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleStringQueryParamHandlerImpl implements QueryParameterTypesServiceImpl.SimpleStringQueryParamHandler {

	@Override
	public String simpleStringQueryParam(BuilderFactory _factory, String queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleStringQueryParam'");
	}

}
