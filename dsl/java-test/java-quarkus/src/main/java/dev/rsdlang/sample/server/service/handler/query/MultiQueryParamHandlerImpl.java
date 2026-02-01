package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiQueryParamHandlerImpl implements QueryParameterTypesServiceImpl.MultiQueryParamHandler {

	@Override
	public String multiQueryParam(BuilderFactory _factory, String valueA, int valueB) {
		return valueA + "-" + valueB;
	}

}
