package dev.rsdlang.sample.server.service.handler.query;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleBooleanQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleBooleanQueryParamOptHandler {

	@Override
	public NilResult simpleBooleanQueryParamOpt(BuilderFactory _factory, Optional<Boolean> queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleBooleanQueryParamOpt'");
	}

}
