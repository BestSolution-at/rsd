package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLongQueryParamHandlerImpl implements QueryParameterTypesServiceImpl.SimpleLongQueryParamHandler {

	@Override
	public long simpleLongQueryParam(BuilderFactory _factory, long queryValue) {
		return queryValue;
	}

}
