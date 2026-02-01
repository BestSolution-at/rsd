package dev.rsdlang.sample.server.service.handler.query;

import java.util.OptionalInt;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleIntQueryParamOptHandlerImpl implements QueryParameterTypesServiceImpl.SimpleIntQueryParamOptHandler {

	@Override
	public NilResult simpleIntQueryParamOpt(BuilderFactory _factory, OptionalInt queryValue) {
		return queryValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
