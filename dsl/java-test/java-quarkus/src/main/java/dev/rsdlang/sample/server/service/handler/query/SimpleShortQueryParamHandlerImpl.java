package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleShortQueryParamHandlerImpl implements QueryParameterTypesServiceImpl.SimpleShortQueryParamHandler {

	@Override
	public short simpleShortQueryParam(BuilderFactory _factory, short queryValue) {
		return queryValue;
	}

}
