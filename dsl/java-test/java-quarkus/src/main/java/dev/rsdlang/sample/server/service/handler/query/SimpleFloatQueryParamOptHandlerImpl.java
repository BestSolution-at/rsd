package dev.rsdlang.sample.server.service.handler.query;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleFloatQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleFloatQueryParamOptHandler {

	@Override
	public NilResult simpleFloatQueryParamOpt(BuilderFactory _factory, Optional<Float> queryValue) {
		return queryValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
