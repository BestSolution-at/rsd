package dev.rsdlang.sample.server.service.handler.query;

import java.time.LocalDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateTimeQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleLocalDateTimeQueryParamOptHandler {

	@Override
	public NilResult simpleLocalDateTimeQueryParamOpt(BuilderFactory _factory, LocalDateTime queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLocalDateTimeQueryParamOpt'");
	}

}
