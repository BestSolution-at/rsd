package dev.rsdlang.sample.server.service.handler.path;

import java.time.ZonedDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;

public class SimpleZonedDateTimePathParamHandlerImpl
		implements PathParameterTypeServiceServiceImpl.SimpleZonedDateTimePathParamHandler {

	@Override
	public ZonedDateTime simpleZonedDateTimePathParam(BuilderFactory _factory, ZonedDateTime pathZonedDateTime) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleZonedDateTimePathParam'");
	}

}
