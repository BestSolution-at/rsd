package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.ZoneId;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleScalarQueryParamHandlerImpl implements QueryParameterTypesServiceImpl.SimpleScalarQueryParamHandler {

	@Override
	public ZoneId simpleScalarQueryParam(BuilderFactory _factory, ZoneId queryValue) {
		return queryValue;
	}

}
