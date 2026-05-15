package dev.rsdlang.sample.server.service.handler.query;

import java.time.OffsetDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleOffsetDateTimeQueryParamHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleOffsetDateTimeQueryParamHandler {

	@Override
	public OffsetDateTime simpleOffsetDateTimeQueryParam(BuilderFactory _factory, OffsetDateTime queryValue) {
		return queryValue;
	}

}