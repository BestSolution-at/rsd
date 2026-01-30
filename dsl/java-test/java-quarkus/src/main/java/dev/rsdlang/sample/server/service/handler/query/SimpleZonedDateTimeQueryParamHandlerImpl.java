package dev.rsdlang.sample.server.service.handler.query;

import java.time.ZonedDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleZonedDateTimeQueryParamHandlerImpl
		implements QueryParameterTypesServiceImpl.SimpleZonedDateTimeQueryParamHandler {

	@Override
	public ZonedDateTime simpleZonedDateTimeQueryParam(BuilderFactory _factory, ZonedDateTime queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleZonedDateTimeQueryParam'");
	}

}
