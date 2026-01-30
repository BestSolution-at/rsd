package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleEnumQueryParamHandlerImpl implements QueryParameterTypesServiceImpl.SimpleEnumQueryParamHandler {

	@Override
	public SampleEnum simpleEnumQueryParam(BuilderFactory _factory, SampleEnum queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleEnumQueryParam'");
	}

}
