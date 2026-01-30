package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleDoubleQueryParamHandlerImpl implements QueryParameterTypesServiceImpl.SimpleDoubleQueryParamHandler {

	@Override
	public double simpleDoubleQueryParam(BuilderFactory _factory, double queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleDoubleQueryParam'");
	}

}
