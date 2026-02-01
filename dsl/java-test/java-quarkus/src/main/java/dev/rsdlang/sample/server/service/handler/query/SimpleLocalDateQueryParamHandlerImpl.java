package dev.rsdlang.sample.server.service.handler.query;

import java.time.LocalDate;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateQueryParamHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleLocalDateQueryParamHandler {

	@Override
	public LocalDate simpleLocalDateQueryParam(BuilderFactory _factory, LocalDate queryValue) {
		return queryValue;
	}

}
