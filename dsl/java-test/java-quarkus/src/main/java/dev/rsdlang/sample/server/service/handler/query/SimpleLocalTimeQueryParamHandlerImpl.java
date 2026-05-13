package dev.rsdlang.sample.server.service.handler.query;

import java.time.LocalTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalTimeQueryParamHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleLocalTimeQueryParamHandler {

	@Override
	public LocalTime simpleLocalTimeQueryParam(BuilderFactory _factory, LocalTime queryValue) {
		return queryValue;
	}

}
