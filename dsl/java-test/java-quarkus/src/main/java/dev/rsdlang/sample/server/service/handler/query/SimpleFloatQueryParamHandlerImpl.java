package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleFloatQueryParamHandlerImpl implements QueryParameterTypesServiceImpl.SimpleFloatQueryParamHandler {

	@Override
	public float simpleFloatQueryParam(BuilderFactory _factory, float queryValue) {
		return queryValue;
	}

}
