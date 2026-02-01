package dev.rsdlang.sample.server.service.handler.query;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleEnumQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleEnumQueryParamOptHandler {

	@Override
	public NilResult simpleEnumQueryParamOpt(BuilderFactory _factory, Optional<SampleEnum> queryValue) {
		return queryValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
