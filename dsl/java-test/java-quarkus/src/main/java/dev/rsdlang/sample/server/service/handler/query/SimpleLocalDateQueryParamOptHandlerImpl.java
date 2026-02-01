package dev.rsdlang.sample.server.service.handler.query;

import java.time.LocalDate;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleLocalDateQueryParamOptHandler {

	@Override
	public NilResult simpleLocalDateQueryParamOpt(BuilderFactory _factory, Optional<LocalDate> queryValue) {
		return queryValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
