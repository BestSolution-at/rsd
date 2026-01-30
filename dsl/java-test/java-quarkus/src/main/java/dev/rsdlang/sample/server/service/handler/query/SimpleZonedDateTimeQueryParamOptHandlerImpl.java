package dev.rsdlang.sample.server.service.handler.query;

import java.time.ZonedDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleZonedDateTimeQueryParamOptHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleZonedDateTimeQueryParamOptHandler {

	@Override
	public NilResult simpleZonedDateTimeQueryParamOpt(BuilderFactory _factory, ZonedDateTime queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleZonedDateTimeQueryParamOpt'");
	}

}
