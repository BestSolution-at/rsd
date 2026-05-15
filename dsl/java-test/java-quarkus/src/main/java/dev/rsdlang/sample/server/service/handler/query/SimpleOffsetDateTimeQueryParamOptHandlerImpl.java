package dev.rsdlang.sample.server.service.handler.query;

import java.time.OffsetDateTime;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleOffsetDateTimeQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleOffsetDateTimeQueryParamOptHandler {

	@Override
	public NilResult simpleOffsetDateTimeQueryParamOpt(BuilderFactory _factory, Optional<OffsetDateTime> queryValue) {
		return queryValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}