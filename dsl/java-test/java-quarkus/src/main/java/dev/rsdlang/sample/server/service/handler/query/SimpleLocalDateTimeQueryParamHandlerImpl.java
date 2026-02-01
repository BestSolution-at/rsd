package dev.rsdlang.sample.server.service.handler.query;

import java.time.LocalDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateTimeQueryParamHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleLocalDateTimeQueryParamHandler {

	@Override
	public LocalDateTime simpleLocalDateTimeQueryParam(BuilderFactory _factory, LocalDateTime queryValue) {
		return queryValue;
	}

}
