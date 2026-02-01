package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleBooleanQueryParamHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleBooleanQueryParamHandler {

	@Override
	public boolean simpleBooleanQueryParam(BuilderFactory _factory, boolean queryValue) {
		return queryValue;
	}

}
