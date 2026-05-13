package dev.rsdlang.sample.server.service.handler.query;

import java.time.LocalTime;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalTimeQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleLocalTimeQueryParamOptHandler {

	@Override
	public NilResult simpleLocalTimeQueryParamOpt(BuilderFactory _factory, Optional<LocalTime> queryValue) {
		return queryValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
