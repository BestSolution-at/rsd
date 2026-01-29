package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SampleEnum;

public class SimpleEnumQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleEnumQueryParamOptHandler {

	@Override
	public NilResult simpleEnumQueryParamOpt(BuilderFactory _factory, SampleEnum queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleEnumQueryParamOpt'");
	}

}
