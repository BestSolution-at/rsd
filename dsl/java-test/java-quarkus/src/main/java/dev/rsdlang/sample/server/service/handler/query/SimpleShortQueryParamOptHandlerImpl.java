package dev.rsdlang.sample.server.service.handler.query;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleShortQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleShortQueryParamOptHandler {

	@Override
	public NilResult simpleShortQueryParamOpt(BuilderFactory _factory, Optional<Short> queryValue) {
		return queryValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
