package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleIntQueryParamHandlerImpl implements QueryParameterTypesServiceImpl.SimpleIntQueryParamHandler {

	@Override
	public int simpleIntQueryParam(BuilderFactory _factory, int queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleIntQueryParam'");
	}

}
