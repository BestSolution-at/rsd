package dev.rsdlang.sample.server.service.handler.query;

import java.util.OptionalDouble;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleDoubleQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleDoubleQueryParamOptHandler {

	@Override
	public NilResult simpleDoubleQueryParamOpt(BuilderFactory _factory, OptionalDouble queryValue) {
		return queryValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
