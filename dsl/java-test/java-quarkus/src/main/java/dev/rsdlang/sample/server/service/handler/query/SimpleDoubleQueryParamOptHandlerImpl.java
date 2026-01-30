package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleDoubleQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleDoubleQueryParamOptHandler {

	@Override
	public NilResult simpleDoubleQueryParamOpt(BuilderFactory _factory, Double queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleDoubleQueryParamOpt'");
	}

}
