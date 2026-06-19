package dev.rsdlang.sample.server.service.handler.query;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.model.ZoneId;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleScalarQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleScalarQueryParamOptHandler {

	@Override
	public NilResult simpleScalarQueryParamOpt(BuilderFactory _factory, Optional<ZoneId> queryValue) {
		return queryValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
