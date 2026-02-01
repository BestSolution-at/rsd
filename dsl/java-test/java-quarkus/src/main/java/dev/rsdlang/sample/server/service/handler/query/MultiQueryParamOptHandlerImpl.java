package dev.rsdlang.sample.server.service.handler.query;

import java.util.Optional;
import java.util.OptionalInt;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiQueryParamOptHandlerImpl implements QueryParameterTypesServiceImpl.MultiQueryParamOptHandler {

	@Override
	public String multiQueryParamOpt(BuilderFactory _factory, Optional<String> valueA, OptionalInt valueB) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'multiQueryParamOpt'");
	}

}
