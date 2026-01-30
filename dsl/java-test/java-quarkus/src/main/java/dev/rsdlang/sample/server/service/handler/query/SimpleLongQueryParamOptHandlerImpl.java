package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLongQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleLongQueryParamOptHandler {

	@Override
	public NilResult simpleLongQueryParamOpt(BuilderFactory _factory, Long queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLongQueryParamOpt'");
	}

}
